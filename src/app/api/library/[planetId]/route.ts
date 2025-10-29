import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET(
  request: NextRequest,
  { params }: { params: { planetId: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const filePath = path.join(process.cwd(), 'public', 'data', 'neuro_library.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const planet = data.planets.find((p: any) => p.id === params.planetId);

    if (!planet) {
      return NextResponse.json({ error: 'Planet not found' }, { status: 404 });
    }

    // Paginate tips
    const tips = planet.tips || [];
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTips = tips.slice(start, end).map((tip: any) => ({
      id: tip.id || `${params.planetId}-${start}`,
      title: tip.title,
      summary: tip.summary,
      tags: tip.tags,
      energy: tip.energy,
      category: tip.category,
      copy_to_clipboard: tip.copy_to_clipboard
    }));

    return NextResponse.json(
      {
        planet: {
          id: planet.id,
          title: planet.title,
          description: planet.description,
          colour: planet.colour,
          orbit_tags: planet.orbit_tags,
          mindgram: planet.mindgram
        },
        tips: paginatedTips,
        pagination: {
          page,
          limit,
          total: tips.length,
          hasMore: end < tips.length
        }
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=2592000',
          'ETag': `"${params.planetId}-${page}"`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load planet data' }, { status: 500 });
  }
}

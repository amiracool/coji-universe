import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET(
  request: NextRequest,
  { params }: { params: { tipId: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'neuro_library.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Find tip across all planets
    let foundTip = null;
    let planetInfo = null;

    for (const planet of data.planets) {
      if (planet.tips) {
        const tip = planet.tips.find((t: any, idx: number) =>
          (t.id === params.tipId) || (`${planet.id}-${idx}` === params.tipId)
        );

        if (tip) {
          foundTip = tip;
          planetInfo = {
            id: planet.id,
            title: planet.title,
            colour: planet.colour
          };
          break;
        }
      }
    }

    if (!foundTip) {
      return NextResponse.json({ error: 'Tip not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...foundTip,
        planet: planetInfo
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=2592000',
          'ETag': `"tip-${params.tipId}"`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load tip' }, { status: 500 });
  }
}

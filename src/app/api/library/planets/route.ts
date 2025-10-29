import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

interface Planet {
  id: string;
  title: string;
  description: string;
  colour: string;
  emoji: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'neuro_library.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Return minimal planet list for initial load
    const planets: Planet[] = data.planets.map((planet: any) => ({
      id: planet.id,
      title: planet.title,
      description: planet.description,
      colour: planet.colour,
      emoji: planet.emoji || '🌟'
    }));

    return NextResponse.json(
      { planets },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=2592000',
          'ETag': `"planets-${Date.now()}"`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load planets' }, { status: 500 });
  }
}

import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface CojiDB extends DBSchema {
  planets: {
    key: string;
    value: {
      id: string;
      data: any;
      timestamp: number;
    };
  };
  tips: {
    key: string;
    value: {
      id: string;
      data: any;
      timestamp: number;
    };
  };
  searches: {
    key: string;
    value: {
      query: string;
      results: any[];
      timestamp: number;
    };
  };
}

const DB_NAME = 'coji-cache';
const DB_VERSION = 1;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

let dbPromise: Promise<IDBPDatabase<CojiDB>> | null = null;

async function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<CojiDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('planets')) {
          db.createObjectStore('planets', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tips')) {
          db.createObjectStore('tips', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('searches')) {
          db.createObjectStore('searches', { keyPath: 'query' });
        }
      },
    });
  }
  return dbPromise;
}

export async function getCachedPlanet(planetId: string, page: number = 1) {
  try {
    const db = await getDB();
    const key = `${planetId}-page-${page}`;
    const cached = await db.get('planets', key);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

export async function setCachedPlanet(planetId: string, page: number, data: any) {
  try {
    const db = await getDB();
    const key = `${planetId}-page-${page}`;
    await db.put('planets', {
      id: key,
      data,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

export async function getCachedTip(tipId: string) {
  try {
    const db = await getDB();
    const cached = await db.get('tips', tipId);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

export async function setCachedTip(tipId: string, data: any) {
  try {
    const db = await getDB();
    await db.put('tips', {
      id: tipId,
      data,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

export async function getCachedSearch(query: string) {
  try {
    const db = await getDB();
    const cached = await db.get('searches', query.toLowerCase());

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.results;
    }
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

export async function setCachedSearch(query: string, results: any[]) {
  try {
    const db = await getDB();
    // Only keep last 10 searches
    const all = await db.getAllKeys('searches');
    if (all.length >= 10) {
      await db.delete('searches', all[0]);
    }

    await db.put('searches', {
      query: query.toLowerCase(),
      results,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

export async function prefetchNextPage(planetId: string, currentPage: number) {
  const nextPage = currentPage + 1;
  const cached = await getCachedPlanet(planetId, nextPage);

  if (!cached) {
    // Fetch in background
    fetch(`/api/library/${planetId}?page=${nextPage}&limit=20`)
      .then(res => res.json())
      .then(data => setCachedPlanet(planetId, nextPage, data))
      .catch(() => {}); // Silent fail for prefetch
  }
}

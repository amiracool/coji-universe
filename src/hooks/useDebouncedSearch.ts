import { useState, useEffect, useRef, useCallback } from 'react';
import { getCachedSearch, setCachedSearch } from '@/lib/cache';

interface SearchOptions {
  debounceMs?: number;
  minLength?: number;
}

export function useDebouncedSearch(options: SearchOptions = {}) {
  const { debounceMs = 350, minLength = 2 } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minLength) {
      setResults([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Check cache first
    const cached = await getCachedSearch(searchQuery);
    if (cached) {
      setResults(cached);
      setIsSearching(false);
      return;
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setIsSearching(true);
      setError(null);

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=20`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);

      // Cache results
      await setCachedSearch(searchQuery, data.results || []);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError('Search failed. Please try again.');
        console.error('Search error:', err);
      }
    } finally {
      setIsSearching(false);
    }
  }, [minLength]);

  // Debounce search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.length === 0) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    if (query.length < minLength) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs, minLength, performSearch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
  };
}

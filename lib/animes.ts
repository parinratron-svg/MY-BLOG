export type Anime = {
  id: string;
  title: string;
  genre?: string;
  rating?: number;
  note?: string;
};

let animes: Anime[] = [];
let nextId = 1;

export function getAnimes(): Anime[] {
  return animes;
}

export function addAnime(data: Omit<Anime, 'id'>): Anime {
  const anime: Anime = { id: String(nextId++), ...data };
  animes.push(anime);
  return anime;
}

export function updateAnime(id: string, updates: Partial<Anime>): Anime | null {
  const anime = animes.find((a) => a.id === id);
  if (!anime) return null;
  Object.assign(anime, updates);
  return anime;
}

export function deleteAnime(id: string): boolean {
  const index = animes.findIndex((a) => a.id === id);
  if (index === -1) return false;
  animes.splice(index, 1);
  return true;
}
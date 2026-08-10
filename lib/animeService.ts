import * as AnimeModel from './animes';

export function createAnime(data: { title: string; genre?: string; rating?: number; note?: string }) {
  if (!data.title || data.title.trim() === '') {
    throw new Error('ชื่ออนิเมะห้ามเป็นค่าว่าง');
  }
  if (data.rating !== undefined && (data.rating < 1 || data.rating > 10)) {
    throw new Error('คะแนนต้องอยู่ระหว่าง 1-10');
  }
  return AnimeModel.addAnime(data);
}

export function listAnimes() {
  return AnimeModel.getAnimes();
}

export function getAnimeById(id: string) {
  return AnimeModel.getAnimes().find((a) => a.id === id) ?? null;
}

export function editAnime(id: string, updates: Partial<{ title: string; genre: string; rating: number; note: string }>) {
  if (updates.title !== undefined && updates.title.trim() === '') {
    throw new Error('ชื่ออนิเมะห้ามเป็นค่าว่าง');
  }
  if (updates.rating !== undefined && (updates.rating < 1 || updates.rating > 10)) {
    throw new Error('คะแนนต้องอยู่ระหว่าง 1-10');
  }
  return AnimeModel.updateAnime(id, updates);
}

export function removeAnime(id: string) {
  return AnimeModel.deleteAnime(id);
}
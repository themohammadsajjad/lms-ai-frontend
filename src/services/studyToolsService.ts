const MASTERED_KEY = 'lms_mastered_flashcards';

function getMasteredCards(): string[] {
  const stored = localStorage.getItem(MASTERED_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export const studyToolsService = {
  isMastered(cardId: string): boolean {
    return getMasteredCards().includes(cardId);
  },

  toggleMastered(cardId: string): boolean {
    const current = getMasteredCards();

    const updated = current.includes(cardId)
      ? current.filter((id) => id !== cardId)
      : [...current, cardId];

    localStorage.setItem(
      MASTERED_KEY,
      JSON.stringify(updated),
    );

    return updated.includes(cardId);
  },

  getMasteredCount(cardIds: string[]): number {
    const mastered = getMasteredCards();

    return cardIds.filter((id) => mastered.includes(id)).length;
  },
};
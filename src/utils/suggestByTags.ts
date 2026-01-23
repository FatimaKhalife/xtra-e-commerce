
export function suggestByTags<T extends { id: number }>(
  currentItemTags: string[],
  items: T[],
  getTags: (item: T) => string[],
  excludeId?: number,
  limit = 4
) {
  return items
    .filter(item => item.id !== excludeId)
    .sort((a, b) => {
      const aScore = getTags(a).filter(tag =>
        currentItemTags.includes(tag)
      ).length;

      const bScore = getTags(b).filter(tag =>
        currentItemTags.includes(tag)
      ).length;

      return bScore - aScore;
    })
    .slice(0, limit);
}

/**
 * Random fallback
 */
export function randomSuggestions<T extends { id: number }>(
  items: T[],
  excludeId?: number,
  limit = 4
) {
  return items
    .filter(item => item.id !== excludeId)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
}

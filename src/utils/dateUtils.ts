export function formatPostDate(createdAt: string | Date): string {
  const now = new Date();
  const date = new Date(createdAt);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours >= 24) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const diffMinutes = diffMs / (1000 * 60);
  if (diffHours >= 1) return `${Math.floor(diffHours)}시간 전`;
  if (diffMinutes >= 1) return `${Math.floor(diffMinutes)}분 전`;
  return "방금 전";
}

import type { PostContentRequest } from '@/api/post';

interface MergePostTextOptions {
  emptyFallback?: string;
  separator?: string;
}

export function mergePostTextContents(contents: PostContentRequest[], options: MergePostTextOptions = {}) {
  const { emptyFallback = '', separator = ' ' } = options;

  const merged = contents
    .filter((item) => item.contentType === 'TEXT')
    .sort((a, b) => a.contentOrder - b.contentOrder)
    .map((item) => item.content)
    .join(separator)
    .trim();

  return merged || emptyFallback;
}

import {RATING_STARS_TOTAL} from './const.ts';

export function getRatingWidth(rating: number): string {
  return `${(Math.round(rating) / RATING_STARS_TOTAL) * 100}%`;
}

export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
}

export function formatDateTime(dateString: string): string {
  return dateString.slice(0, 10);
}

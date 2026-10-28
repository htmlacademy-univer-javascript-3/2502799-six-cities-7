import {RATING_STARS_TOTAL} from './const.ts';

export function getRatingWidth(rating: number): string {
  return `${(Math.round(rating) / RATING_STARS_TOTAL) * 100}%`;
}

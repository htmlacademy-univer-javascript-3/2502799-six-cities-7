import {useState, ChangeEvent, FormEvent, Fragment} from 'react';
import {ReviewLength} from '../../const.ts';

type ReviewFormData = {
  rating: number;
  review: string;
};

const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

const RATING_VALUES = [5, 4, 3, 2, 1] as const;

function ReviewForm() {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    review: '',
  });

  const isSubmitDisabled =
    formData.rating === 0 ||
    formData.review.length < ReviewLength.Min ||
    formData.review.length > ReviewLength.Max;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((previousState) => ({
      ...previousState,
      rating: Number(evt.target.value),
    }));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((previousState) => ({
      ...previousState,
      review: evt.target.value,
    }));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((score) => {
          const starId = `${score}-star${score === 1 ? '' : 's'}`;

          return (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={starId}
                type="radio"
                checked={formData.rating === score}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={starId}
                className="reviews__rating-label form__rating-label"
                title={RATING_TITLES[score]}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        maxLength={ReviewLength.Max}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

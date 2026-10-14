import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer.ts';
import {getRatingWidth} from '../../utils.ts';

type CardVariant = 'cities' | 'favorites' | 'near-places';

type CardProps = {
  offer: Offer;
  variant?: CardVariant;
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
};

const IMAGE_SIZES: Record<CardVariant, {width: number; height: number}> = {
  cities: {width: 260, height: 200},
  'near-places': {width: 260, height: 200},
  favorites: {width: 150, height: 110},
};

function Card({offer, variant = 'cities', onCardMouseEnter, onCardMouseLeave}: CardProps) {

  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const ratingWidthPercentage = getRatingWidth(rating);
  const offerUrl = `/offer/${id}`;
  const imageSize = IMAGE_SIZES[variant];

  const handleMouseEnter = () => {
    onCardMouseEnter?.(id);
  };

  const handleMouseLeave = () => {
    onCardMouseLeave?.();
  };

  return (
    <article
      className={`${variant}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${variant}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerUrl}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${variant === 'favorites' ? 'favorites__card-info ' : ''}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidthPercentage}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerUrl}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;

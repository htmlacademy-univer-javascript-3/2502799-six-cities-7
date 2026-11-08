import {useState} from 'react';
import Card from '../card/card.tsx';
import {Offers} from '../../types/offer.ts';

type OffersListVariant = 'cities' | 'near-places';

type OffersListProps = {
  offers: Offers;
  variant?: OffersListVariant;
  onCardHover?: (id: string | null) => void;
};

const LIST_CLASS_NAMES: Record<OffersListVariant, string> = {
  cities: 'cities__places-list places__list tabs__content',
  'near-places': 'near-places__list places__list',
};

function OffersList({offers, variant = 'cities', onCardHover}: OffersListProps): JSX.Element {
  const [, setActiveCardId] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => {
    setActiveCardId(id);
    onCardHover?.(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCardId(null);
    onCardHover?.(null);
  };

  return (
    <div className={LIST_CLASS_NAMES[variant]}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          variant={variant}
          onCardMouseEnter={handleCardMouseEnter}
          onCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;

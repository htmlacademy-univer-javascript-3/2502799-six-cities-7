import {useState} from 'react';
import Card from '../card/card.tsx';
import {Offers} from '../../types/offer.ts';

type OffersListProps = {
  offers: Offers;
};

function OffersList({offers}: OffersListProps) {
  const [, setActiveCardId] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => {
    setActiveCardId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCardId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardMouseEnter={handleCardMouseEnter}
          onCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;

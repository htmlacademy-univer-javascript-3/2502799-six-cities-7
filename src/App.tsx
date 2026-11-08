import Main from './pages/main/main.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Favorites from './pages/favorites/favorites.tsx';
import NotFound from './pages/not-found/not-found.tsx';
import PrivateRoute from './components/private-route.tsx';
import {AppRoute, AuthorizationStatus} from './const.ts';
import Login from './pages/login/login.tsx';
import {Offers} from './types/offer.ts';
import {Reviews} from './types/review.ts';
import Offer from './pages/offer/offer.tsx';

type AppProps = {
  offerCounts: number;
  offers: Offers;
  reviews?: Reviews;
};

function App({offerCounts, offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main offerCounts={offerCounts} offers={offers} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer offers={offers} reviews={reviews}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

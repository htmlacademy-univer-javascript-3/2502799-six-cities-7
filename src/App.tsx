import Main from './pages/main/main.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Favorites from './pages/favorites/favorites.tsx';
import NotFound from './pages/not-found/not-found.tsx';
import PrivateRoute from './components/private-route.tsx';
import {AppRoute, AuthorizationStatus} from './const.ts';
import Login from './pages/login/login.tsx';
import Offer from './pages/offer/offer.tsx';

type AppProps = {
  offerCounts: number;
}

function App({offerCounts}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main offerCounts={offerCounts} />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

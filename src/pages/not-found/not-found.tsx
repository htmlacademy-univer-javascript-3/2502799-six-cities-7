import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import './not-found.css';

type Coordinates = {
  x: number;
  y: number;
};

type TiltDegrees = {
  rotateX: number;
  rotateY: number;
};

const MAX_TILT_DEGREE = 8;
const PERSPECTIVE_PX = 1000;

function NotFound() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [mouseCoordinates, setMouseCoordinates] = useState<Coordinates>({x: 0, y: 0});
  const [tiltDegrees, setTiltDegrees] = useState<TiltDegrees>({rotateX: 0, rotateY: 0});
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleCardMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) {
      return;
    }

    const cardRect = cardRef.current.getBoundingClientRect();
    const relativeX = evt.clientX - cardRect.left;
    const relativeY = evt.clientY - cardRect.top;

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const calculatedRotateY = ((relativeX - centerX) / centerX) * MAX_TILT_DEGREE;
    const calculatedRotateX = -((relativeY - centerY) / centerY) * MAX_TILT_DEGREE;

    setMouseCoordinates({x: relativeX, y: relativeY});
    setTiltDegrees({
      rotateX: Number(calculatedRotateX.toFixed(2)),
      rotateY: Number(calculatedRotateY.toFixed(2)),
    });
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setTiltDegrees({rotateX: 0, rotateY: 0});
    setIsHovered(false);
  };

  return (
    <div className="page page--gray page--main not-found-page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main not-found-main">
        <div className="container not-found-wrapper">
          <div
            ref={cardRef}
            className="not-found-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(${PERSPECTIVE_PX}px) rotateX(${tiltDegrees.rotateX}deg) rotateY(${tiltDegrees.rotateY}deg)`,
            }}
          >
            {isHovered && (
              <div
                className="not-found-card__spotlight"
                style={{
                  background: `radial-gradient(circle 240px at ${mouseCoordinates.x}px ${mouseCoordinates.y}px, rgba(68, 129, 195, 0.22), transparent 80%)`,
                }}
              />
            )}

            <h1 className="not-found-card__code">404</h1>
            <h2 className="not-found-card__title">Страница не найдена</h2>
            <p className="not-found-card__text">
              Мы проверили все уголки шести городов, но запрашиваемой страницы здесь нет.
            </p>

            <Link
              to={AppRoute.Main}
              className="button form__submit not-found-card__link"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;

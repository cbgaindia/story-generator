import Link from 'next/link';
import Image from 'next/image';

const bgColorIndex = [1, 2, 3, 4, 5, 6];


export default function Card({ scheme }) {
  bgColorIndex.push(bgColorIndex[scheme.index]);

  return (

    <li
      className={scheme.desc ? 'card card--desc' : 'card'}
      bgcolor={bgColorIndex[scheme.index]}
    >
      <Link key={scheme.index} href={`/${scheme.link}`}>
        <a className="card__content">
          {scheme.totalArticles == 0 && (
            <>
              <img
                src="/assets/icons/coming_soon.png"
                alt=""
                className="card__soon"
              />
              <span className="screen-reader-text">Coming Soon:</span>
            </>
          )}
          <h2 className="card__title">{scheme.title}</h2>

          <picture className="card__image">
            <source
              srcSet={`${scheme.icon}`}
              media="(min-width: 640px)"
            />
            <Image src={scheme.icon} width="150" height="120" alt="" placeholder="blur" quality={95} />
          </picture>

          {scheme.desc && <p className="card__desc">{scheme.desc}</p>}
        </a>
      </Link>
    </li>

  );
}

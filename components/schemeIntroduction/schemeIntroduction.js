import React, { useEffect } from 'react';
import FacebookIcon from 'public/assets/icons/facebook-icon-intro.svg';
import TwitterIcon from 'public/assets/icons/twitter-icon-intro.svg';
import Link from 'next/link';

const socialMediaLinks = [
  {
    name: 'facebook',
    text: 'Facebook Share',
    link: 'https://www.facebook.com/OpenBudgetsIndia',
    image: FacebookIcon,
    share: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  {
    name: 'twitter',
    text: 'Twitter Share',
    link: 'https://twitter.com/OpenBudgetsIn',
    image: TwitterIcon,
    share: 'https://twitter.com/intent/tweet?text=Share on twitter&url=',
  },
];

export default function SchemeIntroduction(props) {
  useEffect(() => {
    const links = document.querySelectorAll('a[href="#social"]');
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
      });
    });
  }, []);

  return (
    <div className="scheme__intro">
      <p className="scheme__bread">
        <Link href="/">
          <a className="scheme__home-link">
            <u>Story Generator</u>
          </a>
        </Link>
        &nbsp;&nbsp; &gt;
      </p>
      <div className="scheme__heading">
        <h2 className="scheme__title">{props.data && props.data.name}</h2>
        <a
          href={`https://openbudgetsindia.org/dataset/${props.data.slug}`}
          className="scheme__dataset"
          rel="noreferrer"
          target="_blank"
        >
          Dataset
          <span className="screen-reader-text"> :opens in new window</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
            <g fill="#4b4797" fillRule="evenodd">
              <path
                strokeWidth="6"
                d="M76 18 47 47a4 4 0 0 0 6 6l29-29v10a4 4 0 0 0 8 0V14a4 4 0 0 0-4-4H66a4 4 0 0 0 0 8h10Zm14 40V39v41c0 6-4 10-9 10H19c-5 0-9-4-9-10V20c0-6 4-10 9-10h43-20a4 4 0 1 1 0 8H20c-1 0-2 1-2 3v58c0 2 1 3 2 3h60c1 0 2-1 2-3V58a4 4 0 1 1 8 0Z"
              />
            </g>
          </svg>
        </a>
      </div>
      <p className="scheme__desc">{props.data.description ? props.data.description : props.data.notes}</p>
      <div className="scheme__meta">
        <p className="scheme__frequency">
          Frequency:{' '}
          <span className="scheme__meta--dark">{props.data.frequency}</span>
        </p>
        <span className="seperator" />
        <div className="social">
          <p className="social__title">Share on social media:</p>
          <div className="social__links-container">
            {socialMediaLinks.map((socialLink, index) => (
              <a
                href="#"
                key={`socialLink-${index}`}
                className="social__link"
                onClick={() =>
                  window.open(
                    socialLink.share + encodeURIComponent(window.location.href)
                  )
                }
              >
                <span className="screen-reader-text">{socialLink.text}</span>
                <socialLink.image />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OBI from 'public/assets/icons/obi_header.png';

const Header = () => (
  <header className="header">
    <div className="header__container wrapper">
      <section className="branding">
        <Link href="/">
          <a>
            <h1 className="branding__logo">Story Generator</h1>
          </a>
        </Link>

        <span className="branding__seperator" />

        <a
          className="branding__obi"
          rel="noopener noreferrer"
          href="https://openbudgetsindia.org/"
        >
          <Image
            src={OBI}
            alt="Open Budgets India"
            layout="intrinsic"
            width={177}
            height={24}
            placeholder="blur"
          />
        </a>
      </section>
      {/* {!searchPage && (
        <Link href="/search">
          <a className="header__search">
            Search <span className="screen-reader-text">Page</span>
          </a>
        </Link>
      )} */}
      {/* {desc && <section className="header__desc">{desc}</section>} */}
    </div>
  </header>
);
export default Header;

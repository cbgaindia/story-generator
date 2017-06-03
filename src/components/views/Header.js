import React from 'react';
import { Tabs } from './tabs';
import { themes } from '../../data';
import { IndexLink } from 'react-router';

export const Header = ({ params }) => {
    const activeTheme = (params != undefined && params.theme != undefined) ? themes.filter(t => t.url_slug === params.theme).shift() : themes[0];
    return (
      <header>
        <div className="row-fluid" style={{ marginBottom: '1em' }}>
          <IndexLink to="/" className="story-generator-logo">
            <div class="logo" style={{ textAlign: 'center' }}>
              <img src="http://www.humanrightsinitiative.org/images/logo-orange.png" />
            </div>
          </IndexLink>
        </div>
        <nav>
          <Tabs themes={themes} titleSelector={theme => theme.description} activeTheme={activeTheme} />
        </nav>
      </header>
    );
}
import React from 'react';
import { Tabs } from './tabs';
import { themes } from '../../data';
import { IndexLink } from 'react-router';

export const Header = ({ params }) => {
    const activeTheme = (params != undefined && params.theme != undefined) ? themes.filter(t => t.url_slug === params.theme).shift() : themes[0];
    return (
        <div class='header'>
            <div className="row-fluid">
				<IndexLink to="/" className="story-generator-logo">
                <h2 className="app-title"> Story Generator<sub className="alpha">ALPHA</sub> <hr className="title-hr" /></h2>
                </IndexLink>
			</div>
            <Tabs themes={themes} titleSelector={theme => theme.description} activeTheme={activeTheme} />
        </div>
    );
}
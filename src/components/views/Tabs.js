import React from 'react';

const Tab = ({ isActive, name, url }) =>
    <li className={isActive ? "active" : null}>
        <a href={`#/${url}`}>{name}</a>
    </li>;

export const Tabs = ({ themes, activeTheme, titleSelector }) =>
    <ul className="nav nav-tabs nav-justified">
        {themes.map(theme => <Tab name={titleSelector(theme)} key={theme.url_slug} url={theme.url_slug} isActive={activeTheme.url_slug === theme.url_slug} />)}
    </ul>;
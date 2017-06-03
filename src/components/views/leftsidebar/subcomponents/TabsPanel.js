import React from 'react';
import { Link, IndexLink } from 'react-router';
import { expenditure_data } from "../../../../data/expenditure_data";
import { getSubThemes, getTopics, sub_themes, themes, topics } from '../../../../data';
import { Tabs } from '../../Tabs';

const Topics = ({ topics }) =>
  <ul className="list-group">
    {topics.map(topic =>
      <li className="list-group-item" key={topic.url_slug}>
        <Link to={`/${topic.sub_theme_url_slug}/${topic.url_slug}`}>{topic.name}</Link>
      </li>)
    }
  </ul>;

const SubThemeList = ({ subThemes, params }) => {
  const active = params != undefined && params.sub_theme != undefined ? subThemes.filter(s => s.url_slug === params.sub_theme).shift() : undefined;
  return (
  <div className="panel-group select-panel" id="accordion">
    {subThemes.map(subTheme =>
      <div className="panel panel-default" key={subTheme.url_slug}>
        <div className="panel-heading">
          <h4 className="panel-title">
            <a className={`${active == subTheme ? "" : "collapsed"}`} href={`#/${subTheme.theme_url_slug}/${active == subTheme ? '' : subTheme.url_slug}`}>{subTheme.name}</a>
          </h4>
        </div>
        <div id={subTheme.url_slug} className={`panel-collapse ${active == subTheme ? "" : "collapse"}`}>
          <Topics topics={getTopics(subTheme)} />
        </div>
      </div>)
    }
  </div>
  );
};

const Content = ({ sub_themes, params }) =>
  <div>
    <section className="panel panel-success card-box-shadow">
      <SubThemeList subThemes={sub_themes} params={params} />
    </section>
  </div>;

const TabsPanel = ({ params }) => {
  const activeTheme = (params != undefined && params.theme != undefined) ? themes.filter(t => t.url_slug === params.theme).shift() : themes[0];
  return (
    <div>
      <Tabs themes={[activeTheme]} titleSelector={theme => theme.description} activeTheme={activeTheme} />
      <Content sub_themes={getSubThemes(activeTheme)} params={params} />
    </div>
  );
};

export default TabsPanel;
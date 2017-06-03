import React from 'react';
import { topics, sub_themes } from '../../data';

export const Description = ({ topic }) =>
    <p>{(topics.filter(t => t.url_slug === topic).shift()|| {}).description}</p>;

export const SubThemeDescription = ({ theme, sub_theme }) =>
    <p class="text-bold">{(sub_themes.filter(t => t.url_slug === sub_theme && t.theme_url_slug === theme).shift()|| {}).description}</p>;
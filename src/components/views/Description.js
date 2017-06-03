import React from 'react';
import { topics } from '../../data';

export const Description = ({ topic }) =>
    <p>{(topics.filter(t => t.url_slug === topic).shift()|| {}).description}</p>;
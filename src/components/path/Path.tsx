import React from 'react';
import { FC } from 'react';
import './path.scss';

interface IPath {
  path: string;
}

const Path: FC<IPath> = ({ path }) => {
  return <div className="path">path: {path}</div>;
};

export default Path;

/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useRoutes } from 'react-router-dom';

import { config } from './config';

export const RouterView = () => {
  const routes = useRoutes(config);

  return <div>{routes}</div>;
};

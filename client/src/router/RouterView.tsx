/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useRoutes } from 'react-router-dom';

import { config } from './config';
import { Toaster } from '@/components/ui/toaster';

export const RouterView = () => {
  const routes = useRoutes(config);

  return (
    <div>
      {routes}
      <Toaster />
    </div>
  );
};

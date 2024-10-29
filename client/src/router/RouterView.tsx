/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useRoutes } from 'react-router-dom';

import AppSidebar from '@/components/custom/AppSidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { config } from './config';

export const RouterView = () => {
  const routes = useRoutes(config);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>{routes}</SidebarInset>
        <Toaster />
      </SidebarProvider>
    </div>
  );
};

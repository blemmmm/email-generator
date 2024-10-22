/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useRoutes } from 'react-router-dom';

import { config } from './config';
import { Toaster } from '@/components/ui/toaster';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/custom/AppSidebar/AppSidebar';

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

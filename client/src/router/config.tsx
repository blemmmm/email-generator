import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTES } from './routes';
import Paraphraser from '@/pages/Paraphraser';
import EmailGenerator from '@/pages/EmailGenerator';
import Translate from '@/pages/Translate';

export const config: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={ROUTES.EMAIL_GENERATOR} />,
  },
  {
    path: '/*',
    element: <Navigate to={ROUTES.EMAIL_GENERATOR} />,
  },
  {
    path: ROUTES.EMAIL_GENERATOR,
    element: <EmailGenerator />,
  },
  {
    path: ROUTES.PARAPHRASER,
    element: <Paraphraser />,
  },
  {
    path: ROUTES.TRANSLATE,
    element: <Translate />,
  },
];

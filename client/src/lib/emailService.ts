import { z } from 'zod';
import { CONFIG } from './config';
import { ENDPOINTS } from './endpoints';
import { emailSchema } from './schema/emailSchema';

export type EmailGenerationService = z.infer<typeof emailSchema>;

export const useEmailGenerationService = () => {
  const generateEmail = async (payload: EmailGenerationService) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      CONFIG.BASE_API_URL + ENDPOINTS.GENERATE_EMAIL,
      requestOptions,
    );
    const data = await response.json();
    return data;
  };

  return {
    generateEmail,
  };
};

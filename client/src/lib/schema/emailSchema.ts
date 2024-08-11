import { z } from 'zod';

export const emailSchema = z.object({
  emailType: z.string(),
  recipient: z.string(),
  subject: z.string(),
  emailContext: z.string(),
  tone: z.string(),
});

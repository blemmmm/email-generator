import { create } from 'zustand';
import { EmailGenerationService } from '../emailService';

export interface FormStore {
  content: string;
  setContent: (content: string) => void;
  emailForm?: EmailGenerationService;
  setEmailForm: (emailForm: EmailGenerationService) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  content: '',
  setContent: (content: string) => set({ content }),
  emailForm: undefined,
  setEmailForm: (emailForm: EmailGenerationService) => set({ emailForm }),
}));

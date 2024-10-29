import EmailForm from '@/components/custom/EmailForm';
import EmailPreview from '@/components/custom/EmailPreview';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CONFIG } from '@/lib/config';
import { EmailGenerationService } from '@/lib/emailService';
import { ENDPOINTS } from '@/lib/endpoints';
import { useFormStore } from '@/lib/zustand/formStore';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';

const HomePage = () => {
  const { setEmailForm } = useFormStore();
  const textRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const xhr = new XMLHttpRequest();

  const [content, setContent] = useState('');

  const form = useForm<EmailGenerationService>({
    defaultValues: {
      emailType: '',
      recipient: '',
      subject: '',
      emailContext: '',
      tone: '',
    },
  });

  const handleGenerateEmail = async (payload: EmailGenerationService) => {
    setEmailForm(undefined);
    setContent('');
    setEmailForm(payload);

    xhr.open('POST', CONFIG.BASE_API_URL + ENDPOINTS.GENERATE_EMAIL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(JSON.stringify(payload));
    xhr.onprogress = () => {
      if (textRef && textRef.current) {
        textRef.current.scrollTop = textRef.current.scrollHeight;
      }
      setContent(xhr.responseText);
    };
  };

  const handleEdit = (updatedContent: string) => {
    setContent(updatedContent);
  };

  return (
    <div className="lg:h-[calc(100vh-1rem)] h-full relative">
      <SidebarTrigger className="lg:hidden absolute left-2 top-2 text-neutral-300" />
      <div className=" h-full w-full grid grid-cols-1 lg:grid-cols-[320px,auto]">
        <div className="flex flex-col justify-between py-8 px-6 h-full">
          <EmailForm form={form} handleGenerateEmail={handleGenerateEmail} />
        </div>
        <div className="flex flex-col justify-between px-6 py-8 h-full">
          <EmailPreview
            content={content}
            handleEdit={handleEdit}
            textRef={textRef}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

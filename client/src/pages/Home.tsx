import EmailForm from '@/components/custom/EmailForm';
import EmailPreview from '@/components/custom/EmailPreview';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { CONFIG } from '@/lib/config';
import { EmailGenerationService } from '@/lib/emailService';
import { ENDPOINTS } from '@/lib/endpoints';
import { useFormStore } from '@/lib/zustand/formStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const HomePage = () => {
  const { setEmailForm } = useFormStore();

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
      setContent(xhr.responseText);
    };
  };

  const handleEdit = (updatedContent: string) => {
    setContent(updatedContent);
  };

  const allFields = form.watch();

  const allFieldsFilled = Object.values(allFields).every(
    (value) => value !== '',
  );

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          className="flex flex-col justify-between py-8 px-6"
        >
          <EmailForm form={form} />
          <Button
            className="w-full"
            disabled={allFieldsFilled ? false : true}
            onClick={() => handleGenerateEmail(form.getValues())}
          >
            Generate Content
          </Button>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex flex-col justify-between px-6 py-8 ">
          <EmailPreview content={content} handleEdit={handleEdit} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomePage;

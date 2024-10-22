import EmailForm from '@/components/custom/EmailForm';
import EmailPreview from '@/components/custom/EmailPreview';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { toast } from '@/components/ui/use-toast';
import { CONFIG } from '@/lib/config';
import {
  EmailGenerationService,
  useEmailGenerationService,
} from '@/lib/emailService';
import { ENDPOINTS } from '@/lib/endpoints';
import { useFormStore } from '@/lib/zustand/formStore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { set } from 'zod';

const HomePage = () => {
  const { generateEmail } = useEmailGenerationService();
  const { mutateAsync: generateEmailMutation } = useMutation(generateEmail);
  const { setEmailForm } = useFormStore();

  const xhr = new XMLHttpRequest();

  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setEmailForm(payload);
    // generateEmailMutation(payload, {
    //   onSuccess: (data: { response: string; success: boolean }) => {
    //     if (data.success) {
    //       setContent(data.response);
    //       setEmailForm(payload);
    //     }
    //   },
    //   onError: () => {
    //     toast({
    //       title: 'Something went wrong',
    //       description: 'Please try again later',
    //       variant: 'destructive',
    //     });
    //   },
    // });
    xhr.open('POST', CONFIG.BASE_API_URL + ENDPOINTS.GENERATE_EMAIL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(JSON.stringify(payload));
    xhr.onprogress = () => {
      setIsLoading(false);
      // const response = JSON.parse(xhr.responseText);
      // console.log(xhr.responseText);
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

  useEffect(() => {
    console.log(content);
  }, [content]);

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
          <EmailPreview
            isLoading={isLoading}
            content={content}
            handleEdit={handleEdit}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomePage;

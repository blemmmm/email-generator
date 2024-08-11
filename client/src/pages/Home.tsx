import EmailForm from '@/components/custom/EmailForm';
import EmailPreview from '@/components/custom/EmailPreview';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { toast } from '@/components/ui/use-toast';
import {
  EmailGenerationService,
  useEmailGenerationService,
} from '@/lib/emailService';
import { useFormStore } from '@/lib/zustand/formStore';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const HomePage = () => {
  const { generateEmail } = useEmailGenerationService();
  const { mutateAsync: generateEmailMutation } = useMutation(generateEmail);
  const { setContent, setEmailForm } = useFormStore();

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
    generateEmailMutation(payload, {
      onSuccess: (data: { response: string; success: boolean }) => {
        if (data.success) {
          setContent(data.response);
          setEmailForm(payload);
        }
      },
      onError: () => {
        toast({
          title: 'Something went wrong',
          description: 'Please try again later',
          variant: 'destructive',
        });
      },
    });
  };

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
            onClick={() => handleGenerateEmail(form.getValues())}
          >
            Generate Content
          </Button>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex flex-col justify-between px-6 py-8 ">
          <EmailPreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomePage;

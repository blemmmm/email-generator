import { toast } from '@/components/ui/use-toast';

const handleFallbackCopy = (documentHtml: string, desc?: string) => {
  const dummyElement = document.createElement('textarea');
  dummyElement.innerHTML = documentHtml;
  document.body.appendChild(dummyElement);
  dummyElement.select();
  document.execCommand('copy');
  document.body.removeChild(dummyElement);
  toast({
    title: 'Success',
    description: desc || 'Message copied!',
  });
};

export const copyText = (textString: string, desc?: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textString);
    toast({
      title: 'Success',
      description: desc || 'Message copied!',
    });
  } else {
    handleFallbackCopy(textString);
  }
};

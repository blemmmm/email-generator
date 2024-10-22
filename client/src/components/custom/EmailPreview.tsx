import { copyText } from '@/lib/utils/copyText';
import { useFormStore } from '@/lib/zustand/formStore';
import { ClipboardCopy, SaveIcon, SparklesIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface EmailPreviewProps {
  content: string;
  handleEdit: (updatedContent: string) => void;
}

const EmailPreview = ({ content, handleEdit }: EmailPreviewProps) => {
  const { emailForm } = useFormStore();

  const handleCreateTextFile = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${emailForm?.subject.replace(/\s/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadEmail = () => {
    if (content) {
      handleCreateTextFile(content);
    }
  };

  return (
    <div className="h-full px-6">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex flex-col gap-1  divide-y divide-neutral-300 flex-1">
          <div className="flex items-center gap-2 py-1 text-sm text-neutral-500 w-full">
            To:{' '}
            {emailForm ? (
              <Badge variant={`outline`}>{emailForm?.recipient}</Badge>
            ) : null}
          </div>

          <div className="flex items-center gap-2 py-1 text-sm text-neutral-500 w-full">
            Subject:{' '}
            <span className="text-neutral-900">{emailForm?.subject}</span>
          </div>
          <div></div>
        </div>
        <Button className="h-[68px] w-fit">
          <a
            href={`mailto:${emailForm?.recipient}?subject=${encodeURIComponent(emailForm?.subject || '')}&body=${encodeURIComponent(content || '')}`}
          >
            Send
          </a>
        </Button>
      </div>

      {content !== '' ? (
        <div className="mt-6">
          <div className="absolute right-12 flex items-center justify-end gap-2">
            <Button
              variant={`outline`}
              className="p-2 z-50"
              onClick={() => copyText(content)}
            >
              <ClipboardCopy size={18} />
            </Button>
            <Button
              variant={`outline`}
              className="p-2 z-50"
              onClick={() => handleDownloadEmail()}
            >
              <SaveIcon size={18} />
            </Button>
          </div>
          <Textarea
            className=" relative h-[76dvh] shadow-none resize-none outline-none focus-visible:ring-0 border-none mb-4 whitespace-pre-line break-words text-sm leading-7"
            value={content}
            contentEditable
            // ref={emailRef}
            onChange={(e) => handleEdit(e.target.value)}
            suppressContentEditableWarning={true}
          />
        </div>
      ) : (
        <div className="mt-6 h-[82dvh] bg-neutral-50 rounded-lg flex flex-col items-center justify-center gap-2">
          <SparklesIcon color="gold" />

          <span className="font-semibold text-neutral-400">
            Get started by providing your email details
          </span>
        </div>
      )}
    </div>
  );
};

export default EmailPreview;

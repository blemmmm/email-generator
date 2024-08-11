import { useFormStore } from '@/lib/zustand/formStore';
import { Button } from '../ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '../ui/badge';

const EmailPreview = () => {
  const { content, emailForm } = useFormStore();
  //   const initialValue = [
  //     {
  //       id: '1',
  //       type: ELEMENT_PARAGRAPH,
  //       children: [{ text: 'Hello, World!' }, { text: 'This is a test email.' }],
  //     },
  //   ];

  return (
    <div className="h-full px-6 overflow-y-auto">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex flex-col gap-1  divide-y divide-neutral-300 flex-1">
          <div className="flex items-center gap-2 py-1 text-sm text-neutral-500 w-full">
            To:{' '}
            {emailForm ? (
              <Badge variant={`outline`}>{emailForm?.recipient}</Badge>
            ) : null}
          </div>

          <div className="flex items-center py-1 text-sm text-neutral-500 w-full">
            Subject: {emailForm?.subject}
          </div>
          <div></div>
        </div>
        <Button className="h-[68px] w-fit">Send</Button>
      </div>

      <div className="h-auto my-6 outline-none" contentEditable>
        {/* <EmailEditor initialValue={initialValue} /> */}
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => (
              <h1
                className="text-4xl font-extrabold tracking-tight lg:text-5xl"
                {...props}
              >
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2
                className="pb-2 text-[1.25rem] font-semibold tracking-tight first:mt-0"
                {...props}
              >
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 className="text-2xl font-semibold tracking-tight" {...props}>
                {children}
              </h3>
            ),
            h4: ({ children, ...props }) => (
              <h4 className="text-xl font-semibold tracking-tight" {...props}>
                {children}
              </h4>
            ),
            ul: ({ children, ...props }) => (
              <ul className="list-disc ml-5 mt-1 mb-2" {...props}>
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol className="list-decimal ml-5 mt-1 mb-2" {...props}>
                {children}
              </ol>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
                {children}
              </blockquote>
            ),
            p: ({ children, ...props }) => (
              <p
                className="mb-4 whitespace-pre-line break-words text-sm leading-7"
                {...props}
              >
                {children}
              </p>
            ),
            a: ({ children, ...props }) => {
              return <a {...props}>{children}</a>;
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmailPreview;

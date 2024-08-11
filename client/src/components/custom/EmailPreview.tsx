import { Button } from '../ui/button';
const EmailPreview = () => {
  //   const initialValue = [
  //     {
  //       id: '1',
  //       type: ELEMENT_PARAGRAPH,
  //       children: [{ text: 'Hello, World!' }, { text: 'This is a test email.' }],
  //     },
  //   ];

  return (
    <div className="h-full px-6">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex flex-col gap-1  divide-y divide-neutral-300 flex-1">
          <div className="flex items-center py-1 text-sm text-neutral-500 w-full">
            To:
          </div>

          <div className="flex items-center py-1 text-sm text-neutral-500 w-full">
            Subject:
          </div>
          <div></div>
        </div>
        <Button className="h-[60px] w-fit">Send</Button>
      </div>

      <div className="h-full my-6">
        {/* <EmailEditor initialValue={initialValue} /> */}
      </div>
    </div>
  );
};

export default EmailPreview;

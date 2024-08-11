import EmailForm from '@/components/custom/EmailForm';
import EmailPreview from '@/components/custom/EmailPreview';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const HomePage = () => {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          className="flex flex-col justify-between py-8 px-6"
        >
          <EmailForm />
          <Button className="w-full">Generate</Button>
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

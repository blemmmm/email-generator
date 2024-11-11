import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { CONFIG } from '@/lib/config';
import { ENDPOINTS } from '@/lib/endpoints';
import { copyText } from '@/lib/utils/copyText';
import { Copy, Eraser } from 'lucide-react';
import { useState } from 'react';

const TONES = ['Standard', 'Fluent', 'Formal', 'Academic', 'Simple', 'Casual'];

const Paraphraser = () => {
  const xhr = new XMLHttpRequest();
  const [tone, setTone] = useState('Standard');
  const [text, setText] = useState('');
  const [content, setContent] = useState('');

  const handleParaphrase = (payload: { text: string; tone: string }) => {
    xhr.open('POST', CONFIG.BASE_API_URL + ENDPOINTS.PARAPHRASER, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(JSON.stringify(payload));
    xhr.onprogress = () => {
      setContent(xhr.responseText);
    };
  };

  const handleClear = () => {
    setText('');
    setContent('');
    setTone('Standard');
  };

  return (
    <div className="lg:h-[calc(100vh-1rem)] h-full py-8 px-6 relative">
      <SidebarTrigger className="lg:hidden absolute left-2 top-2 text-neutral-300" />
      <div className="flex flex-col gap-y-4 h-full">
        <h1 className="text-3xl font-bold">Paraphraser</h1>
        <p className="text-muted-foreground">
          Correct your grammar and spelling errors
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Label>Tone:</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="lg:w-[180px] w-[150px]">
                    <SelectValue placeholder="Select Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((item) => (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleParaphrase({ text, tone })}>
                Paraphrase
              </Button>
            </div>

            <Textarea
              placeholder="Enter your text here"
              className="lg:h-[70dvh] h-[25dvh]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-end gap-2 w-full">
              <Button variant={`outline`} onClick={() => copyText(content)}>
                <Copy />
              </Button>
              <Button variant={`outline`} onClick={() => handleClear()}>
                <Eraser />
              </Button>
            </div>
            <Textarea
              className=" relative lg:h-[70dvh] h-[25dvh] shadow-none resize-none outline-none focus-visible:ring-0 border-none mb-4 whitespace-pre-line break-words text-sm leading-7"
              contentEditable
              suppressContentEditableWarning={true}
              placeholder="Results will appear here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paraphraser;

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
import { useDebounce } from '@/lib/utils/useDebounce';
import { Copy, Eraser } from 'lucide-react';
import { useEffect, useState } from 'react';
import { text } from 'stream/consumers';

type LanguageMap = Record<string, string>;

const Translate = () => {
  const xhr = new XMLHttpRequest();

  const [languages, setLanguages] = useState<LanguageMap>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [text, setText] = useState('');
  const [content, setContent] = useState('');

  const fetchLanguages = async () => {
    const response = await fetch('/languages.json');
    const data = await response.json();
    return data;
  };

  const handleTranslate = (payload: { text: string; language: string }) => {
    xhr.open('POST', CONFIG.BASE_API_URL + ENDPOINTS.TRANSLATE, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(JSON.stringify(payload));
    xhr.onprogress = () => {
      setContent(xhr.responseText);
    };
  };

  useEffect(() => {
    if (!languages) {
      fetchLanguages().then((data) => {
        setLanguages(data);
      });
    }
  }, []);

  return (
    <div className="lg:h-[calc(100vh-1rem)] h-full py-8 px-6 absolute">
      <SidebarTrigger className="lg:hidden absolute left-2 top-2 text-neutral-300" />
      <div className="flex flex-col gap-y-4 h-full">
        <h1 className="text-3xl font-bold">Translation</h1>
        <p className="text-muted-foreground">
          Translate text from one language to another
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Select value="auto" disabled>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto Detect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Textarea
              placeholder="Enter your text here"
              className="h-[70dvh]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-start gap-2 w-full">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages &&
                    Object.entries(languages).map(([key, value]) => (
                      <SelectItem value={value} key={key}>
                        {value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  if (selectedLanguage !== '' && text !== '') {
                    handleTranslate({
                      text,
                      language: selectedLanguage,
                    });
                  }
                }}
              >
                Translate
              </Button>
            </div>
            <Textarea
              className=" relative h-[70dvh] shadow-none resize-none outline-none focus-visible:ring-0 border-none mb-4 whitespace-pre-line break-words text-sm leading-7"
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

export default Translate;

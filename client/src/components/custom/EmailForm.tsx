import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

const EmailForm = () => {
  return (
    <div className="flex flex-col gap-y-4 h-full">
      <h1 className="text-3xl font-bold">Email Generator</h1>
      <p className="text-muted-foreground">
        Create and send emails with ease using our intuitive form.
      </p>
      <form className="space-y-4 mt-6">
        <div>
          <Label htmlFor="recipient">Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Resignation Email</SelectItem>
              <SelectItem value="dark">Thank you Email</SelectItem>
              <SelectItem value="system">Follow-up Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="recipient">Recipient Email</Label>
          <Input
            id="recipient"
            type="email"
            placeholder="example@email.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Email Subject" required />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Write your message here..."
            rows={5}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default EmailForm;

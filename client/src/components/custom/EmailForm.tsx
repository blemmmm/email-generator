import { EmailGenerationService } from '@/lib/emailService';
import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface EmailFormProps {
  form: UseFormReturn<EmailGenerationService, any, undefined>;
}

const EmailForm = ({ form }: EmailFormProps) => {
  return (
    <div className="flex flex-col gap-y-4 h-full">
      <h1 className="text-3xl font-bold">Email Generator</h1>
      <p className="text-muted-foreground">
        Create and send emails with ease using our intuitive form.
      </p>
      <Form {...form}>
        <form className="space-y-4 mt-6">
          <FormField
            control={form.control}
            name="emailType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Thank you Email">
                        Thank you Email
                      </SelectItem>
                      <SelectItem value="Follow-up Email">
                        Follow-up Email
                      </SelectItem>
                      <SelectItem value="Cover Letter">Cover Letter</SelectItem>
                      <SelectItem value="Resignation Letter">
                        Resignation Letter
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="recipient"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="subject"
                    placeholder="Email Subject"
                    required
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailContext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Context of the Email</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="emailContext"
                    placeholder="Be specific and detailed about the context of the email"
                    rows={5}
                    required
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default EmailForm;

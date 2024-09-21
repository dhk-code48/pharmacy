import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import createFeedBack from "@/actions/createFeedBack";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FeedBackTypes = ["QUESTION", "PROBLEM", "SUGGESTION"];

export const FeedBackFormSchema = z.object({
  title: z.string(),
  message: z.string(),
  type: z.enum(["QUESTION", "PROBLEM", "SUGGESTION"]),
});
export type FeedBackFormValues = z.infer<typeof FeedBackFormSchema>;

const FeedBackForm = () => {
  const form = useForm<FeedBackFormValues>({
    resolver: zodResolver(FeedBackFormSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: FeedBackFormValues) {
    startTransition(() => {
      toast.promise(createFeedBack(data), {
        loading: "Submitting your feedback...",
        success: () => {
          form.reset({
            message: "",
            title: "",
            type: "PROBLEM",
          });
          return "Your feedback has been submitted!";
        },
        error: (error) => {
          console.log("ERROR => ", error);
          return error?.message || "Unexpected Error Ocurred, Try Again";
        },
      });
    });
  }

  return (
    <div className="space-y-5">
      <strong className="text-sm">Feedback</strong>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    <SelectItem value="QUESTION">Question</SelectItem>
                    <SelectItem value="PROBLEM">Problem</SelectItem>
                    <SelectItem value="SUGGESTION">Suggestion</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Give title to your feedback" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Provide your feedback" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FeedBackForm;

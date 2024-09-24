import React, { useState } from "react";
import * as z from "zod";
import { StarInput } from "../ui/rating";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import submitReview from "@/actions/user/submitReview";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ReviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});
export type ReviewFormValues = z.infer<typeof ReviewFormSchema>;

const ReviewForm = ({ pharmacyId }: { pharmacyId: number }) => {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const [isOpen, setOpen] = useState<boolean>(false);
  function onSubmit(data: ReviewFormValues) {
    toast.promise(submitReview(data, pharmacyId), {
      loading: "Updating your information...",
      success: () => {
        form.reset({
          comment: "",
          rating: 0,
        });
        setOpen(false);
        return "Review Submitted!!";
      },
      error: (error) => error?.message || "Unexpected Error, Try Again",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.star className="size-4" />
          Review Pharmacy
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-sm p-2">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate Pharmacy Service</FormLabel>
                  <FormControl>
                    <StarInput variant="yellow" rating={field.value} onChange={(e) => field.onChange(e)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Give Your Review</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;

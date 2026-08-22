"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaPaperPlane } from "react-icons/fa";
import { useFetcher } from "react-router";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactForm() {
  const fetcher = useFetcher<{ success: boolean; error?: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Monitor fetcher state to update UI
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setIsSubmitting(true);
    } else if (fetcher.state === "idle" && fetcher.data) {
      setIsSubmitting(false);
      if (fetcher.data.success) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
        console.error("Email Error:", fetcher.data.error);
      }
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Submit to the server action in home.tsx
    fetcher.submit(values, { method: "post" });
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-mono">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  {"> "}Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="bg-background border-border rounded-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:border-brand-primary font-sans"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  {"> "}Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background border-border rounded-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:border-brand-primary font-sans"
                    {...field}
                  />
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
                <FormLabel className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  {"> "}Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message here..."
                    className="min-h-[150px] bg-background border-border rounded-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:border-brand-primary resize-none font-sans"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-background rounded-none font-mono font-semibold tracking-[0.15em] uppercase py-6 transition-all"
          >
            {isSubmitting ? (
              "Transmitting..."
            ) : (
              <>
                [ Send Message <FaPaperPlane className="ml-2 h-3.5 w-3.5" /> ]
              </>
            )}
          </Button>

          {submitStatus === "success" && (
            <div className="p-4 border border-brand-primary/40 bg-brand-primary/10 text-brand-primary text-center animate-fade-in text-xs tracking-wide">
              $ message_sent — status: 200_OK
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 border border-destructive/40 bg-destructive/10 text-destructive text-center animate-fade-in text-xs tracking-wide">
              $ transmission_failed — please try again
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FancyButton } from "@/components/ui/fancy-button";
import {
  quickContactSchema,
  type QuickContactValues,
} from "@/lib/validators/contact";

const FIELDS = [
  {
    name: "name",
    label: "Full Name",
    icon: "tg-icon-user-1",
    type: "text",
    placeholder: "Thomas Alison",
  },
  {
    name: "email",
    label: "Email Address",
    icon: "tg-icon-email",
    type: "email",
    placeholder: "thomas@domain.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    icon: "tg-icon-phone-call",
    type: "text",
    placeholder: "+12 (00) 123 4567 890",
  },
  {
    name: "subject",
    label: "Subject",
    icon: "tg-icon-edit",
    type: "text",
    placeholder: "Subject",
  },
] as const;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<QuickContactValues>({
    resolver: zodResolver(quickContactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (values: QuickContactValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.subject,
          message: values.message,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error ?? "Something went wrong");
      }

      toast.success("Thanks — your message is on its way.");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not send your message. Please try again.",
      );
    }
  };

  const onInvalid = () => {
    toast.error("Please check the highlighted fields and try again.");
  };

  return (
    <form className="contact-one__form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="tg-row">
        {FIELDS.map((field) => (
          <div className="tg-col-lg-6" key={field.name}>
            <h4 className="contact-one__input-title">{field.label}</h4>
            <div className="contact-one__input-box">
              <div className="contact-one__input-icon">
                <span className={field.icon} />
              </div>
              <input
                type={field.type}
                placeholder={field.placeholder}
                aria-label={field.label}
                {...register(field.name)}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <h4 className="contact-one__input-title">Inquiry about </h4>
        <div className="contact-one__input-box text-message-box">
          <div className="contact-one__input-icon">
            <span className="tg-icon-edit" />
          </div>
          <textarea
            rows={4}
            placeholder="Write your message"
            aria-label="Inquiry about"
            {...register("message")}
          />
        </div>
        <div className="contact-one__btn-box">
          <FancyButton
            variant="gradient"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit Now"}
          </FancyButton>
        </div>
      </div>
    </form>
  );
}

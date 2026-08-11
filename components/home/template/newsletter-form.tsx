"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error ?? "Something went wrong");
      }

      toast.success("You're subscribed — thanks for joining.");
      setEmail("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not subscribe. Please try again.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="site-footer__newsletter-form" onSubmit={handleSubmit}>
      <div className="site-footer__newsletter-input">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email address"
          aria-label="Email address"
        />
      </div>
      <button
        type="submit"
        className="site-footer__newsletter-btn"
        disabled={pending}
        aria-label="Subscribe"
      >
        <span className="tg-icon-right-arrow" />
      </button>
      <div className="checked-box">
        <input type="checkbox" name="privacy" id="footer-privacy" defaultChecked />
        <label htmlFor="footer-privacy">
          <span />
          by Subscribing. You Accept Privacy Policy
        </label>
      </div>
    </form>
  );
}

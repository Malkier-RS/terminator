"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

interface ContactProps {
  dict: Dictionary;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "success" | "error";
  message: string;
}

const inputClassName =
  "w-full border-0 border-b border-white/10 bg-transparent px-0 py-3 text-brand-white outline-none transition-colors placeholder:text-brand-muted/50 focus:border-brand-accent";

export function Contact({ dict }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus({ type: "success", message: dict.contact.form.success });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus({ type: "error", message: dict.contact.form.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryContacts = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.773v2.25z" />
        </svg>
      ),
      label: dict.contact.phone,
      href: `tel:${dict.contact.phone.replace(/\s/g, "")}`,
      value: dict.contact.phone,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: dict.contact.email,
      href: `mailto:${dict.contact.email}`,
      value: dict.contact.email,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: "Google Maps",
      href: "https://maps.google.com/?q=Terminator+Fitness+Skopje",
      value: "Skopje, North Macedonia",
    },
  ];

  const socialLinks = [
    ...dict.contact.instagramAccounts.map((account) => ({
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: account.name,
      href: account.url,
      value: account.handle,
    })),
    {
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      label: dict.contact.facebook,
      href: dict.contact.facebookUrl,
      value: dict.contact.facebook,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-brand-black">
      <div className="container-max">
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase tracking-wider text-brand-white sm:text-5xl lg:text-6xl">
            {dict.contact.title}
          </h2>
          <p className="mt-4 text-lg text-brand-muted">{dict.contact.subtitle}</p>
          <div className="mx-auto mt-6 h-1 w-16 bg-brand-accent" />
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <form onSubmit={handleSubmit} className="order-1">
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted"
                >
                  {dict.contact.form.name}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  suppressHydrationWarning
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted"
                >
                  {dict.contact.form.email}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  suppressHydrationWarning
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted"
                >
                  {dict.contact.form.phone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  suppressHydrationWarning
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted"
                >
                  {dict.contact.form.message}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  suppressHydrationWarning
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClassName} resize-none`}
                />
              </div>
            </div>

            {status.message && (
              <p
                className={`mt-6 text-sm ${
                  status.type === "success" ? "text-brand-accent" : "text-brand-muted"
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              suppressHydrationWarning
              className="mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent transition-colors hover:text-brand-white disabled:opacity-50"
            >
              {isSubmitting ? "..." : dict.contact.form.submit}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>

          <div className="order-2 lg:pt-2">
            <div className="space-y-10">
              {primaryContacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-5 transition-colors"
                >
                  <span className="mt-0.5 text-brand-accent transition-colors group-hover:text-brand-white">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-brand-muted">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-lg text-brand-white transition-colors group-hover:text-brand-accent">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="my-10 h-px w-full bg-white/5" />

            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-brand-muted">
              {dict.contact.followUs}
            </p>

            <div className="space-y-8">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 transition-colors"
                >
                  <span className="text-brand-accent transition-colors group-hover:text-brand-white">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-sm text-brand-white transition-colors group-hover:text-brand-accent">
                      {item.value}
                    </span>
                    <span className="mt-0.5 block text-xs text-brand-muted">{item.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

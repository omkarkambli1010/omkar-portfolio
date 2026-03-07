'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Button from '@/components/ui/Button/Button';
import styles from './Contact.module.scss';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const MESSAGE_MAX = 500;

function validateField(name: keyof FormState, value: string): string | undefined {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      break;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
      break;
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.length > MESSAGE_MAX) return `Message must be under ${MESSAGE_MAX} characters`;
      break;
  }
}

function validateAll(data: FormState): FormErrors {
  return {
    name:    validateField('name',    data.name),
    email:   validateField('email',   data.email),
    message: validateField('message', data.message),
  };
}

function isValid(data: FormState): boolean {
  return !Object.values(validateAll(data)).some(Boolean);
}

function missingCount(data: FormState): number {
  return Object.values(validateAll(data)).filter(Boolean).length;
}

export default function ContactForm() {
  const formRef    = useRef<HTMLFormElement>(null);
  const [form,     setForm]     = useState<FormState>({ name: '', email: '', message: '' });
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [touched,  setTouched]  = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status,   setStatus]   = useState<SubmitStatus>('idle');
  const [btnClass, setBtnClass] = useState('');
  const prevValid = useRef(false);

  const formValid = isValid(form);

  // Pop animation when form becomes valid for the first time
  useEffect(() => {
    if (formValid && !prevValid.current) {
      setBtnClass(styles['submitBtn--ready']);
      const t = setTimeout(() => setBtnClass(''), 400);
      prevValid.current = true;
      return () => clearTimeout(t);
    }
    if (!formValid) prevValid.current = false;
  }, [formValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validateAll(form);
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs);
      // Shake the button
      setBtnClass(styles['submitBtn--shake']);
      setTimeout(() => setBtnClass(''), 450);
      return;
    }

    setStatus('loading');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          reply_to:   form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTouched({});
    } catch (err) {
      console.error('[EmailJS error]', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMsg}>
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h3>Message sent!</h3>
        <p>Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  const msgLen  = form.message.length;
  const missing = missingCount(form);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Name */}
      <div className={`${styles.field} ${errors.name ? styles['field--error'] : ''}`}>
        <label htmlFor="contact-name" className={styles.label}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
          placeholder="Your name"
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.errorMsg} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email */}
      <div className={`${styles.field} ${errors.email ? styles['field--error'] : ''}`}>
        <label htmlFor="contact-email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
          placeholder="your@email.com"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.errorMsg} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Message */}
      <div className={`${styles.field} ${errors.message ? styles['field--error'] : ''}`}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-message" className={styles.label}>
            Message <span aria-hidden="true">*</span>
          </label>
          <span className={`${styles.charCount} ${msgLen > MESSAGE_MAX ? styles['charCount--over'] : ''}`}>
            {msgLen}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Tell me about your project or just say hi..."
          rows={6}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className={styles.errorMsg} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {status === 'error' && (
        <p className={styles.submitError} role="alert">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      {/* Submit button wrapped for tooltip */}
      <div className={styles.submitWrapper}>
        {!formValid && (
          <span className={styles.tooltip} aria-hidden="true">
            {missing === 1 ? '1 field needs attention' : `${missing} fields need attention`}
          </span>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!formValid || status === 'loading'}
          className={`${styles.submitBtn} ${btnClass}`}
        >
          {status === 'loading' ? (
            <>
              <svg className={styles.spinner} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18} aria-hidden="true">
                <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              {formValid ? 'Send Message' : `Complete ${missing} field${missing > 1 ? 's' : ''}`}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={18} height={18} aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

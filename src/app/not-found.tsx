import Button from '@/components/ui/Button/Button';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.875rem',
          color: 'var(--color-accent)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: 'var(--font-display, system-ui)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
        }}
      >
        Page not found
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '40ch' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" variant="primary" size="md">
        Back to Home
      </Button>
    </div>
  );
}

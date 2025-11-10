import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        surface: 'var(--surface)',
        elev: 'var(--elev)',
        foreground: 'var(--text)',
        muted: 'var(--text-2)',
        gold: '#FFB84D',
        ok: '#22DD88',
        warn: '#F59E0B',
        err: '#EF4444',
        info: '#6EE7F3',
        primary: 'var(--gold)',
      },
      boxShadow: {
        glass: '0 12px 24px rgba(0,0,0,0.18), 0 32px 64px rgba(0,0,0,0.27)',
      },
      blur: {
        lg2: '20px',
        xl2: '40px',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      maxWidth: {
        content: '72rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config


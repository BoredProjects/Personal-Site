// app/layout.tsx
import './globals.css'; // your global CSS file
import type { ReactNode } from 'react';

export const metadata = {
  title: 'My Website',
  description: 'About Me Page',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

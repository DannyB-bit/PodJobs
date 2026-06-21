import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PodJobs.ai // AstronautSHE (PJS)',
  description: 'Explore the future of specialized, 12-agent AI Pod swarms under human orchestration.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
      style={{ colorScheme: 'dark' }}
    >
      <body 
        className="bg-[#03060B] text-slate-100 antialiased font-sans min-h-screen selection:bg-cyan-500/20 selection:text-cyan-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}


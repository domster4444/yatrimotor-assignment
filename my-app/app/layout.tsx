import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './styles/global.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Yatri Motors',
  description:
    'Discover the future of EV with Yatri. Our all-in-one solution empowers public to operate ev bikes in Nepal. Experience the difference today.',
  author: 'Kshitiz Shah',
  keywords: 'motors, bike, manufacture, electric vehicles, Nepal',
  url: 'https://www.yatrimotorcycles.com/',
  lang: 'en',
  type: 'website',
  robots: 'index, follow',
  twitter: {
    handle: '@yatri',
    site: '@yatrimotors',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content={metadata.type} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:creator" content={metadata.twitter.handle} />
        <title>{metadata.title}</title>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}


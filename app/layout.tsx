import type { Metadata } from "next";
import "@/styles/globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.neurosportsusa.com/#organization",
  "name": "NeuroSports USA",
  "url": "https://www.neurosportsusa.com",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.neurosportsusa.com"),
  title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
  description:
    "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "NeuroSports USA",
    locale: "en_US",
    title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
    description:
      "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
    url: "https://www.neurosportsusa.com",
  },
  twitter: {
    card: "summary",
    title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
    description:
      "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
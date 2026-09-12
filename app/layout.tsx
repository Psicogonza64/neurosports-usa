import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
  description:
    "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
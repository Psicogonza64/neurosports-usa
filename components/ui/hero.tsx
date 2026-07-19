import type { ReactNode } from "react";

type HeroProps = {
  left: ReactNode;
  right: ReactNode;
};

export function Hero({ left, right }: HeroProps) {
  return (
    <section className="border-b nsu-border" id="home">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-12 sm:px-6 md:gap-14 md:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:px-10 lg:py-16">
        {left}
        <div className="flex w-full items-center justify-center">{right}</div>
      </div>
    </section>
  );
}
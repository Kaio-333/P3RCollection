import { useCallback, useState } from "react";
import { BackgroundVideoSequence } from "./BackgroundVideoSequence";
import { PortfolioNavigation } from "./PortfolioNavigation";

export function PortfolioHero() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const revealPortfolio = useCallback(() => setIsIntroComplete(true), []);

  return (
    <main className="portfolio-page grid min-h-dvh place-items-center overflow-hidden bg-white">
      <section
        className="portfolio-stage relative isolate shrink-0 overflow-hidden bg-[#00138c]"
        aria-labelledby="portfolio-owner"
      >
        <BackgroundVideoSequence onIntroComplete={revealPortfolio} />

        {isIntroComplete && (
          <>
            <div className="name-rail absolute left-[11.458%] top-[4.444%] flex h-[76.111%] w-[15.625%] items-center justify-center mix-blend-multiply select-none">
              <h1
                id="portfolio-owner"
                className="owner-name whitespace-nowrap text-[15.625cqw] leading-none font-black tracking-[-0.075em] text-[#000292] select-none"
              >
                KAIO
              </h1>
            </div>

            <PortfolioNavigation />
          </>
        )}

        {!isIntroComplete && (
          <h1 id="portfolio-owner" className="sr-only">
            Kaio
          </h1>
        )}
      </section>
    </main>
  );
}

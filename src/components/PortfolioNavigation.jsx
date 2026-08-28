import { portfolioLinks } from "../data/portfolioLinks";

export function PortfolioNavigation() {
  return (
    <nav aria-label="Navegação principal">
      {portfolioLinks.map(
        ({ id, label, positionClass, color, blendMode, textScale }) => (
        <a
          key={id}
          className={`portfolio-link absolute left-1/2 ${positionClass}`}
          href={`#${id}`}
          style={{
            "--link-blend": blendMode,
            "--link-color": color,
            "--text-scale": textScale,
          }}
        >
          {label}
        </a>
        ),
      )}
    </nav>
  );
}

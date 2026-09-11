import { portfolioLinks } from "../data/portfolioLinks";

export function PortfolioNavigation() {
  return (
    <nav aria-label="Navegação principal">
      {portfolioLinks.map(
        ({ id, label, href, positionClass, color, blendMode, textScale }) => (
        <a
          key={id}
          className={`portfolio-link absolute left-1/2 ${positionClass}`}
          href={href ?? `#${id}`}
          target={href ? "_blank" : undefined}
          rel={href ? "noreferrer" : undefined}
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

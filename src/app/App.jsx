import { useEffect, useState } from "react";
import { CollectionPage } from "../components/CollectionPage";
import { PortfolioHero } from "../components/PortfolioHero";

export function App() {
  const [activePage, setActivePage] = useState(() =>
    window.location.hash.replace("#", ""),
  );

  useEffect(() => {
    const updatePage = () =>
      setActivePage(window.location.hash.replace("#", ""));

    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  if (activePage === "colecao") {
    return <CollectionPage />;
  }

  return <PortfolioHero />;
}

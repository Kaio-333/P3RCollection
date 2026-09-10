const assetUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

export const portfolioAssets = {
  logo: assetUrl("portfolio-logo.png"),
  headerTexture: assetUrl("portfolio-header-texture.png"),
};

export const portfolioProjects = [
  {
    id: "accessflow",
    number: "01",
    title: "ACCESSFLOW",
    eyebrow: "ACESSIBILIDADE / FRONT-END",
    accent: "#ff315f",
    titleColor: "#ff315f",
    titleBackground: "#d9d9d9",
    link: "https://github.com/Kaio-333/accessflow",
    images: [
      {
        src: assetUrl("portfolio-accessflow-ui.png"),
        alt: "Interface do AccessFlow para personalização de acessibilidade",
      },
      {
        src: assetUrl("portfolio-accessflow-award.png"),
        alt: "Equipe do AccessFlow premiada na Galeria de Projetos da PUCPR",
      },
    ],
    paragraphs: [
      "O AccessFlow foi um projeto voltado à acessibilidade web para melhorar a experiência de pessoas com deficiência visual, TDAH e dislexia. Utilizamos filtros de contraste e controle de escala tipográfica.",
      "Durante esse projeto, aprendi a procurar pessoas que realmente tinham um problema a ser resolvido e a ouvi-las, para fazer um produto que realmente ajudasse, e não apenas fazer algo por fazer.",
      "Fiquei encarregado do front-end porque queria me aprofundar nessa área. Afinal, gosto bastante de design (UI/UX) e quis aplicar isso no projeto. Creio que deu certo, mas quero aperfeiçoar isso ainda mais.",
    ],
  },
  {
    id: "elliptic-app",
    number: "02",
    title: "ELLIPTIC APP",
    eyebrow: "GRAFOS / JAVA / DADOS",
    accent: "#5f68e8",
    titleColor: "#f1f1f1",
    titleBackground: "#1a1d43",
    banner: assetUrl("portfolio-elliptic-banner.svg"),
    link: "https://github.com/hugoffs/Projeto-Colaborativo-2",
    images: [
      {
        src: assetUrl("portfolio-elliptic-graph.png"),
        alt: "Visualização de uma rede de grafos interconectados",
      },
    ],
    paragraphs: [
      "Uma aplicação de detecção de lavagem de dinheiro em transações de Bitcoin.",
      "Utilizando o dataset Elliptic, aplicamos fundamentos de grafos juntamente com estruturas de dados em Java.",
      "Nesse, em específico, aprendi a entender e a otimizar minhas aplicações para que consigam lidar com centenas de milhares de dados, no caso, as transações. Com muito esforço, conseguimos fazer o programa trabalhar de forma rápida e eficiente para ler as transações como grafos.",
    ],
  },
  {
    id: "irrigador-mqtt",
    number: "03",
    title: "IRRIGADOR MQTT",
    eyebrow: "IOT / AUTOMAÇÃO / SUSTENTABILIDADE",
    accent: "#86bf5f",
    titleColor: "#f1f1f1",
    titleBackground: "#2a431a",
    banner: assetUrl("portfolio-irrigador-banner.svg"),
    link: "https://github.com/hugoffs/progeto_final_experiencia_criativa",
    images: [
      {
        src: assetUrl("portfolio-irrigador-team.jpg"),
        alt: "Equipe apresentando o projeto do irrigador MQTT",
      },
    ],
    paragraphs: [
      "Desenvolvido como parte do nosso trabalho de Extensão e da disciplina de Experiência Criativa.",
      "A experiência apresenta uma solução para combater a ineficiência na irrigação dos campos agrícolas da universidade. Nosso objetivo foi automatizar a irrigação e integrar os irrigadores já instalados a sistemas de IoT, permitindo um gerenciamento de água mais preciso e sustentável.",
      "Aqui, aprendi a trabalhar sob pressão. No último dia, descobrimos muitos bugs que precisavam ser consertados urgentemente. Apenas 10 minutos antes da entrega, conseguimos corrigir, entregar e apresentar sem erros. Foi um nervosismo sem fim, mas aprendemos a lição kkkkk.",
    ],
  },
  {
    id: "portfolio-p3r",
    number: "04",
    title: "PORTFÓLIO / COLEÇÃO",
    eyebrow: "DESIGN / FRONT-END",
    accent: "#0004ff94",
    titleColor: "#0015ff",
    titleBackground: "#ffffffff",
    link: "https://github.com/Kaio-333/P3RCollection",
    images: [
      { src: assetUrl("portfolio-p3r-collection.png"), alt: "Página inicial da P3R Collection com o título e links principais" },
    ],
    paragraphs: [
      "Este projeto nasceu da minha vontade de explorar o desenvolvimento web moderno, principalmente o design.",
      "Nesse projeto, pude aprofundar meus conhecimentos em CSS e JavaScript, implementando animações e transições via Figma."
    ]
  },
  {
    id: "corsy",
    number: "05",
    title: "CORSY",
    eyebrow: "MÚSICA / FRONT-END / RUST",
    accent: "#53ffa9ff",
    titleColor: "#000000ff",
    titleBackground: "#ffffffff",
    link: "https://github.com/Kaio-333/Corsy",
    images: [
      { src: assetUrl("portfolio-corsy.png"), alt: "Página inicial do Corsy" },
    ],
    paragraphs: [
      "Este projeto nasceu da minha vontade de criar um aplicativo que não demandasse tantos recursos do computador enquanto eu fazia outras tarefas ouvindo música.",
      "Nesse projeto, pude aprofundar meus conhecimentos em Rust, front-end, criação de APIs e a fazer um aplicativo executável de verdade. E o melhor de tudo, não tem anúncios."
    ]
  },
  {
    id: "Stairs-Of-Hell",
    number: "06",
    title: "STAIRS OF HELL",
    eyebrow: "GAME DESIGN / LUAU / BLENDER / ANIMAÇÃO",
    accent: "#5a1d1bff",
    titleColor: "#7a3232ff",
    titleBackground: "#ffffffff",
    link: "https://www.roblox.com/games/139404412642357/Stairs-of-Hell",
    images: [
      { src: assetUrl("portfolio-stairs-of-hell.png"), alt: "Página do jogo no Roblox" },
    ],
    paragraphs: [
      "Nesse processo, aprendi game design, modelagem 3D e, principalmente, animações de rigs 3D. Acredito que esse processo foi um dos mais divertidos da minha vida, pois eu estava ao lado de alguém com quem gosto de trabalhar. Conseguimos, no final, 3.900 visitas no jogo e ficamos satisfeitos com o projeto final.",
    ]
  },
  {
    id: "Ditherscape",
    number: "07",
    title: "DITHERSCAPE",
    eyebrow: "CSS / SPOTIFY",
    accent: "#200000ff",
    titleColor: "#7a3232ff",
    titleBackground: "#ffffffff",
    link: "https://github.com/Kaio-333/Ditherscape",
    images: [
      { src: assetUrl("portifolio-ditherscape.png"), alt: "Imagem do tema no Spotify" },
    ],
    paragraphs: [
      "Tema personalizável para o spotify, foi apenas um trabalho one-shot para deixar o spotify mais com a minha cara."
    ]
  }
];

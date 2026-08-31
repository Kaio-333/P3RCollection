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
];

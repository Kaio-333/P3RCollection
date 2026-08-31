const assetUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

export const collectionCopy = {
  beginning:
    "Sou nascido em Belém do Pará. Acredito que foi onde eu aprendi a ser respeitoso e curioso com minha família, sempre me ensinaram o que é certo e errado, principalmente minha mãe e avó paterna. \n\n Sinto bastante saudade da família com quem convivi, até porque foram as pessoas que cresci. Desde criança, sempre fui tímido. Foi aí, então, que encontrei minha paz nos computadores.",
  creativity:
    "Desde cedo, na casa do meu primo mais velho, tive contato com computadores e, desde o primeiro contato, já fiquei curioso demais. Sempre queria ficar mexendo no computador, tentando entender o que cada coisa fazia e como fazia. \n\n Com isso, veio meu amor por jogos, principalmente Minecraft, onde minha criatividade era finalmente entendida, seja com redstone, blocos de comando ou mods. A redstone funciona basicamente como um sistema de circuitos lógicos dentro do jogo, enquanto os blocos de comando executam instruções. \n\nAlém disso, outro jogo que ajudou a alimentar minha curiosidade por programação sempre foi, sem dúvidas, o Roblox. No Roblox, sempre quis fazer meus jogos. Aprendendo de forma autodidata e vendo tutoriais quando tinha menos de 7 anos, aprendi a fazer jogos e também aprendi inglês, assistindo e traduzindo simultaneamente. Jogar Minecraft também me ajudou bastante a ser autodidata em inglês; aprendi muito por assimilação nesse jogo. Após inúmeros tutoriais de Roblox, eu finalmente consegui fazer algo que me divertiu na época. Surpreendentemente, o jogo funciona até hoje, em sua maior parte kkkkkkkkkk.",
  returnToRoblox:
    "Após 10 anos, reuni-me com um amigo que já trabalha na área para fazer um jogo, com o desafio de terminá-lo em 1 mês, novamente apenas pela diversão. Achei impressionante o quanto a engine do jogo avançou, mas, mesmo assim, fui aprender a mexer nela novamente. Nesse processo, aprendi game design, modelagem 3D e, principalmente, animações de rigs 3D. Acredito que esse processo foi um dos mais divertidos da minha vida, pois eu estava ao lado de alguém com quem gosto de trabalhar. Além de tudo, quando você gosta do que está fazendo, você faz com a alma. Conseguimos, no final, 3.900 visitas no jogo e ficamos satisfeitos com o projeto final. Minha vida sempre foi assim: gosto de aprender tudo o que me interessa, nem que seja apenas o básico. Isso me fez ir atrás de aprender a fazer músicas, modelagem 3D, animações em 3D apenas para esse jogo e programação, que nunca deixei de praticar.",
  circle:
    "Acho que grande parte da minha motivação vem justamente do meu círculo. Quando vejo pessoas fazendo coisas grandiosas, isso me anima demais. Ver pessoas próximas com a mesma sede de aprender e desenvolver coisas novas também me motiva. Tenho uma amiga que conheci jogando no Xbox 360 quando tínhamos por volta de 5 anos, e somos amigos até hoje. Sou bastante grato a ela por sempre apoiar as ideias que tenho e, principalmente, a um amigo meu chamado Dylan, com quem fiz o jogo do Roblox. Ver nosso progresso no jogo, cada um ajudando, elogiando ou dando feedback, fez o jogo avançar mais rápido. E agradecer a minha namorada com que me ajuda demais com inumeras coisas e me ajudou até mesmo a ter coragem de fazer essa página.",
  currentAchievement:
    "Hoje em dia, estou muito feliz por aplicar meus conhecimentos na faculdade e com meus amigos, que sempre são uma parte muito importante nesse processo para mim. Até chegamos ao segundo lugar na Galeria de Projetos da PUCPR, criando um site de acessibilidade para pessoas com baixa visão, TDAH e dislexia.",
  music:
    "Amo filmes e amo MUITO MÚSICA. Uma das minhas obsessões até hoje é o meu Last.fm:",
  scrobbles:
    "Conto com 121.400 músicas ouvidas desde 28 de janeiro de 2023.",
  albumsIntro: "Entre essas músicas, alguns álbuns de que gosto são:",
  valorant:
    "Um dos meus sonhos desde criança era ser jogador profissional de FPS. O jogo em que alcancei maior sucesso foi Valorant, no qual me esforcei demais. Sempre me esforço no que gosto e dou o meu máximo. (Obrigado, Kovaak's.)",
  immortal:
    "Cheguei ao Imortal (segundo maior rank) e continuo nele até hoje, mesmo em tempos de faculdade e trabalhos avulsos. Durante toda a minha vida, sempre gostei de salvar vídeos sobre experiências com amigos e sobre comparação de progresso, sejam jogos, risadas ou qualquer outra coisa.",
};

export const collectionMedia = {
  childhood: assetUrl("figma-raw-1.jpeg"),
  minecraft: assetUrl("figma-raw-3.png"),
  robloxClassic: assetUrl("roblox-classic.jpg"),
  zombieGame: assetUrl("jogo-zumbi.png"),
  createdAt: assetUrl("roblox-created-2015.png"),
  recentCreatedAt: assetUrl("roblox-created-2025.png"),
  recentGame: assetUrl("jogo-roblox-recente.png"),
  gameDemo: assetUrl("jogo-kumo.gif"),
  lastfm: assetUrl("lastfm.png"),
  personaWater: assetUrl("persona-water.jpeg"),
  sisterhoodEye: assetUrl("eye.png"),
  pucprAward: assetUrl("premiacao-pucpr.jpeg"),
  valorantReplay: assetUrl("valorant-replay.gif"),
  laughterVideo: assetUrl("video-risada.web.mp4"),
  sewerslvtBackdrop: assetUrl("sewerslvt-goodbye-loop.web.mp4"),
};

export const favoriteAlbums = [
  {
    title: "SISTERHOOD",
    artist: "Lucybedroque",
    cover: assetUrl("album-sisterhood.webp"),
    accent: "#b33258",
    audio: assetUrl("track-infinitude.mp3"),
    startAt: 150,
    theme: "sisterhood",
  },
  {
    title: "For The Rest Of Your Life",
    artist: "Twikipedia",
    cover: assetUrl("album-for-the-rest-of-your-life.jpg"),
    accent: "#f0f2ef",
    audio: assetUrl("track-dry-your-eyes.mp3"),
    startAt: 175,
    theme: "rest-of-life",
  },
  {
    title: "Unmusique",
    artist: "LucyBedroque",
    cover: assetUrl("album-unmusique.webp"),
    accent: "#ececec",
    audio: assetUrl("track-ignorant.mp3"),
    startAt: 17,
    theme: "unmusique",
  },
  {
    title: "we had good times together, don't forget that",
    artist: "Sewerslvt",
    cover: assetUrl("album-we-had-good-times.jpg"),
    accent: "#7d35ff",
    audio: assetUrl("track-her.mp3"),
    startAt: 143,
    theme: "we-had-good-times",
  },
];

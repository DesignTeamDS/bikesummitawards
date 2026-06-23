/* ============================================================
   BIKES SUMMIT AWARDS — main.js
   Interações do protótipo. Sem dependências externas.
   NOTA HANDOFF ELEMENTOR:
   - O grid de Categorias é renderizado a partir do array BSA_CATEGORIES.
     Em Elementor, isto corresponderia a um Loop Grid (CPT "Categorias")
     + Popup com os mesmos campos. Aqui usa-se JS apenas por ser protótipo.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     DADOS — 18 categorias (nomes traduzidos PT-PT)
     badge: 'panel' (Painel de Jurados) | 'public' (Voto Público) | 'team' (Equipa BSA)
     product: true => mostra campo "Produto" no formulário de inscrição
  --------------------------------------------------------- */
  const BSA_CATEGORIES = [
    {
      n: "01", name: "Marca de Bicicletas do Ano", badge: "panel",
      nominate: "Marcas de bicicletas ativas que tenham lançado pelo menos um novo modelo ou linha de produto significativa no último ano, demonstrando excelência, inovação e impacto positivo na indústria.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Inovação e visão", "abordagem visionária, com novos modelos, tecnologias ou atualizações que impulsionam o progresso da indústria."],
        ["Qualidade e design", "excelência consistente em materiais, fabrico, design e desempenho em toda a gama."],
        ["Impacto e relevância de mercado", "linha de produto relevante que responde às exigências do consumidor e às tendências."],
        ["Reputação e integridade", "posição na comunidade, práticas éticas e satisfação do cliente."]
      ],
      requirements: [
        "Declaração de apoio (máx. 200 palavras).",
        "Visão da marca e como orienta o desenvolvimento de produto.",
        "Novos modelos ou atualizações lançados no último ano e o que os torna inovadores.",
        "Como mantém qualidade consistente em toda a gama.",
        "Acordos de distribuição."
      ],
      excellence: [
        "Liderança de nicho com produtos recém-lançados.",
        "Apoio ativo a retalhistas independentes (IBDs).",
        "Colaboração / mentoria a novas marcas e talentos."
      ]
    },
    {
      n: "02", name: "Marca de Peças & Acessórios do Ano", badge: "panel",
      nominate: "Marcas de Peças & Acessórios (P&A) ativas que tenham lançado pelo menos um produto ou linha significativa no último ano, com excelência, inovação e impacto positivo.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Inovação e desenvolvimento", "novos produtos, tecnologias ou atualizações que elevam o padrão e resolvem necessidades reais."],
        ["Qualidade e fiabilidade", "excelência em materiais, fabrico e desempenho, garantindo durabilidade."],
        ["Relevância de mercado", "gama de P&A relevante face às tendências e exigências do consumidor."],
        ["Reputação e apoio", "posição na comunidade, ética e contributo positivo para o setor."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Visão da marca e como orienta o desenvolvimento de P&A.",
        "Produtos significativos lançados no último ano.",
        "Como mantém qualidade consistente em toda a gama.",
        "Acordos de distribuição."
      ],
      excellence: [
        "Liderança de nicho com novos produtos.",
        "Apoio e parcerias com IBDs (marketing/trade).",
        "Colaboração com marcas e talentos emergentes."
      ]
    },
    {
      n: "03", name: "Inovação do Ano", badge: "panel", product: true,
      nominate: "Qualquer empresa de ciclismo que tenha introduzido no mercado um produto, lançamento ou serviço verdadeiramente inovador a partir de 1 de janeiro de 2024.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Originalidade e inovação", "verdadeira novidade e criatividade da solução; avanço tecnológico no setor."],
        ["Impacto e sucesso de mercado", "adoção, impacto positivo e sucesso mensurável desde o lançamento."],
        ["Receção da indústria", "como foi recebida pelo trade, media e consumidores."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras) focada no produto/serviço.",
        "Descrição clara da inovação e o que a torna disruptiva.",
        "O problema que resolve ou as oportunidades que cria.",
        "Exemplos e dados quantificáveis de impacto desde o lançamento."
      ],
      excellence: [
        "Potencial disruptivo sobre práticas estabelecidas.",
        "Sustentabilidade ou impacto social.",
        "Escalabilidade e crescimento futuro."
      ]
    },
    {
      n: "04", name: "Distribuidor de Bicicletas do Ano", badge: "panel",
      nominate: "Distribuidores que oferecem consistentemente uma gama de bicicletas de qualidade e um histórico comprovado de serviço fiável, eficiente e de apoio aos parceiros de retalho.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Qualidade e amplitude da gama", "excelência e apelo das marcas e modelos oferecidos."],
        ["Excelência operacional", "processamento eficiente de encomendas, entrega rápida e embalagem profissional."],
        ["Apoio e parcerias", "qualidade do serviço e iniciativas que ajudam os retalhistas a crescer."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Política de serviço ao cliente e apoio aos parceiros.",
        "Marcas e produtos de destaque; acordos exclusivos.",
        "Como partilha conhecimento e perícia com os retalhistas."
      ],
      excellence: [
        "Envolvimento em eventos e iniciativas do setor.",
        "Apoio a marcas e talentos emergentes."
      ]
    },
    {
      n: "05", name: "Distribuidor de Peças & Acessórios do Ano", badge: "panel",
      nominate: "Distribuidores de P&A que oferecem uma gama diversa e de qualidade, com um histórico comprovado de serviço fiável e de apoio aos parceiros de retalho.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Qualidade e amplitude de P&A", "excelência das marcas e produtos; resposta às tendências."],
        ["Excelência operacional", "encomendas eficientes, entrega rápida e embalagem profissional."],
        ["Apoio e parcerias", "serviço e iniciativas que fazem crescer o segmento P&A dos parceiros."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Política de serviço ao cliente no setor P&A.",
        "Produtos de destaque e acordos exclusivos.",
        "Como partilha conhecimento e perícia com os retalhistas."
      ],
      excellence: [
        "Envolvimento em eventos e iniciativas do setor.",
        "Apoio a marcas e talentos emergentes de P&A."
      ]
    },
    {
      n: "06", name: "Distribuidor Especialista do Ano", badge: "panel",
      nominate: "Distribuidores com perícia e serviço excecionais num segmento focado — e-bikes, BMX, MTB, triatlo, cargo bikes, ciclismo adaptado ou componentes de gama alta.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Gama e perícia especializadas", "profundidade do portefólio no segmento específico."],
        ["Eficiência operacional", "logística e embalagem adaptadas aos produtos especialistas."],
        ["Apoio personalizado", "conhecimento técnico e serviços únicos para os retalhistas do nicho."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Política de serviço adaptada ao nicho.",
        "Produtos e marcas de destaque e o seu valor único.",
        "Como partilha conhecimento especializado com os parceiros."
      ],
      excellence: [
        "Defesa e crescimento do nicho (ex.: segurança e-bike, acesso a trilhos MTB).",
        "Sustentabilidade e inclusão.",
        "Apoio a eventos, clubes e comunidade do nicho."
      ]
    },
    {
      n: "07", name: "Retalhista Independente (IBD) do Ano", badge: "public",
      nominate: "Lojas físicas de bicicletas, ou negócios focados em reparação e manutenção, a operar com três lojas ou menos.",
      method: "Vencedor decidido por voto público aberto a toda a indústria.",
      criteria: [
        ["Serviço ao cliente excecional", "atendimento personalizado e relações fortes com o cliente."],
        ["Gama abrangente", "seleção curada de bicicletas, peças, acessórios e serviços."],
        ["Conhecimento da equipa", "staff qualificado que oferece aconselhamento de valor."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Filosofia de serviço e experiência do cliente.",
        "Gama de serviços e stock face à comunidade local.",
        "Conhecimento e perícia que distinguem o negócio."
      ],
      excellence: [
        "Estatuto de hub comunitário (group rides, workshops, eventos).",
        "Inovação no retalho.",
        "Crescimento sustentável e envolvimento local."
      ]
    },
    {
      n: "08", name: "Retalhista Omnicanal do Ano", badge: "panel",
      nominate: "Retalhistas que combinam presença física (bicicletas e/ou reparação) com uma loja online robusta e competitiva, oferecendo uma jornada coesa ao cliente.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Experiência omnicanal sem fricção", "operação integrada online e em loja, com inventário consistente."],
        ["Qualidade da gama e serviço", "oferta relevante de bicicletas, P&A e serviços, física e online."],
        ["Eficiência e logística", "fulfilment fiável e entrega rápida em todos os canais."],
        ["Perícia da equipa", "conhecimento técnico que apoia o cliente em qualquer canal."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Política de serviço consistente entre canais.",
        "Serviços e stock em loja e integração com o online.",
        "Como o website contribui para a experiência de compra."
      ],
      excellence: [
        "Construção de comunidade física e/ou digital.",
        "Inovação no retalho e crescimento do negócio.",
        "Apoio à indústria, caridade e eventos."
      ]
    },
    {
      n: "09", name: "Melhores Serviços para o Retalho", badge: "panel",
      nominate: "Empresas que prestam serviços B2B essenciais ao trade — formação, sistemas EPOS/inventário, software de bike fitting, soluções de oficina, marketing ou serviços financeiros.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Impacto e valor mensuráveis", "impacto quantificável na eficiência, lucro ou crescimento dos retalhistas."],
        ["Inovação e singularidade", "originalidade e distinção da solução."],
        ["Perícia e apoio", "conhecimento especializado partilhado para capacitar os clientes."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Descrição do serviço e como resolve desafios dos retalhistas.",
        "Exemplos e dados de impacto no último ano.",
        "Conhecimento e formação que a equipa oferece ao setor."
      ],
      excellence: [
        "Parceria ativa com IBDs.",
        "Alcance amplo através de múltiplas plataformas.",
        "Impacto visível e benéfico para o trade."
      ]
    },
    {
      n: "10", name: "Retalhista Especialista do Ano", badge: "panel",
      nominate: "Retalhistas que se destacam num segmento focado — e-bikes, cargo, gravel, MTB, track, builds personalizados, ciclismo adaptado, gama alta, vintage ou vestuário à medida.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Perícia e gama especializadas", "profundidade da gama e serviços; foco claro no nicho."],
        ["Serviço ao cliente excecional", "apoio e pós-venda adaptados ao cliente especialista."],
        ["Conhecimento da equipa", "formação e perícia que garantem aconselhamento autoritário."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Nicho e proposta de valor única.",
        "Abordagem ao serviço ao cliente.",
        "Gama de produtos e serviços especializados."
      ],
      excellence: [
        "Envolvimento e construção de comunidade.",
        "Inovação e disrupção no retalho.",
        "Crescimento e envolvimento na indústria."
      ]
    },
    {
      n: "11", name: "Prémio de Advocacia do Ciclismo", badge: "panel",
      nominate: "Organizações, iniciativas ou indivíduos que defendem o ciclismo — financiamento, educação, infraestrutura, segurança, participação ou mudanças de política que beneficiam o setor.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Impacto positivo na indústria", "benefícios mensuráveis para o setor do ciclismo."],
        ["Singularidade e inovação", "originalidade e distinção da abordagem."],
        ["Resultados alcançados", "marcos e sucessos significativos nos últimos 12 meses."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Descrição do serviço ou iniciativa de advocacia.",
        "Como beneficia a indústria do ciclismo.",
        "Exemplos e dados de impacto."
      ],
      excellence: [
        "Colaboração com IBDs.",
        "Alcance e envolvimento amplos.",
        "Influência mainstream e consciencialização pública."
      ]
    },
    {
      n: "12", name: "Campeão da Diversidade", badge: "team",
      nominate: "Indivíduo ou organização com compromisso e impacto mensurável em diversidade e inclusão na indústria do ciclismo — combatendo sub-representação e criando ambientes acolhedores.",
      method: "Vencedor decidido pela equipa Bikes Summit Awards.",
      criteria: [
        ["Âmbito e profundidade", "natureza, escala e compromisso de longo prazo das iniciativas."],
        ["Impacto demonstrável", "resultados concretos: representação, acesso e mudança cultural."],
        ["Liderança e influência", "papel como força motriz de mudança e inspiração."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Descrição do trabalho de diversidade e inclusão.",
        "Exemplos e dados de impacto positivo.",
        "Como serve de exemplo e inspiração ao setor."
      ],
      excellence: [
        "Remoção de barreiras a grupos sub-representados.",
        "Colaboração para amplificar esforços.",
        "Compromisso de longo prazo e interseccionalidade."
      ]
    },
    {
      n: "13", name: "Mulher do Ano", badge: "public",
      nominate: "Uma mulher com impacto profundo e demonstrável na indústria do ciclismo no último ano — em liderança, inovação, advocacia, crescimento de negócio ou comunidade.",
      method: "Vencedora decidida por voto público aberto a toda a indústria.",
      criteria: [
        ["Liderança e influência", "mudança positiva e padrões de excelência na indústria."],
        ["Inovação e visão", "contributo para novos produtos, serviços ou estratégias."],
        ["Advocacia e comunidade", "defesa de causas, diversidade e construção de comunidades."],
        ["Sucesso e inspiração", "crescimento de negócio e papel de mentoria/modelo."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras) — pela própria ou por terceiros.",
        "Exemplos de conquistas, iniciativas ou projetos.",
        "Resultados positivos e tangíveis do seu trabalho.",
        "Porque o seu contributo se destaca e inspira."
      ],
      excellence: [
        "Quebra de barreiras e de normas.",
        "Colaboração transversal no setor.",
        "Reconhecimento público e visão de longo prazo."
      ]
    },
    {
      n: "14", name: "Evento do Ano", badge: "public",
      nominate: "Qualquer evento, série ou encontro de ciclismo — feiras, provas (estrada, MTB, BMX, track), festivais, sportives, group rides ou consumer shows — com impacto positivo no último ano.",
      method: "Vencedor decidido por voto público aberto a toda a indústria.",
      criteria: [
        ["Experiência do participante", "qualidade, organização, ambiente e relação qualidade/preço."],
        ["Impacto e perfil na indústria", "contributo para promover o ciclismo e o trade."],
        ["Excelência operacional", "eficiência, segurança, sustentabilidade e profissionalismo."],
        ["Inovação e singularidade", "elementos distintivos que diferenciam o evento."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Descrição do evento: propósito, escala e público.",
        "Como entregou uma experiência excecional.",
        "Impacto na indústria, comunidade ou participação."
      ],
      excellence: [
        "Compromisso com sustentabilidade ou inclusão.",
        "Cobertura mediática e envolvimento público.",
        "Apoio a negócios locais e crescimento de adesão."
      ]
    },
    {
      n: "15", name: "Mecânico do Ano", badge: "public",
      nominate: "Mecânicos de bicicletas individuais com proficiência técnica excecional, excelente serviço ao cliente e paixão por manter os ciclistas em movimento.",
      method: "Vencedor decidido por voto público aberto a toda a indústria.",
      criteria: [
        ["Proficiência técnica", "conhecimento mecânico, diagnóstico e qualidade das reparações."],
        ["Serviço e comunicação", "clareza a explicar problemas e construir confiança."],
        ["Resolução e eficiência", "criatividade e gestão de tempo sem perder qualidade."],
        ["Profissionalismo e reputação", "rigor, aprendizagem contínua e boa reputação."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Áreas de perícia e especializações (e-bikes, suspensão, custom).",
        "Exemplos de serviço e comunicação excecionais.",
        "Um caso em que a perícia 'salvou o dia'.",
        "Compromisso com a aprendizagem contínua."
      ],
      excellence: [
        "Mentoria a mecânicos juniores.",
        "Práticas e ferramentas inovadoras de oficina.",
        "Contributo para a comunidade local."
      ]
    },
    {
      n: "16", name: "Herói Anónimo do Ano", badge: "public",
      nominate: "Um indivíduo com contributo significativo, mas muitas vezes despercebido — quem trabalha nos bastidores e é vital para a saúde e sucesso do trade.",
      method: "Vencedor decidido por voto público aberto a toda a indústria.",
      criteria: [
        ["Impacto nos bastidores", "resultados positivos, mesmo fora dos holofotes."],
        ["Dedicação e compromisso", "esforço sustentado para além das funções habituais."],
        ["Resolução e apoio", "superação de desafios e soluções de impacto profundo."],
        ["Carácter e inspiração", "humildade, resiliência e capacidade de inspirar."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Função e contributos específicos no último ano.",
        "Porque o contributo é 'anónimo' apesar da sua importância.",
        "Exemplos de impacto positivo na organização e setor."
      ],
      excellence: [
        "Apoio a diversidade, inclusão ou bem-estar.",
        "Defesa discreta de uma causa benéfica.",
        "Resiliência notável e mentoria informal."
      ]
    },
    {
      n: "17", name: "Media de Ciclismo do Ano", badge: "public",
      nominate: "Qualquer plataforma de media de ciclismo de Portugal — publicações, podcasts, revistas, websites, canais de YouTube ou redes sociais — com conteúdo consistente e envolvente.",
      method: "Vencedor decidido por voto público aberto a toda a indústria.",
      criteria: [
        ["Qualidade do conteúdo", "excelência, rigor, originalidade e relevância."],
        ["Envolvimento da audiência", "capacidade de atrair, reter e envolver uma audiência significativa."],
        ["Influência na indústria", "reputação como fonte de confiança que molda discussões."],
        ["Inovação multiplataforma", "novas tecnologias, formatos criativos e integração entre plataformas."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Missão, público-alvo e foco de conteúdo.",
        "Exemplos de conteúdo original e relevante do último ano.",
        "Provas de envolvimento e alcance (visitantes, subscritores, interações)."
      ],
      excellence: [
        "Histórias relevantes ou cobertura aprofundada.",
        "Forte sentido de comunidade.",
        "Defesa de diversidade, inclusão e sustentabilidade."
      ]
    },
    {
      n: "18", name: "Melhor Empresa de Cicloturismo", badge: "panel",
      nominate: "Empresas de cicloturismo — operadores de viagens, agências e organizadores de experiências de bicicleta — que ofereçam percursos, estadias ou pacotes de qualidade, promovendo o turismo sobre duas rodas.",
      method: "Vencedor decidido por painel de jurados.",
      criteria: [
        ["Qualidade da experiência", "excelência dos percursos, alojamento, apoio e organização ao longo de toda a viagem."],
        ["Inovação e singularidade", "propostas distintivas, roteiros originais e serviços que diferenciam a empresa."],
        ["Impacto e sustentabilidade", "contributo para o turismo local, práticas responsáveis e valorização do território."],
        ["Satisfação e reputação", "avaliações dos clientes, fidelização e reconhecimento no setor."]
      ],
      requirements: [
        "Declaração de apoio (máx. 300 palavras).",
        "Descrição da oferta de cicloturismo e públicos-alvo.",
        "Roteiros, pacotes ou experiências de destaque no último ano.",
        "Provas de satisfação dos clientes e impacto no turismo local."
      ],
      excellence: [
        "Parcerias com IBDs, marcas e comunidades locais.",
        "Compromisso com a sustentabilidade e o turismo responsável.",
        "Acessibilidade e inclusão nas experiências oferecidas."
      ]
    }
  ];

  window.BSA_CATEGORIES = BSA_CATEGORIES;

  const BADGE_LABEL = { panel: "Painel de Jurados", public: "Voto Público", team: "Equipa BSA" };

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------------------------------------------------------
     HEADER: scroll state + menu mobile + nav ativa
  --------------------------------------------------------- */
  const header = $(".bsa-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $(".bsa-burger");
  const nav = $(".bsa-nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      document.body.classList.toggle("bsa-menu-open", open);
      burger.setAttribute("aria-expanded", open);
    });
    $$(".bsa-nav__link", nav).forEach(l => l.addEventListener("click", () => {
      nav.classList.remove("is-open"); document.body.classList.remove("bsa-menu-open");
    }));
  }

  /* ---------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" })
    : null;
  const observeReveals = () => $$("[data-reveal]:not(.is-in)").forEach(el => io ? io.observe(el) : el.classList.add("is-in"));
  observeReveals();

  /* ---------------------------------------------------------
     TEASER de categorias (homepage) — pills com os nomes
  --------------------------------------------------------- */
  const catTeaser = $("#bsa-cat-teaser");
  if (catTeaser) {
    catTeaser.innerHTML = BSA_CATEGORIES.map(c =>
      `<a class="bsa-cat-pill" href="categorias.html#cat-${c.n}">${c.name}</a>`).join("");
  }

  /* ---------------------------------------------------------
     GALERIA DE HONRA — vencedores (simulação edição 2027)
     NOTA: logótipos/marcas e nomes são ilustrativos (protótipo).
  --------------------------------------------------------- */
  // [categoria, vencedor, 2.º lugar, 3.º lugar] — 2.º/3.º apenas em texto.
  // Categorias individuais (Mulher, Mecânico, Herói) têm só vencedor.
  const WINNERS_2027 = [
    ["Marca de Bicicletas do Ano", "VeloMax Bikes", "TerraCycle", "Norte Bike"],
    ["Marca de Peças & Acessórios do Ano", "CycloGear", "ProRide", "PedalTech"],
    ["Inovação do Ano", "AeroDrive Systems", "SmartWheel", "EcoCharge"],
    ["Distribuidor de Bicicletas do Ano", "IberBike Distribuição", "Roda Forte", "BiciCentral"],
    ["Distribuidor de Peças & Acessórios do Ano", "ProParts Iberia", "Atlantic Parts", "VeloSupply"],
    ["Distribuidor Especialista do Ano", "E-Volt Distribuição", "MTB Pro", "Gravel One"],
    ["Retalhista Independente (IBD) do Ano", "Bike Garage Lisboa", "Loja do Ciclista", "Oficina Norte"],
    ["Retalhista Omnicanal do Ano", "CicloStore", "BikeShop24", "Pedal Online"],
    ["Melhores Serviços para o Retalho", "RetailUp Solutions", "ShopFlow", "BikePOS"],
    ["Retalhista Especialista do Ano", "Gravel & Co.", "E-Bike Center", "Vintage Velo"],
    ["Prémio de Advocacia do Ciclismo", "Movimento +Bici", "Ruas Livres", "Pedalar Seguro"],
    ["Campeão da Diversidade", "Rodas para Todos", "Ciclismo Inclusivo", "Bike & All"],
    ["Mulher do Ano", "Helena Marques"],
    ["Evento do Ano", "Granfondo Atlântico", "Volta Urbana", "MTB Festival"],
    ["Mecânico do Ano", "Paulo Trindade"],
    ["Herói Anónimo do Ano", "Carla Sousa"],
    ["Media de Ciclismo do Ano", "Pedal Magazine", "Ciclo Podcast", "Duas Rodas TV"],
    ["Melhor Empresa de Cicloturismo", "Rota Vélo Tours", "Ibéria Bike Travel", "Trilhos & Pedais"]
  ];
  const winnersGrid = $("#bsa-winners-grid");
  if (winnersGrid) {
    const trophy = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.6V17c0 .5-.4 1-1 1.2C7.8 18.7 7 20.2 7 22"/><path d="M14 14.6V17c0 .5.5 1 1 1.2 1.2.5 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>';
    const initials = (n) => {
      const w = n.replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
      return (w.length >= 2 ? w[0][0] + w[1][0] : (w[0] || "").slice(0, 2)).toUpperCase();
    };
    winnersGrid.innerHTML = WINNERS_2027.map(([cat, name, second, third], i) => {
      const podium = (second || third) ? `
        <div class="bsa-winner-card__podium">
          ${second ? `<div class="bsa-winner-card__place"><span class="bsa-winner-card__pos">2.º</span><span class="bsa-winner-card__pname">${second}</span></div>` : ""}
          ${third ? `<div class="bsa-winner-card__place"><span class="bsa-winner-card__pos">3.º</span><span class="bsa-winner-card__pname">${third}</span></div>` : ""}
        </div>` : "";
      return `
      <article class="bsa-winner-card" data-reveal data-reveal-delay="${(i % 4) + 1}">
        <span class="bsa-winner-card__cat">${cat}</span>
        <div class="bsa-winner-card__logo" aria-hidden="true"><span>${initials(name)}</span></div>
        <h3 class="bsa-winner-card__name">${name}</h3>
        <span class="bsa-winner-card__badge">${trophy} Vencedor · 2027</span>${podium}
      </article>`;
    }).join("");
    observeReveals();
  }

  /* ---------------------------------------------------------
     CATEGORIAS — render grid + modal + filtros
  --------------------------------------------------------- */
  const grid = $("#bsa-cat-grid");
  if (grid) {
    const cardHTML = (c) => `
      <button class="bsa-cat-card" id="cat-${c.n}" data-badge="${c.badge}" data-cat="${c.n}" type="button" data-reveal aria-haspopup="dialog">
        <div class="bsa-cat-card__top">
          <span class="bsa-cat-card__num">${c.n}</span>
          <span class="bsa-badge bsa-badge--${c.badge}">${BADGE_LABEL[c.badge]}</span>
        </div>
        <h3 class="bsa-cat-card__title">${c.name}</h3>
        <p class="bsa-cat-card__excerpt">${c.nominate.length > 120 ? c.nominate.slice(0, 117).trim() + "…" : c.nominate}</p>
        <div class="bsa-cat-card__foot">
          <span class="bsa-cat-card__more">Ver critérios <span aria-hidden="true">→</span></span>
        </div>
      </button>`;
    grid.innerHTML = BSA_CATEGORIES.map(cardHTML).join("");
    observeReveals();

    // Filtros
    $$("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      $$("[data-filter]").forEach(b => b.classList.toggle("is-active", b === btn));
      $$(".bsa-cat-card", grid).forEach(card => {
        const show = f === "all" || card.dataset.badge === f;
        card.style.display = show ? "" : "none";
      });
    }));

    // Modal
    const modal = $("#bsa-modal");
    const panel = $("#bsa-modal-body");
    let lastFocus = null;

    const renderModal = (c) => {
      const list = (arr, withBold) => arr.map(it => {
        if (withBold && Array.isArray(it)) return `<li><b>${it[0]}:</b> ${it[1]}</li>`;
        return `<li>${it}</li>`;
      }).join("");
      panel.innerHTML = `
        <span class="bsa-modal__num">CATEGORIA ${c.n} / 18</span>
        <h2 class="bsa-modal__title" id="bsa-modal-title">${c.name}</h2>
        <span class="bsa-badge bsa-badge--${c.badge}">${BADGE_LABEL[c.badge]}</span>
        <div class="bsa-modal__block">
          <span class="bsa-modal__label">Quem indicar</span>
          <p>${c.nominate}</p>
        </div>
        <div class="bsa-modal__block">
          <span class="bsa-modal__label">Método de votação</span>
          <p>${c.method}</p>
        </div>
        <div class="bsa-modal__block">
          <span class="bsa-modal__label">Critérios de avaliação</span>
          <ul class="bsa-modal__list">${list(c.criteria, true)}</ul>
        </div>
        <div class="bsa-modal__block">
          <span class="bsa-modal__label">Requisitos para a nomeação</span>
          <ul class="bsa-modal__list">${list(c.requirements, false)}</ul>
        </div>
        <div class="bsa-modal__block">
          <span class="bsa-modal__label">Demonstração de excelência</span>
          <ul class="bsa-modal__list">${list(c.excellence, false)}</ul>
        </div>
        <div class="bsa-modal__cta">
          <a class="bsa-btn bsa-btn--gold" href="inscricoes.html?cat=${c.n}">Inscrever nesta categoria <span class="bsa-arrow" aria-hidden="true">→</span></a>
        </div>`;
    };

    const openModal = (c, trigger) => {
      lastFocus = trigger || null;
      renderModal(c);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const close = $(".bsa-modal__close", modal); close && close.focus();
    };
    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      // limpa a âncora #cat-NN para "voltar" ao estado limpo (sem reabrir no reload)
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      lastFocus && lastFocus.focus();
    };

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".bsa-cat-card");
      if (!card) return;
      const c = BSA_CATEGORIES.find(x => x.n === card.dataset.cat);
      c && openModal(c, card);
    });
    if (modal) {
      modal.addEventListener("click", (e) => {
        // closest() garante que clicar no ícone SVG dentro do botão X também fecha
        if (e.target.closest("[data-close]")) closeModal();
      });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });
    }

    // Abrir automaticamente a partir de #cat-NN (ex.: vindo das pills da homepage)
    const openFromHash = () => {
      const m = (location.hash || "").match(/^#cat-(\d{2})$/);
      if (!m) return;
      const c = BSA_CATEGORIES.find(x => x.n === m[1]);
      const card = $(`#cat-${m[1]}`);
      if (c) openModal(c, card);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  }

  /* ---------------------------------------------------------
     COUNTDOWN (placeholder — 1ª edição). Data alvo configurável.
  --------------------------------------------------------- */
  const cd = $("#bsa-countdown");
  if (cd) {
    const target = new Date(cd.dataset.target || "2026-10-16T19:00:00").getTime();
    const cell = (num, lbl) => `<div class="bsa-countdown__cell"><div class="bsa-countdown__num">${String(num).padStart(2, "0")}</div><div class="bsa-countdown__lbl">${lbl}</div></div>`;
    const tick = () => {
      let d = Math.max(0, target - Date.now());
      const days = Math.floor(d / 864e5); d -= days * 864e5;
      const h = Math.floor(d / 36e5); d -= h * 36e5;
      const m = Math.floor(d / 6e4); d -= m * 6e4;
      const s = Math.floor(d / 1e3);
      cd.innerHTML = cell(days, "Dias") + cell(h, "Horas") + cell(m, "Min") + cell(s, "Seg");
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     VOTAÇÃO — página de Voto Público (grid + modal multi-passo)
     Fluxo: escolher finalista → validar identidade → voto confirmado.
     NOTA HANDOFF: em produção, os finalistas viriam do CPT/ACF de cada
     categoria e a validação seria login real (OAuth/email OTP).
  --------------------------------------------------------- */
  const voteGrid = $("#bsa-vote-grid");
  if (voteGrid) {
    // 5 finalistas por categoria de Voto Público (nº da categoria → nomes).
    // Marcas/pessoas ilustrativas (protótipo).
    const FINALISTS = {
      "07": ["Bike Garage Lisboa", "Loja do Ciclista", "Oficina Roda Norte", "Pedal & Companhia", "Ciclo Ponto Porto"],
      "13": ["Helena Marques", "Sofia Ramalho", "Beatriz Antunes", "Marta Quintela", "Inês Vasconcelos"],
      "14": ["Granfondo Atlântico", "Volta Urbana", "MTB Festival Gerês", "Bike Expo Porto", "Maratona do Douro"],
      "15": ["Paulo Trindade", "Rui Carvalho", "André Lopes", "Miguel Faria", "Tiago Sousa"],
      "16": ["Carla Sousa", "João Mendes", "Ana Pires", "Ricardo Brito", "Filipa Nunes"],
      "17": ["Pedal Magazine", "Ciclo Podcast", "Duas Rodas TV", "Bike Channel PT", "Revista Estrada"]
    };
    const vInitials = (n) => {
      const w = n.replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
      return (w.length >= 2 ? w[0][0] + w[1][0] : (w[0] || "").slice(0, 2)).toUpperCase();
    };

    const publicCats = BSA_CATEGORIES.filter(c => c.badge === "public");
    voteGrid.innerHTML = publicCats.map(c => `
      <button class="bsa-cat-card" data-cat="${c.n}" type="button" data-reveal aria-haspopup="dialog">
        <div class="bsa-cat-card__top">
          <span class="bsa-cat-card__num">${c.n}</span>
          <span class="bsa-badge bsa-badge--public">${BADGE_LABEL[c.badge]}</span>
        </div>
        <h3 class="bsa-cat-card__title">${c.name}</h3>
        <p class="bsa-cat-card__excerpt">${c.nominate.length > 110 ? c.nominate.slice(0, 107).trim() + "…" : c.nominate}</p>
        <div class="bsa-cat-card__foot">
          <span class="bsa-cat-card__more">Votar agora <span aria-hidden="true">→</span></span>
        </div>
      </button>`).join("");
    observeReveals();

    const modal = $("#bsa-vote-modal");
    const body = $("#bsa-vote-body");
    let curCat = null, picked = null, lastFocus = null;

    const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const arrow = '<span class="bsa-arrow" aria-hidden="true">→</span>';
    const gIco = '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.5l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"/></svg>';
    const msIco = '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="#f25022"/><rect x="13" y="2" width="9" height="9" fill="#7fba00"/><rect x="2" y="13" width="9" height="9" fill="#00a4ef"/><rect x="13" y="13" width="9" height="9" fill="#ffb900"/></svg>';
    const apIco = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.8c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.5zm-2.2-6.4c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z"/></svg>';

    // PASSO 1 — lista de finalistas
    const renderPick = () => {
      const finalists = FINALISTS[curCat.n] || [];
      const opts = finalists.map((name, i) => `
        <button class="bsa-vote-opt${picked === i ? " is-selected" : ""}" data-pick="${i}" type="button">
          <span class="bsa-vote-opt__logo" aria-hidden="true"><span>${vInitials(name)}</span></span>
          <span class="bsa-vote-opt__name">${name}</span>
          <span class="bsa-vote-opt__radio" aria-hidden="true"></span>
        </button>`).join("");
      body.innerHTML = `
        <span class="bsa-modal__num">VOTO PÚBLICO · CATEGORIA ${curCat.n}</span>
        <h2 class="bsa-modal__title" id="bsa-vote-title">${curCat.name}</h2>
        <p class="bsa-vote-sub">Escolha o seu favorito entre os 5 finalistas. Só pode votar uma vez nesta categoria.</p>
        <div class="bsa-vote-list">${opts}</div>
        <div class="bsa-modal__cta">
          <button class="bsa-btn bsa-btn--gold bsa-btn--block" data-step="validate"${picked === null ? " disabled" : ""}>Continuar ${arrow}</button>
        </div>`;
    };

    // PASSO 2 — validar identidade (referência: ecrã de login)
    const renderValidate = () => {
      const name = (FINALISTS[curCat.n] || [])[picked] || "";
      body.innerHTML = `
        <button class="bsa-vote-back" data-step="pick" type="button">← Voltar aos finalistas</button>
        <div class="bsa-vote-validate">
          <span class="bsa-modal__num" style="text-align:center;display:block">CONFIRMAR VOTO</span>
          <h2 class="bsa-modal__title" id="bsa-vote-title" style="text-align:center;margin-top:.6rem">Valide o seu voto</h2>
          <p class="bsa-vote-sub" style="text-align:center">Está a votar em <strong class="bsa-gold-text">${name}</strong> para <strong>${curCat.name}</strong>. Valide a sua identidade para garantir um voto por pessoa.</p>
          <div class="bsa-oauth">
            <button class="bsa-oauth-btn" data-step="done" type="button">${gIco} Continuar com Google</button>
            <button class="bsa-oauth-btn" data-step="done" type="button">${msIco} Continuar com Outlook</button>
            <button class="bsa-oauth-btn" data-step="done" type="button">${apIco} Continuar com Apple</button>
          </div>
          <div class="bsa-or"><span>ou com o seu email</span></div>
          <form class="bsa-vote-email" data-vote-email novalidate>
            <input class="bsa-input" type="email" required placeholder="O seu email" aria-label="O seu email" />
            <button class="bsa-btn bsa-btn--gold bsa-btn--block" type="submit">Validar e votar ${arrow}</button>
          </form>
          <p class="bsa-vote-terms">Ao votar, concorda com os <a class="bsa-gold-text" href="regulamento.html">termos do prémio</a>.</p>
        </div>`;
    };

    // PASSO 3 — voto confirmado
    const renderDone = () => {
      const name = (FINALISTS[curCat.n] || [])[picked] || "";
      body.innerHTML = `
        <div class="bsa-vote-success">
          <div class="bsa-vote-success__ico" aria-hidden="true">${checkIcon}</div>
          <span class="bsa-modal__num">VOTO REGISTADO</span>
          <h2 class="bsa-modal__title" id="bsa-vote-title" style="margin-top:.6rem">Voto confirmado!</h2>
          <p class="bsa-vote-sub">Obrigado por participar. O seu voto em <strong class="bsa-gold-text">${name}</strong> para <strong>${curCat.name}</strong> foi registado com sucesso.</p>
          <div class="bsa-modal__cta">
            <button class="bsa-btn bsa-btn--solid bsa-btn--block" data-close type="button">Concluir</button>
          </div>
        </div>`;
    };

    const STEPS = { pick: renderPick, validate: renderValidate, done: renderDone };
    const go = (step) => { (STEPS[step] || renderPick)(); };

    const openModal = (c, trigger) => {
      curCat = c; picked = null; lastFocus = trigger || null;
      go("pick");
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const close = $(".bsa-modal__close", modal); close && close.focus();
    };
    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lastFocus && lastFocus.focus();
    };

    voteGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".bsa-cat-card");
      if (!card) return;
      const c = BSA_CATEGORIES.find(x => x.n === card.dataset.cat);
      c && openModal(c, card);
    });

    body.addEventListener("click", (e) => {
      const pick = e.target.closest("[data-pick]");
      if (pick) { picked = Number(pick.dataset.pick); renderPick(); return; }
      const stepBtn = e.target.closest("[data-step]");
      if (stepBtn && !stepBtn.disabled) { go(stepBtn.dataset.step); return; }
    });
    body.addEventListener("submit", (e) => {
      const form = e.target.closest("[data-vote-email]");
      if (!form) return;
      e.preventDefault();
      const inp = $("input", form);
      if (inp && !inp.value.trim()) { inp.focus(); return; }
      go("done");
    });

    modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });
  }

  /* ---------------------------------------------------------
     FORMULÁRIO DE INSCRIÇÃO — popular categorias + lógica condicional
  --------------------------------------------------------- */
  const catSelect = $("#bsa-cat-select");
  if (catSelect) {
    catSelect.innerHTML = '<option value="" disabled selected>Selecione uma categoria…</option>' +
      BSA_CATEGORIES.map(c => `<option value="${c.n}" data-product="${!!c.product}">${c.n} — ${c.name}</option>`).join("");

    // pré-selecionar a partir de ?cat=NN
    const params = new URLSearchParams(location.search);
    const pre = params.get("cat");
    if (pre) {
      const opt = $(`option[value="${pre}"]`, catSelect);
      if (opt) { catSelect.value = pre; }
    }

    const productField = $("#bsa-product-field");
    const syncConditional = () => {
      const opt = catSelect.options[catSelect.selectedIndex];
      const isProduct = opt && opt.dataset.product === "true";
      if (productField) {
        productField.classList.toggle("is-visible", !!isProduct);
        const inp = $("input", productField);
        if (inp) inp.required = !!isProduct;
      }
    };
    catSelect.addEventListener("change", syncConditional);
    syncConditional();
  }

  /* ---------------------------------------------------------
     SUBMIT (protótipo) — previne envio real e dá feedback
  --------------------------------------------------------- */
  $$("form[data-prototype]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = $("[type=submit]", form);
      if (btn) { const t = btn.innerHTML; btn.innerHTML = "✓ Submetido (protótipo)"; btn.disabled = true; setTimeout(() => { btn.innerHTML = t; btn.disabled = false; form.reset(); const pf = $("#bsa-product-field"); pf && pf.classList.remove("is-visible"); }, 2600); }
    });
  });

  /* file upload — mostrar nome */
  $$(".bsa-upload input[type=file]").forEach(inp => inp.addEventListener("change", () => {
    const txt = $(".bsa-upload__txt b", inp.closest(".bsa-upload"));
    if (txt && inp.files[0]) txt.textContent = inp.files[0].name;
  }));

  /* ano dinâmico no footer */
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();

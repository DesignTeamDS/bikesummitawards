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
     DADOS — 17 categorias (nomes traduzidos PT-PT)
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
      nominate: "Qualquer plataforma de media de ciclismo do Reino Unido — publicações, podcasts, revistas, websites, canais de YouTube ou redes sociais — com conteúdo consistente e envolvente.",
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
        <span class="bsa-modal__num">CATEGORIA ${c.n} / 17</span>
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
    const summaryField = $("#bsa-summary");
    const syncConditional = () => {
      const opt = catSelect.options[catSelect.selectedIndex];
      const isProduct = opt && opt.dataset.product === "true";
      if (productField) {
        productField.classList.toggle("is-visible", !!isProduct);
        const inp = $("input", productField);
        if (inp) inp.required = !!isProduct;
      }
      // preenche dica do resumo com a descrição "a que a categoria se destina"
      const c = BSA_CATEGORIES.find(x => x.n === catSelect.value);
      if (summaryField && c) summaryField.placeholder = `Breve resumo sobre: ${c.name} — ${c.nominate.slice(0, 90)}…`;
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

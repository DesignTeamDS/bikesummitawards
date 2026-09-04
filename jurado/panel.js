/* ============================================================
   BIKES SUMMIT AWARDS — Painel do Júri (/jurado)
   Protótipo sem backend. Estado apenas em memória.

   NOTA HANDOFF:
   - CATEGORIAS vem da mesma fonte das categorias do site (CPT "Categorias").
   - Só aparecem aqui as categorias ATRIBUÍDAS ao jurado autenticado
     (relação jurado × categoria definida pelo administrador).
   - O jurado aprova quantos indicados quiser, desde que cumpram os
     critérios. A contagem de votos é que define:
       · categorias de painel  -> os 3 mais votados formam o pódio
       · categorias de público -> os 5 mais votados vão a voto público
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------------------------------------------------------
     DECLARAÇÕES DE APOIO (texto submetido por quem indica)
  --------------------------------------------------------- */
  const DECL = {
    marca: [
      "A candidatura destaca-se pelo trabalho de liderança demonstrado na indústria nacional do ciclismo ao longo do último ano. No critério de Inovação e Visão, a marca apresentou uma nova linha de quadros com geometria otimizada e sistemas de assistência elétrica de última geração, com ganhos comprovados em segurança, ergonomia e eficiência aerodinâmica.",
      "Em Qualidade e Design, a consistência de materiais e de fabrico mantém-se transversal a toda a gama, do modelo de entrada ao topo, com um controlo de qualidade auditado em cada lote. Os relatórios de assistência pós-venda mostram uma taxa de reclamação abaixo de 1,2%, um dos valores mais baixos do setor.",
      "No que respeita a Impacto e Relevância de Mercado, a marca implementou um plano de capacitação técnica das lojas parceiras em todo o território, com formação certificada e serviço pós-venda padronizado. Em Reputação e Integridade, cumpre salientar a transição para embalagens 100% recicláveis na distribuição nacional e o patrocínio direto a escolas de formação. Pela consistência técnica e pelo contributo inequívoco para o ecossistema do ciclismo em Portugal, a candidatura reúne os requisitos para ser distinguida."
    ],
    inovacao: [
      "A candidatura reflete um avanço real na engenharia aplicada ao ciclismo. No critério de Originalidade e Inovação, a solução rompe com a arquitetura convencional do componente, eliminando um ponto de falha histórico e estabelecendo um novo padrão de fiabilidade em condições exigentes de piso, lama e humidade.",
      "Em Impacto e Sucesso de Mercado, os dados de vendas do primeiro ano de comercialização e a adoção por equipas profissionais confirmam a aceitação da tecnologia. Os testes independentes anexados demonstram trocas fluidas sob carga máxima, sem perda de tração nem desgaste prematuro.",
      "Quanto à Receção da Indústria, a solução foi destacada pela imprensa especializada nacional e internacional e integrada por vários fabricantes em modelos de série. A facilidade de configuração e a compatibilidade com ecossistemas de telemetria reforçam a relevância técnica para atletas amadores e profissionais."
    ],
    cicloturismo: [
      "A candidatura apresenta uma oferta de cicloturismo madura e distintiva. No critério de Qualidade da Experiência, os percursos são desenhados com apoio de guias certificados, assistência mecânica em rota e alojamento selecionado, com uma taxa de conclusão dos programas superior a 97%.",
      "Em Inovação e Singularidade, destacam-se os roteiros temáticos que cruzam património, gastronomia e paisagem, incluindo itinerários fora de época que combatem a sazonalidade do destino. A operação disponibiliza frota própria de bicicletas elétricas e gravel, com manutenção preventiva documentada.",
      "No critério de Impacto e Sustentabilidade, a empresa contratualiza serviços com produtores e alojamentos locais, retendo valor no território. Em Satisfação e Reputação, os inquéritos anexos revelam um índice de recomendação de 94% e uma taxa relevante de clientes que repetem a experiência."
    ],
    evento: [
      "O evento apresenta uma candidatura exemplar em qualidade organizacional e valorização do território. No critério de Excelência Operacional, a estrutura mobilizou meios de socorro, corte rodoviário articulado com as forças de segurança e uma rede de abastecimentos rigorosamente planeada para mais de 3.000 participantes, sem incidentes de relevo.",
      "Em Impacto e Perfil na Indústria, a iniciativa gerou uma taxa de ocupação hoteleira superior a 95% na região durante o fim de semana da prova, com retorno direto para a restauração e o comércio local, além de cobertura mediática nacional.",
      "Quanto à Experiência do Participante, os inquéritos de satisfação evidenciam 94% de aprovação global, com destaque para o acolhimento e a sinalização dos percursos. Em Inovação e Singularidade, a aposta na neutralidade carbónica e na recolha seletiva em todos os pontos de apoio consolida o caráter distintivo do evento."
    ],
    retalho: [
      "A candidatura evidencia um modelo de retalho que reinventou a loja de bicicletas tradicional. No critério de Serviço ao Cliente Excecional, o espaço combina oficina técnica certificada com uma zona de convívio para ciclistas, o que se traduziu num aumento de 40% na retenção de clientes no último ano.",
      "Em Gama Abrangente, a seleção cobre estrada, gravel, BTT e mobilidade urbana, com serviço de biomecânica e aluguer de demonstração que permite experimentar antes de comprar. O stock de consumíveis garante reparações no próprio dia na maioria dos casos.",
      "No critério de Conhecimento da Equipa, todos os mecânicos possuem certificação de marca e formação contínua anual. Acresce o estatuto de polo comunitário: passeios semanais gratuitos, workshops de mecânica para iniciantes e campanhas de promoção da mobilidade suave."
    ],
    mecanico: [
      "A candidatura distingue-se pela proficiência técnica demonstrada em contexto real de oficina. No critério de Proficiência Técnica, o mecânico domina transmissões eletrónicas, suspensões e sistemas de assistência elétrica, com formação certificada pelos principais fabricantes e capacidade de diagnóstico em avarias intermitentes.",
      "Em Serviço e Comunicação, destaca-se a clareza com que explica ao cliente a origem do problema, o custo e as alternativas, prática que sustenta uma taxa de fidelização elevada e uma reputação sólida junto da comunidade local.",
      "Nos critérios de Resolução e Profissionalismo, é de assinalar o caso documentado de uma reparação de emergência concluída na véspera de uma prova internacional, que permitiu a participação de toda a equipa. Acresce o trabalho de mentoria a mecânicos juniores e o contributo regular em ações de manutenção para clubes."
    ]
  };

  /* ---------------------------------------------------------
     CATEGORIAS ATRIBUÍDAS A ESTE JURADO (exemplo — 6)
     tipo: 'panel' (pódio pelo júri) | 'public' (shortlist p/ público)
  --------------------------------------------------------- */
  const CATEGORIAS = [
    {
      n: "01", id: "c01", tipo: "panel",
      nome: "Marca de Bicicletas do Ano",
      desc: "Marcas de bicicletas ativas que lançaram pelo menos um novo modelo ou linha significativa no último ano.",
      indicados: [
        { id: "n1", nome: "VeloMax Bikes", sub: "Estrada & E-Bikes", desc: "Nova linha de assistência elétrica e forte investimento na rede de lojas parceiras.", decl: DECL.marca },
        { id: "n2", nome: "TerraCycle", sub: "Gravel & Aventura", desc: "Quadros ultraleves em fibra reciclada e programa de personalização à medida.", decl: DECL.marca },
        { id: "n3", nome: "Norte Bike", sub: "BTT & Trilhos", desc: "Geometrias renovadas para trail e apoio consistente a retalhistas independentes.", decl: DECL.marca },
        { id: "n4", nome: "Atlântico Cycles", sub: "Urbano & Cargo", desc: "Aposta na mobilidade urbana com bicicletas de carga e frotas para empresas.", decl: DECL.marca }
      ]
    },
    {
      n: "03", id: "c03", tipo: "panel",
      nome: "Inovação do Ano",
      desc: "Produtos, lançamentos ou serviços verdadeiramente inovadores introduzidos no mercado.",
      indicados: [
        { id: "n5", nome: "AeroDrive Systems", sub: "Transmissão", desc: "Fixação direta ao eixo, sem patim tradicional, com ganhos de fiabilidade.", decl: DECL.inovacao },
        { id: "n6", nome: "SmartWheel", sub: "Telemetria", desc: "Sensor integrado no cubo com leitura de potência e desgaste em tempo real.", decl: DECL.inovacao },
        { id: "n7", nome: "EcoCharge", sub: "Baterias", desc: "Célula de carregamento rápido com segunda vida garantida por programa de recolha.", decl: DECL.inovacao }
      ]
    },
    {
      n: "18", id: "c18", tipo: "panel",
      nome: "Melhor Empresa de Cicloturismo",
      desc: "Operadores de viagens e organizadores de experiências de bicicleta que promovem o turismo sobre duas rodas.",
      indicados: [
        { id: "n8", nome: "Rota Vélo Tours", sub: "Douro & Interior", desc: "Roteiros temáticos com guias certificados e assistência mecânica em rota.", decl: DECL.cicloturismo },
        { id: "n9", nome: "Ibéria Bike Travel", sub: "Transfronteiriço", desc: "Programas de vários dias entre Portugal e Espanha, com apoio logístico completo.", decl: DECL.cicloturismo },
        { id: "n10", nome: "Trilhos & Pedais", sub: "BTT & Natureza", desc: "Experiências em parques naturais com forte ligação a produtores locais.", decl: DECL.cicloturismo }
      ]
    },
    {
      n: "14", id: "c14", tipo: "public",
      nome: "Evento do Ano",
      desc: "Provas, granfondos, festivais ou encontros de ciclismo com impacto positivo no último ano.",
      indicados: [
        { id: "n11", nome: "Granfondo Atlântico", sub: "Estrada", desc: "Mais de 3.000 participantes numa das etapas mais cénicas do país.", decl: DECL.evento },
        { id: "n12", nome: "Volta Urbana", sub: "Cidade & Mobilidade", desc: "Prova urbana com programa paralelo de mobilidade ativa e feira aberta.", decl: DECL.evento },
        { id: "n13", nome: "MTB Festival Gerês", sub: "BTT por Etapas", desc: "Referência internacional em trilhos de montanha no norte do país.", decl: DECL.evento },
        { id: "n14", nome: "Bike Expo Porto", sub: "Feira & Indústria", desc: "Maior encontro de trade nacional, com workshops e lançamentos de marca.", decl: DECL.evento }
      ]
    },
    {
      n: "07", id: "c07", tipo: "public",
      nome: "Retalhista Independente (IBD) do Ano",
      desc: "Lojas físicas de bicicletas, ou negócios de reparação e manutenção, com três lojas ou menos.",
      indicados: [
        { id: "n15", nome: "Bike Garage Lisboa", sub: "Lisboa", desc: "Oficina certificada com espaço comunitário e passeios semanais gratuitos.", decl: DECL.retalho },
        { id: "n16", nome: "Loja do Ciclista", sub: "Coimbra", desc: "Serviço de biomecânica avançado e acompanhamento pós-venda personalizado.", decl: DECL.retalho },
        { id: "n17", nome: "Oficina Roda Norte", sub: "Braga", desc: "Especialistas em reparação de e-bikes com reparações no próprio dia.", decl: DECL.retalho }
      ]
    },
    {
      n: "15", id: "c15", tipo: "public",
      nome: "Mecânico do Ano",
      desc: "Mecânicos com proficiência técnica excecional, excelente serviço ao cliente e paixão por manter os ciclistas em movimento.",
      indicados: [
        { id: "n18", nome: "Paulo Trindade", sub: "Suspensões & BTT", desc: "Referência nacional em afinação de suspensões e diagnóstico de avarias complexas.", decl: DECL.mecanico },
        { id: "n19", nome: "Rui Carvalho", sub: "E-Bikes", desc: "Certificado pelos principais fabricantes de sistemas de assistência elétrica.", decl: DECL.mecanico },
        { id: "n20", nome: "André Lopes", sub: "Custom & Restauro", desc: "Montagens à medida e restauro de quadros clássicos com acabamento artesanal." , decl: DECL.mecanico }
      ]
    }
  ];

  const REGRAS = {
    panel: "<b>Decisão do júri.</b> Os 3 candidatos mais votados pelo conjunto dos jurados formam o pódio — 1.º, 2.º e 3.º lugares.",
    public: "<b>Apuramento para voto público.</b> Os 5 candidatos mais votados pelo conjunto dos jurados seguem para a votação do público."
  };
  const ROTULO = { panel: "Painel de Jurados", public: "Voto Público" };

  /* estado em memória */
  CATEGORIAS.forEach(c => {
    c.concluida = false;
    c.indicados.forEach(n => { n.voto = null; });
  });

  let catAtual = null;

  /* ---------------------------------------------------------
     UTILITÁRIOS
  --------------------------------------------------------- */
  const iniciais = (nome) => {
    const p = nome.replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
    return (p.length >= 2 ? p[0][0] + p[1][0] : (p[0] || "").slice(0, 2)).toUpperCase();
  };

  const vista = (id) => {
    $$(".pnl-view").forEach(v => v.classList.toggle("is-active", v.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toast = (msg) => {
    let t = $(".pnl-toast");
    if (!t) { t = document.createElement("div"); t.className = "pnl-toast"; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("is-on"));
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("is-on"), 3200);
  };

  const iconOk = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const iconNo = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  const iconDoc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>';

  /* ---------------------------------------------------------
     VISTA 2 — grelha de categorias
  --------------------------------------------------------- */
  function renderCategorias() {
    const grid = $("#pnl-cats");
    grid.innerHTML = CATEGORIAS.map(c => {
      const aprovados = c.indicados.filter(n => n.voto === "ok").length;
      const badge = `<span class="bsa-badge bsa-badge--${c.tipo}">${ROTULO[c.tipo]}</span>`;
      const estado = c.concluida
        ? '<span class="pnl-state pnl-state--done">Concluída</span>'
        : '<span class="pnl-state pnl-state--pending">Por avaliar</span>';
      return `
        <article class="pnl-cat${c.concluida ? " is-done" : ""}">
          <div class="pnl-cat__top">
            <span class="pnl-cat__num">${c.n}</span>
            ${estado}
          </div>
          ${badge}
          <h3 class="pnl-cat__title">${c.nome}</h3>
          <p class="pnl-cat__desc">${c.desc}</p>
          <div class="pnl-cat__meta${aprovados ? " is-done" : ""}">
            <span class="dot" aria-hidden="true"></span>
            ${aprovados} de ${c.indicados.length} indicados aprovados
          </div>
          <button class="bsa-btn bsa-btn--${c.concluida ? "solid" : "gold"} bsa-btn--sm bsa-btn--block" type="button" data-open="${c.id}">
            ${c.concluida ? "Rever avaliação" : "Avaliar indicados"} <span class="bsa-arrow" aria-hidden="true">→</span>
          </button>
        </article>`;
    }).join("");

    const feitas = CATEGORIAS.filter(c => c.concluida).length;
    $("#pnl-done").textContent = feitas;
    $("#pnl-total").textContent = CATEGORIAS.length;
    $("#pnl-bar").style.width = (feitas / CATEGORIAS.length * 100) + "%";
  }

  /* ---------------------------------------------------------
     VISTA 3 — indicados da categoria
  --------------------------------------------------------- */
  function abrirCategoria(id) {
    catAtual = CATEGORIAS.find(c => c.id === id);
    if (!catAtual) return;

    $("#pnl-cat-title").textContent = catAtual.nome;
    $("#pnl-cat-desc").textContent = catAtual.desc;
    const badge = $("#pnl-cat-badge");
    badge.textContent = ROTULO[catAtual.tipo];
    badge.className = `bsa-badge bsa-badge--${catAtual.tipo}`;
    $("#pnl-rule").innerHTML = REGRAS[catAtual.tipo];
    $("#pnl-nom-total").textContent = catAtual.indicados.length;

    const chk = $("#pnl-declare");
    chk.checked = catAtual.concluida;
    $("#pnl-finish").disabled = !chk.checked;

    renderIndicados();
    vista("view-noms");
  }

  function renderIndicados() {
    $("#pnl-approved").textContent = catAtual.indicados.filter(n => n.voto === "ok").length;

    $("#pnl-noms").innerHTML = catAtual.indicados.map(n => {
      const cls = n.voto === "ok" ? " is-ok" : n.voto === "no" ? " is-no" : "";
      const paras = n.decl.map(p => `<p>${p}</p>`).join("");
      return `
        <article class="pnl-nom${cls}">
          <div class="pnl-nom__row">
            <div class="pnl-nom__info">
              <span class="pnl-avatar" aria-hidden="true">${iniciais(n.nome)}</span>
              <div>
                <h3 class="pnl-nom__name">${n.nome}</h3>
                <p class="pnl-nom__sub">${n.sub}</p>
                <p class="pnl-nom__desc">${n.desc}</p>
              </div>
            </div>
            <div class="pnl-actions">
              <button class="pnl-act pnl-act--ok${n.voto === "ok" ? " is-on" : ""}" type="button" data-vote="ok" data-id="${n.id}">
                ${iconOk} Aprovar
              </button>
              <button class="pnl-act pnl-act--no${n.voto === "no" ? " is-on" : ""}" type="button" data-vote="no" data-id="${n.id}">
                ${iconNo} Reprovar
              </button>
            </div>
          </div>
          <div class="pnl-decl">
            <div class="pnl-decl__top">
              <span class="pnl-decl__title">${iconDoc} Declaração de apoio</span>
              <span class="pnl-decl__count">submetida por quem indicou</span>
            </div>
            <div class="pnl-decl__text">${paras}</div>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------------------------------------------------------
     EVENTOS
  --------------------------------------------------------- */
  $("#pnl-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const mail = $("#pnl-email").value.trim();
    if (!mail) return;
    $("#pnl-mail").textContent = mail;
    $("#pnl-user").hidden = false;
    renderCategorias();
    vista("view-cats");
  });

  $("#pnl-logout").addEventListener("click", () => {
    $("#pnl-user").hidden = true;
    vista("view-login");
  });

  $("#pnl-cats").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) abrirCategoria(btn.dataset.open);
  });

  $("#pnl-back").addEventListener("click", () => {
    renderCategorias();
    vista("view-cats");
  });

  $("#pnl-noms").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-vote]");
    if (!btn) return;
    const n = catAtual.indicados.find(x => x.id === btn.dataset.id);
    const v = btn.dataset.vote;
    n.voto = n.voto === v ? null : v;   // clicar de novo anula o voto

    // atualiza só o cartão votado — não re-renderiza a lista,
    // para não perder a posição de leitura das declarações
    const card = btn.closest(".pnl-nom");
    card.classList.toggle("is-ok", n.voto === "ok");
    card.classList.toggle("is-no", n.voto === "no");
    $$("[data-vote]", card).forEach(b => b.classList.toggle("is-on", n.voto === b.dataset.vote));
    $("#pnl-approved").textContent = catAtual.indicados.filter(x => x.voto === "ok").length;
  });

  $("#pnl-declare").addEventListener("change", (e) => {
    $("#pnl-finish").disabled = !e.target.checked;
  });

  $("#pnl-finish").addEventListener("click", () => {
    catAtual.concluida = true;
    const n = catAtual.indicados.filter(x => x.voto === "ok").length;
    toast(`${catAtual.nome} — ${n} ${n === 1 ? "aprovado" : "aprovados"}`);
    renderCategorias();
    vista("view-cats");
  });

})();

# Bikes Summit Awards — Protótipo (1ª Edição)

Protótipo funcional do website da primeira edição dos **Bikes Summit Awards** — os prémios da indústria do ciclismo. Construído em **HTML + CSS + JavaScript puro**, sem dependências, pensado para ser recriado em **WordPress + Elementor Pro**.

## 🎨 Conceito visual
Dark mode premium ("cerimónia de gala tecnológica"): fundo near-black, **dourado `#C9A32C`** como acento herói, **teal `#2EA88E`** (da marca) como acento secundário, e o motivo geométrico isométrico do logótipo como textura recorrente.

- **Tipografia:** Bricolage Grotesque (display) · Archivo (corpo) · JetBrains Mono (labels/números)
- **Paleta oficial:** Dourado `#C9A32C` · Charcoal `#3A3A3A` · Off-white `#F0F0F0`
- Contraste WCAG AA respeitado · micro-interações CSS · scroll reveals · countdown · grão premium.

## 📁 Estrutura
Cada secção da arquitetura tem **a sua própria página**. A homepage é só apresentação + teasers que encaminham para cada página.
```
site/
├── index.html            Homepage — Hero + teasers de cada menu (Como Funciona, Categorias, Patrocinadores, Bilhetes, CTA)
├── como-funciona.html    Timeline das 3 fases + detalhe do processo + countdown
├── categorias.html       17 categorias (grid + filtros + painel de detalhe)
├── patrocinadores.html   Tiers de patrocínio + porquê patrocinar
├── contactos.html        Formas de contacto + formulário
├── inscricoes.html       Regras + formulário de candidatura (campo "Produto" condicional)
├── bilhetes.html         Bilhetes (pricing), o que esperar, FAQ
└── assets/
    ├── css/style.css     Sistema de design completo (tokens .bsa-* = Global Colors/Fonts)
    ├── js/main.js        17 categorias (dados), modal, filtros, countdown, lógica do form
    └── img/              logo-dark · logo-light · trophy
```

## 🧩 Mapa de secções (= arquitetura.png)
1. **Homepage** — Hero de alto impacto com o troféu.
2. **Como Funciona** — timeline: Inscrições & Nomeações → Votação Online → Revelação dos Vencedores.
3. **Categorias** — 17 categorias (traduzidas PT-PT). Cada uma abre um painel com: *Quem indicar · Método de votação · Critérios · Requisitos · Demonstração de excelência*. Filtros por método de votação.
4. **Patrocinadores** — logo wall em tiers (Principal / Ouro / Parceiros).
5. **Contactos** — formas de contacto + formulário.
6. **Inscrições** — regras + formulário (Categoria, Empresa, Declaração de Apoio, Resumo, Upload de logo, Indicação/Nomeação; campo **Produto** surge dinamicamente para categorias de produto, ex.: *Inovação do Ano*).
7. **Bilhetes** — Individual / Mesa Corporativa / VIP com gatilhos de conversão.

## ▶️ Ver localmente
```bash
cd site
python3 -m http.server 8000
# abrir http://localhost:8000
```

## 🚀 Publicar no GitHub Pages
1. Criar um repositório e fazer push do conteúdo da pasta `site/` (ou da raiz).
2. **Settings → Pages → Source:** branch `main`, pasta `/root` (ou `/docs` se mover o `site/` para `docs/`).
3. O link público é gerado em segundos.

## 🛠️ Notas para o handoff Elementor
- Cada secção tem comentários `<!-- [ELEMENTOR] ... -->` a marcar início/fim → 1 secção = 1 Container.
- Tokens em `:root` (`--bsa-*`) → **Global Colors / Global Fonts**.
- Classes `.bsa-*` → **Global Classes** reutilizáveis.
- Layout só em **Flexbox/Grid** (= Containers Elementor); animações replicáveis com **Motion Effects**.
- O grid de Categorias + painel = **Loop Grid (CPT) + Popup**. O countdown = widget Countdown. Formulários = widget Form (a lógica condicional do campo *Produto* replica-se com *Conditional Fields*).

> ⚠️ Protótipo: os formulários não têm backend (apenas feedback visual) e os preços/datas são placeholders da 1ª edição.

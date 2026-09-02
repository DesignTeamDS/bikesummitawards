/* ============================================================
   BIKES SUMMIT AWARDS — Página Teaser
   Categorias + formulário de notificação por email
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     CONFIGURAÇÃO
     ------------------------------------------------------------ */

  // Endpoint para receber os emails.
  // Deixe a null enquanto não houver backend — nesse caso os emails
  // ficam guardados no localStorage do browser (só para demonstração).
  // Quando tiver o serviço pronto (Mailchimp, Brevo, Formspree, API própria),
  // basta colocar aqui o URL. Ex: 'https://formspree.io/f/xxxxxxx'
  var ENDPOINT = null;

  /* ------------------------------------------------------------
     DADOS — 18 categorias (nomes oficiais PT-PT)
     ------------------------------------------------------------ */
  var CATEGORIAS = [
    'Marca de Bicicletas do Ano',
    'Marca de Peças & Acessórios do Ano',
    'Inovação do Ano',
    'Distribuidor de Bicicletas do Ano',
    'Distribuidor de Peças & Acessórios do Ano',
    'Distribuidor Especialista do Ano',
    'Retalhista Independente (IBD) do Ano',
    'Retalhista Omnicanal do Ano',
    'Melhores Serviços para o Retalho',
    'Retalhista Especialista do Ano',
    'Prémio de Advocacia do Ciclismo',
    'Campeão da Diversidade',
    'Mulher do Ano',
    'Evento do Ano',
    'Mecânico do Ano',
    'Herói Anónimo do Ano',
    'Media de Ciclismo do Ano',
    'Melhor Empresa de Cicloturismo'
  ];

  /* ------------------------------------------------------------
     RENDER — lista de categorias
     ------------------------------------------------------------ */
  function renderCategorias() {
    var wrap = document.getElementById('bsa-cats');
    if (!wrap) return;

    var html = CATEGORIAS.map(function (nome, i) {
      var n = String(i + 1).padStart(2, '0');
      return (
        '<li class="bsa-cat" style="--i:' + i + '">' +
          '<span class="bsa-cat__n">' + n + '</span>' +
          '<span class="bsa-cat__name">' + nome + '</span>' +
        '</li>'
      );
    }).join('');

    wrap.innerHTML = html;
  }

  /* ------------------------------------------------------------
     FORMULÁRIO — aviso por email
     ------------------------------------------------------------ */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  function setMsg(el, text, isError) {
    el.textContent = text;
    el.classList.toggle('is-error', !!isError);
  }

  function saveLocal(email) {
    try {
      var key = 'bsa_teaser_emails';
      var list = JSON.parse(localStorage.getItem(key) || '[]');
      if (list.indexOf(email) === -1) list.push(email);
      localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
      /* localStorage indisponível — ignora silenciosamente */
    }
  }

  function initForm() {
    var form = document.getElementById('notify-form');
    if (!form) return;

    var input = form.querySelector('#email');
    var msg = document.getElementById('notify-msg');
    var btn = form.querySelector('button[type="submit"]');

    input.addEventListener('input', function () {
      input.classList.remove('is-invalid');
      if (msg.textContent) setMsg(msg, '', false);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = input.value.trim();

      if (!email) {
        input.classList.add('is-invalid');
        setMsg(msg, 'Por favor, introduza o seu email.', true);
        input.focus();
        return;
      }
      if (!isValidEmail(email)) {
        input.classList.add('is-invalid');
        setMsg(msg, 'Esse email não parece válido. Verifique, por favor.', true);
        input.focus();
        return;
      }

      btn.disabled = true;
      setMsg(msg, 'A registar…', false);

      var done = function () {
        form.classList.add('is-done');
        setMsg(msg, 'Obrigado. Avisamos assim que as inscrições abrirem.', false);
      };

      var fail = function () {
        btn.disabled = false;
        setMsg(msg, 'Não foi possível registar. Tente novamente daqui a pouco.', true);
      };

      if (!ENDPOINT) {
        // Modo teaser sem backend
        saveLocal(email);
        setTimeout(done, 600);
        return;
      }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, origem: 'teaser-bsa' })
      })
        .then(function (r) { r.ok ? done() : fail(); })
        .catch(fail);
    });
  }

  /* ------------------------------------------------------------
     ANO DO RODAPÉ
     ------------------------------------------------------------ */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  function init() {
    renderCategorias();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

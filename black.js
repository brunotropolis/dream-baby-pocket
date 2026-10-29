/* SEMANA DA BLACK — barra no topo + contador da semana (seg 00h a dom 23h59 BRT, renova sozinho)
   + selo "Preço de Black" com brilho e "de R$ 97 por R$ 67" no bloco de preço + cupom no link do checkout.
   Um arquivo só, igual em todas as páginas. Desligar = remover a tag <script src="black.js">. */
(function () {
  var CUPOM = 'BLACKESPECIAL26';
  var DE = 'R$ 97';
  var OURO = '#FFC83D';
  // quiz (perfis): sem barra no topo pra não tirar a experiência do resultado; contador vai pro bloco do preço
  var MODO = window.BLACK_MODO || (location.hostname.indexOf('perfis.') === 0 || location.pathname.indexOf('/quiz/') === 0 ? 'preco' : 'barra');

  var css = '' +
    /* barra */
    '.bk-bar{position:sticky;top:0;z-index:10000;background:linear-gradient(180deg,#141414 0%,#050505 100%);color:#fff;' +
    'font-family:Poppins,Quicksand,system-ui,sans-serif;padding:10px 16px 11px;box-shadow:0 6px 20px rgba(0,0,0,.28)}' +
    '.bk-bar:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;' +
    'background:linear-gradient(90deg,transparent,' + OURO + ' 30%,#fff3c4 50%,' + OURO + ' 70%,transparent);background-size:200% 100%;animation:bk-linha 4s linear infinite}' +
    '.bk-in{max-width:760px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:20px}' +
    '.bk-tit{display:flex;flex-direction:column;align-items:flex-start;gap:7px}' +
    '.bk-nome{font-size:15px;font-weight:800;letter-spacing:.16em;line-height:1;color:#fff}' +
    '.bk-nome b{color:' + OURO + ';font-weight:800}' +
    '.bk-datas{display:inline-flex;align-items:center;gap:6px;border:1px solid ' + OURO + ';background:linear-gradient(180deg,#232323,#121212);' +
    'box-shadow:0 0 10px rgba(255,200,61,.22),inset 0 1px 0 rgba(255,255,255,.06);color:' + OURO + ';border-radius:6px;padding:4px 10px 4px 8px;' +
    'font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;line-height:1.2;white-space:nowrap}' +
    '.bk-datas svg{flex:none}' +
    '.bk-datas i{font-style:normal;color:rgba(255,255,255,.55);font-weight:700}' +
    '.bk-cd{display:flex;align-items:flex-start;gap:3px}' +
    '.bk-cd-lbl{font-size:10px;font-weight:700;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.12em;align-self:center;margin-right:6px;line-height:1.3;text-align:right}' +
    '.bk-n{display:flex;flex-direction:column;align-items:center;gap:3px}' +
    '.bk-n i{font-style:normal;min-width:36px;padding:6px 4px 5px;text-align:center;border-radius:8px;' +
    'background:linear-gradient(180deg,#2a2a2a,#161616);border:1px solid rgba(255,200,61,.35);' +
    'color:' + OURO + ';font-size:18px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}' +
    '.bk-n em{font-style:normal;font-size:9px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.1em}' +
    '.bk-sep{color:rgba(255,200,61,.6);font-weight:800;font-size:15px;line-height:30px;margin:0 -1px}' +
    '@media(max-width:560px){.bk-bar{padding:15px 16px 16px}.bk-in{gap:10px}.bk-tit{gap:6px}' +
    '.bk-nome{font-size:12.5px;letter-spacing:.12em}.bk-datas{font-size:10px;padding:3px 8px 3px 6px}' +
    '.bk-cd-lbl{display:none}.bk-n i{min-width:31px;font-size:15.5px;padding:5px 3px 4px}.bk-n em{font-size:8.5px}.bk-sep{font-size:13px;line-height:26px}}' +
    '@media(max-width:350px){.bk-sep{display:none}}' +
    /* preço */
    '.bk-preco{display:flex;flex-direction:column;align-items:center;gap:12px;margin-bottom:10px}.price-card .bk-preco{margin-bottom:14px}' +
    '.bk-selo{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;background:#0d0d0d;color:' + OURO + ';' +
    'font-family:Poppins,Quicksand,system-ui,sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;' +
    'padding:7px 16px;border-radius:100px;border:1px solid rgba(255,200,61,.6);animation:bk-pulso 2.4s ease-in-out infinite}' +
    '.bk-selo:after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:45%;transform:skewX(-20deg);' +
    'background:linear-gradient(90deg,transparent,rgba(255,240,190,.55),transparent);animation:bk-brilho 2.8s ease-in-out infinite}' +
    '.bk-selo .bk-dot{width:7px;height:7px;border-radius:50%;background:' + OURO + ';box-shadow:0 0 8px ' + OURO + '}' +
    '.bk-de{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;font-size:15px;font-weight:600;opacity:.85}' +
    '.bk-de s,.price-card .price-de s{text-decoration-thickness:2px;text-decoration-color:#e0483e}' +
    '.bk-eco{background:#0d0d0d;color:' + OURO + ';font-size:11.5px;font-weight:800;letter-spacing:.06em;padding:3px 9px;border-radius:6px;opacity:1}' +
    '.bk-box{position:relative;overflow:hidden;width:100%;max-width:340px;margin:0 auto 4px;background:linear-gradient(180deg,#171717,#070707);border:1px solid rgba(255,200,61,.6);' +
    'border-radius:16px;padding:14px 14px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;font-family:Poppins,Quicksand,system-ui,sans-serif;animation:bk-pulso 2.4s ease-in-out infinite}' +
    '.bk-box:after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;transform:skewX(-20deg);pointer-events:none;' +
    'background:linear-gradient(90deg,transparent,rgba(255,240,190,.18),transparent);animation:bk-brilho 3.2s ease-in-out infinite}' +
    '.bk-box .bk-nome{font-size:14px}.bk-box .bk-tit{align-items:center}.bk-box .bk-n i{min-width:40px;font-size:19px}' +
    '@media (prefers-reduced-motion:reduce){.bk-box,.bk-box:after{animation:none}}' +
    '@keyframes bk-pulso{0%,100%{box-shadow:0 0 0 0 rgba(255,200,61,.0),0 6px 16px rgba(0,0,0,.25)}50%{box-shadow:0 0 0 6px rgba(255,200,61,.18),0 6px 22px rgba(255,200,61,.35)}}' +
    '@keyframes bk-brilho{0%{left:-60%}55%,100%{left:130%}}' +
    '@keyframes bk-linha{0%{background-position:200% 0}100%{background-position:-200% 0}}' +
    '@media (prefers-reduced-motion:reduce){.bk-selo,.bk-selo:after,.bk-bar:after{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // semana em BRT (UTC-3, sem horário de verão): segunda 00:00 até domingo 23:59:59
  function semana() {
    var agoraBrt = new Date(Date.now() - 3 * 3600e3);
    var dow = (agoraBrt.getUTCDay() + 6) % 7; // 0 = segunda
    var ini = Date.UTC(agoraBrt.getUTCFullYear(), agoraBrt.getUTCMonth(), agoraBrt.getUTCDate() - dow);
    var fim = ini + 7 * 864e5; // segunda seguinte 00:00 BRT
    return { ini: new Date(ini), fimDia: new Date(fim - 864e5), fimMs: fim + 3 * 3600e3 };
  }
  var MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  function dm(d) { return d.getUTCDate() + ' ' + MES[d.getUTCMonth()]; }

  var cal = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v2H2V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1zM2 11h20v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-8z"/></svg>';
  var titHtml = '<div class="bk-tit"><div class="bk-nome">SEMANA DA <b>BLACK</b></div><div class="bk-datas">' + cal + '<span class="bk-datas-txt"></span></div></div>';
  var cdHtml = function (lbl) { return '<div class="bk-cd" aria-live="off">' + (lbl ? '<span class="bk-cd-lbl">termina<br>em</span>' : '') +
    '<div class="bk-n"><i class="bk-d">0</i><em>dias</em></div><span class="bk-sep">:</span>' +
    '<div class="bk-n"><i class="bk-h">00</i><em>horas</em></div><span class="bk-sep">:</span>' +
    '<div class="bk-n"><i class="bk-m">00</i><em>min</em></div><span class="bk-sep">:</span>' +
    '<div class="bk-n"><i class="bk-s">00</i><em>seg</em></div></div>'; };
  if (MODO === 'barra') {
  var bar = document.createElement('div');
  bar.className = 'bk-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Semana da Black');
  bar.innerHTML = '<div class="bk-in">' + titHtml + cdHtml(true) + '</div>';
  document.body.insertBefore(bar, document.body.firstChild);
  }

  function tick() {
    var w = semana();
    var set = function (c, v, html) { document.querySelectorAll('.' + c).forEach(function (e) { if (html) e.innerHTML = v; else e.textContent = v; }); };
    set('bk-datas-txt', dm(w.ini) + ' <i>até</i> ' + dm(w.fimDia), true);
    var r = Math.max(0, w.fimMs - Date.now()), t = Math.floor(r / 1000);
    var p = function (n) { return ('0' + n).slice(-2); };
    set('bk-d', Math.floor(t / 86400));
    set('bk-h', p(Math.floor(t % 86400 / 3600)));
    set('bk-m', p(Math.floor(t % 3600 / 60)));
    set('bk-s', p(t % 60));
  }

  var selo = MODO === 'preco' ? '<div class="bk-box">' + titHtml + cdHtml(false) + '</div>' : '<span class="bk-selo"><span class="bk-dot"></span>Preço de Black</span>';
  var eco = '';
  // páginas Dream Baby (.preco-valor .de "Por apenas")
  document.querySelectorAll('.preco-valor').forEach(function (b) {
    var de = b.querySelector('.de');
    if (de) de.outerHTML = '<div class="bk-preco">' + selo + '<span class="bk-de">de <s>' + DE + '</s> por apenas ' + eco + '</span></div>';
  });
  // Guia (.price-card .price-de já diz "de R$ 97 por")
  document.querySelectorAll('.price-card').forEach(function (b) {
    if (b.querySelector('.bk-selo')) return;
    var alvo = b.querySelector('.price-de');
    var box = document.createElement('div'); box.className = 'bk-preco'; box.innerHTML = selo;
    b.insertBefore(box, alvo || b.firstChild);
    
  });

  tick(); setInterval(tick, 1000);

  // cupom aplicado direto no checkout (parâmetro ?cupom= do payfast)
  function comCupom(a) {
    var h = a.getAttribute('href') || '';
    if (h.indexOf('payfast.greenn.com.br') < 0 || /[?&]cupom=/.test(h)) return;
    a.setAttribute('href', h + (h.indexOf('?') < 0 ? '?' : '&') + 'cupom=' + CUPOM);
  }
  document.querySelectorAll('a[href*="payfast.greenn.com.br"]').forEach(comCupom);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="payfast.greenn.com.br"]');
    if (a) comCupom(a);
  }, true);
})();

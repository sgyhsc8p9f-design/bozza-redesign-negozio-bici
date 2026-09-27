/* Menu a tendina "con intenzione", uguale su tutte le pagine (home, scheda, catalogo).
   - si apre quando il mouse arriva su una voce;
   - resta aperto se il mouse esce per poco: si chiude dopo CLOSE ms fuori dal menu;
   - passa a un'altra voce solo se il mouse ci si ferma (SWITCH ms): attraversarla
     in diagonale per raggiungere il pannello aperto non lo cambia;
   - si chiude subito con un click su un link del menu o con Esc.
   Ascolta sul documento, quindi funziona anche col menu scritto dopo il caricamento (catalogo).
   Senza questo script resta il comportamento solo CSS (:hover). */
(() => {
  const OPEN = 60, SWITCH = 220, CLOSE = 420;
  document.documentElement.classList.add('mmjs');
  let cur = null, openT, closeT, closing = false;
  const stopClose = () => { clearTimeout(closeT); closing = false; };
  const show = m => { clearTimeout(openT); stopClose(); if (cur && cur !== m) cur.classList.remove('open'); cur = m; m.classList.remove('shut'); m.classList.add('open'); };
  const hide = () => { clearTimeout(openT); stopClose(); if (cur) cur.classList.remove('open'); cur = null; };
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const m = e.target.closest('.mm');
    clearTimeout(openT);
    if (m && m === cur) { stopClose(); return; }                                   // dentro il menu aperto (voce o pannello)
    if (m) { stopClose(); openT = setTimeout(() => show(m), cur ? SWITCH : OPEN); return; } // su un'altra voce
    if (cur && !closing) { closing = true; closeT = setTimeout(hide, CLOSE); }     // fuori dal menu
  });
  document.addEventListener('click', e => { if (e.target.closest('.mm a')) { hide(); document.activeElement && document.activeElement.blur(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
})();

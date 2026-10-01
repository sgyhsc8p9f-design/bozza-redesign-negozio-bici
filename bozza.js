/* Aspetto da bozza (solo branch demo): etichette "in definizione" sulle sezioni principali. */
(()=>{
  const add=()=>{
    document.querySelectorAll('[data-draft]').forEach(el=>{
      if(el.querySelector(':scope>.draft-tag'))return;
      el.classList.add('draft-host');
      const t=document.createElement('span');t.className='draft-tag';t.textContent=el.dataset.draft||'In definizione';
      el.prepend(t);
    });
  };
  document.addEventListener('DOMContentLoaded',add);
})();

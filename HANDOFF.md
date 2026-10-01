# Handoff — bozza redesign Cicli Ambrosini

Ultimo aggiornamento: 1 ottobre 2026. Repo: `sgyhsc8p9f-design/bozza-redesign-negozio-bici` (pubblica).
Sito statico (HTML, CSS, JS, nessuna build). Demo non ufficiale: nessun ordine o dato viene inviato.

## Rami

| Ramo | A cosa serve | Stato |
|---|---|---|
| `main` | Versione **completa**, da cui proseguire se l'incontro va bene | commit `70c7861` |
| `demo` | Bozza **snella** da mostrare al negoziante | commit `93cfc5b` |
| `test-collegamento` | Solo prova di scrittura, **da cancellare** su GitHub (Branches → cestino) | inutile |

**GitHub Pages:** cambia il ramo pubblicato da Settings → Pages. Per l'incontro usare `demo`. Con `main` il visitatore vede carrello, checkout e funzioni complete.
Link: `https://sgyhsc8p9f-design.github.io/bozza-redesign-negozio-bici/`
Attenzione: la repo è pubblica, quindi anche questo file e le foto in `img/` sono scaricabili da chiunque.

## Cosa c'è su `main` (versione completa)

- Catalogo di 363 prodotti (dati in `catalogo.html`, riga `const DATA=`), carrello, checkout, preferiti, confronto bici, questionario "Aiutami a scegliere".
- Pagamento con Stripe in **modalità test**: i link `buy.stripe.com/test_…` sono nel campo `pl` di ogni prodotto; il checkout con "Carta" reindirizza a Stripe. Il pulsante diretto "Acquista con Carta / Apple Pay" è nella scheda prodotto. I loghi `stripe-*.png` non sono usati da nessuna pagina.
- Home: hero **statico** con la nuova foto del bosco (`hero.jpg`, 2000×1250), testo in alto a sinistra su computer e in alto su telefono. L'animazione della bici nel hero è stata rimossa.
- Restano gli altri effetti (GSAP, ScrollTrigger, Lenis da CDN): card che salgono, parallasse, numeri che contano, mini bici sotto l'header.
- Categorie in home: foto locali in `img/categorie/` (Strada, Gravel, E-bike, Mountain bike, Telai; crediti in `CREDITI.txt`). **Città e trekking** usa ancora la foto di Wix. Hover = zoom in dell'8%. La fila si sposta **solo con le frecce** (niente swipe/trascinamento); le frecce si disattivano agli estremi.
- Prodotti esauriti (`!stock`, 50 visibili): scheda sbiadita, etichetta "Esaurito", pulsante "Avvisami"; nella pagina prodotto niente carrello/acquisto/taglie/consegna e un modulo email "Avvisami quando torna disponibile" (**simulato**: salva nel browser solo che l'avviso è stato chiesto, non l'indirizzo). `addToCart` rifiuta i prodotti esauriti.
- Pagina servizi officina: orari in colonna per giorno, sabato corretto (chiude alle 18:00).
- Fila dei marchi senza linee sopra e sotto.

## Cosa c'è su `demo` (versione snella)

- Catalogo ridotto: 8 categorie × 3 prodotti = 24 (Strada, Gravel, MTB, E-bike, Maglie, Caschi, Trasmissione, Borse).
- **Nessuna** funzione d'acquisto: via carrello, checkout, preferiti, confronto, questionario, Stripe, rate. Il pulsante sulle schede è "Chiedi in negozio · 0332 240109".
- Home senza barra annunci, punti di forza, marchi, numeri, newsletter, recensioni. Hero statico con la **foto vecchia**; nessuna animazione né librerie JS.
- Etichette tratteggiate "in definizione" (`bozza.css`, `bozza.js`).
- Orari officina corretti come su `main`.
- `proposta.html` aggiornata (vedi sotto).
- Le foto nuove delle categorie e il nuovo hero **non** sono su `demo` (chiedere se si vuole).

## Proposta (`proposta.html`)

- Su **`demo`** è la versione aggiornata: sezione 4 senza vincolo su Shopify (tre strade: piattaforma pronta, sito su misura + Stripe, CMS aperto), sezione 5 a **moduli** selezionabili (10) con "cosa guadagnate" e "serve da voi", **senza prezzi**, con riepilogo e stampa solo dei moduli scelti. I numeri sono allineati alla demo (24 prodotti su 363).
- Su **`main`** è ancora la versione **vecchia** (centrata su Shopify, con prezzi/canoni). **Da portare da `demo` a `main`** prima di usarla.
- Da compilare a mano: `[Nome Cognome]`, `[telefono]`, `[email]` (campi gialli).
- Non stima ricavi: da quantificare con i dati reali del negozio.

## Da fare / da decidere

1. Foto di **Città e trekking** (e la verifica delle altre).
2. **Diritti delle foto**: sono immagini di Bianchi, Giant e fotografi (Steve Behr, James Lissimore) e una foto hero di provenienza ignota (sembra molto elaborata o generata). Serve l'autorizzazione di marchi/autori prima di una messa online. Le foto Bianchi si possono chiedere alla Press Room (https://www.bianchi.com/press-room/); per Giant, Merida e Colnago tramite i referenti.
3. La foto Mountain bike: marchio del telaio non identificato; verificare che sia un marchio venduto. La foto Telai mostra il credito del fotografo in alto a destra (si può spostare l'inquadratura).
4. L'etichetta del hero dice "Rivenditore autorizzato Giant" ma la foto non mostra una Giant riconoscibile.
5. Controllare con il negoziante: orari (soprattutto lunedì e sabato), l'elenco dei prodotti esauriti, il numero di prodotti ("350+" in home vs 363).
6. Avviso di disponibilità e newsletter sono simulati: servirebbe un servizio di invio e il consenso privacy (buon modulo per la proposta).
7. Decidere se togliere il redirect a Stripe dal checkout nella versione da mostrare.
8. **Dominio** cicliambrosini.it in scadenza il 23 ottobre 2026 (punto 1 della sezione 7 della proposta).
9. Cancellare il ramo `test-collegamento`.
10. Scegliere se portare il nuovo hero e le nuove foto anche su `demo`.

## Note tecniche

- Le foto di prodotti e categorie (se non locali) vengono da `static.wixstatic.com` (sito attuale del negoziante): se lui le cambia, spariscono. Le librerie di animazione arrivano da cdnjs/jsdelivr, i font da Google Fonts: serve connessione.
- Cache del CSS: `style.css?v=n12` (alzare il numero in `index.html`, `prodotto.html`, `proposta.html` quando si cambia il CSS).
- Le foto delle categorie sono nell'array `cats` in `index.html`; un valore che inizia con `img/` è un file locale, altrimenti è un ID Wix.
- Test fatti con Playwright e Chromium headless; le risorse esterne (Wix, CDN) sono bloccate nell'ambiente di sviluppo, quindi i test usano immagini locali o simulate.
- Se si riprova uno zoom out delle foto delle categorie: il primo tentativo aveva un errore di dimensionamento (foto a grandezza naturale) e lasciava bordi visibili; è stato abbandonato per tornare allo zoom in.
- L'hook di fine sessione può segnalare "commit non pushati" per falsi positivi: il clone è superficiale (`--depth 1`) e il riferimento remoto resta indietro. Basta `git fetch origin <ramo>:refs/remotes/origin/<ramo>`.
- File interno non pubblicato: `piano.html` (in `.gitignore`).

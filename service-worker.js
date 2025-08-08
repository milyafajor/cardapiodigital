const CACHE_NAME = "mily-cache-v2"; // Troque o número quando quiser forçar update
const URLS_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./LOGOMARCA.png",
  "./fotos/BRIGADEIRO.png",
  "./fotos/BEIJINHO.png",
  "./fotos/DOCE-DE-LEITE.png",
  "./fotos/CREME-DE-AVELÃ.png",
  "./fotos/PISTACHE.png",
  "./fotos/OREO.png",
  "./fotos/KITKAT.png"
];

// Instala e guarda no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting(); // força ativação imediata
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim(); // atualiza sem esperar fechar abas antigas
});

// Busca do cache ou rede
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

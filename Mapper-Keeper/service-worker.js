// Mapper Keeper moved to https://mapperkeeper.com/.
// This replaces the old offline worker for returning visitors: it removes itself
// and the old address's offline caches, then sends open tabs to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Only this address's offline caches (Workbox puts the scope in the name).
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.includes(self.registration.scope)).map(key => caches.delete(key)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    for (const client of windows) client.navigate('https://mapperkeeper.com/');
  })());
});

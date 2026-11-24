// The app moved from /Dungeon-Mapper/ to /Mapper-Keeper/.
// This replaces the old offline worker for returning visitors: it removes itself
// and sends any open old-address tabs to the new address. Saved maps live in
// browser storage for evilolive.com, so they are unaffected.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Only the old address's offline caches (Workbox puts the scope in the name).
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.includes(self.registration.scope)).map(key => caches.delete(key)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    for (const client of windows) client.navigate('/Mapper-Keeper/');
  })());
});

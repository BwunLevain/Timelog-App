// open server go to the pages that you want to use, ctrl + shit + i -> devtools -> application -> service workers -> check offline and restart the page
const CACHE_VERSION = 'v1'
const CACHE_NAME = `workers-cache-${CACHE_VERSION}`

const ASSETS = [
  '/',
  // HTML Files
  '/html/offline.html',
  '/html/overviewpage.html',
  '/html/pomodoromode.html',
  '/html/settingspage.html',
  '/html/trainingmode.html',
  '/html/workmode.html',

  // CSS Files
  '/css/base.css',
  '/css/components.css',
  '/css/overview.css',
  '/css/style.css',
  '/css/timer.css',
  '/css/variables.css',

  // Scripts
  '/scripts/addTimeDOM.js',
  '/scripts/addTimeLogic.js',
  '/scripts/barchartDOM.js',
  '/scripts/barchartLogic.js',
  '/scripts/localStorage.js',
  '/scripts/navigation.js',
  '/scripts/overviewDOM.js',
  '/scripts/overviewLogic.js',
  '/scripts/script.js',
  '/scripts/settingsDOM.js',
  '/scripts/statsDisplayDOM.js',
  '/scripts/statsDisplayLogic.js',
  '/scripts/swCall.js',
  '/scripts/themes.js',
  '/scripts/timerDOM.js',
  '/scripts/training.js',

  // Root files
  '/sw.js',
  '/manifest.json',

  // Images
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// Install
self.addEventListener('install', (event) => { // installs the important files so that they can be used
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

// Activate
self.addEventListener('activate', (event) => { // remove old versions of the cache
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch
self.addEventListener('fetch', (event) => { // looks for the files
  const request = event.request

  if (request.method !== 'GET') return

  event.respondWith(handleRequest(request))
})

async function handleRequest(request) { // gets the cached files if they exist otherwise show error 503 + offline.html
    const cache = await caches.open(CACHE_NAME) 
    const cached = await cache.match(request) 
    
    if (cached) { 
        fetch(request).then(res => { 
            if (res.ok) cache.put(request, res.clone()) 
        }) 
        return cached.clone()
    } 
    try { 
        const response = await fetch(request) 
        if (response.ok) cache.put(request, response.clone()) 
        return response 
    } catch (error) { 
        if (request.mode === 'navigate') { 
        return cache.match('/offline.html') 
        } 
    }
    return new Response('Offline', { status: 503 }) 
} 
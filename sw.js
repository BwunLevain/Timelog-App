// open server go to the pages that you want to use, ctrl + shit + i -> devtools -> application -> service workers -> check offline and restart the page
const CACHE_VERSION = 'v1'
const CACHE_NAME = `workers-cache-${CACHE_VERSION}`

const ASSETS = [ //cache files so that the website works without internet
  '/',
  '/offline.html',
  '/overviewpage.html',
  '/pomodoromode.html',
  '/settingspage.html',
  '/trainingmode.html',
  '/workmode.html',
  '/style.css',
  '/localStorage.js',
  '/navigation.js',
  '/overviewDOM.js',
  '/script.js',
  '/statsDisplayDOM.js',
  '/statsDisplayLogic.js',
  '/themes.js',
  '/themesDOM.js',
  '/timerDOM.js',
  '/training.js',
  '/sw.js',
]

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
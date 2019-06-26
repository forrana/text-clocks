// Register the ServiceWorker limiting its action to those URL starting
// by `controlled`. The scope is not a path but a prefix. First, it is
// converted into an absolute URL, then used to determine if a page is
// controlled by testing it is a prefix of the request URL.
navigator.serviceWorker.register('service-worker.js', {
  scope: './css'
}).then(function(registration) {
  console.log('The service worker has been registered ', registration);
});

// navigator.serviceWorker.ready.then(reload);

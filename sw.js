
//injectManifest
// workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker
          .register('./service-wroker.js')
          .then(registration => {
              console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
          });
  });
}




// 通过 workbox.precaching 模块来处理 Service Worker 静态资源的预缓存。
// 通过 workbox.routing 模块提供的路由控制和 
// workbox.strategies 模快提供的缓存策略控制帮助你做动态缓存。



// https://zoumiaojiang.com/article/amazing-workbox-3/#
// 如果你有一些静态资源是需要永远的离线缓存，除非重新上线才更新缓存的话，那 precache 预缓存应该是你所期待的，
// 如果了解 Service Worker 的生命周期的话，precache 的工作是在 Service Worker install 时候通过 Cache API 完成的
// workbox 通过使用 precaching.precacheAndRoute 接口完成 precache 操作



// workbox.routing.registerRoute，接受两个参数，第一个参数 capture 是正则表达式或 Express 风格的路由字符串，声明需要匹配那些请求，
// 第二个参数用于告诉 Workbox 对前面拦截到的请求做何处理。


// 缓存策略    ->    https://www.cnblogs.com/EnSnail/p/9824198.html
// 1. stateWhileRevalidate：当请求的路由有对应的 Cache 缓存结果就直接返回，
// 在返回 Cache 缓存结果的同时会在后台发起网络请求拿到请求结果并更新 Cache 缓存，如果本来就没有 Cache 缓存的话，
// 直接就发起网络请求并返回结果，这对用户来说是一种非常安全的策略



// http://csbun.github.io/blog/2018/02/workbox/
// Workbox 可以用 networkFirst 和 staleWhileRevalidate 两种策略 Cache 跨域资源，而 cacheFirst 则完全不行。
// 按 官网的解释，Fetch 跨域的请求是无法知道该请求是否成功，因此 cacheFirst 则有可能缓存下了失败的请求，
// 并从此以后都会接管页面的这个请求导致页面错误。而 networkFirst 和 staleWhileRevalidate 是有更新机制的，
// 即使一次错误下次也许就修复了呢




// demo 
// https://github.com/csbun/workbox-examples/blob/master/workbox-using-webpack/webpack.config.js
// http://csbun.github.io/blog/2018/02/workbox/
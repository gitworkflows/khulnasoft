import { outputFileAsync, readFileAsync } from 'fs-extra-promise';
const pkg = require('../package.json');

async function main() {
  const [sjs /*systemMain*/] = await Promise.all([
    readFileAsync('./node_modules/systemjs/dist/s.min.js', 'utf8'),
    // readFileAsync('./dist/system/khulnasoft-webcomponents.js', 'utf8')
  ]);
  // TODO: bootstrap script goes here... hmmm...
  // TODO: export basic khulnasoft stuff from here so people can use js, or System.import name it hmm
  const newFileStr = (useAngular = false) =>
    `(function () { if (typeof window !== 'undefined' && !window.khulnasoftWebcomponentsLoaded) {\n` +
    [
      'window.khulnasoftWebcomponentsLoaded = true;',
      // Don't load System.js multiple times...
      sjs,
      // TODO: get the version of this and load - how does the others do
      /*systemMain*/ `
      function getQueryParam(url, variable) {
        var query = url.split('?')[1] || '';
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        return null;
      }
      var version = typeof location !== 'undefined' && location.href && getQueryParam(location.href, 'khulnasoft.wcVersion') ||  "${
        pkg.version
      }";

      var wcRootParam = typeof location !== 'undefined' && location.href && getQueryParam(location.href, 'khulnasoft.wcRoot');
      var root = wcRootParam === "dev" ? "http://localhost:1267" : "https://cdn.khulnasoft.com/js/webcomponents";
      /* TODO: make rollup es6 build and use WC es6 if browser supports */
      var useLiteQuery = getQueryParam(location.href, 'khulnasoft.useWcLite');
      var useLite = useLiteQuery ? JSON.parse(useLiteQuery) : 'customElements' in window;
      if (!window.khulnasoftWcLoadCallbacks) {
        window.khulnasoftWcLoadCallbacks = [];
      }
      if (!window.onKhulnasoftWcLoad) {
        window.onKhulnasoftWcLoad = function (cb) {
          if (window.KhulnasoftWC) {
            cb(KhulnasoftWC);
          } else {
            khulnasoftWcLoadCallbacks.push(cb);
          }
        };
      }
      System.import(root + (root.indexOf('://localhost:') === -1 ? '@' + version : '') + '/dist/system/${
        useAngular ? 'angular/' : ''
      }' + (useLite ? 'lite/' : '') + 'khulnasoft-webcomponents' + (useLite ? '-lite' : '') + '.js')
    `.replace(/\s+/g, ' '),
    ].join(';') +
    `}})()`;

  // May need to import to initialize: + ';System.import("...")'
  await outputFileAsync('./dist/system/khulnasoft-webcomponents-async.js', newFileStr());
  await outputFileAsync('./dist/system/angular/khulnasoft-webcomponents-async.js', newFileStr(true));
}

main().catch(err => {
  throw err;
});

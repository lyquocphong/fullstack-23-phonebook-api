(self.webpackChunkphonebook = self.webpackChunkphonebook || []).push([[787], {
  787(e, t, n) {
    n.r(t), n.d(t, {
      getCLS() { return d; }, getFCP() { return g; }, getFID() { return k; }, getLCP() { return F; }, getTTFB() { return C; },
    }); let i; let a; let r; let o; const u = function (e, t) {
      return {
        name: e, value: void 0 === t ? -1 : t, delta: 0, entries: [], id: 'v1-'.concat(Date.now(), '-').concat(Math.floor(8999999999999 * Math.random()) + 1e12),
      };
    }; const c = function (e, t) { try { if (PerformanceObserver.supportedEntryTypes.includes(e)) { const n = new PerformanceObserver(((e) => e.getEntries().map(t))); return n.observe({ type: e, buffered: !0 }), n; } } catch (e) {} }; const f = function (e, t) { const n = function n(i) { i.type !== 'pagehide' && document.visibilityState !== 'hidden' || (e(i), t && (removeEventListener('visibilitychange', n, !0), removeEventListener('pagehide', n, !0))); }; addEventListener('visibilitychange', n, !0), addEventListener('pagehide', n, !0); }; const s = function (e) { addEventListener('pageshow', ((t) => { t.persisted && e(t); }), !0); }; const p = typeof WeakSet === 'function' ? new WeakSet() : new Set(); const m = function (e, t, n) { let i; return function () { t.value >= 0 && (n || p.has(t) || document.visibilityState === 'hidden') && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t))); }; }; var d = function (e, t) { let n; let i = u('CLS', 0); const a = function (e) { e.hadRecentInput || (i.value += e.value, i.entries.push(e), n()); }; const r = c('layout-shift', a); r && (n = m(e, i, t), f((() => { r.takeRecords().map(a), n(); })), s((() => { i = u('CLS', 0), n = m(e, i, t); }))); }; let v = -1; const l = function () { return document.visibilityState === 'hidden' ? 0 : 1 / 0; }; const h = function () { f(((e) => { const t = e.timeStamp; v = t; }), !0); }; const S = function () { return v < 0 && (v = l(), h(), s((() => { setTimeout((() => { v = l(), h(); }), 0); }))), { get timeStamp() { return v; } }; }; var g = function (e, t) { let n; const i = S(); let a = u('FCP'); var r = c('paint', ((e) => { e.name === 'first-contentful-paint' && (r && r.disconnect(), e.startTime < i.timeStamp && (a.value = e.startTime, a.entries.push(e), p.add(a), n())); })); r && (n = m(e, a, t), s(((i) => { a = u('FCP'), n = m(e, a, t), requestAnimationFrame((() => { requestAnimationFrame((() => { a.value = performance.now() - i.timeStamp, p.add(a), n(); })); })); }))); }; const y = { passive: !0, capture: !0 }; const w = new Date(); const E = function (e, t) { i || (i = t, a = e, r = new Date(), b(removeEventListener), L()); }; var L = function () {
      if (a >= 0 && a < r - w) {
        const e = {
          entryType: 'first-input', name: i.type, target: i.target, cancelable: i.cancelable, startTime: i.timeStamp, processingStart: i.timeStamp + a,
        }; o.forEach(((t) => { t(e); })), o = [];
      }
    }; const T = function (e) { if (e.cancelable) { const t = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp; e.type == 'pointerdown' ? (function (e, t) { const n = function () { E(e, t), a(); }; const i = function () { a(); }; var a = function () { removeEventListener('pointerup', n, y), removeEventListener('pointercancel', i, y); }; addEventListener('pointerup', n, y), addEventListener('pointercancel', i, y); }(t, e)) : E(t, e); } }; var b = function (e) { ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(((t) => e(t, T, y))); }; var k = function (e, t) { let n; const r = S(); let d = u('FID'); const v = function (e) { e.startTime < r.timeStamp && (d.value = e.processingStart - e.startTime, d.entries.push(e), p.add(d), n()); }; const l = c('first-input', v); n = m(e, d, t), l && f((() => { l.takeRecords().map(v), l.disconnect(); }), !0), l && s((() => { let r; d = u('FID'), n = m(e, d, t), o = [], a = -1, i = null, b(addEventListener), r = v, o.push(r), L(); })); }; var F = function (e, t) { let n; const i = S(); let a = u('LCP'); const r = function (e) { const t = e.startTime; t < i.timeStamp && (a.value = t, a.entries.push(e)), n(); }; const o = c('largest-contentful-paint', r); if (o) { n = m(e, a, t); const d = function () { p.has(a) || (o.takeRecords().map(r), o.disconnect(), p.add(a), n()); }; ['keydown', 'click'].forEach(((e) => { addEventListener(e, d, { once: !0, capture: !0 }); })), f(d, !0), s(((i) => { a = u('LCP'), n = m(e, a, t), requestAnimationFrame((() => { requestAnimationFrame((() => { a.value = performance.now() - i.timeStamp, p.add(a), n(); })); })); })); } }; var C = function (e) { let t; const n = u('TTFB'); t = function () { try { const t = performance.getEntriesByType('navigation')[0] || (function () { const e = performance.timing; const t = { entryType: 'navigation', startTime: 0 }; for (const n in e)n !== 'navigationStart' && n !== 'toJSON' && (t[n] = Math.max(e[n] - e.navigationStart, 0)); return t; }()); n.value = n.delta = t.responseStart, n.entries = [t], e(n); } catch (e) {} }, document.readyState === 'complete' ? setTimeout(t, 0) : addEventListener('pageshow', t); };
  },
}]);
// # sourceMappingURL=787.6a91195d.chunk.js.map

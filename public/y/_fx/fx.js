/* Motion layer for hosted demos: smooth scroll, scroll reveals, progress bar, back-to-portfolio badge. */
(function () {
  var doc = document.documentElement
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  var framed = window.top !== window
  doc.classList.add('mxy')

  function ready(fn) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn() }

  /* ---------- accent colour: the most saturated button/link background ---------- */
  function accent() {
    var best = null, bestS = 0.25
    var els = document.querySelectorAll('a, button')
    for (var i = 0; i < els.length && i < 200; i++) {
      var c = getComputedStyle(els[i]).backgroundColor.match(/\d+(\.\d+)?/g)
      if (!c || (c[3] !== undefined && +c[3] < 0.6)) continue
      var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255
      var mx = Math.max(r, g, b), mn = Math.min(r, g, b)
      var s = mx === 0 ? 0 : (mx - mn) / mx
      if (s > bestS && mx > 0.25) { bestS = s; best = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' }
    }
    return best
  }

  /* ---------- smooth scroll ---------- */
  var lenis = null
  function scrollableAncestor(node) {
    for (var el = node; el && el !== document.body; el = el.parentElement) {
      if (!(el instanceof Element)) continue
      var oy = getComputedStyle(el).overflowY
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) return true
      var ox = getComputedStyle(el).overflowX
      if ((ox === 'auto' || ox === 'scroll') && el.scrollWidth > el.clientWidth + 1) return true
    }
    return false
  }
  function startLenis() {
    if (calm || framed || !window.Lenis || matchMedia('(pointer: coarse)').matches) return
    lenis = new window.Lenis({ autoRaf: true, lerp: 0.11, anchors: true, prevent: scrollableAncestor })
    // Pause while the page locks scrolling (cart drawers, menus, dialogs)
    var locked = function () {
      var h = getComputedStyle(doc).overflowY, b = getComputedStyle(document.body).overflowY
      return h === 'hidden' || b === 'hidden' || document.body.style.position === 'fixed'
    }
    new MutationObserver(function () { locked() ? lenis.stop() : lenis.start() })
      .observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] })
    new MutationObserver(function () { locked() ? lenis.stop() : lenis.start() })
      .observe(doc, { attributes: true, attributeFilter: ['style', 'class'] })
  }

  /* ---------- reveals ---------- */
  var SEL = 'main h1, main h2, main h3, main p, main img, main picture, main video, main article, main li, main figure, main blockquote, main form, ' +
    'section h2, section h3, section p, section img, section article, section li, section figure, section form, section blockquote, footer > *'
  var io = null
  function eligible(el) {
    if (el.classList.contains('mxy-r') || el.closest('#mxy-badge, nav, header, dialog, [role="dialog"], [aria-modal="true"]')) return false
    if (el.parentElement && el.parentElement.closest('.mxy-r')) return false // parent already animates
    var cs = getComputedStyle(el)
    if (cs.position === 'fixed' || cs.position === 'sticky') return false
    if (cs.animationName !== 'none' || +cs.opacity < 1 || /opacity|all/.test(cs.transitionProperty) && cs.transitionDuration !== '0s') return false
    var r = el.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return false
    return r.top > innerHeight * 0.92 // only what starts below the fold
  }
  function register(root) {
    if (!io) return
    var list = (root.querySelectorAll ? root.querySelectorAll(SEL) : [])
    var groups = new Map()
    for (var i = 0; i < list.length; i++) {
      var el = list[i]
      if (!eligible(el)) continue
      var k = el.parentElement
      var n = groups.get(k) || 0
      groups.set(k, n + 1)
      el.style.setProperty('--mxy-d', Math.min(n, 6) * 70 + 'ms')
      el.classList.add('mxy-r')
      io.observe(el)
    }
  }
  function startReveals() {
    if (calm) return
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('mxy-in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    register(document)
    // Lists re-rendered by the demo (filters, carts) animate in too
    new MutationObserver(function (muts) {
      muts.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1 && n.parentElement) register(n.parentElement) }) })
    }).observe(document.body, { childList: true, subtree: true })
    // Failsafe: anything still hidden at the very bottom of the page shows
    addEventListener('scroll', function () {
      if (innerHeight + scrollY >= doc.scrollHeight - 4)
        document.querySelectorAll('.mxy-r:not(.mxy-in)').forEach(function (el) { el.classList.add('mxy-in') })
    }, { passive: true })
  }

  /* ---------- hover lift on cards ---------- */
  function lift() {
    if (calm) return
    document.querySelectorAll('article, [class*="card"], [class*="Card"]').forEach(function (el) {
      var cs = getComputedStyle(el)
      if (cs.position === 'fixed' || el.closest('nav, header, dialog')) return
      if (/transform|translate|all/.test(cs.transitionProperty) && cs.transitionDuration !== '0s') return
      el.classList.add('mxy-lift')
    })
  }

  /* ---------- progress bar + badge ---------- */
  function chrome() {
    if (framed) return
    var bar = document.createElement('div')
    bar.id = 'mxy-progress'
    var a = accent()
    if (a) bar.style.setProperty('--mxy-accent', a)
    document.body.appendChild(bar)

    var ar = (doc.lang || 'ar').slice(0, 2) !== 'en'
    var badge = document.createElement('a')
    badge.id = 'mxy-badge'
    badge.href = '../../index.html#work'
    badge.innerHTML = '<b>' + (ar ? 'م×ي' : 'M×Y') + '</b>' + (ar ? 'ديمو من محمد × يوسف — رجوع للأعمال' : 'Demo by Mohamed × Yousef — back to work')
    badge.style.fontSize = '12px'
    document.body.appendChild(badge)

    var last = scrollY
    function onScroll() {
      var max = doc.scrollHeight - innerHeight
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')'
      var down = scrollY > last + 2, up = scrollY < last - 2
      if (down && scrollY > 200) badge.classList.add('mxy-hide')
      if (up || scrollY < 120) badge.classList.remove('mxy-hide')
      last = scrollY
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  ready(function () {
    // Let the demo build its own DOM first
    requestAnimationFrame(function () {
      setTimeout(function () {
        startLenis()
        startReveals()
        lift()
        chrome()
      }, 60)
    })
  })
})()

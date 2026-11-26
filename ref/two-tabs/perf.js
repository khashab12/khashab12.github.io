(function(){
  var d=document.documentElement,n=navigator;
  try{if((n.hardwareConcurrency&&n.hardwareConcurrency<=4)||(n.deviceMemory&&n.deviceMemory<=4))d.classList.add('lite')}catch(e){}
  if(!('IntersectionObserver' in window))return;
  var map=new WeakMap();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var t=map.get(e.target);if(t)t.classList.toggle('mq-off',!e.isIntersecting)})},{rootMargin:'80px'});
  function scan(){document.querySelectorAll('.marquee-track:not([data-pf])').forEach(function(t){t.setAttribute('data-pf','1');var w=t.closest('.marquee')||t.parentElement;map.set(w,t);io.observe(w)})}
  scan();
  var mo=new MutationObserver(scan);
  mo.observe(document.body,{childList:true,subtree:true});
  setTimeout(function(){mo.disconnect()},15000);
})();
(function(){
  try{
    function dec(){document.querySelectorAll('img:not([data-dec])').forEach(function(i){i.setAttribute('data-dec','1');i.decoding='async'})}
    dec();
    var mo=new MutationObserver(function(){clearTimeout(dec.t);dec.t=setTimeout(dec,200)});
    mo.observe(document.body,{childList:true,subtree:true});
    setTimeout(function(){mo.disconnect()},20000);
  }catch(e){}
})();

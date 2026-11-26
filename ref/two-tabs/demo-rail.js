(function(){
  var SPEED=38; /* px per second */
  var rail=null,box=null,P=0,pos=0,lastSet=null,lastUser=0,down=false,visible=false,raf=0,lastT=0,mo=null,rtl=false,busy=false;
  var css=document.createElement('style');
  css.textContent='.rail.rail-auto{scroll-snap-type:none!important;overscroll-behavior-x:contain}';
  document.head.appendChild(css);
  function findRail(){
    var list=document.querySelectorAll('#work .rail');
    for(var i=0;i<list.length;i++){if(list[i].querySelector('.rail-item'))return list[i]}
    return null;
  }
  function items(){return Array.prototype.filter.call(box.children,function(c){return c.classList.contains('rail-item')&&!c.hasAttribute('data-clone')})}
  function build(){
    if(!rail||busy)return;
    busy=true;if(mo)mo.disconnect();
    Array.prototype.slice.call(box.querySelectorAll('[data-clone]')).forEach(function(c){c.remove()});
    var its=items();
    if(its.length&&(its.length<3||rail.scrollWidth<=rail.clientWidth+2)){rail.scrollLeft=0;P=0;pos=0;lastSet=null;rail.classList.remove('rail-auto');its=[];}
    else if(its.length){rail.classList.add('rail-auto');
      var first=its[0].offsetLeft,last=its[its.length-1];
      var gap=parseFloat(getComputedStyle(box).columnGap)||16;
      var w=Math.abs(last.offsetLeft+last.offsetWidth-first)+gap;
      P=w;
      var k=Math.ceil(rail.clientWidth/P)+1;
      for(var j=0;j<k;j++){
        its.forEach(function(it){
          var c=it.cloneNode(true);
          c.setAttribute('data-clone','1');c.setAttribute('aria-hidden','true');
          c.style.opacity='1';c.style.transform='none';
          Array.prototype.forEach.call(c.querySelectorAll('a'),function(a){a.setAttribute('tabindex','-1')});
          box.appendChild(c);
        });
      }
      /* exact period: distance between first original and first clone */
      var fc=box.querySelector('[data-clone]');
      if(fc)P=Math.abs(fc.offsetLeft-first);
      pos=P+(((rtl?-rail.scrollLeft:rail.scrollLeft)%P)+P)%P*0; /* start at second set */
      pos=Math.max(P,Math.min(P*2-1,Math.abs(rail.scrollLeft)%P+P));
      set(pos);
    }
    watch();busy=false;
  }
  function set(p){pos=p;var v=Math.round(p*100)/100;rail.scrollLeft=rtl?-v:v;lastSet=rail.scrollLeft}
  function cur(){return Math.abs(rail.scrollLeft)}
  function watch(){if(!mo)mo=new MutationObserver(onMut);mo.observe(box,{childList:true})}
  var tm=0;
  function onMut(recs){
    var real=recs.some(function(r){
      return Array.prototype.some.call(r.addedNodes,function(n){return n.nodeType===1&&!n.hasAttribute('data-clone')})||
             Array.prototype.some.call(r.removedNodes,function(n){return n.nodeType===1&&!n.hasAttribute('data-clone')});
    });
    if(real){clearTimeout(tm);tm=setTimeout(function(){rail.scrollLeft=0;build()},60)}
  }
  function frame(t){
    raf=requestAnimationFrame(frame);
    var dt=Math.min(50,t-lastT);lastT=t;
    if(!visible||!P)return;
    var c=cur();
    if(lastSet!==null&&Math.abs(rail.scrollLeft-lastSet)>1.5){lastUser=t;pos=c;lastSet=rail.scrollLeft;return}
    if(down||t-lastUser<500){pos=c;return}
    pos+=SPEED*dt/1000;
    while(pos>=P*2)pos-=P;
    while(pos<P)pos+=P;
    set(pos);
  }
  document.addEventListener('pointerdown',function(e){if(rail&&rail.contains(e.target)){down=true}},true);
  function up(){down=false;lastUser=performance.now()}
  document.addEventListener('pointerup',up,true);
  document.addEventListener('pointercancel',up,true);
  document.addEventListener('wheel',function(e){if(rail&&rail.contains(e.target))lastUser=performance.now()},{passive:true,capture:true});
  window.addEventListener('resize',function(){if(rail){clearTimeout(tm);tm=setTimeout(build,150)}});
  function ready(){
    var it=document.querySelector('#work .rail .rail-item');
    if(!it)return false;
    var s=it.getAttribute('style')||'';
    return !/opacity:\s*0(?![.\d])/.test(s);
  }
  function init(){
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var tries=0;
    setInterval(function(){if(rail&&!busy&&!rail.classList.contains('rail-auto')&&!box.querySelector('[data-clone]')&&rail.scrollWidth>rail.clientWidth+2&&items().length>=3)build()},400);
    var iv=setInterval(function(){
      tries++;
      var r=findRail();
      if(r&&ready()){
        clearInterval(iv);
        rail=r;box=r.firstElementChild;rtl=getComputedStyle(r).direction==='rtl';
        rail.classList.add('rail-auto');
        build();
        if('IntersectionObserver' in window){
          new IntersectionObserver(function(es){visible=es[es.length-1].isIntersecting}).observe(rail);
        }else visible=true;
        lastT=performance.now();raf=requestAnimationFrame(frame);
      }else if(tries>100)clearInterval(iv);
    },200);
  }
  if(document.readyState==='complete')init();else window.addEventListener('load',init);
})();

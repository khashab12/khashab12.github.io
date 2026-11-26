(function(){
  var css=document.createElement('style');
  css.textContent='.marquee{touch-action:pan-y pinch-zoom;cursor:grab;-webkit-user-select:none;user-select:none}.marquee.is-dragging{cursor:grabbing}.marquee img{-webkit-user-drag:none}.marquee:hover .marquee-track{animation-play-state:running}.rail{cursor:grab}.rail.is-dragging{cursor:grabbing;scroll-snap-type:none!important;scroll-behavior:auto!important}.rail.is-dragging *{pointer-events:none}';
  document.head.appendChild(css);
  function anims(el){return el.getAnimations({subtree:true}).filter(function(a){return a.animationName==='marquee'})}
  var drag=null,suppress=false,raf=0,inertia=null;
  function stopInertia(){
    if(raf){cancelAnimationFrame(raf);raf=0}
    if(inertia){inertia.finish();inertia=null}
  }
  document.addEventListener('pointerdown',function(e){
    if(e.pointerType==='mouse'&&e.button!==0)return;
    var el=e.target.closest&&e.target.closest('.marquee');
    var kind='marquee';
    if(!el&&e.pointerType==='mouse'){
      el=e.target.closest&&e.target.closest('.rail');
      if(el&&el.scrollWidth<=el.clientWidth+1)el=null;
      kind='rail';
    }
    if(!el)return;
    stopInertia();
    drag={el:el,kind:kind,id:e.pointerId,x0:e.clientX,y0:e.clientY,moving:false,list:null,base:null,k:0,s0:el.scrollLeft,pts:[]};
  },true);
  function start(d){
    if(d.kind==='rail'){d.el.classList.add('is-dragging');try{d.el.setPointerCapture(d.id)}catch(_){}return true}
    d.list=anims(d.el);
    if(!d.list.length){drag=null;return false}
    var tr=d.el.querySelector('.marquee-track');
    d.list.forEach(function(a){a.pause()});
    d.base=d.list.map(function(a){
      var D=a.effect.getComputedTiming().duration;
      var t=((a.currentTime%D)+D)%D+D*1000;
      a.currentTime=t;return t});
    var x1=tr.getBoundingClientRect().left;
    var a0=d.list[0],D0=a0.effect.getComputedTiming().duration;
    a0.currentTime=d.base[0]+D0/50;
    var x2=tr.getBoundingClientRect().left;
    a0.currentTime=d.base[0];
    d.k=(x2-x1)/(D0/50);
    if(!d.k||!isFinite(d.k)){d.list.forEach(function(a){a.play()});drag=null;return false}
    d.el.classList.add('is-dragging');
    try{d.el.setPointerCapture(d.id)}catch(_){}
    return true;
  }
  function apply(d,dx){
    if(d.kind==='rail'){d.el.scrollLeft=d.s0-dx;return}
    d.list.forEach(function(a,i){a.currentTime=d.base[i]+(dx/d.k)});
  }
  document.addEventListener('pointermove',function(e){
    var d=drag;if(!d||e.pointerId!==d.id)return;
    var dx=e.clientX-d.x0;
    if(!d.moving){
      if(Math.abs(dx)<3||Math.abs(dx)<Math.abs(e.clientY-d.y0))return;
      if(!start(d))return;
      d.moving=true;
    }
    var evs=e.getCoalescedEvents?e.getCoalescedEvents():[];
    if(!evs.length)evs=[e];
    evs.forEach(function(c){d.pts.push([c.timeStamp,c.clientX-d.x0])});
    while(d.pts.length>2&&d.pts[d.pts.length-1][0]-d.pts[0][0]>100)d.pts.shift();
    d.dx=dx;
    apply(d,dx);
    e.preventDefault();
  },{passive:false});
  function end(e){
    var d=drag;if(!d||e.pointerId!==d.id)return;
    drag=null;
    if(!d.moving)return;
    d.el.classList.remove('is-dragging');
    suppress=true;setTimeout(function(){suppress=false},0);
    var p=d.pts,v=0;
    if(p.length>1){var dt=p[p.length-1][0]-p[0][0];if(dt>0&&performance.now()-e.timeStamp<150)v=(p[p.length-1][1]-p[0][1])/dt}
    if(e.type==='pointercancel')v=0;
    v=Math.max(-3,Math.min(3,v)); /* px per ms */
    var x=d.dx||0,last=performance.now();
    function resume(){raf=0;inertia=null;if(d.kind==='marquee')d.list.forEach(function(a){a.play()})}
    if(Math.abs(v)<0.05){resume();return}
    function step(now){
      var dt=Math.min(40,now-last);last=now;
      x+=v*dt;v*=Math.exp(-dt/380);
      apply(d,x);
      if(Math.abs(v)<0.03){resume();return}
      raf=requestAnimationFrame(step);
    }
    inertia={finish:function(){if(d.kind==='marquee')d.list.forEach(function(a){a.play()})}};
    raf=requestAnimationFrame(step);
  }
  document.addEventListener('pointerup',end,true);
  document.addEventListener('pointercancel',end,true);
  document.addEventListener('click',function(e){if(suppress){e.preventDefault();e.stopPropagation()}},true);
  document.addEventListener('dragstart',function(e){if(e.target.closest&&e.target.closest('.marquee,.rail'))e.preventDefault()},true);
})();

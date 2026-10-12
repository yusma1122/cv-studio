// Renders a CV from the data model. User text goes in via textContent only. Each template = its own section order + layout (see LAY and templates.css).
CVS.render=function(d){var E=CVS.rawEl,L=CVS.L[d.lang],p=d.p,T=d.template,S=d.sec||{},pg=E('div','page tpl-'+T),B={},hx=d.accent||'#2b3a8c';
 pg.style.setProperty('--ac',hx);pg.style.setProperty('--on',(parseInt(hx.slice(1,3),16)*.299+parseInt(hx.slice(3,5),16)*.587+parseInt(hx.slice(5,7),16)*.114)>150?'#111':'#fff');
 function sec(t){var s=E('section');s.appendChild(E('h2','',t));return s;}
 function item(s,a,b,c,desc){var i=E('div','it'),h=E('div','hd');h.appendChild(E('span','',a));h.appendChild(E('span','',b));i.appendChild(h);if(c)i.appendChild(E('div','t',c));if(desc)i.appendChild(E('p','',desc));s.appendChild(i);}
 function rng(x){return x.start?x.start+' - '+(x.end||L.now):(x.end||'');}
 function list(k,f,key){var l=d[k].filter(f);return l.length?l:null;}
 B.sum=function(){if(!p.summary)return null;var s=sec(T==='executive'?L.exec:L.sum);s.appendChild(E('p','',p.summary));return s;};
 B.exp=function(){var l=list('exp',function(x){return x.title||x.company;});if(!l)return null;var s=sec(T==='fresh'?L.expf:L.exp);l.forEach(function(x){item(s,x.title,rng(x),x.company,x.desc);});return s;};
 B.proj=function(){var l=S.proj&&list('proj',function(x){return x.name;});if(!l)return null;var s=sec(L.proj);l.forEach(function(x){item(s,x.name,[x.start,x.end].filter(Boolean).join(' - '),[x.role,x.tech].filter(Boolean).join(' | '),[x.desc,x.url].filter(Boolean).join('\n'));});return s;};
 B.edu=function(){var l=list('edu',function(x){return x.school||x.degree;});if(!l)return null;var s=sec(L.edu);l.forEach(function(x){item(s,x.school,[x.start,x.end].filter(Boolean).join(' - '),x.degree,x.desc);});return s;};
 B.cert=function(){var l=S.cert&&list('cert',function(x){return x.name;});if(!l)return null;var s=sec(L.cert);l.forEach(function(x){item(s,x.name,x.date?x.date+(x.exp?' - '+x.exp:''):'',x.org,x.url);});return s;};
 B.ach=function(){var l=S.ach&&list('ach',function(x){return x.name;});if(!l)return null;var s=sec(L.ach);l.forEach(function(x){item(s,x.name,x.date,'',x.desc);});return s;};
 B.skills=function(){var sk=d.skills.split(',').map(function(x){return x.trim();}).filter(Boolean);if(!sk.length)return null;var s=sec(L.skills);
  if(T==='fresh'){var u=E('ul','sk');sk.forEach(function(x){u.appendChild(E('li','',x));});s.appendChild(u);}else s.appendChild(E('p','',sk.join(', ')));return s;};
 B.tech=function(){var l=S.tech&&list('tech',function(x){return x.items;});if(!l)return null;var s=sec(L.tech);l.forEach(function(x){s.appendChild(E('p','',(x.cat?x.cat+': ':'')+x.items));});return s;};
 var A=['sum','exp','proj','edu','cert','ach','skills','tech'],LAY={ats:[A,[]],minimal:[A,[]],modern:[['sum','exp','proj','edu','cert','ach'],['skills','tech']],
  executive:[['sum','exp','ach','proj','edu','cert','skills','tech'],[]],creative:[['sum','exp','proj','edu','ach'],['skills','tech','cert']],fresh:[['sum','edu','proj','exp','ach','cert','skills','tech'],[]]},
  lay=LAY[T]||LAY.ats,main=E('main'),side=E('aside'),head=E('header'),tb=E('div'),meta=[p.email,p.phone,p.city,p.linkedin,p.github,p.portfolio].filter(Boolean),ph=d.photo,im=null;
 lay[0].forEach(function(k){var n=B[k]();if(n)main.appendChild(n);});lay[1].forEach(function(k){var n=B[k]();if(n)side.appendChild(n);});
 if(ph&&ph.show&&ph.data){var r={circle:'50%',square:'0',rounded:'14%',portrait:'0'};im=E('img','photo');im.alt='';im.src=ph.data;im.style.width=ph.size+'mm';im.style.height=(ph.shape==='portrait'?ph.size*4/3:ph.size)+'mm';
  im.style.borderRadius=r[ph.shape]||'0';im.style.border=ph.bw?ph.bw+'px solid '+ph.border:'0';im.onerror=function(){im.remove();};}
 tb.appendChild(E('h1','',p.name||'Nama Lengkap'));if(p.title)tb.appendChild(E('div','t',p.title));head.appendChild(tb);
 if(T==='creative'){var cs=sec(L.contact);cs.className='contact';meta.forEach(function(m){cs.appendChild(E('div','',m));});side.insertBefore(cs,side.firstChild);if(im)side.insertBefore(im,side.firstChild);
  main.insertBefore(head,main.firstChild);pg.append(side,main);}
 else{if(meta.length)tb.appendChild(E('div','meta',meta.join(' | ')));if(im){head.className='withph';head.appendChild(im);}
  if(lay[1].length)pg.append(head,side,main);else pg.append(head,main);}
 return pg;};

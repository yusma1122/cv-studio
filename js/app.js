(function(){var view=home,E=CVS.el,app=document.getElementById('app'),S=CVS.store.load(),statusEl=null;
 function persist(loud){var ok=CVS.store.save(S);if(!ok&&loud)CVS.toast('Gagal menyimpan: penyimpanan browser penuh atau dinonaktifkan.');return ok;}
 CVS.store.onStatus=function(t){if(statusEl)statusEl.textContent=CVS.t(t);};
 function cur(){return S.docs.filter(function(d){return d.id===S.active;})[0];}
 var TPL=[['ats','ATS Classic','Disarankan untuk ATS'],['modern','Modern Professional','Header berwarna dengan sidebar'],['executive','Executive','Formal, menonjolkan pengalaman'],['minimal','Minimalist','Lega dan sederhana'],['creative','Creative','Sidebar berwarna, tipografi ekspresif'],['fresh','Fresh Graduate','Pendidikan dan proyek lebih dulu']];
 function tname(k){return (TPL.filter(function(t){return t[0]===k;})[0]||TPL[0])[1];}
 function logo(){var ns='http://www.w3.org/2000/svg',v=document.createElementNS(ns,'svg');v.setAttribute('viewBox','0 0 24 24');v.setAttribute('width','30');v.setAttribute('height','30');v.setAttribute('aria-hidden','true');
  [{x:2,y:2,width:20,height:20,rx:5,fill:'#2b3a8c'},{x:6,y:7,width:7,height:2,rx:1,fill:'#fff'},{x:6,y:11,width:12,height:2,rx:1,fill:'#fff'},{x:6,y:15,width:9,height:2,rx:1,fill:'#fff'}].forEach(function(a){var e=document.createElementNS(ns,'rect');for(var k in a)e.setAttribute(k,a[k]);v.appendChild(e);});return v;}
 function thumb(k){var w=E('div','th th-'+k);w.setAttribute('aria-hidden','true');['s','h','l','l','l','l'].forEach(function(c){w.appendChild(E('i',c));});return w;}
 function home(){view=home;app.textContent='';var h=E('div','home'),top=E('div','top'),br=E('div','brand');br.append(logo(),CVS.rawEl('span','','CV Studio'));top.append(br,uiSel());
  var hero=E('section','hero'),r=E('div','row'),n=E('button','pri big','Buat CV Baru'),s=E('button','big','Gunakan Contoh CV'),ch=E('ul','chips');
  n.onclick=function(){add(CVS.blank());};s.onclick=function(){add(CVS.sample());};r.append(n,s);
  ['Tanpa akun','Bekerja offline','6 template','Ekspor PDF','Cadangan JSON'].forEach(function(c){ch.appendChild(E('li','',c));});
  hero.append(E('h1','','Buat CV profesional dalam hitungan menit'),E('p','lead','Isi data, pilih template, dan lihat hasilnya langsung. Tanpa akun, tanpa server, data tetap di browser Anda.'),r,ch);
  var gal=E('section'),gr=E('div','gal');gal.appendChild(E('h2','','Pilih Template'));
  TPL.forEach(function(t){var b=E('button','tpl');b.type='button';b.setAttribute('aria-label',CVS.t('Buat CV Baru')+': '+t[1]);b.append(thumb(t[0]),CVS.rawEl('strong','',t[1]),E('span','',t[2]));
   b.onclick=function(){var d=CVS.blank();d.template=t[0];add(d);};gr.appendChild(b);});gal.appendChild(gr);
  var my=E('section');my.appendChild(E('h2','','CV Saya'));my.appendChild(ioRow());
  if(!S.docs.length)my.appendChild(E('div','empty','Belum ada CV. Mulai dengan template di atas atau gunakan contoh CV.'));
  S.docs.forEach(function(d){var c=E('div','card'),i=E('div');i.append(CVS.rawEl('strong','',d.name||CVS.t('Tanpa judul')),CVS.rawEl('small','',tname(d.template)+' \u00b7 '+(d.lang==='en'?'English':'Bahasa Indonesia')));c.appendChild(i);var b=E('div','row');
   function btn(t,f,cl){var x=E('button',cl||'',t);x.onclick=f;b.appendChild(x);}
   btn('Buka',function(){S.active=d.id;editor();});
   btn('Ganti nama',function(){var v=prompt(CVS.t('Nama CV:'),d.name);if(v){d.name=v;persist(true);home();}});
   btn('Ekspor',function(){exportDocs([d]);});
   btn('Duplikat',function(){var c2=JSON.parse(JSON.stringify(d));c2.id=CVS.uid();c2.name=d.name+CVS.t(' (salinan)');S.docs.push(c2);persist(true);home();});
   btn('Hapus',function(){if(confirm(CVS.t('Hapus "%s"? Tindakan ini tidak dapat dibatalkan.').replace('%s',d.name))){S.docs=S.docs.filter(function(x){return x!==d;});persist(true);home();}},'dng');
   c.appendChild(b);my.appendChild(c);});
  h.append(top,hero,gal,my,E('div','info','Ingin CV tersimpan dengan aman? Ekspor ke file JSON, lalu impor kembali kapan saja (misalnya setelah data browser dihapus atau di perangkat lain).'));
  if(CVS.store.warn){var w=E('div','warn',CVS.store.warn);w.setAttribute('role','alert');h.appendChild(w);}
  h.appendChild(E('p','note','Data CV disimpan hanya di browser ini (localStorage). Data tidak terenkripsi, tidak dikirim ke server mana pun, dan dapat hilang jika data browser dihapus.'));
  var ft=CVS.rawEl('footer','foot');ft.textContent=CVS.t('Dibuat oleh')+' Yusma Rahman </>';h.appendChild(ft);app.appendChild(h);}
 function uiSel(){var s=CVS.rawEl('select','uisel');s.setAttribute('aria-label',CVS.t('Bahasa antarmuka'));
  [['id','Bahasa Indonesia'],['en','English']].forEach(function(o){var x=CVS.rawEl('option','',o[1]);x.value=o[0];s.appendChild(x);});s.value=CVS.ui;s.onchange=function(){CVS.setUi(s.value);view();};return s;}
function exportDocs(docs){CVS.io.download(CVS.io.fname(docs.length===1?docs[0].name:'cv-studio-backup'),CVS.io.pack(docs));CVS.toast(CVS.t('CV berhasil diekspor. Simpan file ini sebagai cadangan.'));}
 function importFile(f){if(!f)return;if(f.size>5*1024*1024)return CVS.toast(CVS.t('File terlalu besar (maks. 5 MB).'));
  var r=new FileReader();r.onerror=function(){CVS.toast(CVS.t('File tidak dapat dibaca.'));};
  r.onload=function(){var res=CVS.io.parse(String(r.result));if(res.error)return CVS.toast(CVS.t(res.error));
   var n=S.docs.length;res.docs.forEach(function(d){S.docs.push(d);});
   if(!persist(true)){S.docs.length=n;return;}
   CVS.toast(CVS.t('%s CV berhasil diimpor.').replace('%s',res.docs.length));home();};r.readAsText(f);}
 function ioRow(){var w=E('div','row'),fi=CVS.rawEl('input'),im=E('button','','Impor CV (JSON)');fi.type='file';fi.accept='.json,application/json';fi.hidden=true;
  fi.onchange=function(){importFile(fi.files[0]);fi.value='';};im.onclick=function(){fi.click();};w.append(im,fi);
  if(S.docs.length){var ea=E('button','','Ekspor semua CV');ea.onclick=function(){exportDocs(S.docs);};w.appendChild(ea);}return w;}
 function add(d){S.docs.push(d);S.active=d.id;persist(true);editor();}
 function editor(){view=editor;var d=cur();if(!d)return home();app.textContent='';
  var bar=E('div','bar'),back=E('button','','Dasbor');back.onclick=home;
  var nm=E('input');nm.type='text';nm.value=d.name;nm.setAttribute('aria-label',CVS.t('Nama dokumen'));
  function sel(opts,key,lbl){var s=E('select');s.setAttribute('aria-label',CVS.t(lbl));opts.forEach(function(o){var x=E('option','',o[1]);x.value=o[0];s.appendChild(x);});s.value=d[key];s.onchange=function(){d[key]=s.value;change();};return s;}
  var col=E('input');col.type='color';col.value=d.accent;col.setAttribute('aria-label',CVS.t('Warna aksen'));col.oninput=function(){d.accent=col.value;change();};
  var ex=E('button','','Ekspor JSON');ex.onclick=function(){exportDocs([d]);};var pr=E('button','pri','Cetak / PDF');pr.onclick=CVS.exportPdf;statusEl=E('span','status','Tersimpan');statusEl.setAttribute('role','status');
  bar.append(back,nm,sel([['ats','ATS Classic (disarankan untuk ATS)'],['modern','Modern Professional'],['executive','Executive'],['minimal','Minimalist'],['creative','Creative'],['fresh','Fresh Graduate']],'template','Template'),sel([['id','CV: Indonesia'],['en','CV: English']],'lang','Bahasa CV'),col,uiSel(),ex,pr,statusEl);
  var tabs=E('div','tabs'),form=E('div','form show'),pv=E('div','pv'),sp=E('div','split');
  [['Editor',form,pv],['Pratinjau',pv,form]].forEach(function(t){var b=E('button','',t[0]);b.onclick=function(){t[1].classList.add('show');t[2].classList.remove('show');};tabs.appendChild(b);});
  sp.append(form,pv);app.append(bar,tabs,sp);
  var draw=function(){pv.textContent='';pv.appendChild(CVS.render(d));},save=CVS.debounce(persist,400);
  function change(){draw();CVS.store.onStatus('Menyimpan...');save();}
  nm.oninput=function(){d.name=nm.value;change();};
  CVS.editor.build(form,d,change);draw();}
 home();})();

// Builds the form from field schemas; inputs write straight to the data model, so the cursor is never reset.
CVS.editor={
 P:[['name','Nama lengkap'],['title','Jabatan profesional'],['email','Email'],['phone','Telepon'],['city','Kota, negara'],['linkedin','URL LinkedIn'],['github','URL GitHub'],['portfolio','URL portofolio'],['summary','Ringkasan profesional','t']],
 X:[['title','Jabatan'],['company','Perusahaan'],['start','Mulai (mis. Jan 2022)'],['end','Selesai (kosong = sekarang)'],['desc','Deskripsi / pencapaian','t']],
 D:[['school','Institusi'],['degree','Gelar / jurusan'],['start','Mulai'],['end','Selesai'],['desc','Informasi tambahan','t']],
 field:function(box,obj,f,change){var id='f'+(CVS.n=(CVS.n||0)+1),w=CVS.el('div'),l=CVS.el('label','',f[1]);l.htmlFor=id;
  var i=f[2]?CVS.el('textarea'):CVS.el('input');i.id=id;i.value=obj[f[0]]||'';i.addEventListener('input',function(){obj[f[0]]=i.value;change();});w.append(l,i);box.appendChild(w);},
 list:function(box,title,arr,schema,change){var self=this,wrap=CVS.el('div');box.appendChild(CVS.el('h2','',title));box.appendChild(wrap);
  function draw(){wrap.textContent='';arr.forEach(function(o,n){var e=CVS.el('div','entry');schema.forEach(function(f){self.field(e,o,f,change);});
   var r=CVS.el('div','row');[['Naik',-1],['Turun',1]].forEach(function(b){var k=CVS.el('button','',b[0]);k.type='button';k.onclick=function(){var j=n+b[1];if(j<0||j>=arr.length)return;arr.splice(j,0,arr.splice(n,1)[0]);draw();change();};r.appendChild(k);});
   var del=CVS.el('button','dng','Hapus');del.type='button';del.onclick=function(){if(confirm(CVS.t('Hapus entri ini?'))){arr.splice(n,1);draw();change();}};r.appendChild(del);e.appendChild(r);wrap.appendChild(e);});
   if(!arr.length)wrap.appendChild(CVS.el('p','muted','Belum ada entri.'));}
  var add=CVS.el('button','','Tambah entri');add.type='button';add.onclick=function(){arr.push({});draw();change();};box.appendChild(add);draw();},
 PR:[['name','Nama proyek'],['role','Peran Anda'],['tech','Teknologi / tools (mis. Laravel, MySQL)'],['url','URL proyek / repository'],['start','Mulai'],['end','Selesai'],['desc','Deskripsi & dampak','t']],
 CE:[['name','Nama sertifikasi'],['org','Penerbit'],['date','Tanggal terbit'],['exp','Kedaluwarsa (opsional)'],['url','URL kredensial (opsional)']],
 ST:[['cat','Kategori (mis. Bahasa Pemrograman, Framework, Database, Cloud/DevOps)'],['items','Daftar, pisahkan dengan koma']],
 AC:[['name','Pencapaian / kontribusi (hackathon, open source, kompetisi)'],['date','Tahun'],['desc','Keterangan','t']],
 photo:function(box,d,change){var E=CVS.el,ph=d.photo,w=E('div');box.appendChild(E('h2','','Foto Profil'));box.appendChild(w);
  function ctl(t,el){el.id='f'+(CVS.n=(CVS.n||0)+1);var l=E('label','',t);l.htmlFor=el.id;w.append(l,el);return el;}
  function opt(s,list){list.forEach(function(o){var x=E('option','',o[1]);x.value=o[0];s.appendChild(x);});}
  var msg=E('p','muted');msg.setAttribute('role','status');
  var show=ctl('Tampilkan foto profil di CV',E('input'));show.type='checkbox';show.style.width='auto';show.checked=ph.show;
  show.onchange=function(){if(show.checked&&!ph.data){show.checked=false;msg.textContent=CVS.t('Unggah foto terlebih dahulu.');return;}ph.show=show.checked;change();};
  var file=ctl('Unggah foto (JPG, PNG, atau WebP, maks. 5 MB)',E('input'));file.type='file';file.accept='image/jpeg,image/png,image/webp';
  file.onchange=function(){var f=file.files[0];msg.textContent='';if(!f)return;
   if(!/^image\/(jpeg|png|webp)$/.test(f.type)){msg.textContent=CVS.t('Format harus JPG, PNG, atau WebP.');file.value='';return;}
   if(f.size>5*1024*1024){msg.textContent=CVS.t('Ukuran file maksimal 5 MB.');file.value='';return;}
   var u=URL.createObjectURL(f),im=new Image();
   im.onload=function(){var s=Math.min(1,400/Math.max(im.width,im.height)),c=document.createElement('canvas'),x;c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));
    x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);
    ph.data=c.toDataURL('image/jpeg',0.85);ph.show=true;show.checked=true;msg.textContent=CVS.t('Foto dimuat dan diperkecil agar hemat penyimpanan.');change();};
   im.onerror=function(){URL.revokeObjectURL(u);msg.textContent=CVS.t('File gambar tidak dapat dibaca.');file.value='';};im.src=u;};
  w.appendChild(msg);
  var rm=E('button','dng','Hapus foto');rm.type='button';rm.onclick=function(){ph.data='';ph.show=false;show.checked=false;file.value='';msg.textContent=CVS.t('Foto dihapus.');change();};w.appendChild(rm);
  var sh=ctl('Bentuk foto',E('select'));opt(sh,[['circle','Bulat'],['square','Kotak'],['rounded','Kotak sudut membulat'],['portrait','Pas foto 3x4']]);sh.value=ph.shape;sh.onchange=function(){ph.shape=sh.value;change();};
  var bc=ctl('Warna border',E('input'));bc.type='color';bc.value=ph.border;bc.style.width='60px';bc.oninput=function(){ph.border=bc.value;change();};
  var bw=ctl(CVS.t('Tebal border: %s px (0 = tanpa border)').replace('%s',ph.bw),E('input'));bw.type='range';bw.min=0;bw.max=6;bw.value=ph.bw;
  bw.oninput=function(){ph.bw=+bw.value;bw.previousSibling.textContent=CVS.t('Tebal border: %s px (0 = tanpa border)').replace('%s',ph.bw);change();};
  var sz=ctl(CVS.t('Ukuran foto: %s mm').replace('%s',ph.size),E('input'));sz.type='range';sz.min=20;sz.max=40;sz.value=ph.size;
  sz.oninput=function(){ph.size=+sz.value;sz.previousSibling.textContent=CVS.t('Ukuran foto: %s mm').replace('%s',ph.size);change();};
  w.appendChild(E('p','muted','Catatan: template ATS Classic paling aman tanpa foto. Foto disimpan di browser ini saja.'));},
 opt:function(box,d,change){var E=CVS.el,self=this,S=d.sec,ls=E('div'),def=[['proj','Proyek',this.PR],['cert','Sertifikasi',this.CE],['tech','Tech Stack',this.ST],['ach','Pencapaian & kontribusi',this.AC]];
  box.appendChild(E('h2','','Bagian Tambahan (Opsional)'));box.appendChild(E('p','muted','Aktifkan hanya yang relevan, misalnya untuk CV bidang IT. Bagian yang dimatikan tidak tampil di CV, tetapi isinya tetap tersimpan.'));
  var pack=E('button','','Aktifkan paket IT');pack.type='button';box.appendChild(pack);
  var cbs=def.map(function(x){var w=E('div'),c=E('input'),l=E('label','',x[1]);c.type='checkbox';c.id='f'+(CVS.n=(CVS.n||0)+1);c.style.width='auto';c.checked=!!S[x[0]];l.htmlFor=c.id;l.style.display='inline';l.style.marginLeft='6px';
   c.onchange=function(){S[x[0]]=c.checked;draw();change();};w.append(c,l);box.appendChild(w);return c;});
  box.appendChild(ls);
  function draw(){ls.textContent='';def.forEach(function(x){if(S[x[0]])self.list(ls,x[1],d[x[0]],x[2],change);});}
  pack.onclick=function(){def.forEach(function(x,i){S[x[0]]=true;cbs[i].checked=true;});draw();change();};draw();},
 build:function(box,d,change){var self=this;box.textContent='';box.appendChild(CVS.el('h2','','Informasi Pribadi'));
  this.P.forEach(function(f){self.field(box,d.p,f,change);});
  this.photo(box,d,change);this.list(box,'Pengalaman Kerja',d.exp,this.X,change);this.list(box,'Pendidikan',d.edu,this.D,change);
  box.appendChild(CVS.el('h2','','Keahlian'));this.field(box,d,['skills','Pisahkan dengan koma','t'],change);this.opt(box,d,change);}};

CVS.exportPdf=function(){CVS.toast('Di dialog cetak, pilih "Simpan sebagai PDF", ukuran A4.');setTimeout(function(){window.print();},300);};
// JSON backup: one versioned format {app, version, exportedAt, docs[]}. Import never overwrites: every imported CV gets a new id.
CVS.io={
 pack:function(docs){return JSON.stringify({app:'cv-studio',version:1,exportedAt:new Date().toISOString(),docs:docs},null,1);},
 fname:function(n){return (String(n||'cv').replace(/[^\w\- ]+/g,'').trim().replace(/\s+/g,'-')||'cv')+'.json';},
 download:function(name,text){var u=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');
  a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},1000);},
 parse:function(text){var o,bad='Format file tidak dikenali. Gunakan file hasil ekspor CV Studio.';
  try{o=JSON.parse(text);}catch(e){return{error:'File bukan JSON yang valid.'};}
  if(!o||typeof o!=='object'||o.app!=='cv-studio'||!Array.isArray(o.docs)||!o.docs.length||o.docs.length>100)return{error:bad};
  if(o.version!==1)return{error:'Versi file tidak didukung.'};
  var out=[];for(var i=0;i<o.docs.length;i++){var d=o.docs[i];if(!d||typeof d!=='object'||!d.p||typeof d.p!=='object')return{error:bad};
   var n=CVS.store.norm(d);n.id=CVS.uid();out.push(n);}
  return{docs:out};}};

CVS.store={key:'cvstudio:v1',warn:'',onStatus:function(){},
norm:function(d){if(!d||typeof d!=='object')return null;var b=CVS.blank(),o={id:String(d.id||b.id),name:String(d.name||'CV'),lang:d.lang==='en'?'en':'id',
 template:['ats','modern','executive','minimal','creative','fresh'].indexOf(d.template)>-1?d.template:'ats',accent:/^#[0-9a-f]{6}$/i.test(d.accent)?d.accent:b.accent,p:{},exp:[],edu:[],skills:typeof d.skills==='string'?d.skills:''};
 var q=d.photo&&typeof d.photo==='object'?d.photo:{},n=function(v,lo,hi,def){v=Number(v);return isFinite(v)?Math.min(hi,Math.max(lo,v)):def;};
 o.photo={data:typeof q.data==='string'&&q.data.length<=600000&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(q.data)?q.data:'',
  shape:['circle','square','rounded','portrait'].indexOf(q.shape)>-1?q.shape:'circle',border:/^#[0-9a-f]{6}$/i.test(q.border)?q.border:b.photo.border,bw:n(q.bw,0,6,2),size:n(q.size,20,40,30)};
 o.photo.show=q.show===true&&!!o.photo.data;o.sec={};Object.keys(b.sec).forEach(function(k){o.sec[k]=!!d.sec&&d.sec[k]===true;});
 Object.keys(b.p).forEach(function(k){o.p[k]=d.p&&typeof d.p[k]==='string'?d.p[k]:'';});
 ['exp','edu','proj','cert','tech','ach'].forEach(function(k){o[k]=Array.isArray(d[k])?d[k].filter(function(x){return x&&typeof x==='object';}).map(function(x){var r={};Object.keys(x).forEach(function(f){if(typeof x[f]==='string')r[f]=x[f];});return r;}):[];});return o;},
load:function(){var raw=null,s=null,self=this,empty={v:1,docs:[],active:null};
 try{raw=localStorage.getItem(this.key);s=JSON.parse(raw||'null');}catch(e){s=null;}
 if(raw&&(!s||s.v!==1||!Array.isArray(s.docs))){try{localStorage.setItem(this.key+':corrupt',raw);}catch(e){}this.warn='Data tersimpan tidak valid dan tidak dapat dibaca. Salinan mentah disimpan terpisah.';return empty;}
 if(!s)return empty;var docs=s.docs.map(function(d){return self.norm(d);}).filter(Boolean);
 return{v:1,docs:docs,active:docs.some(function(d){return d.id===s.active;})?s.active:null};},
save:function(state){this.onStatus('Menyimpan...');try{localStorage.setItem(this.key,JSON.stringify(state));this.onStatus('Tersimpan');return true;}
 catch(e){this.onStatus('Gagal menyimpan');return false;}}};

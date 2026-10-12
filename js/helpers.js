var CVS=window.CVS||{};
CVS.el=function(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;};
CVS.uid=function(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);};
CVS.toast=function(m){var t=CVS.el('div','toast',m);t.setAttribute('role','status');document.body.appendChild(t);setTimeout(function(){t.remove();},4500);};
CVS.debounce=function(f,ms){var h;return function(){clearTimeout(h);h=setTimeout(f,ms);};};
CVS.blank=function(){return{id:CVS.uid(),name:'CV Baru',lang:'id',template:'ats',accent:'#2b3a8c',
 p:{name:'',title:'',email:'',phone:'',city:'',linkedin:'',github:'',portfolio:'',summary:''},exp:[],edu:[],skills:'',sec:{proj:false,cert:false,tech:false,ach:false},proj:[],cert:[],tech:[],ach:[],photo:{show:false,data:'',shape:'circle',border:'#2b3a8c',bw:2,size:30}};};
CVS.sample=function(){var d=CVS.blank();d.name='Contoh CV';d.p={name:'Contoh Nama',title:'Staf Administrasi',email:'nama@contoh.id',phone:'0812-0000-0000',city:'Banjarmasin, Indonesia',linkedin:'',summary:'Lulusan baru yang teliti dan terbiasa bekerja dalam tim.'};
 d.edu=[{school:'Universitas Contoh',degree:'S1 Manajemen',start:'2020',end:'2024',desc:''}];d.skills='Microsoft Office, Komunikasi, Manajemen waktu';return d;};
CVS.L={id:{exp:'Pengalaman Kerja',edu:'Pendidikan',skills:'Keahlian',sum:'Ringkasan',now:'Sekarang',expf:'Pengalaman & Magang',exec:'Profil Eksekutif',contact:'Kontak',proj:'Proyek',cert:'Sertifikasi',tech:'Tech Stack',ach:'Pencapaian & Kontribusi'},en:{exp:'Work Experience',edu:'Education',skills:'Skills',sum:'Summary',now:'Present',expf:'Experience & Internships',exec:'Executive Profile',contact:'Contact',proj:'Projects',cert:'Certifications',tech:'Tech Stack',ach:'Achievements & Contributions'}};

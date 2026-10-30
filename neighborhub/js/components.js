// Shared UI: Modal, Form, Header, Shell (navigation)
/* ---------- Shared UI ---------- */
const INP='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';
const B1='px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-medium';
const B2='px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm';
const BR='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm';
const CARD='bg-white rounded-xl shadow-sm border p-4 fade';
const CC={meeting:'bg-blue-500',garbage:'bg-gray-500',market:'bg-amber-500',vendorHours:'bg-emerald-500',event:'bg-purple-500'};
const SC=['meeting','garbage','market','vendorHours','event'];

function Modal({title,onClose,children}){
  return html`<div class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40" onClick=${onClose}>
    <div class="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto sb p-5 fade" onClick=${e=>e.stopPropagation()}>
      <h3 class="font-bold text-lg mb-3">${title}</h3>${children}</div></div>`;
}

/* Generic validated form. fields: [{k, type, o(options), req, l(label key)}] */
function Form({fields,init,onSubmit,onCancel,onDelete}){
  const {t}=useC();
  const [v,setV]=useState({...Object.fromEntries(fields.filter(f=>f.o).map(f=>[f.k,f.o[0]])),...init});
  const [er,setEr]=useState({});
  const set=(k,x)=>setV({...v,[k]:x});
  const submit=e=>{e.preventDefault();const x={};
    fields.forEach(f=>{const val=String(v[f.k]||'').trim();
      if(f.req&&!val)x[f.k]=t('required');
      else if(f.type==='email'&&val&&!/^\S+@\S+\.\S+$/.test(val))x[f.k]=t('invalid')});
    setEr(x);if(!Object.keys(x).length)onSubmit(v)};
  return html`<form onSubmit=${submit} class="space-y-3" noValidate>
    ${fields.map(f=>html`<div key=${f.k}>
      <label class="block text-sm font-medium mb-1">${t(f.l||f.k)}${f.req?' *':''}</label>
      ${f.o?html`<select class=${INP} value=${v[f.k]||''} onChange=${e=>set(f.k,e.target.value)}>${f.o.map(o=>html`<option key=${o} value=${o}>${t(o)}</option>`)}</select>`
      :f.type==='textarea'?html`<textarea rows="3" class=${INP} value=${v[f.k]||''} onChange=${e=>set(f.k,e.target.value)}></textarea>`
      :html`<input type=${f.type||'text'} class=${INP} value=${v[f.k]||''} onChange=${e=>set(f.k,e.target.value)} />`}
      ${er[f.k]&&html`<p class="text-red-600 text-xs mt-1">${er[f.k]}</p>`}</div>`)}
    <div class="flex justify-between gap-2 pt-1">
      <div>${onDelete&&html`<button type="button" class=${BR} onClick=${onDelete}>${t('delete')}</button>`}</div>
      <div class="flex gap-2">${onCancel&&html`<button type="button" class=${B2} onClick=${onCancel}>${t('cancel')}</button>`}<button class=${B1}>${t('save')}</button></div>
    </div></form>`;
}
const Head=({title,children})=>html`<div class="flex flex-wrap items-center justify-between gap-2 mb-4"><h1 class="text-2xl font-bold text-emerald-800">${title}</h1><div class="flex flex-wrap gap-2">${children}</div></div>`;
const Empty=()=>{const {t}=useC();return html`<div class="text-center text-gray-500 py-10 border-2 border-dashed rounded-xl">📭 ${t('empty')}</div>`};

/* ---------- Header + navigation ---------- */
const NAV=[['dashboard','🏠'],['announcements','📢'],['schedule','🗓️'],['calendar','📅'],['chat','💬'],['contacts','👥'],['guidelines','📜'],['reports','🚩'],['settings','⚙️']];
function Header(){
  const {t,lang,setLang,me,go,setMeId}=useC();
  return html`<header class="bg-white border-b sticky top-0 z-30"><div class="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
    <button class="font-bold text-emerald-700 text-lg" onClick=${()=>go(me?'dashboard':'landing')}>🏘️ ${t('appName')}</button>
    <div class="flex items-center gap-2">
      <select class="border rounded-lg px-2 py-1 text-sm" value=${lang} onChange=${e=>setLang(e.target.value)} aria-label=${t('language')}><option value="en">English</option><option value="ceb">Bisaya</option><option value="tl">Tagalog</option></select>
      ${me?html`<span class="hidden sm:inline text-sm">${me.name}</span><button class=${B2} onClick=${()=>{setMeId(null);go('landing')}}>${t('logout')}</button>`
        :html`<button class=${B2} onClick=${()=>go('login')}>${t('login')}</button>`}
    </div></div></header>`;
}
function Shell({children}){
  const {t,page,go,unread}=useC();
  return html`<div class="md:flex gap-4 max-w-6xl mx-auto p-3">
    <nav class="md:w-52 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 shrink-0 sb">
      ${NAV.map(([k,i])=>html`<button key=${k} onClick=${()=>go(k)} class=${`whitespace-nowrap text-left px-3 py-2 rounded-lg text-sm ${page===k?'bg-emerald-600 text-white':'bg-white border hover:bg-emerald-50'}`}>${i} ${t(k)}${k==='chat'&&unread>0?html` <span class="bg-red-500 text-white rounded-full px-1.5 text-xs">${unread}</span>`:''}</button>`)}
    </nav><main class="flex-1 min-w-0">${children}</main></div>`;
}


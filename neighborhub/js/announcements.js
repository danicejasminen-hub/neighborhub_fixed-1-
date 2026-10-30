// Announcements
/* ---------- Announcements ---------- */
const ACAT=['general','safety','businessCat','event','dispute'];
const ACOL={general:'bg-gray-100',safety:'bg-red-100',businessCat:'bg-amber-100',event:'bg-purple-100',dispute:'bg-orange-100'};
function Announcements(){
  const {t,fd,me,ann,setAnn,toast,ask}=useC();
  const [q,setQ]=useState('');const [cat,setCat]=useState('all');const [ed,setEd]=useState(null);
  const list=ann.filter(a=>(cat==='all'||a.category===cat)&&(a.title+a.message).toLowerCase().includes(q.toLowerCase()))
    .sort((a,b)=>(b.pinned-a.pinned)||b.date.localeCompare(a.date));
  const can=a=>me.role==='admin'||a.author===me.name;
  const save=v=>{upsert(setAnn,{...ed,...v,id:ed.id||uid(),author:ed.author||me.name,pinned:!!ed.pinned});setEd(null);toast(t('saved'))};
  return html`<div><${Head} title=${t('announcements')}><button class=${B1} onClick=${()=>setEd({date:off(0)})}>+ ${t('add')}</button><//>
    <div class="flex flex-wrap gap-2 mb-4"><input class=${INP+' flex-1 min-w-[150px]'} placeholder=${t('search')} value=${q} onChange=${e=>setQ(e.target.value)} />
      <select class=${INP+' w-auto'} value=${cat} onChange=${e=>setCat(e.target.value)}><option value="all">${t('all')}</option>${ACAT.map(c=>html`<option key=${c} value=${c}>${t(c)}</option>`)}</select></div>
    <div class="space-y-3">${list.length?list.map(a=>html`<div key=${a.id} class=${CARD}>
      <div class="flex flex-wrap items-center gap-2 mb-1"><span class=${`text-xs px-2 py-0.5 rounded-full ${ACOL[a.category]}`}>${t(a.category)}</span>${a.pinned&&html`<span class="text-xs">📌 ${t('pinned')}</span>`}<span class="text-xs text-gray-500 ml-auto">${fd(a.date)} · ${a.author}</span></div>
      <h3 class="font-semibold">${a.title}</h3><p class="text-sm text-gray-700 whitespace-pre-wrap">${a.message}</p>
      <div class="flex gap-2 mt-3">${me.role==='admin'&&html`<button class=${B2} onClick=${()=>{upsert(setAnn,{...a,pinned:!a.pinned});toast(t('saved'))}}>${a.pinned?t('unpin'):t('pin')}</button>`}
        ${can(a)&&html`<button class=${B2} onClick=${()=>setEd(a)}>${t('edit')}</button><button class=${B2+' text-red-600'} onClick=${()=>ask(t('confirmDel'),()=>{remove(setAnn,a.id);toast(t('deleted'))})}>${t('delete')}</button>`}</div></div>`):html`<${Empty} />`}</div>
    ${ed&&html`<${Modal} title=${t('announcements')} onClose=${()=>setEd(null)}><${Form} init=${ed} onCancel=${()=>setEd(null)} onSubmit=${save}
      fields=${[{k:'title',req:1},{k:'message',type:'textarea',req:1},{k:'category',o:ACAT},{k:'date',type:'date',req:1}]} /><//>`}</div>`;
}


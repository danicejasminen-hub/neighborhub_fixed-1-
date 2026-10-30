// Contacts (Residents and Vendors)
/* ---------- Contacts ---------- */
function Contacts(){
  const {t,con,setCon,setMsgs,toast,ask}=useC();
  const [q,setQ]=useState('');const [ty,setTy]=useState('all');const [ed,setEd]=useState(null);
  const list=con.filter(c=>(ty==='all'||c.type===ty)&&Object.values(c).join(' ').toLowerCase().includes(q.toLowerCase()));
  const save=v=>{upsert(setCon,{...v,id:ed.id||uid()});setEd(null);toast(t('saved'))};
  const del=c=>ask(t('confirmDel'),()=>{remove(setCon,c.id);setMsgs(p=>{const n={...p};delete n[c.id];return n});toast(t('deleted'))});
  return html`<div><${Head} title=${t('contacts')}><button class=${B1} onClick=${()=>setEd({})}>+ ${t('add')}</button><//>
    <div class="flex flex-wrap gap-2 mb-4"><input class=${INP+' flex-1 min-w-[150px]'} placeholder=${t('search')} value=${q} onChange=${e=>setQ(e.target.value)} />
      <select class=${INP+' w-auto'} value=${ty} onChange=${e=>setTy(e.target.value)}><option value="all">${t('all')}</option><option value="resident">${t('resident')}</option><option value="vendor">${t('vendor')}</option></select></div>
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">${list.length?list.map(c=>html`<div key=${c.id} class=${CARD}>
      <div class="flex items-center gap-2"><span class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">${c.name[0]}</span>
        <div><div class="font-semibold">${c.name}</div><span class=${`text-xs px-2 py-0.5 rounded-full ${c.type==='vendor'?'bg-amber-100':'bg-sky-100'}`}>${t(c.type)}</span></div></div>
      <div class="text-sm mt-2 space-y-0.5 text-gray-700">${c.businessName&&html`<div>🏪 ${c.businessName}${c.category?` · ${c.category}`:''}</div>`}${c.phone&&html`<div>📞 ${c.phone}</div>`}${c.email&&html`<div>✉️ ${c.email}</div>`}${c.address&&html`<div>📍 ${c.address}</div>`}${c.notes&&html`<div class="text-gray-500">${c.notes}</div>`}</div>
      <div class="flex gap-2 mt-3"><button class=${B2} onClick=${()=>setEd(c)}>${t('edit')}</button><button class=${B2+' text-red-600'} onClick=${()=>del(c)}>${t('delete')}</button></div></div>`):html`<${Empty} />`}</div>
    ${ed&&html`<${Modal} title=${t('contacts')} onClose=${()=>setEd(null)}><${Form} init=${ed} onCancel=${()=>setEd(null)} onSubmit=${save}
      fields=${[{k:'name',req:1},{k:'type',o:['resident','vendor']},{k:'businessName'},{k:'category'},{k:'phone',req:1},{k:'email',type:'email'},{k:'address'},{k:'notes',type:'textarea'}]} /><//>`}</div>`;
}


// Guidelines, Reports, Settings
/* ---------- Guidelines ---------- */
function Guidelines(){
  const {t,go}=useC();
  return html`<div><${Head} title=${t('rulesTitle')}><button class=${B1} onClick=${()=>go('reports')}>🚩 ${t('reports')}</button><//>
    <div class="space-y-2">${[1,2,3,4,5,6].map(n=>html`<div key=${n} class=${CARD+' flex gap-3'}><span class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">${n}</span><p>${t('r'+n)}</p></div>`)}</div></div>`;
}

/* ---------- Reports ---------- */
const RS={open:'bg-red-100',review:'bg-amber-100',resolved:'bg-green-100'};
function Reports(){
  const {t,fd,me,reps,setReps,toast,ask}=useC();
  const [ed,setEd]=useState(null);const adm=me.role==='admin';
  const fields=[{k:'type',o:['noise','pricing','property','safety','other']},{k:'description',type:'textarea',req:1},{k:'involved',req:1},{k:'date',type:'date',req:1},...(adm?[{k:'status',o:['open','review','resolved']}]:[])];
  const save=v=>{upsert(setReps,{status:'open',...v,id:uid(),by:me.name});setEd(null);toast(t('saved'))};
  const list=adm?reps:reps.filter(r=>r.by===me.name);
  return html`<div><${Head} title=${t('reports')}><button class=${B1} onClick=${()=>setEd({date:off(0)})}>+ ${t('add')}</button><//>
    <div class="space-y-3">${list.length?list.map(r=>html`<div key=${r.id} class=${CARD}>
      <div class="flex flex-wrap items-center gap-2"><b>${t(r.type)}</b><span class="text-xs text-gray-500">${fd(r.date)} · ${r.by}</span>
        ${adm?html`<select class="ml-auto border rounded px-2 py-1 text-sm" value=${r.status} onChange=${e=>{upsert(setReps,{...r,status:e.target.value});toast(t('saved'))}}>${['open','review','resolved'].map(s=>html`<option key=${s} value=${s}>${t(s)}</option>`)}</select>`
          :html`<span class=${`ml-auto text-xs px-2 py-0.5 rounded-full ${RS[r.status]}`}>${t(r.status)}</span>`}</div>
      <p class="text-sm mt-1">${r.description}</p><p class="text-xs text-gray-500">${t('involved')}: ${r.involved}</p>
      ${adm&&html`<button class=${B2+' text-red-600 mt-2'} onClick=${()=>ask(t('confirmDel'),()=>{remove(setReps,r.id);toast(t('deleted'))})}>${t('delete')}</button>`}</div>`):html`<${Empty} />`}</div>
    ${ed&&html`<${Modal} title=${t('reports')} onClose=${()=>setEd(null)}><${Form} init=${ed} fields=${fields} onCancel=${()=>setEd(null)} onSubmit=${save} /><//>`}</div>`;
}

/* ---------- Settings ---------- */
function Settings(){
  const {t,me,lang,setLang,ask,reset}=useC();
  return html`<div><${Head} title=${t('settings')} />
    <div class=${CARD+' space-y-4 max-w-md'}><p><b>${me.name}</b> · ${me.email} · ${t(me.role)}</p>
      <div><label class="block text-sm font-medium mb-1">${t('language')}</label><select class=${INP} value=${lang} onChange=${e=>setLang(e.target.value)}><option value="en">English</option><option value="ceb">Bisaya</option><option value="tl">Tagalog</option></select></div>
      <button class=${BR} onClick=${()=>ask(t('resetConfirm'),reset)}>${t('resetDemo')}</button></div></div>`;
}


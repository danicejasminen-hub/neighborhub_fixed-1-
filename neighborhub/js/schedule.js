// Schedule + Calendar
/* ---------- Schedule item form (shared by Schedule + Calendar) ---------- */
function ItemModal({item,onClose}){
  const {t,setSch,toast,ask}=useC();
  const save=v=>{upsert(setSch,{done:false,...item,...v,id:item.id||uid()});onClose();toast(t('saved'))};
  const del=item.id?()=>ask(t('confirmDel'),()=>{remove(setSch,item.id);onClose();toast(t('deleted'))}):null;
  return html`<${Modal} title=${t('schedule')} onClose=${onClose}><${Form} init=${item} onCancel=${onClose} onSubmit=${save} onDelete=${del}
    fields=${[{k:'title',req:1},{k:'date',type:'date',req:1},{k:'time',type:'time',req:1},{k:'category',o:SC},{k:'description',type:'textarea'}]} /><//>`;
}

/* ---------- Schedule ---------- */
function Schedule(){
  const {t,fd,sch,setSch}=useC();
  const [ed,setEd]=useState(null);
  const list=[...sch].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  return html`<div><${Head} title=${t('schedule')}><button class=${B1} onClick=${()=>setEd({date:off(0),time:'09:00'})}>+ ${t('add')}</button><//>
    <div class="space-y-2">${list.length?list.map(s=>html`<div key=${s.id} class=${CARD+' flex items-center gap-3'+(s.done?' opacity-60':'')}>
      <input type="checkbox" class="w-5 h-5" checked=${s.done} onChange=${()=>upsert(setSch,{...s,done:!s.done})} aria-label=${t('done')} />
      <span class=${`w-3 h-3 rounded-full shrink-0 ${CC[s.category]}`}></span>
      <div class="flex-1 min-w-0"><div class=${'font-medium'+(s.done?' line-through':'')}>${s.title}</div><div class="text-xs text-gray-500">${t(s.category)} · ${fd(s.date)} · ${s.time}</div>${s.description&&html`<div class="text-sm text-gray-600">${s.description}</div>`}</div>
      <button class=${B2} onClick=${()=>setEd(s)}>${t('edit')}</button></div>`):html`<${Empty} />`}</div>
    ${ed&&html`<${ItemModal} item=${ed} onClose=${()=>setEd(null)} />`}</div>`;
}

/* ---------- Calendar ---------- */
function CalendarPage(){
  const {t,lang,sch}=useC();
  const [cur,setCur]=useState(()=>{const d=new Date();return {y:d.getFullYear(),m:d.getMonth()}});
  const [ed,setEd]=useState(null);
  const move=n=>{const d=new Date(cur.y,cur.m+n,1);setCur({y:d.getFullYear(),m:d.getMonth()})};
  const first=new Date(cur.y,cur.m,1).getDay(),dim=new Date(cur.y,cur.m+1,0).getDate();
  const cells=[...Array(first).fill(null),...Array.from({length:dim},(_,i)=>i+1)];
  const key=d=>`${cur.y}-${pad(cur.m+1)}-${pad(d)}`;const today=off(0);
  return html`<div><${Head} title=${t('calendar')}><button class=${B2} onClick=${()=>move(-1)} aria-label="Previous month">◀</button>
    <span class="font-semibold px-2 py-2">${MN[lang][cur.m]} ${cur.y}</span><button class=${B2} onClick=${()=>move(1)} aria-label="Next month">▶</button><//>
    <div class="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">${DN[lang].map(d=>html`<div key=${d}>${d}</div>`)}</div>
    <div class="grid grid-cols-7 gap-1">${cells.map((d,i)=>{
      if(!d)return html`<div key=${'e'+i}></div>`;
      const k=key(d),ev=sch.filter(s=>s.date===k).sort((a,b)=>a.time.localeCompare(b.time));
      return html`<div key=${k} onClick=${()=>setEd({date:k,time:'09:00'})} class=${`min-h-[64px] sm:min-h-[92px] bg-white border rounded-lg p-1 cursor-pointer hover:bg-emerald-50 overflow-hidden ${k===today?'ring-2 ring-emerald-500':''}`}>
        <div class=${`text-xs font-semibold ${k===today?'text-emerald-700':''}`}>${d}</div>
        ${ev.slice(0,3).map(s=>html`<div key=${s.id} onClick=${e=>{e.stopPropagation();setEd(s)}} class=${`text-[10px] text-white rounded px-1 mt-0.5 truncate ${CC[s.category]}`}>${s.title}</div>`)}
        ${ev.length>3&&html`<div class="text-[10px] text-gray-500">+${ev.length-3}</div>`}</div>`})}</div>
    ${ed&&html`<${ItemModal} item=${ed} onClose=${()=>setEd(null)} />`}</div>`;
}


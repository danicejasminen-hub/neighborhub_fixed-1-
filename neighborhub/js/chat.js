// Chat / Messenger
/* ---------- Chat ---------- */
function Chat(){
  const {t,con,msgs,setMsgs}=useC();
  const [act,setAct]=useState(null);const [txt,setTxt]=useState('');const end=useRef();
  const c=con.find(x=>x.id===act);const list=(c&&msgs[act])||[];
  const add=(id,m)=>setMsgs(p=>({...p,[id]:[...(p[id]||[]),{id:uid(),ts:new Date().toISOString(),...m}]}));
  useEffect(()=>{
    if(c&&list.some(m=>m.from==='them'&&!m.read))setMsgs(p=>({...p,[act]:p[act].map(m=>({...m,read:true}))}));
    if(end.current)end.current.scrollIntoView({behavior:'smooth'});
  },[act,msgs]);
  const send=e=>{e.preventDefault();const s=txt.trim();if(!s||!c)return;const id=act;
    add(id,{from:'me',text:s,read:true});setTxt('');
    setTimeout(()=>add(id,{from:'them',text:t('reply'),read:false}),1500)};
  const tm=ts=>new Date(ts).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  return html`<div><${Head} title=${t('chat')} />
    <div class="grid md:grid-cols-3 gap-3 h-[70vh]">
      <div class=${`${CARD} overflow-y-auto sb p-2 ${act?'hidden md:block':''}`}>${con.length?con.map(x=>{
        const l=msgs[x.id]||[],last=l[l.length-1],un=l.filter(m=>m.from==='them'&&!m.read).length;
        return html`<button key=${x.id} onClick=${()=>setAct(x.id)} class=${`w-full text-left p-2 rounded-lg flex gap-2 items-center ${act===x.id?'bg-emerald-100':'hover:bg-gray-50'}`}>
          <span class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">${x.name[0]}</span>
          <span class="flex-1 min-w-0"><span class="block font-medium truncate">${x.name}</span><span class="block text-xs text-gray-500 truncate">${last?last.text:t('noMsg')}</span></span>
          ${un>0&&html`<span class="bg-red-500 text-white text-xs rounded-full px-1.5">${un}</span>`}</button>`}):html`<${Empty} />`}</div>
      <div class=${`${CARD} md:col-span-2 flex flex-col p-0 overflow-hidden ${act?'':'hidden md:flex'}`}>${c?html`
        <div class="p-3 border-b flex items-center gap-2"><button class="md:hidden" onClick=${()=>setAct(null)}>← ${t('back')}</button><b>${c.name}</b><span class="text-xs text-gray-500">${c.businessName||t(c.type)}</span></div>
        <div class="flex-1 overflow-y-auto sb p-3 space-y-2 bg-emerald-50/40">${list.length?list.map(m=>html`<div key=${m.id} class=${`flex ${m.from==='me'?'justify-end':''}`}><div class=${`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from==='me'?'bg-emerald-600 text-white':'bg-white border'}`}><div class="text-[10px] opacity-70">${m.from==='me'?'You':c.name}</div>${m.text}<div class="text-[10px] opacity-70 text-right">${tm(m.ts)}</div></div></div>`):html`<p class="text-center text-gray-500 mt-10">${t('noMsg')}</p>`}<div ref=${end}></div></div>
        <form onSubmit=${send} class="p-2 border-t flex gap-2"><input class=${INP} placeholder=${t('typeMessage')} value=${txt} onChange=${e=>setTxt(e.target.value)} /><button class=${B1}>${t('send')}</button></form>`
        :html`<div class="m-auto text-gray-500">💬 ${t('pickContact')}</div>`}</div></div></div>`;
}


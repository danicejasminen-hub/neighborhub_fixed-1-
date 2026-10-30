// Dashboard
/* ---------- Dashboard ---------- */
function Dashboard(){
  const {t,fd,me,ann,sch,con,unread,go}=useC();
  const today=off(0);
  const up=sch.filter(s=>s.date>=today&&!s.done).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  const cards=[['📢',t('announcements'),ann.length,'announcements'],['📅',t('upcoming'),up.length,'calendar'],['👥',t('contacts'),con.length,'contacts'],['💬',t('unread'),unread,'chat']];
  return html`<div><${Head} title=${`${t('welcome')}, ${me.name}!`} />
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">${cards.map(([i,l,n,p])=>html`<button key=${p} onClick=${()=>go(p)} class=${CARD+' text-left hover:shadow-md'}><div class="text-2xl">${i}</div><div class="text-3xl font-bold text-emerald-700">${n}</div><div class="text-sm text-gray-600">${l}</div></button>`)}</div>
    <div class="grid lg:grid-cols-3 gap-4">
      <div class=${CARD+' lg:col-span-2'}><h2 class="font-semibold mb-2">${t('upcoming')}</h2>
        ${up.length?up.slice(0,6).map(s=>html`<div key=${s.id} class="flex items-center gap-2 py-2 border-b last:border-0"><span class=${`w-3 h-3 rounded-full ${CC[s.category]}`}></span><span class="flex-1">${s.title}</span><span class="text-sm text-gray-500">${fd(s.date)} ${s.time}</span></div>`):html`<${Empty} />`}</div>
      <div class=${CARD}><h2 class="font-semibold mb-2">${t('quickLinks')}</h2><div class="flex flex-col gap-2">
        ${[['announcements','📢'],['calendar','📅'],['chat','💬'],['reports','🚩']].map(([p,i])=>html`<button key=${p} class=${B2+' text-left'} onClick=${()=>go(p)}>${i} ${t(p)}</button>`)}</div></div></div></div>`;
}


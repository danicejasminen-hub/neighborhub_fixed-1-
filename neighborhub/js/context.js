// Global state: auth, language, data (Context API)
/* ---------- Global context: auth, language, data ---------- */
const Ctx=createContext();const useC=()=>useContext(Ctx);
function Provider({children}){
  const S=SEED();
  const [lang,setLang]=useLocalStorage('nh_lang','en');
  const [users,setUsers,usersReady]=useShared('nh_users',S.users);
  const [meId,setMeId]=useLocalStorage('nh_me',null);
  const [ann,setAnn]=useShared('nh_ann',S.ann);
  const [sch,setSch]=useShared('nh_sch',S.sch);
  const [con,setCon]=useShared('nh_con',S.con);
  const [msgs,setMsgs]=useShared('nh_msgs',S.msgs);
  const [reps,setReps]=useShared('nh_reps',S.reps);
  const [page,setPage]=useState(location.hash.slice(1)||'landing');
  const [toastMsg,setToast]=useState('');const [cf,setCf]=useState(null);
  useEffect(()=>{const h=()=>setPage(location.hash.slice(1)||'landing');addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[]);
  const t=k=>(TR[lang]&&TR[lang][k])||TR.en[k]||k;
  const fd=s=>{if(!s)return '';const [y,m,d]=s.split('-').map(Number);return `${MN[lang][m-1]} ${d}, ${y}`};
  const toast=m=>{setToast(m);setTimeout(()=>setToast(''),2000)};
  const ask=(m,fn)=>setCf({m,fn});
  const go=p=>{location.hash=p;window.scrollTo(0,0)};
  const me=users.find(u=>u.id===meId);
  if(!usersReady)return html`<div class="min-h-screen flex items-center justify-center text-gray-500">Loading NeighborHub…</div>`;
  const unread=Object.values(msgs).flat().filter(m=>m.from==='them'&&!m.read).length;
  const reset=()=>{const d=SEED();setUsers(d.users);setAnn(d.ann);setSch(d.sch);setCon(d.con);setMsgs(d.msgs);setReps(d.reps);setMeId(null);go('landing')};
  const v={lang,setLang,t,fd,users,setUsers,me,setMeId,ann,setAnn,sch,setSch,con,setCon,msgs,setMsgs,reps,setReps,page,go,toast,ask,unread,reset};
  return html`<${Ctx.Provider} value=${v}>${children}
    ${toastMsg&&html`<div class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 fade">${toastMsg}</div>`}
    ${cf&&html`<div class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-xl p-5 max-w-sm w-full"><p class="mb-4">${cf.m}</p><div class="flex justify-end gap-2"><button class=${B2} onClick=${()=>setCf(null)}>${t('cancel')}</button><button class=${BR} onClick=${()=>{cf.fn();setCf(null)}}>${t('delete')}</button></div></div></div>`}
  <//>`;
}


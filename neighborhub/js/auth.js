// Landing page + Login/Sign up
/* ---------- Landing ---------- */
function Landing(){
  const {t,go,me}=useC();
  return html`<div>
    <section class="bg-gradient-to-br from-emerald-500 to-sky-500 text-white text-center px-4 py-16">
      <div class="max-w-2xl mx-auto"><p class="font-medium mb-2">🏘️ ${t('tagline')}</p>
        <h1 class="text-3xl sm:text-5xl font-bold mb-4">${t('heroTitle')}</h1><p class="mb-6 text-lg">${t('heroText')}</p>
        <div class="flex justify-center gap-3"><button class="px-6 py-3 rounded-lg bg-white text-emerald-700 font-semibold" onClick=${()=>go(me?'dashboard':'signup')}>${t('getStarted')}</button>
        ${!me&&html`<button class="px-6 py-3 rounded-lg border border-white font-semibold" onClick=${()=>go('login')}>${t('login')}</button>`}</div></div></section>
    <section class="max-w-5xl mx-auto p-6"><h2 class="text-xl font-bold text-center mb-4">${t('features')}</h2>
      <div class="grid sm:grid-cols-3 gap-4">${[['🤝','f1'],['📣','f2'],['🕊️','f3']].map(([i,k])=>html`<div key=${k} class=${CARD}><div class="text-3xl mb-2">${i}</div><h3 class="font-semibold">${t(k)}</h3><p class="text-sm text-gray-600">${t(k+'d')}</p></div>`)}</div></section></div>`;
}

/* ---------- Login / Sign up ---------- */
function Auth({mode}){
  const {t,users,setUsers,setMeId,go}=useC();
  const [m,setM]=useState(mode);const [err,setErr]=useState('');
  const fields=m==='login'?[{k:'email',type:'email',req:1},{k:'password',type:'password',req:1}]
    :[{k:'name',req:1},{k:'email',type:'email',req:1},{k:'password',type:'password',req:1},{k:'role',o:['resident','business','admin']}];
  const submit=v=>{
    if(m==='login'){const u=users.find(x=>x.email.toLowerCase()===v.email.toLowerCase()&&x.password===v.password);
      if(!u)return setErr(t('badLogin'));setMeId(u.id);go('dashboard')}
    else{if(users.some(x=>x.email.toLowerCase()===v.email.toLowerCase()))return setErr(t('emailUsed'));
      const u={id:uid(),...v};setUsers([...users,u]);setMeId(u.id);go('dashboard')}};
  return html`<div class="max-w-sm mx-auto p-4 mt-6"><div class=${CARD}>
    <h1 class="text-xl font-bold mb-3">${m==='login'?t('login'):t('signup')}</h1>
    ${err&&html`<p class="bg-red-50 text-red-700 text-sm p-2 rounded mb-3">${err}</p>`}
    <${Form} key=${m} fields=${fields} init=${{}} onSubmit=${submit} />
    <p class="text-sm mt-3">${m==='login'?t('noAcc'):t('haveAcc')} <button class="text-emerald-700 underline" onClick=${()=>{setErr('');setM(m==='login'?'signup':'login')}}>${m==='login'?t('signup'):t('login')}</button></p>
    ${m==='login'&&html`<p class="text-xs text-gray-500 mt-3">Demo: admin@demo.com / admin123 · resident@demo.com / demo123</p>`}</div></div>`;
}


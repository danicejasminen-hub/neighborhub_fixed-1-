// React setup, useLocalStorage hook and small helpers
const {useState,useEffect,useContext,createContext,useRef}=React;
const html=htm.bind(React.createElement);

/* ---------- Persistent storage hook ---------- */
function useLocalStorage(key,init){
  const [v,setV]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):init}catch(e){return init}});
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch(e){}},[key,v]);
  return [v,setV];
}


/* ---------- Shared cloud storage hook (Firebase Firestore) ----------
   Same idea as useLocalStorage, but the data lives online so every phone/browser sees the same thing.
   Falls back to localStorage if firebase-config.js is not filled in yet. */
let _db=null;
try{
  if(window.firebase&&window.FIREBASE_CONFIG&&window.FIREBASE_CONFIG.projectId&&!/PASTE/.test(window.FIREBASE_CONFIG.projectId)){
    firebase.initializeApp(window.FIREBASE_CONFIG);_db=firebase.firestore();
  }
}catch(e){console.warn('Firebase init failed, using localStorage',e);_db=null}
const CLOUD=!!_db;

function useShared(key,init){
  const load=()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):init}catch(e){return init}};
  const [v,setV]=useState(load);
  const [ready,setReady]=useState(!CLOUD);
  const cur=useRef(v);cur.current=v;
  useEffect(()=>{
    if(!CLOUD)return;
    const ref=_db.collection('nh').doc(key);
    const timer=setTimeout(()=>setReady(true),6000); // don't block forever if offline
    const un=ref.onSnapshot(snap=>{
      if(snap.exists){
        try{const nv=JSON.parse(snap.data().value);cur.current=nv;setV(nv)}catch(e){}
        setReady(true);
      }else if(!snap.metadata.fromCache){
        ref.set({value:JSON.stringify(cur.current)}); // first time ever: save the starting data
        setReady(true);
      }
    },err=>{console.warn('Firestore error',err);setReady(true)});
    return()=>{clearTimeout(timer);un()};
  },[key]);
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch(e){}},[key,v]); // offline backup
  const set=x=>{
    const next=typeof x==='function'?x(cur.current):x;
    cur.current=next;setV(next);
    if(CLOUD)_db.collection('nh').doc(key).set({value:JSON.stringify(next)}).catch(e=>console.warn('save failed',e));
  };
  return [v,set,ready];
}

/* ---------- Helpers ---------- */
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const off=n=>{const d=new Date();d.setDate(d.getDate()+n);return ymd(d)};
const uid=()=>Math.random().toString(36).slice(2,9);
const upsert=(set,it)=>set(l=>l.some(x=>x.id===it.id)?l.map(x=>x.id===it.id?it:x):[it,...l]);
const remove=(set,id)=>set(l=>l.filter(x=>x.id!==id));


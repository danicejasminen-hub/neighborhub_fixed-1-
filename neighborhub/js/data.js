// Demo data used on first run and by 'Reset demo data'
/* ---------- Demo data ---------- */
const SEED=()=>({
 users:[{id:'u1',name:'Admin',email:'admin@demo.com',password:'admin123',role:'admin'},{id:'u2',name:'Maria Santos',email:'resident@demo.com',password:'demo123',role:'resident'},{id:'u3',name:'Aling Rosa',email:'vendor@demo.com',password:'demo123',role:'business'}],
 ann:[{id:'a1',title:'Welcome to NeighborHub',message:'Please read the community guidelines and keep our streets friendly.',category:'general',date:off(0),author:'Admin',pinned:true},{id:'a2',title:'Fair-price market this Saturday',message:'All vendors, please post prices openly.',category:'business',date:off(-1),author:'Admin',pinned:false}],
 sch:[{id:'s1',title:'Garbage collection',date:off(2),time:'07:00',category:'garbage',description:'Put bins out before 7 AM.',done:false},{id:'s2',title:'Neighborhood meeting',date:off(5),time:'18:30',category:'meeting',description:'At the barangay hall.',done:false},{id:'s3',title:'Weekend market',date:off(6),time:'06:00',category:'market',description:'',done:false}],
 con:[{id:'c1',name:'Aling Rosa',type:'vendor',businessName:'Rosa Sari-Sari Store',category:'Groceries',phone:'0917 111 2222',email:'rosa@example.com',address:'Block 2',notes:''},{id:'c2',name:'Mang Tonyo',type:'vendor',businessName:'Fresh Fish',category:'Seafood',phone:'0918 333 4444',email:'',address:'Market row',notes:''},{id:'c3',name:'Maria Santos',type:'resident',businessName:'',category:'',phone:'0919 555 6666',email:'maria@example.com',address:'Block 5',notes:''}],
 msgs:{c1:[{id:'m1',from:'them',text:'Good morning! Fresh vegetables arrive Saturday.',ts:new Date().toISOString(),read:false}]},
 reps:[{id:'r1',type:'noise',description:'Loud music after 10 PM.',involved:'Corner karaoke',date:off(-3),status:'review',by:'Maria Santos'}]
});


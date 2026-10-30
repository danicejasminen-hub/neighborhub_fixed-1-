// App root + route protection
/* ---------- App + route protection ---------- */
const PAGES={dashboard:Dashboard,announcements:Announcements,schedule:Schedule,calendar:CalendarPage,chat:Chat,contacts:Contacts,guidelines:Guidelines,reports:Reports,settings:Settings};
function App(){
  const {page,me}=useC();
  let body;
  if(page==='landing')body=html`<${Landing} />`;
  else if(!me)body=html`<${Auth} key=${page} mode=${page==='signup'?'signup':'login'} />`;
  else{const P=PAGES[page]||Dashboard;body=html`<${Shell}><${P} /><//>`}
  return html`<div><${Header} />${body}</div>`;
}
ReactDOM.createRoot(document.getElementById('root')).render(html`<${Provider}><${App} /><//>`);

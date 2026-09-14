(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$("#year").textContent=new Date().getFullYear();
// theme
const btn=$("#themeBtn");const sync=()=>{const t=document.documentElement.getAttribute("data-theme");btn.setAttribute("aria-pressed",t==="dark"?"true":"false");};sync();
btn.addEventListener("click",()=>{const cur=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",cur);try{localStorage.setItem("vs-theme",cur);}catch(e){}sync();});
// mobile
const burger=$("#burger"),mm=$("#mobileMenu");burger.addEventListener("click",()=>{const open=mm.hidden;mm.hidden=!open;burger.setAttribute("aria-expanded",String(open));burger.setAttribute("aria-label",open?"Close menu":"Open menu");});mm.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mm.hidden=true;burger.setAttribute("aria-expanded","false");}));
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12});$$(".rv").forEach(el=>io.observe(el));
// top
$("#toTop").addEventListener("click",()=>{const r=matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:r?"auto":"smooth"});});
// chat
const fab=$("#chatFab"),panel=$("#chatPanel"),log=$("#chatLog"),form=$("#chatForm"),input=$("#chatInput"),chips=$("#chatChips");
let greeted=false;const push=(t,who="bot")=>{const d=document.createElement("div");d.className="msg "+who;d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight;};
const answer=q=>{q=q.toLowerCase();
if(/price|cost|quote|much/.test(q))return "Engagements are scoped per brand. Most start with a 4-week SEO + content sprint, then monthly growth. Email hello@venturestudios.co with your site + goal for a fixed quote.";
if(/seo/.test(q))return "SEO: technical foundations, search-intent mapping, editorial content and ongoing optimization. We target queries that buy, not just traffic.";
if(/social/.test(q))return "Social: one platform done well first. Content systems, campaign concepts and community — repurposed into email + search.";
if(/email/.test(q))return "Email: lifecycle flows (welcome, browse, post-purchase) + a weekly campaign. Segmentation and deliverability included.";
if(/content/.test(q))return "Content: intent-led articles, landing pages and campaign assets designed to rank, get shared and convert.";
if(/process|start|project|work with|begin/.test(q))return "Start: 1) 20-min intro 2) audit + growth map 3) 90-day plan. Email hello@venturestudios.co with your URL and goal.";
if(/contact|email|talk|human|call/.test(q))return "You can reach the studio at hello@venturestudios.co (demo inbox). Use the contact form below and we reply within 2 business days.";
if(/who|about|venture/.test(q))return "Venture Studios is a specialized demo studio for SEO, social, content and email — connected by one growth strategy.";
if(/hi|hello|hey/.test(q))return "Hello — ask me about services, process, or starting a project.";
return "I can help with services, process, pricing approach or contact. Try: 'How do you approach SEO?'";};
const open=()=>{panel.hidden=false;fab.setAttribute("aria-expanded","true");if(!greeted){greeted=true;push("Hi — I'm the studio assistant (automated). What are you growing?");}setTimeout(()=>input.focus(),50);};
const close=()=>{panel.hidden=true;fab.setAttribute("aria-expanded","false");fab.focus();};
fab.addEventListener("click",()=>panel.hidden?open():close());$("#chatClose").addEventListener("click",close);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)close();});
form.addEventListener("submit",e=>{e.preventDefault();const v=input.value.trim();if(!v)return;push(v,"user");input.value="";setTimeout(()=>push(answer(v)),350);});
chips.addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;const v=e.target.textContent;push(v,"user");setTimeout(()=>push(answer(v)),350);});
// contact form
const cf=$("#leadForm");if(cf){cf.addEventListener("submit",e=>{e.preventDefault();let ok=true;cf.querySelectorAll("[required]").forEach(f=>{const err=f.closest(".field")?.querySelector(".ferr");const bad=!f.value.trim()||(f.type==="email"&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));if(err)err.textContent=bad?("Please enter a valid "+f.name+"."):"";if(bad)ok=false;});if(!ok)return;cf.innerHTML='<div class="ok-msg" role="status"><strong>Thanks — message noted (demo).</strong><br/>In a live build this would send to hello@venturestudios.co. Email us directly to start.</div>';});}
})();

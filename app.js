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
if(/price|cost|quote|much/.test(q))return "Sprints start at $4,800. Monthly growth starts at $3,200 a month with a three month minimum. Email hello@venturestudios.co with your URL and goal for a scoped quote.";
if(/seo/.test(q))return "SEO starts with technical health and Search Console, then intent mapping in Ahrefs for queries that buy. Every article has a job: rank, assist or convert.";
if(/social/.test(q))return "Social is one platform done properly, usually Instagram or LinkedIn. We set voice and cadence your team can keep, then reuse the same research across content and email.";
if(/email/.test(q))return "Email is Klaviyo or HubSpot flows plus a weekly campaign. Welcome, browse and winback first, then testing. List cleaning and deliverability come before design.";
if(/content/.test(q))return "Content is landing pages and guides built from customer interviews and support tickets. One asset gets reused for search, social and email.";
if(/process|start|project|work with|begin/.test(q))return "Start with an email to hello@venturestudios.co. You get three observations and a quote within two business days, then a 90 day map if we proceed.";
if(/contact|email|talk|human|call/.test(q))return "Reach Maya at hello@venturestudios.co. Use the contact form and we reply within two business days.";
if(/who|about|venture|team|founder/.test(q))return "Venture Studios is run by Maya Raines with Jonas, Priya and Theo. Four people covering SEO, social, content and email.";
if(/hi|hello|hey/.test(q))return "Hello. Ask me about services, pricing or starting a project.";
return "I can help with services, pricing or contact. Try: 'What does it cost?'";};
const open=()=>{panel.hidden=false;fab.setAttribute("aria-expanded","true");if(!greeted){greeted=true;push("Hi. I am the studio assistant (automated). What are you growing?");}setTimeout(()=>input.focus(),50);};
const close=()=>{panel.hidden=true;fab.setAttribute("aria-expanded","false");fab.focus();};
fab.addEventListener("click",()=>panel.hidden?open():close());$("#chatClose").addEventListener("click",close);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)close();});
// lift chat above footer so it never covers Back to top
const foot=document.querySelector(".footer");if(foot&&"IntersectionObserver" in window){const lift=es=>es.forEach(e=>{const on=e.isIntersecting;fab.classList.toggle("raised",on);panel.classList.toggle("raised",on);});const fio=new IntersectionObserver(lift,{threshold:.05});fio.observe(foot);}
form.addEventListener("submit",e=>{e.preventDefault();const v=input.value.trim();if(!v)return;push(v,"user");input.value="";setTimeout(()=>push(answer(v)),350);});
chips.addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;const v=e.target.textContent;push(v,"user");setTimeout(()=>push(answer(v)),350);});
// contact form
const cf=$("#leadForm");if(cf){cf.addEventListener("submit",e=>{e.preventDefault();let ok=true;cf.querySelectorAll("[required]").forEach(f=>{const err=f.closest(".field")?.querySelector(".ferr");const bad=!f.value.trim()||(f.type==="email"&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));if(err)err.textContent=bad?("Please enter a valid "+f.name+"."):"";if(bad)ok=false;});if(!ok)return;cf.innerHTML='<div class="ok-msg" role="status"><strong>Thanks. Got it.</strong><br/>We will get back to you within two business days.</div>';});}
})();

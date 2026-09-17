(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$("#year").textContent=new Date().getFullYear();
// theme: icon-only toggle with accurate label
const btn=$("#themeBtn");const sync=()=>{const dark=document.documentElement.getAttribute("data-theme")==="dark";btn.setAttribute("aria-pressed",String(dark));btn.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");};sync();
btn.addEventListener("click",()=>{const cur=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",cur);try{localStorage.setItem("vs-theme",cur);}catch(e){}sync();});
// mobile menu
const burger=$("#burger"),mm=$("#mobileMenu");const setMenu=open=>{mm.hidden=!open;burger.setAttribute("aria-expanded",String(open));burger.setAttribute("aria-label",open?"Close menu":"Open menu");if(open){const first=mm.querySelector("a");if(first)first.focus();}};
burger.addEventListener("click",()=>setMenu(mm.hidden));mm.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!mm.hidden){setMenu(false);burger.focus();}});
// reveal: quiet single fade, hero leads
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12});$$(".rv").forEach(el=>io.observe(el));
// top
$("#toTop").addEventListener("click",()=>{const r=matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:r?"auto":"smooth"});});
// faq: single-open accordion, smooth both ways via CSS grid-rows
const acc=document.querySelector("[data-accordion]");
if(acc){const items=[...acc.querySelectorAll(".faq-item")];const set=(item,open)=>{item.dataset.open=String(open);item.querySelector("button").setAttribute("aria-expanded",String(open));};
items.forEach(item=>{item.querySelector("button").addEventListener("click",()=>{const willOpen=item.dataset.open!=="true";items.forEach(i=>set(i,false));set(item,willOpen);});});}
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
// contact form: validate, then send via configured endpoint or email handoff
const cf=$("#leadForm");
if(cf){
const status=$("#formStatus"),submit=$("#leadSubmit");
const fields={
name:{el:$("#f-name"),err:$("#f-name-err"),msg:"Tell us your name so we know who is writing.",bad:v=>!v.trim()},
email:{el:$("#f-email"),err:$("#f-email-err"),msg:"That email does not look right. Mind checking it?",bad:v=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim())},
message:{el:$("#f-msg"),err:$("#f-msg-err"),msg:"Give us a sentence or two about the goal.",bad:v=>v.trim().length<10}};
const site={el:$("#f-url"),bad:v=>{v=v.trim();return v!==""&&!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(v);},msg:"That website address looks incomplete."};
const note=site.el?document.createElement("p"):null;if(note){note.className="ferr";note.setAttribute("aria-live","polite");site.el.closest(".field").appendChild(note);}
const say=(kind,text)=>{if(!status)return;status.hidden=false;status.className="form-status "+kind;status.textContent=text;};
const checkOne=f=>{const bad=f.bad(f.el.value);if(f.err)f.err.textContent=bad?f.msg:"";f.el.toggleAttribute("aria-invalid",bad);return !bad;};
Object.values(fields).forEach(f=>{f.el.addEventListener("input",()=>{if(f.el.hasAttribute("aria-invalid"))checkOne(f);});});
cf.addEventListener("submit",async e=>{e.preventDefault();
let ok=true;Object.values(fields).forEach(f=>{if(!checkOne(f))ok=false;});
if(site.el){const bad=site.bad(site.el.value);note.textContent=bad?site.msg:"";site.el.toggleAttribute("aria-invalid",bad);if(bad)ok=false;}
if(!ok){const firstBad=cf.querySelector("[aria-invalid='true']");if(firstBad)firstBad.focus();return;}
const data={name:fields.name.el.value.trim(),email:fields.email.el.value.trim(),website:site.el?site.el.value.trim():"",need:$("#f-need")?$("#f-need").value:"",message:fields.message.el.value.trim()};
submit.disabled=true;const label=submit.textContent;submit.textContent="Sending…";say("busy","Sending your note…");
const endpoint=(cf.dataset.formspree||"").trim();
try{
if(endpoint){const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({...data,_subject:"New inquiry — Venture Studios"})});if(!res.ok)throw new Error("send failed");}
else{const subject=encodeURIComponent("Project inquiry from "+data.name);const body=encodeURIComponent(data.message+"\n\n— "+data.name+" ("+data.email+")"+(data.website?" · "+data.website:"")+" · Need: "+data.need);window.location.href="mailto:hello@venturestudios.co?subject="+subject+"&body="+body;}
cf.innerHTML='';const done=document.createElement("div");done.className="ok-msg";done.setAttribute("role","status");const hi=document.createElement("strong");hi.textContent="Thanks, "+data.name.split(" ")[0]+". Your note is on its way.";done.appendChild(hi);done.appendChild(document.createElement("br"));done.appendChild(document.createTextNode("Maya replies within two business days. In a hurry? Write directly to "));const ml=document.createElement("a");ml.href="mailto:hello@venturestudios.co";ml.textContent="hello@venturestudios.co";done.appendChild(ml);done.appendChild(document.createTextNode("."));cf.appendChild(done);
}catch(err){say("err","That did not send. Check your connection and try again, or write to hello@venturestudios.co directly.");submit.disabled=false;submit.textContent=label;}
});}
})();

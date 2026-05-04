function re(U){const{db:d,appId:p,collection:A,addDoc:$,updateDoc:k,doc:g,serverTimestamp:v,getDoc:w,getDocs:O,query:z,where:T}=U,V=t=>{const r=new Date().toISOString().slice(0,10);return t.quoteValidUntil&&t.quoteValidUntil<r&&t.status==="draft"?{key:"expired",label:"Proposta Expirada",badge:"badge-red",canAct:!1}:t.status==="client_approved"?{key:"client_approved",label:"Aprovada pelo Cliente",badge:"badge-green",canAct:!1}:t.status==="rejected"?{key:"rejected",label:"Recusada pelo Cliente",badge:"badge-red",canAct:!1}:t.status==="approved"?{key:"approved",label:"Convertida em O.S.",badge:"badge-blue",canAct:!1}:t.status==="finalized"?{key:"finalized",label:"Projeto Finalizado",badge:"badge-green",canAct:!1}:{key:"draft",label:"Aguardando Decisão",badge:"badge-yellow",canAct:!0}},f=t=>{const r=String(t||"");return/^data:image\//.test(r)||/^https?:\/\//.test(r)?r:""},F=t=>{if(!t)return"-";if(typeof t?.toDate=="function")return t.toDate().toLocaleString("pt-BR");const r=new Date(t);return Number.isNaN(r.getTime())?String(t):r.toLocaleString("pt-BR")},Q=async()=>{try{const t=new AbortController,r=setTimeout(()=>t.abort(),3500),e=await fetch("https://api.ipify.org?format=json",{signal:t.signal,cache:"no-store"});if(clearTimeout(r),!e.ok)throw new Error("ip_fetch_failed");return(await e.json()).ip||"Nao capturado"}catch{return"Nao capturado"}},Z=async t=>{try{const r=new TextEncoder().encode(String(t||"")),e=await crypto.subtle.digest("SHA-256",r);return Array.from(new Uint8Array(e)).map(a=>a.toString(16).padStart(2,"0")).join("")}catch{return btoa(unescape(encodeURIComponent(String(t||"")))).replace(/[^a-zA-Z0-9]/g,"").slice(0,64)}},S=async({action:t,name:r,documentId:e,note:a,acceptedTerms:s,acceptedDigitalRecord:n})=>{const c=new Date().toISOString(),o=typeof screen<"u"?`${screen.width}x${screen.height}`:"indisponivel",y=Intl.DateTimeFormat().resolvedOptions().timeZone||"indisponivel",m=await Q(),u=[t,r,e,a,s?"1":"0",n?"1":"0",c,m,navigator.userAgent,navigator.language,navigator.platform,o,y].join("|");return{action:t,signerName:r,signerDocument:e,note:a||"",acceptedTerms:!!s,acceptedDigitalRecord:!!n,capturedAtIso:c,capturedAtLabel:new Date(c).toLocaleString("pt-BR"),ipAddress:m,userAgent:navigator.userAgent,language:navigator.language||"indisponivel",platform:navigator.platform||"indisponivel",timeZone:y,screenSize:o,hash:await Z(u)}},E=(t,r,e)=>r?`
        <div class="rounded-3xl border border-gray-100 bg-white p-6">
            <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">${window.escapeHtml(t)}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p class="text-[10px] font-black text-gray-400 uppercase">Responsável</p>
                    <p class="font-black text-gray-800 mt-1">${window.escapeHtml(r.signerName||"-")}</p>
                    <p class="text-xs text-gray-500 mt-2">${window.escapeHtml(r.signerDocument||"-")}</p>
                </div>
                <div class="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p class="text-[10px] font-black text-gray-400 uppercase">Registro eletrônico</p>
                    <p class="font-black text-gray-800 mt-1">${window.escapeHtml(r.capturedAtLabel||F(r.capturedAtIso))}</p>
                    <p class="text-xs mt-2" style="color:${e}">IP ${window.escapeHtml(r.ipAddress||"Nao capturado")}</p>
                </div>
                <div class="rounded-2xl bg-gray-50 border border-gray-100 p-4 md:col-span-2">
                    <p class="text-[10px] font-black text-gray-400 uppercase">Hash de auditoria</p>
                    <p class="font-black text-gray-800 mt-1 break-all">${window.escapeHtml(r.hash||"-")}</p>
                    <p class="text-xs text-gray-500 mt-2">${window.escapeHtml(r.platform||"indisponivel")} · ${window.escapeHtml(r.language||"indisponivel")} · ${window.escapeHtml(r.screenSize||"indisponivel")} · ${window.escapeHtml(r.timeZone||"indisponivel")}</p>
                </div>
            </div>
            ${r.note?`<div class="rounded-2xl bg-amber-50 border border-amber-100 p-4 mt-4"><p class="text-[10px] font-black text-amber-500 uppercase">Observação registrada</p><p class="text-sm text-amber-900 mt-2">${window.escapeHtml(r.note)}</p></div>`:""}
        </div>
    `:"",H=t=>t.pricingMode==="smart"&&t.smartTotal?window.toNumber(t.smartTotal):t.width?window.toNumber(t.width)*window.toNumber(t.height)*window.toNumber(t.qty,1)*window.toNumber(t.priceM2)*(1+window.toNumber(t.waste)/100):window.toNumber(t.qty,1)*window.toNumber(t.val||t.priceM2);window.loadPublicQuote=async t=>{const r=document.getElementById("public-quote-content");r.innerHTML='<div class="text-center py-16"><div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-purple-600 mx-auto mb-4"></div><p class="text-gray-500 font-bold">Carregando proposta...</p></div>';try{const e=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!e.exists())throw new Error("Orçamento não encontrado ou já removido pelo fornecedor.");const a={id:t,...e.data()};h(a,"quote");const s=await w(g(d,"artifacts",p,"public","data","settings",a.companyId)),n=s.exists()?s.data():{},c=/^#[0-9a-fA-F]{6}$/.test(n.primaryColor||"")?n.primaryColor:"#8B5CF6",o=window.escapeHtml,y=Array.isArray(a.items)?a.items:[],m=Array.isArray(a.artUrls)?a.artUrls.filter(l=>/^https?:\/\//.test(String(l?.url||""))):[],u=f(n.logo),x=f(a.layoutImage),b=V(a),P=D(a,"quote"),j=D(a,"art"),R=a.publicTerms||"Ao aprovar esta proposta, declaro estar de acordo com os valores, prazos, escopo e condições comerciais apresentadas.";r.innerHTML=`
            <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                <div class="relative bg-slate-950 text-white p-8 md:p-10">
                    <div class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at top right, ${c}, transparent 35%), radial-gradient(circle at bottom left, #38bdf8, transparent 30%);"></div>
                    <div class="relative flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            ${u?`<img src="${u}" class="h-16 object-contain bg-white rounded-xl p-2 mb-6">`:`<h2 class="text-3xl font-black mb-6" style="color: ${c}">${o(n.companyName||"FlowSystem")}</h2>`}
                            <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50">Proposta Comercial</p>
                            <h1 class="text-3xl md:text-5xl font-black tracking-tight mt-3">${o(a.title||"Projeto sem título")}</h1>
                            <p class="text-white/60 mt-4 max-w-xl">Olá, ${o(a.clientName||"cliente")}. Revise os dados abaixo e registre sua decisão com segurança.</p>
                        </div>
                        <div class="md:text-right shrink-0">
                            <span class="badge ${b.badge}">${b.label}</span>
                            <p class="text-white/50 text-xs font-black uppercase mt-6">Número</p>
                            <p class="text-2xl font-black">#${o(a.number||t)}</p>
                            <p class="text-white/50 text-xs font-black uppercase mt-4">Validade</p>
                            <p class="font-bold">${a.quoteValidUntil?window.formatDate(a.quoteValidUntil):"A combinar"}</p>
                        </div>
                    </div>
                </div>

                <div class="p-6 md:p-10">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Cliente</p><p class="font-black text-gray-800 mt-1">${o(a.clientName||"-")}</p></div>
                        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Data</p><p class="font-black text-gray-800 mt-1">${window.formatDate(a.date)}</p></div>
                        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Entrega</p><p class="font-black text-gray-800 mt-1">${o(a.deliveryDeadline||"A combinar")}</p></div>
                        <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Pagamento</p><p class="font-black text-gray-800 mt-1">${o(a.paymentMethod||"A combinar")}</p></div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2">
                            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-3 mb-4">Escopo da Proposta</h3>
                            <div class="space-y-3">
                                ${y.map(l=>`
                                    <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                        <div class="flex flex-col md:flex-row justify-between gap-4">
                                            <div>
                                                <p class="font-black text-gray-900">${o(l.material||"Item sem descrição")}</p>
                                                <p class="text-xs text-gray-400 font-bold mt-1">${window.toNumber(l.qty,1)} un ${l.width?`· ${o(l.width)} x ${o(l.height)} m`:""}</p>
                                                ${l.finish?`<p class="text-xs text-gray-500 mt-2">Acabamento: ${o(l.finish)}</p>`:""}
                                            </div>
                                            <div class="font-black text-gray-900 text-right">${window.formatCurrency(H(l))}</div>
                                        </div>
                                    </div>
                                `).join("")||'<p class="text-sm text-gray-400 font-bold py-8 text-center">Nenhum item detalhado nesta proposta.</p>'}
                            </div>

                            ${a.observations?`<div class="mt-8 rounded-2xl bg-amber-50 border border-amber-100 p-5"><p class="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Observações Técnicas</p><p class="text-sm text-amber-900 whitespace-pre-line">${o(a.observations)}</p></div>`:""}
                        </div>

                        <aside class="space-y-5">
                            <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                                <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Total da Proposta</p>
                                ${a.discount>0?`<p class="text-sm text-red-500 font-bold mt-3">Desconto aplicado: ${a.discountType==="%"?`${o(a.discount)}%`:window.formatCurrency(a.discount)}</p>`:""}
                                <p class="text-4xl font-black mt-3" style="color: ${c}">${window.formatCurrency(a.totalValue)}</p>
                                <p class="text-xs text-gray-400 font-bold mt-2">Valores sujeitos aos termos e validade da proposta.</p>
                            </div>

                            <div class="rounded-3xl border border-gray-100 bg-white p-6">
                                <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Termos de Aceite</p>
                                <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">${o(R)}</p>
                            </div>
                        </aside>
                    </div>

                    ${x||m.length?`
                        <div class="mt-10 border-t border-gray-100 pt-8">
                            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Referências e Anexos</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${x?`<div class="rounded-2xl border border-gray-100 bg-gray-50 p-4"><img src="${x}" class="mx-auto rounded-xl max-h-80 object-contain shadow-sm"></div>`:""}
                                ${m.map(l=>`<a href="${o(l.url)}" target="_blank" rel="noopener noreferrer" class="rounded-2xl border border-gray-100 p-5 hover:border-theme hover:shadow-md transition"><p class="font-black text-gray-800">${o(l.title||"Anexo")}</p><p class="text-xs text-theme font-bold mt-2 break-all">${o(l.url)}</p></a>`).join("")}
                            </div>
                        </div>
                    `:""}

                    <div class="mt-10 border-t border-gray-100 pt-8">
                        ${b.canAct?`
                            <div class="rounded-3xl bg-gray-50 border border-gray-100 p-6">
                                <h3 class="font-black text-gray-900 text-xl mb-2">Registrar decisão</h3>
                                <p class="text-sm text-gray-500 mb-5">Informe seus dados para aprovar ou recusar esta proposta.</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input id="public-client-name" class="input-modern bg-white" placeholder="Nome do aprovador/responsável">
                                    <input id="public-client-doc" class="input-modern bg-white" placeholder="CPF/CNPJ ou documento">
                                </div>
                                <textarea id="public-client-note" class="input-modern bg-white h-24 mb-4" placeholder="Observação opcional"></textarea>
                                <label class="flex items-start gap-3 text-sm text-gray-600 font-bold mb-6">
                                    <input id="public-accept-terms" type="checkbox" class="mt-1 rounded text-theme">
                                    <span>Li e concordo com os termos, valores, prazos e escopo apresentados nesta proposta.</span>
                                </label>
                                <label class="flex items-start gap-3 text-sm text-gray-600 font-bold mb-6">
                                    <input id="public-accept-audit" type="checkbox" class="mt-1 rounded text-theme">
                                    <span>Autorizo o registro eletrônico desta decisão com data, documento, IP e evidências técnicas do navegador.</span>
                                </label>
                                <div class="flex flex-col md:flex-row gap-3">
                                    <button onclick="window.clientApproveQuote('${t}', '${a.companyId}')" class="flex-1 px-6 py-4 rounded-2xl text-white font-black shadow-xl hover:scale-[1.01] transition" style="background: linear-gradient(135deg, ${c} 0%, ${window.adjustColor(c,-30)} 100%);">APROVAR PROPOSTA</button>
                                    <button onclick="window.clientRejectQuote('${t}', '${a.companyId}')" class="px-6 py-4 rounded-2xl bg-white border border-red-200 text-red-600 font-black hover:bg-red-50 transition">RECUSAR</button>
                                </div>
                            </div>
                        `:`
                            <div class="text-center rounded-3xl bg-gray-50 border border-gray-100 p-8">
                                <p class="text-2xl font-black text-gray-800">${b.label}</p>
                                ${b.key==="expired"?'<p class="text-sm text-gray-500 mt-2">Solicite uma nova proposta atualizada à nossa equipe.</p>':""}
                                ${a.clientDecisionNote?`<p class="text-sm text-gray-500 mt-4">Observação registrada: ${o(a.clientDecisionNote)}</p>`:""}
                            </div>
                        `}
                        ${a.clientDecisionEvidence||a.clientDecisionHash?E("Aceite Digital da Proposta",a.clientDecisionEvidence||null,c):""}
                    </div>
                </div>
            </div>
        `;const C=`${window.location.pathname}?quote=${t}`,N=`${window.location.pathname}?art=${t}`;r.querySelectorAll(`a[href="${C}"]`).forEach(l=>{P?l.href=P:(l.removeAttribute("href"),l.classList.add("pointer-events-none","opacity-40"))}),r.querySelectorAll(`a[href="${N}"]`).forEach(l=>{j?l.href=j:(l.removeAttribute("href"),l.classList.add("pointer-events-none","opacity-40"))}),window.lucide&&lucide.createIcons()}catch(e){r.innerHTML=`<div class="text-center py-10 text-red-500 font-bold"><i data-lucide="alert-triangle" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>${window.escapeHtml(e.message)}</div>`,window.lucide&&lucide.createIcons()}};const _=()=>{const t=document.getElementById("public-client-name")?.value.trim()||"",r=document.getElementById("public-client-doc")?.value.trim()||"",e=document.getElementById("public-client-note")?.value.trim()||"",a=!!document.getElementById("public-accept-terms")?.checked,s=!!document.getElementById("public-accept-audit")?.checked;return{name:t,documentId:r,note:e,acceptedTerms:a,acceptedDigitalRecord:s}};window.clientApproveQuote=async(t,r)=>{const e=_();if(!e.name||!e.documentId)return window.customAlert("Informe nome e documento do responsável.");if(!e.acceptedTerms)return window.customAlert("É necessário aceitar os termos para aprovar a proposta.");if(!e.acceptedDigitalRecord)return window.customAlert("Autorize o registro eletrônico para concluir a aprovação.");if(await window.customConfirm("Deseja realmente aprovar esta proposta e dar início ao projeto?"))try{const a=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!a.exists())throw new Error("Proposta nao encontrada.");h({id:t,...a.data()},"quote");const s=await S({action:"quote_approval",...e});await k(g(d,"artifacts",p,"public","data","commercial_docs",t),{status:"client_approved",clientDecision:"approved",clientDecisionName:e.name,clientDecisionDocument:e.documentId,clientDecisionNote:e.note,clientDecisionUserAgent:s.userAgent,clientDecisionIp:s.ipAddress,clientDecisionHash:s.hash,clientDecisionEvidence:s,clientAcceptedTerms:!0,clientAcceptedDigitalRecord:!0,clientApprovedAt:v()}),await $(A(d,"artifacts",p,"public","data","audit_logs"),{action:"APROVACAO_CLIENTE",details:`Cliente aprovou o orçamento pelo link público. Responsável: ${e.name}. Hash: ${s.hash}`,user:"Acesso Público",companyId:r,date:v()}),await window.customAlert("Proposta aprovada com sucesso! Nossa equipe entrará em contato em breve."),window.loadPublicQuote(t)}catch(a){await window.customAlert("Erro ao processar aprovação: "+a.message)}},window.clientRejectQuote=async(t,r)=>{const e=_();if(!e.name)return window.customAlert("Informe o nome do responsável pela recusa.");if(!e.note)return window.customAlert("Informe o motivo da recusa no campo de observação.");if(!e.acceptedDigitalRecord)return window.customAlert("Autorize o registro eletrônico para concluir a recusa.");if(await window.customConfirm("Deseja registrar a recusa desta proposta?"))try{const a=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!a.exists())throw new Error("Proposta nao encontrada.");h({id:t,...a.data()},"quote");const s=await S({action:"quote_rejection",...e});await k(g(d,"artifacts",p,"public","data","commercial_docs",t),{status:"rejected",clientDecision:"rejected",clientDecisionName:e.name,clientDecisionDocument:e.documentId,clientDecisionNote:e.note,clientDecisionUserAgent:s.userAgent,clientDecisionIp:s.ipAddress,clientDecisionHash:s.hash,clientDecisionEvidence:s,clientAcceptedDigitalRecord:!0,clientRejectedAt:v()}),await $(A(d,"artifacts",p,"public","data","audit_logs"),{action:"RECUSA_CLIENTE",details:`Cliente recusou o orçamento pelo link público. Motivo: ${e.note}. Hash: ${s.hash}`,user:"Acesso Público",companyId:r,date:v()}),await window.customAlert("Recusa registrada. Agradecemos o retorno."),window.loadPublicQuote(t)}catch(a){await window.customAlert("Erro ao registrar recusa: "+a.message)}};const q=t=>{const r=document.getElementById("public-quote-content");return r.innerHTML=`<div class="text-center py-16"><div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-purple-600 mx-auto mb-4"></div><p class="text-gray-500 font-bold">${window.escapeHtml(t)}</p></div>`,r},J=()=>new URLSearchParams(window.location.search).get("token")||"",G=(t,r,e)=>{const a=new URL(window.location.href);return a.search="",a.searchParams.set(t,r),e&&a.searchParams.set("token",e),a.toString()},D=(t,r)=>{const e=t?.publicAccess?.token||"",a=t?.publicAccess?.[r];return!e||!a?.active?"":G(r,t.id,e)},h=(t,r,e=J())=>{const a=t?.publicAccess||{},s=a[r];if(!e)throw new Error("Link público incompleto. Solicite um novo acesso ao fornecedor.");if(!a.token||e!==a.token)throw new Error("Link público inválido ou revogado.");if(!s?.active)throw new Error("Este link público está desativado.");if(s.expiresAt&&new Date(s.expiresAt)<new Date)throw new Error("Este link público expirou. Solicite um novo acesso atualizado.");return s},B=async(t,r)=>{const e=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!e.exists())throw new Error("Documento não encontrado ou removido.");const a={id:t,...e.data()};h(a,r);const s=await w(g(d,"artifacts",p,"public","data","settings",a.companyId)),n=s.exists()?s.data():{};return{d:a,s:n}},L=t=>{const r=/^#[0-9a-fA-F]{6}$/.test(t.primaryColor||"")?t.primaryColor:"#8B5CF6";return{color:r,dark:window.adjustColor(r,-30),logo:f(t.logo)}},K=t=>[{label:"Orçamento criado",done:!!(t.createdAt||t.date),date:t.date},{label:"Cliente aprovou proposta",done:!!(t.clientApprovedAt||t.status==="client_approved"||t.status==="approved"||t.status==="finalized"),date:t.clientApprovedAt},{label:"Arte aprovada",done:t.artApprovalStatus==="approved",date:t.artApprovedAt},{label:"Produção liberada",done:t.status==="approved"||t.status==="finalized",date:t.updatedAt},{label:"Projeto finalizado",done:t.status==="finalized",date:t.closedAt}],W=t=>{const r=Array.isArray(t.productionChecklist)?t.productionChecklist:[],e=r.filter(s=>s.done).length,a=r.length?Math.round(e/r.length*100):0;return{checklist:r,done:e,total:r.length,percent:a}},X=(t,r)=>{const e=Array.isArray(r?.kanbanStages)?r.kanbanStages:[];return(Array.isArray(t.osStages)?t.osStages:[]).map(s=>e.find(n=>n.id===s)?.label||s)},Y=t=>[...Array.isArray(t.clientPortalMessages)?t.clientPortalMessages:[]].sort((r,e)=>String(e.createdAt||"").localeCompare(String(r.createdAt||"")));window.loadPublicArtApproval=async t=>{const r=q("Carregando arte para aprovação...");try{const{d:e,s:a}=await B(t,"art"),{color:s,dark:n,logo:c}=L(a),o=window.escapeHtml,y=Array.isArray(e.artUrls)?e.artUrls.filter(b=>/^https?:\/\//.test(String(b?.url||""))):[],m=f(e.layoutImage),u=e.artApprovalStatus||(m||y.length?"pending":"missing"),x=u==="pending"||u==="rejected";r.innerHTML=`
            <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                <div class="relative bg-slate-950 text-white p-8 md:p-10">
                    <div class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at top right, ${s}, transparent 35%), radial-gradient(circle at bottom left, #38bdf8, transparent 30%);"></div>
                    <div class="relative flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            ${c?`<img src="${c}" class="h-16 object-contain bg-white rounded-xl p-2 mb-6">`:`<h2 class="text-3xl font-black mb-6" style="color: ${s}">${o(a.companyName||"FlowSystem")}</h2>`}
                            <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50">Aprovação de Arte</p>
                            <h1 class="text-3xl md:text-5xl font-black tracking-tight mt-3">${o(e.title||"Projeto sem título")}</h1>
                            <p class="text-white/60 mt-4 max-w-xl">Revise o layout e registre a decisão oficial da arte.</p>
                        </div>
                        <div class="md:text-right shrink-0">
                            <span class="badge ${u==="approved"?"badge-green":u==="rejected"?"badge-red":u==="missing"?"badge-gray":"badge-yellow"}">${u==="approved"?"Arte Aprovada":u==="rejected"?"Arte Reprovada":u==="missing"?"Sem Arte":"Aguardando Aprovação"}</span>
                            <p class="text-white/50 text-xs font-black uppercase mt-6">Documento</p>
                            <p class="text-2xl font-black">#${o(e.number||t)}</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 md:p-10">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            ${m?`<div class="rounded-2xl border border-gray-100 bg-gray-50 p-4"><img src="${m}" class="mx-auto rounded-xl max-h-[28rem] object-contain shadow-sm"></div>`:'<div class="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center text-sm text-gray-400 font-bold">Nenhuma miniatura foi enviada.</div>'}
                            ${y.length?`<div class="rounded-2xl border border-gray-100 bg-white p-5"><p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Arquivos Complementares</p>${y.map(b=>`<a href="${o(b.url)}" target="_blank" rel="noopener noreferrer" class="block rounded-xl border border-gray-100 px-4 py-3 hover:border-theme hover:shadow-sm transition"><span class="font-black text-gray-800">${o(b.title||"Arquivo")}</span><span class="block text-xs text-theme font-bold mt-1 break-all">${o(b.url)}</span></a>`).join("")}</div>`:""}
                        </div>
                        <div class="space-y-5">
                            <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                                <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Resumo</p>
                                <div class="space-y-3 mt-4 text-sm">
                                    <div class="flex justify-between gap-4"><span class="text-gray-500">Cliente</span><span class="font-black text-gray-800 text-right">${o(e.clientName||"-")}</span></div>
                                    <div class="flex justify-between gap-4"><span class="text-gray-500">Entrega</span><span class="font-black text-gray-800 text-right">${o(e.deliveryDeadline||"A combinar")}</span></div>
                                    <div class="flex justify-between gap-4"><span class="text-gray-500">Status atual</span><span class="font-black text-gray-800 text-right">${o(e.status||"draft")}</span></div>
                                </div>
                            </div>
                            ${x?`
                                <div class="rounded-3xl border border-gray-100 bg-white p-6">
                                    <h3 class="font-black text-gray-900 text-xl mb-2">Decisão da arte</h3>
                                    <p class="text-sm text-gray-500 mb-5">A aprovação libera produção. A reprovação registra o motivo para correção.</p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input id="public-art-name" class="input-modern bg-white" placeholder="Nome do responsável">
                                        <input id="public-art-doc" class="input-modern bg-white" placeholder="CPF/CNPJ ou documento">
                                    </div>
                                    <textarea id="public-art-note" class="input-modern bg-white h-28 mb-4" placeholder="Observação ou ajustes desejados"></textarea>
                                    <label class="flex items-start gap-3 text-sm text-gray-600 font-bold mb-6">
                                        <input id="public-art-accept" type="checkbox" class="mt-1 rounded text-theme">
                                        <span>Autorizo o registro eletrônico desta decisão de arte com data, documento, IP e evidências técnicas do navegador.</span>
                                    </label>
                                    <div class="flex flex-col md:flex-row gap-3">
                                        <button onclick="window.approvePublicArt('${t}', '${e.companyId}')" class="flex-1 px-6 py-4 rounded-2xl text-white font-black shadow-xl transition" style="background: linear-gradient(135deg, ${s} 0%, ${n} 100%);">APROVAR ARTE</button>
                                        <button onclick="window.rejectPublicArt('${t}', '${e.companyId}')" class="px-6 py-4 rounded-2xl bg-white border border-red-200 text-red-600 font-black hover:bg-red-50 transition">REPROVAR</button>
                                    </div>
                                </div>
                            `:`
                                <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-center">
                                    <p class="text-2xl font-black text-gray-800">${u==="approved"?"Arte já aprovada":u==="rejected"?"Arte reprovada":"Sem arte publicada"}</p>
                                    ${e.artApprovalNote?`<p class="text-sm text-gray-500 mt-3">Observação registrada: ${o(e.artApprovalNote)}</p>`:""}
                                </div>
                            `}
                            ${e.artDecisionEvidence?E("Aceite Digital da Arte",e.artDecisionEvidence,s):""}
                        </div>
                    </div>
                </div>
            </div>
        `,window.lucide&&lucide.createIcons()}catch(e){r.innerHTML=`<div class="text-center py-10 text-red-500 font-bold"><i data-lucide="alert-triangle" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>${window.escapeHtml(e.message)}</div>`,window.lucide&&lucide.createIcons()}},window.loadPublicPortal=async t=>{const r=q("Carregando portal do cliente...");try{const{d:e,s:a}=await B(t,"portal"),{color:s,dark:n,logo:c}=L(a),o=window.escapeHtml,m=(await O(z(A(d,"artifacts",p,"public","data","financial"),T("companyId","==",e.companyId),T("type","==","income")))).docs.map(i=>({id:i.id,...i.data()})).filter(i=>{if(i.linkedCommercialDocId===e.id)return!0;const I=String(i.projectNumber||"")===String(e.number||""),ae=String(i.clientName||"")===String(e.clientName||"");return I&&ae}),u=K(e),x=W(e),b=X(e,a),P=Y(e),j=[...Array.isArray(e.artUrls)?e.artUrls:[],...Array.isArray(e.productionAttachments)?e.productionAttachments:[]].filter(i=>/^https?:\/\//.test(String(i?.url||""))),R=Array.isArray(e.items)?e.items:[],C=m.reduce((i,I)=>i+window.toNumber(I.amount),0),N=m.filter(i=>i.status==="paid").reduce((i,I)=>i+window.toNumber(I.amount),0),l=Math.max(C-N,0),ee=D(e,"quote"),M=D(e,"art"),te=b.length?b.join(" • "):"Aguardando liberação operacional";r.innerHTML=`
            <div class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                <div class="relative bg-slate-950 text-white p-8 md:p-10">
                    <div class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at top right, ${s}, transparent 35%), radial-gradient(circle at bottom left, #38bdf8, transparent 30%);"></div>
                    <div class="relative flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            ${c?`<img src="${c}" class="h-16 object-contain bg-white rounded-xl p-2 mb-6">`:`<h2 class="text-3xl font-black mb-6" style="color: ${s}">${o(a.companyName||"FlowSystem")}</h2>`}
                            <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50">Portal do Cliente</p>
                            <h1 class="text-3xl md:text-5xl font-black tracking-tight mt-3">${o(e.title||"Projeto")}</h1>
                            <p class="text-white/60 mt-4 max-w-xl">Acompanhe status, arte, pagamentos e evolução do projeto.</p>
                        </div>
                        <div class="md:text-right shrink-0">
                            <span class="badge ${e.status==="finalized"?"badge-green":e.status==="approved"?"badge-blue":e.status==="client_approved"?"badge-purple":"badge-yellow"}">${o(e.status||"draft")}</span>
                            <p class="text-white/50 text-xs font-black uppercase mt-6">Documento</p>
                            <p class="text-2xl font-black">#${o(e.number||t)}</p>
                            <p class="text-white/50 text-xs font-black uppercase mt-4">Responsável comercial</p>
                            <p class="font-bold">${o(e.sellerName||"Equipe")}</p>
                        </div>
                    </div>
                </div>
                <div class="p-6 md:p-10 grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div class="xl:col-span-2 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Cliente</p><p class="font-black text-gray-800 mt-1">${o(e.clientName||"-")}</p></div>
                            <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Entrega prevista</p><p class="font-black text-gray-800 mt-1">${o(e.deliveryDeadline||"A combinar")}</p></div>
                            <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Arte</p><p class="font-black text-gray-800 mt-1">${o(e.artApprovalStatus==="approved"?"Aprovada":e.artApprovalStatus==="rejected"?"Reprovada":"Pendente")}</p></div>
                            <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100"><p class="text-[10px] font-black text-gray-400 uppercase">Progresso</p><p class="font-black text-gray-800 mt-1">${x.percent}%</p></div>
                        </div>
                        <div class="rounded-3xl border border-gray-100 bg-white p-6">
                            <div class="flex flex-col md:flex-row justify-between gap-4 mb-5">
                                <div>
                                    <h3 class="font-black text-gray-900 text-xl">Status do projeto</h3>
                                    <p class="text-sm text-gray-500 mt-1">Etapa atual, avanço operacional e próximos passos do projeto.</p>
                                </div>
                                <span class="badge badge-blue">${o(te)}</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <p class="text-[10px] font-black text-gray-400 uppercase">Checklist</p>
                                    <p class="text-2xl font-black text-gray-800 mt-2">${x.done}/${x.total||0}</p>
                                    <p class="text-xs text-gray-500 font-bold mt-2">Itens concluídos</p>
                                </div>
                                <div class="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <p class="text-[10px] font-black text-gray-400 uppercase">Responsável</p>
                                    <p class="text-2xl font-black text-gray-800 mt-2">${o(e.responsible||e.sellerName||"Equipe")}</p>
                                    <p class="text-xs text-gray-500 font-bold mt-2">${o(e.priority||"Prioridade normal")}</p>
                                </div>
                                <div class="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <p class="text-[10px] font-black text-gray-400 uppercase">Próxima meta</p>
                                    <p class="text-lg font-black text-gray-800 mt-2">${o(e.productionDueDate||e.deliveryDeadline||"A definir")}</p>
                                    <p class="text-xs text-gray-500 font-bold mt-2">Prazo operacional</p>
                                </div>
                            </div>
                            <div class="mt-5">
                                <div class="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                                    <div class="h-full rounded-full" style="width:${x.percent}%; background: linear-gradient(90deg, ${s}, ${n});"></div>
                                </div>
                                <p class="text-xs text-gray-400 font-bold mt-2">${x.total?"Atualizado automaticamente pela execução da O.S.":"O checklist será exibido quando a equipe iniciar a execução."}</p>
                            </div>
                        </div>
                        <div class="rounded-3xl border border-gray-100 bg-white p-6">
                            <h3 class="font-black text-gray-900 text-xl mb-5">Escopo contratado</h3>
                            <div class="space-y-3">
                                ${R.map(i=>`<div class="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex flex-col md:flex-row justify-between gap-4"><div><p class="font-black text-gray-800">${o(i.material||"Item")}</p><p class="text-xs text-gray-400 font-bold mt-1">${window.toNumber(i.qty,1)} un ${i.width?`• ${o(i.width)} x ${o(i.height)} m`:""}</p></div><p class="font-black text-gray-900">${window.formatCurrency(H(i))}</p></div>`).join("")||'<p class="text-sm text-gray-400 font-bold">Sem itens detalhados no documento.</p>'}
                            </div>
                        </div>
                        <div class="rounded-3xl border border-gray-100 bg-white p-6">
                            <h3 class="font-black text-gray-900 text-xl mb-5">Linha do tempo</h3>
                            <div class="space-y-4">
                                ${u.map(i=>`<div class="flex items-start gap-4"><div class="w-10 h-10 rounded-full flex items-center justify-center font-black ${i.done?"bg-green-100 text-green-700":"bg-gray-100 text-gray-400"}">${i.done?"OK":"..."}</div><div><p class="font-black text-gray-800">${o(i.label)}</p><p class="text-sm text-gray-400">${i.date?window.formatDate(i.date):"Aguardando"}</p></div></div>`).join("")}
                            </div>
                        </div>
                        ${e.clientDecisionEvidence||e.artDecisionEvidence?`
                            <div class="grid grid-cols-1 gap-6">
                                ${e.clientDecisionEvidence?E("Aceite Digital da Proposta",e.clientDecisionEvidence,s):""}
                                ${e.artDecisionEvidence?E("Aceite Digital da Arte",e.artDecisionEvidence,s):""}
                            </div>
                        `:""}
                        ${f(e.layoutImage)||j.length?`<div class="rounded-3xl border border-gray-100 bg-white p-6"><div class="flex justify-between items-center mb-4"><h3 class="font-black text-gray-900 text-xl">Arquivos do projeto</h3><a href="${M||`${window.location.pathname}?art=${t}`}" class="text-sm font-black" style="color:${s}">Abrir aprovação de arte</a></div>${f(e.layoutImage)?`<img src="${f(e.layoutImage)}" class="w-full max-h-96 object-contain rounded-2xl bg-gray-50 border border-gray-100 p-4">`:""}<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">${j.map(i=>`<a href="${o(i.url)}" target="_blank" rel="noopener noreferrer" class="rounded-2xl border border-gray-100 p-4 hover:border-theme hover:shadow-sm transition"><p class="font-black text-gray-800">${o(i.title||"Arquivo")}</p><p class="text-xs font-bold mt-1 break-all" style="color:${s}">${o(i.url)}</p></a>`).join("")}</div></div>`:""}
                        <div class="rounded-3xl border border-gray-100 bg-white p-6">
                            <div class="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div>
                                    <h3 class="font-black text-gray-900 text-xl">Mensagens do cliente</h3>
                                    <p class="text-sm text-gray-500 mt-1">Use este canal para registrar dúvidas, pedidos e retornos do projeto.</p>
                                </div>
                                <span class="badge badge-purple">${P.length} registro(s)</span>
                            </div>
                            <div class="space-y-3 mb-5">
                                ${P.map(i=>`<div class="rounded-2xl border border-gray-100 bg-gray-50 p-4"><div class="flex flex-col md:flex-row justify-between gap-3"><div><p class="font-black text-gray-800">${o(i.name||"Cliente")}</p><p class="text-xs text-gray-400 font-bold mt-1">${o(i.documentId||"Sem documento")}</p></div><p class="text-xs text-gray-400 font-bold">${i.createdAt?new Date(i.createdAt).toLocaleString("pt-BR"):"-"}</p></div><p class="text-sm text-gray-600 mt-3 whitespace-pre-line">${o(i.message||"")}</p></div>`).join("")||'<p class="text-sm text-gray-400 font-bold">Nenhuma mensagem registrada até o momento.</p>'}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input id="portal-msg-name" class="input-modern bg-white" placeholder="Nome do responsável">
                                <input id="portal-msg-doc" class="input-modern bg-white" placeholder="CPF/CNPJ ou documento">
                            </div>
                            <textarea id="portal-msg-text" class="input-modern bg-white h-28 mb-4" placeholder="Digite aqui sua mensagem para a equipe"></textarea>
                            <button onclick="window.sendPortalMessage('${t}', '${e.companyId}')" class="px-5 py-3 rounded-2xl text-white font-black shadow-lg" style="background: linear-gradient(135deg, ${s} 0%, ${n} 100%);">Enviar mensagem</button>
                        </div>
                    </div>
                    <aside class="space-y-5">
                        <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                            <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Resumo financeiro</p>
                            <p class="text-4xl font-black mt-3" style="color: ${s}">${window.formatCurrency(e.totalValue)}</p>
                            <p class="text-xs text-gray-400 font-bold mt-2">Total contratado</p>
                            <div class="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
                                <div class="flex justify-between"><span class="text-gray-500">Parcelas</span><span class="font-black text-gray-800">${m.length||0}</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Previsto</span><span class="font-black text-gray-800">${window.formatCurrency(C)}</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Pago</span><span class="font-black text-green-600">${window.formatCurrency(N)}</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Em aberto</span><span class="font-black text-red-500">${window.formatCurrency(l)}</span></div>
                            </div>
                        </div>
                        <div class="rounded-3xl border border-gray-100 bg-white p-6">
                            <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Pagamentos</p>
                            <div class="space-y-3">
                                ${m.map(i=>`<div class="rounded-2xl border border-gray-100 p-4"><div class="flex justify-between items-center"><p class="font-black text-gray-800">${o(i.description||"Parcela")}</p><span class="badge ${i.status==="paid"?"badge-green":i.dueDate<new Date().toISOString().slice(0,10)?"badge-red":"badge-yellow"}">${o(i.status||"pending")}</span></div><p class="text-sm text-gray-500 mt-2">${window.formatDate(i.dueDate)} · ${window.formatCurrency(i.amount)}</p></div>`).join("")||'<p class="text-sm text-gray-400 font-bold">Nenhum lançamento financeiro vinculado ainda.</p>'}
                            </div>
                        </div>
                        <div class="rounded-3xl border border-gray-100 bg-white p-6">
                            <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Acessos rápidos</p>
                            <div class="flex flex-col gap-3">
                                <a href="${ee||`${window.location.pathname}?quote=${t}`}" class="px-4 py-3 rounded-2xl text-white font-black text-center" style="background: linear-gradient(135deg, ${s} 0%, ${n} 100%);">Ver proposta</a>
                                <a href="${M||`${window.location.pathname}?art=${t}`}" class="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 font-black text-center">Abrir aprovação de arte</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        `,window.lucide&&lucide.createIcons()}catch(e){r.innerHTML=`<div class="text-center py-10 text-red-500 font-bold"><i data-lucide="alert-triangle" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>${window.escapeHtml(e.message)}</div>`,window.lucide&&lucide.createIcons()}},window.sendPortalMessage=async(t,r)=>{const e=document.getElementById("portal-msg-name")?.value.trim()||"",a=document.getElementById("portal-msg-doc")?.value.trim()||"",s=document.getElementById("portal-msg-text")?.value.trim()||"";if(!e)return window.customAlert("Informe o nome do responsável pela mensagem.");if(!s)return window.customAlert("Digite a mensagem para enviar ao projeto.");try{const n=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!n.exists())throw new Error("Projeto não encontrado.");const c=n.data();h({id:t,...c},"portal");const o=[...Array.isArray(c.clientPortalMessages)?c.clientPortalMessages:[],{id:`${Date.now()}-${Math.random().toString(16).slice(2,8)}`,name:e,documentId:a,message:s,createdAt:new Date().toISOString()}];await k(g(d,"artifacts",p,"public","data","commercial_docs",t),{clientPortalMessages:o,updatedAt:v()}),await $(A(d,"artifacts",p,"public","data","audit_logs"),{action:"PORTAL_CLIENTE_MSG",details:`Mensagem enviada pelo portal do cliente para o documento ${c.number||t}. Responsável: ${e}.`,user:"Acesso Público",companyId:r,date:v()}),await window.customAlert("Mensagem enviada com sucesso. Nossa equipe verá esse registro no projeto."),window.loadPublicPortal(t)}catch(n){await window.customAlert("Erro ao enviar mensagem: "+n.message)}},window.approvePublicArt=async(t,r)=>{const e=document.getElementById("public-art-name")?.value.trim()||"",a=document.getElementById("public-art-doc")?.value.trim()||"",s=document.getElementById("public-art-note")?.value.trim()||"",n=!!document.getElementById("public-art-accept")?.checked;if(!e)return window.customAlert("Informe o nome do responsável pela aprovação.");if(!n)return window.customAlert("Autorize o registro eletrônico para concluir a aprovação da arte.");if(await window.customConfirm("Deseja aprovar esta arte e liberar a produção?"))try{const c=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!c.exists())throw new Error("Arte nao encontrada.");h({id:t,...c.data()},"art");const o=await S({action:"art_approval",name:e,documentId:a,note:s,acceptedTerms:!1,acceptedDigitalRecord:n});await k(g(d,"artifacts",p,"public","data","commercial_docs",t),{artApprovalStatus:"approved",artApprovalName:e,artApprovalDocument:a,artApprovalNote:s,artApprovedAt:v(),artApprovalUserAgent:o.userAgent,artApprovalIp:o.ipAddress,artDecisionHash:o.hash,artDecisionEvidence:o,artAcceptedDigitalRecord:!0}),await $(A(d,"artifacts",p,"public","data","audit_logs"),{action:"APROVACAO_ARTE_PUBLICA",details:`Cliente aprovou a arte pelo link público. Responsável: ${e}. Hash: ${o.hash}`,user:"Acesso Público",companyId:r,date:v()}),await window.customAlert("Arte aprovada com sucesso."),window.loadPublicArtApproval(t)}catch(c){await window.customAlert("Erro ao aprovar arte: "+c.message)}},window.rejectPublicArt=async(t,r)=>{const e=document.getElementById("public-art-name")?.value.trim()||"",a=document.getElementById("public-art-doc")?.value.trim()||"",s=document.getElementById("public-art-note")?.value.trim()||"",n=!!document.getElementById("public-art-accept")?.checked;if(!e)return window.customAlert("Informe o nome do responsável pela reprovação.");if(!s)return window.customAlert("Informe o motivo ou ajuste desejado.");if(!n)return window.customAlert("Autorize o registro eletrônico para concluir a reprovação da arte.");if(await window.customConfirm("Deseja reprovar esta arte e solicitar ajustes?"))try{const c=await w(g(d,"artifacts",p,"public","data","commercial_docs",t));if(!c.exists())throw new Error("Arte nao encontrada.");h({id:t,...c.data()},"art");const o=await S({action:"art_rejection",name:e,documentId:a,note:s,acceptedTerms:!1,acceptedDigitalRecord:n});await k(g(d,"artifacts",p,"public","data","commercial_docs",t),{artApprovalStatus:"rejected",artApprovalName:e,artApprovalDocument:a,artApprovalNote:s,artRejectedAt:v(),artApprovalUserAgent:o.userAgent,artApprovalIp:o.ipAddress,artDecisionHash:o.hash,artDecisionEvidence:o,artAcceptedDigitalRecord:!0}),await $(A(d,"artifacts",p,"public","data","audit_logs"),{action:"REPROVACAO_ARTE_PUBLICA",details:`Cliente reprovou a arte pelo link público. Responsável: ${e}. Motivo: ${s}. Hash: ${o.hash}`,user:"Acesso Público",companyId:r,date:v()}),await window.customAlert("Reprovação registrada com sucesso."),window.loadPublicArtApproval(t)}catch(c){await window.customAlert("Erro ao reprovar arte: "+c.message)}}}export{re as registerPublicQuote};

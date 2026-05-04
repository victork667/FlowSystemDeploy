function Te(ee){const{state:i,defaultKanbanStages:P,defaultRoles:be,firebaseConfig:we,auth:xe,db:w,appId:x,initializeApp:ve,getAuth:ye,signInWithEmailAndPassword:fe,createUserWithEmailAndPassword:he,signOut:$e,onAuthStateChanged:Ce,signInWithCustomToken:Se,collection:E,addDoc:T,updateDoc:I,deleteDoc:z,doc:$,onSnapshot:Ae,serverTimestamp:f,setDoc:Ie,getDoc:ke,getDocs:Ee}=ee;window.setComTab=t=>{i.comActiveTab=t;const e={quotes:"commercial_quotes",os:"commercial_os",finalized:"commercial_finalized",leads:"commercial_leads",agenda:"commercial_agenda"};i.currentView=e[t]||"commercial_quotes",document.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("nav-active"));const a=document.getElementById(`nav-${i.currentView}`);a&&a.classList.add("nav-active");const n={commercial_quotes:"Comercial · Orcamentos",commercial_os:"Comercial · O.S.",commercial_finalized:"Comercial · Finalizados",commercial_leads:"Comercial · Leads",commercial_agenda:"Comercial · Agenda"},o=document.getElementById("page-title");o&&(o.innerText=n[i.currentView]||"Comercial & Produção"),window.renderCommercial()},window.setComSearch=t=>{i.comSearch=String(t||"").toLowerCase(),window.renderCommercial()},window.toggleCommercialExpanded=()=>{i.commercialExpanded=!i.commercialExpanded,window.renderCommercial()};const te=(t=[])=>{const e={quotes:"Orcamentos Comerciais",os:"Operacao de O.S.",finalized:"Projetos Finalizados",leads:"Pipeline de Leads",agenda:"Agenda Comercial"},a={quotes:"Propostas, aprovacoes e conversao para producao com leitura rapida do pipeline.",os:"Gestao operacional das ordens em andamento com foco em prazo e execucao.",finalized:"Historico das entregas fechadas com acesso rapido aos detalhes.",leads:"Negociacoes em aberto, previsao e proxima acao comercial.",agenda:"Compromissos, visitas e follow-ups organizados para o dia a dia."},n={quotes:[{label:"Ativos",value:String(t.length)},{label:"Aprovados",value:String((i.commercialDocs||[]).filter(o=>o.status==="client_approved").length)},{label:"Valor",value:window.formatCurrency(t.reduce((o,s)=>o+window.toNumber(s.totalValue),0))},{label:"Busca",value:i.comSearch?"Filtrada":"Completa"}],os:[{label:"Em andamento",value:String(t.length)},{label:"Atrasadas",value:String(t.filter(o=>window.isProductionOverdue?.(o)).length)},{label:"Urgentes",value:String(t.filter(o=>o.priority==="Urgente").length)},{label:"Com arte",value:String(t.filter(o=>o.artApprovalStatus==="approved").length)}],finalized:[{label:"Finalizados",value:String(t.length)},{label:"Faturado",value:window.formatCurrency(t.reduce((o,s)=>o+window.toNumber(s.totalValue),0))},{label:"Clientes",value:String(new Set(t.map(o=>o.clientName).filter(Boolean)).size)},{label:"Tickets",value:t.length?window.formatCurrency(t.reduce((o,s)=>o+window.toNumber(s.totalValue),0)/t.length):window.formatCurrency(0)}],leads:[{label:"Ativos",value:String((i.leads||[]).filter(o=>!["Ganho","Perdido"].includes(o.stage)).length)},{label:"Quentes",value:String((i.leads||[]).filter(o=>o.temperature==="Quente"&&o.stage!=="Perdido").length)},{label:"Forecast",value:window.formatCurrency((i.leads||[]).filter(o=>o.stage!=="Perdido").reduce((o,s)=>o+window.toNumber(s.estimatedValue),0))},{label:"Hoje",value:String((i.leads||[]).filter(o=>o.nextActionDate===new Date().toISOString().slice(0,10)&&o.stage!=="Perdido").length)}],agenda:[{label:"No mes",value:String((i.agendaEvents||[]).filter(o=>String(o.eventDate||"").startsWith(String(i.agendaMonth||new Date().toISOString().slice(0,7)))).length)},{label:"Pendentes",value:String((i.agendaEvents||[]).filter(o=>o.status==="pending").length)},{label:"Concluidos",value:String((i.agendaEvents||[]).filter(o=>o.status==="done").length)},{label:"Atrasados",value:String((i.agendaEvents||[]).filter(o=>o.status!=="done"&&o.eventDate&&o.eventDate<new Date().toISOString().slice(0,10)).length)}]};return{eyebrow:"Comercial",title:e[i.comActiveTab]||"Operacao Comercial",description:a[i.comActiveTab]||"Gestao comercial centralizada.",accent:"amber",cards:n[i.comActiveTab]||[]}},U=t=>{const e=t.quoteValidUntil&&t.quoteValidUntil<new Date().toISOString().slice(0,10)&&t.status==="draft";if(t.status==="client_approved")return'<span class="badge badge-nowrap bg-green-100 text-green-700 border border-green-300 animate-pulse">Aprovado pelo cliente</span>';if(e)return'<span class="badge badge-red">Expirado</span>';const a=t.status==="approved"?"badge-blue":t.status==="finalized"?"badge-green":t.status==="rejected"?"badge-red":"badge-yellow",n=t.status==="draft"?"Orçamento":t.status==="approved"?"Em Produção":t.status==="rejected"?"Rejeitado pelo Cliente":"Finalizado";return`<span class="badge ${a}">${n}</span>`},ae=t=>`
    <details class="mobile-action-menu">
        <summary aria-label="Ações do documento"><i data-lucide="ellipsis"></i></summary>
        <div class="mobile-action-menu-panel">
            <button type="button" class="mobile-action-menu-item" onclick="window.printSetup('${t.id}', '${t.type==="quote"?"Orçamento":"OS"}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="printer"></i><span>Imprimir</span></button>
            <button type="button" class="mobile-action-menu-item" onclick="window.printSetup('${t.id}', '${t.type==="quote"?"Orçamento Sem Valores":"OS Sem Valores"}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="file-minus"></i><span>Versão sem valores</span></button>
            ${t.status!=="draft"?`<button type="button" class="mobile-action-menu-item" onclick="window.printSetup('${t.id}', 'Contrato'); this.closest('details')?.removeAttribute('open');"><i data-lucide="file-signature"></i><span>Imprimir contrato</span></button>`:""}
            ${t.type==="os"?`<button type="button" class="mobile-action-menu-item" onclick="window.openProdModal('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="move-right"></i><span>Mover setor / gestão</span></button>`:""}
            ${t.status==="draft"||t.status==="rejected"?`<button type="button" class="mobile-action-menu-item" onclick="window.copyQuoteLink('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="link"></i><span>Copiar link da proposta</span></button>`:""}
            ${t.layoutImage||t.artUrls&&t.artUrls.length?`<button type="button" class="mobile-action-menu-item" onclick="window.copyArtApprovalLink('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="palette"></i><span>Copiar link da arte</span></button>`:""}
            <button type="button" class="mobile-action-menu-item" onclick="window.copyClientPortalLink('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="globe"></i><span>Portal do cliente</span></button>
            ${t.status!=="finalized"?`<button type="button" class="mobile-action-menu-item" onclick="window.openComModal('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>`:""}
            ${t.status!=="finalized"?`<button type="button" class="mobile-action-menu-item danger" onclick="window.delCom('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>`:""}
            ${t.status==="draft"||t.status==="client_approved"?`<button type="button" class="mobile-action-menu-item" onclick="window.openApproveModal('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="check-circle-2"></i><span>${t.status==="client_approved"?"Gerar O.S.":"Aprovar"}</span></button>`:""}
            ${t.status==="finalized"?`<button type="button" class="mobile-action-menu-item" onclick="window.viewOsDetails('${t.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="pie-chart"></i><span>Ver detalhes</span></button>`:""}
        </div>
    </details>
`;window.delCom=async t=>{if(await window.customConfirm("Excluir este documento de forma irreversível"))try{const e=i.commercialDocs.find(a=>a.id===t);await z($(w,"artifacts",x,"public","data","commercial_docs",t)),window.logAudit("APAGAR_ORCAMENTO",`Apagado Doc ${e.number||t}`)}catch(e){window.customAlert("Erro: "+e.message)}},window.onDragStart=(t,e,a)=>{t.dataTransfer.setData("text/plain",JSON.stringify({id:e,fromStage:a})),t.dataTransfer.effectAllowed="move",setTimeout(()=>t.target.classList.add("dragging"),0)},window.onDragEnd=t=>{t.target.classList.remove("dragging"),document.querySelectorAll(".drag-over").forEach(e=>e.classList.remove("drag-over"))},window.onDragOver=t=>{t.preventDefault(),t.dataTransfer.dropEffect="move";const e=t.target.closest(".kanban-col");e&&e.classList.add("drag-over")},window.onDragLeave=t=>{const e=t.target.closest(".kanban-col");e&&e.classList.remove("drag-over")},window.onDrop=(t,e)=>{t.preventDefault();const a=t.target.closest(".kanban-col");a&&a.classList.remove("drag-over");const n=t.dataTransfer.getData("text/plain");if(n)try{const o=JSON.parse(n);window.moveOsStage(o.id,o.fromStage,e)}catch(o){console.error(o)}},window.moveOsStage=async(t,e,a)=>{if(e!==a)try{const n=i.commercialDocs.find(s=>s.id===t);if(!n)return;let o=n.osStages||[n.osStage||"art"];o=o.filter(s=>s!==e),o.includes(a)||o.push(a),o.length===0&&o.push(a),await I($(w,"artifacts",x,"public","data","commercial_docs",t),{osStages:o,osStage:o[0]||a,updatedAt:f()})}catch(n){window.customAlert("Erro ao mover card: "+n.message)}},window.moveOsStageRelative=async(t,e=1)=>{const a=i.commercialDocs.find(r=>r.id===t);if(!a)return;const n=i.settings.kanbanStages&&i.settings.kanbanStages.length>0?i.settings.kanbanStages:P,s=(a.osStages||[a.osStage||n[0]?.id])[0]||n[0]?.id,d=n.findIndex(r=>r.id===s);if(d===-1)return;const l=Math.max(0,Math.min(n.length-1,d+e)),p=n[l]?.id;if(!(!p||p===s))return window.moveOsStage(t,s,p)},window.toggleItemDone=async(t,e,a)=>{try{const n=i.commercialDocs.find(s=>s.id===t);if(!n)return;const o=[...n.items];o[e].done=a,await I($(w,"artifacts",x,"public","data","commercial_docs",t),{items:o})}catch(n){console.error(n)}},window.revertToQuote=async t=>{if(await window.customConfirm(`Reverter para Orçamento? Isso vai voltar o documento para rascunho.

ATENÇÃO: se gerou receita no financeiro, terás que apagar os lançamentos manualmente para não estragar a contabilidade.`))try{await I($(w,"artifacts",x,"public","data","commercial_docs",t),{status:"draft",type:"quote",osStage:null,updatedAt:f()}),window.customAlert("Revertido com sucesso! O.S. devolvida ao limbo dos orçamentos."),window.logAudit("REVERTER_OS",`O.S. ID: ${t} revertida para Orçamento.`),window.setComTab("quotes")}catch(e){window.customAlert("Erro: "+e.message)}};const oe={quote:30,art:15,portal:30},ne=()=>{try{const t=new Uint8Array(24);return crypto.getRandomValues(t),Array.from(t,e=>e.toString(16).padStart(2,"0")).join("")}catch{return`${Date.now().toString(16)}${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`}},j=(t,e,a="")=>{const n=new URL(window.location.href);return n.search="",n.searchParams.set(t,e),a&&n.searchParams.set("token",a),n.toString()},ie=(t={},e)=>{const a=new Date,n=t[e]||{},o=new Date(n.expiresAt||""),d=Number.isNaN(o.getTime())||o<=a?new Date(a.getTime()+(oe[e]||30)*24*60*60*1e3).toISOString():n.expiresAt;return{...t,token:t.token||ne(),[e]:{active:!0,issuedAt:n.issuedAt||a.toISOString(),expiresAt:d}}},F=async(t,e)=>{const a=i.commercialDocs.find(o=>o.id===t);if(!a)throw new Error("Documento comercial nao encontrado.");const n=ie(a.publicAccess||{},e);return await I($(w,"artifacts",x,"public","data","commercial_docs",t),{publicAccess:n,updatedAt:f()}),j(e,t,n.token)};window.copyQuoteLink=async t=>{let e="";try{e=await F(t,"quote"),await navigator.clipboard.writeText(e),window.customAlert("Link copiado para a área de transferência. Podes enviá-lo ao teu cliente via WhatsApp ou email.")}catch{window.customAlert(`Copia bloqueada. Gere novamente ou use o link manual:

`+(e||j("quote",t)))}},window.copyArtApprovalLink=async t=>{let e="";try{e=await F(t,"art"),await navigator.clipboard.writeText(e),window.customAlert("Link de aprovação de arte copiado com sucesso.")}catch{window.customAlert(`Copia bloqueada. Gere novamente ou use o link manual:

`+(e||j("art",t)))}},window.copyClientPortalLink=async t=>{let e="";try{e=await F(t,"portal"),await navigator.clipboard.writeText(e),window.customAlert("Link do portal do cliente copiado com sucesso.")}catch{window.customAlert(`Copia bloqueada. Gere novamente ou use o link manual:

`+(e||j("portal",t)))}};const q=["Novo","Contato","Proposta","Negociacao","Ganho","Perdido"],G=["Frio","Morno","Quente"],Q=["Visita","Entrega","Instalacao","Follow-up","Financeiro","Reuniao"];window.setLeadStageFilter=t=>{i.leadStageFilter=t,window.renderCommercial()},window.setAgendaStatusFilter=t=>{i.agendaStatusFilter=t,window.renderCommercial()},window.getFilteredLeads=()=>{const t=String(i.comSearch||"").toLowerCase();return(i.leads||[]).filter(e=>{const a=!t||["name","contactName","phone","email","origin","sellerName"].some(o=>String(e[o]||"").toLowerCase().includes(t)),n=i.leadStageFilter==="all"||e.stage===i.leadStageFilter;return a&&n}).sort((e,a)=>String(e.nextActionDate||"").localeCompare(String(a.nextActionDate||""))||String(e.name||"").localeCompare(String(a.name||"")))},window.getFilteredAgendaEvents=()=>{const t=String(i.comSearch||"").toLowerCase();return(i.agendaEvents||[]).filter(e=>{const a=!t||["title","responsible","notes","eventType","relatedName"].some(o=>String(e[o]||"").toLowerCase().includes(t)),n=i.agendaStatusFilter==="all"||e.status===i.agendaStatusFilter;return a&&n}).sort((e,a)=>String(e.eventDate||"").localeCompare(String(a.eventDate||"")))},window.renderLeadsTab=()=>{const t=window.getFilteredLeads(),e=(i.leads||[]).filter(o=>!["Ganho","Perdido"].includes(o.stage)).length,a=(i.leads||[]).filter(o=>o.temperature==="Quente"&&o.stage!=="Perdido").length,n=(i.leads||[]).filter(o=>o.stage!=="Perdido").reduce((o,s)=>o+window.toNumber(s.estimatedValue),0);return`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            ${window.dashCard("Leads Ativos",e,"target","bg-blue-50 text-blue-600",`${a} quente(s)`)}
            ${window.dashCard("Pipeline",window.formatCurrency(n),"funnel","bg-emerald-50 text-emerald-600","Valor estimado em aberto")}
            ${window.dashCard("Follow-up Hoje",(i.leads||[]).filter(o=>o.nextActionDate===new Date().toISOString().slice(0,10)&&o.stage!=="Perdido").length,"phone-call","bg-orange-50 text-orange-600","Leads para retorno")}
        </div>
        <div class="card-modern overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div class="flex gap-2 bg-white rounded-lg p-1 border shadow-sm overflow-x-auto">
                    <button onclick="window.setLeadStageFilter('all')" class="px-4 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${i.leadStageFilter==="all"?"btn-gradient text-white shadow":"text-gray-500 hover:bg-gray-50"}">Todos</button>
                    ${q.map(o=>`<button onclick="window.setLeadStageFilter('${o}')" class="px-4 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${i.leadStageFilter===o?"btn-gradient text-white shadow":"text-gray-500 hover:bg-gray-50"}">${o}</button>`).join("")}
                </div>
                <button onclick="window.openLeadModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="user-plus" class="w-4 h-4 mr-2"></i> Novo Lead</button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm min-w-[980px]">
                    <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                        <tr>
                            <th class="p-4">Lead</th>
                            <th class="p-4">Origem</th>
                            <th class="p-4">Etapa</th>
                            <th class="p-4">Temperatura</th>
                            <th class="p-4">Próxima ação</th>
                            <th class="p-4 text-right">Valor</th>
                            <th class="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${t.map(o=>`
                            <tr class="hover:bg-gray-50 transition">
                                <td class="p-4">
                                    <div class="font-black text-gray-800">${window.escapeHtml(o.name||"Sem nome")}</div>
                                    <div class="text-xs text-gray-400 font-bold">${window.escapeHtml(o.phone||o.email||"Sem contato")}</div>
                                </td>
                                <td class="p-4 text-gray-600 font-bold">${window.escapeHtml(o.origin||"-")}</td>
                                <td class="p-4"><span class="badge ${o.stage==="Ganho"?"badge-green":o.stage==="Perdido"?"badge-red":"badge-blue"}">${window.escapeHtml(o.stage||"Novo")}</span></td>
                                <td class="p-4"><span class="badge ${o.temperature==="Quente"?"badge-red":o.temperature==="Morno"?"badge-yellow":"badge-gray"}">${window.escapeHtml(o.temperature||"Frio")}</span></td>
                                <td class="p-4">
                                    <div class="font-bold text-gray-700">${window.escapeHtml(o.nextAction||"Sem ação")}</div>
                                    <div class="text-xs text-gray-400">${window.formatDate(o.nextActionDate)}</div>
                                </td>
                                <td class="p-4 text-right font-black text-theme">${window.formatCurrency(o.estimatedValue)}</td>
                                <td class="p-4 text-right">
                                    <div class="flex justify-end gap-1">
                                        ${o.stage!=="Ganho"?`<button onclick="window.convertLeadToClient('${o.id}')" class="text-green-600 hover:bg-green-50 p-2 rounded-lg transition" title="Converter em cliente"><i data-lucide="badge-check" class="w-4 h-4"></i></button>`:""}
                                        <button onclick="window.requestAiLeadFollowUp('${o.id}', this)" class="text-violet-600 hover:bg-violet-50 p-2 rounded-lg transition" title="IA follow-up"><i data-lucide="sparkles" class="w-4 h-4"></i></button>
                                        <button onclick="window.openLeadModal('${o.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button>
                                        <button onclick="window.deleteLead('${o.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>
                                </td>
                            </tr>`).join("")||'<tr><td colspan="7" class="p-8 text-center text-gray-400">Nenhum lead encontrado.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>`},window.renderAgendaTab=()=>{const t=window.getFilteredAgendaEvents(),e=new Date().toISOString().slice(0,10),a=(i.agendaEvents||[]).filter(s=>s.status!=="done"&&s.eventDate&&s.eventDate<e).length,n=(i.agendaEvents||[]).filter(s=>s.status!=="done"&&s.eventDate===e).length,o=(i.agendaEvents||[]).filter(s=>s.status!=="done"&&s.eventDate&&s.eventDate>=e).length;return`
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            ${window.dashCard("Hoje",n,"calendar-days","bg-cyan-50 text-cyan-600","Eventos pendentes")}
            ${window.dashCard("Atrasados",a,"calendar-x-2",a?"bg-red-50 text-red-600":"bg-gray-50 text-gray-500","Agenda vencida")}
            ${window.dashCard("Próximos",o,"calendar-range","bg-purple-50 text-purple-600","Janela futura")}
        </div>
        <div class="card-modern overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div class="flex gap-2 bg-white rounded-lg p-1 border shadow-sm overflow-x-auto">
                    ${["all","pending","done","cancelled"].map(s=>`<button onclick="window.setAgendaStatusFilter('${s}')" class="px-4 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${i.agendaStatusFilter===s?"btn-gradient text-white shadow":"text-gray-500 hover:bg-gray-50"}">${s==="all"?"Todos":s==="pending"?"Pendentes":s==="done"?"Concluídos":"Cancelados"}</button>`).join("")}
                </div>
                <button onclick="window.openAgendaModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="calendar-plus" class="w-4 h-4 mr-2"></i> Novo Evento</button>
            </div>
            <div class="divide-y divide-gray-100">
                ${t.map(s=>`
                    <div class="p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-gray-50 transition">
                        <div>
                            <div class="flex flex-wrap items-center gap-2 mb-2">
                                <span class="badge ${s.status==="done"?"badge-green":s.status==="cancelled"||s.eventDate<e?"badge-red":"badge-blue"}">${s.status==="done"?"Concluído":s.status==="cancelled"?"Cancelado":s.eventDate<e?"Atrasado":"Pendente"}</span>
                                <span class="badge badge-gray">${window.escapeHtml(s.eventType||"Evento")}</span>
                                ${s.relatedName?`<span class="text-xs font-bold text-gray-400">${window.escapeHtml(s.relatedName)}</span>`:""}
                            </div>
                            <p class="font-black text-gray-800">${window.escapeHtml(s.title||"Sem título")}</p>
                            <p class="text-sm text-gray-500 mt-1">${window.escapeHtml(s.notes||"Sem observações")}</p>
                        </div>
                        <div class="md:text-right shrink-0">
                            <p class="font-black text-gray-800">${window.formatDate(s.eventDate)}</p>
                            <p class="text-xs text-gray-400 font-bold">${window.escapeHtml(s.responsible||"Sem responsável")}</p>
                            <div class="flex justify-end gap-1 mt-3">
                                ${s.status!=="done"?`<button onclick="window.toggleAgendaEventStatus('${s.id}', 'done')" class="text-green-600 hover:bg-green-50 p-2 rounded-lg transition"><i data-lucide="check-circle" class="w-4 h-4"></i></button>`:`<button onclick="window.toggleAgendaEventStatus('${s.id}', 'pending')" class="text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg transition"><i data-lucide="rotate-ccw" class="w-4 h-4"></i></button>`}
                                <button onclick="window.openAgendaModal('${s.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button>
                                <button onclick="window.deleteAgendaEvent('${s.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                    </div>`).join("")||'<div class="p-10 text-center text-gray-400 font-bold">Nenhum evento encontrado.</div>'}
            </div>
        </div>`},window.requestAiLeadFollowUp=async(t="",e)=>{await window.withActionLock(`ai-lead-followup-${t||"draft"}`,async()=>{if(!window.isGeminiEnabled()){await window.customAlert("Gemini nao configurado. Verifique o .env com GEMINI_API_KEY e VITE_GEMINI_ENABLED=true.");return}const a=t?(i.leads||[]).find(s=>s.id===t)||{}:{name:document.getElementById("lead-name")?.value||"",contactName:document.getElementById("lead-contact")?.value||"",phone:document.getElementById("lead-phone")?.value||"",email:document.getElementById("lead-email")?.value||"",origin:document.getElementById("lead-origin")?.value||"",sellerName:document.getElementById("lead-seller")?.value||"",stage:document.getElementById("lead-stage")?.value||"Novo",temperature:document.getElementById("lead-temp")?.value||"Frio",nextAction:document.getElementById("lead-next-action")?.value||"",nextActionDate:document.getElementById("lead-next-date")?.value||"",estimatedValue:parseFloat(document.getElementById("lead-value")?.value||"0")||0,notes:document.getElementById("lead-notes")?.value||""};if(!String(a.name||"").trim()){await window.customAlert("Informe ao menos o nome do lead antes de pedir follow-up para a IA.");return}const n=e instanceof HTMLElement?e:null,o=n?n.innerHTML:"";n&&(n.disabled=!0,n.classList.add("opacity-70","cursor-not-allowed"),n.innerHTML='<span class="inline-flex items-center gap-2"><span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Sugerindo</span>');try{const s=await window.callGeminiJson({systemInstruction:["Voce e um vendedor brasileiro de comunicacao visual focado em follow-up consultivo.","Retorne somente JSON valido.","Sugira a proxima abordagem comercial sem inventar dados.","Considere etapa, temperatura e origem do lead."].join(" "),prompt:JSON.stringify({objective:"Gerar follow-up comercial para lead.",lead:a,responseShape:{suggestedStage:"string",suggestedTemperature:"string",nextAction:"string",nextActionDate:"YYYY-MM-DD",clientMessage:"string",notes:"string"}},null,2),temperature:.4,maxOutputTokens:900}),d=document.getElementById("lead-stage"),l=document.getElementById("lead-temp"),p=document.getElementById("lead-next-action"),r=document.getElementById("lead-next-date"),u=document.getElementById("lead-notes");if(d&&s.suggestedStage&&q.includes(String(s.suggestedStage))&&(d.value=String(s.suggestedStage)),l&&s.suggestedTemperature&&G.includes(String(s.suggestedTemperature))&&(l.value=String(s.suggestedTemperature)),p&&s.nextAction&&(p.value=String(s.nextAction).trim()),r&&s.nextActionDate&&(r.value=String(s.nextActionDate).trim()),u){const c=[String(u.value||"").trim(),String(s.notes||"").trim(),s.clientMessage?`Mensagem sugerida:
${String(s.clientMessage).trim()}`:""].filter(Boolean);u.value=c.join(`

`)}s.clientMessage&&navigator.clipboard?.writeText&&await navigator.clipboard.writeText(String(s.clientMessage).trim()).catch(()=>{}),await window.customAlert(`Follow-up sugerido pela IA aplicado ao lead.${s.clientMessage?`

A mensagem sugerida foi copiada quando permitido pelo navegador.`:""}`)}catch(s){await window.customAlert(`Erro ao gerar follow-up do lead: ${s.message}`)}finally{n&&document.body.contains(n)&&(n.disabled=!1,n.classList.remove("opacity-70","cursor-not-allowed"),n.innerHTML=o)}},{silent:!0})},window.openLeadModal=(t=null)=>{const e=t?(i.leads||[]).find(a=>a.id===t)||{}:{};document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">${t?"Editar Lead":"Lead"}</h3>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Empresa / Lead</label><input id="lead-name" class="input-modern" value="${window.escapeHtml(e.name||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Contato</label><input id="lead-contact" class="input-modern" value="${window.escapeHtml(e.contactName||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Telefone</label><input id="lead-phone" class="input-modern" value="${window.escapeHtml(e.phone||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label><input id="lead-email" class="input-modern" value="${window.escapeHtml(e.email||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Origem</label><input id="lead-origin" class="input-modern" value="${window.escapeHtml(e.origin||"")}" placeholder="Instagram, Indicação, Site..."></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Vendedor</label><input id="lead-seller" class="input-modern" value="${window.escapeHtml(e.sellerName||"")}" placeholder="Responsável comercial"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Etapa</label><select id="lead-stage" class="input-modern">${q.map(a=>`<option ${e.stage===a?"selected":""}>${a}</option>`).join("")}</select></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Temperatura</label><select id="lead-temp" class="input-modern">${G.map(a=>`<option ${e.temperature===a?"selected":""}>${a}</option>`).join("")}</select></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Próxima ação</label><input id="lead-next-action" class="input-modern" value="${window.escapeHtml(e.nextAction||"")}" placeholder="Ligar, visitar, enviar proposta"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data próxima ação</label><input id="lead-next-date" type="date" class="input-modern" value="${window.escapeHtml(e.nextActionDate||"")}"></div>
                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Valor estimado</label><input id="lead-value" type="number" class="input-modern" value="${window.toNumber(e.estimatedValue)}"></div>
                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Notas</label><textarea id="lead-notes" class="input-modern h-28">${window.escapeHtml(e.notes||"")}</textarea></div>
                </div>
                <div class="mt-8 flex flex-wrap justify-end gap-3">
                    <button type="button" onclick="window.requestAiLeadFollowUp('${t||""}', this)" class="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-black text-violet-700 transition hover:bg-violet-100">
                        <i data-lucide="sparkles" class="inline w-4 h-4 mr-1"></i>IA follow-up
                    </button>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Cancelar</button>
                    <button onclick="window.saveLead('${t||""}')" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg">Salvar Lead</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.saveLead=async(t="")=>{try{const e={name:document.getElementById("lead-name").value,contactName:document.getElementById("lead-contact").value,phone:document.getElementById("lead-phone").value,email:document.getElementById("lead-email").value,origin:document.getElementById("lead-origin").value,sellerName:document.getElementById("lead-seller").value,stage:document.getElementById("lead-stage").value,temperature:document.getElementById("lead-temp").value,nextAction:document.getElementById("lead-next-action").value,nextActionDate:document.getElementById("lead-next-date").value,estimatedValue:parseFloat(document.getElementById("lead-value").value)||0,notes:document.getElementById("lead-notes").value,status:document.getElementById("lead-stage").value==="Ganho"?"converted":"open"};if(!e.name)return window.customAlert("Informe o nome do lead.");t?await I($(w,"artifacts",x,"public","data","leads",t),{...e,updatedAt:f()}):await T(E(w,"artifacts",x,"public","data","leads"),{...e,companyId:i.companyId,createdAt:f()}),document.getElementById("modal-container").innerHTML=""}catch(e){window.customAlert("Erro ao salvar lead: "+e.message)}},window.convertLeadToClient=async t=>{const e=(i.leads||[]).find(a=>a.id===t);if(e&&await window.customConfirm(`Converter o lead "${e.name}" em cliente`))try{const a=await T(E(w,"artifacts",x,"public","data","clients"),{name:e.name,phone:e.phone||"",email:e.email||"",document:"",city:"",companyId:i.companyId,createdAt:f()});await I($(w,"artifacts",x,"public","data","leads",t),{stage:"Ganho",status:"converted",clientId:a.id,convertedAt:f()}),window.logAudit("CONVERTER_LEAD",`Lead ${e.name} convertido em cliente.`)}catch(a){window.customAlert("Erro ao converter lead: "+a.message)}},window.deleteLead=async t=>{if(await window.customConfirm("Excluir este lead"))try{await z($(w,"artifacts",x,"public","data","leads",t))}catch(e){window.customAlert("Erro ao excluir lead: "+e.message)}},window.openAgendaModal=(t=null)=>{const e=t?(i.agendaEvents||[]).find(a=>a.id===t)||{}:{};document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">${t?"Editar Evento":"Evento"}</h3>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Título</label><input id="agenda-title" class="input-modern" value="${window.escapeHtml(e.title||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo</label><select id="agenda-type" class="input-modern">${Q.map(a=>`<option ${e.eventType===a?"selected":""}>${a}</option>`).join("")}</select></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Responsável</label><input id="agenda-responsible" class="input-modern" value="${window.escapeHtml(e.responsible||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data</label><input id="agenda-date" type="date" class="input-modern" value="${window.escapeHtml(e.eventDate||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Status</label><select id="agenda-status" class="input-modern">${["pending","done","cancelled"].map(a=>`<option value="${a}" ${e.status===a?"selected":""}>${a==="pending"?"Pendente":a==="done"?"Concluído":"Cancelado"}</option>`).join("")}</select></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Relacionar a</label><input id="agenda-related" class="input-modern" value="${window.escapeHtml(e.relatedName||"")}" placeholder="Cliente, lead, O.S., fornecedor..."></div>
                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Notas</label><textarea id="agenda-notes" class="input-modern h-28">${window.escapeHtml(e.notes||"")}</textarea></div>
                </div>
                <div class="mt-8 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Cancelar</button>
                    <button onclick="window.saveAgendaEvent('${t||""}')" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg">Salvar Evento</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.saveAgendaEvent=async(t="")=>{try{const e={title:document.getElementById("agenda-title").value,eventType:document.getElementById("agenda-type").value,responsible:document.getElementById("agenda-responsible").value,eventDate:document.getElementById("agenda-date").value,status:document.getElementById("agenda-status").value,relatedName:document.getElementById("agenda-related").value,notes:document.getElementById("agenda-notes").value};if(!e.title||!e.eventDate)return window.customAlert("Informe título e data do evento.");t?await I($(w,"artifacts",x,"public","data","agenda_events",t),{...e,updatedAt:f()}):await T(E(w,"artifacts",x,"public","data","agenda_events"),{...e,companyId:i.companyId,createdAt:f()}),document.getElementById("modal-container").innerHTML=""}catch(e){window.customAlert("Erro ao salvar evento: "+e.message)}},window.toggleAgendaEventStatus=async(t,e)=>{try{await I($(w,"artifacts",x,"public","data","agenda_events",t),{status:e,updatedAt:f()})}catch(a){window.customAlert("Erro ao atualizar evento: "+a.message)}},window.deleteAgendaEvent=async t=>{if(await window.customConfirm("Excluir este evento da agenda"))try{await z($(w,"artifacts",x,"public","data","agenda_events",t))}catch(e){window.customAlert("Erro ao excluir evento: "+e.message)}},window.changeAgendaMonth=t=>{const[e,a]=String(i.agendaMonth||new Date().toISOString().slice(0,7)).split("-").map(Number),n=new Date(e,(a||1)-1,1);n.setMonth(n.getMonth()+t),i.agendaMonth=n.toISOString().slice(0,7),window.renderCommercial()},window.setAgendaMonth=t=>{i.agendaMonth=t||new Date().toISOString().slice(0,7),window.renderCommercial()},window.renderAgendaTab=()=>{const t=i.agendaMonth||new Date().toISOString().slice(0,7),[e,a]=t.split("-").map(Number),n=new Date(e,a-1,1),o=new Date(n);o.setDate(1-n.getDay());const s=n.toLocaleDateString("pt-BR",{month:"long",year:"numeric"}),d=new Date().toISOString().slice(0,10),p=window.getFilteredAgendaEvents().filter(m=>String(m.eventDate||"").startsWith(t)),r=[...p].sort((m,b)=>String(m.eventDate||"").localeCompare(String(b.eventDate||""))).slice(0,10),u=p.filter(m=>m.status!=="done"&&m.eventDate&&m.eventDate<d).length,c=Array.from({length:42},(m,b)=>{const y=new Date(o);y.setDate(o.getDate()+b);const g=y.toISOString().slice(0,10);return{dateKey:g,dayNumber:y.getDate(),inMonth:y.getMonth()===n.getMonth(),isToday:g===d,items:p.filter(S=>S.eventDate===g).sort((S,M)=>String(S.title||"").localeCompare(String(M.title||"")))}});return`
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            ${window.dashCard("Eventos no Mês",p.length,"calendar-days","bg-blue-50 text-blue-600",s)}
            ${window.dashCard("Pendentes",p.filter(m=>m.status==="pending").length,"clock-3","bg-yellow-50 text-yellow-600","Aguardando execução")}
            ${window.dashCard("Concluídos",p.filter(m=>m.status==="done").length,"check-check","bg-green-50 text-green-600","Feitos no período")}
            ${window.dashCard("Atrasados",u,"siren",u?"bg-red-50 text-red-600":"bg-gray-50 text-gray-500","Eventos fora do prazo")}
        </div>
        <div class="card-modern overflow-hidden mb-6">
            <div class="p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div class="flex items-center gap-2">
                    <button onclick="window.changeAgendaMonth(-1)" class="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-theme/30 hover:text-theme transition"><i data-lucide="chevron-left" class="w-4 h-4 mx-auto"></i></button>
                    <div class="px-4">
                        <p class="text-xs font-black uppercase tracking-[0.25em] text-gray-400">Agenda</p>
                        <h3 class="text-lg font-black text-gray-800 capitalize">${window.escapeHtml(s)}</h3>
                    </div>
                    <button onclick="window.changeAgendaMonth(1)" class="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-theme/30 hover:text-theme transition"><i data-lucide="chevron-right" class="w-4 h-4 mx-auto"></i></button>
                </div>
                <div class="flex flex-col md:flex-row gap-2 w-full lg:w-auto">
                    <select onchange="window.setAgendaStatusFilter(this.value)" class="input-modern md:w-40">
                        ${["all","pending","done","cancelled"].map(m=>`<option value="${m}" ${i.agendaStatusFilter===m?"selected":""}>${m==="all"?"Todos":m==="pending"?"Pendentes":m==="done"?"Concluídos":"Cancelados"}</option>`).join("")}
                    </select>
                    <button onclick="window.openAgendaModal('', '${d}')" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="calendar-plus" class="w-4 h-4 mr-2"></i> Novo Evento</button>
                </div>
            </div>
            <div class="grid grid-cols-7 border-b border-gray-100 bg-white text-[11px] uppercase font-black tracking-wide text-gray-400">
                ${["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(m=>`<div class="px-3 py-3 text-center">${m}</div>`).join("")}
            </div>
            <div class="grid grid-cols-7">
                ${c.map(m=>`
                    <button onclick="window.openAgendaModal('', '${m.dateKey}')" class="min-h-[130px] border-r border-b border-gray-100 p-2 text-left align-top ${m.inMonth?"bg-white":"bg-gray-50/80"} hover:bg-theme/5 transition">
                        <div class="flex justify-between items-center mb-2">
                            <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${m.isToday?"bg-theme text-white":m.inMonth?"text-gray-700":"text-gray-300"}">${m.dayNumber}</span>
                            ${m.items.length?`<span class="text-[10px] font-black text-theme">${m.items.length}</span>`:""}
                        </div>
                        <div class="space-y-1">
                            ${m.items.slice(0,3).map(b=>`<div class="rounded-lg px-2 py-1 text-[10px] font-black ${b.status==="done"?"bg-green-50 text-green-700":b.status==="cancelled"?"bg-gray-100 text-gray-500":"bg-blue-50 text-blue-700"}">${window.escapeHtml(b.title||b.eventType||"Evento")}</div>`).join("")}
                            ${m.items.length>3?`<div class="text-[10px] font-black text-gray-400">+${m.items.length-3} item(ns)</div>`:""}
                        </div>
                    </button>`).join("")}
            </div>
        </div>
        <div class="card-modern overflow-hidden">
            <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 class="font-black text-gray-800">Próximos Eventos</h3>
                <p class="text-xs text-gray-400 font-bold mt-1">Lista dos compromissos com data definida no mês selecionado</p>
            </div>
            <div class="divide-y divide-gray-100">
                ${r.map(m=>`
                    <div class="p-4 flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <p class="font-black text-gray-800">${window.escapeHtml(m.title||"Sem título")}</p>
                                <span class="badge ${m.status==="done"?"badge-green":m.status==="cancelled"?"badge-gray":"badge-blue"}">${m.status==="done"?"Concluído":m.status==="cancelled"?"Cancelado":"Pendente"}</span>
                            </div>
                            <p class="text-xs text-gray-400 font-bold">${window.escapeHtml(m.eventType||"Evento")} · ${window.escapeHtml(m.responsible||"Sem responsável")} · ${window.escapeHtml(m.relatedName||"Sem vínculo")}</p>
                        </div>
                        <div class="md:text-right">
                            <p class="font-black text-theme">${window.formatDate(m.eventDate)}</p>
                            <div class="flex justify-end gap-1 mt-2">
                                ${m.status!=="done"?`<button onclick="window.toggleAgendaEventStatus('${m.id}', 'done')" class="text-green-600 hover:bg-green-50 p-2 rounded-lg transition"><i data-lucide="check-circle" class="w-4 h-4"></i></button>`:`<button onclick="window.toggleAgendaEventStatus('${m.id}', 'pending')" class="text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg transition"><i data-lucide="rotate-ccw" class="w-4 h-4"></i></button>`}
                                <button onclick="window.openAgendaModal('${m.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button>
                                <button onclick="window.deleteAgendaEvent('${m.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                    </div>`).join("")||'<div class="p-10 text-center text-gray-400 font-bold">Nenhum evento com data definida para este mês.</div>'}
            </div>
        </div>`},window.openAgendaModal=(t=null,e="")=>{const a=t?(i.agendaEvents||[]).find(n=>n.id===t)||{}:{};document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">${t?"Editar Evento":"Evento"}</h3>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Título</label><input id="agenda-title" class="input-modern" value="${window.escapeHtml(a.title||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo</label><select id="agenda-type" class="input-modern">${Q.map(n=>`<option ${a.eventType===n?"selected":""}>${n}</option>`).join("")}</select></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Responsável</label><input id="agenda-responsible" class="input-modern" value="${window.escapeHtml(a.responsible||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data</label><input id="agenda-date" type="date" class="input-modern" value="${window.escapeHtml(a.eventDate||e||"")}"></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Status</label><select id="agenda-status" class="input-modern">${["pending","done","cancelled"].map(n=>`<option value="${n}" ${a.status===n?"selected":""}>${n==="pending"?"Pendente":n==="done"?"Concluído":"Cancelado"}</option>`).join("")}</select></div>
                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Relacionar a</label><input id="agenda-related" class="input-modern" value="${window.escapeHtml(a.relatedName||"")}" placeholder="Cliente, lead, O.S., fornecedor..."></div>
                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Notas</label><textarea id="agenda-notes" class="input-modern h-28">${window.escapeHtml(a.notes||"")}</textarea></div>
                </div>
                <div class="mt-8 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Cancelar</button>
                    <button onclick="window.saveAgendaEvent('${t||""}')" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg">Salvar Evento</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()};const se=[{id:"art_approved",label:"Arte aprovada",stageHint:"art"},{id:"material_ready",label:"Material separado",stageHint:"prod"},{id:"production_done",label:"Producao concluida",stageHint:"prod"},{id:"quality_review",label:"Conferencia final",stageHint:"install"},{id:"delivery_done",label:"Entrega/instalacao concluida",stageHint:"install"}],V=(t={})=>{const e=Array.isArray(t.productionChecklist)?t.productionChecklist:[],n=(Array.isArray(t.items)?t.items:[]).flatMap(o=>(Array.isArray(o.catalogChecklistTemplate)?o.catalogChecklistTemplate:[]).map((d,l)=>({id:`catalog_${o.catalogId||"custom"}_${l}_${String(d||"").toLowerCase().replace(/[^a-z0-9]+/g,"_")}`,label:d,stageHint:o.catalogDefaultStages?.[0]||"prod"})));return[...se,...n].map((o,s)=>{const d=e.find(l=>l.id===o.id)||e[s]||{};return{id:o.id,label:d.label||o.label,stageHint:d.stageHint||o.stageHint,done:!!d.done,doneAt:d.doneAt||null,doneBy:d.doneBy||""}})};window.getProductionChecklist=t=>V(t),window.getProductionComments=t=>Array.isArray(t.productionComments)?t.productionComments:[],window.getProductionAttachments=t=>Array.isArray(t.productionAttachments)?t.productionAttachments:[],window.isProductionOverdue=t=>{const e=String(t.productionDueDate||t.deliveryDeadline||"");return!e||t.status==="finalized"?!1:e<new Date().toISOString().slice(0,10)},window.getProductionProgress=t=>{const e=V(t),a=e.filter(n=>n.done).length;return{done:a,total:e.length,percent:e.length?Math.round(a/e.length*100):0}},window.toggleProductionChecklist=async(t,e)=>{try{const a=i.commercialDocs.findIndex(s=>s.id===t),n=a>-1?i.commercialDocs[a]:null;if(!n)return;const o=V(n).map(s=>s.id===e?{...s,done:!s.done,doneAt:s.done?null:new Date().toISOString(),doneBy:s.done?"":i.user.email||"Utilizador"}:s);a>-1&&(i.commercialDocs[a]={...n,productionChecklist:o}),await I($(w,"artifacts",x,"public","data","commercial_docs",t),{productionChecklist:o,updatedAt:f()}),document.getElementById("prod-comment")?window.openProdModal(t):window.renderCommercial()}catch(a){window.customAlert("Erro ao atualizar checklist: "+a.message)}},window.addProductionComment=async t=>{const e=document.getElementById("prod-comment"),a=String(e.value||"").trim();if(!a)return window.customAlert("Digite um comentario interno.");try{const n=i.commercialDocs.find(s=>s.id===t);if(!n)return;const o=[...window.getProductionComments(n),{id:`${Date.now()}-${Math.random().toString(16).slice(2,8)}`,message:a,createdAt:new Date().toISOString(),author:i.user.email||"Utilizador"}];await I($(w,"artifacts",x,"public","data","commercial_docs",t),{productionComments:o,updatedAt:f()}),window.openProdModal(t)}catch(n){window.customAlert("Erro ao salvar comentario: "+n.message)}},window.removeProductionComment=async(t,e)=>{try{const a=i.commercialDocs.find(o=>o.id===t);if(!a)return;const n=window.getProductionComments(a).filter(o=>o.id!==e);await I($(w,"artifacts",x,"public","data","commercial_docs",t),{productionComments:n,updatedAt:f()}),window.openProdModal(t)}catch(a){window.customAlert("Erro ao remover comentario: "+a.message)}},window.addProductionAttachment=async t=>{const e=String(document.getElementById("prod-attachment-title").value||"").trim(),a=String(document.getElementById("prod-attachment-url").value||"").trim();if(!e||!a)return window.customAlert("Informe titulo e URL do anexo.");try{const n=i.commercialDocs.find(s=>s.id===t);if(!n)return;const o=[...window.getProductionAttachments(n),{id:`${Date.now()}-${Math.random().toString(16).slice(2,8)}`,title:e,url:a,createdAt:new Date().toISOString(),author:i.user.email||"Utilizador"}];await I($(w,"artifacts",x,"public","data","commercial_docs",t),{productionAttachments:o,updatedAt:f()}),window.openProdModal(t)}catch(n){window.customAlert("Erro ao salvar anexo: "+n.message)}},window.removeProductionAttachment=async(t,e)=>{try{const a=i.commercialDocs.find(o=>o.id===t);if(!a)return;const n=window.getProductionAttachments(a).filter(o=>o.id!==e);await I($(w,"artifacts",x,"public","data","commercial_docs",t),{productionAttachments:n,updatedAt:f()}),window.openProdModal(t)}catch(a){window.customAlert("Erro ao remover anexo: "+a.message)}},window.requestAiProductionAssistance=async(t,e="summary",a)=>{await window.withActionLock(`ai-production-${t}-${e}`,async()=>{if(!window.isGeminiEnabled()){await window.customAlert("Gemini nao configurado. Verifique o .env com GEMINI_API_KEY e VITE_GEMINI_ENABLED=true.");return}const n=i.commercialDocs.find(d=>d.id===t);if(!n){await window.customAlert("O.S. nao encontrada para analise com IA.");return}const o=a instanceof HTMLElement?a:null,s=o?o.innerHTML:"";o&&(o.disabled=!0,o.classList.add("opacity-70","cursor-not-allowed"),o.innerHTML='<span class="inline-flex items-center gap-2"><span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Analisando</span>');try{const d=window.getProductionChecklist(n),l=window.getProductionComments(n),p={objective:e==="checklist"?"Sugerir checklist operacional":"Resumir O.S. operacionalmente",os:{id:n.id||"",number:n.number||"",title:n.title||"",clientName:n.clientName||"",status:n.status||"",priority:n.priority||"Normal",assignedTo:n.assignedTo||"",osStages:n.osStages||[n.osStage].filter(Boolean),dueDate:n.productionDueDate||n.deliveryDeadline||"",observations:n.observations||"",productionNotes:n.productionNotes||"",items:Array.isArray(n.items)?n.items.slice(0,12).map(g=>({description:g.material||"",finish:g.finish||"",qty:h(g.qty,1),width:h(g.width),height:h(g.height),department:g.catalogRecommendedDepartment||""})):[],checklist:d.map(g=>({label:g.label,done:!!g.done,stageHint:g.stageHint||""})),comments:l.slice(-8).map(g=>({message:g.message||"",author:g.author||"",createdAt:g.createdAt||""}))}};if(e==="summary"){const g=await window.callGeminiJson({systemInstruction:["Voce e um coordenador de producao de comunicacao visual.","Retorne somente JSON valido.","Resuma a O.S. em linguagem operacional e objetiva.","Nao invente informacoes fora do contexto."].join(" "),prompt:JSON.stringify({...p,responseShape:{summary:"string",nextSteps:["string"],risks:["string"]}},null,2),temperature:.3,maxOutputTokens:1e3}),S=document.getElementById("prod-notes"),M=[String(g.summary||"").trim(),Array.isArray(g.nextSteps)&&g.nextSteps.length?`Proximos passos:
- ${g.nextSteps.map(O=>String(O||"").trim()).filter(Boolean).join(`
- `)}`:"",Array.isArray(g.risks)&&g.risks.length?`Pontos de atencao:
- ${g.risks.map(O=>String(O||"").trim()).filter(Boolean).join(`
- `)}`:""].filter(Boolean);if(S&&M.length){const O=S.value.trim()?`

`:"";S.value=`${S.value.trim()}${O}${M.join(`

`)}`.trim()}await window.customAlert("Resumo operacional aplicado nas notas internas da O.S.");return}const r=await window.callGeminiJson({systemInstruction:["Voce e um coordenador de producao de comunicacao visual.","Retorne somente JSON valido.","Sugira etapas objetivas e praticas para o checklist operacional.","Nao repita itens obvios que ja existam."].join(" "),prompt:JSON.stringify({...p,responseShape:{suggestedChecklist:[{label:"string",stageHint:"art|prod|install|finish"}],notes:"string"}},null,2),temperature:.35,maxOutputTokens:900}),u=Array.isArray(r.suggestedChecklist)?r.suggestedChecklist:[],c=new Set(d.map(g=>String(g.label||"").trim().toLowerCase()).filter(Boolean)),m=u.map((g,S)=>({id:`ai_${Date.now()}_${S}`,label:String(g.label||"").trim(),stageHint:String(g.stageHint||"prod").trim()||"prod",done:!1,doneAt:null,doneBy:""})).filter(g=>g.label&&!c.has(g.label.toLowerCase()));if(!m.length){await window.customAlert("A IA nao encontrou novas etapas relevantes para acrescentar ao checklist.");return}const b=[...d,...m],y=String(r.notes||"").trim()?[...l,{id:`${Date.now()}-${Math.random().toString(16).slice(2,8)}`,message:`IA checklist: ${String(r.notes||"").trim()}`,createdAt:new Date().toISOString(),author:"Gemini"}]:l;await I($(w,"artifacts",x,"public","data","commercial_docs",t),{productionChecklist:b,productionComments:y,updatedAt:f()}),await window.customAlert(`${m.length} etapa(s) sugerida(s) pela IA foram adicionadas ao checklist.`),window.openProdModal(t)}catch(d){await window.customAlert(`Erro na analise operacional com IA: ${d.message}`)}finally{o&&document.body.contains(o)&&(o.disabled=!1,o.classList.remove("opacity-70","cursor-not-allowed"),o.innerHTML=s)}},{silent:!0})},window.renderCommercial=()=>{const t=document.getElementById("view-container"),e=window.isCompactLayout?.(),a=String(i.comSearch||"").toLowerCase(),n=i.commercialDocs.filter(l=>{if(!(a?String(l.clientName||"").toLowerCase().includes(a)||String(l.title||"").toLowerCase().includes(a)||String(l.number||"").toLowerCase().includes(a):!0))return!1;const r=i.comActiveTab;return r==="quotes"?l.type==="quote":r==="os"?l.type==="os"&&l.status!=="finalized":r==="leads"||r==="agenda"?!1:l.status==="finalized"}).sort((l,p)=>(p.createdAt.seconds||0)-(l.createdAt.seconds||0));let o="";if(i.comActiveTab==="leads")o=window.renderLeadsTab();else if(i.comActiveTab==="agenda")o=window.renderAgendaTab();else if(i.comActiveTab==="os"){const l=i.settings.kanbanStages&&i.settings.kanbanStages.length>0?i.settings.kanbanStages:P;o='<div class="flex gap-6 items-start mt-4 overflow-x-auto pb-4">'+l.map(p=>{const r=n.filter(u=>(u.osStages||[u.osStage||l[0].id]).includes(p.id));return`
            <div class="kanban-col bg-gray-100 rounded-xl p-4 min-h-[500px] min-w-[300px] w-80 border-t-4 transition-colors" style="border-color: ${p.color}" ondragover="window.onDragOver(event)" ondragleave="window.onDragLeave(event)" ondrop="window.onDrop(event, '${p.id}')">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-gray-700 uppercase tracking-wider text-xs">${p.label}</h3>
                    <span class="badge rounded-full px-2 py-0.5 bg-white shadow-sm text-gray-600">${r.length}</span>
                </div>
                <div class="space-y-4">
                    ${r.map(u=>{const c=window.getProductionProgress(u),m=window.isProductionOverdue(u),b=window.getProductionComments(u).length,y=window.getProductionAttachments(u).length;return`
                        <div class="bg-white p-4 rounded-lg shadow-sm border ${m?"border-red-300 ring-1 ring-red-100":"border-gray-200"} hover:shadow-md transition group cursor-grab active:cursor-grabbing" draggable="true" ondragstart="window.onDragStart(event, '${u.id}', '${p.id}')" ondragend="window.onDragEnd(event)">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-xs font-black" style="color: ${p.color}">#${u.number}</span>
                                <span class="text-[10px] ${m?"text-red-500":"text-gray-400"} font-bold"><i data-lucide="${m?"siren":"calendar"}" class="inline w-3 h-3"></i> ${window.formatDate(u.productionDueDate||u.deliveryDeadline)}</span>
                            </div>
                            <h4 class="font-bold text-gray-800 text-sm mb-1 truncate">${u.clientName}</h4>
                            <p class="text-xs text-gray-500 line-clamp-2 mb-3">${u.title}</p>
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span class="badge ${u.priority==="Urgente"?"badge-red":u.priority==="Alta"?"badge-yellow":"badge-gray"}">${u.priority||"Normal"}</span>
                                ${u.assignedTo?`<span class="badge badge-blue">${u.assignedTo}</span>`:""}
                                ${u.artApprovalStatus?`<span class="badge ${u.artApprovalStatus==="approved"?"badge-green":u.artApprovalStatus==="rejected"?"badge-red":"badge-purple"}">Arte: ${u.artApprovalStatus==="approved"?"Aprovada":u.artApprovalStatus==="rejected"?"Reprovada":"Pendente"}</span>`:""}
                                ${m?'<span class="badge badge-red">Atrasada</span>':""}
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-400 mb-3">
                                <div class="bg-gray-50 rounded-lg px-2 py-2">Prazo Op.: <span class="text-gray-700">${window.escapeHtml(u.productionDueDate||u.deliveryDeadline||"-")}</span></div>
                                <div class="bg-gray-50 rounded-lg px-2 py-2">Resp.: <span class="text-gray-700">${window.escapeHtml(u.assignedTo||"Sem dono")}</span></div>
                            </div>
                            <div class="bg-slate-50 border border-slate-100 rounded-lg px-3 py-3 mb-3">
                                <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-500 mb-2">
                                    <span>Execucao</span>
                                    <span>${c.done}/${c.total} · ${c.percent}%</span>
                                </div>
                                <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                                    <div class="h-full rounded-full ${c.percent>=100?"bg-green-500":c.percent>=60?"bg-blue-500":"bg-amber-500"}" style="width: ${c.percent}%"></div>
                                </div>
                                <div class="flex gap-2 mt-2 text-[10px] font-bold text-slate-500">
                                    <span class="badge badge-gray">${b} comentario(s)</span>
                                    <span class="badge badge-gray">${y} anexo(s)</span>
                                </div>
                            </div>
                            ${u.productionNotes?`<p class="text-[11px] text-gray-500 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">${window.escapeHtml(u.productionNotes)}</p>`:""}
                            
                            <!-- Checklist Embutido e Botão Gerir -->
                            <div class="mt-3 pt-2 border-t border-gray-100">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-[10px] font-bold text-gray-400 uppercase">Checklist Execução</span>
                                    ${i.role!=="commercial"?`<button onclick="window.openProdModal('${u.id}')" class="text-[10px] text-theme hover:underline font-bold flex items-center"><i data-lucide="settings-2" class="w-3 h-3 mr-1"></i> Gerir O.S.</button>`:""}
                                </div>
                                <div class="space-y-1 max-h-32 overflow-y-auto pr-1">
                                    ${(u.items||[]).map((g,S)=>`
                                        <div class="flex items-start gap-2 p-1 hover:bg-gray-50 rounded transition">
                                            <input type="checkbox" ${g.done?"checked":""} onchange="window.toggleItemDone('${u.id}', ${S}, this.checked)" class="mt-0.5 rounded text-theme cursor-pointer w-3 h-3">
                                            <span class="text-xs leading-tight ${g.done?"line-through text-gray-400":"text-gray-700 font-medium"}">${g.qty}x ${g.material}</span>
                                        </div>`).join("")}
                                </div>
                            </div>

                            <div class="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                                <div class="flex gap-1 bg-gray-50 p-1 rounded">
                                    <button onclick="window.printSetup('${u.id}', 'OS Produção')" class="text-gray-400 hover:text-blue-600 p-1" title="Imprimir O.S. (Produção)"><i data-lucide="printer" class="w-4 h-4"></i></button>
                                    <button onclick="window.moveOsStageRelative('${u.id}', -1)" class="text-gray-400 hover:text-slate-700 p-1" title="Voltar setor"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                                    <button onclick="window.moveOsStageRelative('${u.id}', 1)" class="text-gray-400 hover:text-slate-700 p-1" title="Próximo setor"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                                    <button onclick="window.openProdModal('${u.id}')" class="text-gray-400 hover:text-theme p-1" title="Mover setor / gestão"><i data-lucide="move-right" class="w-4 h-4"></i></button>
                                    ${i.role!=="production"?`
                                        <button onclick="window.printSetup('${u.id}', 'OS Sem Valores')" class="text-gray-400 hover:text-purple-600 p-1" title="Imprimir S/ Valores"><i data-lucide="file-minus" class="w-4 h-4"></i></button>
                                        <button onclick="window.printSetup('${u.id}', 'Contrato')" class="text-gray-400 hover:text-green-600 p-1" title="Imprimir Contrato"><i data-lucide="file-signature" class="w-4 h-4"></i></button>
                                        <div class="w-px h-4 bg-gray-300 mx-1 mt-1"></div>
                                        <button onclick="window.openComModal('${u.id}')" class="text-gray-400 hover:text-orange-500 p-1" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button>
                                        <button onclick="window.revertToQuote('${u.id}')" class="text-gray-400 hover:text-red-500 p-1" title="Reverter O.S."><i data-lucide="rotate-ccw" class="w-4 h-4"></i></button>`:""}
                                </div>
                                <div class="flex gap-1">
                                    ${i.role!=="commercial"?`<button onclick="window.openFinalizeOSModal('${u.id}')" class="btn-gradient text-white px-2 py-1 rounded text-[10px] font-bold shadow hover:scale-105 transition">FINALIZAR</button>`:""}
                                </div>
                            </div>
                        </div>`}).join("")}
                </div>
            </div>`}).join("")+"</div>"}else{let l=n.map(r=>{const u=U(r);return`
            <tr class="hover:bg-gray-50 transition group">
                <td class="p-4 font-bold text-theme">${r.number||"..."}</td>
                <td class="p-4 text-gray-500">${window.formatDate(r.date)}</td>
                <td class="p-4 font-bold text-gray-800">${r.clientName}</td>
                <td class="p-4 text-gray-600">${r.title}</td>
                <td class="p-4 text-right font-black text-gray-800">${window.formatCurrency(r.totalValue)}</td>
                <td class="p-4 text-center">${u}</td>
                <td class="p-4 flex justify-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button onclick="window.printSetup('${r.id}', '${r.type==="quote"?"Orçamento":"OS"}')" class="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition" title="Imprimir Normal"><i data-lucide="printer" class="w-4 h-4"></i></button>
                        <button onclick="window.printSetup('${r.id}', '${r.type==="quote"?"Orçamento Sem Valores":"OS Sem Valores"}')" class="text-gray-400 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition" title="Imprimir Sem Valor"><i data-lucide="file-minus" class="w-4 h-4"></i></button>
                        ${r.status!=="draft"?`<button onclick="window.printSetup('${r.id}', 'Contrato')" class="text-gray-400 hover:text-green-600 hover:bg-green-50 p-2 rounded-lg transition" title="Imprimir Contrato"><i data-lucide="file-signature" class="w-4 h-4"></i></button>`:""}
                    </div>
                    
                    ${r.status==="draft"||r.status==="rejected"?`<button onclick="window.copyQuoteLink('${r.id}')" class="text-blue-400 hover:text-blue-600 bg-blue-50 p-2 rounded-lg transition" title="Link para Proposta"><i data-lucide="link" class="w-4 h-4"></i></button>`:""}
                    ${r.layoutImage||r.artUrls&&r.artUrls.length?`<button onclick="window.copyArtApprovalLink('${r.id}')" class="text-purple-500 hover:text-purple-700 bg-purple-50 p-2 rounded-lg transition" title="Link Aprovação de Arte"><i data-lucide="palette" class="w-4 h-4"></i></button>`:""}
                    <button onclick="window.copyClientPortalLink('${r.id}')" class="text-cyan-500 hover:text-cyan-700 bg-cyan-50 p-2 rounded-lg transition" title="Portal do Cliente"><i data-lucide="globe" class="w-4 h-4"></i></button>
                    ${r.status!=="finalized"?`<button onclick="window.openComModal('${r.id}')" class="text-gray-400 hover:text-orange-500 bg-gray-50 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button>`:""}
                    ${r.status!=="finalized"?`<button onclick="window.delCom('${r.id}')" class="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>`:""}
                    ${r.status==="draft"||r.status==="client_approved"?`<button onclick="window.openApproveModal('${r.id}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow ml-2 transition">${r.status==="client_approved"?"GERAR O.S.":"APROVAR"}</button>`:""}
                    ${r.status==="finalized"?`<button onclick="window.viewOsDetails('${r.id}')" class="bg-gray-800 text-white px-3 py-1 rounded-lg text-xs font-bold shadow ml-2 flex items-center hover:bg-gray-700 transition"><i data-lucide="pie-chart" class="w-3 h-3 mr-1"></i> DETALHES</button>`:""}
                </td>
            </tr>`}).join("");const p=n.map(r=>{const u=U(r);return`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">${r.type==="quote"?"Orçamento":"O.S."} #${window.escapeHtml(r.number||"...")}</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(r.clientName||"Cliente não informado")}</h3>
                        <p class="mobile-record-subtitle">${window.escapeHtml(r.title||"Projeto sem título")}</p>
                    </div>
                    ${ae(r)}
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta">
                        <p class="mobile-record-meta-label">Data</p>
                        <p class="mobile-record-meta-value">${window.formatDate(r.date)}</p>
                    </div>
                    <div class="mobile-record-meta">
                        <p class="mobile-record-meta-label">Valor</p>
                        <p class="mobile-record-meta-value">${window.formatCurrency(r.totalValue)}</p>
                    </div>
                </div>
                <div class="mobile-record-footer">
                    <div class="mobile-record-status">${u}</div>
                </div>
            </div>`}).join("");o=`
        ${e?`
        <div class="mobile-list-stack">
            ${p||'<div class="card-modern p-6 text-center text-gray-400">Nenhum documento encontrado.</div>'}
        </div>`:`
        <div class="card-modern overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm min-w-[800px]">
                    <thead class="bg-gray-50 font-bold text-gray-400 text-xs uppercase border-b">
                        <tr>
                            <th class="p-4">Nº</th>
                            <th class="p-4">Data</th>
                            <th class="p-4">Cliente</th>
                            <th class="p-4">Projeto</th>
                            <th class="p-4 text-right">Valor</th>
                            <th class="p-4 text-center">Status</th>
                            <th class="p-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${l||'<tr><td colspan="7" class="p-6 text-center text-gray-400">Nenhum documento encontrado.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>`}`}const d=!String(i.currentView||"").startsWith("commercial_")&&!["leads","agenda"].includes(i.comActiveTab);t.innerHTML=`
        ${window.renderSectionHero(te(n))}
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            ${d?`
            <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto">
                ${i.role!=="production"?`<button onclick="window.setComTab('quotes')" class="${window.getUiTabClass(i.comActiveTab==="quotes")}">Orçamentos</button>`:""}
                <button onclick="window.setComTab('os')" class="${window.getUiTabClass(i.comActiveTab==="os")}">Quadro Kanban O.S.</button>
                ${i.role!=="production"?`<button onclick="window.setComTab('finalized')" class="${window.getUiTabClass(i.comActiveTab==="finalized")}">Finalizados</button>`:""}
            </div>`:'<div class="w-full md:w-auto"></div>'}
            <div class="flex w-full md:w-auto flex-col md:flex-row gap-2">
                <div class="flex w-full md:w-auto gap-2 justify-end">
                    <button onclick="window.toggleCommercialExpanded()" class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-black text-sm hover:border-theme/30 hover:text-theme transition whitespace-nowrap">${i.commercialExpanded?"Recolher filtros":"Ver filtros e acoes"}</button>
                    ${i.role!=="production"?'<button onclick="window.openComModal()" class="btn-gradient px-4 py-2 rounded-lg font-bold text-white shadow flex items-center shrink-0 hover:scale-105 transition whitespace-nowrap"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo</button>':""}
                </div>
                ${i.commercialExpanded?`
                <div class="relative flex-1 md:w-72">
                    <i data-lucide="search" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400"></i>
                    <input oninput="window.setComSearch(this.value)" placeholder="Buscar..." class="input-modern pl-10 w-full" value="${i.comSearch}">
                </div>`:""}
            </div>
        </div>
        ${o}`,window.lucide&&lucide.createIcons()};const re=window.renderCommercial;window.renderCommercial=()=>{re();const t=document.querySelector("#view-container > .flex.flex-col.md\\:flex-row.justify-between.items-center.mb-6.gap-4");if(!t)return;const e=t.querySelector(".flex.w-full.md\\:w-auto.gap-2");if(e&&i.role!=="production"){const a=e.querySelector("button.btn-gradient");if(a){const n=i.comActiveTab==="leads"?"Novo Lead":i.comActiveTab==="agenda"?"Novo Evento":"Novo";a.innerHTML=`<i data-lucide="plus" class="w-4 h-4 mr-2"></i> ${n}`,a.onclick=()=>i.comActiveTab==="leads"?window.openLeadModal():i.comActiveTab==="agenda"?window.openAgendaModal():window.openComModal()}}window.lucide&&lucide.createIcons()},window.renderProductivityView=()=>{i.comActiveTab="os",i.currentView="commercial_os",window.renderCommercial()},window.openProdModal=t=>{const e=i.commercialDocs.find(o=>o.id===t);if(!e)return;const a=i.settings.kanbanStages||P,n=e.osStages||[e.osStage||a[0].id];document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-bold text-gray-800">Gestão de Produção #${e.number}</h2>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="space-y-4">
                    <h4 class="text-xs font-bold text-theme uppercase mb-1">Setores Simultâneos (O.S. Clonada)</h4>
                    <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                        ${a.map(o=>`
                            <label class="flex items-center gap-3 cursor-pointer p-1 hover:bg-white rounded transition">
                                <input type="checkbox" value="${o.id}" class="prod-stage-cb rounded text-theme w-4 h-4 focus:ring-theme" ${n.includes(o.id)?"checked":""}>
                                <span class="text-sm font-bold text-gray-700">${o.label}</span>
                            </label>`).join("")}
                    </div>
                    <p class="text-[10px] text-gray-400 font-bold mb-6">* Marcar múltiplas caixas fará a O.S. aparecer em várias colunas do Kanban ao mesmo tempo.</p>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                    <button onclick="window.saveProdModal('${t}')" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Etapas</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.saveProdModal=async t=>{const e=document.querySelectorAll(".prod-stage-cb:checked"),a=Array.from(e).map(n=>n.value);if(a.length===0)return window.customAlert("A O.S. tem de estar em algum lado! Seleciona pelo menos um setor.");try{await I($(w,"artifacts",x,"public","data","commercial_docs",t),{osStages:a,updatedAt:f()}),document.getElementById("modal-container").innerHTML=""}catch(n){window.customAlert("Erro ao salvar: "+n.message)}},window.openProdModal=t=>{const e=i.commercialDocs.find(o=>o.id===t);if(!e)return;const a=i.settings.kanbanStages||P,n=e.osStages||[e.osStage||a[0].id];document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl m-4">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">Gestao de Producao #${e.number}</h2>
                        <p class="text-xs text-gray-500 uppercase font-bold">${window.escapeHtml(e.clientName||"")} · ${window.escapeHtml(e.title||"")}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="space-y-5">
                    <div>
                        <h4 class="text-xs font-bold text-theme uppercase mb-2">Setores Simultaneos</h4>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                            ${a.map(o=>`
                                <label class="flex items-center gap-3 cursor-pointer p-1 hover:bg-white rounded transition">
                                    <input type="checkbox" value="${o.id}" class="prod-stage-cb rounded text-theme w-4 h-4 focus:ring-theme" ${n.includes(o.id)?"checked":""}>
                                    <span class="text-sm font-bold text-gray-700">${o.label}</span>
                                </label>`).join("")}
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Responsavel</label>
                            <input id="prod-assigned" class="input-modern" value="${window.escapeHtml(e.assignedTo||"")}" placeholder="Quem responde pela O.S.">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Prioridade</label>
                            <select id="prod-priority" class="input-modern">
                                <option ${!e.priority||e.priority==="Normal"?"selected":""}>Normal</option>
                                <option ${e.priority==="Alta"?"selected":""}>Alta</option>
                                <option ${e.priority==="Urgente"?"selected":""}>Urgente</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Prazo operacional</label>
                            <input id="prod-due" class="input-modern" value="${window.escapeHtml(e.productionDueDate||e.deliveryDeadline||"")}" placeholder="Ex: 2026-04-20 ou 2 dias">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <p class="text-xs font-bold text-gray-500 uppercase mb-2">Status da arte</p>
                            <span class="badge ${e.artApprovalStatus==="approved"?"badge-green":e.artApprovalStatus==="rejected"?"badge-red":"badge-purple"}">${e.artApprovalStatus==="approved"?"Aprovada":e.artApprovalStatus==="rejected"?"Reprovada":"Pendente"}</span>
                            <div class="mt-3 flex flex-wrap gap-2">
                                <button onclick="window.copyArtApprovalLink('${t}')" class="text-xs font-black bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">Copiar link de arte</button>
                                <button onclick="window.copyClientPortalLink('${t}')" class="text-xs font-black bg-cyan-50 text-cyan-700 px-3 py-2 rounded-lg">Copiar portal</button>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Notas internas</label>
                            <textarea id="prod-notes" class="input-modern h-28" placeholder="Pendencias, instrucoes, restricoes e observacoes...">${window.escapeHtml(e.productionNotes||"")}</textarea>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                    <button onclick="window.saveProdModal('${t}')" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Gestao</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.saveProdModal=async t=>{const e=document.querySelectorAll(".prod-stage-cb:checked"),a=Array.from(e).map(n=>n.value);if(a.length===0)return window.customAlert("A O.S. tem de estar em algum lado! Seleciona pelo menos um setor.");try{await I($(w,"artifacts",x,"public","data","commercial_docs",t),{osStages:a,assignedTo:document.getElementById("prod-assigned").value||"",priority:document.getElementById("prod-priority").value||"Normal",productionDueDate:document.getElementById("prod-due").value||"",productionNotes:document.getElementById("prod-notes").value||"",updatedAt:f()}),document.getElementById("modal-container").innerHTML=""}catch(n){window.customAlert("Erro ao salvar: "+n.message)}},window.openProdModal=t=>{const e=i.commercialDocs.find(c=>c.id===t);if(!e)return;const a=i.settings.kanbanStages||P,n=e.osStages||[e.osStage||a[0].id],o=window.getProductionChecklist(e),s=window.getProductionComments(e),d=window.getProductionAttachments(e),l=e.costCenter||{},p=window.getProductionProgress(e),r=window.isProductionOverdue(e),u=[...new Set([...(i.profiles||[]).filter(c=>c.active!==!1).map(c=>c.name||c.email),...(i.sellers||[]).map(c=>c.name)].filter(Boolean))];document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-5xl m-4 max-h-[92vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">Gestao de Producao #${e.number}</h2>
                        <p class="text-xs text-gray-500 uppercase font-bold">${window.escapeHtml(e.clientName||"")} · ${window.escapeHtml(e.title||"")}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div class="xl:col-span-2 space-y-5">
                        <div>
                            <h4 class="text-xs font-bold text-theme uppercase mb-2">Setores Simultaneos</h4>
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                                ${a.map(c=>`
                                    <label class="flex items-center gap-3 cursor-pointer p-1 hover:bg-white rounded transition">
                                        <input type="checkbox" value="${c.id}" class="prod-stage-cb rounded text-theme w-4 h-4 focus:ring-theme" ${n.includes(c.id)?"checked":""}>
                                        <span class="text-sm font-bold text-gray-700">${c.label}</span>
                                    </label>`).join("")}
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Responsavel</label>
                                <input id="prod-assigned" list="prod-assigned-options" class="input-modern" value="${window.escapeHtml(e.assignedTo||"")}" placeholder="Quem responde pela O.S.">
                                <datalist id="prod-assigned-options">
                                    ${u.map(c=>`<option value="${window.escapeHtml(c)}"></option>`).join("")}
                                </datalist>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Prioridade</label>
                                <select id="prod-priority" class="input-modern">
                                    <option ${!e.priority||e.priority==="Normal"?"selected":""}>Normal</option>
                                    <option ${e.priority==="Alta"?"selected":""}>Alta</option>
                                    <option ${e.priority==="Urgente"?"selected":""}>Urgente</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Prazo operacional</label>
                                <input id="prod-due" type="date" class="input-modern" value="${window.escapeHtml(e.productionDueDate||e.deliveryDeadline||"")}">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <div>
                                        <p class="text-xs font-bold text-gray-500 uppercase">Status da arte</p>
                                        <span class="badge ${e.artApprovalStatus==="approved"?"badge-green":e.artApprovalStatus==="rejected"?"badge-red":"badge-purple"} mt-2 inline-flex">${e.artApprovalStatus==="approved"?"Aprovada":e.artApprovalStatus==="rejected"?"Reprovada":"Pendente"}</span>
                                    </div>
                                    ${r?'<span class="badge badge-red">Atrasada</span>':'<span class="badge badge-blue">No prazo</span>'}
                                </div>
                                <div class="mt-3 flex flex-wrap gap-2">
                                    <button onclick="window.copyArtApprovalLink('${t}')" class="text-xs font-black bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">Copiar link de arte</button>
                                    <button onclick="window.copyClientPortalLink('${t}')" class="text-xs font-black bg-cyan-50 text-cyan-700 px-3 py-2 rounded-lg">Copiar portal</button>
                                </div>
                            </div>
                            <div>
                                <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
                                    <label class="text-xs font-bold text-gray-500 uppercase block">Notas internas</label>
                                    <div class="flex flex-wrap gap-2">
                                        <button type="button" onclick="window.requestAiProductionAssistance('${t}', 'summary', this)" class="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-black text-violet-700 transition hover:bg-violet-100">
                                            <i data-lucide="sparkles" class="inline w-3.5 h-3.5 mr-1"></i>IA resumir
                                        </button>
                                        <button type="button" onclick="window.openInternalAiChat('production', { docId: '${t}' })" class="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-[11px] font-black text-cyan-700 transition hover:bg-cyan-100">
                                            <i data-lucide="message-circle-more" class="inline w-3.5 h-3.5 mr-1"></i>Chat IA
                                        </button>
                                    </div>
                                </div>
                                <textarea id="prod-notes" class="input-modern h-28" placeholder="Pendencias, instrucoes, restricoes e observacoes...">${window.escapeHtml(e.productionNotes||"")}</textarea>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="card-modern p-4 border border-gray-100">
                                <div class="flex justify-between items-center mb-3">
                                    <div>
                                        <p class="text-xs font-bold text-gray-500 uppercase">Checklist operacional</p>
                                        <p class="text-xs text-gray-400 font-bold mt-1">${p.done}/${p.total} concluido(s)</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button type="button" onclick="window.requestAiProductionAssistance('${t}', 'checklist', this)" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-black text-emerald-700 transition hover:bg-emerald-100">
                                            <i data-lucide="list-checks" class="inline w-3.5 h-3.5 mr-1"></i>IA checklist
                                        </button>
                                        <span class="badge ${p.percent===100?"badge-green":"badge-yellow"}">${p.percent}%</span>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    ${o.map(c=>`
                                        <button type="button" onclick="window.toggleProductionChecklist('${t}', '${c.id}')" class="w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl border ${c.done?"border-green-200 bg-green-50":"border-gray-200 bg-white"}">
                                            <span class="text-sm font-bold ${c.done?"text-green-700 line-through":"text-gray-700"}">${window.escapeHtml(c.label)}</span>
                                            <span class="badge ${c.done?"badge-green":"badge-gray"}">${c.done?"Feito":"Pendente"}</span>
                                        </button>`).join("")}
                                </div>
                            </div>
                            <div class="card-modern p-4 border border-gray-100">
                                <p class="text-xs font-bold text-gray-500 uppercase mb-3">Comentarios internos</p>
                                <div class="flex gap-2 mb-3">
                                    <textarea id="prod-comment" class="input-modern h-20 flex-1" placeholder="Registrar andamento, bloqueios ou alinhamentos..."></textarea>
                                    <button onclick="window.addProductionComment('${t}')" class="btn-gradient px-4 rounded-xl text-white font-black text-xs">Adicionar</button>
                                </div>
                                <div class="space-y-2 max-h-56 overflow-y-auto">
                                    ${s.map(c=>`
                                        <div class="rounded-xl border border-gray-100 bg-gray-50 p-3">
                                            <div class="flex justify-between items-start gap-3">
                                                <div>
                                                    <p class="text-sm font-bold text-gray-700">${window.escapeHtml(c.message)}</p>
                                                    <p class="text-[10px] text-gray-400 font-bold mt-1">${window.escapeHtml(c.author||"Utilizador")} · ${window.formatDate(c.createdAt)}</p>
                                                </div>
                                                <button onclick="window.removeProductionComment('${t}', '${c.id}')" class="text-red-400 hover:text-red-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                            </div>
                                        </div>`).join("")||'<div class="text-xs text-gray-400 font-bold text-center py-6">Nenhum comentario interno.</div>'}
                                </div>
                            </div>
                        </div>
                        <div class="card-modern p-4 border border-gray-100">
                            <p class="text-xs font-bold text-gray-500 uppercase mb-3">Anexos operacionais</p>
                            <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 mb-3">
                                <input id="prod-attachment-title" class="input-modern" placeholder="Titulo do anexo">
                                <input id="prod-attachment-url" class="input-modern" placeholder="https://...">
                                <button onclick="window.addProductionAttachment('${t}')" class="btn-gradient px-4 rounded-xl text-white font-black text-xs">Adicionar</button>
                            </div>
                            <div class="space-y-2">
                                ${d.map(c=>`
                                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                                        <div>
                                            <p class="text-sm font-bold text-gray-700">${window.escapeHtml(c.title)}</p>
                                            <a href="${window.escapeHtml(c.url)}" target="_blank" rel="noreferrer" class="text-xs text-theme font-bold break-all">${window.escapeHtml(c.url)}</a>
                                        </div>
                                        <button onclick="window.removeProductionAttachment('${t}', '${c.id}')" class="text-red-400 hover:text-red-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>`).join("")||'<div class="text-xs text-gray-400 font-bold text-center py-6">Nenhum anexo operacional.</div>'}
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="card-modern p-4 border border-gray-100">
                            <p class="text-xs font-bold text-gray-500 uppercase mb-3">Centro de custos</p>
                            <div class="space-y-3">
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Categoria do projeto</label>
                                    <input id="prod-cost-category" class="input-modern" value="${window.escapeHtml(l.category||"")}" placeholder="Ex: Fachada / Impressao / Instalacao">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de servico</label>
                                    <input id="prod-service-type" class="input-modern" value="${window.escapeHtml(l.serviceType||"")}" placeholder="Ex: Letreiro / Banner / Envelopamento">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Mao de obra estimada</label>
                                    <input id="prod-labor-cost" type="number" class="input-modern" value="${window.toNumber(l.laborCost)}">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Terceiros</label>
                                    <input id="prod-outsource-cost" type="number" class="input-modern" value="${window.toNumber(l.outsourceCost)}">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Overhead operacional</label>
                                    <input id="prod-overhead-cost" type="number" class="input-modern" value="${window.toNumber(l.overheadCost)}">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacoes gerenciais</label>
                                    <textarea id="prod-cost-notes" class="input-modern h-24" placeholder="Criticidade, riscos e aprendizado do projeto...">${window.escapeHtml(l.notes||"")}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                    <button onclick="window.saveProdModal('${t}')" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Gestao</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.saveProdModal=async t=>{const e=document.querySelectorAll(".prod-stage-cb:checked"),a=Array.from(e).map(n=>n.value);if(a.length===0)return window.customAlert("A O.S. tem de estar em algum lado! Seleciona pelo menos um setor.");try{const n=i.commercialDocs.find(o=>o.id===t);await I($(w,"artifacts",x,"public","data","commercial_docs",t),{osStages:a,osStage:a[0]||null,assignedTo:document.getElementById("prod-assigned").value||"",priority:document.getElementById("prod-priority").value||"Normal",productionDueDate:document.getElementById("prod-due").value||"",productionNotes:document.getElementById("prod-notes").value||"",costCenter:{category:document.getElementById("prod-cost-category").value||"",serviceType:document.getElementById("prod-service-type").value||"",laborCost:window.toNumber(document.getElementById("prod-labor-cost").value),outsourceCost:window.toNumber(document.getElementById("prod-outsource-cost").value),overheadCost:window.toNumber(document.getElementById("prod-overhead-cost").value),notes:document.getElementById("prod-cost-notes").value||""},updatedAt:f()}),document.getElementById("modal-container").innerHTML=""}catch(n){window.customAlert("Erro ao salvar: "+n.message)}},window.openApproveModal=t=>{const e=i.commercialDocs.find(n=>n.id===t);if(!e)return;const a=new Date().toISOString().split("T")[0];document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md m-4">
                <div class="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">Aprovar Orçamento</h3>
                        <p class="text-xs text-gray-500 uppercase">${e.clientName} | ${window.formatCurrency(e.totalValue)}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="space-y-4">
                    <div class="bg-blue-50 border border-blue-100 p-4 rounded-lg text-xs text-blue-800 mb-4"> Esta ação transformará o Orçamento em O.S. e gerará os lançamentos no Financeiro. Como o cliente vai pagar
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Número de Parcelas</label>
                        <input id="appr-parcels" type="number" min="1" max="12" value="1" class="input-modern">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data de Vencimento (1ª Parcela)</label>
                        <input id="appr-date" type="date" value="${a}" class="input-modern">
                    </div>
                </div>
                <div class="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Cancelar</button>
                    <button onclick="window.confirmApproveCom('${t}')" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition">Confirmar e Gerar</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.confirmApproveCom=async t=>{const e=parseInt(document.getElementById("appr-parcels").value)||1;let a=document.getElementById("appr-date").value;if(!a)return window.customAlert("Selecione a data da primeira parcela.");try{const n=i.commercialDocs.find(r=>r.id===t),o=n?.costCenter||{};if(!n)throw new Error("Documento não encontrado.");const s=await window.getNextSequentialNum("OS"),d=i.settings.kanbanStages&&i.settings.kanbanStages.length>0?i.settings.kanbanStages[0].id:"art";await I($(w,"artifacts",x,"public","data","commercial_docs",t),{status:"approved",type:"os",number:s,osStages:[d],priority:n.priority||"Normal",assignedTo:n.assignedTo||"",productionDueDate:n.productionDueDate||n.deliveryDeadline||"",productionNotes:n.productionNotes||"",artApprovalStatus:n.artApprovalStatus||(n.layoutImage||n.artUrls&&n.artUrls.length?"pending":""),updatedAt:f()});const l=n.totalValue/e;let p=new Date(a+"T12:00:00Z");for(let r=1;r<=e;r++){const u=p.toISOString().split("T")[0];await T(E(w,"artifacts",x,"public","data","financial"),{type:"income",description:`Receita O.S. ${s} - ${n.clientName} (Parcela ${r}/${e})`,category:"Vendas",amount:l,dueDate:u,status:"pending",linkedCommercialDocId:t,projectNumber:s,clientName:n.clientName||"",sellerName:n.sellerName||"",serviceType:o.serviceType||"",costCenterCategory:o.category||"Receita Comercial",companyId:i.companyId,createdAt:f()}),p.setMonth(p.getMonth()+1)}document.getElementById("modal-container").innerHTML="",window.customAlert(`Fantástico!
O.S. ${s} gerada com sucesso e ${e} parcela(s) enviadas para o Financeiro.`),window.logAudit("APROVAR_ORCAMENTO",`Orçamento #${n.number} virou O.S. #${s}`),window.setComTab("os")}catch(n){console.error(n),window.customAlert("Erro ao processar: "+n.message)}},window.openFinalizeOSModal=t=>{const e=i.commercialDocs.find(a=>a.id===t);e&&(i.editingDoc=e,i.osFinalizeItems=[],window.renderOsFinalizeModal())},window.renderOsFinalizeModal=()=>{const t=i.editingDoc;let e=0,a=0;i.osFinalizeItems.forEach(l=>{l.type==="mat"?e+=l.total:a+=l.total});const n=e+a,o=(t.totalValue||0)-n,s=t.totalValue>0?(o/t.totalValue*100).toFixed(1):0,d=o>=0?"text-green-600":"text-red-600";document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4 flex flex-col">
                <div class="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">Finalizar O.S. ${t.number}</h2>
                        <p class="text-xs text-gray-500 uppercase font-bold">${t.title} | ${t.clientName}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                </div>
                <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="md:col-span-2 space-y-6">
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                <h4 class="font-bold text-gray-700 text-sm"><i data-lucide="package" class="inline w-4 h-4 mr-1 text-theme"></i> Materiais Consumidos</h4>
                                <button onclick="window.addOsCost('mat')" class="text-xs font-bold text-theme hover:underline">+ Puxar do Estoque</button>
                            </div>
                            <div class="space-y-2">
                                ${i.osFinalizeItems.filter(l=>l.type==="mat").map((l,p)=>`
                                    <div class="flex gap-2 items-center bg-white p-2 rounded shadow-sm border transition">
                                        <select onchange="window.updateOsCost(${p}, 'invId', this.value)" class="input-modern h-8 flex-1 text-xs">
                                            <option value="">Selecione...</option>
                                            ${i.inventory.map(r=>`<option value="${r.id}" >${r.name} (R$ ${r.costPrice}/${r.unit})</option>`).join("")}
                                        </select>
                                        <input type="number" placeholder="Qtd" value="${l.qty}" oninput="window.updateOsCost(${p}, 'qty', this.value)" class="input-modern h-8 w-20 text-xs text-center">
                                        <div class="w-24 text-right font-bold text-xs text-gray-700">${window.formatCurrency(l.total)}</div>
                                        <button onclick="window.removeOsCost(${p})" class="text-red-400 hover:text-red-600 ml-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>`).join("")||'<p class="text-xs text-gray-400 text-center py-2">Nenhum material registrado.</p>'}
                            </div>
                        </div>
                        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
                            <div class="flex justify-between items-center mb-4 border-b border-red-200 pb-2">
                                <h4 class="font-bold text-red-700 text-sm"><i data-lucide="alert-circle" class="inline w-4 h-4 mr-1"></i> Custos Extras / Imprevistos</h4>
                                <div>
                                    <button onclick="window.addStandardKit()" class="text-[10px] font-bold bg-white text-gray-700 border border-gray-300 px-2 py-1 rounded shadow-sm mr-2 hover:bg-gray-100 transition">Kit Padrão</button>
                                    <button onclick="window.addOsCost('extra')" class="text-xs font-bold text-red-600 hover:underline">+ Adicionar</button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                ${i.osFinalizeItems.filter(l=>l.type==="extra").map((l,p)=>{const r=i.osFinalizeItems.indexOf(l);return`
                                    <div class="flex gap-2 items-center bg-white p-2 rounded shadow-sm border border-red-100 transition">
                                        <input type="text" placeholder="Descrição" value="${l.desc}" oninput="window.updateOsCost(${r}, 'desc', this.value)" class="input-modern h-8 flex-1 text-xs">
                                        <input type="number" placeholder="Valor" value="${l.total}" oninput="window.updateOsCost(${r}, 'total', this.value)" class="input-modern h-8 w-24 text-xs text-right text-red-600 font-bold">
                                        <button onclick="window.removeOsCost(${r})" class="text-red-400 hover:text-red-600 ml-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>`}).join("")||'<p class="text-xs text-red-400 text-center py-2">Nenhum custo extra.</p>'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800 rounded-2xl p-6 text-white flex flex-col justify-between h-full shadow-inner">
                        <div>
                            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">Balanço do Projeto</h4>
                            <div class="flex justify-between items-center mb-2"><span class="text-sm text-gray-300">Receita Total:</span><span class="font-bold text-green-400">${window.formatCurrency(t.totalValue)}</span></div>
                            <div class="flex justify-between items-center mb-2"><span class="text-sm text-gray-300">Custo Materiais:</span><span class="font-bold text-red-400">- ${window.formatCurrency(e)}</span></div>
                            <div class="flex justify-between items-center mb-4"><span class="text-sm text-gray-300">Custos Extras:</span><span class="font-bold text-red-400">- ${window.formatCurrency(a)}</span></div>
                        </div>
                        <div class="border-t border-gray-700 pt-4 mt-4">
                            <p class="text-xs text-gray-400 uppercase font-bold text-center mb-1">Lucro Líquido</p>
                            <div class="text-3xl font-black text-center ${d} mb-1">${window.formatCurrency(o)}</div>
                            <div class="text-center text-xs font-bold ${d}">${s}% de margem</div>
                        </div>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-6 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                    <button onclick="window.confirmFinalizeOS()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg flex items-center hover:scale-105 transition"><i data-lucide="check-circle" class="w-4 h-4 mr-2"></i> Encerrar O.S.</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.addOsCost=t=>{t==="mat"?i.osFinalizeItems.push({type:"mat",invId:"",name:"",qty:1,unitCost:0,total:0}):i.osFinalizeItems.push({type:"extra",desc:"",total:0}),window.renderOsFinalizeModal()},window.addStandardKit=()=>{i.osFinalizeItems.push({type:"extra",desc:"Kit Fixação (Parafusos, Buchas, Fita, Cola)",total:45}),window.renderOsFinalizeModal()},window.removeOsCost=t=>{i.osFinalizeItems.splice(t,1),window.renderOsFinalizeModal()},window.updateOsCost=(t,e,a)=>{let n=i.osFinalizeItems[t];if(e==="invId"){const o=i.inventory.find(s=>s.id===a);n.invId=a,o&&(n.name=o.name,n.unitCost=o.costPrice||0,n.total=n.qty*n.unitCost)}else e==="qty"?(n.qty=parseFloat(a)||0,n.total=n.qty*n.unitCost):e==="total"?n.total=parseFloat(a)||0:n[e]=a;window.renderOsFinalizeModal()},window.confirmFinalizeOS=async()=>{if(!await window.customConfirm(`Atenção: esta ação vai baixar o estoque, fechar o balanço e lançar despesas de comissão.
Queres prosseguir`))return;const t=document.querySelector("#modal-container .btn-gradient");t&&(t.innerHTML="Processando a mágica...",t.disabled=!0);const e=i.editingDoc;let a=0,n=0;i.osFinalizeItems.forEach(l=>{l.type==="mat"?a+=l.total:n+=l.total});const o=a+n,s=(e.totalValue||0)-o,d=new Date().toISOString().split("T")[0];try{for(let r of i.osFinalizeItems)if(r.type==="mat"&&r.invId&&r.qty>0){const u=i.inventory.find(c=>c.id===r.invId);if(u){const c=u.quantity-r.qty;await I($(w,"artifacts",x,"public","data","inventory",r.invId),{quantity:c}),await T(E(w,"artifacts",x,"public","data","inventory_movements"),{itemId:r.invId,type:"out",quantity:r.qty,reason:`Uso O.S. ${e.number}`,date:f(),user:i.user.email||"Utilizador",companyId:i.companyId})}}o>0&&await T(E(w,"artifacts",x,"public","data","financial"),{type:"expense",description:`Custo Produção O.S. ${e.number} - ${e.clientName}`,category:"Custo Produção",amount:o,dueDate:d,status:"paid",companyId:i.companyId,createdAt:f()});let l=null;const p=i.sellers.find(r=>r.name===e.sellerName);if(p&&p.commissionRate>0&&e.totalValue>0){const r=e.totalValue*(p.commissionRate/100);l={sellerName:p.name,rate:p.commissionRate,amount:r,dueDate:d,status:"pending"},await T(E(w,"artifacts",x,"public","data","financial"),{type:"expense",description:`Comissão Venda O.S. ${e.number} - ${p.name}`,category:"Comissões",amount:r,dueDate:d,status:"pending",companyId:i.companyId,createdAt:f()})}await I($(w,"artifacts",x,"public","data","commercial_docs",e.id),{status:"finalized",finalCosts:i.osFinalizeItems,totalCost:o,netProfit:s,commissionSummary:l,closedAt:f()}),document.getElementById("modal-container").innerHTML="",window.customAlert(`O.S. ${e.number} Encerrada e enviada para os livros!
Lucro registrado: ${window.formatCurrency(s)}`),window.logAudit("FINALIZAR_OS",`O.S. ${e.number} encerrada. Lucro: R$ ${s}`),window.setComTab("finalized")}catch(l){console.error(l),window.customAlert("Erro fatal ao encerrar O.S.: "+l.message),t&&(t.innerHTML="Tentar Novamente",t.disabled=!1)}},window.viewOsDetails=t=>{const e=i.commercialDocs.find(o=>o.id===t);if(!e)return;e.costCenter;const a=(e.netProfit||0)>=0?"text-green-600":"text-red-600",n=e.totalValue>0?((e.netProfit||0)/e.totalValue*100).toFixed(1):0;document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl m-4 overflow-hidden">
                <div class="p-6 bg-gray-800 text-white flex justify-between items-start">
                    <div>
                        <h3 class="text-xl font-bold">Relatório de Encerramento</h3>
                        <p class="text-gray-400 text-sm">O.S. ${e.number} | ${e.clientName}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-white transition"><i data-lucide="x"></i></button>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p class="text-xs font-bold text-gray-400 uppercase">Receita</p>
                            <p class="text-xl font-black text-gray-800">${window.formatCurrency(e.totalValue)}</p>
                        </div>
                        <div class="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                            <p class="text-xs font-bold text-red-400 uppercase">Custo Total</p>
                            <p class="text-xl font-black text-red-600">${window.formatCurrency(e.totalCost||0)}</p>
                        </div>
                    </div>
                    
                    <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Detalhamento de Custos</h4>
                    <div class="max-h-48 overflow-y-auto mb-6 bg-gray-50 rounded-lg p-2 border border-gray-100">
                        ${(e.finalCosts||[]).map(o=>`
                            <div class="flex justify-between items-center py-2 px-2 border-b border-gray-200 last:border-0 transition">
                                <div>
                                    <p class="text-sm font-bold text-gray-700">${o.type==="mat"?o.name:o.desc}</p>
                                    <p class="text-xs text-gray-500">${o.type==="mat"?`${o.qty} un x ${window.formatCurrency(o.unitCost)} (Estoque)`:"Custo Extra/Imprevisto"}</p>
                                </div>
                                <div class="font-bold text-red-500">${window.formatCurrency(o.total)}</div>
                            </div>`).join("")||'<p class="text-sm text-center text-gray-400 py-4">Nenhum custo detalhado registrado.</p>'}
                    </div>

                    ${e.commissionSummary?`
                        <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Comissão Automática</h4>
                        <div class="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div><p class="text-[10px] uppercase font-black text-blue-400">Vendedor</p><p class="font-black text-gray-800">${window.escapeHtml(e.commissionSummary.sellerName||"-")}</p></div>
                                <div><p class="text-[10px] uppercase font-black text-blue-400">Status</p><p class="font-black text-gray-800">${window.escapeHtml(e.commissionSummary.status||"pending")}</p></div>
                                <div><p class="text-[10px] uppercase font-black text-blue-400">Taxa</p><p class="font-black text-gray-800">${window.toNumber(e.commissionSummary.rate)}%</p></div>
                                <div><p class="text-[10px] uppercase font-black text-blue-400">Valor</p><p class="font-black text-blue-700">${window.formatCurrency(e.commissionSummary.amount)}</p></div>
                            </div>
                        </div>`:""}

                    <div class="border-t-2 border-gray-200 pt-4 flex justify-between items-end">
                        <div><p class="text-sm font-bold text-gray-500 uppercase">Resultado Final (Lucro)</p></div>
                        <div class="text-right">
                            <p class="text-3xl font-black ${a}">${window.formatCurrency(e.netProfit||0)}</p>
                            <p class="text-sm font-bold ${a}">${n}% de margem sobre a venda</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.openFinalizeOSModal=t=>{const e=i.commercialDocs.find(n=>n.id===t);if(!e)return;const a=e.costCenter||{};i.editingDoc=e,i.osFinalizeItems=Array.isArray(e.finalCosts)?[...e.finalCosts]:[],i.osFinalizeMeta={category:a.category||"",serviceType:a.serviceType||"",laborCost:window.toNumber(a.laborCost),outsourceCost:window.toNumber(a.outsourceCost),overheadCost:window.toNumber(a.overheadCost),notes:a.notes||""},window.renderOsFinalizeModal()},window.updateOsFinalizeMeta=(t,e)=>{i.osFinalizeMeta||(i.osFinalizeMeta={}),i.osFinalizeMeta[t]=["laborCost","outsourceCost","overheadCost"].includes(t)?parseFloat(e)||0:e,window.renderOsFinalizeModal()},window.renderOsFinalizeModal=()=>{const t=i.editingDoc;if(!t)return;const e=i.osFinalizeMeta||{};let a=0,n=0;i.osFinalizeItems.forEach(c=>{c.type==="mat"?a+=c.total:n+=c.total});const o=window.toNumber(e.laborCost),s=window.toNumber(e.outsourceCost),d=window.toNumber(e.overheadCost),l=a+n+o+s+d,p=(t.totalValue||0)-l,r=t.totalValue>0?(p/t.totalValue*100).toFixed(1):0,u=p>=0?"text-green-600":"text-red-600";document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto m-4 flex flex-col">
                <div class="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">Finalizar O.S. ${t.number}</h2>
                        <p class="text-xs text-gray-500 uppercase font-bold">${t.title} | ${t.clientName}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                </div>
                <div class="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div class="xl:col-span-2 space-y-6">
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                <h4 class="font-bold text-gray-700 text-sm"><i data-lucide="package" class="inline w-4 h-4 mr-1 text-theme"></i> Materiais Consumidos</h4>
                                <button onclick="window.addOsCost('mat')" class="text-xs font-bold text-theme hover:underline">+ Puxar do Estoque</button>
                            </div>
                            <div class="space-y-2">
                                ${i.osFinalizeItems.filter(c=>c.type==="mat").map((c,m)=>`
                                    <div class="flex gap-2 items-center bg-white p-2 rounded shadow-sm border transition">
                                        <select onchange="window.updateOsCost(${m}, 'invId', this.value)" class="input-modern h-8 flex-1 text-xs">
                                            <option value="">Selecione...</option>
                                            ${i.inventory.map(b=>`<option value="${b.id}" >${b.name} (R$ ${b.costPrice}/${b.unit})</option>`).join("")}
                                        </select>
                                        <input type="number" placeholder="Qtd" value="${c.qty}" oninput="window.updateOsCost(${m}, 'qty', this.value)" class="input-modern h-8 w-20 text-xs text-center">
                                        <div class="w-24 text-right font-bold text-xs text-gray-700">${window.formatCurrency(c.total)}</div>
                                        <button onclick="window.removeOsCost(${m})" class="text-red-400 hover:text-red-600 ml-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>`).join("")||'<p class="text-xs text-gray-400 text-center py-2">Nenhum material registrado.</p>'}
                            </div>
                        </div>
                        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
                            <div class="flex justify-between items-center mb-4 border-b border-red-200 pb-2">
                                <h4 class="font-bold text-red-700 text-sm"><i data-lucide="alert-circle" class="inline w-4 h-4 mr-1"></i> Custos Extras / Imprevistos</h4>
                                <div>
                                    <button onclick="window.addStandardKit()" class="text-[10px] font-bold bg-white text-gray-700 border border-gray-300 px-2 py-1 rounded shadow-sm mr-2 hover:bg-gray-100 transition">Kit Padrao</button>
                                    <button onclick="window.addOsCost('extra')" class="text-xs font-bold text-red-600 hover:underline">+ Adicionar</button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                ${i.osFinalizeItems.filter(c=>c.type==="extra").map(c=>{const m=i.osFinalizeItems.indexOf(c);return`
                                    <div class="flex gap-2 items-center bg-white p-2 rounded shadow-sm border border-red-100 transition">
                                        <input type="text" placeholder="Descricao" value="${c.desc}" oninput="window.updateOsCost(${m}, 'desc', this.value)" class="input-modern h-8 flex-1 text-xs">
                                        <input type="number" placeholder="Valor" value="${c.total}" oninput="window.updateOsCost(${m}, 'total', this.value)" class="input-modern h-8 w-24 text-xs text-right text-red-600 font-bold">
                                        <button onclick="window.removeOsCost(${m})" class="text-red-400 hover:text-red-600 ml-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>`}).join("")||'<p class="text-xs text-red-400 text-center py-2">Nenhum custo extra.</p>'}
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="card-modern p-5 bg-slate-950 text-white">
                            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Centro de custos</h4>
                            <div class="space-y-3">
                                <div>
                                    <label class="text-xs font-bold text-slate-400 uppercase mb-1 block">Categoria</label>
                                    <input class="input-modern bg-white text-gray-800" value="${window.escapeHtml(e.category||"")}" oninput="window.updateOsFinalizeMeta('category', this.value)" placeholder="Ex: Fachada / Impressao">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-slate-400 uppercase mb-1 block">Tipo de servico</label>
                                    <input class="input-modern bg-white text-gray-800" value="${window.escapeHtml(e.serviceType||"")}" oninput="window.updateOsFinalizeMeta('serviceType', this.value)" placeholder="Ex: Letreiro / Banner">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-slate-400 uppercase mb-1 block">Mao de obra</label>
                                    <input type="number" class="input-modern bg-white text-gray-800" value="${o}" oninput="window.updateOsFinalizeMeta('laborCost', this.value)">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-slate-400 uppercase mb-1 block">Terceiros</label>
                                    <input type="number" class="input-modern bg-white text-gray-800" value="${s}" oninput="window.updateOsFinalizeMeta('outsourceCost', this.value)">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-slate-400 uppercase mb-1 block">Overhead</label>
                                    <input type="number" class="input-modern bg-white text-gray-800" value="${d}" oninput="window.updateOsFinalizeMeta('overheadCost', this.value)">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-slate-400 uppercase mb-1 block">Observacoes</label>
                                    <textarea class="input-modern bg-white text-gray-800 h-24" oninput="window.updateOsFinalizeMeta('notes', this.value)" placeholder="Riscos, aprendizados e contexto do projeto...">${window.escapeHtml(e.notes||"")}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-800 rounded-2xl p-6 text-white shadow-inner">
                            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">Balanco do Projeto</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between items-center"><span class="text-gray-300">Receita Total</span><span class="font-bold text-green-400">${window.formatCurrency(t.totalValue)}</span></div>
                                <div class="flex justify-between items-center"><span class="text-gray-300">Materiais</span><span class="font-bold text-red-400">- ${window.formatCurrency(a)}</span></div>
                                <div class="flex justify-between items-center"><span class="text-gray-300">Extras</span><span class="font-bold text-red-400">- ${window.formatCurrency(n)}</span></div>
                                <div class="flex justify-between items-center"><span class="text-gray-300">Mao de obra</span><span class="font-bold text-red-400">- ${window.formatCurrency(o)}</span></div>
                                <div class="flex justify-between items-center"><span class="text-gray-300">Terceiros</span><span class="font-bold text-red-400">- ${window.formatCurrency(s)}</span></div>
                                <div class="flex justify-between items-center"><span class="text-gray-300">Overhead</span><span class="font-bold text-red-400">- ${window.formatCurrency(d)}</span></div>
                            </div>
                            <div class="border-t border-gray-700 pt-4 mt-4">
                                <p class="text-xs text-gray-400 uppercase font-bold text-center mb-1">Lucro Liquido</p>
                                <div class="text-3xl font-black text-center ${u} mb-1">${window.formatCurrency(p)}</div>
                                <div class="text-center text-xs font-bold ${u}">${r}% de margem</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-6 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                    <button onclick="window.confirmFinalizeOS()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg flex items-center hover:scale-105 transition"><i data-lucide="check-circle" class="w-4 h-4 mr-2"></i> Encerrar O.S.</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.confirmFinalizeOS=async()=>{if(!await window.customConfirm("Atencao: esta acao vai baixar estoque, fechar o balanco e lancar custos no financeiro. Queres prosseguir"))return;const t=document.querySelector("#modal-container .btn-gradient");t&&(t.innerHTML="Processando...",t.disabled=!0);const e=i.editingDoc,a=i.osFinalizeMeta||{};let n=0,o=0;i.osFinalizeItems.forEach(c=>{c.type==="mat"?n+=c.total:o+=c.total});const s=window.toNumber(a.laborCost),d=window.toNumber(a.outsourceCost),l=window.toNumber(a.overheadCost),p=n+o+s+d+l,r=(e.totalValue||0)-p,u=new Date().toISOString().split("T")[0];try{for(const y of i.osFinalizeItems)if(y.type==="mat"&&y.invId&&y.qty>0){const g=i.inventory.find(S=>S.id===y.invId);if(g){const S=g.quantity-y.qty;await I($(w,"artifacts",x,"public","data","inventory",y.invId),{quantity:S}),await T(E(w,"artifacts",x,"public","data","inventory_movements"),{itemId:y.invId,type:"out",quantity:y.qty,reason:`Uso O.S. ${e.number}`,date:f(),user:i.user.email||"Utilizador",companyId:i.companyId})}}const c=[{amount:n,category:"Materiais O.S.",description:`Materiais O.S. ${e.number} - ${e.clientName}`},{amount:o,category:"Imprevistos Producao",description:`Extras O.S. ${e.number} - ${e.clientName}`},{amount:s,category:"Mao de Obra",description:`Mao de obra O.S. ${e.number} - ${e.clientName}`},{amount:d,category:"Terceiros",description:`Terceiros O.S. ${e.number} - ${e.clientName}`},{amount:l,category:"Overhead Operacional",description:`Overhead O.S. ${e.number} - ${e.clientName}`}].filter(y=>y.amount>0);for(const y of c)await T(E(w,"artifacts",x,"public","data","financial"),{type:"expense",description:y.description,category:y.category,amount:y.amount,dueDate:u,status:"paid",linkedCommercialDocId:e.id,projectNumber:e.number,clientName:e.clientName||"",sellerName:e.sellerName||"",serviceType:a.serviceType||"",costCenterCategory:a.category||"Operacional",companyId:i.companyId,createdAt:f()});let m=null;const b=i.sellers.find(y=>y.name===e.sellerName);if(b&&b.commissionRate>0&&e.totalValue>0){const y=e.totalValue*(b.commissionRate/100);m={sellerName:b.name,rate:b.commissionRate,amount:y,dueDate:u,status:"pending"},await T(E(w,"artifacts",x,"public","data","financial"),{type:"expense",description:`Comissao Venda O.S. ${e.number} - ${b.name}`,category:"Comissoes",amount:y,dueDate:u,status:"pending",linkedCommercialDocId:e.id,projectNumber:e.number,clientName:e.clientName||"",sellerName:b.name,serviceType:a.serviceType||"",costCenterCategory:a.category||"Comercial",companyId:i.companyId,createdAt:f()})}await I($(w,"artifacts",x,"public","data","commercial_docs",e.id),{status:"finalized",finalCosts:i.osFinalizeItems,totalCost:p,netProfit:r,commissionSummary:m,costCenter:{category:a.category||"",serviceType:a.serviceType||"",laborCost:s,outsourceCost:d,overheadCost:l,notes:a.notes||""},closedBy:i.user.email||"Utilizador",closedAt:f()}),document.getElementById("modal-container").innerHTML="",window.customAlert(`O.S. ${e.number} encerrada com sucesso.
Lucro registrado: ${window.formatCurrency(r)}`),window.logAudit("FINALIZAR_OS",`O.S. ${e.number} encerrada. Lucro: R$ ${r}`),window.setComTab("finalized")}catch(c){console.error(c),window.customAlert("Erro fatal ao encerrar O.S.: "+c.message),t&&(t.innerHTML="Tentar novamente",t.disabled=!1)}},window.viewOsDetails=t=>{const e=i.commercialDocs.find(l=>l.id===t);if(!e)return;const a=(e.netProfit||0)>=0?"text-green-600":"text-red-600",n=e.totalValue>0?((e.netProfit||0)/e.totalValue*100).toFixed(1):0,o=window.getProductionChecklist(e),s=window.getProductionComments(e),d=window.getProductionAttachments(e);document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl m-4 overflow-hidden">
                <div class="p-6 bg-gray-800 text-white flex justify-between items-start">
                    <div>
                        <h3 class="text-xl font-bold">Relatorio de Encerramento</h3>
                        <p class="text-gray-400 text-sm">O.S. ${e.number} | ${e.clientName}</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-white transition"><i data-lucide="x"></i></button>
                </div>
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p class="text-xs font-bold text-gray-400 uppercase">Receita</p>
                            <p class="text-xl font-black text-gray-800">${window.formatCurrency(e.totalValue)}</p>
                        </div>
                        <div class="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                            <p class="text-xs font-bold text-red-400 uppercase">Custo Total</p>
                            <p class="text-xl font-black text-red-600">${window.formatCurrency(e.totalCost||0)}</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                            <p class="text-xs font-bold text-green-500 uppercase">Lucro</p>
                            <p class="text-xl font-black ${a}">${window.formatCurrency(e.netProfit||0)}</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                            <p class="text-xs font-bold text-blue-400 uppercase">Margem</p>
                            <p class="text-xl font-black text-blue-700">${n}%</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Detalhamento de Custos</h4>
                            <div class="max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-2 border border-gray-100">
                                ${(e.finalCosts||[]).map(l=>`
                                    <div class="flex justify-between items-center py-2 px-2 border-b border-gray-200 last:border-0 transition">
                                        <div>
                                            <p class="text-sm font-bold text-gray-700">${l.type==="mat"?l.name:l.desc}</p>
                                            <p class="text-xs text-gray-500">${l.type==="mat"?`${l.qty} un x ${window.formatCurrency(l.unitCost)} (Estoque)`:"Custo Extra/Imprevisto"}</p>
                                        </div>
                                        <div class="font-bold text-red-500">${window.formatCurrency(l.total)}</div>
                                    </div>`).join("")||'<p class="text-sm text-center text-gray-400 py-4">Nenhum custo detalhado registrado.</p>'}
                            </div>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Centro de Custos</h4>
                            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3 text-sm">
                                <div class="flex justify-between gap-4"><span class="text-gray-500 font-bold">Categoria</span><span class="font-black text-gray-800">${window.escapeHtml(costCenter.category||"-")}</span></div>
                                <div class="flex justify-between gap-4"><span class="text-gray-500 font-bold">Servico</span><span class="font-black text-gray-800">${window.escapeHtml(costCenter.serviceType||"-")}</span></div>
                                <div class="flex justify-between gap-4"><span class="text-gray-500 font-bold">Mao de obra</span><span class="font-black text-gray-800">${window.formatCurrency(costCenter.laborCost||0)}</span></div>
                                <div class="flex justify-between gap-4"><span class="text-gray-500 font-bold">Terceiros</span><span class="font-black text-gray-800">${window.formatCurrency(costCenter.outsourceCost||0)}</span></div>
                                <div class="flex justify-between gap-4"><span class="text-gray-500 font-bold">Overhead</span><span class="font-black text-gray-800">${window.formatCurrency(costCenter.overheadCost||0)}</span></div>
                                <div class="pt-2 border-t border-slate-200">
                                    <p class="text-xs font-bold text-gray-500 uppercase mb-1">Observacoes</p>
                                    <p class="text-sm text-gray-700">${window.escapeHtml(costCenter.notes||"Sem observacoes gerenciais.")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    ${e.commissionSummary?`
                        <div>
                            <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Comissao Automatica</h4>
                            <div class="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div><p class="text-[10px] uppercase font-black text-blue-400">Vendedor</p><p class="font-black text-gray-800">${window.escapeHtml(e.commissionSummary.sellerName||"-")}</p></div>
                                    <div><p class="text-[10px] uppercase font-black text-blue-400">Status</p><p class="font-black text-gray-800">${window.escapeHtml(e.commissionSummary.status||"pending")}</p></div>
                                    <div><p class="text-[10px] uppercase font-black text-blue-400">Taxa</p><p class="font-black text-gray-800">${window.toNumber(e.commissionSummary.rate)}%</p></div>
                                    <div><p class="text-[10px] uppercase font-black text-blue-400">Valor</p><p class="font-black text-blue-700">${window.formatCurrency(e.commissionSummary.amount)}</p></div>
                                </div>
                            </div>
                        </div>`:""}

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Checklist Final</h4>
                            <div class="space-y-2">
                                ${o.map(l=>`<div class="flex justify-between items-center rounded-lg border px-3 py-2 ${l.done?"border-green-200 bg-green-50":"border-gray-200 bg-gray-50"}"><span class="text-sm font-bold ${l.done?"text-green-700":"text-gray-700"}">${window.escapeHtml(l.label)}</span><span class="badge ${l.done?"badge-green":"badge-gray"}">${l.done?"Feito":"Pendente"}</span></div>`).join("")}
                            </div>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Comentarios</h4>
                            <div class="space-y-2 max-h-48 overflow-y-auto">
                                ${s.map(l=>`<div class="rounded-lg border border-gray-100 bg-gray-50 p-3"><p class="text-sm font-bold text-gray-700">${window.escapeHtml(l.message)}</p><p class="text-[10px] text-gray-400 font-bold mt-1">${window.escapeHtml(l.author||"Utilizador")}</p></div>`).join("")||'<p class="text-sm text-gray-400">Sem comentarios.</p>'}
                            </div>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-3">Anexos</h4>
                            <div class="space-y-2 max-h-48 overflow-y-auto">
                                ${d.map(l=>`<a href="${window.escapeHtml(l.url)}" target="_blank" rel="noreferrer" class="block rounded-lg border border-gray-100 bg-gray-50 p-3"><p class="text-sm font-bold text-gray-700">${window.escapeHtml(l.title)}</p><p class="text-[10px] text-theme font-bold mt-1 break-all">${window.escapeHtml(l.url)}</p></a>`).join("")||'<p class="text-sm text-gray-400">Sem anexos.</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()};const D=()=>Array.isArray(i.settings.serviceCatalog)?i.settings.serviceCatalog:[],J=(t="")=>D().map(e=>`<option value="${window.escapeHtml(e.id)}" ${e.id===t?"selected":""}>${window.escapeHtml(e.name||"Modelo sem nome")}</option>`).join(""),_=(t,e={})=>k({...e,catalogId:t.id||"",catalogName:t.name||"",serviceCategory:t.category||"",catalogServiceType:t.serviceType||"",catalogTags:t.tags||"",catalogDescription:t.description||"",catalogNote:t.note||"",catalogLeadTimeDays:window.toNumber(t.leadTimeDays),catalogComplexity:t.complexity||"standard",catalogUnitLabel:t.unitLabel||"m²",catalogRecommendedDepartment:t.recommendedDepartment||"",catalogChecklistTemplate:Array.isArray(t.checklistTemplate)?t.checklistTemplate:[],catalogDefaultStages:Array.isArray(t.defaultStages)?t.defaultStages:[],catalogOperationalNotes:t.operationalNotes||"",material:t.name||e.material||"",finish:t.finish||"",width:window.toNumber(t.width),height:window.toNumber(t.height),qty:window.toNumber(t.qty,1),waste:window.toNumber(t.waste),pricingMode:t.defaultPricingMode||"smart",priceM2:window.toNumber(t.priceM2),materialCost:window.toNumber(t.materialCost),laborCost:window.toNumber(t.laborCost),setupCost:window.toNumber(t.setupCost),outsourcingCost:window.toNumber(t.outsourcingCost),deliveryCost:window.toNumber(t.deliveryCost),extraCost:window.toNumber(t.extraCost),taxRate:window.toNumber(t.taxRate,8),commissionRate:window.toNumber(t.commissionRate,5),overheadRate:window.toNumber(t.overheadRate,12),targetMargin:window.toNumber(t.targetMargin,35),minPrice:window.toNumber(t.minPrice)});window.addCatalogItemFromPicker=()=>{const t=document.getElementById("com-catalog-preset").value||"";if(!t)return window.customAlert("Selecione um modelo do catálogo.");const e=D().find(a=>a.id===t);if(!e)return window.customAlert("Modelo não encontrado no catálogo.");i.formItems.push(_(e)),window.renderComItems()},window.applyCatalogToItem=(t,e)=>{if(!e)return;const a=D().find(n=>n.id===e);a&&(i.formItems[t]=_(a,i.formItems[t]),window.renderComItems())};const le=(t={})=>{const e=D(),a=String(t.catalogMatchId||"").trim(),n=String(t.catalogMatchName||"").trim().toLowerCase();return e.find(o=>o.id===a)||e.find(o=>String(o.name||"").trim().toLowerCase()===n)||null},v=(t,e=0)=>{const a=Number(t);return Number.isFinite(a)?a:e};window.requestAiPricingForItem=async(t,e)=>{await window.withActionLock(`ai-price-item-${t}`,async()=>{if(!window.isGeminiEnabled()){await window.customAlert("Gemini não configurado. Verifique o .env com GEMINI_API_KEY e VITE_GEMINI_ENABLED=true.");return}const a=k(i.formItems[t]||{});if(!String(a.material||"").trim()){await window.customAlert("Informe ao menos a descrição do item para a IA analisar.");return}const n=e instanceof HTMLElement?e:null,o=n?n.innerHTML:"";n&&(n.disabled=!0,n.classList.add("opacity-70","cursor-not-allowed"),n.innerHTML='<span class="inline-flex items-center gap-2"><span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Analisando</span>');try{const s=D().slice(0,40).map(c=>({id:c.id||"",name:c.name||"",category:c.category||"",serviceType:c.serviceType||"",pricingMode:c.defaultPricingMode||"smart",materialCost:v(c.materialCost),laborCost:v(c.laborCost),setupCost:v(c.setupCost),minPrice:v(c.minPrice),targetMargin:v(c.targetMargin,35),recommendedDepartment:c.recommendedDepartment||""})),d=await window.callGeminiJson({systemInstruction:["Você é um analista comercial brasileiro de comunicação visual, impressão, fachadas, adesivos, banners, placas, instalação e produção gráfica.","Retorne somente JSON válido.","Sugira um preço comercial em BRL com base na descrição, medidas, quantidade, complexidade e catálogo fornecido.","Se houver catálogo compatível, tente indicar catalogMatchId e catalogMatchName.","Prefira valores conservadores e utilizáveis em operação real."].join(" "),prompt:JSON.stringify({objective:"Analisar item comercial e sugerir preço utilizável no orçamento.",companyName:i.settings?.companyName||"FlowSystem",item:{description:a.material||"",finish:a.finish||"",width:v(a.width),height:v(a.height),qty:v(a.qty,1),waste:v(a.waste),pricingMode:a.pricingMode||"smart",currentPriceM2:v(a.priceM2),currentMaterialCost:v(a.materialCost),currentLaborCost:v(a.laborCost),currentSetupCost:v(a.setupCost),currentOutsourcingCost:v(a.outsourcingCost),currentDeliveryCost:v(a.deliveryCost),currentExtraCost:v(a.extraCost),currentTargetMargin:v(a.targetMargin,35),currentMinPrice:v(a.minPrice)},availableCatalog:s,responseShape:{normalizedDescription:"string",catalogMatchId:"string",catalogMatchName:"string",category:"string",finish:"string",complexity:"low|standard|high",recommendedDepartment:"string",leadTimeDays:"number",pricingMode:"smart|manual",wastePercent:"number",suggestedUnitPrice:"number",suggestedTotal:"number",minSuggestedTotal:"number",idealSuggestedTotal:"number",premiumSuggestedTotal:"number",materialCost:"number",laborCost:"number",setupCost:"number",outsourcingCost:"number",deliveryCost:"number",extraCost:"number",taxRate:"number",commissionRate:"number",overheadRate:"number",targetMargin:"number",minPrice:"number",reasoning:"string"}},null,2),temperature:.25,maxOutputTokens:1200}),l=le(d),p=l?_(l,i.formItems[t]):k(i.formItems[t]),r=d.pricingMode==="manual"?"manual":"smart",u=k({...p,material:d.normalizedDescription||p.material,finish:d.finish||p.finish,serviceCategory:d.category||p.serviceCategory,pricingMode:r,waste:v(d.wastePercent,p.waste),materialCost:v(d.materialCost,p.materialCost),laborCost:v(d.laborCost,p.laborCost),setupCost:v(d.setupCost,p.setupCost),outsourcingCost:v(d.outsourcingCost,p.outsourcingCost),deliveryCost:v(d.deliveryCost,p.deliveryCost),extraCost:v(d.extraCost,p.extraCost),taxRate:v(d.taxRate,p.taxRate),commissionRate:v(d.commissionRate,p.commissionRate),overheadRate:v(d.overheadRate,p.overheadRate),targetMargin:v(d.targetMargin,p.targetMargin),minPrice:v(d.minPrice,p.minPrice),priceM2:r==="manual"?v(d.suggestedUnitPrice,p.priceM2||p.val):p.priceM2,aiSuggestedUnitPrice:v(d.suggestedUnitPrice),aiSuggestedTotal:v(d.suggestedTotal),aiSuggestedMinTotal:v(d.minSuggestedTotal),aiSuggestedIdealTotal:v(d.idealSuggestedTotal||d.suggestedTotal),aiSuggestedPremiumTotal:v(d.premiumSuggestedTotal),aiReasoning:String(d.reasoning||"").trim(),aiCategory:String(d.category||"").trim(),aiComplexity:String(d.complexity||"").trim(),aiLeadTimeDays:v(d.leadTimeDays),aiRecommendedDepartment:String(d.recommendedDepartment||"").trim(),aiSuggestedAt:new Date().toISOString()});i.formItems[t]=u,window.renderComItems(),await window.customAlert("Sugestão da IA aplicada ao item. Revise o preço sugerido e os custos antes de fechar o orçamento.")}catch(s){await window.customAlert(`Erro na análise com IA: ${s.message}`)}finally{n&&document.body.contains(n)&&(n.disabled=!1,n.classList.remove("opacity-70","cursor-not-allowed"),n.innerHTML=o)}},{silent:!0})},window.requestAiCommercialCopy=async t=>{await window.withActionLock("ai-commercial-copy",async()=>{if(!window.isGeminiEnabled()){await window.customAlert("Gemini não configurado. Verifique o .env com GEMINI_API_KEY e VITE_GEMINI_ENABLED=true.");return}const e=t instanceof HTMLElement?t:null,a=e?e.innerHTML:"";e&&(e.disabled=!0,e.classList.add("opacity-70","cursor-not-allowed"),e.innerHTML='<span class="inline-flex items-center gap-2"><span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Gerando</span>');try{const n=(i.formItems||[]).map(p=>{const r=k(p);return{description:r.material||"",finish:r.finish||"",width:h(r.width),height:h(r.height),qty:h(r.qty,1),pricingMode:r.pricingMode||"manual",calculatedTotal:R(r),aiSuggestedTotal:h(r.aiSuggestedTotal)}}).filter(p=>p.description);if(!n.length){await window.customAlert("Adicione ao menos um item ao orçamento antes de pedir texto para a IA.");return}const o=await window.callGeminiJson({systemInstruction:["Você é um assistente comercial brasileiro especializado em comunicação visual.","Retorne somente JSON válido.","Crie texto comercial claro, direto e profissional para um orçamento.","Não invente dados fora do contexto recebido."].join(" "),prompt:JSON.stringify({objective:"Gerar texto comercial para orçamento.",currentDocument:{title:C("c-title"),clientName:C("c-client"),paymentMethod:C("c-pay"),deliveryDeadline:C("c-deadline"),deliveryType:C("c-deltype")},items:n,responseShape:{suggestedTitle:"string",observations:"string",publicTerms:"string",clientMessage:"string"}},null,2),temperature:.45,maxOutputTokens:900}),s=document.getElementById("c-title"),d=document.getElementById("c-obs"),l=document.getElementById("c-public-terms");s&&o.suggestedTitle&&(s.value=String(o.suggestedTitle).trim()),d&&o.observations&&(d.value=String(o.observations).trim()),l&&o.publicTerms&&(l.value=String(o.publicTerms).trim()),o.clientMessage?await window.customAlert(`Texto sugerido para o cliente:

${String(o.clientMessage).trim()}`):await window.customAlert("Texto comercial gerado com IA e aplicado ao orçamento.")}catch(n){await window.customAlert(`Erro ao gerar texto com IA: ${n.message}`)}finally{e&&document.body.contains(e)&&(e.disabled=!1,e.classList.remove("opacity-70","cursor-not-allowed"),e.innerHTML=a)}},{silent:!0})},window.requestAiClientReply=async t=>{await window.withActionLock("ai-client-reply",async()=>{if(!window.isGeminiEnabled()){await window.customAlert("Gemini nao configurado. Verifique o .env com GEMINI_API_KEY e VITE_GEMINI_ENABLED=true.");return}const e=t instanceof HTMLElement?t:null,a=e?e.innerHTML:"";e&&(e.disabled=!0,e.classList.add("opacity-70","cursor-not-allowed"),e.innerHTML='<span class="inline-flex items-center gap-2"><span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Gerando</span>');try{const n=(i.formItems||[]).map(l=>{const p=k(l);return{description:p.material||"",qty:h(p.qty,1),total:R(p)}}).filter(l=>l.description);if(!n.length){await window.customAlert("Adicione ao menos um item antes de pedir uma resposta para o cliente.");return}const o=await window.callGeminiJson({systemInstruction:["Voce e um vendedor brasileiro de comunicacao visual.","Retorne somente JSON valido.","Escreva mensagem curta, objetiva e profissional para enviar ao cliente.","Nao invente prazos, materiais ou descontos nao informados."].join(" "),prompt:JSON.stringify({objective:"Gerar mensagem pronta para o cliente sobre o orcamento atual.",document:{title:C("c-title"),clientName:C("c-client"),deliveryDeadline:C("c-deadline"),paymentMethod:C("c-pay"),totalValue:window.toNumber(document.getElementById("c-total-final")?.dataset?.amount||0),observations:C("c-obs")},items:n,responseShape:{whatsappMessage:"string",emailSummary:"string",followUpSuggestion:"string"}},null,2),temperature:.45,maxOutputTokens:1e3}),s=String(o.whatsappMessage||o.emailSummary||"").trim();if(!s){await window.customAlert("A IA nao retornou uma mensagem utilizavel para o cliente.");return}navigator.clipboard?.writeText&&await navigator.clipboard.writeText(s).catch(()=>{});const d=String(o.followUpSuggestion||"").trim();await window.customAlert(`Mensagem pronta para o cliente:

${s}${d?`

Sugestao de follow-up:
${d}`:""}

A mensagem foi copiada quando permitido pelo navegador.`)}catch(n){await window.customAlert(`Erro ao gerar resposta para o cliente: ${n.message}`)}finally{e&&document.body.contains(e)&&(e.disabled=!1,e.classList.remove("opacity-70","cursor-not-allowed"),e.innerHTML=a)}},{silent:!0})},window.openComModal=async(t=null)=>{try{typeof t!="string"&&(t=null);let e={title:"",date:new Date().toISOString().split("T")[0],clientName:"",sellerName:"",deliveryDeadline:"",quoteValidUntil:"",paymentMethod:"",publicTerms:"Ao aprovar esta proposta, declaro estar de acordo com os valores, prazos, escopo e condições comerciais apresentadas.",deliveryType:"Instalado",installAddress:"",items:[],observations:"",discount:0,discountType:"%",status:"draft",type:i.comActiveTab==="os"?"os":"quote",layoutImage:null,artUrls:[],scaffold:"Não",installHeight:0,power:"Sim",timeRestriction:"Livre",osStage:"art"};if(t){const d=i.commercialDocs.find(l=>l.id===t);d&&(e={...e,...d})}i.editingDoc=e,i.formItems=[...e.items||[]].map(k),i.formArtUrls=[...e.artUrls||[]],e.artUrl&&i.formArtUrls.length===0&&i.formArtUrls.push({title:"Arte Principal",url:e.artUrl});const a=i.clients.map(d=>`<option ${d.name===e.clientName?"selected":""}>${d.name}</option>`).join(""),n=i.sellers.map(d=>`<option ${d.name===e.sellerName?"selected":""}>${d.name}</option>`).join(""),o=D(),s=J();document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4">
                    <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <h2 class="text-xl font-bold text-gray-800 flex items-center">
                            <i data-lucide="file-text" class="mr-2 text-theme"></i> ${t?`Editar ${e.type==="quote"?"Orçamento":"O.S."}`:e.type==="quote"?"Orçamento":"O.S."}
                        </h2>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="p-8 space-y-8">
                        <!-- Section 1 -->
                        <div>
                            <h4 class="text-xs font-bold text-theme uppercase tracking-wider mb-4 border-b pb-2">Informações do Projeto</h4>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div class="md:col-span-2">
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Título</label>
                                    <input id="c-title" value="${e.title}" class="input-modern" placeholder="Ex: Fachada Loja Centro">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data</label>
                                    <input id="c-date" type="date" value="${e.date}" class="input-modern">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Prazo Entrega</label>
                                    <input id="c-deadline" value="${e.deliveryDeadline}" class="input-modern" placeholder="Ex: 5 dias">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Validade da Proposta</label>
                                    <input id="c-valid" type="date" value="${e.quoteValidUntil||""}" class="input-modern">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Cliente</label>
                                    <select id="c-client" class="input-modern">
                                        <option value="">Selecione...</option>
                                        ${a}
                                    </select>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Vendedor</label>
                                    <select id="c-seller" class="input-modern">
                                        <option value="">Selecione...</option>
                                        ${n}
                                    </select>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Pagamento</label>
                                    <input id="c-pay" value="${e.paymentMethod}" class="input-modern" placeholder="Ex: 50% Entrada">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo Entrega</label>
                                    <select id="c-deltype" class="input-modern">
                                        <option ${e.deliveryType==="Instalado"?"selected":""}>Instalado</option>
                                        <option ${e.deliveryType==="Retirada"?"selected":""}>Retirada</option>
                                        <option ${e.deliveryType==="Entrega"?"selected":""}>Entrega</option>
                                    </select>
                                </div>
                                <div class="md:col-span-4">
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Endereço de Instalação</label>
                                    <input id="c-addr" value="${e.installAddress}" class="input-modern" placeholder="Endereço completo da obra">
                                </div>
                                
                                <!-- Múltiplos Links -->
                                <div class="md:col-span-4 mt-2">
                                    <div class="flex justify-between items-center mb-1">
                                        <label class="text-xs font-bold text-gray-500 uppercase block">Links da Nuvem (Artes, Fotos Local)</label> 
                                        <button onclick="window.addArtLink()" class="text-[10px] font-bold text-theme hover:underline transition">+ Adicionar Link</button>
                                    </div>
                                    <div id="art-links-container" class="space-y-2 mb-2"></div>
                                </div>
                            </div>

                            <!-- Checklist de Instalação -->
                            <h4 class="text-xs font-bold text-theme uppercase tracking-wider mb-4 border-b pb-2 mt-8">Checklist Técnico de Instalação</h4>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Precisa Andaime</label>
                                    <select id="c-scaffold" class="input-modern">
                                        <option value="Não">Não</option>
                                        <option value="Sim" ${e.scaffold==="Sim"?"selected":""}>Sim</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Altura (Metros)</label>
                                    <input id="c-height" type="number" value="${e.installHeight||0}" class="input-modern">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Ponto de Energia</label>
                                    <select id="c-power" class="input-modern">
                                        <option value="Sim">Sim, disponível</option>
                                        <option value="Não" ${e.power==="Não"?"selected":""}>Não/Precisa Gerador</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Restrição Horário</label>
                                    <input id="c-time" value="${e.timeRestriction||"Livre"}" class="input-modern" placeholder="Ex: Só após 22h">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Items -->
                        <div>
                            <div class="flex justify-between items-center mb-4 border-b pb-2">
                                <h4 class="text-xs font-bold text-theme uppercase tracking-wider">Itens do Pedido (Calculadora Avançada)</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${o.length?`<select id="com-catalog-preset" class="input-modern text-xs min-w-[220px]"><option value="">Adicionar do catálogo...</option>${s}</select><button onclick="window.addCatalogItemFromPicker()" class="text-xs font-black text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-2 rounded-lg transition">+ Do Catálogo</button>`:""}
                                    <button onclick="window.addComItem('smart')" class="text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg transition">+ Item Inteligente</button>
                                    <button onclick="window.addComItem('manual')" class="text-xs font-black text-theme bg-white border border-theme/20 hover:bg-gray-50 px-3 py-2 rounded-lg transition">+ Item Manual</button>
                                </div>
                            </div>
                            ${o.length?`<div class="mb-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600 font-bold">Catálogo ativo com ${o.length} modelo(s). Use os modelos para iniciar itens com fórmulas e parâmetros padronizados.</div>`:'<div class="mb-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 font-bold">Catálogo vazio. Cadastre modelos em Configurações / Admin para acelerar os orçamentos.</div>'}
                            <div id="com-items-list" class="space-y-3"></div>
                        </div>

                        <!-- Layout/Image Section -->
                        <div>
                            <h4 class="text-xs font-bold text-theme uppercase tracking-wider mb-4 border-b pb-2">Layout / Croqui</h4>
                            <div class="border-2 border-dashed border-gray-200 p-6 rounded-xl text-center hover:border-theme transition bg-gray-50">
                                <div id="c-layout-preview" class="mb-3">
                                    ${e.layoutImage?`<img src="${e.layoutImage}" class="h-40 mx-auto object-contain rounded shadow-sm">`:'<p class="text-gray-400 text-xs">Sem imagem (Use Links para ficheiros pesados)</p>'}
                                </div>
                                <label class="btn-gradient px-4 py-2 rounded-lg text-white font-bold text-xs shadow cursor-pointer transition hover:scale-105 inline-block">
                                    <i data-lucide="upload" class="inline w-3 h-3 mr-1"></i> Carregar Miniatura
                                    <input type="file" class="hidden" onchange="window.handleComImage(this)">
                                </label>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                            <div>
                                <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
                                    <label class="text-xs font-bold text-gray-500 uppercase block">Observações</label>
                                    <div class="flex flex-wrap gap-2">
                                        <button type="button" onclick="window.requestAiCommercialCopy(this)" class="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-black text-violet-700 transition hover:bg-violet-100">
                                            <i data-lucide="sparkles" class="inline w-3.5 h-3.5 mr-1"></i>IA gerar texto
                                        </button>
                                        <button type="button" onclick="window.requestAiClientReply(this)" class="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-[11px] font-black text-cyan-700 transition hover:bg-cyan-100">
                                            <i data-lucide="message-square-reply" class="inline w-3.5 h-3.5 mr-1"></i>IA resposta cliente
                                        </button>
                                    </div>
                                </div>
                                <textarea id="c-obs" class="input-modern h-32" placeholder="Detalhes técnicos...">${e.observations}</textarea>
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block mt-4">Termos exibidos no link público</label>
                                <textarea id="c-public-terms" class="input-modern h-24" placeholder="Termos de aceite do cliente">${e.publicTerms||""}</textarea>
                            </div>
                            <div class="bg-gray-50 p-6 rounded-2xl text-right space-y-2">
                                <div class="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal (c/ perdas):</span>
                                    <span id="c-sub" class="font-bold">R$ 0,00</span>
                                </div>
                                <div class="flex justify-between items-center text-sm text-gray-600">
                                    <span>Desconto:</span>
                                    <div class="flex gap-2 justify-end w-32">
                                        <select id="c-dtype" onchange="window.calcComTotal()" class="input-modern py-1 px-2 text-xs">
                                            <option value="%">%</option>
                                            <option value="R$">R$</option>
                                        </select>
                                        <input id="c-dval" oninput="window.calcComTotal()" type="number" value="${e.discount}" class="input-modern py-1 px-2 text-xs text-right">
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-2 text-left text-xs border-t border-gray-200 pt-3 mt-2">
                                    <div class="bg-white rounded-xl p-3 border border-gray-100">
                                        <p class="text-[10px] font-black uppercase text-gray-400">Custo estimado</p>
                                        <p id="c-smart-cost" class="font-black text-red-600">R$ 0,00</p>
                                    </div>
                                    <div class="bg-white rounded-xl p-3 border border-gray-100">
                                        <p class="text-[10px] font-black uppercase text-gray-400">Lucro projetado</p>
                                        <p id="c-smart-profit" class="font-black text-green-600">R$ 0,00</p>
                                    </div>
                                    <div class="bg-white rounded-xl p-3 border border-gray-100">
                                        <p class="text-[10px] font-black uppercase text-gray-400">Margem projetada</p>
                                        <p id="c-smart-margin" class="font-black text-theme">0%</p>
                                    </div>
                                    <div class="bg-white rounded-xl p-3 border border-gray-100">
                                        <p class="text-[10px] font-black uppercase text-gray-400">Mix</p>
                                        <p id="c-pricing-mix" class="font-black text-gray-700">0 inteligente(s) / 0 manual(is)</p>
                                    </div>
                                </div>
                                <div class="flex justify-between text-2xl font-black text-theme border-t border-gray-200 pt-3 mt-2">
                                    <span>Total Receita:</span>
                                    <span id="c-total">R$ 0,00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl sticky bottom-0 z-10">
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-6 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                        <button onclick="window.saveCom()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Documento</button>
                    </div>
                </div>
            </div>`,document.getElementById("c-dtype").value=e.discountType||"%",window.lucide&&lucide.createIcons(),window.renderComItems(),window.renderArtLinks()}catch(e){console.error(e),window.customAlert("Ocorreu um erro ao abrir o orçamento: "+e.message)}},window.renderArtLinks=()=>{document.getElementById("art-links-container").innerHTML=i.formArtUrls.map((t,e)=>`
        <div class="flex gap-2 items-center bg-white p-1 rounded border transition">
            <input class="input-modern h-8 w-1/3 text-xs" placeholder="Ex: Corte / Mockup" value="${t.title}" oninput="window.updArtLink(${e}, 'title', this.value)">
            <input class="input-modern h-8 w-2/3 text-xs" placeholder="https://" value="${t.url}" oninput="window.updArtLink(${e}, 'url', this.value)">
            <button onclick="window.delArtLink(${e})" class="text-red-400 hover:text-red-600 p-1 transition"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>`).join(""),window.lucide&&lucide.createIcons()},window.addArtLink=()=>{i.formArtUrls.push({title:"",url:""}),window.renderArtLinks()},window.delArtLink=t=>{i.formArtUrls.splice(t,1),window.renderArtLinks()},window.updArtLink=(t,e,a)=>{i.formArtUrls[t][e]=a},window.handleComImage=t=>{const e=t.files[0];if(e){e.size>8e5&&window.customAlert("Aviso: a imagem é pesada (>800KB). Usa os links na nuvem para evitar erros de armazenamento.");const a=new FileReader;a.onload=n=>{i.editingDoc.layoutImage=n.target.result,document.getElementById("c-layout-preview").innerHTML=`<img src="${n.target.result}" class="h-40 mx-auto object-contain rounded shadow-sm">`},a.readAsDataURL(e)}};const h=(t,e=0)=>window.toNumber?window.toNumber(t,e):parseFloat(t)||e,H=(t,e=95)=>Math.min(e,Math.max(0,h(t))),K=t=>{const e=h(t.qty,1);return t.width>0&&t.height>0?h(t.width)*h(t.height)*e:e},L=t=>t.width>0&&t.height>0?K(t)*h(t.priceM2)*(1+h(t.waste)/100):h(t.qty,1)*h(t.val||t.priceM2),N=t=>{const e=Math.max(K(t),0),a=e*(1+h(t.waste)/100),n=a*h(t.materialCost),o=n+h(t.laborCost)+h(t.setupCost)+h(t.outsourcingCost)+h(t.deliveryCost)+h(t.extraCost),s=H(t.taxRate),d=H(t.commissionRate),l=H(t.overheadRate),p=H(t.targetMargin||35),r=s+d+l,u=Math.min(95,r+p),c=u>=95?o/.05:o/(1-u/100),m=Math.max(c,h(t.minPrice)),b=e>0?m/e:m,y=m*(r/100),g=m-o-y,S=m>0?g/m*100:0;return{measureQty:e,costQty:a,materialCost:n,directCost:o,variableCost:y,suggestedTotal:m,unitPrice:b,profit:g,margin:S,variableRate:r,targetMargin:p}},k=(t={})=>{const e=t.pricingMode||"manual";return{catalogId:"",catalogName:"",serviceCategory:"",catalogServiceType:"",catalogTags:"",catalogDescription:"",catalogNote:"",catalogLeadTimeDays:0,catalogComplexity:"standard",catalogUnitLabel:"m²",catalogRecommendedDepartment:"",catalogChecklistTemplate:[],catalogDefaultStages:[],catalogOperationalNotes:"",material:"",finish:"",width:0,height:0,qty:1,waste:0,priceM2:0,val:0,pricingMode:e,materialCost:0,laborCost:0,setupCost:0,outsourcingCost:0,deliveryCost:0,extraCost:0,taxRate:8,commissionRate:5,overheadRate:12,targetMargin:35,minPrice:0,aiSuggestedUnitPrice:0,aiSuggestedTotal:0,aiSuggestedMinTotal:0,aiSuggestedIdealTotal:0,aiSuggestedPremiumTotal:0,aiReasoning:"",aiCategory:"",aiComplexity:"",aiLeadTimeDays:0,aiRecommendedDepartment:"",aiSuggestedAt:"",...t,pricingMode:e}},Y=()=>i.formItems.reduce((t,e)=>{const a=k(e);return t+(a.pricingMode==="smart"?N(a).suggestedTotal:L(a))},0),W=()=>i.formItems.reduce((t,e)=>{const a=k(e);if(a.pricingMode==="smart"){const n=N(a);return t.smartCount+=1,t.smartRevenue+=n.suggestedTotal,t.directCost+=n.directCost,t.variableCost+=n.variableCost,t}return t.manualCount+=1,t.manualRevenue+=L(a),t},{smartCount:0,manualCount:0,smartRevenue:0,manualRevenue:0,directCost:0,variableCost:0}),R=t=>{const e=k(t);return e.pricingMode==="smart"?N(e).suggestedTotal:L(e)};window.renderComItems=()=>{const t=document.getElementById("com-items-list");t&&(t.innerHTML=i.formItems.map((e,a)=>`
        <div class="grid grid-cols-12 gap-3 items-end p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition">
            <div class="col-span-12 md:col-span-3">
                <label class="text-[10px] uppercase font-bold text-gray-400">Material/Serviço</label>
                <input class="input-modern h-8 text-xs" value="${e.material}" oninput="window.updItem(${a},'material',this.value)">
            </div>
            <div class="col-span-12 md:col-span-2">
                <label class="text-[10px] uppercase font-bold text-gray-400">Acabamento</label>
                <input class="input-modern h-8 text-xs" placeholder="Ex: Ilhós/Bainha" value="${e.finish||""}" oninput="window.updItem(${a},'finish',this.value)">
            </div>
            <div class="col-span-3 md:col-span-1">
                <label class="text-[10px] uppercase font-bold text-gray-400">Larg</label>
                <input type="number" class="input-modern h-8 text-center text-xs" value="${e.width}" oninput="window.updItem(${a},'width',this.value)">
            </div>
            <div class="col-span-3 md:col-span-1">
                <label class="text-[10px] uppercase font-bold text-gray-400">Alt</label>
                <input type="number" class="input-modern h-8 text-center text-xs" value="${e.height}" oninput="window.updItem(${a},'height',this.value)">
            </div>
            <div class="col-span-3 md:col-span-1">
                <label class="text-[10px] uppercase font-bold text-gray-400">Qtd</label>
                <input type="number" class="input-modern h-8 text-center text-xs" value="${e.qty}" oninput="window.updItem(${a},'qty',this.value)">
            </div>
            <div class="col-span-3 md:col-span-1">
                <label class="text-[10px] uppercase font-bold text-red-500" title="Margem de perda">Perda %</label>
                <input type="number" class="input-modern h-8 text-center text-xs border-red-200" value="${e.waste||0}" oninput="window.updItem(${a},'waste',this.value)">
            </div>
            <div class="col-span-6 md:col-span-2">
                <label class="text-[10px] uppercase font-bold text-gray-400">R$ m²/un</label>
                <input type="number" class="input-modern h-8 text-right text-xs" value="${e.priceM2}" oninput="window.updItem(${a},'priceM2',this.value)">
            </div>
            <div class="col-span-6 md:col-span-1 flex justify-center mt-2 md:mt-0">
                <button onclick="window.delFormItem(${a})" class="text-red-400 hover:text-red-600 p-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
        </div>`).join(""),window.lucide&&lucide.createIcons(),window.calcComTotal())},window.addComItem=()=>{i.formItems.push({material:"",finish:"",width:0,height:0,qty:1,waste:0,priceM2:0}),window.renderComItems()},window.delFormItem=t=>{i.formItems.splice(t,1),window.renderComItems()},window.updItem=(t,e,a)=>{i.formItems[t][e]=e==="material"||e==="finish"?a:parseFloat(a)||0,window.calcComTotal()},window.calcComTotal=()=>{const t=i.formItems.reduce((p,r)=>{const m=(r.width>0&&r.height>0?r.width*r.height*r.qty:r.qty)*r.priceM2*(1+(r.waste||0)/100);return p+m},0),e=document.getElementById("c-dtype"),a=document.getElementById("c-dval"),n=e?e.value:"%",o=a&&parseFloat(a.value)||0,s=Math.max(0,n==="%"?t*(1-o/100):t-o),d=document.getElementById("c-sub"),l=document.getElementById("c-total");d&&(d.innerText=window.formatCurrency(t)),l&&(l.innerText=window.formatCurrency(s))},window.renderComItems=()=>{const t=document.getElementById("com-items-list");t&&(i.formItems=i.formItems.map(k),t.innerHTML=i.formItems.map((e,a)=>{const n=N(e),o=e.pricingMode==="smart",s=J(e.catalogId||"");return`
            <div class="p-4 bg-gray-50 rounded-2xl border ${o?"border-emerald-200 bg-emerald-50/40":"border-gray-200"} hover:bg-white hover:shadow-sm transition">
                ${D().length?`
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 pb-4 border-b ${o?"border-emerald-100":"border-gray-200"}">
                        <div>
                            <p class="text-[10px] uppercase font-black tracking-widest ${e.catalogName?"text-theme":"text-gray-400"}">${e.catalogName?`Modelo aplicado: ${window.escapeHtml(e.catalogName)}`:"Sem modelo do catálogo"}</p>
                            ${e.serviceCategory?`<p class="text-xs text-gray-500 font-bold mt-1">${window.escapeHtml(e.serviceCategory)}</p>`:""}
                        </div>
                        <div class="flex gap-2 md:min-w-[280px]">
                            <select class="input-modern h-9 text-xs" onchange="window.applyCatalogToItem(${a}, this.value)">
                                <option value="">Aplicar modelo...</option>
                                ${s}
                            </select>
                            <button type="button" class="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-black text-violet-700 transition hover:bg-violet-100" onclick="window.requestAiPricingForItem(${a}, this)">
                                <i data-lucide="sparkles" class="inline w-3.5 h-3.5 mr-1"></i>IA sugerir
                            </button>
                        </div>
                    </div>`:""}
                ${D().length?"":`
                    <div class="flex justify-end mb-4">
                        <button type="button" class="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-black text-violet-700 transition hover:bg-violet-100" onclick="window.requestAiPricingForItem(${a}, this)">
                            <i data-lucide="sparkles" class="inline w-3.5 h-3.5 mr-1"></i>IA sugerir
                        </button>
                    </div>`}
                <div class="grid grid-cols-12 gap-3 items-end">
                    <div class="col-span-12 md:col-span-3">
                        <label class="text-[10px] uppercase font-bold text-gray-400">Material/Servico</label>
                        <input class="input-modern h-8 text-xs" value="${window.escapeHtml(e.material)}" oninput="window.updItem(${a},'material',this.value)">
                    </div>
                    <div class="col-span-12 md:col-span-2">
                        <label class="text-[10px] uppercase font-bold text-gray-400">Acabamento</label>
                        <input class="input-modern h-8 text-xs" placeholder="Ex: Ilhos/Bainha" value="${window.escapeHtml(e.finish||"")}" oninput="window.updItem(${a},'finish',this.value)">
                    </div>
                    <div class="col-span-6 md:col-span-2">
                        <label class="text-[10px] uppercase font-bold text-gray-400">Modo de preco</label>
                        <select class="input-modern h-8 text-xs" onchange="window.setItemPricingMode(${a}, this.value)">
                            <option value="smart" ${o?"selected":""}>Inteligente</option>
                            <option value="manual" ${o?"":"selected"}>Manual</option>
                        </select>
                    </div>
                    <div class="col-span-3 md:col-span-1">
                        <label class="text-[10px] uppercase font-bold text-gray-400">Larg</label>
                        <input type="number" class="input-modern h-8 text-center text-xs" value="${e.width}" oninput="window.updItem(${a},'width',this.value)">
                    </div>
                    <div class="col-span-3 md:col-span-1">
                        <label class="text-[10px] uppercase font-bold text-gray-400">Alt</label>
                        <input type="number" class="input-modern h-8 text-center text-xs" value="${e.height}" oninput="window.updItem(${a},'height',this.value)">
                    </div>
                    <div class="col-span-3 md:col-span-1">
                        <label class="text-[10px] uppercase font-bold text-gray-400">Qtd</label>
                        <input type="number" class="input-modern h-8 text-center text-xs" value="${e.qty}" oninput="window.updItem(${a},'qty',this.value)">
                    </div>
                    <div class="col-span-3 md:col-span-1">
                        <label class="text-[10px] uppercase font-bold text-red-500" title="Margem de perda">Perda %</label>
                        <input type="number" class="input-modern h-8 text-center text-xs border-red-200" value="${e.waste||0}" oninput="window.updItem(${a},'waste',this.value)">
                    </div>
                    <div class="col-span-6 md:col-span-1 flex justify-center mt-2 md:mt-0">
                        <button onclick="window.delFormItem(${a})" class="text-red-400 hover:text-red-600 p-1 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                </div>

                ${o?`
                    <div class="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4 pt-4 border-t border-emerald-100">
                        <div><label class="text-[10px] uppercase font-bold text-emerald-700">Custo m2/un</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.materialCost}" oninput="window.updItem(${a},'materialCost',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-emerald-700">Mao obra</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.laborCost}" oninput="window.updItem(${a},'laborCost',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-emerald-700">Setup</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.setupCost}" oninput="window.updItem(${a},'setupCost',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-emerald-700">Terceiros</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.outsourcingCost}" oninput="window.updItem(${a},'outsourcingCost',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-emerald-700">Entrega</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.deliveryCost}" oninput="window.updItem(${a},'deliveryCost',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-emerald-700">Extras</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.extraCost}" oninput="window.updItem(${a},'extraCost',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-purple-700">Imposto %</label><input type="number" class="input-modern h-8 text-center text-xs" value="${e.taxRate}" oninput="window.updItem(${a},'taxRate',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-purple-700">Comissao %</label><input type="number" class="input-modern h-8 text-center text-xs" value="${e.commissionRate}" oninput="window.updItem(${a},'commissionRate',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-purple-700">Overhead %</label><input type="number" class="input-modern h-8 text-center text-xs" value="${e.overheadRate}" oninput="window.updItem(${a},'overheadRate',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-theme">Margem alvo %</label><input type="number" class="input-modern h-8 text-center text-xs" value="${e.targetMargin}" oninput="window.updItem(${a},'targetMargin',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-theme">Preco minimo</label><input type="number" class="input-modern h-8 text-right text-xs" value="${e.minPrice}" oninput="window.updItem(${a},'minPrice',this.value)"></div>
                        <div><label class="text-[10px] uppercase font-bold text-gray-400">Sugerido m2/un</label><input id="item-unit-${a}" type="number" class="input-modern h-8 text-right text-xs bg-white" value="${n.unitPrice.toFixed(2)}" readonly></div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
                        <div class="rounded-xl bg-white border border-emerald-100 p-3"><p class="text-[10px] font-black text-gray-400 uppercase">Qtd c/ perda</p><p id="item-cost-qty-${a}" class="font-black text-gray-800">${n.costQty.toFixed(2)}</p></div>
                        <div class="rounded-xl bg-white border border-emerald-100 p-3"><p class="text-[10px] font-black text-gray-400 uppercase">Custo direto</p><p id="item-direct-cost-${a}" class="font-black text-red-600">${window.formatCurrency(n.directCost)}</p></div>
                        <div class="rounded-xl bg-white border border-emerald-100 p-3"><p class="text-[10px] font-black text-gray-400 uppercase">Despesas %</p><p id="item-variable-rate-${a}" class="font-black text-orange-600">${n.variableRate.toFixed(1)}%</p></div>
                        <div class="rounded-xl bg-white border border-emerald-100 p-3"><p class="text-[10px] font-black text-gray-400 uppercase">Lucro proj.</p><p id="item-profit-${a}" class="font-black ${n.profit>=0?"text-green-600":"text-red-600"}">${window.formatCurrency(n.profit)}</p></div>
                        <div class="rounded-xl bg-white border border-emerald-100 p-3"><p class="text-[10px] font-black text-gray-400 uppercase">Total sugerido</p><p id="item-total-${a}" class="font-black text-theme">${window.formatCurrency(n.suggestedTotal)}</p></div>
                    </div>`:`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400">R$ m2/un manual</label>
                            <input type="number" class="input-modern h-8 text-right text-xs" value="${e.priceM2}" oninput="window.updItem(${a},'priceM2',this.value)">
                        </div>
                        <div class="rounded-xl bg-white border border-gray-100 p-3">
                            <p class="text-[10px] font-black text-gray-400 uppercase">Total manual</p>
                            <p id="item-total-${a}" class="font-black text-gray-800">${window.formatCurrency(L(e))}</p>
                        </div>
                        <div class="rounded-xl bg-white border border-gray-100 p-3">
                            <p class="text-[10px] font-black text-gray-400 uppercase">Modo preservado</p>
                            <p class="text-xs font-bold text-gray-500">Use para preco fechado ou excecao comercial.</p>
                        </div>
                    </div>`}
                ${e.aiSuggestedTotal>0?`
                    <div class="mt-4 rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
                        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                            <div>
                                <p class="text-[10px] uppercase font-black tracking-widest text-violet-500">Sugestão Gemini</p>
                                <p class="text-sm font-black text-slate-800 mt-1">${window.escapeHtml(e.aiCategory||e.serviceCategory||"Precificação orientada por IA")}</p>
                                ${e.aiReasoning?`<p class="text-xs text-slate-600 font-bold mt-2 leading-relaxed">${window.escapeHtml(e.aiReasoning)}</p>`:""}
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:min-w-[28rem]">
                                <div class="rounded-xl bg-white border border-violet-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Min</p><p class="font-black text-slate-800 mt-1">${window.formatCurrency(e.aiSuggestedMinTotal||e.aiSuggestedTotal)}</p></div>
                                <div class="rounded-xl bg-white border border-violet-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Ideal</p><p class="font-black text-violet-700 mt-1">${window.formatCurrency(e.aiSuggestedIdealTotal||e.aiSuggestedTotal)}</p></div>
                                <div class="rounded-xl bg-white border border-violet-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Premium</p><p class="font-black text-slate-800 mt-1">${window.formatCurrency(e.aiSuggestedPremiumTotal||e.aiSuggestedTotal)}</p></div>
                                <div class="rounded-xl bg-white border border-violet-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Sugerido</p><p class="font-black text-emerald-600 mt-1">${window.formatCurrency(e.aiSuggestedTotal)}</p></div>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-2 mt-3">
                            ${e.aiComplexity?`<span class="badge badge-purple">${window.escapeHtml(e.aiComplexity)}</span>`:""}
                            ${e.aiLeadTimeDays?`<span class="badge badge-blue">${window.toNumber(e.aiLeadTimeDays)} dia(s)</span>`:""}
                            ${e.aiRecommendedDepartment?`<span class="badge badge-green">${window.escapeHtml(e.aiRecommendedDepartment)}</span>`:""}
                            ${e.aiSuggestedUnitPrice?`<span class="badge badge-gray">Unidade sugerida ${window.formatCurrency(e.aiSuggestedUnitPrice)}</span>`:""}
                        </div>
                    </div>`:""}
            </div>`}).join(""),window.lucide&&lucide.createIcons(),window.calcComTotal())},window.addComItem=(t="smart")=>{i.formItems.push(k({pricingMode:t,material:"",finish:"",width:0,height:0,qty:1,waste:t==="smart"?8:0,priceM2:0})),window.renderComItems()},window.setItemPricingMode=(t,e)=>{i.formItems[t]=k({...i.formItems[t],pricingMode:e}),window.renderComItems()},window.updItem=(t,e,a)=>{if(i.formItems[t]=k(i.formItems[t]),i.formItems[t][e]=e==="material"||e==="finish"?a:parseFloat(a)||0,i.formItems[t].pricingMode==="smart"){const n=N(i.formItems[t]);i.formItems[t].priceM2=Number(n.unitPrice.toFixed(2)),i.formItems[t].smartTotal=Number(n.suggestedTotal.toFixed(2)),i.formItems[t].smartDirectCost=Number(n.directCost.toFixed(2)),i.formItems[t].smartProjectedProfit=Number(n.profit.toFixed(2)),i.formItems[t].smartProjectedMargin=Number(n.margin.toFixed(2));const o=document.getElementById(`item-unit-${t}`),s=document.getElementById(`item-cost-qty-${t}`),d=document.getElementById(`item-direct-cost-${t}`),l=document.getElementById(`item-variable-rate-${t}`),p=document.getElementById(`item-profit-${t}`),r=document.getElementById(`item-total-${t}`);o&&(o.value=n.unitPrice.toFixed(2)),s&&(s.innerText=n.costQty.toFixed(2)),d&&(d.innerText=window.formatCurrency(n.directCost)),l&&(l.innerText=`${n.variableRate.toFixed(1)}%`),p&&(p.innerText=window.formatCurrency(n.profit),p.className=`font-black ${n.profit>=0?"text-green-600":"text-red-600"}`),r&&(r.innerText=window.formatCurrency(n.suggestedTotal))}else{const n=document.getElementById(`item-total-${t}`);n&&(n.innerText=window.formatCurrency(L(i.formItems[t])))}window.calcComTotal()},window.calcComTotal=()=>{const t=Y(),e=W(),a=document.getElementById("c-dtype"),n=document.getElementById("c-dval"),o=a?a.value:"%",s=n&&parseFloat(n.value)||0,d=Math.max(0,o==="%"?t*(1-s/100):t-s),l=document.getElementById("c-sub"),p=document.getElementById("c-total");l&&(l.innerText=window.formatCurrency(t)),p&&(p.innerText=window.formatCurrency(d));const r=document.getElementById("c-smart-cost"),u=document.getElementById("c-smart-profit"),c=document.getElementById("c-smart-margin"),m=document.getElementById("c-pricing-mix"),b=e.smartRevenue-e.directCost-e.variableCost,y=e.smartRevenue>0?b/e.smartRevenue*100:0;r&&(r.innerText=window.formatCurrency(e.directCost+e.variableCost)),u&&(u.innerText=window.formatCurrency(b)),c&&(c.innerText=`${y.toFixed(1)}%`),m&&(m.innerText=`${e.smartCount} inteligente(s) / ${e.manualCount} manual(is)`)};const C=t=>String(document.getElementById(t)?.value||"").trim(),de=t=>{const e=t.filter(a=>{const n=k(a);return String(n.material||"").trim()||h(n.qty,0)>0||R(n)>0});if(!e.length)throw new Error("Adicione pelo menos um item valido ao documento.");return e.forEach((a,n)=>{const o=k(a),s=`item ${n+1}`;if(!String(o.material||"").trim())throw new Error(`Informe o material/servico do ${s}.`);if(h(o.qty,0)<=0)throw new Error(`Informe uma quantidade valida para o ${s}.`);if(h(o.width,0)<0||h(o.height,0)<0)throw new Error(`As dimensoes do ${s} nao podem ser negativas.`);if(h(o.waste,0)<0||h(o.waste,0)>100)throw new Error(`A perda do ${s} deve ficar entre 0% e 100%.`);if(o.pricingMode==="smart"){if(N(o).suggestedTotal<=0)throw new Error(`O preco sugerido do ${s} precisa ser maior que zero.`);return}if(L(o)<=0)throw new Error(`O valor manual do ${s} precisa ser maior que zero.`)}),e.map(k)};window.saveCom=async()=>{await window.withActionLock("save-commercial-doc",async()=>{const t=document.querySelector("#modal-container > .modal-overlay > div");window.toggleActionButtons(t,!0,"Salvando...");try{i.formItems=de((i.formItems||[]).map(k));const e=Y(),a=W(),n=document.getElementById("c-dtype"),o=document.getElementById("c-dval"),s=n?n.value:"%",d=o&&parseFloat(o.value)||0;if(d<0)throw new Error("O desconto nao pode ser negativo.");if(s==="%"&&d>100)throw new Error("O desconto percentual nao pode ser maior que 100%.");const l=Math.max(0,s==="%"?e*(1-d/100):e-d);if(l<=0)throw new Error("O total do documento precisa ser maior que zero.");const p={title:C("c-title"),date:C("c-date"),clientName:C("c-client"),sellerName:C("c-seller"),deliveryDeadline:C("c-deadline"),quoteValidUntil:C("c-valid"),paymentMethod:C("c-pay"),deliveryType:C("c-deltype"),installAddress:C("c-addr"),artUrls:i.formArtUrls,scaffold:C("c-scaffold"),installHeight:C("c-height"),power:C("c-power"),timeRestriction:C("c-time"),observations:C("c-obs"),publicTerms:C("c-public-terms"),items:i.formItems.map(c=>{const m=k(c);if(m.pricingMode!=="smart")return m;const b=N(m);return{...m,priceM2:Number(b.unitPrice.toFixed(2)),smartTotal:Number(b.suggestedTotal.toFixed(2)),smartDirectCost:Number(b.directCost.toFixed(2)),smartVariableCost:Number(b.variableCost.toFixed(2)),smartProjectedProfit:Number(b.profit.toFixed(2)),smartProjectedMargin:Number(b.margin.toFixed(2))}}),discount:d,discountType:s,totalValue:l,pricingMode:a.smartCount>0?"mixed_smart":"manual",suggestedOsStages:[...new Set(i.formItems.flatMap(c=>Array.isArray(c.catalogDefaultStages)?c.catalogDefaultStages:[]))],serviceBlueprint:i.formItems.filter(c=>c.catalogId).map(c=>({catalogId:c.catalogId,catalogName:c.catalogName||c.material||"",serviceType:c.catalogServiceType||"",leadTimeDays:window.toNumber(c.catalogLeadTimeDays),complexity:c.catalogComplexity||"standard",recommendedDepartment:c.catalogRecommendedDepartment||"",checklistCount:Array.isArray(c.catalogChecklistTemplate)?c.catalogChecklistTemplate.length:0})),pricingSummary:{subtotal:e,smartItems:a.smartCount,manualItems:a.manualCount,estimatedCost:a.directCost+a.variableCost,projectedProfit:a.smartRevenue-a.directCost-a.variableCost,projectedMargin:a.smartRevenue>0?(a.smartRevenue-a.directCost-a.variableCost)/a.smartRevenue*100:0,smartRevenue:a.smartRevenue,manualRevenue:a.manualRevenue},totalM2:i.formItems.reduce((c,m)=>c+m.width*m.height*m.qty,0),layoutImage:i.editingDoc.layoutImage||null};if(!p.title)throw new Error("Informe o titulo do documento.");if(!p.date)throw new Error("Informe a data do documento.");if(!p.clientName)throw new Error("Selecione um cliente valido.");let r=!i.editingDoc.id,u=r?await window.getNextSequentialNum(i.editingDoc.type==="quote"?"ORC":"OS"):i.editingDoc.number;r?await T(E(w,"artifacts",x,"public","data","commercial_docs"),{...i.editingDoc,...p,number:u,companyId:i.companyId,createdAt:f()}):await I($(w,"artifacts",x,"public","data","commercial_docs",i.editingDoc.id),{...p,updatedAt:f()}),window.logAudit(r?"CRIAR_DOC":"EDITAR_DOC",`Documento #${u} gravado com sucesso.`),document.getElementById("modal-container").innerHTML=""}catch(e){console.error("Save Commercial Error:",e),await window.customAlert("Erro ao salvar documento: "+e.message)}finally{window.toggleActionButtons(t,!1)}})},window.printSetup=(t,e)=>{let a=i.commercialDocs.find(A=>A.id===t);if(!a&&e==="Pedido de Compra"&&(a=i.purchaseDocs.find(A=>A.id===t)),!a)return;const n=i.settings||{},o=window.escapeHtml,s=/^#[0-9a-fA-F]{6}$/.test(n.primaryColor||"")?n.primaryColor:"#8B5CF6",d=String(e||""),l=d.toLowerCase(),p=l.includes("sem valor")||l.includes("produc"),r=d==="Pedido de Compra",u=l.includes("contrato"),c=/^data:image\//.test(n.logo||"")||/^https?:\/\//.test(n.logo||"")?n.logo:"",m=/^data:image\//.test(n.signature||"")||/^https?:\/\//.test(n.signature||"")?n.signature:"",b=Array.isArray(a.items)?a.items:[],y=r?b.reduce((A,B)=>A+window.toNumber(B.qty)*window.toNumber(B.val),0):window.toNumber(a.totalValue),g=p?r?2:3:4;let S="",M="";const O=b.map(A=>{const B=o(A.material||A.desc||"Item"),ue=A.width?`${o(A.width)} x ${o(A.height)} m`:"-",Z=window.toNumber(A.qty,1),X=r?window.formatCurrency(window.toNumber(A.qty)*window.toNumber(A.val)):window.formatCurrency(R(A)),ge=window.formatCurrency(window.toNumber(A.val));return r?`
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 10px;">
                        <div style="font-weight: bold; color: #334155;">${o(A.desc||A.material||"Item sem nome")}</div>
                    </td>
                    <td style="padding: 12px 10px; text-align: center; font-weight: bold;">${Z}</td>
                    ${p?"":`<td style="padding: 12px 10px; text-align: right; color: #64748b;">${ge}</td>`}
                    ${p?"":`<td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #334155;">${X}</td>`}
                </tr>`:`
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 10px;">
                    <div style="font-weight: bold; color: #334155;">${B}</div>
                    ${A.description?`<div style="color: #64748b; font-size: 11px;">${o(A.description)}</div>`:""}
                    ${A.finish?`<div style="color: #64748b; font-size: 10px;">Acabamento: ${o(A.finish)}</div>`:""}
                </td>
                <td style="padding: 12px 10px; text-align: center; color: #64748b;">${ue}</td>
                <td style="padding: 12px 10px; text-align: center; font-weight: bold;">${Z}</td>
                ${p?"":`<td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #334155;">${X}</td>`}
            </tr>`}).join("");u?(S=`
            <div style="margin: 30px 0; font-size: 12px; text-align: justify; line-height: 1.6; color: #334155;">
                <h4 style="font-weight: bold; margin-bottom: 20px; font-size: 14px; text-align: center; text-transform: uppercase;">CONTRATO DE PRESTACAO DE SERVICOS</h4>
                <div style="page-break-inside: avoid; margin-bottom: 15px;"><p><strong>CLAUSULA PRIMEIRA - DO OBJETO:</strong></p><p>O presente instrumento tem como objeto a prestacao dos servicos e/ou fornecimento dos produtos descritos detalhadamente na tabela deste documento.</p></div>
                <div style="page-break-inside: avoid; margin-bottom: 15px;"><p><strong>CLAUSULA SEGUNDA - DO PRECO E FORMA DE PAGAMENTO:</strong></p><p>Pela execucao dos servicos ou fornecimento dos produtos, a contratante pagara o valor total expresso neste documento. Forma de pagamento: <strong>${o(a.paymentMethod||"A combinar")}</strong>.</p></div>
                <div style="page-break-inside: avoid; margin-bottom: 15px;"><p><strong>CLAUSULA TERCEIRA - DOS PRAZOS:</strong></p><p>O prazo para entrega/instalacao sera de <strong>${o(a.deliveryDeadline||"A combinar")}</strong>, contados a partir da aprovacao final do layout e/ou confirmacao do pagamento do sinal.</p></div>
                <div style="page-break-inside: avoid; margin-bottom: 15px;"><p><strong>CLAUSULA QUARTA - DAS OBRIGACOES:</strong></p><p>A contratada executara os servicos com zelo tecnico. A contratante fornecera informacoes, acessos e aprovacoes necessarias para a execucao.</p></div>
                <div style="page-break-inside: avoid; margin-bottom: 15px;"><p><strong>CLAUSULA QUINTA - DA GARANTIA E RESCISAO:</strong></p><p>Aplica-se a garantia legal cabivel. Em caso de desistência apos o inicio da producao ou compra de materiais, podera ser retido o valor proporcional aos custos ja incorridos.</p></div>
            </div>
        `,M=`
            <div style="margin-top: 50px; display: flex; justify-content: space-between; gap: 40px;">
                <div style="flex: 1; text-align: center;">
                    ${m?`<img src="${m}" style="height: 50px; margin-bottom: 5px;">`:'<div style="height: 50px;"></div>'}
                    <div style="border-top: 1px solid #ccc; padding-top: 5px; font-weight: bold; font-size: 11px;">${o(n.companyName||"CONTRATADA")}</div>
                    <div style="font-size: 10px; color: #666;">CNPJ: ${o(n.cnpj||"")}</div>
                </div>
                <div style="flex: 1; text-align: center;">
                    <div style="height: 50px;"></div>
                    <div style="border-top: 1px solid #ccc; padding-top: 5px; font-weight: bold; font-size: 11px;">${o(a.clientName||"CONTRATANTE")}</div>
                    <div style="font-size: 10px; color: #666;">CONTRATANTE</div>
                </div>
            </div>
        `):l.includes("os")?(S=`
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; background: #f8fafc; padding: 15px; border-radius: 8px; font-size: 12px; border: 1px solid #e2e8f0;">
                <div><strong>Endereco de Instalacao:</strong><br>${o(a.installAddress||"Nao informado")}</div>
                <div><strong>Tipo de Entrega:</strong> ${o(a.deliveryType||"-")}</div>
                <div><strong>Prazo:</strong> ${o(a.productionDueDate||a.deliveryDeadline||"-")}</div>
                <div style="grid-column: span 2;"><strong>Observacoes Tecnicas:</strong><br>${o(a.productionNotes||a.observations||"Nenhuma")}</div>
            </div>
            ${a.layoutImage?`<div style="text-align: center; margin-top: 20px; border: 2px dashed #e2e8f0; padding: 10px; border-radius: 8px;"><p style="font-size: 10px; font-weight: bold; color: #94a3b8; margin-bottom: 5px;">LAYOUT ANEXADO</p><img src="${a.layoutImage}" style="max-height: 250px; max-width: 100%; object-fit: contain;"></div>`:""}
        `,M=`
            <div style="margin-top: 50px; display: flex; justify-content: space-between; gap: 40px;">
                <div style="flex: 1; text-align: center;">
                    ${m?`<img src="${m}" style="height: 50px; margin-bottom: 5px;">`:'<div style="height: 50px;"></div>'}
                    <div style="border-top: 1px solid #ccc; padding-top: 5px; font-weight: bold; font-size: 11px;">Autorizacao Producao</div>
                </div>
                <div style="flex: 1; text-align: center;">
                    <div style="height: 50px;"></div>
                    <div style="border-top: 1px solid #ccc; padding-top: 5px; font-weight: bold; font-size: 11px;">Recebido por (Cliente)</div>
                </div>
            </div>
        `):r?(S=`
            <div style="margin: 20px 0; font-size: 12px; color: #64748b;">
                <p><strong>Fornecedor:</strong> ${o(a.supplierName||"-")}</p>
                <p><strong>Data de Emissao:</strong> ${o(window.formatDate(a.date)||"-")}</p>
            </div>
        `,M=`
            <div style="margin-top: 50px; display: flex; justify-content: space-between; gap: 40px;">
                <div style="flex: 1; text-align: center;">
                    ${m?`<img src="${m}" style="height: 50px; margin-bottom: 5px;">`:'<div style="height: 50px;"></div>'}
                    <div style="border-top: 1px solid #ccc; padding-top: 5px; font-weight: bold; font-size: 11px;">${o(n.companyName||"Autorizado por")}</div>
                </div>
            </div>
        `):S=`
            <div style="margin: 20px 0; font-size: 12px; color: #64748b;">
                <p><strong>Condicoes de Pagamento:</strong> ${o(a.paymentMethod||"A combinar")}</p>
                <p><strong>Prazo de Entrega:</strong> ${o(a.deliveryDeadline||"A combinar")}</p>
                ${a.sellerName?`<p><strong>Vendedor:</strong> ${o(a.sellerName)}</p>`:""}
            </div>
            ${a.layoutImage?`<div style="text-align: center; margin-top: 20px;"><img src="${a.layoutImage}" style="max-height: 200px; border: 1px solid #eee; padding: 5px;"></div>`:""}
        `;const ce=`
        <div style="font-family: 'Inter', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #1e293b; background: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${s}; padding-bottom: 20px; margin-bottom: 30px;">
                <div style="width: 30%;">
                    ${c?`<img src="${c}" style="max-height: 70px; object-fit: contain;">`:`<h2 style="font-weight: 900; font-size: 24px; color: ${s};">NAUR<span style="color: #334155;">SYSTEM</span></h2>`}
                </div>
                <div style="text-align: right; font-size: 11px; color: #64748b; line-height: 1.4;">
                    <strong style="font-size: 13px; color: #1e293b;">${o(n.companyName||"Nome da Empresa")}</strong><br>
                    ${o(n.address||"Endereco da Empresa")}<br>
                    CNPJ: ${o(n.cnpj||"00.000.000/0000-00")}<br>
                    ${n.phone?`Tel: ${o(n.phone)}`:""}
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
                <div>
                    <h1 style="font-size: 28px; font-weight: 900; color: ${s}; text-transform: uppercase; margin: 0;">${o(d)}</h1>
                    <span style="font-size: 14px; font-weight: bold; color: #94a3b8; letter-spacing: 1px;">#${o(a.number||"0000")}</span>
                </div>
                <div style="text-align: right; font-size: 12px;">
                    <div><strong>Data:</strong> ${o(window.formatDate(a.date)||"-")}</div>
                    ${a.sellerName?`<div style="margin-top: 4px; padding: 4px 10px; background: #f1f5f9; border-radius: 4px; font-weight: bold; display: inline-block;">Vendedor: ${o(a.sellerName)}</div>`:""}
                </div>
            </div>

            ${a.clientName||a.supplierName?`
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 30px; display: flex; justify-content: space-between;">
                    <div style="font-size: 13px;">
                        <div style="font-size: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">${r?"Fornecedor":"Cliente"}</div>
                        <div style="font-weight: bold; font-size: 16px; color: #334155;">${o(a.clientName||a.supplierName||"-")}</div>
                        ${a.title?`<div style="color: #64748b; margin-top: 2px;">Projeto: ${o(a.title)}</div>`:""}
                    </div>
                </div>
            `:""}

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
                <thead>
                    <tr style="background-color: ${s}; color: white; text-align: left;">
                        ${r?`
                            <th style="padding: 10px; border-radius: 6px 0 0 6px;">Descricao do Item</th>
                            <th style="padding: 10px; text-align: center;">Qtd</th>
                            ${p?"":'<th style="padding: 10px; text-align: right;">Unitario</th>'}
                            ${p?"":'<th style="padding: 10px; text-align: right; border-radius: 0 6px 6px 0;">Total</th>'}
                        `:`
                            <th style="padding: 10px; border-radius: 6px 0 0 6px;">Item / Descricao</th>
                            <th style="padding: 10px; text-align: center;">Dimensoes</th>
                            <th style="padding: 10px; text-align: center;">Qtd</th>
                            ${p?"":'<th style="padding: 10px; text-align: right; border-radius: 0 6px 6px 0;">Total</th>'}
                        `}
                    </tr>
                </thead>
                <tbody>
                    ${O||`<tr><td colspan="${g}" style="padding: 14px; text-align: center; color: #64748b;">Sem itens.</td></tr>`}
                </tbody>
            </table>

            ${p?"":`
                <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
                    <div style="width: 250px; text-align: right; font-size: 13px;">
                        ${a.discount>0?`<div style="color: #ef4444; margin-bottom: 5px;">Desconto: - ${a.discountType==="%"?o(`${a.discount}%`):window.formatCurrency(a.discount)}</div>`:""}
                        <div style="font-size: 18px; font-weight: 900; color: ${s}; border-top: 2px solid #e2e8f0; padding-top: 10px;">Total: ${window.formatCurrency(y)}</div>
                    </div>
                </div>
            `}

            ${n.pixKey&&!r&&!p?`
                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 20px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div style="font-weight: bold; color: #166534; font-size: 12px;">DADOS PARA PIX</div>
                    <div style="font-family: monospace; background: white; padding: 4px 10px; border-radius: 4px; border: 1px solid #bbf7d0; font-weight: bold; font-size: 13px; color: #15803d;">${o(n.pixKey)}</div>
                </div>
            `:""}

            ${S}

            ${a.observations&&!l.includes("os")&&!u?`
                <div style="margin-top: 24px; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; padding: 14px; font-size: 12px; color: #475569;">
                    <strong style="display:block; margin-bottom:6px; color:#1e293b;">Observacoes</strong>
                    ${o(a.observations).replace(/\n/g,"<br>")}
                </div>
            `:""}

            <div style="page-break-inside: avoid;">${M}</div>

            <div style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; font-size: 10px; color: #cbd5e1;">Documento gerado por FlowSystem</div>
        </div>`,pe=String(d||"documento").toLowerCase().replace(/[^a-z0-9]+/gi,"-").replace(/(^-|-$)/g,""),me=o(a.number||a.id||"naursystem").replace(/[^a-z0-9_-]+/gi,"-");window.generatePdfFromHtml({html:ce,filename:`${pe||"documento"}-${me}.pdf`,orientation:"portrait"}).catch(A=>window.customAlert("Erro ao gerar PDF: "+A.message))}}export{Te as registerCommercial};

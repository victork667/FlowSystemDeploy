function _(j){const{state:n}=j;window.dashCard=(e,a,p,i,l="")=>`
    <div class="card-modern p-5 relative overflow-hidden">
        <div class="flex items-start justify-between gap-3">
            <div>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">${e}</p>
                <p class="text-2xl font-black text-gray-900 mt-2">${a}</p>
                ${l?`<p class="text-xs font-bold text-gray-400 mt-1">${l}</p>`:""}
            </div>
            <div class="p-3 rounded-2xl ${i}"><i data-lucide="${p}" class="w-5 h-5"></i></div>
        </div>
    </div>
`;const z=e=>{if(!e)return"";if(typeof e=="string")return e.slice(0,7);if(typeof e.toDate=="function")return e.toDate().toISOString().slice(0,7);const a=new Date(e);return Number.isNaN(a.getTime())?"":a.toISOString().slice(0,7)},q=(e=6)=>{const a=[],p=new Intl.DateTimeFormat("pt-BR",{month:"short"});for(let i=e-1;i>=0;i--){const l=new Date;l.setDate(1),l.setMonth(l.getMonth()-i),a.push({key:l.toISOString().slice(0,7),label:p.format(l).replace(".","")})}return a},S=e=>String(e||"").trim().toLowerCase(),H=e=>!!e.name&&e.active!==!1&&e.deleted!==!0,$=[{id:"quotes",label:"Orcamentos",group:"commercial",icon:"file-text",tone:"bg-orange-50 text-orange-600",value:()=>(n.commercialDocs||[]).filter(e=>e.type==="quote"||e.status==="draft").length,subtitle:()=>"Pipeline comercial"},{id:"approved",label:"Aprovados Cliente",group:"commercial",icon:"badge-check",tone:"bg-emerald-50 text-emerald-600",value:()=>(n.commercialDocs||[]).filter(e=>e.status==="client_approved").length,subtitle:()=>"Prontos para avancar"},{id:"pipeline",label:"Pipeline Leads",group:"commercial",icon:"funnel",tone:"bg-blue-50 text-blue-600",value:()=>window.formatCurrency((n.leads||[]).filter(e=>!["Ganho","Perdido"].includes(e.stage)).reduce((e,a)=>e+window.toNumber(a.estimatedValue),0)),subtitle:()=>"Valor potencial em aberto"},{id:"cash",label:"Caixa Pago",group:"financial",icon:"wallet",tone:"bg-cyan-50 text-cyan-600",value:()=>window.formatCurrency((n.financial||[]).filter(e=>e.status==="paid").reduce((e,a)=>e+(a.type==="income"?window.toNumber(a.amount):-window.toNumber(a.amount)),0)),subtitle:()=>"Regime de caixa"},{id:"receivables",label:"Receitas Pendentes",group:"financial",icon:"hand-coins",tone:"bg-violet-50 text-violet-600",value:()=>window.formatCurrency((n.financial||[]).filter(e=>e.type==="income"&&e.status==="pending").reduce((e,a)=>e+window.toNumber(a.amount),0)),subtitle:()=>"A receber"},{id:"critical_stock",label:"Estoque Critico",group:"operations",icon:"siren",tone:"bg-red-50 text-red-600",value:()=>(n.inventory||[]).filter(e=>window.toNumber(e.quantity)<=window.toNumber(e.minQty,5)).length,subtitle:()=>"Itens abaixo do minimo"},{id:"late_os",label:"O.S. Atrasadas",group:"operations",icon:"alarm-clock",tone:"bg-amber-50 text-amber-600",value:()=>(n.commercialDocs||[]).filter(e=>e.type==="os"&&e.status!=="finalized"&&window.isProductionOverdue?.(e)).length,subtitle:()=>"Demandas fora do prazo"},{id:"agenda_today",label:"Agenda Hoje",group:"operations",icon:"calendar-days",tone:"bg-indigo-50 text-indigo-600",value:()=>{const e=new Date().toISOString().slice(0,10);return(n.agendaEvents||[]).filter(a=>a.status!=="done"&&a.eventDate===e).length},subtitle:()=>"Compromissos do dia"},{id:"team",label:"Equipe Ativa",group:"people",icon:"users",tone:"bg-slate-50 text-slate-700",value:()=>(n.profiles||[]).filter(e=>e.active!==!1).length,subtitle:()=>"Usuarios liberados"},{id:"payroll",label:"Folha Mes",group:"people",icon:"file-badge",tone:"bg-green-50 text-green-600",value:()=>window.formatCurrency((n.payrollRuns||[]).filter(e=>String(e.month||"").startsWith(new Date().toISOString().slice(0,7))).reduce((e,a)=>e+window.toNumber(a.totalNet),0)),subtitle:()=>"Liquido gerado no RH"}],N=()=>{const e=Array.isArray(n.settings.dashboardWidgets)?n.settings.dashboardWidgets:[];return e.length?e:$.slice(0,8).map(a=>a.id)};window.renderDashboard=()=>{const e=document.getElementById("view-container");if(!e)return;const a=window.getAppVersionLabel?window.getAppVersionLabel():"FlowSystem",p=new Date().toISOString().split("T")[0],i=n.commercialDocs||[],l=n.financial||[],s=n.inventory||[],w=i.filter(t=>t.type==="quote"||t.status==="draft"),m=i.filter(t=>t.type==="os"&&t.status!=="finalized"),u=i.filter(t=>t.status==="finalized"),g=i.filter(t=>t.status==="client_approved"),c=u.reduce((t,d)=>t+window.toNumber(d.totalValue),0),b=l.filter(t=>t.type==="expense"&&t.status==="paid").reduce((t,d)=>t+window.toNumber(d.amount),0),o=c-b,r=l.filter(t=>t.type==="income"&&t.status==="pending").reduce((t,d)=>t+window.toNumber(d.amount),0),x=l.filter(t=>t.type==="income"&&t.status==="pending"&&t.dueDate<p).reduce((t,d)=>t+window.toNumber(d.amount),0),k=l.filter(t=>t.type==="expense"&&t.status==="pending").reduce((t,d)=>t+window.toNumber(d.amount),0),f=l.filter(t=>t.status==="paid").reduce((t,d)=>t+(d.type==="income"?window.toNumber(d.amount):-window.toNumber(d.amount)),0),C=w.length+m.length+u.length,h=C?Math.round((m.length+u.length)/C*100):0,v=s.filter(t=>window.toNumber(t.quantity)<=window.toNumber(t.minQty,5)),L=s.reduce((t,d)=>t+window.toNumber(d.quantity)*window.toNumber(d.costPrice),0),E=q(6),R=E.map(t=>u.filter(d=>z(d.date||d.createdAt)===t.key).reduce((d,y)=>d+window.toNumber(y.totalValue),0)),F=(n.sellers||[]).filter(H).map(t=>{const d=S(t.name),y=u.filter(D=>S(D.sellerName)===d);return{name:t.name,total:y.reduce((D,M)=>D+window.toNumber(M.totalValue),0),count:y.length}}).filter(t=>t.count>0).sort((t,d)=>d.total-t.total).slice(0,5),T=[...i].sort((t,d)=>(d.createdAt.seconds||0)-(t.createdAt.seconds||0)).slice(0,6);e.innerHTML=`
        <div class="mb-8 rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl relative">
            <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,#22c55e,transparent_30%),radial-gradient(circle_at_bottom_left,#38bdf8,transparent_30%)]"></div>
            <div class="relative p-8 flex flex-col lg:flex-row justify-between gap-6">
                <div>
                    <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50 mb-3">${window.escapeHtml(a)}</p>
                    <h2 class="text-3xl md:text-5xl font-black tracking-tight">Centro de Comando</h2>
                    <p class="text-white/60 mt-3 max-w-2xl">Visão executiva de vendas, produção, financeiro e estoque em tempo real.</p>
                </div>
                <div class="hero-stats-row lg:max-w-[28rem]">
                    <button onclick="window.navigateTo('commercial_quotes')" class="hero-stat-card bg-white text-slate-950 px-4 py-3 rounded-2xl font-black text-sm shadow-lg hover:scale-105 transition">Novo Orçamento</button>
                    <button onclick="window.navigateTo('inventory')" class="hero-stat-card bg-white/10 text-white border border-white/20 px-4 py-3 rounded-2xl font-black text-sm hover:bg-white/20 transition">Ver Estoque</button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            ${window.dashCard("Faturamento",window.formatCurrency(c),"trending-up","bg-green-50 text-green-600",`${u.length} O.S. finalizadas`)}
            ${window.dashCard("Lucro Gerencial",window.formatCurrency(o),"badge-dollar-sign",o>=0?"bg-blue-50 text-blue-600":"bg-red-50 text-red-600","Receitas finalizadas - despesas pagas")}
            ${window.dashCard("A Receber",window.formatCurrency(r),"wallet","bg-purple-50 text-purple-600",`${window.formatCurrency(x)} vencido`)}
            ${window.dashCard("Saldo em Caixa",window.formatCurrency(f),"landmark",f>=0?"bg-cyan-50 text-cyan-600":"bg-red-50 text-red-600",`${window.formatCurrency(k)} a pagar`)}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            ${window.dashCard("Orçamentos",w.length,"file-text","bg-orange-50 text-orange-600",`${g.length} aprovados pelo cliente`)}
            ${window.dashCard("Em Produção",m.length,"hammer","bg-indigo-50 text-indigo-600",`${h}% conversão operacional`)}
            ${window.dashCard("Estoque Crítico",v.length,"alert-triangle",v.length?"bg-red-50 text-red-600 animate-pulse":"bg-gray-50 text-gray-500",window.formatCurrency(L))}
            ${window.dashCard("Itens em Estoque",s.length,"boxes","bg-emerald-50 text-emerald-600","Materiais cadastrados")}
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div class="xl:col-span-2 card-modern p-6 h-96">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-black text-gray-800">Faturamento dos últimos 6 meses</h3>
                    <span class="badge badge-blue">Realizado</span>
                </div>
                <div class="h-80 w-full"><canvas id="dashChart"></canvas></div>
            </div>
            <div class="card-modern p-6">
                <h3 class="font-black text-gray-800 mb-4">Ranking de Vendedores</h3>
                <div class="space-y-3">
                    ${F.map((t,d)=>`
                        <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-theme text-white flex items-center justify-center font-black text-xs">${d+1}</div>
                                <div>
                                    <p class="font-black text-gray-800 text-sm">${window.escapeHtml(t.name)}</p>
                                    <p class="text-xs text-gray-400 font-bold">${t.count} venda(s)</p>
                                </div>
                            </div>
                            <p class="font-black text-green-600">${window.formatCurrency(t.total)}</p>
                        </div>`).join("")||'<p class="text-sm text-gray-400 font-bold text-center py-10">Sem vendas de vendedores cadastrados.</p>'}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 class="font-black text-gray-800">Estoque Crítico</h3>
                    <button onclick="window.navigateTo('inventory')" class="text-xs font-black text-theme hover:underline">Gerir estoque</button>
                </div>
                <div class="divide-y divide-gray-100">
                    ${v.slice(0,6).map(t=>`
                        <div class="p-4 flex items-center justify-between">
                            <div>
                                <p class="font-black text-gray-800">${window.escapeHtml(t.name)}</p>
                                <p class="text-xs text-gray-400 font-bold">${window.escapeHtml(t.category||"Geral")}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-black text-red-600">${window.toNumber(t.quantity)} ${window.escapeHtml(t.unit||"un")}</p>
                                <p class="text-[10px] text-gray-400 uppercase font-bold">mín. ${window.toNumber(t.minQty,5)}</p>
                            </div>
                        </div>`).join("")||'<p class="text-sm text-gray-400 font-bold text-center py-10">Nenhum item crítico.</p>'}
                </div>
            </div>
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100">
                    <h3 class="font-black text-gray-800">Atividade Comercial Recente</h3>
                </div>
                <div class="divide-y divide-gray-100">
                    ${T.map(t=>`
                        <div class="p-4 flex items-center justify-between">
                            <div>
                                <p class="font-black text-gray-800">${window.escapeHtml(t.number||"Sem número")} · ${window.escapeHtml(t.clientName||"Sem cliente")}</p>
                                <p class="text-xs text-gray-400 font-bold">${window.escapeHtml(t.title||"-")}</p>
                            </div>
                            <span class="badge ${t.status==="finalized"?"badge-green":t.status==="approved"?"badge-blue":t.status==="client_approved"?"badge-purple":"badge-yellow"}">${window.escapeHtml(t.status||"draft")}</span>
                        </div>`).join("")||'<p class="text-sm text-gray-400 font-bold text-center py-10">Sem atividade comercial.</p>'}
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons();const A=document.getElementById("dashChart");A&&new Chart(A,{type:"bar",data:{labels:E.map(t=>t.label),datasets:[{label:"Faturamento",data:R,borderColor:n.settings.primaryColor,borderRadius:12,backgroundColor:n.settings.primaryColor+"cc"}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{grid:{display:!0,color:"#f1f5f9"},beginAtZero:!0},x:{grid:{display:!1}}}}})};const I=window.renderDashboard;window.renderDashboard=()=>{I();const e=document.getElementById("view-container");if(!e)return;const a=window.getNotifications?window.getNotifications():[],p=n.leads||[],i=n.agendaEvents||[],l=new Date().toISOString().slice(0,10),s=p.filter(c=>c.stage!=="Ganho"&&c.stage!=="Perdido"),w=i.filter(c=>c.status!=="done"&&c.eventDate===l),m=s.reduce((c,b)=>c+window.toNumber(b.estimatedValue),0),u=e.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-4.gap-4.mb-6");if(u&&!e.querySelector('[data-dashboard-growth="true"]')){const c=document.createElement("div");c.setAttribute("data-dashboard-growth","true"),c.className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8",c.innerHTML=`
            ${window.dashCard("Leads Ativos",s.length,"target","bg-cyan-50 text-cyan-600",`${p.filter(b=>b.temperature==="Quente").length} quentes`)}
            ${window.dashCard("Agenda Hoje",w.length,"calendar-days","bg-purple-50 text-purple-600",`${i.filter(b=>b.status!=="done").length} evento(s) abertos`)}
            ${window.dashCard("Alertas",a.length,"bell-ring",a.length?"bg-red-50 text-red-600":"bg-gray-50 text-gray-500","Notificações internas")}
            ${window.dashCard("Pipeline Leads",window.formatCurrency(m),"funnel","bg-blue-50 text-blue-600","Valor potencial em aberto")}`,u.insertAdjacentElement("afterend",c)}const g=e.querySelector(".grid.grid-cols-1.xl\\:grid-cols-2.gap-6");if(g&&!e.querySelector('[data-dashboard-alerts="true"]')){g.classList.remove("xl:grid-cols-2"),g.classList.add("xl:grid-cols-3");const c=document.createElement("div");c.setAttribute("data-dashboard-alerts","true"),c.className="card-modern overflow-hidden",c.innerHTML=`
            <div class="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-black text-gray-800">Alertas Internos</h3>
                <button onclick="window.openNotificationsPanel()" class="text-xs font-black text-theme hover:underline">Abrir painel</button>
            </div>
            <div class="divide-y divide-gray-100">
                ${a.slice(0,6).map(b=>`
                    <div class="p-4">
                        <p class="font-black text-gray-800 text-sm">${window.escapeHtml(b.title)}</p>
                        <p class="text-xs text-gray-400 font-bold mt-1">${window.escapeHtml(b.description||"-")}</p>
                        ${b.action?`<p class="text-xs mt-2 font-bold ${b.level==="high"?"text-red-600":b.level==="medium"?"text-yellow-700":"text-theme"}">${window.escapeHtml(b.action)}</p>`:""}
                    </div>`).join("")||'<p class="text-sm text-gray-400 font-bold text-center py-10">Nenhum alerta ativo.</p>'}
            </div>`,g.appendChild(c)}window.lucide&&window.lucide.createIcons()};const W=window.renderDashboard;window.renderDashboard=()=>{W();const e=document.getElementById("view-container");if(!e)return;const a=n.commercialDocs||[],p=a.filter(o=>o.status==="finalized"),l=a.filter(o=>o.type==="os"&&o.status!=="finalized").filter(o=>window.isProductionOverdue&&window.isProductionOverdue(o)),s={},w={},m={};a.filter(o=>o.type==="os").forEach(o=>{const r=o.assignedTo||"Sem responsavel",x=window.getProductionChecklist?window.getProductionChecklist(o):[],k=x.filter(v=>v.done).length,f=x.length?k/x.length*100:0;s[r]=s[r]||{label:r,finalized:0,open:0,overdue:0,completion:0},o.status==="finalized"?(s[r].finalized+=1,s[r].completion+=f):(s[r].open+=1,window.isProductionOverdue&&window.isProductionOverdue(o)&&(s[r].overdue+=1)),(o.osStages||[o.osStage||"art"]).forEach(v=>{w[v]=(w[v]||0)+1});const h=o.costCenter.category||"Sem categoria";m[h]=(m[h]||0)+window.toNumber(o.totalCost)});const u=Object.values(s).map(o=>({...o,completion:o.finalized?o.completion/o.finalized:0})).sort((o,r)=>r.finalized-o.finalized).slice(0,5),g=Object.entries(w).map(([o,r])=>({label:o,amount:r})).sort((o,r)=>r.amount-o.amount),c=Object.entries(m).map(([o,r])=>({label:o,amount:r})).sort((o,r)=>r.amount-o.amount).slice(0,5),b=e.querySelector(".grid.grid-cols-1.xl\\:grid-cols-3.gap-6");if(b&&!e.querySelector('[data-dashboard-ops="true"]')){const o=document.createElement("div");o.setAttribute("data-dashboard-ops","true"),o.className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8",o.innerHTML=`
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 class="font-black text-gray-800">Painel de Produtividade</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">${p.length} O.S. finalizadas · ${l.length} atrasadas</p>
                </div>
                <div class="divide-y divide-gray-100">
                    ${u.map(r=>`
                        <div class="p-4 flex justify-between items-center gap-4">
                            <div>
                                <p class="font-black text-gray-800">${window.escapeHtml(r.label)}</p>
                                <p class="text-xs text-gray-400 font-bold">${r.finalized} finalizada(s) · ${r.open} aberta(s) · ${r.overdue} atrasada(s)</p>
                            </div>
                            <p class="font-black text-blue-600">${r.completion.toFixed(0)}%</p>
                        </div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Sem produtividade registrada.</div>'}
                </div>
            </div>
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 class="font-black text-gray-800">Gargalos por Etapa</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Distribuicao atual do kanban operacional</p>
                </div>
                <div class="divide-y divide-gray-100">
                    ${g.map(r=>`
                        <div class="p-4 flex justify-between items-center gap-4">
                            <div>
                                <p class="font-black text-gray-800">${window.escapeHtml(r.label)}</p>
                                <p class="text-xs text-gray-400 font-bold">Card(s) simultaneos na etapa</p>
                            </div>
                            <p class="font-black ${r.amount>=5?"text-red-600":"text-amber-600"}">${r.amount}</p>
                        </div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Sem etapas ativas.</div>'}
                </div>
            </div>
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 class="font-black text-gray-800">Centro de Custos</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Top categorias por custo acumulado</p>
                </div>
                <div class="divide-y divide-gray-100">
                    ${c.map(r=>`
                        <div class="p-4 flex justify-between items-center gap-4">
                            <div>
                                <p class="font-black text-gray-800">${window.escapeHtml(r.label)}</p>
                                <p class="text-xs text-gray-400 font-bold">Custo consolidado</p>
                            </div>
                            <p class="font-black text-red-600">${window.formatCurrency(r.amount)}</p>
                        </div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Sem custos classificados.</div>'}
                </div>
            </div>`,b.insertAdjacentElement("afterend",o)}window.lucide&&window.lucide.createIcons()},window.setDashboardWidgetFilter=e=>{n.dashboardWidgetFilter=e||"all",window.renderDashboard()},window.saveDashboardWidgets=async()=>{const e=Array.from(document.querySelectorAll(".dash-widget-cb:checked")).map(a=>a.value);if(!e.length)return window.customAlert("Selecione pelo menos um widget para o dashboard.");n.settings={...n.settings,dashboardWidgets:e},window.saveSet&&await window.saveSet("dashboardWidgets",e),document.getElementById("modal-container").innerHTML="",window.renderDashboard()},window.openDashboardWidgetModal=()=>{const e=N();document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[88vh] overflow-y-auto m-4">
                <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <div>
                        <h3 class="text-xl font-black text-gray-800">Personalizar Dashboard</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">Defina quais widgets executivos devem aparecer no topo da dashboard.</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                </div>
                <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${$.map(a=>`
                        <label class="rounded-2xl border border-gray-200 bg-gray-50 p-4 flex items-start gap-3 cursor-pointer hover:border-theme/30 transition">
                            <input type="checkbox" class="dash-widget-cb mt-1 rounded text-theme" value="${a.id}" ${e.includes(a.id)?"checked":""}>
                            <div>
                                <p class="font-black text-gray-800">${window.escapeHtml(a.label)}</p>
                                <p class="text-xs text-gray-400 font-bold mt-1 uppercase">${window.escapeHtml(a.group)}</p>
                            </div>
                        </label>`).join("")}
                </div>
                <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-5 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                    <button onclick="window.saveDashboardWidgets()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Widgets</button>
                </div>
            </div>
        </div>`,window.lucide&&window.lucide.createIcons()};const O=window.renderDashboard;window.renderDashboard=()=>{O();const e=document.getElementById("view-container");if(!e||e.querySelector('[data-dashboard-personalized="true"]'))return;const a=N(),p=$.filter(s=>a.includes(s.id)&&(n.dashboardWidgetFilter==="all"||s.group===n.dashboardWidgetFilter)),i=document.createElement("div");i.setAttribute("data-dashboard-personalized","true"),i.className="mb-8 space-y-4",i.innerHTML=`
        <div class="card-modern p-5 border border-gray-100">
            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div>
                    <h3 class="font-black text-gray-800">Widgets Personalizados</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Leitura rapida por area, configuravel sem alterar a dashboard principal.</p>
                </div>
                <div class="flex flex-col md:flex-row gap-2">
                    <div class="flex flex-wrap gap-2">
                        <button onclick="window.setDashboardWidgetFilter('all')" class="px-3 py-2 rounded-lg text-xs font-black ${n.dashboardWidgetFilter==="all"?"btn-gradient text-white shadow":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Todos</button>
                        <button onclick="window.setDashboardWidgetFilter('commercial')" class="px-3 py-2 rounded-lg text-xs font-black ${n.dashboardWidgetFilter==="commercial"?"btn-gradient text-white shadow":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Comercial</button>
                        <button onclick="window.setDashboardWidgetFilter('financial')" class="px-3 py-2 rounded-lg text-xs font-black ${n.dashboardWidgetFilter==="financial"?"btn-gradient text-white shadow":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Financeiro</button>
                        <button onclick="window.setDashboardWidgetFilter('operations')" class="px-3 py-2 rounded-lg text-xs font-black ${n.dashboardWidgetFilter==="operations"?"btn-gradient text-white shadow":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Operacao</button>
                        <button onclick="window.setDashboardWidgetFilter('people')" class="px-3 py-2 rounded-lg text-xs font-black ${n.dashboardWidgetFilter==="people"?"btn-gradient text-white shadow":"bg-gray-100 text-gray-600 hover:bg-gray-200"}">Pessoas</button>
                    </div>
                    <button onclick="window.openDashboardWidgetModal()" class="bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-black text-gray-700 hover:border-theme/30 hover:text-theme transition">Personalizar</button>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            ${p.map(s=>window.dashCard(s.label,s.value(),s.icon,s.tone,s.subtitle())).join("")||'<div class="md:col-span-2 xl:col-span-4 card-modern p-8 text-center text-gray-400 font-bold">Nenhum widget ativo para este filtro.</div>'}
        </div>`;const l=e.firstElementChild;l?l.insertAdjacentElement("afterend",i):e.prepend(i),window.lucide&&window.lucide.createIcons()},window.toggleDashboardExpanded=()=>{n.dashboardExpanded=!n.dashboardExpanded,window.renderDashboard()};const P=window.renderDashboard;window.renderDashboard=()=>{P();const e=document.getElementById("view-container");if(!e||e.querySelector('[data-dashboard-fold="true"]'))return;const a=e.firstElementChild,p=e.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-4.gap-4.mb-6");if(!a||!p)return;const i=window.getNotifications?window.getNotifications():[],l=(n.leads||[]).filter(g=>!["Ganho","Perdido"].includes(g.stage)).length,s=(n.commercialDocs||[]).filter(g=>g.type==="os"&&g.status!=="finalized").length,w=Array.from(e.children).filter(g=>g!==a&&g!==p);if(!w.length)return;const m=document.createElement("div");m.setAttribute("data-dashboard-fold","true"),m.className="mb-8",m.innerHTML=`
        <div class="card-modern p-4 border border-gray-100">
            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div>
                    <h3 class="font-black text-gray-800">Resumo ampliado</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Informacoes complementares da dashboard ficam sob demanda para reduzir ruido inicial.</p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <span class="badge badge-blue">${l} lead(s) ativos</span>
                    <span class="badge badge-purple">${s} O.S. aberta(s)</span>
                    <span class="badge ${i.length?"badge-red":"badge-gray"}">${i.length} alerta(s)</span>
                    <button onclick="window.toggleDashboardExpanded()" class="bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-black text-gray-700 hover:border-theme/30 hover:text-theme transition">
                        ${n.dashboardExpanded?"Recolher resumo":"Ver resumo ampliado"}
                    </button>
                </div>
            </div>
        </div>`;const u=document.createElement("div");u.className=n.dashboardExpanded?"mt-4":"hidden",u.setAttribute("data-dashboard-fold-body","true"),w.forEach(g=>u.appendChild(g)),m.appendChild(u),p.insertAdjacentElement("afterend",m),window.lucide&&window.lucide.createIcons()}}export{_ as registerDashboard};

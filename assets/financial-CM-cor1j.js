function Q(A){const{state:d,defaultKanbanStages:j,defaultRoles:M,firebaseConfig:B,auth:T,db:h,appId:$,initializeApp:H,getAuth:O,signInWithEmailAndPassword:q,createUserWithEmailAndPassword:_,signOut:G,onAuthStateChanged:z,signInWithCustomToken:W,collection:D,addDoc:N,updateDoc:k,deleteDoc:U,doc:F,onSnapshot:J,serverTimestamp:P,setDoc:K,getDoc:X,getDocs:Y}=A;window.setFinFilter=n=>{d.finFilter=n,window.renderFinancial()},window.setFinView=n=>{const a={list:"financial_list",dre:"financial_dre",forecast:"financial_forecast",commissions:"financial_commissions"};d.finViewMode=n,d.currentView=a[n]||"financial_list";const r={list:"Financeiro · Lancamentos",dre:"Financeiro · DRE",forecast:"Financeiro · Previsao",commissions:"Financeiro · Comissoes"},i=document.getElementById("page-title");i&&(i.innerText=r[n]||"Financeiro"),window.renderNav?.(),window.renderFinancial()},window.setFinSearch=n=>{d.finSearch=String(n||"").toLowerCase(),window.renderFinancial()};const S=n=>String(n||"").trim().toLowerCase(),I=n=>!!n.name&&n.active!==!1&&n.deleted!==!0,E=()=>new Set((d.sellers||[]).filter(I).map(n=>S(n.name))),w=n=>window.getUiTabClass(d.finViewMode===n);window.requestAiFinancialSummary=async n=>{await window.withActionLock("ai-financial-summary",async()=>{if(!window.isGeminiEnabled()){await window.customAlert("Gemini nao configurado. Verifique o .env com GEMINI_API_KEY e VITE_GEMINI_ENABLED=true.");return}const a=n instanceof HTMLElement?n:null,r=a?a.innerHTML:"";a&&(a.disabled=!0,a.classList.add("opacity-70","cursor-not-allowed"),a.innerHTML='<span class="inline-flex items-center gap-2"><span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Analisando</span>');try{const i=new Date,u=i.toISOString().slice(0,7),m=(d.financial||[]).filter(c=>String(c.dueDate||"").startsWith(u));if(!m.length){await window.customAlert("Nao ha lancamentos suficientes neste mes para resumir com IA.");return}const b=m.reduce((c,g)=>{const f=window.toNumber(g.amount);return g.type==="income"?(c.income+=f,g.status==="paid"?c.incomePaid+=f:c.incomePending+=f):(c.expense+=f,g.status==="paid"?c.expensePaid+=f:c.expensePending+=f),g.status==="pending"&&g.dueDate&&g.dueDate<i.toISOString().slice(0,10)&&(c.overdue+=f),c},{income:0,expense:0,incomePaid:0,incomePending:0,expensePaid:0,expensePending:0,overdue:0}),s=Object.entries(m.reduce((c,g)=>{const f=g.category||"Sem categoria";return c[f]=(c[f]||0)+window.toNumber(g.amount),c},{})).sort((c,g)=>g[1]-c[1]).slice(0,8).map(([c,g])=>({category:c,amount:g})),l=await window.callGeminiJson({systemInstruction:["Voce e um analista financeiro gerencial brasileiro.","Retorne somente JSON valido.","Resuma o fechamento parcial do mes de forma executiva, curta e acionavel.","Nao invente dados fora do contexto recebido."].join(" "),prompt:JSON.stringify({objective:"Gerar resumo gerencial do mes financeiro.",month:u,totals:b,topCategories:s,sampleEntries:m.slice(0,15).map(c=>({description:c.description||"",type:c.type||"",category:c.category||"",status:c.status||"",dueDate:c.dueDate||"",amount:window.toNumber(c.amount)})),responseShape:{executiveSummary:"string",alerts:["string"],nextActions:["string"]}},null,2),temperature:.3,maxOutputTokens:1e3}),t=String(l.executiveSummary||"").trim(),o=Array.isArray(l.alerts)?l.alerts.map(c=>String(c||"").trim()).filter(Boolean):[],e=Array.isArray(l.nextActions)?l.nextActions.map(c=>String(c||"").trim()).filter(Boolean):[],p=[`Resumo financeiro de ${u}:`,"",t||"Sem resumo gerado.",o.length?`
Alertas:
- ${o.join(`
- `)}`:"",e.length?`
Próximas ações:
- ${e.join(`
- `)}`:""].join(`
`);await window.customAlert(p.trim())}catch(i){await window.customAlert(`Erro ao gerar resumo financeiro: ${i.message}`)}finally{a&&document.body.contains(a)&&(a.disabled=!1,a.classList.remove("opacity-70","cursor-not-allowed"),a.innerHTML=r)}},{silent:!0})};const v=n=>window.getUiTabClass(d.finFilter===n,!0),C=()=>{const n=E();return(d.commercialDocs||[]).filter(a=>a.commissionSummary&&n.has(S(a.commissionSummary.sellerName))).map(a=>({id:a.id,number:a.number,clientName:a.clientName,...a.commissionSummary}))},y=(n,a=[])=>{const r=a.filter(t=>t.status==="paid").reduce((t,o)=>t+(o.type==="income"?o.amount:-o.amount),0),i=a.filter(t=>t.type==="income"&&t.status==="pending").reduce((t,o)=>t+o.amount,0),u=a.filter(t=>t.type==="expense"&&t.status==="pending").reduce((t,o)=>t+o.amount,0),m=C(),b={list:[{label:"Caixa",value:window.formatCurrency(r)},{label:"Receber",value:window.formatCurrency(i)},{label:"Pagar",value:window.formatCurrency(u)},{label:"Lancamentos",value:String(a.length)}],dre:[{label:"Pagos",value:String(a.filter(t=>t.status==="paid").length)},{label:"Receitas",value:window.formatCurrency(a.filter(t=>t.type==="income"&&t.status==="paid").reduce((t,o)=>t+o.amount,0))},{label:"Despesas",value:window.formatCurrency(a.filter(t=>t.type==="expense"&&t.status==="paid").reduce((t,o)=>t+o.amount,0))},{label:"Base",value:"Caixa"}],forecast:[{label:"Caixa",value:window.formatCurrency(r)},{label:"Entradas",value:window.formatCurrency(i)},{label:"Saidas",value:window.formatCurrency(u)},{label:"Pendentes",value:String(a.filter(t=>t.status==="pending").length)}],commissions:[{label:"Comissoes",value:String(m.length)},{label:"Pendentes",value:String(m.filter(t=>t.status!=="paid").length)},{label:"Pagas",value:String(m.filter(t=>t.status==="paid").length)},{label:"Em aberto",value:window.formatCurrency(m.filter(t=>t.status!=="paid").reduce((t,o)=>t+window.toNumber(o.amount),0))}]},s={list:"Operacao Financeira",dre:"DRE Gerencial",forecast:"Projecao de Caixa",commissions:"Comissoes de Vendas"},l={list:"Controle diario de lancamentos, conciliacao e saldo operacional.",dre:"Leitura consolidada do resultado com base no que ja foi pago.",forecast:"Janela futura de entradas, saidas e previsibilidade de caixa.",commissions:"Acompanhamento de repasses comerciais vinculados as O.S."};return{eyebrow:"Financeiro",title:s[n]||"Financeiro",description:l[n]||"Gestao financeira do sistema.",accent:"violet",cards:b[n]||b.list}},L=n=>`
    <details class="mobile-action-menu">
        <summary aria-label="Ações do lançamento"><i data-lucide="ellipsis"></i></summary>
        <div class="mobile-action-menu-panel">
            <button type="button" class="mobile-action-menu-item" onclick="window.toggleFin('${n.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="${n.status==="pending"?"check-circle":"rotate-ccw"}"></i><span>${n.status==="pending"?"Dar baixa":"Reabrir lançamento"}</span></button>
            ${n.reconciledAt?`<button type="button" class="mobile-action-menu-item" onclick="window.clearFinancialReconciliation('${n.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="shield-off"></i><span>Remover conciliação</span></button>`:`<button type="button" class="mobile-action-menu-item" onclick="window.openReconcileModal('${n.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="shield-check"></i><span>Conciliar</span></button>`}
            <button type="button" class="mobile-action-menu-item danger" onclick="window.delFin('${n.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
        </div>
    </details>
`;window.renderCommissionDesk=function(n){const a=C(),r=a.filter(i=>i.status!=="paid").reduce((i,u)=>i+window.toNumber(u.amount),0);n.innerHTML=`
        ${window.renderSectionHero(y("commissions",[...d.financial]))}
        <div class="ui-tab-row mb-6">
            <button onclick="window.setFinView('list')" class="${w("list")}"><i data-lucide="list" class="inline w-5 h-5"></i>Lançamentos</button>
            <button onclick="window.setFinView('dre')" class="${w("dre")}"><i data-lucide="bar-chart-3" class="inline w-5 h-5"></i>DRE</button>
            <button onclick="window.setFinView('forecast')" class="${w("forecast")}"><i data-lucide="calendar-range" class="inline w-5 h-5"></i>Previsão</button>
            <button onclick="window.setFinView('commissions')" class="${w("commissions")}"><i data-lucide="badge-percent" class="inline w-5 h-5"></i>Comissões</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="card-modern p-6 border-l-4 border-amber-500"><p class="text-xs font-bold text-gray-400 uppercase">Pendentes</p><p class="text-2xl font-black text-amber-600">${a.filter(i=>i.status!=="paid").length}</p></div>
            <div class="card-modern p-6 border-l-4 border-green-500"><p class="text-xs font-bold text-gray-400 uppercase">Pagas</p><p class="text-2xl font-black text-green-600">${a.filter(i=>i.status==="paid").length}</p></div>
            <div class="card-modern p-6 border-l-4 border-blue-500"><p class="text-xs font-bold text-gray-400 uppercase">Em aberto</p><p class="text-2xl font-black text-blue-600">${window.formatCurrency(r)}</p></div>
        </div>
        <div class="card-modern overflow-hidden">
            <div class="p-5 border-b border-gray-100 bg-gray-50/50"><h3 class="font-black text-gray-800">Comissões automáticas</h3></div>
            <div class="divide-y divide-gray-100">
                ${a.map(i=>`
                    <div class="p-4 flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <p class="font-black text-gray-800">${window.escapeHtml(i.sellerName||"Sem vendedor")} · ${window.escapeHtml(i.number||"Sem O.S.")}</p>
                            <p class="text-xs text-gray-400 font-bold mt-1">${window.escapeHtml(i.clientName||"Sem cliente")} · ${window.toNumber(i.rate)}%</p>
                        </div>
                        <div class="md:text-right">
                            <p class="font-black text-blue-600">${window.formatCurrency(i.amount)}</p>
                            <div class="flex justify-end items-center gap-2 mt-2">
                                <span class="badge ${i.status==="paid"?"badge-green":"badge-yellow"}">${i.status==="paid"?"Pago":"Pendente"}</span>
                                <button onclick="window.toggleCommissionStatus('${i.id}')" class="${window.getUiTabClass(!1,!0)}">${i.status==="paid"?"Reabrir":"Dar baixa"}</button>
                            </div>
                        </div>
                    </div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Nenhuma comissão automática registrada.</div>'}
            </div>
        </div>`,window.lucide&&window.lucide.createIcons()},window.renderDRE=function(n,a){const r=a.filter(o=>o.status==="paid"),i=r.filter(o=>o.type==="income"),u=r.filter(o=>o.type==="expense"),m=i.reduce((o,e)=>o+e.amount,0),b=u.reduce((o,e)=>o+e.amount,0),s=m-b,l={};u.forEach(o=>{l[o.category]=(l[o.category]||0)+o.amount});const t=Object.keys(l).sort((o,e)=>l[e]-l[o]).map(o=>`
        <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
            <span class="text-sm font-medium text-gray-600">${o||"Sem Categoria"}</span>
            <span class="text-sm font-bold text-red-500">${window.formatCurrency(l[o])}</span>
        </div>`).join("");n.innerHTML=`
        ${window.renderSectionHero(y("dre",a))}
        <div class="ui-tab-row mb-6">
            <button onclick="window.setFinView('list')" class="${w("list")}">
                <i data-lucide="list" class="inline w-5 h-5"></i> Lançamentos
            </button>
            <button onclick="window.setFinView('dre')" class="${w("dre")}">
                <i data-lucide="bar-chart-3" class="inline w-5 h-5"></i> DRE
            </button>
            <button onclick="window.setFinView('forecast')" class="${w("forecast")}">
                <i data-lucide="calendar-range" class="inline w-5 h-5"></i> Previsão
            </button>
            <button onclick="window.setFinView('commissions')" class="${w("commissions")}">
                <i data-lucide="badge-percent" class="inline w-5 h-5"></i> Comissões
            </button>
        </div>

        <div class="max-w-4xl mx-auto card-modern p-10 bg-white">
            <div class="text-center mb-10 border-b border-gray-200 pb-8">
                <h2 class="text-3xl font-black text-gray-800 tracking-tight">Demonstração do Resultado do Exercício (DRE)</h2>
                <p class="text-gray-500 mt-2">Cálculo gerencial baseado no regime de caixa (Lançamentos efetivamente <b>Pagos</b>).</p>
            </div>

            <div class="space-y-8">
                <!-- RECEITAS -->
                <div class="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <h3 class="text-sm font-bold text-green-700 uppercase tracking-widest mb-2 flex items-center">
                        <i data-lucide="trending-up" class="w-5 h-5 mr-2"></i> 1. Receita Bruta Realizada
                    </h3>
                    <div class="text-4xl font-black text-green-600">${window.formatCurrency(m)}</div>
                </div>

                <!-- DESPESAS -->
                <div class="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-sm font-bold text-red-700 uppercase tracking-widest flex items-center">
                            <i data-lucide="trending-down" class="w-5 h-5 mr-2"></i> 2. Custos e Despesas Operacionais
                        </h3>
                        <div class="text-2xl font-black text-red-600">${window.formatCurrency(b)}</div>
                    </div>
                    <div class="bg-white rounded-xl p-5 border border-red-100 shadow-inner">
                        ${t||'<p class="text-sm text-gray-400 font-medium">Nenhuma despesa registrada no período.</p>'}
                    </div>
                </div>

                <!-- LUCRO -->
                <div class="border-t-4 ${s>=0?"border-theme":"border-red-500"} pt-8 text-right mt-8">
                    <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">3. Resultado Líquido Final</p>
                    <h2 class="text-6xl font-black tracking-tighter ${s>=0?"text-theme":"text-red-500"}">${window.formatCurrency(s)}</h2>
                    ${m>0?`<p class="text-base font-bold text-gray-400 mt-3">Margem de Lucratividade: <span class="${s>=0?"text-theme":"text-red-500"} bg-gray-50 px-3 py-1 rounded-lg">${(s/m*100).toFixed(1)}%</span></p>`:""}
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.renderForecast=function(n,a){const r=new Date().toISOString().slice(0,10),i=a.filter(t=>t.status==="paid").reduce((t,o)=>t+(o.type==="income"?o.amount:-o.amount),0),u=a.filter(t=>t.status==="pending"&&t.dueDate).sort((t,o)=>String(t.dueDate).localeCompare(String(o.dueDate))).slice(0,12),m=a.filter(t=>t.status==="pending"&&t.dueDate&&t.dueDate>=r&&t.dueDate<=new Date(Date.now()+30*864e5).toISOString().slice(0,10)),b=m.filter(t=>t.type==="income").reduce((t,o)=>t+o.amount,0),s=m.filter(t=>t.type==="expense").reduce((t,o)=>t+o.amount,0),l=i+b-s;n.innerHTML=`
        ${window.renderSectionHero(y("forecast",a))}
        <div class="ui-tab-row mb-6">
            <button onclick="window.setFinView('list')" class="${w("list")}">
                <i data-lucide="list" class="inline w-5 h-5"></i> Lançamentos
            </button>
            <button onclick="window.setFinView('dre')" class="${w("dre")}">
                <i data-lucide="bar-chart-3" class="inline w-5 h-5"></i> DRE
            </button>
            <button onclick="window.setFinView('forecast')" class="${w("forecast")}">
                <i data-lucide="calendar-range" class="inline w-5 h-5"></i> Previsão
            </button>
            <button onclick="window.setFinView('commissions')" class="${w("commissions")}">
                <i data-lucide="badge-percent" class="inline w-5 h-5"></i> Comissões
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="card-modern p-6 border-l-4 border-blue-500"><p class="text-xs font-bold text-gray-400 uppercase">Caixa Atual</p><p class="text-2xl font-black text-blue-600">${window.formatCurrency(i)}</p></div>
            <div class="card-modern p-6 border-l-4 border-green-500"><p class="text-xs font-bold text-gray-400 uppercase">Entradas 30 dias</p><p class="text-2xl font-black text-green-600">${window.formatCurrency(b)}</p></div>
            <div class="card-modern p-6 border-l-4 border-red-500"><p class="text-xs font-bold text-gray-400 uppercase">Saídas 30 dias</p><p class="text-2xl font-black text-red-600">${window.formatCurrency(s)}</p></div>
            <div class="card-modern p-6 border-l-4 border-purple-500"><p class="text-xs font-bold text-gray-400 uppercase">Caixa Projetado</p><p class="text-2xl font-black text-purple-600">${window.formatCurrency(l)}</p></div>
        </div>
        <div class="card-modern overflow-hidden">
            <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 class="font-black text-gray-800">Próximos vencimentos</h3>
                <p class="text-xs font-bold text-gray-400 mt-1">Lista consolidada dos próximos 12 lançamentos pendentes</p>
            </div>
            <div class="divide-y divide-gray-100">
                ${u.map(t=>`
                    <div class="p-4 flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <p class="font-black text-gray-800">${t.description}</p>
                            <p class="text-xs text-gray-400 font-bold">${t.category||"Sem categoria"} · ${window.formatDate(t.dueDate)}</p>
                        </div>
                        <div class="md:text-right">
                            <p class="font-black ${t.type==="income"?"text-green-600":"text-red-600"}">${t.type==="income"?"+":"-"} ${window.formatCurrency(t.amount)}</p>
                            <span class="badge ${t.type==="income"?"badge-green":"badge-red"}">${t.type==="income"?"Entrada":"Saída"}</span>
                        </div>
                    </div>`).join("")||'<div class="p-10 text-center text-gray-400 font-bold">Nenhum lançamento pendente para projeção.</div>'}
            </div>
        </div>`,window.lucide&&lucide.createIcons()},window.toggleCommissionStatus=async n=>{try{const a=d.commercialDocs.find(u=>u.id===n);if(!a.commissionSummary)return;const r=a.commissionSummary.status==="paid"?"pending":"paid";await k(F(h,"artifacts",$,"public","data","commercial_docs",n),{commissionSummary:{...a.commissionSummary,status:r}});const i=(d.financial||[]).filter(u=>u.category==="Comissões"&&String(u.description||"").includes(String(a.number||"")));for(const u of i)await k(F(h,"artifacts",$,"public","data","financial",u.id),{status:r})}catch(a){window.customAlert("Erro ao atualizar comissão: "+a.message)}},window.renderFinancial=()=>{const n=document.getElementById("view-container");if(!n)return;const a=window.isCompactLayout?.(),r=[...d.financial].sort((e,p)=>(p.dueDate||"").localeCompare(e.dueDate||"")),i=new Date().toISOString().split("T")[0];if(d.finViewMode==="dre"){window.renderDRE(n,r);return}if(d.finViewMode==="forecast"){window.renderForecast(n,r);return}if(d.finViewMode==="commissions"){window.renderCommissionDesk(n);return}const u=r.filter(e=>!d.finSearch||[e.description,e.category,e.clientName,e.projectNumber,e.sellerName,e.serviceType,e.costCenterCategory].map(c=>String(c||"").toLowerCase()).join(" ").includes(d.finSearch)?d.finFilter==="all"?!0:d.finFilter==="overdue"?e.status==="pending"&&e.dueDate<i:e.status===d.finFilter:!1),m=r.filter(e=>e.type==="income"&&e.status==="pending").reduce((e,p)=>e+p.amount,0),b=r.filter(e=>e.type==="expense"&&e.status==="pending").reduce((e,p)=>e+p.amount,0),s=r.filter(e=>e.status==="paid").reduce((e,p)=>e+(p.type==="income"?p.amount:-p.amount),0);C().filter(e=>e.status!=="paid").reduce((e,p)=>e+window.toNumber(p.amount),0);let t=u.map(e=>{const p=e.status==="pending"&&e.dueDate<i;return`
        <tr class="hover:bg-gray-50 transition group">
            <td class="p-4 text-gray-500 font-medium ${p?"text-red-500 font-bold":""}">${window.formatDate(e.dueDate)} ${p?"⚠️":""}</td>
            <td class="p-4 font-bold text-gray-800">${e.description}</td>
            <td class="p-4"><span class="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold">${e.category}</span></td>
            <td class="p-4 text-right font-bold ${e.type==="income"?"text-green-600":"text-red-600"}">${e.type==="income"?"+":"-"} ${window.formatCurrency(e.amount)}</td>
            <td class="p-4 text-center">
                <span class="badge ${e.status==="paid"?"badge-green":p?"badge-red":"badge-yellow"}">${e.status==="paid"?"Pago":p?"Vencido":"Pendente"}</span>
            </td>
            <td class="p-4 text-center">
                ${e.reconciledAt?`<div><span class="badge badge-blue">Conciliado</span><div class="text-[10px] text-gray-400 font-bold mt-1">${window.formatDate(e.reconciliationDate||e.reconciledAt)}</div></div>`:'<span class="badge badge-gray">Aberto</span>'}
            </td>
            <td class="p-4 text-right">
                ${e.status==="pending"?`<button onclick="window.toggleFin('${e.id}')" class="text-green-500 hover:bg-green-50 p-2 rounded-lg mr-1 transition" title="Dar Baixa"><i data-lucide="check-circle" class="w-4 h-4"></i></button>`:`<button onclick="window.toggleFin('${e.id}')" class="text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg mr-1 transition" title="Reabrir"><i data-lucide="rotate-ccw" class="w-4 h-4"></i></button>`}
                ${e.reconciledAt?`<button onclick="window.clearFinancialReconciliation('${e.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-1 transition" title="Remover conciliacao"><i data-lucide="shield-off" class="w-4 h-4"></i></button>`:`<button onclick="window.openReconcileModal('${e.id}')" class="text-cyan-600 hover:bg-cyan-50 p-2 rounded-lg mr-1 transition" title="Conciliar"><i data-lucide="shield-check" class="w-4 h-4"></i></button>`}
                <button onclick="window.delFin('${e.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </td>
        </tr>`}).join("");const o=u.map(e=>{const p=e.status==="pending"&&e.dueDate<i;return`
        <div class="mobile-record-card">
            <div class="mobile-record-head">
                <div class="min-w-0 flex-1">
                    <p class="mobile-record-kicker">${e.type==="income"?"Receita":"Despesa"}</p>
                    <h3 class="mobile-record-title">${window.escapeHtml(e.description||"Lançamento sem descrição")}</h3>
                    <p class="mobile-record-subtitle">${window.escapeHtml(e.category||"Sem categoria")}</p>
                </div>
                ${L(e)}
            </div>
            <div class="mobile-record-grid">
                <div class="mobile-record-meta">
                    <p class="mobile-record-meta-label">Vencimento</p>
                    <p class="mobile-record-meta-value">${window.formatDate(e.dueDate)} ${p?"⚠️":""}</p>
                </div>
                <div class="mobile-record-meta">
                    <p class="mobile-record-meta-label">Valor</p>
                    <p class="mobile-record-meta-value ${e.type==="income"?"text-green-600":"text-red-600"}">${e.type==="income"?"+":"-"} ${window.formatCurrency(e.amount)}</p>
                </div>
            </div>
            <div class="mobile-record-footer">
                <div class="mobile-record-status">
                    <span class="badge ${e.status==="paid"?"badge-green":p?"badge-red":"badge-yellow"}">${e.status==="paid"?"Pago":p?"Vencido":"Pendente"}</span>
                    ${e.reconciledAt?'<span class="badge badge-blue">Conciliado</span>':'<span class="badge badge-gray">Aberto</span>'}
                </div>
            </div>
        </div>`}).join("");n.innerHTML=`
        ${window.renderSectionHero(y("list",r))}
        <div class="ui-tab-row mb-6">
            <button onclick="window.setFinView('list')" class="${w("list")}">
                <i data-lucide="list" class="inline w-5 h-5"></i> Lançamentos
            </button>
            <button onclick="window.setFinView('dre')" class="${w("dre")}">
                <i data-lucide="bar-chart-3" class="inline w-5 h-5"></i> DRE
            </button>
            <button onclick="window.setFinView('forecast')" class="${w("forecast")}">
                <i data-lucide="calendar-range" class="inline w-5 h-5"></i> Previsão
            </button>
            <button onclick="window.setFinView('commissions')" class="${w("commissions")}">
                <i data-lucide="badge-percent" class="inline w-5 h-5"></i> Comissões
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="card-modern p-6 border-l-4 border-green-500">
                <div class="flex justify-between items-start mb-2"><div><p class="text-xs font-bold text-gray-400 uppercase">A Receber</p><h3 class="text-2xl font-black text-green-600">${window.formatCurrency(m)}</h3></div><div class="bg-green-50 p-2 rounded-lg text-green-600"><i data-lucide="arrow-down-circle"></i></div></div>
            </div>
            <div class="card-modern p-6 border-l-4 border-red-500">
                <div class="flex justify-between items-start mb-2"><div><p class="text-xs font-bold text-gray-400 uppercase">A Pagar</p><h3 class="text-2xl font-black text-red-600">${window.formatCurrency(b)}</h3></div><div class="bg-red-50 p-2 rounded-lg text-red-600"><i data-lucide="arrow-up-circle"></i></div></div>
            </div>
            <div class="card-modern p-6 border-l-4 border-blue-500">
                <div class="flex justify-between items-start mb-2"><div><p class="text-xs font-bold text-gray-400 uppercase">Saldo em Caixa</p><h3 class="text-2xl font-black text-blue-600">${window.formatCurrency(s)}</h3></div><div class="bg-blue-50 p-2 rounded-lg text-blue-600"><i data-lucide="wallet"></i></div></div>
            </div>
        </div>

        <div class="card-modern overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div class="flex space-x-2 bg-white rounded-lg p-1 border shadow-sm overflow-x-auto">
                    <button onclick="window.setFinFilter('all')" class="${v("all")}">Todos</button>
                    <button onclick="window.setFinFilter('pending')" class="${v("pending")}">Pendentes</button>
                    <button onclick="window.setFinFilter('overdue')" class="${v("overdue")}">Vencidos</button>
                    <button onclick="window.setFinFilter('paid')" class="${v("paid")}">Pagos</button>
                </div>
                <input oninput="window.setFinSearch(this.value)" value="${window.escapeHtml(d.finSearch||"")}" placeholder="Buscar descricao, cliente, projeto..." class="input-modern md:w-80 h-11">
                <div class="flex flex-wrap items-center gap-2">
                    <button type="button" onclick="window.requestAiFinancialSummary(this)" class="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-black text-violet-700 transition hover:bg-violet-100">
                        <i data-lucide="sparkles" class="inline w-4 h-4 mr-2"></i>IA resumo do mes
                    </button>
                    <button onclick="window.openFinModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Lançamento</button>
                </div>
            </div>
            ${a?`
            <div class="mobile-list-stack p-4">
                ${o||'<div class="card-modern p-6 text-center text-gray-400">Nenhum lançamento registrado.</div>'}
            </div>`:`
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm min-w-[600px]">
                    <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                        <tr>
                            <th class="p-4">Vencimento</th>
                            <th class="p-4">Descrição</th>
                            <th class="p-4">Categoria</th>
                            <th class="p-4 text-right">Valor</th>
                            <th class="p-4 text-center">Status</th>
                            <th class="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${t||'<tr><td colspan="6" class="p-6 text-center text-gray-400">Nenhum lançamento registrado.</td></tr>'}
                    </tbody>
                </table>
            </div>`}
        </div>`,window.lucide&&lucide.createIcons()};const R=window.renderFinancial;window.renderFinancial=()=>{R();const n=document.getElementById("view-container");if(!n)return;const a=n.querySelector(".flex.space-x-4.mb-6"),r=a?Array.from(a.querySelectorAll("button")).some(s=>String(s.textContent||"").toLowerCase().includes("previs")):!1;if(a&&!a.dataset.forecastEnhanced&&!r){a.dataset.forecastEnhanced="true";const s=document.createElement("button");s.className=w("forecast"),s.innerHTML='<i data-lucide="calendar-range" class="inline w-5 h-5 mr-2 mb-0.5"></i> Previsão',s.onclick=()=>window.setFinView("forecast"),a.appendChild(s)}if(d.finViewMode!=="list"){window.lucide&&window.lucide.createIcons();return}const i=E(),u=(d.commercialDocs||[]).filter(s=>s.commissionSummary&&i.has(S(s.commissionSummary.sellerName))).map(s=>({id:s.id,number:s.number,clientName:s.clientName,...s.commissionSummary})),m=u.filter(s=>s.status!=="paid").reduce((s,l)=>s+window.toNumber(l.amount),0),b=n.querySelector(".grid.grid-cols-1.md\\:grid-cols-3.gap-6.mb-8");if(b&&!n.querySelector('[data-commission-panel="true"]')){const s=document.createElement("div");s.setAttribute("data-commission-panel","true"),s.className="card-modern overflow-hidden mb-8",s.innerHTML=`
            <div class="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div>
                    <h3 class="font-black text-gray-800">Comissões Automáticas</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">${u.length} registro(s) · ${window.formatCurrency(m)} em aberto</p>
                </div>
            </div>
            <div class="divide-y divide-gray-100">
                ${u.map(l=>`
                    <div class="p-4 flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <p class="font-black text-gray-800">${window.escapeHtml(l.sellerName||"Sem vendedor")} · ${window.escapeHtml(l.number||"Sem O.S.")}</p>
                            <p class="text-xs text-gray-400 font-bold">${window.escapeHtml(l.clientName||"Sem cliente")} · ${window.toNumber(l.rate)}%</p>
                        </div>
                        <div class="md:text-right">
                            <p class="font-black text-blue-600">${window.formatCurrency(l.amount)}</p>
                            <div class="flex justify-end items-center gap-2 mt-2">
                                <span class="badge ${l.status==="paid"?"badge-green":"badge-yellow"}">${l.status==="paid"?"Pago":"Pendente"}</span>
                                <button onclick="window.toggleCommissionStatus('${l.id}')" class="px-3 py-1.5 rounded-lg text-xs font-black ${l.status==="paid"?"bg-yellow-50 text-yellow-700":"bg-green-50 text-green-700"}">${l.status==="paid"?"Reabrir":"Dar Baixa"}</button>
                            </div>
                        </div>
                    </div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Nenhuma comissão automática registrada.</div>'}
            </div>`,b.insertAdjacentElement("afterend",s)}window.lucide&&window.lucide.createIcons()},window.openFinModal=()=>{document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md m-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Novo Lançamento</h3>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600"><i data-lucide="x"></i></button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo</label>
                        <select id="f-type" class="input-modern"><option value="income">Receita (Entrada)</option><option value="expense">Despesa (Saída)</option></select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Descrição</label>
                        <input id="f-desc" class="input-modern" placeholder="Ex: Pagamento Cliente X">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Categoria</label>
                            <input id="f-cat" class="input-modern" placeholder="Ex: Vendas / Luz">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Valor</label>
                            <input id="f-val" type="number" class="input-modern" placeholder="0,00">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Vencimento</label>
                            <input id="f-due" type="date" class="input-modern">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Status</label>
                            <select id="f-stat" class="input-modern"><option value="pending">Pendente</option><option value="paid">Pago</option></select>
                        </div>
                    </div>
                </div>
                <div class="mt-8 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Cancelar</button>
                    <button onclick="window.saveFin()" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg">Salvar Lançamento</button>
                </div>
            </div>
        </div>`,window.lucide&&lucide.createIcons()};const x=n=>String(document.getElementById(n)?.value||"").trim();window.saveFin=async()=>{await window.withActionLock("save-financial-entry",async()=>{const n=document.querySelector("#modal-container > .modal-overlay > div");window.toggleActionButtons(n,!0,"Salvando...");try{const a=x("f-desc"),r=parseFloat(document.getElementById("f-val")?.value),i=x("f-due");if(!a){await window.customAlert("Preencha a descricao do lancamento.");return}if(!Number.isFinite(r)||r<=0){await window.customAlert("Informe um valor maior que zero.");return}if(!i){await window.customAlert("Informe a data de vencimento.");return}await N(D(h,"artifacts",$,"public","data","financial"),{type:document.getElementById("f-type").value,description:a,category:x("f-cat")||"Geral",amount:Number(r.toFixed(2)),dueDate:i,status:document.getElementById("f-stat").value,costCenterCategory:x("f-cost-center"),serviceType:x("f-service-type"),clientName:x("f-client"),sellerName:x("f-seller"),projectNumber:x("f-project-number"),companyId:d.companyId,createdAt:P()}),window.logAudit("CRIAR_LANCAMENTO",`Lancamento: ${a} - R$ ${r.toFixed(2)}`),document.getElementById("modal-container").innerHTML=""}catch(a){await window.customAlert("Erro ao salvar: "+a.message)}finally{window.toggleActionButtons(n,!1)}})},window.toggleFinancialExpanded=()=>{d.financialExpanded=!d.financialExpanded,window.renderFinancial()};const V=window.renderFinancial;window.renderFinancial=()=>{V();const n=document.getElementById("view-container");if(!n||(String(d.currentView||"").startsWith("financial_")&&n.querySelector(".ui-tab-row.mb-6")?.remove(),d.finViewMode!=="list"||n.querySelector('[data-financial-fold="true"]')))return;const a=n.querySelector(".card-modern.overflow-hidden"),r=Array.from(n.querySelectorAll('[data-commission-panel="true"], [data-reconciliation-panel="true"], [data-cost-center-panel="true"]'));if(!a||!r.length)return;const i=(d.financial||[]).filter(s=>s.status==="pending"&&s.dueDate&&s.dueDate<new Date().toISOString().slice(0,10)).length,u=(d.financial||[]).filter(s=>s.status==="pending").length,m=document.createElement("div");m.setAttribute("data-financial-fold","true"),m.className="mb-8",m.innerHTML=`
        <div class="card-modern p-4 border border-gray-100">
            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div>
                    <h3 class="font-black text-gray-800">Resumo ampliado</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Blocos secundarios do financeiro ficam recolhidos inicialmente para reduzir excesso visual.</p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <span class="badge ${i?"badge-red":"badge-gray"}">${i} vencido(s)</span>
                    <span class="badge badge-yellow">${u} pendente(s)</span>
                    <button onclick="window.toggleFinancialExpanded()" class="bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-black text-gray-700 hover:border-theme/30 hover:text-theme transition">
                        ${d.financialExpanded?"Recolher resumo":"Ver resumo ampliado"}
                    </button>
                </div>
            </div>
        </div>`;const b=document.createElement("div");b.className=d.financialExpanded?"mt-4 space-y-8":"hidden",b.setAttribute("data-financial-fold-body","true"),r.forEach(s=>b.appendChild(s)),m.appendChild(b),a.insertAdjacentElement("beforebegin",m),window.lucide&&window.lucide.createIcons()},window.wrapPermissionGuard("financial",["toggleCommissionStatus","openFinModal","saveFin","toggleFin","openReconcileModal","saveFinancialReconciliation","clearFinancialReconciliation","delFin"],"Sem permissao para operar o financeiro.")}export{Q as registerFinancial};

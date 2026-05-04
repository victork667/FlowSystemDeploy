function ke(se){const{state:d,db:x,appId:y,collection:S,addDoc:F,updateDoc:R,deleteDoc:N,doc:k,serverTimestamp:H}=se,g=()=>d.hrMonth||new Date().toISOString().slice(0,7),h=o=>{if(!o)return"-";const[e,a]=String(o).split("-").map(Number);return!e||!a?o:new Date(e,a-1,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})},le=o=>String(o||"").replace(/\D/g,""),p=o=>o?.name||o?.fullName||"Funcionario",ce=o=>[o.name,o.cpf,o.department,o.position,o.email,o.phone].map(e=>String(e||"").toLowerCase()).join(" "),J=o=>o.status==="discounted"?"badge-green":o.status==="cancelled"?"badge-red":"badge-yellow",me={vacation:"Ferias",absence:"Falta",overtime:"Hora Extra",bank_credit:"Banco de Horas (+)",bank_debit:"Banco de Horas (-)"},D=o=>me[o]||"Ocorrencia",W=(o,e=g())=>[...d.hrOccurrences||[]].filter(a=>a.employeeId===o&&a.status!=="cancelled"&&(!e||String(a.referenceMonth||a.date||"").startsWith(e))).sort((a,t)=>String(t.date||"").localeCompare(String(a.date||""))),pe=o=>(d.hrOccurrences||[]).filter(e=>e.employeeId===o&&e.status!=="cancelled").reduce((e,a)=>e+(a.type==="bank_credit"?window.toNumber(a.hours):a.type==="bank_debit"?-window.toNumber(a.hours):0),0),E=(o,e)=>{const a=window.toNumber(e.amount);if(a>0)return a;const t=window.toNumber(o.salary),n=t>0?t/220:0,i=t>0?t/30:0,r=window.toNumber(e.hours),s=window.toNumber(e.days);return e.type==="overtime"?n*r*1.5:e.type==="absence"||e.type==="vacation"?i*s:0},z=(o,e)=>{const a=window.toNumber(o.salary),t=window.toNumber(o.transportAllowance),n=window.toNumber(o.mealAllowance),i=window.toNumber(o.fixedBonus),r=window.toNumber(o.fixedDiscount),s=W(o.id,e),m=s.filter(l=>l.type==="overtime").reduce((l,w)=>l+E(o,w),0),u=s.filter(l=>l.type==="vacation").reduce((l,w)=>l+E(o,w),0),b=s.filter(l=>l.type==="absence").reduce((l,w)=>l+E(o,w),0),c=s.filter(l=>l.type==="overtime").reduce((l,w)=>l+window.toNumber(w.hours),0),f=s.filter(l=>l.type==="vacation").reduce((l,w)=>l+window.toNumber(w.days),0),A=s.filter(l=>l.type==="absence").reduce((l,w)=>l+window.toNumber(w.days),0),v=s.filter(l=>l.type==="bank_credit").reduce((l,w)=>l+window.toNumber(w.hours),0),$=s.filter(l=>l.type==="bank_debit").reduce((l,w)=>l+window.toNumber(w.hours),0),C=(d.hrAdvances||[]).filter(l=>l.employeeId===o.id&&l.status==="pending"&&(!l.referenceMonth||l.referenceMonth<=e)),j=C.reduce((l,w)=>l+window.toNumber(w.amount),0),B=a+t+n+i+m+u,T=r+j+b,P=Math.max(B-T,0);return{employeeId:o.id,employeeName:p(o),cpf:o.cpf||"",department:o.department||"",position:o.position||"",baseSalary:a,transportAllowance:t,mealAllowance:n,fixedBonus:i,fixedDiscount:r,overtimeAmount:m,vacationAmount:u,absenceAmount:b,overtimeHours:c,vacationDays:f,absenceDays:A,bankCreditHours:v,bankDebitHours:$,bankBalance:pe(o.id),advanceAmount:j,gross:B,deductions:T,net:P,occurrences:s.map(l=>({id:l.id,type:l.type,label:D(l.type),date:l.date||"",hours:window.toNumber(l.hours),days:window.toNumber(l.days),amount:E(o,l),note:l.note||""})),advances:C.map(l=>({id:l.id,date:l.date||"",amount:window.toNumber(l.amount),note:l.note||""}))}},_=o=>{const e=window.toNumber(d.settings?.hrAdvanceLimitPercent,40);return window.toNumber(o?.salary)*(e/100)},ue=()=>[...d.hrOccurrences||[]].filter(o=>o.type==="vacation"&&o.status!=="cancelled"&&String(o.date||"")>=new Date().toISOString().slice(0,10)).sort((o,e)=>String(o.date||"").localeCompare(String(e.date||""))),be=()=>[...d.hrEmployees||[]].filter(o=>o.terminationDate).sort((o,e)=>String(e.terminationDate||"").localeCompare(String(o.terminationDate||""))),ve=(o=g())=>(d.hrEmployees||[]).map(e=>{const t=(d.payrollRuns||[]).filter(m=>m.month===o).flatMap(m=>m.items||[]).find(m=>m.employeeId===e.id),n=(d.hrAdvances||[]).filter(m=>m.employeeId===e.id&&String(m.referenceMonth||"").startsWith(o)),i=W(e.id,o),r=i.filter(m=>m.type==="overtime").reduce((m,u)=>m+E(e,u),0),s=i.filter(m=>m.type==="absence").reduce((m,u)=>m+E(e,u),0);return{employee:e,payrollNet:window.toNumber(t?.net),payrollGross:window.toNumber(t?.gross),advances:n.reduce((m,u)=>m+window.toNumber(u.amount),0),overtimeCost:r,absenceCost:s,totalCost:window.toNumber(t?.gross)+window.toNumber(e.transportAllowance)+window.toNumber(e.mealAllowance)}}).filter(e=>e.payrollGross||e.advances||e.overtimeCost||e.absenceCost);window.setHrTab=o=>{const e={employees:"hr_employees",advances:"hr_advances",occurrences:"hr_occurrences",payroll:"hr_payroll",planning:"hr_planning",costs:"hr_costs"};d.hrTab=o,d.currentView=e[o]||"hr_employees";const a={employees:"RH · Funcionarios",advances:"RH · Vales",occurrences:"RH · Jornada",payroll:"RH · Folha",planning:"RH · Ferias / Rescisao",costs:"RH · Custos"},t=document.getElementById("page-title");t&&(t.innerText=a[o]||"RH"),window.renderNav?.(),window.renderHR()},window.setHrSearch=o=>{d.hrSearch=String(o||"").toLowerCase(),window.renderHR()},window.setHrMonth=o=>{d.hrMonth=o||g(),window.renderHR()},window.getFilteredHrEmployees=()=>{const o=String(d.hrSearch||"").toLowerCase();return[...d.hrEmployees||[]].filter(e=>!o||ce(e).includes(o)).sort((e,a)=>String(p(e)).localeCompare(String(p(a))))},window.getFilteredHrAdvances=()=>{const o=String(d.hrSearch||"").toLowerCase(),e=g();return[...d.hrAdvances||[]].filter(a=>{const t=(d.hrEmployees||[]).find(i=>i.id===a.employeeId),n=[a.note,a.referenceMonth,t?.name,t?.department].map(i=>String(i||"").toLowerCase()).join(" ");return(!o||n.includes(o))&&(!e||String(a.referenceMonth||"").startsWith(e))}).sort((a,t)=>String(t.date||"").localeCompare(String(a.date||"")))},window.getFilteredPayrollRuns=()=>{const o=g();return[...d.payrollRuns||[]].filter(e=>!o||String(e.month||"").startsWith(o)).sort((e,a)=>(a.createdAt?.seconds||0)-(e.createdAt?.seconds||0))},window.getFilteredHrOccurrences=()=>{const o=String(d.hrSearch||"").toLowerCase(),e=g();return[...d.hrOccurrences||[]].filter(a=>{const t=(d.hrEmployees||[]).find(i=>i.id===a.employeeId),n=[t?.name,t?.department,t?.position,a.note,D(a.type)].map(i=>String(i||"").toLowerCase()).join(" ");return(!o||n.includes(o))&&(!e||String(a.referenceMonth||a.date||"").startsWith(e))}).sort((a,t)=>String(t.date||"").localeCompare(String(a.date||"")))};const M=(o,e)=>`
        <details class="mobile-action-menu">
            <summary aria-label="Ações de ${window.escapeHtml(o)}"><i data-lucide="ellipsis"></i></summary>
            <div class="mobile-action-menu-panel">${e.join("")}</div>
        </details>
    `,I=(o,e,a,t=!1)=>`
        <button type="button" class="mobile-action-menu-item${t?" danger":""}" onclick="${a}; this.closest('details')?.removeAttribute('open');">
            <i data-lucide="${o}"></i><span>${window.escapeHtml(e)}</span>
        </button>
    `;window.renderHR=()=>{const o=document.getElementById("view-container");if(!o)return;const e=(d.hrEmployees||[]).filter(c=>c.status!=="inactive"),a=(d.hrAdvances||[]).filter(c=>c.status==="pending"),t=a.reduce((c,f)=>c+window.toNumber(f.amount),0),i=(window.getFilteredHrOccurrences?window.getFilteredHrOccurrences():[]).filter(c=>c.type==="overtime").reduce((c,f)=>c+window.toNumber(f.hours),0),s=e.map(c=>z(c,g())).reduce((c,f)=>c+f.net,0),m=[{id:"employees",label:"Funcionarios",icon:"users"},{id:"advances",label:"Vales",icon:"wallet-cards"},{id:"occurrences",label:"Jornada",icon:"clock-3"},{id:"payroll",label:"Folha",icon:"file-stack"},{id:"planning",label:"Ferias / Rescisao",icon:"plane-takeoff"},{id:"costs",label:"Custos",icon:"badge-dollar-sign"}];let u="";d.hrTab==="employees"?u=window.renderHrEmployeesTab():d.hrTab==="advances"?u=window.renderHrAdvancesTab():d.hrTab==="occurrences"?u=window.renderHrOccurrencesTab():d.hrTab==="planning"?u=window.renderHrPlanningTab():d.hrTab==="costs"?u=window.renderHrCostsTab():u=window.renderHrPayrollTab();const b=String(d.currentView||"").startsWith("hr_");o.innerHTML=`
            <div class="mb-8 rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl relative">
                <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,#f59e0b,transparent_30%),radial-gradient(circle_at_bottom_left,#22c55e,transparent_35%)]"></div>
                <div class="relative p-8 flex flex-col lg:flex-row justify-between gap-6">
                    <div>
                        <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50 mb-3">RH</p>
                        <h2 class="text-3xl md:text-4xl font-black tracking-tight">Pessoas, Vales e Folha</h2>
                        <p class="text-white/60 mt-3 max-w-2xl">Cadastro completo de funcionarios, lancamento de vales, geracao de folha e emissao de holerite com desconto automatico.</p>
                    </div>
                    <div class="hero-stats-row lg:max-w-[28rem]">
                        <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Funcionarios</p><p class="text-2xl font-black mt-1">${e.length}</p></div>
                        <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Vales pendentes</p><p class="text-2xl font-black mt-1">${window.formatCurrency(t)}</p></div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                ${window.dashCard("Equipe Ativa",e.length,"users-round","bg-blue-50 text-blue-600","Base de folha")}
                ${window.dashCard("Vales Pendentes",a.length,"wallet-cards","bg-amber-50 text-amber-600",window.formatCurrency(t))}
                ${window.dashCard("Folha Estimada",window.formatCurrency(s),"file-badge","bg-emerald-50 text-emerald-600",h(g()))}
                ${window.dashCard("Horas Extras",i.toFixed(1),"timer-reset","bg-violet-50 text-violet-600","No mês atual")}
            </div>

            <div class="flex flex-col lg:flex-row justify-between gap-4 mb-6">
                <div class="${b?"hidden":"ui-tab-row"}">
                    ${b?"":m.map(c=>`<button onclick="window.setHrTab('${c.id}')" class="${window.getUiTabClass(d.hrTab===c.id)}"><i data-lucide="${c.icon}" class="inline w-4 h-4"></i>${c.label}</button>`).join("")}
                </div>
                <div class="flex flex-col md:flex-row gap-2">
                    <input oninput="window.setHrSearch(this.value)" value="${window.escapeHtml(d.hrSearch||"")}" placeholder="Buscar nome, CPF, setor..." class="input-modern h-10 md:w-72 text-sm">
                    <input type="month" onchange="window.setHrMonth(this.value)" value="${window.escapeHtml(g())}" class="input-modern h-10 md:w-44 text-sm">
                </div>
            </div>

            ${u}
        `,window.lucide&&window.lucide.createIcons()},window.renderHrEmployeesTab=()=>{const o=window.getFilteredHrEmployees(),e=window.isCompactLayout?.(),a=o.map(t=>`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">Funcionário</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(p(t))}</h3>
                        <p class="mobile-record-subtitle">${window.escapeHtml(t.cpf||t.email||"-")}</p>
                    </div>
                    ${M("funcionário",[I("calculator","Calculadora de rescisão",`window.openHrTerminationCalculator('${t.id}')`),I("edit","Editar",`window.openHrEmployeeModal('${t.id}')`),I("trash-2","Excluir",`window.deleteHrEmployee('${t.id}')`,!0)])}
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Setor</p><p class="mobile-record-meta-value">${window.escapeHtml(t.department||"-")}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Cargo</p><p class="mobile-record-meta-value">${window.escapeHtml(t.position||"-")}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Salário</p><p class="mobile-record-meta-value">${window.formatCurrency(t.salary)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Benefícios</p><p class="mobile-record-meta-value">${window.formatCurrency(window.toNumber(t.transportAllowance)+window.toNumber(t.mealAllowance))}</p></div>
                </div>
                <div class="mobile-record-footer"><div class="mobile-record-status"><span class="badge ${t.status==="inactive"?"badge-red":"badge-green"}">${t.status==="inactive"?"Inativo":"Ativo"}</span></div></div>
            </div>
        `).join("");return`
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-3">
                    <div>
                        <h3 class="font-black text-gray-800">Cadastro de Funcionarios</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">${o.length} registro(s) encontrados</p>
                    </div>
                    <button onclick="window.openHrEmployeeModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="user-round-plus" class="w-4 h-4 mr-2"></i> Funcionario</button>
                </div>
                ${e?`<div class="mobile-list-stack p-4">${a||'<div class="card-modern p-6 text-center text-gray-400">Nenhum funcionário cadastrado.</div>'}</div>`:`<div class="overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[1160px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                            <tr>
                                <th class="p-4">Funcionario</th>
                                <th class="p-4">Setor / Cargo</th>
                                <th class="p-4">Admissao</th>
                                <th class="p-4 text-right">Salario</th>
                                <th class="p-4 text-right">Beneficios</th>
                                <th class="p-4 text-center">Status</th>
                                <th class="p-4 text-right">Acoes</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${o.map(t=>`
                                <tr class="hover:bg-gray-50 transition">
                                    <td class="p-4">
                                        <div class="font-black text-gray-800">${window.escapeHtml(p(t))}</div>
                                        <div class="text-xs text-gray-400 font-bold">${window.escapeHtml(t.cpf||t.email||"-")}</div>
                                    </td>
                                    <td class="p-4"><div class="font-bold text-gray-700">${window.escapeHtml(t.department||"-")}</div><div class="text-xs text-gray-400">${window.escapeHtml(t.position||"-")}</div></td>
                                    <td class="p-4 text-gray-600 font-bold">${window.formatDate(t.admissionDate)}</td>
                                    <td class="p-4 text-right font-black text-theme">${window.formatCurrency(t.salary)}</td>
                                    <td class="p-4 text-right text-gray-600 font-bold">${window.formatCurrency(window.toNumber(t.transportAllowance)+window.toNumber(t.mealAllowance))}</td>
                                    <td class="p-4 text-center"><span class="badge ${t.status==="inactive"?"badge-red":"badge-green"}">${t.status==="inactive"?"Inativo":"Ativo"}</span></td>
                                    <td class="p-4 text-right"><div class="flex justify-end gap-1"><button onclick="window.openHrTerminationCalculator('${t.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition" title="Calculadora de rescisao"><i data-lucide="calculator" class="w-4 h-4"></i></button><button onclick="window.openHrEmployeeModal('${t.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.deleteHrEmployee('${t.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></td>
                                </tr>
                            `).join("")||'<tr><td colspan="7" class="p-8 text-center text-gray-400">Nenhum funcionario cadastrado.</td></tr>'}
                        </tbody>
                    </table>
                </div>`}
            </div>
        `},window.renderHrAdvancesTab=()=>{const o=window.getFilteredHrAdvances(),e=window.isCompactLayout?.(),a=o.map(t=>{const n=(d.hrEmployees||[]).find(i=>i.id===t.employeeId);return`
                <div class="mobile-record-card">
                    <div class="mobile-record-head">
                        <div class="min-w-0 flex-1">
                            <p class="mobile-record-kicker">Vale</p>
                            <h3 class="mobile-record-title">${window.escapeHtml(p(n))}</h3>
                            <p class="mobile-record-subtitle">${window.escapeHtml(h(t.referenceMonth))}</p>
                        </div>
                        ${M("vale",[...t.status==="pending"?[I("edit","Editar",`window.openHrAdvanceModal('${t.id}')`),I("trash-2","Excluir",`window.deleteHrAdvance('${t.id}')`,!0)]:[]])}
                    </div>
                    <div class="mobile-record-grid">
                        <div class="mobile-record-meta"><p class="mobile-record-meta-label">Data</p><p class="mobile-record-meta-value">${window.formatDate(t.date)}</p></div>
                        <div class="mobile-record-meta"><p class="mobile-record-meta-label">Valor</p><p class="mobile-record-meta-value">${window.formatCurrency(t.amount)}</p></div>
                    </div>
                    <div class="mobile-record-footer">
                        <div class="mobile-record-status">
                            <span class="badge ${J(t)}">${t.status==="discounted"?"Descontado":t.status==="cancelled"?"Cancelado":"Pendente"}</span>
                        </div>
                    </div>
                </div>`}).join("");return`
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-3">
                    <div>
                        <h3 class="font-black text-gray-800">Vales e Adiantamentos</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">${o.length} vale(s) no mes ${h(g())}</p>
                    </div>
                    <button onclick="window.openHrAdvanceModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="badge-plus" class="w-4 h-4 mr-2"></i> Novo Vale</button>
                </div>
                ${e?`<div class="mobile-list-stack p-4">${a||'<div class="card-modern p-6 text-center text-gray-400">Nenhum vale encontrado para o período.</div>'}</div>`:`<div class="overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[980px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                            <tr>
                                <th class="p-4">Funcionario</th>
                                <th class="p-4">Data</th>
                                <th class="p-4">Referencia</th>
                                <th class="p-4">Observacao</th>
                                <th class="p-4 text-right">Valor</th>
                                <th class="p-4 text-center">Status</th>
                                <th class="p-4 text-right">Acoes</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${o.map(t=>{const n=(d.hrEmployees||[]).find(i=>i.id===t.employeeId);return`
                                    <tr class="hover:bg-gray-50 transition">
                                        <td class="p-4 font-black text-gray-800">${window.escapeHtml(p(n))}</td>
                                        <td class="p-4 text-gray-600 font-bold">${window.formatDate(t.date)}</td>
                                        <td class="p-4 text-gray-600 font-bold">${window.escapeHtml(h(t.referenceMonth))}</td>
                                        <td class="p-4 text-gray-500">${window.escapeHtml(t.note||"-")}</td>
                                        <td class="p-4 text-right font-black text-amber-600">${window.formatCurrency(t.amount)}</td>
                                        <td class="p-4 text-center"><span class="badge ${J(t)}">${t.status==="discounted"?"Descontado":t.status==="cancelled"?"Cancelado":"Pendente"}</span></td>
                                        <td class="p-4 text-right"><div class="flex justify-end gap-1">${t.status==="pending"?`<button onclick="window.openHrAdvanceModal('${t.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.deleteHrAdvance('${t.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>`:""}</div></td>
                                    </tr>
                                `}).join("")||'<tr><td colspan="7" class="p-8 text-center text-gray-400">Nenhum vale encontrado para o periodo.</td></tr>'}
                        </tbody>
                    </table>
                </div>`}
            </div>
        `},window.renderHrOccurrencesTab=()=>{const o=window.getFilteredHrOccurrences(),e=window.isCompactLayout?.(),a=o.filter(r=>r.type==="overtime").reduce((r,s)=>r+window.toNumber(s.hours),0),t=o.filter(r=>r.type==="vacation").reduce((r,s)=>r+window.toNumber(s.days),0),n=o.filter(r=>r.type==="absence").reduce((r,s)=>r+window.toNumber(s.days),0),i=o.map(r=>{const s=(d.hrEmployees||[]).find(u=>u.id===r.employeeId),m=E(s||{},r);return`
                <div class="mobile-record-card">
                    <div class="mobile-record-head">
                        <div class="min-w-0 flex-1">
                            <p class="mobile-record-kicker">${window.escapeHtml(D(r.type))}</p>
                            <h3 class="mobile-record-title">${window.escapeHtml(p(s))}</h3>
                            <p class="mobile-record-subtitle">${window.escapeHtml(r.note||s?.department||"-")}</p>
                        </div>
                        ${M("ocorrência",[I("edit","Editar",`window.openHrOccurrenceModal('${r.id}')`),I("trash-2","Excluir",`window.deleteHrOccurrence('${r.id}')`,!0)])}
                    </div>
                    <div class="mobile-record-grid">
                        <div class="mobile-record-meta"><p class="mobile-record-meta-label">Data</p><p class="mobile-record-meta-value">${window.formatDate(r.date)}</p></div>
                        <div class="mobile-record-meta"><p class="mobile-record-meta-label">Horas</p><p class="mobile-record-meta-value">${window.toNumber(r.hours).toFixed(1)}</p></div>
                        <div class="mobile-record-meta"><p class="mobile-record-meta-label">Dias</p><p class="mobile-record-meta-value">${window.toNumber(r.days)}</p></div>
                        <div class="mobile-record-meta"><p class="mobile-record-meta-label">Impacto</p><p class="mobile-record-meta-value">${window.formatCurrency(m)}</p></div>
                    </div>
                </div>`}).join("");return`
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="rounded-2xl border border-violet-100 bg-violet-50 p-5"><p class="text-[10px] uppercase font-black text-violet-500">Horas extras</p><p class="text-2xl font-black text-violet-700 mt-2">${a.toFixed(1)}h</p></div>
                    <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><p class="text-[10px] uppercase font-black text-emerald-500">Férias</p><p class="text-2xl font-black text-emerald-700 mt-2">${t} dia(s)</p></div>
                    <div class="rounded-2xl border border-red-100 bg-red-50 p-5"><p class="text-[10px] uppercase font-black text-red-500">Faltas</p><p class="text-2xl font-black text-red-700 mt-2">${n} dia(s)</p></div>
                </div>
                <div class="card-modern overflow-hidden">
                    <div class="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-3">
                        <div>
                            <h3 class="font-black text-gray-800">Férias, Faltas, Horas Extras e Banco</h3>
                            <p class="text-xs text-gray-400 font-bold mt-1">${o.length} ocorrência(s) em ${h(g())}</p>
                        </div>
                        <button onclick="window.openHrOccurrenceModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="calendar-plus-2" class="w-4 h-4 mr-2"></i> Nova Ocorrência</button>
                    </div>
                    ${e?`<div class="mobile-list-stack p-4">${i||'<div class="card-modern p-6 text-center text-gray-400">Nenhuma ocorrência lançada para o período.</div>'}</div>`:`<div class="overflow-x-auto">
                        <table class="w-full text-left text-sm min-w-[1180px]">
                            <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                                <tr>
                                    <th class="p-4">Funcionario</th>
                                    <th class="p-4">Tipo</th>
                                    <th class="p-4">Data</th>
                                    <th class="p-4 text-right">Horas</th>
                                    <th class="p-4 text-right">Dias</th>
                                    <th class="p-4 text-right">Impacto</th>
                                    <th class="p-4">Observacao</th>
                                    <th class="p-4 text-right">Acoes</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${o.map(r=>{const s=(d.hrEmployees||[]).find(u=>u.id===r.employeeId),m=E(s||{},r);return`<tr class="hover:bg-gray-50 transition"><td class="p-4"><div class="font-black text-gray-800">${window.escapeHtml(p(s))}</div><div class="text-xs text-gray-400 font-bold">${window.escapeHtml(s?.department||"-")}</div></td><td class="p-4"><span class="badge ${r.type==="absence"?"badge-red":r.type==="vacation"?"badge-green":r.type==="overtime"?"badge-purple":"badge-blue"}">${window.escapeHtml(D(r.type))}</span></td><td class="p-4 text-gray-600 font-bold">${window.formatDate(r.date)}</td><td class="p-4 text-right font-bold text-gray-700">${window.toNumber(r.hours).toFixed(1)}</td><td class="p-4 text-right font-bold text-gray-700">${window.toNumber(r.days)}</td><td class="p-4 text-right font-black ${r.type==="absence"?"text-red-500":"text-emerald-600"}">${window.formatCurrency(m)}</td><td class="p-4 text-gray-500">${window.escapeHtml(r.note||"-")}</td><td class="p-4 text-right"><div class="flex justify-end gap-1"><button onclick="window.openHrOccurrenceModal('${r.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.deleteHrOccurrence('${r.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></td></tr>`}).join("")||'<tr><td colspan="8" class="p-8 text-center text-gray-400">Nenhuma ocorrência lançada para o período.</td></tr>'}
                            </tbody>
                        </table>
                    </div>`}
                </div>
            </div>
        `},window.renderHrPlanningTab=()=>{const o=ue(),e=be();return`
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="card-modern overflow-hidden">
                    <div class="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center gap-3">
                        <div>
                            <h3 class="font-black text-gray-800">Ferias Programadas</h3>
                            <p class="text-xs text-gray-400 font-bold mt-1">${o.length} programacao(oes) futuras</p>
                        </div>
                        <button onclick="window.openHrOccurrenceModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center"><i data-lucide="calendar-plus-2" class="w-4 h-4 mr-2"></i> Nova Programacao</button>
                    </div>
                    <div class="divide-y divide-gray-100">
                        ${o.map(a=>{const t=(d.hrEmployees||[]).find(n=>n.id===a.employeeId);return`<div class="p-4 flex flex-col md:flex-row justify-between gap-4"><div><p class="font-black text-gray-800">${window.escapeHtml(p(t))}</p><p class="text-xs text-gray-400 font-bold mt-1">${window.formatDate(a.date)} · ${window.toNumber(a.days)} dia(s)</p><p class="text-xs text-gray-500 mt-2">${window.escapeHtml(a.note||"Sem observacao")}</p></div><button onclick="window.openHrOccurrenceModal('${a.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition self-start"><i data-lucide="edit" class="w-4 h-4"></i></button></div>`}).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Nenhuma ferias programada.</div>'}
                    </div>
                </div>
                <div class="card-modern overflow-hidden">
                    <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 class="font-black text-gray-800">Rescisoes Registradas</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">${e.length} colaborador(es) com encerramento registrado</p>
                    </div>
                    <div class="divide-y divide-gray-100">
                        ${e.map(a=>`<div class="p-4 flex flex-col md:flex-row justify-between gap-4"><div><p class="font-black text-gray-800">${window.escapeHtml(p(a))}</p><p class="text-xs text-gray-400 font-bold mt-1">${window.escapeHtml(a.department||"-")} · ${window.escapeHtml(a.position||"-")}</p><p class="text-xs text-red-500 font-bold mt-2">Rescisao ${window.formatDate(a.terminationDate)} · ${window.formatCurrency(a.terminationCost)}</p><p class="text-xs text-gray-500 mt-1">${window.escapeHtml(a.terminationReason||"Sem motivo informado")}</p></div><button onclick="window.openHrEmployeeModal('${a.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition self-start"><i data-lucide="edit" class="w-4 h-4"></i></button></div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Nenhuma rescisao registrada.</div>'}
                    </div>
                </div>
            </div>
        `},window.renderHrCostsTab=()=>{const o=ve(),e=window.isCompactLayout?.(),a=o.reduce((n,i)=>n+i.totalCost,0),t=o.map(n=>`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">Custo</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(p(n.employee))}</h3>
                        <p class="mobile-record-subtitle">${window.escapeHtml(n.employee.department||"-")} · ${window.escapeHtml(n.employee.position||"-")}</p>
                    </div>
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Bruto</p><p class="mobile-record-meta-value">${window.formatCurrency(n.payrollGross)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Líquido</p><p class="mobile-record-meta-value">${window.formatCurrency(n.payrollNet)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Vales</p><p class="mobile-record-meta-value">${window.formatCurrency(n.advances)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Custo total</p><p class="mobile-record-meta-value">${window.formatCurrency(n.totalCost)}</p></div>
                </div>
            </div>
        `).join("");return`
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p class="text-[10px] uppercase font-black text-blue-500">Colaboradores com custo</p><p class="text-2xl font-black text-blue-700 mt-2">${o.length}</p></div>
                    <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><p class="text-[10px] uppercase font-black text-emerald-500">Custo bruto</p><p class="text-2xl font-black text-emerald-700 mt-2">${window.formatCurrency(a)}</p></div>
                    <div class="rounded-2xl border border-amber-100 bg-amber-50 p-5"><p class="text-[10px] uppercase font-black text-amber-500">Vales no mes</p><p class="text-2xl font-black text-amber-700 mt-2">${window.formatCurrency(o.reduce((n,i)=>n+i.advances,0))}</p></div>
                    <div class="rounded-2xl border border-violet-100 bg-violet-50 p-5"><p class="text-[10px] uppercase font-black text-violet-500">Horas extras</p><p class="text-2xl font-black text-violet-700 mt-2">${window.formatCurrency(o.reduce((n,i)=>n+i.overtimeCost,0))}</p></div>
                </div>
                <div class="card-modern overflow-hidden">
                    <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 class="font-black text-gray-800">Relatorio de custo por colaborador</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">Competencia ${h(g())}</p>
                    </div>
                    ${e?`<div class="mobile-list-stack p-4">${t||'<div class="card-modern p-6 text-center text-gray-400">Sem custos registrados para a competência.</div>'}</div>`:`<div class="overflow-x-auto">
                        <table class="w-full text-left text-sm min-w-[1080px]">
                            <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                                <tr>
                                    <th class="p-4">Funcionario</th>
                                    <th class="p-4 text-right">Bruto</th>
                                    <th class="p-4 text-right">Liquido</th>
                                    <th class="p-4 text-right">Vales</th>
                                    <th class="p-4 text-right">Hora Extra</th>
                                    <th class="p-4 text-right">Faltas</th>
                                    <th class="p-4 text-right">Custo Total</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${o.map(n=>`<tr class="hover:bg-gray-50 transition"><td class="p-4"><div class="font-black text-gray-800">${window.escapeHtml(p(n.employee))}</div><div class="text-xs text-gray-400 font-bold">${window.escapeHtml(n.employee.department||"-")} · ${window.escapeHtml(n.employee.position||"-")}</div></td><td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(n.payrollGross)}</td><td class="p-4 text-right font-bold text-emerald-600">${window.formatCurrency(n.payrollNet)}</td><td class="p-4 text-right font-bold text-amber-600">${window.formatCurrency(n.advances)}</td><td class="p-4 text-right font-bold text-violet-600">${window.formatCurrency(n.overtimeCost)}</td><td class="p-4 text-right font-bold text-red-500">${window.formatCurrency(n.absenceCost)}</td><td class="p-4 text-right font-black text-theme">${window.formatCurrency(n.totalCost)}</td></tr>`).join("")||'<tr><td colspan="7" class="p-8 text-center text-gray-400">Sem custos registrados para a competencia.</td></tr>'}
                            </tbody>
                        </table>
                    </div>`}
                </div>
            </div>
        `},window.renderHrPayrollTab=()=>{const o=window.getFilteredPayrollRuns(),e=window.isCompactLayout?.(),a=o.map(t=>`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">Folha</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(h(t.month))}</h3>
                        <p class="mobile-record-subtitle">Pagamento em ${window.formatDate(t.payDate)}</p>
                    </div>
                    ${M("folha",[I("eye","Visualizar",`window.viewPayrollRun('${t.id}')`),I("trash-2","Excluir",`window.deletePayrollRun('${t.id}')`,!0)])}
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Funcionários</p><p class="mobile-record-meta-value">${window.toNumber(t.employeeCount)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Bruto</p><p class="mobile-record-meta-value">${window.formatCurrency(t.totalGross)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Descontos</p><p class="mobile-record-meta-value">${window.formatCurrency(t.totalDeductions)}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Líquido</p><p class="mobile-record-meta-value">${window.formatCurrency(t.totalNet)}</p></div>
                </div>
            </div>
        `).join("");return`
            <div class="space-y-6">
                <div class="card-modern p-5 border border-gray-100">
                    <div class="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <h3 class="font-black text-gray-800">Folha de Pagamento</h3>
                            <p class="text-xs text-gray-400 font-bold mt-1">Gere a folha por competencia e desconte automaticamente os vales pendentes.</p>
                        </div>
                        <button onclick="window.openPayrollRunModal()" class="btn-gradient px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center shrink-0"><i data-lucide="receipt-text" class="w-4 h-4 mr-2"></i> Gerar Folha</button>
                    </div>
                </div>
                <div class="card-modern overflow-hidden">
                    <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 class="font-black text-gray-800">Folhas Geradas</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">${o.length} folha(s) para ${h(g())}</p>
                    </div>
                    ${e?`<div class="mobile-list-stack p-4">${a||'<div class="card-modern p-6 text-center text-gray-400">Nenhuma folha gerada para a competência selecionada.</div>'}</div>`:`<div class="overflow-x-auto">
                        <table class="w-full text-left text-sm min-w-[940px]">
                            <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                                <tr>
                                    <th class="p-4">Competencia</th>
                                    <th class="p-4">Pagamento</th>
                                    <th class="p-4 text-right">Funcionarios</th>
                                    <th class="p-4 text-right">Bruto</th>
                                    <th class="p-4 text-right">Descontos</th>
                                    <th class="p-4 text-right">Liquido</th>
                                    <th class="p-4 text-right">Acoes</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${o.map(t=>`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-black text-gray-800">${window.escapeHtml(h(t.month))}</td><td class="p-4 text-gray-600 font-bold">${window.formatDate(t.payDate)}</td><td class="p-4 text-right font-bold text-gray-700">${window.toNumber(t.employeeCount)}</td><td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(t.totalGross)}</td><td class="p-4 text-right font-bold text-red-500">${window.formatCurrency(t.totalDeductions)}</td><td class="p-4 text-right font-black text-theme">${window.formatCurrency(t.totalNet)}</td><td class="p-4 text-right"><div class="flex justify-end gap-1"><button onclick="window.viewPayrollRun('${t.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"><i data-lucide="eye" class="w-4 h-4"></i></button><button onclick="window.deletePayrollRun('${t.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></td></tr>`).join("")||'<tr><td colspan="7" class="p-8 text-center text-gray-400">Nenhuma folha gerada para a competencia selecionada.</td></tr>'}
                            </tbody>
                        </table>
                    </div>`}
                </div>
            </div>
        `},window.syncHrProfileToForm=o=>{const e=d.profiles.find(n=>n.id===o);if(!e)return;const a=document.getElementById("hr-name"),t=document.getElementById("hr-email");a&&!a.value&&(a.value=e.name||""),t&&!t.value&&(t.value=e.email||"")},window.openHrEmployeeModal=(o="")=>{const e=(d.hrEmployees||[]).find(a=>a.id===o)||{};document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto m-4">
                    <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-black text-gray-800">${o?"Editar Funcionario":"Funcionario"}</h3>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <input type="hidden" id="hr-id" value="${window.escapeHtml(e.id||"")}">
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Vinculo com acesso ao sistema</label>
                                <select id="hr-profile-id" onchange="window.syncHrProfileToForm(this.value)" class="input-modern">
                                    <option value="">Sem vinculo</option>
                                    ${d.profiles.map(a=>`<option value="${a.id}" ${e.linkedProfileId===a.id?"selected":""}>${window.escapeHtml(a.name||a.email||a.id)}</option>`).join("")}
                                </select>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome completo</label><input id="hr-name" class="input-modern" value="${window.escapeHtml(e.name||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">CPF</label><input id="hr-cpf" class="input-modern" value="${window.escapeHtml(e.cpf||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nascimento</label><input id="hr-birth-date" type="date" class="input-modern" value="${window.escapeHtml(e.birthDate||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Admissao</label><input id="hr-admission-date" type="date" class="input-modern" value="${window.escapeHtml(e.admissionDate||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Telefone</label><input id="hr-phone" class="input-modern" value="${window.escapeHtml(e.phone||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label><input id="hr-email" type="email" class="input-modern" value="${window.escapeHtml(e.email||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Setor</label><input id="hr-department" class="input-modern" value="${window.escapeHtml(e.department||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Cargo</label><input id="hr-position" class="input-modern" value="${window.escapeHtml(e.position||"")}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Regime</label><select id="hr-employment-regime" class="input-modern"><option value="clt" ${!e.employmentRegime||e.employmentRegime==="clt"?"selected":""}>Registrado CLT</option><option value="informal" ${e.employmentRegime==="informal"?"selected":""}>Sem registro</option><option value="pj" ${e.employmentRegime==="pj"?"selected":""}>PJ / Prestador</option></select></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Valor contrato PJ</label><input id="hr-contract-value" type="number" class="input-modern" value="${window.toNumber(e.contractMonthlyValue||e.salary)}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Jornada</label><input id="hr-work-schedule" class="input-modern" value="${window.escapeHtml(e.workSchedule||"")}" placeholder="Ex: Seg-Sex 08:00-18:00"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Status</label><select id="hr-status" class="input-modern"><option value="active" ${e.status!=="inactive"?"selected":""}>Ativo</option><option value="inactive" ${e.status==="inactive"?"selected":""}>Inativo</option></select></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Saldo de ferias (dias)</label><input id="hr-vacation-balance" type="number" class="input-modern" value="${window.toNumber(e.vacationBalanceDays,30)}"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Limite de vale sugerido</label><input id="hr-advance-limit" type="number" class="input-modern" value="${window.toNumber(e.advanceLimit||_(e))}"></div>
                            </div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Endereco</label><textarea id="hr-address" class="input-modern h-24">${window.escapeHtml(e.address||"")}</textarea></div>
                        </div>
                        <div class="space-y-4">
                            <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                                <h4 class="font-black text-emerald-800 mb-4">Dados salariais</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Salario base</label><input id="hr-salary" type="number" class="input-modern" value="${window.toNumber(e.salary)}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de salario</label><select id="hr-salary-type" class="input-modern"><option value="monthly" ${e.salaryType!=="daily"?"selected":""}>Mensal</option><option value="daily" ${e.salaryType==="daily"?"selected":""}>Diario</option></select></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Vale transporte</label><input id="hr-transport" type="number" class="input-modern" value="${window.toNumber(e.transportAllowance)}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Vale alimentacao</label><input id="hr-meal" type="number" class="input-modern" value="${window.toNumber(e.mealAllowance)}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Provento fixo</label><input id="hr-bonus" type="number" class="input-modern" value="${window.toNumber(e.fixedBonus)}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Desconto fixo</label><input id="hr-discount" type="number" class="input-modern" value="${window.toNumber(e.fixedDiscount)}"></div>
                                </div>
                            </div>
                            <div class="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                                <h4 class="font-black text-blue-800 mb-4">Dados bancarios</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Banco</label><input id="hr-bank-name" class="input-modern" value="${window.escapeHtml(e.bankName||"")}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Agencia</label><input id="hr-bank-agency" class="input-modern" value="${window.escapeHtml(e.bankAgency||"")}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Conta</label><input id="hr-bank-account" class="input-modern" value="${window.escapeHtml(e.bankAccount||"")}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">PIX</label><input id="hr-pix-key" class="input-modern" value="${window.escapeHtml(e.pixKey||"")}"></div>
                                </div>
                            </div>
                            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacoes internas</label>
                                <textarea id="hr-notes" class="input-modern h-28">${window.escapeHtml(e.notes||"")}</textarea>
                            </div>
                            <div class="rounded-2xl border border-red-100 bg-red-50 p-5">
                                <h4 class="font-black text-red-800 mb-4">Rescisao</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data da rescisao</label><input id="hr-termination-date" type="date" class="input-modern" value="${window.escapeHtml(e.terminationDate||"")}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Custo da rescisao</label><input id="hr-termination-cost" type="number" class="input-modern" value="${window.toNumber(e.terminationCost)}"></div>
                                    <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Motivo / observacao</label><textarea id="hr-termination-reason" class="input-modern h-24">${window.escapeHtml(e.terminationReason||"")}</textarea></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-5 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                        ${o?`<button onclick="window.openHrTerminationCalculator('${e.id}')" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-lg font-bold shadow-lg transition">Calcular Rescisao</button>`:""}
                        <button onclick="window.saveHrEmployee()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Funcionario</button>
                    </div>
                </div>
            </div>
        `},window.saveHrEmployee=async()=>window.withActionLock("save-hr-employee",async()=>{const o=document.getElementById("modal-container");window.toggleActionButtons(o,!0,"Salvando...");const e={linkedProfileId:document.getElementById("hr-profile-id")?.value||"",name:document.getElementById("hr-name")?.value||"",cpf:le(document.getElementById("hr-cpf")?.value),birthDate:document.getElementById("hr-birth-date")?.value||"",admissionDate:document.getElementById("hr-admission-date")?.value||"",phone:document.getElementById("hr-phone")?.value||"",email:document.getElementById("hr-email")?.value||"",department:document.getElementById("hr-department")?.value||"",position:document.getElementById("hr-position")?.value||"",employmentRegime:document.getElementById("hr-employment-regime")?.value||"clt",contractMonthlyValue:window.toNumber(document.getElementById("hr-contract-value")?.value),workSchedule:document.getElementById("hr-work-schedule")?.value||"",address:document.getElementById("hr-address")?.value||"",status:document.getElementById("hr-status")?.value||"active",vacationBalanceDays:window.toNumber(document.getElementById("hr-vacation-balance")?.value,30),advanceLimit:window.toNumber(document.getElementById("hr-advance-limit")?.value),salary:window.toNumber(document.getElementById("hr-salary")?.value),salaryType:document.getElementById("hr-salary-type")?.value||"monthly",transportAllowance:window.toNumber(document.getElementById("hr-transport")?.value),mealAllowance:window.toNumber(document.getElementById("hr-meal")?.value),fixedBonus:window.toNumber(document.getElementById("hr-bonus")?.value),fixedDiscount:window.toNumber(document.getElementById("hr-discount")?.value),bankName:document.getElementById("hr-bank-name")?.value||"",bankAgency:document.getElementById("hr-bank-agency")?.value||"",bankAccount:document.getElementById("hr-bank-account")?.value||"",pixKey:document.getElementById("hr-pix-key")?.value||"",notes:document.getElementById("hr-notes")?.value||"",terminationDate:document.getElementById("hr-termination-date")?.value||"",terminationCost:window.toNumber(document.getElementById("hr-termination-cost")?.value),terminationReason:document.getElementById("hr-termination-reason")?.value||"",companyId:d.companyId,updatedAt:H()};if(!e.name.trim())return window.customAlert("Informe o nome do funcionario.");if(!e.admissionDate)return window.customAlert("Informe a data de admissao.");e.terminationDate&&!e.terminationReason&&(e.terminationReason="Rescisao registrada no RH"),e.terminationDate&&(e.status="inactive");const a=document.getElementById("hr-id")?.value||"";try{a?await R(k(x,"artifacts",y,"public","data","hr_employees",a),e):await F(S(x,"artifacts",y,"public","data","hr_employees"),{...e,createdAt:H()}),document.getElementById("modal-container").innerHTML="",window.logAudit("RH_FUNCIONARIO",`Funcionario ${e.name} salvo no RH.`)}catch(t){window.customAlert("Erro ao salvar funcionario: "+t.message)}finally{window.toggleActionButtons(o,!1)}}),window.deleteHrEmployee=async o=>{const e=(d.hrEmployees||[]).find(a=>a.id===o);if(e&&await window.customConfirm(`Excluir o funcionario "${p(e)}"?`))try{await N(k(x,"artifacts",y,"public","data","hr_employees",o)),window.logAudit("RH_FUNCIONARIO",`Funcionario ${p(e)} removido do RH.`)}catch(a){window.customAlert("Erro ao excluir funcionario: "+a.message)}},window.openHrAdvanceModal=(o="")=>{const e=(d.hrAdvances||[]).find(i=>i.id===o)||{},a=(d.hrEmployees||[]).filter(i=>i.status!=="inactive").sort((i,r)=>String(p(i)).localeCompare(String(p(r)))),t=a.find(i=>i.id===e.employeeId)||a[0],n=_(t);if(!a.length){window.customAlert("Cadastre pelo menos um funcionario ativo antes de lancar um vale.");return}document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-black text-gray-800">${o?"Editar Vale":"Vale / Adiantamento"}</h3>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="space-y-4">
                        <input type="hidden" id="hr-advance-id" value="${window.escapeHtml(e.id||"")}">
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Funcionario</label>
                            <select id="hr-advance-employee" class="input-modern">
                                ${a.map(i=>`<option value="${i.id}" ${e.employeeId===i.id?"selected":""}>${window.escapeHtml(p(i))} ${i.department?`· ${window.escapeHtml(i.department)}`:""}</option>`).join("")}
                            </select>
                            <p class="text-[11px] text-amber-600 font-bold mt-2">Limite sugerido para adiantamento: ${window.formatCurrency(n)}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data do vale</label><input id="hr-advance-date" type="date" class="input-modern" value="${window.escapeHtml(e.date||new Date().toISOString().slice(0,10))}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Competencia do desconto</label><input id="hr-advance-month" type="month" class="input-modern" value="${window.escapeHtml(e.referenceMonth||g())}"></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Valor</label><input id="hr-advance-amount" type="number" min="0" step="0.01" class="input-modern" value="${window.toNumber(e.amount)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo</label><select id="hr-advance-type" class="input-modern"><option value="vale" ${e.type!=="adiantamento"?"selected":""}>Vale</option><option value="adiantamento" ${e.type==="adiantamento"?"selected":""}>Adiantamento</option></select></div>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacao</label>
                            <textarea id="hr-advance-note" class="input-modern h-28" placeholder="Motivo, observacoes ou referencia interna">${window.escapeHtml(e.note||"")}</textarea>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-end gap-3">
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                        <button onclick="window.saveHrAdvance()" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg">Salvar Vale</button>
                    </div>
                </div>
            </div>
        `,window.lucide&&window.lucide.createIcons()},window.saveHrAdvance=async()=>window.withActionLock("save-hr-advance",async()=>{const o=document.getElementById("modal-container");window.toggleActionButtons(o,!0,"Salvando...");const e=document.getElementById("hr-advance-employee")?.value||"",a=window.toNumber(document.getElementById("hr-advance-amount")?.value),t={employeeId:e,date:document.getElementById("hr-advance-date")?.value||new Date().toISOString().slice(0,10),referenceMonth:document.getElementById("hr-advance-month")?.value||g(),amount:a,type:document.getElementById("hr-advance-type")?.value||"vale",note:document.getElementById("hr-advance-note")?.value||"",status:"pending",companyId:d.companyId,updatedAt:H()},n=(d.hrEmployees||[]).find(s=>s.id===e);if(!n)return window.customAlert("Selecione um funcionario valido.");if(a<=0)return window.customAlert("Informe um valor maior que zero para o vale.");const i=window.toNumber(n.advanceLimit||_(n));if(i>0&&a>i&&!await window.customConfirm(`O valor informado ultrapassa o limite sugerido de ${window.formatCurrency(i)}. Deseja continuar mesmo assim?`))return;const r=document.getElementById("hr-advance-id")?.value||"";try{if(r){if((d.hrAdvances||[]).find(m=>m.id===r)?.status==="discounted")return window.customAlert("Este vale ja foi descontado em folha e nao pode ser alterado.");await R(k(x,"artifacts",y,"public","data","hr_advances",r),t)}else await F(S(x,"artifacts",y,"public","data","hr_advances"),{...t,createdAt:H()});document.getElementById("modal-container").innerHTML="",window.logAudit("RH_VALE",`Vale de ${window.formatCurrency(a)} salvo para ${p(n)}.`)}catch(s){window.customAlert("Erro ao salvar vale: "+s.message)}finally{window.toggleActionButtons(o,!1)}}),window.deleteHrAdvance=async o=>{const e=(d.hrAdvances||[]).find(t=>t.id===o);if(!e)return;if(e.status==="discounted")return window.customAlert("Este vale ja foi descontado na folha e nao pode ser excluido.");const a=(d.hrEmployees||[]).find(t=>t.id===e.employeeId);if(await window.customConfirm(`Excluir o vale de ${window.formatCurrency(e.amount)} para ${p(a)}?`))try{await N(k(x,"artifacts",y,"public","data","hr_advances",o)),window.logAudit("RH_VALE",`Vale de ${window.formatCurrency(e.amount)} removido para ${p(a)}.`)}catch(t){window.customAlert("Erro ao excluir vale: "+t.message)}},window.openHrOccurrenceModal=(o="")=>{const e=(d.hrOccurrences||[]).find(t=>t.id===o)||{},a=(d.hrEmployees||[]).filter(t=>t.status!=="inactive").sort((t,n)=>String(p(t)).localeCompare(String(p(n))));if(!a.length)return window.customAlert("Cadastre pelo menos um funcionario ativo antes de lançar ocorrências.");document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl m-4">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-black text-gray-800">${o?"Editar Ocorrência":"Ocorrência de RH"}</h3>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="space-y-4">
                        <input type="hidden" id="hr-occurrence-id" value="${window.escapeHtml(e.id||"")}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Funcionario</label><select id="hr-occurrence-employee" class="input-modern">${a.map(t=>`<option value="${t.id}" ${e.employeeId===t.id?"selected":""}>${window.escapeHtml(p(t))}</option>`).join("")}</select></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo</label><select id="hr-occurrence-type" class="input-modern"><option value="vacation" ${e.type==="vacation"?"selected":""}>Férias</option><option value="absence" ${e.type==="absence"?"selected":""}>Falta</option><option value="overtime" ${e.type==="overtime"?"selected":""}>Hora Extra</option><option value="bank_credit" ${e.type==="bank_credit"?"selected":""}>Banco de Horas (+)</option><option value="bank_debit" ${e.type==="bank_debit"?"selected":""}>Banco de Horas (-)</option></select></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data</label><input id="hr-occurrence-date" type="date" class="input-modern" value="${window.escapeHtml(e.date||new Date().toISOString().slice(0,10))}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Competencia</label><input id="hr-occurrence-month" type="month" class="input-modern" value="${window.escapeHtml(e.referenceMonth||g())}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Horas</label><input id="hr-occurrence-hours" type="number" min="0" step="0.5" class="input-modern" value="${window.toNumber(e.hours)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Dias</label><input id="hr-occurrence-days" type="number" min="0" step="1" class="input-modern" value="${window.toNumber(e.days)}"></div>
                            <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Impacto financeiro (opcional)</label><input id="hr-occurrence-amount" type="number" min="0" step="0.01" class="input-modern" value="${window.toNumber(e.amount)}" placeholder="Se vazio, o sistema estima automaticamente quando aplicável"></div>
                        </div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacao</label><textarea id="hr-occurrence-note" class="input-modern h-24">${window.escapeHtml(e.note||"")}</textarea></div>
                    </div>
                    <div class="mt-8 flex justify-end gap-3">
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                        <button onclick="window.saveHrOccurrence()" class="btn-gradient px-6 py-2 text-white rounded-lg font-bold shadow-lg">Salvar Ocorrência</button>
                    </div>
                </div>
            </div>
        `,window.lucide&&window.lucide.createIcons()},window.saveHrOccurrence=async()=>window.withActionLock("save-hr-occurrence",async()=>{const o=document.getElementById("modal-container");window.toggleActionButtons(o,!0,"Salvando...");const e=document.getElementById("hr-occurrence-employee")?.value||"",a=document.getElementById("hr-occurrence-type")?.value||"overtime",t=window.toNumber(document.getElementById("hr-occurrence-hours")?.value),n=window.toNumber(document.getElementById("hr-occurrence-days")?.value),i={employeeId:e,type:a,date:document.getElementById("hr-occurrence-date")?.value||new Date().toISOString().slice(0,10),referenceMonth:document.getElementById("hr-occurrence-month")?.value||g(),hours:t,days:n,amount:window.toNumber(document.getElementById("hr-occurrence-amount")?.value),note:document.getElementById("hr-occurrence-note")?.value||"",status:"active",companyId:d.companyId,updatedAt:H()},r=(d.hrEmployees||[]).find(m=>m.id===e);if(!r)return window.customAlert("Selecione um funcionario válido.");if(!i.date)return window.customAlert("Informe a data da ocorrência.");if(["overtime","bank_credit","bank_debit"].includes(a)&&t<=0)return window.customAlert("Informe a quantidade de horas.");if(["vacation","absence"].includes(a)&&n<=0)return window.customAlert("Informe a quantidade de dias.");const s=document.getElementById("hr-occurrence-id")?.value||"";try{s?await R(k(x,"artifacts",y,"public","data","hr_occurrences",s),i):await F(S(x,"artifacts",y,"public","data","hr_occurrences"),{...i,createdAt:H()}),document.getElementById("modal-container").innerHTML="",window.logAudit("RH_OCORRENCIA",`${D(a)} registrada para ${p(r)}.`)}catch(m){window.customAlert("Erro ao salvar ocorrência: "+m.message)}finally{window.toggleActionButtons(o,!1)}}),window.deleteHrOccurrence=async o=>{const e=(d.hrOccurrences||[]).find(t=>t.id===o);if(!e)return;const a=(d.hrEmployees||[]).find(t=>t.id===e.employeeId);if(await window.customConfirm(`Excluir a ocorrência ${D(e.type)} de ${p(a)}?`))try{await N(k(x,"artifacts",y,"public","data","hr_occurrences",o)),window.logAudit("RH_OCORRENCIA",`${D(e.type)} removida para ${p(a)}.`)}catch(t){window.customAlert("Erro ao excluir ocorrência: "+t.message)}},window.openPayrollRunModal=()=>{const o=g(),e=(d.hrEmployees||[]).filter(r=>r.status!=="inactive");if(!e.length){window.customAlert("Cadastre funcionarios ativos antes de gerar a folha.");return}const a=e.map(r=>z(r,o)),t=a.reduce((r,s)=>r+s.gross,0),n=a.reduce((r,s)=>r+s.deductions,0),i=a.reduce((r,s)=>r+s.net,0);document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto m-4">
                    <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-black text-gray-800">Gerar Folha de Pagamento</h3>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="p-8 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Competencia</label><input id="hr-payroll-month" type="month" class="input-modern" value="${window.escapeHtml(o)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data de pagamento</label><input id="hr-payroll-paydate" type="date" class="input-modern" value="${new Date().toISOString().slice(0,10)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Status financeiro</label><select id="hr-payroll-status" class="input-modern"><option value="pending">Pendente</option><option value="paid">Pago</option></select></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Centro de custo</label><input id="hr-payroll-cost-center" class="input-modern" value="Folha de Pagamento"></div>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacoes</label>
                            <textarea id="hr-payroll-notes" class="input-modern h-24" placeholder="Observacoes da competencia, descontos extras ou fechamento interno"></textarea>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="rounded-2xl border border-blue-100 bg-blue-50 p-4"><p class="text-xs font-black uppercase text-blue-500">Funcionarios</p><p class="text-2xl font-black text-blue-700 mt-1">${a.length}</p></div>
                            <div class="rounded-2xl border border-red-100 bg-red-50 p-4"><p class="text-xs font-black uppercase text-red-500">Descontos previstos</p><p class="text-2xl font-black text-red-700 mt-1">${window.formatCurrency(n)}</p></div>
                            <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"><p class="text-xs font-black uppercase text-emerald-500">Liquido previsto</p><p class="text-2xl font-black text-emerald-700 mt-1">${window.formatCurrency(i)}</p></div>
                        </div>
                        <div class="rounded-3xl border border-gray-200 overflow-hidden">
                            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100">
                                <h4 class="font-black text-gray-800">Previa da folha</h4>
                                <p class="text-xs text-gray-400 font-bold mt-1">Bruto estimado ${window.formatCurrency(t)} · Descontos ${window.formatCurrency(n)}</p>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-sm min-w-[880px]">
                                    <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                                        <tr>
                                            <th class="p-4">Funcionario</th>
                                            <th class="p-4 text-right">Bruto</th>
                                            <th class="p-4 text-right">Vales</th>
                                            <th class="p-4 text-right">Descontos</th>
                                            <th class="p-4 text-right">Liquido</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${a.map(r=>`<tr><td class="p-4"><div class="font-black text-gray-800">${window.escapeHtml(r.employeeName)}</div><div class="text-xs text-gray-400 font-bold">${window.escapeHtml(r.department||"-")} · ${window.escapeHtml(r.position||"-")}</div><div class="text-[11px] text-violet-500 font-bold mt-1">${r.overtimeHours?`${r.overtimeHours.toFixed(1)}h extra`:""} ${r.vacationDays?`· ${r.vacationDays}d férias`:""} ${r.absenceDays?`· ${r.absenceDays}d falta`:""}</div></td><td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(r.gross)}</td><td class="p-4 text-right font-bold text-amber-600">${window.formatCurrency(r.advanceAmount)}</td><td class="p-4 text-right font-bold text-red-500">${window.formatCurrency(r.deductions)}</td><td class="p-4 text-right font-black text-emerald-600">${window.formatCurrency(r.net)}</td></tr>`).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-5 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                        <button onclick="window.generatePayrollRun()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg">Gerar Folha</button>
                    </div>
                </div>
            </div>
        `,window.lucide&&window.lucide.createIcons()},window.generatePayrollRun=async()=>window.withActionLock("generate-hr-payroll-run",async()=>{const o=document.getElementById("modal-container");window.toggleActionButtons(o,!0,"Gerando...");const e=document.getElementById("hr-payroll-month")?.value||g(),a=document.getElementById("hr-payroll-paydate")?.value||new Date().toISOString().slice(0,10),t=document.getElementById("hr-payroll-status")?.value||"pending",n=document.getElementById("hr-payroll-cost-center")?.value||"Folha de Pagamento",i=document.getElementById("hr-payroll-notes")?.value||"";if(!e)return window.customAlert("Informe a competencia da folha.");if(!a)return window.customAlert("Informe a data de pagamento.");if((d.payrollRuns||[]).some(v=>v.month===e))return window.customAlert("Ja existe uma folha gerada para esta competencia. Exclua a anterior antes de gerar novamente.");const r=(d.hrEmployees||[]).filter(v=>v.status!=="inactive");if(!r.length)return window.customAlert("Nenhum funcionario ativo encontrado para gerar a folha.");const s=r.map(v=>z(v,e)).filter(v=>v.gross>0||v.deductions>0);if(!s.length)return window.customAlert("Nao ha dados suficientes para gerar a folha desta competencia.");const m=s.reduce((v,$)=>v+$.gross,0),u=s.reduce((v,$)=>v+$.deductions,0),b=s.reduce((v,$)=>v+$.net,0),c=[...new Set(s.flatMap(v=>v.advances.map($=>$.id)).filter(Boolean))];let f="",A="";try{f=(await F(S(x,"artifacts",y,"public","data","financial"),{type:"expense",description:`Folha de Pagamento ${h(e)}`,category:"Folha de Pagamento",amount:b,dueDate:a,status:t,companyId:d.companyId,costCenterCategory:n,serviceType:"RH",projectNumber:`FOLHA-${e}`,createdAt:H()})).id;const $=await F(S(x,"artifacts",y,"public","data","payroll_runs"),{month:e,payDate:a,paymentStatus:t,notes:i,companyId:d.companyId,employeeCount:s.length,totalGross:m,totalDeductions:u,totalNet:b,costCenter:n,advanceIds:c,financialEntryId:f,items:s,createdBy:d.user?.email||"Utilizador",createdAt:H()});A=$.id;for(const C of c)await R(k(x,"artifacts",y,"public","data","hr_advances",C),{status:"discounted",payrollRunId:$.id,discountedMonth:e,discountedAt:H(),updatedAt:H()});document.getElementById("modal-container").innerHTML="",window.logAudit("RH_FOLHA",`Folha ${e} gerada com ${s.length} funcionario(s). Liquido ${window.formatCurrency(b)}.`)}catch(v){try{A&&await N(k(x,"artifacts",y,"public","data","payroll_runs",A)),f&&await N(k(x,"artifacts",y,"public","data","financial",f))}catch{}window.customAlert("Erro ao gerar folha: "+v.message)}finally{window.toggleActionButtons(o,!1)}}),window.viewPayrollRun=o=>{const e=(d.payrollRuns||[]).find(a=>a.id===o);if(!e)return window.customAlert("Folha nao encontrada.");document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto m-4">
                    <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <div>
                            <h3 class="text-xl font-black text-gray-800">Folha ${window.escapeHtml(h(e.month))}</h3>
                            <p class="text-xs text-gray-400 font-bold mt-1">Pagamento ${window.formatDate(e.payDate)} · ${window.toNumber(e.employeeCount)} funcionario(s)</p>
                        </div>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="p-8 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="rounded-2xl border border-blue-100 bg-blue-50 p-4"><p class="text-xs font-black uppercase text-blue-500">Bruto</p><p class="text-2xl font-black text-blue-700 mt-1">${window.formatCurrency(e.totalGross)}</p></div>
                            <div class="rounded-2xl border border-red-100 bg-red-50 p-4"><p class="text-xs font-black uppercase text-red-500">Descontos</p><p class="text-2xl font-black text-red-700 mt-1">${window.formatCurrency(e.totalDeductions)}</p></div>
                            <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"><p class="text-xs font-black uppercase text-emerald-500">Liquido</p><p class="text-2xl font-black text-emerald-700 mt-1">${window.formatCurrency(e.totalNet)}</p></div>
                            <div class="rounded-2xl border border-violet-100 bg-violet-50 p-4"><p class="text-xs font-black uppercase text-violet-500">Financeiro</p><p class="text-2xl font-black text-violet-700 mt-1">${e.paymentStatus==="paid"?"Pago":"Pendente"}</p></div>
                        </div>
                        <div class="rounded-3xl border border-gray-200 overflow-hidden">
                            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-3">
                                <div>
                                    <h4 class="font-black text-gray-800">Funcionarios na folha</h4>
                                    <p class="text-xs text-gray-400 font-bold mt-1">${window.escapeHtml(e.notes||"Sem observacoes adicionais.")}</p>
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-sm min-w-[1180px]">
                                    <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                                        <tr>
                                            <th class="p-4">Funcionario</th>
                                            <th class="p-4 text-right">Base</th>
                                            <th class="p-4 text-right">Beneficios</th>
                                            <th class="p-4 text-right">Vales</th>
                                            <th class="p-4 text-right">Descontos</th>
                                            <th class="p-4 text-right">Liquido</th>
                                            <th class="p-4 text-right">Acoes</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100">
                                        ${(e.items||[]).map(a=>`<tr><td class="p-4"><div class="font-black text-gray-800">${window.escapeHtml(a.employeeName||"Funcionario")}</div><div class="text-xs text-gray-400 font-bold">${window.escapeHtml(a.department||"-")} · ${window.escapeHtml(a.position||"-")}</div><div class="text-[11px] text-violet-500 font-bold mt-1">${a.overtimeHours?`${window.toNumber(a.overtimeHours).toFixed(1)}h extra`:""} ${a.vacationDays?`· ${window.toNumber(a.vacationDays)}d férias`:""} ${a.absenceDays?`· ${window.toNumber(a.absenceDays)}d falta`:""}</div></td><td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(a.baseSalary)}</td><td class="p-4 text-right font-bold text-blue-600">${window.formatCurrency(window.toNumber(a.transportAllowance)+window.toNumber(a.mealAllowance)+window.toNumber(a.fixedBonus)+window.toNumber(a.overtimeAmount)+window.toNumber(a.vacationAmount))}</td><td class="p-4 text-right font-bold text-amber-600">${window.formatCurrency(a.advanceAmount)}</td><td class="p-4 text-right font-bold text-red-500">${window.formatCurrency(a.deductions)}</td><td class="p-4 text-right font-black text-emerald-600">${window.formatCurrency(a.net)}</td><td class="p-4 text-right"><button onclick="window.printHrPayslip('${e.id}','${a.employeeId}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"><i data-lucide="printer" class="w-4 h-4"></i></button></td></tr>`).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,window.lucide&&window.lucide.createIcons()},window.printHrPayslip=(o,e)=>{const a=(d.payrollRuns||[]).find(r=>r.id===o),t=(a?.items||[]).find(r=>r.employeeId===e),n=(d.hrEmployees||[]).find(r=>r.id===e);if(!a||!t)return window.customAlert("Holerite nao encontrado.");const i=window.open("","_blank","width=980,height=760");if(!i)return window.customAlert("O navegador bloqueou a janela de impressao.");i.document.write(`
            <html>
                <head>
                    <title>Holerite ${t.employeeName} - ${h(a.month)}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
                        .sheet { max-width: 820px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; }
                        .hero { background: linear-gradient(135deg, #0f172a, #1d4ed8); color: white; padding: 28px 32px; }
                        .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; padding: 24px 32px; }
                        .card { border: 1px solid #e5e7eb; border-radius: 16px; padding: 18px; background: #f8fafc; }
                        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
                        th, td { padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 14px; }
                        th:last-child, td:last-child { text-align: right; }
                        .summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 0 32px 32px; }
                        .summary .card strong { display: block; font-size: 24px; margin-top: 8px; }
                    </style>
                </head>
                <body>
                    <div class="sheet">
                        <div class="hero">
                            <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; opacity:0.7;">FlowSystem RH</div>
                            <h1 style="margin:8px 0 6px; font-size:30px;">Holerite ${t.employeeName}</h1>
                            <div style="font-size:14px; opacity:0.8;">Competencia ${h(a.month)} · Pagamento ${new Date(a.payDate).toLocaleDateString("pt-BR")}</div>
                        </div>
                        <div class="grid">
                            <div class="card">
                                <div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Funcionario</div>
                                <div style="font-size:20px; font-weight:800; margin-top:8px;">${t.employeeName}</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:8px;">CPF: ${t.cpf||"-"}</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:4px;">Setor: ${t.department||"-"}</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:4px;">Cargo: ${t.position||"-"}</div>
                            </div>
                            <div class="card">
                                <div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Dados bancarios</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:12px;">Banco: ${n?.bankName||"-"}</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:4px;">Agencia: ${n?.bankAgency||"-"}</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:4px;">Conta: ${n?.bankAccount||"-"}</div>
                                <div style="font-size:13px; color:#6b7280; margin-top:4px;">PIX: ${n?.pixKey||"-"}</div>
                            </div>
                        </div>
                        <div style="padding: 0 32px 32px;">
                            <table>
                                <thead>
                                    <tr><th>Rubrica</th><th>Valor</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Salario Base</td><td>${window.formatCurrency(t.baseSalary)}</td></tr>
                                    <tr><td>Vale Transporte</td><td>${window.formatCurrency(t.transportAllowance)}</td></tr>
                                    <tr><td>Vale Alimentacao</td><td>${window.formatCurrency(t.mealAllowance)}</td></tr>
                                    <tr><td>Provento Fixo</td><td>${window.formatCurrency(t.fixedBonus)}</td></tr>
                                    <tr><td>Horas Extras (${window.toNumber(t.overtimeHours).toFixed(1)}h)</td><td>${window.formatCurrency(t.overtimeAmount)}</td></tr>
                                    <tr><td>Ferias (${window.toNumber(t.vacationDays)} dia(s))</td><td>${window.formatCurrency(t.vacationAmount)}</td></tr>
                                    <tr><td>Desconto Fixo</td><td>${window.formatCurrency(t.fixedDiscount)}</td></tr>
                                    <tr><td>Faltas (${window.toNumber(t.absenceDays)} dia(s))</td><td>${window.formatCurrency(t.absenceAmount)}</td></tr>
                                    <tr><td>Vales / Adiantamentos</td><td>${window.formatCurrency(t.advanceAmount)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="summary">
                            <div class="card"><div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Bruto</div><strong>${window.formatCurrency(t.gross)}</strong></div>
                            <div class="card"><div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Descontos</div><strong>${window.formatCurrency(t.deductions)}</strong></div>
                            <div class="card"><div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Liquido</div><strong>${window.formatCurrency(t.net)}</strong></div>
                        </div>
                    </div>
                    <script>
                        window.onload = () => {
                            window.print();
                            setTimeout(() => window.close(), 300);
                        };
                    <\/script>
                </body>
            </html>
        `),i.document.close()};const we=(o,e)=>{const a=new Date(`${o}T12:00:00`);return a.setDate(a.getDate()+e),a.toISOString().slice(0,10)},ge=(o,e)=>{const a=new Date(`${o}T12:00:00`),t=new Date(`${e}T12:00:00`);let n=t.getFullYear()-a.getFullYear();return(t.getMonth()<a.getMonth()||t.getMonth()===a.getMonth()&&t.getDate()<a.getDate())&&(n-=1),Math.max(n,0)},Y=(o,e,a=12)=>{if(!o||!e||o>e)return 0;const t=new Date(`${o}T12:00:00`),n=new Date(`${e}T12:00:00`);let i=new Date(t.getFullYear(),t.getMonth(),1,12),r=0;for(;i<=n;){const s=new Date(i.getFullYear(),i.getMonth(),1,12),m=new Date(i.getFullYear(),i.getMonth()+1,0,12),u=t>s?t:s,b=n<m?n:m;b>=u&&Math.floor((b-u)/864e5)+1>=15&&(r+=1),i.setMonth(i.getMonth()+1)}return Math.min(r,a)},xe=(o,e)=>{const a=ge(o,e);return Math.min(30+Math.max(a-1,0)*3,90)},ye=(o,e,a,t)=>o?!t||a!=="indenizado"?o:we(o,e):"";window.calculateTerminationEstimate=(o,e)=>{const a=e.regime||o?.employmentRegime||"clt",t=e.terminationType||"without_cause",n=e.terminationDate||new Date().toISOString().slice(0,10),i=a==="pj"?window.toNumber(e.contractValue||o?.contractMonthlyValue||o?.salary):window.toNumber(o?.salary),r=Math.max(0,window.toNumber(e.workedDays,new Date(`${n}T12:00:00`).getDate())),s=new Date(new Date(`${n}T12:00:00`).getFullYear(),new Date(`${n}T12:00:00`).getMonth()+1,0).getDate(),m=a==="pj"?0:i/s*Math.min(r,s),u=["without_cause","indirect"].includes(t),b=t==="resignation",c=a==="pj"?0:xe(o?.admissionDate||n,n),f=a==="pj"?"none":e.noticeMode||(u?"indenizado":b?"descontado":"none"),A=i/30*c,v=a==="pj"?0:u?f==="indenizado"?A:0:b&&f==="descontado"?-A:0,$=ye(n,c,f,u),C=$||n,j=a==="pj"?"":(o?.admissionDate||C)>`${new Date(`${C}T12:00:00`).getFullYear()}-01-01`?o?.admissionDate||C:`${new Date(`${C}T12:00:00`).getFullYear()}-01-01`,B=t==="just_cause",T=a==="pj"||B?0:Y(j,C,12),P=a==="pj"||B?0:i/12*T,l=a==="pj"?0:Math.max(0,window.toNumber(e.vacationDaysBalance,o?.vacationBalanceDays)),w=Math.floor(l/30)*30,K=B?0:l-w,V=a==="pj"?0:i/30*w,X=V/3,q=a==="pj"?0:i/30*K,Z=q/3,he=window.toNumber(e.fgtsBalance),fe=a==="pj"?0:Y(o?.admissionDate||n,n,Number.MAX_SAFE_INTEGER),G=a==="pj"?0:he||i*.08*fe,Q=t==="without_cause"||t==="indirect"?.4:0,ee=a==="pj"?0:G*Q,L=window.toNumber(e.additionalCredits),O=window.toNumber(e.deductions);if(a==="pj"){const oe=window.toNumber(e.unpaidInvoices),ie=window.toNumber(e.contractPenalty),ne=window.toNumber(e.reimbursements),re=window.toNumber(e.contractNoticeAmount),de=oe+ie+ne+re+L;return{regime:a,terminationType:t,baseSalary:i,gross:de,net:de-O,items:[{label:"Notas / faturas em aberto",amount:oe},{label:"Aviso contratual",amount:re},{label:"Multa contratual",amount:ie},{label:"Reembolsos",amount:ne},{label:"Outros creditos",amount:L},{label:"Descontos / retencoes",amount:-O}],notes:["PJ nao gera automaticamente verbas CLT.","O calculo considera encerramento contratual civil/comercial com base nos valores informados."]}}const te=a==="informal"?G:0,ae=m+Math.max(v,0)+P+V+X+q+Z+ee+te+L,$e=ae-O+Math.min(v,0);return{regime:a,terminationType:t,baseSalary:i,noticeDays:c,projectedDate:$,gross:ae,net:$e,items:[{label:"Saldo de salario",amount:m},{label:v>=0?`Aviso previo (${c} dias)`:`Desconto aviso previo (${c} dias)`,amount:v},{label:`13o proporcional (${T}/12)`,amount:P},{label:`Ferias vencidas (${Math.floor(w/30)} periodo(s))`,amount:V},{label:"1/3 sobre ferias vencidas",amount:X},{label:`Ferias proporcionais (${K} dia(s))`,amount:q},{label:"1/3 sobre ferias proporcionais",amount:Z},a==="informal"?{label:"FGTS retroativo estimado",amount:te}:{label:"Saldo FGTS informado/estimado",amount:G},{label:`Multa FGTS ${(Q*100).toFixed(0)}%`,amount:ee},{label:"Outros creditos",amount:L},{label:"Descontos",amount:-O}],notes:[a==="informal"?"Sem registro: o calculo e uma estimativa de reconhecimento de vinculo com base CLT.":"CLT registrado: o calculo usa as verbas rescisorias principais.","Ferias usam o saldo pendente informado/cadastrado no funcionario.","INSS, IRRF, parcelas judiciais e convencoes coletivas nao entram automaticamente nesta simulacao."]}},window.renderTerminationPreview=()=>{const o=document.getElementById("hr-termination-employee-id")?.value||"",e=(d.hrEmployees||[]).find(i=>i.id===o);if(!e)return;const a=document.getElementById("hr-term-regime")?.value||e.employmentRegime||"clt",t=window.calculateTerminationEstimate(e,{regime:a,terminationType:document.getElementById("hr-term-type")?.value||"without_cause",terminationDate:document.getElementById("hr-term-date")?.value||new Date().toISOString().slice(0,10),workedDays:window.toNumber(document.getElementById("hr-term-worked-days")?.value),noticeMode:document.getElementById("hr-term-notice-mode")?.value||"indenizado",vacationDaysBalance:window.toNumber(document.getElementById("hr-term-vacation-balance")?.value),fgtsBalance:window.toNumber(document.getElementById("hr-term-fgts-balance")?.value),additionalCredits:window.toNumber(document.getElementById("hr-term-additional-credits")?.value),deductions:window.toNumber(document.getElementById("hr-term-deductions")?.value),contractValue:window.toNumber(document.getElementById("hr-term-contract-value")?.value),unpaidInvoices:window.toNumber(document.getElementById("hr-term-unpaid-invoices")?.value),contractPenalty:window.toNumber(document.getElementById("hr-term-penalty")?.value),reimbursements:window.toNumber(document.getElementById("hr-term-reimbursements")?.value),contractNoticeAmount:window.toNumber(document.getElementById("hr-term-contract-notice")?.value)}),n=document.getElementById("hr-termination-preview");n&&(n.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="rounded-2xl border border-blue-100 bg-blue-50 p-4"><p class="text-[10px] uppercase font-black text-blue-500">Base</p><p class="text-2xl font-black text-blue-700 mt-2">${window.formatCurrency(t.baseSalary)}</p></div>
                <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"><p class="text-[10px] uppercase font-black text-emerald-500">Total bruto</p><p class="text-2xl font-black text-emerald-700 mt-2">${window.formatCurrency(t.gross)}</p></div>
                <div class="rounded-2xl border border-violet-100 bg-violet-50 p-4"><p class="text-[10px] uppercase font-black text-violet-500">Liquido estimado</p><p class="text-2xl font-black text-violet-700 mt-2">${window.formatCurrency(t.net)}</p></div>
            </div>
            <div class="rounded-2xl border border-gray-200 overflow-hidden">
                <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h4 class="font-black text-gray-800">Composicao da rescisao</h4>
                        <p class="text-xs text-gray-400 font-bold mt-1">${t.noticeDays?`Aviso base de ${t.noticeDays} dia(s)`:"Sem aviso legal automatico"}${t.projectedDate?` | data projetada ${window.formatDate(t.projectedDate)}`:""}</p>
                    </div>
                    <button onclick="window.printTerminationEstimate()" class="bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-black text-gray-700 hover:border-theme/30 hover:text-theme transition">Imprimir</button>
                </div>
                <div class="divide-y divide-gray-100">
                    ${t.items.filter(i=>i.amount).map(i=>`<div class="p-4 flex justify-between items-center gap-4"><p class="font-black text-gray-800">${window.escapeHtml(i.label)}</p><p class="font-black ${i.amount>=0?"text-emerald-600":"text-red-500"}">${i.amount>=0?"+":"-"} ${window.formatCurrency(Math.abs(i.amount))}</p></div>`).join("")||'<div class="p-8 text-center text-gray-400 font-bold">Nenhuma verba calculada para os parametros informados.</div>'}
                </div>
                <div class="px-5 py-4 bg-gray-50 border-t border-gray-100 space-y-2">
                    ${t.notes.map(i=>`<p class="text-xs text-gray-500 font-bold">${window.escapeHtml(i)}</p>`).join("")}
                </div>
            </div>
        `,n.dataset.result=JSON.stringify(t))},window.openHrTerminationCalculator=o=>{const e=(d.hrEmployees||[]).find(a=>a.id===o);if(!e)return window.customAlert("Funcionario nao encontrado.");document.getElementById("modal-container").innerHTML=`
            <div class="modal-overlay">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto m-4">
                    <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <div>
                            <h3 class="text-xl font-black text-gray-800">Calculadora de Rescisao</h3>
                            <p class="text-xs text-gray-400 font-bold mt-1">${window.escapeHtml(p(e))} | ${window.escapeHtml(e.position||"Sem cargo")}</p>
                        </div>
                        <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                    </div>
                    <div class="p-8 grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8">
                        <div class="space-y-4">
                            <input type="hidden" id="hr-termination-employee-id" value="${window.escapeHtml(e.id)}">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Regime</label><select id="hr-term-regime" onchange="window.renderTerminationPreview()" class="input-modern"><option value="clt" ${!e.employmentRegime||e.employmentRegime==="clt"?"selected":""}>Registrado CLT</option><option value="informal" ${e.employmentRegime==="informal"?"selected":""}>Sem registro</option><option value="pj" ${e.employmentRegime==="pj"?"selected":""}>PJ / Prestador</option></select></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de desligamento</label><select id="hr-term-type" onchange="window.renderTerminationPreview()" class="input-modern"><option value="without_cause">Sem justa causa</option><option value="resignation">Pedido de demissao</option><option value="just_cause">Justa causa</option><option value="indirect">Rescisao indireta</option></select></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data da rescisao</label><input id="hr-term-date" type="date" class="input-modern" value="${window.escapeHtml(e.terminationDate||new Date().toISOString().slice(0,10))}" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Dias trabalhados no mes</label><input id="hr-term-worked-days" type="number" class="input-modern" value="${new Date().getDate()}" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Aviso previo</label><select id="hr-term-notice-mode" onchange="window.renderTerminationPreview()" class="input-modern"><option value="indenizado">Indenizado</option><option value="trabalhado">Trabalhado</option><option value="descontado">Descontar do colaborador</option><option value="none">Sem aviso</option></select></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Saldo de ferias (dias)</label><input id="hr-term-vacation-balance" type="number" class="input-modern" value="${window.toNumber(e.vacationBalanceDays,30)}" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Saldo FGTS</label><input id="hr-term-fgts-balance" type="number" class="input-modern" value="0" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Outros creditos</label><input id="hr-term-additional-credits" type="number" class="input-modern" value="${window.toNumber(e.terminationCost)}" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Descontos</label><input id="hr-term-deductions" type="number" class="input-modern" value="0" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Valor contrato PJ</label><input id="hr-term-contract-value" type="number" class="input-modern" value="${window.toNumber(e.contractMonthlyValue||e.salary)}" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Faturas em aberto</label><input id="hr-term-unpaid-invoices" type="number" class="input-modern" value="0" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Aviso contratual PJ</label><input id="hr-term-contract-notice" type="number" class="input-modern" value="0" oninput="window.renderTerminationPreview()"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Multa contratual</label><input id="hr-term-penalty" type="number" class="input-modern" value="0" oninput="window.renderTerminationPreview()"></div>
                                <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Reembolsos / despesas</label><input id="hr-term-reimbursements" type="number" class="input-modern" value="0" oninput="window.renderTerminationPreview()"></div>
                            </div>
                            <div class="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-xs text-amber-900 font-bold">
                                A simulacao foi desenhada para CLT registrado, estimativa de vinculo sem registro e encerramento contratual PJ. Convencao coletiva, judicializacao, horas extras pendentes, estabilidade e tributos podem alterar o valor final.
                            </div>
                        </div>
                        <div id="hr-termination-preview"></div>
                    </div>
                </div>
            </div>
        `,window.lucide&&window.lucide.createIcons(),window.renderTerminationPreview()},window.printTerminationEstimate=()=>{const o=document.getElementById("hr-termination-employee-id")?.value||"",e=(d.hrEmployees||[]).find(i=>i.id===o),a=document.getElementById("hr-termination-preview")?.dataset.result||"";if(!e||!a)return;const t=JSON.parse(a),n=window.open("","_blank","width=980,height=760");if(!n)return window.customAlert("O navegador bloqueou a janela de impressao.");n.document.write(`
            <html>
                <head>
                    <title>Rescisao ${window.escapeHtml(p(e))}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
                        .sheet { max-width: 900px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; }
                        .hero { background: linear-gradient(135deg, #0f172a, #1d4ed8); color: white; padding: 28px 32px; }
                        .summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 24px 32px; }
                        .card { border: 1px solid #e5e7eb; border-radius: 16px; padding: 18px; background: #f8fafc; }
                        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
                        th, td { padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 14px; }
                        th:last-child, td:last-child { text-align: right; }
                        .notes { padding: 0 32px 32px; }
                    </style>
                </head>
                <body>
                    <div class="sheet">
                        <div class="hero">
                            <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; opacity:0.7;">FlowSystem RH</div>
                            <h1 style="margin:8px 0 6px; font-size:30px;">Simulacao de Rescisao</h1>
                            <div style="font-size:14px; opacity:0.8;">${window.escapeHtml(p(e))} | ${window.escapeHtml(e.position||"-")} | ${window.formatDate(document.getElementById("hr-term-date")?.value||"")}</div>
                        </div>
                        <div class="summary">
                            <div class="card"><div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Base</div><strong style="display:block; margin-top:8px; font-size:24px;">${window.formatCurrency(t.baseSalary)}</strong></div>
                            <div class="card"><div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Bruto</div><strong style="display:block; margin-top:8px; font-size:24px;">${window.formatCurrency(t.gross)}</strong></div>
                            <div class="card"><div style="font-size:11px; text-transform:uppercase; color:#6b7280; font-weight:700;">Liquido</div><strong style="display:block; margin-top:8px; font-size:24px;">${window.formatCurrency(t.net)}</strong></div>
                        </div>
                        <div style="padding: 0 32px 24px;">
                            <table>
                                <thead><tr><th>Verba</th><th>Valor</th></tr></thead>
                                <tbody>
                                    ${t.items.filter(i=>i.amount).map(i=>`<tr><td>${window.escapeHtml(i.label)}</td><td>${i.amount>=0?"+":"-"} ${window.formatCurrency(Math.abs(i.amount))}</td></tr>`).join("")}
                                </tbody>
                            </table>
                        </div>
                        <div class="notes">
                            ${t.notes.map(i=>`<p style="font-size:12px; color:#6b7280; font-weight:700;">${window.escapeHtml(i)}</p>`).join("")}
                        </div>
                    </div>
                    <script>
                        window.onload = () => {
                            window.print();
                            setTimeout(() => window.close(), 300);
                        };
                    <\/script>
                </body>
            </html>
        `),n.document.close()};const U=(o,e,a="#2563eb")=>{const t=/^#[0-9a-fA-F]{6}$/.test(a||"")?a:"#2563eb",n=typeof window.adjustColor=="function"?window.adjustColor(t,-26):t,i=`${String(o||"documento").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"documento"}.pdf`;return window.generatePdfFromHtml({filename:i,html:`
            <html>
                <head>
                    <title>${o}</title>
                    <style>
                        * { box-sizing: border-box; }
                        body { margin: 0; font-family: Inter, Arial, sans-serif; background: #e2e8f0; color: #0f172a; padding: 32px; }
                        .sheet { max-width: 980px; margin: 0 auto; background: #ffffff; border-radius: 28px; overflow: hidden; box-shadow: 0 28px 70px rgba(15, 23, 42, 0.14); }
                        .hero { position: relative; overflow: hidden; padding: 34px 38px 28px; color: white; background: linear-gradient(135deg, ${n} 0%, ${t} 58%, #0f172a 100%); }
                        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.10), transparent 22%); }
                        .hero > * { position: relative; z-index: 1; }
                        .hero-grid { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; }
                        .eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; opacity: 0.72; }
                        .hero h1 { margin: 10px 0 8px; font-size: 33px; line-height: 1.04; }
                        .hero p { margin: 0; font-size: 14px; line-height: 1.65; opacity: 0.84; }
                        .hero-company { min-width: 240px; text-align: right; }
                        .hero-company strong { display: block; font-size: 18px; line-height: 1.2; }
                        .hero-company div { font-size: 12px; line-height: 1.65; opacity: 0.86; }
                        .pill-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
                        .pill { padding: 7px 12px; border-radius: 999px; background: rgba(255,255,255,0.16); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; }
                        .content { padding: 28px 32px 22px; }
                        .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-bottom: 24px; }
                        .metric { border: 1px solid #dbeafe; background: #f8fbff; border-radius: 18px; padding: 16px; }
                        .metric .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700; color: ${n}; }
                        .metric .value { font-size: 26px; font-weight: 900; color: #0f172a; margin-top: 10px; line-height: 1.05; }
                        .metric .meta { font-size: 11px; color: #64748b; margin-top: 8px; line-height: 1.45; }
                        .grid-2 { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr); gap: 18px; align-items: start; }
                        .card { border: 1px solid #e2e8f0; border-radius: 22px; background: white; overflow: hidden; }
                        .card-head { padding: 16px 18px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
                        .card-head .eyebrow { color: #64748b; opacity: 1; letter-spacing: 0.18em; font-size: 10px; }
                        .card-head strong { display: block; font-size: 16px; color: #0f172a; margin-top: 6px; }
                        .card-body { padding: 18px; }
                        .info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
                        .info-item { border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 16px; padding: 12px 14px; }
                        .info-item .label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.14em; }
                        .info-item .value { font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 7px; line-height: 1.45; }
                        table { width: 100%; border-collapse: collapse; }
                        th { background: ${t}; color: white; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; text-align: left; padding: 14px 18px; }
                        td { padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; vertical-align: top; }
                        th:last-child, td:last-child { text-align: right; }
                        .positive { color: #047857; font-weight: 800; }
                        .negative { color: #b91c1c; font-weight: 800; }
                        .notes { margin-top: 18px; border: 1px solid #e2e8f0; border-radius: 22px; background: #fffdf8; padding: 18px 20px; }
                        .notes .eyebrow { color: #64748b; opacity: 1; font-size: 10px; letter-spacing: 0.18em; }
                        .notes p { margin: 12px 0 0; font-size: 12px; color: #475569; line-height: 1.7; }
                        .footer { padding: 18px 32px 26px; border-top: 1px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; gap: 16px; align-items: center; font-size: 11px; color: #64748b; }
                        .footer strong { display: block; color: #0f172a; font-size: 12px; margin-bottom: 4px; }
                        @media print {
                            body { background: white; padding: 0; }
                            .sheet { box-shadow: none; border-radius: 0; max-width: none; }
                        }
                    </style>
                </head>
                <body>
                    ${e}
                </body>
            </html>
        `})};window.printHrPayslip=(o,e)=>{const a=(d.payrollRuns||[]).find(c=>c.id===o),t=(a?.items||[]).find(c=>c.employeeId===e),n=(d.hrEmployees||[]).find(c=>c.id===e);if(!a||!t)return window.customAlert("Holerite nao encontrado.");const i=window.escapeHtml,r=d.settings||{},s=/^#[0-9a-fA-F]{6}$/.test(r.primaryColor||"")?r.primaryColor:"#2563eb",m=[r.companyName||"FlowSystem",r.cnpj?`CNPJ/NIF: ${r.cnpj}`:"",r.phone||"",r.address||""].filter(Boolean),u=[{label:"Salario base",amount:window.toNumber(t.baseSalary),kind:"credit"},{label:"Vale transporte",amount:window.toNumber(t.transportAllowance),kind:"credit"},{label:"Vale alimentacao",amount:window.toNumber(t.mealAllowance),kind:"credit"},{label:"Provento fixo",amount:window.toNumber(t.fixedBonus),kind:"credit"},{label:`Horas extras (${window.toNumber(t.overtimeHours).toFixed(1)}h)`,amount:window.toNumber(t.overtimeAmount),kind:"credit"},{label:`Ferias (${window.toNumber(t.vacationDays)} dia(s))`,amount:window.toNumber(t.vacationAmount),kind:"credit"},{label:"Desconto fixo",amount:window.toNumber(t.fixedDiscount),kind:"debit"},{label:`Faltas (${window.toNumber(t.absenceDays)} dia(s))`,amount:window.toNumber(t.absenceAmount),kind:"debit"},{label:"Vales / adiantamentos",amount:window.toNumber(t.advanceAmount),kind:"debit"}].filter(c=>c.amount),b=`
            <div class="sheet">
                <div class="hero">
                    <div class="hero-grid">
                        <div style="max-width: 65%;">
                            <div class="eyebrow">Holerite</div>
                            <h1>${i(t.employeeName||"Colaborador")}</h1>
                            <p>Competencia ${i(h(a.month))} com pagamento em ${i(new Date(a.payDate).toLocaleDateString("pt-BR"))}. Documento preparado para apresentacao profissional e conferencia interna.</p>
                            <div class="pill-row">
                                <span class="pill">${i(n?.employmentRegime||"CLT")}</span>
                                <span class="pill">${a.paymentStatus==="paid"?"Pago":"Pendente"}</span>
                            </div>
                        </div>
                        <div class="hero-company">
                            <strong>${i(r.companyName||"FlowSystem")}</strong>
                            ${m.map(c=>`<div>${i(c)}</div>`).join("")}
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div class="metrics">
                        <div class="metric">
                            <div class="label">Bruto</div>
                            <div class="value">${window.formatCurrency(t.gross)}</div>
                            <div class="meta">Soma das verbas de credito desta competencia.</div>
                        </div>
                        <div class="metric">
                            <div class="label">Descontos</div>
                            <div class="value">${window.formatCurrency(t.deductions)}</div>
                            <div class="meta">Descontos fixos, faltas e vales compensados.</div>
                        </div>
                        <div class="metric">
                            <div class="label">Liquido</div>
                            <div class="value">${window.formatCurrency(t.net)}</div>
                            <div class="meta">Valor final previsto para pagamento ao colaborador.</div>
                        </div>
                    </div>

                    <div class="grid-2">
                        <div class="card">
                            <div class="card-head">
                                <div class="eyebrow">Dados do colaborador</div>
                                <strong>Identificacao e dados bancarios</strong>
                            </div>
                            <div class="card-body">
                                <div class="info-grid">
                                    <div class="info-item"><div class="label">Funcionario</div><div class="value">${i(t.employeeName||"-")}</div></div>
                                    <div class="info-item"><div class="label">CPF</div><div class="value">${i(t.cpf||"-")}</div></div>
                                    <div class="info-item"><div class="label">Setor</div><div class="value">${i(t.department||"-")}</div></div>
                                    <div class="info-item"><div class="label">Cargo</div><div class="value">${i(t.position||"-")}</div></div>
                                    <div class="info-item"><div class="label">Banco</div><div class="value">${i(n?.bankName||"-")}</div></div>
                                    <div class="info-item"><div class="label">Agencia / Conta</div><div class="value">${i([n?.bankAgency||"-",n?.bankAccount||"-"].join(" / "))}</div></div>
                                    <div class="info-item" style="grid-column: span 2;"><div class="label">PIX</div><div class="value">${i(n?.pixKey||"-")}</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-head">
                                <div class="eyebrow">Resumo da folha</div>
                                <strong>Composicao desta competencia</strong>
                            </div>
                            <div class="card-body">
                                <div class="info-grid">
                                    <div class="info-item"><div class="label">Horas extras</div><div class="value">${window.toNumber(t.overtimeHours).toFixed(1)}h</div></div>
                                    <div class="info-item"><div class="label">Dias de ferias</div><div class="value">${window.toNumber(t.vacationDays)} dia(s)</div></div>
                                    <div class="info-item"><div class="label">Dias de falta</div><div class="value">${window.toNumber(t.absenceDays)} dia(s)</div></div>
                                    <div class="info-item"><div class="label">Vales / adiantamentos</div><div class="value">${window.formatCurrency(t.advanceAmount)}</div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="margin-top: 18px;">
                        <div class="card-head">
                            <div class="eyebrow">Rubricas</div>
                            <strong>Detalhamento de proventos e descontos</strong>
                        </div>
                        <div class="card-body" style="padding: 0;">
                            <table>
                                <thead>
                                    <tr><th>Rubrica</th><th>Natureza</th><th>Valor</th></tr>
                                </thead>
                                <tbody>
                                    ${u.map(c=>`
                                        <tr>
                                            <td>${i(c.label)}</td>
                                            <td>${c.kind==="credit"?"Credito":"Desconto"}</td>
                                            <td class="${c.kind==="credit"?"positive":"negative"}">${c.kind==="credit"?"+":"-"} ${window.formatCurrency(Math.abs(c.amount))}</td>
                                        </tr>
                                    `).join("")||'<tr><td colspan="3" style="text-align:center;color:#64748b;font-weight:700;">Sem verbas registradas.</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <div>
                        <strong>${i(r.companyName||"FlowSystem")}</strong>
                        <div>${i(r.phone||r.address||"Contato nao informado")}</div>
                    </div>
                    <div style="text-align:right;">
                        <div>Documento gerado em ${i(new Date().toLocaleDateString("pt-BR"))}</div>
                        <div>Uso interno, conferencia e entrega ao colaborador.</div>
                    </div>
                </div>
            </div>
        `;U(`Holerite ${t.employeeName} - ${h(a.month)}`,b,s)},window.printTerminationEstimate=()=>{const o=document.getElementById("hr-termination-employee-id")?.value||"",e=(d.hrEmployees||[]).find(b=>b.id===o),a=document.getElementById("hr-termination-preview")?.dataset.result||"";if(!e||!a)return;const t=JSON.parse(a),n=window.escapeHtml,i=d.settings||{},r=/^#[0-9a-fA-F]{6}$/.test(i.primaryColor||"")?i.primaryColor:"#2563eb",s=[i.companyName||"FlowSystem",i.cnpj?`CNPJ/NIF: ${i.cnpj}`:"",i.phone||"",i.address||""].filter(Boolean),m=(t.items||[]).filter(b=>b.amount),u=`
            <div class="sheet">
                <div class="hero">
                    <div class="hero-grid">
                        <div style="max-width: 65%;">
                            <div class="eyebrow">Rescisao</div>
                            <h1>Simulacao de desligamento</h1>
                            <p>${n(p(e))} | ${n(e.position||"-")} | Data de referencia ${n(window.formatDate(document.getElementById("hr-term-date")?.value||""))}. Material pronto para analise interna e alinhamento com financeiro/DP.</p>
                            <div class="pill-row">
                                <span class="pill">${n(t.regime||e.employmentRegime||"clt")}</span>
                                <span class="pill">${n(t.terminationType||"without_cause")}</span>
                            </div>
                        </div>
                        <div class="hero-company">
                            <strong>${n(i.companyName||"FlowSystem")}</strong>
                            ${s.map(b=>`<div>${n(b)}</div>`).join("")}
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div class="metrics">
                        <div class="metric">
                            <div class="label">Base</div>
                            <div class="value">${window.formatCurrency(t.baseSalary)}</div>
                            <div class="meta">Base de calculo considerada para a simulacao atual.</div>
                        </div>
                        <div class="metric">
                            <div class="label">Bruto</div>
                            <div class="value">${window.formatCurrency(t.gross)}</div>
                            <div class="meta">${t.noticeDays?`Aviso base de ${t.noticeDays} dia(s).`:"Sem aviso legal automatico nesta composicao."}</div>
                        </div>
                        <div class="metric">
                            <div class="label">Liquido</div>
                            <div class="value">${window.formatCurrency(t.net)}</div>
                            <div class="meta">${t.projectedDate?`Data projetada ${n(window.formatDate(t.projectedDate))}.`:"Sem data projetada adicional."}</div>
                        </div>
                    </div>

                    <div class="grid-2">
                        <div class="card">
                            <div class="card-head">
                                <div class="eyebrow">Colaborador</div>
                                <strong>Base cadastral da simulacao</strong>
                            </div>
                            <div class="card-body">
                                <div class="info-grid">
                                    <div class="info-item"><div class="label">Nome</div><div class="value">${n(p(e))}</div></div>
                                    <div class="info-item"><div class="label">Cargo</div><div class="value">${n(e.position||"-")}</div></div>
                                    <div class="info-item"><div class="label">Admissao</div><div class="value">${n(window.formatDate(e.admissionDate||""))}</div></div>
                                    <div class="info-item"><div class="label">Regime</div><div class="value">${n(e.employmentRegime||"clt")}</div></div>
                                    <div class="info-item"><div class="label">Ferias pendentes</div><div class="value">${window.toNumber(e.vacationBalanceDays)} dia(s)</div></div>
                                    <div class="info-item"><div class="label">Salario cadastrado</div><div class="value">${window.formatCurrency(e.salary)}</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-head">
                                <div class="eyebrow">Diretrizes</div>
                                <strong>Observacoes da composicao</strong>
                            </div>
                            <div class="card-body">
                                <div class="info-grid" style="grid-template-columns: 1fr;">
                                    ${(t.notes||[]).map(b=>`<div class="info-item"><div class="value" style="margin-top:0;font-weight:600;">${n(b)}</div></div>`).join("")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="margin-top: 18px;">
                        <div class="card-head">
                            <div class="eyebrow">Verbas</div>
                            <strong>Composicao financeira da rescisao</strong>
                        </div>
                        <div class="card-body" style="padding: 0;">
                            <table>
                                <thead>
                                    <tr><th>Verba</th><th>Natureza</th><th>Valor</th></tr>
                                </thead>
                                <tbody>
                                    ${m.map(b=>`
                                        <tr>
                                            <td>${n(b.label)}</td>
                                            <td>${b.amount>=0?"Credito":"Desconto"}</td>
                                            <td class="${b.amount>=0?"positive":"negative"}">${b.amount>=0?"+":"-"} ${window.formatCurrency(Math.abs(b.amount))}</td>
                                        </tr>
                                    `).join("")||'<tr><td colspan="3" style="text-align:center;color:#64748b;font-weight:700;">Nenhuma verba calculada para os parametros informados.</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="notes">
                        <div class="eyebrow">Aviso</div>
                        <p>Esta impressao tem natureza de simulacao interna. Convencoes coletivas, INSS, IRRF, acordos judiciais e verbas especificas podem alterar o valor final homologado.</p>
                    </div>
                </div>

                <div class="footer">
                    <div>
                        <strong>${n(i.companyName||"FlowSystem")}</strong>
                        <div>${n(i.phone||i.address||"Contato nao informado")}</div>
                    </div>
                    <div style="text-align:right;">
                        <div>Documento gerado em ${n(new Date().toLocaleDateString("pt-BR"))}</div>
                        <div>Simulacao preparada para RH, financeiro e decisao gerencial.</div>
                    </div>
                </div>
            </div>
        `;U(`Rescisao ${window.escapeHtml(p(e))}`,u,r)},window.deletePayrollRun=async o=>{const e=(d.payrollRuns||[]).find(a=>a.id===o);if(e&&await window.customConfirm(`Excluir a folha de ${h(e.month)}? Os vales descontados nela voltarao para pendente.`))try{for(const a of e.advanceIds||[])(d.hrAdvances||[]).find(n=>n.id===a)&&await R(k(x,"artifacts",y,"public","data","hr_advances",a),{status:"pending",payrollRunId:"",discountedMonth:"",updatedAt:H()});e.financialEntryId&&await N(k(x,"artifacts",y,"public","data","financial",e.financialEntryId)),await N(k(x,"artifacts",y,"public","data","payroll_runs",o)),window.logAudit("RH_FOLHA",`Folha ${e.month} excluida e descontos revertidos.`)}catch(a){window.customAlert("Erro ao excluir folha: "+a.message)}},window.wrapPermissionGuard("hr",["openHrEmployeeModal","saveHrEmployee","deleteHrEmployee","openHrAdvanceModal","saveHrAdvance","deleteHrAdvance","openHrOccurrenceModal","saveHrOccurrence","deleteHrOccurrence","openPayrollRunModal","generatePayrollRun","viewPayrollRun","printHrPayslip","openHrTerminationCalculator","printTerminationEstimate","deletePayrollRun"],"Sem permissao para operar o RH.")}export{ke as registerHr};

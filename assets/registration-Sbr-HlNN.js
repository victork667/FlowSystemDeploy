function Y(H){const{state:n,defaultKanbanStages:B,defaultRoles:j,firebaseConfig:L,auth:P,db:v,appId:y,initializeApp:V,getAuth:Q,signInWithEmailAndPassword:z,createUserWithEmailAndPassword:O,signOut:G,onAuthStateChanged:U,signInWithCustomToken:W,collection:S,addDoc:I,updateDoc:R,deleteDoc:F,doc:C,onSnapshot:J,serverTimestamp:x,setDoc:Z,getDoc:K,getDocs:X}=H;window.setRegTab=e=>{const o={clients:"reg_clients",suppliers:"reg_suppliers",categories:"reg_categories",sellers:"reg_sellers"};n.regTab=e,n.currentView=o[e]||"reg_clients";const t={clients:"Cadastros · Clientes",suppliers:"Cadastros · Fornecedores",categories:"Cadastros · Categorias",sellers:"Cadastros · Vendedores"},a=document.getElementById("page-title");a&&(a.innerText=t[e]||"Cadastros"),window.renderNav?.(),n.regSearch="",n.regSort="az",window.renderRegistration()},window.setRegSearch=e=>{n.regSearch=String(e||"").toLowerCase(),window.renderRegistration()},window.setRegSort=e=>{n.regSort=e||"az",window.renderRegistration()},window.toggleRegistrationExpanded=()=>{n.registrationExpanded=!n.registrationExpanded,window.renderRegistration()};const D=e=>{if(n.regTab==="clients"){const o=n.commercialDocs.filter(t=>t.clientName===e.name&&t.status==="finalized").reduce((t,a)=>t+(a.totalValue||0),0);return`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">Cliente</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(e.name||"Sem nome")}</h3>
                        <p class="mobile-record-subtitle">${window.escapeHtml(e.email||e.phone||"Sem contato")}</p>
                    </div>
                    <details class="mobile-action-menu">
                        <summary aria-label="Ações do cliente"><i data-lucide="ellipsis"></i></summary>
                        <div class="mobile-action-menu-panel">
                            <button type="button" class="mobile-action-menu-item" onclick="window.openEntityReport('client', '${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="bar-chart-2"></i><span>Relatório</span></button>
                            <button type="button" class="mobile-action-menu-item" onclick="window.duplicateReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="copy"></i><span>Duplicar</span></button>
                            <button type="button" class="mobile-action-menu-item" onclick="window.openRegModal('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>
                            <button type="button" class="mobile-action-menu-item danger" onclick="window.delReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
                        </div>
                    </details>
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Telefone</p><p class="mobile-record-meta-value">${window.escapeHtml(e.phone||"-")}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Faturado</p><p class="mobile-record-meta-value">${window.formatCurrency(o)}</p></div>
                </div>
            </div>`}if(n.regTab==="sellers"){const o=n.commercialDocs.filter(t=>t.sellerName===e.name&&t.status==="finalized").reduce((t,a)=>t+(a.totalValue||0),0);return`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">Vendedor</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(e.name||"Sem nome")}</h3>
                        <p class="mobile-record-subtitle">${window.escapeHtml(`${window.toNumber(e.commissionRate)}% de comissão`)}</p>
                    </div>
                    <details class="mobile-action-menu">
                        <summary aria-label="Ações do vendedor"><i data-lucide="ellipsis"></i></summary>
                        <div class="mobile-action-menu-panel">
                            <button type="button" class="mobile-action-menu-item" onclick="window.openEntityReport('seller', '${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="bar-chart-2"></i><span>Relatório</span></button>
                            <button type="button" class="mobile-action-menu-item" onclick="window.duplicateReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="copy"></i><span>Duplicar</span></button>
                            <button type="button" class="mobile-action-menu-item" onclick="window.openRegModal('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>
                            <button type="button" class="mobile-action-menu-item danger" onclick="window.delReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
                        </div>
                    </details>
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Comissão</p><p class="mobile-record-meta-value">${window.toNumber(e.commissionRate)}%</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Vendido</p><p class="mobile-record-meta-value">${window.formatCurrency(o)}</p></div>
                </div>
            </div>`}return n.regTab==="suppliers"?`
            <div class="mobile-record-card">
                <div class="mobile-record-head">
                    <div class="min-w-0 flex-1">
                        <p class="mobile-record-kicker">Fornecedor</p>
                        <h3 class="mobile-record-title">${window.escapeHtml(e.name||"Sem nome")}</h3>
                        <p class="mobile-record-subtitle">${window.escapeHtml(e.contactName||"Sem contato")}</p>
                    </div>
                    <details class="mobile-action-menu">
                        <summary aria-label="Ações do fornecedor"><i data-lucide="ellipsis"></i></summary>
                        <div class="mobile-action-menu-panel">
                            <button type="button" class="mobile-action-menu-item" onclick="window.duplicateReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="copy"></i><span>Duplicar</span></button>
                            <button type="button" class="mobile-action-menu-item" onclick="window.openRegModal('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>
                            <button type="button" class="mobile-action-menu-item danger" onclick="window.delReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
                        </div>
                    </details>
                </div>
                <div class="mobile-record-grid">
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Contato</p><p class="mobile-record-meta-value">${window.escapeHtml(e.contactName||"-")}</p></div>
                    <div class="mobile-record-meta"><p class="mobile-record-meta-label">Telefone</p><p class="mobile-record-meta-value">${window.escapeHtml(e.phone||"-")}</p></div>
                </div>
            </div>`:`
        <div class="mobile-record-card">
            <div class="mobile-record-head">
                <div class="min-w-0 flex-1">
                    <p class="mobile-record-kicker">Categoria</p>
                    <h3 class="mobile-record-title">${window.escapeHtml(e.name||"Sem nome")}</h3>
                    <p class="mobile-record-subtitle">Categoria do sistema</p>
                </div>
                <details class="mobile-action-menu">
                    <summary aria-label="Ações da categoria"><i data-lucide="ellipsis"></i></summary>
                    <div class="mobile-action-menu-panel">
                        <button type="button" class="mobile-action-menu-item" onclick="window.duplicateReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="copy"></i><span>Duplicar</span></button>
                        <button type="button" class="mobile-action-menu-item" onclick="window.openRegModal('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>
                        <button type="button" class="mobile-action-menu-item danger" onclick="window.delReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
                    </div>
                </details>
            </div>
        </div>`},A=(e,o=0)=>{const t=window.toNumber(e.quantity),a=window.toNumber(e.costPrice),s=window.getInventoryHealthMeta(e,o);return`
        <div class="mobile-record-card">
            <div class="mobile-record-head">
                <div class="min-w-0 flex-1">
                    <p class="mobile-record-kicker">Estoque</p>
                    <h3 class="mobile-record-title">${window.escapeHtml(e.name||"Material")}</h3>
                    <p class="mobile-record-subtitle">${window.escapeHtml(e.category||"Geral")}</p>
                </div>
                <details class="mobile-action-menu">
                    <summary aria-label="Ações do estoque"><i data-lucide="ellipsis"></i></summary>
                    <div class="mobile-action-menu-panel">
                        <button type="button" class="mobile-action-menu-item" onclick="window.openCycleCountById('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="scan-line"></i><span>Inventário rotativo</span></button>
                        <button type="button" class="mobile-action-menu-item" onclick="window.startPurchaseFromInventory('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="shopping-cart"></i><span>Gerar compra</span></button>
                        <button type="button" class="mobile-action-menu-item" onclick="window.openStockAdjustById('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="sliders-horizontal"></i><span>Ajuste rápido</span></button>
                        <button type="button" class="mobile-action-menu-item" onclick="window.openStockHistoryById('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="history"></i><span>Histórico</span></button>
                        <button type="button" class="mobile-action-menu-item" onclick="window.openRegModal('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>
                        <button type="button" class="mobile-action-menu-item danger" onclick="window.delReg('${e.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
                    </div>
                </details>
            </div>
            <div class="mobile-record-grid">
                <div class="mobile-record-meta"><p class="mobile-record-meta-label">Saldo</p><p class="mobile-record-meta-value">${t} ${window.escapeHtml(e.unit||"un")}</p></div>
                <div class="mobile-record-meta"><p class="mobile-record-meta-label">Em compra</p><p class="mobile-record-meta-value">${o>0?`${o} ${window.escapeHtml(e.unit||"un")}`:"-"}</p></div>
                <div class="mobile-record-meta"><p class="mobile-record-meta-label">Valor</p><p class="mobile-record-meta-value">${window.formatCurrency(t*a)}</p></div>
                <div class="mobile-record-meta"><p class="mobile-record-meta-label">Status</p><p class="mobile-record-meta-value">${window.escapeHtml(s.label)}</p></div>
            </div>
            <div class="mobile-record-footer">
                <div class="mobile-record-status"><span class="badge ${s.badge}">${s.label}</span></div>
            </div>
        </div>`};window.getFilteredRegistrationData=()=>{const e=[...n[n.regTab]||[]],o=String(n.regSearch||"").toLowerCase(),t=e.filter(a=>o?[a.name,a.email,a.phone,a.document,a.contactName,a.category,a.city].map(d=>String(d||"").toLowerCase()).join(" ").includes(o):!0);return t.sort((a,s)=>n.regSort==="za"?String(s.name||"").localeCompare(String(a.name||"")):n.regSort==="recent"?(s.createdAt?.seconds||0)-(a.createdAt?.seconds||0):n.regSort==="oldest"?(a.createdAt?.seconds||0)-(s.createdAt?.seconds||0):String(a.name||"").localeCompare(String(s.name||""))),t},window.exportRegistrationCsv=()=>{const e=[],o=window.getFilteredRegistrationData();n.regTab==="clients"?(e.push(["Nome","Documento","Telefone","Email","Cidade"]),o.forEach(t=>e.push([t.name,t.document||"",t.phone||"",t.email||"",t.city||""]))):n.regTab==="suppliers"?(e.push(["Nome","Documento","Contato","Telefone","Email"]),o.forEach(t=>e.push([t.name,t.document||"",t.contactName||"",t.phone||"",t.email||""]))):n.regTab==="sellers"?(e.push(["Nome","Comissao %"]),o.forEach(t=>e.push([t.name,window.toNumber(t.commissionRate)]))):(e.push(["Nome"]),o.forEach(t=>e.push([t.name]))),window.downloadCsv(`cadastros-${n.regTab}-${new Date().toISOString().slice(0,10)}.csv`,e)},window.duplicateReg=async e=>{const o=n.regTab,t=(n[o]||[]).find(s=>s.id===e);if(!t||!await window.customConfirm(`Duplicar o cadastro "${t.name}"?`))return;const a={...t};delete a.id,delete a.createdAt,delete a.updatedAt,a.name=`${t.name} (Cópia)`,a.companyId=n.companyId,a.createdAt=x();try{await I(S(v,"artifacts",y,"public","data",o),a),window.logAudit("DUPLICAR_REGISTO",`Duplicado registo no módulo ${o}: ${t.name}`)}catch(s){window.customAlert("Erro ao duplicar cadastro: "+s.message)}},window.renderRegistration=()=>{const e=document.getElementById("view-container"),o=window.getFilteredRegistrationData(),t=window.isCompactLayout?.(),a=(n.settings.customRoles||j).find(i=>i.id===n.role)||{perms:[]},s=n.role==="admin"?["reg_clients","reg_suppliers","reg_categories","reg_sellers"]:a.perms,l=[{k:"clients",l:"Clientes",req:"reg_clients"},{k:"suppliers",l:"Fornecedores",req:"reg_suppliers"},{k:"categories",l:"Categorias",req:"reg_categories"},{k:"sellers",l:"Vendedores",req:"reg_sellers"}].filter(i=>s.includes(i.req)||n.role==="admin");l.length>0&&!l.find(i=>i.k===n.regTab)&&(n.regTab=l[0].k);let c="";n.regTab==="clients"?c=o.map(i=>{const u=n.commercialDocs.filter(m=>m.clientName===i.name&&m.status==="finalized").reduce((m,h)=>m+(h.totalValue||0),0);return`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-bold text-gray-800">${i.name}<br><span class="text-xs font-normal text-gray-500">${i.email||""}</span></td><td class="p-4 text-gray-600">${i.phone||"-"}</td><td class="p-4 text-right font-bold text-theme">${window.formatCurrency(u)}</td><td class="p-4 text-right"><button onclick="window.openEntityReport('client', '${i.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-1 transition" title="Relatório Completo"><i data-lucide="bar-chart-2" class="w-4 h-4"></i></button><button onclick="window.duplicateReg('${i.id}')" class="text-cyan-600 hover:bg-cyan-50 p-2 rounded-lg mr-1 transition" title="Duplicar"><i data-lucide="copy" class="w-4 h-4"></i></button><button onclick="window.openRegModal('${i.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg mr-1 transition" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.delReg('${i.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition" title="Apagar"><i data-lucide="trash-2" class="w-4 h-4"></i></button></td></tr>`}).join(""):n.regTab==="sellers"?c=o.map(i=>{const u=n.commercialDocs.filter(m=>m.sellerName===i.name&&m.status==="finalized").reduce((m,h)=>m+(h.totalValue||0),0);return`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-bold text-gray-800">${i.name}</td><td class="p-4 text-gray-600">${i.commissionRate||0}%</td><td class="p-4 text-right font-bold text-green-600">${window.formatCurrency(u)}</td><td class="p-4 text-right"><button onclick="window.openEntityReport('seller', '${i.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-1 transition" title="Relatório de Vendas"><i data-lucide="bar-chart-2" class="w-4 h-4"></i></button><button onclick="window.duplicateReg('${i.id}')" class="text-cyan-600 hover:bg-cyan-50 p-2 rounded-lg mr-1 transition" title="Duplicar"><i data-lucide="copy" class="w-4 h-4"></i></button><button onclick="window.openRegModal('${i.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg mr-1 transition" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.delReg('${i.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button></td></tr>`}).join(""):n.regTab==="inventory"?c=o.map(i=>`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-bold text-gray-800">${i.name}</td><td class="p-4 text-gray-600"><span class="badge badge-gray">${i.category||"Geral"}</span></td><td class="p-4 font-bold ${i.quantity<=(i.minQty||5)?"text-red-600":""}">${i.quantity} ${i.unit||"un"}</td><td class="p-4 text-right flex justify-end"><button onclick="window.openStockAdjust('${i.id}', '${i.name}', ${i.quantity}, '${i.unit}')" class="text-yellow-600 hover:bg-yellow-50 p-2 rounded-lg mr-1 transition" title="Ajuste Rápido"><i data-lucide="sliders-horizontal" class="w-4 h-4"></i></button><button onclick="window.openStockHistory('${i.id}', '${i.name}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-1 transition" title="Histórico"><i data-lucide="history" class="w-4 h-4"></i></button><button onclick="window.openRegModal('${i.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg mr-1 transition" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.delReg('${i.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition" title="Apagar"><i data-lucide="trash-2" class="w-4 h-4"></i></button></td></tr>`).join(""):n.regTab==="suppliers"?c=o.map(i=>`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-bold text-gray-800">${i.name}</td><td class="p-4 text-gray-600">${i.contactName||"-"}</td><td class="p-4 text-gray-600">${i.phone||"-"}</td><td class="p-4 text-right"><button onclick="window.duplicateReg('${i.id}')" class="text-cyan-600 hover:bg-cyan-50 p-2 rounded-lg mr-1 transition" title="Duplicar"><i data-lucide="copy" class="w-4 h-4"></i></button><button onclick="window.openRegModal('${i.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg mr-1 transition"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.delReg('${i.id}')" class="text-red-400 hover:text-red-600 p-2 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button></td></tr>`).join(""):c=o.map(i=>`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-bold text-gray-800">${i.name}</td><td class="p-4 text-gray-600">Categoria do Sistema</td><td class="p-4 text-right"><button onclick="window.duplicateReg('${i.id}')" class="text-cyan-600 hover:bg-cyan-50 p-2 rounded-lg mr-1 transition" title="Duplicar"><i data-lucide="copy" class="w-4 h-4"></i></button><button onclick="window.openRegModal('${i.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg mr-1 transition"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.delReg('${i.id}')" class="text-red-400 hover:text-red-600 p-2 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button></td></tr>`).join("");const g=o.map(D).join(""),f=String(n.currentView||"").startsWith("reg_");e.innerHTML=`
        ${f?"":`<div class="ui-tab-row mb-6">${l.map(i=>`<button onclick="window.setRegTab('${i.k}')" class="${window.getUiTabClass(n.regTab===i.k)}">${i.l}</button>`).join("")}</div>`}
        <div class="card-modern overflow-hidden">
            <div class="p-4 border-b border-gray-100 bg-gray-50/50">
                <div class="flex flex-col lg:flex-row justify-between gap-3">
                    <div>
                        <h3 class="font-bold text-gray-700 capitalize">Lista: ${l.find(i=>i.k===n.regTab)?.l||""}</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">${o.length} registro(s) filtrado(s)</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <button onclick="window.toggleRegistrationExpanded()" class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-black text-sm hover:border-theme/30 hover:text-theme transition">${n.registrationExpanded?"Recolher filtros":"Ver filtros e acoes"}</button>
                        <button onclick="window.openRegModal()" class="btn-gradient px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center hover:scale-105 transition"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo</button>
                    </div>
                </div>
                <div class="${n.registrationExpanded?"mt-4 flex flex-col md:flex-row gap-2":"hidden"}">
                    <input oninput="window.setRegSearch(this.value)" value="${window.escapeHtml(n.regSearch||"")}" placeholder="Buscar cadastro..." class="input-modern md:w-64">
                    <select onchange="window.setRegSort(this.value)" class="input-modern md:w-40">
                        <option value="az" ${n.regSort==="az"?"selected":""}>A-Z</option>
                        <option value="za" ${n.regSort==="za"?"selected":""}>Z-A</option>
                        <option value="recent" ${n.regSort==="recent"?"selected":""}>Recentes</option>
                        <option value="oldest" ${n.regSort==="oldest"?"selected":""}>Antigos</option>
                    </select>
                    <button onclick="window.exportRegistrationCsv()" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-black text-sm hover:bg-gray-50 flex items-center"><i data-lucide="download" class="w-4 h-4 mr-2"></i> Exportar</button>
                </div>
            </div>
            ${t?`<div class="mobile-list-stack p-4">${g||'<div class="card-modern p-6 text-center text-gray-400">Nenhum registro encontrado.</div>'}</div>`:`<div class="overflow-x-auto"><table class="w-full text-left text-sm min-w-[600px]"><tbody class="divide-y divide-gray-100">${c||'<tr><td colspan="5" class="p-8 text-center text-gray-400">Nenhum registo encontrado.</td></tr>'}</tbody></table></div>`}
        </div>
    `,window.lucide&&lucide.createIcons()},window.renderInventory=()=>{n.regTab="inventory";const e=document.getElementById("view-container");if(!e)return;window.isCompactLayout?.();const o=n.inventory||[],t=o.map(a=>`<tr class="hover:bg-gray-50 transition"><td class="p-4 font-bold text-gray-800">${a.name}</td><td class="p-4 text-gray-600"><span class="badge badge-gray">${a.category||"Geral"}</span></td><td class="p-4 font-bold ${a.quantity<=(a.minQty||5)?"text-red-600":""}">${a.quantity} ${a.unit||"un"}</td><td class="p-4 text-right flex justify-end"><button onclick="window.openStockAdjust('${a.id}', '${a.name}', ${a.quantity}, '${a.unit}')" class="text-yellow-600 hover:bg-yellow-50 p-2 rounded-lg mr-1 transition" title="Ajuste Rápido"><i data-lucide="sliders-horizontal" class="w-4 h-4"></i></button><button onclick="window.openStockHistory('${a.id}', '${a.name}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg mr-1 transition" title="Histórico"><i data-lucide="history" class="w-4 h-4"></i></button><button onclick="window.openRegModal('${a.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg mr-1 transition" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button><button onclick="window.delReg('${a.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition" title="Apagar"><i data-lucide="trash-2" class="w-4 h-4"></i></button></td></tr>`).join("");e.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="card-modern p-5 border-l-4 border-theme">
                <p class="text-xs font-bold text-gray-400 uppercase">Itens cadastrados</p>
                <p class="text-2xl font-black text-gray-800">${o.length}</p>
            </div>
            <div class="card-modern p-5 border-l-4 border-red-500">
                <p class="text-xs font-bold text-gray-400 uppercase">Estoque baixo</p>
                <p class="text-2xl font-black text-red-600">${o.filter(a=>a.quantity<=(a.minQty||5)).length}</p>
            </div>
            <div class="card-modern p-5 border-l-4 border-blue-500 md:col-span-2">
                <p class="text-xs font-bold text-gray-400 uppercase">Movimentações</p>
                <p class="text-2xl font-black text-blue-600">${n.inventoryMovements.length}</p>
            </div>
        </div>
        <div class="card-modern overflow-hidden">
            <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 class="font-bold text-gray-700">Lista: Estoque</h3>
                <button onclick="window.openRegModal()" class="btn-gradient px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center hover:scale-105 transition"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo Material</button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm min-w-[600px]">
                    <tbody class="divide-y divide-gray-100">${t||'<tr><td colspan="5" class="p-8 text-center text-gray-400">Nenhum item de estoque encontrado.</td></tr>'}</tbody>
                </table>
            </div>
        </div>
    `,window.lucide&&lucide.createIcons()},window.setInvSearch=e=>{n.invSearch=String(e||"").toLowerCase(),window.renderInventory()},window.setInvCategoryFilter=e=>{n.invCategoryFilter=e,window.renderInventory()},window.setInvStockFilter=e=>{n.invStockFilter=e,window.renderInventory()},window.setInvSort=e=>{n.invSort=e||"name_asc",window.renderInventory()},window.openStockAdjustById=e=>{const o=n.inventory.find(t=>t.id===e);o&&window.openStockAdjust(o.id,o.name,window.toNumber(o.quantity),o.unit||"un")},window.openStockHistoryById=e=>{const o=n.inventory.find(t=>t.id===e);o&&window.openStockHistory(o.id,o.name)},window.getInventoryInboundMap=()=>{const e={};return(n.purchaseDocs||[]).forEach(o=>{(o.status||"pending")!=="received"&&(o.items||[]).forEach(t=>{t.invId&&(e[t.invId]=(e[t.invId]||0)+window.toNumber(t.qty))})}),e},window.getInventoryHealthMeta=(e,o=0)=>{const t=window.toNumber(e.quantity),a=Math.max(window.toNumber(e.minQty,5),0),s=t+o,d=Math.max(a-s,0);return t<=a?{key:"critical",label:"Critico",badge:"badge-red",projected:s,suggestedQty:d}:t<=a*1.5?{key:"attention",label:"Atencao",badge:"badge-yellow",projected:s,suggestedQty:d}:{key:"healthy",label:"Saudavel",badge:"badge-green",projected:s,suggestedQty:d}},window.openCycleCountById=e=>{const o=n.inventory.find(t=>t.id===e);o&&window.openCycleCountModal(e,o.name,window.toNumber(o.quantity),o.unit||"un")},window.openCycleCountModal=(e,o,t,a)=>{document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md m-4">
                <h3 class="text-lg font-bold mb-1">Inventario Rotativo</h3>
                <p class="text-sm text-gray-500 mb-4">${window.escapeHtml(o)} <span class="font-bold">(saldo atual: ${t} ${window.escapeHtml(a)})</span></p>
                <div class="space-y-4">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Quantidade contada</label>
                        <input id="cycle-count-qty" type="number" class="input-modern" value="${t}">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacao</label>
                        <input id="cycle-count-note" class="input-modern" placeholder="Ex: conferido no deposito principal">
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-6">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 text-sm font-bold transition">Cancelar</button>
                    <button onclick="window.saveCycleCount('${e}', ${t})" class="btn-gradient px-4 py-2 text-white rounded-lg text-sm font-bold shadow hover:scale-105 transition">Salvar contagem</button>
                </div>
            </div>
        </div>
    `},window.saveCycleCount=async(e,o)=>{const t=parseFloat(document.getElementById("cycle-count-qty")?.value),a=document.getElementById("cycle-count-note")?.value||"";if(Number.isNaN(t)||t<0){window.customAlert("Informe uma quantidade contada valida.");return}const s=t-window.toNumber(o);try{await R(C(v,"artifacts",y,"public","data","inventory",e),{quantity:t,lastCountedAt:x(),updatedAt:x()}),await I(S(v,"artifacts",y,"public","data","inventory_movements"),{itemId:e,type:s>=0?"in":"out",quantity:Math.abs(s),reason:`Inventario rotativo${a?` - ${a}`:""}`,date:x(),user:n.user?.email||"Sistema",companyId:n.companyId}),document.getElementById("modal-container").innerHTML="",window.logAudit("INVENTARIO_ROTATIVO",`Contagem do item ${e} ajustada de ${o} para ${t}`)}catch(d){window.customAlert("Erro ao salvar contagem: "+d.message)}},window.getFilteredInventory=()=>{const e=String(n.invSearch||"").toLowerCase(),o=window.getInventoryInboundMap();return(n.inventory||[]).filter(t=>{const a=!e||String(t.name||"").toLowerCase().includes(e)||String(t.category||"").toLowerCase().includes(e),s=n.invCategoryFilter==="all"||(t.category||"Geral")===n.invCategoryFilter,d=window.toNumber(o[t.id]),l=window.getInventoryHealthMeta(t,d),c=n.invStockFilter==="all"||n.invStockFilter==="low"&&l.key==="critical"||n.invStockFilter==="attention"&&l.key==="attention"||n.invStockFilter==="ok"&&l.key==="healthy"||n.invStockFilter==="inbound"&&d>0;return a&&s&&c}).sort((t,a)=>{const s=n.invSort||"name_asc";if(s==="name_desc")return String(a.name||"").localeCompare(String(t.name||""));if(s==="qty_asc")return window.toNumber(t.quantity)-window.toNumber(a.quantity);if(s==="qty_desc")return window.toNumber(a.quantity)-window.toNumber(t.quantity);if(s==="value_desc")return window.toNumber(a.quantity)*window.toNumber(a.costPrice)-window.toNumber(t.quantity)*window.toNumber(t.costPrice);if(s==="critical_first"){const d={critical:0,attention:1,healthy:2},l=d[window.getInventoryHealthMeta(t,window.toNumber(o[t.id])).key]??99,c=d[window.getInventoryHealthMeta(a,window.toNumber(o[a.id])).key]??99;return l-c||String(t.name||"").localeCompare(String(a.name||""))}return String(t.name||"").localeCompare(String(a.name||""))})},window.exportInventoryCsv=()=>{const e=window.getInventoryInboundMap(),o=[["Nome","Categoria","Quantidade","Em Compra","Saldo Projetado","Status","Unidade","Custo Base","Valor em Estoque","Estoque Minimo","Sugestao Reposicao"],...window.getFilteredInventory().map(t=>[t.name,t.category||"Geral",window.toNumber(t.quantity),window.toNumber(e[t.id]),window.getInventoryHealthMeta(t,window.toNumber(e[t.id])).projected,window.getInventoryHealthMeta(t,window.toNumber(e[t.id])).label,t.unit||"un",window.toNumber(t.costPrice),window.toNumber(t.quantity)*window.toNumber(t.costPrice),window.toNumber(t.minQty,5),window.getInventoryHealthMeta(t,window.toNumber(e[t.id])).suggestedQty])];window.downloadCsv(`estoque-${new Date().toISOString().slice(0,10)}.csv`,o)},window.renderInventory=()=>{n.regTab="inventory";const e=document.getElementById("view-container");if(!e)return;window.isCompactLayout?.();const o=n.inventory||[],t=window.getFilteredInventory(),a=window.getInventoryInboundMap(),s=[...new Set(o.map(i=>i.category||"Geral"))].sort(),d=o.filter(i=>window.toNumber(i.quantity)<=window.toNumber(i.minQty,5));o.filter(i=>window.getInventoryHealthMeta(i,window.toNumber(a[i.id])).key==="attention");const l=o.filter(i=>window.toNumber(a[i.id])>0),c=o.reduce((i,u)=>i+window.toNumber(u.quantity)*window.toNumber(u.costPrice),0);t.reduce((i,u)=>i+window.toNumber(u.quantity)*window.toNumber(u.costPrice),0),o.reduce((i,u)=>i+window.getInventoryHealthMeta(u,window.toNumber(a[u.id])).suggestedQty,0);const g=[...n.inventoryMovements||[]].sort((i,u)=>(u.date?.seconds||0)-(i.date?.seconds||0)).slice(0,6);o.map(i=>({item:i,inboundQty:window.toNumber(a[i.id]),health:window.getInventoryHealthMeta(i,window.toNumber(a[i.id]))})).filter(i=>i.health.suggestedQty>0||i.inboundQty>0).sort((i,u)=>{const m={critical:0,attention:1,healthy:2};return(m[i.health.key]??9)-(m[u.health.key]??9)||String(i.item.name||"").localeCompare(String(u.item.name||""))}).slice(0,6);const f=t.map(i=>{const u=window.toNumber(i.quantity),m=window.toNumber(i.minQty,5),h=window.toNumber(i.costPrice),$=window.toNumber(a[i.id]),r=window.getInventoryHealthMeta(i,$),p=r.projected;return`
            <tr class="hover:bg-gray-50 transition">
                <td class="p-4">
                    <div class="font-black text-gray-800">${window.escapeHtml(i.name)}</div>
                    <div class="text-xs text-gray-400 font-bold">${window.escapeHtml(i.id)}</div>
                </td>
                <td class="p-4 text-gray-600"><span class="badge badge-gray">${window.escapeHtml(i.category||"Geral")}</span></td>
                <td class="p-4"><span class="badge ${r.badge}">${r.label}</span></td>
                <td class="p-4">
                    <div class="font-black ${r.key==="critical"?"text-red-600":r.key==="attention"?"text-yellow-700":"text-gray-800"}">${u} ${window.escapeHtml(i.unit||"un")}</div>
                    <div class="text-[10px] uppercase font-bold text-gray-400">mín. ${m}</div>
                </td>
                <td class="p-4 text-right font-bold ${$>0?"text-blue-600":"text-gray-400"}">${$>0?`${$} ${window.escapeHtml(i.unit||"un")}`:"-"}</td>
                <td class="p-4 text-right font-black ${p<=m?"text-red-600":"text-gray-800"}">${p} ${window.escapeHtml(i.unit||"un")}</td>
                <td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(h)}</td>
                <td class="p-4 text-right font-black text-theme">${window.formatCurrency(u*h)}</td>
                <td class="p-4 text-right">
                    <div class="flex justify-end gap-1">
                        <button onclick="window.openCycleCountById('${i.id}')" class="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition" title="Inventario Rotativo"><i data-lucide="scan-line" class="w-4 h-4"></i></button>
                        <button onclick="window.startPurchaseFromInventory('${i.id}')" class="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition" title="Gerar Compra"><i data-lucide="shopping-cart" class="w-4 h-4"></i></button>
                        <button onclick="window.openStockAdjustById('${i.id}')" class="text-yellow-600 hover:bg-yellow-50 p-2 rounded-lg transition" title="Ajuste Rápido"><i data-lucide="sliders-horizontal" class="w-4 h-4"></i></button>
                        <button onclick="window.openStockHistoryById('${i.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition" title="Histórico"><i data-lucide="history" class="w-4 h-4"></i></button>
                        <button onclick="window.openRegModal('${i.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button>
                        <button onclick="window.delReg('${i.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition" title="Apagar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                </td>
            </tr>
        `}).join("");t.map(i=>A(i,window.toNumber(a[i.id]))).join(""),e.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="card-modern p-5 border-l-4 border-theme"><p class="text-xs font-bold text-gray-400 uppercase">Itens cadastrados</p><p class="text-2xl font-black text-gray-800">${o.length}</p></div>
            <div class="card-modern p-5 border-l-4 border-red-500"><p class="text-xs font-bold text-gray-400 uppercase">Estoque baixo</p><p class="text-2xl font-black text-red-600">${d.length}</p></div>
            <div class="card-modern p-5 border-l-4 border-blue-500"><p class="text-xs font-bold text-gray-400 uppercase">Em compra</p><p class="text-2xl font-black text-blue-600">${l.length}</p></div>
            <div class="card-modern p-5 border-l-4 border-green-500"><p class="text-xs font-bold text-gray-400 uppercase">Valor total</p><p class="text-2xl font-black text-green-600">${window.formatCurrency(c)}</p></div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div class="xl:col-span-2 card-modern overflow-hidden">
                <div class="p-4 border-b border-gray-100 bg-gray-50/50">
                    <div class="flex flex-col lg:flex-row justify-between gap-3">
                        <div><h3 class="font-black text-gray-800">Gestão de Estoque</h3><p class="text-xs text-gray-400 font-bold mt-1">${t.length} item(ns) encontrados</p></div>
                        <div class="flex flex-col md:flex-row gap-2">
                            <input oninput="window.setInvSearch(this.value)" value="${window.escapeHtml(n.invSearch||"")}" placeholder="Buscar material ou categoria..." class="input-modern md:w-64">
                            <select onchange="window.setInvCategoryFilter(this.value)" class="input-modern md:w-44">
                                <option value="all">Todas categorias</option>
                                ${s.map(i=>`<option value="${window.escapeHtml(i)}" ${n.invCategoryFilter===i?"selected":""}>${window.escapeHtml(i)}</option>`).join("")}
                            </select>
                            <select onchange="window.setInvStockFilter(this.value)" class="input-modern md:w-36">
                                <option value="all" ${n.invStockFilter==="all"?"selected":""}>Todos</option>
                                <option value="low" ${n.invStockFilter==="low"?"selected":""}>Críticos</option>
                                <option value="ok" ${n.invStockFilter==="ok"?"selected":""}>Saudáveis</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-4">
                        <button onclick="window.openRegModal()" class="btn-gradient px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center hover:scale-105 transition"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo Material</button>
                        <button onclick="window.exportInventoryCsv()" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-black text-sm hover:bg-gray-50 flex items-center"><i data-lucide="download" class="w-4 h-4 mr-2"></i> Exportar CSV</button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[820px]">
                        <thead class="bg-white text-xs uppercase text-gray-400 font-black border-b"><tr><th class="p-4">Material</th><th class="p-4">Categoria</th><th class="p-4">Qtd</th><th class="p-4 text-right">Custo</th><th class="p-4 text-right">Valor</th><th class="p-4 text-right">Ações</th></tr></thead>
                        <tbody class="divide-y divide-gray-100">${f||'<tr><td colspan="6" class="p-8 text-center text-gray-400">Nenhum item de estoque encontrado.</td></tr>'}</tbody>
                    </table>
                </div>
            </div>

            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100"><h3 class="font-black text-gray-800">Movimentações Recentes</h3></div>
                <div class="divide-y divide-gray-100">
                    ${g.map(i=>{const u=o.find(m=>m.id===i.itemId);return`<div class="p-4"><div class="flex items-center justify-between"><p class="font-black text-gray-800">${window.escapeHtml(u?.name||"Material removido")}</p><span class="badge ${i.type==="in"?"badge-green":"badge-red"}">${i.type==="in"?"Entrada":"Saída"}</span></div><p class="text-xs text-gray-400 font-bold mt-1">${window.formatDate(i.date)} · ${window.toNumber(i.quantity)} ${window.escapeHtml(u?.unit||"un")}</p><p class="text-xs text-gray-500 mt-2">${window.escapeHtml(i.reason||"Sem motivo")}</p></div>`}).join("")||'<p class="text-sm text-gray-400 font-bold text-center py-10">Sem movimentações.</p>'}
                </div>
            </div>
        </div>
    `,window.lucide&&lucide.createIcons()},window.delReg=async e=>{if(await window.customConfirm("Deseja realmente excluir este registo?"))try{await F(C(v,"artifacts",y,"public","data",n.regTab,e)),window.logAudit("APAGAR_REGISTO",`Apagado registo no módulo ${n.regTab}`)}catch(o){window.customAlert("Erro ao excluir: "+o.message)}},window.openRegModal=(e=null)=>{n.editingRegId=e;let o={};e&&(o=(n[n.regTab]||[]).find(c=>c.id===e)||{});const t=(n.categories||[]).map(l=>`<option ${o.category===l.name?"selected":""}>${l.name}</option>`).join("");let a="";n.regTab==="clients"?a=`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome</label><input id="r-name" value="${o.name||""}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">CPF/CNPJ</label><input id="r-doc" value="${o.document||""}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Telefone</label><input id="r-phone" value="${o.phone||""}" class="input-modern"></div><div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label><input id="r-email" value="${o.email||""}" class="input-modern"></div><div><label class="text-xs font-bold text-theme uppercase mb-1 block">CEP (Busca Automática)</label><input id="r-zip" onblur="window.fetchCep(this.value)" class="input-modern" placeholder="Apenas números"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Cidade</label><input id="r-city" value="${o.city||""}" class="input-modern"></div></div>`:n.regTab==="suppliers"?a=`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Razão Social / Nome</label><input id="r-name" value="${o.name||""}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">CNPJ</label><input id="r-doc" value="${o.document||""}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome Contato</label><input id="r-contact" value="${o.contactName||""}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Telefone</label><input id="r-phone" value="${o.phone||""}" class="input-modern"></div><div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label><input id="r-email" value="${o.email||""}" class="input-modern"></div></div>`:n.regTab==="inventory"?a=`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome do Material</label><input id="r-name" value="${o.name||""}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Categoria</label><select id="r-cat" class="input-modern"><option value="">Selecione...</option>${t}</select></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Unidade de Medida</label><select id="r-unit" class="input-modern"><option ${o.unit==="UN"?"selected":""}>UN</option><option ${o.unit==="M"?"selected":""}>M</option><option ${o.unit==="M²"?"selected":""}>M²</option><option ${o.unit==="KG"?"selected":""}>KG</option><option ${o.unit==="L"?"selected":""}>L</option><option ${o.unit==="CX"?"selected":""}>CX</option></select></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">${e?"Qtd Atual (Use Ajuste p/ mudar)":"Qtd Inicial"}</label><input id="r-qty" type="number" value="${o.quantity||0}" class="input-modern" ${e?"disabled":""}></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Custo Base (R$)</label><input id="r-cost" type="number" value="${o.costPrice||0}" class="input-modern"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Alerta de Estoque Mínimo</label><input id="r-min" type="number" value="${o.minQty||5}" class="input-modern"></div></div>`:n.regTab==="sellers"?a=`<div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome do Vendedor</label><input id="r-name" value="${o.name||""}" class="input-modern"></div><div class="mt-4"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Taxa de Comissão (%)</label><input id="r-comm" type="number" value="${o.commissionRate||0}" class="input-modern"></div>`:a=`<div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome da Categoria</label><input id="r-name" value="${o.name||""}" class="input-modern"></div>`;const d={clients:"Cliente",suppliers:"Fornecedor",categories:"Categoria",sellers:"Vendedor",inventory:"Material"}[n.regTab]||"Cadastro";document.getElementById("modal-container").innerHTML=`<div class="modal-overlay"><div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg m-4"><h3 class="text-xl font-bold mb-4">${e?`Editar ${d}`:d}</h3><div class="mb-6 space-y-4">${a}</div><div class="flex justify-end gap-3"><button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 font-bold text-gray-500 bg-gray-100 rounded-lg transition">Cancelar</button><button onclick="window.saveReg()" class="btn-gradient px-6 py-2 text-white font-bold rounded-lg shadow hover:scale-105 transition">Salvar</button></div></div></div>`},window.fetchCep=async e=>{const o=e.replace(/\D/g,"");if(o.length===8)try{const a=await(await fetch(`https://viacep.com.br/ws/${o}/json/`)).json();a.erro?window.customAlert("CEP não encontrado."):document.getElementById("r-city").value=a.localidade}catch{}};const b=e=>String(document.getElementById(e)?.value||"").trim(),E=e=>!e||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),M=e=>{const o=String(e||"").replace(/\D/g,"");return!o||o.length>=10},q=e=>{const o=String(e||"").replace(/\D/g,"");return!o||o.length===11||o.length===14};window.saveReg=async()=>{await window.withActionLock(`save-registration-${n.regTab}`,async()=>{const e=document.querySelector("#modal-container > .modal-overlay > div");window.toggleActionButtons(e,!0,"Salvando...");const o=b("r-name");if(!o){await window.customAlert("O campo Nome e obrigatorio.");return}try{let t={name:o};if(n.regTab==="clients"){const s=b("r-doc"),d=b("r-phone"),l=b("r-email");if(!q(s))return window.customAlert("Informe um CPF/CNPJ valido.");if(!M(d))return window.customAlert("Informe um telefone com DDD valido.");if(!E(l))return window.customAlert("Informe um email valido.");t.document=s,t.phone=d,t.email=l,t.city=b("r-city")}if(n.regTab==="suppliers"){const s=b("r-doc"),d=b("r-phone"),l=b("r-email");if(!q(s))return window.customAlert("Informe um CNPJ valido.");if(!M(d))return window.customAlert("Informe um telefone com DDD valido.");if(!E(l))return window.customAlert("Informe um email valido.");t.document=s,t.phone=d,t.email=l,t.contactName=b("r-contact")}let a=!1;if(n.regTab==="inventory"){const s=b("r-cat"),d=b("r-unit"),l=parseFloat(document.getElementById("r-qty")?.value),c=parseFloat(document.getElementById("r-cost")?.value),g=parseFloat(document.getElementById("r-min")?.value);if(!s)return window.customAlert("Selecione a categoria do material.");if(!d)return window.customAlert("Selecione a unidade de medida.");if(!n.editingRegId&&(!Number.isFinite(l)||l<0))return window.customAlert("Informe uma quantidade inicial valida.");if(Number.isFinite(c)&&c<0)return window.customAlert("O custo base nao pode ser negativo.");if(Number.isFinite(g)&&g<0)return window.customAlert("O estoque minimo nao pode ser negativo.");t.category=s,t.unit=d,n.editingRegId||(t.quantity=Number.isFinite(l)?l:0),t.costPrice=Number.isFinite(c)?c:0,t.minQty=Number.isFinite(g)?g:5,a=!0}if(n.regTab==="sellers"){const s=parseFloat(document.getElementById("r-comm")?.value);if(Number.isFinite(s)&&(s<0||s>100))return window.customAlert("A comissao deve ficar entre 0% e 100%.");t.commissionRate=Number.isFinite(s)?s:0}if(n.editingRegId)await R(C(v,"artifacts",y,"public","data",n.regTab,n.editingRegId),{...t,updatedAt:x()});else{const s=await I(S(v,"artifacts",y,"public","data",n.regTab),{...t,companyId:n.companyId,createdAt:x()});a&&t.quantity>0&&await I(S(v,"artifacts",y,"public","data","inventory_movements"),{itemId:s.id,type:"in",quantity:t.quantity,reason:"Estoque Inicial",date:x(),user:n.user.email||"Utilizador",companyId:n.companyId})}document.getElementById("modal-container").innerHTML=""}catch(t){await window.customAlert("Erro ao salvar: "+t.message)}finally{window.toggleActionButtons(e,!1)}})},window.openStockAdjust=(e,o,t,a)=>{document.getElementById("modal-container").innerHTML=`<div class="modal-overlay"><div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm m-4"><h3 class="text-lg font-bold mb-1">Ajuste de Estoque</h3><p class="text-sm text-gray-500 mb-4">${o} (Atual: ${t} ${a})</p><div class="space-y-3"><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de Ajuste</label><div class="flex gap-2"><button onclick="this.classList.add('ring-2','ring-green-500'); document.getElementById('btn-out').classList.remove('ring-2','ring-red-500'); document.getElementById('adj-type').value='in'" id="btn-in" class="flex-1 py-2 bg-green-50 text-green-700 font-bold rounded-lg border border-green-200">Entrada (+)</button><button onclick="this.classList.add('ring-2','ring-red-500'); document.getElementById('btn-in').classList.remove('ring-2','ring-green-500'); document.getElementById('adj-type').value='out'" id="btn-out" class="flex-1 py-2 bg-red-50 text-red-700 font-bold rounded-lg border border-red-200">Saída (-)</button></div><input type="hidden" id="adj-type"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Quantidade</label><input id="adj-qty" type="number" class="input-modern" placeholder="0.00"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Motivo do Ajuste</label><input id="adj-reason" class="input-modern" placeholder="Ex: Quebra, Perda, Ajuste..."></div></div><div class="flex justify-end gap-2 mt-6"><button onclick="document.getElementById('modal-container').innerHTML=''" class="px-4 py-2 text-gray-500 text-sm font-bold transition">Cancelar</button><button onclick="window.saveStockAdjust('${e}', ${t})" class="btn-gradient px-4 py-2 text-white rounded-lg text-sm font-bold shadow hover:scale-105 transition">Lançar Ajuste</button></div></div></div>`},window.saveStockAdjust=async(e,o)=>{const t=document.getElementById("adj-type").value,a=parseFloat(document.getElementById("adj-qty").value),s=b("adj-reason");if(!t||!a||a<=0){window.customAlert("Selecione o tipo e indique quantidade valida.");return}if(!s){window.customAlert("Informe o motivo do ajuste.");return}const d=t==="in"?o+a:o-a;if(d<0){window.customAlert("O ajuste deixaria o estoque negativo.");return}try{await R(C(v,"artifacts",y,"public","data","inventory",e),{quantity:d}),await I(S(v,"artifacts",y,"public","data","inventory_movements"),{itemId:e,type:t,quantity:a,reason:s,date:x(),user:n.user?.email||"Sistema",companyId:n.companyId}),window.logAudit("AJUSTE_ESTOQUE",`Estoque: ${t==="in"?"+":"-"}${a} (${s})`),document.getElementById("modal-container").innerHTML=""}catch(l){window.customAlert("Erro: "+l.message)}},window.openStockHistory=(e,o)=>{const a=n.inventoryMovements.filter(s=>s.itemId===e).sort((s,d)=>(d.date?.seconds||0)-(s.date?.seconds||0)).map(s=>`<tr class="border-b border-gray-50"><td class="p-3 text-xs text-gray-500">${s.date?new Date(s.date.seconds*1e3).toLocaleString():"-"}</td><td class="p-3 text-xs font-bold ${s.type==="in"?"text-green-600":"text-red-600"}">${s.type==="in"?"ENTRADA":"SAÍDA"}</td><td class="p-3 text-xs font-bold">${s.quantity}</td><td class="p-3 text-xs text-gray-500">${s.reason||"-"}</td><td class="p-3 text-xs text-gray-400">${s.user||"?"}</td></tr>`).join("");document.getElementById("modal-container").innerHTML=`<div class="modal-overlay"><div class="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col m-4"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-bold">Histórico: ${o}</h3><button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-800 transition"><i data-lucide="x"></i></button></div><div class="flex-1 overflow-y-auto"><table class="w-full text-left"><thead class="text-xs font-bold text-gray-400 uppercase bg-gray-50 sticky top-0"><tr><th class="p-3">Data</th><th class="p-3">Tipo</th><th class="p-3">Qtd</th><th class="p-3">Motivo</th><th class="p-3">Usuário</th></tr></thead><tbody>${a||'<tr><td colspan="5" class="p-6 text-center text-gray-400">Sem movimentações.</td></tr>'}</tbody></table></div></div></div>`,window.lucide&&lucide.createIcons()},window.openEntityReport=(e,o)=>{let t="";if(e==="client"){const l=n.clients.find(c=>c.id===o);t=l?l.name:"Desconhecido"}else{const l=n.sellers.find(c=>c.id===o);t=l?l.name:"Desconhecido"}const a=n.commercialDocs.filter(l=>e==="client"?l.clientName===t:l.sellerName===t),s=a.filter(l=>l.status==="finalized").reduce((l,c)=>l+(c.totalValue||0),0),d=[];for(let l=0;l<12;l++){const c=new Date;c.setMonth(c.getMonth()-l);const g=c.toISOString().slice(0,7),f=c.toLocaleDateString("pt-BR",{month:"long",year:"numeric"});d.push(`<option value="${g}">${f}</option>`)}document.getElementById("modal-container").innerHTML=`<div class="modal-overlay"><div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col m-4"><div class="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center"><div><h2 class="text-xl font-bold text-gray-800">${t}</h2><p class="text-xs text-gray-500 uppercase font-bold">${e==="client"?"Histórico do Cliente":"Desempenho"}</p></div><button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button></div><div class="p-6 border-b border-gray-100 bg-white grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-blue-50 p-4 rounded-xl border border-blue-100"><p class="text-xs font-bold text-blue-400 uppercase">Total ${e==="client"?"Faturado":"Vendido"}</p><p class="text-2xl font-black text-blue-600">${window.formatCurrency(s)}</p></div><div class="bg-orange-50 p-4 rounded-xl border border-orange-100"><p class="text-xs font-bold text-orange-400 uppercase">Orçamentos</p><p class="text-2xl font-black text-orange-600">${a.filter(l=>l.type==="quote").length}</p></div><div class="bg-green-50 p-4 rounded-xl border border-green-100"><p class="text-xs font-bold text-green-400 uppercase">O.S. Convertidas</p><p class="text-2xl font-black text-green-600">${a.filter(l=>l.type==="os").length}</p></div></div><div class="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2"><i data-lucide="filter" class="w-4 h-4 text-gray-400"></i><span class="text-xs font-bold text-gray-500 uppercase">Filtrar:</span><select id="report-filter" class="input-modern w-48 py-1 text-sm" onchange="window.filterReportDocs(this.value)"><option value="all">Todos os Períodos</option>${d.join("")}</select></div><div class="flex-1 overflow-y-auto p-0"><table class="w-full text-left text-sm"><thead class="bg-white sticky top-0 z-10 shadow-sm text-xs font-bold text-gray-500 uppercase"><tr><th class="p-4">Data</th><th class="p-4">Nº</th><th class="p-4">Título</th><th class="p-4 text-center">Tipo</th><th class="p-4 text-right">Valor</th><th class="p-4 text-center">Status</th></tr></thead><tbody id="report-table-body" class="divide-y divide-gray-100"></tbody></table></div></div></div>`,window.tempReportDocs=a,window.filterReportDocs("all"),window.lucide&&lucide.createIcons()},window.filterReportDocs=e=>{const o=document.getElementById("report-table-body");if(!o)return;const t=window.tempReportDocs.filter(a=>e==="all"?!0:a.date.startsWith(e)).sort((a,s)=>s.date.localeCompare(a.date));if(t.length===0){o.innerHTML='<tr><td colspan="6" class="p-8 text-center text-gray-400">Sem registos.</td></tr>';return}o.innerHTML=t.map(a=>`<tr class="hover:bg-gray-50 transition"><td class="p-4 text-gray-500">${window.formatDate(a.date)}</td><td class="p-4 font-bold text-theme">${a.number}</td><td class="p-4 font-bold text-gray-800">${a.title}</td><td class="p-4 text-center"><span class="badge ${a.type==="quote"?"badge-yellow":"badge-blue"}">${a.type==="quote"?"Orç":"OS"}</span></td><td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(a.totalValue)}</td><td class="p-4 text-center"><span class="badge ${a.status==="finalized"?"badge-green":"badge-gray"}">${a.status}</span></td></tr>`).join("")};const _=window.renderRegistration;window.renderRegistration=()=>{_();const e=document.getElementById("view-container");if(!e||n.regTab==="inventory")return;const o={clients:"Clientes",suppliers:"Fornecedores",categories:"Categorias",sellers:"Vendedores"},t={clients:"Cliente",suppliers:"Fornecedor",categories:"Categoria",sellers:"Vendedor"},a=n[n.regTab]||[];window.getFilteredRegistrationData();const s=document.createElement("div");s.className="mb-8",s.innerHTML=`
        <div class="mb-6 rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl relative">
            <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,#22c55e,transparent_30%),radial-gradient(circle_at_bottom_left,#38bdf8,transparent_35%)]"></div>
            <div class="relative p-8 flex flex-col lg:flex-row justify-between gap-6">
                <div>
                    <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50 mb-3">CADASTROS</p>
                    <h2 class="text-3xl md:text-4xl font-black tracking-tight">${o[n.regTab]||"Cadastros Gerais"}</h2>
                    <p class="text-white/60 mt-3 max-w-2xl">Visão mais organizada para a base mestre do sistema, com contexto comercial e acesso rápido às ações principais.</p>
                </div>
                <div class="hero-stats-row lg:max-w-[28rem]">
                    <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Registros</p><p class="text-2xl font-black mt-1">${a.length}</p></div>
                    <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Módulo</p><p class="text-lg font-black mt-2">${t[n.regTab]||"Cadastro"}</p></div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${window.dashCard("Total Cadastrado",a.length,"database","bg-blue-50 text-blue-600",o[n.regTab]||"Registros")}
            ${window.dashCard("Projetos Finalizados",(n.commercialDocs||[]).filter(c=>c.status==="finalized").length,"file-check","bg-green-50 text-green-600","Base comercial vinculada")}
            ${window.dashCard("Ação Principal",t[n.regTab]||"Cadastro","sparkles","bg-purple-50 text-purple-600","Inclusão e manutenção")}
        </div>
    `,e.insertAdjacentElement("afterbegin",s);const d=e.querySelector(".card-modern .btn-gradient");d&&(d.innerHTML=`<i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo ${t[n.regTab]||"Cadastro"}`);const l=e.querySelector(".card-modern h3");l&&(l.textContent=o[n.regTab]||"Cadastros",l.className="font-black text-gray-800 text-lg"),window.lucide&&lucide.createIcons()},window.getFilteredInventory=()=>{const e=String(n.invSearch||"").toLowerCase(),o=window.getInventoryInboundMap();return(n.inventory||[]).filter(t=>{const a=!e||String(t.name||"").toLowerCase().includes(e)||String(t.category||"").toLowerCase().includes(e),s=n.invCategoryFilter==="all"||(t.category||"Geral")===n.invCategoryFilter,d=window.toNumber(o[t.id]),l=window.getInventoryHealthMeta(t,d),c=n.invStockFilter==="all"||n.invStockFilter==="low"&&l.key==="critical"||n.invStockFilter==="attention"&&l.key==="attention"||n.invStockFilter==="ok"&&l.key==="healthy"||n.invStockFilter==="inbound"&&d>0;return a&&s&&c}).sort((t,a)=>{const s=n.invSort||"name_asc";if(s==="name_desc")return String(a.name||"").localeCompare(String(t.name||""));if(s==="qty_asc")return window.toNumber(t.quantity)-window.toNumber(a.quantity);if(s==="qty_desc")return window.toNumber(a.quantity)-window.toNumber(t.quantity);if(s==="value_desc")return window.toNumber(a.quantity)*window.toNumber(a.costPrice)-window.toNumber(t.quantity)*window.toNumber(t.costPrice);if(s==="critical_first"){const d={critical:0,attention:1,healthy:2},l=d[window.getInventoryHealthMeta(t,window.toNumber(o[t.id])).key]??99,c=d[window.getInventoryHealthMeta(a,window.toNumber(o[a.id])).key]??99;return l-c||String(t.name||"").localeCompare(String(a.name||""))}return String(t.name||"").localeCompare(String(a.name||""))})},window.exportInventoryCsv=()=>{const e=window.getInventoryInboundMap(),o=[["Nome","Categoria","Quantidade","Em Compra","Saldo Projetado","Status","Unidade","Custo Base","Valor em Estoque","Estoque Minimo","Sugestao Reposicao"],...window.getFilteredInventory().map(t=>{const a=window.getInventoryHealthMeta(t,window.toNumber(e[t.id]));return[t.name,t.category||"Geral",window.toNumber(t.quantity),window.toNumber(e[t.id]),a.projected,a.label,t.unit||"un",window.toNumber(t.costPrice),window.toNumber(t.quantity)*window.toNumber(t.costPrice),window.toNumber(t.minQty,5),a.suggestedQty]})];window.downloadCsv(`estoque-${new Date().toISOString().slice(0,10)}.csv`,o)},window.renderInventory=()=>{n.regTab="inventory";const e=document.getElementById("view-container");if(!e)return;const o=n.inventory||[],t=window.getFilteredInventory(),a=window.getInventoryInboundMap(),s=[...new Set(o.map(r=>r.category||"Geral"))].sort(),d=o.filter(r=>window.toNumber(r.quantity)<=window.toNumber(r.minQty,5)),l=o.filter(r=>window.getInventoryHealthMeta(r,window.toNumber(a[r.id])).key==="attention"),c=o.filter(r=>window.toNumber(a[r.id])>0),g=o.reduce((r,p)=>r+window.toNumber(p.quantity)*window.toNumber(p.costPrice),0),f=t.reduce((r,p)=>r+window.toNumber(p.quantity)*window.toNumber(p.costPrice),0),i=o.reduce((r,p)=>r+window.getInventoryHealthMeta(p,window.toNumber(a[p.id])).suggestedQty,0),u=[...n.inventoryMovements||[]].sort((r,p)=>(p.date?.seconds||0)-(r.date?.seconds||0)).slice(0,6),m=o.map(r=>({item:r,inboundQty:window.toNumber(a[r.id]),health:window.getInventoryHealthMeta(r,window.toNumber(a[r.id]))})).filter(r=>r.health.suggestedQty>0||r.inboundQty>0).sort((r,p)=>{const w={critical:0,attention:1,healthy:2};return(w[r.health.key]??9)-(w[p.health.key]??9)||String(r.item.name||"").localeCompare(String(p.item.name||""))}).slice(0,6),h=t.map(r=>A(r,window.toNumber(a[r.id]))).join(""),$=t.map(r=>{const p=window.toNumber(r.quantity),w=window.toNumber(r.minQty,5),T=window.toNumber(r.costPrice),N=window.toNumber(a[r.id]),k=window.getInventoryHealthMeta(r,N);return`
            <tr class="hover:bg-gray-50 transition">
                <td class="p-4">
                    <div class="font-black text-gray-800">${window.escapeHtml(r.name)}</div>
                    <div class="text-xs text-gray-400 font-bold">${window.escapeHtml(r.id)}</div>
                </td>
                <td class="p-4 text-gray-600"><span class="badge badge-gray">${window.escapeHtml(r.category||"Geral")}</span></td>
                <td class="p-4"><span class="badge ${k.badge}">${k.label}</span></td>
                <td class="p-4">
                    <div class="font-black ${k.key==="critical"?"text-red-600":k.key==="attention"?"text-yellow-700":"text-gray-800"}">${p} ${window.escapeHtml(r.unit||"un")}</div>
                    <div class="text-[10px] uppercase font-bold text-gray-400">Min. ${w}</div>
                </td>
                <td class="p-4 text-right font-bold ${N>0?"text-blue-600":"text-gray-400"}">${N>0?`${N} ${window.escapeHtml(r.unit||"un")}`:"-"}</td>
                <td class="p-4 text-right font-black ${k.projected<=w?"text-red-600":"text-gray-800"}">${k.projected} ${window.escapeHtml(r.unit||"un")}</td>
                <td class="p-4 text-right font-bold text-gray-700">${window.formatCurrency(T)}</td>
                <td class="p-4 text-right font-black text-theme">${window.formatCurrency(p*T)}</td>
                <td class="p-4 text-right">
                    <div class="flex justify-end gap-1">
                        <button onclick="window.openCycleCountById('${r.id}')" class="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition" title="Inventario Rotativo"><i data-lucide="scan-line" class="w-4 h-4"></i></button>
                        <button onclick="window.startPurchaseFromInventory('${r.id}')" class="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition" title="Gerar Compra"><i data-lucide="shopping-cart" class="w-4 h-4"></i></button>
                        <button onclick="window.openStockAdjustById('${r.id}')" class="text-yellow-600 hover:bg-yellow-50 p-2 rounded-lg transition" title="Ajuste Rapido"><i data-lucide="sliders-horizontal" class="w-4 h-4"></i></button>
                        <button onclick="window.openStockHistoryById('${r.id}')" class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition" title="Historico"><i data-lucide="history" class="w-4 h-4"></i></button>
                        <button onclick="window.openRegModal('${r.id}')" class="text-orange-500 hover:bg-orange-50 p-2 rounded-lg transition" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button>
                        <button onclick="window.delReg('${r.id}')" class="text-red-400 hover:bg-red-50 p-2 rounded-lg transition" title="Apagar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                </td>
            </tr>
        `}).join("");e.innerHTML=`
        <div class="mb-8 rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl relative">
            <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,#22c55e,transparent_30%),radial-gradient(circle_at_bottom_left,#38bdf8,transparent_35%)]"></div>
            <div class="relative p-8 flex flex-col lg:flex-row justify-between gap-6">
                <div>
                    <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50 mb-3">ESTOQUE</p>
                    <h2 class="text-3xl md:text-4xl font-black tracking-tight">Operacao de Materiais</h2>
                    <p class="text-white/60 mt-3 max-w-2xl">Painel evoluido para leitura de saude do estoque, inventario rotativo e reposicao rapida conectada ao modulo de compras.</p>
                </div>
                <div class="hero-stats-row lg:max-w-[28rem]">
                    <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Criticos</p><p class="text-2xl font-black mt-1">${d.length}</p></div>
                    <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Em compra</p><p class="text-2xl font-black mt-1">${c.length}</p></div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="card-modern p-5 border-l-4 border-theme"><p class="text-xs font-bold text-gray-400 uppercase">Itens cadastrados</p><p class="text-2xl font-black text-gray-800">${o.length}</p></div>
            <div class="card-modern p-5 border-l-4 border-red-500"><p class="text-xs font-bold text-gray-400 uppercase">Estoque baixo</p><p class="text-2xl font-black text-red-600">${d.length}</p></div>
            <div class="card-modern p-5 border-l-4 border-amber-500"><p class="text-xs font-bold text-gray-400 uppercase">Em atencao</p><p class="text-2xl font-black text-amber-600">${l.length}</p></div>
            <div class="card-modern p-5 border-l-4 border-green-500"><p class="text-xs font-bold text-gray-400 uppercase">Valor total</p><p class="text-2xl font-black text-green-600">${window.formatCurrency(g)}</p></div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100"><h3 class="font-black text-gray-800">Reposicao Prioritaria</h3></div>
                <div class="divide-y divide-gray-100">
                    ${m.map(({item:r,inboundQty:p,health:w})=>`
                        <div class="p-4">
                            <div class="flex items-start justify-between gap-3">
                                <div>
                                    <p class="font-black text-gray-800">${window.escapeHtml(r.name)}</p>
                                    <p class="text-xs text-gray-400 font-bold mt-1">${window.toNumber(r.quantity)} ${window.escapeHtml(r.unit||"un")} em estoque · min. ${window.toNumber(r.minQty,5)}</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <span class="badge ${w.badge}">${w.label}</span>
                                        ${p>0?`<span class="badge badge-blue">Em compra ${p}</span>`:""}
                                        ${w.suggestedQty>0?`<span class="badge badge-yellow">Sugerido ${w.suggestedQty}</span>`:""}
                                    </div>
                                </div>
                                <button onclick="window.startPurchaseFromInventory('${r.id}')" class="text-xs font-black bg-red-50 text-red-700 px-3 py-2 rounded-lg">Gerar</button>
                            </div>
                        </div>
                    `).join("")||`<p class="text-sm text-gray-400 font-bold text-center py-10">Reposicao sugerida atual: ${i}</p>`}
                </div>
            </div>

            <div class="card-modern overflow-hidden">
                <div class="p-5 border-b border-gray-100"><h3 class="font-black text-gray-800">Movimentacoes Recentes</h3></div>
                <div class="divide-y divide-gray-100">
                    ${u.map(r=>{const p=o.find(w=>w.id===r.itemId);return`<div class="p-4"><div class="flex items-center justify-between"><p class="font-black text-gray-800">${window.escapeHtml(p?.name||"Material removido")}</p><span class="badge ${r.type==="in"?"badge-green":"badge-red"}">${r.type==="in"?"Entrada":"Saida"}</span></div><p class="text-xs text-gray-400 font-bold mt-1">${window.formatDate(r.date)} · ${window.toNumber(r.quantity)} ${window.escapeHtml(p?.unit||"un")}</p><p class="text-xs text-gray-500 mt-2">${window.escapeHtml(r.reason||"Sem motivo")}</p></div>`}).join("")||'<p class="text-sm text-gray-400 font-bold text-center py-10">Sem movimentacoes.</p>'}
                </div>
            </div>
        </div>

        <div class="card-modern overflow-hidden">
            <div class="p-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                    <h3 class="font-black text-gray-800">Gestao de Estoque</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">${t.length} item(ns) encontrados · ${c.length} com compra em aberto · filtrado ${window.formatCurrency(f)}</p>
                </div>
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mt-4">
                    <div class="flex flex-col md:flex-row gap-2">
                        <input oninput="window.setInvSearch(this.value)" value="${window.escapeHtml(n.invSearch||"")}" placeholder="Buscar material ou categoria..." class="input-modern h-10 md:w-64 text-sm">
                        <select onchange="window.setInvCategoryFilter(this.value)" class="input-modern h-10 md:w-44 text-sm">
                            <option value="all">Todas categorias</option>
                            ${s.map(r=>`<option value="${window.escapeHtml(r)}" ${n.invCategoryFilter===r?"selected":""}>${window.escapeHtml(r)}</option>`).join("")}
                        </select>
                        <select onchange="window.setInvStockFilter(this.value)" class="input-modern h-10 md:w-40 text-sm">
                            <option value="all" ${n.invStockFilter==="all"?"selected":""}>Todos</option>
                            <option value="low" ${n.invStockFilter==="low"?"selected":""}>Criticos</option>
                            <option value="attention" ${n.invStockFilter==="attention"?"selected":""}>Atencao</option>
                            <option value="ok" ${n.invStockFilter==="ok"?"selected":""}>Saudaveis</option>
                            <option value="inbound" ${n.invStockFilter==="inbound"?"selected":""}>Em compra</option>
                        </select>
                        <select onchange="window.setInvSort(this.value)" class="input-modern h-10 md:w-44 text-sm">
                            <option value="name_asc" ${n.invSort==="name_asc"?"selected":""}>Nome A-Z</option>
                            <option value="name_desc" ${n.invSort==="name_desc"?"selected":""}>Nome Z-A</option>
                            <option value="qty_asc" ${n.invSort==="qty_asc"?"selected":""}>Menor saldo</option>
                            <option value="qty_desc" ${n.invSort==="qty_desc"?"selected":""}>Maior saldo</option>
                            <option value="value_desc" ${n.invSort==="value_desc"?"selected":""}>Maior valor</option>
                            <option value="critical_first" ${n.invSort==="critical_first"?"selected":""}>Criticos primeiro</option>
                        </select>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="window.openRegModal()" class="btn-gradient px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo Material</button>
                        <button onclick="window.navigateTo('purchases')" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-black text-sm hover:bg-gray-50 flex items-center"><i data-lucide="truck" class="w-4 h-4 mr-2"></i> Ver Compras</button>
                        <button onclick="window.exportInventoryCsv()" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-black text-sm hover:bg-gray-50 flex items-center"><i data-lucide="download" class="w-4 h-4 mr-2"></i> Exportar CSV</button>
                    </div>
                </div>
            </div>
                ${isCompactLayout?`<div class="mobile-list-stack p-4">${h||'<div class="card-modern p-6 text-center text-gray-400">Nenhum item de estoque encontrado.</div>'}</div>`:`<div class="overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[1080px]">
                        <thead class="bg-white text-xs uppercase text-gray-400 font-black border-b"><tr><th class="p-4">Material</th><th class="p-4">Categoria</th><th class="p-4">Status</th><th class="p-4">Saldo</th><th class="p-4 text-right">Em compra</th><th class="p-4 text-right">Projetado</th><th class="p-4 text-right">Custo</th><th class="p-4 text-right">Valor</th><th class="p-4 text-right">Acoes</th></tr></thead>
                        <tbody class="divide-y divide-gray-100">${$||'<tr><td colspan="9" class="p-8 text-center text-gray-400">Nenhum item de estoque encontrado.</td></tr>'}</tbody>
                    </table>
                </div>`}
            </div>
    `,window.lucide&&lucide.createIcons()}}export{Y as registerRegistration};

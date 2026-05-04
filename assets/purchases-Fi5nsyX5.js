function H(x){const{state:s,defaultKanbanStages:C,defaultRoles:S,firebaseConfig:E,auth:k,db:l,appId:u,initializeApp:q,getAuth:D,signInWithEmailAndPassword:T,createUserWithEmailAndPassword:N,signOut:B,onAuthStateChanged:R,signInWithCustomToken:M,collection:h,addDoc:y,updateDoc:v,deleteDoc:P,doc:b,onSnapshot:V,serverTimestamp:p,setDoc:j,getDoc:L,getDocs:F}=x;window.setPurSearch=t=>{s.purSearch=t,window.renderPurchases()},window.setPurStatusFilter=t=>{s.purStatusFilter=t,window.renderPurchases()},window.setPurchasesTab=t=>{s.purchasesTab=t,window.renderPurchases()},window.renderPurchases=()=>{const t=document.getElementById("view-container"),e=window.isCompactLayout?.(),a=String(s.purSearch||"").toLowerCase(),i=s.purchaseDocs.filter(o=>{const w=a?String(o.supplierName||"").toLowerCase().includes(a)||String(o.number||"").toLowerCase().includes(a):!0,f=o.status||"pending",A=s.purchasesTab==="all"||(s.purchasesTab==="pending"?f!=="received":f==="received");return w&&A}).sort((o,w)=>(w.createdAt?.seconds||0)-(o.createdAt?.seconds||0)),r=s.purchaseDocs.length,n=s.purchaseDocs.filter(o=>(o.status||"pending")!=="received"),c=s.purchaseDocs.filter(o=>(o.status||"pending")==="received"),d=s.purchaseDocs.reduce((o,w)=>o+window.toNumber(w.totalValue),0);let g=i.map(o=>`
        <tr class="hover:bg-gray-50 transition">
            <td class="p-4 font-bold text-theme">${o.number||"..."}</td>
            <td class="p-4 text-gray-500">${window.formatDate(o.date)}</td>
            <td class="p-4 font-bold text-gray-800">${o.supplierName}</td>
            <td class="p-4 text-right font-black text-gray-800">${window.formatCurrency(o.totalValue)}</td>
            <td class="p-4 text-center">
                <span class="badge ${o.status==="received"?"badge-green":"badge-yellow"}">${o.status==="received"?"Recebido":"Pendente"}</span>
            </td>
            <td class="p-4 flex justify-center gap-2">
                ${o.status!=="received"?`<button onclick="window.receivePur('${o.id}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow flex items-center" title="Dar Entrada no Estoque"><i data-lucide="package-plus" class="w-3 h-3 mr-1"></i> RECEBER</button>`:""}
                <button onclick="window.printSetup('${o.id}', 'Pedido de Compra')" class="text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 p-2 rounded-lg" title="Imprimir"><i data-lucide="printer" class="w-4 h-4"></i></button>
                <button onclick="window.openPurModal('${o.id}')" class="text-gray-400 hover:text-orange-500 bg-gray-50 hover:bg-orange-50 p-2 rounded-lg" title="Editar"><i data-lucide="edit" class="w-4 h-4"></i></button>
                <button onclick="window.delPur('${o.id}')" class="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg" title="Excluir"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </td>
        </tr>
    `).join("");const $=i.map(o=>`
        <div class="mobile-record-card">
            <div class="mobile-record-head">
                <div class="min-w-0 flex-1">
                    <p class="mobile-record-kicker">Compra #${window.escapeHtml(o.number||"...")}</p>
                    <h3 class="mobile-record-title">${window.escapeHtml(o.supplierName||"Fornecedor não informado")}</h3>
                    <p class="mobile-record-subtitle">${window.formatDate(o.date)}</p>
                </div>
                <details class="mobile-action-menu">
                    <summary aria-label="Ações da compra"><i data-lucide="ellipsis"></i></summary>
                    <div class="mobile-action-menu-panel">
                        ${o.status!=="received"?`<button type="button" class="mobile-action-menu-item" onclick="window.receivePur('${o.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="package-plus"></i><span>Receber no estoque</span></button>`:""}
                        <button type="button" class="mobile-action-menu-item" onclick="window.printSetup('${o.id}', 'Pedido de Compra'); this.closest('details')?.removeAttribute('open');"><i data-lucide="printer"></i><span>Imprimir</span></button>
                        <button type="button" class="mobile-action-menu-item" onclick="window.openPurModal('${o.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="edit"></i><span>Editar</span></button>
                        <button type="button" class="mobile-action-menu-item danger" onclick="window.delPur('${o.id}'); this.closest('details')?.removeAttribute('open');"><i data-lucide="trash-2"></i><span>Excluir</span></button>
                    </div>
                </details>
            </div>
            <div class="mobile-record-grid">
                <div class="mobile-record-meta">
                    <p class="mobile-record-meta-label">Total</p>
                    <p class="mobile-record-meta-value">${window.formatCurrency(o.totalValue)}</p>
                </div>
                <div class="mobile-record-meta">
                    <p class="mobile-record-meta-label">Status</p>
                    <p class="mobile-record-meta-value">${o.status==="received"?"Recebido":"Pendente"}</p>
                </div>
            </div>
            <div class="mobile-record-footer">
                <div class="mobile-record-status">
                    <span class="badge ${o.status==="received"?"badge-green":"badge-yellow"}">${o.status==="received"?"Recebido":"Pendente"}</span>
                </div>
            </div>
        </div>
    `).join("");t.innerHTML=`
        ${window.renderSectionHero({eyebrow:"Compras",title:"Operacao de Suprimentos",description:"Pedidos, recebimento e rastreio de materiais conectados ao estoque.",accent:"emerald",cards:[{label:"Pendentes",value:String(n.length)},{label:"Recebidos",value:String(c.length)},{label:"Volume",value:window.formatCurrency(d)},{label:"Filtrados",value:String(i.length)}]})}
        <div class="ui-tab-row mb-6">
            <button onclick="window.setPurchasesTab('all')" class="${window.getUiTabClass(s.purchasesTab==="all")}">Todos <span class="badge badge-gray">${r}</span></button>
            <button onclick="window.setPurchasesTab('pending')" class="${window.getUiTabClass(s.purchasesTab==="pending")}">Pendentes <span class="badge badge-yellow">${n.length}</span></button>
            <button onclick="window.setPurchasesTab('received')" class="${window.getUiTabClass(s.purchasesTab==="received")}">Recebidos <span class="badge badge-green">${c.length}</span></button>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div class="flex w-full md:w-auto gap-2">
                <div class="relative flex-1 md:w-64">
                    <i data-lucide="search" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400"></i>
                    <input oninput="window.setPurSearch(this.value)" placeholder="Buscar Fornecedor..." class="input-modern pl-10 w-full" value="${s.purSearch}">
                </div>
                <button onclick="window.openPurModal()" class="btn-gradient px-4 py-2 rounded-lg font-bold text-white shadow flex items-center shrink-0"><i data-lucide="plus" class="w-4 h-4 mr-2"></i> Novo</button>
            </div>
        </div>
        ${e?`
        <div class="mobile-list-stack">
            ${$||'<div class="card-modern p-6 text-center text-gray-400">Nenhuma compra registrada.</div>'}
        </div>`:`
        <div class="card-modern overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm min-w-[700px]">
                    <thead class="bg-gray-50 font-bold text-gray-400 text-xs uppercase border-b">
                        <tr>
                            <th class="p-4">Nº</th>
                            <th class="p-4">Data</th>
                            <th class="p-4">Fornecedor</th>
                            <th class="p-4 text-right">Total</th>
                            <th class="p-4 text-center">Status</th>
                            <th class="p-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${g||'<tr><td colspan="6" class="p-6 text-center text-gray-400">Nenhuma compra registada.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>`}
    `,window.lucide&&lucide.createIcons()},window.delPur=async t=>{if(await window.customConfirm("Excluir Pedido de Compra permanentemente?"))try{await P(b(l,"artifacts",u,"public","data","purchase_docs",t)),window.logAudit("APAGAR_COMPRA",`Apagado Pedido de Compra ID: ${t}`)}catch(e){window.customAlert(e.message)}},window.openPurModal=(t=null,e=null)=>{let a={date:new Date().toISOString().split("T")[0],supplierName:"",items:[],totalValue:0,status:"pending"};if(t){const i=s.purchaseDocs.find(r=>r.id===t);i&&(a={...i})}e&&(a={...a,...e}),s.editingDoc=t?a:null,s.formItems=a.items?[...a.items]:[],document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
                <div class="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 class="text-xl font-bold text-gray-800">${t?"Editar":"Novo"} Pedido de Compra ${a.number?"- "+a.number:""}</h2>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-800"><i data-lucide="x"></i></button>
                </div>
                <div class="p-8 space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Fornecedor</label>
                            <select id="p-sup" class="input-modern">
                                <option value="">Selecione...</option>
                                ${s.suppliers.map(i=>`<option ${i.name===a.supplierName?"selected":""}>${i.name}</option>`).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Data</label>
                            <input id="p-date" type="date" value="${a.date}" class="input-modern">
                        </div>
                    </div>
                    <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-sm">
                        💡 <strong>Dica de Integração:</strong> Se desejares que estes materiais entrem automaticamente no teu estoque, deves mapear cada item com o seu correspondente no campo "Vincular ao Estoque".
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2 border-b pb-2">
                            <h4 class="text-xs font-bold text-theme uppercase">Itens da Compra</h4>
                            <button onclick="window.addPurItem()" class="text-sm font-bold text-theme hover:underline">+ Adicionar Item</button>
                        </div>
                        <div id="pur-items-list" class="space-y-3"></div>
                    </div>
                    <div class="text-right text-xl font-black text-gray-800 border-t pt-4">
                        Total: <span id="p-total">${window.formatCurrency(a.totalValue||0)}</span>
                    </div>
                </div>
                <div class="p-6 border-t bg-gray-50 text-right">
                    <button onclick="window.savePur()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow hover:scale-105 transition">Salvar Pedido</button>
                </div>
            </div>
        </div>
    `,window.lucide&&lucide.createIcons(),window.renderPurItems()},window.updPurItem=(t,e,a)=>{e==="qty"||e==="val"?(s.formItems[t][e]=parseFloat(a)||0,window.calcPurTotal()):s.formItems[t][e]=a},window.delPurItem=t=>{s.formItems.splice(t,1),window.renderPurItems()},window.renderPurItems=()=>{document.getElementById("pur-items-list").innerHTML=s.formItems.map((t,e)=>`
        <div class="grid grid-cols-12 gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div class="col-span-12 md:col-span-5">
                <input class="input-modern h-8 mb-2 text-sm" placeholder="Descrição do Item Comprado" value="${t.desc}" oninput="window.updPurItem(${e}, 'desc', this.value)">
                <select onchange="window.updPurItem(${e}, 'invId', this.value)" class="input-modern h-8 text-xs text-blue-700 bg-blue-50/50 border-blue-200">
                    <option value="">-- Não vincular ao Estoque --</option>
                    ${s.inventory.map(a=>`<option value="${a.id}" ${a.id===t.invId?"selected":""}>Vincular a: ${a.name}</option>`).join("")}
                </select>
            </div>
            <div class="col-span-4 md:col-span-2">
                <label class="text-[10px] uppercase font-bold text-gray-400 block mb-1">Qtd</label>
                <input type="number" class="input-modern h-8" value="${t.qty}" oninput="window.updPurItem(${e}, 'qty', this.value)">
            </div>
            <div class="col-span-6 md:col-span-3">
                <label class="text-[10px] uppercase font-bold text-gray-400 block mb-1">Valor Unit.</label>
                <input type="number" class="input-modern h-8 text-right" value="${t.val}" oninput="window.updPurItem(${e}, 'val', this.value)">
            </div>
            <div class="col-span-2 text-right pt-5">
                <button onclick="window.delPurItem(${e})" class="text-red-400 hover:text-red-600 bg-white p-2 rounded shadow-sm border border-gray-100 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
        </div>
    `).join(""),window.lucide&&lucide.createIcons(),window.calcPurTotal()},window.addPurItem=()=>{s.formItems.push({desc:"",invId:"",qty:1,val:0}),window.renderPurItems()},window.calcPurTotal=()=>{const t=s.formItems.reduce((e,a)=>e+a.qty*a.val,0);document.getElementById("p-total").innerText=window.formatCurrency(t)};const m=t=>String(document.getElementById(t)?.value||"").trim(),I=()=>{const t=(s.formItems||[]).map(e=>({...e,desc:String(e?.desc||"").trim(),qty:Number(e?.qty)||0,val:Number(e?.val)||0})).filter(e=>e.desc||e.invId||e.qty>0||e.val>0);if(!t.length)throw new Error("Adicione pelo menos um item ao pedido.");return t.forEach((e,a)=>{if(!e.desc)throw new Error(`Informe a descricao do item ${a+1}.`);if(e.qty<=0)throw new Error(`Informe uma quantidade valida para o item ${a+1}.`);if(e.val<0)throw new Error(`O valor do item ${a+1} nao pode ser negativo.`)}),t};window.savePur=async()=>{await window.withActionLock("save-purchase-doc",async()=>{const t=document.querySelector("#modal-container > .modal-overlay > div");window.toggleActionButtons(t,!0,"Salvando...");const e=m("p-sup");if(!e)return window.toggleActionButtons(t,!1),window.customAlert("Por favor, selecione um fornecedor valido.");let a;try{a=I()}catch(d){window.toggleActionButtons(t,!1),window.customAlert(d.message);return}const i=m("p-date"),r=m("p-expected-date");if(!i)return window.toggleActionButtons(t,!1),window.customAlert("Informe a data do pedido.");if(r&&r<i)return window.toggleActionButtons(t,!1),window.customAlert("A previsao de entrega nao pode ser anterior a data do pedido.");const n=a.reduce((d,g)=>d+g.qty*g.val,0);if(n<=0)return window.toggleActionButtons(t,!1),window.customAlert("O total do pedido precisa ser maior que zero.");const c={supplierName:e,date:i,expectedDate:r,responsible:m("p-responsible"),priority:m("p-priority"),notes:m("p-notes"),items:a,totalValue:n};try{if(s.editingDoc?.id)await v(b(l,"artifacts",u,"public","data","purchase_docs",s.editingDoc.id),{...c,updatedAt:p()});else{const d=await window.getNextSequentialNum("PC");await y(h(l,"artifacts",u,"public","data","purchase_docs"),{number:d,status:"pending",...c,companyId:s.companyId,createdAt:p()})}document.getElementById("modal-container").innerHTML=""}catch(d){window.customAlert("Erro de base de dados: "+d.message)}finally{window.toggleActionButtons(t,!1)}})},window.startPurchaseFromInventory=t=>{const e=(s.inventory||[]).find(n=>n.id===t);if(!e)return window.customAlert("Material nao encontrado no estoque.");const a=Number(e.quantity)||0,i=Number(e.minQty)||5,r=Math.max(1,i-a);window.openPurModal(null,{items:[{desc:e.name||"Material",invId:e.id,qty:r,val:Number(e.costPrice)||0}],totalValue:r*(Number(e.costPrice)||0)})},window.receivePur=async t=>{const e=(s.purchaseDocs||[]).find(a=>a.id===t);if(!e)return window.customAlert("Pedido de compra nao encontrado.");if((e.status||"pending")==="received")return window.customAlert("Este pedido ja foi recebido.");if(await window.customConfirm(`Confirmar recebimento do pedido ${e.number||""}?`))try{for(const a of e.items||[]){if(!a.invId||!(Number(a.qty)>0))continue;const i=(s.inventory||[]).find(c=>c.id===a.invId);if(!i)continue;const r=Number(i.quantity)||0,n=Number(a.qty)||0;await v(b(l,"artifacts",u,"public","data","inventory",i.id),{quantity:r+n,updatedAt:p()}),await y(h(l,"artifacts",u,"public","data","inventory_movements"),{itemId:i.id,type:"in",quantity:n,reason:`Recebimento compra ${e.number||t}`,date:p(),user:s.user?.email||"Sistema",companyId:s.companyId})}await v(b(l,"artifacts",u,"public","data","purchase_docs",t),{status:"received",receivedAt:p(),updatedAt:p()}),window.logAudit("RECEBER_COMPRA",`Pedido ${e.number||t} recebido.`)}catch(a){window.customAlert("Erro ao receber pedido: "+a.message)}}}export{H as registerPurchases};

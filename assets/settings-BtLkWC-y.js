function me(U){const{state:i,defaultKanbanStages:x,defaultRoles:w,firebaseConfig:q,auth:ae,db:$,appId:S,initializeApp:V,getAuth:G,signInWithEmailAndPassword:se,createUserWithEmailAndPassword:F,signOut:K,onAuthStateChanged:oe,signInWithCustomToken:le,collection:ie,addDoc:de,updateDoc:H,deleteDoc:ne,doc:E,onSnapshot:re,serverTimestamp:B,setDoc:T,getDoc:ce,getDocs:pe}=U;window.saveSet=async(a,e)=>{try{await T(E($,"artifacts",S,"public","data","settings",i.companyId),{...i.settings,[a]:e,companyId:i.companyId},{merge:!0})}catch{}},window.fileSet=(a,e)=>{const s=e.files[0];if(s){const o=new FileReader;o.onload=t=>window.saveSet(a,t.target.result),o.readAsDataURL(s)}},window.renderSettings=()=>{const a=i.settings||{},e=a.kanbanStages||x,s=a.customRoles||w,o=a.serviceCatalog||[];document.getElementById("view-container").innerHTML=`
        <div class="card-modern p-8 max-w-5xl mx-auto space-y-12">
            <div>
                <h2 class="text-2xl font-bold mb-6 border-b pb-4">Configurações da Empresa</h2>
                <div class="mb-8 flex items-center gap-4"><label class="font-bold">Cor Principal do Sistema:</label><input type="color" value="${a.primaryColor||"#8B5CF6"}" onchange="window.saveSet('primaryColor',this.value)" class="h-10 w-24 rounded cursor-pointer border-0 shadow-sm"></div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="border-2 border-dashed border-gray-200 p-6 rounded-xl text-center hover:border-theme transition bg-gray-50"><p class="font-bold mb-2 text-gray-500">Logo da Empresa (PDFs)</p>${a.logo?`<img src="${a.logo}" class="h-20 mx-auto mb-2 object-contain rounded"><button onclick="window.saveSet('logo', null)" class="text-xs text-red-500 font-bold ml-2 hover:underline"><i data-lucide="trash-2" class="inline w-3 h-3"></i> Remover</button>`:'<p class="text-xs text-gray-400 mb-2">Sem logo</p>'}<label class="text-xs text-theme font-bold cursor-pointer block mt-2 btn-gradient py-2 rounded shadow text-white w-32 mx-auto transition hover:scale-105">Procurar Ficheiro<input type="file" class="hidden" onchange="window.fileSet('logo',this)"></label></div><div class="border-2 border-dashed border-gray-200 p-6 rounded-xl text-center hover:border-theme transition bg-gray-50"><p class="font-bold mb-2 text-gray-500">Assinatura (PDFs)</p>${a.signature?`<img src="${a.signature}" class="h-10 mx-auto mb-2 object-contain rounded"><button onclick="window.saveSet('signature', null)" class="text-xs text-red-500 font-bold ml-2 hover:underline"><i data-lucide="trash-2" class="inline w-3 h-3"></i> Remover</button>`:'<p class="text-xs text-gray-400 mb-2">Sem assinatura</p>'}<label class="text-xs text-theme font-bold cursor-pointer block mt-2 btn-gradient py-2 rounded shadow text-white w-32 mx-auto transition hover:scale-105">Procurar Ficheiro<input type="file" class="hidden" onchange="window.fileSet('signature',this)"></label></div></div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Razão Social</label><input class="input-modern font-medium" value="${a.companyName||""}" onchange="window.saveSet('companyName',this.value)"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">CNPJ / NIF</label><input class="input-modern font-medium" value="${a.cnpj||""}" onchange="window.saveSet('cnpj',this.value)"></div><div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Endereço Completo</label><input class="input-modern font-medium" value="${a.address||""}" onchange="window.saveSet('address',this.value)"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Chave PIX</label><input class="input-modern font-medium" value="${a.pixKey||""}" onchange="window.saveSet('pixKey',this.value)"></div><div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Telefone Comercial</label><input class="input-modern font-medium" value="${a.phone||""}" onchange="window.saveSet('phone',this.value)"></div></div>
            </div>
            <div>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-2 mb-4">
                    <div>
                        <h2 class="text-xl font-bold text-theme"><i data-lucide="briefcase" class="inline w-5 h-5 mr-2"></i>Catálogo de Serviços</h2>
                        <p class="text-sm text-gray-500 mt-2">Biblioteca de modelos prontos para orçamento e O.S. com parâmetros de preço manual ou inteligente.</p>
                    </div>
                    <button onclick="window.openServiceCatalogModal()" class="btn-gradient px-5 py-2 text-white rounded-lg text-xs font-bold shadow hover:scale-105 transition flex items-center"><i data-lucide="plus-circle" class="w-4 h-4 mr-2"></i>Novo Modelo</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    ${o.map(t=>`
                        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm hover:shadow-md transition">
                            <div class="flex items-start justify-between gap-3">
                                <div>
                                    <p class="text-[10px] uppercase font-black tracking-widest ${t.defaultPricingMode==="smart"?"text-emerald-600":"text-blue-600"}">${t.defaultPricingMode==="smart"?"Precificação Inteligente":"Preço Manual"}</p>
                                    <h4 class="font-black text-gray-800 text-lg mt-1">${window.escapeHtml(t.name||"Modelo sem nome")}</h4>
                                    <p class="text-xs text-gray-500 font-bold mt-1">${window.escapeHtml(t.category||"Sem categoria")}</p>
                                </div>
                                <span class="badge ${t.defaultPricingMode==="smart"?"badge-green":"badge-blue"}">${t.defaultPricingMode==="smart"?"Smart":"Manual"}</span>
                            </div>
                            <div class="grid grid-cols-2 gap-3 text-xs mt-4">
                                <div class="rounded-xl bg-white border border-gray-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Dimensão padrão</p><p class="font-black text-gray-800 mt-1">${window.toNumber(t.width)} x ${window.toNumber(t.height)}</p></div>
                                <div class="rounded-xl bg-white border border-gray-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Qtd padrão</p><p class="font-black text-gray-800 mt-1">${window.toNumber(t.qty,1)}</p></div>
                                <div class="rounded-xl bg-white border border-gray-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">Acabamento</p><p class="font-black text-gray-800 mt-1">${window.escapeHtml(t.finish||"-")}</p></div>
                                <div class="rounded-xl bg-white border border-gray-100 p-3"><p class="text-[10px] uppercase font-black text-gray-400">${t.defaultPricingMode==="smart"?"Custo base":"Preço padrão"}</p><p class="font-black text-gray-800 mt-1">${window.formatCurrency(t.defaultPricingMode==="smart"?window.toNumber(t.materialCost):window.toNumber(t.priceM2))}</p></div>
                            </div>
                            <div class="flex flex-wrap gap-2 mt-4">
                                ${t.serviceType?`<span class="badge badge-blue">${window.escapeHtml(t.serviceType)}</span>`:""}
                                ${t.leadTimeDays?`<span class="badge badge-gray">${window.toNumber(t.leadTimeDays)} dia(s)</span>`:""}
                                ${t.recommendedDepartment?`<span class="badge badge-yellow">${window.escapeHtml(t.recommendedDepartment)}</span>`:""}
                                ${Array.isArray(t.checklistTemplate)&&t.checklistTemplate.length?`<span class="badge badge-green">${t.checklistTemplate.length} etapa(s)</span>`:""}
                            </div>
                            ${t.description?`<p class="text-sm text-gray-600 mt-4">${window.escapeHtml(t.description)}</p>`:""}
                            ${t.tags?`<p class="text-[10px] text-theme font-black uppercase tracking-widest mt-3">${window.escapeHtml(t.tags)}</p>`:""}
                            <div class="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-2">
                                <button onclick="window.openServiceCatalogModal('${t.id}')" class="text-xs text-orange-500 font-black hover:underline">Editar</button>
                                <button onclick="window.deleteServiceCatalogEntry('${t.id}')" class="text-xs text-red-500 font-black hover:underline">Excluir</button>
                            </div>
                        </div>
                    `).join("")||'<div class="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center"><p class="font-black text-gray-500">Nenhum modelo cadastrado.</p><p class="text-sm text-gray-400 mt-2">Crie serviços padrão para acelerar o orçamento e a precificação.</p></div>'}
                </div>
            </div>
            <div>
                <h2 class="text-xl font-bold mb-4 border-b pb-2 text-theme">Construtor de Estágios do Kanban</h2>
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-200"><div id="kanban-stages-list" class="space-y-3 mb-4">${e.map((t,l)=>`<div class="flex items-center gap-3 bg-white p-3 rounded shadow-sm border transition hover:border-theme"><div class="text-gray-400"><i data-lucide="grip-vertical" class="w-5 h-5"></i></div><input type="text" value="${t.label}" onchange="window.updateKanbanStage(${l}, 'label', this.value)" class="input-modern flex-1 text-sm font-bold text-gray-700"><input type="color" value="${t.color||"#eab308"}" onchange="window.updateKanbanStage(${l}, 'color', this.value)" class="h-8 w-12 rounded cursor-pointer border-0 shadow-sm"><button onclick="window.removeKanbanStage(${l})" class="text-red-400 hover:text-red-600 p-2 transition bg-red-50 hover:bg-red-100 rounded"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div>`).join("")}</div><button onclick="window.addKanbanStage()" class="btn-gradient px-5 py-2 text-white rounded-lg text-xs font-bold shadow hover:scale-105 transition flex items-center"><i data-lucide="plus-circle" class="w-4 h-4 mr-2"></i> Adicionar Nova Coluna</button></div>
            </div>
            ${i.role==="admin"?`
            <div>
                <h2 class="text-xl font-bold mb-4 border-b pb-2 text-theme"><i data-lucide="shield" class="inline w-5 h-5 mr-2"></i>Gestão de Cargos e Permissões</h2>
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">${s.map((t,l)=>`<div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition"><div><h4 class="font-black text-gray-800 text-sm mb-2 flex items-center"><i data-lucide="award" class="w-4 h-4 mr-2 ${t.id==="admin"?"text-red-500":"text-theme"}"></i> ${t.name}</h4><div class="text-[10px] text-gray-500 uppercase tracking-wide leading-relaxed font-bold bg-gray-50 p-2 rounded">${t.id==="admin"?'<span class="text-red-500">Acesso Total</span>':t.perms.join(" • ")||"Sem acesso"}</div></div>${t.id!=="admin"?`<div class="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3"><button onclick="window.openRoleModal('${t.id}')" class="text-xs text-orange-500 font-bold hover:underline transition">Editar</button><button onclick="window.deleteRole(${l})" class="text-xs text-red-500 font-bold hover:underline transition">Apagar</button></div>`:'<div class="mt-4 border-t border-gray-100 pt-3 text-[10px] font-black text-red-400 text-right">ROOT ADMIN</div>'}</div>`).join("")}</div><button onclick="window.openRoleModal()" class="btn-gradient px-5 py-2 text-white rounded-lg text-xs font-bold shadow hover:scale-105 transition flex items-center"><i data-lucide="plus-circle" class="w-4 h-4 mr-2"></i> Criar Novo Cargo</button></div>
                <h2 class="text-xl font-bold mb-4 border-b pb-2 text-theme"><i data-lucide="users" class="inline w-5 h-5 mr-2"></i>Usuários e Acessos</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                        <h3 class="font-black text-gray-700 mb-4 text-sm uppercase tracking-wide border-b pb-2" id="emp-form-title">Criar Acesso</h3>
                        <p class="text-xs text-gray-500 font-bold mb-4">Crie aqui o login do colaborador e defina o cargo que ele vai usar no sistema.</p>
                        <div class="space-y-4"><input type="hidden" id="emp-id"><div><label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Nome do Usuário</label><input id="emp-name" class="input-modern h-10 font-medium" placeholder="Nome exibido no sistema"></div><div><label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Email de Acesso</label><input id="emp-email" type="email" class="input-modern h-10 font-medium" placeholder="login@empresa.com"></div><div id="emp-pass-wrapper"><label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Senha Inicial</label><input id="emp-pass" type="password" class="input-modern h-10 font-medium" placeholder="Defina uma senha inicial"></div><div><label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Cargo de Acesso</label><select id="emp-role" onchange="window.renderEmployeeRolePreview()" class="input-modern h-10 font-bold text-theme bg-purple-50 border-purple-200">${s.map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}</select></div><div id="emp-role-preview" class="rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs text-blue-900"></div><div class="flex gap-2 mt-4 pt-2 border-t border-gray-200"><button id="btn-create-emp" onclick="window.createOrUpdateEmployee()" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg shadow-md transition">+ Criar Acesso</button><button id="btn-cancel-emp" onclick="window.cancelEditEmployee()" class="hidden bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold px-3 rounded-lg transition"><i data-lucide="x" class="w-5 h-5"></i></button></div></div>
                    </div>
                    <div class="md:col-span-2"><div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="w-full text-left text-sm"><thead class="bg-gray-800 text-white font-bold text-xs uppercase"><tr><th class="p-4">Colaborador</th><th class="p-4 text-center">Cargo</th><th class="p-4 text-center">Estado</th><th class="p-4 text-center">Opções</th></tr></thead><tbody class="divide-y divide-gray-100">${i.profiles.map(t=>{const l=s.find(c=>c.id===t.role),d=l?l.name:"Removido",r=t.id===i.user?.uid;return`<tr class="hover:bg-gray-50 ${t.active===!1?"opacity-50 grayscale":""} transition"><td class="p-4"><div class="font-bold text-gray-800 flex items-center">${t.name||"Sem Nome"} ${r?'<span class="text-[9px] bg-theme text-white px-2 py-0.5 rounded-full ml-2 uppercase font-black tracking-widest">A tua conta</span>':""}</div><div class="text-xs text-gray-500 mt-1 font-medium">${t.email}</div></td><td class="p-4 text-center"><span class="badge ${t.role==="admin"?"bg-red-100 text-red-700 border-red-200":"bg-blue-50 text-blue-700 border-blue-200"} text-[10px]">${d}</span></td><td class="p-4 text-center">${t.active!==!1?'<span class="text-xs font-black text-green-600"><i data-lucide="check-circle" class="inline w-3 h-3 mb-0.5"></i> ATIVA</span>':'<span class="text-xs font-black text-red-600"><i data-lucide="slash" class="inline w-3 h-3 mb-0.5"></i> SUSPENSA</span>'}</td><td class="p-4 text-center flex justify-center gap-2">${r?'<span class="text-xs font-bold text-gray-300 italic">Protegido</span>':`<button onclick="window.editEmployee('${t.id}')" class="text-gray-500 hover:text-white bg-gray-100 hover:bg-orange-500 p-2 rounded shadow-sm transition"><i data-lucide="edit-2" class="w-4 h-4"></i></button><button onclick="window.toggleEmployeeStatus('${t.id}', ${t.active!==!1})" class="${t.active!==!1?"text-gray-500 hover:text-white bg-gray-100 hover:bg-red-500":"text-red-500 hover:text-white bg-red-50 hover:bg-green-500"} p-2 rounded shadow-sm transition"><i data-lucide="${t.active!==!1?"ban":"power"}" class="w-4 h-4"></i></button>`}</td></tr>`}).join("")}</tbody></table></div></div>
                </div>
                <div class="mt-12 flex items-center justify-between border-b pb-2 mb-4"><h2 class="text-xl font-bold text-theme"><i data-lucide="activity" class="inline w-5 h-5 mr-2"></i>Auditoria (Logs)</h2><span class="badge badge-red shadow-sm animate-pulse">VIGIADO</span></div>
                <div class="bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden max-h-96 overflow-y-auto"><table class="w-full text-left text-sm"><thead class="bg-gray-800 text-gray-300 font-bold text-[10px] uppercase sticky top-0 z-10"><tr><th class="p-4">Carimbo de Tempo</th><th class="p-4">Ação</th><th class="p-4 w-1/2">Detalhes</th><th class="p-4">Utilizador</th></tr></thead><tbody class="divide-y divide-gray-100">${[...i.auditLogs].sort((t,l)=>(l.date?.seconds||0)-(t.date?.seconds||0)).map(t=>`<tr class="hover:bg-yellow-50 text-xs transition font-medium text-gray-600"><td class="p-4 whitespace-nowrap">${t.date?new Date(t.date.seconds*1e3).toLocaleString("pt-BR"):"-"}</td><td class="p-4 font-black text-theme whitespace-nowrap">${t.action}</td><td class="p-4 text-gray-700 bg-gray-50/30">${t.details}</td><td class="p-4 font-bold text-gray-800">${t.user}</td></tr>`).join("")||'<tr><td colspan="4" class="p-8 text-center text-gray-400">A aguardar...</td></tr>'}</tbody></table></div>
            </div>`:""}
        </div>`,window.lucide&&lucide.createIcons()};const M=[{id:"gestao",label:"Gestão e Indicadores",permissions:["dashboard"]},{id:"comercial",label:"Comercial",permissions:["commercial","leads","agenda"]},{id:"operacao",label:"Operação e Suprimentos",permissions:["purchases","inventory"]},{id:"financeiro",label:"Financeiro e RH",permissions:["financial","hr"]},{id:"cadastros",label:"Cadastros",permissions:["reg_clients","reg_suppliers","reg_categories","reg_sellers"]},{id:"admin",label:"Administração",permissions:["settings"]}],W={admin:["dashboard","commercial","leads","agenda","purchases","financial","inventory","reg_clients","reg_suppliers","reg_categories","reg_sellers","settings"],comercial:["dashboard","commercial","leads","agenda","purchases","reg_clients"],producao:["commercial","inventory"],financeiro:["dashboard","financial","hr","reg_clients","reg_suppliers"],compras:["dashboard","purchases","inventory","reg_suppliers","reg_categories"]},z=a=>{const e=(window.permissionCatalog||[]).find(s=>s.id===a);return`<span class="badge badge-blue">${window.escapeHtml(e?.short||a)}</span>`};window.updateRolePermissionSummary=()=>{const a=document.getElementById("role-permission-summary");if(!a)return;const e=Array.from(document.querySelectorAll(".role-perm-cb:checked")).map(o=>o.value),s=e.length?e.map(z).join(""):'<span class="badge badge-gray">Sem acesso</span>';a.innerHTML=`
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Resumo de acesso</p>
            <p class="text-2xl font-black text-slate-900 mt-2">${e.length} permissão(ões)</p>
            <div class="flex flex-wrap gap-2 mt-3">${s}</div>
        </div>
    `},window.togglePermissionGroup=(a,e)=>{const s=M.find(o=>o.id===a);s&&(s.permissions.forEach(o=>{const t=document.querySelector(`.role-perm-cb[value="${o}"]`);t&&(t.checked=e)}),window.updateRolePermissionSummary())},window.applyRolePreset=a=>{const e=W[a];e&&(document.querySelectorAll(".role-perm-cb").forEach(s=>{s.checked=e.includes(s.value)}),window.updateRolePermissionSummary())},window.openRoleModal=(a=null)=>{const e=i.settings.customRoles||w,s=a?e.find(t=>t.id===a)||{id:"",name:"",perms:[]}:{id:`role_${Date.now()}`,name:"",perms:[]},o=M.map(t=>{const l=t.permissions.map(d=>{const r=(window.permissionCatalog||[]).find(u=>u.id===d)||{label:d},c=s.perms.includes(d)||d==="inventory"&&s.perms.includes("reg_inventory");return`
                <label class="rounded-xl border border-gray-200 bg-white p-3 hover:border-theme/30 transition cursor-pointer">
                    <div class="flex items-start gap-3">
                        <input type="checkbox" value="${d}" class="role-perm-cb mt-1 rounded text-theme" ${c?"checked":""} onchange="window.updateRolePermissionSummary()">
                        <div>
                            <p class="font-black text-gray-800 text-sm">${window.escapeHtml(r.label)}</p>
                            <p class="text-[11px] text-gray-400 font-bold mt-1">${window.escapeHtml(r.group||t.label)}</p>
                        </div>
                    </div>
                </label>
            `}).join("");return`
            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div class="flex items-center justify-between gap-3 mb-4">
                    <div>
                        <p class="text-[10px] uppercase font-black tracking-widest text-gray-400">${window.escapeHtml(t.label)}</p>
                        <p class="text-sm font-black text-gray-800 mt-1">${t.permissions.length} permissão(ões) disponíveis</p>
                    </div>
                    <div class="flex gap-2">
                        <button type="button" onclick="window.togglePermissionGroup('${t.id}', true)" class="text-[10px] font-black bg-white border border-gray-200 px-3 py-2 rounded-lg">Marcar</button>
                        <button type="button" onclick="window.togglePermissionGroup('${t.id}', false)" class="text-[10px] font-black bg-white border border-gray-200 px-3 py-2 rounded-lg">Limpar</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">${l}</div>
            </div>
        `}).join("");document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto m-4 border border-gray-100">
                <div class="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                        <h3 class="text-2xl font-black text-gray-800">${a?"Editar Cargo e Acessos":"Criar Cargo e Acessos"}</h3>
                        <p class="text-sm text-gray-500 mt-2">Defina o cargo e marque exatamente o que a equipe poderá acessar no sistema.</p>
                    </div>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-8">
                    <div class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Nome do Cargo</label>
                                <input id="role-name" value="${window.escapeHtml(s.name)}" class="input-modern font-bold text-gray-800 h-12 text-lg">
                                <input type="hidden" id="role-id" value="${window.escapeHtml(s.id)}">
                            </div>
                            <div>
                                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Atalhos de Preset</label>
                                <div class="flex flex-wrap gap-2">
                                    <button type="button" onclick="window.applyRolePreset('admin')" class="text-xs font-black bg-red-50 text-red-700 px-3 py-2 rounded-lg">Admin</button>
                                    <button type="button" onclick="window.applyRolePreset('comercial')" class="text-xs font-black bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">Comercial</button>
                                    <button type="button" onclick="window.applyRolePreset('producao')" class="text-xs font-black bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">Produção</button>
                                    <button type="button" onclick="window.applyRolePreset('financeiro')" class="text-xs font-black bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg">Financeiro</button>
                                    <button type="button" onclick="window.applyRolePreset('compras')" class="text-xs font-black bg-slate-50 text-slate-700 px-3 py-2 rounded-lg">Compras</button>
                                </div>
                            </div>
                        </div>
                        ${o}
                    </div>
                    <div class="space-y-4">
                        <div id="role-permission-summary"></div>
                        <div class="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-900">
                            <p class="font-black uppercase text-[10px] tracking-widest text-amber-500 mb-2">Recomendação</p>
                            <p class="font-bold">Use cargos mais específicos para evitar acesso amplo por acidente. Deixe administração apenas para quem realmente governa o sistema.</p>
                        </div>
                    </div>
                </div>

                <div class="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                    <button onclick="window.saveRole()" class="btn-gradient px-8 py-2.5 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Cargo</button>
                </div>
            </div>
        </div>
    `,window.lucide&&lucide.createIcons(),window.updateRolePermissionSummary()},window.saveRole=()=>{const a=document.getElementById("role-id").value,e=document.getElementById("role-name").value.trim(),s=[...new Set(Array.from(document.querySelectorAll(".role-perm-cb:checked")).map(d=>d.value))];if(!e)return window.customAlert("O cargo precisa de um nome!");let o=i.settings.customRoles||w;const t=o.findIndex(d=>d.id===a),l={id:a,name:e,perms:s};t>-1?o[t]=l:o.push(l),window.saveSet("customRoles",o),document.getElementById("modal-container").innerHTML="",window.renderSettings(),window.logAudit("GESTAO_CARGOS",`Cargo "${e}" guardado com ${s.length} permissões.`)},window.deleteRole=async a=>{let e=i.settings.customRoles||w;await window.customConfirm(`Queres apagar o cargo "${e[a].name}"?`)&&(window.logAudit("GESTAO_CARGOS","Cargo apagado."),e.splice(a,1),window.saveSet("customRoles",e),window.renderSettings())},window.updateKanbanStage=(a,e,s)=>{const o=i.settings.kanbanStages||x;o[a][e]=s,window.saveSet("kanbanStages",o)},window.removeKanbanStage=async a=>{let e=i.settings.kanbanStages||x;if(e.length<=1)return window.customAlert("Não podes apagar a última coluna.");await window.customConfirm("Queres apagar a coluna?")&&(e.splice(a,1),window.saveSet("kanbanStages",e),window.renderSettings())},window.addKanbanStage=()=>{let a=i.settings.kanbanStages||x;a.push({id:"stage_"+Date.now(),label:"Nova Fase",color:"#94a3b8"}),window.saveSet("kanbanStages",a),window.renderSettings()};const P=(a={})=>({id:`svc_${Date.now()}_${Math.random().toString(16).slice(2,8)}`,name:"",category:"",serviceType:"",description:"",tags:"",finish:"",complexity:"standard",leadTimeDays:0,unitLabel:"m²",recommendedDepartment:"",checklistTemplate:[],defaultStages:[],operationalNotes:"",defaultPricingMode:"smart",width:0,height:0,qty:1,waste:8,priceM2:0,materialCost:0,laborCost:0,setupCost:0,outsourcingCost:0,deliveryCost:0,extraCost:0,taxRate:8,commissionRate:5,overheadRate:12,targetMargin:35,minPrice:0,note:"",...a}),R=()=>Array.isArray(i.settings?.serviceCatalog)?i.settings.serviceCatalog.map(P):[];window.openServiceCatalogModal=(a="")=>{const e=R().find(s=>s.id===a)||P();document.getElementById("modal-container").innerHTML=`
        <div class="modal-overlay">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto m-4">
                <div class="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h3 class="text-xl font-black text-gray-800">${a?"Editar Modelo de Serviço":"Modelo de Serviço"}</h3>
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-gray-400 hover:text-gray-600 transition"><i data-lucide="x"></i></button>
                </div>
                <div class="p-8 space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="hidden" id="svc-id" value="${window.escapeHtml(e.id)}">
                        <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome do modelo</label><input id="svc-name" class="input-modern" value="${window.escapeHtml(e.name)}" placeholder="Ex: Fachada ACM com letra caixa"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Categoria</label><input id="svc-category" class="input-modern" value="${window.escapeHtml(e.category)}" placeholder="Fachadas / Impressão"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de servico</label><input id="svc-service-type" class="input-modern" value="${window.escapeHtml(e.serviceType||"")}" placeholder="Fachada / Banner / Adesivo"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Tags</label><input id="svc-tags" class="input-modern" value="${window.escapeHtml(e.tags)}" placeholder="acm, fachada, premium"></div>
                        <div class="md:col-span-4"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Descrição comercial</label><textarea id="svc-description" class="input-modern h-24" placeholder="Escopo padrão, composição, diferenciais e observações para equipe comercial.">${window.escapeHtml(e.description)}</textarea></div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Modo padrão</label><select id="svc-mode" class="input-modern"><option value="smart" ${e.defaultPricingMode==="smart"?"selected":""}>Inteligente</option><option value="manual" ${e.defaultPricingMode==="manual"?"selected":""}>Manual</option></select></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Acabamento</label><input id="svc-finish" class="input-modern" value="${window.escapeHtml(e.finish)}" placeholder="Ex: Ilhós / dobra"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Largura padrão</label><input id="svc-width" type="number" class="input-modern" value="${window.toNumber(e.width)}"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Altura padrão</label><input id="svc-height" type="number" class="input-modern" value="${window.toNumber(e.height)}"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Quantidade padrão</label><input id="svc-qty" type="number" class="input-modern" value="${window.toNumber(e.qty,1)}"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Perda %</label><input id="svc-waste" type="number" class="input-modern" value="${window.toNumber(e.waste)}"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Preço manual</label><input id="svc-price" type="number" class="input-modern" value="${window.toNumber(e.priceM2)}"></div>
                        <div class="md:col-span-3"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observação interna</label><input id="svc-note" class="input-modern" value="${window.escapeHtml(e.note)}" placeholder="Uso recomendado, lead time, material principal..."></div>
                    </div>

                    <div>
                        <h4 class="text-xs font-black text-emerald-700 uppercase tracking-widest border-b pb-2 mb-4">Precificação Inteligente Padrão</h4>
                        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Checklist sugerido</label>
                                <textarea id="svc-checklist-template" class="input-modern h-40" placeholder="Uma etapa por linha&#10;Ex: Conferir medidas&#10;Separar material&#10;Produzir arte final">${window.escapeHtml(Array.isArray(e.checklistTemplate)?e.checklistTemplate.join(`
`):e.checklistTemplate||"")}</textarea>
                            </div>
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Lead time (dias)</label><input id="svc-lead-time" type="number" class="input-modern" value="${window.toNumber(e.leadTimeDays)}"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Complexidade</label><select id="svc-complexity" class="input-modern"><option value="light" ${e.complexity==="light"?"selected":""}>Leve</option><option value="standard" ${e.complexity!=="light"&&e.complexity!=="high"?"selected":""}>Padrao</option><option value="high" ${e.complexity==="high"?"selected":""}>Alta</option></select></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Unidade base</label><input id="svc-unit-label" class="input-modern" value="${window.escapeHtml(e.unitLabel||"m²")}" placeholder="m² / un / ml"></div>
                                    <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Setor recomendado</label><input id="svc-department" class="input-modern" value="${window.escapeHtml(e.recommendedDepartment||"")}" placeholder="Impressao / Instalacao"></div>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Etapas do kanban sugeridas</label>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                                        ${(i.settings?.kanbanStages||x).map(s=>`
                                            <label class="rounded-xl border border-gray-200 bg-white p-3 flex items-center gap-3">
                                                <input type="checkbox" class="svc-stage-cb rounded text-theme" value="${window.escapeHtml(s.id)}" ${(Array.isArray(e.defaultStages)?e.defaultStages:[]).includes(s.id)?"checked":""}>
                                                <div>
                                                    <p class="font-black text-gray-800 text-sm">${window.escapeHtml(s.label)}</p>
                                                    <p class="text-[10px] text-gray-400 font-bold uppercase">${window.escapeHtml(s.id)}</p>
                                                </div>
                                            </label>
                                        `).join("")}
                                    </div>
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Notas operacionais</label>
                                    <textarea id="svc-operational-notes" class="input-modern h-28" placeholder="Regras internas, montagem, dependencia de aprovacao, instalacao ou fornecedor.">${window.escapeHtml(e.operationalNotes||"")}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Custo m²/un</label><input id="svc-material-cost" type="number" class="input-modern" value="${window.toNumber(e.materialCost)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Mão de obra</label><input id="svc-labor-cost" type="number" class="input-modern" value="${window.toNumber(e.laborCost)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Setup</label><input id="svc-setup-cost" type="number" class="input-modern" value="${window.toNumber(e.setupCost)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Terceiros</label><input id="svc-outsourcing-cost" type="number" class="input-modern" value="${window.toNumber(e.outsourcingCost)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Entrega</label><input id="svc-delivery-cost" type="number" class="input-modern" value="${window.toNumber(e.deliveryCost)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Extras</label><input id="svc-extra-cost" type="number" class="input-modern" value="${window.toNumber(e.extraCost)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Imposto %</label><input id="svc-tax-rate" type="number" class="input-modern" value="${window.toNumber(e.taxRate,8)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Comissão %</label><input id="svc-commission-rate" type="number" class="input-modern" value="${window.toNumber(e.commissionRate,5)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Overhead %</label><input id="svc-overhead-rate" type="number" class="input-modern" value="${window.toNumber(e.overheadRate,12)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Margem alvo %</label><input id="svc-target-margin" type="number" class="input-modern" value="${window.toNumber(e.targetMargin,35)}"></div>
                            <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Preço mínimo</label><input id="svc-min-price" type="number" class="input-modern" value="${window.toNumber(e.minPrice)}"></div>
                        </div>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onclick="document.getElementById('modal-container').innerHTML=''" class="px-5 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                    <button onclick="window.saveServiceCatalogEntry()" class="btn-gradient px-8 py-2 text-white rounded-lg font-bold shadow-lg transition hover:scale-105">Salvar Modelo</button>
                </div>
            </div>
        </div>
    `,window.lucide&&lucide.createIcons()},window.saveServiceCatalogEntry=async()=>{const a=P({id:document.getElementById("svc-id")?.value||void 0,name:document.getElementById("svc-name")?.value||"",category:document.getElementById("svc-category")?.value||"",serviceType:document.getElementById("svc-service-type")?.value||"",description:document.getElementById("svc-description")?.value||"",tags:document.getElementById("svc-tags")?.value||"",finish:document.getElementById("svc-finish")?.value||"",complexity:document.getElementById("svc-complexity")?.value||"standard",leadTimeDays:window.toNumber(document.getElementById("svc-lead-time")?.value),unitLabel:document.getElementById("svc-unit-label")?.value||"m²",recommendedDepartment:document.getElementById("svc-department")?.value||"",checklistTemplate:String(document.getElementById("svc-checklist-template")?.value||"").split(`
`).map(o=>o.trim()).filter(Boolean),defaultStages:Array.from(document.querySelectorAll(".svc-stage-cb:checked")).map(o=>o.value),operationalNotes:document.getElementById("svc-operational-notes")?.value||"",defaultPricingMode:document.getElementById("svc-mode")?.value||"smart",width:window.toNumber(document.getElementById("svc-width")?.value),height:window.toNumber(document.getElementById("svc-height")?.value),qty:window.toNumber(document.getElementById("svc-qty")?.value,1),waste:window.toNumber(document.getElementById("svc-waste")?.value),priceM2:window.toNumber(document.getElementById("svc-price")?.value),materialCost:window.toNumber(document.getElementById("svc-material-cost")?.value),laborCost:window.toNumber(document.getElementById("svc-labor-cost")?.value),setupCost:window.toNumber(document.getElementById("svc-setup-cost")?.value),outsourcingCost:window.toNumber(document.getElementById("svc-outsourcing-cost")?.value),deliveryCost:window.toNumber(document.getElementById("svc-delivery-cost")?.value),extraCost:window.toNumber(document.getElementById("svc-extra-cost")?.value),taxRate:window.toNumber(document.getElementById("svc-tax-rate")?.value,8),commissionRate:window.toNumber(document.getElementById("svc-commission-rate")?.value,5),overheadRate:window.toNumber(document.getElementById("svc-overhead-rate")?.value,12),targetMargin:window.toNumber(document.getElementById("svc-target-margin")?.value,35),minPrice:window.toNumber(document.getElementById("svc-min-price")?.value),note:document.getElementById("svc-note")?.value||""});if(!a.name.trim())return window.customAlert("Informe o nome do modelo de serviço.");const e=R(),s=e.findIndex(o=>o.id===a.id);s>-1?e[s]=a:e.unshift(a),i.settings={...i.settings,serviceCatalog:e},await window.saveSet("serviceCatalog",e),document.getElementById("modal-container").innerHTML="",window.renderSettings(),window.logAudit("CATALOGO_SERVICOS",`Modelo "${a.name}" salvo no catálogo.`)},window.deleteServiceCatalogEntry=async a=>{const e=R(),s=e.find(t=>t.id===a);if(!s||!await window.customConfirm(`Excluir o modelo "${s.name}" do catálogo?`))return;const o=e.filter(t=>t.id!==a);i.settings={...i.settings,serviceCatalog:o},await window.saveSet("serviceCatalog",o),window.renderSettings(),window.logAudit("CATALOGO_SERVICOS",`Modelo "${s.name}" removido do catálogo.`)},window.renderEmployeeRolePreview=()=>{const a=document.getElementById("emp-role-preview"),e=document.getElementById("emp-role")?.value;if(!a||!e)return;const s=window.getRoleDefinition(e),o=window.getRoleAccess(s),t=o.effectiveViews.map(l=>{const d=(window.permissionCatalog||[]).find(r=>r.id===l);return`<span class="badge badge-blue">${window.escapeHtml(d?.short||l)}</span>`}).join("");a.innerHTML=`
        <p class="text-[10px] uppercase font-black tracking-widest text-blue-400">Preview de acesso</p>
        <p class="font-black text-blue-900 mt-2">${window.escapeHtml(s.name||"Sem cargo")}</p>
        <p class="text-xs text-blue-700 font-bold mt-1">${o.effectiveViews.length} área(s) visíveis para este colaborador.</p>
        <div class="flex flex-wrap gap-2 mt-3">${t||'<span class="badge badge-gray">Sem acesso</span>'}</div>
    `},window.renderUsersManagementBlock=()=>{const a=i.settings.customRoles||w,e=[...i.profiles||[]].sort((t,l)=>String(t.name||t.email||"").localeCompare(String(l.name||l.email||""))),s=e.filter(t=>t.active!==!1).length,o=e.filter(t=>t.active===!1).length;return`
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                ${window.dashCard("Cadastrados",e.length,"users","bg-blue-50 text-blue-600","Contas do sistema")}
                ${window.dashCard("Ativos",s,"user-check","bg-emerald-50 text-emerald-600","Acessos liberados")}
                ${window.dashCard("Suspensos",o,o?"user-x":"shield-check",o?"bg-red-50 text-red-600":"bg-gray-50 text-gray-500","Acessos bloqueados")}
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
                <div class="rounded-3xl border border-gray-100 bg-white shadow-xl p-6">
                    <div class="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 mb-5">
                        <div>
                            <p class="text-[10px] uppercase font-black tracking-[0.28em] text-emerald-500">Criar acesso</p>
                            <h3 id="emp-form-title" class="mt-2 text-xl font-black">Criar Acesso</h3>
                            <p class="mt-2 text-sm font-bold text-gray-500">Cadastre aqui o login dos seus funcionários para uso do FlowSystem.</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <input type="hidden" id="emp-id">
                        <div>
                            <label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Nome do Usuário</label>
                            <input id="emp-name" class="input-modern h-11 font-medium" placeholder="Nome exibido no sistema">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Email de Acesso</label>
                            <input id="emp-email" type="email" class="input-modern h-11 font-medium" placeholder="login@empresa.com">
                        </div>
                        <div id="emp-pass-wrapper">
                            <label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Senha Inicial</label>
                            <input id="emp-pass" type="password" class="input-modern h-11 font-medium" placeholder="Defina uma senha inicial">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-500 uppercase block mb-1">Cargo de Acesso</label>
                            <select id="emp-role" onchange="window.renderEmployeeRolePreview()" class="input-modern h-11 font-bold text-theme bg-purple-50 border-purple-200">
                                ${a.map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}
                            </select>
                        </div>
                        <div id="emp-role-preview" class="rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs text-blue-900"></div>
                        <div class="flex gap-2 pt-2 border-t border-gray-100">
                            <button id="btn-create-emp" onclick="window.createOrUpdateEmployee()" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg shadow-md transition">+ Criar Acesso</button>
                            <button id="btn-cancel-emp" onclick="window.cancelEditEmployee()" class="hidden bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold px-3 rounded-lg transition">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                    <div class="px-6 py-5 bg-gray-50 border-b border-gray-100">
                        <h3 class="font-black text-gray-800">Lista de usuários cadastrados</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">Contas que podem usar o sistema, com cargo e status de acesso.</p>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm min-w-[760px]">
                            <thead class="bg-gray-800 text-white font-bold text-xs uppercase">
                                <tr>
                                    <th class="p-4">Usuário</th>
                                    <th class="p-4 text-center">Cargo</th>
                                    <th class="p-4 text-center">Estado</th>
                                    <th class="p-4 text-center">Opções</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${e.map(t=>{const l=a.find(c=>c.id===t.role),d=l?l.name:"Removido",r=t.id===i.user?.uid;return`
                                        <tr class="hover:bg-gray-50 ${t.active===!1?"opacity-60":""} transition">
                                            <td class="p-4">
                                                <div class="font-black text-gray-800 flex items-center">${window.escapeHtml(t.name||"Sem Nome")} ${r?'<span class="text-[9px] bg-theme text-white px-2 py-0.5 rounded-full ml-2 uppercase font-black tracking-widest">A tua conta</span>':""}</div>
                                                <div class="text-xs text-gray-500 mt-1 font-medium">${window.escapeHtml(t.email||"Sem email")}</div>
                                            </td>
                                            <td class="p-4 text-center"><span class="badge ${t.role==="admin"?"bg-red-100 text-red-700 border-red-200":"bg-blue-50 text-blue-700 border-blue-200"} text-[10px]">${window.escapeHtml(d)}</span></td>
                                            <td class="p-4 text-center">${t.active!==!1?'<span class="text-xs font-black text-green-600"><i data-lucide="check-circle" class="inline w-3 h-3 mb-0.5"></i> ATIVA</span>':'<span class="text-xs font-black text-red-600"><i data-lucide="slash" class="inline w-3 h-3 mb-0.5"></i> SUSPENSA</span>'}</td>
                                            <td class="p-4 text-center">
                                                <div class="flex justify-center gap-2">
                                                    ${r?'<span class="text-xs font-bold text-gray-300 italic">Protegido</span>':`<button onclick="window.editEmployee('${t.id}')" class="text-gray-500 hover:text-white bg-gray-100 hover:bg-orange-500 p-2 rounded shadow-sm transition"><i data-lucide="edit-2" class="w-4 h-4"></i></button><button onclick="window.toggleEmployeeStatus('${t.id}', ${t.active!==!1})" class="${t.active!==!1?"text-gray-500 hover:text-white bg-gray-100 hover:bg-red-500":"text-red-500 hover:text-white bg-red-50 hover:bg-green-500"} p-2 rounded shadow-sm transition"><i data-lucide="${t.active!==!1?"ban":"power"}" class="w-4 h-4"></i></button>`}
                                                </div>
                                            </td>
                                        </tr>
                                    `}).join("")||'<tr><td colspan="4" class="p-8 text-center text-gray-400">Nenhum usuário cadastrado.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `},window.editEmployee=a=>{const e=i.profiles.find(y=>y.id===a);if(!e)return;i.editingEmpId=a;const s=document.getElementById("emp-form-title"),o=document.getElementById("emp-id"),t=document.getElementById("emp-name"),l=document.getElementById("emp-email"),d=document.getElementById("emp-pass-wrapper"),r=document.getElementById("emp-role"),c=document.getElementById("btn-cancel-emp");s&&(s.innerText="Editar Acesso"),o&&(o.value=e.id),t&&(t.value=e.name||""),l&&(l.value=e.email||"",l.disabled=!0),d&&(d.style.display="none"),r&&(r.value=e.role||"seller");const u=document.getElementById("btn-create-emp");u&&(u.innerHTML="Salvar Acesso",u.classList.replace("bg-green-500","bg-orange-500"),u.classList.replace("hover:bg-green-600","hover:bg-orange-600")),c&&c.classList.remove("hidden"),window.renderEmployeeRolePreview()},window.cancelEditEmployee=()=>{i.editingEmpId=null;const a=document.getElementById("emp-form-title"),e=document.getElementById("emp-id"),s=document.getElementById("emp-name"),o=document.getElementById("emp-email"),t=document.getElementById("emp-pass-wrapper"),l=document.getElementById("emp-pass"),d=document.getElementById("btn-cancel-emp");a&&(a.innerText="Criar Acesso"),e&&(e.value=""),s&&(s.value=""),o&&(o.value="",o.disabled=!1),t&&(t.style.display="block"),l&&(l.value="");const r=document.getElementById("btn-create-emp");r&&(r.innerHTML="+ Criar Acesso",r.classList.replace("bg-orange-500","bg-green-500"),r.classList.replace("hover:bg-orange-600","hover:bg-green-600")),d&&d.classList.add("hidden"),window.renderEmployeeRolePreview()},window.toggleEmployeeStatus=async(a,e)=>{const s=!e;if(await window.customConfirm("Desejas alterar o acesso deste colaborador?"))try{await H(E($,"artifacts",S,"public","data","profiles",a),{active:s,updatedAt:B()}),window.logAudit("GESTAO_EQUIPA",`Status de ${a} alterado.`)}catch(o){window.customAlert("Erro: "+o.message)}},window.createOrUpdateEmployee=async()=>{const a=document.getElementById("emp-id")?.value||"",e=document.getElementById("emp-email")?.value||"",s=document.getElementById("emp-role")?.value||"seller",o=document.getElementById("emp-name")?.value||"",t=document.getElementById("btn-create-emp");t&&(t.innerHTML="A processar...",t.disabled=!0);try{if(i.editingEmpId&&a)await H(E($,"artifacts",S,"public","data","profiles",a),{name:o,role:s,updatedAt:B()}),window.logAudit("GESTAO_EQUIPA","Colaborador editado."),await window.customAlert("Atualizado com sucesso!"),window.cancelEditEmployee();else{const l=document.getElementById("emp-pass")?.value||"";if(!e||!l||!o)throw new Error("Preenche todos os campos!");let d;try{d=V(q,"SecApp_"+Date.now())}catch{}const r=G(d),c=await F(r,e,l);await K(r),await T(E($,"artifacts",S,"public","data","profiles",c.user.uid),{email:e,name:o,role:s,active:!0,companyId:i.companyId,createdAt:B()}),window.logAudit("GESTAO_EQUIPA","Novo colaborador criado."),await window.customAlert("Conta criada com sucesso!"),window.cancelEditEmployee()}}catch(l){await window.customAlert("Erro: "+l.message)}finally{t&&(t.disabled=!1,t.innerHTML=i.editingEmpId?"Salvar Acesso":"+ Criar Acesso")}},window.saveSecurityPolicy=async(a,e)=>{const s=i.settings?.security||{};await window.saveSet("security",{...s,[a]:e})},window.updateCommercialSettings=async(a={})=>{const e={...i.settings?.commercial||{},...a};await window.saveSet("commercial",e)},window.updateLegalSettings=async(a={})=>{const e={...i.settings?.legal||{},...a};await window.saveSet("legal",e)},window.markOnboardingSetup=async()=>{const a=new Date().toISOString(),e={...i.settings?.onboarding||{},completed:!0,completedAt:a,completedBy:i.user?.email||"Desconhecido"};await window.saveSet("onboarding",e),window.logAudit("ONBOARDING_EMPRESA",`Onboarding comercial marcado como concluido por ${e.completedBy}.`),await window.customAlert("Onboarding comercial marcado como concluido.")};const Q=(a={})=>{const e=a.commercial||{},s=a.legal||{},o=[{key:"companyName",label:"Razao social cadastrada",done:!!a.companyName},{key:"cnpj",label:"Documento fiscal informado",done:!!a.cnpj},{key:"phone",label:"Telefone comercial informado",done:!!a.phone},{key:"address",label:"Endereco completo informado",done:!!a.address},{key:"logo",label:"Logo da empresa enviada",done:!!a.logo},{key:"email",label:"Email comercial configurado",done:!!e.email},{key:"support",label:"Canal de suporte configurado",done:!!(e.supportPhone||e.supportEmail)},{key:"plan",label:"Modelo comercial definido",done:!!e.planName},{key:"lgpd",label:"Contato LGPD definido",done:!!s.lgpdEmail},{key:"terms",label:"Link ou referencia de termos informado",done:!!(s.termsUrl||s.termsVersion)},{key:"privacy",label:"Link ou referencia de privacidade informado",done:!!(s.privacyUrl||s.privacyVersion)}],t=o.filter(l=>l.done).length;return{checks:o,doneCount:t,total:o.length,percent:Math.round(t/o.length*100)}};window.renderCommercialSetupBlock=()=>{const a=i.settings||{},e=a.commercial||{},s=a.legal||{},o=a.onboarding||{},t=Q(a),l=t.percent>=85?"bg-emerald-50 text-emerald-600":t.percent>=60?"bg-amber-50 text-amber-600":"bg-red-50 text-red-600";return`
        <div class="mb-8 space-y-6">
            <div class="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h3 class="font-black text-gray-800">Preparacao para Venda</h3>
                        <p class="text-xs text-gray-400 font-bold mt-1">Dados comerciais, onboarding da empresa e base legal minima para operar com cliente pagante.</p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="badge ${l}">${t.percent}% pronto</span>
                        <span class="badge badge-gray">${t.doneCount}/${t.total} itens</span>
                        <button onclick="window.markOnboardingSetup()" class="btn-gradient px-4 py-2 text-white rounded-lg text-xs font-bold shadow">Marcar onboarding</button>
                    </div>
                </div>
                <div class="p-6 grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
                    <div class="space-y-6">
                        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                            <div class="flex items-center justify-between gap-3">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Onboarding comercial</p>
                                    <p class="text-2xl font-black text-gray-800 mt-2">${t.percent}%</p>
                                </div>
                                <div class="h-16 w-16 rounded-full border-4 border-white shadow-inner flex items-center justify-center font-black ${l}">
                                    ${t.doneCount}
                                </div>
                            </div>
                            <div class="mt-4 space-y-2">
                                ${t.checks.map(d=>`
                                    <div class="flex items-center justify-between gap-3 rounded-xl border ${d.done?"border-emerald-100 bg-emerald-50":"border-gray-200 bg-white"} px-4 py-3">
                                        <span class="text-sm font-bold ${d.done?"text-emerald-700":"text-gray-600"}">${window.escapeHtml(d.label)}</span>
                                        <span class="badge ${d.done?"badge-green":"badge-gray"}">${d.done?"OK":"Pendente"}</span>
                                    </div>
                                `).join("")}
                            </div>
                            <div class="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs text-blue-900">
                                <p class="font-black uppercase tracking-widest text-blue-500 mb-2">Status salvo</p>
                                <p>${o.completed?`Concluido em ${window.escapeHtml(window.formatDate(o.completedAt))} por ${window.escapeHtml(o.completedBy||"Sistema")}.`:"Onboarding ainda nao foi marcado como concluido."}</p>
                            </div>
                        </div>
                        <div class="rounded-2xl border border-gray-200 bg-white p-5">
                            <h4 class="font-black text-gray-800">Documentos base do produto</h4>
                            <p class="text-xs text-gray-400 font-bold mt-1">Use estes modelos como base interna e publique suas versoes oficiais.</p>
                            <div class="mt-4 flex flex-col gap-3 text-sm">
                                <a href="/docs/TERMOS-DE-USO.md" class="rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-700 hover:border-theme/30 hover:text-theme transition">Abrir modelo de Termos de Uso</a>
                                <a href="/docs/POLITICA-DE-PRIVACIDADE.md" class="rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-700 hover:border-theme/30 hover:text-theme transition">Abrir modelo de Politica de Privacidade</a>
                                <a href="/docs/ONBOARDING-CLIENTE.md" class="rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-700 hover:border-theme/30 hover:text-theme transition">Abrir checklist de onboarding do cliente</a>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-6">
                        <div class="rounded-2xl border border-gray-200 bg-white p-5">
                            <h4 class="font-black text-gray-800">Dados Comerciais e Suporte</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email comercial</label><input class="input-modern" value="${window.escapeHtml(e.email||"")}" onchange="window.updateCommercialSettings({ email: this.value.trim() })"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">WhatsApp suporte</label><input class="input-modern" value="${window.escapeHtml(e.supportPhone||"")}" onchange="window.updateCommercialSettings({ supportPhone: this.value.trim() })"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email suporte</label><input class="input-modern" value="${window.escapeHtml(e.supportEmail||"")}" onchange="window.updateCommercialSettings({ supportEmail: this.value.trim() })"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Website</label><input class="input-modern" value="${window.escapeHtml(e.website||"")}" onchange="window.updateCommercialSettings({ website: this.value.trim() })"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Plano / modelo comercial</label><input class="input-modern" value="${window.escapeHtml(e.planName||"")}" onchange="window.updateCommercialSettings({ planName: this.value.trim() })" placeholder="Ex: Implantacao + mensalidade"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Ciclo de cobranca</label><select class="input-modern" onchange="window.updateCommercialSettings({ billingCycle: this.value })"><option value="">Selecione...</option><option value="monthly" ${e.billingCycle==="monthly"?"selected":""}>Mensal</option><option value="quarterly" ${e.billingCycle==="quarterly"?"selected":""}>Trimestral</option><option value="annual" ${e.billingCycle==="annual"?"selected":""}>Anual</option><option value="custom" ${e.billingCycle==="custom"?"selected":""}>Personalizado</option></select></div>
                                <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacoes comerciais</label><textarea class="input-modern h-24" onchange="window.updateCommercialSettings({ notes: this.value.trim() })" placeholder="Implantacao, treinamento, SLA, suporte, condicoes comerciais...">${window.escapeHtml(e.notes||"")}</textarea></div>
                            </div>
                        </div>
                        <div class="rounded-2xl border border-gray-200 bg-white p-5">
                            <h4 class="font-black text-gray-800">Base Legal e LGPD</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Responsavel legal</label><input class="input-modern" value="${window.escapeHtml(s.legalContact||"")}" onchange="window.updateLegalSettings({ legalContact: this.value.trim() })"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Email LGPD</label><input class="input-modern" value="${window.escapeHtml(s.lgpdEmail||"")}" onchange="window.updateLegalSettings({ lgpdEmail: this.value.trim() })"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Versao dos termos</label><input class="input-modern" value="${window.escapeHtml(s.termsVersion||"")}" onchange="window.updateLegalSettings({ termsVersion: this.value.trim() })" placeholder="Ex: v1.0 - abr/2026"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Versao da privacidade</label><input class="input-modern" value="${window.escapeHtml(s.privacyVersion||"")}" onchange="window.updateLegalSettings({ privacyVersion: this.value.trim() })" placeholder="Ex: v1.0 - abr/2026"></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">URL termos</label><input class="input-modern" value="${window.escapeHtml(s.termsUrl||"")}" onchange="window.updateLegalSettings({ termsUrl: this.value.trim() })" placeholder="https://..."></div>
                                <div><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">URL privacidade</label><input class="input-modern" value="${window.escapeHtml(s.privacyUrl||"")}" onchange="window.updateLegalSettings({ privacyUrl: this.value.trim() })" placeholder="https://..."></div>
                                <div class="md:col-span-2"><label class="text-xs font-bold text-gray-500 uppercase mb-1 block">Observacoes legais</label><textarea class="input-modern h-24" onchange="window.updateLegalSettings({ notes: this.value.trim() })" placeholder="Bases contratuais, observacoes de tratamento de dados, responsavel interno...">${window.escapeHtml(s.notes||"")}</textarea></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `},window.renderSecuritySettingsBlock=()=>{const a=i.settings?.security||{},e=Math.max(5,Number(a.idleTimeoutMinutes)||30),s=[...i.accessLogs||[]].sort((l,d)=>(d.createdAt?.seconds||0)-(l.createdAt?.seconds||0)).slice(0,12),o=window.isCompactLayout?.(),t=s.map(l=>`
        <div class="mobile-record-card">
            <div class="mobile-record-head">
                <div class="min-w-0 flex-1">
                    <p class="mobile-record-kicker">Acesso</p>
                    <h3 class="mobile-record-title">${window.escapeHtml(l.name||l.email||"-")}</h3>
                    <p class="mobile-record-subtitle">${window.escapeHtml(l.email||"Sem email")}</p>
                </div>
            </div>
            <div class="mobile-record-grid">
                <div class="mobile-record-meta"><p class="mobile-record-meta-label">Data</p><p class="mobile-record-meta-value">${l.createdAt?new Date(l.createdAt.seconds*1e3).toLocaleString("pt-BR"):"-"}</p></div>
                <div class="mobile-record-meta"><p class="mobile-record-meta-label">Origem</p><p class="mobile-record-meta-value">${window.escapeHtml(l.platform||"Navegador")}</p></div>
            </div>
            <div class="mobile-record-footer"><div class="mobile-record-status"><span class="badge ${l.action==="login"?"badge-green":l.action==="logout"?"badge-blue":"badge-yellow"}">${window.escapeHtml(l.action||"-")}</span></div></div>
        </div>
    `).join("");return`
        <div class="mb-8 space-y-6">
            <div class="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50">
                    <h3 class="font-black text-gray-800">Segurança e Sessão</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Recuperação de senha, política de expiração da sessão e leitura dos acessos recentes.</p>
                </div>
                <div class="p-6 grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
                    <div class="space-y-4">
                        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                            <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Tempo limite da sessão</label>
                            <input type="number" min="5" step="5" value="${e}" onchange="window.saveSecurityPolicy('idleTimeoutMinutes', Number(this.value) || 30)" class="input-modern h-11 max-w-[180px]">
                            <p class="text-xs text-gray-500 font-bold mt-3">Após esse tempo sem atividade, o sistema encerra a sessão automaticamente.</p>
                        </div>
                        <label class="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex items-start gap-4 cursor-pointer">
                            <input type="checkbox" class="mt-1 rounded text-theme" ${a.passwordResetEnabled!==!1?"checked":""} onchange="window.saveSecurityPolicy('passwordResetEnabled', this.checked)">
                            <div>
                                <p class="font-black text-gray-800">Permitir recuperação de senha no login</p>
                                <p class="text-xs text-gray-500 font-bold mt-1">Mantém visível o atalho “Esqueci minha senha” para o usuário final.</p>
                            </div>
                        </label>
                    </div>
                    <div class="rounded-2xl border border-gray-200 overflow-hidden">
                        <div class="px-5 py-4 bg-gray-50 border-b border-gray-100">
                            <h4 class="font-black text-gray-800">Acessos recentes</h4>
                            <p class="text-xs text-gray-400 font-bold mt-1">Login, logout e sessão encerrada por inatividade.</p>
                        </div>
                        ${o?`<div class="mobile-list-stack p-4">${t||'<div class="card-modern p-6 text-center text-gray-400">Sem registros de acesso ainda.</div>'}</div>`:`<div class="overflow-x-auto">
                            <table class="w-full text-left text-sm min-w-[760px]">
                                <thead class="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b">
                                    <tr>
                                        <th class="p-4">Data</th>
                                        <th class="p-4">Usuário</th>
                                        <th class="p-4">Ação</th>
                                        <th class="p-4">Origem</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    ${s.map(l=>`<tr><td class="p-4 font-bold text-gray-700">${l.createdAt?new Date(l.createdAt.seconds*1e3).toLocaleString("pt-BR"):"-"}</td><td class="p-4"><div class="font-black text-gray-800">${window.escapeHtml(l.name||l.email||"-")}</div><div class="text-xs text-gray-400 font-bold">${window.escapeHtml(l.email||"-")}</div></td><td class="p-4"><span class="badge ${l.action==="login"?"badge-green":l.action==="logout"?"badge-blue":"badge-yellow"}">${window.escapeHtml(l.action||"-")}</span></td><td class="p-4 text-xs text-gray-500 font-bold">${window.escapeHtml(l.platform||"Navegador")}</td></tr>`).join("")||'<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem registros de acesso ainda.</td></tr>'}
                                </tbody>
                            </table>
                        </div>`}
                    </div>
                </div>
            </div>
        </div>
    `},window.setSettingsTab=a=>{const e={company:"settings_company",catalog:"settings_catalog",workflow:"settings_workflow",users:"settings_users",security:"settings_security"};i.settingsTab=a,e[a]&&(i.currentView=e[a]);const s={company:"Sistema · Configurações",catalog:"Sistema · Catalogo",workflow:"Sistema · Fluxo",users:"Sistema · Usuarios",security:"Sistema · Seguranca"},o=document.getElementById("page-title");o&&(o.innerText=s[a]||"Sistema"),window.renderNav?.(),window.renderSettings()};const J=[{id:"company",label:"Empresa",icon:"building-2"},{id:"catalog",label:"Catalogo",icon:"briefcase-business"},{id:"workflow",label:"Fluxo",icon:"workflow"},{id:"users",label:"Usuarios",icon:"users"},{id:"security",label:"Seguranca",icon:"shield-check"}],L={settings:"company",settings_company:"company",settings_catalog:"catalog",settings_workflow:"workflow",settings_users:"users",settings_security:"security"},X=window.renderSettings;window.renderSettings=()=>{X()};const Y=window.renderSettings;window.renderSettings=()=>{Y();const a=document.getElementById("view-container");if(!a)return;const e=i.settings||{},s=e.customRoles||w,o=document.createElement("div");o.className="mb-8",o.innerHTML=`
        <div class="mb-6 rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl relative">
            <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,#22c55e,transparent_30%),radial-gradient(circle_at_bottom_left,#38bdf8,transparent_35%)]"></div>
            <div class="relative p-8 flex flex-col lg:flex-row justify-between gap-6">
                <div>
                    <p class="text-xs font-black uppercase tracking-[0.35em] text-white/50 mb-3">ADMIN</p>
                    <h2 class="text-3xl md:text-4xl font-black tracking-tight">Configurações & Administração</h2>
                    <p class="text-white/60 mt-3 max-w-2xl">Governança do sistema, identidade visual, equipe, permissões e auditoria em uma leitura mais executiva.</p>
                </div>
                <div class="hero-stats-row lg:max-w-[28rem]">
                    <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Equipe</p><p class="text-2xl font-black mt-1">${i.profiles.length}</p></div>
                    <div class="hero-stat-card bg-white/10 border border-white/10 rounded-2xl p-4"><p class="text-[10px] uppercase font-black text-white/50">Cargos</p><p class="text-2xl font-black mt-1">${s.length}</p></div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            ${window.dashCard("Cargos Configurados",s.length,"shield-check","bg-blue-50 text-blue-600","Perfis e permissões")}
            ${window.dashCard("Colaboradores",i.profiles.length,"users","bg-green-50 text-green-600","Contas vinculadas")}
            ${window.dashCard("Etapas Kanban",(e.kanbanStages||x).length,"columns-3","bg-purple-50 text-purple-600","Fluxo operacional")}
            ${window.dashCard("Logs Auditoria",i.auditLogs.length,"scroll-text","bg-orange-50 text-orange-600","Rastreabilidade ativa")}
        </div>
    `,a.insertAdjacentElement("afterbegin",o);const t=i.profiles.filter(p=>p.active!==!1),l=i.profiles.filter(p=>p.active===!1),d=i.profiles.filter(p=>p.role==="admin"),r=i.profiles.length?i.profiles.reduce((p,b)=>p+window.getRoleAccess(b.role).effectiveViews.length,0)/i.profiles.length:0,c=document.createElement("div");c.className="mb-8 space-y-6",c.innerHTML=`
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            ${window.dashCard("Equipe Ativa",t.length,"user-check","bg-emerald-50 text-emerald-600","Contas liberadas")}
            ${window.dashCard("Suspensas",l.length,"user-x",l.length?"bg-red-50 text-red-600":"bg-gray-50 text-gray-500","Acesso bloqueado")}
            ${window.dashCard("Admins",d.length,"shield-alert","bg-amber-50 text-amber-600","Acesso total")}
            ${window.dashCard("Média de Acessos",r.toFixed(1),"key-round","bg-cyan-50 text-cyan-600","Permissões por colaborador")}
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
            <div class="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50">
                    <h3 class="font-black text-gray-800">Matriz de Cargos e Permissões</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Leitura rápida para auditar o que cada cargo consegue abrir no sistema.</p>
                </div>
                <div class="divide-y divide-gray-100">
                    ${s.map(p=>{const b=window.getRoleAccess(p),g=b.effectiveViews.map(h=>{const A=(window.permissionCatalog||[]).find(f=>f.id===h);return`<span class="badge badge-blue">${window.escapeHtml(A?.short||h)}</span>`}).join("");return`
                            <div class="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <p class="font-black text-gray-800">${window.escapeHtml(p.name)}</p>
                                    <p class="text-xs text-gray-400 font-bold mt-1">${b.effectiveViews.length} acesso(s) efetivo(s)</p>
                                </div>
                                <div class="flex flex-wrap gap-2">${g||'<span class="badge badge-gray">Sem acesso</span>'}</div>
                            </div>
                        `}).join("")}
                </div>
            </div>
            <div class="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                <div class="p-5 border-b border-gray-100 bg-gray-50">
                    <h3 class="font-black text-gray-800">Equipe por Cargo</h3>
                    <p class="text-xs text-gray-400 font-bold mt-1">Quem está alocado em cada perfil de acesso.</p>
                </div>
                <div class="divide-y divide-gray-100">
                    ${s.map(p=>{const b=i.profiles.filter(g=>g.role===p.id);return`
                            <div class="p-5">
                                <div class="flex items-center justify-between gap-3">
                                    <p class="font-black text-gray-800">${window.escapeHtml(p.name)}</p>
                                    <span class="badge ${b.length?"badge-green":"badge-gray"}">${b.length} pessoa(s)</span>
                                </div>
                                <div class="mt-3 flex flex-wrap gap-2">
                                    ${b.map(g=>`<span class="badge ${g.active===!1?"badge-red":"badge-blue"}">${window.escapeHtml(g.name||g.email||"Sem nome")}</span>`).join("")||'<span class="text-xs text-gray-400 font-bold">Sem integrantes neste cargo.</span>'}
                                </div>
                            </div>
                        `}).join("")}
                </div>
            </div>
        </div>
    `,o.insertAdjacentElement("afterend",c);const u=document.createElement("div");u.innerHTML=window.renderCommercialSetupBlock(),c.insertAdjacentElement("afterend",u.firstElementChild);const y=a.querySelector(".card-modern");y&&y.classList.add("border","border-gray-100","shadow-xl");const C=document.createElement("div");C.innerHTML=window.renderSecuritySettingsBlock(),a.appendChild(C.firstElementChild),window.renderEmployeeRolePreview(),window.lucide&&lucide.createIcons()};const Z=window.renderSettings;window.renderSettings=()=>{Z();const a=document.getElementById("view-container");if(!a)return;L[i.currentView]&&(i.settingsTab=L[i.currentView]);const e=Array.from(a.children).find(n=>n.classList.contains("card-modern")&&n.classList.contains("max-w-5xl"));if(!e)return;const s=a.firstElementChild,o=a.lastElementChild!==e?a.lastElementChild:null,t=e.previousElementSibling&&e.previousElementSibling!==s?e.previousElementSibling:null;t?.previousElementSibling&&t.previousElementSibling!==s&&t.previousElementSibling;const l=e.children[0],d=e.children[1],r=e.children[2],c=e.children[3]||null,u=c?.children[0]||null,y=c?.children[1]||null;c?.children[2],c?.children[3];const C=c?.children[4]||null,p=c?.children[5]||null,b=J.filter(n=>n.id==="company"||n.id==="catalog"||n.id==="workflow"||i.role==="admin");b.some(n=>n.id===i.settingsTab)||(i.settingsTab=b[0]?.id||"company");const g=String(i.currentView||"").startsWith("settings_"),h=n=>{if(!n)return null;const m=document.createElement("div");return m.className="rounded-3xl border border-gray-100 bg-white shadow-xl p-6",m.appendChild(n),m},A=(n,m)=>{if(!n||!m)return null;const v=document.createElement("div");return v.className="rounded-3xl border border-gray-100 bg-white shadow-xl p-6",v.appendChild(n),v.appendChild(m),v},f=document.createElement("div");f.className="mb-8 space-y-6",f.innerHTML=g?"":`
        <div class="card-modern border border-gray-100 shadow-xl p-5">
            <div class="ui-tab-row">
                ${b.map(n=>`<button onclick="window.setSettingsTab('${n.id}')" class="${window.getUiTabClass(i.settingsTab===n.id)}"><i data-lucide="${n.icon}" class="inline w-4 h-4"></i>${n.label}</button>`).join("")}
            </div>
        </div>
    `,s.insertAdjacentElement("afterend",f);const k=n=>{const m=document.createElement("div");return m.className="ui-tab-panel space-y-6",m.hidden=i.settingsTab!==n,f.appendChild(m),m},j=k("company"),ee=k("catalog"),te=k("workflow"),I=b.some(n=>n.id==="users")?k("users"):null,N=b.some(n=>n.id==="security")?k("security"):null,D=h(l);D&&j.appendChild(D),t&&j.appendChild(t);const _=h(d);_&&ee.appendChild(_);const O=h(r);if(O&&te.appendChild(O),I){const n=document.createElement("div");n.className="rounded-3xl border border-emerald-100 bg-emerald-50 px-6 py-5 text-emerald-900 shadow-sm",n.innerHTML=`
            <p class="text-[10px] uppercase font-black tracking-[0.28em] text-emerald-500">Usuários</p>
            <h3 class="mt-2 text-xl font-black">Criação de acesso ao sistema</h3>
            <p class="mt-2 text-sm font-bold text-emerald-800/80">Cadastre aqui o login dos seus funcionários, defina o cargo e suspenda ou reative o acesso quando precisar.</p>
        `,I.appendChild(n);const m=document.createElement("div");m.innerHTML=window.renderUsersManagementBlock(),m.firstElementChild&&I.appendChild(m.firstElementChild);const v=A(u,y);v&&I.appendChild(v)}if(N){o&&N.appendChild(o);const n=A(C,p);n&&N.appendChild(n)}e.remove(),window.renderEmployeeRolePreview(),window.lucide&&window.lucide.createIcons()},window.wrapPermissionGuard("settings",["openRoleModal","saveRole","deleteRole","openServiceCatalogModal","saveServiceCatalogEntry","deleteServiceCatalogEntry","editEmployee","toggleEmployeeStatus","createOrUpdateEmployee","saveSecurityPolicy","updateCommercialSettings","updateLegalSettings","markOnboardingSetup"],"Sem permissao administrativa para executar esta acao.")}export{me as registerSettings};

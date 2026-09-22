

const API_URL = "https://script.google.com/macros/s/AKfycbwqamtXzMPYYB8ujWcDhpmENejxoyH21TxFyB_WHCsNq9rXp_8RSm3VzFwR--CcEdbD-w/exec"; // သင့်ရဲ့ Web App URL ကို ဤနေရာတွင် ပြောင်းထည့်ပါ

const state = {
  orders: [],
  customers: [],
  staff: [],
  services: [],
  payments: [],
  dashboard: null,
  reports: null,
  settings: {},
  page: "dashboard",
  orderPage: 1,
  orderPerPage: 15
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("todayLabel").textContent =
    new Date().toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
  if (sessionStorage.getItem("tta_logged_in") === "true") showApp();
});

function esc(v){
  return String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function money(v){return Number(v||0).toLocaleString()+" MMK";}
function dateText(v){if(!v)return "-";const d=new Date(v);return isNaN(d)?esc(v):d.toLocaleString();}
function statusBadge(v){
  const s=String(v||"").toLowerCase();
  let c=s==="completed"?"b-completed":s==="in progress"?"b-progress":s==="cancelled"?"b-cancelled":"b-new";
  return `<span class="badge ${c}">${esc(v||"New")}</span>`;
}
function paymentBadge(v){
  const s=String(v||"").toLowerCase();
  const c=s==="paid"?"b-paid":s==="partial"?"b-partial":"b-unpaid";
  return `<span class="badge ${c}">${esc(v||"Unpaid")}</span>`;
}
function showLoading(v=true){document.getElementById("loading").classList.toggle("show",v)}
function toast(msg){
  const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2500);
}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function openModal(id){document.getElementById(id).classList.add("show")}

async function apiGet(action, params={}){
  const qs=new URLSearchParams({action,...params});
  const res=await fetch(API_URL+"?"+qs.toString(),{cache:"no-store"});
  const data=await res.json();
  if(!data.success) throw new Error(data.error||data.message||"API error");
  return data.data;
}

// ပြင်ဆင်ထားသော apiPost Function
async function apiPost(payload){
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  if(!data.success) throw new Error(data.error || "Failed to process request");
  return data;
}

// ပြင်ဆင်ထားသော postAndRefresh Function
async function postAndRefresh(payload, callback){
  showLoading(true);
  try{
    await apiPost(payload);
    toast("Saved successfully.");
    await loadAll(); 
    if(callback) callback();
  }catch(e){
    toast("Error: " + e.message);
  }finally{
    showLoading(false);
  }
}

async function login(){
  const username=document.getElementById("loginUser").value.trim();
  const password=document.getElementById("loginPass").value;
  document.getElementById("loginError").textContent="";
  if(!username||!password){document.getElementById("loginError").textContent="Enter username and password.";return}

  showLoading(true);
  try {
    await apiPost({action:"login",username,password});
    sessionStorage.setItem("tta_logged_in","true");
    sessionStorage.setItem("tta_user",username);
    showApp();
  } catch(e) {
    document.getElementById("loginError").textContent=e.message||"Connection failed";
  } finally {
    showLoading(false);
  }
}

function showApp(){
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("currentUser").textContent=sessionStorage.getItem("tta_user")||"admin";
  loadAll();
}
function logout(){
  sessionStorage.removeItem("tta_logged_in");
  sessionStorage.removeItem("tta_user");
  location.reload();
}
function toggleSidebar(){document.getElementById("sidebar").classList.toggle("open")}

async function loadAll(){
  showLoading(true);
  try{
    const results=await Promise.all([
      apiGet("orders"),
      apiGet("dashboard"),
      apiGet("customers"),
      apiGet("staff"),
      apiGet("services"),
      apiGet("payments"),
      apiGet("reports"),
      apiGet("settings")
    ]);
    state.orders=results[0]||[];
    state.dashboard=results[1]||{};
    state.customers=results[2]||[];
    state.staff=results[3]||[];
    state.services=results[4]||[];
    state.payments=results[5]||[];
    state.reports=results[6]||{};
    state.settings=results[7]||{};
    updateStaffFilters();
    renderCurrentPage();
  }catch(e){
    toast("Load failed: "+e.message);
    console.error(e);
  }finally{showLoading(false)}
}

function showPage(page){
  state.page=page;
  document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));
  document.getElementById("page-"+page).classList.remove("hidden");
  document.querySelectorAll(".nav button").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
  document.getElementById("pageTitle").textContent=page.charAt(0).toUpperCase()+page.slice(1);
  document.getElementById("sidebar").classList.remove("open");
  renderCurrentPage();
}
function renderCurrentPage(){
  if(state.page==="dashboard")renderDashboard();
  if(state.page==="orders")renderOrders();
  if(state.page==="customers")renderCustomers();
  if(state.page==="payments")renderPayments();
  if(state.page==="staff")renderStaff();
  if(state.page==="reports")renderReports();
  if(state.page==="settings")renderSettings();
}
function refreshCurrentPage(){loadAll()}

function renderDashboard(){
  const d=state.dashboard||{};
  document.getElementById("dTodayOrders").textContent=d.todayOrders||0;
  document.getElementById("dTodayRevenue").textContent=money(d.todayRevenue);
  document.getElementById("dPending").textContent=d.pending||0;
  document.getElementById("dProgress").textContent=d.inProgress||0;
  document.getElementById("dUnpaid").textContent=d.unpaidOrders||0;
  document.getElementById("dPaid").textContent=d.paidOrders||0;
  document.getElementById("dPartial").textContent=d.partialOrders||0;
  document.getElementById("dUnpaid2").textContent=d.unpaidOrders||0;
  document.getElementById("dTotalRevenue").textContent=money(d.totalRevenue);
  document.getElementById("dTotalPaid").textContent=money(d.totalPaid);
  document.getElementById("dTotalBalance").textContent=money(d.totalBalance);

  const months=d.monthlyRevenue||{};
  const keys=Object.keys(months).sort().slice(-8);
  const max=Math.max(1,...keys.map(k=>Number(months[k].revenue||0)));
  document.getElementById("revenueChart").innerHTML=keys.length?keys.map(k=>{
    const x=months[k],h=Math.max(3,(Number(x.revenue||0)/max)*180);
    return `<div class="bar-wrap"><div class="bar-value">${money(x.revenue||0).replace(" MMK","")}</div><div class="bar" style="height:${h}px"></div><div class="bar-label">${esc(k)}</div></div>`
  }).join(""):`<div class="empty" style="width:100%">No revenue data yet.</div>`;

  const recent=[...state.orders].sort((a,b)=>String(b.CreatedAt).localeCompare(String(a.CreatedAt))).slice(0,8);
  document.getElementById("recentOrders").innerHTML=recent.length?recent.map(o=>`
    <tr>
      <td><strong>${esc(o.JobCode)}</strong></td>
      <td>${esc(o.CustomerName)}<br><span class="muted">${esc(o.Phone)}</span></td>
      <td>${esc(o.ServiceName||"-")}</td>
      <td>${statusBadge(o.Status)}</td>
      <td>${paymentBadge(o.PaymentStatus)}</td>
      <td class="money">${money(o.Price)}</td>
      <td><button class="btn small" onclick="viewOrder('${esc(o.JobCode)}')">View</button></td>
    </tr>`).join(""):`<tr><td colspan="7" class="empty">No orders yet.</td></tr>`;
}

function updateStaffFilters(){
  const sel=document.getElementById("orderStaffFilter");
  const old=sel.value;
  sel.innerHTML='<option value="">All Staff</option>'+state.staff.filter(s=>String(s.Status).toLowerCase()!=="inactive").map(s=>`<option>${esc(s.StaffName)}</option>`).join("");
  sel.value=old;
  document.getElementById("fStaff").innerHTML='<option value="">Unassigned</option>'+state.staff.filter(s=>String(s.Status).toLowerCase()!=="inactive").map(s=>`<option>${esc(s.StaffName)}</option>`).join("");
}

function renderOrders(){
  let rows=[...state.orders];
  const q=(document.getElementById("orderSearch")?.value||"").toLowerCase().trim();
  const st=document.getElementById("orderStatusFilter")?.value||"";
  const ps=document.getElementById("orderPaymentFilter")?.value||"";
  const sf=document.getElementById("orderStaffFilter")?.value||"";
  rows=rows.filter(o=>{
    const hay=[o.JobCode,o.CustomerName,o.Phone,o.Address,o.ServiceType,o.ServiceName,o.Brand,o.Model,o.IMEI,o.SerialNumber,o.AssignedStaff].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(!st||o.Status===st)&&(!ps||o.PaymentStatus===ps)&&(!sf||o.AssignedStaff===sf);
  });
  rows.sort((a,b)=>String(b.CreatedAt).localeCompare(String(a.CreatedAt)));
  const total=rows.length;
  const pages=Math.max(1,Math.ceil(total/state.orderPerPage));
  state.orderPage=Math.min(state.orderPage,pages);
  const start=(state.orderPage-1)*state.orderPerPage;
  const pageRows=rows.slice(start,start+state.orderPerPage);
  document.getElementById("ordersBody").innerHTML=pageRows.length?pageRows.map(o=>`
    <tr>
      <td><strong>${esc(o.JobCode)}</strong><br><span class="muted">${dateText(o.CreatedAt)}</span></td>
      <td>${esc(o.CustomerName)}<br><span class="muted">${esc(o.Phone)}</span></td>
      <td>${esc(o.Brand||"")} ${esc(o.Model||"")}<br><span class="muted">${esc(o.IMEI||"")}</span></td>
      <td>${esc(o.ServiceName||"-")}</td>
      <td>${esc(o.AssignedStaff||"Unassigned")}</td>
      <td>${statusBadge(o.Status)}</td>
      <td class="money">${money(o.Price)}</td>
      <td class="money">${money(o.Paid)}</td>
      <td class="money">${money(o.Balance)}</td>
      <td><div style="display:flex;gap:5px"><button class="btn small" onclick="viewOrder('${esc(o.JobCode)}')">View</button><button class="btn small" onclick="editOrder('${esc(o.JobCode)}')">Edit</button><button class="btn small danger" onclick="deleteOrder('${esc(o.JobCode)}')">Delete</button></div></td>
    </tr>`).join(""):`<tr><td colspan="10" class="empty">No orders found.</td></tr>`;
  let p="";
  if(pages>1){
    p=`<button class="btn small" ${state.orderPage===1?"disabled":""} onclick="state.orderPage--;renderOrders()">‹</button><span class="muted">Page ${state.orderPage} / ${pages} · ${total} orders</span><button class="btn small" ${state.orderPage===pages?"disabled":""} onclick="state.orderPage++;renderOrders()">›</button>`;
  }else p=`<span class="muted">${total} order${total===1?"":"s"}</span>`;
  document.getElementById("ordersPagination").innerHTML=p;
}
function resetOrderFilters(){
  document.getElementById("orderSearch").value="";
  document.getElementById("orderStatusFilter").value="";
  document.getElementById("orderPaymentFilter").value="";
  document.getElementById("orderStaffFilter").value="";
  state.orderPage=1;renderOrders();
}

function renderCustomers(){
  const q=(document.getElementById("customerSearch")?.value||"").toLowerCase().trim();
  const rows=state.customers.filter(c=>!q||[c.CustomerName,c.Phone,c.Address].join(" ").toLowerCase().includes(q));
  document.getElementById("customersBody").innerHTML=rows.length?rows.map(c=>`
    <tr><td><strong>${esc(c.CustomerName)}</strong></td><td>${esc(c.Phone)}</td><td>${esc(c.Address||"-")}</td><td>${c.OrderCount}</td><td class="money">${money(c.TotalPrice)}</td><td class="money">${money(c.TotalPaid)}</td><td class="money">${money(c.Balance)}</td><td>${dateText(c.LastOrder)}</td><td><button class="btn small" onclick="customerHistory('${esc(c.Phone)}')">History</button></td></tr>
  `).join(""):`<tr><td colspan="9" class="empty">No customers found.</td></tr>`;
}

function renderPayments(){
  const q=(document.getElementById("paymentSearch")?.value||"").toLowerCase().trim();
  const ps=document.getElementById("paymentStatusFilter")?.value||"";
  const rows=state.payments.filter(o=>{
    const hay=[o.JobCode,o.CustomerName,o.Phone,o.ServiceName].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(!ps||o.PaymentStatus===ps);
  });
  const revenue=state.payments.reduce((a,o)=>a+Number(o.Price||0),0);
  const paid=state.payments.reduce((a,o)=>a+Number(o.Paid||0),0);
  document.getElementById("pRevenue").textContent=money(revenue);
  document.getElementById("pPaid").textContent=money(paid);
  document.getElementById("pBalance").textContent=money(revenue-paid);
  document.getElementById("paymentsBody").innerHTML=rows.length?rows.map(o=>`
    <tr><td><strong>${esc(o.JobCode)}</strong></td><td>${esc(o.CustomerName)}<br><span class="muted">${esc(o.Phone)}</span></td><td>${esc(o.ServiceName||"-")}</td><td class="money">${money(o.Price)}</td><td class="money">${money(o.Paid)}</td><td class="money">${money(o.Balance)}</td><td>${paymentBadge(o.PaymentStatus)}</td><td>${esc(o.PaymentMethod||"-")}</td><td><button class="btn small" onclick="editOrder('${esc(o.JobCode)}')">Update</button></td></tr>
  `).join(""):`<tr><td colspan="9" class="empty">No payment records.</td></tr>`;
}

function renderStaff(){
  const perf={};
  state.orders.forEach(o=>{
    const n=o.AssignedStaff||"Unassigned";
    if(!perf[n])perf[n]={orders:0,completed:0,revenue:0,paid:0};
    perf[n].orders++;perf[n].revenue+=Number(o.Price||0);perf[n].paid+=Number(o.Paid||0);
    if(o.Status==="Completed")perf[n].completed++;
  });
  document.getElementById("staffBody").innerHTML=state.staff.length?state.staff.map(s=>{
    const p=perf[s.StaffName]||{orders:0,completed:0,revenue:0,paid:0};
    return `<tr><td><strong>${esc(s.StaffName)}</strong></td><td>${esc(s.Phone||"-")}</td><td>${esc(s.Role||"-")}</td><td>${esc(s.Status||"-")}</td><td>${p.orders}</td><td>${p.completed}</td><td class="money">${money(p.revenue)}</td><td class="money">${money(p.paid)}</td><td><button class="btn small" onclick="editStaff('${esc(s.StaffID)}')">Edit</button> <button class="btn small danger" onclick="deleteStaff('${esc(s.StaffID)}')">Delete</button></td></tr>`
  }).join(""):`<tr><td colspan="9" class="empty">No staff.</td></tr>`;
}

function renderReports(){
  const r=state.reports||{};
  document.getElementById("monthlyReportBody").innerHTML=(r.monthly||[]).sort((a,b)=>String(b).localeCompare(String(a))).map(x=>`<tr><td>${esc(x.Month||x.month||"")}</td><td>${x.Orders||0}</td><td class="money">${money(x.Revenue)}</td><td class="money">${money(x.Paid)}</td></tr>`).join("")||`<tr><td colspan="4" class="empty">No data.</td></tr>`;
  document.getElementById("serviceReportBody").innerHTML=(r.service||[]).sort((a,b)=>Number(b.Revenue)-Number(a.Revenue)).map(x=>`<tr><td>${esc(x.ServiceName)}</td><td>${x.Orders||0}</td><td class="money">${money(x.Revenue)}</td><td class="money">${money(x.Paid)}</td></tr>`).join("")||`<tr><td colspan="4" class="empty">No data.</td></tr>`;
  document.getElementById("staffReportBody").innerHTML=(r.staff||[]).sort((a,b)=>Number(b.Revenue)-Number(a.Revenue)).map(x=>`<tr><td>${esc(x.StaffName)}</td><td>${x.Orders||0}</td><td class="money">${money(x.Revenue)}</td><td class="money">${money(x.Paid)}</td></tr>`).join("")||`<tr><td colspan="4" class="empty">No data.</td></tr>`;
}

function renderSettings(){
  const s=state.settings||{};
  document.getElementById("settingCompany").value=s.CompanyName||"";
  document.getElementById("settingCurrency").value=s.Currency||"MMK";
  document.getElementById("settingDefaultStatus").value=s.DefaultStatus||"New";
  document.getElementById("servicesBody").innerHTML=state.services.length?state.services.map(x=>`<tr><td>${esc(x.ServiceType)}</td><td>${esc(x.ServiceName)}</td><td class="money">${money(x.DefaultPrice)}</td><td>${esc(x.Status)}</td><td><button class="btn small" onclick="editService('${esc(x.ServiceID)}')">Edit</button> <button class="btn small danger" onclick="deleteService('${esc(x.ServiceID)}')">Delete</button></td></tr>`).join(""):`<tr><td colspan="5" class="empty">No services.</td></tr>`;
}

function openOrderModal(order=null){
  document.getElementById("orderForm").reset();
  document.getElementById("fRowID").value="";
  document.getElementById("fJobCode").value="";
  document.getElementById("orderModalTitle").textContent=order?"Edit Order":"New Order";
  populateServiceTypes();
  updateStaffFilters();
  document.getElementById("fStatus").value="New";
  calculateBalance();
  if(order) fillOrderForm(order);
  openModal("orderModal");
}
function populateServiceTypes(){
  const types=[...new Set(state.services.filter(s=>String(s.Status).toLowerCase()!=="inactive").map(s=>s.ServiceType).filter(Boolean))];
  document.getElementById("fServiceType").innerHTML='<option value="">Select Service Type</option>'+types.map(x=>`<option>${esc(x)}</option>`).join("");
  filterServiceNames();
}
function filterServiceNames(selected=""){
  const type=document.getElementById("fServiceType").value;
  const list=state.services.filter(s=>String(s.Status).toLowerCase()!=="inactive"&&(!type||s.ServiceType===type));
  document.getElementById("fServiceName").innerHTML='<option value="">Select Service</option>'+list.map(s=>`<option value="${esc(s.ServiceName)}" data-price="${Number(s.DefaultPrice||0)}">${esc(s.ServiceName)}</option>`).join("");
  if(selected)document.getElementById("fServiceName").value=selected;
}
function applyServicePrice(){
  const opt=document.getElementById("fServiceName").selectedOptions[0];
  if(opt&&Number(opt.dataset.price)>0&&!Number(document.getElementById("fPrice").value||0))document.getElementById("fPrice").value=opt.dataset.price;
  calculateBalance();
}
function calculateBalance(){
  const p=Number(document.getElementById("fPrice").value||0),paid=Number(document.getElementById("fPaid").value||0);
  document.getElementById("fBalance").value=Math.max(p-paid,0);
}
function fillOrderForm(o){
  document.getElementById("fRowID").value=o.RowID||"";
  document.getElementById("fJobCode").value=o.JobCode||"";
  document.getElementById("fCustomerName").value=o.CustomerName||"";
  document.getElementById("fPhone").value=o.Phone||"";
  document.getElementById("fAddress").value=o.Address||"";
  document.getElementById("fServiceType").value=o.ServiceType||"";
  filterServiceNames(o.ServiceName||"");
  document.getElementById("fBrand").value=o.Brand||"";
  document.getElementById("fModel").value=o.Model||"";
  document.getElementById("fIMEI").value=o.IMEI||"";
  document.getElementById("fSerial").value=o.SerialNumber||"";
  document.getElementById("fStatus").value=o.Status||"New";
  document.getElementById("fStaff").value=o.AssignedStaff||"";
  document.getElementById("fPrice").value=o.Price||0;
  document.getElementById("fPaid").value=o.Paid||0;
  document.getElementById("fPaymentMethod").value=o.PaymentMethod||"";
  document.getElementById("fCustomerNote").value=o.CustomerNote||"";
  document.getElementById("fInternalNote").value=o.InternalNote||"";
  document.getElementById("fVoucher").value=o.VoucherLink||"";
  calculateBalance();
}
function editOrder(job){
  const o=state.orders.find(x=>x.JobCode===job);if(o)openOrderModal(o);
}
function saveOrder(e){
  e.preventDefault();
  const payload={
    action:document.getElementById("fRowID").value?"updateOrder":"createOrder",
    rowId:document.getElementById("fRowID").value,
    jobCode:document.getElementById("fJobCode").value,
    customerName:document.getElementById("fCustomerName").value,
    phone:document.getElementById("fPhone").value,
    address:document.getElementById("fAddress").value,
    serviceType:document.getElementById("fServiceType").value,
    serviceName:document.getElementById("fServiceName").value,
    brand:document.getElementById("fBrand").value,
    model:document.getElementById("fModel").value,
    imei:document.getElementById("fIMEI").value,
    serialNumber:document.getElementById("fSerial").value,
    status:document.getElementById("fStatus").value,
    assignedStaff:document.getElementById("fStaff").value,
    price:Number(document.getElementById("fPrice").value||0),
    paid:Number(document.getElementById("fPaid").value||0),
    paymentMethod:document.getElementById("fPaymentMethod").value,
    customerNote:document.getElementById("fCustomerNote").value,
    internalNote:document.getElementById("fInternalNote").value,
    voucherLink:document.getElementById("fVoucher").value
  };
  closeModal("orderModal");
  postAndRefresh(payload,()=>showPage("orders"));
}
function deleteOrder(job){
  if(!confirm("Delete order "+job+"? This cannot be undone."))return;
  postAndRefresh({action:"deleteOrder",jobCode:job});
}
async function viewOrder(job){
  const o=state.orders.find(x=>x.JobCode===job);if(!o)return;
  let history=[];
  try{history=await apiGet("history",{jobCode:job})}catch(e){}
  document.getElementById("detailTitle").textContent=o.JobCode+" — Order Detail";
  document.getElementById("detailBody").innerHTML=`
    <div class="detail-grid">
      <div class="detail"><small>Customer</small><strong>${esc(o.CustomerName)}</strong></div>
      <div class="detail"><small>Phone</small><strong>${esc(o.Phone)}</strong></div>
      <div class="detail"><small>Status</small><strong>${statusBadge(o.Status)}</strong></div>
      <div class="detail"><small>Payment</small><strong>${paymentBadge(o.PaymentStatus)}</strong></div>
      <div class="detail"><small>Service</small><strong>${esc(o.ServiceName||"-")}</strong></div>
      <div class="detail"><small>Device</small><strong>${esc((o.Brand||"")+" "+(o.Model||""))}</strong></div>
      <div class="detail"><small>IMEI</small><strong>${esc(o.IMEI||"-")}</strong></div>
      <div class="detail"><small>Staff</small><strong>${esc(o.AssignedStaff||"Unassigned")}</strong></div>
      <div class="detail"><small>Price</small><strong>${money(o.Price)}</strong></div>
      <div class="detail"><small>Paid</small><strong>${money(o.Paid)}</strong></div>
      <div class="detail"><small>Balance</small><strong>${money(o.Balance)}</strong></div>
      <div class="detail"><small>Method</small><strong>${esc(o.PaymentMethod||"-")}</strong></div>
    </div>
    <div style="margin-top:18px"><strong>Address</strong><p class="muted">${esc(o.Address||"-")}</p></div>
    <div class="grid two">
      <div><strong>Customer Note</strong><p class="muted">${esc(o.CustomerNote||"-")}</p></div>
      <div><strong>Internal Note</strong><p class="muted">${esc(o.InternalNote||"-")}</p></div>
    </div>
    <hr style="border:0;border-top:1px solid var(--line);margin:20px 0">
    <strong>History</strong>
    <div class="timeline">${history.length?history.sort((a,b)=>String(b.CreatedAt).localeCompare(String(a.CreatedAt))).map(h=>`<div class="timeline-item"><strong>${esc(h.Action)}</strong><p>${esc(h.Note||"")}</p><time>${dateText(h.CreatedAt)} ·${esc(h.Staff||"System")}</time></div>`).join(""):`<p class="muted">No history yet.</p>`}</div>
  `;
  openModal("detailModal");
}
async function customerHistory(phone){
  const c=state.customers.find(x=>x.Phone===phone);
  const orders=state.orders.filter(o=>o.Phone===phone);
  document.getElementById("detailTitle").textContent=(c?.CustomerName||phone)+" — Order History";
  document.getElementById("detailBody").innerHTML=`<div class="detail-grid"><div class="detail"><small>Name</small><strong>${esc(c?.CustomerName||"-")}</strong></div><div class="detail"><small>Phone</small><strong>${esc(phone)}</strong></div><div class="detail"><small>Total Orders</small><strong>${orders.length}</strong></div><div class="detail"><small>Balance</small><strong>${money(c?.Balance||0)}</strong></div></div><div style="margin-top:18px" class="card table-wrap"><table class="table"><thead><tr><th>Job</th><th>Date</th><th>Service</th><th>Device</th><th>Status</th><th>Price</th></tr></thead><tbody>${orders.map(o=>`<tr><td><strong>${esc(o.JobCode)}</strong></td><td>${dateText(o.CreatedAt)}</td><td>${esc(o.ServiceName||"-")}</td><td>${esc((o.Brand\vert{}\vert{}"")+" "+(o.Model\vert{}\vert{}""))}</td><td>${statusBadge(o.Status)}</td><td class="money">${money(o.Price)}</td></tr>`).join("")||`<tr><td colspan="6" class="empty">No orders.</td></tr>`}</tbody></table></div>`;
  openModal("detailModal");
}

function openStaffModal(s=null){
  document.getElementById("staffId").value=s?.StaffID||"";
  document.getElementById("staffName").value=s?.StaffName||"";
  document.getElementById("staffPhone").value=s?.Phone||"";
  document.getElementById("staffRole").value=s?.Role||"Technician";
  document.getElementById("staffStatus").value=s?.Status||"Active";
  document.getElementById("staffModalTitle").textContent=s?"Edit Staff":"Add Staff";
  openModal("staffModal");
}
function editStaff(id){const s=state.staff.find(x=>x.StaffID===id);if(s)openStaffModal(s)}
function saveStaff(){
  const id=document.getElementById("staffId").value;
  const payload={action:id?"updateStaff":"addStaff",staffId:id,staffName:document.getElementById("staffName").value,phone:document.getElementById("staffPhone").value,role:document.getElementById("staffRole").value,status:document.getElementById("staffStatus").value};
  closeModal("staffModal");postAndRefresh(payload,()=>showPage("staff"));
}
function deleteStaff(id){
  if(!confirm("Delete this staff member?"))return;
  postAndRefresh({action:"deleteStaff",staffId:id});
}

function openServiceModal(s=null){
  document.getElementById("serviceId").value=s?.ServiceID||"";
  document.getElementById("serviceType").value=s?.ServiceType||"";
  document.getElementById("serviceName").value=s?.ServiceName||"";
  document.getElementById("servicePrice").value=s?.DefaultPrice||0;
  document.getElementById("serviceStatus").value=s?.Status||"Active";
  document.getElementById("serviceModalTitle").textContent=s?"Edit Service":"Add Service";
  openModal("serviceModal");
}
function editService(id){const s=state.services.find(x=>x.ServiceID===id);if(s)openServiceModal(s)}
function saveService(){
  const id=document.getElementById("serviceId").value;
  const payload={action:id?"updateService":"addService",serviceId:id,serviceType:document.getElementById("serviceType").value,serviceName:document.getElementById("serviceName").value,defaultPrice:Number(document.getElementById("servicePrice").value||0),status:document.getElementById("serviceStatus").value};
  closeModal("serviceModal");postAndRefresh(payload,()=>showPage("settings"));
}
function deleteService(id){
  if(!confirm("Delete this service?"))return;
  postAndRefresh({action:"deleteService",serviceId:id});
}
function saveSettings(){
  const list=[
    ["CompanyName",document.getElementById("settingCompany").value],
    ["Currency",document.getElementById("settingCurrency").value],
    ["DefaultStatus",document.getElementById("settingDefaultStatus").value]
  ];
  showLoading(true);
  Promise.all(list.map(([key,value])=>apiPost({action:"updateSettings",key,value}))).then(()=>{
    setTimeout(()=>loadAll(),800);toast("Settings saved");
  }).catch(e=>toast(e.message)).finally(()=>setTimeout(()=>showLoading(false),900));
}
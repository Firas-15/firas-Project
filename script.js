const products=[
{id:1,name:"هاتف Nova Pro",cat:"هواتف",price:2899,old:3199,emoji:"📱",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=520&q=58",badge:"الأكثر مبيعاً"},
{id:2,name:"سماعات Air Sound",cat:"صوتيات",price:499,old:599,emoji:"🎧",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=520&q=58",badge:"خصم 17%"},
{id:3,name:"ساعة Pulse الذكية",cat:"ساعات",price:699,old:799,emoji:"⌚",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=520&q=58",badge:"وصل حديثاً"},
{id:4,name:"شاحن سريع 65W",cat:"إكسسوارات",price:149,old:189,emoji:"🔌",image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=520&q=58",badge:"اختيار ذكي"},
{id:5,name:"هاتف Lite X",cat:"هواتف",price:1599,old:1799,emoji:"📲",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=520&q=58",badge:"قيمة رائعة"},
{id:6,name:"سماعة رأس Studio",cat:"صوتيات",price:379,old:449,emoji:"🎶",image:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=520&q=58",badge:"خصم 15%"},
{id:7,name:"ساعة Fit Active",cat:"ساعات",price:429,old:499,emoji:"⌚",badge:"جديد"},
{id:8,name:"باور بانك 20000",cat:"إكسسوارات",price:199,old:229,emoji:"🔋",image:"https://images.unsplash.com/photo-1609592424858-3c8b8d7b0f18?auto=format&fit=crop&w=520&q=58",badge:"عملي للسفر"}];
let filter="الكل",cart=[];
const $=id=>document.getElementById(id),grid=$("productsGrid"),search=$("search"),sort=$("sort");
const sar=n=>new Intl.NumberFormat("ar-SA").format(n)+" ر.س";
function render(){
 let list=products.filter(p=>(filter==="الكل"||p.cat===filter)&&p.name.includes(search.value.trim()));
 if(sort.value==="low")list.sort((a,b)=>a.price-b.price);if(sort.value==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map(p=>`<article class="card"><div class="visual"><span class="badge">${p.badge}</span><span>${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">`:p.emoji}</span></div><div class="info"><small>${p.cat}</small><h3>${p.name}</h3><div class="rating">★★★★★ <span style="color:#9aa">(${(4.6+((p.id%4)*.1)).toFixed(1)})</span></div><div class="bottom"><div class="price">${sar(p.price)} <span class="old">${sar(p.old)}</span></div><button class="add" data-add="${p.id}" aria-label="أضف للسلة">+</button></div></div></article>`).join("");
 $("empty").hidden=list.length>0;
}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2000)}
function renderCart(){
 $("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 $("cartItems").innerHTML=cart.length?cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div class="cart-emoji">${p.emoji}</div><div><b>${p.name}</b><small>${sar(p.price)}</small></div><div class="quantity"><button data-qty="${p.id}" data-delta="-1">−</button>${x.qty}<button data-qty="${p.id}" data-delta="1">+</button></div></div>`}).join(""):'<p>سلتك فارغة حالياً.</p>';
 $("total").textContent=sar(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));
}
function openCart(){$("drawer").classList.add("open");$("shade").classList.add("show")}
function closeCart(){$("drawer").classList.remove("open");$("shade").classList.remove("show")}
document.addEventListener("click",e=>{
 let a=e.target.closest("[data-add]");if(a){let id=+a.dataset.add,item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});renderCart();toast("تمت إضافة المنتج إلى السلة")}
 let q=e.target.closest("[data-qty]");if(q){let item=cart.find(x=>x.id===+q.dataset.qty);item.qty+=+q.dataset.delta;if(item.qty<=0)cart=cart.filter(x=>x!==item);renderCart()}
 let f=e.target.closest("[data-filter]");if(f){filter=f.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("selected",b===f));render()}
 let c=e.target.closest("[data-category]");if(c){filter=c.dataset.category;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("selected",b.dataset.filter===filter));render();$("products").scrollIntoView({behavior:"smooth"})}
});
search.addEventListener("input",render);sort.addEventListener("change",render);
$("cartOpen").onclick=openCart;$("cartClose").onclick=closeCart;$("shade").onclick=closeCart;
$("checkout").onclick=()=>toast(cart.length?"هذه نسخة تجريبية ولا تتوفر خدمة دفع فعلية.":"أضف منتجات إلى السلة أولاً");
$("menu").onclick=()=>$("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>$("nav").classList.remove("open"));
$("searchJump").onclick=()=>{$("products").scrollIntoView({behavior:"smooth"});search.focus()};
render();renderCart();

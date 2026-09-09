const cart=[], cartEl=document.getElementById('cart'), countEl=document.getElementById('cartCount'), itemsEl=document.getElementById('cartItems'), totalEl=document.getElementById('cartTotal'), toast=document.getElementById('toast');
const money=n=>n.toLocaleString('ru-RU')+' ₸';
function renderCart(){countEl.textContent=cart.length;if(!cart.length){itemsEl.innerHTML='<p class="empty">В корзине пока пусто.</p>';totalEl.textContent='0 ₸';return}itemsEl.innerHTML=cart.map((x,i)=>`<div class="cart-row"><span>${x.name}<br><small>${money(x.price)}</small></span><button onclick="removeItem(${i})">Удалить</button></div>`).join('');totalEl.textContent=money(cart.reduce((s,x)=>s+x.price,0));}
function removeItem(i){cart.splice(i,1);renderCart();showToast('Товар удалён');}
function showToast(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
document.querySelectorAll('.quick-add').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();cart.push({name:btn.dataset.product,price:+btn.dataset.price});renderCart();cartEl.classList.add('open');showToast('Товар добавлен в корзину')}));
document.getElementById('cartBtn').onclick=()=>cartEl.classList.add('open');
document.getElementById('closeCart').onclick=()=>cartEl.classList.remove('open');
document.getElementById('checkout').onclick=()=>showToast(cart.length?'Демо-заказ принят':'Сначала добавьте товар');
const modal=document.getElementById('searchModal'),input=document.getElementById('searchInput');
document.getElementById('searchBtn').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),100)};
document.getElementById('closeSearch').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
input.addEventListener('input',()=>document.getElementById('searchHint').textContent=input.value?`Ищем: «${input.value}»`:'Например: легинсы, костюм, куртка');
document.getElementById('menuBtn').onclick=()=>document.querySelector('.nav').classList.toggle('mobile-open');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>{let y=scrollY;document.querySelectorAll('main section[id]').forEach(s=>{if(y>=s.offsetTop-120){document.querySelectorAll('.nav a').forEach(a=>a.classList.remove('active'));let a=document.querySelector(`.nav a[href="#${s.id}"]`);if(a)a.classList.add('active')}})});
const screens = [...document.querySelectorAll(".screen")];

function go(index){
  if(index < 0 || index >= screens.length) return;
  screens[index].scrollIntoView({behavior:"smooth", block:"start"});
}

function restart(){
  window.scrollTo({top:0, behavior:"smooth"});
}

function revealMemory(){
  const msg = document.getElementById("memoryMessage");
  const heart = document.querySelector(".big-heart");
  msg.classList.toggle("show");
  heart.textContent = msg.classList.contains("show") ? "♥" : "♡";
}

/*
 EASY PHOTO EDITING:
 - Click “＋ Add your photos” on the Memories screen.
 - Select your photos in the exact order you want.
 - The selected photos automatically fill the cards.
 - The “That you love me sooo much, which I love it” line is already included.
*/

const photoInput = document.getElementById("photoInput");
const memoryGallery = document.getElementById("memoryGallery");

if (photoInput) {
  photoInput.addEventListener("change", (event) => {
    const files = [...event.target.files].filter(file => file.type.startsWith("image/")).slice(0, 6);
    const cards = [...memoryGallery.querySelectorAll(".memory-card")];
    cards.forEach((card, i) => {
      card.classList.add("empty");
      card.innerHTML = `<span>Photo ${i + 1}</span>`;
    });
    files.forEach((file, i) => {
      const url = URL.createObjectURL(file);
      const card = cards[i];
      card.classList.remove("empty");
      card.innerHTML = `<img src="${url}" alt="Memory ${i + 1}"><div class="caption">our little moment ❤️</div>`;
    });
  });
}

// Tiny floating hearts, matching the soft scrapbook feel.
setInterval(() => {
  const h = document.createElement("span");
  h.textContent = Math.random() > .5 ? "♡" : "♥";
  h.style.cssText = `
    position:fixed;
    left:${Math.random()*100}%;
    bottom:-20px;
    color:rgba(225,111,125,.35);
    font-size:${10+Math.random()*15}px;
    pointer-events:none;
    z-index:10;
    transition:transform 7s linear,opacity 7s linear;
  `;
  document.body.appendChild(h);
  requestAnimationFrame(() => {
    h.style.transform = `translateY(-110vh) rotate(${Math.random()*80-40}deg)`;
    h.style.opacity = "0";
  });
  setTimeout(()=>h.remove(),7200);
},900);

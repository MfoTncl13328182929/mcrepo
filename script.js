const tabs = document.querySelectorAll('.tab-content');
function showTab(id) {
    tabs.forEach(tab => tab.style.display='none');
    document.getElementById(id).style.display='grid';
}

// Tema toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', ()=>{
    document.body.classList.toggle('dark', themeToggle.checked);
});

// Kartları yükle
async function loadCards(folder) {
    try {
        const res = await fetch(`${folder}/data.json`);
        const items = await res.json();
        const container = document.getElementById(folder);
        container.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${folder}/${item.icon}" alt="${item.name}">
                <div class="info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="version">${item.version}</div>
                    <a class="download" href="${folder}/${item.file}" download>İndir</a>
                </div>
            `;
            container.appendChild(card);
        });
    } catch(err) {
        console.error(folder,'yüklenemedi', err);
    }
}

// Tüm sekmeleri yükle
['mods','resourcepacks','shaders','others'].forEach(loadCards);
showTab('mods');
['mods','resourcepacks','shaders','others'].forEach(loadCards);
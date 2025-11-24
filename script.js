const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("div input");
const searchButton = document.getElementById("botao-busca");
let allData = []; // Variável para armazenar todos os dados do JSON

async function iniciarBusca() {
    try {
        const resposta = await fetch("data.json");
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        allData = await resposta.json();
        renderizarCards(allData);
    } catch (error) {
        console.error("Não foi possível buscar os dados:", error);
    }
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = allData.filter(dado => {
        const nome = dado.nome ? dado.nome.toLowerCase() : '';
        const marca = dado.marca ? dado.marca.toLowerCase() : '';
        const design = dado.design ? dado.design.toLowerCase() : '';
        const mecanica = dado.mecanica ? dado.mecanica.toLowerCase() : '';
        const popularidade = dado.popularidade ? dado.popularidade.toLowerCase() : '';
        return nome.includes(searchTerm) || marca.includes(searchTerm) || design.includes(searchTerm) || mecanica.includes(searchTerm) || popularidade.includes(searchTerm);
    });
    renderizarCards(filteredData);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes

    if (dados.length === 0) {
        cardContainer.innerHTML = `<p class="no-results">Nenhum resultado encontrado para sua busca.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();

    for (let dado of dados){
        let article = document.createElement("article");
        // A classe do article já é adicionada pelo CSS, não precisa ser "card"
        // article.classList.add("card"); 
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Marca:</strong> ${dado.marca}</p>
            <p><strong>Design:</strong> ${dado.design}</p>
            <p><strong>Mecânica:</strong> ${dado.mecanica}</p>
            <p><strong>Popularidade:</strong> ${dado.popularidade}</p>
            <p><strong>Categoria:</strong> ${dado.categoria}</p>
            <p><strong>Produção:</strong> ${dado.produção}</p>
            <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Saiba mais na Wikipedia</a>
        `;
        fragment.appendChild(article);
    }
    cardContainer.appendChild(fragment);
}

if (cardContainer) {
    iniciarBusca();
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("input", handleSearch);
}
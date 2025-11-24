// Aguarda o carregamento completo do HTML antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona os elementos do HTML de forma segura usando IDs.
    const cardContainer = document.querySelector(".card-container");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const noResultsDiv = document.getElementById("no-results");
    let allCars = []; // Variável para armazenar todos os carros do JSON.

    // 2. Função para renderizar os cards na tela.
    function renderizarCards(carsToDisplay) {
        cardContainer.innerHTML = ""; // Limpa os cards existentes.
        noResultsDiv.style.display = 'none'; // Esconde a mensagem de "nenhum resultado".

        if (carsToDisplay.length === 0) {
            noResultsDiv.style.display = 'block'; // Mostra a mensagem se não houver carros.
            return;
        }

        carsToDisplay.forEach(car => {
            const article = document.createElement("article");
            // A classe "card" não existe no seu style.css, mas "car-card" ou "article" sim.
            // Vou usar a tag <article> que já é estilizada pelo seu CSS.
            article.innerHTML = `
                <h2>${car.nome}</h2>
                <p><strong>Marca:</strong> ${car.marca}</p>
                <p><strong>Design:</strong> ${car.design}</p>
                <p><strong>Mecânica:</strong> ${car.mecanica}</p>
                <p><strong>Popularidade:</strong> ${car.popularidade}</p>
                <p><strong>Categoria:</strong> ${car.categoria || 'N/A'}</p>
                <p><strong>Produção:</strong> ${car.produção || 'N/A'}</p>
                ${car.link ? `<a href="${car.link}" target="_blank" rel="noopener noreferrer">Saiba mais na Wikipedia</a>` : ''}
            `;
            cardContainer.appendChild(article);
        });
    }

    // 3. Função que executa a lógica de busca.
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        // Filtra a lista de carros (allCars) que já está na memória.
        const filteredCars = allCars.filter(car => {
            // Verifica se cada campo existe antes de tentar acessá-lo.
            const nome = car.nome ? car.nome.toLowerCase() : '';
            const marca = car.marca ? car.marca.toLowerCase() : '';
            const categoria = car.categoria ? car.categoria.toLowerCase() : '';
            const design = car.design ? car.design.toLowerCase() : '';
            const mecanica = car.mecanica ? car.mecanica.toLowerCase() : '';
            
            return nome.includes(query) ||
                   marca.includes(query) ||
                   categoria.includes(query) ||
                   design.includes(query) ||
                   mecanica.includes(query);
        });

        renderizarCards(filteredCars);
    }

    // 4. Carrega os dados do JSON uma única vez.
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allCars = data;
            renderizarCards(allCars); // Exibe todos os carros inicialmente.
        })
        .catch(error => {
            console.error("Falha ao buscar dados:", error);
            cardContainer.innerHTML = "<p>Erro ao carregar a base de conhecimento.</p>";
        });

    // 5. Adiciona os "escutadores de evento" para o botão e para a tecla Enter.
    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

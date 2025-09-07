let moodTextArea;
let searchButton;

document.addEventListener("DOMContentLoaded", () => {
    moodTextArea = document.getElementById("mood-textarea");
    console.log(moodTextArea);
    searchButton = document.getElementById("search-button");
    setupEventListeners();
});

function setupEventListeners() {
    
    moodTextArea.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSearch();
        }
    });
    searchButton.addEventListener("click", handleSearch);
}

async function handleSearch() {
    const mood = moodTextArea.value.trim();
    
    if (!mood) {
        alert("Preencha o campo de humor!");
        return;
    }

    const response = await fetch('https://rafae1.app.n8n.cloud/webhook/botflix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userPrompt: mood })
    });
        
    const data = await response.json();

    if (data && data.results.length > 0) {
            const movie = data.results[0]; 
            let posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            const resultsDiv = document.getElementById('results');
            const moviesGrid = document.getElementById('movies-grid');

            resultsDiv.classList.add("show")
            
            moviesGrid.innerHTML = `
                    <div class="movie-card">
                        <div class="movie-poster">
                            ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}">` : '<div class="no-poster">Sem imagem</div>'}
                        </div>
                        <div class="movie-info">
                            <h4 class="movie-title">${movie.title}</h4>
                            <p class="movie-overview">${movie.overview || 'Sem descrição disponível.'}</p>
                            <p class="movie-rating">⭐ ${movie.vote_average.toFixed(1)} / 10</p>
                        </div>
                    </div>
                `;
           }


}

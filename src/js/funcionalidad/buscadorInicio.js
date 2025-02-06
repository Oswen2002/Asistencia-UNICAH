function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");

// Al hacer clic en una sugerencia
searchInput.addEventListener("input", function () {
    const query = normalizarTexto(searchInput.value.trim());
    suggestionsList.innerHTML = "";

    if (query === "") {
        suggestionsList.style.display = "none";
        return;
    }

    const filteredSuggestions = SobreNosotros.filter(item => 
        normalizarTexto(item.pregunta).includes(query)
    );

    if (filteredSuggestions.length === 0) {
        suggestionsList.style.display = "none";
        return;
    }

    filteredSuggestions.forEach(suggestion => {
        const li = document.createElement("li");
        li.textContent = suggestion.pregunta;
        li.addEventListener("click", function () {
            const sectionId = suggestion.id; // Obtiene el id correspondiente
            window.location.href = `./vistas/Sobre Nosotros/sobreNosotros.html#${sectionId}`;
            
        });
        suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = "block";
});

// Resaltar la sección correspondiente al id en la URL
window.addEventListener('load', () => {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.backgroundColor = '#f0f0f0'; // Resalta la sección
            section.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la sección
        }
    }
});
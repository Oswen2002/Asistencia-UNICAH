// Función para normalizar el texto
function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para verificar si alguna palabra clave está contenida en el texto
function contienePalabraClave(texto, keywords) {
    return keywords.some(keyword => normalizarTexto(texto).includes(normalizarTexto(keyword)));
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

    const allSuggestions = [...SobreNosotros, ...GuiEstudiantil];  // Unimos ambos arreglos

    const filteredSuggestions = allSuggestions.filter(item => 
        contienePalabraClave(query, item.keywords)
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
            const page = suggestion.pagina; // Obtiene la página correspondiente
            
            // Definir los directorios de las páginas
            const pageDirectories = {
                "Sobre Nosotros": "./vistas/Sobre Nosotros/sobreNosotros.html",
                "Guia Estudiantil": "./vistas/Guia Estudiantil/guiaEstudiantil.html"
            };

            // Redirige a la página y sección correctas
            const pageUrl = pageDirectories[page] + `#${sectionId}`;
            window.location.href = pageUrl;
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
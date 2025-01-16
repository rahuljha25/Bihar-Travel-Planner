function scrollToSearch() {
    const searchSection = document.getElementById('search');
    const planTripBtn = document.querySelector('.plan-trip-btn');
    
    searchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add highlight animation to the Plan Trip button
    planTripBtn.classList.add('highlight-button');
    setTimeout(() => {
        planTripBtn.classList.remove('highlight-button');
    }, 2000);
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#search') {
            scrollToSearch();
        } else {
            const section = document.querySelector(targetId);
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add the attractions data
const attractions = [
    {
        id: 1,
        name: "Mahabodhi Temple",
        category: "temples",
        location: "Bodh Gaya",
        description: "UNESCO World Heritage Site, sacred Buddhist temple",
        image: "assets/images/mahabodhi-temple.jpg",
        fallbackImage: "assets/images/placeholder.jpg",
        popularity: 5,
        coordinates: { lat: 24.6959, lng: 84.9911 }
    },
    {
        id: 2,
        name: "Nalanda University Ruins",
        category: "heritage",
        location: "Nalanda",
        description: "Ancient center of learning, archaeological site",
        image: "assets/images/nalanda-ruins.jpg",
        fallbackImage: "assets/images/placeholder.jpg",
        popularity: 4,
        coordinates: { lat: 25.1381, lng: 85.4467 }
    },
    {
        id: 3,
        name: "Gol Ghar",
        category: "monuments",
        location: "Patna",
        description: "Historic granary building with panoramic views",
        image: "assets/images/gol-ghar.jpg",
        fallbackImage: "assets/images/placeholder.jpg",
        popularity: 4,
        coordinates: { lat: 25.6117, lng: 85.1385 }
    },
    {
        id: 4,
        name: "Takht Sri Patna Sahib",
        category: "temples",
        location: "Patna",
        description: "Sacred Sikh shrine, birthplace of Guru Gobind Singh",
        image: "assets/images/patna-sahib.jpg",
        fallbackImage: "assets/images/placeholder.jpg",
        popularity: 4,
        coordinates: { lat: 25.5941, lng: 85.2676 }
    },
    {
        id: 5,
        name: "Vikramshila Ruins",
        category: "heritage",
        location: "Bhagalpur",
        description: "Ancient Buddhist university ruins",
        image: "assets/images/vikramshila.jpg",
        fallbackImage: "assets/images/placeholder.jpg",
        popularity: 3,
        coordinates: { lat: 25.3200, lng: 87.2800 }
    }
];

// Initialize attractions when the document loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAttractions();
    setupScrollBehavior();
});

// Function to initialize attractions
function initializeAttractions() {
    const attractionsList = document.getElementById('attractions-list');
    if (!attractionsList) return;

    attractions.forEach(attraction => {
        const element = createAttractionElement(attraction);
        attractionsList.appendChild(element);
    });
}

// Function to create attraction element
function createAttractionElement(attraction) {
    const element = document.createElement('div');
    element.className = 'list-group-item';
    element.innerHTML = `
        <div class="attraction-card">
            <div class="image-rating-container">
                <div class="attraction-image">
                    <img src="${attraction.image}" 
                         alt="${attraction.name}" 
                         onerror="this.src='${attraction.fallbackImage}'">
                </div>
                <div class="rating">
                    ${'★'.repeat(attraction.popularity)}${'☆'.repeat(5-attraction.popularity)}
                </div>
            </div>
            <div class="attraction-details">
                <h5>${attraction.name}</h5>
                <p>${attraction.description}</p>
                <div class="attraction-meta">
                    <span class="location">
                        <i class="fas fa-map-marker-alt"></i> ${attraction.location}
                    </span>
                    <span class="category">${attraction.category}</span>
                </div>
            </div>
        </div>
    `;

    return element;
}

// Add smooth scrolling behavior
function setupScrollBehavior() {
    const attractionsList = document.getElementById('attractions-list');
    if (attractionsList) {
        attractionsList.style.scrollBehavior = 'smooth';
    }
}

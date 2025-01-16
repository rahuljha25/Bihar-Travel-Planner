// Attractions page functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeAttractions();
    initializeFilters();
    initializeAnimations();
});

function initializeAttractions() {
    const attractionsGrid = document.getElementById('attractions-grid');
    attractions.forEach(attraction => {
        const card = createAttractionCard(attraction);
        attractionsGrid.appendChild(card);
    });
}

function createAttractionCard(attraction) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
        <div class="attraction-card-large">
            <div class="image-container">
                <img src="${attraction.image}" 
                     alt="${attraction.name}" 
                     onerror="this.src='assets/images/placeholder.jpg'"
                     class="card-img-top">
                <div class="overlay">
                    <button class="btn btn-light btn-sm add-to-plan">
                        <i class="fas fa-plus"></i> Add to Plan
                    </button>
                </div>
            </div>
            <div class="rating-container">
                <div class="rating">
                    ${'★'.repeat(attraction.popularity)}${'☆'.repeat(5-attraction.popularity)}
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${attraction.name}</h5>
                <p class="card-text">${attraction.description}</p>
                <div class="meta-info">
                    <span class="location">
                        <i class="fas fa-map-marker-alt"></i> ${attraction.location}
                    </span>
                    <span class="category">
                        <i class="fas fa-tag"></i> ${attraction.category}
                    </span>
                </div>
            </div>
        </div>
    `;

    // Add hover animations
    const card = col.querySelector('.attraction-card-large');
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });

    // Add click handler for "Add to Plan" button
    const addButton = col.querySelector('.add-to-plan');
    addButton.addEventListener('click', (e) => {
        e.stopPropagation();
        addToPlan(attraction);
    });

    return col;
}

function initializeFilters() {
    const filterContainer = document.querySelector('.categories-filter');
    filterContainer.innerHTML = `
        <div class="btn-group">
            ${categories.map(category => `
                <button class="btn btn-outline-primary" data-category="${category.id}">
                    ${category.name}
                </button>
            `).join('')}
        </div>
    `;

    // Add filter functionality
    filterContainer.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const category = e.target.dataset.category;
            filterAttractions(category);
            
            // Update active state
            filterContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
}

function filterAttractions(category) {
    const cards = document.querySelectorAll('.attraction-card-large');
    cards.forEach(card => {
        const cardCategory = card.querySelector('.category').textContent.toLowerCase();
        const shouldShow = category === 'all' || cardCategory.includes(category);
        
        card.closest('.col-md-4').style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) {
            card.classList.add('fade-in');
        }
    });
}

function initializeAnimations() {
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.attraction-card-large').forEach(card => {
        observer.observe(card);
    });
}

function addToPlan(attraction) {
    // Animation for feedback
    const button = document.querySelector(`[data-id="${attraction.id}"] .add-to-plan`);
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.classList.add('added');
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-plus"></i> Add to Plan';
        button.classList.remove('added');
    }, 2000);

    // Save to localStorage
    const savedPlans = JSON.parse(localStorage.getItem('savedPlans') || '[]');
    savedPlans.push(attraction.id);
    localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
} 
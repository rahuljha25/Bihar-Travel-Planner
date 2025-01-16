// Map page functionality
let map, markers = [], directionsService, directionsRenderer;

document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    initializeControls();
    initializeLocationDetails();
});

function initializeMap() {
    // Initialize Google Maps
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: 25.0961, lng: 85.3131 }, // Bihar center
        zoom: 7,
        styles: mapStyles, // Custom map styles
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true // We'll use custom markers
    });

    // Add markers with animation
    attractions.forEach((attraction, index) => {
        setTimeout(() => {
            addMarkerWithAnimation(attraction);
        }, index * 200); // Stagger marker placement
    });
}

function addMarkerWithAnimation(attraction) {
    const marker = new google.maps.Marker({
        position: attraction.coordinates,
        map: map,
        title: attraction.name,
        icon: {
            url: attraction.image,
            scaledSize: new google.maps.Size(40, 40),
            shape: { type: 'circle' }
        },
        animation: google.maps.Animation.DROP
    });

    // Create info window with enhanced content
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <div class="info-image">
                    <img src="${attraction.image}" alt="${attraction.name}">
                </div>
                <div class="info-content">
                    <h5>${attraction.name}</h5>
                    <p>${attraction.description}</p>
                    <div class="info-meta">
                        <span class="location">
                            <i class="fas fa-map-marker-alt"></i> ${attraction.location}
                        </span>
                        <div class="rating">
                            ${'★'.repeat(attraction.popularity)}${'☆'.repeat(5-attraction.popularity)}
                        </div>
                    </div>
                    <button class="btn btn-sm btn-primary mt-2 add-to-plan">
                        Add to Itinerary
                    </button>
                </div>
            </div>
        `
    });

    // Add marker events
    marker.addListener('click', () => {
        // Close other info windows
        markers.forEach(m => m.infoWindow?.close());
        
        // Open this info window
        infoWindow.open(map, marker);
        
        // Animate marker
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 750);
        
        // Update location details panel
        updateLocationDetails(attraction);
        
        // Pan map smoothly
        map.panTo(marker.getPosition());
    });

    // Add hover effect
    marker.addListener('mouseover', () => {
        marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
        marker.setIcon({
            ...marker.getIcon(),
            scaledSize: new google.maps.Size(50, 50)
        });
    });

    marker.addListener('mouseout', () => {
        marker.setIcon({
            ...marker.getIcon(),
            scaledSize: new google.maps.Size(40, 40)
        });
    });

    marker.infoWindow = infoWindow;
    markers.push(marker);
}

function initializeControls() {
    // Category filter buttons
    document.querySelectorAll('.btn-group button').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.id.replace('show-', '');
            filterMarkers(category);
        });
    });
}

function filterMarkers(category) {
    markers.forEach((marker, index) => {
        const attraction = attractions[index];
        const shouldShow = category === 'all' || attraction.category === category;
        
        if (shouldShow) {
            marker.setMap(map);
            marker.setAnimation(google.maps.Animation.DROP);
        } else {
            marker.setMap(null);
        }
    });
}

function updateLocationDetails(attraction) {
    const detailsContainer = document.getElementById('location-details');
    detailsContainer.innerHTML = `
        <div class="location-card">
            <img src="${attraction.image}" alt="${attraction.name}" class="location-image">
            <div class="location-info">
                <h4>${attraction.name}</h4>
                <p>${attraction.description}</p>
                <div class="meta-info">
                    <span class="category">${attraction.category}</span>
                    <span class="rating">
                        ${'★'.repeat(attraction.popularity)}${'☆'.repeat(5-attraction.popularity)}
                    </span>
                </div>
                <div class="location-actions mt-3">
                    <button class="btn btn-primary btn-sm get-directions">
                        <i class="fas fa-directions"></i> Get Directions
                    </button>
                    <button class="btn btn-outline-primary btn-sm add-to-plan">
                        <i class="fas fa-plus"></i> Add to Plan
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for the buttons
    detailsContainer.querySelector('.get-directions').addEventListener('click', () => {
        showDirections(attraction.coordinates);
    });

    detailsContainer.querySelector('.add-to-plan').addEventListener('click', () => {
        addToPlan(attraction);
    });
}

function showDirections(destination) {
    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const request = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };

            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                }
            });
        });
    }
}

// Custom map styles
const mapStyles = [
    // Add your custom map styles here
    // This is just a sample
    {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#7c93a3" }]
    },
    // ... more style options
]; 
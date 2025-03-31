 Initialize the map and set its view to Syria's approximate center and zoom level
const map = L.map('map').setView([35.0, 38.0], 7);  Coordinates roughly central Syria, zoom level 7

 Add OpenStreetMap tile layer
 Other free tile providers httpsleaflet-extras.github.ioleaflet-providerspreview
L.tileLayer('https{s}.tile.openstreetmap.org{z}{x}{y}.png', {
    maxZoom 19,
    attribution '&copy; a href=httpwww.openstreetmap.orgcopyrightOpenStreetMapa contributors'
}).addTo(map);

 Define the path to your GeoJSON data file
const geoJsonPath = 'dataolive_locations.geojson';

 Function to create popup content from feature properties
function createPopupContent(feature) {
    let content = 'bOlive Tree Locationbbr';
    if (feature.properties.name) {
        content += `Name ${feature.properties.name}br`;
    }
    if (feature.properties.variety) {
        content += `Variety ${feature.properties.variety}br`;
    }
    if (feature.properties.estimated_age) {
        content += `Est. Age ${feature.properties.estimated_age} yearsbr`;
    }
     if (feature.properties.notes) {
        content += `Notes ${feature.properties.notes}`;
    }
    return content;
}

 Fetch the GeoJSON data and add it to the map
fetch(geoJsonPath)
    .then(response = {
        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        return response.json();  Parse the JSON from the response
    })
    .then(data = {
         Create a GeoJSON layer
        L.geoJSON(data, {
             Style points (optional, default Leaflet blue marker is used otherwise)
            pointToLayer function (feature, latlng) {
                 You could customize markers here, e.g., use custom icons
                 return L.marker(latlng);  Default marker
                 Example using a custom icon (requires icon setup)
                 return L.marker(latlng, { icon oliveIcon });
            },
             Function executed for each feature in the GeoJSON layer
            onEachFeature function (feature, layer) {
                 Check if the feature has properties
                if (feature.properties) {
                    const popupContent = createPopupContent(feature);
                     Bind a popup to the layer (marker)
                    layer.bindPopup(popupContent);
                }
            }
        }).addTo(map);  Add the GeoJSON layer to the map
    })
    .catch(error = {
        console.error('Error loading or processing GeoJSON', error);
         Optionally display an error message to the user on the page
        const mapDiv = document.getElementById('map');
        mapDiv.innerHTML = `p style=color red; text-align center;Failed to load map data. Please check the console for details.p`;
    });

 Optional Add a scale control
L.control.scale({ imperial false }).addTo(map);
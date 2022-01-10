// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  HIGH_RISK: new L.LayerGroup(),
  MEDIUM_RISK: new L.LayerGroup(),
  LOW_RISK: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [41.879605089914115, -87.62698620778097],  
  zoom: 15,
  layers: [
    layers.HIGH_RISK,
    layers.MEDIUM_RISK,
    layers.LOW_RISK
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "High Risk": layers.HIGH_RISK,
  "Medium Risk": layers.MEDIUM_RISK,
  "Low Risk": layers.LOW_RISK
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// // Initialize an object containing icons for each layer group
var icons = {
  HIGH_RISK: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  MEDIUM_RISK: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  LOW_RISK: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  })
};

// Load the data from the file
d3.csv("../Resources/inspections_downtown_rstr.csv").then(function(data) {
  
  console.log(data); 

  // Create an object to keep of the number of restaurants in each category
  var restaurantCount = {
    HIGH_RISK: 0,
    MEDIUM_RISK: 0,
    LOW_RISK: 0
  };

  // Initialize a variable to track the risk level of the current restaurant
  var riskLevel; 

  // Loop through all restaurants ... 
  data = data.slice(0, 999); // I added this to limit the number
  for (var i = 0; i < data.length; i++) {

    // ... get the current restaurant 
    var currentRestaurant = data[i]; 

    // ... determine its risk level
    if (currentRestaurant.Risk === "Risk 1 (High)") {
      riskLevel = "HIGH_RISK";
    }

    else if (currentRestaurant.Risk === "Risk 2 (Medium)") {
      riskLevel = "MEDIUM_RISK";
    }

    else if (currentRestaurant.Risk === "Risk 3 (Low)") {
      riskLevel = "LOW_RISK";
    }

    // ... increment the appropriate count
    restaurantCount[riskLevel]++; 

    // ... create a marker 
    var newMarker = L.marker([currentRestaurant.Latitude, currentRestaurant.Longitude], {
       icon: icons[riskLevel]
    }); 

    newMarker.bindPopup(currentRestaurant["DBA Name"]); 

    // ... and add it to the appropriate layer
    newMarker.addTo(layers[riskLevel]);    
  }

  console.log(restaurantCount); 

  // Call the updateLegend function, which will... update the legend!
  updateLegend(restaurantCount);
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(restaurantCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='coming-soon'>High Risk: " + restaurantCount.HIGH_RISK + "</p>",
    "<p class='empty'>Medium Risk: " + restaurantCount.MEDIUM_RISK + "</p>",
    "<p class='low'>Low Risk: " + restaurantCount.LOW_RISK + "</p>"
  ].join("");
}

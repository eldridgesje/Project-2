
// Get data from csv file information. Call createMarkers when complete

// added extra 1 dot !!!!!!!!!------I.Y
d3.csv("../Resources/updated_food_inspection.csv").then(createMarkers); 


function createMap(inspections) {


  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Inspections": inspections
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [41.94711774835235, -87.6553811622124],
    zoom: 12,
    layers: [lightmap, inspections]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  console.log(response);

  // // Pull the "Address" property off of response.data
  var newData = []
  var facilities = response
  for (var index = 0; index < 50; index++) {
    newData.push(response[index]);

  }
  var facilities = newData


  // console.log(facilities); 

  // Initialize an array to hold facility markers
  var facilityMarkers = [];


  // // Loop through the facilites array
  // for (var index = 0; index < facilities.length; index++) {
  //   var venue = facilities[index];

  facilities.forEach(element => {
    
    // console.log(element);
    var facilityMarker = L.marker([element.Latitude, element.Longitude])
      .bindPopup("<h3>" + element["DBA Name"] + "</h3><h3>Address:" + element.address + "</h3>");
    facilityMarkers.push(facilityMarker)
  });

    
  //   // For each venue, create a marker and bind a popup with the venue's name
  //   var facilityMarker = L.marker([venue.lat, venue.lon])
  //     .bindPopup("<h3>" + venue.DBA-Name + "<h3><h3>Address: " + venue.address + "</h3>");

  //   // Add the marker to the facilityMarkers array
    // facilityMarker.push(facilityMarker);
  // }

  // Create a layer group made from the facilities array, pass it into the createMap function
  createMap(L.layerGroup(facilityMarkers));

}
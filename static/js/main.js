console.log("main.js loaded");

var lightmap = null;

// Create event handlers
var searchButton = d3.select("#searchButton");
var resetButton = d3.select("#resetButton");

searchButton.on("click", updateTable);
resetButton.on("click", resetFilter);

//Establish URL for API


function buildURL() {
    // Select buttons on index.html
    var searchID = d3.select("#searchID");
    var searchName = d3.select("#searchName");
    console.log(searchName);
    var searchFacilityType = d3.select("#searchFacilityType");
    var searchRiskLevel = d3.select("#searchRiskLevel");
    var searchResults = d3.select("#searchResults");

    // find the data user searches
    checkID = searchID.property("value").trim();
    checkName = searchName.property("value").trim();
    console.log(checkName);
    checkFacilityType = searchFacilityType.property("value").trim();
    checkRiskLevel = searchRiskLevel.property("value").trim();
    checkResults = searchResults.property("value").trim();

    var inputID = "%";
    var inputName = "%";
    console.log(inputName);
    var inputFacilityType = "%";
    var inputRiskLevel = "%";
    var inputResults = "%";
     
    //Replace the data as needed
    if (checkID != "") {inputID = checkID}
        else {checkID = "%"};
    if (checkName != "") {inputName = checkName}
        else {checkName = "%"};
    console.log(checkName);
    if (checkFacilityType != "") {inputFacilityType = checkFacilityType}
        else {checkFacilityType = "%"};
    if (checkRiskLevel != "") {inputRiskLevel = checkRiskLevel}
        else {checkRiskLevel = "%"};
    if (checkResults != "") {inputResults = checkResults}
        else {checkResults = "%"};


    apiURL = `api/${inputID}/${inputName}/${inputFacilityType}/${inputRiskLevel}/${inputResults}`;
    console.log("Calling API");
    console.log(apiURL);

    return d3.json(apiURL);
    }

// Establish table reset function

function resetFilter() {
    document.getElementById("mainForm").reset();
    console.log(d3.select("#searchName").property("value").trim());

    updateTable();
};

// Establish start-up function

function startUp() {
    buildURL().then(function(startData) {
    console.log(startData);
    drawTable(startData);
    drawDonut(startData);
    drawMap(startData);
    console.log("startup");
    }
    )};

// Establish update function

function updateTable() {
    buildURL().then(function(updateData){
    var tbody = d3.select("tbody");
    // Delete the previously loaded table rows (if there were any)
    tbody.html("");

    drawTable(updateData);

    d3.select("#tooltip-canvas").remove();
    d3.select("#risk-pie").remove();

    d3.select("#donut").append("canvas").attr("id", "tooltip-canvas");
    d3.select("#donut").append("canvas").attr("id", "risk-pie");

    var testCanvas = d3.select("#tooltip-canvas");

    console.log(testCanvas);

    drawDonut(updateData);

    console.log("updated");
    
    layers.HIGH_RISK.clearLayers();
    layers.MEDIUM_RISK.clearLayers();
    layers.LOW_RISK.clearLayers();
    drawMap(updateData);
})
};

// Establish function to draw table

function drawTable(tableData) {
        // Get a reference to the table body
        var tbody = d3.select("tbody");

        tableData.forEach((inspectionReport) => {
            // Append a row to the table for each result.
            tbody.append("tr").html(`<td>${inspectionReport.address}</th>
            <td>${inspectionReport.dba_name}</th>
            <td>${inspectionReport.facility_type}</th>
            <td>${inspectionReport.inspection_date}</th>
            <td>${inspectionReport.inspection_id}</th>
            <td>${inspectionReport.inspection_type}</th>
            <td>${inspectionReport.location}</th>
            <td>${inspectionReport.results}</th>
            <td>${inspectionReport.risk}</th>
            <td>${inspectionReport.violations}</th>`)
            });
    };

// Draw starting table


// FUNCTION FOR THE PIE CHART


function drawDonut(donutData) {
        pass = 0;
        passCon = 0;
        outOfBusiness = 0;
        fail = 0;
        noEntry = 0;
        other = 0;

        donutData.forEach(function (item, index) {

            if (item["results"].toLowerCase() == "pass") {
                pass ++;
            }
            else if (item["results"].toLowerCase().includes("conditions")) {
                passCon ++;
            }
            else if (item["results"].toLowerCase().includes("out of business")) {
                outOfBusiness ++;
            }
            else if (item["results"].toLowerCase().includes("fail")) {
                fail ++;
            }
            else if (item["results"].toLowerCase().includes("no entry")) {
                noEntry ++;
            }
            else  {
                other ++;
            }

        }
        );

        const ctx = document.getElementById('risk-pie');
        const tooltipCanvas = document.getElementById("tooltip-canvas");

        function textInCenter(value, label) {
            var cenTxt = tooltipCanvas.getContext('2d');
            var laTxt = tooltipCanvas.getContext('2d');
            
            // Draw value
            cenTxt.fillStyle = '#000000';
            cenTxt.font = '48px sans-serif';
            cenTxt.textBaseline = 'middle';
        
            // Define text position
            var textPosition = {
            x: Math.round((tooltipCanvas.width - cenTxt.measureText(value).width) / 2),
            y: tooltipCanvas.height / 2,
            };
        
            cenTxt.fillText(value, textPosition.x, textPosition.y);
        
            // Draw Label
            laTxt.fillStyle = '#666666';
            laTxt.font = '36px sans-serif';
            laTxt.textBaseline = 'middle';
        
            // Define label position
            var labelPosition = {
            x: Math.round((tooltipCanvas.width - laTxt.measureText(label).width) / 2),
            y: (tooltipCanvas.height / 2)+35,
            };
        
            laTxt.fillText(label, labelPosition.x, labelPosition.y); 
        };
        
        Chart.defaults.font.size = 20;
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pass', 'Pass w/ Conditions', 'Fail', 'Out of Business', "No Entry", 'Other'],
                datasets: [{
                    label: '# of Inspections',
                    data: [pass, passCon, fail, outOfBusiness, noEntry, other],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                        'rgba(255, 159, 64, 0.4)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
        
        var value = (pass+passCon+fail+outOfBusiness+noEntry+other);
        var label = "Total Facilities"

        textInCenter(value, label);

        var testCanvas = d3.select("#tooltip-canvas");
        console.log(testCanvas);
}


//Map Stuff


// Create the tile layer that will be the background of our map
lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "streets-v11", //replaced "light-v10"
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
        markerColor: "yellow",
        shape: "star"
    }),
    MEDIUM_RISK: L.ExtraMarkers.icon({
        markerColor: "red",
        shape: "circle"
    }),
    LOW_RISK: L.ExtraMarkers.icon({
        markerColor: "blue-dark",
        shape: "penta"
    })
    };
    

function drawMap (data) {

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
        if (currentRestaurant.risk === "Risk 1 (High)") {
        riskLevel = "HIGH_RISK";
        }

        else if (currentRestaurant.risk === "Risk 2 (Medium)") {
        riskLevel = "MEDIUM_RISK";
        }

        else if (currentRestaurant.risk === "Risk 3 (Low)") {
        riskLevel = "LOW_RISK";
        }

        // ... increment the appropriate count
        restaurantCount[riskLevel]++; 

        // ... create a marker 
        var newMarker = L.marker([currentRestaurant.latitude, currentRestaurant.longitude], {
        icon: icons[riskLevel]
        }); 

        newMarker.bindPopup(`<b>${currentRestaurant.dba_name}</b> <br> ${currentRestaurant.address} <br> ${currentRestaurant.city}, ${currentRestaurant.state}  ${currentRestaurant.zip} <br> <b>Inspection ID: </b>${currentRestaurant.inspection_id}`); 

        // ... and add it to the appropriate layer
        newMarker.addTo(layers[riskLevel]);    
    }

    console.log(restaurantCount); 

    // Call the updateLegend function, which will... update the legend!
    updateLegend(restaurantCount);

    // Update the legend's innerHTML with the last updated time and station count
    function updateLegend(restaurantCount) {
    document.querySelector(".legend").innerHTML = [
        "<p class='high'>High Risk: " + restaurantCount.HIGH_RISK + "</p>",
        "<p class='medium'>Medium Risk: " + restaurantCount.MEDIUM_RISK + "</p>",
        "<p class='low'>Low Risk: " + restaurantCount.LOW_RISK + "</p>"
    ].join("");
    };


}




startUp()
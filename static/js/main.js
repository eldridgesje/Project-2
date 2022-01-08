console.log("main.js loaded");
console.log(data);
// Get the data from data.js

var tableData = "";

// Get a reference to the table body
var tbody = d3.select("tbody");

// to create HTML table 
tableData.forEach((inspectionReport) => {
    console.log(inspectionReport);
    var row = tbody.append("tr");

    Object.entries(inspectionReport).forEach(([key, value]) => {
        console.log(`key = ${key}, value = ${value}`);
        var cell = row.append("td").text(value);
    });
});

// Select buttons 
var searchID = d3.select("#searchID");
var searchName = d3.select("#searchName");
var searchFacilityType = d3.select("#searchFacilityType");
var searchRiskLevel = d3.select("#searchRiskLevel");
var searchViolations = d3.select("#searchViolations");
var searchResults = d3.select("#searchResults");


var searchButton = d3.select("#searchButton");

// Create event handlers
searchButton.on("click", runEnter);

function runEnter() {
    // Setup: Prevent the page from refreshing on events
    d3.event.preventDefault();
    // Delete the previously loaded table rows (if there were any)
    tbody.html("");


    // find the data user searches
    var inputID = searchID.property("value").trim();
    var inputName = searchName.property("value").toLowerCase().trim();
    var inputFaciltyType = searchFacilityType.property("value").toLowerCase().trim();
    var inputRiskLevel = searchRiskLevel.property("value").toLowerCase().trim();
    var inputViolations= searchViolations.property("value").toLowerCase().trim();
    var inputResults = searchResults.property("value").toLowerCase().trim();

    console.log(inputID);
    console.log(inputName);
    console.log(inputFaciltyType);
    console.log(inputRiskLevel);
    console.log(inputViolations);
    console.log(inputResults);



    var filteredData = tableData.filter(tableData => (tableData.inspection_id == inputID || inputID == "") &&
                  (tableData.dba_name == inputName || inputName == "") &&
                  (tableData.facility_type == inputFacilityType|| inputFacilityType == "") &&
                  (tableData.risk == inputRiskLevel || inputRiskLevel == "") &&
                  (tableData.violations == inputViolations || inputViolations == "")
    );
   

    filteredData.forEach((inspectionReport) => {
        // Append a row to the table for each result.
        var row = tbody.append("tr");
        // Append the values of each of the objects in the result as the created rows' content.
        Object.entries(inspectionReport).forEach(([key, value]) => {
           var cell = row.append("td");
           cell.text(value);
           });
        });
    }
 
    


    document.getElementById("resetButton").onclick = function() {
    document.getElementById("searchID").innerHTML = "";
    document.getElementById("searchName").innerHTML = "";
    document.getElementById("searchFacilityType").innerHTML = "";
    document.getElementById("searchRiskLevel").innerHTML = "";
    document.getElementById("searchViolations").innerHTML = "";
    document.getElementById("searchResults").innerHTML = "";


    

    tableData.forEach((inspectionReport) => {
    // Append a row to the table for each result.
    var row = tbody.append("tr");
    // Append the values of each of the objects in the result as the created rows' content.
    Object.entries(inspectionReport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
       });
    });
};



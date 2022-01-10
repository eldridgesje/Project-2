// FUNCTION FOR THE PIE CHART

url = "/api/%/%/%/%/fail/%"

d3.json(url).then(function(piejson) {
    restaurant = 0;
    childServices = 0;
    daycare = 0;
    grocery = 0;
    school = 0;
    other = 0;

    piejson.forEach(function (item, index) {

        if (item["facility_type"].toLowerCase().includes("restaurant")) {
            restaurant ++;
        }
        else if (item["facility_type"].toLowerCase().includes("children's services")) {
            childServices ++;
        }
        else if (item["facility_type"].toLowerCase().includes("daycare")) {
            daycare ++;
        }
        else if (item["facility_type"].toLowerCase().includes("grocery")) {
            grocery ++;
        }
        else if (item["facility_type"].toLowerCase().includes("school")) {
            school ++;
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
      

    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Restaurants', 'Schools', 'Grocery Stores', 'Daycare', "Children's Services", 'Other'],
            datasets: [{
                label: '# of Inspections',
                data: [restaurant, school, grocery, daycare, childServices, other],
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
    
    var value = (restaurant+childServices+daycare+grocery+school+other);
    var label = "Total"

    textInCenter(value, label);
});


// FUNCTION FOR UPDATING BASED ON USER SELECTION

// function optionChanged(id) {
//     pieChart(id)


// FUNCTION FOR THE PIE CHART
url = "/api/%/%/%/%/fail/%"

d3.json(url).then(function(piejson) {
    restaurant = 0;
    childServices = 0;
    daycare = 0;
    grocery = 0;
    school = 0;
    other = 0;

    console.log(piejson)

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

    console.log(restaurant);
    console.log(childServices);
    console.log(daycare);
    console.log(grocery);
    console.log(school);
    console.log(other);

    const ctx = document.getElementById('risk-pie');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Restaurants', 'Schools', 'Grocery Stores', 'Daycare', "Children's Services", 'Other'],
            datasets: [{
                label: '# of Inspections',
                data: [restaurant, school, grocery, daycare, childServices, other],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
});

// FUNCTION FOR UPDATING BASED ON USER SELECTION

// function optionChanged(id) {
//     pieChart(id)


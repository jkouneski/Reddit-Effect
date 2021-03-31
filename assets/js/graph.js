var apiUrl = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&symbol=BTC&data_points=20&interval=day"
var priceArray = [];
var labelsArray = [];

//Fetch call the API to get price data
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (da) {
        for (var i = 0; i < da.data[0].timeSeries.length; i++) {
            var objTemp = da.data[0].timeSeries[i];
            var numTemp = objTemp.close;
            priceArray.push(numTemp);
        }
        console.log(da.data[0]);
        createChart();
    });


//Create and edit chart object
function createChart() {
    var ctx = document.getElementById('myChart');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: priceArray,
            datasets: [{
                label: 'Price per Day',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: priceArray
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: Math.max(...priceArray)+50,
                        min: Math.min(...priceArray)-50,
                        stepSize: .5
                    }
                }]
            }
        }
    });
}


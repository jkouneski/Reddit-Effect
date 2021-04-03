var apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&symbol=BTC&data_points=30&interval=day"
var priceArray = [];
var redditPostsArray = [];
var labelsArray = [];
var numDays = 30;
var startDay, endDay, chart;
var coin = 'BTC';

//Store html elements into variables
var fiveDayBtn = document.getElementById('5day');
var thirtyDayBtn = document.getElementById('30day');
var ninetyDayBtn = document.getElementById('90day');
var oneYearBtn = document.getElementById('365day');
var startText = document.getElementById('startDateInput');
var endText = document.getElementById('endDateInput');
var submitBtn = document.getElementById('submitBtn')
var changeCoinBtn = document.getElementById('change-coin');
var selectCoin = document.getElementById('coin-selector');

//Add onclick function to the change coin button
changeCoinBtn.onclick = function() {
    switch (selectCoin.value) {
        case 'bitcoin':
            coin = 'BTC';
            break;
        case 'litecoin':
            coin = 'LTC';
            break;
        case 'dogecoin':
            coin = 'DOGE';
            break;
        case 'ethereum':
            coin = 'ETH';
            break;
        default:
            coin = 'ADA';
    }
    apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&data_points=" + numDays + "&interval=day&symbol=" + coin;
    chart.destroy();
    redditPostsArray = [];
    priceArray = [];
    labelsArray = [];
    getData();
}

//Add onclick functions to each button that changes the number of days
fiveDayBtn.onclick = function() {
    numDays = 5;
    apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&data_points=5&interval=day&symbol=" + coin;
    chart.destroy();
    redditPostsArray = [];
    priceArray = [];
    labelsArray = [];
    getData();
}
thirtyDayBtn.onclick = function() {
    numDays = 30;
    apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&data_points=30&interval=day&symbol=" + coin;
    chart.destroy();
    redditPostsArray = [];
    priceArray = [];
    labelsArray = [];
    getData();
}
ninetyDayBtn.onclick = function() {
    numDays = 90;
    apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&data_points=90&interval=day&symbol=" + coin;
    chart.destroy();
    redditPostsArray = [];
    priceArray = [];
    labelsArray = [];
    getData();
}
oneYearBtn.onclick = function() {
    numDays = 365;
    apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&data_points=365&interval=day&symbol=" + coin;
    chart.destroy();
    redditPostsArray = [];
    priceArray = [];
    labelsArray = [];
    getData();
}
submitBtn.onclick = function() {
    startDay = moment(startText.value, "M-D-YYYY").format("X");
    endDay = moment(endText.value, "M-D-YYYY").format("X");
    var dataPoints = (moment.unix(endDay) - moment.unix(startDay)) / 86400;
    apiUrlCrypto = "https://api.lunarcrush.com/v2?data=assets&key=oaaa04joylg6nojvrsywq&symbol=BTC&interval=day&start=" + startDay +
        "&end=" + endDay + "&data_points=" + dataPoints;
    chart.destroy();
    redditPostsArray = [];
    priceArray = [];
    labelsArray = [];
    getData();
}

//Fetch call the API to get price data
function getData() {
    fetch(apiUrlCrypto)
        .then(function(response) {
            return response.json();
        })
        .then(function(da) {
            for (var i = 0; i < da.data[0].timeSeries.length; i++) {
                var objTemp = da.data[0].timeSeries[i];
                var numTemp = objTemp.close;
                var redNum = objTemp.reddit_posts;
                var timeTemp = objTemp.time;
                priceArray.push(numTemp);
                redditPostsArray.push(redNum);
                labelsArray.push(moment.unix(timeTemp).format("MMMM Do"));
            }
            createChart();
        });
}

//Create and edit chart object
function createChart() {
    var ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labelsArray,
            datasets: [{
                yAxisId: 'A',
                label: coin + ' price per day',
                backgroundColor: 'rgb(255, 5, 200)',
                borderColor: 'rgb(255, 99, 132)',
                data: priceArray,
                fill: false
            }, {
                yAxisID: 'B',
                label: 'Reddit posts per day',
                backgroundColor: 'rgb(255,255,0)',
                borderColor: 'rgb(255,200,0)',
                data: redditPostsArray,
                fill: false
            }],
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        max: Math.max(...priceArray),
                        min: Math.min(...priceArray)
                    }
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        max: Math.max(...redditPostsArray),
                        min: Math.min(...redditPostsArray)
                    }
                }]
            }
        }
    });
}

getData();
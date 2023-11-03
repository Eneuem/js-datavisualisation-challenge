import Chart from 'chart.js/auto';

// Votre code JavaScript qui utilise Chart.js


//////////////////////////
/// COLOR GENERATOR    ///
//////////////////////////

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},1)`;
}

  ////////////////////////////
 /////      TAB 1+2  ////////
////////////////////////////

function generateChartFromTable(tableId, chartType) {
    let table = document.getElementById(tableId);
    let rows = table.querySelectorAll('tbody tr');
    let data = [];
    
    rows.forEach((row) => {
        let cells = row.querySelectorAll('th, td');
    
        let countryData = {
            number: cells[0].textContent,
            country: cells[1].textContent,
            offences: {}
        };
        
        for (let i = 2; i < cells.length; i++) {
            let year = 2002 + i - 2;
            countryData.offences[year] = parseFloat(cells[i].textContent.replace(',', '.'));
        }
    
        data.push(countryData);
    });
    
    console.log(data);
    data = data.filter(country => country.country.trim() !== "");

    let chartData = {
        labels: [],
        datasets: []
    };
    
    data.forEach(country => {
        let dataset = {
            label: country.country,
            data: Object.values(country.offences),
            borderColor: getRandomColor(),
            fill: false
        };

        if (chartType === 'bar') {
            dataset.backgroundColor = getRandomColor();
        } else if (chartType === 'line') {
            dataset.backgroundColor = 'transparent';
        }
    
        chartData.datasets.push(dataset);
    });
     
    chartData.labels = Object.keys(data[0].offences);
    

    let canvasElem = document.createElement('canvas');
    canvasElem.id = 'myChart-' + tableId; 

    table.parentNode.insertBefore(canvasElem, table);

    let ctx = canvasElem.getContext('2d');
    let myChart = new Chart(ctx, {
        type: chartType,  
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
                }
                
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    generateChartFromTable('table1', 'line');
    generateChartFromTable('table2', 'bar');
});

  ////////////////////////////
 ///// AJAX + JSON //////////
////////////////////////////

window.onload = function() {
    // Configuration initiale du graphique
    let config = {
        type: 'line',
        data: {
            datasets: [{
                label: 'Live Data',
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                data: []
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            },
            title: {
                display: true,
                text: "Live Chart with dataPoints from External JSON"
            }
        }
    };

    // Création de l'instance du graphique
    let context = document.getElementById('monGraphique').getContext('2d');
    let myChart = new Chart(context, config);

    // Fonction pour mettre à jour le graphique
    function updateChart() {
        let lastDataPoint = config.data.datasets[0].data[config.data.datasets[0].data.length - 1];
        let xValue = lastDataPoint ? lastDataPoint.x + 1 : 1;
        let yValue = lastDataPoint ? lastDataPoint.y : 10;
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + xValue + "&ystart=" + yValue + "&length=1&type=json", function(data) {
            $.each(data, function(key, value) {
                config.data.datasets[0].data.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
            });
            myChart.update();
            setTimeout(updateChart, 1000);
        });
    }

    // Récupération des premiers points de données et initialisation du graphique
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function(data) {
        $.each(data, function(key, value){
            config.data.datasets[0].data.push({x: value[0], y: parseInt(value[1])});
        });
        myChart.update();
        updateChart();
    });
};


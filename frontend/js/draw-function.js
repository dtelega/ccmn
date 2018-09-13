// Load the Visualization API and the corechart package.

google.charts.load('current', {'packages':['corechart', 'bar']});

// Set a callback to run when the Google Visualization API is loaded.

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

// active user count
function drawChartTotalUsers(data) {
    console.log(data);
    // Create the data table.
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Floor');
    chartData.addColumn('number', 'UserCount');
    $(data.data).each(
        function (idx, floorInfo) {
            if (floorInfo.floorName.indexOf('Floor') !== - 1) {
                //console.log(floorInfo);
                chartData.addRow([floorInfo.floorName, floorInfo.value]);
            }
        }
    );

    // Set chart options
    var options = {
        'title': 'Total active user count = '+ data.total.total,
        'width': 1200,
        'height': 700
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}

// correlation
function drawHourlyGraph(data, type) {
    console.log(data);

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('timeofday', 'Time of Day');
    if (type === "hourly/today")
        chartData.addColumn('number', 'Today');
    else if (type === "hourly/yesterday")
        chartData.addColumn('number', 'Yesterday');
    else if (type === "hourly") {
        chartData.addColumn('number', $("#dravHourlyDate").val()+'');
    }
    else if (type === "hourly/3days") { // TODO: make multichart great again
        chartData.addColumn('number', '1');
        chartData.addColumn('number', '2');
        chartData.addColumn('number', '3');
    }

    for (var i = 0; i < 25; i++) {
        chartData.addRow(
            [{v: [i, 0, 0], f: i+""}, data[i]]
        );
    }


    var options = {
        title: 'Title',
        isStacked: true,
        hAxis: {
            title: 'Time of Day',
            format: 'h:mm a',
            viewWindow: {
                min: [0, 0, 0],
                max: [24, 0, 0]
            }
        },
        vAxis: {
            title: 'Count of connected visitors',
            'height': 700,
            'width' : 3000
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    chart.draw(chartData, options);

}


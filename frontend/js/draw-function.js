// Load the Visualization API and the corechart package.

google.charts.load('current', {'packages':['corechart', 'bar']});

// Set a callback to run when the Google Visualization API is loaded.

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

// active user count
function drawChartTotalUsers(data) {
    // console.log(data);
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
        'height': 700,
        pieSliceText: 'label'
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}

// analitic and presence
function drawPresence(data, path, title, first, sec, third, fourth, fifth) {
    // console.log(data);

    // Create the data table.
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'text1');
    chartData.addColumn('number', 'number1');


    chartData.addRow([first, data[first]]);
    chartData.addRow([sec, data[sec]]);
    chartData.addRow([third, data[third]]);
    chartData.addRow([fourth, data[fourth]]);
    chartData.addRow([fifth, data[fifth]]);


    // Set chart options
    var options = {
        'title': title,
        'width': 1200,
        'height': 600
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(path));
    chart.draw(chartData, options);
}

// correlation
function drawHourlyGraph(data, type, path) {
    // console.log(data);

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('timeofday', 'Time of Day');

    if (type === "hourly") {
        chartData.addColumn('number', $("#dravHourlyDate").val()+'');
    }
    else if (type === "hourly/3days") { // TODO: make multichart great again
        chartData.addColumn('number', '1');
        chartData.addColumn('number', '2');
        chartData.addColumn('number', '3');
    } else
        chartData.addColumn('number', type);

    for (var i = 0; i < 25; i++) {
        chartData.addRow(
            [{v: [i, 0, 0], f: i+""}, data[i]]
        );
    }


    var options = {
        title: type,
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
            title: 'Count of visitors',
            'height': 700,
            'width' : 3000
        }
    };


    var chart = new google.visualization.ColumnChart(document.getElementById(path));
    chart.draw(chartData, options);

}

function drawHorlyGraphDwell(data, path, type, first, sec, third, fourth, fifth) {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('timeofday', 'Time of Day');
    chartData.addColumn('number', first);
    chartData.addColumn('number', sec);
    chartData.addColumn('number', third);
    chartData.addColumn('number', fourth);
    chartData.addColumn('number', fifth);
    
    for (var i = 0; i < 24; i++) {

        if (typeof(data[i]) === 'undefined')
            break;
        chartData.addRow(
            [{v: [i, 0, 0], f: i+""},
                data[i][first],
                data[i][sec],
                data[i][third],
                data[i][fourth],
                data[i][fifth]
        ]);
    }


    var options = {
        title: type,
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
            title: 'Count visitors',
            'height': 700,
            'width' : 3000
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById(path));
    chart.draw(chartData, options);
}

function drawHorlyThreeDays(data, type) {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('timeofday', 'Time of Day');
    keys = [];
    $.each(data, function(key){
        chartData.addColumn('number', key);
        keys.push(key);
    });

    // console.log(keys);
    for (var i = 0; i < 24; i++) {
        chartData.addRow(
            [{v: [i, 0, 0], f: i+""},
                data[keys[0]][i],
                data[keys[1]][i],
                data[keys[2]][i]
            ]);
    }

    var options = {
        title: type,
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
            title: 'Count visitors',
            'height': 700,
            'width' : 3000
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    chart.draw(chartData, options);
}

function drawHorlyGraphDwellThreeDays(data, type, first, sec, third, fourth, fifth) {
    // TODO
}

function drawDaily(data, type, path) {

        var chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Time of Day');

        // console.log("type = " + type);
        if (type === 'dwell/' || type === 'repeatvisitors/'){

            $.each(data, function (key) {
                // chartData.addRow([key, data[key]]);
                // console.log(data[key]);
                $.each(data[key], function (k) {
                    chartData.addColumn('number', k);
                    // console.log(k);
                });
                return false;
            });
            if (type === 'dwell/') {
                $.each(data, function (key) {
                    chartData.addRow([key, data[key].FIVE_TO_THIRTY_MINUTES,
                        data[key].THIRTY_TO_SIXTY_MINUTES,
                        data[key].ONE_TO_FIVE_HOURS,
                        data[key].FIVE_TO_EIGHT_HOURS,
                        data[key].EIGHT_PLUS_HOURS
                    ]);
                });
            } else {
                $.each(data, function (key) {
                    chartData.addRow([key,
                        data[key].FIRST_TIME,
                        data[key].YESTERDAY,
                        data[key].DAILY,
                        data[key].WEEKLY,
                        data[key].OCCASIONAL
                    ]);
                });
            }
        } else {
            chartData.addColumn('number', 'Rating');
            $.each(data, function (key) {
                chartData.addRow([key, data[key]]);
            });
        }


        var options = {
            title: 'Count for specified date range ',
            width: 1500,
            height: 700,
            hAxis: {
                format: 'yy/m/d',
                gridlines: {count: 15}
            },
            vAxis: {
                gridlines: {color: 'none'},
                minValue: 0
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById(path));

        chart.draw(chartData, options);




}

// averageDwellByLevels KPI
function drawTotalKpi(data, title) {

    // Create the data table.
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Floor');
    chartData.addColumn('number', 'UserCount');

    chartData.addRow(['FIVE_TO_THIRTY_MINUTES', data.averageDwellByLevels.FIVE_TO_THIRTY_MINUTES[title]]);
    chartData.addRow(['THIRTY_TO_SIXTY_MINUTES', data.averageDwellByLevels.THIRTY_TO_SIXTY_MINUTES[title]]);
    chartData.addRow(['ONE_TO_FIVE_HOURS', data.averageDwellByLevels.ONE_TO_FIVE_HOURS[title]]);
    chartData.addRow(['FIVE_TO_EIGHT_HOURS', data.averageDwellByLevels.FIVE_TO_EIGHT_HOURS[title]]);
    chartData.addRow(['EIGHT_PLUS_HOURS', data.averageDwellByLevels.EIGHT_PLUS_HOURS[title]]);


    // Set chart options
    var options = {
        'title': title,
        'width': 800,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div_kpi_'+title));
    chart.draw(chartData, options);
}

// total manufact kpi
function drawTotalManufact(data) {
    // Create the data table.
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Manufacturers');
    chartData.addColumn('number', 'count');

    // console.log(data.topManufacturers.manufacturerCounts);

    $.each(data.topManufacturers.manufacturerCounts, function(key){
        // console.log(key, data.topManufacturers.manufacturerCounts[key]);
        chartData.addRow([key, data.topManufacturers.manufacturerCounts[key]]);
    });

    // Set chart options
    var options = {
        'title': 'Total manufacturer',
        'width': 1200,
        'height': 700,
        pieSliceText: 'label'
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div_kpi_manufact'));
    chart.draw(chartData, options);
}
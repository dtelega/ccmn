// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Floor');
    data.addColumn('number', 'UserCount');
    data.addRows([
        ['1st Floor', 3],
        ['2st Floor', 1],
        ['3st Floor', 1]
    ]);

    // Set chart options
    var options = {
        'title': 'Active user count',
        'width': 600,
        'height': 350
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
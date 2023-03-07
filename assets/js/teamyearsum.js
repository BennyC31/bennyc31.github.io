const sum_data_url = 'https://raw.githubusercontent.com/BennyC31/bennyc31.github.io/main/Resources/git_data.json'
let data = []
function bubbleChart() {
    let stats = data;
    let teams = []
    let pfs = []
    let pas = []
    for (var i = 0; i < stats.length; i++) {
        teams.push(stats[i]['team_name']);
        pfs.push(stats[i]['pf']);
        pas.push(stats[i]['pa']);
    };

    var trace1 = {
        x: teams,
        y: pfs,
        mode: 'markers',
        type: 'scatter',
        name: 'PF',
        marker: { size: 12 }
    };

    var trace2 = {
        x: teams,
        y: pas,
        mode: 'markers',
        type: 'scatter',
        name: 'PA',
        marker: { size: 12, color: 'rgb(255, 0, 0)' }
    };

    var bar_data = [trace1, trace2];

    var layout = {
        xaxis: {
            range: [-1, 32]
        },
        yaxis: {
            range: [0, 6000]
        },
        title: 'Total Points For and Against'
    };
    var config = { responsive: true }

    Plotly.newPlot('bubble', bar_data, layout, config);
}
function barChart() {
    let stats = data;
    let w = []
    let l = []
    let t = []
    let teams = []
    for (var i = 0; i < stats.length; i++) {
        teams.push(stats[i]['team_name']);
        w.push(stats[i]['w'])
        l.push(stats[i]['l'])
        t.push(stats[i]['t'])
    };
    // for (var i = 0; i < stats.length; i++) {
    //     if (team_id == stats[i]['team_name']) {
    //         w.push(stats[i]['w'])
    //         l.push(stats[i]['l'])
    //         t.push(stats[i]['t'])
    //     }
    // }
    var trace1 = {
        x: teams,
        y: w,
        type: 'bar',
        name: 'Wins',
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    };

    var trace2 = {
        x: teams,
        y: l,
        type: 'bar',
        name: 'Losses',
        marker: {
            color: 'rgb(255, 0, 0)',
            opacity: 0.5
        }
    };

    var trace3 = {
        x: teams,
        y: t,
        type: 'bar',
        name: 'Ties',
        marker: {
            color: 'rgb(255, 153, 0)',
            opacity: 0.5
        }
    };
    var bar_data = [trace1, trace2, trace3];

    var layout = {
        // title: 'Win/Loss/Tie',
        // autosize: true,
        // height: 400,
        // width: 400,
        xaxis: {
            tickangle: -90
        },
        barmode: 'group'
    };
    var config = { responsive: true }

    Plotly.newPlot('bar', bar_data, layout, config);

}
function updateDashboard() {
    // console.log('updateDB');

    // teamInfo(init_id);
    barChart();
    // gaugeChart(team_id);
    bubbleChart();

};

function loadTeamSummary() {
    d3.json(sum_data_url).then(function (tmp_data) {
        // console.log('sum');
        // console.log(tmp_data);
        data = tmp_data;
        updateDashboard();
    });
};
function init() {
    // console.log('init')
    loadTeamSummary();

};

init();
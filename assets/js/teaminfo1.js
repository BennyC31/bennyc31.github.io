const tm_sum_fran_url = 'https://raw.githubusercontent.com/BennyC31/American-Football-Dashboard/main/football-dash/data/tm_sum_fran.json';
const yearly_data_url = 'https://raw.githubusercontent.com/BennyC31/American-Football-Dashboard/main/football-dash/data/yearly_data.json';
let data = []
let y_data = []
// let lg_data = []
function teamInfo(s_id) {
    console.log('teamInfo')
    // console.log(s_id)
    team_name = ''
    let w = 0
    let l = 0
    let t = 0
    let pf = 0
    let pa = 0
    let leag = ''
    let team_info = d3.select("#sample-metadata");
    for (let i = 0; i < lg_data.length; i++) {
        test_name = lg_data[i]['franchisename']
        if (test_name == s_id) {
            w = lg_data[i]['w']
            l = lg_data[i]['l']
            t = lg_data[i]['t']
            pf = lg_data[i]['pf']
            pa = lg_data[i]['pa']
            team_name = lg_data[i]['franchisename']
            leag = lg_data[i]['leagabrv']
            break;
        }
    }
    gp = (w + l + t);
    wins = (w + (t * .5))
    console.log(gp)
    console.log(wins)
    win_pct = wins / gp;
    pct = win_pct.toFixed(3);
    pt_dif = pf - pa;

    team_info.html("");
    team_info.append('h6').text(`name: ${team_name}`);
    team_info.append('h6').text(`league: ${leag}`);
    team_info.append('h6').text(`W: ${w}`);
    team_info.append('h6').text(`L: ${l}`);
    team_info.append('h6').text(`T: ${t}`);
    team_info.append('h6').text(`Win %: ${pct}`);
    team_info.append('h6').text(`PF: ${pf}`);
    team_info.append('h6').text(`PA: ${pa}`);
    team_info.append('h6').text(`Pt Dif: ${pt_dif}`);
    generateTable();
    // let team_table = d3.select("#bubble");
    // team_table.append('table').text(`Teams`);
    // team_table.append('tr');
    // team_table.append('th').text(`name`);
    // team_table.append('th').text(`W`);
    // team_table.append('th').text(`L`);
    // team_table.append('th').text(`T`);
    // team_table.append('th').text(`Win %`);
    // team_table.append('th').text(`PF`);
    // team_table.append('th').text(`PA`);
    // team_table.append('th').text(`Pt Diff`);
    // team_table.append('th').text(`league`);
    // team_table.append('tr');
    // for (let i = 0; i < lg_data.length; i++) {
    //     test_name = lg_data[i]['franchisename']
    //     if (test_name == s_id) {
    //         w = lg_data[i]['w']
    //         l = lg_data[i]['l']
    //         t = lg_data[i]['t']
    //         pf = lg_data[i]['pf']
    //         pa = lg_data[i]['pa']
    //         team_name = lg_data[i]['franchisename']
    //         leag = lg_data[i]['leagabrv']
    //         break;
    //     }
    // }
};
function generateTable() {
    let my_table = document.getElementById("bubble")
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table")
    // const tblHead = document.createElement("thead");
    const tblBody = document.createElement("tbody");
    let tblHead = tbl.createTHead();
    let row = tblHead.insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML = 'Col1';
    let cell1 = row.insertCell(1);
    cell1.innerHTML = 'Col2';

    // creating all cells
    for (let i = 0; i < 2; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < 2; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    my_table.appendChild(tbl)
    // document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");

}

function loadTeams(s_id) {
    console.log(s_id)
    lg_data = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i]['leagabrv'] == s_id) {
            lg_data.push(data[i])
        }
    }
    updateTeams();
};
function leagueChanged(s_id) {
    console.log('leagueChanged')
    resetdropdown();
    loadTeams(s_id)
}

function optionChanged(s_id) {
    console.log('optionChanged')
    let team_id = get_team_id(s_id);
    teamInfo(s_id);
    // barChart(team_id)
    // gaugeChart(team_id);
}

function get_team_id(team_name) {
    console.log('get_team_id')
    team_id = 'NFLTeam1'
    for (let i = 0; i < lg_data.length; i++) {
        if (team_name == lg_data[i]['franchisename']) {
            team_id = lg_data[i]['team_id']
        }
    }
    return team_id
};

function updateLeague() {
    console.log('updateLeague')
    let lg_data = []
    let leagdropdownMenu = d3.select("#selLeague")
    let leag = ['NFL', 'AFL', 'USFL', 'AAFC']
    for (let l = 0; l < leag.length; l++) {
        leagdropdownMenu.append('option').text(leag[l]).property('value', leag[l])
    }
    // let leag_id = leagdropdownMenu.property('value');
};

function resetdropdown() {
    console.log('reset')
    let select = document.getElementById("selDataset")
    select.innerText = null;
};
function updateTeams() {
    console.log('updateTeams')
    console.log(lg_data)
    let subjdropdownMenu = d3.select("#selDataset")
    for (let i = 0; i < lg_data.length; i++) {
        let s_id = lg_data[i]['franchisename']
        subjdropdownMenu.append('option').text(s_id).property('value', s_id);
    }
    let init_id = subjdropdownMenu.property("value");
    let team_id = get_team_id(init_id);

    teamInfo(init_id);
    // barChart(team_id);
    // gaugeChart(team_id);
    // bubbleChart();
};

function updateDashboard() {
    console.log('updateDashboard')


};
function bubbleChart() {
    console.log('bubbleChart')
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

function barChart(team_id) {
    console.log('barChart')
    let stats = y_data;
    let w = []
    let l = []
    let t = []
    let years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    for (var i = 0; i < stats.length; i++) {
        if (team_id == stats[i]['team_id']) {
            w.push(stats[i]['w'])
            l.push(stats[i]['l'])
            t.push(stats[i]['t'])
        }
    }
    var trace1 = {
        x: years,
        y: w,
        type: 'bar',
        name: 'Wins',
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    };

    var trace2 = {
        x: years,
        y: l,
        type: 'bar',
        name: 'Losses',
        marker: {
            color: 'rgb(255, 0, 0)',
            opacity: 0.5
        }
    };

    var trace3 = {
        x: years,
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
            tickangle: -45
        },
        barmode: 'group'
    };
    var config = { responsive: true }

    Plotly.newPlot('bar', bar_data, layout, config);

}
function init() {
    d3.json(tm_sum_fran_url).then(function (tmp_data) {
        console.log('init')
        data = tmp_data
        updateLeague();
        loadTeams('NFL');
    })
    d3.json(yearly_data_url).then(function (tmp_yr_data) {
        console.log(tmp_yr_data)
        // data = tmp_data
        // updateLeague();
        // loadTeams('NFL');
    })
    testTable()
}

init();

function testTable() {
    Plotly.d3.csv("https://raw.githubusercontent.com/BennyC31/American-Football-Dashboard/main/football-dash/data/team_summary.csv", function (err, rows) {

        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }
        var tempheaders = d3.keys(rows[0]);
        var headerNames = []
        for (h = 1; h < tempheaders.length; h++) {
            headerNames.push(tempheaders[h]);
        }
        // var headerNames = d3.keys(rows[0]);
        // console.log(headerNames1);

        var headerValues = [];
        var cellValues = [];
        for (i = 0; i < headerNames.length; i++) {
            headerValue = [headerNames[i]];
            headerValues[i] = headerValue;
            cellValue = unpack(rows, headerNames[i]);
            cellValues[i] = cellValue;
        }
        var rowEvenColor = "lightgrey";
        var rowOddColor = "white";

        // clean date
        // for (i = 0; i < cellValues[1].length; i++) {
        //     var dateValue = cellValues[1][i].split(' ')[0]
        //     cellValues[1][i] = dateValue
        // }

        console.log(cellValues);
        var data = [{
            type: 'table',
            columnwidth: [1000, 300, 300, 300, 300, 300, 500],
            // columnorder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            header: {
                values: headerValues,
                align: "center",
                line: { width: 1, color: 'rgb(50, 50, 50)' },
                fill: { color: ['rgb(235, 100, 230)'] },
                font: { family: "Arial", size: 8, color: "white" }
            },
            cells: {
                values: cellValues,
                align: ["left", "center"],
                line: { color: "black", width: 1 },
                fill: { color: ['rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)', 'rgba(228, 222, 249, 0.65)'] },
                // fill: { color: [[rowOddColor, rowEvenColor, rowOddColor, rowEvenColor, rowOddColor]] },
                font: { family: "Arial", size: 9, color: ["black"] }
            }
        }]

        var layout = {
            title: "Teams"
        }
        var config = { responsive: true }

        Plotly.newPlot('bar', data, layout, config);
    });
}

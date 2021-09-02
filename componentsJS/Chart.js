import Chart from 'chart.js/auto';

import '../componentsCSS/Chart.css'

var data = {
    labels: ['Done', 'Not done'],
    datasets: [
      {
        label: 'Dataset',
        data: [0,0],
        backgroundColor:['Green', 'Red'],
      }
    ]
  };

var config = {
    type: 'pie',
    data: data,
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Statistics'
        }
      }
    },
  };


export default function MyChart(props) {

    if (Chart.getChart("stats") !== undefined && props.name !== '') {
      fetch(`http://localhost:5000/api/stats/${props.name}`)
      .then(response => response.json())
      .then(respData => {
        Chart.getChart("stats").data.datasets[0].data = [respData["Done"], respData["NotDone"]];
        Chart.getChart("stats").data.datasets[0].labels = ["Done", "Not Done"];
        Chart.getChart("stats").update()
      });
    }

    if(Chart.getChart("stats") === undefined && props.name !== '') {
        fetch(`http://localhost:5000/api/stats/${props.name}`)
        .then(response => response.json())
        .then(data => config["data"]["datasets"][0]["data"] = [data["Done"], data["NotDone"]])
        .then(new Chart(document.getElementById("stats"), config, data))
    }

    return (
        <div>
          <canvas id="stats" width="400" height="400"></canvas>
        </div>
    )
}
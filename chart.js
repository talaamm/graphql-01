const data = {
    labels: ['Checkpoint', 'Piscine-Go', 'Piscine-JS', 'Projects', 'Bonuses'],
    datasets: [{
        label: 'XP Earned',
        data: [
            parseInt(document.getElementById('userXP').textContent || '0', 10),
            parseInt(document.getElementById('p-go').textContent || '0', 10),
            parseInt(document.getElementById('p-js').textContent || '0', 10),
            parseInt(document.getElementById('prj-xp').textContent || '0', 10),
            parseInt(document.getElementById('bonus').textContent || '0', 10)
        ],
        backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

function XPchart() {
    // Sample data for the chart
    const labels = ['Checkpoint', 'Piscine-Go', 'Piscine-JS', 'Projects', 'Bonuses'];
    const data = [
        parseInt(document.getElementById('userXP')?.textContent || '0', 10),
        parseInt(document.getElementById('p-go')?.textContent || '0', 10),
        parseInt(document.getElementById('p-js')?.textContent || '0', 10),
        parseInt(document.getElementById('prj-xp')?.textContent || '0', 10),
        parseInt(document.getElementById('bonus')?.textContent || '0', 10),
    ];
    const colors = [
        '#4CAF50', // Green
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#9966FF', // Purple
        '#FF9F40', // Orange
    ];

    // SVG.js setup
    const draw = SVG().addTo("#xpBarChart").size(1000, 300);

    // Chart dimensions
    const chartWidth = 500;
    const chartHeight = 250;
    const barWidth = 60;
    const spacing = 20;

    // Calculate the maximum value to scale bars
    const maxValue = Math.max(...data);

    // Draw Y-axis and X-axis
    draw.line(50, 10, 50, chartHeight).stroke({
        width: 2,
        color: '#000'
    }); // Y-axis
    draw.line(50, chartHeight, chartWidth - 20, chartHeight).stroke({
        width: 2,
        color: '#000'
    }); // X-axis

    // Add bars and labels
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (chartHeight - 50);

        // Draw bar
        const bar = draw
            .rect(barWidth, barHeight)
            .attr({
                fill: colors[index],
                x: 60 + index * (barWidth + spacing),
                y: chartHeight - barHeight,
            });

        // Add interactivity (hover effect)
        bar.mouseover(function() {
            this.fill({
                color: 'blue'
            });
        });
        bar.mouseout(function() {
            this.fill({
                color: colors[index]
            });
        });

        // Add label
        draw
            .text(labels[index])
            .font({
                size: 12,
                anchor: 'middle'
            })
            .move(60 + index * (barWidth + spacing) + barWidth / 2, chartHeight + 5);

        // Add value label above the bar
        draw
            .text(value.toString())
            .font({
                size: 12,
                anchor: 'middle'
            })
            .move(60 + index * (barWidth + spacing) + barWidth / 2, chartHeight - barHeight - 15);
    });
}

function projectsChart(array) {
    const labels = [];
    const values = [];
    array.forEach(el => {
        labels.push(el.path.replace("/adam/module/", "")); // Shorten labels
        values.push(el.amount);
    });
    // Create a tooltip
    let tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.background = "rgba(0, 0, 0, 0.8)";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "6px 12px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "14px";
    tooltip.style.visibility = "hidden";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.transition = "opacity 0.2s";
    tooltip.style.pointerEvents = "none"; // Avoid interfering with mouse events
    document.body.appendChild(tooltip);
    // SVG.js setup
    const draw = SVG().addTo("#projectchart").size(1000, 400);
    // Chart dimensions
    const chartWidth = 900;
    const chartHeight = 300;
    const barWidth = 20;
    const spacing = 10;
    const maxValue = Math.max(...values);
    const padding = 50;
    draw.line(padding, 10, padding, chartHeight).stroke({
        width: 2,
        color: '#ccc'
    }); // Y-axis
    draw.line(padding, chartHeight, chartWidth, chartHeight).stroke({
        width: 2,
        color: '#ccc'
    }); // X-axis
    for (let i = 0; i <= maxValue; i += maxValue / 5) {
        const y = chartHeight - (i / maxValue) * (chartHeight - 50);
        draw.line(padding, y, chartWidth, y).stroke({
            width: 1,
            color: '#eee'
        });
        draw.text(i.toString()).font({
            size: 12
        }).move(10, y - 5);
    }
    array.forEach((el, index) => {
        const barHeight = (el.amount / maxValue) * (chartHeight - 50);
        const bar = draw
            .rect(barWidth, barHeight)
            .attr({
                fill: '#6A5ACD', // Soft purple color
                x: padding + 20 + index * (barWidth + spacing),
                y: chartHeight - barHeight,
                rx: 5,
                ry: 5
            });
        bar.mouseover(function() {
            this.fill({
                color: '#483D8B'
            });
            tooltip.style.visibility = "visible";
            tooltip.innerText = `Project: ${labels[index]}\nXP: ${el.amount}`;
        });
        bar.mouseout(function() {
            this.fill({
                color: '#6A5ACD'
            });
            tooltip.style.visibility = "hidden";
        });
        bar.mousemove(function(event) {
            tooltip.style.top = event.clientY + 10 + "px";
            tooltip.style.left = event.clientX + 10 + "px";
        });
    });
}

function piewiwi(skills) {
    let values = []
    let labels = []
    for (key in skills) {
        labels.push(key)
        values.push(skills[key])
    }
    const total = values.reduce((acc, value) => acc + value, 0); // Calculate the total
    const percentages = values.map(value => ((value / total) * 100).toFixed(2));

    const data = {
        labels: labels,
        datasets: [{
            label: 'Percentage',
            data: percentages,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(201, 203, 207, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(201, 203, 207, 1)',
            ],
            borderWidth: 1,
        }, ],
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                        },
                    },
                },
                legend: {
                    position: 'top',
                },
            },
        },
    };
    const ctx = document.getElementById('performancePieChart').getContext('2d');
    new Chart(ctx, config);
};
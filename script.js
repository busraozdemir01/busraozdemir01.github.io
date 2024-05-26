const numbers = [1, 2, 3, 4, 5, 6, 6, 6];
const selections = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 , 6:0};

document.getElementById('selectNumberButton').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const selectedNumber = numbers[randomIndex];
    selections[selectedNumber]++;
    displaySelectedNumber(selectedNumber);
    updateChart();
});

function displaySelectedNumber(number) {
    document.getElementById('selectedNumberDisplay').innerText = `Selected Number: ${number}`;
}

function updateChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    const data = {
        labels: Object.keys(selections),
        datasets: [{
            data: Object.values(selections),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#808080']
        }]
    };
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
    });
}

// Initialize the chart
updateChart();

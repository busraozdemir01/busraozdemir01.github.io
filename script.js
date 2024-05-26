let numbers = [];
let selections = {};
let colors = [];

document.getElementById('setNumberPoolButton').addEventListener('click', function() {
    const input = document.getElementById('numberPoolInput').value;
    numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    selections = {};
    numbers.forEach(num => selections[num] = 0);
    colors = generateUniqueColors(numbers.length); // Benzersiz renkleri burada oluşturuyoruz
    document.getElementById('selectNumberButton').disabled = numbers.length === 0;
    updateChart();
});

document.getElementById('selectNumberButton').addEventListener('click', function() {
    if (numbers.length === 0) return;
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const selectedNumber = numbers[randomIndex];
    selections[selectedNumber]++;
    displaySelectedNumber(selectedNumber);
    updateChart();
});

function displaySelectedNumber(number) {
    document.getElementById('selectedNumberDisplay').innerText = `Seçilen Sayı: ${number}`;
}

function updateChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    const data = {
        labels: Object.keys(selections),
        datasets: [{
            data: Object.values(selections),
            backgroundColor: colors // Renkler burada kullanılıyor
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

function generateUniqueColors(numColors) {
    const uniqueColors = [];
    for (let i = 0; i < numColors; i++) {
        let color;
        do {
            color = `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 50) + 50}%)`;
        } while (uniqueColors.includes(color)); // Benzersiz renk kontrolü yapılıyor
        uniqueColors.push(color);
    }
    return uniqueColors;
}

// Initialize the chart
updateChart();

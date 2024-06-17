function inputData() {
    const tasks = [];

    const ask = () => {
        const name = prompt('Введіть назву завдання (або "done" для завершення):');
        if (name.toLowerCase() === 'done') {
            const totalDuration = calculateTotalDuration(tasks);
            console.log(`Загальна тривалість комплексу робіт з урахуванням резервів часу: ${totalDuration} год.`);
            drawGanttChart(tasks);
        } else {
            const duration = parseInt(prompt('Введіть тривалість завдання у годинах:'));
            const reserve = parseInt(prompt('Введіть резерв часу для завдання у годинах:'));
            tasks.push({ name, duration, reserve });
            ask();
        }
    };
    ask();
}

function calculateTotalDuration(tasks) {
    let totalDuration = 0;
    tasks.forEach(task => {
        totalDuration += task.duration + task.reserve;
    });
    return totalDuration;
}

function drawGanttChart(tasks) {
    const ctx = document.getElementById('ganttChart').getContext('2d');

    const data = {
        labels: tasks.map(task => task.name),
        datasets: [{
            label: 'Тривалість',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: tasks.map(task => task.duration)
        }, {
            label: 'Резерв',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: tasks.map(task => task.reserve)
        }]
    };

    const options = {
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Завдання'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Години'
                }
            }
        }
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

function main() {
    inputData();
}

main();
//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const outputTable = document.getElementById("output");

    function createPromise(index) {
        const delay = Math.random() * (3 - 1) + 1; // Random time between 1 and 3 seconds
        return new Promise(resolve => {
            setTimeout(() => resolve({ index, time: delay.toFixed(3) }), delay * 1000);
        });
    }

    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    Promise.all(promises).then(results => {
        // Remove "Loading..." row
        outputTable.innerHTML = "";

        // Populate table with resolved promise times
        results.forEach(result => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>Promise ${result.index}</td><td>${result.time}</td>`;
            outputTable.appendChild(row);
        });

        // Calculate the max time taken (total execution time)
        const maxTime = Math.max(...results.map(r => parseFloat(r.time)));
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${maxTime.toFixed(3)}</strong></td>`;
        outputTable.appendChild(totalRow);
    });
});

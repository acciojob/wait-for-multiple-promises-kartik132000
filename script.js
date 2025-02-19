document.addEventListener("DOMContentLoaded", () => {
    const outputTable = document.getElementById("output");

    // Display "Loading..." row initially
    outputTable.innerHTML = `<tr><td colspan="2" class="text-center">Loading...</td></tr>`;

    function createPromise(index) {
        const delay = Math.random() * (3 - 1) + 1; // Random time between 1 and 3 seconds
        return new Promise(resolve => {
            setTimeout(() => resolve({ index, time: delay.toFixed(3) }), delay * 1000);
        });
    }

    // Start timer to measure total time
    const startTime = performance.now(); 

    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    Promise.all(promises).then(results => {
        // Calculate the actual total elapsed time
        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(3);

        // Remove "Loading..." row
        outputTable.innerHTML = "";

        // Populate table with resolved promise times
        results.forEach(result => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>Promise ${result.index}</td><td>${result.time}</td>`;
            outputTable.appendChild(row);
        });

        // Add total time row
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime}</strong></td>`;
        outputTable.appendChild(totalRow);
    });
});

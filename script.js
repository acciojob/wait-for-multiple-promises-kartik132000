document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");

    function createPromise(id) {
        const time = (Math.random() * 2 + 1).toFixed(3); 
        return new Promise(resolve => {
            setTimeout(() => resolve({ id, time }), time * 1000);
        });
    }

    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    Promise.all(promises).then(results => {
        const loadingRow = document.getElementById("loading");
        if (loadingRow) loadingRow.remove(); // Remove loading row after promises resolve

        results.forEach(result => {
            const row = `<tr>
                            <td>Promise ${result.id}</td>
                            <td>${result.time}</td>
                        </tr>`;
            output.innerHTML += row;
        });

        const maxTime = Math.max(...results.map(r => parseFloat(r.time))).toFixed(3);
        output.innerHTML += `<tr class="table-secondary">
                                <td><strong>Total</strong></td>
                                <td><strong>${maxTime}</strong></td>
                            </tr>`;
    });
});
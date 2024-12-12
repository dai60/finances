const transactions = [];

document.getElementById("transaction-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("transaction");
    const value = Number(input.value);

    addTransaction(value);
    updateTransactions();

    event.target.reset();
});

function addTransaction(amount) {
    const id = transactions.length + 1;
    const date = new Date();
    transactions.push({ id, amount, date });
}

function updateTransactions() {
    const list = document.querySelector(".transaction-list");
    const elements = [];

    for (const transaction of transactions) {
        const color = transaction.amount >= 0 ? "positive" : "negative";
        const children = [
            `<p class="id">ID: ${transaction.id}</p>`,
            `<h2 class="${color}">${transaction.amount} $</h2>`,
            `<p class="date">${transaction.date.toLocaleString()}</p>`
        ];
        const div = `<div>${children.join("\n")}</div>`;
        elements.push(div);
    }

    list.innerHTML = elements.join("\n");
}

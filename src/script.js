const transactions = [];

document.getElementById("transaction-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("transaction");
    const value = Number(input.value);

    addTransaction(value);
    updateHtml();

    event.target.reset();
});

document.getElementById("sort-transactions").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".sort > svg").classList.toggle("ascending");
    document.querySelector(".transactions").classList.toggle("ascending");
})

function addTransaction(amount) {
    const id = transactions.length + 1;
    const date = new Date();
    transactions.push({ id, amount, date });
}

function calculateBalance() {
    let current = 0;
    let income = 0;
    let expenses = 0;
    for (const transaction of transactions) {
        const amount = transaction.amount;
        current += amount;
        if (amount >= 0) {
            income += amount;
        }
        else {
            expenses += amount;
        }
    }
    return { current, income, expenses };
}

function updateHtml() {
    updateBalance(calculateBalance());
    updateTransactions();
}

function updateBalance(balance) {
    updateSpan("current-balance", balance.current);
    updateSpan("income", balance.income);
    updateSpan("expenses", balance.expenses);
}

function updateSpan(id, amount) {
    const span = document.getElementById(id);
    span.classList.remove("neutral", "positive", "negative");
    if (amount > 0) {
        span.classList.add("positive");
    }
    else if (amount === 0) {
        span.classList.add("neutral");
    }
    else {
        span.classList.add("negative");
    }
    span.textContent = `${amount.toFixed(2)} $`;
}

function updateTransactions() {
    const list = document.querySelector(".transactions");
    const elements = [];

    for (const transaction of transactions) {
        let color = "neutral";
        if (transaction.amount > 0) {
            color = "positive";
        }
        else if (transaction.amount < 0) {
            color = "negative";
        }

        const children = [
            `<p class="id">ID: ${transaction.id}</p>`,
            `<h2 class="${color}">${transaction.amount.toFixed(2)} $</h2>`,
            `<p class="date">${transaction.date.toLocaleString()}</p>`
        ];
        const div = `<div>${children.join("\n")}</div>`;
        elements.push(div);
    }

    list.innerHTML = elements.join("\n");
}

updateHtml();

// script.js
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const transactionType = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    // Add new transaction to table
    const table = document.getElementById('transaction-list').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td>${transactionType === 'income' ? 'รายรับ' : 'รายจ่าย'}</td>
        <td>${amount} บาท</td>
        <td>${description}</td>
        <td>${new Date().toLocaleDateString()}</td>
    `;

    // Update totals
    updateTotals(transactionType, amount);

    // Clear input fields
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
});

function updateTotals(type, amount) {
    let totalIncome = parseFloat(document.getElementById('total-income').innerText);
    let totalExpense = parseFloat(document.getElementById('total-expense').innerText);

    if (type === 'income') {
        totalIncome += amount;
        document.getElementById('total-income').innerText = totalIncome.toFixed(2);
    } else if (type === 'expense') {
        totalExpense += amount;
        document.getElementById('total-expense').innerText = totalExpense.toFixed(2);
    }

    const netTotal = totalIncome - totalExpense;
    document.getElementById('net-total').innerText = netTotal.toFixed(2);
}

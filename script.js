let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let filteredTransactions = transactions;  // ใช้เก็บรายการที่กรองแล้ว

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (desc && !isNaN(amount)) {
    transactions.push({ desc, amount });
    saveTransactions();
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    filterTransactions('all');  // รีเซ็ตการกรองกลับไปดูทั้งหมด
  } else {
    alert('กรุณากรอกข้อมูลให้ครบ');
  }
}

function filterTransactions(type) {
  if (type === 'income') {
    filteredTransactions = transactions.filter(t => t.amount > 0);
  } else if (type === 'expense') {
    filteredTransactions = transactions.filter(t => t.amount < 0);
  } else {
    filteredTransactions = transactions;
  }
  renderList();
}

function renderList() {
  const list = document.getElementById('list');
  list.innerHTML = '';

  let balance = 0;
  filteredTransactions.forEach((t, index) => {
    balance += t.amount;
    const li = document.createElement('li');
    li.className = `flex justify-between items-center p-2 rounded ${t.amount >= 0 ? 'bg-green-50' : 'bg-red-50'}`;
    li.innerHTML = `
      <span>${t.desc} (${t.amount >= 0 ? '+' : ''}${t.amount} บาท)</span>
      <button onclick="removeTransaction(${index})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
    `;
    list.appendChild(li);
  });

  document.getElementById('balance').innerText = balance + ' บาท';
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  saveTransactions();
  filterTransactions('all'); // อัพเดตลิสต์และยอดหลังลบ
}

function clearTransactions() {
  if (confirm('ต้องการลบรายการทั้งหมดหรือไม่?')) {
    transactions = [];
    filteredTransactions = transactions;
    saveTransactions();
    renderList();
  }
}

// โหลดข้อมูลเมื่อเปิดเว็บ (ดูทั้งหมด)
filterTransactions('all');


// Defining global variables
let expenseTableBody = document.querySelector(".expenses tbody");
let expenseTotalsTable = document.querySelector(".expenseSummary tbody");
// Keep a single chart instance
let barChartInstance = null;

// Listening for events
document.addEventListener("DOMContentLoaded", reloadExpenses);
document.querySelector("#submit").addEventListener("click", takeUserInput);
document.querySelector("#clear").addEventListener("click", clearExpenses);

// Defining functions 

function takeUserInput(e) {
  e.preventDefault();
  let date = document.querySelector("#date");
  let category = document.querySelector("#category");
  let amount = document.querySelector("#amount");
  let note = document.querySelector("#note");
  if (date.value === "" || category.value === "" || amount.value === "") {
    alert("Please fill all the fields!");
    return;
  }

  storeInLocalStorage(date.value, category.value, amount.value, note.value);
  reloadExpenses();
}

function clearExpenses() {
    localStorage.setItem("expenses", JSON.stringify([]));
    reloadExpenses();
}

function storeInLocalStorage(date, category, amount, note) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let newExpense = {
    date: date,
    category: category,
    amount: parseFloat(amount),
    description: note,
  };

  console.log(expenses);
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function reloadExpenses() {
  if (localStorage.getItem("expenses") !== null) {
    let storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    expenseTableBody.innerHTML = "";
    let categories = [];
    let amounts = [];

    for (let expense of storedExpenses) {
      populateTableRow(expense);

      //summarize the categories and amounts in their array to pass them to populateTotalsTable and showBarChart
      if (!categories.includes(expense.category)) {
        categories.push(expense.category);
        amounts.push(expense.amount);
      } else {
        let index = categories.indexOf(expense.category);
        amounts[index] += expense.amount;
      }
    }

    populateTotalsTable(categories, amounts);
    showBarChart(categories, amounts);
  }
}

function populateTableRow(expense) {
  let row = `<tr>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                <td>${expense.description}
             </td>`;
  expenseTableBody.innerHTML += row;
}

function populateTotalsTable(categories, expenses) {
  // Populating totals table with respect to categories and showing a grand total at the bottom
  expenseTotalsTable.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    let row = `<tr>
              <td>${categories[i]}</td>
              <td>${expenses[i]}</td>
           </tr>`;
    expenseTotalsTable.innerHTML += row;
  }
}

function showBarChart(categories, expenses) {
  // Showing the bar chart of category totals
  const canvas = document.getElementById("barChart");
  if (!canvas) return;

  // Destroy previous chart if it exists
  if (barChartInstance) {
    barChartInstance.destroy();
  } else {
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
  }

  // Build per-bar colors
  const n = categories.length || expenses.length;
  const bgColors = [];
  const borderColors = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / Math.max(1, n)) * i);
    bgColors.push(`hsl(${hue} 70% 60% / 0.6)`);
    borderColors.push(`hsl(${hue} 70% 40% / 1)`);
  }

  barChartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: categories,
      datasets: [
        {
          data: expenses,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          font: {
            size: 20,
          },
          text: "Expenses by Category",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

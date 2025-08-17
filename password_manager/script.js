// Handle form submit instead of button click to prevent page reload and ensure proper flow
document.querySelector('#password-form').addEventListener("submit", storePassword);
// Render any existing passwords on initial load
document.addEventListener('DOMContentLoaded', displayPasswords);

// Function to take the input from the form and store it in the local storage in case of its not already present in there
function storePassword(event){
    // Prevent form submission from reloading the page
    if (event) event.preventDefault();

    const website = document.querySelector("#website").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Validate inputs
    if (!website || !username || !password) {
        alert("Please fill in all fields");
        return;
    }

    const passwordData = { website, username, password };

    // Checking if the local storage named "passwords" is created and if it already contains this entry
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    const existingEntry = passwords.find(entry => entry.website === website);
    if (existingEntry) {
        alert("Password for this website already exists");
    } else {
        passwords.push(passwordData);
        localStorage.setItem("passwords", JSON.stringify(passwords));
    }

    // Update UI
    displayPasswords();
    clearInput();
}

// Function to display the passwords in the table
function displayPasswords(){
    const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    const tableBody = document.querySelector(".password-table tbody");
    tableBody.innerHTML = "";

    passwords.forEach((entry, index) => {
        const row = document.createElement("tr");
            // Store the row index so we can look up the correct record from localStorage for copy/delete
            row.dataset.index = String(index);
            // I created an x sudo element after each row so we will use it to delete the row
            row.innerHTML = `
                <td data-field="website" onclick="copyCell(this)">${entry.website}</td>
                <td data-field="username" onclick="copyCell(this)">${entry.username}</td>
                <td data-field="password" onclick="copyCell(this)">${hidePassword(entry.password)}</td>
                <span class="delete" onclick="deleteRow(this.parentElement)">&times;</span>
            `;
        tableBody.appendChild(row);
    });
}

function clearInput(){
    document.querySelector("#website").value = "";
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";
}

// function the copy a table cell
function copyCell(cell){
    try {
        const row = cell.closest('tr');
        const idx = Number(row?.dataset?.index);
        const field = cell.dataset.field;
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        const entry = Number.isFinite(idx) ? passwords[idx] : undefined;

        const value = (entry && field && entry[field] !== undefined)
            ? entry[field]
            : cell.innerText;

        navigator.clipboard.writeText(String(value)).then(() => {
            // adding the tooltip, saying copied
            const tooltip = document.createElement("span");
            tooltip.innerText = "Copied!";
            tooltip.className = "tooltip";
            cell.appendChild(tooltip);
            setTimeout(() => {
                if (tooltip.parentElement === cell) cell.removeChild(tooltip);
            }, 1000);
        });
    } catch (e) {
        // no-op fallback
    }
}

// function to delete a row of table when user click on the cross beside it
function deleteRow(row){
    const passwordData = row.querySelectorAll('td');
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    passwords = passwords.filter(entry => {
        return (entry.website !== passwordData[0].innerText && entry.username !== passwordData[1].innerText);
    });
    localStorage.setItem("passwords", JSON.stringify(passwords));
    displayPasswords();
}

// Function to replace password with equal number of *
function hidePassword (password){
    return "*".repeat(password.length);
}
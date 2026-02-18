function loadDashboard() {
    const sortBy = document.getElementById("sortBy").value;
    const filterDept = document.getElementById("filterDept").value;

    // Fetch employees
    fetch(`/employees?sortBy=${sortBy}&filterDept=${filterDept}`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#dashboardTable tbody");
            tbody.innerHTML = "";

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6">No records found</td></tr>`;
                return;
            }

            data.forEach(emp => {
                tbody.innerHTML += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.email}</td>
                        <td>${emp.dob}</td>
                        <td>${emp.department}</td>
                        <td>${emp.phone}</td>
                    </tr>
                `;
            });
        });

    // Fetch department counts
    fetch("/department-count")
        .then(res => res.json())
        .then(data => {
            const ul = document.getElementById("deptCount");
            ul.innerHTML = "";
            data.forEach(d => {
                ul.innerHTML += `<li>${d.department}: ${d.count}</li>`;
            });
        });
}

// Load data on page load
loadDashboard();


(async () => {

    const access_token = localStorage.getItem("access_token");
    //if (!access_token) return redirectToLogin();

    const name = document.getElementById("userName")
    const nameH = document.getElementById("userNameH")
    const userName = localStorage.getItem("userName");

    if (name && userName && nameH) {
        name.innerText = userName;
        nameH.innerText = userName;
    }

    try {
        const data = await fetchDashboardData(access_token);
        const totals = calculateTotals(data || []);
        animateNumbers(totals);
        // Mostrar actividad reciente
        renderRecentActivity(data);
        // Mostrar historial ordenes
        renderOrdersTable(data)
    } catch (err) {
        console.error(err);
        redirectToLogin();
    }
})();


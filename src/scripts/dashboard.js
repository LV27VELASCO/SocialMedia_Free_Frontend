import { environment } from "../environments/environment";

(async () => {

    const access_token = localStorage.getItem("access_token");
    if (!access_token) return redirectToLogin();

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

async function fetchDashboardData(access_token) {
    const res = await fetch(`${environment.api}/dashboard`, {
        headers: { "Authorization": `Bearer ${access_token}` }
    });

    if (!res.ok) redirectToLogin();

    return res.json(); // siempre devuelve array
}


document.getElementById("btnNewOrderDashboard").addEventListener("click", async function (e) {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) return redirectToLogin();

    try {
        const data = await fetchNewOrder(access_token);
        console.log(data)
    } catch (err) {
        console.error(err);
        redirectToLogin();
    }
})

document.getElementById("btnNewOrder").addEventListener("click", async function (e) {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    if (!access_token) return redirectToLogin();

    try {
        const data = await fetchNewOrder(access_token);
        console.log(data)
    } catch (err) {
        console.error(err);
        redirectToLogin();
    }
})

async function fetchNewOrder(access_token) {
    showLoader();
    try {
        const res = await fetch(`${environment.api}/new-order`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const data = await res.json();
        hideLoader();
        if (!res.ok) {
            // error, mostrar modal con icono de alerta
            showModal({
                icon: "🚨",
                title: "Error",
                message: data.message || data.detail || "Ocurrió un error.",
            });
            return;
        }

        // éxito, mostrar modal con icono de éxito
        showModal({
            icon: "✅",
            title: "Éxito",
            message: data.message || "Operación exitosa.",
        });
        return
    } catch (error) {
        hideLoader();
        showModal({
            icon: "🚨",
            title: "Error",
            message: "Error de conexión o inesperado.",
        });
        return
    }
}
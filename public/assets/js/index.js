const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let chart; // Para evitar criar múltiplos gráficos

async function carregarDashboard() {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/dashboard", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();

        // Atualiza os cards
        document.querySelectorAll(".card-value")[0].innerText = data.valorTotal + " Kz";
        document.querySelectorAll(".card-value")[1].innerText = data.totalProdutos;
        document.querySelectorAll(".card-value")[2].innerText = data.stockBaixo;

        // Cria ou atualiza gráfico
        const ctx = document.getElementById("graficoStock");
        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.categorias,
                datasets: [{
                    label: "Produtos por Categoria",
                    data: data.dados,
                    backgroundColor: "#C5A47E"
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });

    } catch (err) {
        console.log("Erro:", err);
    }
}

// Atualiza a cada 5 segundos
carregarDashboard();
setInterval(carregarDashboard, 5000);

// Sair do sistema
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

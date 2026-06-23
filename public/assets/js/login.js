document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const token = localStorage.getItem("token");

    try {
        const res = await fetch("http://localhost:3000/usuario/login", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, senha })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            alert(data.message || "Erro no login");
        }

    } catch (error) {
        alert("Erro ao conectar ao servidor");
    }
});

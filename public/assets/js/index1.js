const token = localStorage.getItem("token");

if (!token) {
    window.location = "login.html";
};

function voltar() {
    window.location.href = "index.html";
}

// Abrir a tabela dos computadores e fechar as restantes
function mostrarComputadores() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const computadores = document.getElementById("computadores");
    computadores.style.display = "block";
    computadores.style.minWidth = "305%";
    computadores.style.padding = "25px";
    computadores.style.marginLeft = "206%";
    computadores.style.height = "93vh";

    const th = document.getElementById("categoria1").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria1").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}


// Abrir a tabela dos telemóveis e fechar as restantes
function mostrarTelemoveis() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const telemoveis = document.getElementById("telemoveis");
    telemoveis.style.display = "block";
    telemoveis.style.minWidth = "305%";
    telemoveis.style.padding = "25px";
    telemoveis.style.marginLeft = "206%";
    telemoveis.style.height = "93vh";

    const th = document.getElementById("categoria2").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria2").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}


// Abrir a tabela dos cabos e fechar as restantes
function mostrarCabos() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const cabos = document.getElementById("cabos");
    cabos.style.display = "block";
    cabos.style.minWidth = "305%";
    cabos.style.padding = "25px";
    cabos.style.marginLeft = "206%";
    cabos.style.height = "93vh";

    const th = document.getElementById("categoria3").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria3").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}


// Abrir a tabela dos carregadores e fechar as restantes
function mostrarCarregadores() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const carregadores = document.getElementById("carregadores");
    carregadores.style.display = "block";
    carregadores.style.minWidth = "305%";
    carregadores.style.padding = "25px";
    carregadores.style.marginLeft = "206%";
    carregadores.style.height = "93vh";

    const th = document.getElementById("categoria4").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria4").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}

// Abrir a tabela das televisões e fechar as restantes
function mostrarTelevisoes() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const televisao = document.getElementById("televisoes");
    televisao.style.display = "block";
    televisao.style.minWidth = "305%";
    televisao.style.padding = "25px";
    televisao.style.marginLeft = "206%";
    televisao.style.height = "93vh";

    const th = document.getElementById("categoria5").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria5").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}


// Abrir a tabela dos sons e fechar as restantes
function mostrarSons() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const som = document.getElementById("som");
    som.style.display = "block";
    som.style.minWidth = "305%";
    som.style.padding = "25px";
    som.style.marginLeft = "206%";
    som.style.height = "93vh";

    const th = document.getElementById("categoria6").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria6").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}


// Abrir a tabela das redes e fechar as restantes
function mostrarRedes() {
    const cards = document.querySelectorAll(".card2");
    cards.forEach(card => {
        card.style.display = "none";
    });

    const redes = document.getElementById("redes");
    redes.style.display = "block";
    redes.style.minWidth = "305%";
    redes.style.padding = "25px";
    redes.style.marginLeft = "206%";
    redes.style.height = "93vh";

    const th = document.getElementById("categoria7").querySelectorAll("th");

    th.forEach(ths => {
        ths.style.fontSize = "15pt";
    })

    const td = document.getElementById("categoria7").querySelectorAll("td");

    td.forEach(tds => {
        tds.style.fontSize = "15pt";
    })
}

function voltar() {
    location.reload();
}

// Sair do sistema
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const datas = document.getElementById('datas');
const addItem = document.getElementById('addItem');

//Listando itens
async function listarAuto() {
    const response = await fetch('http://localhost:3000/produtos');
    const dados = await response.json();
    mostrarDados(dados);
    console.log(dados)
}

window.onload = listarAuto;

// Fução mostrarDados
function mostrarDados(lista) {
    const tabela = document.getElementById('datas');
    tabela.innerHTML = ``;

    lista.forEach(itens => {
        tabela.innerHTML += `
        <tr>
        <td>${itens.id}</td>
        <td>${itens.nome}</td>
        <td>${itens.quantidade}</td>
        <td>${itens.categoria}</td>
        <td>${itens.preco_unitario}</td>
        <td>${itens.marca_produto}</td>
        <td>${itens.data_cadastro}</td>
        <td>${itens.data_entrada}</td>
        <td>
            <button onclick='editar(${JSON.stringify(itens)})' class='editar'>Editar</button>
            <button onclick='excluir(${itens.id})' class='excluir'>Excluir</button>
        </td>
        </tr>
        `;
    });
};

// Editando item
let editando = false;
function editar(itens) {
    document.getElementById('id').value = itens.id;
    document.getElementById('nome').value = itens.nome;
    document.getElementById('quantidade').value = itens.quantidade;
    document.getElementById('categoria').value = itens.categoria;
    document.getElementById('preco_unitario').value = itens.preco_unitario;
    document.getElementById('marca_produto').value = itens.marca_produto;
    document.getElementById('data_cadastro').value = itens.data_cadastro;
    document.getElementById('data_entrada').value = itens.data_entrada;

    editando = true;
}

// Editar e Criar no mesmo lugar
document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const categoria = document.getElementById('categoria').value;
    const preco_unitario = document.getElementById('preco_unitario').value;
    const marca_produto = document.getElementById('marca_produto').value;
    const data_cadastro = document.getElementById('data_cadastro').value;
    const data_entrada = document.getElementById('data_entrada').value;

    const dados = { nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada }

    if (editando) {
        await fetch(`http://localhost:3000/produto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }).then(response => response.json())
            .then(data => {
                alert('Item editado com sucesso.')
            }).catch(err => {
                datas.innerHTML = `Erro ao editar! ${err}`
            });

        editando = false;
    } else {
        await fetch('http://localhost:3000/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                alert('Item cadastrado com sucesso.')
            }).catch(err => {
                datas.innerHTML = `Erro ao cadastrar item ${err}`;
            });
    }

    document.getElementById('formulario').reset();
    document.getElementById('id').value = "";
});

// Excluir item
async function excluir(id) {
    const confirmar = confirm('Pretendes eliminar esse item?');

    if (!confirmar) return;

    await fetch(`http://localhost:3000/produto/${id}`, {
        method: 'DELETE'
    })
        .then(info => {
            alert('Item deletado com sucesso.')
        }).catch(err => {
            console.log('Erro ao deletar!', err);
        });
}

// Sair do sistema
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

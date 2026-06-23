const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const usersData = document.getElementById('usersData');

// LÓGICA DO USUÁRIO
async function listarAutoU() {
    const response = await fetch('http://localhost:3000/usuarios');
    const dadosU = await response.json();
    mostrarDadosUsuario(dadosU);
    console.log(dadosU)
}

window.onload = listarAutoU;

// Fução mostrarDados
function mostrarDadosUsuario(listaU) {
    const tabelaU = document.getElementById('usersData');
    tabelaU.innerHTML = '';

    listaU.forEach(users => {
        tabelaU.innerHTML += `
        <tr>
        <td>${users.id}</td>
        <td>${users.nome}</td>
        <td>${users.sobrenome}</td>
        <td>${users.contatos}</td>
        <td>${users.email}</td>
        <td>
            <button onclick='editarU(${JSON.stringify(users)})' class='editar'>Editar</button>
            <button onclick='excluirU(${users.id})' class='excluir'>Excluir</button>
        </td>
        </tr>
        `;
    });
};

// EDITAR E CRIAR USUÁRIO
// Editando item
let editandoU = false;
function editarU(users) {
    document.getElementById('id').value = users.id;
    document.getElementById('nome').value = users.nome;
    document.getElementById('sobrenome').value = users.sobrenome;
    document.getElementById('contatos').value = users.contatos;
    document.getElementById('email').value = users.email;
    document.getElementById('senha').value = users.senha;
    document.getElementById('confirmar_senha').value = users.confirmar_senha;

    editandoU = true;
}

// Editar e Criar no mesmo lugar
document.getElementById('formularioU').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const contatos = document.getElementById('contatos').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmar_senha = document.getElementById('confirmar_senha').value;

    const dadosU = { nome, sobrenome, contatos, email, senha, confirmar_senha }

    // Validando o formulário

    if (senha.value !== confirmar_senha.value) {
        this.showErro(senha, 'Senha e Confirmar senha têm que ser iguais!');
        this.showErro(confirmar_senha, 'Senha e Confirmar senha têm que ser iguais!');
        return;
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
        this.showErro(senha, 'Senha precisa conter entre 6 e 12 caracteres.')
        return;
    }

    if (nome.length < 3 || nome.length > 12) {
        this.showErro(campo, 'Nome do usuário deve conter 3 à 12 caracteres.')
        return;
    }

    if (!nome.match(/^[a-zA-Z]+$/g)) {
        this.showErro(nome, 'Nome do usuário deve conter apenas letras.');
        return;
    }

    // Apresentando o erro na tela
    function showErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('erro-texto');
        campo.insertAdjacentElement('afterend', div);
    }

    showErro;
    
    if (editandoU) {
        await fetch(`http://localhost:3000/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosU)
        }).then(response => response.json())
            .then(data => {
                alert('Usuário editado com sucesso.')
            }).catch(err => {
                datas.innerHTML = `Erro ao editar! ${err}`
            });

        editandoU = false;
    } else {
        await fetch('http://localhost:3000/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosU)
        })
            .then(response => response.json())
            .then(data => {
                alert('Usuário cadastrado com sucesso.')
            }).catch(err => {
                usersData.innerHTML = `Erro ao cadastrar usuário ${err}`;
            });
    }

    document.getElementById('formularioU').reset();
    document.getElementById('id').value = "";
});

// EXCLUIR USUÁRIO
async function excluirU(id) {
    const confirmar = confirm('Pretendes eliminar esse usuário?');

    if (!confirmar) return;

    await fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'DELETE'
    })
        .then(info => {
            alert('Usuário deletado com sucesso.')
        }).catch(err => {
            console.log('Erro ao deletar!', err);
        });
}

// Sair do sistema
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

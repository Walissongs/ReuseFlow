document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Usuário registrado com sucesso!');
    } else {
        alert('Erro ao registrar usuário.');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login realizado com sucesso!');
    } else {
        alert('Erro ao fazer login.');
    }
});

// Exemplo de requisição autenticada
async function fetchUsers() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/api/auth/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const users = await response.json();
            console.log(users);
        } else {
            alert('Erro ao buscar usuários.');
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Erro ao conectar com a API.');
    }
}

// Chame a função fetchUsers() manualmente após garantir que a API está rodando
// fetchUsers();
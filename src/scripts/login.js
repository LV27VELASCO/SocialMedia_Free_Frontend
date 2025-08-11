import { environment } from "../environments/environment";


const usuarioInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// Show loading state
const button = document.getElementById("loginButton");

// Login form submission
document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = usuarioInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (email.length === 0 || password.length === 0) {
            showError("Por favor completa todos los campos");
            return;
        }

        if (!emailRegex.test(email)) {
            showError("Formato de email inválido");
            return;
        }

        if (password < 6) {
            showError("La contraseña debe tener minimo 6 carácteres");
            return;
        }


        const originalText = button.innerHTML;
        button.innerHTML =
            '<span class="flex items-center justify-center space-x-2"><span class="animate-spin">⏳</span><span>Iniciando sesión...</span></span>';
        button.disabled = true;
        try {
            const res = await fetch(`${environment.api}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                console.log(res)
                showError('Usuario o contraseña incorrectos');
                return
            }
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('userName', data.user);

            showSuccess('¡Bienvenido! Redirigiendo a tu panel...');
            setTimeout(() => {
                window.location.href = '/dashboard'; // O tu ruta real
            }, 1500);

        } catch (err) {
            showError("Ocurrió un error, intentarlo mas tarde");
            document.querySelector('.form-glow').style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                document.querySelector('.form-glow').style.animation = '';
            }, 500);
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    });



async function getToken() {
    const res = await fetch(`${environment.api}/token`);

    if (!res.ok) {
        throw new Error('Error al obtener el token');
    }

    const data = await res.json();
    return data.token;  // O la propiedad que te envíe el token
}

document.getElementById("btnResetPw")
    .addEventListener("click", async function (e) {
        e.preventDefault();
        let email = document.getElementById("resetEmail");
        const button = document.querySelector('#btnResetPw');
        const button2 = document.querySelector('#cancelReset');
        const messageEl = document.getElementById('message3');
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="flex items-center justify-center space-x-2"><span class="animate-spin">⏳</span><span>Enviando...</span></span>';
        button.disabled = true;
        button2.disabled = true;


        if (!email.value) {
            messageEl.textContent = "Ingresa email";
            messageEl.className = "text-red-300 text-center text-sm bg-red-500/20 p-4 rounded-xl border border-red-400/30";
            button.innerHTML = originalText;
            button.disabled = false;
            button2.disabled = false;
            email.value = ''
            return
        }

        try {
            const token = await getToken();
            const res = await fetch(`${environment.api}/recovery-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: email.value
                })
            });
            const data = await res.json();
            if (!res.ok) {
                messageEl.textContent = data.message;
                messageEl.className = "text-red-300 text-center text-sm bg-red-500/20 p-4 rounded-xl border border-red-400/30";
                button.innerHTML = originalText;
                button.disabled = false;
                button2.disabled = false;
                email.value = ''
                return;
            }
            // Simulate form processing
            setTimeout(() => {
                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;
                button2.disabled = false;
            }, 2000);
            messageEl.textContent = data.message;
            messageEl.className = "text-green-600 text-center text-sm bg-green-300/20 p-4 rounded-xl";
            button.innerHTML = originalText;
            button.disabled = false;
            button2.disabled = false;
            email.value = ''
            return;
        } catch {
            messageEl.textContent = data.message;
            messageEl.className = "text-red-300 text-center text-sm bg-red-500/20 p-4 rounded-xl border border-red-400/30";
            button.innerHTML = originalText;
            button.disabled = false;
            email.value = ''
            return;
        }


    })
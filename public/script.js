document.addEventListener('DOMContentLoaded', () => {
  const userIcon = document.querySelector('#user-icon');
  const userOption = document.querySelector('#user-option');
  const hamburguer = document.querySelector('#hamburguer');
  const navLinks = document.querySelector('#nav-links');

  // Evento para mostrar/ocultar el dropdown del usuario
  userIcon.addEventListener('click', () => {
    userOption.classList.toggle('show-dropdown');  // Cambia la clase en el contenedor
  });

  // Evento para mostrar/ocultar el menú hamburguesa
  hamburguer.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});

const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");

// js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// js code to appear signup and login form
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");  // Muestra el formulario de registro
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");  // Muestra el formulario de login
});

// Manejar el envío del formulario de login
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (response.ok) {
    alert('Login exitoso');
    window.location.href = '/'; // O la página que desees redirigir después del login
  } else {
    alert(result.message); // Muestra el error si hay alguno
  }
});

// Manejar el envío del formulario de registro
document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

  const name = document.getElementById('name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  });

  const result = await response.json();

  if (response.ok) {
    alert('Registro exitoso');
    window.location.href = '/login'; // O la página de login
  } else {
    alert(result.message); // Muestra el error si hay alguno
  }
});

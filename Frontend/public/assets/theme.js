function cambiarHojaDeEstilo() {
  const stylesheet = document.getElementById('stylesheet');
  if (stylesheet) {
      if (stylesheet.getAttribute('href') === 'assets/bootstrap.min.css') {
          stylesheet.setAttribute('href', 'assets/light_bootstrap.min.css');
          localStorage.setItem('theme', 'light');
      } else {
          stylesheet.setAttribute('href', 'assets/bootstrap.min.css');
          localStorage.setItem('theme', 'default');
      }
  }
}

function aplicarTemaGuardado() {
  const theme = localStorage.getItem('theme');
  const stylesheet = document.getElementById('stylesheet');
  if (stylesheet) {
      if (theme === 'light') {
          stylesheet.setAttribute('href', 'assets/light_bootstrap.min.css');
      } else {
          stylesheet.setAttribute('href', 'assets/bootstrap.min.css');
      }
  }
}

// Llama a esta función al cargar la página
aplicarTemaGuardado();

function cambiarHojaDeEstilo() {
  const stylesheet = document.getElementById('stylesheet');
  if (stylesheet) {
      if (stylesheet.getAttribute('href') === 'assets/bootstrap.min.css') {
          stylesheet.setAttribute('href', 'assets/light_bootstrap.min.css');
      } else {
          stylesheet.setAttribute('href', 'assets/bootstrap.min.css');
      }
  }
}


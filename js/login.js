<!-- ===================== js/login.js ===================== -->
/*
 Demo login: consulta un Google Sheet público con columnas user, pass, nombre.
 Reemplaza SHEET_ID y hoja.
*/
const form = document.getElementById('loginForm');
const statusEl = document.getElementById('loginStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const user = data.get('user');
  const pass = data.get('pass');

  statusEl.textContent = '2Verificando…';

  try {
    const resp = await fetch(`https://opensheet.elk.sh/https://docs.google.com/spreadsheets/d/1_PVAMz08cWlU8hvcvwIRuyMTskB5DT-zwP2nTY5DQd4/edit?usp=drivesdk/ingresos`);
    const rows = await resp.json();
    const found = rows.find(r => r.user === user && r.pass === pass);
    if (found) {
      localStorage.setItem('session', JSON.stringify(found));
      statusEl.textContent = `¡Bienvenido, ${found.nombre}!`;
    } else {
      statusEl.textContent = 'Credenciales incorrectas';
    }
  } catch (err) {
    statusEl.textContent = 'Error de conexión2';
  }
});

/*
Notas:
- Crea tu Google Sheet con columnas user | pass | nombre.
- Compártelo como “Link Anyone can view”.
- Toma el ID del Sheet y reemplaza SHEET_ID.
- opensheet.elk.sh convierte tu Sheet en JSON gratis.
*/

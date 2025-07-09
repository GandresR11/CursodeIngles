/*
 Demo login: consulta un Google Sheet público
 con columnas user | pass | nombre.
*/
const form = document.getElementById('loginForm');
const statusEl = document.getElementById('loginStatus');

// Reemplaza con TU Sheet ID y el nombre de la pestaña
const SHEET_ID   = '1_PVAMz08cWlU8hvcvwIRuyMTskB5DT-zwP2nTY5DQd4';
const SHEET_TAB  = 'ingresos';           // nombre exacto de la pestaña
const SHEET_URL  = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_TAB}`;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const user = data.get('user');
  const pass = data.get('pass');

  statusEl.textContent = 'Verificando…';

  try {
    const resp = await fetch(SHEET_URL);
    if (!resp.ok) throw new Error('Network response not ok');
    const rows = await resp.json();

    const found = rows.find(
      (r) => r.user?.trim() === user && r.pass?.trim() === pass
    );

    if (found) {
      localStorage.setItem('session', JSON.stringify(found));
      statusEl.textContent = `¡Bienvenido, ${found.nombre}!`;
    } else {
      statusEl.textContent = 'Credenciales incorrectas';
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Error de conexión';
  }
});

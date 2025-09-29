(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Carrito ficticio
    const cartCountEl = $('#cartCount');
    const getCount = () => Number(sessionStorage.getItem('cartCount') || '0');
    const setCount = (n) => {
      sessionStorage.setItem('cartCount', String(n));
      if (cartCountEl) cartCountEl.textContent = n;
    };
    setCount(getCount());

    const page = document.body.dataset.page;

    // Inicio: mensaje dinámico
    if (page === 'inicio') {
      const msg = $('#dynamicMessage');
      if (msg) {
        const now = new Date();
        const hours = now.getHours();
        const saludo = hours < 12 ? 'Buenos días' : (hours < 19 ? 'Buenas tardes' : 'Buenas noches');
        const fecha = now.toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' });
        msg.textContent = `${saludo}. Hoy es ${fecha}`;
      }
    }

    // Registro: validaciones personalizadas
    if (page === 'registro') {
      const form = $('#registerForm');
      const terms = $('#termsCheckbox');
      const submitBtn = $('#submitBtn');
      const msg = $('#registerMsg');

      const fields = [
        { id: 'nombre', errorId: 'error-nombre', message: 'Ingresa tu nombre (mínimo 2 caracteres).' },
        { id: 'email', errorId: 'error-email', message: 'Ingresa un correo válido.' },
        { id: 'password', errorId: 'error-password', message: 'La contraseña debe tener al menos 6 caracteres.' },
        { id: 'nacimiento', errorId: 'error-nacimiento', message: 'Selecciona tu fecha de nacimiento.' },
        { id: 'telefono', errorId: 'error-telefono', message: 'Ingresa un teléfono válido (+52 961 123 4567).' }
      ];

      // Activar botón solo si se aceptan términos
      const updateDisabled = () => {
        submitBtn.disabled = !terms.checked;
      };
      terms.addEventListener('change', updateDisabled);
      updateDisabled();

      // Validar campo individual
      const validateField = (field) => {
        const input = $('#' + field.id);
        const error = $('#' + field.errorId);
        if (!input.checkValidity()) {
          error.textContent = field.message;
          return false;
        } else {
          error.textContent = '';
          return true;
        }
      };

      // Validar todos los campos al enviar
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;

        fields.forEach(field => {
          const valid = validateField(field);
          if (!valid) allValid = false;
        });

        if (!terms.checked) {
          msg.textContent = 'Debes aceptar los términos y condiciones.';
          allValid = false;
        } else {
          msg.textContent = '';
        }

        if (allValid) {
          msg.textContent = '✅ Registro enviado correctamente (demostración).';
          form.reset();
          fields.forEach(field => $('#' + field.errorId).textContent = '');
          submitBtn.disabled = true;
        }
      });

      // Validación en tiempo real
      fields.forEach(field => {
        const input = $('#' + field.id);
        input.addEventListener('input', () => validateField(field));
      });
    }

    // Quiénes somos: ver más toggle
    if (page === 'quienes') {
      const btn = $('#verMasBtn');
      const extra = $('#extraInfo');
      if (btn && extra) {
        btn.addEventListener('click', () => {
          const hidden = extra.classList.toggle('hidden');
          btn.textContent = hidden ? 'Ver más' : 'Ocultar';
        });
      }
    }

    // Catálogo: agregar al carrito (ficticio)
    if (page === 'catalogo') {
      const msg = $('#catalogMsg');
      $$('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const n = getCount() + 1;
          setCount(n);
          if (msg) {
            msg.textContent = `Producto agregado. Artículos en carrito: ${n}.`;
            setTimeout(() => msg.textContent = '', 2000);
          }
        });
      });
    }

    // Carrito: recalcular total
    if (page === 'carrito') {
      const table = $('#cartTable');
      const totalEl = $('#cartTotal');

      const recalc = () => {
        let total = 0;
        $$('#cartTable tbody tr').forEach(row => {
          const price = Number(row.dataset.price || '0');
          const qtyInput = $('.qty', row);
          const qty = Math.max(0, Number(qtyInput?.value || '0'));
          const subtotal = price * qty;
          $('.subtotal', row).textContent = subtotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
          total += subtotal;
        });
        if (totalEl) totalEl.innerHTML = `<strong>${total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</strong>`;
      };

      $$('#cartTable .qty').forEach(input => input.addEventListener('input', recalc));
      recalc();
    }

    // Búsqueda: mostrar resultados ficticios
    if (page === 'busqueda') {
      const form = $('#searchForm');
      const results = $('#searchResults');
      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = ($('#q')?.value || '').trim();
        if (!q) return;
        results.innerHTML = `<p><strong>Resultados para la búsqueda de "${q}"</strong></p>
          <ul>
            <li>Audífonos inalámbricos</li>
            <li>Camisa de algodón</li>
            <li>Lámpara de escritorio</li>
            <li>Termo térmico</li>
          </ul>`;
      });
    }
  });
})();
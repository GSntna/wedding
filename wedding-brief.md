# Wedding Website Brief — Gus & Kay
## Invitación de Boda: Gustavo Santana & Karla Newton
**14 de Noviembre, 2026 | Colima, México**

---

## INFORMACIÓN GENERAL

**Pareja:**
- Gustavo Santana (Gus)
- Karla Newton (Kay)

**Evento:**
- Fecha: 14 de noviembre, 2026
- Tipo: Boda grande, cocktail, al aire libre
- Ubicación principal: Hacienda de Chiapa, Colima

**Requisitos generales:**
- Bilingual: Español (default) + Inglés
- Selector de idioma: "ES | EN" en esquina superior derecha de la navbar
- Mobile-first — diseñar primero para móvil, luego escalar a desktop
- Sin RSVP form
- Sin música de fondo
- Sin opciones vegetarianas/veganas
- Sin restricciones especiales para invitados
- Tono: juguetón y cálido, nunca rígido ni excesivamente formal

---

## NAVEGACIÓN

### Comportamiento
- **Antes de scrollear:** Navbar completamente transparente, flotando sobre el Hero
- **Al hacer scroll:** Se transforma en una píldora centrada con fondo `#2c2420` y texto `#fcf2e6`
- Transición suave entre ambos estados (CSS transition)
- Scroll suave (smooth scroll) al hacer clic en cualquier link del menú
- La píldora incluye el selector de idioma "ES | EN" a la derecha

### Links del menú

```
ES:  Ceremonia · Recepción · Nosotros · Viaje · Regalos · FAQ
EN:  Ceremony  · Reception · Us       · Travel · Gifts  · FAQ
```

### Anclas de sección
```
#ceremonia  → Sección Detalles del Evento (Ceremonia)
#recepcion  → Sección Detalles del Evento (Recepción)
#nosotros   → Sección Momentos Nuestros
#viaje      → Sección Viaje & Hospedaje
#regalos    → Sección Registry / Regalos
#faq        → Sección FAQ
```

---

## SISTEMA DE DISEÑO

### Concepto general
La página alterna secciones claras (fondo marfil) y secciones oscuras (fondo café),
creando un ritmo visual al hacer scroll. La tipografía es la misma en ambas.

---

### Estilo A — Secciones claras (1H: Hacienda Cardo)

```
Fondo:                #fcf2e6  — Marfil cálido
Texto principal:      #2c2420  — Café oscuro
Script / acento:      #894431  — Terracota ladrillo
Oro / detalles:       #8B6914  — Oro antiguo
Texto secundario:     #8a7a72  — Café grisáceo
```

Tipografía:
```
Display (headings):   Cardo Bold
Cuerpo (body):        Cardo Italic
Script (nombres):     Great Vibes
```

Separadores: línea de 1px en `#894431` con opacidad 35%

---

### Estilo B — Secciones oscuras (1D: Hacienda Oscura)

```
Fondo:                #2c2420  — Café oscuro
Texto principal:      #fcf2e6  — Marfil
Script / acento:      #c78272  — Rosa terracota suave
Oro / detalles:       #8B6914  — Oro antiguo
Texto secundario:     #c4afa6  — Rosa grisáceo claro
```

Tipografía: misma que Estilo A (Cardo + Great Vibes)

---

### Distribución de estilos por sección

| Sección             | Estilo     | Fondo    |
|---------------------|------------|----------|
| Hero                | A (claro)  | #fcf2e6  |
| Countdown           | B (oscuro) | #2c2420  |
| Momentos Nuestros   | A (claro)  | #fcf2e6  |
| Detalles del Evento | B (oscuro) | #2c2420  |
| Viaje & Hospedaje   | A (claro)  | #fcf2e6  |
| Registry / Regalos  | B (oscuro) | #2c2420  |
| FAQ                 | A (claro)  | #fcf2e6  |
| Footer              | B (oscuro) | #2c2420  |

---

### Fuentes (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap" rel="stylesheet">
```

---

### Botones

**Sobre fondo claro:**
```
Fondo:   #894431  |  Texto: #fcf2e6  |  Hover: #6e3426  |  Border-radius: 4–6px
```

**Sobre fondo oscuro:**
```
Fondo: transparent  |  Borde: 1px solid #fcf2e6 (60% opacity)
Texto: #fcf2e6      |  Hover: background #fcf2e6 (10% opacity)
```

---

### Variables CSS

```css
:root {
  --color-bg-light:         #fcf2e6;
  --color-bg-dark:          #2c2420;
  --color-terracota:        #894431;
  --color-terracota-soft:   #c78272;
  --color-gold:             #8B6914;
  --color-text-dark:        #2c2420;
  --color-text-light:       #fcf2e6;
  --color-text-muted-light: #8a7a72;
  --color-text-muted-dark:  #c4afa6;

  --font-display: 'Cardo', serif;
  --font-body:    'Cardo', serif;
  --font-script:  'Great Vibes', cursive;
}
```

---

### Componente: Fotos Polaroid

Aplicar a todas las fotos de la sección Momentos Nuestros.

```
Marco:        Fondo blanco, padding uniforme arriba y lados (~12px),
              padding inferior más amplio (~40px) para simular la franja Polaroid
Sombra:       Sutil, tipo papel (box-shadow suave)
Rotación:     Cada foto con una rotación aleatoria leve (entre -3deg y +3deg)
              para que se vean naturales, como fotos reales sobre una mesa
Etiqueta:     El nombre de la foto va en la franja inferior del marco,
              en Cardo Italic, tamaño pequeño, color #8a7a72
Hover:        La foto se endereza levemente (rotate: 0deg) con transition suave
```

---

## SECCIONES — CONTENIDO Y ESTRUCTURA

---

### 1. HERO

Fondo: Estilo A — imagen `hero-hacienda.jpg` como fondo
Si la imagen no está disponible: fondo liso `#fcf2e6`

**Animación de entrada (al cargar o refrescar la página):**
- Se reproduce el video `animation-hero.mp4`: cortinas o puertas dibujadas a mano que se abren
- Sin sonido, sin loop, una sola vez
- Al terminar el video, el texto aparece con fade in suave
- Si el usuario tiene `prefers-reduced-motion` activado: omitir el video, mostrar el texto directamente con fade in corto
- Si el archivo de video no está disponible: mostrar el texto directamente con fade in

```
ESPAÑOL:
¡Nos casamos!
Gus y Kay te invitan a celebrar
14 de noviembre, 2026
Hacienda de Chiapa, Colima

INGLÉS:
We're getting married!
Gus and Kay invite you to celebrate
November 14th, 2026
Hacienda de Chiapa, Colima
```

---

### 2. COUNTDOWN

Fondo: Estilo B (oscuro)

Tres cuadros redondeados, centrados:
- Días / Days
- Horas / Hours
- Minutos / Minutes

Cuenta regresiva automática hasta el 14 de noviembre, 2026 a las 16:00 (4:00 PM hora de Colima, UTC-6)

---

### 3. MOMENTOS NUESTROS
Ancla: `#nosotros`
Fondo: Estilo A (claro)

Galería de 6 fotos en marco Polaroid (ver especificación de componente arriba).
Si las fotos no están disponibles: mostrar marcos Polaroid con placeholder gris adentro.

| Archivo       | Etiqueta ES                 | Etiqueta EN                       |
|---------------|-----------------------------|-----------------------------------|
| moments-1.jpg | Nuestras primeras vacaciones| Our first getaway                 |
| moments-2.jpg | El lugar donde todo cambió  | Where everything changed          |
| moments-3.jpg | La propuesta (¡sorpresa!)   | The proposal (surprise!)          |
| moments-4.jpg | Aventureros sin plan        | Adventurers without a plan        |
| moments-5.jpg | Nuestro lugar favorito      | Our happy place                   |
| moments-6.jpg | Una foto que nos hace reír  | A photo that still makes us laugh |

---

### 4. DETALLES DEL EVENTO
Fondo: Estilo B (oscuro)

#### CEREMONIA
Ancla: `#ceremonia`

Encabezado visual: ilustración a mano `illustration-capilla.png`, centrada, antes del texto.
Si el archivo no está disponible: omitir el espacio, mostrar solo el texto.

```
ESPAÑOL:
Ceremonia · 4:00 PM
Capilla del Sagrado Corazón de Jesús
Emiliano Zapata, 28530 Chiapa, Col.
[Botón: Cómo llegar] → https://maps.app.goo.gl/joyzP46fG5rWHTnz9

INGLÉS:
Ceremony · 4:00 PM
Capilla del Sagrado Corazón de Jesús
Emiliano Zapata, 28530 Chiapa, Col.
[Button: Get Directions] → https://maps.app.goo.gl/joyzP46fG5rWHTnz9
```

---

#### RECEPCIÓN
Ancla: `#recepcion`

```
ESPAÑOL:
Recepción · 5:00 PM
Hacienda de Chiapa
28530 Chiapa, Colima
[Botón: Cómo llegar] → https://maps.app.goo.gl/iGm8Wd3z4FKvBzHbA

INGLÉS:
Reception · 5:00 PM
Hacienda de Chiapa
28530 Chiapa, Colima
[Button: Get Directions] → https://maps.app.goo.gl/iGm8Wd3z4FKvBzHbA
```

---

#### DRESS CODE

Encabezado visual: ilustración a mano `illustration-dressCode.png`, centrada, antes del texto.
Si el archivo no está disponible: omitir el espacio, mostrar solo el texto.

```
ESPAÑOL:
Código de vestimenta: Cocktail
Vístete con lo que te haga brillar

INGLÉS:
Dress Code: Cocktail
Wear what makes you shine
```

---

### 5. VIAJE & HOSPEDAJE
Ancla: `#viaje`
Fondo: Estilo A (claro)

#### A. Llegar a Colima
```
ESPAÑOL:
Colima está bien conectada por aire y carretera.
Aquí te compartimos las opciones para llegar.
[PENDIENTE: Información de aeropuertos y tiempos de vuelo]

INGLÉS:
Colima is well connected by air and road.
Here are your travel options.
[PENDING: Airport information and flight times]
```

#### B. Dónde hospedarse
```
ESPAÑOL:
Fiesta Inn Colima — RECOMENDADO
Nuestro hotel preferido para ustedes
A 15 minutos de la Hacienda de Chiapa
[Botón: Reservar con descuento] → https://www.corpo-rate.com/login?groupId=G1WEAC@COL

Otras opciones:
• Hotel Colima
• Grand Hotel Colima
• Casona Boutique Hotel

INGLÉS:
Fiesta Inn Colima — RECOMMENDED
Our preferred hotel for you
15 minutes from Hacienda de Chiapa
[Button: Book with discount] → https://www.corpo-rate.com/login?groupId=G1WEAC@COL

Other options:
• Hotel Colima
• Grand Hotel Colima
• Casona Boutique Hotel
```

#### C. Transporte a la Hacienda
```
ESPAÑOL:
Contaremos con transporte gratis desde Colima a la Hacienda de Chiapa.
Horarios y detalles serán compartidos próximamente.

INGLÉS:
We'll provide free transportation from Colima to Hacienda de Chiapa.
Details will be shared soon.
```

#### D. Qué hacer en Colima
```
ESPAÑOL:
Si llegas con tiempo, aquí hay lugares que no te puedes perder:

Playas Cercanas
Manzanillo y Tecoman ofrecen playas hermosas a menos de 2 horas.

Gastronomía Local
• Santa María, Cocina Colimota — Comida típica de Colima
  https://share.google/aNZuz1rNoNyMsIj3v
• Cronos — Crepas y café
  https://share.google/21mGg0bIePytYXM0b
• Las Jaranas — Chilaquiles colimotes y desayunos
  https://share.google/3QIhgvD2blLcajmcP
• Las Hamacas Del Mayor — Mariscos frescos
  https://share.google/0hIC7hYpxfZEPYsm2
• Chepe Parrilla de Barrio — Carnes a la parrilla
  https://share.google/iTsx06uNLryQkNZlm
• Che Lolo
  https://share.google/nY6Sgy4cOvnbD6WnN

Arte y naturaleza
• Museo Universitario Alejandro Rangel Hidalgo Nogueras — Jardines botánicos y arte
  https://share.google/x7S1m6drt9E5hV5Np

Senderismo
[PENDIENTE: Opciones de rutas]

INGLÉS:
If you arrive early, here are some must-visit places:

Nearby Beaches
Manzanillo and Tecoman offer beautiful beaches less than 2 hours away.

Local Gastronomy
• Santa María, Cocina Colimota — Traditional Colima cuisine
  https://share.google/aNZuz1rNoNyMsIj3v
• Cronos — Crepes and coffee
  https://share.google/21mGg0bIePytYXM0b
• Las Jaranas — Colima-style chilaquiles and breakfast
  https://share.google/3QIhgvD2blLcajmcP
• Las Hamacas Del Mayor — Fresh seafood
  https://share.google/0hIC7hYpxfZEPYsm2
• Chepe Parrilla de Barrio — Grilled meats
  https://share.google/iTsx06uNLryQkNZlm
• Che Lolo
  https://share.google/nY6Sgy4cOvnbD6WnN

Art and nature
• Museo Universitario Alejandro Rangel Hidalgo Nogueras — Botanical gardens and art
  https://share.google/x7S1m6drt9E5hV5Np

Hiking
[PENDING: Trail options]
```

---

### 6. REGISTRY / REGALOS
Ancla: `#regalos`
Fondo: Estilo B (oscuro)

```
ESPAÑOL:
Tu presencia es lo más importante.
Si deseas contribuir con un regalo, aquí está nuestra información bancaria.

[Botón expandible: "Detalles Bancarios"]

Al expandirse, tabla con botón "copiar" por campo:
Nombre de la cuenta: [PENDIENTE]
Banco:               [PENDIENTE]
Número de Cuenta:    [PENDIENTE]
CLABE:               [PENDIENTE]
IBAN:                [PENDIENTE]

INGLÉS:
Your presence is the greatest gift.
If you'd like to contribute with a gift, here's our banking information.

[Expandable button: "Bank Details"]

When expanded, table with copy button per field:
Account Name:   [PENDING]
Bank:           [PENDING]
Account Number: [PENDING]
CLABE:          [PENDING]
IBAN:           [PENDING]
```

---

### 7. FAQ
Ancla: `#faq`
Fondo: Estilo A (claro)

```
ESPAÑOL:

P: ¿Hay estacionamiento en la Hacienda?
R: El espacio es limitado, pero hay estacionamiento disponible en el pueblo.

P: ¿Puedo traer niños?
R: Este evento será sin niños. Esperamos tu comprensión.

P: ¿A qué hora termina la celebración?
R: Aproximadamente a la 1:00 AM.

P: ¿Hay código de colores para los invitados?
[PENDIENTE]

P: ¿Qué tan formal es el "cocktail"?
[PENDIENTE]

P: ¿Hay protocolo especial durante la ceremonia?
[PENDIENTE]

P: ¿Se puede llevar invitados plus one?
[PENDIENTE]

P: ¿Cuál es el deadline para confirmar asistencia?
[PENDIENTE]

P: ¿Habrá música/banda/DJ durante la recepción?
[PENDIENTE]

P: ¿Hay algo que NO debemos hacer/traer?
[PENDIENTE]

INGLÉS:

Q: Is there parking at the Hacienda?
A: Space is limited, but parking is available in town.

Q: Can I bring children?
A: This will be an adult-only celebration. We appreciate your understanding.

Q: What time does the celebration end?
A: Approximately 1:00 AM.

Q: Is there a color code for guests?
[PENDING]

Q: How formal is "cocktail"?
[PENDING]

Q: Is there special protocol during the ceremony?
[PENDING]

Q: Can I bring a plus one?
[PENDING]

Q: What's the deadline to confirm attendance?
[PENDING]

Q: Will there be music/band/DJ during the reception?
[PENDING]

Q: Is there anything we shouldn't do/bring?
[PENDING]
```

---

### 8. FOOTER
Fondo: Estilo B (oscuro)
Sin información de contacto.

```
ESPAÑOL:
[PENDIENTE: Mensaje de cierre corto y cálido]

INGLÉS:
[PENDING: Short and warm closing message]
```

---

## ARCHIVOS DE IMAGEN Y RECURSOS

Todos los archivos van en la carpeta `/public` o `/assets` según el framework.
Si un archivo no está disponible al momento de construir: usar placeholder o espacio vacío según se indica en cada sección. No bloquear el build.

```
FOTOGRAFÍAS
hero-hacienda.jpg       → Imagen de fondo del Hero (también usada en Open Graph)
moments-1.jpg           → Galería: Nuestras primeras vacaciones
moments-2.jpg           → Galería: El lugar donde todo cambió
moments-3.jpg           → Galería: La propuesta
moments-4.jpg           → Galería: Aventureros sin plan
moments-5.jpg           → Galería: Nuestro lugar favorito
moments-6.jpg           → Galería: Una foto que nos hace reír

ILUSTRACIONES (dibujadas a mano, fondo transparente)
illustration-capilla.png    → Encabeza la sección Ceremonia
illustration-dressCode.png  → Encabeza la sección Dress Code

VIDEO
animation-hero.mp4      → Cortinas o puertas abriéndose, sin sonido, sin loop
```

---

## METADATOS Y SEO

### Título de la página (browser tab)
```
Gus & Kay · 14.11.2026
```

### Favicon
```
Texto: "G & K"
Implementar como SVG favicon inline en el <head>
Fondo: #2c2420  |  Texto: #fcf2e6  |  Fuente: Cardo
```

### Open Graph (vista previa al compartir en WhatsApp, iMessage, redes)
```html
<meta property="og:title"       content="Gus & Kay · 14.11.2026" />
<meta property="og:description" content="Nos casamos el 14 de noviembre de 2026 en la Hacienda de Chiapa, Colima" />
<meta property="og:image"       content="/hero-hacienda.jpg" />
<meta property="og:type"        content="website" />
```

---

## CONFIGURACIÓN TÉCNICA

```
Diseño:           Mobile-first — construir para móvil primero, escalar a desktop
CSS Framework:    Tailwind CSS
Bilingual:        Español (default) + Inglés, sin recarga de página
Scroll:           Smooth scroll en todos los anchor links
Animaciones:      Respetar prefers-reduced-motion:
                  Si está activo → omitir video Hero, mostrar texto con fade corto
Sin música:       ✓
Sin RSVP form:    ✓
Imágenes:         Optimizar a WebP o JPG comprimido (<300KB por foto) antes de subir
```

---

## PENDIENTES DE CONTENIDO

- [ ] Información de aeropuertos y tiempos de vuelo a Colima
- [ ] Opciones de senderismo en Colima
- [ ] Datos bancarios (Nombre, Banco, Número de cuenta, CLABE, IBAN)
- [ ] Mensaje de cierre para el footer
- [ ] FAQ: responder las preguntas marcadas como PENDIENTE

---

## NOTAS PARA CLAUDE CODE

- Respetar la alternancia clara/oscura por sección según la tabla de distribución
- Navbar transparente → píldora al scrollear, con transición suave
- Las fotos de Momentos van en marco Polaroid con rotación leve y etiqueta en la franja inferior
- Las ilustraciones a mano van centradas como encabezado visual antes del texto en su sección
- Si cualquier imagen/video no existe: degradar con gracia (placeholder o espacio), nunca romper el layout
- No asumir respuestas para contenido marcado como PENDIENTE — dejar placeholders visibles
- Favicon SVG inline con "G & K"
- Open Graph apunta a hero-hacienda.jpg

---

**Versión:** 4.0 — Lista para Claude Code
**Fecha de actualización:** Junio 2026

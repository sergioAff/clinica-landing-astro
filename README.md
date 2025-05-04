# MenteSana - Sitio Web para Servicios Psicológicos

Sitio web profesional y minimalista para una clínica de psicología, construido con Astro, React y Tailwind CSS.

![MenteSana Preview](public/img/social-image.jpg)

## 🧠 Características

- Diseño minimalista y profesional orientado a servicios psicológicos
- Completamente responsivo para todos los dispositivos
- Modo oscuro/claro
- Reserva de citas online
- Optimización SEO avanzada
- Chatbot básico para preguntas frecuentes
- Recursos descargables para pacientes
- Rendimiento optimizado (Google Lighthouse >90)
- Accesibilidad mejorada (WCAG AA)

## 🚀 Estructura del Proyecto

```text
/
├── public/             # Activos estáticos
│   ├── img/            # Imágenes
│   ├── resources/      # Recursos descargables (PDFs, audios)
│   ├── robots.txt      # Configuración para crawlers
│   └── sitemap.xml     # Sitemap para SEO
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── Header/     # Componentes del encabezado
│   │   ├── Main/       # Componentes principales
│   │   ├── Footer/     # Componentes del pie de página
│   │   └── react/      # Componentes React
│   ├── layouts/        # Plantillas de página
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro # Página principal
│   │   ├── blog.astro  # Blog
│   │   └── cita.astro  # Reserva de citas
│   └── styles/         # Estilos globales
└── scripts/            # Scripts de utilidad
    └── optimize-images.js # Optimizador de imágenes
```

## 🛠️ Tecnologías utilizadas

- [Astro](https://astro.build/) - Framework web con enfoque en rendimiento
- [React](https://reactjs.org/) - Para componentes interactivos
- [TailwindCSS](https://tailwindcss.com/) - Framework de CSS utilitario
- [Framer Motion](https://www.framer.com/motion/) - Animaciones fluidas
- [Lucide Icons](https://lucide.dev/) - Iconos SVG

## 🧞 Comandos

| Comando                   | Acción                                              |
| :------------------------ | :-------------------------------------------------- |
| `npm install`             | Instala dependencias                                |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321`   |
| `npm run build`           | Construye el sitio para producción en `./dist/`     |
| `npm run preview`         | Vista previa de la build en local                   |
| `npm run optimize-images` | Optimiza y convierte imágenes a WebP                |

## 🖥️ Configuración del entorno de desarrollo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/clinica-landing-astro.git
   cd clinica-landing-astro
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📝 Guía de personalización

### Cambiar información de contacto

Edita los archivos en `src/components/Footer/` y `src/components/Main/Contact.astro` para actualizar información de contacto.

### Modificar servicios

Edita el archivo `src/components/Main/Services.astro` para actualizar la lista de servicios ofrecidos.

### Configurar el formulario de citas

El formulario en `src/components/Main/Appointment.astro` puede conectarse a tu propia API. Actualiza la URL en el atributo `action` del formulario.

### Personalizar el Chatbot

Edita las preguntas frecuentes y respuestas en `src/components/react/ChatBot.jsx`.

## 🌐 SEO y Rendimiento

- El sitio incluye metadatos Schema.org específicos para servicios médicos/psicológicos
- Todos los elementos incluyen metadatos para compartir en redes sociales (OpenGraph, Twitter)
- Sitemap XML completo y archivo robots.txt optimizado
- Imágenes responsivas y carga optimizada
- Carga perezosa (lazy loading) para contenido fuera de la pantalla

## 📦 Deployment

El sitio puede desplegarse en cualquier plataforma compatible con Astro:

- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [GitHub Pages](https://pages.github.com)
- Cualquier servidor que pueda servir archivos estáticos

Para desplegar el sitio, ejecuta `npm run build` y sube el contenido de la carpeta `dist/` a tu servidor.

## 🔍 Herramientas de desarrollo

- Asegúrate de que todas las imágenes tengan textos alternativos para accesibilidad
- Ejecuta `npm run optimize-images` para convertir y optimizar automáticamente las imágenes
- Revisa la accesibilidad con herramientas como Lighthouse o WAVE
- Para mantenimiento, utiliza la página `public/mantenimiento.html`

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

---

Creado con ❤️ para proporcionar una experiencia web profesional y accesible para servicios psicológicos.

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# 🌐 GlassGo Frontend

This repository contains the **Web Frontend Application** of **GlassGo**, a modular service management platform developed by **RPG Startup** as part of the course  
🧩 *1ASI0730 – Aplicaciones Web* at **Universidad Peruana de Ciencias Aplicadas (UPC)**.

---

## 🧱 Tech Stack
- ⚡ **Vue 3 + Vite + Composition API**
- 🎨 **PrimeVue (Material preset)** + PrimeFlex + PrimeIcons
- 🧭 **Vue Router** for navigation
- 🧠 **Pinia** for state management
- 🌍 **Vue I18n** (EN 🇬🇧 default, ES 🇪🇸 available)
- 🔗 **Axios** — HTTP client integrated with JSON Server
- 🧰 **JSON Server** — local API for mock data

---

## ⚙️ Project Structure

```
── glassgo-frontend/
  ├─ public/                              # Static public assets served directly by Vite
  │ └─ icon-glassgo.png                   # Website favicon (appears in the browser tab)
  │
  ├─ server/                              # Local mock API (powered by JSON Server)
  │ ├─ db.json                            # Fake database with sample entities (users, products, etc.)
  │ └─ routes.json                        # Custom route mappings (e.g., /api/users → /users)
  │
  ├─ src/                                 # Core application source code
  │ ├─ assets/                            # Internal static resources (images, fonts, global styles)
  │ │ └─ logo-glassgo.jpg                 # Official logo displayed in the sidebar
  │ │
  │ ├─ locales/                           # Translation dictionaries for i18n
  │ │ ├─ en.json                          # English (default language)
  │ │ └─ es.json                          # Spanish translation
  │ │
  │ ├─ shared/                            # Cross-cutting shared layer (following DDD principles)
  │ │ ├─ infrastructure/                  # Handles external communication and API access
  │ │ │ ├─ base-endpoint.js               # Centralized file defining the base API URL (e.g., JSON Server or production endpoint)
  │ │ │ └─ http-client.js                 # Axios client instance configured with headers, base URL, and optional interceptors
  │ │ │
  │ │ └─ presentation/                    # Global UI layer (layouts and common views)
  │ │   ├─ components/                    # Reusable components
  │ │   │ └─ layout/                      # Structural layout components
  │ │   │   ├─ app-shell.vue              # Main layout container (Sidebar + Topbar + RouterView + Footer)
  │ │   │   ├─ footer-content.vue         # Global footer with project credits
  │ │   │   ├─ sidebar.vue                # Left-side navigation menu (Home, Modules, etc.)
  │ │   │   └─ topbar.vue                 # Top navigation bar (language switch, user info)
  │ │   │ 
  │ │   └─ views/                         # Application views rendered inside the layout
  │ │     ├─ coming-soon.vue              # Temporary page for modules under development
  │ │     ├─ home.vue                     # Main welcome page (GlassGo introduction)
  │ │     └─ page-not-found.vue           # Custom 404 error page (with animation)
  │ │
  │ ├─ stores/                            # Global state management (Pinia)
  │ │ └─ user.store.js                    # Example store handling user session and profile
  │ │
  │ ├─ App.vue                            # Root Vue component (mounting point for router-view)
  │ ├─ i18n.js                            # Global internationalization setup (EN/ES)
  │ ├─ main.js                            # Application entry point (bootstraps Vue, Router, Pinia, i18n)
  │ ├─ pinia.js                           # Global Pinia store instance
  │ ├─ router.js                          # Routing configuration and navigation hierarchy
  │ └─ style.css                          # Global base styles (reset, typography, layout)
  │
  ├─ .gitignore                           # Defines which files/folders Git should ignore
  ├─ CONTRIBUTING.md                      # Contribution guidelines (branches, commits, PR process)
  ├─ index.html                           # Main HTML file where the Vue app is mounted
  ├─ LICENSE                              # MIT License for open use with attribution
  ├─ package.explained.jsonc              # Commented version of package.json (for internal documentation)
  ├─ package.json                         # Project metadata, dependencies, and npm scripts
  ├─ README.md                            # Main repository documentation
  └─ vite.config.js                       # Vite configuration file (plugins, aliases, environment setup)
```

---

## 🚀 Run Locally

```bash
# Install dependencies
npm install

# Start mock API
npm run server

# Start development environment
npm run dev
```

**URLs**
- Frontend → `http://localhost:5173`
- Mock API → `http://localhost:3000`

---

## 🌿 Branching Model (GitFlow)

| Branch | Description |
|:--|:--|
| `main` | Stable production branch |
| `develop` | Active development branch |
| `feature/*` | Module or feature branches |

> See [CONTRIBUTING.md](./CONTRIBUTING.md) for full collaboration and commit guidelines.

---

## 🧠 License

Licensed under the [MIT License](./LICENSE) © 2025 **RPG-Aplicaciones-Web-1ASI0730-2520-7469**.

---

## 👥 Authors — RPG Startup Team

| Name | ID |
|:--|:--|
| Ever Giusephi Carlos Lavado | u202224867 |
| Gerardo Valentín Palacín Lazo | u20211C201 |
| Guillermo Arturo Howard Robles | u202222275 |
| Abraam Bernabe Acosta Elera | u202219199 |
| David Ignacio Vivar Cesar | u202414424 |
| Mike Dylan Guillen Giraldo | u202211881 |

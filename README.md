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
  │ ├─ iam/                               # Identity and Access Management (authentication & authorization)
  │ │ ├─ application/                     # Auth-related services and commands
  │ │ ├─ domain/                          # Core identity and role entities
  │ │ │ └─ model/                         # User and credential domain models
  │ │ ├─ infrastructure/                  # API connections and persistence for auth
  │ │ └─ presentation/                    # UI for login, registration, and access control
  │ │   ├─ components/                    # Authentication-related UI components
  │ │   └─ views/                         # Login and account management views
  │ │
  │ ├─ profiles/                          # User Profiles and Preferences
  │ │ ├─ application/                     # Application logic for user configuration
  │ │ ├─ domain/                          # Entities for user settings and preferences
  │ │ │ └─ model/                         # Profile and preference domain models
  │ │ ├─ infrastructure/                  # Data persistence for profile configuration
  │ │ └─ presentation/                    # UI for editing user profile and settings
  │ │   ├─ components/                    # Profile and preference interface components
  │ │   └─ views/                         # Profile management main views
  │ │
  │ ├─ modules/                           # Core business modules following DDD architecture
  │ │ ├─ dashboard-analytics/             # Handles KPIs, business metrics, and analytics dashboards
  │ │ │ ├─ application/                   # Application logic and service orchestration
  │ │ │ ├─ domain/                        # Business rules and domain entities
  │ │ │ │ └─ model/                       # Domain models for analytics and metrics
  │ │ │ ├─ infrastructure/                # Data access and external service adapters
  │ │ │ └─ presentation/                  # UI layer for analytics visualization
  │ │ │   ├─ components/                  # Reusable dashboard components
  │ │ │   ├─ views/                       # Main views for dashboard visualization
  │ │ │   └─ routes.js                    # Routing configuration for dashboard module
  │ │ │
  │ │ ├─ identity-access/                 # Manages authentication, roles, and user access control
  │ │ │ ├─ application/                   # Auth-related services and commands
  │ │ │ ├─ domain/                        # Core identity and role entities
  │ │ │ │ └─ model/                       # User and credential domain models
  │ │ │ ├─ infrastructure/                # API connections and persistence for auth
  │ │ │ └─ presentation/                  # UI for login, registration, and access control
  │ │ │   ├─ components/                  # Authentication-related UI components
  │ │ │   ├─ views/                       # Login and account management views
  │ │ │   └─ routes.js                    # Routes for identity and access module
  │ │ │
  │ │ ├─ loyalty-engagement/              # Manages customer loyalty and engagement programs
  │ │ │ ├─ application/                   # Logic for rewards and point management
  │ │ │ ├─ domain/                        # Loyalty domain rules and entities
  │ │ │ │ └─ model/                       # Reward and customer engagement models
  │ │ │ ├─ infrastructure/                # API connectors for loyalty data
  │ │ │ └─ presentation/                  # UI for loyalty tracking and gamification
  │ │ │   ├─ components/                  # Loyalty interface components
  │ │ │   ├─ views/                       # Main loyalty and engagement views
  │ │ │   └─ routes.js                    # Routes for loyalty module
  │ │ │
  │ │ ├─ payments-subscriptions/          # Handles payments, billing, and subscription plans
  │ │ │ ├─ application/                   # Business logic and service layer for handling payment and renewal processes
  │ │ │ │ └─ payment.service.js           # Implements core functions for initiating, processing, and verifying payments
  │ │ │ │
  │ │ │ ├─ domain/                        # Defines core business entities and rules for payments and subscriptions
  │ │ │ │ └─ model/                       # Domain models representing payment and subscription data structures
  │ │ │ │   ├─ payment.entity.js          # Represents a payment entity with attributes like amount, status, and method
  │ │ │ │   └─ subscription.entity.js     # Represents a subscription entity including plan, cycle, and renewal details
  │ │ │ │
  │ │ │ ├─ infrastructure/                # Handles integration with external payment gateways and APIs
  │ │ │ │ └─ payments-api.js              # Defines API calls for creating transactions, fetching invoices, and validating payments
  │ │ │ │
  │ │ │ └─ presentation/                  # User interface layer for visualizing and managing payment and subscription data
  │ │ │   ├─ components/                  # Reusable UI components for payment and subscription sections
  │ │ │   │ ├─ payment-card.vue           # Displays individual payment details and transaction summaries
  │ │ │   │ └─ subscription-card.vue      # Displays user subscription info, renewal dates, and plan details
  │ │ │   │
  │ │ │   ├─ views/                       # Main pages for interacting with payment and subscription modules
  │ │ │   │ ├─ payments-view-admin.vue    # View for administrators to monitor and manage all transactions
  │ │ │   │ ├─ payments-view-distributor  # View for distributors to manage their own subscription and billing data
  │ │ │   │ └─ payments-view-owner        # View for business owners to review their payment history and active plans
  │ │ │   │
  │ │ │   └─ routes.js                    # Defines navigation routes and paths for the payments-subscriptions module
  │ │ ├─ profiles-preferences/            # Handles user profiles and system preferences
  │ │ │ ├─ application/                   # Application logic for user configuration
  │ │ │ ├─ domain/                        # Entities for user settings and preferences
  │ │ │ │ └─ model/                       # Profile and preference domain models
  │ │ │ ├─ infrastructure/                # Data persistence for profile configuration
  │ │ │ └─ presentation/                  # UI for editing user profile and settings
  │ │ │   ├─ components/                  # Profile and preference interface components
  │ │ │   ├─ views/                       # Profile management main views
  │ │ │   └─ routes.js                    # Routes for profile module
  │ │ │
  │ │ ├─ service-execution/               # Tracks delivery and service execution in real time
  │ │ │ ├─ application/                   # Business logic for service workflows
  │ │ │ ├─ domain/                        # Domain entities for service operations
  │ │ │ │ └─ model/                       # Models for execution, delivery, and tracking
  │ │ │ ├─ infrastructure/                # API and IoT data connections
  │ │ │ └─ presentation/                  # UI for service tracking and monitoring
  │ │ │   ├─ components/                  # Execution and tracking components
  │ │ │   ├─ views/                       # Monitoring and control views
  │ │ │   └─ routes.js                    # Routes for execution module
  │ │ │
  │ │ ├─ service-planning/                # Supports planning, scheduling, and logistics
  │ │ │ ├─ application/                   # Logic for creating and assigning routes
  │ │ │ ├─ domain/                        # Domain rules for route and schedule planning
  │ │ │ │ └─ model/                       # Models for planning and scheduling entities
  │ │ │ ├─ infrastructure/                # Data adapters for logistics operations
  │ │ │ └─ presentation/                  # UI for service and delivery planning
  │ │ │   ├─ components/                  # Planning UI elements
  │ │ │   ├─ views/                       # Main planning and scheduling views
  │ │ │   └─ routes.js                    # Routes for planning module
  │ │ │
  │ │ └─ system-administration/           # Manages platform configuration and administration
  │ │   ├─ application/                   # System configuration logic and services
  │ │   ├─ domain/                        # Core admin and configuration entities
  │ │   │ └─ model/                       # Models for system settings and admin roles
  │ │   ├─ infrastructure/                # Persistence and admin API integrations
  │ │   └─ presentation/                  # UI for system and user administration
  │ │     ├─ components/                  # Admin-related UI components
  │ │     ├─ views/                       # Administration dashboard views
  │ │     └─ routes.js                    # Routes for administration module
  │ │
  │ ├─ shared/                            # Cross-cutting shared layer (following DDD principles)
  │ │ ├─ application/                     # Shared stores, global states, and application-level logic
  │ │ │ └─ language.store.js              # (Optional) Global store to manage language and localization state
  │ │ │
  │ │ ├─ config/                          # Shared configuration files
  │ │ │ └─ demo-user.js                   # Temporary configuration for demo/testing user (used to simulate login context)
  │ │ │  
  │ │ ├─ infrastructure/                  # Handles external communication and API access
  │ │ │ ├─ base-endpoint.js               # Centralized file defining the base API URL (e.g., JSON Server or production endpoint)
  │ │ │ └─ http-client.js                 # Axios client instance configured with headers, base URL, and optional interceptors
  │ │ │
  │ │ └─ presentation/                    # Global UI layer (layouts and common views)
  │ │   ├─ components/                    # Reusable components
  │ │   │ ├─ layout/                      # Structural layout components
  │ │   │ │ ├─ app-shell.vue              # Main layout container (Sidebar + Topbar + RouterView + Footer)
  │ │   │ │ ├─ footer-content.vue         # Global footer with project credits
  │ │   │ │ ├─ sidebar.vue                # Left-side navigation menu (Home, Modules, etc.)
  │ │   │ │ └─ topbar.vue                 # Top navigation bar (language switch, user info)
  │ │   │ │
  │ │   │ └─ ui/                          # General-purpose UI utilities and indicators
  │ │   │   ├─ connection-status.vue      # Displays the current network connection status (online/offline)  
  │ │   │   └─ lang-switch.vue            # Global language selector component (EN/ES) synchronized with the language store 
  │ │   │ 
  │ │   └─ views/                         # Application views rendered inside the layout shell
  │ │     ├─ home/                        # Role-based home dashboards
  │ │     │ ├─ home.vue                     # Main welcome page (GlassGo introduction)
  │ │     │ ├─ home-admin.vue             # Admin dashboard (global system metrics and user distribution)
  │ │     │ ├─ home-business-owner.vue    # Business Owner dashboard (orders, subscriptions, and loyalty points)
  │ │     │ ├─ home-carrier.vue           # Carrier dashboard (routes, deliveries, and daily performance)
  │ │     │ └─ home-distributor.vue       # Distributor dashboard (orders, stock, and upcoming events)
  │ │     │
  │ │     ├─ coming-soon.vue              # Temporary page for modules under development
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
### 🧭 Notes
- 📁 Each **bounded context** under `/modules` follows a **Domain-Driven Design (DDD)** structure (`application`, `domain`, `infrastructure`, `presentation`).
- 🧩 The **shared layer** acts as a **cross-cutting context**, providing reusable utilities, components, and configuration across all domains.
- 🌍 The `/server` folder simulates a RESTful backend via **JSON Server**, accessible at `http://localhost:3000/api`.
- 🧠 Global state is handled by **Pinia**, located in `/stores`, while module-specific stores reside under their respective `application/` folders.
- 🌐 **i18n** dictionaries (`en.json`, `es.json`) and the `language.store.js` ensure full bilingual UI support.
- 🎨 Layout components (`Topbar`, `Sidebar`, `Footer`) define the global frame for all in-app routes.

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

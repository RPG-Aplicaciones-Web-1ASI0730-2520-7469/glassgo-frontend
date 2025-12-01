# 🤝 Contributing Guidelines – GlassGo Frontend

**Internal collaboration guide for the RPG Startup team developing GlassGo Frontend.**  
Defines standards for version control, commits, workflow, and structure.

---

## 🌿 Branching Model — GitFlow

| Branch | Purpose |
|:--|:--|
| **main** | Stable and production-ready branch. |
| **develop** | Integration branch for active development. |
| **feature/** | One per module or bounded context (e.g., `feature/iam`, `feature/profiles`). |
| **release/** | Temporary pre-release branches (TB1, TP1, TB2, TF1). |
| **hotfix/** | Emergency fixes for `main`. |

---

## 💬 Commit Convention (Conventional Commits)

| Type | Description |
|:--|:--|
| `feat:` | Adds a new feature or component. |
| `fix:` | Solves a bug or logic issue. |
| `style:` | UI or CSS adjustment. |
| `refactor:` | Code restructuring (no functional changes). |
| `chore:` | Config or dependency updates. |
| `docs:` | Documentation or inline comments. |

**Examples**
```bash
feat: add floating notification in home view
fix: correct topbar alignment and spacing
style: improve sidebar background color
refactor: centralize http-client configuration
chore: install json-server v1.0.0-beta.3
docs: update contributing and README with new structure
```

---

## 🔄 Workflow for Contributions

1. **Sync the latest version**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/<context-or-module>
   git push -u origin feature/<context-or-module>
   ```

3. **Commit following Conventional Commits**
    - Keep messages short, in English, and descriptive.


4. **Push changes regularly**
    - You can push directly to your feature branch
    - Avoid pushing to `main` or `develop` unless merging stable updates.

---

### Commands
```bash
npm install        # Install dependencies
npm run server     # Start mock API (http://localhost:3000)
npm run dev        # Start frontend (http://localhost:5173)
```

---

## 🧹 Code Standards

- Use **English** for commits, branches, and filenames.
- Components: `PascalCase` → `Topbar.vue`
- Files: `kebab-case` → `router.js`
- Branches: `feature/<module-name>`

---

## 🧩 Deliverable Versions

| Version | Delivery | Description |
|:--|:--|:--|
| `v1.0.0` | TB1 | Base architecture (layout + routing) |
| `v1.1.0` | TP1 | UI modules and core logic |
| `v1.2.0` | TB2 | Integration and shared store setup |
| `v2.0.0` | TF1 | Final product and deployment |

---

## 📬 Team Contact

**RPG Startup – GlassGo Project**  
University: *UPC – Aplicaciones Web (1ASI0730 – 2520 – 7469)*  
© 2025 GlassGo. All rights reserved.

# 🚀 Portfolio Frontend Project Documentation

Interactive portfolio application (frontend) built using **React + Vite**. The documentation contains a description of the technology stack, local configuration, build commands, and key functionalities.

---

## ✨ Key Features and Technologies

* **Description:** Portfolio with an account panel, skills list, applications list, and contact section. The application fetches data from the backend via a REST API (paths starting with `/apiv2/`).
* **Purpose:** Presentation of skills.

### 🛠️ Technology Stack

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Framework** | **Vite + React 19** | Uses functional components and **React Router**. |
| **Language** | **TypeScript / TSX** | Ensures strong typing and code quality. |
| **Style** | **Tailwind CSS** | Utility-first framework for fast styling. |
| **Internationalization (i18n)** | **`react-i18next`** | Supports multiple languages with translation files in `src/languages`. |
| **Build Tool** | **Vite** | Used for fast development and production version optimization. |

---

## ⚙️ Local Project Configuration

### 📥 Prerequisites
* **Node.js** (Recommended: v18+ LTS)
* **npm** or **yarn**
* **Backend API** must be running and available (See: [Backend Repository](https://github.com/szlukasz12/Portfolio_backend)).

### 🚀 Installation and Configuration

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/szlukasz12/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn
    ```

3.  **Run in Development Mode:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at: `http://localhost:5173`.

---

## 🏗️ Build Commands

The project uses Vite to create final assets.

| Command | Output Directory | Description |
| :--- | :--- | :--- |
| `npm run build:test` | `test/` | Builds the application for the testing environment. |
| `npm run build:prod` | `prod/` | Builds the optimized application for the production environment. |

### Configuration Notes

* The Frontend **does not use a dedicated `.env` file** for API configuration.
* API calls are made using **relative paths** (e.g., `/apiv2/...`).
* **For production hosting**, configuring a **reverse proxy** or similar server configuration is necessary for these relative paths to correctly forward requests to the running backend API.

---

## 🔑 Authorization and Resources

### API Endpoints
The full list of REST API endpoints is documented in the dedicated backend repository: [Backend API Documentation](https://github.com/szlukasz12/Portfolio_backend).

* **Note regarding Authorization:** The Frontend uses a **JWT token** stored in **`localStorage`** under the keys **`token`** and **`login`**.

### Localization and Static Assets
* **Translation files** are located in `src/languages/` (`pl.json`, `en.json`).
* **Static assets** (images `png`, `svg`) are available from the root directory (e.g., `/png/<nazwa>.png`, `/svg/`).

---

## 👨‍💻 Author

* **Name and Surname:** [Łukasz Szostek]

---

## 📜 License

The project is released under the **MIT License**.
# 🏗️ AiDirectory

AiDirectory is a modern web application built with **Next.js**, **TypeScript**, **Redux Toolkit Query**, **React Hook Form**, and **Zod** for validation.  

---

## 🚀 Features
- 🔑 **Authentication** (Login / Register) with form validation
- ⚡ **RTK Query** for API calls
- ✅ **Zod** schema validation
- 🎨 **Dynamic Form UI** (Reusable form fields)
- 🌍 Environment variable support
- 📦 Optimized build with Next.js

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14+
- **Language:** TypeScript
- **State Management:** Redux Toolkit + RTK Query
- **Forms & Validation:** React Hook Form + Zod
- **Styling:** TailwindCSS + Ant Design
- **Animations:** Framer Motion

---

## 📂 Project Structure
.
├── features/ # Redux slices & API services
├── lib/ # Validators, helpers, configs
├── components/ # UI Components (DynamicForm, Buttons, etc.)
├── pages/ # Next.js Pages
├── public/ # Static assets
├── .env.local # Environment variables
└── README.md

yaml
Copy code

---

## ⚙️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aidirectory.git
   cd aidirectory
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Create a .env.local file in the root and add your environment variables:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000
Run the development server:

bash
Copy code
npm run dev
Open http://localhost:3000 to see the app.

🧪 Testing
We use Jest for unit and integration tests.

Run tests with:

bash
Copy code
npm run test
📦 Build
Create an optimized production build:

bash
Copy code
npm run build
npm run start
🤝 Contributing
Contributions are welcome! Please fork this repo and submit a pull request.

📜 License
This project is licensed under the MIT License.

yaml
Copy code

---

👉 Do you want me to also add **badges** (like build status, license, npm version, etc.) at the top of the README to make it look more professional?


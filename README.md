<h1>Happy House</h1> 
modern e-commerce-style web platform built with React (Vite + TypeScript), Supabase, and TailwindCSS.
The app allows users to browse products, view 3D models, and access AR features (exclusive for Pro members).

🚀 Features

🔐 Authentication with Supabase (Email/Password, OAuth, etc.)

📦 Product Catalog with details (name, description, price, vendor, images, specs)

🎨 3D Model Viewer for immersive product experience

📱 AR Mode (Pro Members only)

💳 Upgrade to Pro button → redirects to subscription/payment page

🛠️ Clean folder structure with modular hooks, components, and pages

📂 Project Structure
```sh
desify-hub/
├── public/               # Static assets
├── src/  
│   ├── assets/           # Images, icons
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks (auth, toast, mobile)
│   ├── pages/            # Page components (Home, Products, Details, Contact, etc.)
│   ├── lib/              # Utility functions
│   ├── integrations/     # Future third-party integrations
│   ├── App.tsx           # Root app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── supabase/             # Supabase config & types
├── .env                  # Environment variables
├── package.json          # Dependencies & scripts
└── README.md             # Project documentation
```

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

  🔑 Authentication

Users can sign up/login using Supabase.

Free users → Access to products & 3D models.

Pro users → Access to AR features.

🖼️ Product Display

Products are fetched from Supabase.

model_url field is used to render 3D models.

AR button is conditionally shown only if the user has Pro membership.

💳 Upgrade to Pro

A “Upgrade to Pro” button redirects users to the payment/subscription page.

Once upgraded, AR features are unlocked.

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

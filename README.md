# ✨ Personal Developer Portfolio

A premium, highly interactive, and visually stunning Developer Portfolio built using React, Vite, Three.js, and GSAP. Featuring sleek dark-mode glassmorphism, scroll-driven animations, custom interactive elements, and a fully-responsive design.

---

## 🌟 Key Features

*   **🖥️ Interactive Scene Canvas:** Includes a responsive interactive Laptop/Scene model rendered with Three.js (React Three Fiber) that grounds the landing experience.
*   **🧲 Magnetic Hover Effect:** Project cards in the Featured Projects section track the cursor dynamically inside their bounds and spring back with an elastic ease on mouseleave. (Disabled on touch devices for mobile friendliness).
*   **📜 Scroll-Driven Timeline:** An interactive timeline with a center connector that dynamically "draws" downwards as you scroll, revealing items with a clean, straight-line staggered slide-in animation.
*   **🔄 Step-by-Step Image Slideshows:** Multi-screenshot project carousels that display images with a **3-second pause** before smoothly sliding (`ease-in-out`) to the next image. Hovering over a carousel pauses the rotation.
*   **🎨 Premium Glassmorphic UI:** A tailored gold-accented color palette (`#d4af37`), smooth gradients, floating micro-animations, custom cursor behaviors, and custom-styled scrolling markers.

---

## 🛠️ Tech Stack

*   **Framework:** React (Vite-powered)
*   **Graphics Scene:** Three.js, `@react-three/fiber`, `@react-three/drei`
*   **Animations:** GSAP (GreenSock) + ScrollTrigger, Intersection Observer API
*   **Styling:** TailwindCSS (core utility layer), Custom Vanilla CSS (for fine-tuned glassmorphism and keyframes)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ADARSHKS-BCA/3D_Personal_protfolio.git
   cd 3D_Personal_protfolio
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

### Production Build

To build the application for production, run:
```bash
npm run build
```
The optimized bundle will be generated inside the `dist` directory.

---

## 📁 Folder Structure

```text
├── public/                 # Static assets (images, 3D models, project screenshots)
├── src/
│   ├── components/         # Reusable React components (Laptop model, Navbar, etc.)
│   ├── data/               # Static dataset files (projects, skills, certs)
│   ├── hooks/              # Custom hooks (scroll animations, custom cursor)
│   ├── sections/           # Modular section components (Projects, Skills, Contact)
│   ├── styles/             # Global CSS and stylesheet definitions
│   ├── App.jsx             # Main Application setup
│   └── main.jsx            # Application entry point
├── package.json
└── vite.config.js
```

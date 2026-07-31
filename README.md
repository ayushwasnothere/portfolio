# Ayush Shah — Portfolio & Robotics/AI Journal

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-cytrus.me-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://cytrus.me)
[![GitHub Repository](https://img.shields.io/badge/GitHub-ayushwasnothere%2Fportfolio-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ayushwasnothere/portfolio)
[![Built with Bun](https://img.shields.io/badge/Built_with-Bun-fbf0df?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![React](https://img.shields.io/badge/React_19-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)

A modern, high-performance developer portfolio and technical blog engine built for showcasing autonomous AI agents, high-performance systems, and robotic control pipelines.

---

## ✨ Features & Architecture

### 🎨 Visual & Motion Engineering

- **GSAP 3 & Lenis Smooth Scroll**: ScrollTrigger-driven animations, pinned project showcase sliding transitions with dynamic blur (`filter: blur(6px)`) and scale transformation.
- **Left-to-Right Hover Color Fill**: Smooth left-to-right accent text fill effect on project rows.
- **Custom Floating Cursor Follower**: Real-time pointer target detection with dynamic matrix scaling (`scale(2.8)`) and inverted difference blending.
- **Tajmirul-Inspired Minimalist Navigation**: Slide-out navigation drawer with section scrolling and scroll restoration.

### 📝 Built-in File-Based Markdown Blog Engine

- **Dynamic Glob Discovery**: Compiles articles in `src/content/blogs/*.md` at build time via Vite's `import.meta.glob`.
- **High-Tech Typography & Code Blocks**: Custom dark terminal window code blocks with 1-click **Copy Code** buttons, pill-accented headings, gradient blockquotes, dynamic search, and topic tag filtering.
- **Technical Architecture Diagrams**: Embedded system flowcharts for VLA vs. WAM, 5-DOF vs. 7-DOF kinematics, MoveIt Task Constructor pipelines, and autonomous manipulation.

### ⚡ Technical Stack

- **Framework**: React 19, TypeScript
- **Build Tool / Runtime**: Vite, Bun
- **Styling**: Tailwind CSS v4, Vanilla CSS Custom Properties
- **Analytics**: Vercel Analytics (`@vercel/analytics`)

---

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+) or Node.js (v18+)

### Installation

```bash
# Clone the repository
git clone https://github.com/ayushwasnothere/portfolio.git
cd portfolio

# Install dependencies
bun install
```

### Development Server

```bash
bun run dev
```

### Production Build

```bash
bun run build
```

---

## 📂 Project Structure

```bash
portfolio/
├── src/
│   ├── components/       # UI Components (Navbar, CustomCursor, Hero, ProjectList, etc.)
│   ├── content/
│   │   └── blogs/        # Markdown blog posts (.md)
│   ├── data/             # Structured data (projects, skills, experience)
│   ├── lib/              # Blog engine parser & utilities
│   ├── pages/            # Page routes (Home, ProjectDetail, BlogList, BlogDetail)
│   └── styles/           # Global styles and design system tokens (index.css)
├── public/               # Static assets & favicons
├── index.html            # Main HTML document
└── README.md             # Repository documentation
```

---

## 📄 License

Designed & Developed by [Ayush Shah](https://cytrus.me) © 2036.

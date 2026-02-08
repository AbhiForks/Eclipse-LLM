<div align="center">

![Eclipse LLM](https://blog.n8n.io/content/images/size/w1200/2025/01/11-os-llm--1-.jpg)

<h1>Eclipse LLM</h1>

**The All-In-One Open Source AI Chat Platform**

<p align="center">
  <a href="https://eclipse-llm.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-00C853?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/AbhiForks/Eclipse-LLM/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-3DA639?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/shadcn/ui-Latest-000000?style=flat-square&logo=radix-ui&logoColor=white" alt="shadcn/ui" />
</p>

<p align="center">
  <a href="https://eclipse-llm.vercel.app">🌐 Website</a> •
  <a href="https://eclipse-llm.vercel.app/chat">💬 Chat</a> •
  <a href="#-getting-started">🚀 Quick Start</a> •
  <a href="#-documentation">📚 Docs</a>
</p>

<i>Access Gemini 3, GPT-5.2, Claude 4.5, Llama 4, and more — all in one beautiful, unified interface.</i>

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
  - [🤖 Multi-LLM Support](#-multi-llm-support)
  - [💬 Chat Interface](#-chat-interface)
  - [📚 Library System](#-library-system)
  - [🔍 AI Discovery](#-ai-discovery)
  - [🎨 Design](#-design)
- [🚀 Getting Started](#-getting-started)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [📚 Documentation](#-documentation)
- [🛠️ Development](#-development)
- [📈 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

**Eclipse LLM** is a modern, open-source AI chat platform that provides a unified interface for accessing multiple Large Language Models. Built as a community-driven alternative to proprietary solutions, Eclipse delivers a premium conversational AI experience.

### Why Eclipse?

- 🎯 **All-in-One**: Access multiple AI models from a single interface
- 🎨 **Beautiful Design**: AMOLED-optimized dark theme with smooth animations
- 🔒 **Secure**: Enterprise-grade authentication with Clerk
- 📱 **Responsive**: Works seamlessly on desktop and mobile
- 🚀 **Fast**: Built with Vite for lightning-fast performance
- 💯 **Open Source**: 100% transparent and community-driven

---

## ✨ Features

### 🤖 Multi-LLM Support

Access the world's leading AI models from one unified platform:

<table>
  <tr>
    <th>Model</th>
    <th>Status</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><strong>Gemini 3 Pro</strong></td>
    <td>✅ Active</td>
    <td>1M+ token context; multimodal capabilities</td>
  </tr>
  <tr>
    <td><strong>Gemini 3 Flash</strong></td>
    <td>✅ Active</td>
    <td>Cost-efficient; optimized for speed</td>
  </tr>
  <tr>
    <td><strong>GPT-5.2</strong></td>
    <td>🔜 Coming Soon</td>
    <td>Advanced reasoning with "Thinking Mode"</td>
  </tr>
  <tr>
    <td><strong>Claude 4.5 Opus</strong></td>
    <td>🔜 Coming Soon</td>
    <td>Excels in coding & creative writing</td>
  </tr>
  <tr>
    <td><strong>Llama 4 Scout</strong></td>
    <td>🔜 Coming Soon</td>
    <td>Open-source; 10M token context window</td>
  </tr>
</table>

### 💬 Chat Interface

- **Real-time streaming** responses with typing indicators
- **Infinite conversation history** with full-text search
- **Markdown support** for code blocks and formatting
- **Context-aware suggestions** for faster interactions
- **Export conversations** in multiple formats
- **Share conversations** via secure links

### 📚 Library System

- **Smart organization** — conversations grouped by date and topic
- **Full-text search** across all your conversations
- **Quick filters** — filter by date, model, or tags
- **Favorites** — star important conversations
- **Bulk actions** — delete, export, or share multiple conversations

### 🔍 AI Discovery

Stay up-to-date with the latest in AI:

- **Discover Page** — Curated AI news from top sources
- **AI Compass** — Daily AI news digest from NeatPrompts
- **Trending Topics** — See what's hot in the AI community
- **Bookmark articles** for later reading

### 🎨 Design

- **Pure Black Theme** (#000000) — Perfect for AMOLED displays
- **Material Icons** — Consistent, beautiful iconography
- **Framer Motion** — Smooth, production-ready animations
- **Fully Responsive** — Works on desktop, tablet, and mobile
- **Accessibility First** — WCAG 2.1 AA compliant

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)
- [Git](https://git-scm.com/)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AbhiForks/Eclipse-LLM.git
cd Eclipse-LLM

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

---

## 📦 Installation

### Detailed Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AbhiForks/Eclipse-LLM.git
   cd Eclipse-LLM
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API keys:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_GEMINI_API_KEY=your_gemini_key
   VITE_NEWSAPI_KEY=your_newsapi_key
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

---

## ⚙️ Configuration

### Required API Keys

| Service     | Key                          | Purpose        | Get It From                                     |
| ----------- | ---------------------------- | -------------- | ----------------------------------------------- |
| **Clerk**   | `VITE_CLERK_PUBLISHABLE_KEY` | Authentication | [Clerk Dashboard](https://dashboard.clerk.com)  |
| **Gemini**  | `VITE_GEMINI_API_KEY`        | AI Responses   | [Google AI Studio](https://aistudio.google.com) |
| **NewsAPI** | `VITE_NEWSAPI_KEY`           | News Feed      | [NewsAPI](https://newsapi.org)                  |

### Optional Configuration

```env
# Enable demo mode (no auth required)
VITE_DEMO_MODE=false

# Show developer signature in console
VITE_SHOW_SIGNATURE=true
```

---

## 📚 Documentation

### Project Structure

```
Eclipse-LLM/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components (40+)
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatHeader.tsx
│   │   └── ...
│   ├── pages/              # Route pages
│   │   ├── Home.tsx        # Landing page
│   │   ├── Index.tsx       # Chat interface
│   │   ├── Library.tsx     # Conversation library
│   │   ├── Discover.tsx    # AI news feed
│   │   └── AICompass.tsx   # News digest
│   ├── context/            # React context providers
│   │   └── ChatContext.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── .env.example           # Environment template
└── package.json
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run typecheck       # TypeScript type checking
npm run lint           # ESLint
npm run lint:fix       # Fix ESLint issues

# Testing
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:ui        # Run tests with UI
```

---

## 🛠️ Development

### Tech Stack

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React 18.3, TypeScript 5.8, Vite 5.4</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td>Tailwind CSS 3.4, shadcn/ui, Material Icons</td>
  </tr>
  <tr>
    <td><strong>Animations</strong></td>
    <td>Framer Motion</td>
  </tr>
  <tr>
    <td><strong>Auth</strong></td>
    <td>Clerk</td>
  </tr>
  <tr>
    <td><strong>Testing</strong></td>
    <td>Vitest, React Testing Library</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Vercel</td>
  </tr>
</table>

### Component Library

Eclipse includes **40+ components** from shadcn/ui:

- **Actions**: Button, Dropdown Menu, Dialog, Alert Dialog
- **Forms**: Input, Textarea, Select, Checkbox, Switch
- **Data Display**: Avatar, Badge, Card, Table
- **Navigation**: Tabs, Navigation Menu, Sidebar, Breadcrumb
- **Feedback**: Toast, Progress, Skeleton, Alert
- **Layout**: Resizable, Scroll Area, Sheet, Drawer

---

## 📈 Roadmap

### Version 2.0 (Q1 2025)

- [ ] Multi-LLM support (GPT-5.2, Claude 4.5 Opus, Llama 4)
- [ ] Model switching in chat interface
- [ ] Custom system prompts
- [ ] Conversation sharing via secure links
- [ ] Mobile app (React Native)
- [ ] Voice input support
- [ ] File upload & analysis

### Version 2.1 (Q2 2025)

- [ ] Plugin system for extensibility
- [ ] REST API for developers
- [ ] Team collaboration features
- [ ] Enterprise self-hosted option
- [ ] Custom theme support
- [ ] Advanced analytics dashboard

### Future Ideas

- [ ] Browser extension
- [ ] Desktop app (Electron/Tauri)
- [ ] AI agent capabilities
- [ ] Multi-language support
- [ ] Voice conversations

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Ideas

- 🐛 Bug fixes
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🌐 Translations
- 🧪 Additional tests

---

## 💖 Support

If you find Eclipse LLM helpful, please consider:

- ⭐ **Star** this repository
- 🐦 **Share** on social media
- 🐛 **Report** bugs and issues
- 💡 **Suggest** new features
- 🤝 **Contribute** code or documentation

---

## 📄 License

Eclipse LLM is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Abhilash V

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Google** — Gemini API
- **Clerk** — Authentication infrastructure
- **shadcn/ui** — Component library
- **Vercel** — Hosting platform
- **Tailwind Labs** — CSS framework
- **Framer** — Animation library
- **All Contributors** — Thank you for making Eclipse better!

---

## 📞 Contact

**Abhilash V**

- GitHub: [@AbhiForks](https://github.com/AbhiForks)
- Email: [abhilashvishwa12@gmail.com](mailto:abhilashvishwa12@gmail.com)
- Website: [https://eclipse-llm.vercel.app](https://eclipse-llm.vercel.app)

---

<div align="center">

**Built with ❤️ by Abhilash V**

_Experience the future of AI chat — Eclipse LLM_

⭐ Star us on GitHub — it helps!

</div>

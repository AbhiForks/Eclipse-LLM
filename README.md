# Eclipse LLM

<div align="center">

![Eclipse LLM](https://eclipse-llm.vercel.app/og-image.png)

**The All-In-One Open Source AI Chat Platform**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-blue.svg)](https://vitejs.dev)

_Access Gemini, GPT-4, Claude, and more — all in one beautiful, unified interface._

[🌐 Visit Website](https://eclipse-llm.vercel.app) • [💬 Chat Now](https://eclipse-llm.vercel.app/chat) • [🐙 GitHub](https://github.com/AbhiForks/Eclipse-LLM)

</div>

---

## 🚀 What is Eclipse LLM?

Eclipse LLM is a **modern, open-source AI chat platform** that provides a unified interface for accessing multiple Large Language Models. Built as a community-driven alternative to proprietary solutions like T3 Chat, Eclipse delivers a premium conversational AI experience with:

- **Unified Multi-LLM Support** — Seamlessly switch between leading AI models
- **Stunning Monochrome Design** — Pure black (#000000) AMOLED-optimized interface
- **Real-Time AI Intelligence** — Integrated news, research, and discovery tools
- **Enterprise-Grade Security** — Clerk-powered authentication
- **100% Open Source** — Transparent, auditable, and community-driven

---

## ✨ Key Features

### 🤖 All-In-One LLM Access

Eclipse provides a centralized platform for interacting with multiple AI models:

| Model                | Status         | Description                          |
| -------------------- | -------------- | ------------------------------------ |
| **Gemini 2.0 Flash** | ✅ Active      | Google's fastest, most capable model |
| **GPT-4**            | 🔜 Coming Soon | OpenAI's flagship model              |
| **Claude**           | 🔜 Coming Soon | Anthropic's helpful AI               |
| **Llama**            | 🔜 Coming Soon | Meta's open models                   |
| **Mistral**          | 🔜 Coming Soon | Efficient French AI                  |

### 💬 Intelligent Conversation Interface

- **Real-time streaming responses** with smooth animations
- **Conversation history** with search and filtering
- **Rename, share, and delete** conversations
- **Context-aware suggestions** for faster interactions
- **Markdown rendering** for code and formatted content

### 📚 Smart Library System

- **Organized conversation history** grouped by date
- **Full-text search** across all conversations
- **Quick access** to recent and starred chats
- **Export capabilities** for data portability

### 🔍 AI Discovery & Research

- **Discover Page** — Daily AI news from Singularity Hub
- **AI Compass** — Curated AI news digest from NeatPrompts
- **Stay informed** with the latest in artificial intelligence
- **Integrated research tools** for deep exploration

### 🎨 Premium Design System

- **AMOLED-optimized** pure black theme (#000000)
- **Pixel-perfect typography** with Material Icons
- **Smooth Framer Motion animations**
- **Responsive design** for all screen sizes
- **Accessibility-first** component library

### 🔐 Enterprise Authentication

- **Clerk-powered** secure authentication
- **Social login** (GitHub, Google, etc.)
- **Protected routes** with session management
- **Secure API key** handling

---

## 🛠️ Technology Stack

### Core

- **React 18.3** — Modern UI library
- **TypeScript 5.8** — Type-safe development
- **Vite 5.4** — Lightning-fast build tool
- **React Router 6** — Client-side routing

### UI/UX

- **Tailwind CSS 3.4** — Utility-first styling
- **shadcn/ui** — Beautiful component library (40+ components)
- **Framer Motion 10** — Production-ready animations
- **Material Icons** — Consistent iconography

### State & Data

- **React Context** — Global state management
- **TanStack Query 5** — Server state management
- **Zod 3.23** — Schema validation

### Backend & Auth

- **Clerk** — Authentication & user management
- **Vercel** — Deployment & edge functions

### Testing & Quality

- **Vitest** — Fast unit testing
- **React Testing Library** — Component testing
- **ESLint + Prettier** — Code quality

---

## 📦 Project Structure

```
Eclipse-LLM/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (40+)
│   │   ├── ChatInput.tsx    # Message input component
│   │   ├── ChatMessage.tsx  # Message bubble component
│   │   ├── ChatHeader.tsx   # Conversation header
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── PixelLogo.tsx    # Custom pixel logo
│   │   ├── AuroraBackground.tsx  # Aurora animations
│   │   ├── GlowOrbs.tsx     # Interactive glow effects
│   │   └── NoiseOverlay.tsx # Film grain texture
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   ├── Index.tsx        # Chat interface
│   │   ├── Library.tsx      # Conversation library
│   │   ├── Discover.tsx     # AI news feed
│   │   ├── AICompass.tsx    # AI news digest
│   │   └── Loading.tsx      # Loading screen
│   ├── context/
│   │   └── ChatContext.tsx  # Chat state management
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **npm** or **bun**
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/AbhiForks/Eclipse-LLM.git
cd Eclipse-LLM

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> **Note:** Clerk and Gemini API keys are required for full functionality.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Usage

### For Users

1. **Sign in** with GitHub, Google, or email
2. **Start chatting** with Eclipse's AI assistant
3. **Browse AI news** on the Discover page
4. **Access daily digests** via AI Compass
5. **Manage conversations** in your Library

### For Developers

```bash
# Run development server
npm run dev

# Run type checks
npm run typecheck

# Run linter
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## 📊 Component Library

Eclipse includes **40+ professionally designed components** from shadcn/ui:

| Category         | Components                                  |
| ---------------- | ------------------------------------------- |
| **Actions**      | Button, Dropdown Menu, Dialog, Alert Dialog |
| **Data Display** | Avatar, Badge, Card, Table                  |
| **Forms**        | Input, Textarea, Select, Checkbox, Form     |
| **Navigation**   | Tabs, Navigation Menu, Sidebar, Breadcrumb  |
| **Feedback**     | Toast, Progress, Skeleton, Spinner          |
| **Layout**       | Resizable, Scroll Area, Sheet, Drawer       |
| **Charts**       | Recharts integration                        |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 **Report bugs** by opening an issue
- 💡 **Suggest features** with detailed descriptions
- 📝 **Improve documentation** and tutorials
- 🔧 **Submit pull requests** with improvements
- 🌐 **Translate** the interface to new languages

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📈 Roadmap

### Version 2.0 (Q1 2025)

- [ ] Multi-LLM support (GPT-4, Claude, Llama)
- [ ] Model switching in chat interface
- [ ] Custom system prompts
- [ ] Conversation sharing via links
- [ ] Mobile app (React Native)

### Version 2.1 (Q2 2025)

- [ ] Plugin system for extensibility
- [ ] API endpoints for developers
- [ ] Team collaboration features
- [ ] Enterprise self-hosted option
- [ ] Custom theme support

---

## 📄 License

Eclipse LLM is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Google** — Gemini API and model access
- **Clerk** — Authentication infrastructure
- **shadcn** — Beautiful UI component inspiration
- **Vercel** — Deployment platform
- **Tailwind Labs** — CSS framework
- **Framer** — Animation library

---

## 📞 Contact

**Abhilash V** — [@AbhiForks](https://github.com/AbhiForks)

- Email: [abhilashvishwa12@gmail.com](mailto:abhilashvishwa12@gmail.com)
- Project: [https://github.com/AbhiForks/Eclipse-LLM](https://github.com/AbhiForks/Eclipse-LLM)
- Website: [https://eclipse-llm.vercel.app](https://eclipse-llm.vercel.app)

---

<div align="center">

**Built with ❤️ by Abhilash V**

_Experience the future of AI chat — Eclipse LLM_

</div>

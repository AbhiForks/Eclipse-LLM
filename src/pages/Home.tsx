/**
 * Home.tsx
 *
 * Black & White AMOLED Homepage - Maximum aesthetic
 * Pure black (#000000) with clean monochrome design
 *
 * Built by Abhilash V
 */

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import PixelLogo from "@/components/PixelLogo";
import AuroraBackground from "@/components/AuroraBackground";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

const features = [
  {
    icon: "psychology",
    title: "All Models",
    description: "Cutting-edge access to Gemini, GPT-4, Claude, and more",
  },
  {
    icon: "public",
    title: "Real-time Research",
    description: "AI news aggregated from global sources",
  },
  {
    icon: "library_books",
    title: "Smart Library",
    description: "Organized conversation history",
  },
  {
    icon: "security",
    title: "Secure Auth",
    description: "Enterprise-grade Clerk security",
  },
];

const modelLogos = [
  { name: "Gemini" },
  { name: "GPT-4" },
  { name: "Claude" },
  { name: "Llama" },
  { name: "Mistral" },
];

const stats = [
  { value: "50K+", label: "Conversations", icon: "chat" },
  { value: "99.9%", label: "Uptime", icon: "bolt" },
  { value: "100%", label: "Secure", icon: "lock" },
  { value: "24/7", label: "Available", icon: "schedule" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "AI Researcher",
    content:
      "Eclipse has completely transformed my research workflow. The contextual understanding is unmatched.",
  },
  {
    name: "Marcus Johnson",
    role: "Developer",
    content:
      "The most beautiful AI interface I've ever used. The monochrome theme is stunning.",
  },
  {
    name: "Elena Rodriguez",
    role: "Product Manager",
    content:
      "Finally, an AI chat that feels premium. The attention to detail is incredible.",
  },
];

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartChatting = () => {
    if (isSignedIn) {
      navigate("/chat");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] text-[#F2EDED] overflow-x-hidden">
      <AuroraBackground />
      <GlowOrbs />
      <NoiseOverlay />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#B8B2B2]/10 bg-[#000000]/80 backdrop-blur-2xl"
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <PixelLogo size={44} animated={true} showText={false} />
              <span className="text-2xl font-bold tracking-tight text-[#F2EDED]">
                Eclipse
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-10">
              {["Features", "Demo", "Testimonials", "Stats"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-[#B8B2B2] hover:text-[#F2EDED] transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F2EDED] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleStartChatting}
                  className="text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10 rounded-full px-5 border border-[#B8B2B2]/20"
                >
                  Sign In
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="sm"
                  onClick={handleStartChatting}
                  className="bg-[#F2EDED] text-[#000000] hover:bg-[#F2EDED]/90 rounded-full px-6 font-medium"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="relative z-10 pt-40 pb-32">
        <motion.div style={{ y }} className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#B8B2B2]/10 bg-[#F2EDED]/5 px-4 py-1.5 mb-8 backdrop-blur-sm"
          >
            <span
              className="material-icons text-sm"
              style={{ fontSize: "16px" }}
            >
              auto_awesome
            </span>
            <span className="text-sm text-[#B8B2B2]">
              Powered by Gemini 2.0 Flash
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#F2EDED]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <div className="mb-6">
                <PixelText text="ECLIPSE" />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-[#B8B2B2] tracking-widest uppercase"
              >
                AI-Powered Conversations
              </motion.p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto max-w-2xl text-center text-base md:text-lg text-[#B8B2B2] mb-12 leading-relaxed"
          >
            The most beautiful AI chat interface ever built.
            <br />
            <span className="text-[#F2EDED]">
              Crafted by Abhilash V with passion.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={handleStartChatting}
                className="h-14 rounded-full bg-[#F2EDED] text-[#000000] hover:bg-[#F2EDED]/90 px-10 font-medium"
              >
                <span
                  className="material-icons mr-2"
                  style={{ fontSize: "20px" }}
                >
                  sparkles
                </span>
                Start Chatting
                <span
                  className="material-icons ml-2"
                  style={{ fontSize: "20px" }}
                >
                  arrow_forward
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/discover")}
                className="h-14 rounded-full border border-[#B8B2B2]/30 bg-[#F2EDED]/5 px-8 text-[#F2EDED] hover:bg-[#F2EDED]/10 hover:border-[#B8B2B2]/50 transition-all"
              >
                <span
                  className="material-icons mr-2"
                  style={{ fontSize: "18px" }}
                >
                  play_arrow
                </span>
                Explore AI Compass
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-5xl"
          >
            <div className="relative rounded-3xl border border-[#B8B2B2]/10 bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden">
              <div className="flex items-center gap-3 px- border-b border-[6 py-4#B8B2B2]/5">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#B8B2B2]/30" />
                  <div className="h-3 w-3 rounded-full bg-[#B8B2B2]/30" />
                  <div className="h-3 w-3 rounded-full bg-[#B8B2B2]/30" />
                </div>
                <div className="flex-1 text-center text-sm text-[#B8B2B2]/40 font-mono">
                  eclipse-llm.vercel.app
                </div>
              </div>

              <div className="p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-[#F2EDED] text-[#000000] px-5 py-3 text-sm font-medium">
                    What is the future of AI in 2025?
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F2EDED] flex items-center justify-center">
                    <span
                      className="material-icons text-[#000000]"
                      style={{ fontSize: "20px" }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <div className="max-w-[70%] rounded-2xl rounded-tl-sm border border-[#B8B2B2]/10 bg-[#F2EDED]/5 px-5 py-3 text-sm text-[#F2EDED]">
                    <p className="leading-relaxed">
                      The future of AI in 2025 looks incredibly promising. Key
                      developments include:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Multimodal AI everywhere",
                        "Autonomous agents",
                        "Personal AI assistants",
                      ].map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <span
                            className="material-icons text-[#F2EDED]"
                            style={{ fontSize: "16px" }}
                          >
                            check_circle
                          </span>
                          <span className="text-[#B8B2B2]">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F2EDED] flex items-center justify-center">
                    <span
                      className="material-icons text-[#000000]"
                      style={{ fontSize: "20px" }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl border border-[#B8B2B2]/10 bg-[#F2EDED]/5 px-4 py-3">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay }}
                        className="h-2 w-2 rounded-full bg-[#B8B2B2]"
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="flex gap-2 pt-2"
                >
                  <div className="flex-1 rounded-full border border-[#B8B2B2]/10 bg-[#F2EDED]/5 px-5 py-4 text-sm text-[#B8B2B2]/40 placeholder:text-[#B8B2B2]/20">
                    Ask me anything...
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#F2EDED]"
                  >
                    <span
                      className="material-icons text-[#000000]"
                      style={{ fontSize: "20px" }}
                    >
                      arrow_forward
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -top-10 -right-10 rounded-2xl border border-[#B8B2B2]/10 bg-[#0A0A0A]/80 p-4 backdrop-blur-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#F2EDED] animate-pulse" />
                <span className="text-sm text-[#B8B2B2]">
                  AI Compass Active
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 rounded-2xl border border-[#B8B2B2]/10 bg-[#0A0A0A]/80 p-4 backdrop-blur-xl"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="material-icons text-[#F2EDED]"
                  style={{ fontSize: "18px" }}
                >
                  library_books
                </span>
                <span className="text-sm text-[#B8B2B2]">
                  12 conversations saved
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="stats"
        className="relative z-10 py-24 border-y border-[#B8B2B2]/5 bg-[#F2EDED]/2"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="h-12 w-12 rounded-xl bg-[#F2EDED]/10 flex items-center justify-center">
                    <span
                      className="material-icons text-[#F2EDED]"
                      style={{ fontSize: "24px" }}
                    >
                      {stat.icon}
                    </span>
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#F2EDED] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#B8B2B2]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F2EDED]">
              Powerful Features
            </h2>
            <p className="text-[#B8B2B2] max-w-xl mx-auto text-lg">
              Everything you need for AI-powered productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl border border-[#B8B2B2]/10 bg-[#F2EDED]/5 hover:bg-[#F2EDED]/10 transition-all duration-500 cursor-pointer"
              >
                <motion.div
                  className="inline-flex p-4 rounded-2xl bg-[#F2EDED] mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span
                    className="material-icons text-[#000000]"
                    style={{ fontSize: "28px" }}
                  >
                    {feature.icon}
                  </span>
                </motion.div>

                <h3 className="text-xl font-semibold text-[#F2EDED] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#B8B2B2] text-sm leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6"
                >
                  <span
                    className="material-icons text-[#B8B2B2]"
                    style={{ fontSize: "20px" }}
                  >
                    arrow_upward
                  </span>
                </motion.div>

                <motion.div
                  className="absolute inset-0 rounded-3xl border border-[#F2EDED]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    padding: "1px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {modelLogos.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full bg-[#F2EDED] text-[#000000] text-xs font-medium"
              >
                {model.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="testimonials"
        className="relative z-10 py-32 border-y border-[#B8B2B2]/5 bg-[#F2EDED]/2"
      >
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F2EDED]">
              Loved by Users
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative p-8 rounded-3xl border border-[#B8B2B2]/10 bg-[#000000]/50 text-center"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-[#F2EDED] flex items-center justify-center">
                    <span
                      className="material-icons text-[#000000]"
                      style={{ fontSize: "24px" }}
                    >
                      format_quote
                    </span>
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-[#F2EDED] leading-relaxed mb-6 mt-4">
                  "{testimonials[activeTestimonial].content}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#F2EDED] flex items-center justify-center text-[#000000] font-bold">
                    {testimonials[activeTestimonial].name[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-[#F2EDED]">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-sm text-[#B8B2B2]">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? "w-8 bg-[#F2EDED]"
                      : "w-2 bg-[#B8B2B2]/40 hover:bg-[#B8B2B2]/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#F2EDED]/5" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#F2EDED]/5 blur-[100px] rounded-full" />

            <div className="relative z-10 p-12 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-[#F2EDED]"
              >
                Ready to Experience Eclipse?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#B8B2B2] mb-8 max-w-lg mx-auto"
              >
                Join thousands of users who've already discovered the future of
                AI chat.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  onClick={handleStartChatting}
                  className="h-12 rounded-full bg-[#F2EDED] text-[#000000] hover:bg-[#F2EDED]/90 px-8 font-medium"
                >
                  Get Started Free
                  <span
                    className="material-icons ml-2"
                    style={{ fontSize: "18px" }}
                  >
                    arrow_forward
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const signInUrl = "/sign-in";
                    window.location.href = signInUrl;
                  }}
                  className="h-12 rounded-full border border-[#B8B2B2]/30 bg-[#F2EDED]/5 px-8 text-[#F2EDED] hover:bg-[#F2EDED]/10"
                >
                  <span
                    className="material-icons mr-2"
                    style={{ fontSize: "18px" }}
                  >
                    code
                  </span>
                  Continue with GitHub
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#B8B2B2]/5 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <PixelLogo size={32} animated={false} showText={false} />
              <div>
                <span className="font-semibold text-[#F2EDED]">Eclipse</span>
                <span className="text-[#B8B2B2] text-sm ml-2">
                  by Abhilash V
                </span>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm text-[#B8B2B2]">
              <a href="#" className="hover:text-[#F2EDED] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[#F2EDED] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[#F2EDED] transition-colors">
                Contact
              </a>
              <a
                href="https://github.com/AbhiForks/Eclipse-LLM"
                className="hover:text-[#F2EDED] transition-colors flex items-center gap-1"
              >
                <span className="material-icons" style={{ fontSize: "16px" }}>
                  code
                </span>
                GitHub
              </a>
            </div>

            <div className="text-sm text-[#B8B2B2]">
              © 2025 Eclipse LLM. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
          background-size: 200% 200%;
        }
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
};

const PixelText = ({ text }: { text: string }) => {
  const PIXEL_FONT: Record<string, string[]> = {
    E: ["111", "101", "111", "101", "111"],
    C: ["011", "100", "100", "100", "011"],
    L: ["100", "100", "100", "100", "111"],
    I: ["111", "010", "010", "010", "111"],
    P: ["111", "101", "111", "100", "100"],
    S: ["011", "100", "011", "001", "110"],
    T: ["111", "010", "010", "010", "010"],
    H: ["101", "101", "111", "101", "101"],
    A: ["111", "101", "111", "101", "101"],
    O: ["111", "101", "101", "101", "111"],
    N: ["111", "101", "101", "101", "101"],
    U: ["101", "101", "101", "101", "011"],
    D: ["111", "101", "101", "101", "111"],
    G: ["011", "100", "101", "101", "011"],
    R: ["111", "101", "111", "101", "101"],
    K: ["101", "101", "111", "101", "101"],
    Y: ["101", "101", "011", "010", "010"],
    B: ["111", "101", "111", "101", "111"],
    M: ["111", "101", "101", "101", "101"],
    W: ["101", "101", "101", "101", "010"],
    V: ["101", "101", "101", "010", "001"],
    X: ["101", "101", "011", "101", "101"],
    Z: ["111", "001", "010", "100", "111"],
    0: ["111", "101", "101", "101", "111"],
    1: ["010", "110", "010", "010", "111"],
    2: ["111", "001", "111", "100", "111"],
    3: ["111", "001", "111", "001", "111"],
    4: ["101", "101", "111", "001", "001"],
    5: ["111", "100", "111", "001", "111"],
    6: ["111", "100", "111", "101", "111"],
    7: ["111", "001", "001", "001", "001"],
    8: ["111", "101", "111", "101", "111"],
    9: ["111", "101", "111", "001", "111"],
  };

  const [isHovered, setIsHovered] = useState(false);

  const renderPixels = () => {
    const pixels: JSX.Element[] = [];
    let totalWidth = 0;

    text.split("").forEach((char, charIdx) => {
      const charData = PIXEL_FONT[char.toUpperCase()];
      if (charData) {
        const charWidth = charData[0].length;
        charData.forEach((row, rowIdx) => {
          row.split("").forEach((pixel, colIdx) => {
            if (pixel === "1") {
              const delay =
                (charIdx * 0.05 + rowIdx * 0.02 + colIdx * 0.01) * 0.15;
              pixels.push(
                <motion.div
                  key={`${charIdx}-${rowIdx}-${colIdx}`}
                  className="absolute bg-[#F2EDED]"
                  style={{
                    width: 6,
                    height: 6,
                    left: totalWidth + colIdx * 7,
                    top: rowIdx * 7,
                    boxShadow: "0 0 8px rgba(242, 237, 237, 0.8)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: delay,
                  }}
                />,
              );
            }
          });
        });
        totalWidth += charWidth * 7 + 4;
      }
    });

    return pixels;
  };

  return (
    <div
      className="relative"
      style={{
        height: 42,
        width: text.length * 45,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderPixels()}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-[#F2EDED] blur-xl opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default Home;

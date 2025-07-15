"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";
import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Home,
  User,
  Folder,
  Code,
  MessageCircle,
} from "lucide-react";
import * as THREE from "three";
import { Points, PointsMaterial, BufferGeometry, BufferAttribute } from "three";

// Extend Three.js components for TypeScript
extend({ Points, PointsMaterial, BufferGeometry, BufferAttribute });

// FloatingNav Component
const FloatingNav = ({ mounted }: { mounted: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: "Home", href: "#home", icon: <Home size={18} /> },
    { name: "About", href: "#about", icon: <User size={18} /> },
    { name: "Projects", href: "#projects", icon: <Folder size={18} /> },
    { name: "Skills", href: "#skills", icon: <Code size={18} /> },
    { name: "Contact", href: "#contact", icon: <MessageCircle size={18} /> },
  ];

  useEffect(() => {
    if (!mounted) return;
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, mounted]);

  const scrollToSection = (href: string) => {
    if (!mounted) return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-full px-6 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl py-4 w-40 flex flex-col items-center shadow-lg md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="flex items-center justify-center gap-2 w-full text-center px-0 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base font-medium"
              style={{ borderRadius: 8 }}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

// Animated Button Component
const AnimatedButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center px-8 py-3 text-white font-medium rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="relative z-10 flex items-center gap-2">{children}</div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
    </motion.button>
  );
};

// Project Card Component
const ProjectCard = ({
  project,
}: {
  project: {
    title: string;
    tech: string[];
    description: string;
    github: string;
    live: string;
  };
}) => {
  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-indigo-500 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-indigo-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg mb-2">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-indigo-600/30 text-indigo-300 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
        <div className="flex gap-3">
          <AnimatedButton
            className="flex-1 text-sm py-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                try {
                  const url = new URL(project.github);
                  if (url.protocol === "http:" || url.protocol === "https:") {
                    window.open(
                      url.toString(),
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                } catch {
                  // Invalid URL, do nothing
                }
              }
            }}
          >
            <Github size={16} className="mr-2" />
            Code
          </AnimatedButton>
          <AnimatedButton
            className="flex-1 text-sm py-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                try {
                  const url = new URL(project.live);
                  if (url.protocol === "http:" || url.protocol === "https:") {
                    window.open(
                      url.toString(),
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                } catch {
                  // Invalid URL, do nothing
                }
              }
            }}
          >
            View Live
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

// Particle Background Component
const ParticleBackground = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6C63FF" transparent opacity={0.6} />
    </points>
  );
};

// Skill Tag Component
const SkillTag = ({
  position,
  children,
  active,
  setActive,
}: {
  position: [number, number, number];
  children: string;
  active: boolean;
  setActive: (skill: string) => void;
}) => {
  const { invalidate } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    invalidate();
  }, [invalidate]);

  useFrame(() => {
    if (ref.current && position && position.length === 3) {
      ref.current.lookAt(0, 0, 0);
    }
  });

  if (!position || position.length !== 3 || position.some(isNaN)) {
    return null;
  }

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.25}
      color={hovered || active ? "#6C63FF" : "#FFFFFF"}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => setActive(children)}
    >
      {typeof children === "string" ? children : children}
    </Text>
  );
};

// Skill Sphere Component
const SkillSphere = ({ skills }: { skills: string[] }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Ensure skills are displayed in the original order
  const skillPositions = React.useMemo(() => {
    if (!skills || skills.length === 0) return [];

    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 4;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return [isFinite(x) ? x : 0, isFinite(y) ? y : 0, isFinite(z) ? z : 0];
    });
  }, [skills]);

  return (
    <group ref={meshRef}>
      {skills &&
        skillPositions &&
        skills.map((skill, i) => (
          <SkillTag
            key={skill}
            position={skillPositions[i] as [number, number, number]}
            active={activeSkill === skill}
            setActive={setActiveSkill}
          >
            {skill}
          </SkillTag>
        ))}
    </group>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState(2025); // Default to current year
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const projects = [
    {
      title: "3D Portfolio",
      tech: ["Next.js", "Three.js", "Tailwind CSS"],
      description:
        "A modern 3D portfolio website with interactive elements and smooth animations.",
      github: "https://github.com/LoveShah21/3d-portfolio",
      live: "https://3d-portfolio-five-alpha.vercel.app",
    },
    {
      title: "E-commerce Platform",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      description:
        "Full-stack e-commerce solution with chatbot integration(not incorporated in the hosted website but present in the github code) and admin dashboard.",
      github: "https://github.com/LoveShah21/MERN-Stack-project",
      live: "https://www.aquaoverseas.com/",
    },
    {
      title: "Attendance Management System",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      description:
        "Interactive dashboard for student and coach attendance management with real-time updates.",
      github: "https://github.com/LoveShah21/attendance-management-system",
      live: "https://github.com/nonexistent-page-404",
    },
  ];

  const skills = [
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "GSAP",
    "Figma",
    "UI/UX Design",
  ];

  const handleDownloadResume = () => {
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      // Vercel is case-sensitive, so use the correct case for the file name
      link.href = "/assets/Resume.pdf";
      link.download = "Love_Shah_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewWork = () => {
    if (typeof window !== "undefined") {
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // emailjs.init("5H7NTTMUHspe6ILYp"); // Removed public key from client code for security
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus({ type: "", message: "" });

    const form = e.target as HTMLFormElement;

    try {
      // Use environment variables for sensitive keys (see .env.local)
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      if (result.text === "OK") {
        setFormStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus({
        type: "error",
        message:
          "Error sending message. Please try again or contact me directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Particle background */}
      <div className="fixed inset-0 z-0">
        {mounted ? (
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <ParticleBackground />
            </Suspense>
          </Canvas>
        ) : null}
      </div>

      <FloatingNav mounted={mounted} />

      <main ref={containerRef} className="relative z-10">
        {/* Hero Section */}
        <section
          id="home"
          className="h-screen flex items-center justify-center px-4 relative"
        >
          <motion.div
            className="text-center max-w-4xl mx-auto"
            style={{ opacity, scale }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                Love Shah
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              MERN Stack Developer shaping performant digital solutions with
              end-to-end hosting expertise
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatedButton onClick={handleViewWork}>
                View My Work
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              className="text-4xl font-bold text-white mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-br from-purple-500/20 to-indigo-600/20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Spotlight effect */}
                <Spotlight
                  className="-top-20 left-0 md:left-10 md:-top-10"
                  fill="white"
                />

                {/* 3D Spline Scene */}
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white">
                  Full-Stack Developer & Hosting Expert
                </h3>
                <p className="text-gray-300">
                  Hi, I&apos;m <strong>Love Shah</strong>, a passionate and
                  detail-oriented MERN Stack Developer with over{" "}
                  <strong>3 years of hands-on experience</strong> building
                  robust, responsive, and user-centric web applications. My
                  journey in full-stack development has given me a strong
                  foundation in{" "}
                  <strong>MongoDB, Express.js, React.js, and Node.js</strong>,
                  along with a deep understanding of modern development
                  workflows and deployment strategies.
                </p>
                <p className="text-gray-300">
                  My skill set extends beyond development — I have solid grasp
                  on
                  <strong>
                    {" "}
                    web hosting, server deployment, and DNS management
                  </strong>
                  , ensuring every project I build performs reliably in
                  production.
                </p>
                <p className="text-gray-300">
                  I thrive in collaborative environments, love solving
                  real-world problems through technology, and continuously
                  explore new tools to improve performance, security, and
                  scalability. Whether it&apos;s building intuitive UIs or
                  optimizing backend performance, I&apos;m committed to
                  delivering clean, efficient, and maintainable code.
                </p>
                <p className="text-gray-300">
                  Let&apos;s build something impactful together!
                </p>
                <div className="pt-4">
                  <div className="flex gap-4">
                    <AnimatedButton
                      className="flex items-center gap-2 whitespace-nowrap"
                      onClick={handleDownloadResume}
                    >
                      <Download size={18} className="flex-shrink-0" />
                      <span className="inline-block">Download Resume</span>
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-4 bg-gray-900/50 backdrop-blur-sm"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              className="text-4xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              My Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 mb-16 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Selected works that showcase my skills and creativity
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              className="text-4xl font-bold text-white mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              My Skills
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Technical Skills
                  </h3>
                  <p className="text-gray-300">
                    I&apos;ve worked with a variety of technologies across the
                    full stack, with a focus on creating performant, accessible,
                    and visually stunning experiences.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Design Skills
                  </h3>
                  <p className="text-gray-300">
                    My design approach combines user-centered principles with
                    modern aesthetics, ensuring interfaces are both beautiful
                    and intuitive.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="h-[500px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {mounted ? (
                  <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls
                      enableZoom={false}
                      autoRotate
                      autoRotateSpeed={0.5}
                    />
                    <Suspense fallback={null}>
                      <SkillSphere skills={skills} />
                    </Suspense>
                  </Canvas>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                      <p>Loading Skills...</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-4 bg-gray-900/50 backdrop-blur-sm"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-4xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              Get In Touch
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 mb-16 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have a project in mind or want to collaborate? I&apos;d love to
              hear from you.
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.form
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSendMessage}
              >
                {/* Status Message */}
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      formStatus.type === "success"
                        ? "bg-green-900/50 border border-green-500 text-green-300"
                        : "bg-red-900/50 border border-red-500 text-red-300"
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}

                <div className="relative">
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white peer transition-all duration-200"
                    placeholder=" "
                    required
                    disabled={isSending}
                  />
                  <label
                    htmlFor="from_name"
                    className="absolute left-3 top-0 -translate-y-1/2 px-2 bg-gray-800 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-indigo-400 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:text-indigo-400 peer-[:not(:placeholder-shown)]:scale-90 peer-placeholder-shown:left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white peer transition-all duration-200"
                    placeholder=" "
                    required
                    disabled={isSending}
                  />
                  <label
                    htmlFor="from_email"
                    className="absolute left-3 top-0 -translate-y-1/2 px-2 bg-gray-800 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-indigo-400 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:text-indigo-400 peer-[:not(:placeholder-shown)]:scale-90 peer-placeholder-shown:left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white peer transition-all duration-200"
                    placeholder=" "
                    disabled={isSending}
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-3 top-0 -translate-y-1/2 px-2 bg-gray-800 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-indigo-400 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:text-indigo-400 peer-[:not(:placeholder-shown)]:scale-90 peer-placeholder-shown:left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent"
                  >
                    Subject (Optional)
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white peer transition-all duration-200 resize-none"
                    placeholder=" "
                    required
                    disabled={isSending}
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-3 top-0 -translate-y-1/2 px-2 bg-gray-800 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-indigo-400 peer-focus:scale-90 peer-[:not(:placeholder-shown)]:text-indigo-400 peer-[:not(:placeholder-shown)]:scale-90 peer-placeholder-shown:left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`relative w-full inline-flex items-center justify-center px-8 py-3 text-white font-medium rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 ${
                    isSending ? "cursor-not-allowed opacity-80 scale-100" : ""
                  }`}
                >
                  {isSending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Your message will be sent directly to my email inbox.
                </p>
              </motion.form>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Contact Info
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Feel free to reach out through any of these channels. I
                    typically respond within 24 hours.
                  </p>

                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Quick Response Times
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="text-green-400">Within 24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LinkedIn:</span>
                        <span className="text-blue-400">Few hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Whatsapp:</span>
                        <span className="text-yellow-400">Same day</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:loveshah2112@gmail.com"
                    className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-gray-800/50"
                  >
                    <div className="p-2 bg-indigo-600 rounded-full">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-400">
                        loveshah2112@gmail.com
                      </div>
                    </div>
                  </a>

                  <div className="flex gap-4 pt-4">
                    <a
                      href="https://github.com/LoveShah21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-110"
                      title="GitHub"
                    >
                      <Github size={20} className="text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/love-shah-142398289"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110"
                      title="LinkedIn"
                    >
                      <Linkedin size={20} className="text-white" />
                    </a>
                    <a
                      href="https://wa.me/+918320095374"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 rounded-full hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110"
                      title="WhatsApp"
                    >
                      <FaWhatsapp size={20} className="text-white" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-400 relative z-10">
        <p>© {year} Love Shah. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;

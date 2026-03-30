// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import "./App.css";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
};
const pageTransition = { duration: 0.22, ease: "easeOut" };

function AnimatedRoutes({ theme }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Home theme={theme} />
          </motion.div>
        } />
        <Route path="/projects" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Projects />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Contact />
          </motion.div>
        } />
        <Route path="/experience" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Experience />
          </motion.div>
        } />
        <Route path="/certifications" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Certifications />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <Router>
      <AppLayout theme={theme} onThemeToggle={toggleTheme}>
        <AnimatedRoutes theme={theme} />
      </AppLayout>
    </Router>
  );
}

export default App;
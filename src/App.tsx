import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Code,
  Database,
  Globe,
  Award,
  Building,
  Moon,
  Sun,
  Coffee,      
  FileText,      
  Cpu,         
  BarChart3,     
  GitBranch,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Background3D } from './components/Background3D';

type Skill = {
  name: string;
  level: number;
  icon: React.ComponentType<any>;
};

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl: string;
  codeUrl: string;
};

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
};

function App(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode from localStorage or default to dark
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? JSON.parse(savedMode) : prefersDark;
    
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setIsMenuOpen(false);
    }
  };

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        'Amish2005', // service ID (replace if different)
        'template_su7sdgo', // template ID
        form.current,
        'j2v3nOWu3x3NuAqUl' // public key
      )
      .then(
        () => {
          alert('Message sent successfully!');
          form.current?.reset();
        },
        (error) => {
          console.error('EmailJS error:', error);
          alert('Failed to send message. Try again later.');
        }
      );
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
          const scrollPosition = window.scrollY + 120;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetBottom = offsetTop + element.offsetHeight;

              if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills: Skill[] = [
    { name: 'Java', level: 90, icon: Coffee },
    { name: 'Python', level: 85, icon: FileText },
    { name: 'C', level: 88, icon: Cpu },
    { name: 'HTML/CSS', level: 82, icon: Globe },
    { name: 'R', level: 80, icon: BarChart3 },
    { name: 'Git', level: 85, icon: GitBranch }
  ];

  const projects: Project[] = [
    {
      title: 'Scientific Calculator',
      description:
        '🧮 Java Calculator Project Built using Java and Eclipse IDE, this calculator marks my first step into software development. It supports basic arithmetic operations and features a simple GUI. Excited to keep learning and building!',
      technologies: ['Java', 'JFrame', 'Eclipse IDE', 'Swing'],
      image: '/calc.png',
      demoUrl: 'https://www.linkedin.com/posts/amish-rahman-2k25_java-eclipse-programming-activity-7229886924365127683-2LpA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEdKLdMBAShKAdEFlUzamJjB61E6ngH7mPU',
      codeUrl: 'https://github.com/AmishRahman2005/Calc/blob/main/Calculator/src/project/Calci.java'
    },
    {
      title: '🐍 Classic Snake Game',
      description:
        'A simple yet engaging Snake Game built using Java and Eclipse IDE. This project demonstrates my understanding of object-oriented programming, event-driven logic, and core game development concepts like collision detection and real-time rendering',
      technologies: ['Java', 'Swing', 'AWT', 'Eclipse IDE'],
      image: '/snake.png',
      demoUrl: 'https://www.linkedin.com/posts/amish-rahman-2k25_java-eclipseide-programming-activity-7284890825971441665-uVV4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEdKLdMBAShKAdEFlUzamJjB61E6ngH7mPU',
      codeUrl: 'https://github.com/AmishRahman2005/Classic-Snake-Game/tree/master/Snake/src'
    },
    {
      title: 'Parallel Universe Generator',
      description:
        'This is an educational + entertainment web app that lets you generate your own parallel universe with unique rules, settings, and possibilities. With every click, a new universe is born—complete with its own logic and cosmic identity.',
      technologies: ['React', 'Node', 'CSS', 'Tailwind CSS'],
      image: '/Parallel.png',
      demoUrl: 'https://cosmic-click-creations.vercel.app/',
      codeUrl: 'https://github.com/AmishRahman2005/Parallel-Universe-generator'
    }
  ];

  const experiences: Experience[] = [
    {
      title: 'B.Tech Computer Science Student',
      company: 'NMAM Institute of Technology',
      period: '2024 - Present',
      description:
        'Currently pursuing B.Tech in Computer Science and Engineering. Focusing on core programming languages like Java, C, and Python while exploring web development and artificial intelligence.',
      achievements: [
        'Developed multiple Java projects including Calculator and Snake Game',
        'Earned certifications in AI, Cybersecurity, and Cloud Computing',
        'Active participant in coding competitions and hackathons'
      ]
    },
    {
      title: 'Pre-University Education (Science)',
      company: 'Loyola School',
      period: '2022 - 2024',
      description: 'Completed Pre-University education in Pure Science stream with excellent academic performance, building strong foundation in Mathematics, Physics, and Chemistry.',
      achievements: [
        '🏆 Achieved 90.25% in PUC II examinations',
        'Strong foundation in Mathematics and Physics',
        'Developed analytical and problem-solving skills'
      ]
    },
    {
      title: 'Secondary Education (ICSE)',
      company: 'Loyola School',
      period: '2011 - 2022',
      description: 'Completed comprehensive secondary education under ICSE curriculum, developing strong academic fundamentals and discovering passion for technology and programming.',
      achievements: [
        '🏆 Achieved outstanding 93.2% in ICSE Board examinations',
        'Consistent academic excellence throughout secondary education',
        'Early exposure to computer science and programming concepts',
        'Active participation in school competitions and events'
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen transition-all duration-500 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
      }`}>
        {/* 3D Interactive Background */}
        <Background3D isDarkMode={isDarkMode} />
        
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDarkMode 
            ? 'bg-slate-950/90 border-b border-cyan-500/30' 
            : 'bg-white/90 border-b border-blue-200/50'
        } backdrop-blur-xl`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className={`text-2xl font-bold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
              }`}>
                Amish Rahman
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8 items-center">
                {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 transform hover:scale-105 relative group ${
                      activeSection === section
                        ? isDarkMode 
                          ? 'text-cyan-400 font-semibold' 
                          : 'text-blue-600 font-semibold'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-cyan-400'
                          : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {section}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}></span>
                    {activeSection === section && (
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400 shadow-lg shadow-cyan-400/50'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-400/50'
                      }`}></span>
                    )}
                  </button>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25'
                      : 'bg-slate-100/50 border border-blue-200/50 text-blue-600 hover:bg-blue-100/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/25'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                      : 'bg-slate-100/50 border border-blue-200/50 text-blue-600 hover:bg-blue-100/50'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/50'
                  }`}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className={`md:hidden pb-4 border-t transition-all duration-300 ${
                isDarkMode
                  ? 'border-cyan-500/30 bg-slate-950/90'
                  : 'border-blue-200/50 bg-white/90'
              } backdrop-blur-md`}>
                <div className="flex flex-col space-y-2 pt-4">
                  {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`text-left py-2 capitalize transition-colors duration-300 ${
                        isDarkMode
                          ? 'text-gray-300 hover:text-cyan-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className={`pt-20 pb-16 relative overflow-hidden min-h-screen flex items-center ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
        }`}>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 group ${
                isDarkMode
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/50 hover:border-cyan-400 hover:shadow-cyan-400/50'
                  : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50 hover:border-blue-400 hover:shadow-blue-400/50'
              } animate-float hover:scale-105`}>
                <img 
                  src="/me.jpg" 
                  alt="Amish Rahman"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-cyan-400/20 to-purple-400/20'
                    : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
                }`}></div>
              </div>
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'
              }`}>
                Amish Rahman
              </h1>
              <p className={`text-xl md:text-2xl mb-4 font-medium animate-slide-up delay-200 ${
                isDarkMode ? 'text-cyan-300' : 'text-blue-600'
              }`}>
                Software Engineer & AI Enthusiast
              </p>
              <p className={`text-lg mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-300 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Passionate about creating innovative digital solutions and building scalable applications 
                that solve real-world problems. Always eager to learn and embrace new technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up delay-500">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-400/50 border border-cyan-400/30'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400 shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-400/50 border border-blue-400/30'
                  }`}
                >
                  View My Work
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    isDarkMode
                      ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-cyan-400/50'
                      : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-blue-400/50'
                  }`}
                >
                  Get In Touch
                </button>
              </div>
              <div className="flex justify-center space-x-6 animate-slide-up delay-700">
                <a href="https://www.linkedin.com/in/amish-rahman-2k25" className={`transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-cyan-400 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50'
                    : 'text-slate-500 hover:text-blue-500 hover:drop-shadow-lg hover:drop-shadow-blue-400/50'
                }`}>
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/AmishRahman2005" className={`transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-purple-400 hover:drop-shadow-lg hover:drop-shadow-purple-400/50'
                    : 'text-slate-500 hover:text-purple-500 hover:drop-shadow-lg hover:drop-shadow-purple-400/50'
                }`}>
                  <Github size={24} />
                </a>
                <a
                  href="#"
                  onClick={() => {
                    const gmailUrl = "https://mail.google.com/mail/?view=cm&to=amishrahmanind@gmail.com";
                    const outlookUrl = "https://outlook.office.com/mail/deeplink/compose?to=amishrahmanind@gmail.com";
                    
                    const win = window.open(gmailUrl, "_blank");
                    
                    setTimeout(() => {
                      if (!win || win.closed || typeof win.closed === "undefined") {
                        window.open(outlookUrl, "_blank");
                      }
                    }, 1500);
                  }}
                  className={`transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-pink-400 hover:drop-shadow-lg hover:drop-shadow-pink-400/50'
                      : 'text-slate-500 hover:text-pink-500 hover:drop-shadow-lg hover:drop-shadow-pink-400/50'
                  }`}
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center relative z-10">
            <ChevronDown 
              size={32} 
              className={`animate-bounce cursor-pointer mx-auto transition-colors duration-300 ${
                isDarkMode
                  ? 'text-cyan-400/60 hover:text-cyan-400 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50'
                  : 'text-blue-400/60 hover:text-blue-400 hover:drop-shadow-lg hover:drop-shadow-blue-400/50'
              }`}
              onClick={() => scrollToSection('about')}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 relative z-20 transition-all duration-500 ${
          isDarkMode
            ? 'bg-slate-900/95 border-t border-cyan-500/30'
            : 'bg-white/95 border-t border-blue-200/50'
        } backdrop-blur-sm`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}>About Me</h2>
              <div className={`w-20 h-1 mx-auto rounded-full animate-scale-in shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400 shadow-cyan-400/50'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-400/50'
              }`}></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-slide-left">
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Hello! I'm Amish Rahman</h3>
                <p className={`mb-6 leading-relaxed text-lg ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                  I'm currently pursuing my B.Tech in Computer Science and Engineering at NMAM Institute of Technology. 
                  I have a strong interest in Java, C, and Python, and I'm currently expanding my skills in web development and artificial intelligence.
                </p>
                <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                  My journey in software development began with a deep curiosity about how technology works, which has evolved into a commitment to continuous learning and innovation. 
                  I enjoy collaborating with others, tackling complex challenges, and writing clean, maintainable code that stands the test of time.
                </p>
                <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                  Outside of coding, I love exploring new technologies, contributing to open-source projects, and sharing my knowledge through blogs and mentoring. 
                  Whether working independently or in a team, I strive to create impactful digital solutions that make a difference.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-cyan-500/20 border border-cyan-400/30 hover:bg-cyan-500/30 hover:border-cyan-400'
                        : 'bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400'
                    }`}>
                      <Code className={isDarkMode ? 'text-cyan-400' : 'text-blue-500'} size={24} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Clean Code</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Maintainable & Scalable</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400'
                        : 'bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400'
                    }`}>
                      <Globe className={isDarkMode ? 'text-purple-400' : 'text-purple-500'} size={24} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Modern Tech</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Latest Technologies</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 animate-slide-right">
                <div className="relative">
                  <div className={`w-80 h-80 mx-auto rounded-3xl flex items-center justify-center text-9xl font-bold shadow-2xl border-2 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 group ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:shadow-cyan-400/50'
                      : 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 border-blue-400/50 text-blue-600 hover:border-blue-400 hover:shadow-blue-400/50'
                  } backdrop-blur-sm`}>
                    AR
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-cyan-400/10 to-purple-400/10'
                        : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'
                    }`}></div>
                  </div>
                  <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce border-2 ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-cyan-500/50 border-cyan-400/50'
                      : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-blue-500/50 border-blue-400/50'
                  }`}>
                    <Award size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-20 relative z-20 transition-all duration-500 ${
          isDarkMode
            ? 'bg-slate-950/95 border-t border-purple-500/30'
            : 'bg-slate-50/95 border-t border-purple-200/50'
        } backdrop-blur-sm`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
              }`}>Education & Experience</h2>
              <div className={`w-20 h-1 mx-auto rounded-full animate-scale-in shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-400 to-cyan-400 shadow-purple-400/50'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-400/50'
              }`}></div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-0.5 rounded-full shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-b from-cyan-400 to-purple-400 shadow-cyan-400/50'
                  : 'bg-gradient-to-b from-blue-500 to-purple-500 shadow-blue-400/50'
              }`}></div>

              {/* Experience items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className={`relative flex items-start animate-slide-up ${index % 2 === 0 ? '' : 'md:justify-end'}`} style={{animationDelay: `${index * 200}ms`}}>
                    <div className={`absolute left-6 md:left-1/2 w-6 h-6 border-4 rounded-full transform md:-translate-x-3 shadow-lg z-10 animate-pulse ${
                      isDarkMode
                        ? 'bg-slate-950 border-cyan-400 shadow-cyan-400/50'
                        : 'bg-white border-blue-500 shadow-blue-400/50'
                    }`}></div>
                    <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8'}`}>
                      <div className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border group ${
                        isDarkMode
                          ? 'bg-slate-900/80 hover:shadow-cyan-400/25 border-cyan-500/30 hover:border-cyan-400/50'
                          : 'bg-white/80 hover:shadow-blue-400/25 border-blue-200/50 hover:border-blue-400/50'
                      } backdrop-blur-sm`}>
                        <div className="flex items-center mb-4">
                          <GraduationCap className={`mr-3 transition-colors duration-300 ${
                            isDarkMode
                              ? 'text-cyan-400 group-hover:text-cyan-300'
                              : 'text-blue-500 group-hover:text-blue-400'
                          }`} size={20} />
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            isDarkMode
                              ? 'text-cyan-400 bg-cyan-500/20 border border-cyan-400/30'
                              : 'text-blue-600 bg-blue-100/50 border border-blue-200/50'
                          }`}>{exp.period}</span>
                        </div>
                        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-white group-hover:text-cyan-300'
                            : 'text-slate-900 group-hover:text-blue-600'
                        }`}>{exp.title}</h3>
                        <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-purple-400 group-hover:text-purple-300'
                            : 'text-purple-600 group-hover:text-purple-500'
                        }`}>{exp.company}</h4>
                        <p className={`leading-relaxed mb-4 ${
                          isDarkMode ? 'text-gray-300' : 'text-slate-600'
                        }`}>{exp.description}</p>
                        <div className="space-y-2">
                          <h5 className={`font-semibold text-sm uppercase tracking-wide ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>Key Achievements:</h5>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className={`text-sm flex items-start ${
                                isDarkMode ? 'text-gray-300' : 'text-slate-600'
                              }`}>
                                <span className={isDarkMode ? 'text-cyan-400' : 'text-blue-500'}>•</span>
                                <span className="ml-2">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 relative z-20 transition-all duration-500 ${
          isDarkMode
            ? 'bg-slate-900/95 border-t border-pink-500/30'
            : 'bg-white/95 border-t border-pink-200/50'
        } backdrop-blur-sm`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in ${
                isDarkMode
                  ? 'bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent'
              }`}>Skills & Technologies</h2>
              <div className={`w-20 h-1 mx-auto rounded-full animate-scale-in shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-pink-400 to-cyan-400 shadow-pink-400/50'
                  : 'bg-gradient-to-r from-pink-600 to-blue-600 shadow-pink-400/50'
              }`}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl p-6 transition-all duration-500 border transform hover:scale-105 animate-slide-up group ${
                      isDarkMode
                        ? 'bg-slate-800/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-cyan-400/25 border-cyan-500/30 hover:border-cyan-400/50'
                        : 'bg-slate-50/50 hover:bg-slate-100/80 hover:shadow-lg hover:shadow-blue-400/25 border-blue-200/50 hover:border-blue-400/50'
                    } backdrop-blur-sm`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-cyan-500/20 border border-cyan-400/30 group-hover:bg-cyan-500/30 group-hover:border-cyan-400'
                            : 'bg-blue-500/20 border border-blue-400/30 group-hover:bg-blue-500/30 group-hover:border-blue-400'
                        }`}>
                          <Icon className={`transition-colors duration-300 ${
                            isDarkMode
                              ? 'text-cyan-400 group-hover:text-cyan-300'
                              : 'text-blue-500 group-hover:text-blue-400'
                          }`} size={20} />
                        </div>
                        <span className={`font-semibold transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-white group-hover:text-cyan-300'
                            : 'text-slate-900 group-hover:text-blue-600'
                        }`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode
                          ? 'text-gray-400 group-hover:text-cyan-400'
                          : 'text-slate-500 group-hover:text-blue-500'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2 overflow-hidden ${
                      isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                    }`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out animate-progress shadow-lg ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-cyan-400 to-purple-400 shadow-cyan-400/50 group-hover:shadow-cyan-400/75'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-blue-400/50 group-hover:shadow-blue-400/75'
                        }`}
                        style={{ width: `${skill.level}%`, '--progress-width': `${skill.level}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <h3 className={`text-2xl font-bold mb-8 animate-fade-in ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Certifications & Learning</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "C (Programming Language)",
                  "AWS Security",
                  "Cloud Security Essentials for Executives",
                  "Data Analysis",
                  "Presenting Data",
                  "Cybersecurity",
                  "Introduction to Cybersecurity Awareness",
                  "Cyber Security Awareness",
                  "Generative Adversarial Networks (GANs)",
                  "Introduction to Artificial Intelligence",
                  "Python (Programming Language)",
                  "Python Basics Certificate",
                  "Google Ads",
                  "Project Certificate (Google Ads)",
                  "WordPress Design",
                  "Project Certificate (WordPress)",
                  "Java",
                  "Core Java",
                  "National Coding League'24",
                  "HackerRank Java (Basic) Certificate",
                  "Generative AI",
                  "What Is Generative AI?",
                  "Generative AI Tools",
                  "Artificial Intelligence (AI)",
                  "Artificial Intelligence for Business",
                  "Generative AI: The Evolution of Thoughtful Online Search",
                  "Search Engine Technology",
                  "AI Productivity",
                  "Streamlining Your Work with Microsoft Copilot",
                  "Microsoft Copilot",
                  "Learning Microsoft 365 Copilot and Business Chat",
                  "Office 365",
                  "Computer Ethics",
                  "Ethics in the Age of Generative AI",
                  "Responsible AI",
                ].map((tech, index) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 transform hover:scale-110 animate-fade-in ${
                      isDarkMode
                        ? 'bg-slate-800/50 text-gray-300 border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-400/25'
                        : 'bg-slate-100/50 text-slate-600 border-blue-200/50 hover:border-blue-400/50 hover:bg-blue-100/50 hover:text-blue-600 hover:shadow-md hover:shadow-blue-400/25'
                    } backdrop-blur-sm`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 relative z-20 transition-all duration-500 ${
          isDarkMode
            ? 'bg-slate-950/95 border-t border-cyan-500/30'
            : 'bg-slate-50/95 border-t border-cyan-200/50'
        } backdrop-blur-sm`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent'
              }`}>Featured Projects</h2>
              <div className={`w-20 h-1 mx-auto rounded-full animate-scale-in shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 to-pink-400 shadow-cyan-400/50'
                  : 'bg-gradient-to-r from-blue-600 to-pink-600 shadow-blue-400/50'
              }`}></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border animate-slide-up group ${
                  isDarkMode
                    ? 'bg-slate-800/50 hover:shadow-cyan-400/25 border-cyan-500/30 hover:border-cyan-400/50'
                    : 'bg-white/50 hover:shadow-blue-400/25 border-blue-200/50 hover:border-blue-400/50'
                } backdrop-blur-sm`} style={{animationDelay: `${index * 200}ms`}}>
                  <div className={`h-48 flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30'
                      : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30'
                  }`}>
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                      />
                    ) : (
                      <>
                        <div className={`text-6xl font-bold opacity-50 animate-pulse transition-all duration-500 group-hover:opacity-70 ${
                          isDarkMode
                            ? 'text-cyan-400 group-hover:text-cyan-300'
                            : 'text-blue-500 group-hover:text-blue-400'
                        }`}>
                          {project.title.charAt(0)}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40 group-hover:to-black/20 transition-all duration-500"></div>
                      </>
                    )}
                    <div className={`absolute inset-0 border-2 transition-all duration-500 rounded-t-2xl ${
                      isDarkMode
                        ? 'border-cyan-400/0 group-hover:border-cyan-400/30'
                        : 'border-blue-400/0 group-hover:border-blue-400/30'
                    }`}></div>
                  </div>
                  <div className="p-8">
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isDarkMode
                        ? 'text-white group-hover:text-cyan-300'
                        : 'text-slate-900 group-hover:text-blue-600'
                    }`}>{project.title}</h3>
                    <p className={`leading-relaxed mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span key={tech} className={`px-3 py-1 rounded-full text-sm font-medium transform hover:scale-110 transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-sm hover:shadow-cyan-400/50'
                            : 'bg-blue-100/50 border border-blue-200/50 text-blue-600 hover:bg-blue-200/50 hover:border-blue-400 hover:text-blue-700 hover:shadow-sm hover:shadow-blue-400/50'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a 
                        href={project.demoUrl} 
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transform hover:scale-105 shadow-lg transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 shadow-cyan-500/25 hover:shadow-cyan-400/50 border border-cyan-400/30'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400 shadow-blue-500/25 hover:shadow-blue-400/50 border border-blue-400/30'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={project.codeUrl} 
                        className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transform hover:scale-105 hover:shadow-lg transition-all duration-300 ${
                          isDarkMode
                            ? 'border-purple-400/50 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 hover:shadow-purple-400/25'
                            : 'border-purple-400/50 text-purple-600 hover:bg-purple-100/50 hover:border-purple-400 hover:text-purple-700 hover:shadow-purple-400/25'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a 
                href="https://github.com/AmishRahman2005?tab=repositories" 
                className={`inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-fade-in shadow-lg ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:from-cyan-400 hover:to-pink-400 hover:shadow-cyan-400/50 border border-cyan-400/30'
                    : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-400 hover:to-pink-400 hover:shadow-blue-400/50 border border-blue-400/30'
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                <span>View All Projects on GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 relative z-20 transition-all duration-500 ${
          isDarkMode
            ? 'bg-slate-950/95 border-t border-purple-500/30'
            : 'bg-white/95 border-t border-purple-200/50'
        } backdrop-blur-sm`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
              }`}>Get In Touch</h2>
              <div className={`w-20 h-1 mx-auto rounded-full animate-scale-in shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-400 to-cyan-400 shadow-purple-400/50'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-400/50'
              }`}></div>
              <p className={`text-xl mt-6 max-w-2xl mx-auto animate-slide-up ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="animate-slide-left">
                <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Let's Connect</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-cyan-500/20 border border-cyan-400/30 hover:bg-cyan-500/30 hover:border-cyan-400'
                        : 'bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400'
                    }`}>
                      <Mail className={isDarkMode ? 'text-cyan-400' : 'text-blue-500'} size={24} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gmail</h4>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-slate-500'}>amishrahmanind@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400'
                        : 'bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400'
                    }`}>
                      <MapPin className={isDarkMode ? 'text-purple-400' : 'text-purple-500'} size={24} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Location</h4>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-slate-500'}>India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Follow Me</h4>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/amish-rahman-2k25" className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-125 hover:rotate-12 hover:shadow-lg ${
                      isDarkMode
                        ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-cyan-400/50'
                        : 'bg-blue-500/20 border border-blue-400/30 text-blue-500 hover:bg-blue-500/30 hover:border-blue-400 hover:text-blue-600 hover:shadow-blue-400/50'
                    }`}>
                      <Linkedin size={24} />
                    </a>
                    <a href="https://github.com/AmishRahman2005" className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-125 hover:rotate-12 hover:shadow-lg ${
                      isDarkMode
                        ? 'bg-purple-500/20 border border-purple-400/30 text-purple-400 hover:bg-purple-500/30 hover:border-purple-400 hover:text-purple-300 hover:shadow-purple-400/50'
                        : 'bg-purple-500/20 border border-purple-400/30 text-purple-500 hover:bg-purple-500/30 hover:border-purple-400 hover:text-purple-600 hover:shadow-purple-400/50'
                    }`}>
                      <Github size={24} />
                    </a>
                    <a href="#"
                      onClick={() => {
                        const gmailUrl = "https://mail.google.com/mail/?view=cm&to=amishrahmanind@gmail.com";
                        const outlookUrl = "https://outlook.office.com/mail/deeplink/compose?to=amishrahmanind@gmail.com";

                        const win = window.open(gmailUrl, "_blank");

                        setTimeout(() => {
                          if (!win || win.closed || typeof win.closed === "undefined") {
                            window.open(outlookUrl, "_blank");
                          }
                        }, 1500);
                      }} 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-125 hover:rotate-12 hover:shadow-lg ${
                        isDarkMode
                          ? 'bg-pink-500/20 border border-pink-400/30 text-pink-400 hover:bg-pink-500/30 hover:border-pink-400 hover:text-pink-300 hover:shadow-pink-400/50'
                          : 'bg-pink-500/20 border border-pink-400/30 text-pink-500 hover:bg-pink-500/30 hover:border-pink-400 hover:text-pink-600 hover:shadow-pink-400/50'
                      }`}
                    >
                      <Mail size={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-slide-right relative">
                <form ref={form} onSubmit={sendEmail} className={`space-y-6 rounded-2xl p-8 border transition-all duration-500 shadow-lg ${
                  isDarkMode
                    ? 'bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-cyan-400/25'
                    : 'bg-slate-50/50 border-blue-200/50 hover:border-blue-400/50 hover:shadow-blue-400/25'
                } backdrop-blur-sm`}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-600'
                      }`}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="user_name"
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          isDarkMode
                            ? 'border-cyan-500/30 bg-slate-900/50 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 hover:border-cyan-400/50 placeholder-gray-500'
                            : 'border-blue-200/50 bg-white/50 text-slate-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400/50 placeholder-slate-400'
                        } backdrop-blur-sm`}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-600'
                      }`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="user_email"
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          isDarkMode
                            ? 'border-cyan-500/30 bg-slate-900/50 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 hover:border-cyan-400/50 placeholder-gray-500'
                            : 'border-blue-200/50 bg-white/50 text-slate-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400/50 placeholder-slate-400'
                        } backdrop-blur-sm`}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDarkMode
                          ? 'border-cyan-500/30 bg-slate-900/50 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 hover:border-cyan-400/50 placeholder-gray-500'
                          : 'border-blue-200/50 bg-white/50 text-slate-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400/50 placeholder-slate-400'
                      } backdrop-blur-sm`}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 resize-none ${
                        isDarkMode
                          ? 'border-cyan-500/30 bg-slate-900/50 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 hover:border-cyan-400/50 placeholder-gray-500'
                          : 'border-blue-200/50 bg-white/50 text-slate-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-400/50 placeholder-slate-400'
                      } backdrop-blur-sm`}
                      placeholder="Tell me about your project or just say hello!"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 hover:shadow-cyan-400/50 border border-cyan-400/30'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400 hover:shadow-blue-400/50 border border-blue-400/30'
                    }`}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 border-t relative z-20 transition-all duration-500 ${
          isDarkMode
            ? 'bg-slate-950 text-white border-cyan-500/30'
            : 'bg-slate-100 text-slate-900 border-blue-200/50'
        }`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center relative">
              <div className={`text-3xl font-bold mb-4 animate-pulse ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                Amish Rahman
              </div>
              <p className={`mb-6 animate-fade-in ${
                isDarkMode ? 'text-gray-300' : 'text-slate-600'
              }`}>
                Building the future, one line of code at a time.
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                <a href="https://www.linkedin.com/in/amish-rahman-2k25" className={`transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-cyan-400 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50'
                    : 'text-slate-500 hover:text-blue-500 hover:drop-shadow-lg hover:drop-shadow-blue-400/50'
                }`}>
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/AmishRahman2005" className={`transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-purple-400 hover:drop-shadow-lg hover:drop-shadow-purple-400/50'
                    : 'text-slate-500 hover:text-purple-500 hover:drop-shadow-lg hover:drop-shadow-purple-400/50'
                }`}>
                  <Github size={24} />
                </a>
                <a href="#"
                  onClick={() => {
                    const gmailUrl = "https://mail.google.com/mail/?view=cm&to=amishrahmanind@gmail.com";
                    const outlookUrl = "https://outlook.office.com/mail/deeplink/compose?to=amishrahmanind@gmail.com";
                    
                    const win = window.open(gmailUrl, "_blank");
                    
                    setTimeout(() => {
                      if (!win || win.closed || typeof win.closed === "undefined") {
                        window.open(outlookUrl, "_blank");
                      }
                    }, 1500);
                  }} 
                  className={`transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-pink-400 hover:drop-shadow-lg hover:drop-shadow-pink-400/50'
                      : 'text-slate-500 hover:text-pink-500 hover:drop-shadow-lg hover:drop-shadow-pink-400/50'
                  }`}
                >
                  <Mail size={24} />
                </a>
              </div>
              <div className={`border-t pt-8 ${
                isDarkMode ? 'border-cyan-500/30' : 'border-blue-200/50'
              }`}>
                <p className={`text-sm animate-fade-in ${
                  isDarkMode ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  © 2025 Amish Rahman. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
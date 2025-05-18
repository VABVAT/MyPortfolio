import { useState, useEffect, useRef } from 'react';
import { Layers, Code, Monitor, User, Mail, ExternalLink, Menu, X, Briefcase } from 'lucide-react';
import head from '../public/head.jpg';
import emailjs from '@emailjs/browser';
// Main App Component
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Simulate loading delay for entrance animation
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitStatus('sending');

  emailjs.send(
    'service_a157ynh',
    'template_i873jgh',
    {
      name: formState.name,
      email: formState.email,
      message: formState.message,
    },
    '0wB7sXF7uOB4YCrXm'
  ).then(
    (result) => {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    },
    (error) => {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    }
  );
};

  return (
    <div className="bg-black text-white min-h-screen font-sans relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 to-black z-0 opacity-80">
        <AnimatedGrid />
      </div>

      {/* Loading overlay */}
      <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-1000 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 flex items-center">
          <span>INITIALIZING</span>
          <LoadingDots />
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-black bg-opacity-70 backdrop-blur-md transition-all duration-500 ${loaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
          VAIBHAV.DEV
        </div>

        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-8">
          {['home', 'projects', 'experience', 'about', 'contact'].map((section) => (
            <li key={section}>
              <button 
                onClick={() => scrollToSection(section)}
                className={`uppercase tracking-wider text-sm hover:text-cyan-400 transition-colors ${activeSection === section ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col space-y-8 text-center">
          {['home', 'projects', 'experience', 'about', 'contact'].map((section) => (
            <li key={section}>
              <button 
                onClick={() => scrollToSection(section)}
                className={`uppercase tracking-wider text-lg hover:text-cyan-400 transition-colors ${activeSection === section ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center relative px-8 md:px-24">
          <div className={`transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <h2 className="text-lg md:text-xl text-cyan-400 mb-4 tracking-wider">HELLO, I'M</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
              Vaibhav Sidana
            </h1>
            <div className="text-2xl md:text-3xl mb-8 flex items-center">
              <span className="mr-3">Full-Stack Developer</span>
              <TypewriterEffect phrases={["UI/UX Designer", "Cybersecurity enthusiast", "Tech Innovator"]} />
            </div>
            <p className="text-gray-300 max-w-xl mb-12 text-lg">
              Creating cutting-edge web experiences with a focus on performance, 
              animation, and futuristic design interfaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-1"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-transparent border border-cyan-500 rounded-full text-white font-medium hover:bg-cyan-950 hover:bg-opacity-30 transition-all hover:-translate-y-1"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className={`animate-bounce transition-opacity duration-1000 ${loaded ? 'opacity-70' : 'opacity-0'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7L12 12L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-24 px-8 md:px-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            Projects
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl">
            A selection of my latest work spanning web applications designs, Cybersecurity tools, and experimental interfaces.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Distributed Intrusion Detection System"
              description="A decentralized system for real-time monitoring and detection of network intrusions."
              tags={["Python", "Network management"]}
              icon={<Monitor size={32} className="text-cyan-400" />}
            />
            <ProjectCard 
              title="Cracked Code"
              description="Undetectable AI-Powered Interview Assistant"
              tags={["React", "electron.js", "mongoDB", "TypeScript"]}
              icon={<Layers size={32} className="text-indigo-400" />}
            />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen py-24 px-8 md:px-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            Experience
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl">
            My professional journey in the tech industry, showcasing a blend of development and cybersecurity expertise.
          </p>
          
          <div className="space-y-12">
            <FixedExperienceCard
              title="Cybersecurity Consultant"
              company="IIT Goa"
              period="2023"
              description="Discovered and ethically reported 3 critical vulnerability in the academic portal that exposed login
 credentials of users in real-time.
  Identified and exploited 3 misconfigured printers that posed a security risk; provided mitigation steps and
 secured network access controls.
 Correctly Configured and safeguarded 7 routers, 3 printers and 4 web-pages in the college network"
              skills={["Wireshark", "Linux", "Bettercap"]}
            />
            
            <FixedExperienceCard
              title="Bug	Bounty	&	Security	Research for	GoGrab"
              company="GoGrab"
              period="2023"
              description="Received Rs	3000 by discovering 3	critical	vulnerabilities	allowing item dispensing via unauthorized mobile commands.
 Reported the issue through responsible disclosure, helping prevent substantial financial losses.
 Partnered with the vendor’s engineering team to diagnose root causes and fixed	3	exposed	API’s"
              skills={["burpsuite", "express.js", "reverse-engineering"]}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-24 px-8 md:px-24 flex flex-col md:flex-row md:items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
              About Me
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm a full-stack developer with a passion for creating dynamic and responsive web applications.
                I am also a cybersecurity enthusiast and have a keen interest in building tools that enhance user experience and security. 
              </p>
              <p>
                My journey began with traditional web development but quickly evolved into a passion for cybersecurity 
              </p>
              <p>
                When I'm not coding, you can find me exploring emerging technologies, contributing to open-source projects or making videos for my youtube channel.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <SocialLink platform="LinkedIn" url="https://www.linkedin.com/in/vaibhavsidana/" />
              <SocialLink platform="Youtube" url="https://www.youtube.com/@HackWsid" />
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                <img src={head} className="w-60 h-60 rounded-full text-gray-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-24 px-8 md:px-24 bg-black bg-opacity-50 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            Get In Touch
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl">
            Interested in working together? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={submitStatus === 'sending'}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {submitStatus === 'sending' ? (
                  <>
                    <span className="mr-2">Sending</span>
                    <LoadingDots />
                  </>
                ) : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="text-green-400 mt-4 flex items-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Message sent! I'll get back to you soon.</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4 text-white">Contact Information</h3>
                  <div className="space-y-4">
                    <ContactInfo 
                      icon={<Mail size={20} className="text-cyan-400" />}
                      label="Email"
                      value="vaibhav.sidana.23031@iitgoa.ac.in"
                    />
                    <ContactInfo 
                      icon={<ExternalLink size={20} className="text-cyan-400" />}
                      label="Location"
                      value="Goa, India"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4 text-white">Connect</h3>
                  <div className="flex gap-4">
                    <SocialLink platform="Youtube" url="https://www.youtube.com/@HackWsid" />
                    <SocialLink platform="LinkedIn" url="https://www.linkedin.com/in/vaibhavsidana/" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-24 text-center text-gray-400">
          <div className="mb-8 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            VAIBHAV.DEV
          </div>
          <p className="mb-4">Designing the future of the web, one pixel at a time</p>
          <p>© {new Date().getFullYear()} Vaibhav Sidana. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Animated background grid
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0 grid grid-cols-12 gap-4">
        {Array(12).fill(0).map((_, i) => (
          <div key={i} className="h-full border-r border-cyan-900/20"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 gap-4">
        {Array(12).fill(0).map((_, i) => (
          <div key={i} className="w-full border-b border-cyan-900/20"></div>
        ))}
      </div>
    </div>
  );
}

// Loading Dots Animation
function LoadingDots() {
  return (
    <div className="flex space-x-1 ml-2">
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '300ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '600ms' }}></div>
    </div>
  );
}

// Typewriter Effect Component
function TypewriterEffect({ phrases }) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);
  
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (typingForward) {
        // Typing forward
        if (charIndex < phrases[phraseIndex].length) {
          setDisplayText(phrases[phraseIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause at the end before erasing
          setTimeout(() => {
            setTypingForward(false);
          }, 1500);
          clearInterval(typingInterval);
        }
      } else {
        // Erasing
        if (charIndex > 0) {
          setDisplayText(phrases[phraseIndex].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next phrase
          setPhraseIndex((phraseIndex + 1) % phrases.length);
          setTypingForward(true);
          clearInterval(typingInterval);
        }
      }
    }, typingForward ? 100 : 50);
    
    return () => clearInterval(typingInterval);
  }, [charIndex, phraseIndex, typingForward, phrases]);
  
  return (
    <div className="inline-flex items-center">
      <span className="text-cyan-400">{displayText}</span>
      <span className="w-1 h-8 bg-cyan-400 ml-1 animate-pulse"></span>
    </div>
  );
}

// Project Card Component
function ProjectCard({ title, description, tags, icon }) {
  const [hover, setHover] = useState(false);
  
  return (
    <div 
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 overflow-hidden relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      
      <div className="mb-4">{icon}</div>
      
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-full text-cyan-400">
            {tag}
          </span>
        ))}
      </div>
      
      <button className={`text-sm text-cyan-400 flex items-center transition-all duration-300 ${hover ? 'translate-x-2' : ''}`}>
        <span className="mr-2">View Project</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// Fixed Experience Card Component (this replaces the previous one)
function FixedExperienceCard({ title, company, period, description, skills }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="flex items-center">
          <Briefcase className="text-cyan-400 mr-3" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-cyan-400">{company}</p>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="px-4 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">
            {period}
          </span>
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-24'}`}>
        <p className="text-gray-400 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-full text-cyan-400">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {description.length > 150 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-cyan-400 mt-4 flex items-center hover:underline"
        >
          {isExpanded ? 'Show less' : 'Read more'}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// Social Link Component
function SocialLink({ platform, url }) {
  return (
    <a 
      href={url} 
      className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-full text-sm text-gray-300 transition-colors duration-300"
    >
      {platform}
    </a>
  );
}

// Contact Info Component
function ContactInfo({ icon, label, value }) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-gray-400">{label}</h4>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
}
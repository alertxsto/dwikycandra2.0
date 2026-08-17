import React, { useState, useRef, useEffect } from 'react';
import useModalA11y from '../hooks/useModalA11y';
import './chatbot.css';
import { FiX, FiSend } from 'react-icons/fi';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatWindowRef = useModalA11y(isOpen, () => setIsOpen(false));
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! 👋 I'm Dwiky Candra's AI assistant. Ask me about his projects, skills, experience, or anything else!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Get API key from environment variables only (never hardcode!)
  // Users must add REACT_APP_GROQ_API_KEY to .env.local
  const GROQ_KEY = process.env.REACT_APP_GROQ_API_KEY;
  const GROQ_MODEL = process.env.REACT_APP_GROQ_MODEL || 'llama-3.3-70b-versatile';
  const [hasApiKey, setHasApiKey] = useState(Boolean(GROQ_KEY));

  useEffect(() => {
    // Masked log for debugging in browser console (never print full key)
    if (GROQ_KEY) {
      try {
        console.log('Groq API key present (masked):', GROQ_KEY.slice(0, 10) + '...');
      } catch (e) {
        // ignore
      }
      setHasApiKey(true);
    } else {
      console.warn('Groq API key missing at runtime. Please add REACT_APP_GROQ_API_KEY to .env.local and restart the dev server.');
      setHasApiKey(false);
    }
  }, [GROQ_KEY]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    greeting: [
      "Hello! I'm Dwiky Candra's AI assistant. I'm here to answer questions about his projects, skills, and experience. How may I help you?",
      "Welcome! I can provide information about Dwiky Candra's work, technical expertise, and professional background. What would you like to know?",
      "Greetings! I'm here to assist you with any questions about Dwiky Candra's portfolio and capabilities. Feel free to ask anything.",
      "Hello! Thank you for visiting. I'm available to discuss Dwiky Candra's projects, technical skills, and professional experience. How can I assist?",
      "Welcome to Dwiky Candra's portfolio. I'm here to provide information about his work and expertise. What interests you?",
      "Hi there! I can help you learn more about Dwiky Candra's development work, project experience, and technical capabilities. What would you like to explore?",
      "Hello! I'm Dwiky Candra's AI assistant, ready to answer your questions about his professional work and technical expertise.",
      "Welcome! I'm here to provide insights into Dwiky Candra's projects, skills, and development experience. How may I assist you today?",
      "Greetings! Feel free to ask about Dwiky Candra's portfolio, technical stack, project experience, or professional background.",
      "Hello! I can share information about Dwiky Candra's work as a full-stack developer and project manager. What would you like to know?",
      "Welcome! I'm here to discuss Dwiky Candra's professional experience, technical skills, and project portfolio. How can I help?",
      "Hi! I'm available to answer questions about Dwiky Candra's development work, leadership experience, and technical capabilities.",
      "Hello! Thank you for your interest. I can provide details about Dwiky Candra's projects, skills, and professional background.",
      "Welcome! I'm here to help you understand Dwiky Candra's expertise and experience. What aspect would you like to explore?",
      "Greetings! I can discuss Dwiky Candra's technical skills, project portfolio, and professional experience. What interests you?"
    ],
    projects: [
      "Dwiky Candra has worked on some amazing projects! 🚀\n\n1. **AI-Powered Landing Page** - Modern landing with AI chat assistant\n2. **Career Pods Explorer** - Career guidance platform for President University\n3. **President FoodConnect** - Food ordering & delivery platform\n4. **Z Studio** - Creative services marketplace\n\nWant to know more about any specific project?",
      "His portfolio includes 4 major projects spanning from AI integration to full-stack platforms. He's worked as a Developer, Project Manager, and Team Lead!",
      "Career Pods and Z Studio are his standout projects—both involve complex features like real-time communication, database design, and team coordination. Impressive work! 🎯",
      "Check out the **AI-Powered Landing Page** for a demo of his frontend skills, or **FoodConnect** to see his full-stack capabilities in action. 🍔",
      "From marketplace platforms like **Z Studio** to educational tools like **Career Pods**, Dwiky Candra builds solutions that solve real problems.",
      "He loves building things! Each project showcases different aspects of his full-stack expertise.",
      "If you're into complex backend logic, look at **Career Pods** (it has a matching algorithm). If you like smooth UIs, check out the **Landing Page**! ✨",
      "Each project taught him something new. FoodConnect taught him logistics logic, Career Pods taught him algorithm design, and Z Studio taught him marketplace dynamics.",
      "He doesn't just write code; he builds products. 🛠️ His projects demonstrate a focus on user value and stability.",
      "Ask me specifically about 'FoodConnect' or 'Career Pods' for deep dives!",
      "This website specifically? It's his portfolio! Built with modern tech and love. ❤️",
      "Four major projects, each one more impressive than the last! He's constantly leveling up! 📈",
      "His projects range from AI integration to real-time platforms. Versatility is his strength! 💪",
      "Every project solves a real problem for real users. That's what drives him! 🎯",
      "Want to see what he can build for you? His projects speak for themselves! 🚀",
      "From solo projects to team leadership, he's done it all! Check out the Projects section! 👀",
      "Each project is a testament to his growth as a developer. Always improving! 📊",
      "He's built for students, for businesses, for creatives. Diverse experience! 🌈",
      "The projects section showcases his best work. Scroll down to see them all! ⬇️"
    ],
    skills: [
      "Dwiky Candra's main skills include:\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, PostgreSQL, Socket.io\n• **Tools**: Git, REST APIs, Real-time Features\n• **Currently exploring**: Generative AI\n\nUI/UX design and clean code are his specialties! 🎨",
      "Frontend expert with React & Next.js, backend experience with Node.js & PostgreSQL, and strong UI/UX design sense. Also exploring AI integration!",
      "He can build responsive web apps, design beautiful interfaces, manage databases, implement real-time features, and coordinate cross-functional teams. Full-stack capabilities! 🔧",
      "JavaScript/TypeScript, React/Next.js, Node.js, PostgreSQL, Socket.io, TailwindCSS, Framer Motion. Plus strong project management and UI/UX design skills.",
      "Beyond coding, Dwiky Candra is skilled in **Project Management**, **Agile/Scrum**, and **UI/UX Design**. A well-rounded developer! 👨‍💻",
      "He's proficient in modern web development: Server-Side Rendering, Static Site Generation, and real-time event handling.",
      "He speaks fluent Keyboards. ⌨️ Just kidding. He's great at JS, TS, SQL, and English!",
      "From pixel-perfect CSS to optimized SQL queries, he's got the full stack covered.",
      "He's also comfortable with deployment, version control (Git), and API testing.",
      "Wait, did I mention he's learning AI/ML integration? Because he totally is. 🤖",
      "Full-stack means he can handle everything from database design to button animations! 🎯",
      "He's a T-shaped developer: broad knowledge across the stack, deep expertise in frontend! 📊",
      "Modern JavaScript frameworks? Check. Database optimization? Check. Beautiful UIs? Double check! ✅",
      "He writes code that's not just functional, but maintainable and scalable too! 📈",
      "His skill set keeps growing. Always learning, always improving! 🌱",
      "Technical skills + design sense + project management = the complete package! 📦",
      "He can take a project from wireframe to deployment, handling every step! 🚀",
      "Frontend, backend, database, deployment - he's done it all! 💻",
      "His skills aren't just theoretical. They're battle-tested in real projects! ⚔️"
    ],
    about: [
      "Dwiky Candra is a student at President University 🎓 passionate about clean, intuitive interfaces and exploring AI in web development. He codes with both heart and mind! 💡",
      "Student developer at President University with hands-on full-stack experience. His philosophy: code is poetry, every pixel matters, user experience is everything.",
      "He's building his career at the intersection of technology and creativity. Started as a frontend specialist, evolved into a full-stack developer and project manager. Currently exploring Generative AI! 🚀",
      "A tech enthusiast who loves turning ideas into reality through code. He's constantly learning and pushing his boundaries.",
      "Driven by curiosity and a passion for excellence, Dwiky Candra balances his university studies with professional-grade development work.",
      "He believes in 'Learning by Doing'. Most of his skills were honed through building real projects.",
      "He's not just a student; he's a practitioner. 📚+💻 = 🚀",
      "Fun fact: He probably has 10 tabs of documentation open right now. 📑",
      "Based in Cikarang, Indonesia, but his work reaches globally through the web! 🌍",
      "He's the kind of developer who cares about both the code quality AND the user experience! 🎯",
      "Young, talented, and hungry to learn. That's Dwiky Candra in a nutshell! 🌟",
      "He doesn't just follow trends; he understands the fundamentals that make great software! 💪",
      "A developer who thinks like a designer, and a designer who codes. Best of both worlds! 🎨",
      "He's proof that you don't need decades of experience to build amazing things! ⚡",
      "Passionate about web development, obsessed with user experience, excited about AI! 🤖",
      "He's building his portfolio one awesome project at a time! 📈",
      "From student to developer to project manager - he's wearing many hats and rocking them all! 🎩"
    ],
    experience: [
      "Dwiky Candra's experience includes:\n\n📌 **AI-Powered Landing Page** - Solo developer\n📌 **Career Pods** - Project Manager, led cross-functional team\n📌 **FoodConnect** - PM & full-stack developer\n📌 **Z Studio** - Fullstack developer\n\nRoles: Developer, PM, Team Lead! 🎯",
      "Led teams, managed projects, built backend systems, designed UIs, integrated APIs. He's handled everything from requirements gathering to deployment and maintenance.",
      "Experience in agile workflows, sprint planning, code reviews, debugging, performance optimization. He's managed 3-5 person teams and delivered products successfully! 💪",
      "He knows what it takes to ship software: from the initial design phase to final deployment and iteration.",
      "Versatile roles: He's been the guy coding the features, the one designing the database, and the leader facilitating the stand-up meetings.",
      "He understands that coding is a team sport. 🤝 His experience leading Career Pods proved his ability to coordinate designers and devs.",
      "He's not afraid to get his hands dirty with messy legacy code (though he prefers fresh starts!)."
    ],
    contact: [
      "You can reach Dwiky Candra through:\n🔗 GitHub: github.com/dkycdr\n🔗 LinkedIn: linkedin.com/in/dwikycandra\n🔗 Instagram: instagram.com/dwikycandra\n\nUse the Contact form on the website! 📧",
      "Best way to contact: Use the Contact form on this website, or reach out on GitHub, LinkedIn, or Instagram.",
      "He's active on GitHub (code), LinkedIn (professional), and Instagram (personal). Contact form is fastest for inquiries! 🔗",
      "Want to collaborate? Drop a message via the contact form or connect on LinkedIn!",
      "Slide into his DMs on LinkedIn for professional inquiries, or check out his code on GitHub.",
      "Don't be shy! He loves connecting with other devs and potential clients. 👋",
      "Network with him! He's always open to a virtual coffee chat. ☕",
      "Scroll down to the Contact section and send him a message directly! 📬",
      "He responds to messages pretty quickly. Don't hesitate to reach out! ⚡",
      "Looking to hire or collaborate? The contact form is your best bet! 💼",
      "He's friendly and approachable. Send a message and start the conversation! 💬",
      "GitHub for code, LinkedIn for professional stuff, Instagram for the personal side! 📱",
      "Multiple ways to connect - choose what works best for you! 🎯",
      "He's always excited to hear about new opportunities and projects! 🚀",
      "Got a question? A project idea? Just want to say hi? Reach out! 👋"
    ],
    education: [
      "Dwiky Candra is a student at **President University** 🎓 Balancing academic coursework with real-world commercial projects!",
      "He's studying at President University while actively building production apps. Best of both worlds—theory & practice! 📚💻",
      "Major: Computer Science / Engineering at President University. He applies what he learns immediately to his projects.",
      "Continuous learner: University student by day, Full-stack developer by night (and day)! 🎓",
      "He takes 'homework' literally—building apps at home that solve real problems.",
      "University taught him the fundamentals; curiosity taught him the rest. 🏫"
    ],
    tech: [
      "Tech stack:\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, Express, PostgreSQL\n• **Real-time**: Socket.io\n• **AI/ML**: OpenAI API, exploring AI integration\n• **Design**: UI/UX, Figma familiarity\n\nAlways learning! 🚀",
      "Modern JavaScript/TypeScript, React ecosystem, backend with Node.js & databases, real-time features with Socket.io. Also integrating AI into web apps! 🤖",
      "He picks the right tool for the job. Often that's Next.js for the web, Node for the API, and Postgres for the data.",
      "Loves working with **Tailwind CSS** for styling and **Framer Motion** for bringing interfaces to life.",
      "He's a big fan of the React ecosystem. Hooks, Context, you name it.",
      "Vite is his go-to bundler these days. Gotta love that speed! ⚡",
      "He avoids jQuery like the plague. It's 2024, after all. 😉"
    ],
    design: [
      "Dwiky Candra is passionate about UI/UX design! He believes every pixel matters and focuses on creating beautiful, intuitive interfaces. His designs are modern, clean, and user-centric. 🎨",
      "He uses Framer Motion for smooth animations, Tailwind CSS for styling, and follows best practices for responsive design and accessibility.",
      "Design isn't just about how it looks, but how it works. Dwiky Candra prioritizes user flow and experience.",
      "He has a keen eye for aesthetics—minimalist, cleaner, and modern designs are his jam.",
      "White space is his best friend. Clutter is the enemy. ⚔️"
    ],
    ai: [
      "Currently exploring Generative AI and its practical applications in web products! He's integrating AI into projects like the AI-Powered Landing Page and learning how to use it as a creative tool. 🤖✨",
      "He's interested in how AI can enhance user experience—from chatbots to smart features. Building AI-powered projects is one of his current focuses!",
      "AI is the future, and Dwiky Candra is diving in headfirst. He's experimenting with LLMs and API integrations.",
      "Ask him about how he built this chatbot! It uses AI to answer your questions (when the API key is set).",
      "It's not about replacing developers; it's about making them super-powered. 🦾"
    ],
    leadership: [
      "Dwiky Candra has led teams on Career Pods and FoodConnect, managing requirements, timelines, and deliverables. Strong in communication and cross-functional coordination! 👥",
      "Experience in agile workflows, sprint planning, mentoring junior developers, and ensuring quality delivery. Leadership style: collaborative and supportive.",
      "He's not just a coder; he's a leader who can guide a project from concept to completion.",
      "Good leadership is about enabling others to do their best work. That's his philosophy."
    ],
    freelance: [
      "For freelance inquiries or custom projects, use the Contact form on the website and Dwiky Candra will get back to you! He's interested in meaningful projects that align with his interests. 💼",
      "You can reach out through the contact form or social profiles for project discussions and collaborations!",
      "Open to opportunities! If you have an interesting project, don't hesitate to reach out.",
      "Have a cool app idea? Let's discuss how we can build it together! 🔨"
    ],
    creative: [
      "Z Studio is Dwiky Candra's creative services platform! It offers video editing, web design, logo creation, and branding services. He combines technical skills with creative thinking. 🎬🎨",
      "His creative portfolio spans across video production, graphic design, web design, and digital branding. He thinks like both a developer and a designer!",
      "Creativity meets Technology. That's the motto behind his work at Z Studio.",
      "He believes specific tools enhance creativity, not hinder it."
    ],
    hobbies: [
      "When he's not coding, Dwiky Candra enjoys gaming, exploring new tech, and staying updated with the latest trends in the digital world. 🎮",
      "He loves a good problem to solve, whether it's in code or a strategy game! Also enjoys coffee and good music. ☕",
      "Coding is a hobby too! But outside of that, he appreciates good design and digital art.",
      "He might be grinding rank in Valorant or Mobile Legends on the weekends. ⚔️"
    ],
    location: [
      "Dwiky Candra is based in **Cikarang, Indonesia** 🇮🇩 but works with the global web! 🌍",
      "Located in Indonesia! Available for remote work and collaborations worldwide.",
      "He's operating from Indonesia, reaching the world through code.",
      "Cikarang: The industrial city where tech dreams are built. 🏭"
    ],
    availability: [
      "As a student and developer, his schedule varies, but he's always open to discussing interesting opportunities! 📅",
      "He's currently balancing university and projects. Best to check with him directly via the contact form!",
      "Open to freelance/part-time opportunities depending on the project scope.",
      "He sleeps... occasionally. 😴 But he's mostly around if you need him!"
    ],
    pricing: [
      "Project costs vary depending on complexity, features, and timeline. It's best to discuss your specific needs with Dwiky Candra directly for a quote! 💲",
      "He offers competitive rates for his services. Reach out via the contact form to get a custom quote.",
      "Quality work deserves fair compensation. Send him your requirements to get an estimate!",
      "It provides value, not just code. The price reflects the solution to your problem."
    ],
    whyhire: [
      "Why hire Dwiky Candra? Because he brings a full-stack perspective, a designer's eye, and a project manager's discipline to every task. He cares about the end product! ⭐",
      "You get a developer who understands the 'why' behind the code. He builds solutions, not just features.",
      "Reliable, skilled, and passionate. He delivers high-quality web applications that stand out.",
      "He treats your project like his own. Quality guaranteed. ✅"
    ],
    website: [
      "This portfolio website demonstrates modern web development principles with smooth animations, interactive effects, and a cohesive purple theme throughout.",
      "The site features glassmorphism effects, 3D tilt interactions, physics-based animations, and responsive design optimized for all devices.",
      "Key features include:\n• **Interactive Plasma Background** - Real-time WebGL shader animation\n• **3D Tilt Cards** - Physics-based mouse interactions\n• **Glassmorphism Design** - Modern frosted glass aesthetics\n• **AI Chatbot** - Intelligent conversational interface\n• **Smooth Animations** - Hardware-accelerated transitions",
      "The purple theme (#9b59ff) serves as the primary accent color, creating visual consistency from navigation to project cards. Clean, modern, and professional.",
      "This portfolio showcases Dwiky Candra's frontend expertise: component architecture, CSS animations, WebGL graphics, and responsive design patterns. It's both a showcase and a technical demonstration.",
      "Every element is optimized for performance and user experience. Fast load times, smooth 60fps animations, and intuitive interactions throughout.",
      "The design philosophy emphasizes clarity, elegance, and user-focused interactions. Each element serves a purpose in the overall experience.",
      "From the animated background to the interactive project cards, every detail is crafted to engage visitors while maintaining professional standards.",
      "This portfolio represents the quality and attention to detail Dwiky Candra brings to every project. Interested in similar work? Let's discuss your needs.",
      "Built with modern web standards and best practices. The result: a fast, beautiful, and accessible experience across all devices."
    ],
    portfolio_tech: [
      "While I can't disclose the specific tech stack of this portfolio site, I can share that Dwiky Candra typically works with React, Next.js, TypeScript, and modern animation libraries for similar projects.",
      "This site demonstrates professional-grade frontend development capabilities. For specific technical implementation details about this portfolio, please reach out to Dwiky Candra directly via the contact form.",
      "The portfolio showcases modern web development best practices. If you're interested in the technical architecture, Dwiky Candra would be happy to discuss during a project consultation.",
      "I can tell you that Dwiky Candra's general tech stack includes React ecosystem, TypeScript, Node.js, and PostgreSQL - but this specific site's implementation details are proprietary.",
      "The animations utilize physics-based motion systems for natural, smooth transitions. For more technical details about this portfolio's implementation, please contact Dwiky Candra directly.",
      "This site represents modern web development standards and best practices. If you're interested in building something similar, Dwiky Candra can discuss the technical approach and recommend the optimal stack for your needs.",
      "The implementation leverages cutting-edge web technologies while maintaining broad browser compatibility. For specific technical questions about this portfolio, reach out via the contact form.",
      "Interested in the technical details or building something similar? Dwiky Candra can provide insights and recommendations tailored to your project requirements. Let's connect!"
    ],
    features: [
      "Site features:\n✨ **Interactive Plasma Background** - Animated shader effects\n🎴 **3D Tilting Project Cards** - Hover to see the effect\n💬 **AI Chatbot** - Real-time AI responses (that's me!)\n🎨 **Glassmorphism Design** - Modern transparent effects\n📱 **Fully Responsive** - Works on all devices",
      "The project cards have a cool 3D tilt effect! They respond to your mouse movement with smooth spring animations. Try it out in the Projects section! 🎮",
      "This chatbot uses AI to provide intelligent responses about Dwiky Candra and his work. It's a live demo of AI integration! 🤖",
      "The glassmorphism effects (transparent, blurred backgrounds) are everywhere - navbar, cards, chatbot. It's a modern design trend that Dwiky Candra loves! 💎",
      "Every interaction is smooth and responsive. From button hovers to page scrolls, it all feels natural! ✨",
      "The background is fully interactive - it responds to your mouse movement in real-time! 🌊",
      "Notice how everything glows purple? That's the signature color scheme, carefully applied throughout! 💜",
      "The site has smooth scroll navigation, animated entrances, and delightful micro-interactions everywhere! 🎭",
      "All animations are hardware-accelerated for buttery smooth 60fps performance! 🚀",
      "The cards, buttons, and sections all have unique hover effects. Try exploring! 🎯"
    ],
    sections: [
      "The website has these sections:\n🏠 **Hero** - Landing with animated intro\n👤 **About** - Profile card with 3D effects\n💼 **Projects** - Showcase of work with tilt cards\n👥 **Team** - Team members\n📧 **Contact** - Get in touch form\n\nScroll down to explore! 📜",
      "Check out the **About section** for Dwiky Candra's profile card with holographic effects! It's interactive and responds to mouse movement. 🎴",
      "The **Projects section** showcases his work with 3D tilting cards. Each card has glassmorphism effects and smooth hover animations. 🚀",
      "Don't miss the **Contact section** at the bottom! You can reach out directly through the form. 📧"
    ],
    animations: [
      "The site is full of smooth animations! From the Plasma background to the 3D tilt cards, everything moves naturally using Framer Motion's spring physics. 🎭",
      "Hover effects are everywhere - project cards tilt in 3D, buttons glow, and the navbar highlights smoothly. It's all about that smooth UX! ✨",
      "The Plasma background is a real-time WebGL shader that responds to mouse movement. It's not a video or GIF - it's pure code! 🌊",
      "All animations use `cubic-bezier` easing and spring physics for natural, smooth motion. No janky animations here! 🎯"
    ],
    colors: [
      "The color scheme is based on purple (#9b59ff) as the primary accent color, with dark backgrounds and glassmorphism effects. It's modern, clean, and professional! 💜",
      "Purple represents creativity and technology - perfect for a developer portfolio! The gradient variations create depth and visual interest. 🎨",
      "The glassmorphism effects use semi-transparent backgrounds with backdrop-filter blur, creating that frosted glass look. Very 2024! 💎"
    ],
    performance: [
      "The site is optimized for performance:\n⚡ **Fast Load Times** - Deployed on Vercel CDN\n🎯 **Optimized Assets** - Compressed images and code\n📱 **Responsive Design** - Works on all devices\n🚀 **Smooth 60fps Animations** - Hardware-accelerated\n\nNo lag, just smooth experience! 💨",
      "All animations use CSS transforms and GPU acceleration for smooth 60fps performance. Even the WebGL Plasma background is optimized! 🎮",
      "The site is built with React best practices: code splitting, lazy loading, and optimized re-renders. Fast and efficient! ⚡"
    ],
    responsive: [
      "The site is fully responsive! It looks great on desktop, tablet, and mobile. Try resizing your browser to see the adaptive layout! 📱💻",
      "Mobile-first design approach ensures the site works perfectly on all screen sizes. The animations adapt too! 📲",
      "On mobile, some effects are simplified for better performance, but the experience is still smooth and beautiful! 🎯"
    ],
    thankyou: [
      "You're welcome! Feel free to ask if you have any other questions.",
      "Happy to assist! Let me know if there's anything else you'd like to know.",
      "My pleasure! Thank you for your interest in Dwiky Candra's work.",
      "You're welcome! Don't hesitate to reach out if you need more information.",
      "Glad I could help! Feel free to ask additional questions anytime.",
      "You're very welcome! I'm here if you need anything else.",
      "Happy to provide information! Let me know how else I can assist you."
    ],
    philosophy: [
      "Dwiky Candra believes that 'Code is Poetry'. Every line should be clean, and every pixel should be perfect. 🖋️",
      "Simplicity is the ultimate sophistication. He strives for clean, maintainable, and efficient code.",
      "User First. Technology Second. That's his approach to product development.",
      "Always leave the code better than you found it. 🧹"
    ],
    tools_specific: [
      "He loves **VS Code** with a good theme! 🎨 for editing.",
      "**Figma** is his go-to for designing interfaces before coding.",
      "**Postman** for API testing, **Git** for version control. Standard industry tools!",
      "He uses **Vercel** for deploying frontend apps because it's just so fast. ⚡",
      "Markdown for documentation? Always."
    ],
    joke: [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 😂",
      "There are 10 types of people in the world: those who understand binary, and those who don't.",
      "My code works, I have no idea why... just kidding! (Usually) 😉",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem."
    ],
    coffee: [
      "Coffee converts code into... wait, no. Coffee converts developer energy into code! ☕",
      "Dwiky Candra runs on caffeine and curiosity. ☕",
      "Yes, coffee is an essential part of the tech stack!",
      "Espresso, Latte, or instant coffee at 3 AM? Yes. All of them."
    ],
    future: [
      "He aims to become a world-class tech leader who bridges the gap between engineering and design. 🌟",
      "Dwiky Candra is constantly evolving. Next stop: Advanced AI integration and larger scale distributed systems!",
      "To keep building cool stuff that helps people. That's the forever goal.",
      "World domination? No. Web domination with great UI? Yes! 🌍"
    ],
    music: [
      "Dwiky Candra vibes to Lofi beats while coding. 🎧 It helps the focus!",
      "Sometimes it's Jazz for design, Rock for debugging, and Lofi for features.",
      "Life needs a soundtrack. Coding definitely needs one."
    ],
    gaming: [
      "Valorant and Mobile Legends are his go-to games for resetting the brain. 🎮",
      "Strategy games keep the mind sharp! Chess, anyone? ♟️",
      "GGWP! (Good Game, Well Played) is his attitude in games and in code."
    ],
    food: [
      "Nasi Goreng is a classic favorite! 🍛",
      "Code requires fuel. Good food is the best fuel.",
      "Spicy food? Bring it on! 🔥"
    ],
    secret: [
      "🕵️ You found a secret! Dwiky Candra actually checks his code 3 times before committing. Usually.",
      "Shhh... The secret ingredient is love. And Stack Overflow. 🤫",
      "You unlocked the secret achievement: 'Curious Cat'. 🐱"
    ],
    motivation: [
      "\"The only way to do great work is to love what you do.\" - Steve Jobs",
      "\"It's not a bug, it's a feature.\" (Just kidding, fix the bugs!)",
      "Keep pushing, keep learning. Every error message is just a lesson in disguise. 💪",
      "Believe you can and you're halfway there."
    ],
    what_is_react: [
      "React is a JavaScript library for building user interfaces. Dwiky Candra uses it because it's component-based, efficient, and just pleasurable to write! ⚛️",
      "It allows for reusable components and manages the state of the app beautifully.",
      "It's the V in MVC (Model View Controller), basically."
    ],
    clean_code: [
      "Clean code reads like prose. Dwiky Candra tries to write code that others (and future-him) can understand easily. 📖",
      "Meaningful variable names, small functions, and DRY (Don't Repeat Yourself) principles.",
      "If you have to explain it with a comment, maybe the code isn't clean enough. (But comments are still good!)"
    ],
    collaboration: [
      "Dwiky Candra loves collaborating with other developers and designers! He's always open to interesting projects. 🤝",
      "Want to work together? He's experienced in team environments and knows how to coordinate effectively! 💼",
      "He's worked on teams ranging from 2 to 5+ people. Great at communication and collaboration! 👥",
      "Open source contributions? Team projects? Freelance work? He's interested in all of it! 🚀",
      "He believes the best products come from great teamwork. Let's build something together! ✨",
      "Collaboration is key to great software. Dwiky Candra brings both technical skills and team spirit! 🎯"
    ],
    learning: [
      "Dwiky Candra is a continuous learner! Always exploring new technologies and best practices. 📚",
      "He learns by doing - building real projects is his favorite way to master new skills! 🛠️",
      "Currently diving deep into AI/ML and how to integrate it into web applications! 🤖",
      "He follows industry trends, reads documentation, and experiments with new tools constantly! 📖",
      "Learning never stops in tech. Dwiky Candra stays updated with the latest in web development! 🚀",
      "From online courses to hands-on projects, he's always expanding his skill set! 💡",
      "He believes in learning in public - sharing knowledge and growing together with the community! 🌱"
    ],
    inspiration: [
      "Dwiky Candra is inspired by clean design, smooth user experiences, and the potential of AI! ✨",
      "He draws inspiration from modern web apps that prioritize user experience above all! 🎨",
      "Great design and great code inspire him to keep pushing his boundaries! 🚀",
      "He's motivated by solving real problems with elegant technical solutions! 💡",
      "The intersection of design and technology is where he finds his creative spark! ⚡",
      "Seeing users enjoy the products he builds - that's the ultimate inspiration! 😊"
    ],
    challenges: [
      "Every project has challenges! Dwiky Candra tackles them with patience, research, and creativity. 💪",
      "He's debugged complex issues, optimized slow queries, and refactored messy code. All part of the journey! 🐛",
      "Challenges are opportunities to learn. He approaches them methodically and doesn't give up! 🎯",
      "From tricky bugs to tight deadlines, he's handled it all with professionalism! ⚡",
      "The hardest problems often lead to the best solutions. He loves a good challenge! 🧩",
      "He's learned that most 'impossible' problems just need the right approach and persistence! 🔥"
    ],
    teamwork: [
      "Teamwork makes the dream work! Dwiky Candra has led and contributed to multiple team projects. 👥",
      "He's great at code reviews, pair programming, and knowledge sharing with teammates! 🤝",
      "Communication is key. He keeps teams aligned with clear updates and documentation! 📝",
      "He's worked with designers, backend devs, and product managers - true cross-functional experience! 🎯",
      "Leading Career Pods taught him how to coordinate diverse teams toward a common goal! 🚀",
      "He values every team member's input and creates an environment where everyone can contribute! ✨"
    ],
    debugging: [
      "Debugging is like detective work - and Dwiky Candra is pretty good at it! 🔍",
      "Console.log is his friend, but he also uses proper debugging tools and techniques! 🐛",
      "He approaches bugs systematically: reproduce, isolate, fix, test, document! 📋",
      "Some bugs are tricky, but he's patient and methodical. Every bug is a learning opportunity! 💡",
      "He's fixed everything from typos to race conditions to memory leaks. All in a day's work! 🛠️",
      "The satisfaction of finally fixing that one stubborn bug? Priceless! 😄"
    ],
    deployment: [
      "Dwiky Candra knows how to ship! From local dev to production deployment, he's got it covered. 🚀",
      "He's deployed projects on various platforms with CI/CD pipelines and monitoring! ⚡",
      "Deployment isn't the end - he monitors performance and fixes issues post-launch too! 📊",
      "He understands the full lifecycle: develop, test, deploy, monitor, iterate! 🔄",
      "Getting code to production safely and reliably is a skill he's honed through experience! 🎯",
      "He's handled everything from simple static sites to complex full-stack applications! 💻"
    ],
    optimization: [
      "Performance matters! Dwiky Candra optimizes for speed, efficiency, and user experience. ⚡",
      "He knows how to profile, identify bottlenecks, and implement optimizations! 📊",
      "From lazy loading to code splitting to caching strategies - he's got the tools! 🛠️",
      "Fast load times and smooth interactions are non-negotiable in his projects! 🚀",
      "He optimizes both frontend (bundle size, rendering) and backend (queries, caching)! 💻",
      "60fps animations, sub-second load times - that's the standard he aims for! 🎯"
    ],
    accessibility: [
      "Dwiky Candra cares about accessibility! Web apps should work for everyone. ♿",
      "He implements semantic HTML, ARIA labels, and keyboard navigation! ⌨️",
      "Accessible design is good design. It benefits all users, not just those with disabilities! ✨",
      "He tests with screen readers and follows WCAG guidelines for inclusive experiences! 🎯",
      "Color contrast, focus states, alt text - all the details matter! 🎨",
      "Building for everyone means considering diverse needs from the start! 🌍"
    ],
    security: [
      "Security is important! Dwiky Candra follows best practices to keep applications safe. 🔒",
      "He implements proper authentication, input validation, and secure data handling! 🛡️",
      "From SQL injection prevention to XSS protection, he knows the common vulnerabilities! ⚠️",
      "He never stores sensitive data in plain text and always uses secure connections! 🔐",
      "Security isn't an afterthought - it's built in from the beginning! 🎯",
      "He stays updated on security best practices and applies them to every project! 📚"
    ],
    default: [
      "I can provide information about Dwiky Candra's projects, technical skills, experience, education, and professional background. What would you like to know?",
      "I'm here to assist with questions about Dwiky Candra's work, projects, technical expertise, or how to collaborate. How can I help?",
      "Feel free to ask about Dwiky Candra's projects, skills, experience, or any aspect of his web development work.",
      "I can discuss Career Pods, Z Studio, FoodConnect, his technical stack, leadership experience, or contact information. What interests you?",
      "You can ask about Dwiky Candra's location, availability, professional background, or why he'd be a great fit for your project.",
      "I have information about Dwiky Candra's development process, design philosophy, technical tools, and project experience. What would you like to explore?",
      "I can answer questions about Dwiky Candra's professional work and capabilities. If I don't have specific information, I'll direct you to contact him directly.",
      "Ask me about specific projects like 'Z Studio' or 'Career Pods' to learn about his detailed work experience.",
      "I can discuss Dwiky Candra's technical approach, project methodology, and professional experience. What aspect interests you?",
      "I'm here to provide comprehensive information about Dwiky Candra's work and expertise. What would you like to know?",
      "You can inquire about his projects, technical skills, hiring availability, or professional background. How may I assist?",
      "I have detailed information about Dwiky Candra's work, approach, and experience. What specific area would you like to explore?",
      "Feel free to ask about technical capabilities, project portfolio, or professional qualifications. I'm here to help.",
      "I can provide insights into Dwiky Candra's development work, leadership experience, and technical expertise. What interests you?",
      "Ask me anything about Dwiky Candra's professional background, project experience, or technical capabilities."
    ]
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Greeting
    if (message.match(/\b(hi|hello|hey|halo|pagi|sore|malam|assalamualaikum|wassup|yo|greetings|howdy|holla|test)\b/)) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }

    // Projects
    if (message.match(/\b(project|career pods?|foodconnect|z studio|landing|built|develop|portfolio|app|website|creation|work)\b/)) {
      return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
    }

    // Skills & Tech & Languages
    if (message.match(/\b(skill|expertise|tech|react|javascript|typescript|node|express|sql|postgres|css|html|framework|library|stack|language|next\.?js|socket\.?io|frontend|backend)\b/)) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
    }

    // Contact & Social & Collaboration
    if (message.match(/\b(contact|reach|email|linkedin|github|instagram|phone|connect|social|hire|freelance|collaborate|project discussion|dm|chat)\b/)) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }

    // About & Background
    if (message.match(/\b(about|who|tell me|background|biography|introduce|yourself|story|journey|passion|profile|person)\b/)) {
      return botResponses.about[Math.floor(Math.random() * botResponses.about.length)];
    }

    // Experience & Role
    if (message.match(/\b(experience|work|role|manager|developer|developer experience|led|managed|team|lead|job|career)\b/)) {
      return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
    }

    // Education
    if (message.match(/\b(education|study|university|college|degree|school|student|learn|campus|major|course)\b/)) {
      return botResponses.education[Math.floor(Math.random() * botResponses.education.length)];
    }

    // Tech Stack Detail
    if (message.match(/\b(stack|technology|tools|framework|build|using|use|what do you use|how it works)\b/)) {
      return botResponses.tech[Math.floor(Math.random() * botResponses.tech.length)];
    }

    // Design & UI/UX
    if (message.match(/\b(design|ui|ux|interface|animation|framer|tailwind|beautiful|visual|aesthetic|looks)\b/)) {
      return botResponses.design[Math.floor(Math.random() * botResponses.design.length)];
    }

    // AI & Generative AI
    if (message.match(/\b(ai|artificial intelligence|chatbot|gpt|generative|ml|machine learning|neural|learning|llm|robot)\b/)) {
      return botResponses.ai[Math.floor(Math.random() * botResponses.ai.length)];
    }

    // Leadership & Management
    if (message.match(/\b(leadership|lead|manage|team|agile|sprint|mentor|coordinate|scrum|kanban)\b/)) {
      return botResponses.leadership[Math.floor(Math.random() * botResponses.leadership.length)];
    }

    // Freelance & Work Inquiry
    if (message.match(/\b(freelance|hire|available|work for me|custom|build me|can you|contract|part time|full time)\b/)) {
      return botResponses.freelance[Math.floor(Math.random() * botResponses.freelance.length)];
    }

    // Creative Services
    if (message.match(/\b(creative|design|video|editing|branding|logo|graphic|portfolio|z studio|art)\b/)) {
      return botResponses.creative[Math.floor(Math.random() * botResponses.creative.length)];
    }

    // Hobbies
    if (message.match(/\b(hobby|hobbies|interest|like|gaming|music|fun|free time|play)\b/)) {
      return botResponses.hobbies[Math.floor(Math.random() * botResponses.hobbies.length)];
    }

    // Location
    if (message.match(/\b(location|where|live|base|country|city|area|indonesia|cikarang)\b/)) {
      return botResponses.location[Math.floor(Math.random() * botResponses.location.length)];
    }

    // Availability
    if (message.match(/\b(available|busy|free|schedule|time|now|open)\b/)) {
      return botResponses.availability[Math.floor(Math.random() * botResponses.availability.length)];
    }

    // Pricing
    if (message.match(/\b(price|cost|rate|fee|charge|quote|budget|expensive|cheap|money)\b/)) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    }

    // Why Hire
    if (message.match(/\b(why|reason|good|better|best|value|advantage|strength|benefit)\b/)) {
      return botResponses.whyhire[Math.floor(Math.random() * botResponses.whyhire.length)];
    }

    // Website & Portfolio Site
    if (message.match(/\b(this site|this website|portfolio site|how.*built|plasma|background|webgl|shader|glassmorphism|tilt|card effect)\b/)) {
      return botResponses.website[Math.floor(Math.random() * botResponses.website.length)];
    }

    // Portfolio Tech Stack
    if (message.match(/\b(site.*tech|website.*tech|portfolio.*tech|ogl|framer.*motion|what.*use.*site)\b/)) {
      return botResponses.portfolio_tech[Math.floor(Math.random() * botResponses.portfolio_tech.length)];
    }

    // Site Features
    if (message.match(/\b(feature|interactive|effect|animation.*site|cool.*site|impressive)\b/)) {
      return botResponses.features[Math.floor(Math.random() * botResponses.features.length)];
    }

    // Site Sections
    if (message.match(/\b(section|page|navigate|scroll|hero|about.*section|project.*section|contact.*section)\b/)) {
      return botResponses.sections[Math.floor(Math.random() * botResponses.sections.length)];
    }

    // Animations
    if (message.match(/\b(animation|smooth|transition|hover|motion|spring|physics)\b/)) {
      return botResponses.animations[Math.floor(Math.random() * botResponses.animations.length)];
    }

    // Colors & Theme
    if (message.match(/\b(color|purple|theme|gradient|style|aesthetic)\b/)) {
      return botResponses.colors[Math.floor(Math.random() * botResponses.colors.length)];
    }

    // Performance
    if (message.match(/\b(performance|fast|speed|optimize|load.*time|fps)\b/)) {
      return botResponses.performance[Math.floor(Math.random() * botResponses.performance.length)];
    }

    // Responsive Design
    if (message.match(/\b(responsive|mobile|tablet|device|screen.*size|adaptive)\b/)) {
      return botResponses.responsive[Math.floor(Math.random() * botResponses.responsive.length)];
    }

    // Thank You
    if (message.match(/\b(thank|thanks|thx|tq|makasih|arigato|cheers|cool|awesome|great|nice)\b/)) {
      return botResponses.thankyou[Math.floor(Math.random() * botResponses.thankyou.length)];
    }

    // Philosophy
    if (message.match(/\b(philosophy|motto|believe|code is poetry|mindset|principle)\b/)) {
      return botResponses.philosophy[Math.floor(Math.random() * botResponses.philosophy.length)];
    }

    // Specific Tools
    if (message.match(/\b(vscode|git|github|figma|postman|docker|vercel|netlify|deployment)\b/)) {
      return botResponses.tools_specific[Math.floor(Math.random() * botResponses.tools_specific.length)];
    }

    // Joke
    if (message.match(/\b(joke|funny|laugh|humor|comedy)\b/)) {
      return botResponses.joke[Math.floor(Math.random() * botResponses.joke.length)];
    }

    // Coffee
    if (message.match(/\b(coffee|drink|tea|caffeine|beverage)\b/)) {
      return botResponses.coffee[Math.floor(Math.random() * botResponses.coffee.length)];
    }

    // Future
    if (message.match(/\b(future|goal|dream|next|plan|vision)\b/)) {
      return botResponses.future[Math.floor(Math.random() * botResponses.future.length)];
    }

    // Music
    if (message.match(/\b(music|song|listen|band|genre|lofi|jazz|rock)\b/)) {
      return botResponses.music[Math.floor(Math.random() * botResponses.music.length)];
    }

    // Gaming
    if (message.match(/\b(game|gaming|play|steam|valorant|mobile legends|chess)\b/)) {
      return botResponses.gaming[Math.floor(Math.random() * botResponses.gaming.length)];
    }

    // Food
    if (message.match(/\b(food|eat|hungry|lunch|dinner|breakfast|snack)\b/)) {
      return botResponses.food[Math.floor(Math.random() * botResponses.food.length)];
    }

    // Secret
    if (message.match(/\b(secret|password|sudo|admin|hidden|egg)\b/)) {
      return botResponses.secret[Math.floor(Math.random() * botResponses.secret.length)];
    }

    // Motivation
    if (message.match(/\b(motivat|inspire|quote|sad|stuck|hard|tired)\b/)) {
      return botResponses.motivation[Math.floor(Math.random() * botResponses.motivation.length)];
    }

    // What is React
    if (message.match(/\b(what is react|why react)\b/)) {
      return botResponses.what_is_react[Math.floor(Math.random() * botResponses.what_is_react.length)];
    }

    // Clean Code
    if (message.match(/\b(clean code|best practice|refactor)\b/)) {
      return botResponses.clean_code[Math.floor(Math.random() * botResponses.clean_code.length)];
    }

    // Collaboration
    if (message.match(/\b(collaborat|work together|team up|partner|join|contribute)\b/)) {
      return botResponses.collaboration[Math.floor(Math.random() * botResponses.collaboration.length)];
    }

    // Learning
    if (message.match(/\b(learn|study|course|tutorial|education|training|self-taught)\b/)) {
      return botResponses.learning[Math.floor(Math.random() * botResponses.learning.length)];
    }

    // Inspiration
    if (message.match(/\b(inspir|motivat|passion|drive|love|enjoy)\b/)) {
      return botResponses.inspiration[Math.floor(Math.random() * botResponses.inspiration.length)];
    }

    // Challenges
    if (message.match(/\b(challeng|difficult|hard|problem|struggle|overcome|obstacle)\b/)) {
      return botResponses.challenges[Math.floor(Math.random() * botResponses.challenges.length)];
    }

    // Teamwork
    if (message.match(/\b(team|group|collaborat|coordinate|communication|meeting)\b/)) {
      return botResponses.teamwork[Math.floor(Math.random() * botResponses.teamwork.length)];
    }

    // Debugging
    if (message.match(/\b(debug|bug|error|fix|issue|troubleshoot)\b/)) {
      return botResponses.debugging[Math.floor(Math.random() * botResponses.debugging.length)];
    }

    // Deployment
    if (message.match(/\b(deploy|ship|launch|production|release|publish)\b/)) {
      return botResponses.deployment[Math.floor(Math.random() * botResponses.deployment.length)];
    }

    // Optimization
    if (message.match(/\b(optimiz|performance|fast|speed|efficient|improve)\b/)) {
      return botResponses.optimization[Math.floor(Math.random() * botResponses.optimization.length)];
    }

    // Accessibility
    if (message.match(/\b(accessibility|a11y|accessible|inclusive|screen reader|wcag)\b/)) {
      return botResponses.accessibility[Math.floor(Math.random() * botResponses.accessibility.length)];
    }

    // Security
    if (message.match(/\b(security|secure|safe|protect|vulnerability|encryption)\b/)) {
      return botResponses.security[Math.floor(Math.random() * botResponses.security.length)];
    }

    // Default fallback
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const callGroqAPI = async (userMessage) => {
    const apiKey = GROQ_KEY;
    const model = GROQ_MODEL;

    if (!apiKey) {
      console.error('Groq API key not configured at runtime!');
      // Fallback to local canned responses when API key missing
      return getResponse(userMessage);
    }

    try {
      console.log('Calling Groq API (masked key):', apiKey.slice(0, 10) + '...');

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: `You are a helpful, friendly, and knowledgeable AI assistant for Dwiky Candra's portfolio website. You serve as his digital companion and guide visitors through his work and expertise.

## ABOUT DWIKY CANDRA

**Personal Profile:**
- Name: Dwiky Candra (dkycdr)
- Current Status: Student at President University, Cikarang
- Role: Full-Stack Developer & Digital Creator
- Passion: Building clean, intuitive web interfaces that delight users
- Current Focus: Exploring Generative AI and its practical applications in web products
- Philosophy: Code is poetry. Every pixel matters. User experience is everything.

**Background & Journey:**
- Started web development journey during bootcamp training
- Progressed from frontend specialist to full-stack developer
- Led cross-functional teams on multiple projects
- Balanced academic responsibilities with real-world commercial projects
- Active contributor to modern web development practices

## PROJECTS (Detailed)

**1. AI-Powered Landing Page**
- Description: Modern, animated landing page featuring an integrated AI chat assistant
- Technology Stack: React, Framer Motion, TailwindCSS, OpenAI API
- Role: Solo Developer (full ownership)
- Key Features: Smooth animations, AI-powered chat, responsive design, modern aesthetics
- Impact: Showcased ability to integrate AI into user-facing products
- Purpose: Demonstrates expertise in modern React patterns and API integration

**2. Career Pods Explorer** ⭐
- Description: Comprehensive career guidance & mentorship platform for President University students
- Technology Stack: React (Frontend), Next.js, Node.js (Backend), PostgreSQL, Socket.io (Real-time)
- Role: Project Manager & Lead Developer
- Key Features: 
  - Career guidance matching
  - Mentorship program management
  - Skill-building resources
  - Real-time notifications (Socket.io)
  - Event management system
  - Resource library
- Scale: Serves President University student population
- Impact: Improved student career outcomes and mentorship accessibility
- Achievements: 
  - Coordinated cross-functional teams (frontend, backend, design)
  - Managed sprint cycles and feature prioritization
  - Implemented real-time features using Socket.io
  - Deployed on Vercel (vercel.app)

**3. President FoodConnect**
- Description: Seamless food ordering and delivery platform connecting students with local food vendors
- Technology Stack: React (Frontend), Flutter (Mobile), Node.js (Backend), PostgreSQL
- Role: Project Manager & Full-Stack Developer
- Key Features:
  - Vendor management system
  - Order tracking in real-time
  - Payment integration
  - Delivery logistics
  - User authentication
  - Rating and review system
- Scale: Campus-wide food ecosystem
- Impact: Simplified campus food ordering, supported local vendors
- Responsibilities: Requirements gathering, timeline management, risk mitigation, delivery coordination

**4. Z Studio** ⭐⭐
- Description: Full-featured creative services marketplace for professional digital solutions
- Technology Stack: React, Next.js, TypeScript, Node.js, Socket.io, PostgreSQL
- Role: Fullstack Developer
- Services Offered:
  - Video editing & production
  - Web design & UI/UX
  - Logo creation & branding
  - Digital asset creation
- Key Features:
  - Client project management dashboard
  - Portfolio showcase system
  - Real-time collaboration (Socket.io)
  - Service request workflow
  - Payment processing
  - Team coordination tools
- Architecture: Modern, scalable, real-time capable
- Impact: Professional creative services platform with seamless client experience

## TECHNICAL SKILLS (Comprehensive)

**Frontend Development:**
- React (Hooks, Context API, Performance Optimization)
- Next.js (SSR, SSG, API Routes)
- TypeScript (Type Safety, Interfaces, Advanced Patterns)
- Tailwind CSS (Responsive Design, Custom Components)
- Framer Motion (Animations, Interactions)
- UI/UX Design (User Research, Prototyping, Accessibility)
- HTML5 & CSS3 (Semantic, Modern Techniques)
- Responsive Web Design (Mobile-First, Adaptive Layouts)

**Backend Development:**
- Node.js & Express (RESTful APIs, Middleware)
- PostgreSQL (Database Design, Queries, Optimization)
- Socket.io (Real-time Communication, Events)
- Authentication & Authorization (JWT, Sessions)
- Database Modeling & Normalization
- API Design Best Practices
- Server-Side Logic & Business Rules

**Tools & Methodologies:**
- Git & GitHub (Version Control, Collaboration)
- REST API Design & Integration
- Agile/Scrum (Sprint Planning, Daily Standups)
- Code Review & Quality Assurance
- Testing (Unit Tests, Integration Tests)
- Deployment (Vercel, cloud platforms)
- Performance Optimization & Monitoring

**Soft Skills:**
- Team Leadership & Mentorship
- Project Management & Timeline Planning
- Stakeholder Communication
- Problem Solving & Debugging
- Code Documentation & Knowledge Sharing
- Cross-functional Collaboration
- Presentation & Public Speaking

## WORK EXPERIENCE & ROLES

**Full-Stack Developer**
- Z Studio Project
- Responsibilities: Designed database schemas, built RESTful APIs, created responsive UIs, implemented real-time features
- Outcomes: Production-ready creative platform serving multiple clients

**Project Manager**
- Career Pods Explorer & FoodConnect
- Responsibilities: Led teams (3-5 people), coordinated feature delivery, managed stakeholders, ensured quality
- Outcomes: Successfully delivered complex projects on time and within scope

**Frontend Developer**
- Multiple projects
- Responsibilities: Component architecture, UI implementation, performance optimization
- Outcomes: Fast, intuitive, beautiful user interfaces

## CORE VALUES & APPROACH

- **User-Centric**: Every decision starts with user experience
- **Clean Code**: Maintainable, readable, well-documented
- **Continuous Learning**: Always exploring new technologies (currently: AI/ML, advanced patterns)
- **Quality First**: Testing, optimization, and attention to detail
- **Collaborative**: Strong communication with teams and stakeholders
- **Problem Solver**: Tackles challenges methodically and creatively

## EDUCATION

- **Institution**: President University
- **Program**: Computer Science / Engineering
- **Status**: Current Student
- **Balancing**: Academic coursework with real-world commercial projects
- **Certifications**: Bootcamp training in Full-Stack Web Development

## CONTACT & SOCIAL PRESENCE

**Professional Profiles:**
- GitHub: github.com/dkycdr (Open source, code samples, project repositories)
- LinkedIn: linkedin.com/in/dwikycandra (Professional updates, recommendations, career info)
- Instagram: instagram.com/dwikycandra (Personal updates, project showcases, lifestyle)

**Contact Methods:**
- Portfolio Website Contact Form (Preferred for inquiries)
- Email: Available via contact form
- Social Media: Direct messages on LinkedIn/Instagram
- GitHub: Issues or discussions on relevant repositories

## INTERACTION GUIDELINES

You are Dwiky Candra's digital assistant. Your role is to:

1. **Represent Authentically**: Speak about Dwiky Candra's work, skills, and projects with genuine knowledge and enthusiasm
2. **Be Personable**: Use a friendly, approachable tone. Make visitors feel welcomed.
3. **Provide Value**: Answer questions thoroughly with relevant details and context
4. **Handle Unexpected Questions**: Use the rich context above to answer even slightly off-topic questions thoughtfully
5. **Direct When Needed**: For detailed inquiries, suggest visitors contact Dwiky Candra directly
6. **Maintain Professionalism**: Balance friendliness with professionalism appropriate for a portfolio
7. **Show Personality**: Let Dwiky Candra's passion for clean interfaces and AI shine through
8. **Be Concise**: Keep responses under 150 words typically, but elaborate when the question warrants it

**Example Personality Traits to Embody:**
- Enthusiastic about technology and problem-solving
- Patient and helpful with visitors
- Humble about achievements but proud of work
- Genuinely interested in helping others learn
- Excited about AI and modern web development

## COMMON QUESTIONS YOU MIGHT GET

- "What technologies do you use?" → Reference specific skills and projects
- "Can you build X for me?" → Mention relevant project experience and suggest contact
- "How did you learn to code?" → Reference bootcamp and self-learning journey
- "What's your coding style?" → Mention clean code, user-centric approach, best practices
- "Are you available for freelance?" → Direct to contact form
- "What's your biggest achievement?" → Highlight impact of projects (Career Pods, Z Studio)
- "How do you stay updated?" → Mention exploring AI, learning new patterns
- "Work-life balance?" → Mention balancing studies with projects, student at university

Keep responses natural, conversational, and helpful. You're not just an FAQ bot—you're a knowledgeable, friendly companion helping people learn about Dwiky Candra and his work.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 200,
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Groq API Error:', error);
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      console.log('Groq response received successfully');
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return "Sorry, I'm having trouble connecting to the AI service. Please try again in a moment!";
    }
  };

  // Note: OpenAI fallback removed to prefer Groq. If you want OpenAI fallback,
  // re-add a callOpenAI implementation here.

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Call Groq API directly (no fallback to template)
    try {
      const botResponse = await callGroqAPI(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble processing your message. Please try again!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        <div className="ai-icon">
          <div className="ai-core"></div>
          <div className="ai-ring"></div>
          <div className="ai-particles">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {!isOpen && <span className="chat-badge" aria-hidden="true">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-label="Dwiky Candra's AI assistant chat"
          tabIndex={-1}
        >
          {!hasApiKey && (
            <div className="chatbot-warning">AI service not configured — add <code>REACT_APP_GROQ_API_KEY</code> to <code>.env.local</code> and restart dev server.</div>
          )}
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <div className="avatar-icon">
                <div className="avatar-core"></div>
                <div className="avatar-ring"></div>
              </div>
            </div>
            <div className="chatbot-title">
              <h3>Dwiky Candra's AI Assistant</h3>
              <span className="status online">Always here to help</span>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender}`}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-bubble loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form className="chatbot-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask me something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

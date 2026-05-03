import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  Compass, 
  Layers, 
  Maximize2, 
  ShieldCheck, 
  X, 
  Home,
  Menu,
  Phone,
  Globe,
  Mail
} from 'lucide-react';
import React, { useState, ReactNode, createContext, useContext } from 'react';

// --- Translation Logic ---

type Language = 'en' | 'es';
type UserType = 'homeowner' | 'contractor';

const translations = {
  en: {
    nav: { 
      process: "Process", 
      packages: "Packages", 
      regions: "Service Area", 
      cta: "Schedule Discovery Call",
      homeowner: "For Homeowners",
      contractor: "For Professionals",
      tagline: "Outdoor Design & Advisory",
      portfolio: "Portfolio"
    },
    portfolio: {
      eyebrow: "Gallery",
      title: "Project Portfolio",
      description: "A showcase of site-accurate 3D renderings and completed visions for homes across the region.",
      samplePdf: "View Sample Plan"
    },
    hero: { 
      homeowner: {
        title: "Refined Landscapes, Rooted in Design", 
        sub: "Terra Haus helps homeowners plan outdoor spaces with clarity before construction begins.",
        eyebrow: "Residential Design & Advisory"
      },
      contractor: {
        title: "Refined Landscapes, Rooted in Relationship",
        sub: "Professional landscape design and site-accurate advisory to help contractors sell, build, and deliver with confidence.",
        eyebrow: "Professional Trade Support"
      }
    },
    values: {
      homeowner: [
        { num: "01.", title: "DISCOVER", description: "Deep alignment of your lifestyle and property goals. We define scope, scale, and budget to ensure your landscape strategy is rooted in reality." },
        { num: "02.", title: "DESIGN", description: "The build before the build. We solve layout, drainage, and grade challenges through immersive 3D visuals and precise material selection before ground is broken." },
        { num: "03.", title: "DELIVER", description: "Professional oversight and turnkey management. We ensure contractors adhere to industry standards, freeing you from stress while protecting the original vision." }
      ],
      contractor: [
        { num: "01.", title: "DISCOVER", description: "We align with your project goals and client lifestyle to define a realistic scope, identifying site opportunities and budget constraints early." },
        { num: "02.", title: "DESIGN", description: "Site-accurate 3D modeling that solves field challenges before they happen. High-end visuals help you sell the vision while technical plans reduce rework." },
        { num: "03.", title: "DELIVER", description: "Ongoing trade support and plan-to-field advisory. We act as your design partner, ensuring the build stay true to the vision and meets quality benchmarks." }
      ]
    },
    howItWorks: {
      eyebrow: "Our Process",
      title: "How it Works",
      steps: {
        homeowner: [
          { title: "DISCOVER", subtitle: "The Foundation", description: "It starts with a qualifying call followed by an on-site consultation. We dive deep into your lifestyle goals, layout ideas, drainage considerations, budget expectations, and long-term property vision.", details: ["On-site Property Assessment", "Lifestyle Questionnaire", "Initial Feasibility Review"] },
          { title: "DESIGN", subtitle: "The Blueprint", description: "We translate our discoveries into a professional design package. You'll receive comprehensive plan views, stunning 3D visuals, a defined scope of work, and a strategic phasing roadmap.", details: ["3D Visual Renderings", "Phased Master Plan", "Material Palette Selection"] },
          { title: "DELIVER", subtitle: "The Execution", description: "With a completed design, you choose your path. We can provide DIY guidance, manage contractor coordination, or take the lead with full project management to ensure the vision becomes reality.", details: ["Contractor Bid Packaging", "Project Management Services", "Final Installation Review"] }
        ],
        contractor: [
          { title: "ONSITE", subtitle: "Consult & Measure", description: "We meet you or your client on-site to conduct a thorough site evaluation. We handle the measurements, site context photos, and initial grade assessments so you don't have to.", details: ["Detailed Site Measurement", "Grade & Slope Analysis", "Contextual Photography"] },
          { title: "PRODUCE", subtitle: "Render & Draft", description: "We build a detailed 3D model of the property and develop the design based on your project goals. You receive professional sales-ready renderings and buildable installation plans.", details: ["Photorealistic 3D Renders", "Buildable Plan Views", "Material Specifications"] },
          { title: "SUPPORT", subtitle: "Close & Build", description: "We help you present the design, align the project with the client's budget, and provide ongoing support during construction to ensure the build stays true to the plan.", details: ["Sales Presentation Support", "Plan-to-Field Advisory", "Construction Coordination"] }
        ]
      }
    },
    comparison: {
      homeowner: {
        title: { primary: "Why not just get a ", secondary: "free estimate?" },
        description: "Most landscaping frustrations root back to skipping the planning phase. When you start with an estimate, you're starting with a sales pitch, not a strategy.",
        estimate: {
          title: "Free Estimate",
          items: ["Price based on limited site info", "Focus on selling specific work", "Misses drainage & site-prep needs", "Short-term thinking"]
        },
        terraHaus: {
          title: "Terra Haus Advisory",
          items: ["Unbiased property evaluation", "Focus on lifestyle & long-term value", "Comprehensive site engineering", "Design-backed budget alignment"]
        },
      },
      contractor: {
        title: { primary: "Why not just give ", secondary: "free estimates?" },
        description: "Stop guessing and start leading. Guide your prospects through a professional sales process that starts with a tailored design, ensuring your estimates are accurate and your time is protected.",
        estimate: {
          title: "Free Estimate",
          items: ["Quick meetings with tire-kickers", "Price is the only factor considered", "Wasted time on low-intent leads", "Low closing ratio & high frustration"]
        },
        terraHaus: {
          title: "Terra Haus Advisory",
          items: ["Clients committed to the vision", "Engaged deeply in the design process", "Precise estimating with zero guesswork", "Increased field efficiency & fewer changes"]
        },
      },
      goldenRule: "Idea → Design → Build",
      goldenRuleSub: "The Golden Rule of Construction"
    },
    packages: {
      eyebrow: "Investment",
      title: "Design Packages",
      startingAt: "Starting at",
      mostPopular: "Most Popular",
      footerMsg: "Not sure which package fits? We'll help you decide.",
      discoveryCall: "Start with a Discovery Call",
      intakeForm: "Design Intake Form",
      contractorIntake: "Contractor Partnership Intake Form",
      homeowner: [
        { description: "Best for simple singular focused updates.", cta: "Plan Core" },
        { description: "Most residential projects looking for complete transformation.", cta: "Schedule Standard" },
        { description: "Best for full-property master planning.", cta: "Consult Full Design" }
      ],
      contractor: [
        { description: "Sales support for your active proposals.", cta: "Book Rendering" },
        { description: "Expert site evaluation for complex projects.", cta: "Schedule Advisory" },
        { description: "White-label design for your company.", cta: "Inquire Partnership" }
      ]
    },
    serviceArea: {
      title: "We Consult On-Site.",
      description: "We bridge the gap between imagination and execution by being present on your property.",
      regions: {
        mi: "Southeast Michigan",
        oh: "Northern Ohio"
      }
    },
    testimonials: {
      eyebrow: "Social Proof",
      title: "Client Experiences",
      items: [
        { quote: "Terra Haus gave us the confidence to start a $50k project. We finally felt we were making the right decisions rather than just guessing.", author: "Michael R.", location: "Northville, MI" },
        { quote: "The 3D renders were game-changers, but the material phasing plan was what actually saved our budget.", author: "Sarah L.", location: "Perrysburg, OH" },
        { quote: "Professional guidance that goes beyond aesthetic. They identified a drainage issue our contractor missed entirely.", author: "David K.", location: "Ann Arbor, MI" }
      ]
    },
    finalCta: {
      title: "Start with clarity.",
      sub: "Don't leave your outdoor investment to chance. Invest in a plan that ensures success.",
      bookConsult: "Book On-Site Consultation",
      inquirePartner: "Inquire Partnership"
    },
    footer: {
      description: "Based in Southeast Michigan. Serving discerning homeowners across Michigan and Northern Ohio with buildable, real-world design solutions.",
      explore: "Explore",
      contact: "Contact",
      copyright: "© 2026 TERRA HAUS, LLC",
      legal: "Real Property Evaluation • Lifestyle Planning • Build Oversight"
    },
    common: {
      basedIn: "Based in Southeast Michigan"
    },
    cta: { schedule: "Schedule Discovery Call", explore: "Explore Design Packages" },
    links: {
      discovery: "https://calendar.app.google/BsZzuVbojnGZNm6Q8",
      portfolioPdf: "https://drive.google.com/file/d/1R93mSIMg4X7wTGkR7lrL-ysT7srtD9pD/view?usp=sharing",
      intake: {
        homeowner: "https://docs.google.com/forms/d/e/1FAIpQLSctCe7Hl6Y1r5J5yb9uHeUuA0hDW0dOEx3wdng0zJ9AVup7MA/viewform?usp=header",
        contractor: "https://docs.google.com/forms/d/e/1FAIpQLSdZNzWJ1reUR2PJwjdUusg6tdbsX6hvL4QMRYer-bijskMTQg/viewform?usp=header"
      }
    },
    packageNames: { 
      core: "Concept Core", 
      standard: "Design Standard", 
      estate: "Estate Master Plan",
      trade_render: "Rendering Support",
      trade_advisory: "Project Advisory",
      trade_full: "Full Design Support"
    },
    seo: {
      homeowner: {
        title: "Terra Haus | Landscape Designer & 3D Outdoor Design Southeast Michigan",
        description: "Premium landscape design, 3D renderings, and project advisory in Southeast Michigan. Expert consultant for brick pavers, in-ground pools, and outdoor living."
      },
      contractor: {
        title: "Terra Haus | 3D Landscape Design Support & Advisory for Contractors",
        description: "Professional 3D rendering, site surveys, and design advisory for landscape builders. Sell more projects with site-accurate 3D landscape design."
      }
    },
    phone: "734-430-9611",
    email: "hello@terrahaus.design"
  },
  es: {
    nav: { 
      process: "Proceso", 
      packages: "Paquetes", 
      regions: "Área de Servicio", 
      cta: "Programar Llamada",
      homeowner: "Para Propietarios",
      contractor: "Para Profesionales",
      tagline: "Diseño y Asesoría de Exteriores",
      portfolio: "Portafolio"
    },
    portfolio: {
      eyebrow: "Galería",
      title: "Portafolio de Proyectos",
      description: "Una muestra de representaciones 3D precisas y visiones completadas para hogares en toda la región.",
      samplePdf: "Ver Plan de Muestra"
    },
    hero: { 
      homeowner: {
        title: "Paisajes Refinados, Arraigados en el Diseño", 
        sub: "Terra Haus ayuda a los propietarios a planificar espacios exteriores con claridad antes de que comience la construcción.",
        eyebrow: "Diseño y Asesoría Residencial"
      },
      contractor: {
        title: "Paisajes Refinados, Arraigados en la Relación",
        sub: "Diseño de paisajes profesional y asesoría precisa en el sitio para ayudar a los contratistas a vender y construir con confianza.",
        eyebrow: "Soporte Comercial Profesional"
      }
    },
    values: {
      homeowner: [
        { num: "01.", title: "DESCUBRIR", description: "Alineación profunda de su estilo de vida y objetivos. Definimos el alcance y el presupuesto para asegurar que su estrategia de paisaje sea real." },
        { num: "02.", title: "DISEÑAR", description: "La construcción antes de la obra. Resolvemos desafíos de drenaje y nivelación a través de visuales 3D inmersivos y selección de materiales." },
        { num: "03.", title: "ENTREGAR", description: "Supervisión y gestión profesional llave en mano. Aseguramos que los contratistas cumplan con los estándares, protegiendo la visión original." }
      ],
      contractor: [
        { num: "01.", title: "DESCUBRIR", description: "Nos alineamos con los objetivos de su proyecto para definir un alcance realista, identificando oportunidades y limitaciones presupuestarias a tiempo." },
        { num: "02.", title: "DISEÑAR", description: "Modelado 3D preciso que resuelve los desafíos de campo antes de que ocurran. Los visuales de alta gama le ayudan a vender su visión." },
        { num: "03.", title: "ENTREGAR", description: "Soporte comercial continuo y asesoría de plano a campo. Actuamos como su socio de diseño, asegurando que la obra se mantenga fiel a la visión." }
      ]
    },
    howItWorks: {
      eyebrow: "Nuestro Proceso",
      title: "Cómo Funciona",
      steps: {
        homeowner: [
          { title: "DESCUBRIR", subtitle: "La Base", description: "Comienza con una llamada de calificación seguida de una consulta en el sitio. Profundizamos en sus objetivos de estilo de vida, ideas de distribución, consideraciones de drenaje, expectativas presupuestarias y visión de la propiedad a largo plazo.", details: ["Evaluación de la Propiedad en el Sitio", "Cuestionario de Estilo de Vida", "Revisión Inicial de Viabilidad"] },
          { title: "DISEÑAR", subtitle: "El Plano", description: "Traducimos nuestros descubrimientos en un paquete de diseño profesional. Recibirá vistas de planta completas, visuales 3D impresionantes, un alcance de trabajo definido y una hoja de ruta estratégica por fases.", details: ["Renders Visuales 3D", "Plan Maestro por Fases", "Selección de Paleta de Materiales"] },
          { title: "ENTREGAR", subtitle: "La Ejecución", description: "Con un diseño completo, usted elige su camino. Podemos proporcionar orientación DIY, gestionar la coordinación de contratistas o liderar con la gestión integral del proyecto.", details: ["Paquete de Licitación de Contratistas", "Servicios de Gestión de Proyectos", "Revisión Final de la Instalación"] }
        ],
        contractor: [
          { title: "EN SITIO", subtitle: "Consultar y Medir", description: "Nos reunimos con usted o su cliente en el sitio para realizar una evaluación exhaustiva de la propiedad. Nos encargamos de las mediciones, fotos del contexto del sitio y evaluaciones iniciales de pendientes.", details: ["Medición Detallada del Sitio", "Análisis de Pendientes y Grado", "Fotografía Contextual"] },
          { title: "PRODUCIR", subtitle: "Renderizar y Trazar", description: "Construimos un modelo 3D detallado de la propiedad y desarrollamos el diseño basado en sus objetivos. Recibirá renders listos para la venta y planos de instalación construibles.", details: ["Renders 3D Fotorrealistas", "Vistas de Planta Construibles", "Especificaciones de Materiales"] },
          { title: "SOPORTE", subtitle: "Cerrar y Construir", description: "Le ayudamos a presentar el diseño, alinear el proyecto con el presupuesto del cliente y brindamos soporte continuo durante la construcción para asegurar que la obra se mantenga fiel al plan.", details: ["Soporte de Presentación de Ventas", "Asesoría de Plano a Campo", "Coordinación de Construcción"] }
        ]
      }
    },
    comparison: {
      homeowner: {
        title: { primary: "¿Por qué no solo obtener un ", secondary: "presupuesto gratuito?" },
        description: "La mayoría de las frustraciones en el paisajismo se deben a saltarse la fase de planificación. Cuando comienza con un presupuesto, está comenzando con un discurso de venta, no con una estrategia.",
        estimate: {
          title: "Presupuesto Gratuito",
          items: ["Precio basado en información limitada del sitio", "Enfoque en vender trabajos específicos", "Pasa por alto las necesidades de drenaje", "Pensamiento a corto plazo"]
        },
        terraHaus: {
          title: "Asesoría Terra Haus",
          items: ["Evaluación imparcial de la propiedad", "Enfoque en estilo de vida y valor a largo plazo", "Ingeniería de sitio integral", "Alineación presupuestaria respaldada por diseño"]
        },
      },
      contractor: {
        title: { primary: "¿Por qué no solo dar ", secondary: "presupuestos gratuitos?" },
        description: "Deje de adivinar y empiece a liderar. Guíe a sus prospectos a través de un proceso de venta profesional que comienza con un diseño a medida.",
        estimate: {
          title: "Presupuesto Gratuito",
          items: ["Reuniones rápidas con curiosos", "El precio es el único factor considerado", "Tiempo perdido en leads de baja intención", "Bajo ratio de cierre y alta frustración"]
        },
        terraHaus: {
          title: "Asesoría Terra Haus",
          items: ["Clientes comprometidos con la visión", "Involucrados profundamente en el diseño", "Estimación precisa sin adivinanzas", "Mayor eficiencia en el campo y menos cambios"]
        },
      },
      goldenRule: "Idea → Diseño → Construcción",
      goldenRuleSub: "La Regla de Oro de la Construcción"
    },
    packages: {
      eyebrow: "Inversión",
      title: "Paquetes de Diseño",
      startingAt: "Desde",
      mostPopular: "Más Popular",
      footerMsg: "¿No está seguro de qué paquete encaja? Le ayudaremos a decidir.",
      discoveryCall: "Empezar con una Llamada de Descubrimiento",
      intakeForm: "Formulario de Admisión de Diseño",
      contractorIntake: "Formulario de Asociación de Contratistas",
      homeowner: [
        { description: "Ideal para actualizaciones simples de enfoque único.", cta: "Planificar Core" },
        { description: "La mayoría de los proyectos residenciales que buscan una transformación completa.", cta: "Programar Estándar" },
        { description: "Ideal para planificación maestra de toda la propiedad.", cta: "Consultar Diseño Completo" }
      ],
      contractor: [
        { description: "Soporte de ventas para sus propuestas activas.", cta: "Reservar Renderizado" },
        { description: "Evaluación experta del sitio para proyectos complejos.", cta: "Programar Asesoría" },
        { description: "Diseño de marca blanca para su empresa.", cta: "Solicitar Asociación" }
      ]
    },
    serviceArea: {
      title: "Consultamos en el Sitio.",
      description: "Cerramos la brecha entre la imaginación y la ejecución estando presentes en su propiedad.",
      regions: {
        mi: "Sureste de Michigan",
        oh: "Norte de Ohio"
      }
    },
    testimonials: {
      eyebrow: "Prueba Social",
      title: "Experiencias de Clientes",
      items: [
        { quote: "Terra Haus nos dio la confianza para iniciar un proyecto de $50k. Finalmente sentimos que estábamos tomando las decisiones correctas en lugar de solo adivinar.", author: "Michael R.", location: "Northville, MI" },
        { quote: "Los renders 3D cambiaron el juego, pero el plan de fases de materiales fue lo que realmente salvó nuestro presupuesto.", author: "Sarah L.", location: "Perrysburg, OH" },
        { quote: "Orientación profesional que va más allá de lo estético. Identificaron un problema de drenaje que nuestro contratista pasó por alto por completo.", author: "David K.", location: "Ann Arbor, MI" }
      ]
    },
    finalCta: {
      title: "Comience con claridad.",
      sub: "No deje su inversión al aire libre al azar. Invierta en un plan que garantice el éxito.",
      bookConsult: "Reservar Consulta en el Sitio",
      inquirePartner: "Inquirir Asociación"
    },
    footer: {
      description: "Con sede en el sureste de Michigan. Atendiendo a propietarios exigentes en Michigan y el norte de Ohio con soluciones de diseño construibles y del mundo real.",
      explore: "Explorar",
      contact: "Contacto",
      copyright: "© 2026 TERRA HAUS, LLC",
      legal: "Evaluación de Propiedades • Planificación de Estilo de Vida • Supervisión de Obra"
    },
    common: {
      basedIn: "Con sede en el sureste de Michigan"
    },
    links: {
      discovery: "https://calendar.app.google/BsZzuVbojnGZNm6Q8",
      portfolioPdf: "https://drive.google.com/file/d/1R93mSIMg4X7wTGkR7lrL-ysT7srtD9pD/view?usp=sharing",
      intake: {
        homeowner: "https://docs.google.com/forms/d/e/1FAIpQLSctCe7Hl6Y1r5J5yb9uHeUuA0hDW0dOEx3wdng0zJ9AVup7MA/viewform?usp=header",
        contractor: "https://docs.google.com/forms/d/e/1FAIpQLSdZNzWJ1reUR2PJwjdUusg6tdbsX6hvL4QMRYer-bijskMTQg/viewform?usp=header"
      }
    },
    cta: { schedule: "Programar Llamada", explore: "Explorar Paquetes" },
    packageNames: { 
      core: "Core Conceptual", 
      standard: "Diseño Estándar", 
      estate: "Plan Maestro de Finca",
      trade_render: "Soporte de Renderizado",
      trade_advisory: "Asesoría de Proyecto",
      trade_full: "Soporte de Diseño Completo"
    },
    seo: {
      homeowner: {
        title: "Terra Haus | Diseño y Asesoría de Exteriores Residenciales en Michigan",
        description: "Diseño de paisajes de primera calidad y asesoría de proyectos para propietarios en el sureste de Michigan y el norte de Ohio."
      },
      contractor: {
        title: "Terra Haus | Soporte de Diseño Profesional para Contratistas",
        description: "Renderizado 3D profesional y asesoría de diseño para constructores de paisajes. Venda más proyectos con planificación precisa."
      }
    },
    phone: "734-430-9611",
    email: "hello@terrahaus.design"
  }
};

const LanguageContext = createContext<{ 
  lang: Language; 
  setLang: (l: Language) => void;
  userType: UserType;
  setUserType: (u: UserType) => void;
}>({ 
  lang: 'en', 
  setLang: () => { },
  userType: 'homeowner',
  setUserType: () => { }
});

// --- Sub-components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, userType, setUserType } = useContext(LanguageContext);
  const t = translations[lang].nav;

  // --- ADD YOUR LOGO URL HERE ---
  const companyLogoUrl = "https://drive.google.com/uc?id=1PtOxXMZ5qpSV4uPoA0tnsrTE8MwV8Arf"; // Direct link from user provided Google Drive ID

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-subtle">
      <div className="bg-charcoal text-white/60 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 hidden sm:flex"><MapPin className="w-3 h-3 text-sage" /> {translations[lang].common.basedIn}</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-sage" /> {translations[lang].phone}</span>
            <a href={`mailto:${translations[lang].email}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-sage" /> {translations[lang].email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 border-r border-white/10 pr-6 mr-1">
              <button 
                onClick={() => setUserType('homeowner')}
                className={`transition-colors ${userType === 'homeowner' ? 'text-white' : 'hover:text-white'}`}
              >
                {t.homeowner}
              </button>
              <button 
                onClick={() => setUserType('contractor')}
                className={`transition-colors ${userType === 'contractor' ? 'text-white' : 'hover:text-white'}`}
              >
                {t.contractor}
              </button>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe className="w-3 h-3 text-sage" /> {lang === 'en' ? 'Español' : 'English'}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-4 group">
          {companyLogoUrl ? (
            <img 
              src={companyLogoUrl} 
              alt="Terra Haus Logo" 
              className="h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const div = document.createElement('div');
                  div.className = "flex flex-col";
                  div.innerHTML = `
                    <span class="font-serif text-2xl font-semibold tracking-tight text-charcoal uppercase leading-none group-hover:text-sage transition-colors">Terra Haus</span>
                    <span class="text-[9px] tracking-[0.2em] uppercase opacity-60 mt-1">${t.tagline}</span>
                  `;
                  parent.appendChild(div);
                }
              }}
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal uppercase leading-none group-hover:text-sage transition-colors">Terra Haus</span>
              <span className="text-[9px] tracking-[0.2em] uppercase opacity-60 mt-1">{t.tagline}</span>
            </div>
          )}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-xs font-medium uppercase tracking-widest items-center text-charcoal">
            <a href="#how-it-works" className="hover:opacity-60 transition-opacity">{t.process}</a>
            <a href="#portfolio" className="hover:opacity-60 transition-opacity">{t.portfolio}</a>
            <a href="#packages" className="hover:opacity-60 transition-opacity">{t.packages}</a>
            <a href="#service-area" className="hover:opacity-60 transition-opacity">{t.regions}</a>
          </div>
          <a 
            href={translations[lang].links.discovery}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sage text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all"
          >
            {t.cta}
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-warm-gray px-6 py-10 flex flex-col gap-6"
        >
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium text-charcoal">{t.process}</a>
          <a href="#portfolio" onClick={() => setIsOpen(false)} className="text-lg font-medium text-charcoal">{t.portfolio}</a>
          <a href="#packages" onClick={() => setIsOpen(false)} className="text-lg font-medium text-charcoal">{t.packages}</a>
          <a href="#service-area" onClick={() => setIsOpen(false)} className="text-lg font-medium text-charcoal">{t.regions}</a>
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button onClick={() => {setUserType('homeowner'); setIsOpen(false);}} className={`text-xs font-bold uppercase tracking-widest ${userType === 'homeowner' ? 'text-sage' : 'text-gray-400'}`}>{t.homeowner}</button>
            <button onClick={() => {setUserType('contractor'); setIsOpen(false);}} className={`text-xs font-bold uppercase tracking-widest ${userType === 'contractor' ? 'text-sage' : 'text-gray-400'}`}>{t.contractor}</button>
          </div>
          <a 
            href={translations[lang].links.discovery}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sage text-white px-6 py-4 rounded-sm text-lg font-medium w-full text-center"
          >
            {t.cta}
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const SectionHeading = ({ children, eyebrow, centered = true }: { children: React.ReactNode, eyebrow?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    {eyebrow && <span className="text-sage font-sans text-[10px] font-bold uppercase tracking-[0.3em] block mb-4 italic">{eyebrow}</span>}
    <h2 className="text-4xl md:text-5xl font-serif text-charcoal tracking-tight leading-tight">{children}</h2>
  </div>
);

// --- Sections ---

const Hero = () => {
  const { lang, userType } = useContext(LanguageContext);
  const t = translations[lang];

  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden pt-24">
      {/* Background Image with Parallax-ish effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621841314392-563630f9a202?q=80&w=2000&auto=format&fit=crop" 
          alt="3D Landscape Render Michigan" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-sage font-bold text-[10px] uppercase tracking-[0.3em] bg-white/10 backdrop-blur-sm px-3 py-1 mb-6 inline-block rounded-sm">
            {t.hero[userType].eyebrow}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6 drop-shadow-sm">
            {t.hero[userType].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-xl">
            {t.hero[userType].sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={t.links.discovery}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-sage px-8 py-4 rounded-sm text-lg font-semibold hover:bg-warm-gray transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              {t.cta.schedule}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#packages"
              className="border-2 border-white text-white px-8 py-4 rounded-sm text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
            >
              {t.cta.explore}
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

const ValueProposition = () => {
  const { lang, userType } = useContext(LanguageContext);
  const values = translations[lang].values[userType];

  return (
    <section className="py-24 bg-white px-6 border-b border-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 md:gap-12">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col group"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-sage italic">{v.num} {v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { lang, userType } = useContext(LanguageContext);
  const t = translations[lang].howItWorks;
  const steps = t.steps[userType];

  return (
    <section id="how-it-works" className="py-24 bg-warm-gray px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow={t.eyebrow}>{t.title}</SectionHeading>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-10 border border-subtle card-shadow relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-sage text-white flex items-center justify-center text-[11px] font-bold shrink-0">{i + 1}</div>
                  <h4 className="text-sage font-bold tracking-widest text-[10px] uppercase border-b border-sage/20 pb-0.5">{step.title}</h4>
                </div>
                <p className="text-2xl font-serif mb-6 text-charcoal leading-tight">{step.subtitle}</p>
                <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-3 border-t border-earth-brown/20 pt-6">
                  {step.details.map((detail, di) => (
                    <li key={di} className="flex items-center gap-3 text-sm font-medium text-charcoal">
                      <Check className="w-4 h-4 text-deep-green" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].portfolio;

  // --- ADD YOUR PORTFOLIO IMAGES HERE ---
  const portfolioImages = [
    { url: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1200&auto=format&fit=crop", title: "Garden Oasis" },
    { url: "https://images.unsplash.com/photo-1590059132223-b68494f18374?q=80&w=1200&auto=format&fit=crop", title: "Curb Appeal" },
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", title: "Luxury Poolscape" },
    { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop", title: "Outdoor Living" },
    { url: "https://images.unsplash.com/photo-1621841314392-563630f9a202?q=80&w=1200&auto=format&fit=crop", title: "Estate Plan Render" },
    { url: "https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=1200&auto=format&fit=crop", title: "Limestone Sanctuary" }
  ];

  return (
    <section id="portfolio" className="py-24 bg-soft-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-sage font-sans text-[10px] font-bold uppercase tracking-[0.3em] block mb-4 italic">{t.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal tracking-tight leading-tight">{t.title}</h2>
            <p className="text-gray-500 font-light mt-6 max-w-xl">{t.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              href={translations[lang].links.portfolioPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage font-sans text-xs font-bold uppercase tracking-widest border-b-2 border-sage pb-1 hover:opacity-70 transition-opacity"
            >
              {t.samplePdf} (PDF)
            </a>
            <a 
              href={translations[lang].links.discovery}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal font-sans text-xs font-bold uppercase tracking-widest border-b-2 border-charcoal/20 pb-1 hover:opacity-70 transition-opacity"
            >
              Request Custom Renderings
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioImages.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden bg-warm-gray rounded-sm cursor-crosshair"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-1">Terra Haus Design</span>
                <h4 className="text-white font-serif text-xl">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DesignPackages = () => {
  const { lang, userType } = useContext(LanguageContext);
  const t = translations[lang].packages;
  const pkgNames = translations[lang].packageNames;

  const homeownerPackages = [
    {
      name: pkgNames.core,
      price: "$650",
      description: t.homeowner[0].description,
      features: ["Site visit", "Simple 2D plan", "Material notes", "Budget range", "One revision"],
      cta: t.homeowner[0].cta,
      highlight: false
    },
    {
      name: pkgNames.standard,
      price: "$1,500",
      description: t.homeowner[1].description,
      features: ["Full site plan", "Planting + hardscape + lighting layout", "2–3 3D renderings", "Design narrative", "One revision"],
      cta: t.homeowner[1].cta,
      highlight: true
    },
    {
      name: pkgNames.estate,
      price: "$3,000+",
      description: t.homeowner[2].description,
      features: ["Full master plan", "Multiple zones & structures", "4–6 renderings", "Builder coordination support"],
      cta: t.homeowner[2].cta,
      highlight: false
    }
  ];

  const contractorPackages = [
    {
       name: pkgNames.trade_render,
       price: "$500+",
       description: t.contractor[0].description,
       features: ["3D modeling of your design", "2-3 dynamic renderings", "Night/lighting views", "Material callouts", "72hr typical turnaround"],
       cta: t.contractor[0].cta,
       highlight: false
    },
    {
       name: pkgNames.trade_advisory,
       price: "$850",
       description: t.contractor[1].description,
       features: ["On-site consulting", "Grade & drainage report", "Construction phasing", "Initial layout advisory", "Builder support call"],
       cta: t.contractor[1].cta,
       highlight: true
    },
    {
       name: pkgNames.trade_full,
       price: "$1,250+",
       description: t.contractor[2].description,
       features: ["Client meetings on your behalf", "Full plan sets", "Complete material specs", "Custom builder branding", "Ongoing trade support"],
       cta: t.contractor[2].cta,
       highlight: false
    }
  ];

  const packages = userType === 'homeowner' ? homeownerPackages : contractorPackages;

  return (
    <section id="packages" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow={t.eyebrow}>{t.title}</SectionHeading>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-8">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`flex flex-col border p-10 relative transition-all ${pkg.highlight ? 'border-sage bg-white card-shadow' : 'border-subtle bg-soft-white'}`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 text-amber-900 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em]">
                  {t.mostPopular}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-serif mb-4 text-charcoal">{pkg.name}</h3>
                {userType === 'homeowner' && (
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-xs uppercase tracking-widest opacity-40">{t.startingAt}</span>
                    <span className="text-3xl font-serif text-sage">{pkg.price}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-auto pb-10 border-b border-black/5">
                {pkg.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-[13px] text-charcoal/80">
                    <div className="w-4 h-4 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={userType === 'homeowner' ? (i === 1 ? translations[lang].links.discovery : translations[lang].links.intake.homeowner) : translations[lang].links.intake.contractor}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 w-full py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all text-center ${pkg.highlight ? 'bg-sage text-white hover:opacity-90' : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'}`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6 italic">{t.footerMsg}</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a 
              href={translations[lang].links.discovery}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-charcoal font-medium border-b-2 border-sage pb-1 hover:text-sage transition-colors"
            >
              {t.discoveryCall}
            </a>
            {userType === 'homeowner' ? (
              <a 
                href={translations[lang].links.intake.homeowner}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-charcoal font-medium border-b-2 border-sage pb-1 hover:text-sage transition-colors"
              >
                {t.intakeForm}
              </a>
            ) : (
              <a 
                href={translations[lang].links.intake.contractor}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-charcoal font-medium border-b-2 border-sage pb-1 hover:text-sage transition-colors"
              >
                {t.contractorIntake}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const { lang, userType } = useContext(LanguageContext);
  const t = translations[lang].comparison[userType];
  const g = translations[lang].comparison;

  return (
    <section className="py-24 bg-charcoal text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              {t.title.primary} <span className="italic opacity-70">{t.title.secondary}</span>
            </h2>
            <p className="text-white/70 text-lg font-light mb-10 leading-relaxed">
              {t.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-sage text-sm font-bold uppercase tracking-widest border-b border-sage/30 pb-2">{t.estimate.title}</h4>
                <div className="space-y-4">
                  {t.estimate.items.map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/50">
                      <X className="w-4 h-4 text-red-400" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-sage text-sm font-bold uppercase tracking-widest border-b border-sage/30 pb-2">{t.terraHaus.title}</h4>
                <div className="space-y-4">
                  {t.terraHaus.items.map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-sage" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] bg-warm-gray rounded-[80px_4px_80px_4px] overflow-hidden border-[12px] border-white/5 relative shadow-2xl"
            >
              <img 
                src="https://drive.google.com/uc?id=1XvCbCqVVww2pZXVGV5jLrD7wCnYIdzmA" 
                alt="Terra Haus Design Render" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-sage/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white p-8 max-w-[280px] hidden md:block shadow-xl border-l-4 border-sage"
            >
              <p className="text-charcoal font-serif text-lg leading-snug">
                "{g.goldenRule}"
              </p>
              <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-bold">{g.goldenRuleSub}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceArea = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].serviceArea;

  return (
    <section id="service-area" className="py-24 bg-warm-gray px-6 border-y border-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-serif mb-6 text-charcoal">{t.title}</h2>
            <p className="text-gray-500 text-sm font-light leading-relaxed mb-10 italic">
              "{t.description}"
            </p>
          </div>

          <div className="md:w-2/3 grid sm:grid-cols-2 gap-12 w-full">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6 border-b border-black/5 pb-2">{t.regions.mi}</p>
              <p className="text-sm font-medium text-charcoal leading-loose">
                Plymouth • Northville • Ann Arbor • Grosse Ile • Birmingham • Bloomfield • Novi • Monroe
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6 border-b border-black/5 pb-2">{t.regions.oh}</p>
              <p className="text-sm font-medium text-charcoal leading-loose">
                Perrysburg • Sylvania • Toledo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].testimonials;

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow={t.eyebrow}>{t.title}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-12">
          {t.items.map((r, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, si) => (
                  <span key={si} className="text-sage text-lg">★</span>
                ))}
              </div>
              <p className="text-xl font-serif text-charcoal mb-8 italic italic">"{r.quote}"</p>
              <div className="mt-auto pt-6 border-t border-gray-100">
                <span className="block font-bold text-sm text-charcoal uppercase tracking-widest">{r.author}</span>
                <span className="block text-gray-400 text-xs mt-1">{r.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { lang, userType } = useContext(LanguageContext);
  const t = translations[lang].finalCta;

  return (
    <section className="py-32 bg-sage text-white px-6 text-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">{t.title}</h2>
        <p className="text-xl md:text-2xl text-white/80 font-light mb-12">
          {t.sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href={translations[lang].links.discovery}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-sage px-10 py-5 rounded-sm text-lg font-semibold hover:bg-warm-gray transition-all shadow-xl text-center"
          >
            {translations[lang].cta.schedule}
          </a>
          <a 
            href={userType === 'homeowner' ? translations[lang].links.intake.homeowner : translations[lang].links.intake.contractor}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/40 text-white px-10 py-5 rounded-sm text-lg font-semibold hover:bg-white hover:text-sage transition-all text-center"
          >
            {userType === 'homeowner' ? t.bookConsult : t.inquirePartner}
          </a>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{translations[lang].phone}</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${translations[lang].email}`} className="text-sm hover:text-white transition-colors">{translations[lang].email}</a>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{translations[lang].common.basedIn}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].footer;

  return (
    <footer className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto border-t border-subtle pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-sm">
            <div className="flex flex-col mb-6">
              <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal uppercase leading-none">Terra Haus</span>
              <span className="text-[9px] tracking-[0.2em] uppercase opacity-40 mt-1 italic">{translations[lang].nav.tagline}</span>
            </div>
            <p className="text-gray-400 font-light text-xs leading-relaxed">
              {t.description}
            </p>
            <div className="mt-4 space-y-2 text-xs font-bold text-charcoal/60 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" /> {translations[lang].phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" /> <a href={`mailto:${translations[lang].email}`} className="hover:text-sage transition-colors">{translations[lang].email}</a>
              </div>
            </div>
          </div>
          
          <div className="flex gap-20">
            <div>
              <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-6">{t.explore}</h5>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-charcoal/60">
                <li><a href="#how-it-works" className="hover:text-sage transition-colors">{translations[lang].nav.process}</a></li>
                <li><a href="#packages" className="hover:text-sage transition-colors">{translations[lang].nav.packages}</a></li>
                <li><a href="#service-area" className="hover:text-sage transition-colors">{translations[lang].nav.regions}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-6">{t.contact}</h5>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-charcoal/60">
                <li><a href={translations[lang].links.discovery} target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">{translations[lang].cta.schedule}</a></li>
                <li><a href={translations[lang].links.intake.homeowner} target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">{translations[lang].packages.intakeForm}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          <p>{t.copyright}</p>
          <p>{t.legal}</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [userType, setUserType] = useState<UserType>('homeowner');

  React.useEffect(() => {
    const seo = translations[lang].seo[userType];
    document.title = seo.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);
  }, [lang, userType]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, userType, setUserType }}>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <ValueProposition />
          <HowItWorks />
          <Portfolio />
          <ComparisonSection />
          <DesignPackages />
          <Testimonials />
          <ServiceArea />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

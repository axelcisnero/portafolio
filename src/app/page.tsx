import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";
import { CVScripts } from "@/components/CVScripts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, reviews, profileImage] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.review.findMany({ orderBy: { createdAt: "asc" } }),
    getSetting("profileImage"),
  ]);
  const heroPhoto = profileImage || "/assets/axel.jpg";

  const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      {/* ============ NAV ============ */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <div className="nav-links">
            <a href="#perfil" data-en="Profile">Perfil</a>
            <a href="#experiencia" data-en="Experience">Experiencia</a>
            <a href="#habilidades" data-en="Skills">Habilidades</a>
            <a href="#proyectos" data-en="Projects">Proyectos</a>
            <a href="#resenas" data-en="Reviews">Reseñas</a>
            <a href="#contacto" data-en="Contact">Contacto</a>
          </div>
          <div className="nav-tools">
            <div className="lang-toggle" id="langToggle">
              <button data-lang="es" className="active">ES</button>
              <button data-lang="en">EN</button>
            </div>
            <div className="lang-toggle theme-toggle" id="themeToggle" role="group" aria-label="Tema">
              <button data-theme="light" className="active" aria-label="Tema claro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg></button>
              <button data-theme="dark" aria-label="Tema oscuro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg></button>
            </div>
            <a href="/assets/Axel-Cisnero-CV.pdf" download className="nav-cv" title="Descargar CV en PDF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              <span data-en="Download CV">Descargar CV</span>
            </a>
            <button className="hamburger" id="hamburger" aria-label="Menú"><span></span><span></span><span></span></button>
          </div>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu">
        <a href="#perfil" data-en="Profile">Perfil</a>
        <a href="#experiencia" data-en="Experience">Experiencia</a>
        <a href="#habilidades" data-en="Skills">Habilidades</a>
        <a href="#proyectos" data-en="Projects">Proyectos</a>
        <a href="#resenas" data-en="Reviews">Reseñas</a>
        <a href="#contacto" data-en="Contact">Contacto</a>
      </div>

      {/* ============ HERO ============ */}
      <header className="hero" id="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-status"><span className="dot"></span><span data-en="Available for new challenges">Disponible para nuevos retos</span></div>
            <h1>Axel<br /><span className="accent">Cisnero</span></h1>
            <div className="hero-role"><span data-en="IT Infrastructure Specialist">Especialista en Infraestructura TI</span><span className="sep">/</span><span data-en="Software Developer">Desarrollador de Software</span></div>
            <p className="hero-tag" data-en="Over a decade turning business needs into reliable technology — from enterprise IT and networking to modern software, MDM platforms and AI agents.">Más de una década convirtiendo necesidades de negocio en tecnología confiable: desde TI empresarial y redes hasta software moderno, plataformas MDM y agentes de IA.</p>
            <div className="hero-cta">
              <a href="#contacto" className="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span data-en="Contact me">Contáctame</span>
              </a>
              <a href="https://wa.me/50761511270?text=Hola%20Axel,%20vi%20tu%20hoja%20de%20vida%20y%20me%20gustaría%20conversar." target="_blank" rel="noopener" className="btn btn-wa">
                <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3.2C9.3 3.2 3.9 8.6 3.9 15.3c0 2.1.6 4.2 1.6 6L3.8 28.8l7.7-1.7c1.7.9 3.6 1.4 5.5 1.4h.01c6.7 0 12.1-5.4 12.1-12.1 0-3.2-1.3-6.3-3.5-8.6A12 12 0 0 0 16 3.2zm0 22c-1.7 0-3.4-.5-4.9-1.3l-.35-.2-4.1.9.9-4-.23-.37a10 10 0 1 1 8.69 4.97zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.3 1.28.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" /></svg>
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/in/acisnero/" target="_blank" rel="noopener" className="btn btn-ondk">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11.1 21 14.3V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z" /></svg>
                LinkedIn
              </a>
            </div>
            <div className="hero-stats">
              <div className="st"><b>10+</b><span data-en="Years in tech">Años en tecnología</span></div>
              <div className="st"><b>4°</b><span data-en="Year · Software Eng.">Año · Ing. Software</span></div>
              <div className="st"><b>{projects.length}</b><span data-en="Web projects">Proyectos web</span></div>
            </div>
          </div>
          <div className="hero-photo">
            <div className="frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroPhoto} alt="Axel Cisnero" />
            </div>
          </div>
        </div>
      </header>

      {/* ============ PERFIL ============ */}
      <section className="section" id="perfil">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow" data-en="Profile">Perfil</span>
            <h2 data-en="Bridging business and technology">Conectando el negocio con la tecnología</h2>
          </div>
          <div className="perfil-grid">
            <div className="reveal">
              <p className="perfil-lead" data-en="Technology professional with <span class='hl'>10+ years of experience</span> advising and deploying solutions that solve real business problems — and now expanding into modern software development and AI.">Profesional de tecnología con <span className="hl">más de 10 años de experiencia</span> asesorando y desplegando soluciones que resuelven problemas reales del negocio, ahora expandiéndome hacia el desarrollo de software moderno y la IA.</p>
              <p className="perfil-body" data-en="Currently in my 4th year of the Software Development &amp; Management degree at Universidad Tecnológica de Panamá. I combine an analytical, problem-solving mindset with hands-on experience in enterprise platforms, networking, device management and process automation.">Actualmente curso el <strong>4° año de la Licenciatura en Desarrollo y Gestión de Software</strong> en la Universidad Tecnológica de Panamá. Combino un enfoque analítico y orientado a la solución de problemas con experiencia práctica en plataformas empresariales, redes, gestión de dispositivos y automatización de procesos.</p>
              <div className="chips" style={{ marginTop: 26 }}>
                <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg><span data-en="Teamwork">Trabajo en equipo</span></span>
                <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg><span data-en="Analytical thinking">Enfoque analítico</span></span>
                <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg><span data-en="Fast learner">Rápido aprendizaje</span></span>
                <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg><span data-en="Problem-solving">Solución de problemas</span></span>
                <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg><span data-en="Adaptability">Adaptabilidad</span></span>
              </div>
            </div>
            <div className="card aside-card reveal">
              <h4 data-en="Interests">Intereses</h4>
              <div className="interest-grid">
                <span className="interest" data-en="Martial arts">Artes marciales</span>
                <span className="interest" data-en="Gaming">Videojuegos</span>
                <span className="interest" data-en="Meditation">Meditación</span>
                <span className="interest" data-en="Gym">Gimnasio</span>
                <span className="interest" data-en="Dogs &amp; cats">Perros y gatos</span>
                <span className="interest" data-en="Travel">Viajes</span>
                <span className="interest" data-en="Football">Fútbol</span>
                <span className="interest" data-en="Craft beer">Cerveza artesanal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCIA ============ */}
      <section className="section" id="experiencia" style={{ background: "var(--surface-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow" data-en="Career">Trayectoria</span>
            <h2 data-en="Work experience">Experiencia laboral</h2>
            <p data-en="A decade solving business problems with technology across leading companies in Panama.">Una década resolviendo problemas de negocio con tecnología en compañías líderes de Panamá.</p>
          </div>
          <div className="timeline">
            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date" data-en="Feb 2024 — Present">Feb 2024 — Actualidad</span>
                <span className="tl-co" data-en="Freelance / IT Consultant">Freelance / Consultor TI</span>
                <span className="tl-loc" data-en="Panama">Panamá</span>
              </div>
              <div className="tl-main">
                <h3 data-en="IT Consultant &amp; Developer">Consultor de TI &amp; Desarrollador</h3>
                <ul>
                  <li data-en="Since leaving Heineken I work independently — implementing projects and advising businesses on their technology decisions.">Desde mi salida de Heineken trabajo de forma independiente, implementando proyectos y asesorando a negocios en sus decisiones tecnológicas.</li>
                  <li data-en="Design and development of custom websites and digital solutions for clients.">Diseño y desarrollo de sitios web y soluciones digitales a la medida de cada cliente.</li>
                  <li data-en="Structured cabling and WiFi network design, installation and optimization.">Cableado estructurado y diseño, instalación y optimización de redes WiFi.</li>
                  <li data-en="Deployment and management of business platforms: Microsoft 365, Google Workspace, Intune MDM, Apple Business Manager and other technologies.">Despliegue y gestión de plataformas empresariales: Microsoft 365, Google Workspace, Intune MDM, Apple Business Manager entre otras tecnologías.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Jun 2014 — Feb 2024</span>
                <span className="tl-co">Heineken Panamá</span>
                <span className="tl-loc" data-en="Panama">Panamá</span>
              </div>
              <div className="tl-main">
                <h3>Business Solution Analyst</h3>
                <ul>
                  <li data-en="Advised and executed technology improvements in business processes, ensuring alignment with corporate policies and best practices.">Asesoré y ejecuté mejoras tecnológicas en procesos de negocio, garantizando alineación con políticas corporativas y mejores prácticas.</li>
                  <li data-en="Recommended and deployed hardware/software solutions addressing business needs, with thorough testing and minimal user impact.">Recomendé y desplegué soluciones de hardware y software para necesidades del negocio, con pruebas exhaustivas y mínima afectación a usuarios.</li>
                  <li data-en="Managed technology projects including selection and supervision of external vendors, maintaining documentation and knowledge transfer.">Gestioné proyectos tecnológicos, incluyendo selección y supervisión de proveedores externos, manteniendo documentación y transferencia de conocimiento.</li>
                  <li data-en="Provided ongoing user support and training on new tools and procedures, ensuring efficient implementation and risk mitigation.">Brindé soporte continuo y capacitación sobre nuevas herramientas, asegurando implementación eficiente y mitigación de riesgos.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Ene 2013 — Jun 2014</span>
                <span className="tl-co">Fursys S.A.</span>
                <span className="tl-loc" data-en="Network Administrator">Administrador de Redes</span>
              </div>
              <div className="tl-main">
                <h3 data-en="Network Administrator">Administrador de Redes</h3>
                <ul>
                  <li data-en="Administered servers — mail, Active Directory, antivirus, databases and virtual machines — ensuring preventive and corrective maintenance.">Administré servidores: correo, Active Directory, antivirus, bases de datos y máquinas virtuales, garantizando mantenimiento preventivo y correctivo.</li>
                  <li data-en="Configured and installed operating systems, security software and servers, providing local and remote end-user support.">Configuré e instalé sistemas operativos, software de seguridad y servidores, brindando soporte local y remoto a usuarios.</li>
                  <li data-en="Managed network infrastructure including Fortigate and Barracuda, cabling and multifunction printer configuration.">Gestioné infraestructura de red, incluyendo Fortigate y Barracuda, cableado y configuración de impresoras multifuncionales.</li>
                  <li data-en="Coordinated creation of mail accounts and access, supporting the hiring process with technical tests.">Coordiné creación y configuración de cuentas de correo y accesos, apoyando el proceso de contratación con pruebas técnicas.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Sep 2012 — Dic 2012</span>
                <span className="tl-co">Redes y Consultoría Latinoamericana</span>
                <span className="tl-loc" data-en="Network Administrator">Administrador de Redes</span>
              </div>
              <div className="tl-main">
                <h3 data-en="Network Administrator">Administrador de Redes</h3>
                <ul>
                  <li data-en="Administered and maintained network resources, equipment and software configuration, keeping licenses up to date.">Administré y mantuve recursos de red, configuración de equipos y software, asegurando la actualización y renovación de licencias.</li>
                  <li data-en="Implemented security systems (antivirus, firewall) and effective backups to minimize data-loss risk.">Implementé sistemas de seguridad (antivirus, firewall) y backups efectivos para minimizar riesgos de pérdida de información.</li>
                  <li data-en="Provided local and remote technical support, hardware/software maintenance and equipment rotation.">Proveí soporte técnico local y remoto, mantenimiento de hardware y software, y gestioné rotación de equipos.</li>
                  <li data-en="Configured wired/wireless networks, remote access and mobile devices, and monitored network traffic.">Configuré redes alámbricas e inalámbricas, acceso remoto y dispositivos móviles, monitoreando el tráfico de red.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Jul 2011 — Ago 2012</span>
                <span className="tl-co">St Georges Bank</span>
                <span className="tl-loc" data-en="Technical Support">Soporte Técnico</span>
              </div>
              <div className="tl-main">
                <h3 data-en="Technical Support">Soporte Técnico</h3>
                <ul>
                  <li data-en="Operating system, software and antivirus installation.">Instalación de sistema operativo, software y antivirus.</li>
                  <li data-en="Hardware replacement and maintenance.">Reemplazo y mantenimiento de hardware.</li>
                  <li data-en="User password lock, unlock and reset in Active Directory.">Bloqueo, desbloqueo y reinicio de contraseñas de usuarios en Active Directory.</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ EDUCACIÓN ============ */}
      <section className="section" id="educacion">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow" data-en="Education">Formación</span>
            <h2 data-en="Education &amp; certifications">Educación y certificaciones</h2>
          </div>
          <div className="edu-grid">
            <article className="card edu-card reveal">
              <div className="edu-top">
                <div className="edu-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg></div>
                <span className="edu-tag live" data-en="In progress">En curso · 4° año</span>
              </div>
              <h3 data-en="B.Sc. Software Development &amp; Management">Lic. en Desarrollo y Gestión de Software</h3>
              <div className="inst">Universidad Tecnológica de Panamá</div>
              <div className="meta" data-en="Currently 4th year">Cursando 4° año</div>
            </article>

            <article className="card edu-card reveal">
              <div className="edu-top">
                <div className="edu-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg></div>
                <span className="edu-tag" data-en="Degree">Licenciatura</span>
              </div>
              <h3 data-en="B.Sc. Computer Networks">Lic. en Redes Informáticas</h3>
              <div className="inst">Universidad Tecnológica de Panamá</div>
              <div className="meta">Dic 2013</div>
            </article>

            <article className="card edu-card reveal">
              <div className="edu-top">
                <div className="edu-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="m9 14-2 7 5-3 5 3-2-7" /></svg></div>
                <span className="edu-tag" data-en="Certification">Certificación</span>
              </div>
              <h3>Cisco CCNA</h3>
              <div className="inst" data-en="Networking certification — Cisco">Certificación de redes — Cisco</div>
              <div className="meta">Sep 2022</div>
            </article>

            <article className="card edu-card reveal">
              <div className="edu-top">
                <div className="edu-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="m9 14-2 7 5-3 5 3-2-7" /></svg></div>
                <span className="edu-tag" data-en="Certification">Certificación</span>
              </div>
              <h3 data-en="Data Scientist">Científico de Datos</h3>
              <div className="inst">Alura Latam &amp; Oracle Next Education</div>
              <div className="meta" data-en="307 hours · 7 tracks · Aug 2025">307 horas · 7 formaciones · Ago 2025</div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ HABILIDADES ============ */}
      <section className="section" id="habilidades" style={{ background: "var(--surface-2)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow" data-en="Stack">Stack</span>
            <h2 data-en="Skills &amp; technologies">Habilidades y tecnologías</h2>
            <p data-en="From enterprise platforms and device management to programming languages and AI.">Desde plataformas empresariales y gestión de dispositivos hasta lenguajes de programación e IA.</p>
          </div>
          <div className="skills-grid">
            <article className="card skill-card feature reveal">
              <div className="skill-head">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg></div>
                <div>
                  <h3 data-en="Platforms, MDM &amp; AI">Plataformas, MDM &amp; IA</h3>
                  <p data-en="Enterprise environments &amp; automation">Entornos empresariales y automatización</p>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Intune MDM</span>
                <span className="tag">Google Workspace</span>
                <span className="tag">Microsoft 365</span>
                <span className="tag">Apple Business Manager</span>
                <span className="tag" data-en="AI agent creation">Creación de agentes de IA</span>
                <span className="tag">Windows Server</span>
                <span className="tag">Active Directory</span>
                <span className="tag" data-en="Structured cabling">Cableado estructurado</span>
                <span className="tag" data-en="WiFi networks">Redes WiFi</span>
                <span className="tag" data-en="Network devices">Dispositivos de red</span>
              </div>
            </article>

            <article className="card skill-card reveal">
              <div className="skill-head">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></div>
                <div>
                  <h3 data-en="Languages">Lenguajes</h3>
                  <p data-en="Programming">Programación</p>
                </div>
              </div>
              <div className="tags">
                <span className="tag">PHP</span><span className="tag">Python</span><span className="tag">JavaScript</span>
                <span className="tag">HTML</span><span className="tag">CSS</span><span className="tag">SQL</span>
                <span className="tag">C#</span><span className="tag">Kotlin</span><span className="tag">Java</span>
              </div>
            </article>

            <article className="card skill-card reveal">
              <div className="skill-head">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></div>
                <div>
                  <h3 data-en="Frameworks &amp; tools">Frameworks &amp; herramientas</h3>
                  <p data-en="Automation &amp; dev">Automatización y desarrollo</p>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Power Automate</span><span className="tag">UiPath</span>
                <span className="tag">VS Code</span><span className="tag">Visual Studio</span>
                <span className="tag">Android Studio</span><span className="tag">XAMPP</span><span className="tag">Google Colab</span>
              </div>
            </article>

            <article className="card skill-card reveal">
              <div className="skill-head">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></svg></div>
                <div>
                  <h3 data-en="Databases">Bases de datos</h3>
                  <p data-en="Storage &amp; data">Almacenamiento y datos</p>
                </div>
              </div>
              <div className="tags">
                <span className="tag">MySQL Server</span><span className="tag">MariaDB</span>
                <span className="tag">Oracle</span><span className="tag">PostgreSQL</span><span className="tag">Firebase</span>
              </div>
            </article>

            <article className="card skill-card reveal">
              <div className="skill-head">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6 2 11c0 3 2 5 5 5h1.5c1 0 1.5.8 1.5 1.5 0 .5-.3 1-.3 1.5 0 1 .8 2 2 2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg></div>
                <div>
                  <h3 data-en="Design">Diseño</h3>
                  <p data-en="Creative tools">Herramientas creativas</p>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Figma</span><span className="tag">Adobe Photoshop</span>
                <span className="tag">Adobe Illustrator</span><span className="tag">Camtasia</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ PROYECTOS ============ */}
      <section className="section" id="proyectos">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow" data-en="Work">Trabajo</span>
            <h2 data-en="Featured projects">Proyectos destacados</h2>
            <p data-en="Live websites I've built. Click any card to open the site.">Sitios web en producción que he desarrollado. Haz clic en cualquier tarjeta para abrir el sitio.</p>
          </div>
          <div className="proj-grid">
            {projects.map((p) => (
              <a key={p.id} className="proj reveal" href={p.url} target="_blank" rel="noopener">
                <div className="proj-thumb">
                  <div className="ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>{host(p.url)}</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img {...(p.img ? { src: p.img } : { "data-thumb": p.url })} alt={p.name} loading="lazy" />
                  <span className="proj-go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
                </div>
                <div className="proj-body">
                  <span className="proj-cat" data-en={p.catEn || p.cat}>{p.cat}</span>
                  <h3>{p.name}</h3>
                  <p data-en={p.descEn || p.desc}>{p.desc}</p>
                  <span className="proj-url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" /></svg>{host(p.url)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESEÑAS ============ */}
      <section className="section" id="resenas" style={{ background: "var(--surface-2)" }}>
        <div className="wrap">
          <div className="rev-head-row section-head reveal" style={{ maxWidth: "none", marginBottom: 46 }}>
            <div>
              <span className="eyebrow" data-en="Travel">Viajes</span>
              <h2 data-en="Places I've reviewed">Reseñas de lugares que he visitado</h2>
              <p data-en="Spots from my travels and the food I've enjoyed along the way.">Lugares de mis viajes y la comida que he disfrutado en el camino.</p>
            </div>
          </div>
          <div className="rev-grid" id="revGrid">
            {reviews.map((r) => (
              <article key={r.id} className="rev reveal">
                {r.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="rev-img" src={r.img} alt={r.place} />
                ) : (
                  <div className="rev-img" style={{ display: "grid", placeItems: "center", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>foto del lugar</div>
                )}
                <div className="rev-body">
                  <div className="rev-place">
                    <h3>{r.place}</h3>
                    <span className="loc">{r.loc}</span>
                  </div>
                  <div className="stars" data-stars={r.stars}></div>
                  <p className="rev-text" data-en={r.textEn || r.text}>{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section className="section contacto" id="contacto">
        <div className="wrap contact-grid">
          <div className="reveal">
            <span className="eyebrow" data-en="Contact">Contacto</span>
            <h2 data-en="Let's talk">Conversemos</h2>
            <p className="lead" data-en="Have a project or opportunity in mind? Send me a message — I'll get back to you soon.">¿Tienes un proyecto u oportunidad en mente? Envíame un mensaje y te responderé pronto.</p>

            <div className="contact-list">
              <a className="contact-row" href="https://wa.me/50761511270" target="_blank" rel="noopener">
                <div className="ic"><svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3.2C9.3 3.2 3.9 8.6 3.9 15.3c0 2.1.6 4.2 1.6 6L3.8 28.8l7.7-1.7c1.7.9 3.6 1.4 5.5 1.4h.01c6.7 0 12.1-5.4 12.1-12.1 0-3.2-1.3-6.3-3.5-8.6A12 12 0 0 0 16 3.2zm0 22c-1.7 0-3.4-.5-4.9-1.3l-.35-.2-4.1.9.9-4-.23-.37a10 10 0 1 1 8.69 4.97zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.3 1.28.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" /></svg></div>
                <div><div className="lab">WhatsApp</div><div className="val">+507 6151-1270</div></div>
              </a>
              <a className="contact-row" href="mailto:axel.cisnero@hotmail.com">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg></div>
                <div><div className="lab" data-en="Email">Correo</div><div className="val">axel.cisnero@hotmail.com</div></div>
              </a>
              <a className="contact-row" href="https://www.linkedin.com/in/acisnero/" target="_blank" rel="noopener">
                <div className="ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11.1 21 14.3V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z" /></svg></div>
                <div><div className="lab">LinkedIn</div><div className="val">/in/acisnero</div></div>
              </a>
            </div>

            <div className="socials">
              <a className="social-btn" href="https://www.linkedin.com/in/acisnero/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11.1 21 14.3V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z" /></svg></a>
              <a className="social-btn" href="https://github.com/axelcisnero" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.25-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z" /></svg></a>
              <a className="social-btn" href="mailto:axel.cisnero@hotmail.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg></a>
            </div>
          </div>

          <div className="form-card reveal">
            <h3 data-en="Send me a message">Envíame un mensaje</h3>
            <p className="sub" data-en="Fill out the form and it will reach my inbox.">Completa el formulario y llegará directo a mi correo.</p>
            <form id="contactForm">
              <div className="field two">
                <div>
                  <label data-en="Name">Nombre</label>
                  <input type="text" name="nombre" required placeholder="Tu nombre" data-en-ph="Your name" />
                </div>
                <div>
                  <label data-en="Email">Correo</label>
                  <input type="email" name="email" required placeholder="tu@correo.com" data-en-ph="you@email.com" />
                </div>
              </div>
              <div className="field">
                <label data-en="Subject">Asunto</label>
                <input type="text" name="asunto" placeholder="¿De qué se trata?" data-en-ph="What's it about?" />
              </div>
              <div className="field">
                <label data-en="Message">Mensaje</label>
                <textarea name="mensaje" rows={4} required placeholder="Cuéntame en qué puedo ayudarte..." data-en-ph="Tell me how I can help..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary form-submit"><span data-en="Send message">Enviar mensaje</span></button>
              <div className="form-msg" id="formMsg"></div>
              <p className="form-note" data-en="Or write me directly at axel.cisnero@hotmail.com">O escríbeme directo a axel.cisnero@hotmail.com</p>
            </form>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <a href="#hero" className="brand">Axel Cisnero</a>
          <small>© <span id="year"></span> Axel Cisnero · <span data-en="All rights reserved">Todos los derechos reservados</span></small>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/acisnero/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://github.com/axelcisnero" target="_blank" rel="noopener">GitHub</a>
            <a href="/assets/Axel-Cisnero-CV.pdf" download data-en="CV (PDF)">CV (PDF)</a>
            <a href="/admin" className="admin-lock" title="Acceso de administrador"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg><span data-en="Admin">Admin</span></a>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a className="wa-float" href="https://wa.me/50761511270?text=Hola%20Axel,%20vi%20tu%20hoja%20de%20vida%20y%20me%20gustaría%20conversar." target="_blank" rel="noopener" aria-label="WhatsApp">
        <span className="tip" data-en="Chat on WhatsApp">Escríbeme por WhatsApp</span>
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3.2C9.3 3.2 3.9 8.6 3.9 15.3c0 2.1.6 4.2 1.6 6L3.8 28.8l7.7-1.7c1.7.9 3.6 1.4 5.5 1.4h.01c6.7 0 12.1-5.4 12.1-12.1 0-3.2-1.3-6.3-3.5-8.6A12 12 0 0 0 16 3.2zm0 22c-1.7 0-3.4-.5-4.9-1.3l-.35-.2-4.1.9.9-4-.23-.37a10 10 0 1 1 8.69 4.97zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.3 1.28.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" /></svg>
      </a>

      <CVScripts />
    </>
  );
}

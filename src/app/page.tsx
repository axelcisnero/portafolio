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
          <a href="#hero" className="brand">Axel Cisnero<span className="dot">.</span></a>
          <div className="nav-links">
            <a href="#perfil" data-en="Profile">Perfil</a>
            <a href="#experiencia" data-en="Experience">Experiencia</a>
            <a href="#habilidades" data-en="Skills">Habilidades</a>
            <a href="#proyectos" data-en="Projects">Proyectos</a>
            <a href="#resenas" data-en="Reviews">Reseñas</a>
            <a href="#contacto" data-en="Contact">Contacto</a>
          </div>
          <div className="nav-tools">
            <div className="toggle" id="langToggle">
              <button data-lang="es" className="active">ES</button>
              <button data-lang="en">EN</button>
            </div>
            <div className="toggle" id="themeToggle" role="group" aria-label="Tema">
              <button data-theme="light" className="active" aria-label="Tema claro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg></button>
              <button data-theme="dark" aria-label="Tema oscuro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg></button>
            </div>
            <a href="/assets/Axel-Cisnero-CV.pdf" download className="nav-cv" title="Descargar CV">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              <span data-en="CV">CV</span>
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
            <div className="hero-status" data-en="Available for new challenges · Panama City">Disponible para nuevos retos · Ciudad de Panamá</div>
            <h1>Axel<br /><span className="last">Cisnero</span></h1>
            <div className="hero-role">
              <span data-en="IT Infrastructure Specialist">Especialista en Infraestructura TI</span>
              {" / "}
              <span data-en="Software Developer">Desarrollador de Software</span>
            </div>
            <p className="hero-tag" data-en="Over a decade turning business needs into reliable technology, from enterprise IT and networks to modern software and AI agents.">Más de una década convirtiendo necesidades de negocio en tecnología confiable: de la TI empresarial y las redes al software moderno y los agentes de IA.</p>
            <div className="hero-cta">
              <a href="#proyectos" className="btn btn-primary"><span data-en="View projects">Ver proyectos</span></a>
              <a href="#contacto" className="btn btn-line"><span data-en="Contact me">Contáctame</span></a>
            </div>
            <div className="hero-meta">
              <div className="m"><b>10+</b><span data-en="Years in tech">Años en tecnología</span></div>
              <div className="m"><b>4°</b><span data-en="Year · Software Eng.">Año · Ing. Software</span></div>
              <div className="m"><b>{projects.length}</b><span data-en="Live projects">Proyectos en producción</span></div>
            </div>
          </div>
          <div className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroPhoto} alt="Axel Cisnero" />
          </div>
        </div>
      </header>

      {/* ============ PERFIL ============ */}
      <section className="section" id="perfil">
        <div className="wrap">
          <div className="perfil-grid">
            <div className="reveal">
              <p className="perfil-lead" data-en="Technology professional with <span class='hl'>10+ years of experience</span> advising and deploying solutions to real business problems, now expanding into modern software development and AI.">Profesional de tecnología con <span className="hl">más de 10 años de experiencia</span> asesorando y desplegando soluciones a problemas reales del negocio, ahora expandiéndome hacia el desarrollo de software moderno y la IA.</p>
              <p className="perfil-body" data-en="Currently in my 4th year of the Software Development &amp; Management degree at Universidad Tecnológica de Panamá. I pair an analytical, problem-solving mindset with hands-on experience in enterprise platforms, networking, device management and process automation.">Actualmente curso el 4° año de la Licenciatura en Desarrollo y Gestión de Software en la Universidad Tecnológica de Panamá. Combino un enfoque analítico y orientado a la solución de problemas con experiencia práctica en plataformas empresariales, redes, gestión de dispositivos y automatización de procesos.</p>
            </div>
            <div className="reveal">
              <div className="aside-block">
                <h4 data-en="What I bring">Lo que aporto</h4>
                <div className="taglist">
                  <span data-en="Teamwork">Trabajo en equipo</span>
                  <span data-en="Analytical thinking">Enfoque analítico</span>
                  <span data-en="Fast learner">Rápido aprendizaje</span>
                  <span data-en="Problem-solving">Solución de problemas</span>
                  <span data-en="Adaptability">Adaptabilidad</span>
                </div>
              </div>
              <div className="aside-block">
                <h4 data-en="Off the clock">Fuera del trabajo</h4>
                <div className="taglist">
                  <span data-en="Martial arts">Artes marciales</span>
                  <span data-en="Gaming">Videojuegos</span>
                  <span data-en="Meditation">Meditación</span>
                  <span data-en="Gym">Gimnasio</span>
                  <span data-en="Travel">Viajes</span>
                  <span data-en="Football">Fútbol</span>
                  <span data-en="Craft beer">Cerveza artesanal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCIA ============ */}
      <section className="section alt" id="experiencia">
        <div className="wrap">
          <h2 className="section-title reveal" data-en="Work experience">Experiencia laboral</h2>
          <div className="timeline">
            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date" data-en="Feb 2024 - Present">Feb 2024 - Actualidad</span>
                <span className="tl-co" data-en="Freelance / IT Consultant">Freelance / Consultor TI</span>
                <span className="tl-loc" data-en="Panama">Panamá</span>
              </div>
              <div className="tl-main">
                <h3 data-en="IT Consultant &amp; Developer">Consultor de TI &amp; Desarrollador</h3>
                <ul>
                  <li data-en="Since leaving Heineken I work independently, implementing projects and advising businesses on their technology decisions.">Desde mi salida de Heineken trabajo de forma independiente, implementando proyectos y asesorando a negocios en sus decisiones tecnológicas.</li>
                  <li data-en="Design and development of custom websites and digital solutions for clients.">Diseño y desarrollo de sitios web y soluciones digitales a la medida de cada cliente.</li>
                  <li data-en="Structured cabling and WiFi network design, installation and optimization.">Cableado estructurado y diseño, instalación y optimización de redes WiFi.</li>
                  <li data-en="Deployment and management of business platforms: Microsoft 365, Google Workspace, Intune MDM, Apple Business Manager and more.">Despliegue y gestión de plataformas empresariales: Microsoft 365, Google Workspace, Intune MDM, Apple Business Manager entre otras.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Jun 2014 - Feb 2024</span>
                <span className="tl-co">Heineken Panamá</span>
                <span className="tl-loc" data-en="Panama">Panamá</span>
              </div>
              <div className="tl-main">
                <h3>Business Solution Analyst</h3>
                <ul>
                  <li data-en="Advised and executed technology improvements in business processes, aligned with corporate policies and best practices.">Asesoré y ejecuté mejoras tecnológicas en procesos de negocio, alineadas con políticas corporativas y mejores prácticas.</li>
                  <li data-en="Recommended and deployed hardware/software solutions with thorough testing and minimal user impact.">Recomendé y desplegué soluciones de hardware y software con pruebas exhaustivas y mínima afectación a usuarios.</li>
                  <li data-en="Managed technology projects including vendor selection and supervision, documentation and knowledge transfer.">Gestioné proyectos tecnológicos, incluyendo selección y supervisión de proveedores, documentación y transferencia de conocimiento.</li>
                  <li data-en="Provided ongoing user support and training on new tools and procedures.">Brindé soporte continuo y capacitación sobre nuevas herramientas y procedimientos.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Ene 2013 - Jun 2014</span>
                <span className="tl-co">Fursys S.A.</span>
                <span className="tl-loc" data-en="Network Administrator">Administrador de Redes</span>
              </div>
              <div className="tl-main">
                <h3 data-en="Network Administrator">Administrador de Redes</h3>
                <ul>
                  <li data-en="Administered servers: mail, Active Directory, antivirus, databases and virtual machines.">Administré servidores: correo, Active Directory, antivirus, bases de datos y máquinas virtuales.</li>
                  <li data-en="Configured operating systems, security software and servers, with local and remote support.">Configuré sistemas operativos, software de seguridad y servidores, con soporte local y remoto.</li>
                  <li data-en="Managed network infrastructure including Fortigate and Barracuda, cabling and printers.">Gestioné infraestructura de red, incluyendo Fortigate y Barracuda, cableado e impresoras.</li>
                  <li data-en="Coordinated mail accounts and access, supporting hiring with technical tests.">Coordiné cuentas de correo y accesos, apoyando la contratación con pruebas técnicas.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Sep 2012 - Dic 2012</span>
                <span className="tl-co">Redes y Consultoría LA</span>
                <span className="tl-loc" data-en="Network Administrator">Administrador de Redes</span>
              </div>
              <div className="tl-main">
                <h3 data-en="Network Administrator">Administrador de Redes</h3>
                <ul>
                  <li data-en="Administered and maintained network resources, equipment and software, keeping licenses current.">Administré y mantuve recursos de red, equipos y software, manteniendo las licencias al día.</li>
                  <li data-en="Implemented security systems (antivirus, firewall) and effective backups.">Implementé sistemas de seguridad (antivirus, firewall) y backups efectivos.</li>
                  <li data-en="Provided local and remote support, hardware/software maintenance and equipment rotation.">Proveí soporte local y remoto, mantenimiento de hardware y software, y rotación de equipos.</li>
                </ul>
              </div>
            </article>

            <article className="tl-item reveal">
              <div className="tl-when">
                <span className="tl-date">Jul 2011 - Ago 2012</span>
                <span className="tl-co">St Georges Bank</span>
                <span className="tl-loc" data-en="Technical Support">Soporte Técnico</span>
              </div>
              <div className="tl-main">
                <h3 data-en="Technical Support">Soporte Técnico</h3>
                <ul>
                  <li data-en="Operating system, software and antivirus installation.">Instalación de sistema operativo, software y antivirus.</li>
                  <li data-en="Hardware replacement and maintenance.">Reemplazo y mantenimiento de hardware.</li>
                  <li data-en="User password lock, unlock and reset in Active Directory.">Bloqueo, desbloqueo y reinicio de contraseñas en Active Directory.</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ EDUCACIÓN ============ */}
      <section className="section" id="educacion">
        <div className="wrap">
          <h2 className="section-title reveal" data-en="Education &amp; certifications">Educación y certificaciones</h2>
          <div className="edu-list">
            <div className="edu-row reveal">
              <div className="edu-date live" data-en="In progress · 4th year">En curso · 4° año</div>
              <div>
                <h3 data-en="B.Sc. Software Development &amp; Management">Lic. en Desarrollo y Gestión de Software</h3>
                <div className="inst">Universidad Tecnológica de Panamá</div>
              </div>
            </div>
            <div className="edu-row reveal">
              <div className="edu-date">Ago 2025</div>
              <div>
                <h3 data-en="Data Scientist Certification">Certificación Científico de Datos</h3>
                <div className="inst" data-en="Alura Latam &amp; Oracle Next Education · 307 hours">Alura Latam &amp; Oracle Next Education · 307 horas</div>
              </div>
            </div>
            <div className="edu-row reveal">
              <div className="edu-date">Sep 2022</div>
              <div>
                <h3>Cisco CCNA</h3>
                <div className="inst" data-en="Networking certification">Certificación de redes</div>
              </div>
            </div>
            <div className="edu-row reveal">
              <div className="edu-date">Dic 2013</div>
              <div>
                <h3 data-en="B.Sc. Computer Networks">Lic. en Redes Informáticas</h3>
                <div className="inst">Universidad Tecnológica de Panamá</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HABILIDADES ============ */}
      <section className="section alt" id="habilidades">
        <div className="wrap">
          <h2 className="section-title reveal" data-en="Skills &amp; technologies">Habilidades y tecnologías</h2>
          <div className="skills-grid">
            <div className="skill-group wide reveal">
              <h3 data-en="Platforms, MDM &amp; AI">Plataformas, MDM &amp; IA</h3>
              <div className="skill-flow">
                <span>Intune MDM</span><span>Microsoft 365</span><span>Google Workspace</span>
                <span>Apple Business Manager</span><span data-en="AI agents">Agentes de IA</span>
                <span>Windows Server</span><span>Active Directory</span>
                <span data-en="Structured cabling">Cableado estructurado</span><span data-en="WiFi networks">Redes WiFi</span>
              </div>
            </div>
            <div className="skill-group reveal">
              <h3 data-en="Languages">Lenguajes</h3>
              <div className="skill-flow">
                <span>PHP</span><span>Python</span><span>JavaScript</span><span>SQL</span>
                <span>C#</span><span>Kotlin</span><span>Java</span><span>HTML</span><span>CSS</span>
              </div>
            </div>
            <div className="skill-group reveal">
              <h3 data-en="Tools &amp; databases">Herramientas y BD</h3>
              <div className="skill-flow">
                <span>Power Automate</span><span>UiPath</span><span>Google Colab</span>
                <span>MySQL</span><span>PostgreSQL</span><span>MariaDB</span><span>Oracle</span><span>Firebase</span>
              </div>
            </div>
            <div className="skill-group reveal">
              <h3 data-en="Design">Diseño</h3>
              <div className="skill-flow">
                <span>Figma</span><span>Photoshop</span><span>Illustrator</span><span>Camtasia</span>
              </div>
            </div>
            <div className="skill-group reveal">
              <h3 data-en="Certified">Certificado</h3>
              <div className="skill-flow">
                <span>Cisco CCNA</span><span data-en="Data Science">Ciencia de Datos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROYECTOS ============ */}
      <section className="section" id="proyectos">
        <div className="wrap">
          <h2 className="section-title reveal" data-en="Selected work">Trabajo seleccionado</h2>
          {projects.length === 0 && (
            <p className="empty-note reveal" data-en="Projects coming soon.">Pronto publicaré mis proyectos aquí.</p>
          )}
          <div className="projects">
            {projects.map((p) => (
              <article key={p.id} className="project reveal">
                <a className="project-media" href={p.url} target="_blank" rel="noopener" aria-label={p.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img {...(p.img ? { src: p.img } : { "data-thumb": p.url })} alt={p.name} loading="lazy" />
                </a>
                <div className="project-body">
                  <span className="cat" data-en={p.catEn || p.cat}>{p.cat}</span>
                  <h3>{p.name}</h3>
                  <p data-en={p.descEn || p.desc}>{p.desc}</p>
                  <a className="go" href={p.url} target="_blank" rel="noopener">
                    <span data-en="Visit site">Visitar sitio</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </a>
                  <div className="cat" style={{ marginTop: 12 }}>{host(p.url)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESEÑAS ============ */}
      <section className="section alt" id="resenas">
        <div className="wrap">
          <h2 className="section-title reveal" data-en="Places I've reviewed">Reseñas de lugares visitados</h2>
          {reviews.length === 0 && (
            <p className="empty-note reveal" data-en="No reviews published yet.">Aún no hay reseñas publicadas.</p>
          )}
          <div className="rev-grid">
            {reviews.map((r) => (
              <article key={r.id} className="rev reveal">
                <p className="rev-quote" data-en={r.textEn || r.text}>{r.text}</p>
                <div className="rev-meta">
                  <div className="who"><b>{r.place}</b><span>{r.loc}</span></div>
                  <div className="stars" data-stars={r.stars}></div>
                </div>
                {r.img && (
                  <div className="rev-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.img} alt={r.place} loading="lazy" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section className="section" id="contacto">
        <div className="wrap contact-grid">
          <div className="reveal">
            <h2 className="contact-h" data-en="Let's talk">Conversemos</h2>
            <p className="contact-lead" data-en="Got a project or an opportunity in mind? Send a message and I'll reply soon.">¿Tienes un proyecto o una oportunidad en mente? Envíame un mensaje y te respondo pronto.</p>
            <div className="contact-links">
              <a href="https://wa.me/50761511270" target="_blank" rel="noopener">
                <span>WhatsApp</span><span className="lab">+507 6151-1270</span>
              </a>
              <a href="mailto:axel.cisnero@hotmail.com">
                <span data-en="Email">Correo</span><span className="lab">axel.cisnero@hotmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/acisnero/" target="_blank" rel="noopener">
                <span>LinkedIn</span><span className="lab">/in/acisnero</span>
              </a>
              <a href="https://github.com/axelcisnero" target="_blank" rel="noopener">
                <span>GitHub</span><span className="lab">/axelcisnero</span>
              </a>
            </div>
          </div>

          <div className="reveal">
            <form id="contactForm" className="form">
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
                <textarea name="mensaje" rows={4} required placeholder="Cuéntame en qué puedo ayudarte" data-en-ph="Tell me how I can help"></textarea>
              </div>
              <button type="submit" className="btn btn-primary"><span data-en="Send message">Enviar mensaje</span></button>
              <div className="form-msg" id="formMsg"></div>
              <p className="form-note" data-en="Or write me directly at axel.cisnero@hotmail.com">O escríbeme directo a axel.cisnero@hotmail.com</p>
            </form>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <a href="#hero" className="brand">Axel Cisnero<span className="dot">.</span></a>
          <small>© <span id="year"></span> Axel Cisnero · <span data-en="All rights reserved">Todos los derechos reservados</span></small>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/acisnero/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://github.com/axelcisnero" target="_blank" rel="noopener">GitHub</a>
            <a href="/admin" className="admin-lock" title="Acceso de administrador">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span>Admin</span>
            </a>
          </div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <a className="wa-float" href="https://wa.me/50761511270?text=Hola%20Axel,%20vi%20tu%20portafolio%20y%20me%20gustaría%20conversar." target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3.2C9.3 3.2 3.9 8.6 3.9 15.3c0 2.1.6 4.2 1.6 6L3.8 28.8l7.7-1.7c1.7.9 3.6 1.4 5.5 1.4h.01c6.7 0 12.1-5.4 12.1-12.1 0-3.2-1.3-6.3-3.5-8.6A12 12 0 0 0 16 3.2zm0 22c-1.7 0-3.4-.5-4.9-1.3l-.35-.2-4.1.9.9-4-.23-.37a10 10 0 1 1 8.69 4.97zm5.5-7.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.3 1.28.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" /></svg>
      </a>

      <CVScripts />
    </>
  );
}

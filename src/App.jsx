import { useEffect, useMemo, useState } from 'react';
import './App.css';
import portfolioData from './data/portfolioData';

function App() {
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Education', href: '#education' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Experience', href: '#experience' },
      { label: 'Certificates', href: '#certifications' },
      { label: 'Achievements', href: '#achievements' },
      { label: 'Coding Profiles', href: '#profiles' },
      { label: 'Resume', href: '#resume' },
      { label: 'Contact', href: '#contact' },
    ],
    [],
  );

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message before sending.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:${portfolioData.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="portfolio-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Go to top">
            {portfolioData.personal.name || '[YOUR FULL NAME]'}
          </a>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle light and dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid single-column-hero">
            <div className="hero-copy reveal-up">
              <p className="eyebrow">Hi, I&apos;m {portfolioData.personal.name || '[YOUR FULL NAME]'}</p>
              <h1>{portfolioData.personal.degree}</h1>
              <p className="intro-text">{portfolioData.personal.intro}</p>

              <div className="cta-row">
                <a href="#projects" className="button primary">
                  View My Projects
                </a>
                <a href={portfolioData.personal.resume} className="button secondary" target="_blank" rel="noreferrer">
                  Download Resume
                </a>
              </div>

              <div className="social-row" aria-label="Social links">
                <a href={portfolioData.personal.github || '#'} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  GitHub
                </a>
                <a href={portfolioData.personal.linkedin || '#'} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <SectionHeader eyebrow="About Me" title="A curious learner building practical software skills" />
            <div className="about-grid">
              <div className="card">
                <p>{portfolioData.personal.shortIntro}</p>
              </div>
              <div className="card">
                <ul className="info-list">
                  <li>
                    <strong>Current Status:</strong> {portfolioData.personal.currentYear} pursuing {portfolioData.personal.degree}
                  </li>
                  <li>
                    <strong>Areas of Interest:</strong> Software development, problem solving, coding, and emerging technologies
                  </li>
                  <li>
                    <strong>Learning Mindset:</strong> Continuous improvement through projects, coding practice, and exploration
                  </li>
                  <li>
                    <strong>Career Interest:</strong> Software engineering, internships, and future opportunities in technology
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section muted-section">
          <div className="container">
            <SectionHeader eyebrow="Education" title="Academic background" />
            <div className="timeline-card card">
              <div className="timeline-item">
                <span className="timeline-dot" aria-hidden="true"></span>
                <div>
                  <h3>{portfolioData.education.degree}</h3>
                  <p className="meta">{portfolioData.education.year}</p>
                  <p>{portfolioData.education.college}</p>
                  <p>{portfolioData.education.location}</p>
                  <p>
                    Started: {portfolioData.education.startYear} | Expected Graduation: {portfolioData.education.graduationYear}
                  </p>
                  <p>{portfolioData.education.school}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <SectionHeader eyebrow="Skills" title="Technical skills and concepts" />
            <div className="skills-grid">
              <SkillGroup title="Programming Languages" items={portfolioData.skills.programmingLanguages} />
              <SkillGroup title="Web Technologies" items={portfolioData.skills.webTechnologies} />
              <SkillGroup title="Database" items={portfolioData.skills.database} />
              <SkillGroup title="Tools" items={portfolioData.skills.tools} />
              <SkillGroup title="Libraries / Frameworks" items={portfolioData.skills.librariesFrameworks} />
              <SkillGroup title="Concepts" items={portfolioData.skills.concepts} />
            </div>
          </div>
        </section>

        <section id="projects" className="section muted-section">
          <div className="container">
            <SectionHeader eyebrow="Projects" title="Selected work" />
            <div className="projects-grid">
              {portfolioData.projects.map((project) => (
                <article key={project.name} className="project-card card">
                  <img src={project.image} alt={project.name} className="project-image" />
                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="tag-row">
                      <span>{project.technologies}</span>
                    </div>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <div className="project-actions">
                      <a href={project.github || '#'} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                      <a href={project.liveDemo || '#'} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionHeader eyebrow="Experience & Activities" title="Building skills through real learning" />
            <div className="experience-list">
              {portfolioData.experience.map((item) => (
                <div key={item.title} className="experience-item card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section muted-section">
          <div className="container">
            <SectionHeader eyebrow="Certifications" title="Professional learning" />
            <div className="cert-grid">
              {portfolioData.certifications.map((cert) => (
                <div key={cert.name} className="card cert-card">
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <p>{cert.date}</p>
                  <p>{cert.credential}</p>
                  <a href={cert.link || '#'} target="_blank" rel="noreferrer">
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="achievements" className="section">
          <div className="container">
            <SectionHeader eyebrow="Achievements" title="Recognition and milestones" />
            <div className="achievement-grid">
              {portfolioData.achievements.map((item) => (
                <div key={item.title} className="card achievement-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="profiles" className="section muted-section">
          <div className="container">
            <SectionHeader eyebrow="GitHub / Coding Profiles" title="Coding presence" />
            <div className="profile-grid">
              {portfolioData.codingProfiles.map((profile) => (
                <a key={profile.platform} href={profile.url || '#'} target="_blank" rel="noreferrer" className="card profile-card">
                  <h3>{profile.platform}</h3>
                  <p>{profile.url || '[LINK]'}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="section">
          <div className="container">
            <SectionHeader eyebrow="Resume" title="Download or view my resume" />
            <div className="resume-box card">
              <p>Use this section to share your resume with recruiters and hiring teams.</p>
              <div className="cta-row">
                <a href={portfolioData.personal.resume} className="button primary" target="_blank" rel="noreferrer">
                  Download My Resume
                </a>
                <a href={portfolioData.personal.resume} className="button secondary" target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </div>
              <p className="placeholder-note">
                If the resume is not added yet, place your PDF in the public folder and keep the path as /resume.pdf.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section muted-section">
          <div className="container contact-grid">
            <div>
              <SectionHeader eyebrow="Contact" title="Let’s connect" />
              <div className="contact-info card">
                <p>
                  <strong>Email:</strong> {portfolioData.contact.email}
                </p>
                <p>
                  <strong>LinkedIn:</strong> {portfolioData.contact.linkedin}
                </p>
                <p>
                  <strong>GitHub:</strong> {portfolioData.contact.github}
                </p>
                <p>
                  <strong>Phone:</strong> {portfolioData.contact.phone || '[OPTIONAL PHONE]'}
                </p>
              </div>
            </div>

            <form className="contact-form card" onSubmit={handleContactSubmit}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="your@email.com" />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Write your message here" />
              </label>
              <button type="submit" className="button primary full-width">
                Send Message
              </button>
              <p className="form-note">{portfolioData.contact.formNote}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© {new Date().getFullYear()} {portfolioData.personal.name || '[YOUR FULL NAME]'}</p>
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function SkillGroup({ title, items }) {
  return (
    <div className="card skill-card">
      <h3>{title}</h3>
      <div className="tag-row">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default App;

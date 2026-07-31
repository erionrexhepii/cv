const profile = {
  name: 'Erion Rexhepi',
  role: 'Computer Science Student | Java & Web Developer',
  location: '10000 Prishtine',
  email: 'erionrexhepi73@gmail.com',
  phone: '048 329 532',
  birthDate: '13 July 2005',
  links: [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/erion-rexhepi-2a0ab6387',
    },
  ],
  summary:
    'Computer Science student at AAB College with practical experience in Java development, web development, software development, and database-driven university projects.',
  skills: ['Java Development', 'Web Development', 'Software Development', 'MySQL', 'JDBC', 'HTML', 'CSS', 'JavaScript'],
  languages: ['Albanian', 'English'],
  experience: [
    {
      role: 'University Project Work',
      company: 'AAB College',
      period: '2023 - Present',
      details: [
        'Developed Java applications for scheduling, banking simulation, and car rental management.',
        'Designed MySQL database systems for e-commerce and student management scenarios.',
        'Built a responsive personal portfolio website using HTML, CSS, and JavaScript.',
      ],
    },
  ],
  projects: [
    {
      name: 'Schedule App',
      description:
        'A Java-based schedule management application designed to organize, store, and manage events using a database.',
      tags: ['Java', 'Database'],
    },
    {
      name: 'Bank Account Simulator',
      description:
        'A Java application that simulates a bank account, allowing users to deposit, withdraw, and check their balance.',
      tags: ['Java', 'OOP'],
    },
    {
      name: 'E-Commerce Database',
      description:
        'A MySQL-based e-commerce database that manages products, customers, and orders efficiently.',
      tags: ['MySQL', 'Database Design'],
    },
    {
      name: 'Personal Portfolio Website',
      description:
        'A responsive personal website with subtle animations and interactive sections for contact and personal introduction.',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      name: 'Student Management System',
      description:
        'A MySQL database system for managing student information, including grades, subjects, ages, and student records.',
      tags: ['MySQL', 'CRUD'],
    },
    {
      name: 'Car Rental System',
      description:
        'A Java-based application for managing car rentals with client registration, booking management, and automatic cost calculation.',
      tags: ['Java', 'JDBC', 'MySQL'],
    },
  ],
  education: [
    {
      degree: 'Faculty of Computer Science',
      school: 'AAB College, Prishtine',
      period: 'Oct 2023 - Present',
    },
    {
      degree: 'High School of Social Sciences',
      school: 'Hajdar Dushi, Gjakove',
      period: 'Sep 2020 - Jun 2023',
    },
    {
      degree: 'Elementary School',
      school: 'Zenel Sadiku, Gjakove',
      period: 'Sep 2011 - Jun 2020',
    },
  ],
}

function Section({ eyebrow, title, children }) {
  return (
    <section className="section">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Curriculum Vitae</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="summary">{profile.summary}</p>
          <div className="hero__actions">
            <a href={`mailto:${profile.email}`} className="button">
              Contact Me
            </a>
            <a href="#experience" className="button button--secondary">
              View Experience
            </a>
          </div>
        </div>

        <aside className="contact-card" aria-label="Contact information">
          <div>
            <span>Location</span>
            <strong>{profile.location}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </div>
          <div>
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </div>
          <div>
            <span>Date of Birth</span>
            <strong>{profile.birthDate}</strong>
          </div>
          <div className="social-links">
            {profile.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </aside>
      </section>

      <div className="layout">
        <div className="main-column">
          <Section eyebrow="Academic" title="Project Experience">
            <div id="experience" className="timeline">
              {profile.experience.map((job) => (
                <article className="timeline-card" key={`${job.company}-${job.role}`}>
                  <div className="timeline-card__header">
                    <div>
                      <h3>{job.role}</h3>
                      <p>{job.company}</p>
                    </div>
                    <span>{job.period}</span>
                  </div>
                  <ul>
                    {job.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section eyebrow="Selected" title="Projects">
            <div className="project-grid">
              {profile.projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </div>

        <aside className="side-column">
          <Section eyebrow="Toolkit" title="Skills">
            <div className="skill-list">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </Section>

          <Section eyebrow="Communication" title="Languages">
            <div className="skill-list">
              {profile.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
          </Section>

          <Section eyebrow="Learning" title="Education">
            {profile.education.map((item) => (
              <article className="education-card" key={item.degree}>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <span>{item.period}</span>
              </article>
            ))}
          </Section>
        </aside>
      </div>
    </main>
  )
}

export default App

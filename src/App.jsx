const profile = {
  name: 'Erion Rexhepi',
  role: 'Computer Science Student | Aspiring DevOps & Infrastructure Intern',
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
    'Computer Science student at AAB College seeking a DevOps or infrastructure internship. I have built academic Java, web, and MySQL projects and I am now focused on Linux fundamentals, networking concepts, automation, databases, and reliable system operation. I do not yet have production DevOps experience, but I am comfortable learning from real environments, documenting my work, and improving through hands-on practice.',
  skills: [
    'Linux Fundamentals',
    'Command Line Basics',
    'Git & GitHub',
    'Networking Concepts',
    'MySQL',
    'Database Design',
    'Java',
    'JDBC',
    'HTML',
    'CSS',
    'JavaScript',
    'Troubleshooting',
    'Technical Documentation',
  ],
  languages: ['Albanian', 'English'],
  experience: [
    {
      role: 'Computer Science Project Work',
      company: 'AAB College',
      period: '2023 - Present',
      details: [
        'Built Java and MySQL university projects that required structured data storage, application logic, and debugging.',
        'Practiced database design, CRUD operations, JDBC connectivity, and clear organization of project files.',
        'Developed a responsive portfolio website and gained practical experience with Git-based project structure, frontend deployment concepts, and documentation.',
        'Currently developing stronger foundations in Linux, infrastructure, networking, automation, and DevOps workflows for internship-level work.',
      ],
    },
  ],
  projects: [
    {
      name: 'Schedule App',
      description:
        'A Java schedule management application focused on organizing events with persistent database storage and clean application logic.',
      tags: ['Java', 'Database', 'Persistence'],
    },
    {
      name: 'Bank Account Simulator',
      description:
        'A Java OOP project that simulates account operations and strengthened my understanding of state, validation, and error handling.',
      tags: ['Java', 'OOP', 'Validation'],
    },
    {
      name: 'E-Commerce Database',
      description:
        'A MySQL database project for products, customers, and orders, with focus on table relationships and organized data management.',
      tags: ['MySQL', 'Database Design', 'Data Modeling'],
    },
    {
      name: 'Personal Portfolio Website',
      description:
        'A responsive website built with web fundamentals and prepared as a static site, giving me exposure to build and deployment workflows.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Static Site'],
    },
    {
      name: 'Student Management System',
      description:
        'A MySQL CRUD system for managing student records, grades, and subjects with attention to query structure and data consistency.',
      tags: ['MySQL', 'CRUD', 'Data Consistency'],
    },
    {
      name: 'Car Rental System',
      description:
        'A Java and MySQL application using JDBC for client registration, booking management, and cost calculation.',
      tags: ['Java', 'JDBC', 'MySQL', 'Backend Logic'],
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

const fileName = `${profile.name.replace(/\s+/g, '_')}_DevOps_Infrastructure_CV`

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function addPdfLines(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(text, maxWidth)
  doc.text(lines, x, y)
  return y + lines.length * lineHeight
}

async function downloadPdf() {
  const { default: jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 48
  const contentWidth = pageWidth - margin * 2
  let y = 54

  const ensureSpace = (height) => {
    if (y + height > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
  }

  const sectionTitle = (title) => {
    ensureSpace(34)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(29, 78, 216)
    doc.text(title.toUpperCase(), margin, y)
    y += 20
  }

  const paragraph = (text, size = 10.5) => {
    ensureSpace(44)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(size)
    doc.setTextColor(65, 82, 111)
    y = addPdfLines(doc, text, margin, y, contentWidth, size + 4)
    y += 8
  }

  const bullet = (text) => {
    ensureSpace(34)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(65, 82, 111)
    const lines = doc.splitTextToSize(text, contentWidth - 16)
    doc.text('-', margin, y)
    doc.text(lines, margin + 16, y)
    y += lines.length * 14 + 4
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(25)
  doc.setTextColor(15, 23, 42)
  doc.text(profile.name, margin, y)
  y += 28

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(49, 95, 159)
  y = addPdfLines(doc, profile.role, margin, y, contentWidth, 16)
  y += 8

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(71, 85, 105)
  y = addPdfLines(
    doc,
    `${profile.location} | ${profile.email} | ${profile.phone} | ${profile.links.map((link) => link.href).join(' | ')}`,
    margin,
    y,
    contentWidth,
    13,
  )
  y += 18

  sectionTitle('Profile')
  paragraph(profile.summary)

  sectionTitle('Relevant Skills')
  paragraph(profile.skills.join(' | '), 10)

  sectionTitle('Project Experience')
  profile.experience.forEach((item) => {
    ensureSpace(44)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(15, 23, 42)
    doc.text(`${item.role} - ${item.company}`, margin, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(100, 116, 139)
    doc.text(item.period, pageWidth - margin, y, { align: 'right' })
    y += 18
    item.details.forEach(bullet)
    y += 4
  })

  sectionTitle('Selected Projects')
  profile.projects.forEach((project) => {
    ensureSpace(58)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(15, 23, 42)
    doc.text(project.name, margin, y)
    y += 15
    paragraph(`${project.description} Tools: ${project.tags.join(', ')}.`, 10)
  })

  sectionTitle('Education')
  profile.education.forEach((item) => {
    ensureSpace(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(15, 23, 42)
    doc.text(item.degree, margin, y)
    y += 14
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(82, 98, 122)
    doc.text(`${item.school} | ${item.period}`, margin, y)
    y += 18
  })

  sectionTitle('Languages')
  paragraph(profile.languages.join(' | '), 10)

  doc.save(`${fileName}.pdf`)
}

async function downloadWord() {
  const {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TextRun,
  } = await import('docx')

  const textRun = (text, options = {}) =>
    new TextRun({
      text,
      font: 'Aptos',
      size: options.size ?? 22,
      bold: options.bold,
      color: options.color,
    })

  const createHeading = (text) =>
    new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 120 },
    })

  const createBullet = (text) =>
    new Paragraph({
      children: [textRun(text)],
      bullet: { level: 0 },
      spacing: { after: 80 },
    })

  const doc = new Document({
    creator: profile.name,
    title: `${profile.name} CV`,
    description: 'DevOps and infrastructure internship CV',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [textRun(profile.name, { bold: true, size: 34, color: '0F172A' })],
            spacing: { after: 80 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [textRun(profile.role, { bold: true, color: '1D4ED8' })],
            spacing: { after: 80 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              textRun(
                `${profile.location} | ${profile.email} | ${profile.phone} | ${profile.links.map((link) => link.href).join(' | ')}`,
                { size: 19, color: '475569' },
              ),
            ],
            spacing: { after: 260 },
          }),

          createHeading('Profile'),
          new Paragraph({ children: [textRun(profile.summary)], spacing: { after: 120 } }),

          createHeading('Relevant Skills'),
          new Paragraph({ children: [textRun(profile.skills.join(' | '))] }),

          createHeading('Project Experience'),
          ...profile.experience.flatMap((item) => [
            new Paragraph({
              children: [
                textRun(`${item.role} - ${item.company}`, { bold: true }),
                textRun(` (${item.period})`, { color: '64748B' }),
              ],
              spacing: { after: 80 },
            }),
            ...item.details.map(createBullet),
          ]),

          createHeading('Selected Projects'),
          ...profile.projects.flatMap((project) => [
            new Paragraph({
              children: [textRun(project.name, { bold: true })],
              spacing: { before: 120, after: 60 },
            }),
            new Paragraph({
              children: [textRun(`${project.description} Tools: ${project.tags.join(', ')}.`)],
              spacing: { after: 80 },
            }),
          ]),

          createHeading('Education'),
          ...profile.education.map(
            (item) =>
              new Paragraph({
                children: [
                  textRun(`${item.degree} - ${item.school}`, { bold: true }),
                  textRun(` (${item.period})`, { color: '64748B' }),
                ],
                spacing: { after: 90 },
              }),
          ),

          createHeading('Languages'),
          new Paragraph({ children: [textRun(profile.languages.join(' | '))] }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveBlob(blob, `${fileName}.docx`)
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
            <button type="button" className="button button--download" onClick={downloadPdf}>
              Download PDF
            </button>
            <button type="button" className="button button--download button--secondary" onClick={downloadWord}>
              Download Word
            </button>
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

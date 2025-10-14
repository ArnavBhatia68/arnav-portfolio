export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About Arnav</h1>

      {/* ABOUT SECTION (added) */}
      <h2>About</h2>
      <p>
        I'm a CS student at Arizona State University who enjoys building fast, clean web apps
        and practical ML features. I care about clear UX, performance, and shipping things people
        actually use.
      </p>
      <p>
        Right now I'm focused on Next.js + TypeScript on the frontend and Python/scikit-learn
        for ML baselines, with Postgres for data work. I also enjoy mentoring—helping peers
        debug, think clearly, and level up their fundamentals.
      </p>
      <p>
        I'm open to SWE/ML internships and collaborations.
      </p>

      {/* EDUCATION FIRST */}
      <h2>Education</h2>
      <p>
        <strong>Arizona State University</strong> — B.S. Computer Science ('26)
        <br />
        <strong>GPA:</strong> 4.0 · <strong>Scholarship:</strong> New American University Scholarship
        <br />
        <a className="underline" href="/awards/deans-list">Dean's List certificates</a>
      </p>

      {/* PROJECTS */}
      <h2>Selected Projects</h2>
      <ul>
        <li><a href="/projects/apmac-mvp">APMAC — AI Productivity MVP</a> — Result screen, API integration, Vercel deploy; shipped a usable prototype.</li>
        <li><a href="/projects/instruction-tuned-ai-assistant">Instruction-Tuned AI Assistant</a> — LoRA-tuned LLM + FastAPI inference with safety refusals.</li>
        <li><a href="/projects/role-based-academic-portal">Role-Based Academic Help Portal</a> — Multi-role app with secure auth, encrypted data, search/filter, backups.</li>
        <li><a href="/projects/sentiment-analysis-tool">Sentiment Analysis Tool</a> — Flask + scikit-learn for text and CSV batch sentiment with evaluation.</li>
      </ul>

      {/* SKILLS */}
      <h2>Skills</h2>
      <ul>
        <li><strong>Languages:</strong> TypeScript, Python, Java, C++, SQL</li>
        <li><strong>Web & Technologies:</strong> Next.js, React, Tailwind, Node, FastAPI, Flask, Postgres, Vercel, Docker (basics)</li>
        <li><strong>Data/ML:</strong> scikit-learn, pandas, Postgres, basic ML pipelines</li>
        <li><strong>Computer Science:</strong> Data Structures & Algorithms, OOP, Git</li>
      </ul>

      {/* MENTORING + LEADERSHIP */}
      <h2>Mentoring & Leadership</h2>
      <ul>
        <li>
          <strong>Teaching Assistant (Computer Science) — ASU</strong> · <em>Aug 2023 – Present</em>
          <br />
          Co-designed exploratory modules and hosted online + in-person office hours for a class of <strong>50+ undergrads</strong>.
        </li>
        <li>
          <strong>Supervisor — Joaquin Bustoz Math Science Honors Program</strong> · <em>May 2024 & 2025</em>
          <br />
          Supervised a team of <strong>5 tutors</strong> delivering PreCalculus to <strong>24 high-school students</strong> from historically underrepresented communities; implemented tailored strategies that improved engagement and learning outcomes.
        </li>
        <li>
          <strong>Instructional Aide / Grader (Mathematics) — ASU</strong> · <em>Aug 2023 – Present</em>
          <br />
          Supported a large lecture, engaging with <strong>240+ students</strong> in class and via discussion boards; assisted with homework and quiz grading to create an inclusive learning environment.
        </li>
      </ul>

      {/* LINKS */}
      <p>
        <a
  className="underline"
  href="/Resume-%20Arnav%20Bhatia_CS.pdf"   // match your real file in /public
  download="Arnav_Bhatia_Resume.pdf"        // suggested filename for the save dialog
>
  Download my resume
</a>

        {" · "}
        <a className="underline" href="/contact">Contact</a>
      </p>
    </article>
  );
}
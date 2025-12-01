import daniellebiopic from "./images/daniellebiopic.jpg";
import kaylabiopic from "./images/kaylabiopic.png";
import jaysensbiopic from "./images/jaysensbiopic.png";
import marbue1 from "./images/marbuebiopic.jpeg";
import nealsbiopic from "./images/nealsbiopic.png";
// import CodeBustersLogo from "./images/CodeBustersLogo.png";

import "../App.css";

function About() {
  return (
    <div className="about-container">
      <h2>ABOUT</h2>

      {/* <div>
        <img
          src={CodeBustersLogo}
          width={300}
          height={375}
          id="codeEmail"
          alt="CodeBusters"
        />
      </div> */}

      <div className="about-body">
        {/* Neal */}
        <div className="member-block">
          <div className="name">Neal Billig</div>
          <img src={nealsbiopic} alt="Neal Billig" />
          <p>
            Neal is an amateur full-stack java developer with a passion for
            learning about coding and all things computers. He has exceptional
            leadership skills, which he gained from his several years as a lead
            window installer. Neal also has strong attention to detail, this
            skill helps him with debugging and problem solving with his
            teammates! When he's not coding, he spends time with his wife and
            their 2 cats, and enjoys watching movies.
          </p>
        </div>

        {/* Kayla */}
        <div className="member-block">
          <div className="name">Kayla Buckner</div>
          <img src={kaylabiopic} alt="Kayla Buckner" />
          <p>
            Kayla is a full-stack developer in training, passionate about
            learning how to craft digital experiences that are both intuitive
            and impactful. Currently enrolled in an intensive Full-Stack Java
            Bootcamp, she is gaining hands-on experience with front-end and
            backend development. She loves solving problems, refining workflow,
            and building projects that merge function with creativity. Before
            transitioning into tech, she worked in social justice, using her
            degrees in communication, disaster, and trauma where she learned how
            deeply design and technology can influence human connection and
            emotional well-being. That background continues to guide how she
            builds — with empathy, clarity, and a strong sense of purpose. When
            she is not coding, she draws in charcoal, cooks, and spends time
            with her wife and their two fur babies, Charlie and Luna.
          </p>
        </div>

        {/* Jaysen */}
        <div className="member-block">
          <div className="name">Jaysen King</div>
          <img src={jaysensbiopic} alt="Jaysen King" />
          <p>
            Jaysen is a Creative Systems Developer with 10+ years of enterprise
            IT infrastructure experience and emerging full-stack expertise. He's
            recognized for innovative problem-solving and building scalable,
            user-friendly applications that bridge the gap between operations
            and development. He is proficient in Python, React, C++, and cloud
            platforms, with a growing focus on AI/ML integration. He blends
            artistic creativity with technical precision in all his work. When
            not coding, he's managing his two corgis and four cats, exploring
            technology, science, and high-horsepower cars.
          </p>
        </div>

        {/* Marbue */}
        <div className="member-block">
          <div className="name">Marbue Norman</div>
          <img src={marbue1} alt="Marbue Norman" />
          <p>
           Marbue is currently completing an intensive software development program at We Can Code IT, 
           specializing in Java and the Spring Framework for full-stack development. 
           She is building a technical foundation focused on creating efficient 
           and scalable applications. Her background in healthcare
           has instilled key competencies, including exceptional attention to detail, strong adaptability,
           and a constant commitment to quality. Marbue successfully applies 
           these disciplined qualities to her technical work. 
           Her ongoing project portfolio demonstrates growing proficiency in developing robust,
           object-oriented solutions. When not coding, she is spending time with her son.
          </p>
        </div>

        {/* Danielle */}
        <div className="member-block">
          <div className="name">Danielle Siegel</div>
          <img src={daniellebiopic} alt="Danielle Siegel" />
          <p>
            Danielle is a full-stack developer-in-training with a strong
            foundation in IT support, systems troubleshooting, and creative
            problem-solving. With a degree in Architecture and nearly a decade
            of experience supporting enterprise-level technology environments,
            she brings a unique blend of design thinking and technical expertise
            to every project. She approaches every challenge with precision and
            calm focus. When she is not coding she can be found playing with her
            cat Tiberius, walking her dog Falkor, or riding her e-bike with her
            boyfriend Tom.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

import daniellebiopic from "./images/daniellebiopic.jpg";
import kaylabiopic from "./images/kaylabiopic.png";
import jaysensbiopic from "./images/jaysensbiopic.png";
import marbue1 from "./images/marbue1.png";
import nealsbiopic from "./images/nealsbiopic.png";
import CodeBustersLogo from "./images/CodeBustersLogo.png"

function About() {
    return (
        <div className="about-container">
            <h2>ABOUT</h2>
                <div>   
                    <img src={CodeBustersLogo} width={300} height={375} id="codeEmail" alt="CodeBusters"/>
                </div>
            <div className={"about-body"}>
                <div>Neal Billig<br></br><br></br>
                    <img src={nealsbiopic} alt="Neal Billig"/>
                    <p>Neal is an amateur full-stack java developer with a passion for learning about coding and all things computers. He has exceptional leadership skills, which he gained from his several years as a lead window installer. Neal also has strong attention to detail, this skill helps him with debugging and problem solving with his teammates! When he's not coding, he spends time with his wife and their 2 cats, and enjoys watching movies.</p>
                </div>
                    <br></br><br></br>
                <div>Kayla Buckner<br></br><br></br>
                    <img src={kaylabiopic} width={350} height={375} alt="KaylaBuckner"/>
                    <p>Kayla is a full-stack developer in training, passionate about learning how to craft digital experiences that are both intuitive and impactful. Currently enrolled in an intensive Full-Stack Java Bootcamp, she is gaining hands-on experience with front-end and backend development. She loves solving problems, refining workflow, and building projects that merge function with creativity. Before transitioning into tech, she worked in social justice, using her degrees in communication, disaster, and trauma where she learned how deeply design and technology can influence human connection and emotional well-being. That background continues to guide how she builds — with empathy, clarity, and a strong sense of purpose, creating something where logic and art meet, and where every project helps make the digital world a little more human. When she is not coding, she recharges by drawing in charcoal, experimenting in the kitchen, and spending time with her wife. Together they share life with their two fur babies, Charlie and Luna, exploring the world, and learning new things about life along the way with the goal to feel more alive every day.</p>
                </div>
                    <br></br><br></br>
                <div>Jaysen King<br></br><br></br>
                    <img src={jaysensbiopic} alt="Jaysen King"/>
                    <p>Jaysen is a Creative Systems Developer with 10+ years of enterprise IT infrastructure experience and emerging full-stack expertise. He's recognized for innovative problem-solving and building scalable, user-friendly applications that bridge the gap between operations and development. He is proficient in Python, React, C++, and cloud platforms, with a growing focus on AI/ML integration. He blends artistic creativity with technical precision in all his work. When not coding, he's managing his two corgis and four cats, or exploring his love for technology, science, and high-horsepower cars. He hopes to one day restomod his 1997 Impreza coupe into a legendary 22b clone.</p>
                </div>
                    <br></br><br></br>
                <div>Marbue Norman<br></br><br></br>
                    <img src={marbue1} alt="Marbue Norman"/>
                    <p>Here lies Marbue's Bio!</p>
                </div>
                    <br></br><br></br>
                <div>Danielle Siegel<br></br><br></br>
                <img src={daniellebiopic} alt="Danielle Siegel"/>
                    <p>Danielle is a full-stack developer-in-training with a strong foundation in IT support, systems troubleshooting, and creative problem-solving. With a degree in Architecture and nearly a decade of experience supporting enterprise-level technology environments, she brings a unique blend of design thinking and technical expertise to every project. Currently enrolled in a full-stack software development bootcamp, Danielle is focused on building responsive, user-friendly applications and collaborating effectively in team-based environments. She approaches every challenge with better precision than an ordinary stormtrooper and the calm focus of someone attuned to the Force. When she is not coding she can be found playing with her cat Tiberius, walking her dog Falkor, or riding her e-bike with her boyfriend Tom.</p>
                </div>
            </div>
        </div>  
)}
export default About;

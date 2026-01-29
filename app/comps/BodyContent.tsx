import React from "react";
import '../stylesheets/BodyContent.css'

const aboutMeText: string[] = [
    "Hi, I’m Dean Ramirez, a passionate Full Stack Developer and part time educator with a strong foundation in Computer Science. I earned my A.S. in Computer Science from Houston Community College.",
    "Over the past several years, I’ve focused on designing and building scalable full-stack web applications that streamline business processes. I developed RESTful web applications using React, Node.js/Express, and PostgreSQL, deployed solutions on Google Cloud, and implemented dynamic data visualization tools for lab technicians. I also engineered custom Power Apps solutions to automate workflows, optimize Microsoft 365 systems, and provide real-time insights, ensuring efficiency across multiple departments.",
    "I enjoy learning new technology to solve complex problems and build tools that empower teams. From implementing internal file transfer systems to creating interactive dashboards, I take pride in delivering solutions that improve operations and enable data-driven decision-making.",
    "Outside of work, I like to spend my time camping or gaming with friends."
];
const skillHeaders = ['Languages','Frameworks and Tools','Developer Tools']
const skills:string[][] = [
    ["Python", "Java", "C++", "JavaScript", "SQL", "HTML", "CSS"],
    ["React.js","Chart.js","Firebase","PostgresSQL","Google Cloud Platform","Power Apps","Power BI","Microsoft Excel"],
    ["VS Code", "IntelliJ", "PyCharm", "Git"]
]

export default function AboutMe() {
    return (
        <div>
            <div className="about-me-container">
                <h1 className="section-header">About Me</h1>
                <div className="section-container">
                    {aboutMeText.map((text, index) => (
                        <p key={index} className="section-para">
                            {text}
                        </p>
                    ))}
                </div>
            </div>
            <div>
                <h1 className='section-header'>Tools I Like To Use</h1>
                <div className="section-container">
                    {skillHeaders.map((header,index)=>
                        <div className='section-skill-container'>
                            <div className='section-skill-container-bg'>
                                <p className='section-skill-header'>{header}</p>
                                <ul>{skills[index].map(skill=><li className='section-skill-item'>{skill}</li>)}</ul>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
            <div>
                <h1 className='section-header'>What I've Been Working On</h1>
            </div>
        </div>
    );
}
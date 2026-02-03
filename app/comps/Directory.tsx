import '../stylesheets/directory.css';

interface DirectoryProps {
  updateSelection: (section: Section) => void;
  onInnerDivMount?: (el: HTMLDivElement | null) => void;
}

interface Section {
  title: string;
  desc: string;
}

export default function Directory({ updateSelection, onInnerDivMount }: DirectoryProps) {
  const sections: Section[] = [
    {
      title: 'About Me',
      desc:
        "In my free time, you can often find me either planning my next outdoor adventure or playing games with friends. Some of my recent trips include exploring the Garden of the Gods in Colorado, which was an unforgettable experience. I also like to set aside time to practice new technologies that can make my day-to-day life easier. When I’m relaxing at home, I enjoy diving into games like Kenshi and Hearts of Iron, which let me relax or sometimes mod them for custom adventures."
    },
    {
      title: 'Experience',
      desc:
        "I have spent much of my career building and managing robust data analytics systems. At TexPower, I developed an internal RESTful web application that served as a central data hub, using PostgreSQL, Express.js/Node.js, and React. I also designed scalable SQL databases on Google Cloud and created tools like a dynamic graphing system for lab technicians and a web file transfer app for bulk CSV uploads, streamlining workflows and improving data accessibility.\n\nIn addition to analytics, I built and deployed enterprise solutions with Microsoft Power Apps while maintaining a stable and secure Microsoft 365 environment. I designed custom applications—such as a purchasing app that automated delivery notifications and inventory updates—and implemented cost-effective tools like Tailscale and Tesseract OCR to optimize operations. My responsibilities also included system maintenance, documentation, and providing 24/7 technical support for international teams.\n\nAlongside my professional work, I served as a Lead Curriculum Developer at CoderKids, guiding classrooms of 20+ students through lessons in Python, Lua, Unity, and object-oriented programming in Java and C++. I focused on simplifying complex coding concepts into interactive, age-appropriate lessons and prepared company-wide lesson plans to ensure consistent instruction. Teaching has allowed me to share my expertise while developing leadership, patience, and communication skills.\n\nMy main passion in my career is working with large hard to comprehend datasets and crushing them into easy to understand metrics. I know along the way I'm going to run into lots of fun challenges to keep me busy!"
    },
    { title: "Stuff I've Been Working On", desc: 'Recent projects and work.' },
    { title: 'How To Contact Me', desc: 'Ways to get in touch with me.' }
  ];

  return (
    <div className='directory-container'>
      <div className='sections-container' ref={onInnerDivMount}>
        <div className="mouse-bg" />
        <div className='content-list-container'>
          <ul className='content-list'>
            {sections.map((section, index) => (
              <li key={index} className='content-item'>
                <button
                  className='page-button'
                  onClick={() => updateSelection(section)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='chatbot-container'>
        </div>
      </div>
    </div>
  );
}

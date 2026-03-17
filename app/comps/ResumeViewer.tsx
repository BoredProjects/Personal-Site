import '../stylesheets/page.css';

export default function ResumeViewer() {
  const resumeImagePath = '/resume.png';

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div
        style={{
          flex: 1,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <img
          src={resumeImagePath}
          alt="Resume"
          style={{
            width: '100%',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        />
        <a 
          href={resumeImagePath}
          download="resume.png"
          className="resume-download-btn"
        >
          ⬇ Download Resume
        </a>
      </div>
    </div>
  );
}
import '../stylesheets/pageContent.css';

interface PageContentProps {
  title: string;
  desc: string; // required now
}

export default function PageContent({ title, desc }: PageContentProps) {
  return (
    <div className='page-container'>
      <div className='page-content-container'>
        <div className='page-header-container'>
          <h1 className='page-header-content'>{title}</h1>
        </div>
        <div className='page-body-container'>
          <div className='page-body-content' style={{ whiteSpace: 'pre-line' }}>
            <p className='page-body-desc'>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


import '../stylesheets/pageContent.css';
import { motion } from 'framer-motion';

interface PageContentProps {
  title: string;
  desc: string;
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
            <motion.p
              key={title}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1}}
            >
              {desc}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}


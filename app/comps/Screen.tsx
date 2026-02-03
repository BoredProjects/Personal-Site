import { ReactNode } from 'react';
import '../stylesheets/screen.css';

interface ScreenProps {
  children: ReactNode; // allows any JSX to be passed in
}

export default function Screen({ children }: ScreenProps) {
  return (
    <div className="screen-container">
      {children}
    </div>
  );
}

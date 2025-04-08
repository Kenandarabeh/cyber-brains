import { FC, useEffect } from "react";
import "./spinner.css";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";

const Spinner: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const isDarkMode = customizer.activeMode === 'dark';
  
  // Apply theme class to body for CSS variables
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('spinner-dark-mode');
    } else {
      document.body.classList.remove('spinner-dark-mode');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('spinner-dark-mode');
    };
  }, [isDarkMode]);

  return (
    <div className="fallback-spinner">
      <div className="loading-container">
        <div className="code-brackets left-bracket">{`<`}</div>
        
        <div className="loading-spinner">
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
          
          <div className="spinner-icon">
            { /* Code symbol in the center */ }
            <span className="code-symbol">{'{ }'}</span>
          </div>
        </div>
        
        <div className="code-brackets right-bracket">{`/>`}</div>
        
        <div className="loading-text">
          <span className="comment-line">// Loading resources...</span>
        </div>
      </div>
      
      <div className="code-typing">
        <div className="typed-code"></div>
      </div>
    </div>
  );
};

export default Spinner;

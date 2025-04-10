// Simple GSAP-like animation utility for our 3D character
const gsap = {
  to: (object: any, options: any) => {
    const { duration = 1, ...props } = options;
    
    Object.keys(props).forEach(key => {
      if (key !== 'duration' && object[key] !== undefined) {
        const startValue = object[key];
        const endValue = props[key];
        const changeValue = endValue - startValue;
        
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        
        const animate = () => {
          const now = Date.now();
          if (now >= endTime) {
            object[key] = endValue;
            return;
          }
          
          const progress = (now - startTime) / (duration * 1000);
          object[key] = startValue + changeValue * progress;
          requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
      }
    });
    
    // Return a promise-like object for chaining
    return {
      then: (callback: Function) => {
        setTimeout(() => callback(), duration * 1000);
        return this;
      }
    };
  }
};

(window as any).gsap = gsap;
export default gsap;

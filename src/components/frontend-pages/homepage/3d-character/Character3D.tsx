import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const Character3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const theme = useTheme();
  
  // وضع مؤقت لاستئناف الحركات التلقائية بعد Hi
  const resumeAnimationsTimeoutRef = useRef<number | null>(null);
  const forceAnimationRef = useRef<boolean>(false);
  
  // مرجع لعنصر الصوت
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // تعديل تفضيلات الحركات لزيادة القفز والرقص
  const animationTypes = ['dance', 'jump', 'dance', 'wave', 'jump', 'dance', 'thumbsUp', 'jump', 'dance'];
  const lastAnimationRef = useRef<string>('');
  const logoTextureRef = useRef<THREE.Texture | null>(null);

  const autoAnimationsRef = useRef<{
    isPlaying: boolean;
    currentAnimation: string | null;
    interval: ReturnType<typeof setInterval> | null;
    timeoutId: ReturnType<typeof setTimeout> | null;
    originalYPosition: number | null;
    jumpCount: number;
    waveInterval: ReturnType<typeof setInterval> | null;
  }>({
    isPlaying: false,
    currentAnimation: null,
    interval: null,
    timeoutId: null,
    originalYPosition: null,
    jumpCount: 0,
    waveInterval: null
  });

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    character: THREE.Object3D | null;
    mixer: THREE.AnimationMixer | null;
    clock: THREE.Clock;
    animationFrameId: number | null;
    lastMouseX: number;
    rightArm: THREE.Object3D | null;
    leftArm: THREE.Object3D | null;
    head: THREE.Object3D | null;
    initialized: boolean;
    isTouchDevice: boolean;
    hasTouchMoved: boolean;
  }>({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(),
    renderer: new THREE.WebGLRenderer(),
    character: null,
    mixer: null,
    clock: new THREE.Clock(),
    animationFrameId: null,
    lastMouseX: 0,
    rightArm: null,
    leftArm: null,
    head: null,
    initialized: false,
    isTouchDevice: false,
    hasTouchMoved: false
  });

  const getRandomGreeting = () => {
    const greetings = ['Hi!', 'Hello!', 'مرحباً!', 'أهلاً!', 'Hey there!'];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const getRandomAnimation = () => {
    let availableAnimations = [...animationTypes];
    if (lastAnimationRef.current) {
      availableAnimations = availableAnimations.filter(a => a !== lastAnimationRef.current);
    }
    const randomAnimation = availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
    lastAnimationRef.current = randomAnimation;
    return randomAnimation;
  };

  const showGreeting = () => {
    if (!mountRef.current) return;

    const greeting = document.createElement('div');
    greeting.textContent = 'Hi!';
    greeting.style.position = 'absolute';
    greeting.style.top = '15%';
    greeting.style.left = '50%';
    greeting.style.transform = 'translate(-50%, -50%)';
    greeting.style.background = '#fff';
    greeting.style.color = '#333';
    greeting.style.padding = '8px 12px';
    greeting.style.borderRadius = '15px';
    greeting.style.fontSize = '14px';
    greeting.style.fontWeight = 'bold';
    greeting.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    greeting.style.opacity = '0';
    greeting.style.transition = 'opacity 0.5s ease-in-out';

    mountRef.current.appendChild(greeting);

    setTimeout(() => {
      greeting.style.opacity = '1';
      setTimeout(() => {
        greeting.style.opacity = '0';
        setTimeout(() => {
          mountRef.current?.removeChild(greeting);
        }, 500);
      }, 2000);
    }, 300);
  };

  const stopAutoAnimations = () => {
    if (autoAnimationsRef.current.interval) {
      clearInterval(autoAnimationsRef.current.interval);
      autoAnimationsRef.current.interval = null;
    }

    if (autoAnimationsRef.current.timeoutId) {
      clearTimeout(autoAnimationsRef.current.timeoutId);
      autoAnimationsRef.current.timeoutId = null;
    }
    
    // تنظيف فاصل التلويح إذا كان موجوداً
    if (autoAnimationsRef.current.waveInterval) {
      clearInterval(autoAnimationsRef.current.waveInterval);
      autoAnimationsRef.current.waveInterval = null;
    }
  };

  const resetCharacterPosition = () => {
    if (!sceneRef.current.character) return;

    const character = sceneRef.current.character;

    if (autoAnimationsRef.current.originalYPosition !== null) {
      const duration = 500;
      const startTime = Date.now();
      const startY = character.position.y;
      const targetY = autoAnimationsRef.current.originalYPosition;
      const endTime = startTime + duration;

      const animateYPosition = () => {
        const now = Date.now();
        if (now >= endTime) {
          character.position.y = targetY;
          return;
        }

        const progress = (now - startTime) / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        character.position.y = startY + (targetY - startY) * easeProgress;
        requestAnimationFrame(animateYPosition);
      };

      animateYPosition();
    }

    resetArmPositions();
  };

  const resetArmPositions = () => {
    const rightArm = sceneRef.current.rightArm;
    const leftArm = sceneRef.current.leftArm;

    if (rightArm && rightArm.userData.originalRotation) {
      const origRotation = rightArm.userData.originalRotation;
      const duration = 500;
      const startTime = Date.now();
      const startX = rightArm.rotation.x;
      const startY = rightArm.rotation.y;
      const startZ = rightArm.rotation.z;
      const endTime = startTime + duration;

      const animateRightArm = () => {
        const now = Date.now();
        if (now >= endTime) {
          rightArm.rotation.x = origRotation.x;
          rightArm.rotation.y = origRotation.y;
          rightArm.rotation.z = origRotation.z;
          return;
        }

        const progress = (now - startTime) / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        rightArm.rotation.x = startX + (origRotation.x - startX) * easeProgress;
        rightArm.rotation.y = startY + (origRotation.y - startY) * easeProgress;
        rightArm.rotation.z = startZ + (origRotation.z - startZ) * easeProgress;
        requestAnimationFrame(animateRightArm);
      };

      animateRightArm();
    }

    if (leftArm && leftArm.userData.originalRotation) {
      const origRotation = leftArm.userData.originalRotation;
      const duration = 500;
      const startTime = Date.now();
      const startX = leftArm.rotation.x;
      const startY = leftArm.rotation.y;
      const startZ = leftArm.rotation.z;
      const endTime = startTime + duration;

      const animateLeftArm = () => {
        const now = Date.now();
        if (now >= endTime) {
          leftArm.rotation.x = origRotation.x;
          leftArm.rotation.y = origRotation.y;
          leftArm.rotation.z = origRotation.z;
          return;
        }

        const progress = (now - startTime) / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        leftArm.rotation.x = startX + (origRotation.x - startX) * easeProgress;
        leftArm.rotation.y = startY + (origRotation.y - startY) * easeProgress;
        leftArm.rotation.z = startZ + (origRotation.z - startZ) * easeProgress;
        requestAnimationFrame(animateLeftArm);
      };

      animateLeftArm();
    }
  };

  const performAutoWaveAnimation = () => {
    if (!sceneRef.current.rightArm) return;

    const rightArm = sceneRef.current.rightArm;
    if (!rightArm.userData.originalRotation) {
      rightArm.userData.originalRotation = {
        x: rightArm.rotation.x,
        y: rightArm.rotation.y,
        z: rightArm.rotation.z
      };
    }

    const targetRotationX = -Math.PI * 0.6;
    const targetRotationZ = -Math.PI * 0.1;
    const duration = 400;
    const startTime = Date.now();
    const startRotationX = rightArm.rotation.x;
    const startRotationZ = rightArm.rotation.z;
    const endTime = startTime + duration;

    const animateWave = () => {
      const now = Date.now();
      if (now >= endTime) {
        rightArm.rotation.x = targetRotationX;
        rightArm.rotation.z = targetRotationZ;

        let waveTime = 0;
        const waveInterval = setInterval(() => {
          rightArm.rotation.z = targetRotationZ + Math.sin(waveTime * 5) * 0.2;
          waveTime += 0.1;
        }, 30);

        setTimeout(() => {
          clearInterval(waveInterval);
        }, 2000);

        return;
      }

      const progress = (now - startTime) / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      rightArm.rotation.x = startRotationX + (targetRotationX - startRotationX) * easeProgress;
      rightArm.rotation.z = startRotationZ + (targetRotationZ - startRotationZ) * easeProgress;
      requestAnimationFrame(animateWave);
    };

    animateWave();
  };

  const performAutoSaluteAnimation = () => {
    if (!sceneRef.current.rightArm) return;

    const rightArm = sceneRef.current.rightArm;
    if (!rightArm.userData.originalRotation) {
      rightArm.userData.originalRotation = {
        x: rightArm.rotation.x,
        y: rightArm.rotation.y,
        z: rightArm.rotation.z
      };
    }

    const targetRotationX = -Math.PI * 0.4;
    const targetRotationZ = Math.PI * 0.1;
    const duration = 400;
    const startTime = Date.now();
    const startRotationX = rightArm.rotation.x;
    const startRotationZ = rightArm.rotation.z;
    const endTime = startTime + duration;

    const animateSalute = () => {
      const now = Date.now();
      if (now >= endTime) {
        rightArm.rotation.x = targetRotationX;
        rightArm.rotation.z = targetRotationZ;
        return;
      }

      const progress = (now - startTime) / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      rightArm.rotation.x = startRotationX + (targetRotationX - startRotationX) * easeProgress;
      rightArm.rotation.z = startRotationZ + (targetRotationZ - startRotationZ) * easeProgress;
      requestAnimationFrame(animateSalute);
    };

    animateSalute();
  };

  const performAutoThumbsUpAnimation = () => {
    if (!sceneRef.current.rightArm) return;

    const rightArm = sceneRef.current.rightArm;
    if (!rightArm.userData.originalRotation) {
      rightArm.userData.originalRotation = {
        x: rightArm.rotation.x,
        y: rightArm.rotation.y,
        z: rightArm.rotation.z
      };
    }

    const targetRotationX = -Math.PI * 0.3;
    const targetRotationZ = Math.PI * 0;
    const duration = 400;
    const startTime = Date.now();
    const startRotationX = rightArm.rotation.x;
    const startRotationZ = rightArm.rotation.z;
    const endTime = startTime + duration;

    const animateThumbsUp = () => {
      const now = Date.now();
      if (now >= endTime) {
        rightArm.rotation.x = targetRotationX;
        rightArm.rotation.z = targetRotationZ;

        let pulseCount = 0;
        const pulseInterval = setInterval(() => {
          if (pulseCount >= 2) {
            clearInterval(pulseInterval);
            return;
          }

          rightArm.position.y += 0.05;

          setTimeout(() => {
            rightArm.position.y -= 0.05;
          }, 150);

          pulseCount++;
        }, 300);

        return;
      }

      const progress = (now - startTime) / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      rightArm.rotation.x = startRotationX + (targetRotationX - startRotationX) * easeProgress;
      rightArm.rotation.z = startRotationZ + (targetRotationZ - startRotationZ) * easeProgress;
      requestAnimationFrame(animateThumbsUp);
    };

    animateThumbsUp();
  };

  const performAutoPointAnimation = () => {
    if (!sceneRef.current.rightArm) return;

    const rightArm = sceneRef.current.rightArm;
    if (!rightArm.userData.originalRotation) {
      rightArm.userData.originalRotation = {
        x: rightArm.rotation.x,
        y: rightArm.rotation.y,
        z: rightArm.rotation.z
      };
    }

    const targetRotationX = -Math.PI * 0.25;
    const targetRotationZ = -Math.PI * 0.15;
    const duration = 300;
    const startTime = Date.now();
    const startRotationX = rightArm.rotation.x;
    const startRotationZ = rightArm.rotation.z;
    const endTime = startTime + duration;

    const animatePoint = () => {
      const now = Date.now();
      if (now >= endTime) {
        rightArm.rotation.x = targetRotationX;
        rightArm.rotation.z = targetRotationZ;
        return;
      }

      const progress = (now - startTime) / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      rightArm.rotation.x = startRotationX + (targetRotationX - startRotationX) * easeProgress;
      rightArm.rotation.z = startRotationZ + (targetRotationZ - startRotationZ) * easeProgress;
      requestAnimationFrame(animatePoint);
    };

    animatePoint();
  };

  const performSmallMovementAnimation = () => {
    if (!sceneRef.current.character) return;

    const character = sceneRef.current.character;

    if (autoAnimationsRef.current.originalYPosition === null) {
      autoAnimationsRef.current.originalYPosition = character.position.y;
    }

    let moveTime = 0;
    const moveInterval = setInterval(() => {
      moveTime += 0.1;
      character.position.y = autoAnimationsRef.current.originalYPosition! + Math.sin(moveTime * 3) * 0.05;
      character.rotation.y = Math.sin(moveTime * 2) * 0.05;
    }, 30);

    setTimeout(() => {
      clearInterval(moveInterval);

      const duration = 500;
      const startTime = Date.now();
      const startY = character.position.y;
      const targetY = autoAnimationsRef.current.originalYPosition!;
      const endTime = startTime + duration;

      const resetY = () => {
        const now = Date.now();
        if (now >= endTime) {
          character.position.y = targetY;
          return;
        }

        const progress = (now - startTime) / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        character.position.y = startY + (targetY - startY) * easeProgress;
        requestAnimationFrame(resetY);
      };

      resetY();
    }, 2000);
  };

  const performJumpAnimation = () => {
    if (!sceneRef.current.character) return;

    const character = sceneRef.current.character;

    if (autoAnimationsRef.current.originalYPosition === null) {
      autoAnimationsRef.current.originalYPosition = character.position.y;
    }

    const jumpCount = Math.floor(Math.random() * 3) + 2;
    let currentJump = 0;

    const performSingleJump = () => {
      if (currentJump >= jumpCount) return;
      currentJump++;

      const jumpHeight = 0.2 + (currentJump * 0.05);

      const jumpUpDuration = 200;
      const startJumpTime = Date.now();
      const startY = character.position.y;
      const endJumpUpTime = startJumpTime + jumpUpDuration;

      const animateJumpUp = () => {
        const now = Date.now();
        if (now >= endJumpUpTime) {
          character.position.y = autoAnimationsRef.current.originalYPosition! + jumpHeight;

          const fallDuration = 300;
          const startFallTime = Date.now();
          const startFallY = character.position.y;
          const endFallTime = startFallTime + fallDuration;

          const animateFall = () => {
            const now = Date.now();
            if (now >= endFallTime) {
              character.position.y = autoAnimationsRef.current.originalYPosition!;

              setTimeout(() => {
                performSingleJump();
              }, 150);

              return;
            }

            const fallProgress = (now - startFallTime) / fallDuration;
            const easeOutBounce = (x: number) => {
              const n1 = 7.5625;
              const d1 = 2.75;

              if (x < 1 / d1) {
                return n1 * x * x;
              } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
              } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
              } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
              }
            };

            const easeFallProgress = 1 - easeOutBounce(1 - fallProgress);
            character.position.y = startFallY + (autoAnimationsRef.current.originalYPosition! - startFallY) * easeFallProgress;
            requestAnimationFrame(animateFall);
          };

          requestAnimationFrame(animateFall);
          return;
        }

        const progress = (now - startJumpTime) / jumpUpDuration;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        character.position.y = startY + (autoAnimationsRef.current.originalYPosition! + jumpHeight - startY) * easeOutProgress;
        requestAnimationFrame(animateJumpUp);
      };

      requestAnimationFrame(animateJumpUp);
    };

    performSingleJump();
  };

  const performDanceAnimation = () => {
    if (!sceneRef.current.character) return;

    const character = sceneRef.current.character;
    const rightArm = sceneRef.current.rightArm;
    const leftArm = sceneRef.current.leftArm;
    const head = sceneRef.current.head;

    if (autoAnimationsRef.current.originalYPosition === null) {
      autoAnimationsRef.current.originalYPosition = character.position.y;
    }

    if (rightArm && !rightArm.userData.originalRotation) {
      rightArm.userData.originalRotation = {
        x: rightArm.rotation.x,
        y: rightArm.rotation.y,
        z: rightArm.rotation.z
      };
    }

    if (leftArm && !leftArm.userData.originalRotation) {
      leftArm.userData.originalRotation = {
        x: leftArm.rotation.x,
        y: leftArm.rotation.y,
        z: leftArm.rotation.z
      };
    }

    let danceTime = 0;
    const danceInterval = setInterval(() => {
      danceTime += 0.1;

      character.position.y = autoAnimationsRef.current.originalYPosition! + Math.sin(danceTime * 6) * 0.1;
      character.rotation.y = Math.sin(danceTime * 3) * 0.2;

      if (rightArm && leftArm) {
        rightArm.rotation.x = -0.2 + Math.sin(danceTime * 6) * 0.5;
        rightArm.rotation.z = Math.cos(danceTime * 4) * 0.3;

        leftArm.rotation.x = -0.2 + Math.sin(danceTime * 6 + Math.PI) * 0.5;
        leftArm.rotation.z = Math.cos(danceTime * 4 + Math.PI) * 0.3;
      }

      if (head) {
        head.rotation.y = Math.sin(danceTime * 2) * 0.15;
        head.rotation.z = Math.sin(danceTime * 3) * 0.07;
      }
    }, 30);

    setTimeout(() => {
      clearInterval(danceInterval);

      if (head) {
        const duration = 500;
        const startTime = Date.now();
        const startRotY = head.rotation.y;
        const startRotZ = head.rotation.z;
        const endTime = startTime + duration;

        const resetHead = () => {
          const now = Date.now();
          if (now >= endTime) {
            head.rotation.y = 0;
            head.rotation.z = 0;
            return;
          }

          const progress = (now - startTime) / duration;
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          head.rotation.y = startRotY * (1 - easeProgress);
          head.rotation.z = startRotZ * (1 - easeProgress);
          requestAnimationFrame(resetHead);
        };

        requestAnimationFrame(resetHead);
      }

      resetCharacterPosition();
    }, 4000);
  };

  const startAutoAnimations = () => {
    if (autoAnimationsRef.current.interval) {
      clearInterval(autoAnimationsRef.current.interval);
    }

    if (sceneRef.current.character && autoAnimationsRef.current.originalYPosition === null) {
      autoAnimationsRef.current.originalYPosition = sceneRef.current.character.position.y;
    }

    // جدولة حركات تلقائية بفترات زمنية أقصر (1-3 ثوانٍ)
    autoAnimationsRef.current.interval = setInterval(() => {
      if (!autoAnimationsRef.current.isPlaying && !isHovering && sceneRef.current.character) {
        performRandomAutomaticAnimation();
      }
    }, 1000 + Math.random() * 2000); // بين 1-3 ثوان فقط
    
    // تشغيل حركة فورية عند البدء (بدون انتظار)
    if (!autoAnimationsRef.current.isPlaying && !isHovering && sceneRef.current.character) {
      performRandomAutomaticAnimation();
    }
  };

  const performRandomAutomaticAnimation = () => {
    if (isHovering || autoAnimationsRef.current.isPlaying) return;

    autoAnimationsRef.current.isPlaying = true;
    autoAnimationsRef.current.currentAnimation = getRandomAnimation();

    switch (autoAnimationsRef.current.currentAnimation) {
      case 'dance':
        performDanceAnimation();
        break;
      case 'jump':
        performJumpAnimation();
        break;
      case 'wave':
        performAutoWaveAnimation();
        break;
      case 'salute':
        performAutoSaluteAnimation();
        break;
      case 'thumbsUp':
        performAutoThumbsUpAnimation();
        break;
      case 'point':
        performAutoPointAnimation();
        break;
      case 'smallMovement':
        performSmallMovementAnimation();
        break;
      default:
        performDanceAnimation();
    }

    const animationDuration =
      autoAnimationsRef.current.currentAnimation === 'dance' ? 4500 :
      autoAnimationsRef.current.currentAnimation === 'jump' ? 3500 : 3000;

    autoAnimationsRef.current.timeoutId = setTimeout(() => {
      resetCharacterPosition();
      autoAnimationsRef.current.isPlaying = false;
      autoAnimationsRef.current.currentAnimation = null;
    }, animationDuration);
  };

  // Speech bubble that appears on hover with arm wave
  const showGreetingWithWave = () => {
    // عرض رسالة الترحيب
    if (!mountRef.current) return;

    const greeting = document.createElement('div');
    greeting.textContent = 'Hi!';
    greeting.style.position = 'absolute';
    greeting.style.top = '15%';
    greeting.style.left = '50%';
    greeting.style.transform = 'translate(-50%, -50%)';
    greeting.style.background = '#fff';
    greeting.style.color = '#333';
    greeting.style.padding = '8px 12px';
    greeting.style.borderRadius = '15px';
    greeting.style.fontSize = '14px';
    greeting.style.fontWeight = 'bold';
    greeting.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    greeting.style.opacity = '0';
    greeting.style.transition = 'opacity 0.5s ease-in-out';
    greeting.style.zIndex = '100'; // ضمان ظهور الرسالة فوق العناصر الأخرى

    mountRef.current.appendChild(greeting);

    // تشغيل صوت Hi (استدعاء الوظيفة بشكل صريح)
    playHiSound();

    // تحريك الذراع للترحيب (استدعاء الوظيفة بشكل صريح)
    performWaveAnimation();

    setTimeout(() => {
      greeting.style.opacity = '1';
      setTimeout(() => {
        greeting.style.opacity = '0';
        setTimeout(() => {
          if (mountRef.current && mountRef.current.contains(greeting)) {
            mountRef.current?.removeChild(greeting);
          }
          // استئناف الحركات التلقائية بعد اختفاء الرسالة
          if (!isHovering) {
            resumeAutomaticAnimations();
          }
        }, 500);
      }, 2000);
    }, 300);
  };

  // تشغيل صوت Hi - تحسين التعامل مع الصوت
  const playHiSound = () => {
    try {
      // إنشاء عنصر صوت جديد في كل مرة لتجنب مشاكل التشغيل المتعدد
      const hiSound = new Audio('/assets/sounds/hi.mp3');
      hiSound.volume = 0.7;
      
      // تسجيل مرجع للصوت الحالي
      audioRef.current = hiSound;
      
      // تشغيل الصوت مباشرةً
      hiSound.play().catch(error => {
        console.error('Failed to play sound:', error);
        
        // محاولة تشغيل الصوت بعد تفاعل المستخدم
        document.addEventListener('click', function audioUnlock() {
          hiSound.play();
          document.removeEventListener('click', audioUnlock);
        }, { once: true });
      });
    } catch (e) {
      console.error('Audio error:', e);
    }
  };

  // استئناف الحركات التلقائية بعد فترة - تحسين لضمان العمل
  const resumeAutomaticAnimations = () => {
    forceAnimationRef.current = true;
    
    // إلغاء أي مؤقت سابق
    if (resumeAnimationsTimeoutRef.current) {
      clearTimeout(resumeAnimationsTimeoutRef.current);
      resumeAnimationsTimeoutRef.current = null;
    }
    
    // جدولة استئناف الحركات التلقائية بعد فترة
    resumeAnimationsTimeoutRef.current = window.setTimeout(() => {
      if (!autoAnimationsRef.current.interval) {
        console.log("Resuming automatic animations");
        startAutoAnimations();
        
        // تشغيل حركة فورية بعد استئناف التحريك
        setTimeout(() => {
          if (forceAnimationRef.current && !autoAnimationsRef.current.isPlaying) {
            console.log("Forcing animation after hover");
            performRandomAutomaticAnimation();
          }
        }, 500);
      }
    }, 1000); // زيادة الوقت لضمان اكتمال التفاعل
  };

  const handleMouseEnter = () => {
    if (sceneRef.current.hasTouchMoved) {
      sceneRef.current.hasTouchMoved = false;
      return;
    }

    setIsHovering(true);
    
    // وقف الحركات التلقائية مؤقتًا
    stopAutoAnimations();
    
    // توجيه الشخصية لمواجهة المستخدم
    resetToFacingUser();
    
    // إظهار الترحيب والتلويح
    showGreetingWithWave();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    resetToFacingUser();
    
    // إلغاء أي استئناف مجدول
    if (resumeAnimationsTimeoutRef.current) {
      clearTimeout(resumeAnimationsTimeoutRef.current);
      resumeAnimationsTimeoutRef.current = null;
    }
    
    // استئناف الحركات التلقائية فوراً
    resumeAutomaticAnimations();
  };

  const handleTouchStart = (e: TouchEvent) => {
    sceneRef.current.hasTouchMoved = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    sceneRef.current.hasTouchMoved = true;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!sceneRef.current.hasTouchMoved) {
      if (!isHovering) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    }
  };

  const resetToFacingUser = () => {
    if (!sceneRef.current.character) return;

    const character = sceneRef.current.character;
    const startRotY = character.rotation.y;
    const targetRotY = 0;
    const duration = 400;
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animateRotation = () => {
      const now = Date.now();
      if (now >= endTime) {
        character.rotation.y = targetRotY;
        return;
      }

      const progress = (now - startTime) / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      character.rotation.y = startRotY + (targetRotY - startRotY) * easeProgress;
      requestAnimationFrame(animateRotation);
    };

    animateRotation();
  };

  // تحميل الشعار كنسيج
  const loadLogoTexture = () => {
    if (logoTextureRef.current) return logoTextureRef.current;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/images/logo.png');
    texture.encoding = THREE.sRGBEncoding;
    logoTextureRef.current = texture;
    return texture;
  };

  // تحسين تحميل النموذج ثلاثي الأبعاد
  const loadCharacterModel = () => {
    if (!sceneRef.current.initialized) return;

    const loader = new GLTFLoader();
    const modelUrl = '/assets/models/anime-male-character.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        const modelScale = isMobile ? 0.95 : 1;
        model.scale.set(modelScale, modelScale, modelScale);

        // تحسين موضع الشخصية على الأجهزة المحمولة
        if (isMobile) {
          model.position.set(0, -1.4, 0);
        } else if (isTablet) {
          model.position.set(0, -1.65, 0);
        } else {
          model.position.set(0, -1.8, 0);
        }

        model.rotation.y = 0;

        // تحميل نسيج الشعار
        const logoTexture = loadLogoTexture();
        
        // إنشاء المواد الجديدة بالألوان الصحيحة
        const whiteShirtMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF, // أبيض
          roughness: 0.2,
          metalness: 0.1,
          map: logoTexture,  // إضافة الشعار كنسيج
        });

        const blackPantsMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000, // أسود
          roughness: 0.3,
          metalness: 0.0
        });

        model.traverse((child) => {
          if (child instanceof THREE.Object3D) {
            child.userData.originalRotation = {
              x: child.rotation.x,
              y: child.rotation.y,
              z: child.rotation.z
            };

            if (child.name.includes('arm_right') || child.name.includes('rightArm') || child.name.includes('ArmR')) {
              sceneRef.current.rightArm = child;
            } else if (child.name.includes('arm_left') || child.name.includes('leftArm') || child.name.includes('ArmL')) {
              sceneRef.current.leftArm = child;
            } else if (child.name.includes('head') || child.name.includes('Head')) {
              sceneRef.current.head = child;
            } else if (child instanceof THREE.Mesh) {
              if (!sceneRef.current.rightArm && child.position.x > 0.1 && child.position.y > 0) {
                sceneRef.current.rightArm = child;
              } else if (!sceneRef.current.leftArm && child.position.x < -0.1 && child.position.y > 0) {
                sceneRef.current.leftArm = child;
              } else if (!sceneRef.current.head && Math.abs(child.position.x) < 0.1 && child.position.y > 1) {
                sceneRef.current.head = child;
              }
              
              // تطبيق المواد الجديدة على أجزاء الملابس
              if (child.name.includes('shirt') || child.name.includes('torso') || 
                  (child.position.y > 0.7 && child.position.y < 1.3)) {
                child.material = whiteShirtMaterial;
              } else if (child.name.includes('pant') || child.name.includes('leg') || 
                         (child.position.y > 0.2 && child.position.y < 0.7)) {
                child.material = blackPantsMaterial;
              }
            }
          }
        });

        // تحسين إضاءة الشخصية على الأجهزة المحمولة
        if (isMobile) {
          // ضبط تفاصيل الظلال والإضاءة للأجهزة المحمولة
          model.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.castShadow = false;
              object.receiveShadow = false;
              
              // تحسين مواد الأجزاء للأجهزة المحمولة
              if (object.material) {
                const material = object.material as THREE.MeshStandardMaterial;
                material.roughness = Math.min(material.roughness, 0.8);
                material.metalness = Math.max(material.metalness, 0.1);
              }
            }
          });
        }

        sceneRef.current.scene.add(model);
        sceneRef.current.character = model;

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          const idleAnimation = mixer.clipAction(gltf.animations[0]);
          idleAnimation.play();
          sceneRef.current.mixer = mixer;
        }

        autoAnimationsRef.current.originalYPosition = model.position.y;
        startAutoAnimations();
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        createAnimeCharacter();
        startAutoAnimations();
      }
    );
  };

  const createAnimeCharacter = () => {
    if (!sceneRef.current.initialized) return;

    const animeCharacter = new THREE.Group();

    const skinColor = 0xffe0bd;
    const hairColor = 0x2d2d2d;
    
    // تغيير الألوان للملابس
    const shirtColor = 0xFFFFFF; // أبيض
    const pantsColor = 0x000000; // أسود

    // تحميل نسيج الشعار لوضعه على القميص
    const logoTexture = loadLogoTexture();
    
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: 0.3,
      metalness: 0.0
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: hairColor,
      roughness: 0.7,
      metalness: 0.1
    });

    // تعديل مادة القميص ليكون أبيض ويحتوي على الشعار
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: shirtColor,
      roughness: 0.2,
      metalness: 0.1,
      map: logoTexture
    });

    // تعديل مادة السروال ليكون أسود
    const pantsMaterial = new THREE.MeshStandardMaterial({
      color: pantsColor,
      roughness: 0.3,
      metalness: 0.0
    });

    const head = new THREE.Group();
    head.name = "head";

    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const headMesh = new THREE.Mesh(headGeometry, skinMaterial);
    headMesh.scale.y = 1.1;
    head.add(headMesh);

    const hairGeometry = new THREE.SphereGeometry(0.27, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const hairMesh = new THREE.Mesh(hairGeometry, hairMaterial);
    hairMesh.position.y = 0.03;
    hairMesh.rotation.x = 0.2;
    head.add(hairMesh);

    const createHairSpike = (x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scaleY: number) => {
      const spikeGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
      const spikeMesh = new THREE.Mesh(spikeGeometry, hairMaterial);
      spikeMesh.position.set(x, y, z);
      spikeMesh.rotation.set(rotX, rotY, rotZ);
      spikeMesh.scale.y = scaleY;
      return spikeMesh;
    };

    head.add(createHairSpike(0, 0.3, 0, 0, 0, 0, 1));
    head.add(createHairSpike(0.1, 0.28, 0, 0, 0, 0.2, 0.9));
    head.add(createHairSpike(-0.1, 0.28, 0, 0, 0, -0.2, 0.9));
    head.add(createHairSpike(0.18, 0.25, 0, 0, 0, 0.3, 0.8));
    head.add(createHairSpike(-0.18, 0.25, 0, 0, 0, -0.3, 0.8));

    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    rightEye.position.set(0.1, 0, 0.2);
    rightEye.scale.z = 0.5;
    head.add(rightEye);

    const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    leftEye.position.set(-0.1, 0, 0.2);
    leftEye.scale.z = 0.5;
    head.add(leftEye);

    const pupilGeometry = new THREE.SphereGeometry(0.025, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.1, 0, 0.22);
    head.add(rightPupil);

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.1, 0, 0.22);
    head.add(leftPupil);

    const mouthGeometry = new THREE.PlaneGeometry(0.07, 0.02);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.08, 0.22);
    head.add(mouth);

    head.position.y = 1.5;
    animeCharacter.add(head);
    sceneRef.current.head = head;

    const body = new THREE.Group();

    const neckGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16);
    const neckMesh = new THREE.Mesh(neckGeometry, skinMaterial);
    neckMesh.position.y = 1.35;
    body.add(neckMesh);

    const torsoGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.5, 16);
    const torsoMesh = new THREE.Mesh(torsoGeometry, shirtMaterial);
    torsoMesh.position.y = 1.1;
    body.add(torsoMesh);

    const lowerBodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16);
    const lowerBodyMesh = new THREE.Mesh(lowerBodyGeometry, pantsMaterial);
    lowerBodyMesh.position.y = 0.75;
    body.add(lowerBodyMesh);

    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.25, 1.1, 0);
    leftArmGroup.rotation.z = -0.2;

    const leftArmGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.6, 16);
    const leftArmMesh = new THREE.Mesh(leftArmGeometry, shirtMaterial);
    leftArmGeometry.translate(0, -0.3, 0);
    leftArmGroup.add(leftArmMesh);

    const leftHandGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const leftHandMesh = new THREE.Mesh(leftHandGeometry, skinMaterial);
    leftHandMesh.position.set(0, -0.6, 0);
    leftArmGroup.add(leftHandMesh);

    leftArmGroup.name = 'leftArm';
    body.add(leftArmGroup);
    sceneRef.current.leftArm = leftArmGroup;

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.25, 1.1, 0);
    rightArmGroup.rotation.z = 0.2;

    const rightArmGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.6, 16);
    const rightArmMesh = new THREE.Mesh(rightArmGeometry, shirtMaterial);
    rightArmGeometry.translate(0, -0.3, 0);
    rightArmGroup.add(rightArmMesh);

    const rightHandGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const rightHandMesh = new THREE.Mesh(rightHandGeometry, skinMaterial);
    rightHandMesh.position.set(0, -0.6, 0);
    rightArmGroup.add(rightHandMesh);

    rightArmGroup.name = 'rightArm';
    body.add(rightArmGroup);

    sceneRef.current.rightArm = rightArmGroup;

    const createLeg = (side: number) => {
      const legGroup = new THREE.Group();

      const upperLegGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.3, 16);
      const upperLegMesh = new THREE.Mesh(upperLegGeometry, pantsMaterial);
      upperLegMesh.position.y = -0.15;
      legGroup.add(upperLegMesh);

      const lowerLegGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.3, 16);
      const lowerLegMesh = new THREE.Mesh(lowerLegGeometry, pantsMaterial);
      lowerLegMesh.position.y = -0.45;
      legGroup.add(lowerLegMesh);

      const footGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.15);
      const footMesh = new THREE.Mesh(footGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
      footMesh.position.set(0, -0.6, 0.03);
      legGroup.add(footMesh);

      legGroup.position.set(side * 0.1, 0.65, 0);

      return legGroup;
    };

    body.add(createLeg(-1));
    body.add(createLeg(1));

    animeCharacter.add(body);
    animeCharacter.scale.set(0.8, 0.8, 0.8);

    animeCharacter.position.y = -1.8;

    animeCharacter.rotation.y = 0;

    sceneRef.current.scene.add(animeCharacter);
    sceneRef.current.character = animeCharacter;

    autoAnimationsRef.current.originalYPosition = animeCharacter.position.y;
  };

  // تنفيذ حركة التلويح باليد - تصحيح الأخطاء السابقة
  const performWaveAnimation = () => {
    if (!sceneRef.current.rightArm) return;
    
    console.log("Waving arm");
    
    const rightArm = sceneRef.current.rightArm;
    if (!rightArm.userData.originalRotation) {
      rightArm.userData.originalRotation = {
        x: rightArm.rotation.x,
        y: rightArm.rotation.y,
        z: rightArm.rotation.z
      };
    }
    
    // حركة رفع الذراع والتلويح
    const targetRotationX = -Math.PI * 0.7;
    const targetRotationZ = -Math.PI * 0.2;
    const duration = 400;
    const startTime = Date.now();
    const startRotationX = rightArm.rotation.x;
    const startRotationZ = rightArm.rotation.z;
    const endTime = startTime + duration;
    
    const animateWave = () => {
      const now = Date.now();
      if (now >= endTime) {
        rightArm.rotation.x = targetRotationX;
        rightArm.rotation.z = targetRotationZ;
        
        // حركة التلويح المستمرة
        let waveTime = 0;
        const waveInterval = setInterval(() => {
          rightArm.rotation.z = targetRotationZ + Math.sin(waveTime * 5) * 0.2;
          waveTime += 0.1;
        }, 30);
        
        // تخزين الفاصل الزمني للتلويح للتنظيف لاحقًا
        autoAnimationsRef.current.waveInterval = waveInterval;
        
        setTimeout(() => {
          if (autoAnimationsRef.current.waveInterval) {
            clearInterval(autoAnimationsRef.current.waveInterval);
            autoAnimationsRef.current.waveInterval = null;
          }
          
          // إعادة الذراع إلى الوضع الطبيعي
          const resetDuration = 500;
          const resetStartTime = Date.now();
          const resetStartRotX = rightArm.rotation.x;
          const resetStartRotZ = rightArm.rotation.z;
          const resetEndTime = resetStartTime + resetDuration;
          const origRotation = rightArm.userData.originalRotation;
          
          const resetArm = () => {
            const now = Date.now();
            if (now >= resetEndTime) {
              rightArm.rotation.x = origRotation.x;
              rightArm.rotation.y = origRotation.y;
              rightArm.rotation.z = origRotation.z;
              return;
            }
            
            const progress = (now - resetStartTime) / resetDuration;
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            rightArm.rotation.x = resetStartRotX + (origRotation.x - resetStartRotX) * easeProgress;
            rightArm.rotation.z = resetStartRotZ + (origRotation.z - resetStartRotZ) * easeProgress;
            requestAnimationFrame(resetArm);
          };
          
          requestAnimationFrame(resetArm);
        }, 1200);
        
        return;
      }
      
      const progress = (now - startTime) / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      rightArm.rotation.x = startRotationX + (targetRotationX - startRotationX) * easeProgress;
      rightArm.rotation.z = startRotationZ + (targetRotationZ - startRotationZ) * easeProgress;
      requestAnimationFrame(animateWave);
    };
    
    animateWave();
  };

  // تحسين إضاءة المشهد خاصة للأجهزة المحمولة
  const enhanceLighting = () => {
    if (!sceneRef.current.scene) return;

    // إزالة الإضاءات القديمة
    sceneRef.current.scene.children.forEach(child => {
      if (child instanceof THREE.Light) {
        sceneRef.current.scene.remove(child);
      }
    });

    // إضاءة محيطة أقوى
    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.9 : 0.8);
    sceneRef.current.scene.add(ambientLight);

    // إضاءة اتجاهية أمامية
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.1);
    frontLight.position.set(0, 1, 2);
    sceneRef.current.scene.add(frontLight);

    // إضاءة اتجاهية علوية
    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 5, 0);
    sceneRef.current.scene.add(topLight);

    // إضافة إضاءة خفيفة من الخلف لإبراز الحواف
    const backLight = new THREE.DirectionalLight(0xe0e0ff, 0.4);
    backLight.position.set(0, 0, -2);
    sceneRef.current.scene.add(backLight);

    // إضاءة إضافية للأجهزة المحمولة
    if (isMobile) {
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
      fillLight.position.set(-1, 1, 1);
      sceneRef.current.scene.add(fillLight);
    }
  };

  // تعزيز آلية البدء
  const initializeScene = () => {
    if (!mountRef.current || sceneRef.current.initialized) return;

    const currentRef = mountRef.current;

    sceneRef.current.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const scene = new THREE.Scene();
    scene.background = null;

    // تحسين وضع الكاميرا للأجهزة المحمولة
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 45 : 30, // زاوية رؤية أكبر للأجهزة المحمولة
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    );

    if (isMobile) {
      camera.position.set(0, -0.5, 5.2); // تقريب الكاميرا قليلاً
    } else if (isTablet) {
      camera.position.set(0, -0.6, 6);
    } else {
      camera.position.set(0, -0.5, 7);
    }
    camera.lookAt(0, 0, 0);

    // تحسين إعدادات المعالج
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // تفعيل مُنعّم الحواف للجميع لتحسين المظهر
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // تحديد حد أقصى لنسبة البكسل
    renderer.setClearColor(0x000000, 0);
    
    // تفعيل الظلال للحصول على مظهر أفضل
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentRef.appendChild(renderer.domElement);

    sceneRef.current = {
      ...sceneRef.current,
      scene,
      camera,
      renderer,
      clock: new THREE.Clock(),
      initialized: true
    };

    // إضافة إضاءة محسنة
    enhanceLighting();
    
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, isMobile ? 250 : 0);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!sceneRef.current.initialized) return;

      const delta = sceneRef.current.clock.getDelta();

      if (sceneRef.current.mixer) {
        sceneRef.current.mixer.update(delta);
      }

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    loadCharacterModel();

    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current.animationFrameId !== null) {
        cancelAnimationFrame(sceneRef.current.animationFrameId);
      }

      if (sceneRef.current.renderer && currentRef) {
        currentRef.removeChild(sceneRef.current.renderer.domElement);
      }

      sceneRef.current.initialized = false;
      stopAutoAnimations();
    };
  };

  useEffect(() => {
    const cleanup = initializeScene();

    if (mountRef.current) {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        mountRef.current.addEventListener('touchstart', handleTouchStart as EventListener);
        mountRef.current.addEventListener('touchmove', handleTouchMove as EventListener);
        mountRef.current.addEventListener('touchend', handleTouchEnd as EventListener);
      } else {
        mountRef.current.addEventListener('mouseenter', handleMouseEnter);
        mountRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    // تهيئة الصوت مسبقًا
    const prewarmAudio = new Audio('/assets/sounds/hi.mp3');
    prewarmAudio.preload = 'auto';
    prewarmAudio.volume = 0;
    prewarmAudio.muted = true;
    
    // تحميل نسيج الشعار مسبقًا
    loadLogoTexture();
    
    // محاولة تشغيل وإيقاف الصوت فوراً لتجاوز قيود التشغيل التلقائي
    const unlockAudio = () => {
      prewarmAudio.play().then(() => {
        setTimeout(() => {
          prewarmAudio.pause();
          prewarmAudio.currentTime = 0;
        }, 1);
      }).catch(e => console.log('Audio prewarm failed, requires user interaction'));
    };
    
    unlockAudio();
    document.addEventListener('click', unlockAudio, { once: true });

    // بدء الحركات التلقائية مباشرة بعد تحميل المكون
    setTimeout(() => {
      startAutoAnimations();
    }, 500);

    return () => {
      if (mountRef.current) {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
          mountRef.current.removeEventListener('touchstart', handleTouchStart as EventListener);
          mountRef.current.removeEventListener('touchmove', handleTouchMove as EventListener);
          mountRef.current.removeEventListener('touchend', handleTouchEnd as EventListener);
        } else {
          mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
          mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      }

      stopAutoAnimations();
      if (cleanup) cleanup();

      // تنظيف مؤقت استئناف الحركات التلقائية
      if (resumeAnimationsTimeoutRef.current) {
        clearTimeout(resumeAnimationsTimeoutRef.current);
      }
      
      // إيقاف الصوت وتنظيفه
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      
      document.removeEventListener('click', unlockAudio);
      
      if (prewarmAudio) {
        prewarmAudio.pause();
        prewarmAudio.src = '';
      }
    };
  }, [isMobile, isTablet]);

  // تعديل JSX لوضع الشخصية على اليسار بدلاً من اليمين
  return (
    <Box
      ref={mountRef}
      sx={{
        position: 'fixed',
        width: { xs: '150px', sm: '180px', md: '200px' },
        height: { xs: '300px', sm: '350px', md: '400px' },
        bottom: 0,
        left: { xs: '10px', sm: '15px', md: '50px' }, // تغيير من right إلى left
        zIndex: 10,
        cursor: 'pointer',
        // ضمان البقاء على اليسار حتى في وضع RTL
        right: 'auto !important', 
        direction: 'ltr' // ضمان اتجاه العنصر نفسه من اليسار إلى اليمين
      }}
    />
  );
};

export default Character3D;

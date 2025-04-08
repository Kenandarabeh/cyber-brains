import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box } from '@mui/material';

interface Globe3DThreeProps {
  colors: {
    isDarkMode: boolean;
    primaryBlue: string;
    secondaryColor: string;
  };
}

const Globe3DThree: React.FC<Globe3DThreeProps> = ({ colors }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDarkMode = colors.isDarkMode;
  
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 3;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Creating the globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Material colors based on theme
    const primaryColor = isDarkMode ? 0x58a6ff : 0x0969da; // Primary blue
    const highlightColor = isDarkMode ? 0xf778ba : 0xf600b9; // Highlight magenta/fuchsia
    
    // Globe materials
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });

    // Inner glow effect
    const glowGeometry = new THREE.SphereGeometry(0.95, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: highlightColor,
      transparent: true,
      opacity: 0.05,
    });
    
    // Create meshes
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(globe);
    scene.add(glow);
    
    // Add points around the globe
    const pointCount = 200;
    const points = new THREE.Group();
    
    for (let i = 0; i < pointCount; i++) {
      // Create random positions on the sphere
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      
      // Convert spherical to cartesian coordinates with a radius slightly larger than the globe
      const x = 1.05 * Math.cos(theta) * Math.sin(phi);
      const y = 1.05 * Math.sin(theta) * Math.sin(phi);
      const z = 1.05 * Math.cos(phi);
      
      // Create point geometry
      const pointGeometry = new THREE.SphereGeometry(
        Math.random() * 0.01 + 0.005, // Random size
        8,
        8
      );
      
      // Randomize point material between primary and highlight color
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.7 ? highlightColor : primaryColor,
        transparent: true,
        opacity: Math.random() * 0.8 + 0.2, // Random opacity
      });
      
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, z);
      points.add(point);
      
      // Store original position for animation
      point.userData = {
        originalPos: { x, y, z },
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseAmount: Math.random() * 0.02 + 0.01,
      };
    }
    
    scene.add(points);
    
    // Add connections between some points
    const linesMaterial = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.3,
    });
    
    const connections = 40;
    for (let i = 0; i < connections; i++) {
      const p1Index = Math.floor(Math.random() * pointCount);
      const p2Index = Math.floor(Math.random() * pointCount);
      
      const p1 = points.children[p1Index];
      const p2 = points.children[p2Index];
      
      // Only connect points if they are not too far apart
      const distance = p1.position.distanceTo(p2.position);
      if (distance < 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          p1.position,
          p2.position,
        ]);
        const line = new THREE.Line(lineGeometry, linesMaterial);
        scene.add(line);
      }
    }
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Directional light (mimics sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a point light in the center for inner glow
    const innerLight = new THREE.PointLight(highlightColor, 0.8, 3);
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);
    
    // Animation loop
    let frameId: number;
    let time = 0;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Update time variable
      time += 0.01;
      
      // Animate each point with subtle pulsing movement
      points.children.forEach((point) => {
        const { originalPos, pulseSpeed, pulseAmount } = point.userData;
        const pulse = Math.sin(time * pulseSpeed * 10) * pulseAmount;
        
        // Create pulsing effect by moving points slightly in/out from center
        const direction = new THREE.Vector3(
          originalPos.x, originalPos.y, originalPos.z
        ).normalize();
        
        point.position.x = originalPos.x + direction.x * pulse;
        point.position.y = originalPos.y + direction.y * pulse;
        point.position.z = originalPos.z + direction.z * pulse;
      });
      
      // Subtle inner light pulsation
      const lightPulse = Math.sin(time * 2) * 0.3 + 0.7;
      innerLight.intensity = lightPulse * 0.8;
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      points.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
      
      globeGeometry.dispose();
      globeMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, [colors, isDarkMode]);
  
  return (
    <Box
      ref={mountRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    />
  );
};

export default Globe3DThree;

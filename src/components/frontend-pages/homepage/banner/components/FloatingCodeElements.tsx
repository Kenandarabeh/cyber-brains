import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { IconCode, IconBrain, IconDeviceDesktop, IconRobot } from '@tabler/icons-react';

interface FloatingCodeElementsProps {
  colors: {
    primaryBlue: string;
  };
  isRtl: boolean;
}

const FloatingCodeElements: React.FC<FloatingCodeElementsProps> = ({ colors, isRtl }) => {
  const snippets = [
    { icon: <IconCode />, top: '15%', right: isRtl ? '75%' : '10%' },
    { icon: <IconBrain />, top: '60%', right: isRtl ? '15%' : '80%' },
    { icon: <IconDeviceDesktop />, top: '30%', right: isRtl ? '20%' : '65%' },
    { icon: <IconRobot />, top: '70%', right: isRtl ? '60%' : '30%' },
  ];
  
  return (
    <>
      {snippets.map((snippet, index) => (
        <Box
          key={index}
          component={motion.div}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.5 + index * 0.2,
            ease: 'easeOut'
          }}
          sx={{
            position: 'absolute',
            top: snippet.top,
            right: snippet.right,
            zIndex: 0,
            color: colors.primaryBlue,
            opacity: 0.4,
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 6,
              delay: index * 0.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
          >
            {React.cloneElement(snippet.icon, { size: 32 + index * 8 })}
          </motion.div>
        </Box>
      ))}
    </>
  );
};

export default FloatingCodeElements;

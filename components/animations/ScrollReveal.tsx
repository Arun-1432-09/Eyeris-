'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type ScrollRevealVariant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideRight' | 'slideLeft';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-right' | 'slide-left' | ScrollRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variantsMap = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant,
  animation,
  delay = 0,
  duration = 0.65,
  className = '',
  ...props
}) => {
  // Normalize animation or variant
  let resolvedKey: ScrollRevealVariant = 'fadeUp';
  const raw = variant || animation;

  if (raw === 'scale-in' || raw === 'scaleIn') {
    resolvedKey = 'scaleIn';
  } else if (raw === 'fade-in' || raw === 'fadeIn') {
    resolvedKey = 'fadeIn';
  } else if (raw === 'slide-right' || raw === 'slideRight') {
    resolvedKey = 'slideRight';
  } else if (raw === 'slide-left' || raw === 'slideLeft') {
    resolvedKey = 'slideLeft';
  } else {
    resolvedKey = 'fadeUp';
  }

  const selectedVariant = variantsMap[resolvedKey];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Apple-style smooth cubic bezier
      }}
      variants={selectedVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        staggerChildren: staggerDelay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

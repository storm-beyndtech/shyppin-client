import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  distance = 50,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedInputSection = ({
  children,
  className,
  delay = 0,
  distance = 30,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


export const AnimatedFade = ({
  children,
  className,
  delay = 0,
}: Omit<AnimatedSectionProps, 'distance'>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedSlideLeft = ({
  children,
  className,
  delay = 0,
  distance = 50,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ x: -distance, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedSlideRight = ({
  children,
  className,
  delay = 0,
  distance = 50,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ x: distance, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

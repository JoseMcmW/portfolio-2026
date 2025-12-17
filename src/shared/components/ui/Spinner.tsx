import { motion } from 'framer-motion';

export const Spinner = () => (
  <motion.span
    className="inline-flex gap-1"
    aria-hidden
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-current"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </motion.span>
);

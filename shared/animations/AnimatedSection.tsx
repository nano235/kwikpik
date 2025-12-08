"use client";

import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import { forwardRef } from "react";

interface AnimatedSectionProps {
	children: React.ReactNode;
	className?: string;
	scrollYProgress: MotionValue<number>;
	index?: number;
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
	({ children, className, scrollYProgress, index = 0 }, ref) => {
		const start = 0 + index * 0.1;
		const end = start + 0.3;

		const rawY = useTransform(scrollYProgress, [start, end], [100, 0]);
		const y = useSpring(rawY, {
			stiffness: 100,
			damping: 20,
			mass: 0.5,
		});

		const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

		return (
			<motion.div ref={ref} className={className} style={{ opacity, y }}>
				{children}
			</motion.div>
		);
	}
);

AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;

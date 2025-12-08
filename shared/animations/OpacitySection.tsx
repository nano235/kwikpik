"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { forwardRef } from "react";

interface OpacitySectionProps {
	children: React.ReactNode;
	className?: string;
	scrollYProgress: MotionValue<number>;
	index?: number;
}

export const OpacitySection = forwardRef<HTMLDivElement, OpacitySectionProps>(
	({ children, className, scrollYProgress, index = 0 }, ref) => {
		const start = 0 + index * 0.1;
		const end = start + 0.3;

		const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

		return (
			<motion.div ref={ref} className={className} style={{ opacity }}>
				{children}
			</motion.div>
		);
	}
);

OpacitySection.displayName = "OpacitySection";

export default OpacitySection;

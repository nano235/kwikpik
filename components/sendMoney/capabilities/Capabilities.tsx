"use client";

import React, { useRef } from "react";
import styles from "./Capabilities.module.scss";
import { AnimatedSection, Title } from "@/shared";
import {
	useMotionTemplate,
	motion,
	useScroll,
	useTransform,
	MotionValue,
	useSpring,
} from "framer-motion";
import Image from "next/image";

const cards = [
	{
		title: "Send Money",
		description: "Send to anyone, anywhere — instantly and securely.",
		icon: "/svgs/dollar_icon-dark.svg",
	},
	{
		title: "Receive Money",
		description:
			"Get paid by friends, family, customers, or employers without delays.",
		icon: "/svgs/dollar_icon-dark.svg",
	},
	{
		title: "Use Instantly",
		description:
			"Use your balance right away for bills, shopping, transfers, or savings.",
		icon: "/svgs/dollar_icon-dark.svg",
	},
];

const Capabilities = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end center"],
	});
	const cardRowRef = useRef(null);
	const { scrollYProgress: cardRowScrollYProgress } = useScroll({
		target: cardRowRef,
		offset: ["start end", "end center"],
	});
	return (
		<div className={styles.capabilities} ref={containerRef}>
			<div className={styles.container}>
				<AnimatedSection scrollYProgress={scrollYProgress}>
					<Title
						titleClassName={styles.title_title}
						descriptionClassName={styles.title_description}
						badge="Capabilities"
						title="What You Can Do with Kwikpik"
						description="We open the world of financial seamlessness to in a little box you can take with you anywhere"
					/>
				</AnimatedSection>
				<AnimatedSection
					ref={cardRowRef}
					scrollYProgress={cardRowScrollYProgress}
					className={styles.card_row}
				>
					{cards.map((card, index) => (
						<DeskCard
							key={index}
							card={card}
							index={index}
							scrollYProgress={cardRowScrollYProgress}
						/>
					))}
				</AnimatedSection>
				<div ref={cardRowRef} className={styles.mobile_card_row}>
					{cards.map((card, index) => (
						<MobileCard
							key={index}
							card={card}
							index={index}
							scrollYProgress={cardRowScrollYProgress}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

interface CardProps {
	card: (typeof cards)[0];
	index: number;
	scrollYProgress: MotionValue<number>;
}

interface CardProps {
	card: (typeof cards)[0];
	index: number;
	scrollYProgress: MotionValue<number>;
}

const MobileCard = ({ card, index, scrollYProgress }: CardProps) => {
	const start = 0 + index * 0.1;
	const end = start + 0.3;
	const rawY = useTransform(scrollYProgress, [start, end], [300, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
	return (
		<motion.div
			className={styles.card}
			style={{
				y,
				opacity,
			}}
		>
			<div className={styles.icon}>
				<Image src={card.icon} alt={card.title} width={56} height={56} />
			</div>
			<div className={styles.text}>
				<h3>{card.title}</h3>
				<p>{card.description}</p>
			</div>
		</motion.div>
	);
};

function DeskCard({ card, index, scrollYProgress }: CardProps) {
	// Rotation values: left card -15deg, middle 0deg, right card 15deg
	const rotations = [-15, 0, 15];
	const startRotation = rotations[index] || 0;

	// Y offset: left and right cards move 7rem down, middle stays at 0
	const yOffsets = [7, 0, 7]; // rem
	const startYOffset = yOffsets[index] || 0;

	// Animation timing
	const animationStart = 0;
	const animationEnd = 0.6;
	const progress = useTransform(
		scrollYProgress,
		[animationStart, animationEnd],
		[0, 1]
	);

	// Animate rotation from start rotation (curved) to 0 (straight)
	const rotationProgress = useTransform(progress, [0, 1], [startRotation, 0]);

	// Animate yOffset from start yOffset (curved) to 0 (straight)
	const yProgress = useTransform(progress, [0, 1], [startYOffset, 0]);

	// Apply spring physics for smooth animation
	const smoothRotation = useSpring(rotationProgress, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	const smoothY = useSpring(yProgress, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	// Convert y to rem string for transform
	const yRem = useTransform(smoothY, y => `${y}rem`);
	const rotationDeg = useTransform(smoothRotation, r => `${r}deg`);
	const transform = useMotionTemplate`translateY(${yRem}) rotate(${rotationDeg})`;

	return (
		<motion.div
			className={styles.card}
			style={{
				transform,
			}}
		>
			<div className={styles.icon}>
				<Image src={card.icon} alt={card.title} width={56} height={56} />
			</div>
			<div className={styles.text}>
				<h3>{card.title}</h3>
				<p>{card.description}</p>
			</div>
		</motion.div>
	);
}

export default Capabilities;

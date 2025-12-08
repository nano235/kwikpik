"use client";

import { AnimatedSection, AppLinks, Button } from "@/shared";
import styles from "./Journey.module.scss";
import {
	useScroll,
	useTransform,
	motion,
	useSpring,
	MotionValue,
	useMotionTemplate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const cards = [
	{
		title: "Fix What’s Broken",
		description:
			"We exist to challenge outdated financial systems and rebuild them in ways that truly serve people.",
	},
	{
		title: "Make Finance Automated",
		description:
			"We believe handling money, paying bills, and meeting daily responsibilities should feel natural, not stressful or intimidating.",
	},
	{
		title: "Build for Real  Life",
		description:
			"Our responsibility is to reflect the realities people face every day and build systems that serve those realities with intention.",
	},
];
const Journey = () => {
	const journeyContainerRef = useRef(null);
	const rowRef = useRef(null);
	const cardRef = useRef(null);
	const { scrollYProgress: journeyScrollYProgress } = useScroll({
		target: journeyContainerRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress: rowScrollYProgress } = useScroll({
		target: rowRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: cardScrollYProgress } = useScroll({
		target: cardRef,
		offset: ["start end", "center center"],
	});
	return (
		<div className={styles.journey}>
			<div className={styles.container}>
				<AnimatedSection
					ref={journeyContainerRef}
					scrollYProgress={journeyScrollYProgress}
					className={styles.title_container}
				>
					<Button buttonType="secondary" className={styles.button}>
						About Us
					</Button>
					<h1>We started this journey</h1>
					<p>
						To remove friction from everyday financial life in Africa by
						making payments, bill management, and digital value simple,
						reliable, and accessible to everyone.
					</p>
					<AppLinks />
				</AnimatedSection>
				<AnimatedSection
					className={styles.card_container}
					scrollYProgress={rowScrollYProgress}
					ref={rowRef}
				>
					<div className={styles.row}>
						<div className={styles.card}>
							<Image
								src="/images/about.png"
								alt="journey"
								fill
								sizes="100%"
							/>
						</div>
						<div className={styles.text}>
							<p>
								Kwikpik began in 2023 as a response to unreliable
								on-demand services in underserved regions. We set out to
								solve everyday access problems using better technology and
								local insight.
							</p>
							<p>
								As we grew, one thing became clear: payments, not
								delivery, were the deepest friction. Failed transactions,
								missed obligations, and limited access were holding people
								back more than logistics ever did. So we evolved.
							</p>
							<p></p>
							<p>
								Today, Kwikpik is focused on building reliable everyday
								finance — helping people pay bills, send money, and manage
								digital value without stress. This is just the beginning.
							</p>
						</div>
					</div>
					<AnimatedSection
						className={styles.card_row}
						ref={cardRef}
						scrollYProgress={cardScrollYProgress}
					>
						{cards.map((card, index) => (
							<Card
								key={index}
								card={card}
								index={index}
								scrollYProgress={cardScrollYProgress}
							/>
						))}
					</AnimatedSection>
				</AnimatedSection>
			</div>
		</div>
	);
};

interface CardProps {
	card: (typeof cards)[0];
	index: number;
	scrollYProgress: MotionValue<number>;
}

function Card({ card, index, scrollYProgress }: CardProps) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Animation timing - staggered for mobile, same timing for desktop
	const animationStart = isMobile ? 0 + index * 0.1 : 0;
	const animationEnd = isMobile ? animationStart + 0.4 : 0.6;
	const progress = useTransform(
		scrollYProgress,
		[animationStart, animationEnd],
		[0, 1]
	);

	// Mobile: Simple upward scroll animation
	const mobileY = useTransform(progress, [0, 1], [200, 0]);
	const mobileSmoothY = useSpring(mobileY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});
	const mobileOpacity = useTransform(progress, [0, 1], [0, 1]);

	// Desktop: Rotation and yOffset animation
	const rotations = [-15, 0, 15];
	const finalRotation = rotations[index] || 0;

	const yOffsets = [7, 0, 7]; // rem
	const finalYOffset = yOffsets[index] || 0;

	// Animate rotation from 0 to final rotation
	const rotationProgress = useTransform(progress, [0, 1], [0, finalRotation]);

	// Animate yOffset from 0 to final yOffset
	const yProgress = useTransform(progress, [0, 1], [0, finalYOffset]);

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
			style={
				isMobile
					? {
							y: mobileSmoothY,
							opacity: mobileOpacity,
					  }
					: {
							transform,
					  }
			}
		>
			<div className={styles.icon}>
				<Image src="/svgs/dollar_icon.svg" alt="journey" fill sizes="100%" />
			</div>
			<div className={styles.text}>
				<h3>{card.title}</h3>
				<p>{card.description}</p>
			</div>
		</motion.div>
	);
}

export default Journey;

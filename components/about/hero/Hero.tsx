"use client";

import Image from "next/image";
import styles from "./Hero.module.scss";
import { AnimatedSection, Button, Partners } from "@/shared";
import { useRef } from "react";
import {
	useScroll,
	useTransform,
	motion,
	useSpring,
	MotionValue,
	useMotionTemplate,
} from "framer-motion";

interface Cards {
	title?: string;
	text?: string;
	image?: string;
}

const cards: Cards[] = [
	{
		title: "Simple Enough for Everyday Life",
		text: "No technical knowledge required. Just open the app and go.",
	},
	{
		image: "/images/about-1.png",
	},
	{
		title: "Bills That Take Care of Themselves",
		text: "Set it once and your everyday bills get paid on time without stress.",
	},
	{
		image: "/images/about-2.png",
	},
	{
		title: "Payments That Just Work",
		text: "No more failed transactions just peace of mind.",
	},
	{
		image: "/images/about-3.png",
	},
	{
		title: "One Place for Your Money",
		text: "Global assets, Transfers, and bills live together in one clean wallet.",
	},
];

const Hero = () => {
	const cardContainerRef = useRef<HTMLDivElement>(null);
	const titleContainerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress: cardScrollYProgress } = useScroll({
		target: cardContainerRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress: titleScrollYProgress } = useScroll({
		target: titleContainerRef,
		offset: ["start end", "end center"],
	});
	return (
		<div className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.text}>
					<Button buttonType="secondary" className={styles.button}>
						About Us
					</Button>
					<h1>
						At Kwikpik, we believe <span>Bill</span> Payment and transferring{" "}
						<span>Money</span> should be easy for everyone.
					</h1>
				</div>
				<div className={styles.card_container} ref={cardContainerRef}>
					<div className={styles.cards}>
						{cards.map((card, index) => (
							<Card
								index={index}
								total={cards.length}
								card={card}
								scrollYProgress={cardScrollYProgress}
								key={index}
							/>
						))}
					</div>
				</div>
				<AnimatedSection
					ref={titleContainerRef}
					scrollYProgress={titleScrollYProgress}
					className={styles.title_container}
				>
					<Button buttonType="secondary" className={styles.button}>
						About Us
					</Button>
					<h1>Why People Love Kwikpik</h1>
					<p>
						Kwikpik fits into everyday life by removing stress from payments,
						bills, and money management.
					</p>
				</AnimatedSection>
				<Partners />
			</div>
		</div>
	);
};

export default Hero;

interface CardProps {
	index: number;
	total: number;
	card: Cards;
	scrollYProgress: MotionValue<number>;
}

/**
 * Utility to place each card on an arc with specific vertical offsets.
 * Each card starts at the position 3 indexes ahead and animates to its own position.
 */
function Card({ index, total, card, scrollYProgress }: CardProps) {
	// Vertical offsets from middle card (index 3)
	const verticalOffsets = [
		28.9, // Card 0: 25.9rem below middle
		12.8, // Card 1: 8.8rem below middle
		2.8, // Card 2: 0.8rem below middle (middle card)
		0, // Card 3: center (middle card)
		2.8, // Card 4: 0.8rem below middle (symmetric)
		12.8, // Card 5: 8.8rem below middle (symmetric)
		28.9, // Card 6: 25.9rem below middle (symmetric)
	];

	// Calculate horizontal position to create smooth arc curve
	const cardWidth = 20; // Card width in rem
	const gap = 4.3; // Gap between cards in rem
	const totalArcWidth = (total - 1) * (cardWidth + gap);
	const startX = -totalArcWidth / 2;

	// Calculate rotation angle to follow the arc curve
	const maxRotation = 40; // Maximum rotation angle
	const centerIndex = 3;
	const distanceFromCenter = Math.abs(index - centerIndex);
	const finalAngle =
		(distanceFromCenter / centerIndex) * maxRotation * (index < centerIndex ? -1 : 1);

	// Each card starts at index 3's xOffset but with its own starting yOffset
	// Then animates to its own xOffset and final yOffset
	const centerXOffset = startX + centerIndex * (cardWidth + gap);
	const finalXOffset = startX + index * (cardWidth + gap);
	const finalYOffset = verticalOffsets[index] || 0;

	// Starting yOffsets for each card (they don't stack, each has its own starting y)
	const startYOffsets = [
		0, // Card 0: starts at yOffset 0, animates to 28.9
		2.8, // Card 1: starts at yOffset 2.8, animates to 12.8
		2.8, // Card 2: starts at yOffset 2.8, animates to 2.8
		0, // Card 3: starts at yOffset 0, animates to 0 (center, no change)
		2.8, // Card 4: starts at yOffset 2.8, animates to 2.8
		12.8, // Card 5: starts at yOffset 12.8, animates to 12.8
		28.9, // Card 6: starts at yOffset 28.9, animates to 28.9
	];

	const startXOffset = centerXOffset; // All start at center x position
	const startYOffset = startYOffsets[index] || 0; // Each has its own starting y
	const startAngle = 0; // All start with no rotation

	// Animation timing
	const animationStart = 0;
	const animationEnd = 0.9;
	const progress = useTransform(
		scrollYProgress,
		[animationStart, animationEnd],
		[0, 1]
	);

	// Animate from start position (center) to final position
	const xProgress = useTransform(progress, [0, 1], [startXOffset, finalXOffset]);
	const yProgress = useTransform(progress, [0, 1], [startYOffset, finalYOffset]);
	const rotationProgress = useTransform(progress, [0, 1], [startAngle, finalAngle]);

	// Apply spring physics for smooth animation
	const smoothX = useSpring(xProgress, { stiffness: 100, damping: 20, mass: 0.5 });
	const smoothY = useSpring(yProgress, { stiffness: 100, damping: 20, mass: 0.5 });
	const smoothRotation = useSpring(rotationProgress, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	// Create transform string with rem units
	// Convert MotionValues to strings with units
	const xRem = useTransform(smoothX, x => `${x}rem`);
	const yRem = useTransform(smoothY, y => `${y}rem`);
	const rotationDeg = useTransform(smoothRotation, r => `${r}deg`);
	const transform = useMotionTemplate`translate(${xRem}, ${yRem}) rotate(${rotationDeg})`;

	return (
		<motion.div
			className={styles.card}
			style={{
				transform,
			}}
		>
			{card.title && card.text ? (
				<>
					<div className={styles.title}>
						<h3>{card.title}</h3>
					</div>
					<div className={styles.title}>
						<p>{card.text}</p>
					</div>
				</>
			) : (
				<div className={styles.image}>
					<Image src={card.image || ""} alt={"card"} fill sizes="100vw" />
				</div>
			)}
		</motion.div>
	);
}

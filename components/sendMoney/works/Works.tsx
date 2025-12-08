"use client";

import React, { useRef } from "react";
import styles from "./Works.module.scss";
import { AnimatedSection, Title } from "@/shared";
import Image from "next/image";
import { useScroll, useTransform, motion, useSpring, MotionValue } from "framer-motion";

const cards = [
	{
		title: "Get the Kwikpik App",
		description:
			"Download the app from the App Store or Play Store and set up your account.",
		image: "/images/send-money/background-1.png",
	},
	{
		title: "Choose Send or Receive",
		description: "Pick whether you’re sending money out or expecting a payment in.",
		image: "/images/send-money/background-2.png",
	},
	{
		title: "Enter Amount & Details",
		description: "Add the amount and the recipient’s details in a few quick steps.",
		image: "/images/send-money/background-3.png",
	},
	{
		title: "Confirm & Move Money",
		description: "Review once, confirm, and your money moves instantly.",
		image: "/images/send-money/background-4.png",
	},
];
const Works = () => {
	const titleRef = useRef(null);
	const cardContainerRef = useRef(null);
	const { scrollYProgress: titleScrollYProgress } = useScroll({
		target: titleRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress: cardScrollYProgress } = useScroll({
		target: cardContainerRef,
		offset: ["start end", "end center"],
	});
	return (
		<div className={styles.works}>
			<div className={styles.container}>
				<AnimatedSection scrollYProgress={titleScrollYProgress} ref={titleRef}>
					<Title
						className={styles.title}
						badge="How It Works"
						title="Moving Money, Made Simple"
						description="Everything you need to go from sign-up to your first transaction, explained simply."
					/>
				</AnimatedSection>
				<div className={styles.card_container} ref={cardContainerRef}>
					{cards.map((card, index) => (
						<Card
							key={index}
							card={card}
							index={index}
							scrollYProgress={cardScrollYProgress}
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

function Card({ card, index, scrollYProgress }: CardProps) {
	// Stagger the animation start for each card
	const animationStart = 0 + index * 0.1;
	const animationEnd = animationStart + 0.4;

	const progress = useTransform(
		scrollYProgress,
		[animationStart, animationEnd],
		[0, 1]
	);

	// Animate y from 200px down to 0 (upward movement)
	const y = useTransform(progress, [0, 1], [200, 0]);

	// Animate x from -200px (left) to 0 (current position) for small_card
	const x = useTransform(progress, [0, 1], [-200, 0]);

	// Apply spring physics for smooth animation
	const smoothY = useSpring(y, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	const smoothX = useSpring(x, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	return (
		<motion.div
			className={styles.card}
			style={{
				y: smoothY,
			}}
		>
			<div className={styles.image}>
				<Image src={card.image} alt={card.title} fill sizes="100%" />
			</div>
			<motion.div
				className={styles.small_card}
				style={{
					x: smoothX,
				}}
			>
				<div className={styles.icon}>
					<Image
						src={"/svgs/dollar_icon-dark.svg"}
						alt={card.title}
						fill
						sizes="100%"
					/>
				</div>
				<div className={styles.text}>
					<h3>{card.title}</h3>
					<p>{card.description}</p>
				</div>
			</motion.div>
			<div className={styles.mob_small_card}>
				<div className={styles.icon}>
					<Image
						src={"/svgs/dollar_icon-dark.svg"}
						alt={card.title}
						fill
						sizes="100%"
					/>
				</div>
				<div className={styles.text}>
					<h3>{card.title}</h3>
					<p>{card.description}</p>
				</div>
			</div>
		</motion.div>
	);
}

export default Works;

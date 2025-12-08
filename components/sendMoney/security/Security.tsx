"use client";

import React, { useRef } from "react";
import styles from "./Security.module.scss";
import Image from "next/image";
import { AnimatedSection, Button, OpacitySection } from "@/shared";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const cards = [
	{
		title: "Verified Accounts",
		description:
			"Every user goes through identity checks to help keep the platform safe and reduce fraud.",
		icon: "/svgs/dollar_icon.svg",
	},
	{
		title: "Encrypted Transactions",
		description:
			"All money movements are protected with strong encryption from start to finish.",
		icon: "/svgs/dollar_icon.svg",
	},
	{
		title: "Real-Time Fraud Monitoring",
		description:
			"Suspicious activity is detected and blocked as it happens, not after the fact.",
		icon: "/svgs/dollar_icon.svg",
	},
];

const Security = () => {
	const globeRef = useRef(null);
	const { scrollYProgress: globeProgress } = useScroll({
		target: globeRef,
		offset: ["start end", "end center"],
	});
	const textRef = useRef(null);
	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});
	const cardRowRef = useRef(null);
	const mobileCardRowRef = useRef(null);
	const { scrollYProgress: cardRowScrollYProgress } = useScroll({
		target: cardRowRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress: mobileCardRowScrollYProgress } = useScroll({
		target: mobileCardRowRef,
		offset: ["start end", "end center"],
	});

	const rawX = useTransform(cardRowScrollYProgress, [0.2, 0.7], [700, 0]);
	const x = useSpring(rawX, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	const rawOpacityX = useTransform(cardRowScrollYProgress, [0, 0.4], [0, 1]);
	const opacityX = useSpring(rawOpacityX, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});
	return (
		<div className={styles.security}>
			<div className={styles.container}>
				<OpacitySection
					ref={globeRef}
					className={styles.globe}
					scrollYProgress={globeProgress}
				>
					<Image src="/svgs/globe.svg" alt="globe" width={69.8} height={47} />
				</OpacitySection>
				<AnimatedSection
					ref={textRef}
					className={`${styles.title_container} ${styles.max_width_64}`}
					scrollYProgress={textProgress}
				>
					<Button buttonType="secondary" className={styles.button}>
						Security & Trust
					</Button>
					<h1>Built to Keep Your Money Safe</h1>
					<p>
						From account protection to transaction security, every part of
						Kwikpik is designed to protect your funds and your data.
					</p>
				</AnimatedSection>

				<motion.div
					ref={cardRowRef}
					style={{ x, opacity: opacityX }}
					className={styles.card_row}
				>
					{cards.map((card, index) => (
						<Card
							key={index}
							card={card}
							index={index}
							scrollYProgress={cardRowScrollYProgress}
						/>
					))}
				</motion.div>
				<div ref={mobileCardRowRef} className={styles.mobile_card_row}>
					{cards.map((card, index) => (
						<MobileCard
							key={index}
							card={card}
							index={index}
							scrollYProgress={mobileCardRowScrollYProgress}
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

function Card({ card }: CardProps) {
	return (
		<div className={styles.card}>
			<div className={styles.icon}>
				<Image src={card.icon} alt={card.title} fill sizes="100%" />
			</div>
			<div className={styles.text}>
				<h3>{card.title}</h3>
				<p>{card.description}</p>
			</div>
		</div>
	);
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
		<motion.div className={styles.card} key={index} style={{ y, opacity }}>
			<div className={styles.icon}>
				<Image src={card.icon} alt={card.title} fill sizes="100%" />
			</div>
			<div className={styles.text}>
				<h3>{card.title}</h3>
				<p>{card.description}</p>
			</div>
		</motion.div>
	);
};

export default Security;

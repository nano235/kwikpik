"use client";

import styles from "./Cards.module.scss";
import Image from "next/image";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";

interface Card {
	title: string;
	text: string;
	image: string;
}

const cardsData: Card[] = [
	{
		title: "Never Miss Another Bill",
		text: "Set up your electricity, data, or subscriptions once, and Kwikpik pays them for you automatically, right on time, every time.",
		image: "/images/auto-bills.png",
	},
	{
		title: "Pay Any Bill, From Anywhere",
		text: "Because your payments are powered by stable digital money, you can pay for services from anywhere without worrying about location limits or failed transactions.",
		image: "/images/stables.png",
	},
	{
		title: "Instant Transfers, No Borders",
		text: "Send and receive payments across fiat or crypto fast, secure, and with no hidden fees.",
		image: "/images/transfer.png",
	},
];

interface CardProps {
	card: Card;
	progress: MotionValue<number>;
	range: [number, number];
	targetScale: number;
	index: number;
}

const Card = ({ card, progress, range, targetScale, index }: CardProps) => {
	const cardRef = useRef(null);
	// const { scrollYProgress } = useScroll({
	// 	target: cardRef,
	// 	offset: ["start end", "start start"],
	// });

	const scale = useTransform(progress, range, [1, targetScale]);
	return (
		<div
			className={styles.card_container}
			style={{ top: `calc(50% - 36rem + ${index * 0.5}rem)` }}
		>
			<motion.div className={styles.card} ref={cardRef} style={{ scale }}>
				<div className={styles.text_container}>
					<h3>{card.title}</h3>
					<p>{card.text}</p>
				</div>
				<div className={styles.image}>
					<Image src={card.image} alt={card.title} fill sizes="100vw" />
				</div>
			</motion.div>
		</div>
	);
};

const Cards = () => {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	return (
		<div className={styles.cards} ref={container}>
			{cardsData.map((card, index) => {
				const targetScale = 1 - (cardsData.length - index) * 0.05;
				return (
					<Card
						key={index}
						card={card}
						progress={scrollYProgress}
						range={[0, 1]}
						targetScale={targetScale}
						index={index}
					/>
				);
			})}
		</div>
	);
};

export default Cards;

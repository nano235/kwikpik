"use client";

import Image from "next/image";
import styles from "./Transactions.module.scss";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection, OpacitySection } from "@/shared";

const cardsData = [
	{
		title: "Peace of Mind, Every Time",
		description:
			"No more worrying about missed due dates or service cut-offs. Your important bills get handled on time so you can focus on your life, not your reminders.",
		imageSrc: "/images/peace.png",
		imageAlt: "card",
	},
	{
		title: "Money Moves Without Stress",
		description:
			"Sending or receiving money feels effortless. No waiting days, no surprise charges, no complicated steps.",
		imageSrc: "/images/stress.png",
		imageAlt: "card",
	},
	{
		title: "Your Money Keeps Its Value",
		description:
			"While prices and currencies change, your balance stays steady. You&apos;re protected from sudden drops and can plan your spending with confidence.",
		imageSrc: "/images/instant-payment.png",
		imageAlt: "card",
	},
	{
		title: "Earn While You Pay",
		description:
			"Pay your bills on Kwikpik and get rewarded for it. Your everyday payments now come with extra value.",
		imageSrc: "/images/pay.png",
		imageAlt: "card",
	},
];

const Transactions = () => {
	const containerRef = useRef(null);
	const globeRef = useRef(null);
	const textRef = useRef(null);
	const cardContainerRef = useRef(null);

	const { scrollYProgress: globeProgress } = useScroll({
		target: globeRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: cardScrollYProgress } = useScroll({
		target: cardContainerRef,
		offset: ["start end", "end center"],
	});

	return (
		<div className={styles.transactions} ref={containerRef}>
			<OpacitySection
				ref={globeRef}
				className={styles.globe}
				scrollYProgress={globeProgress}
			>
				<Image src="/svgs/globe.svg" alt="globe" width={69.8} height={47} />
			</OpacitySection>
			<AnimatedSection
				ref={textRef}
				className={`${styles.text_container} ${styles.max_width_64}`}
				scrollYProgress={textProgress}
			>
				<h2>Built for Africa&apos;s real money moves.</h2>
				<p
					style={{
						textAlign: "center",
						maxWidth: "52.8rem",
						marginInline: "auto",
					}}
				>
					Kwikpik turns the chaos of bills and transfers into calm control.
					Track easily, pay instantly, and know your money is always safe.
				</p>
			</AnimatedSection>
			<div className={styles.card_container} ref={cardContainerRef}>
				{cardsData.map((card, index) => (
					<AnimatedSection
						key={index}
						className={styles.card}
						scrollYProgress={cardScrollYProgress}
						index={index}
					>
						<div className={styles.text_container}>
							<h3>{card.title}</h3>
							<p>{card.description}</p>
						</div>
						<div className={styles.image}>
							<Image
								src={card.imageSrc}
								alt={card.imageAlt}
								fill
								sizes="100%"
							/>
						</div>
					</AnimatedSection>
				))}
			</div>
		</div>
	);
};

export default Transactions;

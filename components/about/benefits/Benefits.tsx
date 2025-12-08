"use client";

import styles from "./Benefits.module.scss";
import { AnimatedSection, AppLinks, Button } from "@/shared";
import { useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const cards = [
	{
		title: "Reliability",
		description:
			"Kwikpik is built to work when you actually need it. From bill payments to transfers, our systems are designed for consistency, so your money moves smoothly without random failures or delays.",
	},
	{
		title: "Simplicity",
		description:
			"Money shouldn't feel complicated. Every part of Kwikpik is designed to be clear, easy to use, and effortless — whether you're paying a bill, sending money, or checking your balance.",
	},
	{
		title: "Ownership",
		description:
			"You're always in control of your money. Your wallet, your funds, your decisions. Kwikpik doesn't restrict how you use your money — we simply give you better tools to manage it.",
	},

	{
		title: "Flexibility",
		description:
			"Use Kwikpik the way your life demands. Pay bills, send money, manage digital assets, or handle everyday expenses — all from one place without being boxed into one use case.",
	},
	{
		title: "Rewards",
		description:
			"Your everyday payments shouldn't go unnoticed. With Kwikpik, regular usage comes with real rewards that add extra value to what you already do.",
	},
];

const CLOSING_ANIMATION_DURATION = 2500; // 2.5s in milliseconds
const OPENING_ANIMATION_DURATION = 3900; // 3.9s in milliseconds
const CARD_DISPLAY_DURATION = 5000; // 5s in milliseconds

const Benefits = () => {
	const [activeCard, setActiveCard] = useState<string | number | null>(0);
	const [canAnimateOpen, setCanAnimateOpen] = useState<Set<number>>(new Set([0])); // First card can animate immediately
	const [closingCard, setClosingCard] = useState<number | null>(null);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const openCard = (id: number) => {
		// If a card is already open, close it first
		if (activeCard !== null && activeCard !== id) {
			setClosingCard(activeCard as number);
			setCanAnimateOpen(new Set());
			setActiveCard(null);

			// After closing animation completes, open the new card
			setTimeout(() => {
				setClosingCard(null);
				setActiveCard(id);
				setCanAnimateOpen(new Set([id as number]));
			}, CLOSING_ANIMATION_DURATION);
		} else {
			// No card is open, open immediately
			setActiveCard(id);
			setCanAnimateOpen(new Set([id as number]));
		}
	};

	const handleCardToggle = (id: string | number) => {
		// Pause auto-play when user manually interacts
		setIsAutoPlaying(false);
		clearAutoPlayTimers();

		// If clicking the same card, just close it
		if (activeCard === id) {
			setClosingCard(id as number);
			setActiveCard(null);
			setCanAnimateOpen(new Set());
			// Clear closing state after animation
			setTimeout(() => {
				setClosingCard(null);
			}, CLOSING_ANIMATION_DURATION);
			return;
		}

		openCard(id as number);
	};

	const clearAutoPlayTimers = () => {
		if (autoPlayTimeoutRef.current) {
			clearTimeout(autoPlayTimeoutRef.current);
			autoPlayTimeoutRef.current = null;
		}
	};

	// Auto-play effect
	useEffect(() => {
		if (isAutoPlaying && activeCard !== null) {
			clearAutoPlayTimers();

			// Set up the cycle: wait for opening animation + display duration, then close and move to next
			const scheduleNextCard = () => {
				// Wait for opening animation to complete, then display for 5 seconds, then close and move to next
				autoPlayTimeoutRef.current = setTimeout(() => {
					// After opening + display duration, close current and open next
					if (activeCard !== null) {
						const currentIndex = activeCard as number;
						const nextIndex = (currentIndex + 1) % cards.length;

						setClosingCard(currentIndex);
						setCanAnimateOpen(new Set());
						setActiveCard(null);

						// After closing animation, open next card
						setTimeout(() => {
							setClosingCard(null);
							setActiveCard(nextIndex);
							setCanAnimateOpen(new Set([nextIndex]));
							// Schedule next cycle
							scheduleNextCard();
						}, CLOSING_ANIMATION_DURATION);
					}
				}, OPENING_ANIMATION_DURATION + CARD_DISPLAY_DURATION);
			};

			// Start the cycle
			scheduleNextCard();
		}

		return () => {
			clearAutoPlayTimers();
		};
	}, [isAutoPlaying, activeCard]);

	// Resume auto-play after user interaction stops (after 10 seconds of no interaction)
	useEffect(() => {
		if (!isAutoPlaying) {
			const resumeTimeout = setTimeout(() => {
				setIsAutoPlaying(true);
			}, 10000); // Resume after 10 seconds

			return () => clearTimeout(resumeTimeout);
		}
	}, [isAutoPlaying]);

	const titleContainerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress: titleScrollYProgress } = useScroll({
		target: titleContainerRef,
		offset: ["start end", "end center"],
	});
	const cardsContainerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress: cardsScrollYProgress } = useScroll({
		target: cardsContainerRef,
		offset: ["start end", "end center"],
	});
	return (
		<div className={styles.benefits}>
			<div className={styles.container}>
				<AnimatedSection
					ref={titleContainerRef}
					scrollYProgress={titleScrollYProgress}
					className={styles.title_container}
				>
					<Button buttonType="secondary" className={styles.button}>
						Our Benefits
					</Button>
					<div className={styles.title}>
						<h1>What This Means for You</h1>
						<p>
							Practical advantages designed to make everyday money easier,
							calmer, and more reliable.
						</p>
					</div>
					<AppLinks />
				</AnimatedSection>
				<AnimatedSection
					ref={cardsContainerRef}
					scrollYProgress={cardsScrollYProgress}
					className={styles.cards_container}
				>
					{cards.map((card, index) => (
						<div
							key={index}
							className={styles.card}
							onClick={() => handleCardToggle(index)}
							data-active={activeCard === index}
							data-can-animate={canAnimateOpen.has(index)}
							data-closing={closingCard === index}
						>
							<div className={styles.number}>{index + 1}</div>
							<div className={styles.title}>
								<h3>{card.title}</h3>
							</div>
							<div className={styles.description}>
								<p>{card.description}</p>
							</div>
							<div className={styles.image_container}>
								<div className={styles.image}>
									<Image
										src="/images/drone.png"
										alt=""
										fill
										sizes="100vw"
									/>
								</div>
							</div>
						</div>
					))}
				</AnimatedSection>
			</div>
		</div>
	);
};

export default Benefits;

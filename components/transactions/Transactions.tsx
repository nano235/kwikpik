"use client";

import Image from "next/image";
import styles from "./Transactions.module.scss";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, forwardRef } from "react";

interface AnimatedSectionProps {
	children: React.ReactNode;
	className?: string;
	scrollProgress: MotionValue<number>;
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
	({ children, className, scrollProgress }, ref) => {
		const opacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
		const y = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [100, 0, 0, 0]);

		return (
			<motion.div ref={ref} className={className} style={{ opacity, y }}>
				{children}
			</motion.div>
		);
	}
);

AnimatedSection.displayName = "AnimatedSection";

const OpacitySection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
	({ children, className, scrollProgress }, ref) => {
		const opacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);

		return (
			<motion.div ref={ref} className={className} style={{ opacity }}>
				{children}
			</motion.div>
		);
	}
);

OpacitySection.displayName = "OpacitySection";

const Transactions = () => {
	const containerRef = useRef(null);
	const globeRef = useRef(null);
	const textRef = useRef(null);
	const card1Ref = useRef(null);
	const card2Ref = useRef(null);
	const card3Ref = useRef(null);

	const { scrollYProgress: globeProgress } = useScroll({
		target: globeRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: card1Progress } = useScroll({
		target: card1Ref,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: card2Progress } = useScroll({
		target: card2Ref,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: card3Progress } = useScroll({
		target: card3Ref,
		offset: ["start end", "end center"],
	});

	return (
		<div className={styles.transactions} ref={containerRef}>
			<OpacitySection
				ref={globeRef}
				className={styles.globe}
				scrollProgress={globeProgress}
			>
				<Image src="/svgs/globe.svg" alt="globe" width={69.8} height={47} />
			</OpacitySection>
			<AnimatedSection
				ref={textRef}
				className={`${styles.text_container} ${styles.max_width_64}`}
				scrollProgress={textProgress}
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
			<div className={styles.card_container}>
				<AnimatedSection
					ref={card1Ref}
					className={styles.card}
					scrollProgress={card1Progress}
				>
					<div className={styles.text_container}>
						<h3>Safe and Secure Transactions</h3>
						<p>
							Your money stays protected with bank-grade encryption and
							multi-layer security. Every transfer, bill payment, and
							stablecoin transaction is verified and traceable, always under
							your control.
						</p>
					</div>
					<div className={styles.image}>
						<Image src="/images/lock.png" alt="card" fill sizes="100%" />
					</div>
					<div className={styles.image_mob}>
						<Image src="/images/lock-mob.png" alt="card" fill sizes="100%" />
					</div>
				</AnimatedSection>
				<AnimatedSection
					ref={card2Ref}
					className={styles.card}
					scrollProgress={card2Progress}
				>
					<div className={styles.text_container}>
						<h3>Instant Payments, Zero Delays</h3>
						<p>
							Send or receive money in seconds, whether you&apos;re paying
							bills, topping up, or sending stablecoins. Kwikpik&apos;s
							infrastructure ensures real-time settlements across fiat and
							digital currencies.
						</p>
					</div>
					<div className={styles.image}>
						<Image
							src="/images/instant-payment.png"
							alt="card"
							fill
							sizes="100%"
						/>
					</div>
				</AnimatedSection>
				<AnimatedSection
					ref={card3Ref}
					className={styles.card}
					scrollProgress={card3Progress}
				>
					<div className={styles.text_container}>
						<h3>Track and Manage Effortlessly</h3>
						<p>
							See every payment, bill, and balance in one clean dashboard.
							Kwikpik helps you stay on top of your finances.
						</p>
					</div>
					<div className={styles.image}>
						<Image src="/images/track.png" alt="card" fill sizes="100%" />
					</div>
				</AnimatedSection>
			</div>
		</div>
	);
};

export default Transactions;

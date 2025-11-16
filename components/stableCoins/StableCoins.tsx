"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { AnimatedSection } from "../transactions/Transactions";
import styles from "./StableCoins.module.scss";
import Image from "next/image";
import { useRef, forwardRef } from "react";

interface AnimatedCoinProps {
	children: React.ReactNode;
	className?: string;
	scrollProgress: MotionValue<number>;
	direction: "up" | "down";
}

const AnimatedCoin = forwardRef<HTMLDivElement, AnimatedCoinProps>(
	({ children, className, scrollProgress, direction }, ref) => {
		const y = useTransform(
			scrollProgress,
			[0, 0.3, 0.7, 1],
			direction === "up" ? [-100, 0, 0, 0] : [100, 0, 0, 0]
		);

		return (
			<motion.div ref={ref} className={className} style={{ y }}>
				{children}
			</motion.div>
		);
	}
);

AnimatedCoin.displayName = "AnimatedCoin";

const StableCoins = () => {
	const textRef = useRef(null);
	const usdcRef = useRef(null);
	const usdtRef = useRef(null);
	const daiRef = useRef(null);

	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: usdcProgress } = useScroll({
		target: usdcRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: usdtProgress } = useScroll({
		target: usdtRef,
		offset: ["start end", "end center"],
	});

	const { scrollYProgress: daiProgress } = useScroll({
		target: daiRef,
		offset: ["start end", "end center"],
	});

	return (
		<div className={styles.stable_coins}>
			<AnimatedSection
				ref={textRef}
				className={styles.title}
				scrollProgress={textProgress}
			>
				<h2>Stablecoins Powered</h2>
				<p>
					Kwikpik runs on digital dollars that don&apos;t lose value and make it
					easy to store, send, or spend money across borders instantly and
					without bank delays.
				</p>
			</AnimatedSection>
			<div className={styles.image_container}>
				<AnimatedCoin
					ref={usdcRef}
					className={styles.image_wrapper}
					scrollProgress={usdcProgress}
					direction="up"
				>
					<div className={styles.image}>
						<Image src="/images/usdc.png" alt="usdc" fill sizes="100%" />
					</div>
				</AnimatedCoin>
				<AnimatedCoin
					ref={usdtRef}
					className={styles.image_wrapper}
					scrollProgress={usdtProgress}
					direction="down"
				>
					<div className={styles.image}>
						<Image src="/images/usdt.png" alt="usdt" fill sizes="100%" />
					</div>
				</AnimatedCoin>
				<AnimatedCoin
					ref={daiRef}
					className={styles.image_wrapper}
					scrollProgress={daiProgress}
					direction="up"
				>
					<div className={styles.image}>
						<Image src="/images/dai.png" alt="dai" fill sizes="100%" />
					</div>
				</AnimatedCoin>
			</div>
		</div>
	);
};

export default StableCoins;

"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { AnimatedSection } from "@/shared";
import styles from "./StableCoins.module.scss";
import Image from "next/image";
import { useRef, forwardRef } from "react";

interface AnimatedCoinProps {
	children: React.ReactNode;
	className?: string;
	scrollYProgress: MotionValue<number>;
	direction: "up" | "down";
}

const AnimatedCoin = forwardRef<HTMLDivElement, AnimatedCoinProps>(
	({ children, className, scrollYProgress, direction }, ref) => {
		const y = useTransform(
			scrollYProgress,
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
				scrollYProgress={textProgress}
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
					scrollYProgress={usdcProgress}
					direction="up"
				>
					<div className={styles.image}>
						<Image src="/images/usdc.png" alt="usdc" fill sizes="100%" />
					</div>
				</AnimatedCoin>
				<AnimatedCoin
					ref={usdtRef}
					className={styles.image_wrapper}
					scrollYProgress={usdtProgress}
					direction="down"
				>
					<div className={styles.image}>
						<Image src="/images/usdt.png" alt="usdt" fill sizes="100%" />
					</div>
				</AnimatedCoin>
				<AnimatedCoin
					ref={daiRef}
					className={styles.image_wrapper}
					scrollYProgress={daiProgress}
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

"use client";

import Link from "next/link";
import styles from "./Kwikpik.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { AnimatedSection } from "@/shared";

const Kwikpik = () => {
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const linkRowRef = useRef(null);
	const { scrollYProgress: linkRowProgress } = useScroll({
		target: linkRowRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end end"],
	});

	const ill1X = useTransform(scrollYProgress, [0, 1], ["-200%", "0%"]);
	const ill1Rotate = useTransform(scrollYProgress, [0, 1], [-380, 0]);
	const ill2X = useTransform(scrollYProgress, [0, 1], ["200%", "0%"]);
	const ill2Rotate = useTransform(scrollYProgress, [0, 1], [360, 0]);

	return (
		<div className={styles.kwikpik} ref={containerRef}>
			<AnimatedSection
				ref={textRef}
				className={styles.title}
				scrollYProgress={textProgress}
			>
				<h2>Your money, Automated.</h2>
				<p>
					Join thousands using Kwikpik to automate bills, send payments, and
					keep their money stable with digital dollars.
				</p>
			</AnimatedSection>
			<AnimatedSection
				ref={linkRowRef}
				className={styles.link_row}
				scrollYProgress={linkRowProgress}
			>
				<Link
					href="https://play.google.com/store/apps/details?id=io.kwikpik.app"
					target="_blank"
					rel="noreferrer"
				>
					<div className={styles.icon}>
						<Image
							src="/svgs/google-play.svg"
							alt="google-play"
							fill
							quality={100}
							sizes="100vw"
						/>
					</div>
					<p>Google Play</p>
				</Link>
				<Link
					href="https://apps.apple.com/us/app/kwikpik-food-grocery-bills/id6447007329"
					target="_blank"
					rel="noreferrer"
				>
					<div className={styles.icon}>
						<Image
							src="/svgs/app-store.svg"
							alt="app-store"
							fill
							quality={100}
							sizes="100vw"
						/>
					</div>
					<p>App Store</p>
				</Link>
			</AnimatedSection>
			<div className={styles.image_container}>
				<Image
					src="/images/logo-large.png"
					alt="kwikpik"
					fill
					quality={100}
					loading="eager"
					priority={true}
				/>
				<motion.div
					className={styles.ill_1}
					style={{
						x: ill1X,
						rotate: ill1Rotate,
					}}
				>
					<div className={styles.image}>
						<Image src="/images/ill-1.png" alt="kwikpik" fill quality={100} />
					</div>
				</motion.div>
				<motion.div
					className={styles.ill_2}
					style={{
						x: ill2X,
						rotate: ill2Rotate,
					}}
				>
					<div className={styles.image}>
						<Image src="/images/ill-2.png" alt="kwikpik" fill quality={100} />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Kwikpik;

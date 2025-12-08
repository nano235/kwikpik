"use client";

import styles from "./Background.module.scss";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const Background = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"],
	});
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
	return (
		<div className={styles.background} ref={containerRef}>
			<div className={styles.background_container}>
				<motion.div
					className={styles.background_image}
					style={{ scale: imageScale }}
				/>
				<div className={styles.overlay}></div>
				<div className={styles.text_block}>
					<div className={styles.text}>
						<h3>Move Money Without Friction</h3>
					</div>
					<div className={styles.text}>
						<p>
							With Kwikpik, moving money is simple. Send to anyone, receive
							from anywhere, and use your balance instantly for bills,
							shopping, or savings all in one place.
						</p>
					</div>
					<div className={styles.row}>
						<div className={styles.card}>
							<div className={styles.image}>
								<Image src="/svgs/dollar_icon.svg" alt="card" fill />
							</div>
							<div className={styles.text}>
								<h3>No bank stress</h3>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.image}>
								<Image src="/svgs/dollar_icon.svg" alt="card" fill />
							</div>
							<div className={styles.text}>
								<h3>No long delays</h3>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.image}>
								<Image src="/svgs/dollar_icon.svg" alt="card" fill />
							</div>
							<div className={styles.text}>
								<h3>No limits</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Background;

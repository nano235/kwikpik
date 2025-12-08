"use client";

import styles from "./Background.module.scss";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const Background = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end center"],
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
						<h3>
							Kwikpik connects everyday finance with the power of
							stablecoins.
						</h3>
					</div>
					<div className={styles.text}>
						<p>
							From automated bill payments to instant transfers, we’re
							making stable, global money simple and usable for everyone in
							Africa.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Background;

"use client";

import React, { useRef } from "react";
import styles from "./Backing.module.scss";
import Image from "next/image";
import { AnimatedSection, AppLinks, Button } from "@/shared";
import { useScroll } from "framer-motion";

const Backing = () => {
	const rowRef = useRef(null);
	const { scrollYProgress: rowScrollYProgress } = useScroll({
		target: rowRef,
		offset: ["start end", "end center"],
	});
	return (
		<section className={styles.backing}>
			<div className={styles.container}>
				<AnimatedSection
					ref={rowRef}
					scrollYProgress={rowScrollYProgress}
					className={styles.row}
				>
					<div className={styles.globe}>
						<Image src="/images/globe_white.png" alt="Globe" fill />
					</div>
					<div className={styles.text_container}>
						<Button buttonType="secondary" className={styles.button}>
							Blockchain Backed
						</Button>
						<h2>Built for a More Reliable Future</h2>
						<p>
							We believe people deserve financial tools that work when it
							matters. That’s why Kwikpik is built on open, stable digital
							infrastructure designed for real life — so payments don’t
							break under pressure, bills don’t fail unexpectedly, and
							people can move and manage money with confidence, not
							uncertainty.
						</p>
						<AppLinks type="light" />
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
};

export default Backing;

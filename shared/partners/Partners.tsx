"use client";

import Image from "next/image";
import styles from "./Partners.module.scss";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { AnimatedSection } from "@/shared";

const partners = [
	{
		name: "techstars",
		imageSrc: "/images/partners/techstars.png",
		alt: "Techstars",
	},
	{
		name: "hedera",
		imageSrc: "/images/partners/hedera.png",
		alt: "Built on Hedera",
	},
	{
		name: "edo",
		imageSrc: "/images/partners/edo.png",
		alt: "Edo State Government",
	},
	{
		name: "gates",
		imageSrc: "/images/partners/gates.png",
		alt: "Bill & Melinda Gates Foundation",
	},
	{
		name: "creation",
		imageSrc: "/images/partners/creation.png",
		alt: "Co-Creation Hub",
	},
	{
		name: "stillman",
		imageSrc: "/images/partners/stillman.png",
		alt: "Stillman Digital",
	},
	{
		name: "cngn",
		imageSrc: "/images/partners/cngn.png",
		alt: "CNGN",
	},
];

const Partners = () => {
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end center"],
	});

	return (
		<section className={styles.partners} ref={containerRef}>
			<AnimatedSection
				className={styles.container}
				scrollYProgress={scrollYProgress}
			>
				<h2 className={styles.title}>Trusted and Backed by</h2>
				<div className={styles.logos_container}>
					{partners.map((partner, index) => (
						<div key={index} className={styles.logo_wrapper}>
							<Image
								src={partner.imageSrc}
								alt={partner.alt}
								fill
								sizes="100%"
							/>
						</div>
					))}
				</div>
			</AnimatedSection>
		</section>
	);
};

export default Partners;

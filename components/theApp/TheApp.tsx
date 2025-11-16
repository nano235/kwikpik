"use client";

import Link from "next/link";
import styles from "./TheApp.module.scss";
import Image from "next/image";
import { useRef, useEffect, useState, useMemo } from "react";
import {
	useScroll,
	useTransform,
	motion,
	MotionValue,
	useMotionTemplate,
} from "framer-motion";
import { AnimatedSection } from "../transactions/Transactions";

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkMobile = () => {
			const width = window.innerWidth;
			const isMobileWidth = width <= 450;
			setIsMobile(isMobileWidth);
		};

		// Check immediately
		checkMobile();

		// Use matchMedia for better cross-browser support
		const mediaQuery = window.matchMedia("(max-width: 450px)");

		const handleMediaChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches);
		};

		// Modern browsers
		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleMediaChange);
		} else if (mediaQuery.addListener) {
			// Legacy browsers
			mediaQuery.addListener(handleMediaChange);
		}

		// Also listen to resize as fallback
		const handleResize = () => {
			checkMobile();
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("orientationchange", handleResize);

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", handleMediaChange);
			} else if (mediaQuery.removeListener) {
				mediaQuery.removeListener(handleMediaChange);
			}
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("orientationchange", handleResize);
		};
	}, []);

	return isMobile;
};

interface AnimatedImageProps {
	className: string;
	imageClassName: string;
	src: string;
	alt: string;
	finalTop: string;
	finalLeft?: string;
	finalRight?: string;
	elementWidth: number;
	mobileFinalTop?: string;
	mobileFinalLeft?: string;
	mobileFinalRight?: string;
	mobileElementWidth?: number;
	scrollProgress: MotionValue<number>;
}

const AnimatedImage = ({
	className,
	imageClassName,
	src,
	alt,
	finalTop,
	finalLeft,
	finalRight,
	elementWidth,
	mobileFinalTop,
	mobileFinalLeft,
	mobileFinalRight,
	mobileElementWidth,
	scrollProgress,
}: AnimatedImageProps) => {
	const isMobile = useIsMobile();

	// Parse final positions (remove 'rem' and convert to numbers)
	const parseRem = (value: string) => parseFloat(value.replace("rem", "")) || 0;

	// Memoize values that depend on isMobile so transforms update when isMobile changes
	const animationValues = useMemo(() => {
		// Use mobile values if on mobile, otherwise use desktop values
		const activeTop = isMobile && mobileFinalTop ? mobileFinalTop : finalTop;
		const activeLeft =
			isMobile && mobileFinalLeft !== undefined ? mobileFinalLeft : finalLeft;
		const activeRight =
			isMobile && mobileFinalRight !== undefined ? mobileFinalRight : finalRight;
		const activeWidth =
			isMobile && mobileElementWidth ? mobileElementWidth : elementWidth;

		const finalTopValue = parseRem(activeTop);
		const finalLeftValue = activeLeft ? parseRem(activeLeft) : null;
		const finalRightValue = activeRight ? parseRem(activeRight) : null;

		// Container dimensions: desktop 69rem, mobile 31.5rem
		const containerWidth = isMobile ? 31.5 : 69;
		const containerCenter = containerWidth / 2;

		// Calculate the center position of the element
		// For left: original left edge + half width = center position
		// For right: containerWidth - right value - half width = center position
		// Note: Negative right values mean the element extends beyond the container
		const getFinalCenterX = () => {
			if (finalLeftValue !== null) {
				// Original left edge is at finalLeftValue, center is at left + width/2
				// Works for both positive (inside) and negative (outside) values
				return finalLeftValue + activeWidth / 2;
			} else if (finalRightValue !== null) {
				// Original right edge is at finalRightValue from the container's right edge
				// Right edge position from left = containerWidth - finalRightValue
				// (For negative values, this adds to containerWidth, extending beyond)
				// Center position = right edge - width/2
				const rightEdgeFromLeft = containerWidth - finalRightValue;
				return rightEdgeFromLeft - activeWidth / 2;
			}
			return containerCenter;
		};

		const finalCenterX = getFinalCenterX();

		return {
			containerCenter,
			finalCenterX,
			finalTopValue,
		};
	}, [
		isMobile,
		finalTop,
		mobileFinalTop,
		finalLeft,
		mobileFinalLeft,
		finalRight,
		mobileFinalRight,
		elementWidth,
		mobileElementWidth,
	]);

	// Use transform with function that reads directly from animationValues
	// This ensures it always uses the latest values when isMobile changes
	const xValue = useTransform(scrollProgress, latest => {
		const progress = latest;
		return (
			animationValues.containerCenter +
			(animationValues.finalCenterX - animationValues.containerCenter) * progress
		);
	});

	const yValue = useTransform(scrollProgress, latest => {
		const progress = latest;
		return animationValues.finalTopValue * progress;
	});

	// The transform functions will use the latest animationValues from closure
	// When isMobile changes, animationValues changes, component re-renders, and transforms update

	const left = useMotionTemplate`${xValue}rem`;
	const top = useMotionTemplate`${yValue}rem`;

	return (
		<motion.div
			className={className}
			style={{
				position: "absolute",
				left,
				top,
				transform: "translateX(-50%)", // Center the element on the x position
			}}
		>
			<div className={imageClassName}>
				<Image src={src} alt={alt} fill quality={100} />
			</div>
		</motion.div>
	);
};

const TheApp = () => {
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});
	const { scrollYProgress: appProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "start center"],
	});

	return (
		<div className={styles.app} ref={containerRef}>
			<div className={styles.image}>
				<Image src="/images/phones.png" alt="app" fill quality={100} />
				<AnimatedImage
					className={styles.netflix_image}
					imageClassName={styles.netflix}
					src="/images/netflix.png"
					alt="netflix"
					finalTop="-2.3rem"
					finalLeft="15.7rem"
					elementWidth={14.3}
					mobileFinalTop="-3.3rem"
					mobileFinalLeft="5rem"
					mobileElementWidth={10}
					scrollProgress={appProgress}
				/>
				<AnimatedImage
					className={styles.mtn_image}
					imageClassName={styles.mtn}
					src="/images/mtn.png"
					alt="mtn"
					finalTop="-4.3rem"
					finalRight="9.7rem"
					elementWidth={14.3}
					mobileFinalTop="-3rem"
					mobileFinalRight="6.7rem"
					mobileElementWidth={8}
					scrollProgress={appProgress}
				/>
				<AnimatedImage
					className={styles.ie_image}
					imageClassName={styles.ie}
					src="/images/ie.png"
					alt="ie"
					finalTop="14.3rem"
					finalLeft="-12rem"
					elementWidth={19.8}
					mobileFinalTop="8.3rem"
					mobileFinalLeft="-4rem"
					mobileElementWidth={9}
					scrollProgress={appProgress}
				/>
				<AnimatedImage
					className={styles.glo_image}
					imageClassName={styles.glo}
					src="/images/glo.png"
					alt="glo"
					finalTop="11.7rem"
					finalRight="-7.2rem"
					elementWidth={14.1}
					mobileFinalTop="3.7rem"
					mobileFinalRight="-3.2rem"
					mobileElementWidth={7}
					scrollProgress={appProgress}
				/>
				<AnimatedImage
					className={styles.gotv_image}
					imageClassName={styles.gotv}
					src="/images/gotv.png"
					alt="gotv"
					finalTop="29.6rem"
					finalRight="-9.5rem"
					elementWidth={20.8}
					mobileFinalTop="13.6rem"
					mobileFinalRight="-3.5rem"
					mobileElementWidth={10}
					scrollProgress={appProgress}
				/>
				<AnimatedImage
					className={styles.dstv_image}
					imageClassName={styles.dstv}
					src="/images/dstv.png"
					alt="dstv"
					finalTop="35.4rem"
					finalLeft="23.5rem"
					elementWidth={18.8}
					mobileFinalTop="15.4rem"
					mobileFinalLeft="10.5rem"
					mobileElementWidth={10}
					scrollProgress={appProgress}
				/>
			</div>
			<AnimatedSection
				ref={textRef}
				className={styles.text_container}
				scrollProgress={textProgress}
			>
				<div className={styles.title}>
					<h2>One app that takes care of it all</h2>
				</div>
				<div className={styles.text}>
					<p>
						Built for how you really move money. Simple tools, smarter
						automation, and instant access when you need it.
					</p>
				</div>
				<div className={styles.link_row}>
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
				</div>
			</AnimatedSection>
		</div>
	);
};

export default TheApp;

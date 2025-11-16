"use client";

import {
	Hero,
	Background,
	TheApp,
	Cards,
	Transactions,
	StableCoins,
	Faq,
	Kwikpik,
} from "@/components";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Home() {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			smoothWheel: true,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);
	return (
		<>
			<Hero />
			<Background />
			<TheApp />
			<Cards />
			<Transactions />
			<StableCoins />
			<Faq />
			<Kwikpik />
		</>
	);
}

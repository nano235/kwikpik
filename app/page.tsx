"use client";

import {
	Hero,
	Background,
	TheApp,
	Cards,
	Transactions,
	StableCoins,
} from "@/components/home";
import { useEffect } from "react";
import Lenis from "lenis";
import { Partners, Faq, Kwikpik } from "@/shared";

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
			<Partners />
			<TheApp />
			<Cards />
			<Transactions />
			<StableCoins />
			<Faq />
			<Kwikpik />
		</>
	);
}

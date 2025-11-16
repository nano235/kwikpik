"use client";

import { Accordion } from "@/shared";
import styles from "./Faq.module.scss";
import { useRef, useState } from "react";
import { AnimatedSection } from "../transactions/Transactions";
import { useScroll } from "framer-motion";

const faq = [
	{
		id: "1",
		title: "What is Kwikpik?",
		description:
			"Kwikpik is a smart multi-currency wallet that helps you schedule and automate bill payments, send money instantly, and store value in both fiat and stable digital dollars.",
	},
	{
		id: "2",
		title: "Is Kwikpik a bank or a crypto app?",
		description:
			"Kwikpik isn&apos;t a bank. It&apos;s a hybrid wallet that combines traditional finance and digital money, giving you access to stablecoins, fiat payments, and on/off-ramps in one place.",
	},
	{
		id: "3",
		title: "How does automated bill payment work?",
		description:
			"Set your bills once, choose your payment method, and Kwikpik schedules and pays them automatically on your behalf.",
	},
	{
		id: "4",
		title: "What are stablecoins and why does Kwikpik use them?",
		description:
			"Stablecoins are digital currencies backed by real-world assets like the US dollar. Kwikpik uses them because they are fast, stable, and ideal for secure global payments.",
	},
	{
		id: "5",
		title: "Can I use Kwikpik without owning crypto?",
		description:
			"Yes. You can use Kwikpik with your local currency, crypto is optional.",
	},
	{
		id: "6",
		title: "How safe is my money on Kwikpik?",
		description:
			"Your money is protected with industry-standard security, encryption, multi-layer authentication, and secure custody of digital assets. All fiat deposits are secured and insured by NDIC through our partnered banking providers.",
	},
	{
		id: "7",
		title: "How fast are transfers on Kwikpik?",
		description:
			"Transfers are near-instant, whether you&apos;re sending stablecoins or local currency.",
	},
	{
		id: "8",
		title: "Where can I use Kwikpik?",
		description:
			"Kwikpik works anywhere you need to pay bills, send money, or store value—locally or globally.",
	},
	{
		id: "9",
		title: "Are there any fees?",
		description:
			"Kwikpik has low, transparent fees. Some services may attract small network or processing charges.",
	},
	{
		id: "10",
		title: "How do I withdraw or cash out my funds?",
		description:
			"You can withdraw directly to your local bank or mobile money account through our secure on-ramp/off-ramp and banking partners.",
	},
];

const Faq = () => {
	const [activeAccordion, setActiveAccordion] = useState<string | number | null>(null);
	const handleToggle = (id: string | number) => {
		setActiveAccordion(activeAccordion === id ? null : id);
	};
	const textRef = useRef(null);
	const { scrollYProgress: textProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end center"],
	});
	const faqSectionRef = useRef(null);
	const { scrollYProgress: faqSectionProgress } = useScroll({
		target: faqSectionRef,
		offset: ["start end", "end center"],
	});
	return (
		<div className={styles.faq}>
			<AnimatedSection
				ref={textRef}
				className={styles.title}
				scrollProgress={textProgress}
			>
				<h2>Frequently Asked Questions</h2>
			</AnimatedSection>
			<AnimatedSection
				ref={faqSectionRef}
				className={styles.faq_section}
				scrollProgress={faqSectionProgress}
			>
				{faq.map((item, index) => (
					<Accordion
						key={item.id}
						title={item.title}
						description={item.description}
						id={item.id}
						isActive={activeAccordion === item.id}
						onToggle={handleToggle}
						className={index === faq.length - 1 ? styles.last_accordion : ""}
					/>
				))}
			</AnimatedSection>
		</div>
	);
};

export default Faq;

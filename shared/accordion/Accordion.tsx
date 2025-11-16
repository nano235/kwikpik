"use client";

import styles from "./Accordion.module.scss";
import Image from "next/image";

interface AccordionProps {
	id: string | number;
	title: string;
	description: string;
	isActive: boolean;
	onToggle: (id: string | number) => void;
	className?: string;
}

const Accordion = ({
	id,
	title,
	description,
	isActive,
	onToggle,
	className,
}: AccordionProps) => {
	const handleClick = () => {
		onToggle(id);
	};
	return (
		<div className={`${styles.accordion} ${className || ""}`} data-active={isActive}>
			<div className={styles.header} onClick={handleClick}>
				<div className={styles.text}>
					<h3>{title}</h3>
				</div>
				<div className={styles.chevron}>
					<Image src="/svgs/chevron.svg" alt="" fill sizes="100vw" />
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.text}>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default Accordion;

import Image from "next/image";
import React from "react";
import styles from "./Icon.module.scss";

interface Props {
	src?: string;
	className?: string;
	title?: string;
}

const Icon = ({ src, className, title = "" }: Props) => {
	const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	return (
		<>
			{src ? (
				<div className={`${styles.icon} ${className && className}`}>
					<Image src={src} alt={title} title={title} fill sizes="100vw" />
				</div>
			) : (
				<div
					className={`${styles.icon} ${className && className}`}
					style={{ backgroundColor: randomColor }}
				>
					<p>{title[0]}</p>
				</div>
			)}
		</>
	);
};

export default Icon;

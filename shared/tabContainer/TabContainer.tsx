"use client";

import React from "react";
import styles from "./TabContainer.module.scss";
import { Button } from "@/shared";
import { useSearchParams } from "next/navigation";
import { Queries } from "@/interfaces";
interface Props {
	handleTab: (tabId: string) => void;
}

const TabContainer = ({ handleTab }: Props) => {
	const searchParams = useSearchParams();
	const currentTab = searchParams.get("tab");

	const tabs = [
		{ id: Queries.Timeline, label: "Timeline" },
		{ id: Queries.Details, label: "Details" },
	];

	const getIndicatorPosition = () => {
		if (!currentTab || tabs.length === 0) return "0";

		const tabIndex = tabs.findIndex(tab => tab.id === currentTab);
		if (tabIndex === -1) return "0";

		const percentageWidth = 100 / tabs.length;
		return `calc(${percentageWidth * tabIndex}%)`;
	};

	return (
		<section className={styles.container}>
			<div className={styles.tabs_container}>
				<div
					className={styles.tabs_buttons}
					style={{
						gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
						width: `${tabs.length * 8.625}rem`,
					}}
				>
					{tabs.map(tab => (
						<Button
							key={tab.id}
							buttonType="transparent"
							onClick={() => handleTab(tab.id)}
							className={`${styles.tabs_button} ${
								currentTab === tab.id && styles.tabs_button__active
							}`}
						>
							{tab.label}
						</Button>
					))}

					<span
						className={styles.tabs_indicator}
						style={{
							left: getIndicatorPosition(),
							width: tabs.length > 0 ? `calc(100% / ${tabs.length})` : "0",
						}}
					></span>
				</div>
			</div>
		</section>
	);
};

export default TabContainer;

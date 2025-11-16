"use client";

import React, { useState } from "react";
import InputField from "../inputField/InputField";
import styles from "./SearchBox.module.scss";
import Button from "../button/Button";

interface Props {
	placeholder?: string;
	className?: string;
	onOptionChange: (searchTerm: string) => void;
	value?: string;
}

const SearchBox = ({
	placeholder = "Search",
	className,
	onOptionChange,
	value,
}: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = () => {
		if (value) {
			setSearchTerm("");
			onOptionChange("");
		} else {
			onOptionChange(searchTerm);
		}
	};

	return (
		<div className={`${styles.searchBox} ${className}`}>
			<InputField
				icon="/search.svg"
				onChange={e => setSearchTerm(e.target.value)}
				value={searchTerm}
				placeholder={placeholder}
				className={styles.input}
				iconPosition="prefix"
			/>
			<Button onClick={handleSearch}>{value ? "Clear" : "Search"}</Button>
		</div>
	);
};

export default SearchBox;

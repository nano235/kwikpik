"use client";

import React, { InputHTMLAttributes, useState } from "react";
import styles from "./InputField.module.scss";

import Image from "next/image";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	name?: string;
	label?: string;
	isPassword?: boolean;
	className?: string;
	iconPosition?: "prefix" | "suffix";
	prefix?: string;
	suffix?: string;
	iconTitle?: string;
	error?: string;
	description?: string;
	disabled?: boolean;
}

const InputField = ({
	name,
	type = "text",
	icon,
	label,
	className,
	isPassword,
	iconPosition = "prefix",
	prefix,
	suffix,
	iconTitle,
	description,
	error,
	disabled,
	...options
}: Props) => {
	const localType = isPassword ? (type = "password") : type;
	const [inputType, setInputType] = useState<string>(localType);
	const handleShowPassword = () => {
		if (inputType === "text") {
			setInputType("password");
		}
		if (inputType === "password") {
			setInputType("text");
		}
	};
	return (
		<div className={`${styles.input} ${className}`}>
			<div className={styles.row}>
				{!!label && (
					<label className={styles.input_label} htmlFor={name}>
						{label}
					</label>
				)}
				{description && (
					<div className={styles.icon}>
						<Image src={"/svgs/info.svg"} fill sizes="100vw" alt="" />
						<div className={styles.description}>
							<p>{description}</p>
						</div>
					</div>
				)}
			</div>

			<div className={styles.input_wrapper} data-disabled={disabled}>
				{!!icon && iconPosition === "prefix" && (
					<figure className={styles.input_icon}>
						<Image src={icon} fill sizes="100vw" title={iconTitle} alt="" />
					</figure>
				)}
				{!!prefix && <label className={styles.input_label}>{prefix}</label>}
				<input
					className={styles.input_field}
					type={inputType}
					data-icon={!!icon}
					name={name}
					autoComplete="off"
					min={0}
					{...options}
				/>
				{isPassword && (
					<div className={styles.icon} onClick={handleShowPassword}>
						<Image
							src={
								inputType !== "password"
									? "/svgs/eye.svg"
									: "/svgs/eye-off.svg"
							}
							fill
							sizes="100vw"
							alt=""
							title="password"
						/>
					</div>
				)}
				{!!icon && iconPosition === "suffix" && (
					<figure className={styles.input_icon}>
						<Image src={icon} fill sizes="100vw" alt="" title={iconTitle} />
					</figure>
				)}
				{!!suffix && (
					<label className={styles.input_label} htmlFor={name}>
						{suffix}
					</label>
				)}
			</div>
			{!!error && (
				<label className={styles.input_label} style={{ color: "#FC0000" }}>
					{error}
				</label>
			)}
		</div>
	);
};

export default InputField;

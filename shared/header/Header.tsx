"use client";

import React from "react";
import styles from "./Header.module.scss";
import Logo from "../logo/Logo";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Logo />
				<div className={styles.small_row}>
					<div className={styles.text}>
						<h5>Available on</h5>
					</div>
					<div className={styles.link_row}>
						<Link
							href="https://play.google.com/store/apps/details?id=io.kwikpik.app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className={styles.icon}>
								<Image
									src="/svgs/google-play.svg"
									alt="Google Play"
									fill
									sizes="100vw"
								/>
							</div>
						</Link>
						<Link
							href="https://apps.apple.com/us/app/kwikpik-food-grocery-bills/id6447007329"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className={styles.icon}>
								<Image
									src="/svgs/app-store.svg"
									alt="App Store"
									fill
									sizes="100vw"
								/>
							</div>
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
}

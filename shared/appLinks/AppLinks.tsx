import Link from "next/link";
import styles from "./AppLinks.module.scss";
import Image from "next/image";

interface AppLinksProps {
	type?: "dark" | "light";
}

const AppLinks = ({ type = "dark" }: AppLinksProps) => {
	return (
		<div className={styles.link_row} data-type={type}>
			<Link
				href="https://play.google.com/store/apps/details?id=io.kwikpik.app"
				target="_blank"
				rel="noreferrer"
			>
				<div className={styles.icon}>
					<Image
						src={
							type === "dark"
								? "/svgs/google-play.svg"
								: "/svgs/google-play-light.svg"
						}
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
						src={
							type === "dark"
								? "/svgs/app-store.svg"
								: "/svgs/apple-store-light.svg"
						}
						alt="app-store"
						fill
						quality={100}
						sizes="100vw"
					/>
				</div>
				<p>App Store</p>
			</Link>
		</div>
	);
};

export default AppLinks;

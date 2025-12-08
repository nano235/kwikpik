import Link from "next/link";
import styles from "./Hero.module.scss";
import Image from "next/image";

const Hero = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.text_container}>
					<div className={styles.text}>
						<h1>Move Money Globally With No Limits</h1>
						<p>
							Move money instantly across borders to friends, family, and
							businesses, all from your Kwikpik wallet.
						</p>
					</div>
					<div className={styles.link_row}>
						<Link
							href="https://play.google.com/store/apps/details?id=io.kwikpik.app"
							target="_blank"
							rel="noreferrer"
						>
							<div className={styles.icon}>
								<Image
									src="/svgs/google-play.svg"
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
									src="/svgs/app-store.svg"
									alt="app-store"
									fill
									quality={100}
									sizes="100vw"
								/>
							</div>
							<p>App Store</p>
						</Link>
					</div>
				</div>
				<div className={styles.image_container}>
					<div className={styles.phone_image__container}>
						<div className={styles.phone_image}>
							<Image
								src="/images/send-money/phone.png"
								alt="phone"
								fill
								quality={100}
								loading="eager"
								priority={true}
							/>
						</div>
					</div>
					<div className={styles.map_image__container}>
						<Image
							src="/images/send-money/map.png"
							alt="map"
							fill
							quality={100}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;

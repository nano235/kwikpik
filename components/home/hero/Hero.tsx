import Link from "next/link";
import styles from "./Hero.module.scss";
import Image from "next/image";

const Hero = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.text_container}>
					<div className={styles.text}>
						<h1>Schedule bills & Control your money.</h1>
						<p>
							Kwikpik lets you pay recurring bills automatically, send and
							receive money instantly, and manage stablecoins or fiat all
							from one wallet built for Africa’s daily life.
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
								src="/images/phone.png"
								alt="phone"
								fill
								quality={100}
								loading="eager"
								priority={true}
							/>
						</div>
						<div className={styles.usdt_container}>
							<div className={styles.usdt_image}>
								<Image src="/images/ie.png" alt="ie" fill quality={100} />
							</div>
						</div>
						<div className={styles.usdc_container}>
							<div className={styles.usdc_image}>
								<Image
									src="/images/dstv.png"
									alt="dstv"
									fill
									quality={100}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;

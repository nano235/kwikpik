import Link from "next/link";
import Logo from "../logo/Logo";
import styles from "./Footer.module.scss";
import Image from "next/image";

interface SocialMediaLink {
	label: string;
	href: string;
	icon: string;
}

const socialMediaLinks: SocialMediaLink[] = [
	{
		label: "instagram",
		href: "https://instagram.com/kwikpik.io",
		icon: "/svgs/insta.svg",
	},
	{
		label: "facebook",
		href: "https://facebook.com/kwikpik.io",
		icon: "/svgs/facebook.svg",
	},
	{
		label: "tiktok",
		href: "https://www.tiktok.com/@kwikpik.io",
		icon: "/svgs/tiktok.svg",
	},
	{
		label: "x",
		href: "https://x.com/kwikpikapp",
		icon: "/svgs/x.svg",
	},
	{
		label: "youtube",
		href: "https://youtube.com/@kwikpik",
		icon: "/svgs/youtube.svg",
	},
	{
		label: "linkedin",
		href: "https://www.linkedin.com/company/kwikpikapp",
		icon: "/svgs/linkedin.svg",
	},
];

const links = [
	{
		title: "Company",
		links: [
			{
				label: "About",
				href: "/about",
			},
			{
				label: "Careers",
				href: "/careers",
			},
			{
				label: "Blog",
				href: "/blog",
			},
			{
				label: "Privacy Policy",
				href: "/privacy",
			},
		],
	},
	{
		title: "Solutions",
		links: [
			{
				label: "Logistics",
				href: "/logistics",
			},
			{
				label: "Send & Receive Money Globally",
				href: "/send-money",
			},
			{
				label: "Multi-Wallet Account",
				href: "/wallet",
			},
		],
	},
];

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<footer className={styles.footer}>
			<div className={styles.footer_body}>
				<div className={styles.column}>
					<div className={styles.footer_logo}>
						<Logo />
					</div>
					<div className={styles.copyright}>
						<div className={styles.text}>
							<p>© {year} Kwikpik. All Rights Reserved.</p>
						</div>
					</div>
					<div className={styles.footer_socials}>
						{socialMediaLinks.map((social, index) => (
							<Link
								href={social.href}
								target="_blank"
								rel="noreferrer"
								key={index}
								className={styles.icon}
							>
								<Image
									src={social.icon}
									alt={social.label}
									fill
									sizes="100vw"
								/>
							</Link>
						))}
					</div>
					<div className={styles.hedera_logo}>
						<Image
							src="/images/hedera-logo.png"
							alt="Hedera"
							fill
							sizes="100vw"
						/>
					</div>
				</div>
				{links.map((link, index) => (
					<div className={styles.column} key={index}>
						<div className={styles.links}>
							<h3>{link.title}</h3>
							<ul>
								{link.links.map((link, index) => (
									<li key={index}>
										<Link href={link.href}>{link.label}</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</footer>
	);
};

export default Footer;

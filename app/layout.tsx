import "@/styles/index.scss";
import type { Metadata, Viewport } from "next";
import Header from "@/shared/header/Header";
import Footer from "@/shared/footer/Footer";

// Base URL for social media images - update this with your production domain
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kwikpik.io";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#564cd8" },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Kwikpik | The Chill Way to Pay Bills Anytime",
		template: "%s | Kwikpik",
	},
	description:
		"Never miss a bill with Kwikpik. Pay, schedule and automate essentials anytime with fiat or stablecoins. The easiest way to manage your bills and transfers in Africa.",
	keywords: [
		"bill payment",
		"money transfer",
		"digital wallet",
		"stablecoins",
		"Africa payments",
		"automated bills",
		"fiat payments",
		"crypto payments",
		"Kwikpik",
		"financial services",
	],
	authors: [{ name: "Kwikpik" }],
	creator: "Kwikpik",
	publisher: "Kwikpik",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: baseUrl,
		siteName: "Kwikpik",
		title: "Kwikpik | The Chill Way to Pay Bills Anytime",
		description:
			"Never miss a bill with Kwikpik. Pay, schedule and automate essentials anytime with fiat or stablecoins. The easiest way to manage your bills and transfers in Africa.",
		images: [
			{
				url: "/images/social.png",
				width: 1200,
				height: 630,
				alt: "Kwikpik - The Chill Way to Pay Bills Anytime",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Kwikpik | The Chill Way to Pay Bills Anytime",
		description:
			"Never miss a bill with Kwikpik. Pay, schedule and automate essentials anytime with fiat or stablecoins.",
		images: ["/images/social.png"],
		creator: "@kwikpik",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		// google: "your-google-verification-code",
	},
	alternates: {
		canonical: baseUrl,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}

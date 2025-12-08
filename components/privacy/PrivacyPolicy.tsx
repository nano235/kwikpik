"use client";

import styles from "./PrivacyPolicy.module.scss";
import { Button } from "@/shared";

const PrivacyPolicy = () => {
	return (
		<div className={styles.privacy}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Button buttonType="secondary" className={styles.badge}>
						Privacy Policy
					</Button>
					<h1>We Respect Your Privacy</h1>
					<p className={styles.date}>
						A clear breakdown of what data we collect and how we use it to
						keep Kwikpik safe and reliable. <span>Updated 3rd dec, 2025</span>
					</p>
				</div>

				<div className={styles.content}>
					<div className={styles.section}>
						<h2>General</h2>
						<p className={styles.general}>
							Kwikpik (“we,” “our,” or “us”) is committed to protecting your
							privacy and safeguarding your personal information. This
							Privacy Policy explains how we collect, use, share, and
							protect your data when you use any Kwikpik product or service
							— including our fintech wallet, bill payments, transfers,
							digital assets, marketplace, merchant tools, and logistics
							services. By using Kwikpik, you agree to the practices
							described in this policy.
						</p>
					</div>

					<div className={styles.section}>
						<h2>1. Information We Collect</h2>

						<div className={styles.subsection}>
							<h3>a. Personal Information</h3>
							<p>We may collect:</p>
							<ul>
								<li>Full name</li>
								<li>Email address</li>
								<li>Phone number</li>
								<li>Date of birth</li>
								<li>Residential address</li>
								<li>Government-issued ID</li>
								<li>BVN or other identification data (for KYC)</li>
							</ul>
							<p>
								This information is required to verify your identity and
								comply with financial regulations.
							</p>
						</div>

						<div className={styles.subsection}>
							<h3>b. Financial Information</h3>
							<p>We collect information related to:</p>
							<ul>
								<li>Wallet Balances</li>
								<li>Transaction history</li>
								<li>Bill payments</li>
								<li>Transfers</li>
								<li>Digital asset holdings</li>
								<li>Conversions and settlements</li>
							</ul>
							<p>We do not store your bank login credentials.</p>
						</div>

						<div className={styles.subsection}>
							<h3>c. Device & Usage Information</h3>
							<ul>
								<li>Device type and operating system</li>
								<li>IP address</li>
								<li>App activity and interaction logs</li>
								<li>Crash reports and diagnostics</li>
							</ul>
						</div>

						<div className={styles.subsection}>
							<h3>d. Location Data</h3>
							<p>
								With your permission, we may collect approximate or
								precise location data to enable:
							</p>
							<ul>
								<li>Bill payments</li>
								<li>Marketplace services</li>
								<li>Logistics and delivery</li>
								<li>Fraud prevention</li>
							</ul>
						</div>

						<div className={styles.subsection}>
							<h3>e. Communications</h3>
							<ul>
								<li>Support requests</li>
								<li>Emails</li>
								<li>In app messages</li>
								<li>Feedback submissions</li>
							</ul>
						</div>
					</div>

					<div className={styles.section}>
						<h2>2. How We Use Your Information</h2>
						<p>We use your information to:</p>
						<ul>
							<li>Create and manage kwikpik account</li>
							<li>Verify identity (KYC & compliance)</li>
							<li>Power wallet services, transfers, and bill payments</li>
							<li>Enable digital asset services and conversions</li>
							<li>Facilitate marketplace and logistics operations</li>
							<li>Prevent fraud and unauthorized activity</li>
							<li>Improve product performance and reliability</li>
							<li>Communicate important updates and service notices</li>
							<li>Comply with legal and regulatory obligations</li>
						</ul>
					</div>

					<div className={styles.section}>
						<h2>3. How We Share Your Information</h2>
						<p style={{ marginBottom: "2.4rem" }}>
							We only share data when necessary and responsibly.
						</p>
						<div className={styles.subsection}>
							<h3>a. Service Providers</h3>
							<p>
								We share limited information with trusted partners who
								help us with:
							</p>
							<ul>
								<li>Payment processing</li>
								<li>Identity verification</li>
								<li>Fraud prevention</li>
								<li>Cloud infrastructure</li>
								<li>Analytics and customer support</li>
							</ul>
							<p>All partners are required to protect your data.</p>
						</div>

						<div className={styles.subsection}>
							<h3>b. Legal & Regulatory Disclosure</h3>
							<p>We may disclose information when required by:</p>
							<ul>
								<li>Law enforcement</li>
								<li>Court orders</li>
								<li>Financial regulators</li>
								<li>Anti-money laundering (AML) obligations</li>
							</ul>
						</div>

						<div className={styles.subsection}>
							<h3>c. Business Transfers</h3>
							<p>
								If Kwikpik is involved in a merger, acquisition, or asset
								sale, your data may be transferred as part of the
								transaction.
							</p>
						</div>
					</div>

					<div className={styles.section}>
						<h2>4. Your Rights & Choices</h2>
						<p>You have the right to:</p>
						<ul>
							<li>Access personal information</li>
							<li>Correct incorrect data</li>
							<li>
								Request data deletion (subject to regulatory retention
								requirements)
							</li>
							<li>Control marketing communication preferences</li>
							<li>Withdraw consent for certain data uses</li>
						</ul>
						<p>
							Requests can be sent to:{" "}
							<a href="mailto:support@kwikpik.co">support@kwikpik.co</a>
						</p>
					</div>

					<div className={styles.section}>
						<h2>5. Data Security</h2>
						<p>We use industry-standard security practices including:</p>
						<ul>
							<li>Bank-grade encryption</li>
							<li>Secure servers</li>
							<li>Multi-layer access control</li>
							<li>Transaction monitoring</li>
							<li>Regular system audits</li>
						</ul>
						<p>
							However, no digital system is completely risk-free. We
							continuously improve our safeguards to reduce all risks.
						</p>
					</div>

					<div className={styles.section}>
						<h2>6. Digital Assets & Blockchain Data</h2>
						<p>
							Certain Kwikpik transactions may occur on public blockchain
							networks. Blockchain records are public and immutable, meaning
							transaction data may be visible but is not directly tied to
							your real-world identity unless required by law.
						</p>
					</div>

					<div className={styles.section}>
						<h2>7. Data Retention</h2>
						<p>We retain your information as long as:</p>
						<ul>
							<li>Your account remains active</li>
							<li>Required for legal and financial compliance</li>
							<li>Necessary to resolve disputes and enforce agreements</li>
						</ul>
					</div>

					<div className={styles.section}>
						<h2>8. International Data Transfers</h2>
						<p>
							Your information may be processed outside your country of
							residence where our infrastructure or partners operate. We
							ensure all transfers meet applicable data protection
							standards.
						</p>
					</div>

					<div className={styles.section}>
						<h2>9. Third-Party Services</h2>
						<p>
							Kwikpik may link to third-party platforms (banks, merchants,
							logistics providers). We are not responsible for their privacy
							practices and encourage you to review their policies
							separately.
						</p>
					</div>

					<div className={styles.section}>
						<h2>10. Updates to This Policy</h2>
						<p>
							We may update this Privacy Policy periodically. Any changes
							will be communicated via any of the following:
						</p>
						<ul>
							<li>Our website</li>
							<li>The mobile app</li>
							<li>Email notifications</li>
						</ul>
						<p>
							Continued use of kwikpik after updates means you accept the
							revised policy.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;

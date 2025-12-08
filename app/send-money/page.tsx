import { StableCoins } from "@/components/home";
import { Hero, Background, Capabilities, Security, Works } from "@/components/sendMoney";
import { Kwikpik } from "@/shared";

export default function SendMoney() {
	return (
		<>
			<Hero />
			<Background />
			<Capabilities />
			<Works />
			<Security />
			<StableCoins />
			<Kwikpik />
		</>
	);
}

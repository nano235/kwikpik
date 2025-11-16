export function formatPhoneNumber(
	phoneNumber: string,
	defaultCountryCode: number,
): string {
	if (!phoneNumber) return "";
	// Remove all non-digit characters, but keep leading plus if present
	const cleanedPhoneNumber = phoneNumber.replace(/(?<=^\+)|\D+/g, "");

	// Check if the phone number already starts with a plus sign (indicating it has a country code)
	if (phoneNumber.startsWith("+")) {
		return phoneNumber;
	}

	// Remove leading zero if present
	const formattedPhoneNumber = cleanedPhoneNumber.startsWith("0")
		? cleanedPhoneNumber.substring(1)
		: cleanedPhoneNumber;

	// Add default country code if no country code is present
	const finalPhoneNumber = `+${defaultCountryCode}${formattedPhoneNumber}`;

	return finalPhoneNumber;
}

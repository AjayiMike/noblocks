import JSEncrypt from "jsencrypt";
import { InstitutionProps } from "./types";

/**
 * Retrieves the institution name based on the provided institution code.
 *
 * @param code - The institution code.
 * @returns The institution name associated with the provided code, or undefined if not found.
 */
export function getInstitutionNameByCode(
  code: string,
  supportedInstitutions: InstitutionProps[],
): string | undefined {
  const institution = supportedInstitutions.find((inst) => inst.code === code);
  return institution ? institution.name : undefined;
}

/**
 * Formats a number with commas.
 *
 * @param num - The number to format.
 * @returns The formatted number as a string.
 */
export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Formats a number as a currency string.
 *
 * @param value - The number to format.
 * @param currency - The currency code to use.
 * @param locale - The locale to use.
 * @returns The formatted currency string.
 */
export const formatCurrency = (
  value: number,
  currency: string = "NGN",
  locale: string = "en-NG",
) => {
  // Create a new instance of Intl.NumberFormat with the 'en-US' locale and currency set to 'NGN'.
  // This object provides methods to format numbers based on the specified locale and options.
  return new Intl.NumberFormat(locale, {
    // Set the style to 'currency' to format the number as a currency value.
    style: "currency",
    // Set the currency to 'NGN' to format the number as Nigerian Naira.
    currency,
  }).format(value); // Format the provided value as a currency string.
};

/**
 * Encrypts data using the provided public key.
 * @param data - The data to be encrypted.
 * @param publicKeyPEM - The public key in PEM format.
 * @returns The encrypted data as a base64-encoded string.
 */
export function publicKeyEncrypt(data: any, publicKeyPEM: string): string {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKeyPEM);

  const encrypted = encrypt.encrypt(JSON.stringify(data));
  if (encrypted === false) {
    throw new Error("Failed to encrypt data");
  }

  return encrypted;
}

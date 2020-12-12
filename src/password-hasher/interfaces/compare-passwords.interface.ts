export interface ComparePasswordsPayload {
    providedPass: string;
    storedPass: string;
    salt: string;
}

export const b64EncodeUnicode = (str: string): string =>
    Buffer.from(str).toString('base64');

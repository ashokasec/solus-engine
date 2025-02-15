export const encodeToBase64 = (data: string): string => {
    return Buffer.from(data).toString('base64');
};

export const decodeFromBase64 = (base64Data: string): string => {
    return Buffer.from(base64Data, 'base64').toString('utf-8');
};
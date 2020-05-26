export const cleanInput = (value, isLower) => {
    var cleaned = value && value.trim()
    if (isLower && cleaned) {
        cleaned = cleaned.toLowerCase();
    }
    return cleaned;
}
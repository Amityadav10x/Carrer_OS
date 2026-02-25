/**
 * Formats a number as a percentage string.
 */
export const formatPercent = (value: number): string => {
    return `${Math.round(value)}%`;
};

/**
 * Formats a number with comma separators.
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat().format(value);
};

/**
 * Capitalizes the first letter of a string.
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates text with ellipsis.
 */
export const truncate = (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

/**
 * Convert nested object to flat object.
 */
export const flatten = ((nestedMessages: Record<string, string | Record<string, any>>, prefix = "") => {
    if (nestedMessages === null) {
        return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key: string) => {
        const value = nestedMessages[key]
        const prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === "string") {
            Object.assign(messages, { [prefixedKey]: value })
        } else {
            Object.assign(messages, flatten(value, prefixedKey))
        }

        return messages
    }, {})
})

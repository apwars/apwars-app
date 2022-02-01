export default function walletTruncate(wallet) {
    if (!wallet) {
        return '';
    }
    return `${wallet.substring(0,5)}...${wallet.substring(wallet.length - 3, wallet.length)}`
}
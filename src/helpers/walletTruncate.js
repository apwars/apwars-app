export default function walletTruncate(wallet, length = 5) {
    if (!wallet) {
        return '';
    }
    return `${wallet.substring(0, length)}...${wallet.substring(wallet.length - length, wallet.length)}`
}
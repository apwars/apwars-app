export default function walletTruncate(wallet) {
    return `${wallet.substring(0,5)}...${wallet.substring(wallet.length - 3, wallet.length)}`
}
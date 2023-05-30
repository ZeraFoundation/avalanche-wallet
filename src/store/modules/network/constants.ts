import { AvaNetwork } from '@/js/AvaNetwork'

export const TestnetConfig = new AvaNetwork(
    'Mainnet',
    'https://api.avax.network:443',
    1,
    'https://explorerapi.avax.network',
    'https://explorer-xp.avax.network',
    true
)

export const MainnetConfig = new AvaNetwork(
    'Fuji',
    'https://testnet.zera.vision:443',
    5,
    undefined,
    undefined,
    true
)

import { KeyChain as AVMKeyChain, AVMAPI } from 'avalanche/dist/apis/avm'
import { InfoAPI } from 'avalanche/dist/apis/info'
import Avalanche, { BN } from 'avalanche'
//@ts-ignore
import BinTools from 'avalanche/dist/utils/bintools'
import { EVMAPI } from 'avalanche/dist/apis/evm'
import {
    CChainAlias,
    CChainVMName,
    CENTIAVAX,
    Defaults,
    GWEI,
    MILLIAVAX,
    NetworkIDToHRP,
    ONEAVAX,
    PChainAlias,
    PChainVMName,
    PlatformChainID,
    XChainAlias,
    XChainVMName,
} from 'avalanche/dist/utils'

// Connect to TestNet by default
// Doesn't really matter how we initialize, it will get changed by the network module later
const ip: string = 'bootstrap.ava.network'
const port: number = 21000
const protocol: string = 'https'
const network_id: number = 2
const chain_id: string = 'X'
const bintools: BinTools = BinTools.getInstance()
const ava: Avalanche = new Avalanche(ip, port, protocol, network_id, chain_id)

const avm: AVMAPI = ava.XChain()
const cChain: EVMAPI = ava.CChain()
const pChain = ava.PChain()
const infoApi: InfoAPI = ava.Info()
const keyChain: AVMKeyChain = avm.keyChain()

const avaxAssetID = '2ZP7mbuaZBqn6QXz7ymg8trKE8HLjBsVQhmwmxhbHAjCSPycsw'
const n5X = {
    blockchainID: 'iuAUWbSptoBwDA4iQZWeMsZ9LwR5JqNMrgb95uDNJXvwZEu95',
    avaxAssetID: avaxAssetID,
    alias: XChainAlias,
    vm: XChainVMName,
    txFee: MILLIAVAX,
    creationTxFee: CENTIAVAX,
    mintTxFee: MILLIAVAX,
}

const n5C = {
    blockchainID: '2ricquuEFnADgiFQdkhdViHizGPjtebDZbJgosohpEjcvtzQRf',
    alias: CChainAlias,
    vm: CChainVMName,
    txBytesGas: 1,
    costPerSignature: 1000,
    // DEPRECATED - txFee
    // WILL BE REMOVED IN NEXT MAJOR VERSION BUMP
    txFee: MILLIAVAX,
    // DEPRECATED - gasPrice
    // WILL BE REMOVED IN NEXT MAJOR VERSION BUMP
    gasPrice: GWEI.mul(new BN(225)),
    minGasPrice: GWEI.mul(new BN(25)),
    maxGasPrice: GWEI.mul(new BN(1000)),
    chainID: 43113,
}

const n5P = {
    blockchainID: PlatformChainID,
    avaxAssetID: avaxAssetID,
    alias: PChainAlias,
    vm: PChainVMName,
    txFee: MILLIAVAX,
    creationTxFee: CENTIAVAX,
    createSubnetTx: ONEAVAX,
    createChainTx: ONEAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new BN(31536000),
    maxSupply: new BN(720000000).mul(ONEAVAX),
    minStake: ONEAVAX,
    minStakeDuration: 24 * 60 * 60, //one day
    maxStakeDuration: 365 * 24 * 60 * 60, // one year
    minDelegationStake: ONEAVAX,
    minDelegationFee: new BN(2),
}

const testNetNetworkProfile = { ...Defaults.network[5] }
testNetNetworkProfile.X

Defaults.network = {
    1: Defaults.network[1],
    12345: Defaults.network[12345],
    5: {
        hrp: (NetworkIDToHRP as any)[5],
        X: n5X,
        iuAUWbSptoBwDA4iQZWeMsZ9LwR5JqNMrgb95uDNJXvwZEu95: n5X,
        P: n5P,
        '11111111111111111111111111111111LpoYY': n5P,
        C: n5C,
        '2ricquuEFnADgiFQdkhdViHizGPjtebDZbJgosohpEjcvtzQRf': n5C,
    },
}

console.log('Defaults', Defaults.network)

function isValidAddress(addr: string) {
    try {
        const res = bintools.stringToAddress(addr)
        return true
    } catch (err) {
        return false
    }
}

export { ava, avm, pChain, cChain, infoApi, bintools, isValidAddress, keyChain }

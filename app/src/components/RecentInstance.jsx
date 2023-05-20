import shortenAddress from "../utils/shortenAddress"
import { readContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useEffect, useState } from "react"
import { escrowContract } from '../escrow' 
import copyIcon from '../assets/icons/copy-icon.png'

export default function RecentInstances() {
    const { address, isConnected, isDisconnected } = useAccount()
    const [InstanceIds, setInstanceIds] = useState()

    useEffect(()=>{
        let isOk = true;
        
       async function getHistory(){
        if(!isConnected) return setInstanceIds()

        const data = await readContract({
            address: escrowContract.constractAddress,
            abi: escrowContract.abi,
            functionName: 'getHistory',
            args: [`${address}`]
        })

        setInstanceIds(data?.InstanceIds.slice(-3).toReversed())
       }

       isOk && getHistory()

       return () => {
        isOk = false;
       }

    }, [address, isConnected, isDisconnected])

    return(<>
    <div className="contract">
    <h1> Recent Instances </h1>
    
    <div className="history-list">
        { InstanceIds && InstanceIds.map((item)=><div className="instance-list-item" key={item} title={item} >{shortenAddress(item)} <div className="copy-button" onClick={() => {navigator.clipboard.writeText(item)}}> <img src={copyIcon} alt="copy" /> </div></div>) }
    </div>

    </div>
    </>)
}
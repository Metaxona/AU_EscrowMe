import TradeForm from '../components/TradeForm'
import History from '../components/History'
import InstanceInteraction from '../components/InstanceInteraction'
import RecentInstances from '../components/RecentInstance'

export default function DApp(){
   

    return(<div className='app-body'>
    <TradeForm />
    <InstanceInteraction />
    <RecentInstances />
    <History />
    </div>)
}
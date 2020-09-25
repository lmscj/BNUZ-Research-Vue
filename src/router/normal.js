import PreEntry from '@/pages/Normal/PreEntry/index'
import PersonIndex from '@/pages/Normal/Index/index'
import AlrEntry from '@/pages/Normal/AlrEntry/index'
import ResetPwd from '@/pages/Normal/ResetPwd/index'
import Information from '@/pages/Normal/Information/index'
import ResetPhone from '@/pages/Normal/ResetPhone/index'
import Address from '@/pages/Normal/Address/index'
import Settled from '@/pages/Normal/Settled/index'
import SettledDetails from '@/pages/Normal/SettledDetails/index'
import SettledModifty from '@/pages/Normal/SettledModifty/index'
const normalRoutes = [
    {
        path : '/normal' , component : PersonIndex, children:[
            {path : 'pre-entry' , component : PreEntry},
            {path : 'alr-entry' , component : AlrEntry},
            {path : 'reset-pwd' ,component : ResetPwd},
            {path : 'dashboard' , component : Information},
            {path : '/' , redirect: 'dashboard'},
            {path : 'address' , component : Address},
            {path : 'reset-phone' , component : ResetPhone},
            {path : 'settled' , component : Settled},
            {path : 'settled/:id' , component : SettledDetails},
            {path : 'settled-modifty/:id' , component : SettledModifty},
        ]
    }
]

export default normalRoutes

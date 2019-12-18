import Index from '@/pages/Admin/Index/index'
import index from "@/pages/index";
import Home from '@/pages/Admin/Home/index'
import TabsManager from '@/pages/Admin/TabsManager/index'
import AuditPendingList from '@/pages/Admin/AuditPendingList/index'
import AuditPendingDetail from '@/pages/Admin/AuditPendingDetail/index'
import AccountsManager from '@/pages/Admin/AccountsManager/index'
import Organization from "@/pages/organization/Organization";


const adminRoutes = [
    {
        path: '/',
        component: index,
        children: [
            {path: 'home', component: Organization},
        ]
    },
    {path: '/admin', component: Index, children: [
        {path: '/', redirect: 'dashboard'},
        {path: 'dashboard', component: Home},
        {path: 'tabs', component: TabsManager},
        {path: 'audit-pending', component: AuditPendingList},
        {path: 'audit-pending/:id', component: AuditPendingDetail},
        {path: 'accounts', component: AccountsManager},
    ]
    }
]

export default adminRoutes
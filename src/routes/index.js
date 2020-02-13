import ExistingPools from '../components/UI/ExistingPools'
import AddRemoveLiquidity from '../components/UI/AddRemoveLiquidity'
import Conversions from '../components/UI/Conversions'
import Create from '../components/UI/CreatePool'

import vueRouter from 'vue-router'
import vue from 'vue'

vue.use(vueRouter)
export default new vueRouter({
    routes: [
        {
            path: "/",
            redirect: "addremove"
        },
        {
            path: "/addremove",
            name: "AddRemove",
            component: AddRemoveLiquidity
        },
        {
            path: "/existing",
            name: "Existing",
            component: ExistingPools
        },
        {
            path: "/conversions",
            name: "Conversions",
            component: Conversions
        },
        {
            path: "/create",
            name: "Create",
            component: Create
        }
    ],
    mode: 'abstract',
    linkActiveClass: 'active'
})
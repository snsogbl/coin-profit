import index from '@/components/conf/index/index.vue'
export default [
    {
        path: '/index',
        redirect: '/index/coin',
        component: index,
        name: '探测利率',
        iconCls: '&#xe638;',
        children: [
            {
                path: 'coin',
                component: resolve =>
                    require([
                        '@/components/conf/coin/index.vue'
                    ], resolve),
                name: '探测利率',
                iconCls: '&#xe638;'
            }
        ]
    }
]

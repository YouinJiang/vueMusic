import Vue from 'vue'
import Router from 'vue-router'
import Recomended from '@/components/Recomended'
import count from '@/components/count'
import searchList from '@/components/searchList'
import singer from '@/components/singer'
import album from '@/components/album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recomended',
      component: Recomended
    },
    {
      path: '/count',
      name: 'count',
      component: count
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: searchList
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/album',
      name: 'album',
      component: album
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

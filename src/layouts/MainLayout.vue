<template>
  <q-layout view="hHh lpR Lpr fFf">
    <q-header elevated>
      <q-toolbar>
      

        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

      
      </q-toolbar>
    </q-header>

      <q-footer>
        <q-toolbar>
        <q-tabs class="absolute-center" 
    
      >
     
        <q-route-tab  :key ="index" v-for="(tab,index) in essentialLinks" :to="tab.link" :icon="tab.icon" :label="tab.title" />
   
       
      </q-tabs>
        </q-toolbar>
      </q-footer>


    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      show-if-above
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-3"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
      
          />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Todo',
    caption: '',
    icon: 'list',
    link: '/'
  },
    {
    title: 'Settings',
    caption: '',
    icon: 'settings',
    link: '/settings'
  }
  
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
.q-footer{
  display: none;
}
}
.q-drawer{
   .q-router-link--exact-active {
  color: white !important;
}
}
</style>
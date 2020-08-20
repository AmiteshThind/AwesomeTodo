<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

      
      </q-toolbar>
    </q-header>

      <q-footer>
        <q-toolbar>
        <q-tabs
    
      >
        <q-route-tab :key ="index" v-for="(tab,index) in essentialLinks" :to="tab.link" :icon="tab.icon" :label="tab.title" />
       
       
      </q-tabs>
        </q-toolbar>
      </q-footer>


    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
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

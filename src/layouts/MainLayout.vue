<template>
  <q-layout view="hHh lpR Lpr fFf" class="my-font bg-color ">
    <q-header elevated class="q-pa-sm bg-primary"  >

      <q-toolbar >
      <q-btn flat dense round @click="leftDrawerOpen=!leftDrawerOpen">
        <q-icon name="menu" />
      </q-btn>

        <q-toolbar-title class="absolute-center text-h3  ">
          ToDoIt
        </q-toolbar-title>

      <q-btn v-if="!loggedIn" to="/auth" flat color="bg-white" icon-right="account_circle" label ="Login" class="absolute-right" />
      <q-btn v-else to="/auth" flat color="bg-white" icon-right="account_circle" label ="Logout" @click="logoutUser" class="absolute-right" />

      
      </q-toolbar>
    </q-header>




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
          class="text-white"
          
        >
         <span class=" text-h6"> Navigation</span>
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
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

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
  },
  computed:{
    ...mapState('auth',['loggedIn'])
  },
  methods:{
    ...mapActions('auth',['logoutUser'])
  }
}
</script>

<style lang="scss" scoped>

.q-drawer{
   .q-router-link--exact-active {
  color: white !important;
}}

.bg-color{
  background-color: #ffffff;
}

</style>
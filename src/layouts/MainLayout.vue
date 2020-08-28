<template>
  <q-layout view="hHh lpR Lpr fFf" class="my-font bg-color ">
    <q-header elevated class=" bg-primary"  >

      <q-toolbar >
      <q-btn flat dense round @click="leftDrawerOpen=!leftDrawerOpen">
        <q-icon name="menu" />
      </q-btn>

        <q-toolbar-title class="absolute-center text-h4 ">
          ToDoIt
        </q-toolbar-title>

      <q-btn v-if="!loggedIn"  dense to="/auth" flat color="bg-white" icon-right="account_circle" label ="Login" class="absolute-right" />
      <q-btn v-else to="/auth" flat dense color="bg-white" icon-right="account_circle" label ="Logout" @click="logoutUser" class="absolute-right" />

      
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
          <q-item 
          v-if="$q.platform.is.electron"
          @click="quitApp"
    clickable
    tag="a"
    :to="link"
    exact
    class="text-grey-4 absolute-bottom"
  >
    <q-item-section
     
      avatar
    >
      <q-icon name="power_settings_new" />
    </q-item-section>

    <q-item-section>
      <q-item-label>Quit</q-item-label>
    </q-item-section>
  </q-item>
          
          
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
    ...mapActions('auth',['logoutUser']),
    quitApp(){
       this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to quit ToDoIt?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if(this.$q.platform.is.electron){
      require('electron').ipcRenderer.send('quit-app'); 
        } // sedning event to main proccess
    }
      )}}
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

.platform-ios{
  .q-header{
/* for your app's header */
padding-top: constant(safe-area-inset-top); // for iOS 11.0
padding-top: env(safe-area-inset-top); // for iOS 11.2 +

  }
  .q-footer{
    /* for your app's footer */
padding-bottom: constant(safe-area-inset-bottom);
padding-bottom: env(safe-area-inset-bottom);
  }
}

</style>
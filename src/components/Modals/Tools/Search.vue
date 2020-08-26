<template>
  <q-input @keyup.esc="searchField = '' " class="col" bottom-slots  outlined v-model="searchField" label="Search" >
        
        <template v-slot:append>
          <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

      </q-input>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
export default {
data(){
    return{
        
    }
},
methods: {
    ...mapActions('tasks',['setSearch'])
},
computed:{
    ...mapState('tasks',['search']),
    searchField:{
        get(){
            return this.search
        },
        set(value){
            this.setSearch(value);
        }
       
    }
}
}
</script>

<style>

</style>
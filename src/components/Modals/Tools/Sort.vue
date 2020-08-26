<template>
 
<q-select map-options emit-value filled v-model="sortBy"  class="q-ml-sm col" :options="options" label="Sort by" stack-label />
 
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
 data () {
    return {
    

      options: [
        {
            label:'Name',
            value:'name'
        },
        {
            label:'Date',
            value:'dueDate'
        }
      ]
    }
 },
  computed:{
      ...mapState('tasks',['sort']),
      sortBy:{
          get(){
              return this.sort
          },
          set(value){
              this.setSort(value)
          }
      }
  },
  methods:{
      ...mapActions('tasks',['setSort'])
  }

}
</script>

<style scoped>
 
</style>
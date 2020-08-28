<template>
 <div class="my-font">
<q-select map-options emit-value filled v-model="sortBy"  class="q-ml-sm col my-font" :options="options"   label="Sort by" stack-label />
 </div>
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
 .q-select{
     flex: 0 0 100px;
 }
</style>
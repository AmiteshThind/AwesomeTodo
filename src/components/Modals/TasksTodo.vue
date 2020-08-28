<template>
<transition
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut absolute-top"
     

>
<div  >
  <list-header v-if="!settings.showTasksInOneList"  bgColor="bgColor"><span class="text-h4">Tasks</span></list-header>
   <q-list separator bordered>
   <task
     v-for="(task,key) in tasksTodo"
     :key="key"
     :task='task'
     :id="key" />
 </q-list>
 </div>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import Task from 'components/Tasks/Task'
import ListHeader from 'components/Modals/Shared/ListHeader'

export default {

    props:['tasksTodo'],
    components:{
        'task':Task,
        'list-header' :ListHeader
    },
    computed:{
        ...mapGetters('settings',['settings']),
    }
}
</script>

<style>
.bgColor{
    background-color:#f5ce7a
}
</style>
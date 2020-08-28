<template>
<transition
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut"
>
<div :class="{'q-mt-lg':!settings.showTasksInOneList}" >
   <list-header v-if="!settings.showTasksInOneList" bgColor="bgColor" > <span  class="text-h4">Completed </span></list-header>
    <q-list  separator bordered>
   <task
     v-for="(task,key) in tasksCompleted"
     :key="key"
     :task='task'
     :id="key" />
 </q-list>
 </div>
</transition>
</template>

<script>
import Task from 'components/Tasks/Task'
import ListHeader from 'components/Modals/Shared/ListHeader'
import {mapGetters} from 'vuex'
export default {
    props:['tasksCompleted'],
    components:{
        'task':Task,
        'listHeader':ListHeader
    },
    computed:{
        ...mapGetters('settings',['settings'])
    }
}
</script>

<style scoped>
.bgColor{
    background-color:#91ce89
}
</style>
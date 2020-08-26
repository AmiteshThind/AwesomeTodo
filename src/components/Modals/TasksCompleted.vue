<template>
<transition
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut"
>
<div class="q-mt-lg" v-if="Object.keys(tasksCompleted).length">
   <list-header bgColor="bg-green-4" >Completed</list-header>
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
export default {
    props:['tasksCompleted'],
    components:{
        'task':Task,
        'listHeader':ListHeader
    }
}
</script>

<style>

</style>
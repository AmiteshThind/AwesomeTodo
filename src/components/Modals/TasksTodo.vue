<template>
<div >
  <list-header bgColor="bg-orange-4">Todo</list-header>
   <q-list separator bordered>
   <task
     v-for="(task,key) in tasksTodo"
     :key="key"
     :task='task'
     :id="key" />
 </q-list>
 </div>
</template>

<script>

import Task from 'components/Tasks/Task'
import ListHeader from 'components/Modals/Shared/ListHeader'
export default {

    props:['tasksTodo'],
    components:{
        'task':Task,
        'list-header' :ListHeader
    }
}
</script>

<style>

</style>
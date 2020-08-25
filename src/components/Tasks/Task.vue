<template>
  <q-item
        
        
      @click="updateTask({ id: id, updates: { completed: !task.completed } })"
        :class="{'bg-green-3':task.completed, 'bg-amber-1 ':!task.completed}"
       clickable
         >
        <q-item-section side top  >
          <q-checkbox :value="task.completed" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>  
          <q-item-label :class="{'text-strikethrough': task.completed}">{{task.name}}</q-item-label>
        </q-item-section>
        <q-item-section side >
      <div class="row">
        <div class="column justify-center">
          <q-icon v-if="task.dueDate" class="q-mr-sm"  name="event" size="20px" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end" >{{task.dueDate}}</q-item-label>
          <small><q-item-label class="row justify-end" caption >{{task.dueTime}}</q-item-label></small>
        </div>  
      </div>
        </q-item-section>

        <q-item-section side>
          <div class="row">
             <q-btn @click.stop="showEditTask = true" flat dense round color="primary" icon="edit" />
            <q-btn @click.stop="promptToDelete(id)" flat dense round color="secondary" icon="delete" />            
            </div>
        </q-item-section>
          
       
        
    

    <q-dialog v-model="showEditTask" >
      <edit-task :id="id" :task="task" @close="showEditTask=false"/>
    </q-dialog>
       </q-item>

</template>

<script>
  import { mapActions } from 'vuex'
 import EditTask from 'components/Modals/Shared/EditTask'
export default{
    props:['task','id'],
    data(){
      return{
        showEditTask:false
      }
    },
    methods:{
        ...mapActions('tasks',['updateTask','deleteTask']),
        promptToDelete(id){
            
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        console.log(id)
        this.deleteTask(id)
      })
     }
    },
    components:{
      'edit-task':EditTask
    }

}

 
//task id is needed so that we know which task is being editied or deleted 
</script>

<style>

</style>
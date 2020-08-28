<template >
  <q-item 
      v-touch-hold:1000.mouse="showEditTaskModal"  
      @click="updateTask({ id: id, updates: { completed: !task.completed } })"
        :class="{'bg-green-2':task.completed, 'task-todo':!task.completed}"
       clickable
         >
        <q-item-section side top  >
          <q-checkbox color="green-4" size="sm"  :value="task.completed" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>  
          <q-item-label v-html="$options.filters.searchHighlight(task.name,search)" :class="{'text-strikethrough': task.completed}"></q-item-label>
        </q-item-section>
        <q-item-section side >
      <div class="row">
        <div class="column justify-center">
          <q-icon v-if="task.dueDate" class="q-mr-sm"  name="event" size="25px" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end " >{{task.dueDate | niceDate}}</q-item-label>
          <small><q-item-label class="row justify-end" caption >{{taskDueTime}}</q-item-label></small>
        </div>  
      </div>
        </q-item-section>

        <q-item-section side>
          <div class="row">
             <q-btn @click.stop="showEditTask = true" flat dense round color="accent" icon="edit" />
            <q-btn @click.stop="promptToDelete(id)" flat dense round color="secondary" icon="delete" />            
            </div>
        </q-item-section>
          
       
        
    

    <q-dialog v-model="showEditTask" >
      <edit-task :id="id" :task="task" @close="showEditTask=false"/>
    </q-dialog>
       </q-item>

</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
 import EditTask from 'components/Modals/Shared/EditTask'
 import {date} from 'quasar'

export default{
    props:['task','id'],
    data(){
      return{
        showEditTask:false
      }
    },
    computed:{
      ...mapGetters('settings',['settings']),
      ...mapState('tasks',['search']),
      taskDueTime(){
        if(this.settings.show24HourTimeFormat){
             return this.task.dueTime
        }
     
        return date.formatDate(this.task.dueDate+ ' '+ this.task.dueTime,'h:mmA')
        
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
     },
     showEditTaskModal(){
       this.showEditTask=true
     }
    },
    components:{
      'edit-task':EditTask
    },
    filters: {
      niceDate(value){
         return date.formatDate(value,'MMM D')
      },
      searchHighlight(value,search){
 
       if(search){
          let searchRegExp = new RegExp(search,'ig')
          return value.replace(searchRegExp,(match) =>{  
              return '<span class="bg-yellow-6">' + match+ '</span>'
            })
          }
            return value
        }
      }

}

 
//task id is needed so that we know which task is being editied or deleted 
</script>

<style>
.task-todo{
  background-color: #fde9c9;
}
 

</style>
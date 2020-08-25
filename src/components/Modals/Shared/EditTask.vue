<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
       <modal-task-name ref="modalTaskName" :name.sync="taskToSubmit.name" />
      <modal-due-date @clear="clearDueDate" :dueDate.sync="taskToSubmit.dueDate" />


     <modal-due-time  :dueDate="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"/>
      
      </q-card-section>
      <modal-btn   @save ="submitTask"/>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import ModalHeader from './ModalHeader'
import ModalTaskName from './ModalTaskName' 
import ModalDueDate from './ModalDueDate'
import ModalDueTime from './ModalDueTime'
import ModalBtn from './ModalButtons'

export default {
  data: function () {
    return {
      taskToSubmit:{}
    };
  },
  props:['task','id'],
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate();
      if (!this.$refs.modalTaskName.$refs.name.isError) {
        this.submitTask();
      }
    },
    submitTask() {
      //send data to store to add task to state
      this.updateTask({id:this.id,updates:this.taskToSubmit});
      this.$emit("close");
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = "";
      this.taskToSubmit.dueTime = "";
    },
  },
  components:{
    'modal-header':ModalHeader,
    'modal-task-name':ModalTaskName,
    'modal-due-date':ModalDueDate,
    'modal-due-time':ModalDueTime,
    'modal-btn':ModalBtn
  },
  mounted(){
   this.taskToSubmit = Object.assign({},this.task);
  }
};
</script>

<style>
</style>
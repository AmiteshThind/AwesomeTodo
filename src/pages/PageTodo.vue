<template>
  <q-page class="q-pa-md">

    <no-tasks v-if="!Object.keys(tasksTodo).length"></no-tasks>
    <tasks-todo v-else :tasksTodo="tasksTodo" />

    <tasks-completed v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" />

    <div class="absolute-bottom text-center q-ma-md">
      <q-btn @click="showAddTask = true" round color="primary" size="24px" icon="add" />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask=false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import AddTask from "components/Modals/Shared/AddTask";
import TasksTodo from "components/Modals/TasksTodo";
import TasksCompleted from "components/Modals/TasksCompleted";
import NoTasks from "components/Tasks/NoTasks"

export default {
  mounted(){
    this.$root.$on('showAddTask', () =>{
      this.showAddTask = true; 
    })
  },
  data: function () {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]), // tasks gets mapped to what the getter tasks returns. the getter 'tasks' is assinged the array value that it returns
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    addTask: AddTask,
    tasksTodo: TasksTodo,
    tasksCompleted: TasksCompleted,
    noTasks:NoTasks
  },
};
</script>

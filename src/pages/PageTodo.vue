<template>
  <q-page class="my-font text-h6"  >
    <div class="q-pa-md absolute full-width full-height column">

      <template v-if="tasksDownloaded">

    <div class="row q-mb-lg">
    <search class="col-10"></search>
    <sort class="col"></sort>
    </div>
      
     <p v-if="Object.keys(tasksCompleted).length == 0 && Object.keys(tasksTodo).length==0">No Search Results</p>
 
    <q-scroll-area class="q-scroll-area-tasks ">
    <no-tasks v-if="!Object.keys(tasksTodo).length && !settings.showTasksInOneList"></no-tasks>
    <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />
    <tasks-completed class="q-mb-xl " v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" />
    </q-scroll-area>
 
    <div class="absolute-bottom text-center q-ma-md no-pointer-events">
      <q-btn   class="all-pointer-events q-ma-lg" @click="showAddTask = true" round color="primary" size="24px" icon="add_task" />
    </div>


      </template>
      <template v-else>
        <span class="absolute-center"> 
        <q-spinner-dots size="4em" color="primary" />
        </span>
        </template>
    </div>
 

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask=false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AddTask from "components/Modals/Shared/AddTask";
import TasksTodo from "components/Modals/TasksTodo";
import TasksCompleted from "components/Modals/TasksCompleted";
import NoTasks from "components/Tasks/NoTasks"
import Search from "components/Modals/Tools/Search"
import Sort from "components/Modals/Tools/Sort"

export default {
  mounted(){
    this.$root.$on('showAddTask', () =>{
      this.showAddTask = true; 
    })

    console.log(this.tasksTodo)
    console.log(this.tasksCompelted)
  },
  data: function () {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapGetters("settings",['settings']),
    ...mapState('tasks',['search','tasksDownloaded']) // tasks gets mapped to what the getter tasks returns. the getter 'tasks' is assinged the array value that it returns
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    addTask: AddTask,
    tasksTodo: TasksTodo,
    tasksCompleted: TasksCompleted,
    noTasks:NoTasks,
    search:Search,
    sort:Sort
  },
};
</script>
<style scoped>
.q-scroll-area-tasks{
  display:flex;
  flex-grow:1;
}
</style>

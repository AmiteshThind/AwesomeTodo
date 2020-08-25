<template>
   <q-banner dense class="bg-grey-4 list-header">
      <template v-slot:avatar>
        <q-icon name="done"  color="primary" />
      </template>
      No Tasks Today!
      <template v-slot:action>
        <q-btn @click="$root.$emit('showAddTask')" flat color="primary" label="Add Task" />
      </template>
    </q-banner>
</template>

<script>
export default {

}
</script>

<style>
.list-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
</style>
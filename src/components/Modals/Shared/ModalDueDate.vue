<template>
  <div class="row q-mb-sm">
    <q-input @input="$emit('update:dueDate',$event)" outlined standout="bg-amber-1" :value="dueDate" label="Due Date">
      <template v-slot:append>
        <q-icon v-if="dueDate" @click="$emit('clear')" name="cancel" class="cursor-pointer" />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :value="dueDate" @input="$emit('update:dueDate',$event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["dueDate"],
};
</script>

<style>
</style>
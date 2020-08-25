<template>
          <div class="row q-mb-sm">
          <q-input
            clearable
            autofocus
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            class="col"
            outlined
            standout="bg-amber-1 "
           :value="name"
            label="Task Name"
            @input="$emit('update:name',$event)"
          />
        </div>
</template>

<script>
    export default {
    props:['name']
}
</script>

<style>

</style>
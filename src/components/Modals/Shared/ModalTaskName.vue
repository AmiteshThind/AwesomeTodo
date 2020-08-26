<template>
          <div class="row q-mb-sm">
          <q-input
            v-select-all
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
    props:['name'],
    directives:{
        selectAll:{
            inserted(el){
                let input = el.querySelector(".q-field__native")
                input.addEventListener('focus',()=>{
                    if(input.value.length){
                        input.select()
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>
<template>
  <div class="q-mt-lg text-h6">
    <q-btn
      class="full-width"
      color="primary" text-color="black"
      label="Submit Data" no-caps
      @click="$root.$emit('showDataInputForm')"
    />
  </div>
</template>

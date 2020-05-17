<template>
  <div class="q-mt-lg text-h6">
    <q-btn
      class="full-width"
      color="primary" text-color="black"
      label="Submit Data" no-caps
      :disable='loadingRequest'
      @click="$root.$emit('showDataInputForm')"
    />
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    computed: mapState('ui', ['loadingRequest']),
  }
</script>

<template>
  <div class="row justify-between">
    <div class="column">
      <mode-selection-button
        :label="firstButton.label"
        :disable="firstButton.disable"
        :highlight="firstButton.highlight"
        @clicked="$emit('firstButtonClicked')"
      />
      <mode-selection-button
        class="q-mt-md"
        :label="secondButton.label"
        :disable="secondButton.disable"
        :highlight="secondButton.highlight"
        @clicked="$emit('secondButtonClicked')"
      />
    </div>
    <div class="column">
      <mode-selection-button
        :label="thirdButton.label"
        :disable="thirdButton.disable"
        :highlight="thirdButton.highlight"
        @clicked="$emit('thirdButtonClicked')"
      />
      <mode-selection-button
        class="q-mt-md"
        :label="fourthButton.label"
        :disable="fourthButton.disable"
        :highlight="fourthButton.highlight"
        @clicked="$emit('fourthButtonClicked')"
      />
    </div>
  </div>
</template>

<script>
  export default {
		props: {
  		firstButton: Object,
  		secondButton: Object,
  		thirdButton: Object,
  		fourthButton: Object
  	},
    components: {
      'mode-selection-button' : require('components/Shared/ModeSelectionButton.vue').default
    }
  }
</script>

<template>
	<q-btn
    :color="highlight ? 'secondary' : 'primary'"
    text-color="black"
    :label="label" no-caps
    :disable="disable"
    :glossy="highlight"
    :rounded="highlight"
  	@click="$emit('clicked')"
	/>
</template>

<script>
	export default {
		props: {
      label: String,
      disable: Boolean,
      highlight: Boolean
  	}
	}
</script>

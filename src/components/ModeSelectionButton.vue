<template>
	<q-btn
  	color="primary" text-color="black"
  	:label="label" no-caps
  	:disable="disable"
  	:glossy="highlight"
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

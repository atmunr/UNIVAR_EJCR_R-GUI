<template>
  <q-img
    :src="url"
    spinner-color="black" contain
    style="max-height: 550px; max-width: 1500px"
  />
</template>

<script>
	export default {
		props: {
  		url: String
  	}
	}
</script>

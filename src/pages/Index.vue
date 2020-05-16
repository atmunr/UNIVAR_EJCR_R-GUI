<template>
  <q-page class="q-pa-md">

    <div class="row q-pa-lg">
      <action-buttons class="col-3"/>
      <plots class="col-9"/>
    </div>

    <tables class="q-pa-lg" />

		<q-dialog v-model="showDataInputForm">
		  <data-input-form @formSubmitted="showDataInputForm = false" />
		</q-dialog>

  </q-page>
</template>

<script lang="ts">
  import { mapState } from 'vuex';

  export default {
    name: 'PageIndex',
    data () {
      let showDataInputForm : Boolean = false;

      return { showDataInputForm };
    },
		mounted() {
			this.$root.$on('showDataInputForm', () => {
				this.showDataInputForm = true;
			});
		},
	  components: {
	    'data-input-form' : require('components/ActionButtons/SubmitData/DataInputForm.vue').default,
	    'action-buttons' : require('components/ActionButtons/ActionButtons.vue').default,
	    'plots' : require('components/Plots/Plots.vue').default,
	    'tables' : require('components/Tables/Tables.vue').default
	  }
  }
</script>

<style lang="scss">
  .no-plot {
    text-align: center;
    vertical-align: middle;
  }
</style>

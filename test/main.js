
Vue = require('vue')
VueTap = require('../vue-tap.js')

Vue.use(VueTap);

new Vue({
	el: '#app',
	data: {
		text: ''
	},
	methods: {
		show: function () {
			this.text = 'a tap plugin for Vue.js'
		}
	}
})
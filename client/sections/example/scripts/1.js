import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js';



new Vue({
    el:"#app_header",
	data() {
		return {
            online:'0',
        }
    },
    methods: {
        loadOnline(){
            axios
            .get('/api/csgo/online')
            .then(response => {
                this.online = response.data.online
                console.log(this.online)
            })
            .catch(error =>{
                console.log(error)
            })
        }
    },
    beforeMount(){
        console.log('beforeMount')
        this.loadOnline()
        // this.getgetget()
    },
    mounted(){
        // this.getgetget()
    }
})
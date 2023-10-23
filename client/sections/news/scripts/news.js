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

function ln(nb) {
    
    vue1.loadNewsI(nb)
}

const vue1 = new Vue({
    el:"#app_news",
	data() {
		return {
            counter: 7,
            loadedNews:[]
        }
    },
    methods: {
        loadNews(){
            axios
            .get('/api/csgo/history', {
                params:{
                    todo: "show"
                }
            })
            .then(response => {
                this.loadedNews = response.data
                console.log(this.loadNews)
            })
            .catch(error =>{
                console.log(error)
            })
        },
        loadNewsI(i){
            axios
            .get('/api/csgo/history', {
                params:{
                    todo: "show",
                    nn: i
                }
            })
            .then(response => {
                this.loadedNews = response.data
                console.log(this.loadNews)
            })
            .catch(error =>{
                console.log(error)
            })
        },
    },
    mounted(){
        this.loadNews()
    },
    filters: {
        formatDate: function (value) {
        return moment(value).format('DD.MM.YYYY HH:mm:ss');
      }
    }
})
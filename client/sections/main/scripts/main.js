import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js';




new Vue({
    el:"#app",
	data() {
		return {
            vueTest:'Test1',
            news:'',
            online:'',
            history_news_title:'News:',
            marqueeTexts: [
              'Текст 0',
              'Текст 1',
              'Текст 2',
              'Текст 3',
              'Текст 4',
              'Текст 5',
              'Текст 6',
              'Текст 7',
            ],
            hisText:''
        }
    },
    methods: {
        test(){
            alert(vuetest)
        },
        loadnews(){
            axios
            .get('/api/loadNews')
            .then(response => {
                this.news = response.data
                console.log(this.news)
            })
            .catch(error =>{
                console.log(error)
            })
        },
        loadserverevents(){
            axios
            .get('/api/csgo/history', {
                params:{
                    todo: "show"
                }
            })
            .then(response => {
                this.marqueeTexts = response.data
                console.log(this.marqueeTexts)
            })
            .catch(error =>{
                console.log(error)
            })
        },
        addToHistory(){
            if(this.marqueeTexts.length == 10){
                delete this.marqueeTexts[0]
                console.log(this.marqueeTexts)
                let len = this.marqueeTexts.length
                for(let i = 1; i < len; i++){
                    this.marqueeTexts[i-1] = this.marqueeTexts[i]
                }
                this.marqueeTexts[len-1] = this.hisText
                this.hisText = ''
                console.log(this.marqueeTexts)
                return
            }
            this.marqueeTexts.push(this.hisText)
            this.hisText = ''
        }
    },
    beforeMount(){
        console.log('beforeMount')
        this.loadnews()
        this.loadserverevents()
        
    },
    mounted(){
        console.log('mounted')
    },
    filters: {
        formatDate: function (value) {
        return moment(value).format('DD.MM.YYYY');
    }
  }
})

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
        },
        // getget(){
        //     console.log('getget')
        //     this.getgetget()
        // },
        // async getgetget(){
        //     console.log('123')
        //     const headers = {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         "Access-Control-Allow-Origin": "*",
        //       }
        //     await axios
        //     axios.post('https://requestinspector.com/inspect/01h5d3ehfkaym3ahwc2b38kz18', {
        //         data:{firstName: 'Fred',
        //         lastName: 'Flintstone'},
        //         headers
        //     })
        //     .then(response => {
        //         console.log('RES:')
        //         console.log(response)
        //     })
        //     .catch(error =>{
        //         console.log(error)
        //     })
        // }
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






var element = document.getElementById("body");

// Обрабатываем событие копирования
element.addEventListener("copy", function(event) {
  // Отменяем стандартное действие по умолчанию
  event.preventDefault();

  // Получаем выделенный текст
  var selectedText = window.getSelection().toString();

  // Создаем новый буфер обмена с добавленной строкой
  var clipboardData = event.clipboardData || window.clipboardData;
  clipboardData.setData("text/plain", selectedText + "\nИсточник: acro.pro");
//   clipboardData.setData("text/plain", "acro.pro");//сносить весь текст в 0
});
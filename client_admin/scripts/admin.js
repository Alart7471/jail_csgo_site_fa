import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'

new Vue({
    el:"#app",
	data() {
		return {
            vueTest:'Test1',
            news:'',
            online:''
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
    },
    beforeMount(){
        console.log('beforeMount')
        this.loadnews()
        
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
            online:'0'
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
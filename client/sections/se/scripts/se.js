import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js';



new Vue({
    el:"#app_header",
	data() {
		return {
            online:'0',
            currentDate:'',
            currentDateF:''
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
        
    },
    mounted(){
        const params = new URLSearchParams(window.location.search);
        console.log(params)
        this.pageTitle = params.get('pageTitle') || 'Заголовок страницы';
        this.pageContent = params.get('pageContent') || 'Содержимое страницы';
    }
})

new Vue({
    el:"#app_content",
	data() {
		return {
            query:'',
            dates: [],
            choosed:'',
            date:'',
            serverHistory:[],
            loading:''
        }
    },
    methods: {
        loadEvents(){
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
        processDate(dateString) {
            var day = parseInt(dateString.substr(0, 2));
            var month = parseInt(dateString.substr(2, 2));
            var year = parseInt(dateString.substr(4, 4));
            
            var currentDate = new Date(year, month - 1, day);
            this.currentDate = currentDate
            this.currentDateF = this.formatDate(this.currentDate)
            var result = [[],[],[]];
            
            for (let i = -4; i < 0; i++) {
                let newDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
                if (newDate <= new Date()) {
                  let formattedDate = `${newDate.getDate().toString().padStart(2, '0')}${(newDate.getMonth() + 1).toString().padStart(2, '0')}${newDate.getFullYear().toString()}`;
                  result[0].push(formattedDate);
                }
            }
            result[1].push(this.currentDateF)
            for (let i = 1; i <= 4; i++) {
                let newDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
                if (newDate <= new Date()) {
                  let formattedDate = `${newDate.getDate().toString().padStart(2, '0')}${(newDate.getMonth() + 1).toString().padStart(2, '0')}${newDate.getFullYear().toString()}`;
                  result[2].push(formattedDate);
                }
            }
            console.log('86')
            console.log(result)
            return result;
        },
        formatDate(date) {
            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let year = date.getFullYear().toString();
          
            return `${day}${month}${year}`;
        },
        ref(num){
            window.location.href = `?page=${num}`;
        },
        redirectToEventPage() {
            const num = 123; // Здесь можно указать нужное значение num
            window.location.href = `/events/${num}`;
        },
        checkDateFormat(str) {
            let regex = /^\d{2}\d{2}\d{4}$/;
            return regex.test(str);
        },
        goToday(){
            let today = new Date
            console.log(`?page=${this.formatDate(today)}`)
            window.location.href = `?page=${this.formatDate(today)}`;
        },
        isDateOk(date){
            let lastFourDigits = date % 10000;
            console.log(lastFourDigits)
            if(Number(lastFourDigits) >= Number(2023) && Number(lastFourDigits) < Number(2025)){
                return true
            }
            else {
                return false
            }
        },
        compareDate(str) {
            let currentDate = new Date();
            let day = parseInt(str.substr(0, 2));
            let month = parseInt(str.substr(2, 2)) - 1; // месяцы в JavaScript начинаются с 0
            let year = parseInt(str.substr(4, 4));
            let date = new Date(year, month, day);
          
            return date < currentDate;
        },
        async loadServerHistory(str) {
            console.log('LOADING ' + str);
            await axios
              .get('/api/csgo/history', {
                params: {
                  todo: "this",
                  this: str
                }
              })
              .then(response => {
                this.serverHistory = response.data;
                console.log(this.serverHistory)
                this.loading = false; // Устанавливаем флаг загрузки в false после получения ответа
              })
              .catch(error => {
                console.log(error);
                this.loading = false; // Устанавливаем флаг загрузки в false в случае ошибки
              });
          },
          checkParams(){
            this.serverHistory = []
            this.loading = true; // Устанавливаем флаг загрузки в true
            console.log('beforeMount')
            //this.loadOnline()
            let params = new URLSearchParams(window.location.search);
            console.log(params.get('page'))
            this.query = params.get('page')
            if(this.query == null){
                this.goToday()
            }
            else if(!this.checkDateFormat(this.query)){
                this.goToday()
            }
            else if(!this.isDateOk(this.query)){
                this.goToday()
            }
            else if(!this.compareDate(this.query)){
                this.goToday()
            }
            this.loadServerHistory(this.query)
            this.choosed = this.query
            this.dates = this.processDate(this.query)
            console.log(this.dates)
          }

          
          
    },
    beforeMount(){
        this.checkParams()
        
        
    },
    mounted(){
        
        //Добавит обработчик на проверку правилности даты и дефолтное состояние
        //при некорректной дате выдават сегодня
        
    }
})

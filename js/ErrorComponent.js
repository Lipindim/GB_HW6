Vue.component('error',{
    data(){
        return{
            errorVisible: false,
            errorMessage: ''
        }
    },
    methods: {
        showError(error) {
            this.errorVisible = true;
            this.errorMessage = error.stack;
        }
    },
    template: `<div class="error" v-show="errorVisible">
                    <span>{{errorMessage}}</span>
               </div>`
})
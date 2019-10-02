<template>
    <div class="pt-5 bg pb-5" >
            <div class="main_contact m-auto ">
                <div class="d-flex justify-content-center title">Liên Hệ</div>
                <div class="contact">
                        <div class="formCus p_1r mlr_1-5r">
                            <div class="d-block">Họ và Tên</div>
                            <div class=" Custominput3 pr2" >
                                <input type="text" autocomplete='on' style="width:100%;" v-model="name">
                            </div>
                            <div class="d-block">Địa Chỉ Email</div>
                            <div class=" Custominput3 pr2" >
                                <input type="text"  style="width:100%;" autocomplete='on' v-model="email">
                            </div>
                            <div class="d-block">Tin Nhắn</div>
                            <div class=" Custominput3 pr2"  >
                                <textarea v-model="message"  style="width:100%;" rows="4"></textarea>
                            </div>
                            <!-- <div class="agree_label">
                                    
                            </div>     -->
                            <div @click="checkForm" class="agree_btn btn"> Gửi</div>                              
                        </div>
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
                            </ul>
                        </p>
                </div>
            </div>
    </div>
</template>

<script>
import GeneralService from '@/services/GeneralService'
export default {
    data(){
        return {
            name:null,
            email:null,
            message:null,
            errors: [],
        }
    },
    methods:{
        checkForm: function (e) {
        if (this.name && this.email && this.message) {
            this.sendRequestSupport();            
        }

        this.errors = [];

        if (!this.name) {
            this.errors.push('Vui lòng điền Họ và Tên.');
        }
        if (!this.email) {
            this.errors.push('Vui lòng điền địa chỉ Email.');
        }
        if (!this.message) {
            this.errors.push('Vui lòng để lại lời nhắn.');
        }
        e.preventDefault();
    },
    async sendRequestSupport(){
        try {
            await GeneralService.sendRequestSupport({
                name: this.name,
                email: this.email,
                message:this.message,
                status: 0
            })
            this.resetForm()
            this.$toasted.show(`Cảm ơn bạn đã liên hệ, chúng tôi sẽ hỗ trợ bạn sớm nhất`, { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 5000
              });
            
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "toasted-primary", 
                    position: "bottom-right", 
                    duration : 5000
                });
            }
    },
    resetForm() {
        this.name = null,
        this.email = null,
        this.message = null,
        this.errors = []
    }
  }
}
</script>

<style scoped>

*{
    font-size: 14px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    color: rgba(0,0,0,.54);
    
}
.main_contact{
    max-width: 800px;
    width: 100%;
    background:white;
    position: relative;
    z-index: 1;
    border-radius: 2px;
    background: white;
}

.p_1r{
    padding: 1rem;
}
.mlr_1-5r{
    margin: 0 1.5rem;
}
.infor h5{
    margin: 1.5rem 0 1rem;
}
.pl2{
    padding-left: 2px;
}
.pr2{
    padding-right:2px;
}
.formCus{
    width:90%;
}

.Custominput3{
    width: 100%;
    padding-top:0.5rem;
    padding-bottom:1.4rem;
    display: block;
}
.agree_btn{
    border: 1px solid #53c9ff;
    border-radius: 2px;
    background: #53c9ff;
    margin: 1.2rem 0 0;
    display: block;
    width: 6rem;
    color:#3b3b3b;
    cursor: pointer;
}

.title{
    font-size: 2rem;
}
</style>

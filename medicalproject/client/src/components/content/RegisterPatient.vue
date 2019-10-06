<template>
    <div class="pt-5 bg pb-5 bg" 
    :style="{
        'background-image':
          'url(' + require('@/assets/images/homeregister.jpg') + ') '
      }">
        <form action="" id="registerform">
            <div class="main_register m-auto ">
                <div class="logo auto m-auto d-flex justify-content-center p_1r"><img src="@/assets/images/logo705.png"></div>
                <div class="title auto m-auto d-flex justify-content-center p_1r "><strong>Mẫu Đăng Kí Bệnh Nhân</strong></div>
                <div class="register">
                    <div class="infor p_1r mlr_1-5r">
                        <h5> Mục Đích của EHR MedicalBlock</h5>
                        <p>Chúng tôi phát triển trang web nhằm cải thiện tình hình quản lý hồ sơ bệnh án,
                            giảm bớt lo lắng mỗi lần bạn quên mang sổ khám bệnh khi tái khám,
                            hoặc mất sổ khám bệnh điều này khiến các bác sĩ sẽ không hiểu rõ hết tình
                            trạng bệnh của bạn để đưa ra phương pháp chữa trị tốt nhất cũng như toa thuốc phù hợp.
                            Hơn nữa hiếm ai cẩn thận giữ lại toàn bộ hồ sơ khám tất cả các bệnh của mình và cũng
                            không nghĩ rằng các bệnh có liên quan đến nhau để kịp thời thông báo cho bác sĩ chửa trị</p>

                        <p>Giờ đây EHR MedicalBlock hoàn toàn có thể giúp bạn giải quyết vấn dề này. Bằng cách lưu tất cả tình trạng sức khỏe của bạn dưới 1 hồ sơ mang tên bạn, khi được bạn cấp quyền xem hồ sơ , tất cả các bác sĩ bệnh viện liên kết với chúng tôi đều có thể tham vấn tình trạng sức khỏe của bạn để đưa ra phương pháp và
                            toa thuốc phù hợp nhất với bạn, đặc biệt là phương pháp chữa trị kết hợp nhiều loại bệnh</p>

                        <p>Chúng tôi đang hỗ trợ sự phát triển của một hệ thống chăm sóc sức khỏe cá nhân nhanh hơn, đáng tin cậy hơn và cung cấp cho bạn kết quả tốt hơn. Bạn hoàn toàn có thể truy cập hồ sơ
                             của mình bất cứ lúc nào tại bất kỳ đâu miễn là có internet. Được bảo vệ bằng mã khóa an toan, an hãy yên tâm rằng thông tin của bạn được bảo mật hoàn toàn, trừ khi bạn cấp quyền cho bác sĩ của bạn được xem hồ sơ của bạn.</p>
                        <p>Hãy đăng kí cùng chúng tôi bằng cách điền vào mẫu sau:</p>
                    </div>
                        <div class="formCus p_1r mlr_1-5r">
                            <div class="block">Địa Chỉ Email</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;"  v-model="email">
                            </div>
                            <div class="block">Mật Khẩu</div>
                            <div class=" Custominput3 pr2"   >
                                <input type="password"  style="width:100%;"  v-model="password" >
                            </div>
                            <div class="block">Nhập Lại Mật Khẩu</div>
                            <div class=" Custominput3 pr2"   >
                                <input type="password"  style="width:100%;"  v-model="password_again" >
                            </div>
                            <div class="agree_btn btn" @click="checkForm"> ĐỒNG Ý</div>                              
                        </div>
                        
                </div>
            </div>
        </form>
    <b-modal id="modal-authenticationEmail" hide-footer>
        <div class="d-block d-flex row col-sm-12 py-3">Vui lòng nhập mã nhận được từ bên mail vào đây:</div>
        <input v-model="API_CHECK" class="inputModal"/>
        <div class="d-flex justify-content-between">
            <div class="py-2 px-2">
                <b-button variant="success" @click="sendAuthentication">Gửi lại mã xác thực</b-button>
            </div>
            <div class="d-flex">
                <div class="py-2 px-2">
                    <b-button variant="success" @click="checkAPIKEY">Gửi Yêu Cầu</b-button>
                </div>
                <div class="py-2 px-2">
                    <b-button variant="warning" @click="hide_modal_authenticationEmail">Đóng</b-button>
                </div>
            </div>
        </div>
    </b-modal>  
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { mapGetters} from "vuex";
export default {
    data(){
        return{
            id_account:'',
            roles:1,
            error:'',
            email:'',
            password:'',
            password_again:'',
            API_KEYS:null,
            API_CHECK:null
        }
    },
    methods: {
        async sendAuthentication(){
            this.API_KEYS = this.IntegerGenerator();
            console.log('this.API_KEYS '+this.API_KEYS)
            try {
                const response = await AuthenticationService.AuthenticationEmail({
                    API_KEYS:this.API_KEYS,
                    email:this.email
                })
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "outline", 
                    position: "bottom-center", 
                    duration : 5000
                });
            }
        },
        checkForm:async function (e) {
            if(!this.validEmail(this.email)) {
                    this.$toasted.show(`Vui lòng nhập đúng định dạng email !`, { 
                    theme: "outline", 
                    position: "bottom-center", 
                    duration : 5000
                });
            }else if(this.password !== this.password_again){
                this.$toasted.show(`Password và Password xác nhận không giống nhau, Vui lòng kiểm tra lại !`, { 
                    theme: "outline", 
                    position: "bottom-center", 
                    duration : 5000
                });
            }
            else if(!this.validPassword(this.password)){
                this.$toasted.show(`Mật khẩu được cung cấp phải khớp với các quy tắc sau:
                    <br>
                    1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
                    <br>
                    2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
                    `, {
                    theme: "outline", 
                    position: "bottom-center", 
                    duration : 5000
                });
            }
            else{
                this.sendAuthentication();
                this.$root.$emit('bv::show::modal', 'modal-authenticationEmail', '#btnShow')
            }
        },
        resetRegiserPatient() {
            this.id_account = '',
            this.error = '',
            this.email='',
            this.password='',
            this.password_again='',
            this.API_KEYS = null,
            this.API_CHECK = null
        },
        async register () {
            try {
                const response = await AuthenticationService.register({
                    email: this.email,
                    password: this.password,
                    roles:this.roles,
                    isUpdateInformation:0
                })
                this.id_account = response.data.user.id
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                    path: `/UpdateInformationRegister`
                })
                this.resetRegiserPatient();
            }catch (error) {
                this.$toasted.show(`${error.response.data.error}`, { 
                    theme: "outline", 
                    position: "bottom-center", 
                    duration : 5000
                });
            }
        },
        async checkAPIKEY(){
            console.log(this.API_KEYS+' API_KEYS')
            console.log(this.API_CHECK+ 'API_CHECK')
            if(this.API_KEYS != this.API_CHECK){
                this.$toasted.show(`Mã Xác Thực Không Đúng Vui lòng kiểm tra lại !`, { 
                    theme: "bubble", 
                    position: "bottom-right", 
                    duration : 5000
                });
            }else{
                this.register();
            }
        },
        hide_modal_authenticationEmail(){
            this.$root.$emit('bv::hide::modal', 'modal-authenticationEmail', '#btnShow')
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        },
        validPassword: function (email) {
            var re = /^[a-zA-Z0-9]{8,32}$/;
            return re.test(email)
        },

        IntegerGenerator(){
            return Math.floor(Math.random() * 10001);
        },

    }
}

</script>

<style scoped>

*{
    font-size: 14px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    color: rgba(0,0,0,.54);
    
}
.bg{
    background-repeat: no-repeat;
    background-size: cover;
}
.block{
    display:block;
}
.main_register{
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
.Custominput{
    display: inline-block;
    width: 49%;
    padding-top:1.2rem;
    padding-bottom:1.2rem;
}
.Custominput img {
  max-width: 100%;
  max-height: 500px;
}
.Custominput2{
    display: inline-block;
    width: 24.5%;
    padding-top:1.2rem;
    padding-bottom:1.2rem;
}
.Custominput2:last-child{
    width: 49%;
}
.Custominput3{
    width: 100%;
    padding-top:1.2rem;
    padding-bottom:1.2rem;
    display: block;
}
input{
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.12);
    padding: 5px 0;
}
.title strong{
    font-size: 1.3rem;
}
.agree_label{
    border-bottom: 1px solid rgba(0,0,0,.12);
    padding: 1.2rem 0;
}
.agree_btn{
    border: 1px solid #53c9ff;
    border-radius: 2px;
    background: #53c9ff;
    margin: 1.2rem 0 0;
    display: block;
    width: 6rem;
    color:#3b3b3b;
}
.agree_btn:hover{
    cursor: pointer;
}
input:focus::-webkit-input-placeholder {
    color: gray;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.danger-alert{
    color:red;
}
p{
    line-height: 24px;
}
.inputModal{
    width: 100%;
    margin-bottom: 30px;
}
</style>


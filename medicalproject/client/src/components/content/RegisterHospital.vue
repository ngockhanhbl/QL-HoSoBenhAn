<template>
    <div class="pt-5 bg pb-5 bg" 
    :style="{
        'background-image':
          'url(' + require('@/assets/images/homeregister.jpg') + ') '
      }">
        <form action="" id="registerform">
            <div class="main_register m-auto ">
                <div class="logo auto m-auto d-flex justify-content-center p_1r"><img src="@/assets/images/logo705.png"></div>
                <div class="title auto m-auto d-flex justify-content-center p_1r "><strong>Mẫu Đăng Kí Dành Cho Đối Tác Bệnh Viện</strong></div>
                <div class="register">
                    <div class="infor p_1r mlr_1-5r">
                        <h5>Mục tiêu của EHR MedicalBlock</h5>
                        <p>Nhằm tạo điều kiện để quản lý hồ sơ bệnh án một cách khoa học hơn,
                            chúng tôi lưu trữ thông tin bệnh nhân dưới dạng thông tin điện tử có thể dể dàng quản lý
                            và thuận lợi hơn trong quá trình khám chửa bệnh. Các y bác sĩ có quyền truy cập giới hạn
                            vào hồ sơ bệnh nhân để hiểu rõ tình hình bệnh từ đó đưa ra cách điều trị phù hợp nhất và
                            bỏ qua các xét nghiệm cơ bản không cần thiết. </p>

                        <p>Thông tin bệnh nhân được lưu lại sau mỗi lần khám chửa bệnh bởi các y bác sĩ liên kết với hệ thống
                            của chúng tôi. Vì thế với mong muốn quản lý hồ sơ bệnh nhân hiệu quả hơn chúng tôi cần sự hợp tác
                            của các bạn.</p>
                        
                        <h5>Chúng tôi cung cấp</h5>
                        <ul>
                            <li>
                                Hệ thống hồ sơ bệnh án với giao diện thân thiện và thông minh, giúp dễ dàng sữ dụng nâng cao hiệu quả làm việc.
                            </li>

                            <li>
                               Thông tin cơ bản của bệnh nhân được xác thực bằng blockchain, nhờ đó có thể bỏ qua các xét nghiệm cơ bản không cần thiêt,
                               nó đặc biệt hữu ích trong tình huống khẩn cấp.
                            </li>

                            <li>
                                Truy cập 24/7 vào hồ sơ chăm sóc sức khỏe của bệnh nhân, thông qua máy tính hoặc thiết bị di động của bạn.
                            </li>                          
                        </ul>
                        <h6>Hướng dẫn điền vào form đăng kí/sử dụng</h6>
                         <p>sau khi điền vào đơn đăng kí tài khoản email và password của bạn sẽ được dùng để đăng nhập vào hệ thống của chúng tôi,
                            bạn - người quản trị viên sẽ  cấp mới, quản lý tài khoản của cán bộ bác sĩ</p>
                        <p class="pt-3">Hãy tham gia cùng chúng tôi bằng cách điền vào mẫu sau.</p>
                    </div>
                        <div class="formCus p_1r mlr_1-5r">
                            <div class="block">Tên Bệnh Viện/Cơ Quan</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text" style="width:100%;"  v-model="name_hospital">
                            </div>
                            <div class="block">Số Điện Thoại/Fax</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;"  v-model="phone_hospital">
                            </div>
                            <div class="block">Địa Chỉ</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;" v-model="address_hospital" >
                            </div>
                            <div class="block">Địa Chỉ Email</div>
                            <div class=" Custominput3 pr2"    >
                                <input type="text"  style="width:100%;"  v-model="email_hospital">
                            </div>
                            <div class="block">Mật Khẩu</div>
                            <div class=" Custominput3 pr2"   >
                                <input type="password"  style="width:100%;"  v-model="password_hospital" >
                            </div>
                            <div class=" Custominput3 pr2 agree">
                               <input type="checkbox" v-model="toggle" id="agree" >
                                <span id="infor-agree">Bằng cách đăng ký vào biểu mẫu này, tôi đồng ý choEHR MedicalBlock liên hệ để xác thực
                                    và cam kết thực hiện đúng như chính sách và điều khoản.
                                </span> 
                            </div>
                            <br>
                            <div class="danger-alert" v-html="error" />
                            <div v-show="show_error">
                                <p v-if="!toggle">
                                    <b  class="danger-alert">Vui lòng tích vào ô cam kết</b>
                                </p>
                            </div>                      
                            <div class="agree_btn btn"  @click.prevent="checkForm" > ĐỒNG Ý</div>                                                                                   
                        </div>             
                </div>
            </div>
        </form>        
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    data(){
        return{
            show_error:false,
            id_account:'',
            roles:2,
            error:'',
            name_hospital:'',
            phone_hospital:'',
            address_hospital:'',
            email_hospital:'',
            password_hospital:'',
        }
    },
    computed:{
        toggle: {
           get(){ 
               return this.$store.getters.toggle
            },
           set(payload){  
                this.$store.dispatch("toggle", payload);
           }
        },
    }, 
    methods: {
            checkForm:function(e) {
                if(!this.toggle){
                    this.show_error = true;
                    e.preventDefault();
                }
                else
                    this.register()           
            },
            resetRegister(){
                this.name_hospital = '',
                this.phone_hospital = '',
                this.address_hospital='',
                this.email_hospital = '',
                this.password_hospital =''
            },
        async register () {
                try {
                    const response = await AuthenticationService.RegisterHospitalRequest({
                    email: this.email_hospital,
                    password: this.password_hospital,
                    name_hospital:this.name_hospital,
                    phone_hospital:this.phone_hospital,
                    address_hospital:this.address_hospital
                    })
                    this.show_error = false
                    this.resetRegister()
                    this.$store.dispatch('resetRegiserHospital')
                    this.$router.push({
                        name: 'thanks'
                    })
                    
                }catch (error) {
                    this.$toasted.show(`${error.response.data.error}`, { 
                        theme: "toasted-primary", 
                        position: "bottom-right", 
                        duration : 5000
                    });
                }
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
    background-size:cover
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
.pr2{
    padding-right:2px;
}
.formCus{
    width:90%;
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
.agree{
    position: relative;
    display: inline-block;
    padding-left: 36px;
}
#agree{
    position: absolute;
    padding: 0;
    margin-left: -36px;
    transform: translateY(25%);
    height: 1rem;
    width: 1rem;
}
p{
    line-height: 24px;
}
#infor-agree {
    font-size: 16px;
}
</style>

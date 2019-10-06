<template>
  <div class="footer">
    <!-- footer-middle -->
    <div class="d-flex justify-content-around footer-middle">
      <!-- footer-middle-left -->
      <div class="d-flex justify-content-between ">
        <span class="pr-5">
          <div class="footer-sitemap-resources">
            <span class="title-footer">
              Thông Tin
            </span>
            <span class="content-footer">
              <router-link to="/aboutus"><div>Về Chúng Tôi</div></router-link>
              <router-link to="/jobs"><div>Tuyển Dụng</div></router-link> 
               <router-link to="/policy"><div>Chính Sách</div></router-link> 
               <router-link to="/terms"><div>Điều Khoản</div></router-link> 
            </span>
          </div>
        </span>
        <span class="pl-5">
          <div class="footer-sitemap-resources">
            <span class="title-footer">
              Tài Nguyên
            </span>
            <span class="content-footer">
              <div>Sách Trắng</div>
              <div>Sự Kiện</div>
              <router-link to="/faqs"> <div>FAQs</div></router-link>
              <router-link to="/partner"><div>Đơn Vị Hợp Tác</div></router-link>
            </span>
          </div>
        </span>
      </div>
      <!-- footer-middle-right -->
      <div class="subcriber">
        <div><p>Đăng Kí Nhận Tin Tức</p></div>
        <div>
          <span><input type="text" v-model="email" placeholder="Nhập Email"/></span>
          <span id="btn-sub"
            ><img src="@/assets/images/send.svg" /><span @click="checkForm" class="pl-2 pr-1"
              >Đăng Kí</span
            ></span
          >
        </div>
        <div class="hr-20vw"></div>
        <div class="container-fluid">
          <div class="social-media d-flex justify-content-around">
            <img src="@/assets/images/twitter.svg" />
            <img src="@/assets/images/facebook.svg" />
            <img src="@/assets/images/google.svg" />
            <img src="@/assets/images/youtube.svg" />
            <img src="@/assets/images/linkedin.svg" />
          </div>
        </div>
      </div>
    </div>

    <!-- hr -->
    <div class="hr"></div>

    <!-- footer-bottom -->
    <div id="footer-bottom">
      <p>&copy; NGUYỄN NGỌC KHANH - HCMURE</p>
    </div>
  </div>
</template>

<script>
import GeneralService from '@/services/GeneralService'
export default {
  data(){
    return {
      email:null
    }
  },
  methods: {
    checkForm: function (e) {
      if(!this.validEmail(this.email)) {
        this.$toasted.show(`Vui lòng nhập đúng định dạng email !`, { 
          theme: "outline", 
          position: "bottom-center", 
          duration : 5000
        });
        // e.preventDefault();
      }else{
        this.subcriber();
      }
    },
    async subcriber(){
      await GeneralService.sendRequestSubcriber({
        email: this.email,
      })
      this.$toasted.show(`Cảm ơn bạn đã đăng kí,chúng tôi sẽ gửi cho bạn những tin tức mới nhất !`, { 
        theme: "bubble", 
        position: "bottom-center", 
        duration : 5000
      });
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    }
  }
};
</script>

<style scoped>
.footer {
  /* sellect: #4f5e72; */
  background-image: linear-gradient(#1874cd, #104e8b);
}
.footer-top img {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
.hr {
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  width: 70vw;
  margin: 0 15vw;
}
.hr-20vw {
  border: 0.5px dotted rgba(255, 255, 255, 0.2);
  width: 20vw;
  margin: 10px auto;
}

.content-footer {
  line-height: 30px;
}
.content-footer a{
  color: rgba(255, 255, 255, 0.6);
}
.content-footer div:hover {
  color: #999;
  cursor: pointer;
}
.footer-sitemap-resources {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
}
.title-footer {
  color: rgba(255, 255, 255, 0.9);
}
#footer-bottom {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 1px;
}

.footer-middle {
  padding-top: 5vw;
  padding-bottom: 5vw;
}

.subcriber {
  color: white;
  font-size: 0.8rem;
}
.subcriber input {
  border: 2px solid rgba(255, 255, 255);
  border-radius: 3px;
  padding: 4px;
  font-size: 12px;
  width: 15vw;
  background: #1874cd;
  color: white;
}
::placeholder {
  color: white;
}

#btn-sub {
  border: 2px solid rgba(255, 255, 255);
  border-radius: 3px;
  padding: 4px;
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;
}
#btn-sub img {
  height: 1.2em;
  width: 1.2em;
}

.social-media img {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
</style>

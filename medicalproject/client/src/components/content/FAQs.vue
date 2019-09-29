<template>
  <div class="container-fluid">
    <div class="row containerCus">
      <div class="col-md-12 title">
        Câu Hỏi Thường Gặp
      </div>

      <!-- About Company -->
      <div class="col-md-12 title-faqs">
        VỀ CÔNG TY
      </div>

      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(1)">
        <div class="question">
          <span class="question">EHR MedicalBlock là gì ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_1.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_1.isShow">
            Chúng tôi là công ty công nghệ, chuyên về lĩnh vực y tế, chăm sóc sứa khỏe cho cộng đồng
            với hơn 12 năm kinh nghiệm, chúng tôi tin chắc sẽ làm hài lòng những vị khách khó tính nhất
          </div>
        </transition>
      </div>

      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(2)">
        <div class="question">
          <span class="question">EHR MedicalBlock cung cấp những loại dịch vụ nào ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_2.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_2.isShow">
            Chúng tôi cung cấp giải pháp quản lý hồ sơ bệnh án, giúp người bệnh theo dõi bệnh án
            của mình 1 cách trực quan, khoa học. Do đó có thể chủ động trong mọi tình huống
          </div>
        </transition>
      </div>
      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(3)">
        <div class="question">
          <span class="question">Sự khác biệt của bạn đối với các công ty đối thủ là gì ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_3.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_3.isShow">
            Thế mạnh của EHR MedicalBlock là công nghệ của chúng tôi sử dụng
            mang lại trải nghệm tốt nhất có thể cho người dùng, đồng thời củng là công ty tiên
            phong trong lĩnh vực quản lý hồ sơ bệnh án cho cộng đồng.
          </div>
        </transition>
      </div>
      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(4)">
        <div class="question">
          <span class="question">EHR MedicalBlock có cung cấp thông tin của chúng bên thứ ba ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_4.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_4.isShow">
            Không. Chúng tôi bảo mật tuyệt đối hồ sơ bệnh án của cá nhân bạn
          </div>
        </transition>
      </div>

      <!-- About Services -->

      <div class="col-md-12 title-faqs">
        VỀ DỊCH VỤ
      </div>

      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(5)">
        <div class="question">
          <span class="question">EHR MedicalBlock cung cấp gì cho khách hàng ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_5.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_5.isShow">
            Chúng tôi cung cấp cho khách hàng phần mềm quản lý hồ sơ bệnh án
          </div>
        </transition>
      </div>

      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(6)">
        <div class="question">
          <span class="question">Thông tin hồ sơ bệnh án của tôi có được lưu trữ an toàn không ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_6.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_6.isShow">
            Thông tin hồ sơ bệnh án của bạn sẽ được lưu trữ một cách tuyệt đối án toàn. 
          </div>
        </transition>
      </div>
      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(7)">
        <div class="question">
          <span class="question">Ai là người ghi lại lịch sử hồ sơ bệnh án của tôi ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_7.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_7.isShow">
            Là những bác sĩ ở những cơ sở y tế, do bạn cấp quyền
          </div>
        </transition>
      </div>
      <div class="col-md-12 wrapper-faqs " @click="EisShowAnswer(8)">
        <div class="question">
          <span class="question">Phí dịch vụ có miễn phí không ?</span>
          <span class="down-arrow"><img :src="ShowDownUp_8.image"/></span>
        </div>
        <transition name="fade">
          <div class="answer" v-show="ShowDownUp_8.isShow">
            Hoàn Toàn Miễn phí ! Chăm sóc sức khỏe cộng đồng là trách nhiệm của công ty chúng tôi !
          </div>
        </transition>
      </div>

      <div class="space10 col-md-12"></div>
      <!-- trick  :((  -->
      <span class="down-arrow " v-if="true" v-show="false"
        ><img src="@/assets/images/down-arrow.svg"
      /></span>
      <span class="down-arrow " v-if="true" v-show="false"
        ><img src="@/assets/images/up-arrow.svg"
      /></span>
    </div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";

export default {
  methods: {
    EisShowAnswer(idQuestion) {
      this.$store.dispatch("EisShowAnswer", idQuestion);
    }
  },
  computed: {
    ...mapGetters(
      ["ShowDownUp_1",
      "ShowDownUp_2",
      "ShowDownUp_3",
      "ShowDownUp_4",
      "ShowDownUp_5",
      "ShowDownUp_6",
      "ShowDownUp_7",
      "ShowDownUp_8"]
    )
  }
};
</script>
<style scoped>
* {
  font-size: 11px;
}
.containerCus {
  margin-top: 10vh;
  margin-left: 9vw;
  margin-right: 16vw;
}
.title {
  font-size: 2.8em;
}

.wrapper-faqs {
  box-shadow: 0 2px 4px 0 rgba(81, 85, 133, 0.28);
  border-radius: 5px;
  padding: 25px 30px;
  margin-bottom: 10px;
  cursor: pointer;
  /* display: inline-block; */
}

.down-arrow img {
  height: 1rem;
  width: 1rem;
  float: right;
  padding-top: 0.1rem;
}
.title-faqs {
  color: #3f4cec;
  letter-spacing: 1.6px;
  margin: 30px 0 10px;
}
.question {
  color: #0b0f41;
  font-size: 16px;

  /* font-family: SpaceGrotesk-Regular; */
}

.answer {
  color: #515584;
  line-height: 1.75;
  margin-top: 10px;
  font-size:1rem;
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.space10 {
  height: 10vh;
}
</style>

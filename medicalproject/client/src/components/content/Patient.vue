<template>
<div >
  <div class="col-md-12 col-sm-12">
    <div class="row justify-content-end">
      <div class="mt-5 mr-4">
          EHR Medicalblock Xin Chào !
      </div>
    </div>
  </div>
  
  <div class="pt-5 mt-3">
      <b-tabs card >
      <b-tab title="Hồ Sơ Bệnh Án" active><app-TimeLine /></b-tab>
      <b-tab title="Thông Tin Cá Nhân"><ModifyInfomation /></b-tab>
      <b-tab title="Dữ Liệu Bệnh Nhân"><app-PatientData /></b-tab>
    </b-tabs>
  </div>
</div>

</template>

<script>

import PatientView from '@/components/content/patient_modules/PatientView.vue'
import PatientData from '@/components/content/patient_modules/PatientData.vue'
import { mapGetters} from "vuex";
export default {
  // computed: {
  //   ...mapGetters([,"patient_records","nameDoctorWrite_records","patientInfo","patient_records_details"])
  // },
  components: {
    "app-TimeLine": PatientView,
    ModifyInfomation: () => import("@/components/content/patient_modules/ModifyInfomation.vue"),
    "app-PatientData": PatientData,
  },
}
</script>

<style scoped>
.card-header-tabs{
  padding: 10rem;
  color: red;
}
</style>

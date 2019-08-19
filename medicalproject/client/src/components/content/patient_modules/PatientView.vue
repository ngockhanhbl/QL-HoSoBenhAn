<template>
  <div>
    <b-row class="justify-content-end options pr-4">
      <span @click="updateViewPatient(true)" class="p-2 mr-3"><img src="@/assets/images/timeline.svg" /></span>
      <span class="p-2 mr-3" @click="updateViewPatient(false)"><img src="@/assets/images/menu-options.svg" /></span>
    </b-row>
    <span v-if="isViewTimeLine"><app-TimeLine /></span>
    <span  v-else><app-ViewList /></span>
</div>
</template>

<script>
import TimeLine from '@/components/content/patient_modules/patient_views_modules/TimelinePatient.vue'
import ViewList from '@/components/content/patient_modules/patient_views_modules/ListPatient.vue'
export default {
  data() {
    return {
      isViewTimeLine:true
    }
  },
  methods: {
    updateViewPatient(payload){
      if(payload == true){
        this.isViewTimeLine = true
      }
      else{
         this.isViewTimeLine = false
      }
    }
  },

  components: {
    "app-TimeLine": TimeLine,
    "app-ViewList": ViewList
  },
}
</script>

<style scoped>
.options span img{
  height: 1.7rem;
  width: 1.7rem;
}
.options span{
  border:2px solid rgb(222,226,230);
  border-radius: 50%;
}
.options span:hover{
  background: rgb(222,226,230,.7);
}
</style>

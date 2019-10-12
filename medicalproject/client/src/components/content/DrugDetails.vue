<template >
<div class="pt-5">
      {{info}}
      <div v-if="info">          
            <div class="name d-flex justify-content-center mb-4">{{info.tenThuoc}}</div>
      </div>
      <div class="d-flex">
            <div class="row col-sm-12 main-info">
                  <div class="col-md-5 image">
                        <div v-if="info.image">{{info.image}}</div>
                        <div v-else><img src="https://via.placeholder.com/640x480.png?text=%E1%BA%A2NH+S%E1%BA%A2N+PH%E1%BA%A8M+640x480" /> </div>
                  </div>
                  <div class="col-md-7">
                        <div class="col-md-12" v-for="(item,index) in title" :key='index'>
                              <div class="col-md-4" >
                                    {{item.value}}
                              </div>
                              <div class="col-md-8">{{item.key}}</div>
                        </div>
                  </div>
            </div>
      </div>
</div>
</template>


<script>
import axios from 'axios'
export default {  
      data(){
            return{
                  info:null,
                  route:null,
                  title:[
                        {'value':'Số Đăng Kí','key':'soDangKy'},
                        {'value':'Phân Loại','key':'phanLoai'},
                        {'value':'Hoạt Chất - Nồng Độ/Hàm Lượng','key':'hoatChat'},
                        {'value':'Nồng Độ/Hàm Lượng','key':'nongDo'},
                        {'value':'Dạng Bào Chế','key':'baoChe'},
                        {'value':'Quy Cách Đóng Gói','key':'dongGoi'},
                        {'value':'Hạn Sử Dụng','key':'tuoiTho'},
                        {'value':'Tiêu Chuẩn','key':'tieuChuan'},
                        {'value':'Công Ty Sản Xuất','key':'congTySx'},
                        {'value':'Công Ty Đăng Kí','key':'congTyDk'},
                  ]
            }
      },
      watch: {
            $route(to, from) {
            axios
                  .get('https://www.drugbank.vn/services/drugbank/api/public/thuoc/'+to.params.id)
                  .then(response => (this.info = response.data));
            }
      },
      mounted() {
            this.route = this.$route.params.id;
            this.GetDrugByID(this.route);
      },
      methods:{
            GetDrugByID(params){
            axios
                  .get('https://www.drugbank.vn/services/drugbank/api/public/thuoc/'+params)
                  .then(response => (this.info = response.data));
            }
      },
      getValueDrug(key){

      }
}
</script>
<style scoped>
.name{
      background: #37ab86;
      color:#fff;
      padding:.25rem;

}
.image div{
      display: flex;
      justify-content: end;
      margin: auto;
}
.image img{
      height: calc(40vw/(640/480));
      width:40vw;
}

</style>
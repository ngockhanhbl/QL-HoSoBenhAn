<template >
<div class="pt-5">
      <div v-if="info">          
            <div class="name d-flex justify-content-center mb-4">{{info.tenThuoc}}</div>
      </div>
      <div class="d-flex">
            <div class="row col-sm-12 main-info">
                  <div class="col-md-5 image">
                        <div v-if="info.images == null"><img src="https://via.placeholder.com/640x480.png?text=%E1%BA%A2NH+S%E1%BA%A2N+PH%E1%BA%A8M+640x480" /></div>
                        <div v-else><img :src='url'  onerror="this.onerror=null;this.src='https://via.placeholder.com/640x480.png?text=%E1%BA%A2NH+S%E1%BA%A2N+PH%E1%BA%A8M+640x480';" /></div>
                  </div>
                  <div class="col-md-7">
                        <div class="col-md-12 d-flex element" v-for="(item,index) in title" :key='index'>
                              <div class="col-md-4 title" >
                                    {{item.value}}
                              </div>
                              <div class="col-md-8">{{info[`${item.key}`]}}</div>
                        </div>
                        <div class="col-md-12 d-flex title ml-1 mt-2" >
                              Giá buôn bán kê khai
                        </div>
                        <p class="col-md-12 d-flex " >
                              Giá bán buôn không được cao hơn giá bán buôn kê khai.Thặng dư giá bán lẽ không được
                              cao hơn thặng dư tối đa với từng loại thuốc theo quy định.
                        </p>
                        <div v-if="manifests !== null">
                              <b-table striped hover :items="manifests" :fields="fields_manifests"></b-table>
                        </div>
                  </div>


                  <span class="mt-4 container" v-if="BidPrices.length">
                        <p class="col-md-12 d-flex title" >
                              Giá Trúng Thầu
                        </p>
                        <div v-if="BidPrices !== null" >
                              <b-table striped hover :items="BidPrices" :fields="fields_BidPrices"></b-table>
                        </div>
                  </span>


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
                  manifests:null,
                  BidPrices:'',
                  route:null,
                  title:[
                        {'value':'Số Đăng Kí','key':'soDangKy'},
                        {'value':'Phân Loại','key':'phanLoai'},
                        {'value':'Hoạt Chất','key':'hoatChat'},
                        {'value':'Nồng Độ/Hàm Lượng','key':'nongDo'},
                        {'value':'Dạng Bào Chế','key':'baoChe'},
                        {'value':'Quy Cách Đóng Gói','key':'dongGoi'},
                        {'value':'Hạn Sử Dụng','key':'tuoiTho'},
                        {'value':'Tiêu Chuẩn','key':'tieuChuan'},
                        {'value':'Công Ty Sản Xuất','key':'congTySx'},
                        {'value':'Công Ty Đăng Kí','key':'congTyDk'},
                  ],
                  fields_manifests:
                  [
                        {     key: 'ngayBaoCao',
                              label: 'Ngày Kê Khai',
                        },
                        {     key: 'doanhNghiepDk',
                              label: 'Đơn Vị Kê Khai',
                        },
                        {     key: 'dongGoi',
                              label: 'Quy Cách Đóng Gói',
                        },
                        {     key: 'giaBan',
                              label: 'Giá Kê Khai',
                        },
                        {     key: 'dvt',
                              label: 'ĐVT',
                        }
                  ],
                  fields_BidPrices:
                  [
                        {     key: 'ngayQuyetDinh',
                              label: 'Ngày Quyết Định',
                        },
                        {     key: 'ctyTrungThau',
                              label: 'Bệnh Viện/ Sở Y Tế',
                        },
                        {     key: 'dvt',
                              label: 'Đơn Vị Tính',
                        },
                        {     key: 'donGia',
                              label: 'Đơn Giá',
                        },
                        {     key: 'sl',
                              label: 'Số Lượng',
                        },
                        {     key: 'dongGoi',
                              label: 'Quy Cách Đóng Gói',
                        }
                  ],
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
            this.GetManifests();
            this.GetBidPrices();
      },
      methods:{
            async GetDrugByID(params){
            await axios
                  .get('https://www.drugbank.vn/services/drugbank/api/public/thuoc/'+params)
                  .then(response => (this.info = response.data));
            },
            GetManifests(){
            axios
                  .get('https://www.drugbank.vn/services/drugbank/api/public/gia-ke-khai?size=10000&sdk='+this.route)
                  .then(response => (this.manifests = response.data));
            },
            GetBidPrices(){
            axios
                  .get('https://www.drugbank.vn/services/drugbank/api/public/gia-trung-thau?sdk='+this.route)
                  .then(response => (this.BidPrices = response.data));
            },
      },
      computed:{
            url(){
                  return `https://www.drugbank.vn/api/public/gridfs/${this.info.images}`
            },
      }
}
</script>
<style scoped>
.name{
      background: #40c4ff;
      color:#fff;
      padding:.25rem;
      font-size: 1.2rem;
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
.element{
      padding:.5rem .25rem;
}
.title{
      color:#192559;
      font-weight:bold;
}

</style>
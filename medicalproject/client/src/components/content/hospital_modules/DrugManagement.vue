<template>
    <div class="container mt-5 py-3">
                <b-row>
                    <b-col md="12" class="d-flex">
                        <b-col class="my-3" md="5">
                            <b-form-group label-cols-sm="3" label="Lọc" class="mb-0">
                            <b-input-group>
                                <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                                <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                                </b-input-group-append>
                            </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col class="my-3"  md="5" >
                            <b-form-group label-cols-sm="3" label="Mỗi Trang" class="mb-0">
                            <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col md="2" class="my-3 d-flex justify-content-end">
                            <b-button variant="outline-primary" size='sm' v-b-modal.modal-add>Thêm Thuốc Mới</b-button>
                        </b-col>
                    </b-col>
                    
                </b-row>
                <b-table
                show-empty
                bordered
                hover
                dark
                striped
                stacked="md"
                :items="listDrug"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                ref="table"
                @filtered="onFiltered"
                >
                    <template slot="actions" slot-scope="row">
                        <b-button size="sm" @click="showModalModifyDrug(row.item, row.index, $event.target)" variant="outline-success" class="mr-1">
                            Sửa Thông Tin
                        </b-button>  

                        <b-button size="sm" @click="deleteDrug(row.item, row.index, $event.target)" variant="outline-warning" class="ml-1">
                            Xóa Thuốc
                        </b-button>
                    </template>
                </b-table>

                <b-row>
                    <b-col md="6" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        class="my-0"
                        ></b-pagination>
                    </b-col>
                </b-row>




        <b-modal id="modal-add" size='lg' ref="modal-add" title="Thêm Thuốc">
            <div>
                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Tên Thuốc</p>
                    <span class="col-sm-8">
                        <input type="text" list="LoadListDrug" v-model="infoModal.tenThuoc" class="width-100 style_input">
                        <datalist id="LoadListDrug">
                            <option v-for="(drug,index) in tenThuocSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div> 

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Hoạt Chất</p>
                    <span class="col-sm-8"><input list="ListHoatChat"  type="text" v-model="infoModal.hoatChat" class="width-100 style_input"></span>
                    <datalist id="ListHoatChat">
                        <option v-for="(drug,index) in hoatChatSystem" :key="index">{{drug}}</option>
                    </datalist>
                </div>

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Nồng Độ/Hàm Lượng</p>
                    <span class="col-sm-8">
                        <input type="text" list="ListNongDo" v-model="infoModal.nongDo" class="width-100 style_input">
                        <datalist id="ListNongDo">
                            <option v-for="(drug,index) in nongDoSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div>

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Dạng Bào Chế</p>
                    <span class="col-sm-8">
                        <input type="text" list="ListBaoChe" v-model="infoModal.baoChe" class="width-100 style_input">
                        <datalist id="ListBaoChe">
                            <option v-for="(drug,index) in baoCheSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div>

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Hạn Sử Dụng</p>
                    <span class="col-sm-8">
                        <input type="text" list="ListTuoiTho" v-model="infoModal.tuoiTho" class="width-100 style_input">
                        <datalist id="ListTuoiTho">
                            <option v-for="(drug,index) in tuoiThoSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div>
                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Công Ty Sản Xuất</p>
                    <span class="col-sm-8">
                        <input type="text" v-model="infoModal.congTySx" autocomplete="on" class="width-100 style_input">
                    </span>
                </div>
            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                <b-button
                    variant="secondary"
                    size="sm"
                    class="float-left text-white"
                    @click="resetModal"
                >
                    Đóng
                </b-button>
                <b-button
                    variant="warning"
                    size="sm"
                    class="float-right SendRequestCreateDrug text-white"
                    @click="checkform('add')"
                >
                    <img src="@/assets/images/send.svg" /> Thêm Thuốc
                </b-button>
                </div>
            </template>
        </b-modal>

        <b-modal id="modal-modify" size='lg' ref="modal-modify" title="Thêm Thuốc">
            <div>
                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Tên Thuốc</p>
                    <span class="col-sm-8">
                        <input type="text" list="LoadListDrug" v-model="infoModal.tenThuoc" class="width-100 style_input">
                        <datalist id="LoadListDrug">
                            <option v-for="(drug,index) in tenThuocSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div> 

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Hoạt Chất</p>
                    <span class="col-sm-8"><input list="ListHoatChat"  type="text" v-model="infoModal.hoatChat" class="width-100 style_input"></span>
                    <datalist id="ListHoatChat">
                        <option v-for="(drug,index) in hoatChatSystem" :key="index">{{drug}}</option>
                    </datalist>
                </div>

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Nồng Độ/Hàm Lượng</p>
                    <span class="col-sm-8">
                        <input type="text" list="ListNongDo" v-model="infoModal.nongDo" class="width-100 style_input">
                        <datalist id="ListNongDo">
                            <option v-for="(drug,index) in nongDoSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div>

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Dạng Bào Chế</p>
                    <span class="col-sm-8">
                        <input type="text" list="ListBaoChe" v-model="infoModal.baoChe" class="width-100 style_input">
                        <datalist id="ListBaoChe">
                            <option v-for="(drug,index) in baoCheSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div>

                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Hạn Sử Dụng</p>
                    <span class="col-sm-8">
                        <input type="text" list="ListTuoiTho" v-model="infoModal.tuoiTho" class="width-100 style_input">
                        <datalist id="ListTuoiTho">
                            <option v-for="(drug,index) in tuoiThoSystem" :key="index">{{drug}}</option>
                        </datalist>
                    </span>
                </div>
                <div class="my-2 d-flex">
                    <p class="col-sm-4 title_editor">Công Ty Sản Xuất</p>
                    <span class="col-sm-8">
                        <input type="text" v-model="infoModal.congTySx" autocomplete="on" class="width-100 style_input">
                    </span>
                </div>
            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                <b-button
                    variant="secondary"
                    size="sm"
                    class="float-left text-white"
                    @click="CloseModalModify"
                >
                    Đóng
                </b-button>
                <b-button
                    variant="warning"
                    size="sm"
                    class="float-right SendRequestCreateDrug text-white"
                    @click="checkform('modify')"
                >
                    <img src="@/assets/images/send.svg" /> Gửi Yêu Cầu Sửa Thông Tin
                </b-button>
                </div>
            </template>
        </b-modal>
    </div>
    
</template>

<script>
import HospitalService from '@/services/HospitalService'
import axios from 'axios';
export default {
    data(){
        return{
            listSystem:'',
            listDrug:[],
            tenThuocSystem:'',
            hoatChatSystem:'',
            nongDoSystem:'',
            baoCheSystem:'',
            tuoiThoSystem:'',
            selected:'',
            infoModal: {
                tenThuoc: '',
                hoatChat: '',
                baoChe:'',
                nongDo:'',
                tuoiTho:'',
                congTySx:'',
                id:''
            },
            user:'',
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15],
            filter: null,
            fields: [
                { key: 'tenThuoc', label: 'Tên Thuốc', sortable: true, sortDirection: 'desc' },
                { key: 'hoatChat', label: 'Hoạt Chất', sortable: true},
                { key: 'baoChe', label: 'Dạng Bào Chế', sortable: true, sortDirection: 'desc' },
                { key: 'nongDo', label: 'Nồng Độ', sortable: true, sortDirection: 'desc' },
                { key: 'tuoiTho', label: 'Hạn Sử Dụng', sortable: true, sortDirection: 'desc' },
                { key: 'actions', label: 'Actions', class: 'd-flex justify-content-center ' }
            ],
        }
    },
    async created(){
        this.fetchdata();
        const user = await localStorage.getItem("user");
        const userJSON = await JSON.parse(user)
        this.user = await userJSON;
        const roles = userJSON.roles
        this.listDrug = (await HospitalService.getListDrugBank(userJSON.id)).data;
        this.totalRows = this.listDrug.length
    },
    methods:{
        CloseModalModify(){
            this.$refs['modal-modify'].hide();
        },
        showModalModifyDrug(item,index,button){
            this.infoModal.tenThuoc = item.tenThuoc;
            this.infoModal.hoatChat = item.hoatChat;
            this.infoModal.baoChe = item.baoChe;
            this.infoModal.nongDo = item.nongDo;
            this.infoModal.tuoiTho = item.tuoiTho;
            this.infoModal.congTySx = item.congtySx;
            this.infoModal.id = item.id;
            this.$refs['modal-modify'].show();

        },
        async deleteDrug(item,index,button){
            if(this.user.id){
                try {
                    await HospitalService.SendRequestDeleteDrug({
                        id:item.id,
                    })
                    if (~index) 
                        this.listDrug.splice(index, 1)
                    this.$toasted.show('Xóa Thành Công !!!', { 
                        theme: "bubble",
                        position: "bottom-right", 
                        duration : 4000
                    });
                }catch (error) {
                        this.$toasted.show(`${error.response.data.error}`, { 
                            theme: "toasted-primary",
                            position: "bottom-center", 
                            duration : 4000
                    });
                }
            }
        },
        checkform(route){
            if(!this.infoModal.tenThuoc && !this.infoModal.hoatChat && !this.infoModal.baoChe && !this.infoModal.nongDo && !this.infoModal.tuoiTho && !this.infoModal.congTySx ){
                this.$toasted.show('Vui Lòng Nhập Đầy Đủ Thông Tin !!!', { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 4000
                });
            }else{
                if(route === 'add'){
                    this.SendRequestCreateDrug();
                }else{
                    this.SendRequestModifyDrug();
                }
            }
        },
        async SendRequestModifyDrug(){
            if(this.user.id){
                try {
                    await HospitalService.SendRequestModifyDrug({
                        id:this.infoModal.id,
                        id_hospital: this.user.id,
                        tenThuoc: this.infoModal.tenThuoc,
                        hoatChat: this.infoModal.hoatChat,
                        baoChe:this.infoModal.baoChe,
                        nongDo:this.infoModal.nongDo,
                        tuoiTho:this.infoModal.tuoiTho,
                        congTySx:this.infoModal.congTySx,
                    })
                    this.$toasted.show(`Cập Nhật Thành Công`, { 
                        theme: "toasted-primary",
                        position: "bottom-center", 
                        duration : 4000
                    });
                    this.listDrug.filter(x=>x.id == this.infoModal.id).map((item) => {
                        item.tenThuoc = this.infoModal.tenThuoc;
                        item.hoatChat = this.infoModal.hoatChat;
                        item.baoChe = this.infoModal.baoChe;
                        item.nongDo = this.infoModal.nongDo;
                        item.tuoiTho = this.infoModal.tuoiTho;
                        item.congTySx = this.infoModal.congTySx;
                    })
                    this.CloseModalModify();
                }catch (error) {
                        this.$toasted.show(`${error.response.data.error}`, { 
                            theme: "toasted-primary",
                            position: "bottom-center", 
                            duration : 4000
                    });
                }
            }
        },
        async SendRequestCreateDrug(){
            if(this.user.id){
                try {
                    await HospitalService.SendRequestCreateDrugbank({
                        id_hospital: this.user.id,
                        tenThuoc: this.infoModal.tenThuoc,
                        hoatChat: this.infoModal.hoatChat,
                        baoChe:this.infoModal.baoChe,
                        nongDo:this.infoModal.nongDo,
                        tuoiTho:this.infoModal.tuoiTho,
                        congTySx:this.infoModal.congTySx,
                    })
                    this.$toasted.show(`Thêm Thuốc mới thành công`, { 
                        theme: "toasted-primary",
                        position: "bottom-center", 
                        duration : 4000
                    });
                }catch (error) {
                        this.$toasted.show(`${error.response.data.error}`, { 
                            theme: "toasted-primary",
                            position: "bottom-center", 
                            duration : 4000
                    });
                }
                this.resetModal();
            }
          
        },
        resetModal(){
            this.$refs['modal-add'].hide();
            this.infoModal = '';
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        async fetchdata(){
            await axios
                .get('https://www.drugbank.vn/services/drugbank/api/public/thuoc?page=1&size=2000&fbclid=IwAR1vamwLTdSmIx8idqXMjg77a18AZ4nZYROoLE8dTTAR0sS4EUlvt7W3lMQ')
                .then(response => (this.listSystem = response.data.filter(x=>x).map(x=>x)));
            this.tenThuocSystem = [...new Set(this.listSystem.map(x=>x.tenThuoc))]
            this.hoatChatSystem = [...new Set(this.listSystem.map(x=>x.hoatChat))] 
            this.nongDoSystem = [...new Set(this.listSystem.map(x=>x.nongDo))]
            this.baoCheSystem = [...new Set(this.listSystem.map(x=>x.baoChe))] 
            this.tuoiThoSystem =[...new Set(this.listSystem.map(x=>x.tuoiTho))] 
        }
    }
    
}

</script>

<style scoped>
.title_editor{
  font-weight: bold;
  color:tomato;
}
.style_input{
  border: 1px solid rgba(0,0,0,.54);
  border-radius: 2px;
  padding:0.25rem;
}
.width-100{
  width: 100%;
}
.SendRequestCreateDrug img{
    height:1rem;
    width:1rem;
}
</style>

<template>
    <div class="pt-5">
        <div class="bg-main"  
           :style="{'background-image': 'url(' + require('@/assets/images/bg-searchdrug.png') + ')'}">   
            <div class="alphabet d-flex container justify-content-around">
                <div v-for="(alpha,index) in alphabet" :key="index" class="alphabet-item "> 
                        <span @click="searchByAlphabet(alpha)">{{alpha}}</span>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center justify-content-center pt-3"> 
                <div class="add" v-b-modal.modal-advancedSearch>+</div>
                <input class="search-input" v-model="search" type="text" >
                <div class="search-btn" @click="searchDrug()">&#x1F50D;</div>
            </div>

            <div class="d-flex flex-row align-items-center justify-content-center mt-3">
                <div :class="[drugsActive ? ActiveClass : '']" class="options radius_left" @click="setActice('drug')">
                    <img :src="drugsActive ? require(`@/assets/images/drugs-active.svg`) : require(`@/assets/images/drugs.svg`) "/>
                    <span class="name_option ">Tên Thuốc</span>
                </div>
                <div :class="[chemicalActive ? ActiveClass : '']" class="options" @click="setActice('chemical')">
                    <img v-bind:src="chemicalActive ? require('@/assets/images/chemical-active.svg') : require('@/assets/images/chemical.svg')" />
                    <span class="name_option">Hoạt Chất</span>
                </div>
                <div :class="[aidActive ? ActiveClass : '']" class="options radius_right" @click="setActice('aid')">
                    <img v-bind:src="aidActive ? require('@/assets/images/aid-active.svg') : require('@/assets/images/aid.svg')" />
                    <span class="name_option ">CSKD Dược</span>
                </div>
            </div>

        </div>
        <div class="d-flex justify-content-center  align-items-baseline pt-2 list-drugs">
            <img src="@/assets/images/medicine.svg" alt />
            <h4 class="ml-2">Danh Sách Thuốc</h4>
        </div>

        <b-container fluid class="py-3 bg_list_drug">
            <b-row class="mb-4">
                <b-col lg="6" class="my-1">
                    <b-form-group
                    label="Lọc"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="filterInput"
                    class="mb-0"
                    >
                    <b-input-group size="sm">
                        <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Nhập từ khóa bạn muốn tìm kiếm"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Làm Mới</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col sm="5" md="6" class="my-1">
                    <b-form-group
                    label="Hiển thị"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                    >
                    <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                    ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-table
            show-empty
            medium
            stacked="md"
            bordered
            striped
            :items="info.data"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            @filtered="onFiltered"
            >

            <template slot="actions" slot-scope="row" class="d-flex justify-content-start">
                <b-button size="sm" @click="SeeDetailsDrug(row.item, row.index, $event.target)" class="btn-success text-white ">
                    Xem
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
        </b-container>
          <b-modal id="modal-advancedSearch" title="Tìm Kiếm Nâng Cao" button-size="sm">
            <div class="my-2 d-flex" v-for="(item,index) in advancedSearch_fields" :key="index">
                <p class="col-sm-5">{{item.label}}</p>
                <span class="col-sm-7"><input type="text" v-model="item.key" class="width-100"></span>
            </div>
                <template v-slot:modal-footer>
                    <div class="w-100">
                    <b-button
                        variant="secondary"
                        size="sm"
                        class="float-left"
                        @click="resetAdvancedSearch"
                    >
                        &#8709;&nbsp;Đặt Lại
                    </b-button>
                    <b-button
                        variant="success"
                        size="sm"
                        class="float-right"
                        @click="advancedSearch_fn"
                    >
                        &#10148;&nbsp;Tìm Kiếm Nâng Cao
                    </b-button>
                    </div>
                </template>
        </b-modal>
        </div>
</template>


<script>
import axios from 'axios'
export default {
    data () {
        return {
            alphabet:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            info:'',
            search:'',
            drugsActive:true,
            aidActive:false,
            chemicalActive:false,
            ActiveClass:'ActiveClass',
            fields: [
                { key: 'soDangKy', label: 'Số Đăng Kí', sortable: true, sortDirection: 'desc' },
                { key: 'tenThuoc', label: 'Tên Thuốc', sortable: true, sortDirection: 'desc' },
                { key: 'hoatChat', label: 'Hoạt Chất', sortable: true, sortDirection: 'desc' },
                { key: 'congTySx', label: 'Công Ty Sản Xuất', sortable: true, sortDirection: 'desc' },
                { key: 'nuocSx', label: 'Nước Sản Xuất', sortable: true, sortDirection: 'desc' },
                { key: 'actions', label: 'Xem' }
            ],
            advancedSearch_fields: [
                { key: this.searchBy_Name, label: 'Tên thuốc ',val:'&tenThuoc=' },
                { key: this.searchBy_ActiveSubstance, label: 'Hoạt Chất',val:'&hoatChat=' },
                { key: this.searchBy_Pack, label: 'Đóng Gói',val:'&dongGoi=' },
                { key: this.searchBy_RegistrationNumber, label: 'Số Đăng Kí',val:'&soDangKy=' },
                { key: this.searchBy_ProductionCompany, label: 'Công Ty Sản Xuất',val:'&congTySx=' },
                { key: this.searchBy_ProductionCountry, label: 'Nước Sản Xuất',val:'&nuocSx=' },
                { key: this.searchBy_CompanyRegistration, label: 'Công Ty Đăng Kí',val:'&congTyDk=' },
                { key: this.searchBy_RegistrationCountry, label: 'Nước Đăng Kí',val:'&nuocDk=' },
            ],
            advancedSearch_keys:[this.searchBy_Name,this.searchBy_ActiveSubstance],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 30],
            filter: null,
            CurrentActive:'tenThuoc',
            searchBy_Name:'',
            searchBy_ActiveSubstance:'',
            searchBy_Pack:'',
            searchBy_RegistrationNumber:'',
            searchBy_ProductionCompany:'',
            searchBy_ProductionCountry:'',
            searchBy_CompanyRegistration:'',
            searchBy_RegistrationCountry:'',
        }
    },
    async mounted(){
        await axios
        .get('https://www.drugbank.vn/services/drugbank/api/public/thuoc?page=1&size=2000&fbclid=IwAR1vamwLTdSmIx8idqXMjg77a18AZ4nZYROoLE8dTTAR0sS4EUlvt7W3lMQ')
        .then(response => (this.info = response));
        this.totalRows = this.info.data.length;

        console.log(this.info.data);
    },
    methods:{
        setActice(payload){
            if(payload == 'drug'){
                this.drugsActive = true;
                this.aidActive = false;
                this.chemicalActive = false;
                this.CurrentActive = 'tenThuoc'
            }else if(payload == 'chemical'){
                this.chemicalActive = true;
                this.drugsActive = false;
                this.aidActive = false;
                this.CurrentActive = 'hoatChat'
            }else{
                this.drugsActive = false;
                this.aidActive = true;
                this.chemicalActive = false;
                this.CurrentActive = 'congTySx'
            }
        },
        SeeDetailsDrug(item, index, button){
            this.$router.push({
                path: `/DrugDetails/${item.id}`
            })
        },
        async searchByAlphabet(word){
            await axios
            .get(`https://www.drugbank.vn/services/drugbank/api/public/thuoc?page=0&size=12&tenThuoc=${word}&sort=tenThuoc,asc`)
            .then(response => (this.info = response));
        },
        async searchDrug(){
            await axios
            .get(`https://www.drugbank.vn/services/drugbank/api/public/thuoc?page=0&size=12&${this.CurrentActive}=${this.search}&sort=tenThuoc,asc`)
            .then(response => (this.info = response));
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        resetAdvancedSearch(){
            this.advancedSearch_fields.filter(x=> x.key = '');
        },
        async advancedSearch_fn(){
            let query = 'https://www.drugbank.vn/services/drugbank/api/public/thuoc?page=-1&size=12&'; //add vo query
            for(let i = 0;i<8;i++){
                if(this.advancedSearch_fields[i].key){
                    query = query.concat(this.advancedSearch_fields[i].val.concat(this.advancedSearch_fields[i].key))
                }
            }

            query = query.concat('&sort=tenThuoc,asc');
            await axios
            .get(`${query}`)
            .then(response => (this.info = response));
            this.$root.$emit('bv::hide::modal', 'modal-advancedSearch', '#btnShow')
        }
    }
}

</script>
<style scoped>
    .bg-main{
        background-repeat: no-repeat;
        width: 100%;
        height: 40vh;
        background: rgb(2,0,36);
        /* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%); */
    }
    .alphabet{
        padding-top:40px;
    }
    .alphabet-item{
        color:white;
        cursor: pointer;
        font-size:0.9rem;
    }
    .alphabet-item:hover{
        text-decoration: underline;
    }
    .search-input{
        width:50vw;
        padding:.35rem;
        border:2px solid #40c4ff;
    }
    .search-btn{
        border:2px solid #40c4ff;
        padding:.35rem .5rem;
        background: #40c4ff;
        border-radius:0 5px 5px 0;
        cursor: pointer;
    }
    .add{
        color:#fff;
        background: #40c4ff;
        padding:0.5rem 1rem;
        cursor: pointer;
        border-radius: 5px 0 0 5px;
    }
    .radius_left{
        border-radius: 2px 0 0 2px;
    }
    .radius_right{
        border-radius:0 2px 2px 0;
    }
    .options{
        padding: 0.4rem 4.4rem;
        cursor: pointer;
        background: #fff;
    }
    .options img{
        height: 1rem;
        width: 1rem;
    }
    .name_option{
        margin-left: 0.25rem;
    }
    .ActiveClass{
        background: #40c4ff;
        color:#fff;
    }
    .list-drugs{
        background: #37ab86;
        color:#fff;
    }
    .list-drugs img{
        height: 1rem;
        width: 1rem;
    }
    .bg_list_drug{
        background: rgba(242, 242, 242, .3);
    }
    .width-100{
        width: 100%;
    }

</style>


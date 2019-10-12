<template>
    <div class="pt-5">
        <div class="bg-main"  
           :style="{'background-image': 'url(' + require('@/assets/images/bg-searchdrug.png') + ')'}">   
            <div class="alphabet d-flex container justify-content-around">
                <div v-for="(alpha,index) in alphabet" :key="index" class="alphabet-item "> 
                        {{alpha}}
                </div>
            </div>

            <div class="d-flex flex-row align-items-center justify-content-center pt-3"> 
                <div class="add">+</div>
                <input class="search-input" type="text" >
                <div class="search-btn">&#x1F50D;</div>
            </div>



            <div class="d-flex flex-row align-items-center justify-content-center mt-3">
                <div :class="[drugsActive ? ActiveClass : '']" class="options radius_left" @click="setActice('drug')">
                    <img v-bind:src="drugsActive ? '/img/drugs-active.2a514655.svg' : '/img/drugs.5b1e17f7.svg'" />
                    <span class="name_option ">Tên Thuốc</span>
                </div>
                <div :class="[chemicalActive ? ActiveClass : '']" class="options" @click="setActice('chemical')">
                    <img v-bind:src="chemicalActive ? '/img/chemical-active.8eef206c.svg' : '/img/chemical.a4a8a2f7.svg'" />
                    <span class="name_option">Hoạt Chất</span>
                </div>
                <div :class="[aidActive ? ActiveClass : '']" class="options radius_right" @click="setActice('aid')">
                    <img v-bind:src="aidActive ? '/img/aid-active.6bfa20df.svg' : '/img/aid.2f56418d.svg'" />
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
        </div>
</template>


<script>
import axios from 'axios'
export default {
    data () {
        return {
            alphabet:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            info:'',
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
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 30],
            filter: null,
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
            console.log(payload)
            if(payload == 'drug'){
                this.drugsActive = true;
                this.aidActive = false;
                this.chemicalActive = false;
            }else if(payload == 'chemical'){
                this.chemicalActive = true;
                this.drugsActive = false;
                this.aidActive = false;
            }else{
                this.drugsActive = false;
                this.aidActive = true;
                this.chemicalActive = false;
            }
        },
        SeeDetailsDrug(item, index, button){
            console.log(item);
            console.log(item);
            console.log(item);
            this.$router.push({
                path: `/DrugDetails/${item.id}`
            })
            // await axios
            // .get('//https://www.drugbank.vn/services/drugbank/api/public/thuoc/VD-23889-15')
            // .then(response => (this.info = response));
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
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
</style>


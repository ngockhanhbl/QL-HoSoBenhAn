<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <div class="pt-5 pb-4">
      <b-row class="my-1 justify-content-between">
          <div class="pl-4">
              Xin Chào, Username 
          </div>
            <div class="subcriber">
                <span><input type="text" v-model="drug_filter"  placeholder="Chụp X-quang..."/></span>
                <span class="btn-sub" :disabled="!drug_filter" @click="drug_filter = ''"><img src="@/assets/images/search.svg" /><span class="pl-2 pr-1" >Xóa Tìm Kiếm</span></span>
            </div>
            <div class="pr-3 options">
                <span>Hiển Thị</span>
                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>    
            </div>
      </b-row>
    </div>

    <!-- Main table element -->
    <b-table
      bordered
      show-empty
      stacked="md"
      :items="patient_records_details"
      :fields="fields_DrugSynthetic"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="drug_filter"
      @filtered="onFiltered"
    >

      <template slot="stt" slot-scope="row" >
        {{row.index + 1}}
      </template>

      <template slot="modify_real_drank" slot-scope="row" >
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1 details btn-light">
          <img src="@/assets/images/tools.svg" />
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

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
      <input type="text" v-model="modify_real_drank">
      <button @click="modify">Thay đổi</button>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters} from "vuex";
  export default {
     data(){
      return{
        showModal: false,
        infoModal: {
            id: 'info-modal',
            title: '',
            content: '',   
          },
          modify_real_drank:'',
          itemCus:'',
          indexCus:'',
          buttonCus:''
          
      }
    },
    computed: {
        ...mapGetters(
      ["patient_records_details",
      "fields_DrugSynthetic",
      "pageOptions",]
    ),
    totalRows: {
           get(){
               return this.$store.getters.totalRows
            },
           set(payload){  
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'totalRows'
                })
           }
        },
    drug_filter: {
           get(){ 
               return this.$store.getters.drug_filter
            },
           set(payload){  
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'drug_filter'
                })
           }
        },
    currentPage: {
           get(){ 
               return this.$store.getters.currentPage
            },
           set(payload){
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'currentPage'
                })
           }
        },
    perPage: {
           get(){ 
               return this.$store.getters.perPage
            },
           set(payload){
               this.$store.dispatch("update_inforListPatient",{
                    payloadValue: payload,
                    payloadRouter:'perPage'
                })
           }
        }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.patient_records_details.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Dashbord Chỉnh Sửa`
        this.infoModal.content =''
        this.itemCus = item
        this.indexCus = index
        this.buttonCus = button
        this.$root.$emit('bv::show::modal', this.infoModal.id, button) 
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },

      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      modify(){
        let temp  = this.patient_records_details.filter(f => f.id_record == this.indexCus + 1);
        temp.total = this.modify_real_drank
      }
    }
  }
</script>

<style scoped>
.btn-sub {
   border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  padding: 6px;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
    }
.btn-sub img {
    height: 1.2em;
    width: 1.2em;
}
.subcriber input {
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  padding: 4px;
  font-size: 14px;
  width: 20vw;
}
.details{
    cursor: pointer;
}
.details img{
  height: 2rem;
  width:2rem;
}
select{
    width: 50%;
}
.options select{
    width: 80px;
    margin-left: 1.5rem;
}

</style>
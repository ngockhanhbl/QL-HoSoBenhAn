<template>
    <div>
            <div class="main_register m-auto ">
              <div class="d-flex pr-5 pt-4 ">
                <div class="mr-auto pl-5 pt-3">Xin Chào Admin</div>
              </div>
                  <b-row class="px-5">
                    <b-col md="6" class="my-3">
                      <b-form-group label-cols-sm="3" label="Lọc" class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                          <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>

                    <b-col md="6" class="my-3">
                      <b-form-group label-cols-sm="3" label="Mỗi Trang" class="mb-0">
                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                <div class="register">
                    <div class="p_1r mlr_1-5r" >
                      <b-table
                        small 
                        show-empty
                        bordered
                        striped
                        outlined
                        :items="feedback"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        @filtered="onFiltered"
                      >
                        <template slot="actions" slot-scope="row" class="d-flex justify-content-start">
                          <b-button size="sm" @click="markToSupportDone(row.item, row.index, $event.target)" class="ml-4 mr-4 btn-info text-white">
                            &#x2713;
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

                </div>
            </div>  
      </div>
    </div>
</template>



<script>
import GeneralService from '@/services/GeneralService'
import AdminService from '@/services/AdminService'
  export default {
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          {key: 'name', label: 'Họ Và Tên', sortable: true, class: 'text-center'},
          { key: 'email', label: 'Email'},
          { key: 'message', label: 'Lời Nhắn'},
          { key: 'createdAt', label: 'Thời Gian'},
          { key: 'actions', label: 'Hành động', class: 'd-flex justify-content-center ' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        feedback:null
      }
    },
    async mounted() {
      this.feedback = (await GeneralService.getAllFeedback()).data
      this.totalRows = this.feedback.length
    },
    methods: {
      async markToSupportDone(item, index, button){
        await AdminService.markToSupportDone({
          id: item.id
        })

          this.$toasted.show(`Đánh dấu hỗ trợ khách hàng ${item.name} thành công !!`, { 
            theme: "toasted-primary", 
            position: "bottom-right", 
            duration : 3000
        });
        this.feedback = (await GeneralService.getAllFeedback()).data
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    }
  }
</script>

<style scoped>

*{
    font-size: 14px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    color: rgba(0,0,0,.54);
}
.bg{
    background-repeat: no-repeat;
    background-size:cover
}
.main_register{
    max-width: 95vw;
    width: 100%;
    background:white;
    border-radius: 2px;
    background: white;
}
.p_1r{
    padding: 1rem;
}
.mlr_1-5r{
    margin: 0 1.5rem;
}
.hello{
  padding-left: 2rem;

}
.modify-btn{
  color:#365899;
}
.modify-btn:hover{
  text-decoration: underline;
  color: #273f6e;
}

.model_wrapper{
  align-items: center;
  border-bottom: 1px solid rgba(190,195,201);
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.model_wrapper:first-child{
  border-top: 1px solid #aaa;
}
.model_wrapper:last-child{
  border-bottom: 1px solid #aaa;
}
.model_wrapper:hover{
  background: #f5f6f7;
  
}
.model_title{
  color: #333;
}
.orange-btn{
  background:#FF6F00;
  color:white;
  
}
.alert-error{
  color:red;
}

</style>
 
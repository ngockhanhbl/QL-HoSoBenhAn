import Api from '@/services/Api'

export default {
  get_DrugRecordPatient () {
    return Api().get('get_DrugRecordPatient',{
      params: {
        
      }
    })
  },
}

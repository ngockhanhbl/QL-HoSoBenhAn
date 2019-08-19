export default {
   state : {
      jobs:[
          {id:1,id_jobs:1,location:'Hồ Chí Minh',name:'Senior Blockchain Engineer'},
          {id:2,id_jobs:1,location:'Hà Nội',name:'Fresher Vuejs Engineer'},
          {id:3,id_jobs:1,location:'Hồ Chí Minh',name:'Junior React Engineer'},
          {id:4,id_jobs:1,location:'Hồ Chí Minh',name:'Senior Blockchain Engineer'},
          {id:5,id_jobs:1,location:'Cao Bằng',name:'Intership Vuejs Engineer'},
          {id:6,id_jobs:2,location:'Hồ Chí Minh',name:'Technical Product Manager'},
          {id:7,id_jobs:3,location:'Hà Nội',name:'Accountant'},
          {id:8,id_jobs:3,location:'Hồ Chí Minh',name:'Senior DevOps Engineer'},
          {id:9,id_jobs:3,location:'Hà Nội',name:'Senior DevOps Engineer'},
      ],
      
      abc : 1,
  },
  getters: {
      jobsDev: state => state.jobs.filter(job => {
        return job.id_jobs == 1;
       }),
       jobsPro: state => state.jobs.filter(job => {
        return job.id_jobs == 2;
       }),
       jobsFin: state => state.jobs.filter(job => {
        return job.id_jobs == 3;
       }),
  },
  mutations: {

  },
  actions: {

  }
  
}

<template>
    <div class="page-about">
        <div class="main-content">
            <ul>
                <li class="active-hr">
                    Sứ Mệnh Của Chúng Tôi
                </li>
                <li @click="jumptoAboutUs">
                    Về Chúng Tôi
                </li>
            </ul>
        </div>
        <div class="mission">
            <strong class="title d-flex ">Chúng Tôi Là Công Ty Áp Dụng BlockChain Để Quản Lý Hồ Sơ Bệnh Án</strong>
            <p class="misson-content d-flex">Sứ Mệnh của chúng tôi là đẩy nhanh quá trình chuyển đổi chăm sóc sức khỏe với sức mạnh
                của công nghệ blockchain ,cho phép bất cứ ai là công dân Việt Nam đều có thể quản lý hồ sơ bệnh án của mình một cách dễ dàng
                thống nhất và xuyên suốt cuộc đời giúp cải thiện cuộc sống của hơn 97 triệu dân Việt Nam và  tiến tới thời kì 4.0</p>
            <p class="misson-content d-flex">Chúng tôi tin rằng trong tương lai gần,công nghệ quản lý hồ sơ bệnh của chúng tôi sẽ trở nên phổ biến tại Việt Nam,
               thay thế hoàn toàn quản lý hồ sơ bằng sổ sách và hồ sơ điện tử thông thường. sự tín nhiệm của bạn là động lực to lớn cho công ty chúng tôi.</p>
            <div class="space"></div>
            <strong class="title d-flex">Dễ Dàng Sử Dụng</strong>
            <p class="misson-content d-flex">Hồ sơ bệnh án của bạn sẽ được chúng tôi thiết kế theo nhiều dạng dễ dàng theo dõi nhất,do
                đó không chỉ các bác sĩ đa khoa có thể hành động mà ngay cả chính bạn cũng có thể chủ động quan sát và hành động,
                giúp bạn tối ưu hóa các quyết định về sức khỏe của mình.
            </p>
        </div>
        <div class=" d-flex title_founder justify-content-center flex-wrap">
            <strong >Về Team Của Chúng Tôi</strong>
        </div>
        <div class="aboutteam container ">
            <div class="mygroup">
                <div class="mr-5"><img src="@/assets/images/team.jpeg" /></div>
                <div class="content-abouteam">                   
                    <strong>Xin Chào Chúng Tôi Là EHR MedicalBlock,</strong>
                    <p class="mt18">Chúng tôi là kỹ sư lập trình, bác sĩ, nhà nghiên cứu và thiết kế đồ họa
                        công ty chúng tôi có hơn 10 năm kinh nghiệm trong lĩnh vực nghiên cứu và phát
                        triển các giải pháp blockchain đặc biệt là trong linh vực y tế.
                    </p>
                    <p>Môi trường cởi mở, thân thiện là những gì chúng tôi muốn hướng tới.
                        tại EHR MedicalBlock, những con người nhiệt huyết gắng kết cùng nhau tạo nên giá trị
                         tốt đẹp và bền vững, góp phần xây dựng và phát triển những vấn đề y tế - vấn đề được quan tâm hàng đầu.
                    </p>
                    <p>Nếu bạn đang cảm thấy ở EHR MedicalBlock phù hợp với mình, còn chần chờ gì mà không đăng kí cùng chúng tôi.
                    </p>
                    <router-link to="/Jobs"><p class="btn jointous">Việc Làm Tại EHR MedicalBlock</p></router-link>
                </div>
            </div>
            <div class="leader ">
                 <strong class="title figure">Nhà Sáng Lập, Lãnh Đạo</strong>
                 <div class="wrap-leader">             
                        <figure class="figure">
                        <img src="@/assets/images/ceo.jpg" class="figure-img img-fluid">
                        <figcaption class="figure-caption"><strong>Ngọc Khanhs</strong></figcaption>
                        <figcaption class="figure-caption"><span>Founder</span></figcaption>
                    </figure>
                    <figure class="figure">
                        <img src="@/assets/images/ceo.jpg" class="figure-img img-fluid">                
                        <figcaption class="figure-caption"><strong>Ngọc Khanh</strong></figcaption>
                        <figcaption class="figure-caption"><span>CEO</span></figcaption>
                    </figure>                                 
                    <figure class="figure ">
                        <img src="@/assets/images/ceo.jpg" class="figure-img img-fluid">
                        <figcaption class="figure-caption"><strong>Ngọsc Khanh</strong></figcaption>
                        <figcaption class="figure-caption"><span>Leader</span></figcaption>
                    </figure>
                    <figure class="figure ">
                        <img src="@/assets/images/ceo.jpg" class="figure-img img-fluid">           
                        <figcaption class="figure-caption"><strong>Ngọc Khanh</strong></figcaption>
                        <figcaption class="figure-caption"><span>Co-Founder</span></figcaption>
                    </figure>
              
                 </div>
            </div>
            <div class="" style="height:200px;width100%;"></div>
        </div>
    </div>
</template>

<script>
export default {
methods:{
 jumptoAboutUs(){
    let limit = document.body.offsetHeight - window.innerHeight;
     window.scrollTo(0,limit/2.4);
 }
}
}
</script>

<style scoped>
*{
    color: #1c2a46;
}
.page-about{
    padding-top: 10vh;
}
.main-content{
    border-bottom: 1px solid rgba(28, 42, 70, 0.08);
    margin-top: 20px;
    padding-top: 20px;
    display: block;
}
.main-content ul{
    text-align: center;
    margin: 0;
    padding: 0;
    list-style: none;
}
ul{
    display: block;
}
ul li{
    margin-left: 15px;
    margin-right: 15px;
    display: inline-block;
    list-style-type: none;
    padding-bottom: 20px;
    display: inline-block;
    font-size: 14px;
}
ul li:hover{
    cursor: pointer;
}
ul li:not(first-child)hover{
    color: #40c4ff;
}
.active-hr{
    border-bottom: 3px solid #40c4ff;;
    color: #40c4ff;; 
}
.mission{
    padding-top:35px;
}
.title{
    font-size: 1.5rem;
    margin:0 15vw 5vh;
    color:#162138;   
}
.title_founder{
    font-size: 1.5rem;  
    /*height: 30vh; */
}
.title_founder strong{
    background-image: linear-gradient(#40c4ff, #20627f);
    padding: 15vh 38.5vw;
    
}
.misson-content{
    margin: 0 15vw;
    line-height: 1.75;
    letter-spacing: 0.7px;
    margin-bottom: 5vh;
}
.aboutteam{
    margin-top: 10vh;
}

.jointous{
    color: #40c4ff;
    border: 2px solid #40c4ff;
    cursor: pointer;
    border-radius: 300px;
}
.jointous:hover{
    color:#f8f9fa;
    background: #40c4ff;
}
.mygroup{
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    text-align: left;

}
.mygroup p {
    letter-spacing: 0.7px;
    line-height: 1.5;
}
.mygroup img{
    width: 40vw;
}

.figure{
    margin-left: 2vw;
    margin-right: 2vw;
    
}
.figure img{
    width: 220px;
    height: 250px;
    border-radius: 2%;
}


@media screen and (max-width: 400px) {
    .content-abouteam{
    padding: 0 10vw 0 0;
    }
    .mygroup{
    grid-template-columns: 1fr;
    margin:0 auto ;        
    }
    .mygroup img{
        width: 80vw;
    }
  .figure img{
    width: 150px;
    height: 150px;
    border-radius: 2%;
    }
    .leader{
        text-align: center;
    }
    
}
.space{
    height: 1rem;
    width: 100%
}
.mt18{
    margin-top: 18px;
}
</style>

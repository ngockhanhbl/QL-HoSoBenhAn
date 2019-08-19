<template>
    <div class="partner">
        <div class="main-content">
            <ul>
                <li class="active-hr">
                    Ai Là Đối Tác Của Chúng Tôi
                </li>
                <li @click="jumptoPartner">
                    Giới Thiệu Đối Tác
                </li>
                <li @click="jumptoRegister">
                    Đăng Kí Ngay
                </li>
            </ul>
        </div>
        <div class="whoispartner pt3r">
            <div class="d-flex justify-content-center"><strong>Ai Là Đối Tác Của Chúng Tôi ?</strong></div>
            <div class="d-flex justify-centent-between">
                <div class="text-center patient ">
                    <div class="icon"><img src="@/assets/images/patient.svg"> </div>
                    <div class="title pt-2">Bệnh Nhân</div>
                    <div class="content pt-1">Sự hợp tác giữa bệnh nhân,
                         bác sĩ lâm sàng và nhà nghiên cứu</div>
                </div>
                <div class="text-center hospital ">
                    <div class="icon"><img src="@/assets/images/hospital.svg"> </div>
                    <div class="title pt-2">Bệnh Viện</div>
                    <div class="content pt-1">Sự hợp tác giữa bệnh nhân,
                         bác sĩ lâm sàng và nhà nghiên cứu</div>
                </div>
                <div class="text-center researcher ">
                    <div class="icon"><img src="@/assets/images/researcher.svg"> </div>
                    <div class="title pt-2">Nhà Nghiên Cứu</div>
                    <div class="content pt-1">Sự hợp tác giữa bệnh nhân,
                         bác sĩ lâm sàng và nhà nghiên cứu</div>
                </div>
            </div>
        </div>
        <div class="introduce">
            <div class="container">
                <div class="d-block justify-center">
                    <div class="logo text-center"><img src="@/assets/images/corporation1.png"></div>
                    <div class="content">Bệnh viện Quốc tế Ngọc Khanh - Gia Định thành lập năm 1998,
                         tọa lạc sát quận trung tâm thương mại thành phố Hồ Chí Minh, là bệnh viện tư nhân đầu tiên tại Việt Nam
                          được đầu tư trực tiếp từ 100% vốn nước ngoài với 20 giường được thiết lập để phục vụ các nhu cầu
                           hàng ngày của bệnh nhân, từ các dịch vụ về y khoa, dịch vụ chăm sóc bệnh nặng, các dịch vụ chẩn đoán,
                            dịch vụ phẫu thuật, các dịch vụ chuyên khoa và chăm sóc khách hàng. Bệnh viện Quốc tế 
                            Ngọc Khanh - Gia Định mang đến bệnh nhân những giá trị gia tăng từ chẩn đoán, điều trị y khoa tiên tiến,
                            và chăm sóc cá nhân nâng cao chỉ có trong các cơ sở chăm sóc riêng biệt cho từng bệnh nhân.  </div>
                    <div class="link text-center pt-2 pb-4"><a href="https://benhvienquoctengockhanh.com">benhvienquocte.com</a></div>
                    <div class="hr"></div>
                </div>

                <div class="d-block justify-center">
                    <div class="logo text-center"><img src="@/assets/images/researcher.png"></div>
                    <div class="content">Research Department là công ty chuyên nghiên cứu xu thế sức khỏe tại việt nam
                        từ đó đưa ra những nhận định và cảnh báo kjp thời cho hơn 97 triệu dân việt nam.đồng thời nghiên cứu
                        các giải pháp khám và chữa bệnh, được thành lập vào tháng 6 năm 2007 với nhiều bằng khen và giải pháp
                        có giá trị, đóng góp 1 phần không nhỏ đến việc cải thiện sức khỏe người Việt.
                    </div>
                    <div class="link text-center pt-2 pb-4"><a href="https://benhvienngockhanh.com">researchdepartment.com</a></div>
                    <div class="hr"></div>
                </div>

                <div class="d-block justify-center">
                    <div class="logo text-center"><img src="@/assets/images/corporation3.png"></div>
                    <div class="content">Bệnh viện đa khoa Ngọc Khanh đầu tiên ra đời và tọa lạc tại 124 Trần Quốc Thảo, Phường 7, Quận 3, Tp.HCM – 
                        Bệnh viện đa khoa tư nhân đầu tiên trên Thành phố Hồ Chí Minh.Bệnh Viện Hoàn Mỹ Sài Gòn không ngừng đầu tư các trang thiết bị mới;
                         với hi vọng mỗi khách hàng đều được tiếp cận với sự chăm sóc y tế hoàn mỹ với mức giá hợp lý.  </div>
                    <div class="link text-center pt-2 pb-4"><a href="https://benhvienngockhanh.com">benhvienkhanh.com</a></div>
                    <div class="hr"></div>
                </div>

                <div class="d-block justify-center">
                    <div class="logo text-center"><img src="@/assets/images/corporation4.png"></div>
                    <div class="content">Bệnh viện Ngọc Khanh là một trong những bệnh viện đa khoa hàng đầu theo
                         tiêu chuẩn quốc tế, là nơi cung cấp dịch vụ y tế chất lượng cao. Với cơ sở vật chất
                          và trang thiết bị hiện đại, cùng đội ngũ thầy thuốc có trình độ, kinh nghiệm và tận
                           tâm, Bệnh viện Ngọc Khanh là bệnh viện đa khoa hiện đại của người Việt đạt tiêu chuẩn
                            quốc tế và luôn mong muốn phục vụ tốt nhất cho người bệnh. </div>
                    <div class="link text-center pt-2 pb-4"><a href="https://benhvienngockhanh.com">benhvienngockhanh.com</a></div>
                    <div class="hr"></div>
                </div>

            </div>
        </div>
        <div class="text-center pt-4 pb-4">
            <router-link to="/registerpatient"><div class="btn btn-outline-primary ml-2 mr-2 p-1">Đăng Kí Cho Bệnh Nhân</div></router-link>
            <router-link to="/registerhospital"><div class="btn btn-outline-primary mr-2 ml-2 p-1">Đăng Kí Cho Bệnh Viện</div></router-link>
        </div>
    </div>
</template>

<script>
export default {
methods:{
 jumptoPartner(){
    let limit = document.body.offsetHeight - window.innerHeight;
     window.scrollTo(0,limit/4.4);
 },
jumptoRegister(){
    let limit = document.body.offsetHeight - window.innerHeight;
     window.scrollTo(0,limit);
 },
}
}
</script>

<style scoped>
*{
    font-family: "Roboto",Arial,Helvetica,sans-serif;
}
.main-content{
    border-bottom: 1px solid rgba(28, 42, 70, 0.08);
    margin-top: 2rem;
    padding-top: 2rem;
    display: block;
}
.cor1{
    border-bottom: 4px solid rgba(28, 42, 70, 0.08);
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
    padding-top:1rem;
}
ul li:hover{
    cursor: pointer;
}
ul li:not(first-child)hover{
    color: #40c4ff;
}
.hr{
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(55, 125, 189, 0), rgba(155, 192, 226, 0.75), rgba(55, 125, 189, 0));
}
.active-hr{ 
    border-bottom: 3px solid #40c4ff;
    color: #40c4ff;; 
}
.pt3r{
    padding-top: 3rem;
}
.whoispartner strong{
    text-align: center;
    color: #0b385b;
    font-size: 1.5rem;
    padding-bottom: 2rem;
    
}
.link{
    color:#255580;
}
.title{
    text-align: center;
    color: #0b385b;
    font-size: 1.2rem;
}
.icon img{
    height: 10vw;
    width: 10vw;
}
.logo img{
    height: 20vw;
    width: 20vw;
}
.patient{
    padding-left: 10vw;
    padding-right:5vw;
}
.hospital{
    padding-left:5vw;
}
.researcher{
    padding-left:5vw;
    padding-right: 10vw;
}
.justify-center{
    padding-left: 15vw;
    padding-right: 15vw;
}
@media screen and (max-width: 400px) {
    *{
        font-size: 14px;
    }
    

    
}
</style>

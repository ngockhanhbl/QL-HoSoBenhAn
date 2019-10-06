<template>
    <div class="main">
        <div class="d-flex center justify-content-center pt-5">
            <div class="d-flex align-items-center" >
                <img src="@/assets/images/bug.svg" />
                <span class="c404">404</span>
            </div>
        </div>

        <div class="d-flex justify-content-center">
                Trang Của Bạn Tìm Kiếm Không Tồn Tại ! Vui lòng quay lại&nbsp;
                <router-link to='/'>trang chủ</router-link>
        </div>

    </div>
</template>

<style scoped>
.main{
    height: 100vh;
    width:100vw;
    background: #e5e5e5;
}
.c404{
    color: red;
    font-size: 10vw;
    margin-left: 3rem;
}
img{
    height: 10vw;
    widows: 10vw;
}
.content{
    margin-top:10vw;
    margin-left: 3rem;
}
</style>
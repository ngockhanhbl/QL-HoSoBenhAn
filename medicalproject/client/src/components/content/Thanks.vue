<template>
    <div class="centered">
        <strong class="title">
            Cảm ơn vì đã đăng kí, chúng tôi sẽ xác nhận đơn đăng kí của bạn trong thời gian sớm nhất !
        </strong>
        <router-link to="/">
            <div class="gohome">Trở về trang chủ</div>
        </router-link>
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.centered {
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
.title{
    font-size: 2rem;
    color: red;
}
.gohome{
    cursor: pointer;
}
</style>

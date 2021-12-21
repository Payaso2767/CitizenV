<template>
    <body>
    <img alt="Vue logo" src="../../../assets/header5.jpg">
<div class="navbar">
  <a href="" @click="this.$router.push('/Home');">Hiển thị dữ liệu</a>
  <a href="" @click="this.$router.push('/Profile');">Khai báo dữ liệu</a>
  <a href="" @click="this.$router.push('/about');">Khởi tạo tài khoản</a>
  <a href="" @click="logout()">Đăng xuất</a>
</div>

</body>
</template>
<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('accessToken')
      this.$router.push('/')
    }
  }
}
</script>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.navbar {
  overflow: hidden;
  background-color: #007bff;
  display:inherit;
}

.navbar a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 3px;
  margin-right: 10px;
  text-decoration: none;
}

.navbar a:hover{
  background-color: red;
  Color: black;
}

</style>

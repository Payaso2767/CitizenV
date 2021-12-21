<template>
    <body>
    <img alt="Vue logo" src="../../../assets/header5.jpg">
    <!-- <div class="navbar">
      <a href="" @click="this.$router.push('/Home');">Hiển thị dữ liệu</a>
      <a href="" @click="this.$router.push('/Profile');">Khai báo dữ liệu</a>
      <a href="" @click="logout()">Đăng xuất</a>
    </div> -->
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Khai bao dan cu" active>
            <create-info :account="account"/>
          </b-tab>
          <b-tab title="Hien thi du lieu">
            <b-card-text>Tab contents 2</b-card-text>
          </b-tab>
          <b-tab title="Dang xuat" @click="logout()">
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

</body>
</template>
<script>
import CreateInfo from '../../../components/CreateInfo.vue'
const axios = require('axios')
export default {
  components: {
    CreateInfo
  },
  data () {
    return {
      account: {}
    }
  },
  mounted () {
    axios.get('http://localhost:8080/api/accounts/username/' + localStorage.getItem('username'))
      .then(response => {
        this.account = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    logout () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('username')
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

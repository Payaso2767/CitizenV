<template>
  <body>
  <img alt="Vue logo" src="../../../assets/header5.jpg">
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Khai bao dan cu" active>
          <create-info :account="account"/>
        </b-tab>
        <b-tab title="Hien thi du lieu">
          <table class="table-listrequest" style="width:100%; border:1px soild black">
            <thead>
              <tr>
                  <td>ID</td>
                  <td>Ho ten</td>
                  <td>Ngay sinh</td>
                  <td>Gioi tinh</td>
                  <td>Dia chi thuong tru</td>
                  <td>Ton giao</td>
                  <td>Hoc van</td>
                  <td>Nghe nghiep</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in infos" :value="list.id" v-bind:key="list.id" >
                <td>{{list.ID}}</td>
                <td>{{list.full_name}}</td>
                <td>{{dateTime(list.birth)}}</td>
                <td>{{list.gender}}</td>
                <td>{{sortdata(list.perm_residence_province, list.perm_residence_district, list.perm_residence_commune)}}</td>
                <td>{{list.religion}}</td>
                <td>{{list.edu_level}}</td>
                <td>{{list.occupation}}</td>
              </tr>
            </tbody>
          </table>
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
import moment from 'moment'
import json from '../../vietnam.json'
const axios = require('axios')
export default {
  components: {
    CreateInfo
  },
  data () {
    return {
      data: json,
      account: {},
      infos: [],
      place: ''
    }
  },
  mounted () {
    console.log(this.data['01'].name)
    axios.get('http://localhost:8080/api/accounts/username/' + localStorage.getItem('username'))
      .then(response => {
        this.account = response.data
        axios.get('http://localhost:8080/api/info/commune/' + this.account.commune)
          .then(response => {
            this.infos = response.data
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    dateTime (value) {
      return moment(value).format('DD/MM/YYYY')
    },
    logout () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('username')
      this.$router.push('/')
    },
    sortdata (matinh, mahuyen, maxa) {
      const tinh = this.data[matinh]
      const huyen = tinh[mahuyen]
      const xa = huyen[maxa]
      const s = xa + ', ' + huyen.name + ', ' + tinh.name
      return s
    }
  }
}
</script>
<style>
table, th, td, tr{
    border:1px solid black;
    text-align: center;
}

table > td{
    border:1px solid black;
    text-align: center;
}

table{
    border-collapse:collapse;
}

td{
  border:1px solid black;
  text-align: center;
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

<template>
   <body>
  <img alt="Vue logo" src="../../../assets/header5.jpg">
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Hien thi dan cu theo xa">
          <select class="form-control" v-on:change="getmaxa($event)">
            <option v-for="(commnue,index) in commnues" v-bind:key="index" v-bind:value="index">{{commnue}}</option>
          </select>
          <!-- <list-data :values="infos"/> -->
          <div style="margin-top: 3vh" class="list-infos" v-html="message"></div>
        </b-tab>
        <b-tab title="Dang xuat" @click="logout()">
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

  </body>
</template>

<script>
import json from '../../vietnam.json'
// import ListData from '../../../components/ListData.vue'
import moment from 'moment'
const axios = require('axios')
export default {
  data () {
    return {
      data: json,
      account: {},
      commnues: [],
      infos: [],
      message: ''
    }
  },
  mounted () {
    axios.get('http://localhost:8080/api/accounts/username/' + localStorage.getItem('username'))
      .then(response => {
        this.account = response.data
        this.commnues = this.data[this.account.province][this.account.district]
        console.log(this.commnues)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    dateTime (value) {
      return moment(value).format('DD/MM/YYYY')
    },
    sortdata (matinh, mahuyen, maxa) {
      const tinh = this.data[matinh]
      const huyen = tinh[mahuyen]
      const xa = huyen[maxa]
      const s = xa + ', ' + huyen.name + ', ' + tinh.name
      return s
    },
    content () {
      var result = `<table style="width:100%; border:1px soild black">
                         <thread>
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
                         </thread>
                         <tbody>` + '\n'
      return result
    },
    logout () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('username')
      this.$router.push('/')
    },
    getmaxa (event) {
      console.log(event.target.value)
      axios.get('http://localhost:8080/api/info/commune/' + event.target.value)
        .then(response => {
          console.log(response.data)
          this.infos = response.data
          if (this.infos.length !== 0) {
            this.message = this.content()
            for (var i = 0; i < this.infos.length; i++) {
              this.message += `<tr>
                          <td>` + this.infos[i].ID + `</td>
                          <td>` + this.infos[i].full_name + `</td>
                          <td>` + this.dateTime(this.infos[i].birth) + `</td>
                          <td>` + this.infos[i].gender + `</td>
                          <td>` + this.sortdata(this.infos[i].perm_residence_province, this.infos[i].perm_residence_district, this.infos[i].perm_residence_commune) + `</td>
                          <td>` + this.infos[i].religion + `</td>
                          <td>` + this.infos[i].edu_level + `</td>
                          <td>` + this.infos[i].occupation + `</td>
                        </tr>` + '\n'
            }
            this.message += `</tbody>
                        </table>`
          } else {
            this.message = '<p>Chua co du lieu dan cu</p>'
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>

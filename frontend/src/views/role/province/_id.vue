<template>
    <body>
  <img alt="Vue logo" src="../../../assets/header5.jpg">
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Hien thi dan cu theo xa">
          <select class="form-control" v-on:change="getmahuyen($event)">
            <option v-for="(district,index) in districts" v-bind:key="index" v-bind:value="index">{{district.name}}</option>
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
import moment from 'moment'
const axios = require('axios')
export default {
  data () {
    return {
      data: json,
      account: {},
      commnues: [],
      districts: [],
      infos: [],
      message: ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    // console.log(this.data[this.$route.params.id])
    this.districts = this.data[this.$route.params.id]
  },
  methods: {
    dateTime (value) {
      return moment(value).format('DD/MM/YYYY')
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
    sortdata (matinh, mahuyen, maxa) {
      const tinh = this.data[matinh]
      const huyen = tinh[mahuyen]
      const xa = huyen[maxa]
      const s = xa + ', ' + huyen.name + ', ' + tinh.name
      return s
    },
    logout () {
      localStorage.removeItem('accessToken')
      this.$router.push('/')
    },
    getmahuyen (event) {
      console.log(event.target.value)
      axios.get('http://localhost:8080/api/info/district/' + event.target.value)
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

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
                  <td>Action</td>
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
                <td>
                  <button @click="editinfor(list)" type="button" class="btn btn-primary" data-bs-toggle="modal">
                    Chinh sua
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Thong ke">
          <vue3-chart-js
              :id="doughnutChart.id"
              :type="doughnutChart.type"
              :data="doughnutChart.data"
              @before-render="beforeRenderLogic"
          ></vue3-chart-js>
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
// import Error from '../../../components/Error.vue'
import moment from 'moment'
import json from '../../vietnam.json'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
const axios = require('axios')
export default {
  components: {
    CreateInfo,
    Vue3ChartJs
    // Error
  },
  setup () {
    const doughnutChart = {
      id: 'doughnut',
      type: 'bar',
      data: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: [40, 20, 80, 10]
          }
        ]
      }
    }

    const beforeRenderLogic = (event) => {
      // if (a === b) {
      //   event.preventDefault()
      // }
    }

    return {
      doughnutChart,
      beforeRenderLogic
    }
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
    axios.get('http://localhost:8080/api/info/commune/' + this.$route.params.id)
      .then(response => {
        this.infos = response.data
      })
      .catch(error => {
        console.log(error)
      })
    axios.get('http://localhost:8080/api/info/gendercommune/' + this.$route.params.id)
      .then(response => {
        console.log(response.data.length)
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
    },
    editinfor (list) {
      this.$router.push('/info/edit/' + list.ID)
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

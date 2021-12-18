<template>
  <div>
    <app-header/>
    <div class="home">
        <b>Đây là trang tạo form khai báo</b><br/>
        <input class="a" v-model="name" placeholder="Ho ten"> <br/>
        <input class="a" v-model="birthday"  type="date" placeholder="Ngay sinh"><br/>
        <input class="a" v-model="cmnd" placeholder="Can cuoc cong dan"><br/>
        <input class="a" v-model="tuoi" type="number" placeholder="Tuoi"><br/>
      <div>
        <b> Chọn tỉnh</b>
        <select  v-model="selectTinh" >
          <option v-for="(data,name) in datatinh" v-bind:value="name" v-bind:key="name">
            {{ data.name }}
          </option>
        </select>
        <span>Selected: {{ selectTinh }}</span>
       </div>
       <div>
         <b> Chọn huyện</b>
        <select v-model="selectHuyen" >
          <option v-for="(data,name) in datahuyen" v-bind:value="name" v-bind:key="name">
            {{ data.name }}
          </option>
        </select>
        <span>Selected: {{ selectHuyen }} </span>
      </div>
       <div>
         <b> Chọn xã </b>
        <select v-model="selectXa"  >
          <option v-for="(data,name) in dataxa" v-bind:value="name" v-bind:key="name">
            {{ data }}
          </option>
        </select>
        <span>Selected: {{ selectXa }} </span>
      </div>
    </div>
    <button v-on:click="upload()">save</button>
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader.vue'
import json from './vietnam.json'
const axios = require('axios')
// const moment = require('moment');
export default {
  components: {
    AppHeader
  },
  data () {
    return {
      selectTinh: '',
      selectHuyen: '',
      selectXa: '',
      datatinh: json,
      name: '',
      birthday: '',
      tuoi: '',
      cmnd: ''
    }
  },
  computed: {
    datahuyen () {
      return this.datatinh[this.selectTinh]
    },
    dataxa () {
      console.log(this.datatinh[this.selectTinh] && this.datatinh[this.selectTinh][this.selectHuyen] ? this.datatinh[this.selectTinh][this.selectHuyen] : [])
      return this.datatinh[this.selectTinh] && this.datatinh[this.selectTinh][this.selectHuyen] ? this.datatinh[this.selectTinh][this.selectHuyen] : []
    }
  },
  methods: {
    upload () {
      console.log({
        name: this.name,
        birthday: this.birthday,
        tuoi: this.tuoi,
        cmnd: this.cmnd,
        selectTinh: this.selectTinh,
        selectHuyen: this.selectHuyen,
        selectXa: this.selectXa
      })
      if (this.tuoi >= 16 && this.cmnd === '') {
        return alert('Bạn chưa nhập CCCD')
      }

      if (this.name === '') {
        return alert('Bạn chưa nhập họ và tên')
      }
      axios.post('http://localhost:8080/api/accounts', {
        name: this.name,
        birthday: this.birthday,
        tuoi: this.tuoi,
        cmnd: this.cmnd,
        selectTinh: this.selectTinh,
        selectHuyen: this.selectHuyen,
        selectXa: this.selectXa
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.a{
  width: 30%;
}
</style>

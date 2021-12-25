<template>
    <div>
        <h1 class="well" style="text-align: center">Khai báo dân cư</h1>
        <form style="margin-top:3%" @submit.prevent="declare">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Họ Và Tên</label>
              <input v-model="user.full_name" type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Căn Cước Công Dân</label>
              <input v-model="user.ID" type="text" class="form-control" id="inputPassword4">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Ngày Sinh</label>
              <input v-model="user.birth" type="date" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Giới Tính</label>
              <select v-model="user.gender" class="form-control">
                <option selected value="Nam">Nam</option>
                <option value="Nu">Nu</option>
              </select>
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Quê quán</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <select v-model="user.place_origin_province" class="form-control" v-on:change="getMatinh($event)">
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option v-for="(value,name) in place_origin_provinces" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <select v-model="user.place_origin_district"  class="form-control" v-on:change="getMahuyen($event)">
                <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
                <option v-for="(value,name) in place_origin_districts" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <select v-model="user.palce_origin_commune" class="form-control">
                <option  value="">Chọn Xã/Phường/Thị Trấn</option>
                <option v-for="(value,name) in place_origin_communes"  v-bind:value="name" v-bind:key="name">
                <p>{{ value }}</p>
                </option>
              </select>
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Thường trú</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <input disabled v-model="thuongtrutinh" type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <input disabled v-model="thuongtruhuyen" type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <input disabled v-model="thuongtruxa" type="text" class="form-control" id="inputEmail4">
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Tạm trú</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <select v-model="user.temp_residence_province" class="form-control" v-on:change="getMatinhtrongtamtru($event)">
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option v-for="(value,name) in temp_residence_provinces" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <select v-model="user.temp_residence_district"  class="form-control" v-on:change="getMahuyentrongtamtru($event)">
                <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
                <option v-for="(value,name) in temp_residence_districts" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <select v-model="user.temp_residence_commune" class="form-control">
                <option  value="">Chọn Xã/Phường/Thị Trấn</option>
                <option v-for="(value,name) in temp_residence_communes"  v-bind:value="name" v-bind:key="name">
                <p>{{ value }}</p>
                </option>
              </select>
            </div>
          </div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tôn Giáo</label>
              <input v-model="user.religion" type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tình độ văn hoá</label>
              <input v-model="user.edu_level" type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Nghề Nghiệp</label>
              <input v-model="user.occupation" type="text" class="form-control" id="inputEmail4">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Khai Báo</button>
        </form>
    </div>
</template>
<script>
import json from './vietnam.json'
const axios = require('axios')
export default {
  data () {
    return {
      place_origin_provinces: json,
      place_origin_districts: [],
      place_origin_communes: [],
      temp_residence_provinces: json,
      temp_residence_districts: [],
      temp_residence_communes: [],
      data: json,
      thuongtrutinh: '',
      thuongtruhuyen: '',
      thuongtruxa: '',
      user: {
        full_name: '',
        ID: '',
        birth: '',
        gender: '',
        place_origin_province: '',
        place_origin_district: '',
        palce_origin_commune: '',
        perm_residence_province: '',
        perm_residence_district: '',
        perm_residence_commune: '',
        temp_residence_province: '',
        temp_residence_district: '',
        temp_residence_commune: '',
        religion: '',
        edu_level: '',
        occupation: ''
      },
      account: {}
    }
  },
  mounted () {
    axios.get('http://localhost:8080/api/accounts/username/' + localStorage.getItem('username'))
      .then(response => {
        this.account = response.data
        this.user.perm_residence_province = this.account.province
        this.thuongtrutinh = this.data[this.account.province].name
        this.user.perm_residence_district = this.account.district
        this.thuongtruhuyen = this.data[this.account.province][this.account.district].name
        this.user.perm_residence_commune = this.account.commune
        this.thuongtruxa = this.data[this.account.province][this.account.district][this.account.commune]
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getMatinh (event) {
      this.place_origin_province = event.target.value
      this.place_origin_districts = this.data[event.target.value]
    },
    getMahuyen (event) {
      this.place_origin_communes = this.place_origin_districts[event.target.value]
      this.place_origin_district = event.target.value
      console.log(this.communes)
    },
    getMatinhtrongtamtru (event) {
      this.temp_residence_province = event.target.value
      this.temp_residence_districts = this.data[event.target.value]
    },
    getMahuyentrongtamtru (event) {
      this.temp_residence_district = event.target.value
      this.temp_residence_communes = this.temp_residence_districts[event.target.value]
    },
    declare () {
      axios.post('http://localhost:8080/api/info', this.user)
        .then(response => {
          console.log(response.data.message)
          this.$toast.success(response.data.message)
          setTimeout(function () {
            location.reload()
          }, 1000)
        })
        .catch(error => {
          console.log(error)
          this.$toast.danger(error.data.message)
        })
    }
  }
}
</script>

<style>
</style>

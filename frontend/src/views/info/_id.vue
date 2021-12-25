<template>
  <div>

    <h1 class="well" style="text-align: center">Chỉnh sửa dân cư</h1>
    <form style="margin-top:3%" @submit.prevent="edit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Họ Và Tên</label>
          <input v-model="account.full_name" type="text" class="form-control" id="inputEmail4">
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Căn Cước Công Dân</label>
          <input disabled v-model="account.ID" type="text" class="form-control" id="inputPassword4">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Ngày Sinh</label>
          <input v-model="account.birth" type="date" class="form-control" id="inputEmail4">
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Giới Tính</label>
          <!-- <select v-model="account.gender" class="form-control">
            <option v-if="user.gender == gender.gender" v-for="gender in genders" v-bind:key="gender.gender">{{gender}}</option>
          </select> -->
          <div v-html="gender"></div>
        </div>
      </div>
      <div style="font-size:25px; font-weight:blod">Quê quán</div>
        <div class="form-row">
        <div class="form-group col-md-4">
          <label for="inputEmail4">Tỉnh</label>
          <select v-model="account.place_origin_province" class="form-control" v-on:change="getMatinh($event)">
            <option value="">Chọn Tỉnh/Thành Phố</option>
            <option v-for="(value,name) in place_origin_provinces" v-bind:value="name" v-bind:key="name">
            <p>{{ value.name }}</p>
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Huyện</label>
          <select v-model="account.place_origin_district"  class="form-control" v-on:change="getMahuyen($event)">
            <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
            <option v-for="(value,name) in place_origin_districts" v-bind:value="name" v-bind:key="name">
            <p>{{ value.name }}</p>
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Xã</label>
          <select v-model="account.palce_origin_commune" class="form-control">
            <option selected value="">Chọn Xã/Phường/Thị Trấn</option>
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
          <select v-model="account.temp_residence_province" class="form-control" v-on:change="getMatinhtrongtamtru($event)">
            <option value="">Chọn Tỉnh/Thành Phố</option>
            <option v-for="(value,name) in temp_residence_provinces" v-bind:value="name" v-bind:key="name">
            <p>{{ value.name }}</p>
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Huyện</label>
          <select v-model="account.temp_residence_district"  class="form-control" v-on:change="getMahuyentrongtamtru($event)">
            <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
            <option v-for="(value,name) in temp_residence_districts" v-bind:value="name" v-bind:key="name">
            <p>{{ value.name }}</p>
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Xã</label>
          <select v-model="account.temp_residence_commune" class="form-control">
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
          <input v-model="account.religion" type="text" class="form-control" id="inputEmail4">
        </div>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Tình độ văn hoá</label>
          <input v-model="account.edu_level" type="text" class="form-control" id="inputEmail4">
        </div>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Nghề Nghiệp</label>
          <input v-model="account.occupation" type="text" class="form-control" id="inputEmail4">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Khai Báo</button>
    </form>
  </div>
</template>

<script>
import json from '../vietnam.json'
const axios = require('axios')
export default {
  data () {
    return {
      account: {},
      data: json,
      place_origin_provinces: json,
      place_origin_districts: [],
      place_origin_communes: [],
      temp_residence_provinces: json,
      temp_residence_districts: [],
      temp_residence_communes: [],
      genders: [
        'Nam',
        'Nu'
      ],
      thuongtrutinh: '',
      thuongtruhuyen: '',
      thuongtruxa: '',
      gender: '<select class="form-control">' + '\n',
      place_origin_province: '<select class="form-control">' + '\n',
      temp: ''
    }
  },
  mounted () {
    axios.get('http://localhost:8080/api/info/id/' + this.$route.params.id)
      .then(response => {
        this.account = response.data
        for (var i = 0; i < 2; i++) {
          if (this.account.gender === this.genders[i]) {
            this.gender += '<option selected value="' + this.genders[i] + '">' + this.genders[i] + '</option>' + '\n'
          } else {
            this.gender += '<option value="' + this.genders[i] + '">' + this.genders[i] + '</option>' + '\n'
          }
        }
        this.gender += '</select>'
        this.temp = this.account.birth
        this.thuongtrutinh = this.data[this.account.perm_residence_province].name
        this.thuongtruhuyen = this.data[this.account.perm_residence_province][this.account.perm_residence_district].name
        this.thuongtruxa = this.data[this.account.perm_residence_province][this.account.perm_residence_district][this.account.perm_residence_commune]
        this.place_origin_districts = this.data[this.account.place_origin_province]
        this.place_origin_communes = this.data[this.account.place_origin_province][this.account.place_origin_district]
        this.temp_residence_districts = this.data[this.account.temp_residence_province]
        this.temp_residence_communes = this.data[this.account.temp_residence_province][this.account.temp_residence_district]
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getMatinh (event) {
      this.place_origin_districts = this.data[event.target.value]
    },
    getMahuyen (event) {
      this.place_origin_communes = this.place_origin_districts[event.target.value]
      this.place_origin_district = event.target.value
    },
    getMatinhtrongtamtru (event) {
      this.temp_residence_province = event.target.value
      this.temp_residence_districts = this.data[event.target.value]
    },
    getMahuyentrongtamtru (event) {
      this.temp_residence_district = event.target.value
      this.temp_residence_communes = this.temp_residence_districts[event.target.value]
    },
    edit () {
      axios.put('http://localhost:8080/api/info/' + this.account.ID, this.account)
        .then(response => {
          this.$toast.success(response.data.message)
          setTimeout(function () {
            location.reload()
          }, 1000)
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

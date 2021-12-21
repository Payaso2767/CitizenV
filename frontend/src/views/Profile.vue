<template>
    <div>
    <app-header/>
    <div>
        <h1 class="well" style="text-align: center">Khai báo dân cư</h1>
        <form @submit.prevent="declare" style="margin-top:3%">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Họ Và Tên</label>
              <input type="text" class="form-control" v-model="user.full_name">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Căn Cước Công Dân</label>
              <input type="text" class="form-control" v-model="user.ID">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Ngày Sinh</label>
              <input type="date" class="form-control" v-model="user.birth">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Giới Tính</label>
              <select v-model="user.gender" class="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Quê quán</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <select v-model="user.place_origin_province" class="form-control">
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option v-for="(value,name) in data" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
              <span>Mã Số: {{ user.place_origin_province }}</span>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <select v-model="user.place_origin_district" class="form-control">
                <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
                <option v-for="(value,name) in data[(user.place_origin_province)]" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
              <span>Mã Số: {{ user.place_origin_district }}</span>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <div v-if="user.place_origin_province===''">
                <select v-model="user.palce_origin_commune" class="form-control">
                  <option value="">Chọn Xã/Phường/Thị Trấn</option>
                </select>
              </div>
              <div v-if="user.place_origin_province!==''">
                <select v-model="user.palce_origin_commune" class="form-control">
                  <option value="">Chọn Xã/Phường/Thị Trấn</option>
                  <option v-for="(value,name) in data[(user.place_origin_province)][(user.place_origin_district)]" v-bind:value="name" v-bind:key="name">
                  <p>{{ value }}</p>
                </option>
              </select>
              <span>Mã Số: {{ user.palce_origin_commune }}</span>
            </div>
          </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Thường trú</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <select v-model="user.perm_residence_province" class="form-control">
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option v-for="(value,name) in data" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <select v-model="user.perm_residence_district" class="form-control">
                <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
                <option v-for="(value,name) in data[(user.perm_residence_province)]" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <div v-if="user.perm_residence_province===''">
                <select v-model="user.perm_residence_commune" class="form-control">
                  <option value="">Chọn Xã/Phường/Thị Trấn</option>
                </select>
              </div>
              <div v-if="user.perm_residence_province!==''">
                <select v-model="user.perm_residence_commune" class="form-control">
                  <option value="">Chọn Xã/Phường/Thị Trấn</option>
                  <option v-for="(value,name) in data[(user.perm_residence_province)][(user.perm_residence_district)]" v-bind:value="name" v-bind:key="name">
                  <p>{{ value }}</p>
                </option>
              </select>
            </div>
          </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Tạm trú</div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <select v-model="user.temp_residence_province" class="form-control">
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option v-for="(value,name) in data" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <select v-model="user.temp_residence_district" class="form-control">
                <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
                <option v-for="(value,name) in data[(user.temp_residence_province)]" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <div v-if="user.temp_residence_province===''">
                <select v-model="user.temp_residence_commune" class="form-control">
                  <option value="">Chọn Xã/Phường/Thị Trấn</option>
                </select>
              </div>
              <div v-if="user.temp_residence_province!==''">
                <select v-model="user.temp_residence_commune" class="form-control">
                  <option value="">Chọn Xã/Phường/Thị Trấn</option>
                  <option v-for="(value,name) in data[(user.temp_residence_province)][(user.temp_residence_district)]" v-bind:value="name" v-bind:key="name">
                    <p>{{ value }}</p>
                </option>
              </select>
            </div>
          </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tôn Giáo</label>
              <input type="text" class="form-control" v-model="user.religion">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tình độ văn hoá</label>
              <input type="text" class="form-control" v-model="user.edu_level">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Nghề Nghiệp</label>
              <input type="text" class="form-control" v-model="user.occupation">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Khai Báo</button>
        </form>
    </div>
    </div>
</template>
<script>
import AppHeader from '../components/AppHeader.vue'
import json from './vietnam.json'
const axios = require('axios')
export default {
  components: {
    AppHeader
  },
  data () {
    return {
      data: json,
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
      }
    }
  },
  methods: {
    declare () {
      console.log(this.user)
      axios.post('http://localhost:8080/api/info', this.user)
        .then(response => {
          this.response = response
          // setTimeout(() => this.$toast.success(response), 60000)
          this.$toast.success(response.data.message)
          // this.selecttinh = ''
          // this.selecthuyen = ''
          // this.selectxa = ''
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

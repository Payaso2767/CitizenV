<template>
    <div>
    <app-header/>
    <div>
        <h1 class="well" style="text-align: center">Khai báo dân cư</h1>
        <form style="margin-top:3%">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Họ Và Tên</label>
              <input type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Căn Cước Công Dân</label>
              <input type="text" class="form-control" id="inputPassword4">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Ngày Sinh</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Giới Tính</label>
              <select class="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Quê quán</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <select class="form-control" v-on:change="getMatinh($event)">
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option v-for="(value,name) in provinces" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <select class="form-control" v-on:change="getMahuyen($event)">
                <option value="">Chọn Quận/Huyện/Thành Phố/Thị Xã</option>
                <option v-for="(value,name) in districts" v-bind:value="name" v-bind:key="name">
                <p>{{ value.name }}</p>
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <select class="form-control">
                <option  value="">Chọn Xã/Phường/Thị Trấn</option>
                <option v-for="(value,name) in communes"  v-bind:value="name" v-bind:key="name">
                <p>{{ value }}</p>
                </option>
              </select>
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Thường trú</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
          </div>
          <div style="font-size:25px; font-weight:blod">Tạm trú</div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tỉnh</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Huyện</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Xã</label>
              <input type="date" class="form-control" id="inputEmail4">
            </div>
          </div>
           <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tôn Giáo</label>
              <input type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tình độ văn hoá</label>
              <input type="text" class="form-control" id="inputEmail4">
            </div>
            <div class="form-group col-md-4">
              <label for="inputEmail4">Nghề Nghiệp</label>
              <input type="text" class="form-control" id="inputEmail4">
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
export default {
  components: {
    AppHeader
  },
  data () {
    return {
      provinces: json,
      districts: [],
      communes: [],
      data: json,
      place_origin_province: '',
      place_origin_district: '',
      palce_origin_commune: ''
    }
  },
  methods: {
    getMatinh (event) {
      console.log(event.target.value)
      this.place_origin_province = event.target.value
      this.districts = this.data[event.target.value]
      console.log(this.districts)
    },
    getMahuyen (event) {
      console.log(event.target.value)
      this.communes = this.districts[event.target.value]
      console.log(this.communes)
    }
  }
}
</script>

<style>
</style>

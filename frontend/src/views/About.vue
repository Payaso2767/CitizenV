<template>
<div>
  <app-header />
  <div class="container">
    <h1 class="well" style="text-align: center">Khởi tạo tài khoản</h1>
    <div class="col-lg-12 well">
      <div class="row">
        <form @submit.prevent="register">
          <div class="col-sm-12">
            <div class="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter Username Here.."
                rows="3"
                class="form-control"
                v-model="user.username"
              />
              <p v-if="user.username === ''" style="color: red">Nhập Username</p>
            </div>
            <div class="row">
                <div class="col-sm-4 form-group">
                  <label>Tỉnh/Thành Phố</label>
                  <select v-model="selecttinh" class="form-control">
                    <option disabled value="">Chọn Tỉnh/Thành Phố</option>
                    <option v-for="(value,name) in data" v-bind:value="name" v-bind:key="name">
                    <p>{{ value.name }}</p>
                    </option>
                  </select>
                  <span>Mã Số: {{ selecttinh }}</span>
                </div>
                <div class="col-sm-4 form-group">
                  <label>Quận/Huyện/Thị Xã</label>
                  <select v-model="selecthuyen" class="form-control">
                    <option disabled value="">Chọn Quận/Huyện/Thị Xã</option>
                    <option v-for="(value,name) in data[(selecttinh)]" v-bind:value="name" v-bind:key="name">
                    <p>{{ value.name }}</p>
                    </option>
                  </select>
                  <span>Mã Số: {{ selecthuyen }}</span>
                </div>
                <div class="col-sm-4 form-group">
                  <label>Xã/Phường/Thị Trấn</label>
                  <div v-if="selecttinh===''">
                  <select v-model="selectxa" class="form-control">
                    <option disabled value="">Chọn Xã/Phường/Thị Trấn</option>
                  </select>
                  <span>Mã Số: {{ selectxa }}</span>
                  </div>
                  <div v-if="selecttinh!==''">
                  <select v-model="selectxa" class="form-control">
                    <option disabled value="">Chọn Xã/Phường/Thị Trấn</option>
                    <option v-for="(value, name) in data[(selecttinh)][(selecthuyen)]" v-bind:value="name" v-bind:key="name" >
                    <p>{{value}}</p>
                    </option>
                  </select>
                  <span>Mã Số: {{ selectxa }}</span>
                  </div>
                </div>
            </div>
            <div class="form-group">
              <label>Loại tài khoản</label>
              <input
                type="text"
                rows="3"
                class="form-control"
                v-model="AutoRole"
                disabled
              />
            </div>
            <div class="row">
              <div class="col-sm-6 form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password Here.."
                  class="form-control"
                  v-model="password"
                />
              </div>
              <div class="col-sm-6 form-group">
                <label>RePassword</label>
                <input
                  type="password"
                  placeholder="RePassword Here.."
                  class="form-control"
                  v-model="re_password"
                />
              </div>
              <div>
                <p v-if="checkpass === ''" style="color: red">Nhập mật khẩu</p>
                <p v-if="checkpass === 'false'" style="color: red">Mật khẩu không khớp</p>
              </div>
            </div>
            <p v-if="response !==''">{{response.data.message}}</p>
            <button type="submit" class="btn btn-lg btn-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import bcrypt from 'bcryptjs'
import json from './vietnam.json'
const axios = require('axios')
export default {
  components: {
    AppHeader
  },
  data () {
    return {
      selecttinh: '',
      selecthuyen: '',
      selectxa: '',
      data: json,
      role: 'admin',
      password: '',
      re_password: '',
      checkpass: '',
      response: '',
      user: {
        username: '',
        password: '',
        role: ''
      }
    }
  },
  methods: {
    register () {
      if (this.password !== this.re_password) {
        this.checkpass = 'false'
      } else {
        this.checkpass = 'true'
        this.user.role = this.AutoRole
        this.user.password = this.encryptPassword(this.user.password)
        console.log(this.user)
        axios.post('http://localhost:8080/api/accounts', this.user)
          .then(response => {
            this.response = response
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    encryptPassword (password) {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
    },
    datacopy (data) {
      delete data.name
      return data
    }
  },
  mounted () {
    console.log(this.datatinh)
  },
  computed: {
    AutoRole () {
      if (this.selectxa !== '') {
        return this.selecttinh + '.' + this.selecthuyen + '.' + this.selectxa
      }
      if (this.selecthuyen !== '') {
        return this.selecttinh + '.' + this.selecthuyen
      }
      if (this.selecttinh !== '') {
        return this.selecttinh
      } else {
        return this.role
      }
    }
  }
}
</script>

<style>
@media (min-width: 768px) {
  .container {
    max-width: 800px;
  }
}
.container-narrow > hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}

/* Supporting marketing content */
.marketing {
  margin: 40px 0;
}
.marketing p + h4 {
  margin-top: 28px;
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
</style>

<template>
<div>
  <app-header />
  <div class="container">
    <h1 class="well" style="text-align: center">Khởi tạo tài khoản</h1>
    <div class="col-lg-12 well">
      <div class="row">
      <div>
        <b> Chọn tỉnh</b>
        <select v-model="selectTinh" >
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
        <form @submit.prevent="register">
          <div class="col-sm-12">
            <div class="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter Address Here.."
                rows="3"
                class="form-control"
              />
            </div>
            <div class="row">
              <div class="col-sm-4 form-group">
                <label>Tỉnh</label>
                <input
                  type="text"
                  placeholder="Enter Tỉnh Here.."
                  class="form-control"
                  v-model="user.username"
                />
              </div>
              <div class="col-sm-4 form-group">
                <label>Huyện</label>
                <input
                  type="password"
                  placeholder="Enter Huyện Here.."
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <div class="col-sm-4 form-group">
                <label>Xã</label>
                <input
                  type="text"
                  placeholder="Enter Xã Here.."
                  class="form-control"
                  v-model="user.role"
                />
              </div>
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea
                placeholder="Enter Address Here.."
                rows="3"
                class="form-control"
              ></textarea>
            </div>
            <div class="row">
              <div class="col-sm-6 form-group">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Enter Password Here.."
                  class="form-control"
                />
              </div>
              <div class="col-sm-6 form-group">
                <label>RePassword</label>
                <input
                  type="text"
                  placeholder="RePassword Here.."
                  class="form-control"
                />
              </div>
            </div>
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
      selectTinh: '',
      selectHuyen: '',
      selectXa: '',
      datatinh: json,
      counter: 0,
      user: {
        username: '',
        password: '',
        role: ''
      }
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
    register () {
      this.user.password = this.encryptPassword(this.user.password)
      console.log(this.user)
      axios.post('http://localhost:8080/api/accounts', this.user)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    encryptPassword (password) {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
    }
  }
}
</script>

<style>
@media (min-width: 768px) {
  .container {
    max-width: 730px;
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


<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像标准 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont  icon-yonghu"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {getLogin} from '../api/user'
export default {
  
  data() {
    return {
      loginForm: {
        //这个登陆表单绑定对象
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 105,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //重置表单
    resetloginForm() {
         this.$refs.loginFormRef.resetFields()
    },
    login(){
        let _that=this
        this.$refs.loginFormRef.validate((valid)=>{
            //通过validate方法判断表单验证是否成功
            if(!valid) return;
            getLogin(_that.loginForm).then(res=>{
               console.log('res',res)
               if(res.meta.status!=200) this.$message.error(res.meta.msg);
               else{
                   this.$message.success(res.meta.msg);
                    localStorage.setItem('token',res.data.token);
                  this.$router.push('/home')
               }
            })


        })
    }
   
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  border-radius: 5px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 5px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.login_form {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 30px;
  box-sizing: border-box;
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单区 -->
      <el-form ref="loginFormRef" :model= "loginForm" :rules="loginFormRules" label-width="80px"  class="Login_form">
        <!-- 用户名 -->
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="loginForm.phonenumber"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="faceCheck">人脸</el-button>
          <el-button @click="userLogin">登录</el-button>
          <el-button type="primary" @click="dialogVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册对话框 -->
    <el-dialog title="注册" :visible.sync="dialogVisible" width="50%" @close='dialogClose' :append-to-body="true">
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="dialogFormRules" label-width="90px">
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="dialogForm.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-upload
          action
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          ref="upload"
          :auto-upload="false"
          :on-change="fileChange">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSure">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>""

<script>
export default {
  data () {
    // 绑定对象
    return {
      // 登录表单的绑定对象
      loginForm: {
        phonenumber: '',
        password: ''
      },
      // 表单的验证规则
      loginFormRules: {
        phonenumber: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      },
      // 是否显示对话框
      dialogVisible: false,
      dialogForm: {
        phonenumber: '',
        password: '',
        name: ''
      },
      // 注册的验证规则
      dialogFormRules: {
        phonenumber: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ],
        photo: [
          { required: true, message: '请上传照片', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    fileChange (file) {
      const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg']
      const isJPG = typeArr.indexOf(file.raw.type) !== -1
      // image/png, image/jpeg, image/gif, image/jpg
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('只能是图片!')
        this.$refs.upload.clearFiles()
        this.files = null
        return
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        this.$refs.upload.clearFiles()
        this.files = null
        return
      }
      this.files = file.raw
      console.log(file)
    },
    // 用户登录
    userLogin () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.loginForm)
        this.$http.post('login/signIn/', this.loginForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
          .then(response => {
            console.log(response)
            this.$message.success('账号密码正确，请验证人脸')
            // window.sessionStorage.setItem('token', response.data.phonenumber)
            // this.$router.push('/home')
          })
          .catch(error => {
            this.$message('账号或密码错误')
            console.log(error)
          })
      })
    },
    // 点击注册按钮
    register () {
      this.dialogVisible = true
    },
    // 对话框关闭
    dialogClose () {
      this.dialogVisible = false
      this.$refs.dialogFormRef.resetFields()
    },
    // 点击对话框的确认
    dialogSure () {
      this.$refs.dialogFormRef.validate(valid => {
        const formData = new FormData()
        Object.keys(this.dialogForm).forEach((ele) => {
          formData.append(ele, this.dialogForm[ele])
        })
        formData.append('file', this.files)
        if (!valid) return
        console.log(formData)
        this.$http.post('login/register/', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
          .then(response => {
            this.$message.success('注册成功')
            this.dialogClose()
          })
          .catch(error => {
            this.$message.error('注册失败')
            console.log(error)
          })
      })
    },
    faceCheck () {
      window.open('videoCap.html')
    }
  }
}
</script>

<style lang="less" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
// 背景
.login_container {
  background-color:#203ddf4d;
  height: 100%;
}
// 登录盒
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%; // 移动全图的50%距离
  top: 50%;
  transform: translate(-50%, -50%); // 移动自身的50%距离
  // 图标
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute; // 绝对定位, 进行页面上的位移
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
}
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.Login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>

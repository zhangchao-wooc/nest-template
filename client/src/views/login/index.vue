<template>
  <el-container class="login">
    <el-header class="login-header">
      <h1>
        <img
          src="https://g-cdn.cz-robots.com/cdn/web/img/logo.png"
          style="width: 200px; margin-top: 20px"
        />
      </h1>
    </el-header>
    <el-main class="login-main">
      <el-card class="box">
        <div class="box-header">Admin</div>
        <div class="box-tabs">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            :stretch="true"
            @tab-click="handleClick"
          >
            <el-tab-pane label="账号密码" name="first">
              <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
                <el-form-item prop="account">
                  <el-input
                    v-model="ruleForm.account"
                    size="large"
                    autocomplete="off"
                    :prefix-icon="User"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="ruleForm.password"
                    type="password"
                    size="large"
                    autocomplete="off"
                    :prefix-icon="Lock"
                    :suffix-icon="Hide"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="width: 100%"
                    type="primary"
                    size="large"
                    @click="submitForm(ruleFormRef)"
                    >Login</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="验证码登录" name="second">
              <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
                <el-form-item prop="account">
                  <el-input
                    v-model="ruleForm.account"
                    size="large"
                    autocomplete="off"
                    :prefix-icon="User"
                  />
                </el-form-item>
                <el-form-item prop="code">
                  <el-input v-model="ruleForm.code" size="large" placeholder="输入验证码">
                    <template #append>
                      <el-button>发送验证码</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="width: 100%"
                    type="primary"
                    size="large"
                    @click="submitForm(ruleFormRef)"
                    >Login</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="box-footer">
            <div class="title">其他登录方式</div>
            <div class="other-login">
              <a href="https://wooc.com:8000/api/auth/feishu">
                <img
                  src="https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/3b2bbcd42878447c914449eb0e56fea6~tplv-jbbdkfciu3-png:0:0.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { User, Lock, Hide, View } from "@element-plus/icons-vue";
import type { TabsPaneContext, FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.password !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("password", () => null);
    }
    callback();
  }
};

const ruleForm = reactive({
  account: "",
  password: "",
  code: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ validator: validatePass, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  code: [{ validator: checkAge, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  border-radius: 5px;
  &-header {
    h1 {
      margin: 0;
    }
  }
  &-main {
    display: grid;
    place-items: center;
    .box {
      width: 300px;
      &-header {
        padding: 0 0 20px;
        text-align: center;
      }
      &-form {
        .login-btn {
          width: 100%;
        }
      }
      &-footer {
        margin-top: 10px;
        .title {
          font-size: 12px;
          text-align: center;
        }
        .other-login {
          padding: 20px 0;
          display: grid;
          place-items: center;
        }
        img {
          height: 15px;
        }
      }
    }
  }
}
</style>

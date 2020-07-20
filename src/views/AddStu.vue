<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="学号" prop="stuId" width="150">
      <el-input v-model="ruleForm.stuId" width="150"></el-input>
    </el-form-item>

    <el-form-item label="姓名" prop="stuName">
      <el-input v-model="ruleForm.stuName"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="stuAge">
      <el-input v-model="ruleForm.stuAge"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="stuSex">
      <el-select v-model="ruleForm.stuSex" placeholder="性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年级" prop="stuGrade" width="150">
      <el-input v-model="ruleForm.stuGrade"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        stuId: "",
        stuName: "",
        stuAge: "",
        stuSex: "",
        stuGrade: ""
      },
      rules: {
        stuId: [{ required: true, message: "请输入学生学号", trigger: "blur" }],
        stuSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        stuAge: [
          { required: true, message: "请输入学生年龄", trigger: "blur" }
        ],
        stuName: [
          { required: true, message: "请输入学生姓名", trigger: "blur" }
        ],
        stuGrade: [
          { required: true, message: "请输入学生年级", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("http://localhost:8181/student/save", this.ruleForm)
            .then(function(resp) {
              if ((resp.data = "true")) {
                _this
                  .$confirm(
                    "学生" + _this.ruleForm.stuName + "的信息添加成功！",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }
                  )
                  .then(() => {
                    _this.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    _this.$router.push('/StuManage')
                  })
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
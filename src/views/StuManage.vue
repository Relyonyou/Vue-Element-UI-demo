<template>
  <div>
    <el-table :data="tableData" border style>
      <el-table-column prop="stuId" label="学生ID" width="150" align="center"></el-table-column>
      <el-table-column prop="stuName" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="stuAge" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="stuSex" label="性别" width="120" align="center"></el-table-column>
      <el-table-column prop="stuGrade" label="班级" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          <!-- 模态块儿 -->
          <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="学号" prop="stuId">
                <el-input v-model="ruleForm.stuId" readonly></el-input>
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
              <el-form-item label="年级" prop="stuGrade">
                <el-input v-model="ruleForm.stuGrade"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm(formName) {
      this.dialogFormVisible = false;
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .put("http://localhost:8181/student/upd", this.ruleForm)
            .then(function(resp) {
              if ((resp.data = "true")) {
                _this
                  .$confirm(
                    "学生" + _this.ruleForm.stuName + "的信息修改成功！",
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
                      message: "修改成功!"
                    });
                    window.location.reload();
                  });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.ruleForm.stuId = row.stuId;
      this.ruleForm.stuName = row.stuName;
      this.ruleForm.stuAge = row.stuAge;
      this.ruleForm.stuSex = row.stuSex;
      this.ruleForm.stuGrade = row.stuGrade;
    },
    del(row) {
      const _this = this;
      axios
        .delete("http://localhost:8181/student/deleteById/" + row.stuId)
        .then(function(resp) {
          _this
            .$confirm("是否要删除学生" + row.stuName + "的信息？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
              window.location.reload();
            });
        });
    },
    page(currentPage) {
      const _this = this;
      axios
        .get("http://localhost:8181/student/queryall/" + currentPage + "/5")
        .then(function(resp) {
          console.log(resp.data);
          //覆盖假数据
          _this.tableData = resp.data.content;
          _this.total = resp.data.totalElements;
        });
    }
  },
  created() {
    const _this = this;
    axios
      .get("http://localhost:8181/student/queryall/1/5")
      .then(function(resp) {
        console.log(resp.data);
        //覆盖假数据
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
        _this.size = resp.data.size;
      });
  },
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
      },
      total: null,
      size: null,
      confirmButtonText: "confirmButtonText",
      dialogFormVisible: false,
      tableData: [
        {
          stuId: "1",
          stuName: "王小虎",
          stuAge: "20",
          stuSex: "男",
          stuGrade: "计算机"
        }
      ]
    };
  }
};
</script>
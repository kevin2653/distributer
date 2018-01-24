<template>
  <div>
    <div style="width: 95%;margin-left: 1rem">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <!-- 申请人照片 -->
        <el-tab-pane label="申请人照片" name="first">
          <div>
            <br>
            <div style="border: 1px solid black;width: 15%;height: 20rem;" display="flex" class="upDIV">
              <img src="~assets/add.png" style="display: flex">
              <span style="font-size: 20px;margin-top: 1rem" >上传照片</span>
            </div>
          </div>
        </el-tab-pane>
        <!-- 护照首页 -->
        <el-tab-pane label="护照首页" name="second">
          <div align="left">
            <el-form class="demo-form-inline" label-width="8rem">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="中文姓名: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="性别: ">
                      <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                        <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="出生地点: ">
                      <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                        <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="有效期至: ">
                      <el-date-picker type="date" placeholder="有效期至" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="姓(拼音): ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="护照号: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="出生地点(英文): ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="签发机关: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="名(拼音): ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="出生日期: ">
                    <el-date-picker type="date" placeholder="出生日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="签发日期: ">
                    <el-date-picker type="date" placeholder="签发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="签发机关(英文): ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <br>
              <div align="center">
                <el-form-item>
                  <el-button type="primary" @click="">保  存</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- 身份证 -->
        <el-tab-pane label="身份证" name="third">
          <div align="left">
            <el-form class="demo-form-inline" label-width="8rem">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="中文姓名: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="民族: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="签发机关: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="身份证号码: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="出生日期: ">
                    <el-date-picker type="date" placeholder="出生日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="签发日期: ">
                    <el-date-picker type="date" placeholder="签发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="性别: ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="地址: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期至: ">
                    <el-date-picker type="date" placeholder="有效期至" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item style="margin-left: 9rem">
                    <el-checkbox>长期有效</el-checkbox>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <br>
              <div align="center">
                <el-form-item>
                  <el-button type="primary" @click="">保  存</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- 户口本 -->
        <el-tab-pane label="户口本" name="fourth">
          <div>
            <br>
            <div style="border: 1px solid black;width: 15%;height: 20rem;" display="flex" class="upDIV">
              <img src="~assets/add.png" style="display: flex">
              <span style="font-size: 20px;margin-top: 1rem" >上传照片</span>
            </div>
            <div style="width: 20%;height: 20rem;" display="flex" class="upDIV">
              <a >继续上传</a>
            </div>
          </div>
        </el-tab-pane>
        <!-- 婚姻状况 -->
        <el-tab-pane label="婚姻状况" name="five">
          <div>
            <br>
            <div style="border: 1px solid black;width: 15%;height: 20rem;" display="flex" class="upDIV">
              <img src="~assets/add.png" style="display: flex">
              <span style="font-size: 20px;margin-top: 1rem" >上传照片</span>
            </div>
            <div style="width: 20%;height: 20rem;" display="flex" class="upDIV">
              <a >继续上传</a>
            </div>
          </div>
        </el-tab-pane>
        <!-- 固定资产 -->
        <el-tab-pane label="固定资产" name="six">
          <div>
            <br>
            <div style="border: 1px solid black;width: 15%;height: 20rem;" display="flex" class="upDIV">
              <img src="~assets/add.png" style="display: flex">
              <span style="font-size: 20px;margin-top: 1rem" >上传照片</span>
            </div>
            <div style="width: 20%;height: 20rem;" display="flex" class="upDIV">
              <a >继续上传</a>
            </div>
          </div>
        </el-tab-pane>
        <!-- 申请表 -->
        <el-tab-pane label="申请表" name="seven">
          <div align="left">
            <el-form class="demo-form-inline" :model="formData" label-width="8rem">
              <div>
                <label>基本信息</label>
              </div>
              <br>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="姓(中文): ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="名(拼音): ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期: ">
                      <el-date-picker type="date" placeholder="出生日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="名(中文): ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="曾用名: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="出生省份: ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="姓(拼音): ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="性别: ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="婚姻状况: ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <br>
              <div>
                <label>护照信息</label>
              </div>
              <br>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="身份证号码: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="签发日期: ">
                      <el-date-picker type="date" placeholder="签发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="护照号: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期至: ">
                    <el-date-picker type="date" placeholder="有效期至" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="签发地: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="签发机关: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <br>
              <div>
                <label>家庭与职业信息</label>
              </div>
              <br>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="手机号码: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="配偶名称: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="父亲姓名: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="父亲职业: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="母亲姓名: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="母亲职业: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="其他亲属姓名: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="职业: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="子女姓名: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="住址: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="配偶生日: ">
                    <el-date-picker type="date" placeholder="配偶生日" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="父亲生日: ">
                    <el-date-picker type="date" placeholder="父亲生日" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="父亲婚姻状况: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="母亲生日: ">
                    <el-date-picker type="date" placeholder="母亲生日" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="母亲婚姻状况: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="生日: ">
                    <el-date-picker type="date" placeholder="生日" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="婚姻状况: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="生日: ">
                    <el-date-picker type="date" placeholder="生日" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="职业: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="配偶出生地: ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="父亲地址: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <br><br>
                  <el-form-item >
                    <!--<el-input style="width: 15rem"></el-input>-->
                  </el-form-item>
                  <el-form-item label="母亲地址: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <br><br>
                  <el-form-item label="" >
                    <!--{{formData.box}}-->
                  </el-form-item>
                  <el-form-item label="住址: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="与申请人关系: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="与申请人关系: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <div>
                <label>紧急联系人(不可填写同行人)</label>
              </div>
              <br>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="姓名(中文): ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="与申请人关系: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="手机号码: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="是否一起居住: ">
                    <el-select v-model="value" placeholder="请选择" style="width: 15rem">
                      <el-option v-for="item in selectManOp.sexOp" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <div>
                <label>旅游信息</label>
              </div>
              <br>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" >
                    <el-form-item label="访问目的地: ">
                      <el-input style="width: 15rem"></el-input>
                    </el-form-item>
                    <el-form-item label="预计离境时间: ">
                      <el-date-picker type="date" placeholder="签发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="首入城市: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                  <el-form-item label="5年内去过国家: ">
                    <el-input style="width: 15rem"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <el-form-item label="预计入境时间: ">
                    <el-date-picker type="date" placeholder="签发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 15rem">
                    </el-date-picker>
                  </el-form-item>
                </div></el-col>
              </el-row>
              <br>
              <div align="center">
                <el-form-item>
                  <el-button type="primary" @click="">保  存</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  var api = Vue.prototype.api
  export default {
    components: {
      axios,
      api
    },
    data () {
      return {
        formData: {
          box: '5555'
        },
        activeName2: 'first',
        value: '',
        selectManOp: {
          /** 性别 */
          sexOp: [{
            value: 0,
            label: '未知'
          }, {
            value: 1,
            label: '男'
          }, {
            value: 2,
            label: '女'
          }]
        }
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
<style>
  .upDIV{
    float: left;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
</style>

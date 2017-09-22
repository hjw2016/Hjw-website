<template>
  <div id="app">
    <div class="layout">
      <div class="layout-ceiling">
        <div class="layout-ceiling-main">
          <a href="#">注册登录</a> |
          <a href="#">帮助中心</a> |
          <a href="#">安全中心</a> |
          <a href="#">服务大厅</a>
        </div>
      </div>
    </div>
    <div class="layout-menu" :class="{'layout-hide-text': spanLeft < 3}">
      <Row type="flex" style="height: 100%;">
        <Col :span="spanLeft" class="layout-menu-left">
        <Menu theme="dark" width="auto">
          <Submenu :name="v.name" v-for="v in hierarchyArray[0].children" :key="v.name">
            <template slot="title">
              <Icon :type="v.icon" :size="iconSize"></Icon>
              {{v.name}}
            </template>
            <MenuItem :name="item.name" v-for="item in v.children" :key="item.name">
              <router-link class="layout-text" tag="div" :to="item.path" >
                <Icon :type="item.icon" :size="iconSize"></Icon>
                {{item.name}}
              </router-link>
            </MenuItem> 
          </Submenu>
        </Menu>
      </Col>
      <Col :span="spanRight" class="layout-right">
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem ><router-link to="/">首页</router-link></BreadcrumbItem>
          <!-- <BreadcrumbItem >{{pName}}</BreadcrumbItem> -->
          <BreadcrumbItem>{{curName}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-copy">
          by HuangJingwei @2017
      </div>
    </Col>
  </Row>
</div>
</div>
</template>

<script>
import Hello from '@/components/Hello'
import Hierarchy from '@/js/hierarchy'
import {MenuData} from '@/js/menu'

export default {
  name: 'app',
  data () {
    return {
      spanLeft: 3,
      spanRight: 21,
      iconSize: 18,
      hierarchyArray:[{children:[]}]
    }
  },
  computed:{
    curName (){
      return this.$route.name;
    },
    curPath (){
      return this.$route.path;
    }
  },
  mounted (){
    MenuData(data => {
      this.hierarchyArray=data;
    });
    // this.$http.get('static/data/menu.json').then((data) => {
    //   this.hierarchyArray = Hierarchy.toHierarchy(data.data);
    // });
  },
  methods: {

  },
  components:{
    'Hello':Hello
  }
}
</script>

<style>
@import './css/app.css';
</style>

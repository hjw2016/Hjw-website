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
          <Submenu :name="v.name" v-for="v in hierarchyArray[0].children" >
            <template slot="title">
                <Icon type="ios-people" :size="iconSize"></Icon>
                {{v.name}}
            </template>
            <MenuItem :name="item.name" v-for="item in v.children">
              <Icon type="ios-navigate" :size="iconSize"></Icon>
              <router-link class="layout-text" :to="item.path">{{item.name}}</router-link>
            </MenuItem> 
          </Submenu>
        </Menu>
      </Col>
      <Col :span="spanRight" class="layout-right">
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem ><router-link to="/">首页</router-link></BreadcrumbItem>
          <BreadcrumbItem >应用中心</BreadcrumbItem>
          <BreadcrumbItem>某应用</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-copy">

      </div>
    </Col>
  </Row>
</div>
    <!-- <div>
      <router-view></router-view>
    </div> -->
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import Hierarchy from '@/js/hierarchy'

export default {
  name: 'app',
  data () {
    return {
      title: 'Node and Vue StudyProject',
      spanLeft: 3,
      spanRight: 21,
      iconSize: 16,
      hierarchyArray:[]
    }
  },
  mounted (){
    this.$http.get('static/data/menu.json').then((data) => {
      this.hierarchyArray = Hierarchy.toHierarchy(data.data);
    })
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

<template>
  <div class="home-page">
    <!-- 头像信息 -->
    <div class="avatar-panel">
      <div class="left">
        <div class="avatar">
          <img
            v-if="get_user_info.avatarUrl"
            :src="get_user_info.avatarUrl"
            alt=""
          >
        </div>
        <div class="userinfo">
          <span>{{get_user_info.nickName ? get_user_info.nickName : '去授权'}}</span>
          <span>{{get_user_info.country}}</span>
        </div>
      </div>
      <div class="right">
        <i class="iconfont icon-iconfonticonfonti2copycopy"></i>
      </div>

    </div>
    <div class="tab-panel">
      <div
        class="tab-panel-item"
        v-for="(item,index) in panelList"
        :key="index"
        @click="navigateTo(item)"
      >
        <div class="left">
          <i
            :class="item.icon"
            :style="{'color':item.color,'fontSize':item.size}"
          ></i>
          <span>{{item.name}}</span>
        </div>
        <div class="right">
          <i class="iconfont icon-iconfonticonfonti2copycopy"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      panelList: [
        {
          name: "已收藏",
          icon: "iconfont icon-shoucangjia",
          url: "taber/favor/main",
          color: "#2b9ef2",
          size: "20px"
        },
        {
          name: "已发布",
          icon: "iconfont icon-fabu",
          url: "taber/trend/main",
          color: "#cf9615",
          size: "20px"
        },
        {
          name: "草稿箱",
          icon: "iconfont icon-caogaoxiang-chakanrenlingjilu",
          url: "taber/draft/main",
          color: "#34c6c4",
          size: "24px"
        },
        {
          name: "回收站",
          icon: "iconfont icon-huishouzhan",
          url: "taber/recycle/main",
          color: "#8a8a8a",
          size: "25px"
        }
      ]
    };
  },

  computed: {
    ...mapGetters(["get_user_info"])
  },
  mounted() {
    // avatarUrl nickName
    // console.log(this.get_user_info);
  },
  methods: {
    navigateTo(item) {
      wx.navigateTo({
        url:'../'+item.url
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  padding: 24px;
}

.tab-panel {
  width: 100%;
}

.avatar-panel {
  width: 100%;
  height: 100px;
  padding: 20px;
  box-shadow: 0px 0px 4px rgba(166, 191, 245, 0.4);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      overflow: hidden;
      background: #f5f5f5;
      margin-right: 15px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .userinfo {
      display: flex;
      flex-direction: column;

      span:nth-child(1) {
        margin-bottom: 5px;
        font-size: 17px;
      }

      span:last-child {
        font-size: 13px;
      }
    }
  }
}

.tab-panel {
  margin-top: 20px;

  .tab-panel-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 4px rgba(166, 191, 245, 0.4);
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;

      i {
        margin-right: 9px;
      }
    }
  }
}

.right {
  i {
    font-size: 13px;
    color: rgb(166, 191, 245);
  }
}
</style>

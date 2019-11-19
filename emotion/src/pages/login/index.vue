<template>
  <div class="wrap">
    <div class="icon">
      <img
        src="/static/images/avatar.png"
        alt=""
      >
    </div>
    <div class="tip">
      <div class="title">用户授权</div>
      <div class="desc">为了不影响您后续的使用，我们将获取您的公开信息(头像,昵称等)</div>
    </div>
    <i-button
      class="btn"
      openType="getUserInfo"
      @getuserinfo="onGetUserInfo"
      type="success"
      shape="circle"
      :loading="loading"
    >立即授权
    </i-button>
    <!-- 1cbfb5 -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { authorize } from "../../common/js/authorize";
export default {
  data() {
    return {
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png"
      },
      loading: false
    };
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    },

    onGetUserInfo(e) {
      // console.log(e);
      authorize(e, this);
    },

    ...mapMutations({
      set_user_info: "SET_USER_INFO"
    })
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang="less">
/* 用户头像区域信息 */
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  padding: 15px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}

.tip {
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    font-weight: 400;
    color: #000;
    margin-bottom: 10px;
  }
  .desc {
    width: 100%;
    color: #b0b0b0;
    font-size: 16px;
  }
}

.btn {
  margin-top: 30px;
  width: 300px;
}
</style>

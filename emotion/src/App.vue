<script>
import { mapMutations } from "vuex";
export default {
  created() {
    let _this = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function(res) {
              _this.set_user_info(res.userInfo);
            },
            fail: err => {
              // console.log(err);
            }
          });
        } else {
          wx.navigateTo({
            url: "/pages/login/main"
          });
        }
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  methods: {
    ...mapMutations({
      set_user_info: "SET_USER_INFO"
    })
  }
};
</script>

<style>
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>

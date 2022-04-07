<template>
  <div class="profile">
    <navi-bar class="navi-bar">
      <div slot="center">
        我的信息
      </div>
    </navi-bar>
    <user-info/>
    <account-info class="account"/>
    <normal-list-view :list-data="orderList" class="list"/>
    <normal-list-view :list-data="serviceList"/>
  </div>
</template>

<script>
import NaviBar from "../../components/common/navibar/NaviBar";

import UserInfo from "./childComps/UserInfo";
import AccountInfo from "./childComps/AccountInfo";
import NormalListView from "./childComps/NormalListView";

export default {
  name: "Profile",
  components: {
    NaviBar,
    UserInfo,
    AccountInfo,
    NormalListView
  },
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
.profile {

}

.navi-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}

.account, .list{
  padding-bottom: 5px;
  border-bottom: 10px solid rgba(186, 186, 187, .4);
}
</style>

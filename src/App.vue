<template>
  <div id="app">
    <topnav
      ref="topnav"
      :topnavOpacity="topnavOpacity"
      :mineWidth="topnavWidth"
      @call-chatbox="callChatbox"
      id="topnav"
    />
    <div id="layout-content">
      <keep-alive>
        <router-view
          id="combox"
          class="combox"
          :key="$route.fullPath + localUserId"
          @open-chatbox="callChatbox"
          @logout="doLogout"
        />
      </keep-alive>
    </div>
    <chatbox
      ref="chatbox"
      :is-display="chatboxDisplay"
      @close="chatboxDisplay = false"
      @call="callChatbox"
      id="chatbox"
    />
    <cornea
      ref="cornea"
      :is-display="corneaDisplay"
      @close="corneaDisplay = false"
      @call="callCornea"
      id="cornea"
    />
  </div>
</template>

<script>
import topnav from "./components/topnav";
import chatbox from "./components/chatbox";
import cornea from "./components/cornea";
import { logout } from "./api/user";
import { logoutWork } from "./api/common";
import { judgeWap } from "./utils";

export default {
  components : {
    topnav,
    chatbox,
    cornea,
    Chatbox
  },
  data() {
    return {
      bgsrc: "../assetx/logo.png",
      combox: null,
      chatboxDisplay: false,
      topnavOpacity: 0,
      corneaDisplay,
      chatboxData: {
        sender: null,
        receiver: null
      },
      corneaPosition: {
        x: null,
        y: null
      }
    }
  },
  mounted() {
    this.initCombox();
    this.$refs.topnav.$on("change-content",()=>{
      this.topnavOpacity = 0;
    });
  },
  methods: {
    getCombox: function(){
      this.combox = document.getElementById("combox");
    },
    initCombox: async function(){
      setTimeout(()=>{
        this.getCombox();
        this.combox.addEventListener(
          "scroll",
          ()=>{
            this.topnavOpacity = this.this.combox.scrollTop * 0.0033;
          },
          true
        )
      },500);
    },
    callChatbox: function(val) {
      this.chatboxData.sender = val.sender;
      this.chatboxData.receiver = val.receiver;
      this.chatboxDisplay = true;
    },
    callCornea: function() {
      this.style.top = "calc(100%-40px)";
      this.style.left = "calc(100%-40px)";
      this.corneaDisplay = true;
    },
    doLogout: async function() {
      let response = await logout();
      if(response.status == 0) {
        const procedure = new Promise((resolve) => {
          logoutWork();
          resolve();
        }).then(() => {
          this.$router.push('/main');
        });
      }
    },
  },
  computed: {
    nowPath: function() {
      return this.$route.path;
    },
    localUserId: function() {
      let ret = localStorage.getItem("userId");
      return ret;
    },
    topnavWidth: function() {
      let res = "100%";
      return this.topnavOpacity ? `calc(${res} - 200px)` : res;
    },
    isWap() {
      return judgeWap();
    }
  },
  watch: {
    nowPath :function(){
      this.initCombox();
    }
  }
}
</script>

<style lang="scss">
*{
  margin:0;
  padding: 0;
}
#app{
  height: 100%;
  width: 100%;
  padding: 0;
  overflow-x: hidden;
}
#layout-content {
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 100px;
}
.combox {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
#chatbox {
  position: fixed;
  z-index: 10001;
}
#cornea {
  position: fixed;
  z-index:1001;
}
:focus {
  outline: 0;
}
</style>

<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last">

    <md-app-toolbar class="md-large md-dense md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>

          <router-link to="/" class="md-button btn-line-height-fix home-btn" :class="`md-theme-${$material.currentTheme}`">
            Large
          </router-link>
        </div>

        <div class="md-toolbar-section-end">
          <!-- <md-button class="md-icon-button">
            <md-icon>more_vert</md-icon>
          </md-button> -->
          <router-link
            v-if="!$store.state.isUserLoggedIn"
            to="login"
            class="md-button btn-line-height-fix"
            :class="`md-theme-${$material.currentTheme}`">
            Login
          </router-link>
          <router-link
            v-if="!$store.state.isUserLoggedIn"
            to="signup"
            class="md-button btn-line-height-fix"
            :class="`md-theme-${$material.currentTheme}`">
            Signup
          </router-link>
          <md-button
            v-if="$store.state.isUserLoggedIn"
            @click="logout"
            class="md-button btn-line-height-fix"
            :class="`md-theme-${$material.currentTheme}`">
            Logout
          </md-button>
        </div>
      </div>

      <div class="md-toolbar-row">
        <md-tabs class="md-primary">
          <md-tab
            @click="navTo('/')"
            id="tab-home"
            md-label="Home">
          </md-tab>
          <md-tab
            @click="navTo('posts')"
            id="tab-posts"
            md-label="Posts">
          </md-tab>
          <!-- <md-tab id="tab-favorites" md-label="Favorites"></md-tab> -->
        </md-tabs>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

      <md-list>
        <md-list-item to="/">
          <md-icon>insert_drive_file</md-icon>
          <span class="md-list-item-text">New Post</span>
        </md-list-item>

        <md-list-item to="/">
          <md-icon>edit</md-icon>
          <span class="md-list-item-text">Manage Posts</span>
        </md-list-item>

  <!--           <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item> -->
      </md-list>
    </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  }),
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('login')
    },
    navTo (route) {
      this.$router.push(route)
    },
  }
}
</script>

<style>
#app, .md-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app, .md-app {
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.btn-line-height-fix {
  line-height: 40px;
}
.home-btn {
  text-transform: none;
  font-size: 20px;
}
</style>

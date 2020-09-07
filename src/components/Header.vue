<template>
  <header class="b-header b-header_blue">
    <nav class="b-header__main-navigation">
      <router-link 
        class="b-header__navlink b-header__navlink_grey" 
        to="/"
      >
        Home
      </router-link>
      <router-link
        class="b-header__navlink b-header__navlink_grey"
        to="/settings"
      >
        Settings
      </router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.b-header {
  height: 50px;
  display: flex;
  align-items: center;

  &_blue {
    background-color: #2c3e50;
  }

  .b-header__main-navigation {
    margin: 0 auto;

    .b-header__navlink {
      margin: 0 20px;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;

      &_grey {
        color: #ccc;
      }

      &.router-link-exact-active {
        color: #d19a22;
      }
    }
  }
}

@media (max-width: 576px) {
  .b-header .b-header__main-navigation .b-header__navlink {
    font-size: 14px;
  }
}
</style>

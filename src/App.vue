<template>
  <router-view/>
</template>

<style lang="scss">
:root {
  --sidebar-width: 260px;
  --toolbar-height: 4rem;
}

@media (max-width: 767px) {
  :root {
    --sidebar-width: 0px;
  }
}

#app {
  /* padding: 0.8rem; */
  height: 100vh;
  background-color: #a4a4a41f;
  font-family: Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .p-menu-submenu-label {
    color: rgb(43, 43, 43);
    display: flex;
  }
}

body {
  margin: 0;
}
</style>

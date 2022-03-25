<template>
  <div class>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link class="nav-link" aria-current="page" to="/">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/users">Users</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/posts">Posts</nuxt-link>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Posts</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <nuxt-link class="dropdown-item" to="/posts/show/1">Show</nuxt-link>
                </li>
                <li>
                  <nuxt-link class="dropdown-item" to="/posts/edit/1">Edite</nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  </div>
</template>
<style scoped>
.nuxt-link-exact-active {
  color: tomato !important;
}
</style>

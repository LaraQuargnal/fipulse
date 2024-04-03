<template>
  <div class="studentcorner">
    <div class="row">
      <div class="col-9">
        <h3>Thissomething</h3>
        <button class="btn btn-primary" style="margin-top: 20px; width: 150px">
          {{ $t("addForum") }}
        </button>
      </div>
      <div class="col-3" style="padding-left: 20px">
        <div
          class="col-content"
          style="
            text-align: center;
            background-color: #f0f0f0;
            padding: 20px;
            padding-bottom: 40px;
          "
        >
          <form class="d-flex" role="search" style="margin-left: 10px">
            <input
              v-model="store.searchTerm"
              class="form-control me-2"
              type="search"
              :placeholder="$t('navBarSearch')"
              aria-label="Search"
              style="font-size: 14px"
            />
          </form>
          <ul class="list-group" style="margin-top: 30px; border: none">
            <li class="list-group-item" style="border: none">
              <div class="box-title" style="width: 100%">{{ $t("users") }}</div>
              <div class="list-group-item-content">
                <ul
                  style="
                    padding-left: 10;
                    list-style-type: none;
                    text-align: left;
                  "
                >
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Iva')"
                      style="color: #007bff; font-weight: normal"
                      >Iva Ivičić</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Marko')"
                      style="color: #007bff; font-weight: normal"
                      >Marko Marković</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Ana')"
                      style="color: #007bff; font-weight: normal"
                      >Ana Aničić</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Blablablablabla')"
                      style="color: #007bff; font-weight: normal"
                      >Blablablablabla Blablalbabičić</a
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "StudentCorner",
  data() {
    return {
      store: store,
    };
  },
};
</script>

<style scoped>
.box-title {
  background-color: #000;
  color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
  width: 230px;
}

.menu-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: 40px;
  text-align: left;
  padding-left: 20px;
  border: 1px solid #808080;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 5px;
}

.open .dropdown-content {
  display: block;
}

.dropdown-content button {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.button-text {
  flex: 1;
}

.button-sign {
  margin-right: 10px;
  padding-right: 10px;
}
</style>

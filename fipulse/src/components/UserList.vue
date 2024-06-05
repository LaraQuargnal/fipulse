<template>
  <div>
    <ul class="list-group" style="margin-top: 30px; border: none">
      <li class="list-group-item" style="border: none">
        <div class="box-title" style="width: 100%">{{ userListTitle }}</div>
        <div class="list-group-item-content">
          <ul style="padding-left: 35%; list-style-type: none">
            <li v-for="user in userList" :key="user" @click="openUserCard(user)">
              <router-link
                :to="{
                  name: userCardRouteName,
                  params: { nickname: user.nickname },
                }"
                ><div style="display: flex; align-items: center">
                  <img
                    v-if="user.profileImage"
                    :src="user.profileImage"
                    alt="Profile Picture"
                    class="profile-picture"
                  />
                  <img
                    v-else
                    :src="require('@/assets/userpicture.png')"
                    alt="Default Profile Picture"
                    class="profile-picture"
                  />
                  <a href="#" style="color: #007bff; font-weight: normal"
                    ><b>{{ user.nickname }}</b></a
                  >
                </div></router-link
              >
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: {
    userList: {
      type: Array,
      required: true,
    },
    userCardRouteName: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Search",
    },
    userListTitle: {
      type: String,
      default: "Users",
    },
  },
  methods: {
    openUserCard(user) {
      this.$router.push({
        name: this.userCardRouteName,
        params: { nickname: user.nickname },
      });
    },
  },
};
</script>

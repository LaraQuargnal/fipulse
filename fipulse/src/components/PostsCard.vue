<template>
  <div>
    <div v-for="card in cards" :key="card" class="post">
      <div class="post-header">
        <div class="user-info">
          <span class="user-name">{{ card.user }}</span>
        </div>
        <div class="post-date">
          <span>{{ formatDate(card.date) }}</span>
        </div>
      </div>
      <h3 class="post-title">{{ card.subject }}</h3>
      <h5 class="post-comment">{{ card.title }}</h5>
      <p class="post-comment">{{ card.comment }}</p>
      <div class="attachment">
        <a :href="card.attachment">{{ card.attachment }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostsCard",
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>


<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  flex-grow: 1;
  text-align: left;
}

.user-name {
  font-weight: bold;
}

.post-comment {
  text-align: left;
}

.post-date {
  color: #777;
  font-size: 12px;
}

.post-title {
  margin-bottom: 10px;
  text-align: left;
}

.attachment {
  margin-top: 10px;
}

.attachment a {
  color: #007bff;
  text-decoration: underline;
}
</style>
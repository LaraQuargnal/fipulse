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
      <div class="attachment" v-if="card.attachment">
        <a :href="card.attachment" target="_blank">{{
          getAttachmentName(card.attachment)
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { storage } from "@/firebase";
import "../styles/postsCard.css";

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
    getAttachmentName(attachment) {
      const fileName = attachment
        .split("/")
        .pop()
        .split("?")[0]
        .split("%2F")
        .pop();
      return decodeURIComponent(fileName);
    },
  },
};
</script>
<template>
  <div>
    <div v-for="card in cards" :key="card" class="postCard">
      <div class="postCard-header">
        <div class="userCard-info">
          <span class="userCard-name">{{ card.user }}</span>
        </div>
        <div class="postCard-date">
          <span>{{ formatDate(card.date) }}</span>
        </div>
      </div>
      <h3 class="postCard-title">{{ card.subject }}</h3>
      <h5 class="postCard-comment">{{ card.title }}</h5>
      <p class="post-comment">{{ card.comment }}</p>
      <div class="attachmentCard" v-if="card.attachment">
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
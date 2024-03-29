<template>
  <div class="post">
    <div class="post-header">
      <div class="user-info">
        <span class="user-name">Ana Aničić</span>
      </div>
      <div class="post-date">
        <span>28.03.2024. 18:48</span>
      </div>
    </div>
    <h3 class="post-title">Subject 1</h3>
    <h5 class="post-comment">Skripta za prvi kolokvij</h5>
    <p class="post-comment">
      Komentar: u privitku skripta za prvi kolokvij kojegija XY. Nisam dovršila
      skriptu. Stala na nešto.
    </p>
    <div class="attachment">
      <a href="#">PI_skripta.pdf</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostsCard",
  props: {},
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
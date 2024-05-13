<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-body">
          <form @submit.prevent="createNewPost" style="margin-top: 20px">
            <div class="form-group">
              <label for="titleInput">Title:</label>
              <input
                type="text"
                class="form-control"
                id="titleInput"
                v-model="newPost.title"
                required
              />
            </div>
            <div class="form-group">
              <label for="subjectSelect">Subject:</label>
              <select
                class="form-control"
                id="subjectSelect"
                v-model="newPost.subject"
                required
              >
                <option value="" disabled>Select Subject</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.id"
                  :value="subject.name"
                >
                  {{ subject.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="commentInput">Comment:</label>
              <textarea
                class="form-control"
                id="commentInput"
                v-model="newPost.comment"
                required
              ></textarea>
            </div>
            <div class="form-group" style="margin-top: 10px">
              <label for="attachmentInput">Attachment:</label>
              <input
                type="file"
                class="form-control-file"
                id="attachmentInput"
                @change="handleFileUpload"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style="margin-top: 20px; width: 150px"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "@/firebase";
import { ref, onMounted } from "vue";
import store from "@/store";
import { onClickOutside } from "@vueuse/core";

export default {
  props: {
    isOpen: Boolean,
    getPosts: Function,
  },
  emits: ["modal-close"],
  setup(props, { emit }) {
    const newPost = ref({
      title: "",
      subject: "",
      comment: "",
      attachment: null,
    });

    const subjects = ref([]);

    const handleFileUpload = (event) => {
      console.log("File uploaded", event.target.files[0]);
    };

    const createNewPost = () => {
      console.log("Creating new post");
      console.log(newPost.value);
      const { title, subject, comment, attachment } = newPost.value;

      db.collection("posts")
        .add({
          user: store.currentUser,
          postead_at: Date.now(),
          title,
          subject,
          comment,
          attachment,
        })
        .then((doc) => {
          console.log("Document successfully written!", doc);

          newPost.value = {
            title: "",
            subject: "",
            comment: "",
            attachment: null,
          };

          emit("modal-close");
          props.getPosts();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    };

    const target = ref(null);

    onMounted(() => {
      onClickOutside(target, () => emit("modal-close"));
      db.collection("subjects")
        .get()
        .then((querySnapshot) => {
          const subjectsArray = [];
          querySnapshot.forEach((doc) => {
            const subject = doc.data();
            subjectsArray.push({ id: doc.id, name: subject.name });
          });
          subjects.value = subjectsArray;
        })
        .catch((error) => {
          console.log("Error fetching subjects: ", error);
        });
    });

    return { newPost, subjects, handleFileUpload, createNewPost, target };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 500px;
  height: 400px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>

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
            <div v-if="uploading">
              <progress :value="progress" max="100"></progress>
              <span>{{ progress }}</span>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style="margin-top: 20px; width: 150px"
              :disabled="uploading"
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
import { db, storage } from "@/firebase";
import { ref, onMounted } from "vue";
import store from "@/store";
import { onClickOutside } from "@vueuse/core";
import "../styles/modalComponent.css";

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
    const progress = ref(0);
    const uploading = ref(false);

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      const storageRef = storage.ref();
      const fileRef = storageRef.child(
        `attachments/` + store.currentUser + `/` + `${file.name}`
      );

      try {
        uploading.value = true;
        const uploadTask = fileRef.put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            progress.value =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("Error uploading file: ", error);
            uploading.value = false;
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              newPost.value.attachment = downloadURL;
              console.log("File uploaded", downloadURL);
              uploading.value = false;
            });
          }
        );
      } catch (error) {
        console.error("Error uploading file: ", error);
        uploading.value = false;
      }
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
          subjectsArray.sort((a, b) => a.name.localeCompare(b.name));
          subjects.value = subjectsArray;
        })
        .catch((error) => {
          console.log("Error fetching subjects: ", error);
        });
    });

    return {
      newPost,
      uploading,
      subjects,
      handleFileUpload,
      createNewPost,
      target,
      handleFileUpload,
      progress,
    };
  },
};
</script>
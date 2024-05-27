<template>
  <div class="home">
    <GoogleMap
      api-key="AIzaSyCIgUx5FsZExIsX8xJl6I3sk40Qldh95so"
      style="width: 100%; height: 580px"
      :center="center"
      :zoom="15"
    >
      <CustomControl position="BOTTOM_CENTER">
        <button class="custom-btn" @click="hyTea">👋</button>
      </CustomControl>

      <Marker
        v-for="(location, index) in locations"
        :key="index"
        :options="{ position: location.position, icon: location.icon }"
      >
        <InfoWindow>
          <div class="info-window">
            <h3>{{ location.name }}</h3>
            <p v-for="detail in location.details" :key="detail">{{ detail }}</p>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow, CustomControl } from "vue3-google-map";

const center = ref({ lat: 44.86657875823181, lng: 13.852038675419786 });
const userLocation = ref(null);

const blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
const redIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const greenIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

const rovinjska = ref({ lat: 44.86307020606095, lng: 13.848230752403426 });
const atrium = ref({ lat: 44.86724555909325, lng: 13.856825351821573 });
const menza = ref({ lat: 44.86689223055921, lng: 13.854025640910766 });
const scpu = ref({ lat: 44.867286786499356, lng: 13.853145653194405 });
const rock = ref({ lat: 44.87174656800202, lng: 13.849762433567612 });

const locations = ref([
  {
    position: userLocation,
    icon: redIcon,
    name: "Tvoja Lokacija",
    details: [],
  },
  {
    position: center,
    icon: greenIcon,
    name: "FET Pula",
    details: ["402: 1.kat", "303: 0.kat", "203: -1.kat"],
  },
  {
    position: rovinjska,
    icon: greenIcon,
    name: "FIPU",
    details: ["RINF: 1.kat", "RV: 1.kat"],
  },
  {
    position: scpu,
    icon: greenIcon,
    name: "Studentski centar",
    details: ["studentski ugovori"],
  },
  {
    position: atrium,
    icon: blueIcon,
    name: "Atrium",
    details: [
      "Mirni prostor za učenje:",
      "struja, pušenje, internet,",
      "jeftina kava!",
    ],
  },
  {
    position: menza,
    icon: blueIcon,
    name: "Studentska menza",
    details: ["Restoran, kužinica, pizzerija"],
  },
  {
    position: rock,
    icon: blueIcon,
    name: "Rock Caffe",
    details: ["samo ime sve govori"],
  },
]);

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    },
    (error) => {
      console.error("Error getting user's location:", error);
    }
  );
});
const hyTea = () => alert("Hej, Prikoučkarka!");
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
}
.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}

.info-window {
  max-width: 150px;
  font-size: 12px;
}
.info-window h3 {
  margin: 0;
  font-size: 14px;
}
.info-window p {
  margin: 0;
  text-align: left;
}
</style>

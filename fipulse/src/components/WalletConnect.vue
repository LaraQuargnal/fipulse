<template>
  <div>
    <button
      @click="connectWallet"
      class="btn btn-primary"
      :data-bs-toggle="account ? 'tooltip' : ''"
      :title="account ? `Account: ${account}` : ''"
    >
      {{ buttonText }}
    </button>
  </div>
</template>
  
<script>
import web3 from "@/web3";
import { useToast } from "vue-toastification";
import { ref, onMounted } from "vue";

export default {
  data() {
    return {
      account: null,
    };
  },
  computed: {
    buttonText() {
      return this.account ? "Disconnect MetaMask" : "Connect MetaMask";
    },
  },
  methods: {
    async connectWallet() {
      try {
        if (this.account) {
          this.account = null;
          console.log("Disconnected MetaMask");
          this.toast.success("MetaMask account disconnected");
        } else {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          this.account = accounts[0];
          console.log("Connected account:", this.account);
          this.toast.success("MetaMask account connected");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        this.toast.error("Error connecting to MetaMask");
      }
    },
  },
  mounted() {
    this.toast = useToast();
    if (window.ethereum) {
      // Listen for account changes and update account based on changes
      window.ethereum.on("accountsChanged", (accounts) => {
        this.account = accounts[0] || null;
        this.toast.success(
          this.account
            ? "MetaMask account connected"
            : "MetaMask account disconnected"
        );
      });
    }

    onMounted(() => {
      // Bootstrap tooltip onHover account number
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    });
  },
};
</script>
  
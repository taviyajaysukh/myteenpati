<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title style="display: inline-block">
          <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start"></span>Promotion
        </ion-title>
       <!-- <ion-button slot="end" id="open-linkright">
          <ion-icon :icon="filter" />
        </ion-button>-->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col class="ion-text-center">
            <ion-text> Bonus:₹ 0 </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row>
          <ion-col class="ion-text-center">
            <ion-text> Total People 1 </ion-text>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-text> Contribution ₹ 0 </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked">My Promotion Code</ion-label>
              <ion-input :value="promotioncode" :disabled="true"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked">My Promotion Link</ion-label>
              <ion-input :value="prurl" :disabled="true">
              </ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="2"></ion-col>
          <ion-col size="8" class="ion-text-center">
            <ion-button class="buttonctm" @click="copyText()">Copy Now</ion-button>
          </ion-col>
          <ion-col size="2"></ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-segment class="segment-class" @ionChange="segmentChanged1($event)" value="level1">
              <ion-segment-button value="level1">
                <ion-label>Level 1</ion-label>
              </ion-segment-button>
              <ion-segment-button value="level2">
                <ion-label>Level 2</ion-label>
              </ion-segment-button>
              <ion-segment-button value="level3">
                <ion-label>Level 3</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-card class="full-width" v-if="segmentModel1 === 'level1'">
            <ion-card-content>
              <div class="input_box">
                <!-- Input with value -->
                <ion-label>
                  <ion-icon :icon="search" />
                </ion-label>
                <ion-input type="tel" placeholder="Search"></ion-input>
              </div>
              <ion-grid>
                <ion-row>
                  <ion-col size="12">
                  
                    <EasyDataTable :headers="headers" :items="referraldata" buttons-pagination rows-per-page="10">
                  </EasyDataTable>
                  </ion-col>
                  
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
          <ion-card class="full-width" v-if="segmentModel1 === 'level2'">
            <ion-card-content>
              <div class="input_box">
                <!-- Input with value -->
                <ion-label>
                  <ion-icon :icon="search" />
                </ion-label>
                <ion-input type="tel" placeholder="Search"></ion-input>
              </div>
              <ion-grid>
                <ion-row class="ion-text-center">
                  <ion-col> Id </ion-col>
                  <ion-col> Phone </ion-col>
                  <ion-col> Water card </ion-col>
                  <ion-col> First Reward </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
          <ion-card class="full-width" v-if="segmentModel1 === 'level3'">
            <ion-card-content>
              <div class="input_box">
                <!-- Input with value -->
                <ion-label>
                  <ion-icon :icon="search" />
                </ion-label>
                <ion-input type="tel" placeholder="Search"></ion-input>
              </div>
              <ion-grid>
                <ion-row class="ion-text-center">
                  <ion-col> Id </ion-col>
                  <ion-col> Phone </ion-col>
                  <ion-col> Water card </ion-col>
                  <ion-col> First Reward </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </ion-row>
      </ion-grid>
      <ion-modal trigger="open-linkright" class="promotion">
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label @click="() => router.push('/my/bonusrecord')">Bonus Record</ion-label>
          </ion-item>
          <ion-item>
            <ion-label @click="() => router.push('/my/applyrecord')">Apply Record</ion-label>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
    <ion-footer>
      <h1>Footer</h1>
      <FooterPage />
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import axios from "axios";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonIcon,
  IonTitle,
  IonButton,
  IonText,
  IonCardContent,
  IonCard,
  IonModal,
  IonSegment,
  IonFooter,
  IonSegmentButton,
  alertController,
  toastController
} from "@ionic/vue";
import { defineComponent } from "vue";
import FooterPage from "../include/FooterPage.vue";
import { arrowBack, filter, search } from "ionicons/icons";
import { useRouter } from "vue-router";
import type { Header } from "vue3-easy-data-table";
export default defineComponent({
  name: "PromotionPage",
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonModal,
    IonCard,
    IonItem,
    IonIcon,
    IonTitle,
    IonButton,
    IonText,
    IonCardContent,
    IonSegment,
    IonFooter,
    IonSegmentButton,
    FooterPage,
  },
  setup() {
    const headers: Header[] = [
      { text: "Mobile", value: "frommoble" },
      { text: "Referral Mobile", value: "tomoble" },
      { text: "Total Referral Amount", value: "totalreferral" },
      { text: "Date", value: "date" },
    ];
    const router = useRouter();
    return {
      arrowBack,
      filter,
      search,
      router,
      headers
    };
  },
  data() {
    return {
      segmentModel1: "level1",
      currentUser: "",
      promotioncode: "",
      referraldata: [{ "frommoble": 0, "tomoble": 0, "totalreferral": 0, "date": '' }],
      prurl: "",
      siteurl: ''
    };
  },
  mounted() {
    this.siteurl = window.location.origin;
    this.currentUser = localStorage.getItem("session_user") || "";
    let sesspr = localStorage.getItem("promotioncode") || "";
    this.promotioncode = sesspr.replace(/['"]+/g, "");
    this.prurl = this.siteurl + "/my/register?r_code=" + this.promotioncode;
    this.getReferralLevel()
  },
  ionViewDidEnter() {
    this.presentAlert();
  },
  methods: {
    async getReferralLevel() {
      let usermobile = localStorage.getItem("session_user") || "";
      await axios
        .get("http://localhost:5000/getReferralLevel1/" + usermobile)
        .then(res => this.referraldata = res.data.data);
    },
    copyText() {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.prurl;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.toastfunction('Copy text successfully...', 3000)
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: "Notice",
        cssClass: "my-custom-class",
        message:
          "When your friends trade, you will also receive a 30% commission. Therefore, the more friends you invite, the higher your commission. There is a fixed income every day, the commission is permanent, but the reward is only onceWhen they make money, they will invite their friends to join them, and then you can get a 20% commission. In this way, your team can spread quickly. Therefore, I hope everyone can use our platform to make money, make money, and make money!When they make money, they will invite their friends to join them, and then you can get a 20% commission. In this way, your team can spread quickly. Therefore, I hope everyone can use our platform to make money, make money, and make money!Level 1 commission: Friends who join through your own link belong to your level, when they trade, you will get 30% commission.Tier 2 commission: Friends who join through your friend link belong to your secondary commission. When they trade, you can get 20% commission.Level 3 commission: Friends who join through friends of friends belong to your level 3. When they trade, you get 10% commission.Promotional rewards: 10% bonus amount for the first recharge after the first-level lower level joins. If your friend joins through your invitation and recharges 1000 for the first time, you will get 200",
        buttons: ["Close"],
      });
      await alert.present();
    },
    segmentChanged1(ev1: CustomEvent) {
      this.segmentModel1 = ev1.detail.value;
    },
    async toastfunction(message: string, duration?: number) {
      const toast = await toastController.create({
        message: message,
        duration: duration,
        position: 'middle',
        cssClass: 'custom-toast',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ],
      });
      await toast.present();
    }
  },

});
</script>
<style scoped>
.border-bottom-ctm {
  border-bottom: 2px solid gray;
  padding: 5px;
}

.buttonctm {
  width: 80%;
  height: 40px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  line-height: 30px;
  border-radius: 2px;
  border: 0;
  text-align: center;
  --background: #f5f5f5;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
}

.input_box {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 48px;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 35px;
  position: relative;
}

.full-width {
  max-width: 100%;
  width: 100%;
}

.my-custom-class .alert-wrapper {
  --max-width: 700px;
  --width: 100%;
}
</style>

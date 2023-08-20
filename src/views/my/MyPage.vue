<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar color="primary" class="height200 resposive-height">
          <ion-grid>
            <ion-row>
              <ion-col>
                <!-- fab placed to the (vertical) center and end -->
                <ion-fab>
                  <ion-fab-button color="secondary">
                    9
                  </ion-fab-button>
                </ion-fab>
                <div class="userhed">
                  <p>user : {{currentUser}}</p>
                  <p>ID : {{currentUserId}}</p>
                </div>
              </ion-col>
              <ion-col>
                <ion-fab horizontal="end">
                  <ion-fab-button color="secondary" @click="presentAlert">
                    <ion-icon :icon="notifications"></ion-icon>
                  </ion-fab-button>
                </ion-fab>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="4" size-xs="12" size-sm="12" size-md="4" size-lg="4" class="ion-text-center">
                <p>₹ {{balance}}</p>
                <p>Balace</p>
                <ion-button class="btn-custom-class" @click="() => router.push('/payment/recharge')">Recharge
                </ion-button>
              </ion-col>
              <ion-col size="4" size-xs="12" size-sm="12" size-md="4" size-lg="4" class="ion-text-center">
                <p>₹ {{totalPromotion}}</p>
                <p>Commission</p>
                <ion-button class="btn-custom-class" @click="() => router.push('/my/reward')">See</ion-button>
              </ion-col>
              <ion-col size="4" size-xs="12" size-sm="12" size-md="4" size-lg="4" class="ion-text-center">
                <p>₹ {{totalInterest}}</p>
                <p>Interest</p>
                <ion-button class="btn-custom-class" @click="() => router.push('/my/interest')">See</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>
      <ion-accordion-group>
        <ion-accordion value="signin">
          <ion-item slot="header">
            <ion-icon :icon="checkbox"></ion-icon>
            <ion-label>Sign In</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            Sign In
            <h2>Sign In</h2>
            <h5>Total：4 Days</h5>
            <h5>Today Rebates：₹ 0</h5>
            <h5>Total Rebates：₹ 0</h5>
            <h5>Status：Had signed in</h5>
          </div>
        </ion-accordion>
        <ion-accordion value="orders">
          <ion-item slot="header">
            <ion-icon :icon="calculator"></ion-icon>
            <ion-label>Orders</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/my/order')">Orders</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="promotion">
          <ion-item slot="header">
            <ion-icon :icon="gift"></ion-icon>
            <ion-label>Promotion</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/my/promotion')">Promotion</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="redenvelope">
          <ion-item slot="header">
            <ion-icon :icon="addCircle"></ion-icon>
            <ion-label>Red Envelope</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">

            <ion-label @click="() => router.push('/my/redenvelope')">Red Envelope</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="wallet">
          <ion-item slot="header">
            <ion-icon :icon="wallet"></ion-icon>
            <ion-label>Wallet</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-item>
              <ion-label @click="() => router.push('/payment/recharge')">Recharge</ion-label>
            </ion-item>
            <ion-item>
              <ion-label @click="() => router.push('/payment/withdrawal')">Withdrawal</ion-label>
            </ion-item>
            <ion-item>
              <ion-label @click="() => router.push('/payment/withdrawalfund')">Withdrawal Fund</ion-label>
            </ion-item>
            <ion-item>
              <ion-label @click="() => router.push('/payment/transactions')">Transactions</ion-label>
            </ion-item>
          </div>
        </ion-accordion>
        <ion-accordion value="bankcard">
          <ion-item slot="header">
            <ion-icon :icon="card"></ion-icon>
            <ion-label>Bank Card</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/payment/bankcard')">Bank Card</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="address">
          <ion-item slot="header">
            <ion-icon :icon="globe"></ion-icon>
            <ion-label>Address</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/my/address')">Address</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="accountsecurity">
          <ion-item slot="header">
            <ion-icon :icon="addCircle"></ion-icon>
            <ion-label>Account Security</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/my/forgotpass')">Reset Password</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="appdownload">
          <ion-item slot="header">
            <ion-icon :icon="download"></ion-icon>
            <ion-label>App Download</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/my/promotion')">App Download</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="compaintssuggestions">
          <ion-item slot="header">
            <ion-icon :icon="chatbox"></ion-icon>
            <ion-label>Complaints & Suggestions</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-label @click="() => router.push('/my/complaints')">Complaints & Suggestions</ion-label>
          </div>
        </ion-accordion>
        <ion-accordion value="about">
          <ion-item slot="header">
            <ion-icon :icon="alert"></ion-icon>
            <ion-label>About</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-item>
              <ion-label @click="() => router.push('/privacy')">Privacy Policy</ion-label>
            </ion-item>
            <ion-item>
              <ion-label @click="() => router.push('/riskagreement')">Risk Agreement</ion-label>
            </ion-item>
          </div>
        </ion-accordion>
      </ion-accordion-group>
      <IonButton expand="block" fill="outline" @click="logout()">Logout</IonButton>
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
  IonContent, IonHeader, IonFooter, IonPage, IonToolbar, IonGrid, IonRow, IonCol, IonFab, IonButton, IonLabel, IonIcon, IonFabButton, alertController, IonAccordion,
  IonAccordionGroup, IonItem
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { notifications, caretDownCircle, checkbox, calculator, gift, addCircle, wallet, card, globe, download, alert, chatbox } from 'ionicons/icons'
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'MyPage',
  components: {
    IonContent,
    IonHeader,
    IonFooter,
    IonPage,
    IonToolbar,
    FooterPage, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonButton, IonAccordion, IonLabel, IonIcon,
    IonAccordionGroup, IonItem
  },
  setup() {
    const router = useRouter();
    return {
      notifications,
      caretDownCircle,
      checkbox,
      calculator,
      gift,
      addCircle,
      wallet,
      card,
      globe,
      download,
      alert,
      chatbox,
      router
    }
  },
  data() {
    return {
      currentUser: '',
      currentUserId: '',
      segmentModel: "all",
      balance: 0,
      totalInterest: 0,
      totalPromotion: 0

    }
  },
  ionViewDidEnter() {
    this.currentUser = localStorage.getItem('session_user') || '';
    if (Object.keys(this.currentUser).length == 0) {
      this.router.push('./my/login')
    }
  },
  mounted() {
    this.currentUser = localStorage.getItem('session_user') || '';
    this.getBalance()
    this.getInterest()
    this.getPromotion()
  },
  methods: {
    async getBalance() {
      let usermobile = localStorage.getItem("session_user") || "";
      this.currentUserId = localStorage.getItem("session_userid") || "";
      await axios
        .post("http://localhost:5000/getBalance", { mobile: usermobile })
        .then((res) => (this.balance = res.data.data.total));
    },
    async getInterest() {
      let usermobile = localStorage.getItem("session_user") || "";
      this.currentUserId = localStorage.getItem("session_userid") || "";
      await axios
        .get("http://localhost:5000/getMyInterestTotal/"+usermobile)
        .then((res) => (this.totalInterest = res.data.data[0].total));
    },
    async getPromotion() {
      let usermobile = localStorage.getItem("session_user") || "";
      this.currentUserId = localStorage.getItem("session_userid") || "";
      await axios
        .get("http://localhost:5000/getMyPromotionTotal/"+usermobile)
        .then((res) => (this.totalPromotion = res.data.data[0].total));
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: 'Notice',
        cssClass: 'my-custom-class',
        message: '???Official notice: ??? The system is updated to allow new and old customers to have a better investment experience. Shopping Center will distinguish the investment projects of each promotion member, so that each superior can better distinguish whether the member belongs to your member. Thanks to the new and old members for their continued support. shopping center will become more and more perfect. I wish all members a happy investment.',
        buttons: ['Close'],
      });
      await alert.present();
    },
    logout() {
      localStorage.clear();
      this.router.push('my/login')
    },
    segmentChanged(ev: CustomEvent) {
      console.log(ev.detail.value)
      //this.segmentModel = ev.detail.value;
    }
  }
});
</script>

<style>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.height200 {
  height: 250px;
}

.userhed {
  position: relative;
  display: inline-block;
  left: 70px;
  bottom: 10px;
}

.my-custom-class .alert-wrapper {
  --max-width: 700px;
  --width: 100%;
  text-align: justify;
}

ion-accordion {
  margin: 0 auto;
}

ion-accordion.accordion-expanding,
ion-accordion.accordion-expanded {
  width: calc(100% - 32px);

  margin: 16px auto;
}

ion-accordion.accordion-collapsing ion-item[slot="header"],
ion-accordion.accordion-collapsed ion-item[slot="header"] {
  --background: var(--ion-color-light);
  --color: var(--ion-color-light-contrast);
}

ion-accordion.accordion-expanding ion-item[slot="header"],
ion-accordion.accordion-expanded ion-item[slot="header"] {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}

.btn-custom-class {
  width: 30%;
  height: 40px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  line-height: 40px;
  border-radius: 2px;
  border: 0;
  text-align: center;
  --background: #f5f5f5;
  font-size: 14px;
  color: rgba(0, 0, 0, .87);
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  /* Styles */
}

/* Smartphones (landscape) ----------- */
@media only screen and (max-width : 321px) {

  /* Styles */
  .resposive-height {
    height: 550px;
  }
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width : 320px) {

  /* Styles */
  .resposive-height {
    height: 550px;
  }
}

/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  /* Styles */
}

/* iPads (landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
  /* Styles */
}

/* iPads (portrait) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
  /* Styles */
}

/**********
iPad 3
**********/
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

/* Desktops and laptops ----------- */
@media only screen and (min-width : 1224px) {
  /* Styles */
}

/* Large screens ----------- */
@media only screen and (min-width : 1824px) {
  /* Styles */
}

/* iPhone 4 ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

/* iPhone 5 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {
  /* Styles */
}

@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {
  /* Styles */
}

/* iPhone 6 ----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .resposive-height {
    height: 550px;
  }
}

@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .resposive-height {
    height: 550px;
  }
}

/* iPhone 6+ ----------- */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {
  /* Styles */
}

@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {
  /* Styles */
}

/* Samsung Galaxy S3 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {
  /* Styles */
}

@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {
  /* Styles */
}

/* Samsung Galaxy S4 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3) {
  /* Styles */
}

@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3) {
  /* Styles */
}

/* Samsung Galaxy S5 ----------- */
@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3) {
  /* Styles */
}

@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3) {
  /* Styles */
}
</style>

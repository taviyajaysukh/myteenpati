<template>
  <ion-page>
    <ion-content :fullscreen="true" class="padding-ctm15">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="win-header">
              <ion-title class="ion-padding-bottom text-ctm-white">Available balance: ₹{{balance}}</ion-title>
              <ion-button color="secondary" shape="round" @click="() => router.push('/payment/recharge')">Recharge
              </ion-button>
              <ion-button color="medium" shape="round" @click="openModalredblue()">Read Blue</ion-button>
              <ion-img :src="reloadIcon" class="ion-float-right reload-period"></ion-img>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div class="parity-div">
        Parity
      </div>
      <div class="game-timer-main">
        <ion-grid>
          <ion-row>
            <ion-col>
              <div class="center_top">
                <ion-img :src="trophyIcon" class="reload-trophy"></ion-img><span class="ion-margin-start">Period</span>
              </div>
              <h3>{{currentPeriod}}</h3>
            </ion-col>
            <ion-col class="ion-text-right">
              <h5>Count Down</h5>
            </ion-col>
            <ion-fab-button color="light" size="small">{{minutes}}</ion-fab-button>
            <ion-fab-button color="light" size="small">{{seconds}}</ion-fab-button>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-joinsession-main">
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-left">
              <ion-button shape="round" :class="{btncolorgreen:btncolorgreen,btnsomedisabled:btncolordisabled}"
                :disabled="isDisabled" @click="openModalString('green',10)">Join
                Green</ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-button shape="round" :class="{btncolorviolet:btncolorviolet,btnsomedisabled:btncolordisabled}"
                :disabled="isDisabled" @click="openModalString('violet',11)">Join
                Violet</ion-button>
            </ion-col>
            <ion-col class="ion-text-right">
              <ion-button shape="round" :class="{btncolorred:btncolorred,btnsomedisabled:btncolordisabled}"
                :disabled="isDisabled" @click="openModalString('red',12)">
                Join Red</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-joinsession-main">
        <ion-grid>
          <ion-row class="text-center">
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorpattern1:btncolorpattern1,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(0)">0
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorgreen:btncolorgreen,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(1)">1
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorred:btncolorred,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(2)">2
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorgreen:btncolorgreen,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(3)">3
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorred:btncolorred,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(4)">4
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid>
          <ion-row class="text-center">
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorpattern2:btncolorpattern2,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(5)">5
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorred:btncolorred,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(6)">6
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorgreen:btncolorgreen,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(7)">7
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorred:btncolorred,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(8)">8
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button shape="round" class="ion-padding-custom"
                :class="{btncolorgreen:btncolorgreen,btnsomedisabled:btncolordisabled}" :disabled="isDisabled"
                @click="openModalNumber(9)">9
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="record-header">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-img :src="trophyIcon" class="reload-trophy1"></ion-img>
              <p>Parity Record </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-result-main">
        <EasyDataTable :headers="headers" :items="items" buttons-pagination rows-per-page="10">
          <template #item-color="{ color}">
            <img :src="color" style="width:20px;height:20px;" />
          </template>
        </EasyDataTable>
      </div>
      <div class="record-header">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-img :src="trophyIcon" class="reload-trophy1"></ion-img>
              <p>My Record</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="game-myrecord-main text-center">
        <EasyDataTable :headers="headers" :items="itemsMyRecord" buttons-pagination :rowsPerPage="rowsperpage">
          <template #item-color="{ color}">
            <img :src="color" style="width:20px;height:20px;" />
          </template>
        </EasyDataTable>
      </div>
    </ion-content>
    <ion-footer>
      <h1>Footer</h1>
      <FooterPage />
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import axios from 'axios'
import { IonContent, IonPage, IonTitle, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonImg, IonFabButton, loadingController, modalController } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { trophy } from 'ionicons/icons';
import FooterPage from './include/FooterPage.vue'
import ModalPayment from './components/ModalPayment.vue'
import ModalRedblue from './components/ModalRedblue.vue'
import { useRouter } from 'vue-router';
import type { Header } from "vue3-easy-data-table";
interface MyWindow extends Window {
  myFunction(): void;
}
declare var window: MyWindow;
export default defineComponent({
  name: 'WinPage',
  components: {
    IonContent,
    IonPage,
    FooterPage,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle, IonFooter,
    IonButton,
    IonImg,
    IonFabButton,
  },
  setup() {
    const headers: Header[] = [
      { text: "Period", value: "period" },
      { text: "Price", value: "price" },
      { text: "Number", value: "result" },
      { text: "Result", value: "color" },
    ];
    const reloadIcon = computed(() => '/assets/images/reload.png')
    const trophyIcon = computed(() => '/assets/images/trophy.png')
    const router = useRouter();
    return {
      trophy, reloadIcon, trophyIcon, router, headers
    }
  },
  data() {
    return {
      currentUser: '',
      paymentModal: 0,
      periodSession: 0,
      minutes: 0,
      seconds: 0,
      time: 0,
      isDisabled: false,
      btncolorgreen: true,
      btncolorviolet: true,
      btncolorred: true,
      btncolorpattern1: true,
      btncolorpattern2: true,
      btncolordisabled: false,
      currentPeriod: 0,
      rowsperpage: 10,
      result: 15,
      lastPeriod: 0,
      items: [{ "period": 0, "amount": 0, "result": 0, "color": '' }],
      itemsMyRecord: [{ "period": 0, "amount": 0, "result": 0, "color": '' }],
      tabFocus: false,
      balance: 0,
    }
  },
  async beforeMount() {
    //this.detectFocusOut()
    this.getGridRow()
    this.countdownmain()
    
  },
  async mounted(){
    await axios
            .get('http://localhost:5000/getPeriod', {})
            .then(res => this.currentPeriod = res.data.period)
  },
  methods: {
    reloadPeriod() {
      this.showLoading()
    },
    async showLoading() {
      const loading = await loadingController.create({
        message: 'Loading...',
        duration: 3000,
        spinner: 'circles'
      });

      loading.present();
    },
    async getGridRow() {
      let currentUser = localStorage.getItem('session_user') || '';
      await axios
        .post('http://localhost:5000/getBalance', { mobile: currentUser })
        .then(res => this.balance = res.data.data.total)
      await axios
        .post('http://localhost:5000/parityManage', { userMobile: currentUser })
        .then(function (this: any, resp: any) {
          this.items = resp.data.paritydata
          this.itemsMyRecord = resp.data.paritybydata
        }.bind(this))
    },
    detectFocusOut() {
      window.addEventListener('blur', () => {
        this.showLoading()
      });
      window.addEventListener('focus', () => {
        this.showLoading()
      });
      window.addEventListener('pageshow', () => {
        this.showLoading()
      });
      window.addEventListener('pagehide', () => {
        this.showLoading()
      });
    },
    async openModalString(title: string, number: number) {
      const modal = await modalController.create({
        component: ModalPayment,
        componentProps: { title: title, number: number }
      });
      modal.present();
      const { data, role } = await modal.onWillDismiss();
        if (role === 'confirm') {
          this.balance = data
        }
    },
    async openModalNumber(number: number) {
      const modal = await modalController.create({
        component: ModalPayment,
        componentProps: { number: number },
        cssClass: 'setting-modal',
        backdropDismiss: false,
      });
      modal.present();
      const { data, role } = await modal.onWillDismiss();
        if (role === 'confirm') {
          this.balance = data
        }
    },
    async openModalredblue() {
      const modal = await modalController.create({
        component: ModalRedblue,
      });
      modal.present();
      
    },
    countdownmain: async function (this: any) {
      let currentUser = localStorage.getItem('session_user') || ''
      await axios
            .get('http://localhost:5000/getLastSession', {})
            .then(res => this.periodSession = res.data.session)

      let startsession = this.periodSession;
      
      setInterval(async function (this: any) {
        let minutes = Math.floor(startsession / 60)
        let seconds = Math.floor(startsession % 60)
        this.minutes = minutes
        this.seconds = seconds
        --startsession
        minutes = minutes < 10 ? 0 + minutes : minutes;
        seconds = seconds < 10 ? 0 + seconds : seconds;
        if (minutes == 0 && seconds > 1 && seconds <= 30) {
          this.btncolordisabled = true
          this.btncolorgreen = false
          this.isDisabled = true
          let result = Math.floor(Math.random() * 12);
          this.result = result
        }
        if (startsession < 1) {
          startsession = 60 * 3
          this.btncolordisabled = false
          this.btncolorgreen = true
          this.isDisabled = false
          await axios
            .get('http://localhost:5000/getPeriod', {})
            .then(res => this.currentPeriod = res.data.period)
          await axios
        .post('http://localhost:5000/parityManage', { userMobile: currentUser })
        .then(function (this: any, resp: any) {
          this.items = resp.data.paritydata
          this.itemsMyRecord = resp.data.paritybydata
        }.bind(this))
        await axios
        .post('http://localhost:5000/getBalance', { mobile: currentUser })
        .then(res => this.balance = res.data.data.total)
        }
      }.bind(this), 1000)
    },
  }
});
</script>
<style scoped>
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

.text-center {
  text-align: center;
}

.product-card {
  border: 2px solid gray;
  padding: 30px;
}

.product-image .pimg {
  height: 60vh !important;
  width: 70vh !important;
  position: relative;
  left: 10%;
  align-items: center;
}

.parity-div {
  background: #dddddd;
  padding: 18px 5px;
  text-align: center;
}

.prd-label {
  text-align: center;
}

.text-ctm-white {
  color: #fff;
}

.padding-ctm15 {
  --padding-top: 5px;
  --padding-bottom: 5px;
  --padding-start: 5px;
  --padding-end: 5px;
}

.prd-label h4 {
  font-size: 24px;
}

.win-header {
  background: #009688;
  padding: 10px;
  border-radius: 2px;
}

.reload-period {
  width: 40px;
  height: 40px;
}

.reload-trophy {
  width: 20px;
  height: 20px;
}

.center_top {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  color: #7d7d7d;
}

.ion-padding-custom {
  --padding-start: 100px;
  --padding-end: 100px;
}

.game-result-main table {
  width: 100%;
  border-collapse: collapse;
}

.game-result-main table tr {
  border-bottom: 1px solid #e0e0e0;
}

.game-result-main table th {
  width: 20%;
  height: 56px;
  line-height: 56px;
  color: rgba(0, 0, 0, .54);
  font-size: 12px;
  text-align: center;
}

.game-result-main table td {
  height: 48px;
  line-height: 48px;
  font-size: 12px;
  text-align: center;
}

.btncolorgreen {
  --background: #4caf50;
}

.btncolorred {
  --background: #f44336;
}

.btncolorviolet {
  --background: #9c27b0;
}

.btncolorpattern1 {
  --background: linear-gradient(to right bottom, rgb(156, 39, 176) 50%, rgb(244, 67, 54) 50%);
}

.btncolorpattern2 {
  --background: linear-gradient(to right bottom, rgb(156, 39, 176) 50%, rgb(76, 175, 80) 50%);
}

.btnsomedisabled {
  --background: #fff;
  --color: #000000;
}

.record-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #009587;
  padding: 12px 0;
}

.record-header p {
  color: rgba(0, 0, 0, .87);
  font-size: 14px;
  margin-top: 10px;
}

.reload-trophy1 {
  width: 20px;
  height: 20px;
  margin-left: 30px;
}
</style>
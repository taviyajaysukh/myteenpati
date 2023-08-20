<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Interest</span>
                </ion-title>
                <ion-button slot="end" @click="presentAlert">
                    <ion-icon :icon="helpCircle" />
            </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="border-bottom-ctm">
                    <ion-col>
                        <EasyDataTable :headers="headers" :items="interestData" buttons-pagination rows-per-page="10">
                        </EasyDataTable>
                    </ion-col>
                </ion-row>
               
            </ion-grid>
        </ion-content>
        <ion-footer>
            <h1>Footer</h1>
            <FooterPage />
        </ion-footer>
    </ion-page>
</template>
<script lang="ts">
import axios from 'axios'
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,IonIcon,IonTitle,IonButton,IonFooter,alertController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack,helpCircle } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import type { Header } from "vue3-easy-data-table";
export default defineComponent({
    name: 'InterestPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,IonIcon,IonTitle,IonButton,IonFooter, FooterPage
    },
    setup() {
        const router = useRouter();
        const headers: Header[] = [
            { text: "Amount", value: "amount" },
            { text: "Date", value: "createddate" },
        ];
        return {
            arrowBack, helpCircle,router,headers
        }
    },
    data(){
        return{
            currentUser:'',
            interestData:[{"referralamount":0,"createddate":0}]
        }
    },
    async mounted() {
        let userid = localStorage.getItem('session_user') || '';
        await axios
            .get('http://localhost:5000/getMyInterest/'+userid)
            .then(res => this.interestData = (res.data.code == 200) ? res.data.data:[{"amount":0,"createddate":0}])
    },
  ionViewDidEnter() {
    this.currentUser = localStorage.getItem('session_user') || '';
    if (Object.keys(this.currentUser).length == 0) {
      this.router.push('/my/login')
    }
  },
    methods: {  
    async presentAlert() {
      const alert = await alertController.create({
        header: 'Explain',
        cssClass: 'my-custom-class',
        message: 'When your friends trade, you will also receive a 30% commission. Therefore, the more friends you invite, the higher your commission. There is a fixed income every day, the commission is permanent, but the reward is only onceWhen they make money, they will invite their friends to join them, and then you can get a 20% commission. In this way, your team can spread quickly. Therefore, I hope everyone can use our platform to make money, make money, and make money!When they make money, they will invite their friends to join them, and then you can get a 20% commission. In this way, your team can spread quickly. Therefore, I hope everyone can use our platform to make money, make money, and make money!Level 1 commission: Friends who join through your own link belong to your level, when they trade, you will get 30% commission.Tier 2 commission: Friends who join through your friend link belong to your secondary commission. When they trade, you can get 20% commission.Level 3 commission: Friends who join through friends of friends belong to your level 3. When they trade, you get 10% commission.Promotional rewards: 10% bonus amount for the first recharge after the first-level lower level joins. If your friend joins through your invitation and recharges 1000 for the first time, you will get 200',
        buttons: ['Close'],
      });
      await alert.present();
    },
  }
});
</script>
<style scoped>
.border-bottom-ctm{
    border-bottom:2px solid gray;
    padding:5px;
}
</style>
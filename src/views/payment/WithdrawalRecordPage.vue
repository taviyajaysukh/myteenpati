<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Withdrawal Record</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="border-bottom-ctm" v-for="item in transactionData" :key="item.amount">
                    <ion-col>
                        <ion-text>
                            <p>₹ {{item.amount}}</p>
                        </ion-text>
                        <ion-text>
                            <p>{{item.transactionId}}</p>
                        </ion-text>
                        <ion-text>
                            <p>{{item.createddate}}</p>
                        </ion-text>
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
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonText, IonFooter
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'WithdrawalRecordPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonText, IonFooter, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, router
        }
    },
    data() {
        return {
            currentUser: '',
            transactionData: [{ "userid": 0, "paymentMethod": '', "transactionType": '', "transactionId": '', "amount": 0, "createddate": '' }]
        }
    },
    async mounted() {
        let userid = localStorage.getItem('session_user') || '';
        await axios
            .post('http://localhost:5000/getUserTransation', { "userid": userid })
            .then(res => this.transactionData = res.data.data)
    },
});
</script>
<style scoped>
.border-bottom-ctm {
    border-bottom: 2px solid gray;
    padding: 5px;
}
</style>
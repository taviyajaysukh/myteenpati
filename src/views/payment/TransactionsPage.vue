<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span
                        class="ion-margin-start">Transactions Record</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <EasyDataTable :headers="headers" :items="transactionData" buttons-pagination rows-per-page="10">
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
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonFooter
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import type { Header } from "vue3-easy-data-table";
export default defineComponent({
    name: 'TransactionsPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonFooter, FooterPage
    },
    setup() {
        const router = useRouter();
        const headers: Header[] = [
            { text: "PaymentMethod", value: "paymentMethod" },
            { text: "TransactionType", value: "transactionType" },
            { text: "TransactionId", value: "transactionId" },
            { text: "Amount", value: "amount" },
            { text: "Date", value: "createddate" },
        ];
        return {
            arrowBack, router, headers
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
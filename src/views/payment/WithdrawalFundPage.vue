<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span
                        class="ion-margin-start">Withdrawal</span>
                </ion-title>
                <ion-title slot="end" style="display:inline-block"
                    @click="() => router.push('/payment/withdrawalrecord')">
                    <ion-icon :icon="filter" />
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid class="ion-padding-start">
                <ion-row>
                    <ion-col class="ion-text-center">
                        <h4>Balance: ₹ {{ balance }}</h4>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <div class="input_box">
                            <!-- Input with value -->
                            <ion-label>
                                <ion-img :src="recomdIcon" style="width:20px;height:20px;"></ion-img>
                            </ion-label>
                            <ion-input type="number" @input="onInputAmount" placeholder="Enter Withdrawal amount">
                            </ion-input>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-button class="gocode" @click="addWithdrawal">
                            Withdrawal
                        </ion-button>
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
import axios from "axios";
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonLabel,
    IonIcon, IonTitle, IonImg, IonInput, IonButton, IonFooter, toastController
} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { filter, card, arrowBack, gift } from 'ionicons/icons';
import { useRouter } from 'vue-router';
declare global {
    interface Window {
        Razorpay?: any;
    }
}
export default defineComponent({
    name: 'WithdrawalFundPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,
        IonLabel, IonIcon, IonTitle, IonImg, IonInput, IonButton, IonFooter, FooterPage
    },
    setup() {
        const router = useRouter();
        const recomdIcon = computed(() => '/assets/images/recharge.png')
        const passwordIcon = computed(() => '/assets/images/password.png')
        return {
            filter, card, gift, recomdIcon, arrowBack, passwordIcon, router
        }
    },

    data() {
        return {
            currentUser: '',
            balance: 0,
            amount: 0,
        }
    },
    mounted() {
        this.getBalance()
    },
    methods: { 
        async getBalance() {
            let usermobile = localStorage.getItem("session_user") || "";
            await axios
                .post("http://localhost:5000/getBalance", { mobile: usermobile })
                .then((res) => (this.balance = res.data.data.total));
        },
        onInputAmount($event: any) {
            this.amount = $event.target.value
        },
        async addWithdrawal() {
            let usermobile = localStorage.getItem("session_user") || "";
            console.log(usermobile)
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
    }
});
</script>
<style scoped>
.ion-padding-custom {
    --padding-start: 80px;
    --padding-end: 80px;
    cursor: pointer;
}

.rechargebuttton {
    width: 70%;
    height: 35px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    line-height: 35px;
    border-radius: 2px;
    border: 0;
    text-align: center;
    --background: #f5f5f5;
    font-size: 16px;
    color: rgba(0, 0, 0, .87);
}

.recharesubmit {
    width: 80%;
    height: 40px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    line-height: 30px;
    border-radius: 2px;
    border: 0;
    text-align: center;
    --background: #f5f5f5;
    font-size: 16px;
    color: rgba(0, 0, 0, .87);
}

.gocode {
    width: 50%;
    height: 46px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    line-height: 46px;
    border-radius: 2px;
    border: 0;
    text-align: center;
    --background: #f5f5f5;
    font-size: 16px;
    color: rgba(0, 0, 0, .87);
}

.input_box {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    padding: 0 12px;
    box-sizing: border-box;
    line-height: 48px;
    background: #fff;
    border-radius: 2px;
    margin-bottom: 35px;
    position: relative;
}
</style>
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
                    <ion-col>
                        <p>Fee: {{ fee }},to account {{ account }}</p>
                        <p>Payout</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-accordion-group>
                            <ion-accordion :class="accoll" value="promotion">
                                <ion-item slot="header">
                                    <ion-icon :icon="gift"></ion-icon>
                                    <ion-label v-if="selectBank == 0">{{ selectBankText }}</ion-label>
                                    <ion-label v-else>{{ selectBank }}</ion-label>
                                </ion-item>
                                <div class="ion-padding" slot="content">
                                    <div v-for="item in bankData" :key="item.mobilenumber">
                                        <p @click="closeCollpase(item.bankaccount, item.mobilenumber, item.contactid)">
                                            India post pements
                                            benk {{ item.bankaccount }}</p>
                                    </div>

                                    <p @click="() => router.push('/payment/addbankcard')">Add bank card details</p>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-radio-group>
                            <ion-item>
                                <ion-label>Bankcard</ion-label>
                                <ion-radio value="bankcard" mode="ios"></ion-radio>
                            </ion-item>
                        </ion-radio-group>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <div class="input_box">
                            <!-- Input with value -->
                            <ion-label>
                                <ion-img :src="passwordIcon" style="width:20px;height:20px;"></ion-img>
                            </ion-label>
                            <ion-input type="password" v-model="password" placeholder="Enter your login password">
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
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonRadio, IonRadioGroup, IonAccordion,
    IonAccordionGroup, IonItem, IonIcon, IonTitle, IonImg, IonInput, IonButton, IonFooter, toastController
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
    name: 'WithdrawalPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,
        IonLabel, IonRadio, IonRadioGroup, IonAccordion,
        IonAccordionGroup, IonItem, IonIcon, IonTitle, IonImg, IonInput, IonButton, IonFooter, FooterPage
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
            password: '',
            selectBankText: 'Select Bank Card',
            selectBank: 0,
            mobilenumber: 0,
            accoll: '',
            fee: 0,
            account: 0,
            contactid: '',
            isvalid: true,
            is_withdrawal_status: 404,
            passwordStatus: 0,
            bankData: [{ "_id": '', "actualname": '', "bankname": '', "bankaccount": 0, "address": '', "mobilenumber": 0, "contactid": '' }],

        }
    },
    mounted() {
        this.getBalance()
        this.getBankdetails()
    },
    methods: {
        closeCollpase(bankaccount: number, mobilenumber: number, contactid: string) {
            this.accoll = 'accordion-collapsed'
            this.selectBank = bankaccount
            this.mobilenumber = mobilenumber
            this.contactid = contactid
        },
        onInputAmount($event: any) {
            this.amount = $event.target.value
            if (this.amount > 0) {
                let fee = (this.amount * 5 / 100)
                let account = (this.amount - this.amount * 2 / 100)
                this.fee = fee
                this.account = account
            } else {
                this.fee = 0
                this.account = 0
            }
        },
        async getBankdetails() {
            await axios
                .get('http://localhost:5000/getBankdetails', {})
                .then(res => this.bankData = res.data.data)
        },
        async getBalance() {
            let usermobile = localStorage.getItem("session_user") || "";
            await axios
                .post("http://localhost:5000/getBalance", { mobile: usermobile })
                .then((res) => (this.balance = res.data.data.total));
        },
        async addWithdrawal() {
            let usermobile = localStorage.getItem("session_user") || "";
            await axios
                .post("http://localhost:5000/checkPassword", { mobile: usermobile, password: this.password })
                .then((res) => (this.passwordStatus = res.data.status));
            if (this.amount === 0) {
                this.toastfunction('Please Enter Withdrawal amount', 3000)
                this.isvalid = false
            } else if (this.selectBank === 0) {
                this.toastfunction('Please select your bank card', 3000)
                this.isvalid = false
            } else if (this.password === '' || this.passwordStatus == 0) {
                this.toastfunction('Please enter your valid login password', 3000)
                this.isvalid = false
            } else if (this.amount < 211) {
                this.toastfunction('Minumum Withdrawal 211', 3000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }
            if (this.isvalid === true) {
                if (this.amount < this.balance) {
                    await axios
                        .post("http://localhost:5000/paymentWithdrawal", {
                            usermobile: usermobile,
                            contactid: this.contactid,
                            amount: this.amount,
                        })
                        .then((res) => this.is_withdrawal_status = res.data.code);
                    if (this.is_withdrawal_status == 200) {
                        await axios
                            .post("http://localhost:5000/addTransaction", {
                                userid: usermobile,
                                paymentMethod: "razorpay",
                                transactionType: "Debit",
                                transactionId: 'aqw22',
                                amount: this.amount,
                                status: true
                            })
                            .then((res) => console.log(res));
                        await axios
                            .put("http://localhost:5000/updateBalance", {
                                mobile: usermobile,
                                totalBallance: this.amount,
                                operation: "decrement"
                            })
                            .then((res) => console.log(res));
                        this.balance = this.balance - this.amount
                        this.toastfunction('Your Amount Withdrawal Successfully', 3000)
                    } else {
                        this.toastfunction('Some error', 3000)
                    }

                } else {
                    this.toastfunction('Minumum Withdrawal', 3000)
                }
            }
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
<template>
    <ion-header>
        <ion-toolbar v-if="title=='green' " :class="greenColor" class="ion-padding-start">
            <h1>Select {{title}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="title=='violet' " :class="violetColor" class="ion-padding-start">
            <h1>Select {{title}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="title=='red' " :class="redColor" class="ion-padding-start">
            <h1>Select {{title}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==0" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==1" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==2" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==3" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==4" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==5" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==6" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==7" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==8" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
        <ion-toolbar v-if="number==9" class="ion-padding-start bgcolord">
            <h1>Select {{number}}</h1>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-label>
                        <p class="ion-padding">Contract Money</p>
                    </ion-label>
                    <div class="choose_money">
                        <ul>
                            <li @click="myFilter(10)" :class="{active: isActive}">10</li>
                            <li @click="myFilter1(100)" :class="{active: isActive1}">100</li>
                            <li @click="myFilter2(1000)" :class="{active: isActive2}">1000</li>
                            <li @click="myFilter3(10000)" :class="{active: isActive3}">10000</li>
                        </ul>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
        <ion-grid>
            <ion-row class="ion-text-center">
                <ion-col>
                    <ion-button class="close_btn" @click="decrement">-</ion-button>
                </ion-col>
                <ion-col><span>
                        <ion-input :value="count" class="counter-input"></ion-input>
                    </span></ion-col>
                <ion-col>
                    <ion-button class="close_btn" @click="increment">+</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-label>
                        <p>Total contract money is {{total}}</p>
                    </ion-label>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-checkbox :checked="true"></ion-checkbox>
                    <ion-label class="ion-padding-start">I Agree Privacy Policy</ion-label>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-button class="ion-float-right close_btn" @click="confirm()">Confirm</ion-button>
                    <ion-button class="ion-float-right close_btn" @click="cancel">Cancel</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script lang="ts">
import axios from 'axios'
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    modalController,
    toastController
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModalPayment',
    components: { IonContent, IonHeader, IonToolbar, IonButton },
    props: {
        number: Number,
        title: String,
    },
    data() {
        return {
            isActive: true,
            isActive1: false,
            isActive2: false,
            isActive3: false,
            count: 1,
            amount: 10,
            total: 10,
            userBalance: 0,
            currentUser: '',
            currentPeriod: 0,
            redColor: 'redColor',
            greenColor: 'greenColor',
            violetColor: 'violetColor'
        }
    },
    mounted() {
        this.getBalance()
    },
    methods: {
        async getBalance() {
            let currentUser = localStorage.getItem('session_user') || '';
            await axios
                .post('http://localhost:5000/getBalance', { mobile: currentUser })
                .then(res => this.userBalance = res.data.data.total)
        },
        cancel() {
            return modalController.dismiss(null, 'cancel');
        },
        async confirm() {
            if (this.total >= this.userBalance) {
                this.toastfunction('Your balance is insufficient', 3000)
            } else {
                await axios
                    .get('http://localhost:5000/getPeriod', {})
                    .then(res => this.currentPeriod = res.data.period)
                this.currentUser = localStorage.getItem('session_user') || ''
                let usermobile = this.currentUser
                let joinsection = this.number
                let amount = this.amount
                let qty = this.count

                let period = this.currentPeriod
                let price = this.total
                let status = false
                await axios
                    .post('http://localhost:5000/addParity', { "usermobile": usermobile, "joinsection": joinsection, "amount": amount, "qty": qty, "period": period, "price": price, "status": status, "minutes": 2, "seconds": 10 })
                    .then(async function (res) {
                        if (res.data.code == 200) {
                            await axios
                                .put("http://localhost:5000/updateBalance", {
                                    mobile: usermobile,
                                    totalBallance: amount,
                                    operation: "decrement"
                                })
                                .then((res) => console.log(res));
                            const toast = await toastController.create({
                                message: 'Your parity add successfully...',
                                duration: 3000,
                                position: 'middle',
                                cssClass: 'custom-toast',
                                buttons: [
                                    {
                                        text: 'Dismiss',
                                        role: 'cancel'
                                    }
                                ],
                            });
                            await toast.present()

                        }else{
                            const toast = await toastController.create({
                                message: 'Your parity time expired...',
                                duration: 3000,
                                position: 'middle',
                                cssClass: 'custom-toast',
                                buttons: [
                                    {
                                        text: 'Dismiss',
                                        role: 'cancel'
                                    }
                                ],
                            });
                            await toast.present()
                        }

                    })
                this.amount = 10
                this.isActive = !this.isActive
                this.isActive1 = false
                this.isActive2 = false
                this.isActive3 = false
                this.count = 1
                let currentUser = localStorage.getItem('session_user') || '';
            await axios
                .post('http://localhost:5000/getBalance', { mobile: currentUser })
                .then(res => this.userBalance = res.data.data.total)
                return modalController.dismiss(this.userBalance, 'confirm')
            }
        },
        myFilter: function (val: number) {
            this.amount = 10;
            this.total = val;
            this.isActive = !this.isActive;
            this.isActive1 = false;
            this.isActive2 = false;
            this.isActive3 = false;
            this.count = 1
            this.amount = val
        },
        myFilter1: function (val: number) {
            this.amount = 0;
            this.total = val;
            this.isActive1 = !this.isActive1;
            this.isActive = false;
            this.isActive2 = false;
            this.isActive3 = false;
            this.amount = val
            this.count = 1
        },
        myFilter2: function (val: number) {
            this.amount = 0;
            this.total = val;
            this.isActive2 = !this.isActive2;
            this.isActive = false;
            this.isActive1 = false;
            this.isActive3 = false;
            this.amount = val
            this.count = 1
        },
        myFilter3: function (val: number) {
            this.amount = 0;
            this.total = val;
            this.isActive3 = !this.isActive3;
            this.isActive = false;
            this.isActive1 = false;
            this.isActive2 = false;
            this.amount = val
            this.count = 1
        },
        increment() {
            this.count++;
            this.total = this.amount * this.count
        },
        decrement() {
            if (this.count > 1) {
                this.count--;
                this.total = this.amount * this.count
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
<style>
.paymentBgcolor {
    --background: #009587;
    padding: 0 10px;
    color: #fff;
}

ion-modal {
    --width: 100%;
    --max-width: 80%;
    --height: 65%;
}

.redColor {
    --background: #f44336;
    color: #fff;
}

.bgcolord {
    --background: #009688;
    color: #fff;
}

.greenColor {
    --background: #4caf50;
    color: #fff;
}

.violetColor {
    --background: #9c27b0;
    color: #fff;
}

.choose_money {
    margin-bottom: 15px;
    display: flex;
}

.choose_money ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    border-radius: 2px;
    overflow: hidden;
    justify-content: space-between;
    list-style: none;
}

.choose_money ul .active {
    background: #c9c9c9;
    color: #333;
}

.choose_money ul li {
    padding: 10px 10px;
    font-size: 14px;
    color: #a6a6a6;
}

.close_btn {
    border: 0;
    --background: transparent;
    font-size: 14px;
    --color: rgba(0, 0, 0, .9);
    margin: 0 10px 0 20px;
}

.counter-input {
    width: 32px;
    height: 20px;
    display: inline-block;
}

.green {
    --background: #4caf50;
    --color: #fff;
    padding: 0 10px;
}

.violet {
    --background: #9c27b0;
    padding: 0 10px;
    --color: #fff;
}

.red {
    --background: #f44336;
    padding: 0 10px;
    --color: #fff;
}
</style>
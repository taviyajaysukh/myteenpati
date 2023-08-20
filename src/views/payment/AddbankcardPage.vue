<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /> <span class="ion-margin-start">Add
                        Bankcard</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-label position="stacked">Actual Name</ion-label>
                            <ion-input v-if="is_model" @input="onInputactualname"></ion-input>
                            <ion-input v-else :value="bankData[0].actualname" @input="onInputactualname"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">IFSC Code</ion-label>
                            <ion-input v-if="is_model" @input="onInputifsccode"></ion-input>
                            <ion-input v-else :value="bankData[0].ifsccode" @input="onInputifsccode"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Bank Name</ion-label>
                            <ion-input v-if="is_model" @input="onInputbankname"></ion-input>
                            <ion-input v-else :value="bankData[0].bankname" @input="onInputbankname"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Bank Account</ion-label>
                            <ion-input type="number" v-if="is_model" @input="onInputbankaccount"></ion-input>
                            <ion-input type="number" v-else :value="bankData[0].bankaccount"
                                @input="onInputbankaccount"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">State/Territory</ion-label>
                            <ion-input v-if="is_model" @input="onInputstate"></ion-input>
                            <ion-input v-else :value="bankData[0].state" @input="onInputstate"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">City</ion-label>
                            <ion-input v-if="is_model" @input="onInputcity"></ion-input>
                            <ion-input v-else :value="bankData[0].city" @input="onInputcity"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Address</ion-label>
                            <ion-input v-if="is_model" @input="onInputaddress"></ion-input>
                            <ion-input v-else :value="bankData[0].address" @input="onInputaddress"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Mobile Number</ion-label>
                            <ion-input v-if="is_model" @input="onInputmobilenumber"></ion-input>
                            <ion-input v-else :value="bankData[0].mobilenumber" @input="onInputmobilenumber">
                            </ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Email</ion-label>
                            <ion-input v-if="is_model" @input="onInputemail"></ion-input>
                            <ion-input v-else :value="bankData[0].email" @input="onInputemail"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Account phone number</ion-label>
                            <ion-input v-if="is_model" @input="onInputaccountmobilenumber">
                            </ion-input>
                            <ion-input v-else :value="bankData[0].accountmobilenumber"
                                @input="onInputaccountmobilenumber">
                            </ion-input>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="10">
                        <ion-item>
                            <ion-label position="stacked">Verifiaction Code</ion-label>
                            <ion-input v-model="verificationcode"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="2">
                        <ion-button class="gocode" @click="sendOtp()">
                            OTP
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-button @click="addBankdetails" class="gocode">
                            Continue
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
import axios from 'axios'
import {
    IonContent, IonPage, IonHeader, IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonTitle, IonButton, IonInput, IonItem, toastController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'AddbankcardPage',
    components: {
        IonContent, IonPage, IonHeader, IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonTitle, IonButton, IonInput, IonItem, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, router
        }
    },
    data() {
        return {
            actualname: '',
            ifsccode: '',
            bankname: 0,
            bankaccount: '',
            state: '',
            city: '',
            address: '',
            mobilenumber: '',
            email: '',
            accountmobilenumber: '',
            verificationcode: '',
            bankData: [{ "_id": '', "actualname": '', "ifsccode": '', "bankname": 0, "bankaccount": '', "state": '', 'city': '', "address": '', "mobilenumber": '', "email": '', "accountmobilenumber": '', "verificationcode": '' }],
            isvalid: true,
            isDisabled: true,
            is_exists: 0,
            is_model: true,
            currentUser: '',
            contactid: ''
        }
    },
    ionViewDidEnter() {
        this.currentUser = localStorage.getItem('session_user') || '';
        if (Object.keys(this.currentUser).length == 0) {
            this.router.push('/my/login')
        }
    },
    async mounted() {
        let parameters = this.$route.query.cardId
        if (parameters !== undefined) {
            await axios
                .post('http://localhost:5000/getBankdetailsById', { "id": parameters })
                .then(res => this.bankData = res.data.data)
            this.actualname = this.bankData[0].actualname
            this.ifsccode = this.bankData[0].ifsccode
            this.bankname = this.bankData[0].bankname
            this.bankaccount = this.bankData[0].bankaccount
            this.state = this.bankData[0].state
            this.city = this.bankData[0].city
            this.address = this.bankData[0].address
            this.mobilenumber = this.bankData[0].mobilenumber
            this.email = this.bankData[0].email
            this.accountmobilenumber = this.bankData[0].accountmobilenumber
            this.is_model = false
        }

    },
    methods: {
        onInputactualname($event: any) {
            this.actualname = $event.target.value
        },
        onInputifsccode($event: any) {
            this.ifsccode = $event.target.value
        },
        onInputbankname($event: any) {
            this.bankname = $event.target.value
        },
        onInputbankaccount($event: any) {
            this.bankaccount = $event.target.value
        },
        onInputstate($event: any) {
            this.state = $event.target.value
        },
        onInputcity($event: any) {
            this.city = $event.target.value
        },
        onInputaddress($event: any) {
            this.address = $event.target.value
        },
        onInputmobilenumber($event: any) {
            this.mobilenumber = $event.target.value
        },
        onInputemail($event: any) {
            this.email = $event.target.value
        },
        onInputaccountmobilenumber($event: any) {
            this.accountmobilenumber = $event.target.value
        },
        async addBankdetails() {
            let mobilepattern = this.mobilenumber.search(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
            let accountmobilenumberpattern = this.accountmobilenumber.search(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
            if (this.ifsccode === '') {
                this.toastfunction('Please enter ifsc code', 3000)
                this.isvalid = false
            } else if (this.bankname === 0) {
                this.toastfunction('Please enter bank name', 3000)
                this.isvalid = false
            } else if (this.bankaccount === '') {
                this.toastfunction('Please enter bank account number', 3000)
                this.isvalid = false
            } else if (this.mobilenumber === '' || mobilepattern !== 0) {
                this.toastfunction('Please enter valid mobile number', 3000)
                this.isvalid = false
            } else if (this.accountmobilenumber === '' || accountmobilenumberpattern !== 0) {
                this.toastfunction('Please enter valid account mobile number', 3000)
                this.isvalid = false
            } else if (this.verificationcode === '') {
                this.toastfunction('Please enter verfication code', 3000)
                this.isvalid = false
            }
            else {
                this.isvalid = true
            }
            if (this.isvalid === true) {
                let opt = localStorage.getItem("mobile_otp");
                if (opt == this.verificationcode) {
                    //add contact razorpay api
                    let parameters = this.$route.query.cardId
                        if (parameters === undefined) {
                            await axios
                                .post('http://localhost:5000/addContact', { "name": this.actualname, "email": this.email, "contact": this.mobilenumber, "type": "employee", "reference_id": "2233", "random_key_1": "123", "random_key_2": "333" })
                                .then(function (this: any, res: any) {
                                    if (res.data) {
                                        this.contactid = res.data.data
                                    }
                                }.bind(this))
                            await axios
                                .post('http://localhost:5000/addBankdetails', { "actualname": this.actualname, "ifsccode": this.ifsccode, "bankname": this.bankname, "bankaccount": this.bankaccount, "state": this.state, "city": this.city, "address": this.address, "mobilenumber": this.mobilenumber, "email": this.email, "accountmobilenumber": this.accountmobilenumber, "verificationcode": this.verificationcode,"contactid":this.contactid })
                                .then(response => console.log(response))

                            localStorage.removeItem('mobile_otp');
                            this.toastfunction('Record save successfully', 3000)
                            this.router.push('/payment/bankcard')
                        } else {
                            await axios
                                .post('http://localhost:5000/addContact', { "name": this.actualname, "email": this.email, "contact": this.mobilenumber, "type": "employee", "reference_id": "2233", "random_key_1": "123", "random_key_2": "333" })
                                .then(function (this: any, res: any) {
                                    if (res.data) {
                                        this.contactid = res.data.data
                                    }
                                }.bind(this))
                            await axios
                                .put('http://localhost:5000/updateBankdetails', { "id": parameters, "actualname": this.actualname, "ifsccode": this.ifsccode, "bankname": this.bankname, "bankaccount": this.bankaccount, "state": this.state, "city": this.city, "address": this.address, "mobilenumber": this.mobilenumber, "email": this.email, "accountmobilenumber": this.accountmobilenumber, "verificationcode": this.verificationcode,"contactid":this.contactid })
                                .then(response => console.log(response))
                            localStorage.removeItem('mobile_otp');
                            this.toastfunction('Record save successfully', 3000)
                            this.router.push('/payment/bankcard')
                        }
                   
                } else {
                    this.toastfunction('Invalid varifacation code', 3000)
                }
            }
        },
        async sendOtp() {
            if (this.accountmobilenumber === '') {
                this.toastfunction('Please enter mobile number', 1000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }
            if (this.isvalid) {
                this.isDisabled = false
                //localStorage.setItem("mobile_otp", "123");
                await axios
                    .post('http://localhost:5000/sentOpt', { "mobile": this.accountmobilenumber })
                    .then(async function (this: any, res) {
                        if (res.data.status == 200) {
                            //await this.toastfunctioni('Sent otp on your mobile number successfully....', 1000)
                            localStorage.setItem("mobile_otp", res.data.otpCode);
                            const toast = await toastController.create({
                                message: 'Sent otp on your mobile number successfully....',
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
                            await toast.present();
                        } else {
                            // await this.toastfunctioni('Cant sent otp on your mobile number....', 1000)
                            const toast = await toastController.create({
                                message: 'Cant sent otp on your mobile number....',
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
                            await toast.present();
                        }
                    })

            } else {
                this.toastfunction('Please enter valid mobile', 1000)
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
.address_list {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    background: #fff;
}

.font-class {
    font-size: 16px;
    margin: 10px;
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
</style>
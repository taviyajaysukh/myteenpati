<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Add
                        Address</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-label position="stacked">Full Name</ion-label>
                            <ion-input v-if="is_model" @input="onInputfullname"></ion-input>
                            <ion-input v-else :value="addressData[0].fullname" @input="onInputfullname"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Mobile Number</ion-label>
                            <ion-input v-if="is_model" @input="onInputmobilenumber"></ion-input>
                            <ion-input v-else :value="addressData[0].mobilenumber" @input="onInputmobilenumber">
                            </ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Pincode</ion-label>
                            <ion-input v-if="is_model" @input="onInputpincode"></ion-input>
                            <ion-input v-else :value="addressData[0].pincode" @input="onInputpincode"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">State</ion-label>
                            <ion-input v-if="is_model" @input="onInputstate"></ion-input>
                            <ion-input v-else :value="addressData[0].state" @input="onInputstate"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Town/City</ion-label>
                            <ion-input v-if="is_model" @input="onInputcity"></ion-input>
                            <ion-input v-else :value="addressData[0].city" @input="onInputcity"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Detail Address</ion-label>
                            <ion-input v-if="is_model" @input="onInputdetailaddress"></ion-input>
                            <ion-input v-else :value="addressData[0].detailsaddress" @input="onInputdetailaddress">
                            </ion-input>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-button class="gocode" @click="addAddress">
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
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonTitle, IonButton, IonFooter, IonInput, IonItem, toastController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'AddaddressPage',
    components: {
        IonContent, IonPage, IonHeader, IonIcon, IonTitle, IonButton, IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonInput, IonItem, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, router
        }
    },
    data() {
        return {
            fullname: '',
            mobilenumber: '',
            pincode: '',
            state: '',
            city: '',
            detailsaddress: '',
            isvalid: true,
            addressData: [{ "_id": '', "fullname": '', "mobilenumber": '', "pincode": '', "state": '', "city": '', 'detailsaddress': '' }],
            is_model: true,
            currentUser: ''
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
                .post('http://localhost:5000/getAddressById', { "id": parameters })
                .then(res => this.addressData = res.data.data)
            this.fullname = this.addressData[0].fullname
            this.mobilenumber = this.addressData[0].mobilenumber
            this.pincode = this.addressData[0].pincode
            this.state = this.addressData[0].state
            this.city = this.addressData[0].city
            this.detailsaddress = this.addressData[0].detailsaddress
            this.is_model = false
        }
    },
    methods: {
        onInputfullname($event: any) {
            this.fullname = $event.target.value
        },
        onInputmobilenumber($event: any) {
            this.mobilenumber = $event.target.value
        },
        onInputpincode($event: any) {
            this.pincode = $event.target.value
        },
        onInputstate($event: any) {
            this.state = $event.target.value
        },
        onInputcity($event: any) {
            this.city = $event.target.value
        },
        onInputdetailaddress($event: any) {
            this.detailsaddress = $event.target.value
        },
        async addAddress() {
            let mobilepattern = 0;
            if (this.mobilenumber === ''){
                mobilepattern   = this.mobilenumber.search(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
            }   
            if (this.fullname === '') {
                this.toastfunction('Please enter fullname', 3000)
                this.isvalid = false
            } else if (this.mobilenumber === '' || mobilepattern !== 0) {
                this.toastfunction('Please enter valid mobile number', 3000)
                this.isvalid = false
            } else if (this.pincode === '') {
                this.toastfunction('Please enter pincode', 3000)
                this.isvalid = false
            } else if (this.detailsaddress === '') {
                this.toastfunction('Please enter detailaddress', 3000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }
            if (this.isvalid === true) {
                let currentUser = localStorage.getItem('session_user') || '';
                let parameters = this.$route.query.cardId
                if (parameters === undefined) {
                    await axios
                        .post('http://localhost:5000/addAddress', { "userid": currentUser, "fullname": this.fullname, "mobilenumber": this.mobilenumber, "pincode": this.pincode, "state": this.state, "city": this.city, "detailsaddress": this.detailsaddress })
                        .then(response => console.log(response.data))
                    this.toastfunction('Add address successfully...', 3000)
                    this.router.push('/my/address')
                } else {
                    await axios
                        .put('http://localhost:5000/updateAddress', { "id": parameters, "userid": currentUser, "fullname": this.fullname, "mobilenumber": this.mobilenumber, "pincode": this.pincode, "state": this.state, "city": this.city, "detailsaddress": this.detailsaddress })
                        .then(response => console.log(response.data))
                    this.toastfunction('Update address successfully...', 3000)
                    this.router.push('/my/address')
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
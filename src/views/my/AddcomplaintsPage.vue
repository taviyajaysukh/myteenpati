<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Add
                        Complaints</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-label position="stacked">Type</ion-label>
                            <ion-select interface="action-sheet" v-model="type">
                                <ion-select-option value="suggestion">Suggestion</ion-select-option>
                                <ion-select-option value="consult">Consult</ion-select-option>
                                <ion-select-option value="recharge_roblem">Recharge Problem</ion-select-option>
                                <ion-select-option value="withdraw_problem">Withdraw Problem</ion-select-option>
                                <ion-select-option value="parity_problem">Parity Problem</ion-select-option>
                                <ion-select-option value="gift_receive_problem">Gift Receive Problem</ion-select-option>
                                <ion-select-option value="other">Other</ion-select-option>
                            </ion-select>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Out Id</ion-label>
                            <ion-input v-model="outid"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">WhatsApp</ion-label>
                            <ion-input v-model="whatsapp"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Description</ion-label>
                            <ion-textarea v-model="description"></ion-textarea>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <p>Service: 10:00~17:00, Mon~Fri about 1~5 business days</p>
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
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonInput, IonItem, IonIcon, IonTitle, IonTextarea, IonButton, IonFooter, IonSelect, IonSelectOption, toastController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'AddcomplaintsPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonTitle, IonTextarea, IonButton, IonFooter, IonInput, IonItem, IonSelect, IonSelectOption, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, add, router
        }
    },
    data() {
        return {
            type: '',
            outid: '',
            whatsapp: '',
            description: '',
            currentUser: '',
            isvalid: true,
        }
    },
    ionViewDidEnter() {
        this.currentUser = localStorage.getItem('session_user') || '';
        if (Object.keys(this.currentUser).length == 0) {
            this.router.push('/my/login')
        }
    },
    methods: {
        async addAddress() {
            if (this.type === '') {
                this.toastfunction('Please enter type', 3000)
                this.isvalid = false
            } else if (this.outid === '') {
                this.toastfunction('Please enter outid', 3000)
                this.isvalid = false
            } else if (this.whatsapp === '') {
                this.toastfunction('Please enter whatsapp', 3000)
                this.isvalid = false
            } else if (this.description === '') {
                this.toastfunction('Please enter description', 3000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }
            if (this.isvalid === true) {
                await axios
                    .post('http://localhost:5000/Addcomplaints', { "type": this.type, "outid": this.outid, "whatsapp": this.whatsapp, "description": this.description, "userid": this.currentUser, "status": 0 })
                    .then(response => console.log(response.data))
                this.toastfunction('Add complaint successfully...', 3000)
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
.border-bottom-ctm {
    border-bottom: 2px solid gray;
    padding: 5px;
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
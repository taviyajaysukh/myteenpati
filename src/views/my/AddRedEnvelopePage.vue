<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Red
                        Envelope</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-label position="stacked">Fixed Mony</ion-label>
                            <ion-input v-model="fixedmony"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="stacked">Enter Your Login Password</ion-label>
                            <ion-input v-model="password"></ion-input>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-button class="gocode" @click="addredenvelope">
                            Lunch
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
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonButton, IonFooter, IonLabel, IonInput, IonItem, toastController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'AddRedEnvelopePage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonButton, IonFooter, IonLabel, IonInput, IonItem, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, add, router
        }
    },
    data() {
        return {
            currentUser: '',
            fixedmony: '',
            password: '',
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
        async addredenvelope() {
            if (this.fixedmony === '') {
                this.toastfunction('Please enter fixedmony', 3000)
                this.isvalid = false
            } else if (this.password === '') {
                this.toastfunction('Please enter password', 3000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }
            if (this.isvalid === true) {
                let mobile = localStorage.getItem('session_user') || '';
                await axios
                    .post('http://localhost:5000/addredenvelope', { "mobile": mobile, "fixedmony":this.fixedmony, "password": this.password })
                    .then((res) => {
                        if (res.data.code == 200) {
                            this.toastfunction(res.data.message, 3000)
                            this.fixedmony = ''
                            this.password = ''
                           // this.router.push('/my/login')
                        } else {
                            this.toastfunction(res.data.message, 3000)
                        }
                    })
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
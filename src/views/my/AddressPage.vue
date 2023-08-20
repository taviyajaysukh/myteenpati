<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span
                        class="ion-margin-start">Address</span>
                </ion-title>
                <ion-button slot="end" @click="() => router.push('/my/addaddress')">
                    <ion-icon :icon="add" />
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="address_list" v-for="item in addressData" :key="item.mobilenumber">
                    <ion-col size="2">
                        <ion-label>
                            <ion-img :src="bankcardIcon"
                                style="width:40px;height:40px;margin-left:70px;margin-top:10px;"></ion-img>
                        </ion-label>
                    </ion-col>
                    <ion-col size="9">
                        <p class="font-class"> {{item.fullname}}</p>
                        <p class="font-class">{{item.mobilenumber}}</p>
                    </ion-col>
                    <ion-col size="1">
                        <ion-label @click="presentActionSheet(item._id)">
                            <ion-img :src="infoIcon" style="width:25px;height:25px;margin-top:20px;"></ion-img>
                        </ion-label>
                    </ion-col>
                </ion-row>

            </ion-grid>
            <ion-modal :is-open="isOpen">
                <ion-content class="ion-padding">
                    <ion-header>
                        <ion-toolbar>
                            <ion-buttons slot="start">
                                <ion-button color="medium" @click="setOpen(false)">Cancel</ion-button>
                            </ion-buttons>
                            <ion-title>Are you delete this record?</ion-title>
                            <ion-buttons slot="end">
                                <ion-button @click="confirm()">Confirm</ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </ion-header>
                </ion-content>
            </ion-modal>
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
    IonContent, IonPage, IonHeader, IonModal, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonButton, IonButtons,IonImg, IonLabel, IonFooter, actionSheetController,toastController
} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { create, trash, arrowBack, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'AddressPage',
    components: {
        IonContent, IonPage, IonHeader, IonModal, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonButton,IonButtons, IonImg, IonLabel, IonFooter, FooterPage,
    },
    setup() {
        const bankcardIcon = computed(() => '/assets/images/bankcard.png')
        const infoIcon = computed(() => '/assets/images/info.png')
        const router = useRouter();
        return {
            arrowBack, add, create, trash, router, bankcardIcon, infoIcon
        }
    },
    data() {
        return {
            currentUser: '',
            isOpen: false,
            strid: '',
            addressData: [{ "_id": '', "fullname": '', "mobilenumber": 0, "pincode": 0, "detailsaddress": '' }],
        }
    },
    mounted() {
        this.currentUser = localStorage.getItem('session_user') || '';
        this.getAddressByUser()
    },
    ionViewDidEnter() {
        this.currentUser = localStorage.getItem('session_user') || '';
        if (Object.keys(this.currentUser).length == 0) {
            this.router.push('/my/login')
        }
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
            console.log('test')
        },
        async confirm() {
            await axios
                .delete('http://localhost:5000/deleteAddress', { "data": { "id": this.strid } })
                .then(res => console.log(res))
                this.toastfunction('Delete record successfully...', 3000)
            this.getAddressByUser()
            this.isOpen = false
        },
        async getAddressByUser() {
            await axios
                .post('http://localhost:5000/getAddress', { "userid": this.currentUser })
                .then(res => this.addressData = res.data.data)
        },
        async presentActionSheet(str: string) {
            let str1 = str
            const actionSheet = await actionSheetController
                .create({
                    header: 'Select',
                    cssClass: 'my-custom-class',
                    buttons: [
                        {
                            text: 'Edit',
                            icon: create,
                            data: 'Data value',
                            handler: () => {
                                this.router.push('/my/addaddress?cardId=' + str1)
                            },
                        },
                        {
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            id: 'delete-button',
                            data: {
                                type: 'delete'
                            },
                            handler: () => {
                                this.isOpen = true
                                this.strid = str1
                            },
                        },
                    ],
                });
            await actionSheet.present();
            const { role, data } = await actionSheet.onDidDismiss();
            console.log('onDidDismiss resolved with role and data', role, data);
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
</style>
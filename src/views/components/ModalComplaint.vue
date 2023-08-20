<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>
               Details
            </ion-title>
            <ion-buttons slot="end">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>

        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="stacked">Your name</ion-label>
            <ion-input :value="inputData[0].type" :disabled="disabled"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Out Id</ion-label>
            <ion-input :value="inputData[0].outid" :disabled="disabled"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Whatsapp</ion-label>
            <ion-input :value="inputData[0].whatsapp" :disabled="disabled"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Description</ion-label>
            <ion-input :value="inputData[0].description" :disabled="disabled"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Waiting for reply</ion-label>
            <ion-input :disabled="disabled"></ion-input>
        </ion-item>
    </ion-content>
</template>
  
<script lang="ts">
import axios from 'axios'
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModalComplaint',
    components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput },
    data() {
        return {
            disabled:true,
            inputData: [{ "type": '', "outid": 0, "whatsapp": 0, "description": '' }]
        }
    },
    props: {
        value: String
    },
    beforeMount() {
        this.getComplaint()
    },
    methods: {
        async getComplaint() {
            let value = this.value
            await axios
                .post('http://localhost:5000/getComplaintsById', { "id": value })
                .then(res => this.inputData = res.data.data)
        },
        cancel() {
            return modalController.dismiss(null, 'cancel');
        },
    },
});
</script>
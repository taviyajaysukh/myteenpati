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
        <p>3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all
            day. The total number of trade is 480 issues</p>
        <p>If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98:</p>
        <p>1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196</p>
        <p>If the result shows 5, you will get (98*1.5) 147</p>
        <p>2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get
            (98*1.5) 147</p>
        <p>3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441</p>
        <p>4. SELECT NUMBER: if the result is the same as the number you selected, you will get (98*9) 882</p>
    </ion-content>
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModalRedblue',
    components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton },
    methods: {

        cancel() {
            return modalController.dismiss(null, 'cancel');
        },
    },
});
</script>
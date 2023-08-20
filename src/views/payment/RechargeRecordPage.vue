<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" />Recharge Record
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="border-bottom-ctm">
                    <ion-col>
                        <ion-text>
                            <p>₹ 300.00</p>
                        </ion-text>
                        <ion-text>
                            <p>N2WOW20220701201314357257</p>
                        </ion-text>
                        <ion-text>
                            <p>2022-07-01 20:13g</p>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="border-bottom-ctm">
                    <ion-col>
                        <ion-text>
                            <p>₹ 300.00</p>
                        </ion-text>
                        <ion-text>
                            <p>N2WOW20220701201314357257</p>
                        </ion-text>
                        <ion-text>
                            <p>2022-07-01 20:13g</p>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="border-bottom-ctm">
                    <ion-col>
                        <ion-text>
                            <p>₹ 300.00</p>
                        </ion-text>
                        <ion-text>
                            <p>N2WOW20220701201314357257</p>
                        </ion-text>
                        <ion-text>
                            <p>2022-07-01 20:13g</p>
                        </ion-text>
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
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RechargeRecordPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, router
        }
    },
    data() {
        return {
            currentUser: ''
        }
    },
    ionViewDidEnter() {
        this.currentUser = localStorage.getItem('session_user') || '';
        if (Object.keys(this.currentUser).length == 0) {
            this.router.push('/my/login')
        }
    },
});
</script>
<style scoped>
.border-bottom-ctm {
    border-bottom: 2px solid gray;
    padding: 5px;
}
</style>
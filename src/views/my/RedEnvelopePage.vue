<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span
                        class="ion-margin-start">RedEnvelope</span>
                </ion-title>
                <ion-button slot="end" @click="() => router.push('/my/addredenvelope')">
                    <ion-icon :icon="add" />
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="border-bottom-ctm" v-for="item in redenvData" :key="item.mobile">
                    <ion-col>
                        <ion-text>
                            <p>{{item.mobile}}</p>
                        </ion-text>
                        <ion-text>
                            <p>{{item.fixedmony}}</p>
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
import axios from 'axios'
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonButton, IonText, IonFooter
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RedEnvelopePage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonTitle, IonButton, IonText, IonFooter, FooterPage
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
            redenvData: [{ "mobile": '', "fixedmony": '', "password": '' }],
        }
    },
    mounted() {
        this.getWaitComplaint()
    },
    ionViewDidEnter() {
        this.currentUser = localStorage.getItem('session_user') || '';
        if (Object.keys(this.currentUser).length == 0) {
            this.router.push('/my/login')
        }
    },
    methods: {
        async getWaitComplaint() {
            await axios
                .get('http://localhost:5000/getRedenvelope', {})
                .then(res => this.redenvData = res.data.data)
        },
    }
});
</script>
<style scoped>
.border-bottom-ctm {
    border-bottom: 2px solid gray;
    padding: 5px;
}
</style>
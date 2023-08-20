<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="2" size-xs="12" size-sm="12" size-md="2" size-lg="2">
                        <div class="left-menu-custom">
                            test
                        </div>
                    </ion-col>
                    <ion-col size="10" size-xs="12" size-sm="12" size-md="10" size-lg="10">
                        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-footer>
            <h1>Footer</h1>
            <FooteradminPage />
        </ion-footer>
    </ion-page>
</template>
<script lang="ts">
import axios from 'axios'
import {
    IonContent, IonPage, IonGrid, IonRow, IonCol, IonFooter, toastController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooteradminPage from '../include/FooteradminPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default defineComponent({
    name: 'AdminPage',
    components: {
        IonContent, IonPage, IonGrid, IonRow, IonCol, IonFooter, Bar, FooteradminPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, router
        }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March','April'],
                datasets: [{ data: [40, 20, 12,25] }]
            },
            chartOptions: {
                responsive: true
            },
            currentUser: ''
        }
    },

    mounted() {
        //
    },
    methods: {
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
.left-menu-custom{
    position: relative;
    bottom: 0;
    background: #000;
    height: 100%;
    border: 2px solid gray;
    border-radius: 5px;
}
</style>
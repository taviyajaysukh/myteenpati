<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title>
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /> Risk Disclosure Agreement
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <h3>
                            Chapter 1.Booking/Collection Description
                        </h3>

                        <p>
                            Prepayment Booking/Recycling Customer should read and understand the business content
                            carefully before making prepayment bookings (prepayment lock price, payment settlement and
                            shipment) /recovery or repurchase (prepayment lock price, shipping payment) before making
                            prepayment bookings to Terion Shop:

                            1. Before making an appointment/restoring the prepayment business, the customer should
                            complete the real name authentication in the mall and ensure that the name, ID number, bank
                            account number, delivery address and other information filled in are true, accurate and
                            valid; Otherwise, the user will be liable for the consequences of false information.

                            2. Customers can order gold and silver products in advance at the shopping centre. Orders
                            can be cancelled by 01:30 a.m. on the same Saturday. When the customer pays the end payment,
                            the mall receives the final payment and arranges the delivery.

                            If the customer does not pay the final pick-up by 01:30 a.m. on Saturday, the customer is
                            deemed to have made the last offer before the inventory and the booking is cancelled.

                            3. Customers can make an appointment to recycle gold and silver products purchased at the
                            gold point. Pre-purchase recovery requires a credit margin and confirmation of actual
                            possession of gold and silver products purchased from the mall. Customers can cancel their
                            reservation at any time before 01:30 on Saturday and the credit mark will be refunded after
                            deducting the increase or decrease in the value of the goods within the corresponding time.

                            If the customer fails to deliver the goods to a shopping mall or shopping center at the
                            designated collection point by Saturday within the same week, or if the goods delivered do
                            not meet the recycling standard test, the customer will be deemed to have cancelled the
                            reservation recovery and will bear the logistics and testing costs.

                            4. Counting time: Daily 01:30-05:30 for the mall warehouse inventory time. During the
                            inventory period, the mall stops accepting advance payments for reservations/receipts.

                            5. For further details, please refer to the Business Guidelines in the front page of the
                            mall, Understanding Terion Shop.
                        </p>

                    </ion-col>
                </ion-row>
            </ion-grid>
            <FooterPage />
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { arrowBack } from 'ionicons/icons';
import FooterPage from './include/FooterPage.vue'
export default defineComponent({
    name: 'RiskagreementPage',
    components: { IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, FooterPage },
    setup() {
        const router = useRouter()
        return {
            router, arrowBack
        }
    },
});
</script>
<style scoped>

</style>
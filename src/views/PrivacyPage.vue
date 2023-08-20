<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title>
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /> Privacy Policy
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <p>This Privacy Policy describes Our policies and procedures on the collection, use and
                            disclosure of Your information when You use the Service and tells You about Your privacy
                            rights and how the law protects You.

                        </p>
                        <h3>
                            Interpretation and Definitions
                        </h3>
                        <h4>Interpretation</h4>
                        <p>The words of which the initial letter is capitalized have meanings defined under the
                            following conditions.

                        </p>
                        <p>The following definitions shall have the same meaning regardless of whether they appear in
                            singular or in plural.

                        </p>
                        <h3>Definitions</h3>
                        <p>For the purposes of this Privacy Policy:</p>
                        <p><strong>You </strong>means the individual accessing or using the Service, or the company, or
                            other legal entity on behalf of which such individual is accessing or using the Service, as
                            applicable.</p>
                        <p><strong>Company </strong>(referred to as either "the Company", "We", "Us" or "Our" in this
                            Agreement) refers to Coem Shop.</p>
                        <p><strong>Affiliate </strong>means an entity that controls, is controlled by or is under common
                            control with a party, where "control" means ownership of 50% or more of the shares, equity
                            interest or other securities entitled to vote for election of directors or other managing
                            authority.</p>
                        <p><strong>Account </strong>means a unique account created for You to access our Service or
                            parts of our Service.</p>
                        <p><strong>Website </strong>refers to Coem Shop, accessible from https://coem.in</p>
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
    name: 'TestPage',
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
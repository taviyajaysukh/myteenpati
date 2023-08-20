<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title style="display: inline-block">
          <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Recharge</span>
        </ion-title>
        <ion-title slot="end" style="display: inline-block">
          <ion-icon :icon="filter" />
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid class="ion-padding-start">
        <ion-row>
          <ion-col>
            <h4>Balance: ₹ {{ balance }}</h4>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="input_box">
              <!-- Input with value -->
              <ion-label>
                <ion-img class="imgwidth" :src="recomdIcon"></ion-img>
              </ion-label>
              <ion-input type="number" :value="selectAmount" placeholder="Enter or select recharge amount"></ion-input>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-text-center">
            <ion-button class="rechargebuttton" @click="selectPayment(500)">₹500</ion-button>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-button class="rechargebuttton" @click="selectPayment(1000)">₹1000</ion-button>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-button class="rechargebuttton" @click="selectPayment(2000)">₹2000</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-text-center">
            <ion-button class="rechargebuttton" @click="selectPayment(5000)">₹5000</ion-button>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-button class="rechargebuttton" @click="selectPayment(10000)">₹10000</ion-button>
          </ion-col>
          <ion-col class="ion-text-center">
            <ion-button class="rechargebuttton" @click="selectPayment(50000)">₹50000</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row class="ion-padding-start">
          <ion-col size="4" size-xs="12" size-sm="12" size-md="4" size-lg="4">
            <h4>Payment Method</h4>
            <ion-radio-group v-model="selectPaymentMethods">
              <ion-item>
                <ion-label>Cashfree</ion-label>
                <ion-radio value="cashfree" mode="ios"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Razorpay</ion-label>
                <ion-radio value="razorpay" mode="ios" checked></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-col>
          <ion-col size="8" size-xs="12" size-sm="12" size-md="4" size-lg="4">
            <div id="payment-form"></div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3"></ion-col>
          <ion-col size="6" class="ion-text-center">
            <ion-button class="ion-padding-custom recharesubmit" @click="sendpayment()" value="10">Recharge
            </ion-button>
          </ion-col>
          <ion-col size="3"></ion-col>
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
import axios from "axios";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonTitle,
  IonInput,
  IonFooter,
  IonButton,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  toastController,
} from "@ionic/vue";
import { defineComponent, computed } from "vue";
import FooterPage from "../include/FooterPage.vue";
import { filter, card, arrowBack } from "ionicons/icons";
import { useRouter } from "vue-router";
declare global {
  interface Window {
    Razorpay?: any;
    Cashfree?: any;
  }
}
export default defineComponent({
  name: "RechargePage",
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonImg,
    IonTitle,
    IonButton,
    IonInput,
    IonFooter,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    FooterPage,
  },
  setup() {
    const router = useRouter();
    const recomdIcon = computed(() => "/assets/images/recharge.png");
    const logoIcon = computed(() => "/assets/images/logo.png");
    return {
      filter,
      card,
      recomdIcon,
      logoIcon,
      arrowBack,
      router,
    };
  },
  props: ["order_details", "customer_details"],
  data() {
    return {
      selectAmount: 0,
      balance: 0,
      currentUser: '',
      referralvalue: 0,
      referralfrommobile: 0,
      paymentMethod: '',
      selectPaymentMethods: "",
      paymentSessionId: "",
      applyreferral: false,
      isOpen: false,
      script: `https://checkout.razorpay.com/v1/checkout.js`,
      scriptcashfree: `https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js`,
    };
  },
  mounted() {
    this.getBalance();
  },
  ionViewDidEnter() {
    this.currentUser = localStorage.getItem('session_user') || '';
    if (Object.keys(this.currentUser).length == 0) {
      this.router.push('/my/login')
    }
  },
  methods: {
    selectPayment(val: number) {
      this.selectAmount = val;
    },
    async getBalance() {
      let usermobile = localStorage.getItem("session_user") || "";
      await axios
        .post("http://localhost:5000/getBalance", { mobile: usermobile })
        .then((res) => (this.balance = res.data.data.total));
    },
    SelectPaymentMethod() {
      switch (this.selectPaymentMethods) {
        case "wowpay":
          this.paymentMethod = "cashfree"
          break;
        case "razorpay":
          this.paymentMethod = "razorpay"
          break;
      }
    },
    async loadRazorPay() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = this.script;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    },
    async loadCashfree() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = this.scriptcashfree;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    },
    async cashfreesussess(data: any) {
      if (data.order && data.order.status == "PAID") {
        let transactionAmount = data.transaction.transactionAmount
        let transactionId = data.transaction.transactionId
        let usermobile = localStorage.getItem("session_user") || "";
        let commpervalue = 30
        let commper = 100
        let paymentMethod = this.selectPaymentMethods;
        await axios.post('http://localhost:5000/manageReferralByRecharge',
          { "referraltomobile": usermobile })
          .then(function (this: any, resp: any) {
            if (resp.data.code == 201 && resp.data.data.applyreferral == false) {
              this.referralvalue = (transactionAmount * commpervalue) / commper
              this.referralfrommobile = resp.data.data.referralfrommobile
              this.applyreferral = resp.data.data.applyreferral
            }
          }.bind(this))
        await axios
          .post("http://localhost:5000/addAccount", {
            mobile: usermobile,
            amount: transactionAmount,
            referralamount: this.referralvalue,
            ballance: transactionAmount + this.referralvalue,
            paymentId: transactionId,
            paymentMethod: paymentMethod,
          })
          .then((res) => console.log(res));
        await axios
          .post("http://localhost:5000/addTransaction", {
            userid: usermobile,
            paymentMethod: "Cashfree",
            transactionType: "Credit",
            transactionId: transactionId,
            amount: transactionAmount,
            referralamount: this.referralvalue,
            status: true
          })
          .then((res) => console.log(res));
        await axios
          .put("http://localhost:5000/updateBalance", {
            mobile: usermobile,
            totalBallance: transactionAmount,
            operation: "increment"
          })
          .then((res) => console.log(res));
        if (this.referralfrommobile > 0 && this.applyreferral == false) {
          await axios
            .put("http://localhost:5000/updateBalance", {
              mobile: this.referralfrommobile,
              totalBallance: this.referralvalue,
              operation: "increment"
            })
            .then((res) => console.log(res));
          await axios
            .put("http://localhost:5000/updateReferralStatus", {
              referraltomobile: usermobile,
              applyreferral: true
            })
            .then((res) => console.log(res));
        }
        this.toastfunction("Payment success...", 3000)
        await axios
          .post("http://localhost:5000/getBalance", { mobile: usermobile })
          .then((res) => (this.balance = res.data.data.total));
        let myContainer = document.getElementById('payment-form') as HTMLInputElement;
        myContainer.innerHTML = "";
        this.paymentSessionId = ""
      } else {
        //order is still active and payment has failed
        this.toastfunction("Payment Error...", 3000)
      }

    },
    cashfreefaiuler(data: any) {
      this.toastfunction("Payment Faiuler...", 3000)
      let myContainer = document.getElementById('payment-form') as HTMLInputElement;
      myContainer.innerHTML = "";
      this.paymentSessionId = ""
      console.log(data.order.errorText)
    },
    async sendpayment() {
      let amount = this.selectAmount;
      let paymentMethod = this.selectPaymentMethods;
      if (amount <= 0) {
        this.toastfunction("Please Select amount 1 or more", 3000);
      } else if (paymentMethod == '') {
        this.toastfunction("Please Select Payment Method", 3000);
      } else {
        let usermobile = localStorage.getItem("session_user") || "";
        let commpervalue = 30
        let commper = 100
        if (paymentMethod == 'cashfree') {

          const loadcasfree = await this.loadCashfree();
          if (!loadcasfree) {
            alert("Failed to load cashfree script");
            return;
          }
          const paymentDom = document.getElementById("payment-form");
          const dropConfig = {
            "components": [
              "order-details",
              "card",
              "netbanking",
              "app",
              "upi"
            ],
            "onSuccess": this.cashfreesussess,
            "onFailure": this.cashfreefaiuler,
            "style": {
              "backgroundColor": "#ffffff",
              "color": "#11385b",
              "fontFamily": "Lato",
              "fontSize": "14px",
              "errorColor": "#ff0000",
              "theme": "light", //(or dark)
            }
          }
          if (this.paymentSessionId == "") {
            await axios.post('http://localhost:5000/addcashorder',
              {
                "customer_id": '',
                "customer_email": '',
                "customer_phone": usermobile,
                "order_amount": amount

              })
              .then(function (res) {
                let paymentSessionId1 = res.data.payment_session_id;
                const cashfree = new window.Cashfree(paymentSessionId1);
                cashfree.drop(paymentDom, dropConfig);
              })
          } else {
            const cashfree = new window.Cashfree(this.paymentSessionId);
            cashfree.drop(paymentDom, dropConfig);
          }
        }
        if (paymentMethod == 'razorpay') {
          const result = await this.loadRazorPay();
          if (!result) {
            alert("Failed to load razorpay script");
            return;
          }
          const options = {
            key: "rzp_test_cD5kXoQjJuPc0a",
            amount: amount * 100,
            currency: "INR",
            name: `test`,
            description: `${paymentMethod} Description of the payment`,
            image: this.logoIcon,
            handler: async function (this: any, res: any) {
              let paymentId = res.razorpay_payment_id;
              await axios.post('http://localhost:5000/manageReferralByRecharge',
                { "referraltomobile": usermobile })
                .then(function (this: any, resp: any) {
                  if (resp.data.code == 201 && resp.data.data.applyreferral == false) {
                    this.referralvalue = (amount * commpervalue) / commper
                    this.referralfrommobile = resp.data.data.referralfrommobile
                    this.applyreferral = resp.data.data.applyreferral
                  }
                }.bind(this))
              await axios
                .post("http://localhost:5000/addAccount", {
                  mobile: usermobile,
                  amount: amount,
                  referralamount: this.referralvalue,
                  ballance: amount + this.referralvalue,
                  paymentId: paymentId,
                  paymentMethod: paymentMethod,
                })
                .then((res) => console.log(res));
              await axios
                .post("http://localhost:5000/addTransaction", {
                  userid: usermobile,
                  paymentMethod: "razorpay",
                  transactionType: "Credit",
                  transactionId: paymentId,
                  amount: amount,
                  referralamount: this.referralvalue,
                  status: true
                })
                .then((res) => console.log(res));
              await axios
                .put("http://localhost:5000/updateBalance", {
                  mobile: usermobile,
                  totalBallance: amount,
                  operation: "increment"
                })
                .then((res) => console.log(res));
              if (this.referralfrommobile > 0 && this.applyreferral == false) {
                await axios
                  .put("http://localhost:5000/updateBalance", {
                    mobile: this.referralfrommobile,
                    totalBallance: this.referralvalue,
                    operation: "increment"
                  })
                  .then((res) => console.log(res));
                await axios
                  .put("http://localhost:5000/updateReferralStatus", {
                    referraltomobile: usermobile,
                    applyreferral: true
                  })
                  .then((res) => console.log(res));
              }

              const toast = await toastController.create({
                message: "Payment successfully...",
                duration: 300,
                position: "middle",
                cssClass: "custom-toast",
                buttons: [
                  {
                    text: "Dismiss",
                    role: "cancel",
                  },
                ],
              });
              await toast.present();
              await axios
                .post("http://localhost:5000/getBalance", { mobile: usermobile })
                .then((res) => (this.balance = res.data.data.total));
            }.bind(this),
            prefill: {
              name: `test`,
              email: `test@gmail.com`,
              contact: usermobile,
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }

      }
    },
    async toastfunction(message: string, duration?: number) {
      const toast = await toastController.create({
        message: message,
        duration: duration,
        position: "middle",
        cssClass: "custom-toast",
        buttons: [
          {
            text: "Dismiss",
            role: "cancel",
          },
        ],
      });
      await toast.present();
    },
  },
});
</script>
<style scoped>
.ion-padding-custom {
  --padding-start: 80px;
  --padding-end: 80px;
  cursor: pointer;
}

.rechargebuttton {
  width: 70%;
  height: 35px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  line-height: 35px;
  border-radius: 2px;
  border: 0;
  text-align: center;
  --background: #f5f5f5;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
}

.recharesubmit {
  width: 80%;
  height: 40px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  line-height: 30px;
  border-radius: 2px;
  border: 0;
  text-align: center;
  --background: #f5f5f5;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
}

.input_box {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 48px;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 35px;
  position: relative;
}

.imgwidth {
  width: 20px;
  height: 20px;
}
</style>

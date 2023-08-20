import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import MyPage from '../views/my/MyPage.vue'
import LoginPage from '../views/my/LoginPage.vue'
import OrderPage from '../views/my/OrderPage.vue'
import ForgotpassPage from '../views/my/ForgotpassPage.vue'
import RegisterPage from '../views/my/RegisterPage.vue'
import RedEnvelopePage from '../views/my/RedEnvelopePage.vue'
import AddRedEnvelopePage from '../views/my/AddRedEnvelopePage.vue'
import ComplaintsPage from '../views/my/ComplaintsPage.vue'
import AddcomplaintsPage from '../views/my/AddcomplaintsPage.vue'
import AddressPage from '../views/my/AddressPage.vue'
import InterestPage from '../views/my/InterestPage.vue'
import RewardPage from '../views/my/RewardPage.vue'
import PromotionPage from '../views/my/PromotionPage.vue'
import AddaddressPage from '../views/my/AddaddressPage.vue'
import BonusrecordPage from '../views/my/BonusrecordPage.vue'
import ApplyrecordPage from '../views/my/ApplyrecordPage.vue'
import RechargePage from '../views/payment/RechargePage.vue'
import WithdrawalPage from '../views/payment/WithdrawalPage.vue'
import WithdrawalFundPage from '../views/payment/WithdrawalFundPage.vue'
import WithdrawalRecordPage from '../views/payment/WithdrawalRecordPage.vue'
import RechargeRecordPage from '../views/payment/RechargeRecordPage.vue'
import TransactionsPage from '../views/payment/TransactionsPage.vue'
import BankcardPage from '../views/payment/BankcardPage.vue'
import AddbankcardPage from '../views/payment/AddbankcardPage.vue'
import SliderPage from '../views/SliderPage.vue'
import TestPage from '../views/TestPage.vue'
import WinPage from '../views/WinPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'
import RiskagreementPage from '../views/RiskagreementPage.vue'
import ProductPage from '../views/ProductPage.vue'
import AdminPage from '../views/admin/AdminPage.vue'
import PathNotFound  from '../views/PathNotFound .vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  }, 
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/my',
    name: 'MY',
    component: MyPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser != ''){
        next('/my');
      }
      next();
    }
  },
  {
    path: '/my/order',
    name: 'Order',
    component: OrderPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/slider',
    name: 'Slider',
    component: SliderPage
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyPage
  },
  {
    path: '/riskagreement',
    name: 'Riskagreement',
    component: RiskagreementPage
  },
  {
    path: '/win',
    name: 'Win',
    component: WinPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path:'/my/register',
    name:'Register',
    component:RegisterPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser != ''){
        next('/my');
      }
      next();
    }
  },
  {
    path: '/my/forgotpass',
    name: 'Forgotpass',
    component: ForgotpassPage
  },
  {
    path: '/my/redenvelope',
    name: 'RedEnvelope',
    component: RedEnvelopePage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/addredenvelope',
    name: 'AddRedEnvelope',
    component: AddRedEnvelopePage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  
  {
    path: '/my/address',
    name: 'Address',
    component: AddressPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/addaddress',
    name: 'Addaddress',
    component: AddaddressPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/complaints',
    name: 'Complaints',
    component: ComplaintsPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/bonusrecord',
    name: 'Bonusrecord',
    component: BonusrecordPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/applyrecord',
    name: 'Applyrecord',
    component: ApplyrecordPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/addcomplaints',
    name: 'Addcomplaints',
    component: AddcomplaintsPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/interest',
    name: 'Interest',
    component: InterestPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/reward',
    name: 'Reward',
    component: RewardPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/my/promotion',
    name: 'Promotion',
    component: PromotionPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/recharge',
    name: 'Recharge',
    component: RechargePage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/withdrawal',
    name: 'Withdrawal',
    component: WithdrawalPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/withdrawalfund',
    name: 'WithdrawalFund',
    component: WithdrawalFundPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/withdrawalrecord',
    name: 'WithdrawalRecord',
    component: WithdrawalRecordPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/rechargerecord',
    name: 'RechargeRecord',
    component: RechargeRecordPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/transactions',
    name: 'Transactions',
    component: TransactionsPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/bankcard',
    name: 'Bankcard',
    component: BankcardPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/payment/addbankcard',
    name: 'Addbankcard',
    component: AddbankcardPage,
    beforeEnter: (to, from, next) => {
      const currentUser = localStorage.getItem('session_user') || '';
      if(currentUser == ''){
        next('/my/login');
      }
      next();
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: ProductPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: '/PathNotFound',
    component: PathNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

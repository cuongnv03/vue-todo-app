import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthView,
    meta: { requiresGuest: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Chờ trạng thái xác thực được xác định trước khi chuyển hướng
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const auth = getAuth();

  // Promise để chờ Firebase trả về trạng thái người dùng
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next({ name: "Auth" });
  } else if (requiresGuest && user) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;

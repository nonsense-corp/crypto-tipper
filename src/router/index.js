import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Home from "@/pages/Home";
import Qr from "@/pages/Qr";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Tips from "@/pages/Tips";
import Balances from "@/pages/Balances";
import Withdraw from "@/pages/Withdraw";

Vue.use(Router);

const r = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Balances
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/embeds",
      name: "Qr",
      component: Qr,
      secure: true
    },
    {
      path: "/tips",
      name: "Tips",
      component: Tips,
      secure: true
    },
    {
      path: "/balances",
      name: "Balances",
      component: Balances,
      secure: true
    },
    {
      path: "/withdraw/",
      name: "Withdraw",
      component: Withdraw,
      secure: true
    },
    {
      path: "/withdraw/:currency",
      name: "WithdrawCurrency",
      component: Withdraw,
      secure: true
    }
  ]
});

r.beforeEach((to, from, next) => {
  for (const route of r.options.routes) {
    // Look at all routes
    // If this is the current route and it's secure
    if (to.matched[0].path === route.path && route.secure) {
      // Check that the user is not logged in.
      if (!store.state.loggedIn) {
        return next({ path: "/" });
      }
    }

    // If the router is register or login and the user is logged in, destroy their session!
    if (to.name === "Register" || to.name === "Login") {
      localStorage.clear();
      store.commit("changeLoggedIn", false);
      store.commit("setUserDetails", { });
      return next();
    }
  }
  // Proceed as normal
  next();
});

export default r;

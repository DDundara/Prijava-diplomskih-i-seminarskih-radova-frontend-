import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/Home")
  },
  {
    //path: "/",
    path: "/tutorials",
    name: "tutorials",
    component: () => import("./components/TutorialsList")
  },
  {
    path: "/tutorialsfull",
    name: "tutorialsfull",
    component: () => import("./components/TutorialsListFull")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./components/Tutorial")
  },
  {
    path: "/tutorialsdelete/:id",
    name: "tutorial-details2",
    component: () => import("./components/TutorialDelete")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial")
  },
  {
    path: "/students",
    name: "students",
    component: () => import("./components/StudentsListFull")
  },
  {
    path: "/dvorane",
    name: "dvorane",
    component: () => import("./components/DvoraneListFull")
  },
  {
    path: "/users",
    name: "users",
    component: () => import("./components/UsersListFull")
  },
  {
    path: "/usersperpage/:page",
    name: "usersperpage",
    component: () => import("./components/UsersListFullPage")
  },
  {
    path: "/usersandcities",
    name: "usersandcities",
    component: () => import("./components/UsersAndCities")
  },
  {
    path: "/mojiradovi",
    name: "mojiradovi",
    component: () => import("./components/MojiRadovi")
  }, 
  {
    path: "/radovimentor",
    name: "radovimentor",
    component: () => import("./components/MentorRadovi")
  },        
  {
    path: "/adduser",
    name: "adduser",
    component: () => import("./components/UsersAdd")
  },
  {
    path: "/useredit/:id",
    name: "useredit-details",
    component: () => import("./components/UserEdit")
  },
  {
    path: "/userdelete/:id",
    name: "userdelete-details",
    component: () => import("./components/UserDelete")
  },
  {
    path: "/sortingdata",
    name: "sortingdata",
    component: () => import("./components/SortingData")
  },
  {
    path: "/workedit/:idrad/:radname/:idkat/:katname",
    name: "workedit-details",
    component: () => import("./components/WorkEdit")
  },
  {
    path: "/workgrade/:idrad/:radname/:autname/:katname",
    name: "workgrade-details",
    component: () => import("./components/WorkGrade")
  },
  {
    path: "/workmentors/:idrad/:radname",
    name: "workmentors-details",
    component: () => import("./components/MentoriRada")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/UsersLogin")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./components/UsersSignUp")
  },
  {
    path: "/signout",
    name: "signout",
    component: () => import("./components/UsersSignOut")
  },
  {
    path: "/addwork",
    name: "addwork",
    component: () => import("./components/WorkAdd")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
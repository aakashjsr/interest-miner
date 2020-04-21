import Index from "../views/Index.js";
import Profile from "../views/examples/Profile.js";
import Maps from "../views/examples/Maps.js";
import Register from "../views/Register.js";
import Login from "../views/Login.js";
import AddPaper from "../views/AddPaper.js";
import ViewPaper from "../views/ViewPaper.js";
import EditPaper from "../views/EditPaper.js";
import Keywords from "../views/Keywords.js";
import BlackKeywords from "../views/BlackKeywords";
import Visualization from "../views/Visualization.js";
import CloudChartPage from "../views/CloudChart";
import ConceptChartPage from "../views/ConceptChart";
import StreamChartPage from "../views/StreamChart";
import SearchUserProfile from "../views/SearchUserProfile";






import PieChartPage from "../views/PieChart";
import LineChartPage from "../views/LineChart";


import Tables from "../views/examples/Tables.js";
import Icons from "../views/examples/Icons.js";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/add-paper",
    name: "Add Paper",
    icon: "ni ni-fat-add text-green",
    component: AddPaper,
    layout: "/admin",
    // display: "none"
  },
  {
    path: "/edit-paper/:id",
    name: "Edit Paper",
    icon: "ni ni-fat-add text-orange",
    component: EditPaper,
    layout: "/admin",
    display: "none"
  },
   {
    path: "/view-paper",
    name: "My Papers",
    icon: "fas fa-tasks text-blue",
    component: ViewPaper,
    layout: "/admin",
    // display: "none"
  },
  
   {
    path: "/keyword",   
    name: "Keyword",
    icon: "ni ni-archive-2 text-yellow",
    component: Keywords,
    layout: "/admin",
    // display: "none"
  },
  {
    path: "/black-keyword",   
    name: "Black Keyword",
    icon: "ni ni-archive-2 text-brown",
    component: BlackKeywords,
    layout: "/admin",
    // display: "none"
  },
  //  {
  //   path: "/visualization",
  //   name: "Visualization",
  //   icon: "fas fa-chart-pie text-green",
  //   component: Visualization,
  //   layout: "/admin",
  //   display: "none"

  // },
  
  {
    path: "/pie-chart",
    name: "Pie Chart",
    icon: "fas fa-chart-pie text-orange",
    component: PieChartPage,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/bar-chart",
    name: "Line Chart",
    icon: "fas fa-chart-bar text-pink",
    component: LineChartPage,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/cloud-chart",
    name: "Cloud Chart",
    icon: "fas fa-cloud text-info",
    component: CloudChartPage,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/concept-chart",
    name: "Concept Chart",
    icon: "fas fa-cloud text-info",
    component: ConceptChartPage,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/stream-chart",
    name: "Stream Chart",
    icon: "fas fa-cloud text-info",
    component: StreamChartPage,
    layout: "/admin",
    display: "none"

  },
  
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  //   display: "none"

  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-green",
    component: Profile,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/search-profile/:id",
    name: "User Account Details",
    icon: "ni ni-single-02 text-green",
    component: SearchUserProfile,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    display: "none"

  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    display: "none"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    display: "none"
    
  }
];
export default routes;

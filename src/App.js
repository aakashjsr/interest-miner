/*!

=========================================================
*  Dashboard React - v1.1.0
=========================================================
*/
import React from "react";
import AppRoute from "./routes/index";
import {ToastContainer} from 'react-toastify';


const App = () => (

    <div>
        <AppRoute />
        <ToastContainer autoClose={8000} />
    </div>
);

export default App

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/admin" render={props => <AdminLayout {...props} />} />
//       <Route path="/auth" render={props => <AuthLayout {...props} />} />
//       <Redirect from="/" to="/admin/index" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

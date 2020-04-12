import { getItem } from "../utils/localStorage";
import { BASE_URL } from "../constants";
import axios from "axios";

class user {

    //** SIGNUP API **//
  static userSignup(data) {
    const TOKEN = getItem("accessToken");
    // console.log(TOKEN);
    // try{
    return axios({
            method: "post",
            url: `${BASE_URL}/api/accounts/register/`,
            data: data
          }).then(
              res => {
                  res.json()
              }
            ).catch(
                error=> error
            )
        };

           //** SIGNUP API **//
  static userSignIn(data) {
    const TOKEN = getItem("accessToken");
    // console.log(TOKEN);
    // try{
    return axios({
            method: "post",
            url: `${BASE_URL}/api/accounts/login/`,
            data: data
          }).then(
              res => res
              
            ).catch(
                error=> error
                
                // console.log('ERROR++>',error.response.data)
            )
            
        };
     
 



}

export default user;
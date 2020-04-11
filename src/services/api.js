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
                
                // console.log('ERROR++>',error.response.data)
            )
            // .then(response => {

            //     console.log('API PAGE',response.userName[0])
            //     return response;
    
            // })
            // .catch(
            //     error=> error
                
            //     // console.log('ERROR++>',error.response.data)
            // )
        // }catch(err){}
        };
     
    //  return axios({
    //     method: "put",
    //     url: `${BASE_URL}/admin/activities`,
    //     headers: {authorization: TOKEN},
    //     data: {limit ,skip }
    //   }).then(response => {
    //       if (response.status === 401) {
    //         localStorage.clear();
    //         window.location.href = "/";
    //       }
    //       return response;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       return error;
    //     });
    // } catch (err) {}
//   };




}

export default user;
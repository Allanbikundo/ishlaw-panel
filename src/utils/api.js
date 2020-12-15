import axios from "axios";
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from "history";
import history from "../history";

const baseURL = "https://jimcab.scalum.co.ke/api";
const fileURL = "http://localhost:3000/files/api/v1"
const authURL = "https://ishlaw.scalum.co.ke/api/auth/v1";
export default {
  auth() {
    return {
      login: async (credentials,navigate) => {
        var response;
        try {
          response = await axios.post(`${authURL}/local/signIn`, credentials);
          const userToken = response.data.token;
          var userData = jwt_decode(userToken);
          localStorage.setItem("userToken", userToken);
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate('/app/dashboard', { replace: true })
        } catch (err) {
          alert("invalid user credentials")
        }
      },
      createUser: async userDetails => {
        axios.post(`${authURL}/local/signUp`, {
          firstName: userDetails.firstName,
          secondName: userDetails.lastName,
          emailAddress: userDetails.emailAddress,
          phoneNumber: userDetails.phoneNumber,
          TeamId: userDetails.teamId,
          password: userDetails.password
        });
      },
      forgotPassword: async userDetails => {
        axios.post(`${authURL}/local/forgotPassword`, {
          username: userDetails.emailAddress
        });
      },
      updateUser: async userDetails => {
        axios.put(`${baseURL}/users/${userDetails.id}`, { userDetails });
      },
      getSystemUsers: async () => axios.get(`${baseURL}/users`)
    };
  },

  files() {
    return {
      createFile: async(payload)=> {
        try{
          var response = await axios.post(`${fileURL}/file_categories`,payload)
          return response
        }catch (err) {
          throw err;
        }
      }
    }
  }
  
};

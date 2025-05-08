import API_ENDPOINTS from "./constants";
import axios from "axios";
//create a api call for user signig in

export const userSignIn =  (email: string, password: string) => {
    return axios.post(API_ENDPOINTS.USER_SIGNING_IN, {
        email,
        password,
    });
}

//create a api call for user signig up
// {
//     "type": "individual",
//     "role": "provider",
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "sample@gmail.com",
//     "password": "12341234",
//     "mobileNumber": "1234567890",
//     "address":{
//     "streetNumber": "123",
//     "streetName": "Main St",
//     "city": "Cityville",
//     "state": "Stateville",
//     "postCode": "12345"
//     }
  
//   }
  
export const userSignUp = (data: any) => {
    return axios.post(API_ENDPOINTS.USER_SIGNING_UP, data);
}

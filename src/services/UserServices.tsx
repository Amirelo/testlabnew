import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {URL_CHANGE_PASSWORD_SERVICE, URL_LOGIN_SERVICE, URL_OTP_SERVICE, URL_REGISTER_SERVICE, URL_VERIFY_OTP_SERVICE} from '../constants/AppConstants';
import ResponseModel from '../models/ResponseModel';
import UserModel from '../models/UserModel';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import appleAuth, { appleAuthAndroid } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId:'610274344138-uoluqacbkkfbrahern8ptulm3f6tik8c.apps.googleusercontent.com',
  scopes:[],
  offlineAccess:true
})

export const UserLogin = async (
  email: string,
  password: string,
  type: string,
) => {
  const data = JSON.stringify({
    email: email,
    password: password,
    role: 'farmer',
    type: type,
  });
  const res = await fetch(URL_LOGIN_SERVICE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
  .then((response) => response.json())
  .then(json => {
    
    return json
  });
  const response = new ResponseModel(res.success,res.message, res?.user)
  console.log("------SERVICE - LOGIN:", response)
  return response;
};

export const userRegister = async(user: UserModel) => {
  const data = JSON.stringify({
    "full_name": user.name,
    "email": user.email,
    "phone": user.phone,
    "password": user.password,
    "role": user.role,
    "business_name": user.business_name,
    "informal_name": user.informal_name,
    "address": user.address,
    "city": user.city,
    "state": user.state,
    "zip_code": user.zip_code,
    "registration_proof": user.registration_proof,
    "business_hours": user.business_hours,
    "device_token": user.device_token,
    "type": user.type,
    "social_id": user.social_id
  })
  const res = await fetch(URL_REGISTER_SERVICE, {
    method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:data
  }).then((response) => response.json()).then((json) => json)
  const response = new ResponseModel(res.success, res.message, res?.user)
  console.log("------SERVICE - REGISTER:", res.message)
  return response
}

export const sendOTP = async(mobile:string) =>{

  const res = await fetch(URL_OTP_SERVICE,{
    method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({mobile: mobile})
  }).then((response) => response.json()).then((json)=> json)
  console.log("------SERVICE - SEND OTP:", res.message)
  const response = new ResponseModel(res.sucess, res.message, res?.user)
  return response
}

export const verifyOTP = async(otp:string) => {
  const res = await fetch(URL_VERIFY_OTP_SERVICE,{
    method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({otp: otp})
  }).then((response) => response.json()).then((json)=> json)
  console.log("------SERVICE - SEND OTP:", res.message)
  const response = new ResponseModel(res.sucess, res.message, res?.user)
  return response
}

export const changePassowrd = async(token:string, password:string, cPassword:string) => {
  const res = await fetch(URL_CHANGE_PASSWORD_SERVICE,{
    method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({token: token, password: password, cpassword:cPassword})
  }).then((response) => response.json()).then((json)=> json)
  console.log("------SERVICE - SEND OTP:", res.message)
  const response = new ResponseModel(res.sucess, res.message, res?.user)
  return response
}

export const userGoogleSignIn = async() => {
  const res = await GoogleSignin.signIn();
  console.log("Google result:", res)
  await GoogleSignin.signOut()
  return res
}

// Facebook login
export const userFacebookLogin = async() => {
  const data = await LoginManager.logInWithPermissions(['public_profile', 'email'])
  const accessToken = await AccessToken.getCurrentAccessToken()

  const result = await fetch('https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token='+accessToken?.accessToken)
  .then((response) => response.json())
  .then((json) => json)

  

  console.log("Facebook Login Result:", result)

  return result
}

export const userAppleLogin = async() => {
  const authRequest = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME,appleAuth.Scope.EMAIL]
  })

  const {identityToken,nonce} =  authRequest
  console.log("Apple Login result:", authRequest)
}
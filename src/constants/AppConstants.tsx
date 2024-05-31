// NAVIGATION
export const NAVIGATION_ONBOARDING = "Onboarding"
export const NAVIGATION_LOGIN = "Login"
export const NAVIGATION_CHANGEPASS = "ChangePass"
export const NAVIGATION_AUTHPASS = "AuthPass"
export const NAVIGATION_SIGNUP = "SignUp"
export const NAVIGATION_FARMINFO = "FarmInfo"
export const NAVIGATION_VERIFICATION = "Verification"
export const NAVIGATION_SIGNUPHOURS = "SignUpHours"
export const NAVIGATION_SIGNUPCONFIRM = "SignUpConfirm"

// SERVICES
export const BASE_URL = "https://sowlab.com/assignment/"
export const URL_LOGIN_SERVICE = BASE_URL + "user/login"
export const URL_REGISTER_SERVICE = BASE_URL + "user/register"
export const URL_OTP_SERVICE = BASE_URL + "user/forgot-password"
export const URL_VERIFY_OTP_SERVICE = BASE_URL + 'user/verify-otp'
export const URL_CHANGE_PASSWORD_SERVICE = BASE_URL +'user/reset-password'

// REGEX

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
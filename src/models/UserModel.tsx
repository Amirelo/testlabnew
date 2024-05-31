class UserModel {
  email: string;
  password: string;
  role: string;
  name: string;
  phone: string;
  device_token: string;
  social_id: string;
  type: string;
  business_name: string;
  informal_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  registration_proof: string;
  business_hours: Array<any>;

  constructor(
    email: string,
    password: string,
    role: string,
    name: string,
    phone: string,
    device_token: string,
    social_id: string,
    type: string,
    business_name: string,
    informal_name: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    registration_proof: string,
    business_hours: Array<any>,
  ) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
    this.phone = phone;
    this.device_token = device_token;
    this.social_id = social_id;
    this.type = type;
    this.business_name = business_name;
    this.informal_name = informal_name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
    this.registration_proof = registration_proof;
    this.business_hours = business_hours;
  }

  setFarmInfo(
    buisness: string,
    nickname: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
  ) {
    this.business_name = buisness;
    this.informal_name = nickname;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip_code = zipcode;
  }

  setRegProof(registration_proof: string) {
    this.registration_proof = registration_proof;
  }
}

export default UserModel;

import get from 'lodash/get';

export default function mappedUserDataWithTemplateUser(apiResponseData: any) {
  const mappedUser = {
    id: get(apiResponseData, 'au_user_id', '8864c717-587d-472a-929a-8e5f298024da-0'),
    displayName: get(apiResponseData, 'au_name', 'Earnki Riddim Admin User'),
    email: get(apiResponseData, 'au_email', 'demo@riddim.cc'),
    password: 'XXXXX',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    phoneNumber: '+40 XXXXX',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: '',
    role: 'admin',
    isPublic: true
  };
  return mappedUser;
}


export  function parseUserDataOfStringType(data: any) {
    const apiResponseData = JSON.parse(data);
    const mappedUser = {
        id: get(apiResponseData, 'id', '8864c717-587d-472a-929a-8e5f298024da-0'),
        displayName: get(apiResponseData, 'displayName', 'Earnki Riddim Admin User'),
        email: get(apiResponseData, 'email', 'demo@riddim.cc'),
        password: 'XXXXX',
        photoURL: '/static/mock-images/avatars/avatar_default.jpg',
        phoneNumber: '+40 XXXXX',
        country: 'United States',
        address: '90210 Broadway Blvd',
        state: 'California',
        city: 'San Francisco',
        zipCode: '94116',
        about: '',
        role: 'admin',
        isPublic: true
      };
      return mappedUser;
   
  }
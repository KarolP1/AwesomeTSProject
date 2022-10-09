export interface IResponseGetMyProfile {
  error: any | undefined;
  message: string | undefined;
  data?: IGetProfileInfo | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IAllergy {
  _id: string;
  ownerId: string;
  allergies: string[];
}

export interface IGetProfileInfo {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  phone_number: string;
  address: IGetAddress[];
  birth_year: string;
  userRole: string;
  documentImages: IGetDocumentImages[];
  jobs: [];
  images?: {profileImageProfile?: IGetImages; backgroundImage?: IGetImages};
  allergies: IAllergy;
}

export interface IGetImages {
  fieldname: string;
  originalname: string;
  encoding: any;
  mimetype: string;
  image?: {
    ownerId: string;
    path: string;
    isImageBackground: boolean;
    _id: string;
  };
}
export interface IGetDocumentImages {
  _id: string;
  path: string;
  ownerId: string;
  isFrontImage: boolean;
}

export interface IGetAddress {
  _id: string;
  country: string;
  city: string;
  street: string;
  postcode: string;
  state: string;
  buildingnumber: string;
}

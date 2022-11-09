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
  allergies?: string[];
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
  userRole:
    | 'End User'
    | 'Student'
    | 'Local Cook'
    | 'Restaurant'
    | 'Food trucks'
    | 'Shop';
  documentImages: IGetDocumentImages[];
  jobs?: IJobsGet[];
  images?: {
    profileImage?: IGetImages;
    backgroundImage?: IGetImages;
  };
  allergies?: IAllergy;
  establishment?: IEstablishment[];
}

export interface IGetImages {
  fieldname: string;
  originalname: string;
  encoding: any;
  mimetype: string;
  path: string;
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

export interface IJobsGet {
  _id: string;
  typeOfWork: IJobTitle;

  workerId?: string;
  workPlace: IJobWorkPlace;
  startOfWork?: string;
  endOfWork?: string;
  isConfirmed?: boolean;
  orders?: [];
}

export interface IJobWorkPlace {
  type: string;
  name: string;
  _id: string;
}

export type IJobTitle = 'waiter' | 'chef' | 'driver' | '';

interface ICuisine {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

export interface IWokringHours {
  hours: {
    open: string;
    close: string;
  };
  day: string;
  _id: string;
}

export interface ILocation {
  type: 'Point';
  coordinates: string[];
  _id?: string;
}

export interface ITable {
  _id?: string;
  tableName: string;
  tableShape: string;
  numberOfPlaces: string;
  numberOfTables: string;
  numberOfTablesAvailable?: string;
}

export interface IEstablishment {
  _id: string;
  type: string;
  name: string;
  owner: IGetProfileInfo;
  location?: ILocation;
  cuisine: ICuisine[];
  openHours?: IWokringHours[];
  address: IGetAddress;
  isVegan: boolean;
  isHalal: boolean;
  isKosher: boolean;
  delivery: {
    isDelivery: boolean;
    isPickup: boolean;
    _id: string;
  };
  menu: [];
  assortment: [];
  tables: ITable[];
  reservations: [];
  image: [];
  counter: {
    _id: string;
    numberOfClicks: number;
    numberOfLikes: number;
    numberOfShares: number;
    whoLike: string[];
    whoShare: string[];
  }[];
  __v: 0;
}

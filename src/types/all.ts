import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Region {
  id: number;
  name: string;
  hidden: boolean;
}

export interface District {
  id: number;
  name: string;
  hidden: boolean;
  region: number;
}

export interface Neighbourhood {
  id: number;
  name: string;
  hidden: boolean;
  districts: number;
}

export enum Country {
  Afghanistan = 'Afghanistan',
  AlandIslands = 'Aland Islands',
  Albania = 'Albania',
  Algeria = 'Algeria',
  AmericanSamoa = 'American Samoa',
  Andorra = 'Andorra',
  Angola = 'Angola',
  Anguilla = 'Anguilla',
  Antarctica = 'Antarctica',
  AntiguaAndBarbuda = 'Antigua And Barbuda',
  Argentina = 'Argentina',
  Armenia = 'Armenia',
  Aruba = 'Aruba',
  Australia = 'Australia',
  Austria = 'Austria',
  Azerbaijan = 'Azerbaijan',
  Bahamas = 'Bahamas',
  Bahrain = 'Bahrain',
  Bangladesh = 'Bangladesh',
  Barbados = 'Barbados',
  Belarus = 'Belarus',
  Belgium = 'Belgium',
  Belize = 'Belize',
  Benin = 'Benin',
  Bermuda = 'Bermuda',
  Bhutan = 'Bhutan',
  Bolivia = 'Bolivia',
  BonaireSintEustatiusSaba = 'Bonaire Sint Eustatius Saba',
  BosniaAndHerzegovina = 'Bosnia And Herzegovina',
  Botswana = 'Botswana',
  BouvetIsland = 'Bouvet Island',
  Brazil = 'Brazil',
  BritishIndianOceanTerritory = 'British Indian Ocean Territory',
  BruneiDarussalam = 'Brunei Darussalam',
  Bulgaria = 'Bulgaria',
  BurkinaFaso = 'Burkina Faso',
  Burundi = 'Burundi',
  Cambodia = 'Cambodia',
  Cameroon = 'Cameroon',
  Canada = 'Canada',
  CapeVerde = 'Cape Verde',
  CaymanIslands = 'Cayman Islands',
  CentralAfricanRepublic = 'Central African Republic',
  Chad = 'Chad',
  Chile = 'Chile',
  China = 'China',
  ChristmasIsland = 'Christmas Island',
  CocosKeelingIslands = 'Cocos Keeling Islands',
  Colombia = 'Colombia',
  Comoros = 'Comoros',
  Congo = 'Congo',
  CongoDemocraticRepublic = 'Congo Democratic Republic',
  CookIslands = 'Cook Islands',
  CostaRica = 'Costa Rica',
  CoteDIvoire = 'Cote D Ivoire',
  Croatia = 'Croatia',
  Cuba = 'Cuba',
  Curacao = 'Curacao',
  Cyprus = 'Cyprus',
  CzechRepublic = 'Czech Republic',
  Denmark = 'Denmark',
  Djibouti = 'Djibouti',
  Dominica = 'Dominica',
  DominicanRepublic = 'Dominican Republic',
  Ecuador = 'Ecuador',
  Egypt = 'Egypt',
  ElSalvador = 'ElSalvador',
  EquatorialGuinea = 'Equatorial Guinea',
  Eritrea = 'Eritrea',
  Estonia = 'Estonia',
  Ethiopia = 'Ethiopia',
  FalklandIslands = 'Falkland Islands',
  FaroeIslands = 'Faroe Islands',
  Fiji = 'Fiji',
  Finland = 'Finland',
  France = 'France',
  FrenchGuiana = 'French Guiana',
  FrenchPolynesia = 'French Polynesia',
  FrenchSouthernTerritories = 'French Southern Territories',
  Gabon = 'Gabon',
  Gambia = 'Gambia',
  Georgia = 'Georgia',
  Germany = 'Germany',
  Ghana = 'Ghana',
  Gibraltar = 'Gibraltar',
  Greece = 'Greece',
  Greenland = 'Greenland',
  Grenada = 'Grenada',
  Guadeloupe = 'Guadeloupe',
  Guam = 'Guam',
  Guatemala = 'Guatemala',
  Guernsey = 'Guernsey',
  Guinea = 'Guinea',
  GuineaBissau = 'Guinea Bissau',
  Guyana = 'Guyana',
  Haiti = 'Haiti',
  HeardIslandMcdonaldIslands = 'Heard Island Mcdonald Islands',
  HolySeeVaticanCityState = 'Holy See Vatican City State',
  Honduras = 'Honduras',
  HongKong = 'Hong Kong',
  Hungary = 'Hungary',
  Iceland = 'Iceland',
  India = 'India',
  Indonesia = 'Indonesia',
  Iran = 'Iran',
  Iraq = 'Iraq',
  Ireland = 'Ireland',
  IsleOfMan = 'IsleOfMan',
  Other = 'Other',
  Italy = 'Italy',
  Jamaica = 'Jamaica',
  Japan = 'Japan',
  Jersey = 'Jersey',
  Jordan = 'Jordan',
  Kazakhstan = 'Kazakhstan',
  Kenya = 'Kenya',
  Kiribati = 'Kiribati',
  Korea = 'Korea',
  KoreaDemocraticPeoplesRepublic = 'Korea Democratic Peoples Republic',
  Kuwait = 'Kuwait',
  Kyrgyzstan = 'Kyrgyzstan',
  LaoPeoplesDemocraticRepublic = 'Lao Peoples Democratic Republic',
  Latvia = 'Latvia',
  Lebanon = 'Lebanon',
  Lesotho = 'Lesotho',
  Liberia = 'Liberia',
  LibyanArabJamahiriya = 'Libyan Arab Jamahiriya',
  Liechtenstein = 'Liechtenstein',
  Lithuania = 'Lithuania',
  Luxembourg = 'Luxembourg',
  Macao = 'Macao',
  Macedonia = 'Macedonia',
  Madagascar = 'Madagascar',
  Malawi = 'Malawi',
  Malaysia = 'Malaysia',
  Maldives = 'Maldives',
  Mali = 'Mali',
  Malta = 'Malta',
  MarshallIslands = 'Marshall Islands',
  Martinique = 'Martinique',
  Mauritania = 'Mauritania',
  Mauritius = 'Mauritius',
  Mayotte = 'Mayotte',
  Mexico = 'Mexico',
  Micronesia = 'Micronesia',
  Moldova = 'Moldova',
  Monaco = 'Monaco',
  Mongolia = 'Mongolia',
  Montenegro = 'Montenegro',
  Montserrat = 'Montserrat',
  Morocco = 'Morocco',
  Mozambique = 'Mozambique',
  Myanmar = 'Myanmar',
  Namibia = 'Namibia',
  Nauru = 'Nauru',
  Nepal = 'Nepal',
  Netherlands = 'Netherlands',
  NewCaledonia = 'New Caledonia',
  NewZealand = 'New Zealand',
  Nicaragua = 'Nicaragua',
  Niger = 'Niger',
  Nigeria = 'Nigeria',
  Niue = 'Niue',
  NorfolkIsland = 'Norfolk Island',
  NorthernMarianaIslands = 'Northern Mariana Islands',
  Norway = 'Norway',
  Oman = 'Oman',
  Pakistan = 'Pakistan',
  Palau = 'Palau',
  Palestine = 'Palestine',
  Panama = 'Panama',
  PapuaNewGuinea = 'Papua New Guinea',
  Paraguay = 'Paraguay',
  Peru = 'Peru',
  Philippines = 'Philippines',
  Pitcairn = 'Pitcairn',
  Poland = 'Poland',
  Portugal = 'Portugal',
  PuertoRico = 'PuertoRico',
  Qatar = 'Qatar',
  Reunion = 'Reunion',
  Romania = 'Romania',
  RussianFederation = 'Russian Federation',
  Rwanda = 'Rwanda',
  SaintBarthelemy = 'Saint Barthelemy',
  SaintHelena = 'Saint Helena',
  SaintKittsAndNevis = 'Saint Kitts AndNevis',
  SaintLucia = 'Saint Lucia',
  SaintMartin = 'Saint Martin',
  SaintPierreAndMiquelon = 'Saint Pierre And Miquelon',
  SaintVincentAndGrenadines = 'Saint Vincent And Grenadines',
  Samoa = 'Samoa',
  SanMarino = 'San Marino',
  SaoTomeAndPrincipe = 'Sao Tome And Principe',
  SaudiArabia = 'Saudi Arabia',
  Senegal = 'Senegal',
  Serbia = 'Serbia',
  Seychelles = 'Seychelles',
  SierraLeone = 'SierraLeone',
  Singapore = 'Singapore',
  SintMaarten = 'Sint Maarten',
  Slovakia = 'Slovakia',
  Slovenia = 'Slovenia',
  SolomonIslands = 'Solomon Islands',
  Somalia = 'Somalia',
  SouthAfrica = 'South Africa',
  SouthGeorgiaAndSandwichIsl = 'South Georgia And SandwichIsl',
  SouthSudan = 'South Sudan',
  Spain = 'Spain',
  SriLanka = 'Sri Lanka',
  Sudan = 'Sudan',
  Suriname = 'Suriname',
  SvalbardAndJanMayen = 'Svalbard And JanMayen',
  Swaziland = 'Swaziland',
  Sweden = 'Sweden',
  Switzerland = 'Switzerland',
  SyrianArabRepublic = 'Syrian Arab Republic',
  Taiwan = 'Taiwan',
  Tajikistan = 'Tajikistan',
  Tanzania = 'Tanzania',
  Thailand = 'Thailand',
  TimorLeste = 'Timor Leste',
  Togo = 'Togo',
  Tokelau = 'Tokelau',
  Tonga = 'Tonga',
  TrinidadAndTobago = 'Trinidad And Tobago',
  Tunisia = 'Tunisia',
  Turkey = 'Turkey',
  Turkmenistan = 'Turkmenistan',
  TurksAndCaicosIslands = 'TurksAndCaicosIslands',
  Tuvalu = 'Tuvalu',
  Uganda = 'Uganda',
  Ukraine = 'Ukraine',
  UnitedArabEmirates = 'United Arab Emirates',
  UnitedKingdom = 'United Kingdom',
  UnitedStates = 'United States',
  UnitedStatesOutlyingIslands = 'United States Outlying Islands',
  Uruguay = 'Uruguay',
  Uzbekistan = 'Uzbekistan',
  Vanuatu = 'Vanuatu',
  Venezuela = 'Venezuela',
  Vietnam = 'Vietnam',
  VirginIslandsBritish = 'Virgin Islands British',
  VirginIslandsUS = 'Virgin Islands US',
  WallisAndFutuna = 'Wallis And Futuna',
  WesternSahara = 'Western Sahara',
  Yemen = 'Yemen',
  Zambia = 'Zambia',
  Zimbabwe = 'Zimbabwe'
}

export enum MimeType {
  PNG = "png",
  JPG = "jpg",
  PDF = "pdf",
}

export enum oredrStatus {
  PENDING = "pending",
  UNDER_REVIEW = "under review",
  COMPLETED = "completed",
  REJECTED= "rejected"
}

export type InsurancePackage = {
  id?: number;
  name: string;
  timeUnit: "day" | "week" | "month" | "year";
  period: number;
  prices: PriceRange[];
};

export type PriceRange = {
  minAge: number;
  maxAge: number;
  price: number;
};


export type PassportFile = {
  name: string; // Taken from the uploaded file name
  mimetype: string; // Taken from the uploaded file type
  data: string; // Taken from the uploaded file after converting to Base64
}

export type ReceiptFile = {
  name: string; // Taken from the uploaded file name
  mimetype: string; // Taken from the uploaded file type
  data: string; // Taken from the uploaded file after converting to Base64
}

export type PersonInfo = {
  nat: Country; // Taken from user input
  dob: Date; // Taken from user input
  passport: number;  // ID of passport file, Will be added after storing the file into DB
  name: string,
  email: string,
  phone: string
}

export type InsuranceApplication = {
  region: number | null; // ID of Region, taken from select box
  district: number | null; // ID of district, taken from select box
  neighbourhood: number | null; // ID of neighbourhood, taken from select box
  street: string; // Taken from user input
  building: string; // Taken from user input
  appartment: string; // Taken from user input
  plan: string; // Taken from user input
  price: number | null; // Taken from user input
}

export type InsuranceOrder = {
  trackCode: string; // Will be generated and must be unique in the DB
  personInfo: number; // ID of PersonInfo, Will be added after storing personInfo into DB
  insuranceApplication: number; // ID of InsuranceApplication, Will be added after storing InsuranceApplication into DB
  receipt: number; // ID of ReceiptFile, Will be added after storing Receipt file into DB
}

export type PlanWithPrice = {
  id: number;
  name: string;
  timeUnit: "day" | "week" | "month" | "year";
  period: number;
  price: number | null; // null if no matching price for age
};

export type InsuranceOrderDetails = {
  id: number; // insurance_order table
  trackCode: string; // insurance_order table
  status: string; // insurance_order table
  price: number | null; // insurance_application table
  plan: string; // insurance_application table
  finish_date?: string; // insurance_order table
  msg?: string; // insurance_order table
  created_at: Timestamp; // insurance_order table
}


export type BankInfo = {
  id: number;
  name: string;
  bank: string;
  tiban: string;
  diban: string;
  eiban: string;
};


export interface OrderDetails {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  trackcode: string;
  msg?: string;
  user: { name: string; nationality: string; dob: string };
  contact: { email: string; phone: string };
  plan: { name: string; price: string };
  location: {
    region: string;
    district: string;
    neighbourhood: string;
    street: string;
    buildingNo: string;
    apartmentNo: string;
  };
}

export type AgentInfo = {
    id: number;
    agent_name: string;
    lvl: number;
    percent: number;
    url: string;
    active: boolean;
    created_at: string;

    // parent?: {
    //     id: number;
    //     name: string;
    // } | null;

    user: {
        id: number;
        email: string;
        name: string;
        created_at: string;
    };

    image?: {
        id: number;
        name: string;
        mimetype: string;
        data: string;
    } | null;
};

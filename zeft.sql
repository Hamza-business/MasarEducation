CREATE TYPE public."countries" AS ENUM ('Afghanistan','Aland Islands','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antarctica','Antigua And Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bonaire Sint Eustatius Saba','Bosnia And Herzegovina','Botswana','Bouvet Island','Brazil','British Indian Ocean Territory','Brunei Darussalam','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Cayman Islands','Central African Republic','Chad','Chile','China','Christmas Island','Cocos Keeling Islands','Colombia','Comoros','Congo','Congo Democratic Republic','Cook Islands','Costa Rica','Cote D Ivoire','Croatia','Cuba','Curacao','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','ElSalvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Guiana','French Polynesia','French Southern Territories','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe','Guam','Guatemala','Guernsey','Guinea','Guinea Bissau','Guyana','Haiti','Heard Island Mcdonald Islands','Holy See Vatican City State','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','IsleOfMan','Other','Italy','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kiribati','Korea','Korea Democratic Peoples Republic','Kuwait','Kyrgyzstan','Lao Peoples Democratic Republic','Latvia','Lebanon','Lesotho','Liberia','Libyan Arab Jamahiriya','Liechtenstein','Lithuania','Luxembourg','Macao','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Martinique','Mauritania','Mauritius','Mayotte','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Niue','Norfolk Island','Northern Mariana Islands','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Pitcairn','Poland','Portugal','PuertoRico','Qatar','Reunion','Romania','Russian Federation','Rwanda','Saint Barthelemy','Saint Helena','Saint Kitts AndNevis','Saint Lucia','Saint Martin','Saint Pierre And Miquelon','Saint Vincent And Grenadines','Samoa','San Marino','Sao Tome And Principe','Saudi Arabia','Senegal','Serbia','Seychelles','SierraLeone','Singapore','Sint Maarten','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Georgia And SandwichIsl','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Svalbard And JanMayen','Swaziland','Sweden','Switzerland','Syrian Arab Republic','Taiwan','Tajikistan','Tanzania','Thailand','Timor Leste','Togo','Tokelau','Tonga','Trinidad And Tobago','Tunisia','Turkey','Turkmenistan','TurksAndCaicosIslands','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','United States Outlying Islands','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vietnam','Virgin Islands British','Virgin Islands US','Wallis And Futuna','Western Sahara','Yemen','Zambia','Zimbabwe')
CREATE TYPE public."mimeTypes" AS ENUM ('png', 'jpg', 'pdf')
CREATE TYPE public."oredrStatus" AS ENUM ('pending', 'under review', 'completed', 'rejected')
CREATE TYPE "public"."timeunits" AS ENUM ('day', 'week', 'month', 'year')


-- Files Schema
CREATE TABLE "files"."passports" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" text NOT NULL,
  "mimetype" text NOT NULL,
  "data" text NOT NULL
);

CREATE TABLE "files"."insurance_reports" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" text NOT NULL,
  "mimetype" text NOT NULL,
  "data" text NOT NULL
);

CREATE TABLE "files"."receipts" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" text NOT NULL,
  "mimetype" text NOT NULL,
  "data" text NOT NULL
);

CREATE TABLE "files"."insurance_files" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" integer NOT NULL,
  "name" text NOT NULL,
  "mimetype" text NOT NULL,
  "data" text NOT NULL,
  CONSTRAINT "order" FOREIGN KEY ("order") REFERENCES "insurances"."insurance_order" ("id")
);


-- Locations Schema
CREATE TABLE "locations"."countries" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" countries NOT NULL,
  "hidden" boolean DEFAULT false,
  CONSTRAINT "uni" UNIQUE ("name", "id")
);

CREATE TABLE "locations"."regions" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "country" integer NOT NULL,
  "name" text NOT NULL,
  "hidden" boolean DEFAULT false,
  CONSTRAINT "country" FOREIGN KEY ("country") REFERENCES "locations"."countries" ("id") ON DELETE CASCADE
);

CREATE TABLE "locations"."districts" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "region" integer NOT NULL,
  "name" text NOT NULL,
  "hidden" boolean DEFAULT false,
  CONSTRAINT "region" FOREIGN KEY ("region") REFERENCES "locations".regions ("id") ON DELETE CASCADE
);

CREATE TABLE "locations"."neighbourhoods" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "districts" integer NOT NULL,
  "name" text NOT NULL,
  "hidden" boolean DEFAULT false,
  CONSTRAINT "districts" FOREIGN KEY ("districts") REFERENCES "locations".districts ("id") ON DELETE CASCADE
);


-- Services Schema
CREATE TABLE "services"."insurances" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" text NOT NULL,
  "period" integer NOT NULL,
  "timeUnit" timeunits NOT NULL,
  "active" boolean DEFAULT true,
  CONSTRAINT "positive" CHECK (period > 0)
);

CREATE TABLE "services"."insurance_prices" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "insurance" integer NOT NULL,
  "minAge" integer NOT NULL,
  "maxAge" integer NOT NULL,
  "price" integer NOT NULL,
  CONSTRAINT "positive_price" CHECK (price >= 0),
  CONSTRAINT "positive_ages" CHECK ("minAge" >= 0 AND "maxAge" >= 0),
  CONSTRAINT "age_order" CHECK ("maxAge" > "minAge"),
  
  CONSTRAINT "insurance" FOREIGN KEY ("insurance") REFERENCES "services"."insurances" ("id")
);


-- Insurances Schema
CREATE TABLE "insurances"."personinfo" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "nat" text NOT NULL,
  "dob" date NOT NULL,
  "passport" integer NOT NULL,
  CONSTRAINT "passport" FOREIGN KEY ("passport") REFERENCES "files"."passports" ("id")
);

CREATE TABLE "insurances"."insurance_application" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "region" integer NOT NULL,
  "district" integer NOT NULL,
  "neighbourhood" integer NOT NULL,
  "street" text NOT NULL,
  "building" text NOT NULL,
  "appartment" text NOT NULL,
  "plan" text NOT NULL,
  "price" integer NOT NULL,
  CONSTRAINT "region" FOREIGN KEY ("region") REFERENCES "locations"."regions" ("id"),
  CONSTRAINT "district" FOREIGN KEY ("district") REFERENCES "locations"."districts" ("id"),
  CONSTRAINT "neighbourhood" FOREIGN KEY ("neighbourhood") REFERENCES "locations"."neighbourhoods" ("id")
);

CREATE TABLE "insurances"."insurance_order" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "status" public."oredrStatus" NOT NULL DEFAULT 'pending',
  "track_code" text NOT NULL UNIQUE,
  "personinfo" integer NOT NULL,
  "insurance_application" integer NOT NULL,
  "receipt" integer NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "finish_date" date,
  "msg": text,
  CONSTRAINT "personinfo" FOREIGN KEY ("personinfo") REFERENCES "insurances"."personinfo" ("id"),
  CONSTRAINT "insurance_application" FOREIGN KEY ("insurance_application") REFERENCES "insurances"."insurance_application" ("id"),
  CONSTRAINT "receipt" FOREIGN KEY ("receipt") REFERENCES "files"."receipts" ("id")
)














CREATE TABLE "public"."bank" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" text NOT NULL,
  "bank" text NOT NULL,
  "tiban" text NOT NULL,
  "diban" text NOT NULL,
  "eiban" text NOT NULL
)
-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "food_inspection" (
    "key" serial   NOT NULL,
    "inspection_id" varchar   NOT NULL,
    "dba_name" varchar   NOT NULL,
    "facility_type" varchar   NOT NULL,
    "risk" varchar   NOT NULL,
    "address" varchar   NOT NULL,
    "city" varchar   NOT NULL,
    "state" varchar   NOT NULL,
    "zip" int   NOT NULL,
    "inspection_date" date   NOT NULL,
    "inspection_type" varchar   NOT NULL,
    "results" varchar   NOT NULL,
    "violations" varchar   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "location" varchar   NOT NULL,
    CONSTRAINT "pk_food_inspection" PRIMARY KEY (
        "key"
     )
);


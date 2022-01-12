# Import functions
from flask import Flask
from flask import render_template 
from flask import jsonify
from flask import send_from_directory
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
from sqlalchemy import cast
from sqlalchemy import String
import json

# # Define the database connection parameters
# username = 'postgres'  # Ideally this would come from config.py (or similar)
# password = 'bootcamp'  # Ideally this would come from config.py (or similar)
# database_name = 'food_inspection_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
# connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'
# another way for connection string
connection_string = "postgres:bootcamp@localhost:5432/food_inspection_db"

# Connect to the database
# engine = create_engine(connection_string)
# base = automap_base()
# base.prepare(engine, reflect=True)
engine = create_engine(f'postgresql://{connection_string}')
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
table = base.classes.food_inspection

# Instantiate the Flask application
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def IndexRoute():

    webpage = render_template("index.html")
    return webpage

@app.route("/api")
def DictionaryRoute():
    
    # Query database
    session = Session(engine)
    table_data = session.query(table.inspection_id, table.dba_name, table.facility_type, table.risk, table.address, table.city, table.state, table.zip, table.inspection_date, table.inspection_type, table.results, table.violations, table.latitude, table.longitude, table.location).all()
    session.close()
    
    # Create a list of dictionaries

    all_inspections = []

    for inspection_id, dba_name, facility_type, risk, address, city, state, zip, inspection_date, inspection_type, results, violations, latitude, longitude, location in table_data:
        dict = {}
        dict["inspection_id"] = inspection_id
        dict["dba_name"] = dba_name
        dict["facility_type"] = facility_type
        dict["risk"] = risk
        dict["address"] = address
        dict["city"] = city
        dict["state"] = state
        dict["zip"] = zip
        dict["inspection_date"] = inspection_date
        dict["inspection_type"] = inspection_type
        dict["results"] = results
        dict["violations"] = violations
        dict["latitude"] = latitude
        dict["longitude"] = longitude
        dict["location"] = location
        all_inspections.append(dict)

    # Return results
    return jsonify(all_inspections)

@app.route("/api/<vID>/<vName>/<vType>/<vRisk>/<vResults>")

# Filter examples:

# /api/%/CHIPOTLE/%/%/%  =   returns all inspections for places named "Chipotle"
# /api/%/chip/restaurant/3/pass   =   returns all places containing "chip" where the type contains "restaurant" and the risk level contains "3" and the results includes "pass"
# /api/%/%/restaurant/%/fail   =   returns all places where the type contains "restaurant" and the results includes "fail"

def FilteredRoute(vID="%",vName="%",vType="%",vRisk="%",vResults="%"):

    # Query database
    session = Session(engine)
    table_data = session.query(table.inspection_id, table.dba_name, table.facility_type, table.risk, table.address, table.city, table.state, table.zip, table.inspection_date, table.inspection_type, table.results, table.violations, table.latitude, table.longitude, table.location)\
        .filter(table.inspection_id.ilike(f"%{vID}%"))\
        .filter(table.dba_name.ilike(f"%{vName}%"))\
        .filter(table.facility_type.ilike(f"%{vType}%"))\
        .filter(table.risk.ilike(f"%{vRisk}%"))\
        .filter(table.results.ilike(f"%{vResults}%"))\
        .limit(500).all()
    session.close()

    # Create a list of dictionaries

    filtered_inspections = []

    for inspection_id, dba_name, facility_type, risk, address, city, state, zip, inspection_date, inspection_type, results, violations, latitude, longitude, location in table_data:
        dict = {}
        dict["inspection_id"] = inspection_id
        dict["dba_name"] = dba_name
        dict["facility_type"] = facility_type
        dict["risk"] = risk
        dict["address"] = address
        dict["city"] = city
        dict["state"] = state
        dict["zip"] = zip
        dict["inspection_date"] = inspection_date
        dict["inspection_type"] = inspection_type
        dict["results"] = results
        dict["violations"] = violations
        dict["latitude"] = latitude
        dict["longitude"] = longitude
        dict["location"] = location
        filtered_inspections.append(dict)



    # Return results
    return jsonify(filtered_inspections)    

if __name__ == '__main__':
    app.run(debug=True)
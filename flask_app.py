# Import functions
from flask import Flask
from flask import render_template 
from flask import jsonify
from flask import send_from_directory
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import json

# Define the database connection parameters
username = 'postgres'  # Ideally this would come from config.py (or similar)
password = 'bootcamp'  # Ideally this would come from config.py (or similar)
database_name = 'food_inspection_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
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
    table_data = session.query(table.dba_name, table.facility_type, table.risk, table.address, table.inspection_date, table.inspection_type, table.results, table.violations, table.location).all()
    session.close()
    
    # Create a list of dictionaries

    all_inspections = []

    for dba_name, facility_type, risk, address, inspection_date, inspection_type, results, violations, location in table_data:
        dict = {}
        dict["dba_name"] = dba_name
        dict["facility_type"] = facility_type
        dict["risk"] = risk
        dict["address"] = address
        dict["inspection_date"] = inspection_date
        dict["inspection_type"] = inspection_type
        dict["results"] = results
        dict["violations"] = violations
        dict["location"] = location
        all_inspections.append(dict)

    # Return results
    return jsonify(all_inspections)

if __name__ == '__main__':
    app.run(debug=True)
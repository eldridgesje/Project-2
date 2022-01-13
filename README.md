# Project-2
A shared repo for Project 2 (Group 3) in the Northwestern Data Science Bootcamp

## Team Members
* Ishin Yavuz
* James Hurley
* Stephen Eldridge


## Project Summary

This project utilizes data from the Chicago Food Inspections department which is available from 'www.kaggle.com'.  The goal was to produce a webpage that would allow the user to interactively access and explore Chicago's food inspection data in ways that could inform the user of the safest places to eat and distinguish health risk among various facility types or food chains.  In order to accomplish this, the user is offered serveral ways of filtering data, selecting map layer controls, clicking on markers, or hovering over graphic illustration for information.

After downloading data from 'www.kaggle.com' in the form of a '.csv' file, 'python' was used to select the most recent data, filter out unneeded columns, and eliminated non-conforming data.  Using 'pgAdmin', 'postgresSQL' was used to load data and provide an endpoint to a 'flask' server.  Presentation coding was accomplished with 'html', 'css' and 'javascript'.  The interactive map was accomplished with 'Leaflet' programming while a bar graph was served up using 'plotly'.  A "donut" style pie chart, that used the '**************'  'javascript' library, was added as an example of 'javascript' coding not covered in class.


## Starting Data

The `Resources` folder contains the file `updated_food_inspection.csv`, which can be used to create the PostgreSQL database. To generate this file from publicly available data, follow these steps:

1. Download the CSV `food-inspection.csv` from `https://www.kaggle.com/chicago/chicago-food-inspections/`.
2. Place the CSV in the `Resources` folder.
3. From the project folder, launch a Jupter Notebook.
4. Open `food_inspection.ipynb`.
5. Run all cells.


## Create the Database

1. Open pgAdmin 4.
2. Create a new database called `food_inspection_db`.
3. Open `food_inspection_db_starter.sql`.
4. Open a query window for your database.
5. Copy the code contained in `food_inspection_db_starter.sql` into the query window and run it.
6. Select the `food_inspection` table and go to the `Tools` menu and select `Import/Export`.
    * Set the Import/Export toggle to `Import`.
    * Select the file `Resources\updated_food_inspection.csv`.
    * Set the Header toggle to `Yes`.
    * Set the Delimiter to `,`.
    * Ensure the Quote is set to `"`.
    * Set the Escape to `~`.
    * On the Columns tab, remove `key` from the Columns to export.
    * Press the `OK` button.


## Start the Flask Server

1. Open `flask_app.py`.
2. Set the `username` and `password` variables to your pgAdmin 4 username and password. Then save and exit.
3. Run `flask_app.py` to start the Flask server.
4. Take note of the local host address Python returns.


## Use the Dashboard

1. In your web browser, go to the local host address you noted above.
2. The website will initially load with the most recent 500 records from the database. Functionality is as follows:
    * You can search by `ID`, `Name`, `Facility Type`, `Risk Level`, and `Results` in the left-hand filter.
        * Search results are also limited to the most recent 500 records.
        * Search uses partial-match filtering to return results.
        * Search results power the map, donut chart, and table.
        * Search results can be easily cleared using the `Rest Data` button.
    * You can click on any result in the map to see the facility's name, address, and inspection ID.
        * Inspection ID can then be used in the filter to find full information for a single facility in the table.
    * You can turn on and off facility risk layers in the map's layer stack control, e.g. to display only low-risk facilities.
    * You can use the donut chart to see inspection results for a group fo related facilities, e.g. all "Chipotle" franchises, using the filter.
        * Hovering over a region on the chart gives you the full count of facilities matching that result.
    * You can obtain the full data set using the `Full data in JSON format` link in the footer.

# Project-2
A shared repo for Project 2 (Group 3) in the Northwestern Data Science Bootcamp

## Team Members
* Ishin Yavuz
* James Hurley
* Stephen Eldridge

## Project Goal

To inform users of the safest places to eat by allowing them to research food inspection data for Chicago, including individual facilties or groups of facilities (e.g., schools, restaurant chains, facilities passing inspection).

## Project Summary

This project establishes a responsive html dashboard (designed using Bootstrap CSS) that allows the user to interactively access and explore Chicago's food inspection data. The dashboard is powered by data from the Chicago Food Inspections department, sourced from [Kaggle](https://www.kaggle.com/chicago/chicago-food-inspections/).

### Dashboard elements
* An interactive search filter (created in HTML, CSS, and Javascript)
    * Search across several fields based on a customized API call
    * Automatic updating of all visualizations on the page based on filtered results
    * A reset button to easily return the dashboard to the default data set
    * Returns limited to 500 results to prevent long page loads
* A map of facilities inspected (created in Javascript using Leaflet)
    * Three selectable marker layers for different facility risk levels
    * Legend with current count of markers in each risk level
    * Markers that provide additional information when clicked
* A donut chart of inspections results (created in Javascript using Charts.JS)
    * Hover text with region names and values
    * Total number of facilites in current filter
* A horizontal bar graph of facility type (created in Javascript using Plot.ly)
    * Hover text with region names and values
* A table of detailed inspection information (created in HTML, CSS, and Javscript)
* A link to the full dataset in JSON format (created in Flask)
    * One year of the most recent inspection results on record for a given facility as of 12/4/19 (cleaned in a Jupyter Notebook using Python)
* Background photo by Francisco Suarez, at [unsplash.com](https://unsplash.com/@fsuarez)

***

## Directions

### Clean the Data (optional)

The `Resources` folder contains the file `updated_food_inspection.csv`, which can be used to create the PostgreSQL database. If you wish to generate this file yourself from publicly available data, follow these steps:

1. Download the CSV `food-inspection.csv` from [Kaggle](https://www.kaggle.com/chicago/chicago-food-inspections/).
2. Place the CSV in the `Resources` folder.
3. From the project folder, launch a Jupter Notebook.
4. Open `food_inspection.ipynb`.
5. Run all cells.


### Create the Database

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


### Start the Flask Server

1. Open `flask_app.py`.
2. Set the `username` and `password` variables to your pgAdmin 4 username and password. Then save and exit.
3. Run `flask_app.py` to start the Flask server.
4. Take note of the local host address Python returns.


### Use the Dashboard

1. In your web browser, go to the local host address you noted above.
2. Make more informed decisions about eating in Chicago.
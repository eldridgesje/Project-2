# Project-2
A shared repo for Project 2 (Group 3) in the Northwestern Data Science Bootcamp

# Starting Data

The `Resources` folder contains the file `updated_food_inspection.csv`, which can be used to create the PostgreSQL database. To generate this file from publicly available data, follow these steps:

1. Download the CSV `food-inspection.csv` from `https://www.kaggle.com/chicago/chicago-food-inspections/`.
2. Place the CSV in the `Resources` folder.
3. From the project folder, launch a Jupter Notebook.
4. Open `food_inspection.ipynb`.
5. Run all cells.


# Create the Database

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




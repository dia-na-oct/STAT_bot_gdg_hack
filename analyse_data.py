from datetime import datetime
import pandas as pd

# Read the CSV file
file = pd.read_csv('statbot/activities.csv')

# Sort the 'online' column in descending order (largest to smallest)
sorted_online = file['nb_active'].sort_values(ascending=False)

# Select the top 3 rows (including all columns)
top_3_online = file.iloc[sorted_online.index[:3]]

# Access the 'tempsemp',online column of the top 3 rows
tempsemp_values = top_3_online[['date','nb_active']]

# Print the results
print("Values from the 'tempsemp,online column of the top 3 rows:")
print(tempsemp_values)

data_prompt='best hours time are:'

for i in range(3):

    datetime_obj = datetime.strptime(tempsemp_values.iloc[i,0], "%Y-%m-%dT%H:%M:%S.%fZ")

    # Extract the hour, minute, and second
    hour = datetime_obj.hour
    minute = datetime_obj.minute
    data_prompt += str(hour) + ':' + str(minute) + ' with ' + str(tempsemp_values.iloc[i,1]) + ' participants ,' 

print(data_prompt)

# Flask:
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/get_data_prompt")
def get_data_prompt():
    # Generate or fetch data_prompt
    return jsonify({"data_prompt": data_prompt})

if __name__ == "__main__":
    app.run(port=5001)





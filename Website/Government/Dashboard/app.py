from flask import Flask, request, jsonify, send_file
import json
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Apply CORS to your app


# Serve your HTML page
@app.route('/')
def index():
    return send_file('dashboard.html')
    # return send_file('../all-students.html')

# Return analytics data as a two-dimensional array
@app.route('/get_data', methods=['GET'])
def get_analytics_data():
    # Read the CSV file into a DataFrame
    df = pd.read_csv('../../../Datasets/common pool data.csv')

    # Perform the analysis
    gender_counts = df['gender'].value_counts().to_dict()   
    class_counts = df['class'].value_counts().to_dict()
    caste_counts = df['community'].value_counts().to_dict()
    reason_counts = df['discontinueReason'].value_counts().to_dict()
    school_counts = df['school'].value_counts().to_dict()
    district_counts = df['district'].value_counts().to_dict()
    schooltype_counts = df['schoolType'].value_counts().to_dict()

    # Create arrays for gender and class data
    gender_data = list(gender_counts.values())
    class_data = list(class_counts.values())
    caste_data = list(caste_counts.values())
    reason_data = list(reason_counts.values())
    school_data = list(school_counts.values())
    district_data = list(district_counts.values())
    schooltype_data = list(schooltype_counts.values())

    # Organize data into the desired format
    analytics_array = [
        [['Male', 'Female'], gender_data],
        [list(class_counts.keys()), class_data],
        [list(caste_counts.keys()), caste_data],
        [list(reason_counts.keys()), reason_data],
        [list(school_counts.keys()), school_data],
        [list(district_counts.keys()), district_data],
        [list(schooltype_counts.keys()), schooltype_data]
    ]

    return jsonify(analytics_array)

# Return custom data
@app.route('/custom_data', methods=['POST'])
def get_custom_data():
    data_from_js = json.loads(request.data.decode('utf-8'))
    print(data_from_js)
    df = pd.read_csv('../../../Datasets/common pool data.csv')

    df =  df[df[data_from_js[1]]==data_from_js[0]]
    print(df)
    if (data_from_js[1]=="gender"):
        class_counts = df['class'].value_counts().to_dict()
        caste_counts = df['community'].value_counts().to_dict()
        reason_counts = df['discontinueReason'].value_counts().to_dict()
        school_counts = df['school'].value_counts().to_dict()
        district_counts = df['district'].value_counts().to_dict()
        schooltype_counts = df['schoolType'].value_counts().to_dict()

        class_data = list(class_counts.values())
        caste_data = list(caste_counts.values())
        reason_data = list(reason_counts.values())
        school_data = list(school_counts.values())
        district_data = list(district_counts.values())
        schooltype_data = list(schooltype_counts.values())

        analytics_array = [
            [[list(class_counts.keys()), class_data],
            [list(caste_counts.keys()), caste_data],
            [list(reason_counts.keys()), reason_data],
            [list(school_counts.keys()), school_data],
            [list(district_counts.keys()), district_data],
            [list(schooltype_counts.keys()), schooltype_data]],
            ["Class","Caste","Reason","School","District","School Type"]
        ]
        return jsonify(analytics_array)
    
    elif(data_from_js[1]=="district"):
        gender_counts = df['class'].value_counts().to_dict()
        class_counts = df['class'].value_counts().to_dict()
        caste_counts = df['community'].value_counts().to_dict()
        reason_counts = df['discontinueReason'].value_counts().to_dict()
        school_counts = df['school'].value_counts().to_dict()
        schooltype_counts = df['schoolType'].value_counts().to_dict()

        gender_data = list(gender_counts.values())
        class_data = list(class_counts.values())
        caste_data = list(caste_counts.values())
        reason_data = list(reason_counts.values())
        school_data = list(school_counts.values())
        schooltype_data = list(schooltype_counts.values())

        analytics_array = [
            [[['Male', 'Female'], gender_data],
            [list(class_counts.keys()), class_data],
            [list(caste_counts.keys()), caste_data],
            [list(reason_counts.keys()), reason_data],
            [list(school_counts.keys()), school_data],
            [list(schooltype_counts.keys()), schooltype_data]],
            ["Gender","Class","Caste","Reason","School","School Type"]

        ]
        return jsonify(analytics_array)
    
    elif(data_from_js[1]=="class"):
        # Perform the analysis
        gender_counts = df['gender'].value_counts().to_dict()   
        caste_counts = df['community'].value_counts().to_dict()
        reason_counts = df['discontinueReason'].value_counts().to_dict()
        school_counts = df['school'].value_counts().to_dict()
        district_counts = df['district'].value_counts().to_dict()
        schooltype_counts = df['schoolType'].value_counts().to_dict()

        # Create arrays for gender and class data
        gender_data = list(gender_counts.values())
        caste_data = list(caste_counts.values())
        reason_data = list(reason_counts.values())
        school_data = list(school_counts.values())
        district_data = list(district_counts.values())
        schooltype_data = list(schooltype_counts.values())

        # Organize data into the desired format
        analytics_array = [
            [[['Male', 'Female'], gender_data],
            [list(caste_counts.keys()), caste_data],
            [list(reason_counts.keys()), reason_data],
            [list(school_counts.keys()), school_data],
            [list(district_counts.keys()), district_data],
            [list(schooltype_counts.keys()), schooltype_data]],
            ["Gender","Caste","Reason","School","District","School Type"]
        ]

        return jsonify(analytics_array)

    elif(data_from_js[1]=="community"):
    # Perform the analysis
        gender_counts = df['gender'].value_counts().to_dict()   
        class_counts = df['class'].value_counts().to_dict()
        reason_counts = df['discontinueReason'].value_counts().to_dict()
        school_counts = df['school'].value_counts().to_dict()
        district_counts = df['district'].value_counts().to_dict()
        schooltype_counts = df['schoolType'].value_counts().to_dict()

        # Create arrays for gender and class data
        gender_data = list(gender_counts.values())
        class_data = list(class_counts.values())
        reason_data = list(reason_counts.values())
        school_data = list(school_counts.values())
        district_data = list(district_counts.values())
        schooltype_data = list(schooltype_counts.values())

        # Organize data into the desired format
        analytics_array = [
            [[['Male', 'Female'], gender_data],
            [list(class_counts.keys()), class_data],
            [list(reason_counts.keys()), reason_data],
            [list(school_counts.keys()), school_data],
            [list(district_counts.keys()), district_data],
            [list(schooltype_counts.keys()), schooltype_data]],
            ["Gender","Class","Reason","School","District","School Type"]
        ]

        return jsonify(analytics_array)
    
    elif(data_from_js[1]=="discontinueReason"):
    # Perform the analysis
        gender_counts = df['gender'].value_counts().to_dict()   
        class_counts = df['class'].value_counts().to_dict()
        caste_counts = df['community'].value_counts().to_dict()
        school_counts = df['school'].value_counts().to_dict()
        district_counts = df['district'].value_counts().to_dict()
        schooltype_counts = df['schoolType'].value_counts().to_dict()

        # Create arrays for gender and class data
        gender_data = list(gender_counts.values())
        class_data = list(class_counts.values())
        caste_data = list(caste_counts.values())
        school_data = list(school_counts.values())
        district_data = list(district_counts.values())
        schooltype_data = list(schooltype_counts.values())

        # Organize data into the desired format
        analytics_array = [
            [[['Male', 'Female'], gender_data],
            [list(class_counts.keys()), class_data],
            [list(caste_counts.keys()), caste_data],
            [list(school_counts.keys()), school_data],
            [list(district_counts.keys()), district_data],
            [list(schooltype_counts.keys()), schooltype_data]],
            ["Class","Gender","Caste","School","District","School Type"]

        ]

        return jsonify(analytics_array)

    elif(data_from_js[1]=="school"):
# Perform the analysis
        gender_counts = df['gender'].value_counts().to_dict()   
        class_counts = df['class'].value_counts().to_dict()
        caste_counts = df['community'].value_counts().to_dict()
        reason_counts = df['discontinueReason'].value_counts().to_dict()
        district_counts = df['district'].value_counts().to_dict()
        schooltype_counts = df['schoolType'].value_counts().to_dict()

        # Create arrays for gender and class data
        gender_data = list(gender_counts.values())
        class_data = list(class_counts.values())
        caste_data = list(caste_counts.values())
        reason_data = list(reason_counts.values())
        district_data = list(district_counts.values())
        schooltype_data = list(schooltype_counts.values())

        # Organize data into the desired format
        analytics_array = [
            [[['Male', 'Female'], gender_data],
            [list(class_counts.keys()), class_data],
            [list(caste_counts.keys()), caste_data],
            [list(reason_counts.keys()), reason_data],
            [list(district_counts.keys()), district_data],
            [list(schooltype_counts.keys()), schooltype_data]],
            ["Gender","Class","Caste","Reason","District","School Type"]

        ]

        return jsonify(analytics_array)

    elif(data_from_js[1]=="schoolType"):
        gender_counts = df['gender'].value_counts().to_dict()   
        class_counts = df['class'].value_counts().to_dict()
        caste_counts = df['community'].value_counts().to_dict()
        reason_counts = df['discontinueReason'].value_counts().to_dict()
        school_counts = df['school'].value_counts().to_dict()
        district_counts = df['district'].value_counts().to_dict()

        # Create arrays for gender and class data
        gender_data = list(gender_counts.values())
        class_data = list(class_counts.values())
        caste_data = list(caste_counts.values())
        reason_data = list(reason_counts.values())
        school_data = list(school_counts.values())
        district_data = list(district_counts.values())

        # Organize data into the desired format
        analytics_array = [
            [[['Male', 'Female'], gender_data],
            [list(class_counts.keys()), class_data],
            [list(caste_counts.keys()), caste_data],
            [list(reason_counts.keys()), reason_data],
            [list(school_counts.keys()), school_data],
            [list(district_counts.keys()), district_data]],
            ["Gender","Class","Caste","Reason","School","District"]
        ]

        return jsonify(analytics_array)
        



if __name__ == '__main__':
    app.run()

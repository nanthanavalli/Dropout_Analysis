import csv
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("C:\\Users\\NaveenAkash\\Desktop\\sih-23-65cac-firebase-adminsdk-z4w3e-46a389e66f.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()
count=1

# Read and upload CSV data
csv_file_path = "C:\\Users\\NaveenAkash\\Desktop\\school_data.csv"

with open(csv_file_path, newline='', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        db.collection("Details").document("Student Details").collection("Common Pool").document("School").set(row)
        print(count,end=" ")
        print("Done")
        count+=1

# # Read and upload CSV data
# csv_file_path = "C:\\Users\\NaveenAkash\\Desktop\\school.csv"

# with open(csv_file_path, newline='') as csvfile:
#     reader = csv.DictReader(csvfile)
#     for row in reader:
#         # Upload each row as a document
#         uid = row["uid"]
#         db.collection("users").document(uid).set(row)

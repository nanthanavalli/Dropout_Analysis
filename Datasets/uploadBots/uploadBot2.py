import csv
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("C:\\Users\\NaveenAkash\\Desktop\\sih-23-65cac-firebase-adminsdk-z4w3e-46a389e66f.json")
firebase_admin.initialize_app(cred)


files = {
# "updatedGOVERNMENT HIGH SCHOOL.csv":"PDwRu1822zPeIpMZuIL0E6IMwjs1",
# "updatedGOVERNMENT HIGHER SECONDARY SCHOOL.csv":"PuUATwc9e2Qt0L2eH96U9XZbuUu2",
# "updatedGOVT SECONDARY SCHOOL.csv":"dIsEmhLxUcM95VNVSsCoGj6okUf2",
# "updatedGOVT SMT K K HIGHSCHOOL.csv":"hUxENRL64TfHukBlcRhv73BOJov2",
# "updatedGOVT. HIGH SEC. SCHOOL.csv":"YqI2Se5UpJexBYAhmrRC9xkJ5N43",
# "updatedINDIRABAI HIGH SCHOOL.csv":"OBlU6UKCm8elcEg6jSkUMW5SwxR2",
# "updatedK.K.M.S. HIGH SCHOOL.csv":"y7Voj5ZnjzO8MY2JhIsPIycx9ip1",
# "updatedKOKTA RMSA SCHOOL.csv":"KI5JCPG1RshzvEZYW3I4Fan4EP92",
# "updatedMODEL SCHOOL.csv":"rhllg230FFQJnzQ9FPi9BhVQefd2",
"updatedNAWANAGAR(GOV) HIGH SCHOOL.csv":"7DqwyJPKLUOhxToedBz932bOCy53"
# "updatedRMSA GOVERNMENT SCHOOL.csv":"3j7MCVIfdNVzVmp61ea04FIMp4a2",
# "updatedSARKARI MADYAMIK SCHOOL.csv":"z3rZEAiThkPSrO573ArtRJxZtHG3",
# "updatedSARKARI UCCHATAR MADYAMIK SCHOOL.csv":"u0mWF1iHl0W4RGxYmfXF6em3M7t2",
# "updatedSHREE HARDHOL GOVT. HIGH SCHOOL.csv":"VwWMirEAgtP6tLDlpb3ysYYVfTt2",
# "updatedSHRI GOVERNMENT HIGH SCHOOL.csv":"8Tue2qKHxVdaeZEo31wGWKBwPkE2"
}

# Initialize Firestore
db = firestore.client()


for key,value in files.items():
    count=1
    csv_file_path = "C:\\Users\\NaveenAkash\\Desktop\\Updated files\\"+key
    print(key + " Upload Start")
    with open(csv_file_path, newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Upload each row as a document
            usiNo = row["usiNo"]
            db.collection("All Students").document(usiNo).set(row)
            db.collection("Schools").document(value).collection("Students").document(usiNo).set(row)
            print(count,end=" ")
            print("Done")
            count+=1
    print(key + " Upload Complete")


# # Read and upload CSV data
# csv_file_path = "C:\\Users\\NaveenAkash\\Desktop\\Updated files\\updatedGOVERNMENT HIGH SCHOOL.csv"

# with open(csv_file_path, newline='', encoding='utf-8-sig') as csvfile:
#     reader = csv.DictReader(csvfile)
#     for row in reader:
#         # Upload each row as a document
#         usiNo = row["usiNo"]
#         db.collection("All Students").document(usiNo).set(row)
#         db.collection("Schools").document("PDwRu1822zPeIpMZuIL0E6IMwjs1").collection("Students").document(usiNo).set(row)
#         print(count,end=" ")
#         print("Done")
#         count+=1

# # Read and upload CSV data
# csv_file_path = "C:\\Users\\NaveenAkash\\Desktop\\school.csv"

# with open(csv_file_path, newline='') as csvfile:
#     reader = csv.DictReader(csvfile)
#     for row in reader:
#         # Upload each row as a document
#         uid = row["uid"]
#         db.collection("users").document(uid).set(row)

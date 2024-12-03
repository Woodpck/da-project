from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

# @app.route('/get-data', methods=['GET'])
# def get_data():
#     sample_data = {
#         'id': 1,
#         'name': 'Example Item',
#         'description': 'This is a sample item.'
#     }
#     return jsonify(sample_data)


# UPLOAD_FOLDER = 'uploads'
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading'}), 400
    if file:
        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

@app.route('/files', methods=['GET']) 
def get_files(): 
    try: 
        files = os.listdir(UPLOAD_FOLDER) 
        return jsonify(files) 
    except Exception as e: 
        return str(e), 500

@app.route('/uploads/<path:filename>', methods=['GET']) 
def download_file(filename): 
    return send_from_directory(UPLOAD_FOLDER, filename)

# Cleaning operations
# Remove Duplicates
@app.route('/clean-duplicates', methods=['POST'])
def clean_duplicates():
    try:
      
# Load the CSV file
        df = pd.read_csv('./uploads/student_data.csv')
        df.drop_duplicates(inplace = True)
        print(df.to_string())
        
# Save the cleaned file
        cleaned_filepath = './uploads/student_data_cleaned.csv'
        df.to_csv(cleaned_filepath, index=False)

        return jsonify({'message': 'Duplicates removed successfully!'}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# Fill Missing Values
@app.route('/fill-missing', methods=['POST'])
def fill_missing():
    try:
        filepath = os.path.join(UPLOAD_FOLDER, 'student_data.csv')  # Static reference
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404

        # Load CSV and fill missing values
        df = pd.read_csv(filepath)
        df.fillna('N/A', inplace=True)
        df.to_csv(filepath, index=False)

        return jsonify({'message': 'Missing values filled successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Drop Rows with All NaN
@app.route('/drop-nan-rows', methods=['POST'])
def drop_nan_rows():
    try:
        filepath = os.path.join(UPLOAD_FOLDER, 'student_data.csv')  # Static reference
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404

        # Load CSV and drop rows where all values are NaN
        df = pd.read_csv(filepath)
        df = df.dropna(how='all')
        df.to_csv(filepath, index=False)

        return jsonify({'message': 'Rows with all NaN values dropped successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

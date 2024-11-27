from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

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


UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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

if __name__ == '__main__':
    app.run(debug=True)

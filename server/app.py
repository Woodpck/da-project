from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

@app.route('/get-data', methods=['GET'])
def get_data():
    sample_data = {
        'id': 1,
        'name': 'Example Item',
        'description': 'This is a sample item.'
    }
    return jsonify(sample_data)

if __name__ == '__main__':
    app.run(debug=True)

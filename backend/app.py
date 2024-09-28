from flask import Flask, request, jsonify
from flask_cors import CORS
from db.schemas.appointments import Appointments
from db.config import db
from utils.normalization import NormalizeData
from services.text_extraction import LayoutAnalysis
from services.llm_service import get_gpt_response
from services.audio import text_to_speech_file
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins


@app.route("/appointmentCreation", methods=["POST"])
def appointmentBooking():
    data = request.get_json()
    # data = data["message"].decode("utf-8")
    # data = NormalizeData(data["message"])

    result = Appointments.insert(data["message"])

    print(result)
    return jsonify({"message": "success"})


# Ensure the upload folder exists
UPLOAD_FOLDER = "uploads"  # Change this to your desired folder
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {"pdf", "txt"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/reportSummarization", methods=["POST"])
def reportSummarization():
    # Check if the request has the "report" part
    if "report" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["report"]  # Get the file with key "report"

    # Check if a file was selected
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Check if the file is allowed
    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(UPLOAD_FOLDER, filename))

    text = LayoutAnalysis(filename)

    language = request.form.get("language")
    summarizationType = request.form.get("type")
    res = get_gpt_response(text, language, summarizationType)
    filename = text_to_speech_file(res, filename)

    return jsonify({"message": res, "audiofile": filename}), 201


if __name__ == "__main__":
    app.run(debug=True)

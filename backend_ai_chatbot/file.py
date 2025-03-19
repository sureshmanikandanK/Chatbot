#Final code
# file.py
from flask import request, jsonify
from werkzeug.utils import secure_filename
import os
from models import File, db

# Utility function to check allowed file type s
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {"csv"}

def upload_file():
    # Retrieve the user_id from the request headers (no longer from session)
    current_user_id = request.headers.get('userId')  # Get userId from request headers
    
    if not current_user_id:
        return jsonify({'error': 'User not logged in'}), 403  # If userId is missing, return 403 error

    # Check if a file is included in the request
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_path = os.path.join('uploads\csv', filename)
        
        # Ensure the upload directory exists
        if not os.path.exists('uploads\csv'):
            os.makedirs('uploads\csv')

        # Save the file to the server
        file.save(upload_path)

        # Create a new File record in the database with the dynamic user_id from the header
        new_file = File(
            filename=filename,
            file_type=file.mimetype,
            file_data=file.read(),
            index_file_path=upload_path,
            user_id=current_user_id  # Dynamically set user_id from the request headers
        )

        try:
            db.session.add(new_file)
            db.session.commit()
            return jsonify({"message": "File uploaded successfully", "file_path": upload_path, "file_id": new_file.id}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to save file details to database", "message": str(e)}), 500

    return jsonify({"error": "Invalid file type. Only CSV files are allowed."}), 400




# _________original is just above _________




from flask import request, jsonify
from werkzeug.utils import secure_filename
import os
from models import File, db

# Utility function to check allowed file types
def allowed_file(filename):
    # Allowed file extensions
    allowed_extensions = {"csv", "xlsx", "xls", "pdf", "doc", "docx", "txt", "md"}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def upload_file():
    # Retrieve the user_id from the request headers (no longer from session)
    current_user_id = request.headers.get('userId')  # Get userId from request headers
    
    if not current_user_id:
        return jsonify({'error': 'User not logged in'}), 403  # If userId is missing, return 403 error

    # Check if a file is included in the request
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Dynamic upload path
        upload_path = os.path.join('uploads', filename)
        
        # Ensure the upload directory exists
        if not os.path.exists('uploads'):
            os.makedirs('uploads')

        # Save the file to the server
        file.save(upload_path)

        # Create a new File record in the database with the dynamic user_id from the header
        new_file = File(
            filename=filename,
            file_type=file.mimetype,
            file_data=file.read(),
            index_file_path=upload_path,
            user_id=current_user_id  # Dynamically set user_id from the request headers
        )

        try:
            db.session.add(new_file)
            db.session.commit()
            return jsonify({"message": "File uploaded successfully", "file_path": upload_path, "file_id": new_file.id}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to save file details to database", "message": str(e)}), 500

    return jsonify({"error": "Invalid file type. Supported types: CSV, Excel, PDF, DOC, DOCX, TXT, MD."}), 400

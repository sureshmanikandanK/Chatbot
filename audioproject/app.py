# from flask import Flask, send_from_directory
# import os

# app = Flask(__name__)

# # Define the path where the audio file is stored
# AUDIO_FOLDER = os.path.join(os.getcwd(), 'static')
# if not os.path.exists(AUDIO_FOLDER):
#     os.makedirs(AUDIO_FOLDER)

# # Place your audio file (e.g., audio.mp3) in the "audio" folder
# AUDIO_FILE = "OpenAI Enterprise Platform.wav"

# @app.route('/')
# def home():
#     # Simple link to play the audio
#     return f'<a href="/play_audio" target="_blank">Click here to play audio</a>'

# @app.route('/play_audio')
# def play_audio():
#     # Serve the audio file directly in the browser
#     return send_from_directory(AUDIO_FOLDER, AUDIO_FILE)

# if __name__ == '__main__':
#     app.run(debug=True)



# from flask import Flask
# import os

# app = Flask(__name__)

# # Define the path where the audio file is stored
# AUDIO_FOLDER = os.path.join(os.getcwd(), 'static')
# if not os.path.exists(AUDIO_FOLDER):
#     os.makedirs(AUDIO_FOLDER)

# # Place your audio file (e.g., OpenAI Enterprise Platform.wav) in the "static" folder
# AUDIO_FILE = "OpenAI Enterprise Platform.wav"

# @app.route('/')
# def play_audio():
#     # Display the audio player and play the audio file directly in the browser
#     return f'''
#     <center>
#         <audio controls autoplay>
#             <source src="/static/{AUDIO_FILE}" type="audio/wav">
#             Your browser does not support the audio tag.
#         </audio>
#         </center>
#     '''

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Define the path where the audio file is stored
AUDIO_FOLDER = os.path.join(os.getcwd(), 'static')


if not os.path.exists(AUDIO_FOLDER):
    os.makedirs(AUDIO_FOLDER)

# Place your audio file (e.g., OpenAI Enterprise Platform.wav) in the "static" folder
AUDIO_FILE = "OpenAI Enterprise Platform.wav"

@app.route('/')
def play_audio():
    print("hello")
    # Serve the audio file directly in the browser
    return send_from_directory(AUDIO_FOLDER, AUDIO_FILE)

if __name__ == '__main__':
    app.run(debug=True,port=12662)

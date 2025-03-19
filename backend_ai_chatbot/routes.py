# routes.py
from flask import Blueprint
# from .auth import register_routes
from auth import register_routes
from bot import bot_create, chat, get_chat_history, get_bot, bot_delete,delete_chat_history
from file import upload_file

# Blueprint Setup
auth_routes = Blueprint('auth_routes', __name__) 
bot_routes = Blueprint('bot_routes', __name__)
file_routes = Blueprint('file_routes', __name__)

# Registering Routes for different functionalities
register_routes(auth_routes)
bot_routes.add_url_rule("/bot-create", "bot_create", bot_create, methods=["POST"])
bot_routes.add_url_rule("/chat", "chat", chat, methods=["POST"])
bot_routes.add_url_rule("/chat/history", "get_chat_history", get_chat_history, methods=["GET"])
bot_routes.add_url_rule("/bots", "get_bot", get_bot, methods=["GET"])
file_routes.add_url_rule("/upload", "upload_file", upload_file, methods=["POST"])
bot_routes.add_url_rule("/bot-delete", "bot_delete", bot_delete, methods=["DELETE"])  # Delete bot route
bot_routes.add_url_rule("/chat/history/<int:file_id>", "delete_chat_history", delete_chat_history, methods=["DELETE"])  # Delete chat history for a bot

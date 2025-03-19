
# # # generate_answer.py
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from groq import Groq
# from langchain.chains import ConversationChain, LLMChain
# from langchain_core.prompts import (
#     ChatPromptTemplate,
#     HumanMessagePromptTemplate,
#     MessagesPlaceholder,
#     AIMessagePromptTemplate
# )
# from langchain_core.messages import SystemMessage
# from langchain.chains.conversation.memory import ConversationBufferWindowMemory
# from langchain_groq import ChatGroq
# from langchain.prompts import PromptTemplate

# from langchain_community.chat_message_histories import ChatMessageHistory
# from langchain_core.chat_history import BaseChatMessageHistory
# from langchain_core.runnables.history import RunnableWithMessageHistory

# import os

# # Define store globally to persist across function calls
# store = {}

# groq_api_key = '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'
# model = "llama-3.2-3b-preview"
# conversational_memory_length = 5

# # Function to load the Faiss index
# def load_faiss_index(index_path): 
#     if os.path.exists(index_path):
#         print(f"Loading Faiss index from {index_path}")
#         return FAISS.load_local(index_path)
#     else:
#         print(f"Error: Faiss index not found at {index_path}")
#         return None

# def get_result(path, user_question, user_id, file_id):
#     model_name = "models/embedding-001"
#     api_key = "AIzaSyA3-0m7MQxNzWZJzVyyOCmNlU_Z_q-SWiw"
    
#     embeddings = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=api_key)
    
#     # Construct the FAISS file path based on the shared index directory
#     faiss_file_path = os.path.join(path)

#     if not os.path.exists(faiss_file_path):
#         print(f"Error: FAISS index file {faiss_file_path} not found.")
#         return "No relevant results found for your query."

#     try:
#         print(f"Loading FAISS index from {faiss_file_path}")
#         vector_store = FAISS.load_local(faiss_file_path, embeddings, allow_dangerous_deserialization=True)

#         # Search for the most similar documents in the index
#         results = vector_store.similarity_search(user_question, k=5,filter={"user_id":user_id,"file_id":file_id})

#         # Debugging: Output all results
#         print("Raw search results:")
#         for doc in results:
#             print(f"Content: {doc.page_content}, Metadata: {doc.metadata}")
#         return results
#     except Exception as e:
#         print(f"Error loading Faiss index from {faiss_file_path}: {str(e)}")
#         return "Error processing your request."


# def get_session_history(session_id: str) -> BaseChatMessageHistory:
#         if session_id not in store:
#             store[session_id] = ChatMessageHistory()
#         return store[session_id]

# # Function to generate a response based on Faiss search results and user question
# def generate_answer(results, user_question, session_id):
#     # Fetch or create the session history
#     # Debug: check the store before updating
#     print(f"Store before: {store}") 

#     session_history = get_session_history(session_id) 
#     memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

#     groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model,temperature=0.3)

#     chat_history = session_history.messages  # Access the messages from session history
    
#     system_prompt = (f"""
#         Based on the retrieved results, your task is to provide a well-informed, context-aware response to the user's question from ,chat_history and Results.

#         Chat History:
#         {chat_history}

#         Results:
#         {results}

#         User's Question:
#         {user_question}

#         """
# )

#     # Construct the chat prompt with message history
#     prompt = ChatPromptTemplate.from_messages(
#         [
#             SystemMessage(content=system_prompt),
#             MessagesPlaceholder(variable_name="chat_history"),
#             HumanMessagePromptTemplate.from_template("{human_input}")
#         ]
#     )

#     # Initialize the conversation chain with the provided history
#     conversation = LLMChain(
#         llm=groq_chat,
#         prompt=prompt,
#         verbose=True,
#         memory=memory
        
#     )

#     # Add user's current question to history and generate a response
#     response = conversation.predict(human_input=user_question)
    
#     # Update the session history with the latest exchange
#     session_history.add_user_message(user_question)
#     session_history.add_ai_message(response)
    
#     print(f"Store after: {store}")  # Debug: check the store after updating
    
#     # Return the response
#     return response 




# from llm_guard.output_scanners import BanTopics
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from groq import Groq
# from langchain.chains import ConversationChain, LLMChain
# from langchain_core.prompts import (
#     ChatPromptTemplate,
#     HumanMessagePromptTemplate,
#     MessagesPlaceholder,
#     AIMessagePromptTemplate
# )
# from langchain_core.messages import SystemMessage
# from langchain.chains.conversation.memory import ConversationBufferWindowMemory
# from langchain_groq import ChatGroq
# from langchain.prompts import PromptTemplate

# from langchain_community.chat_message_histories import ChatMessageHistory
# from langchain_core.chat_history import BaseChatMessageHistory
# from langchain_core.runnables.history import RunnableWithMessageHistory

# import os

# # Define store globally to persist across function calls
# store = {}

# groq_api_key = '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'
# model = "llama-3.2-3b-preview"
# conversational_memory_length = 5

# # Function to load the Faiss index
# def load_faiss_index(index_path): 
#     if os.path.exists(index_path):
#         print(f"Loading Faiss index from {index_path}")
#         return FAISS.load_local(index_path)
#     else:
#         print(f"Error: Faiss index not found at {index_path}")
#         return None

# def get_result(path, user_question, user_id, file_id):
#     model_name = "models/embedding-001"
#     api_key = "AIzaSyA3-0m7MQxNzWZJzVyyOCmNlU_Z_q-SWiw"
    
#     embeddings = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=api_key)
    
#     # Construct the FAISS file path based on the shared index directory
#     faiss_file_path = os.path.join(path)

#     if not os.path.exists(faiss_file_path):
#         print(f"Error: FAISS index file {faiss_file_path} not found.")
#         return "No relevant results found for your query."

#     try:
#         print(f"Loading FAISS index from {faiss_file_path}")
#         vector_store = FAISS.load_local(faiss_file_path, embeddings, allow_dangerous_deserialization=True)

#         # Search for the most similar documents in the index
#         results = vector_store.similarity_search(user_question, k=5,filter={"user_id":user_id,"file_id":file_id})

#         # Debugging: Output all results
#         print("Raw search results:")
#         for doc in results:
#             print(f"Content: {doc.page_content}, Metadata: {doc.metadata}")
#         return results
#     except Exception as e:
#         print(f"Error loading Faiss index from {faiss_file_path}: {str(e)}")
#         return "Error processing your request."


# def get_session_history(session_id: str) -> BaseChatMessageHistory:
#         if session_id not in store:
#             store[session_id] = ChatMessageHistory()
#         return store[session_id]

# # Function to generate a response based on Faiss search results and user question
# def generate_answer(results, user_question, session_id):
#     # Apply BanTopics scanner to the user's prompt first
#     scanner = BanTopics(topics=["violence", "hate speech", "drugs"], threshold=0.5)
#     sanitized_prompt, is_valid_prompt, risk_score_prompt = scanner.scan(user_question, user_question)

#     # If the prompt is invalid, sanitize or reject it
#     if not is_valid_prompt:
#         sanitized_prompt = "Its against policy or This content may violate our usage policies."
#         return sanitized_prompt, risk_score_prompt

#     # Proceed with the conversation chain if the prompt is valid
#     print(f"Store before: {store}")  # Debug: check the store before updating

#     session_history = get_session_history(session_id) 
#     memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

#     groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model, temperature=0.3)

#     chat_history = session_history.messages  # Access the messages from session history
    
#     system_prompt = (f"""
#         Based on the retrieved results, your task is to provide a well-informed, context-aware response to the user's question from chat_history and Results.

#         Chat History:
#         {chat_history}

#         Results:
#         {results}

#         User's Question:
#         {sanitized_prompt}  # Use sanitized prompt here
#         """
# )

#     # Construct the chat prompt with message history
#     prompt = ChatPromptTemplate.from_messages(
#         [
#             SystemMessage(content=system_prompt),
#             MessagesPlaceholder(variable_name="chat_history"),
#             HumanMessagePromptTemplate.from_template("{human_input}")
#         ]
#     )

#     # Initialize the conversation chain with the provided history
#     conversation = LLMChain(
#         llm=groq_chat,
#         prompt=prompt,
#         verbose=True,
#         memory=memory
#     )

#     # Add user's current question to history and generate a response
#     response = conversation.predict(human_input=sanitized_prompt)
    
#     # Apply BanTopics scanner to the model's response
#     sanitized_response, is_valid_response, risk_score_response = scanner.scan(sanitized_prompt, response)

#     # If the response is not valid, sanitize it
#     if not is_valid_response:
#         sanitized_response = "[REDACTED: Contains inappropriate content]"

#     # Update the session history with the latest exchange
#     session_history.add_user_message(sanitized_prompt)
#     session_history.add_ai_message(sanitized_response)

#     print(f"Store after: {store}")  # Debug: check the store after updating
    
#     # Return the sanitized response and the risk score
#     return sanitized_response, risk_score_response



# from llm_guard.output_scanners import BanTopics
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from groq import Groq
# from langchain.chains import ConversationChain, LLMChain
# from langchain_core.prompts import (
#     ChatPromptTemplate,
#     HumanMessagePromptTemplate,
#     MessagesPlaceholder,
#     AIMessagePromptTemplate
# )
# from langchain_core.messages import SystemMessage
# from langchain.chains.conversation.memory import ConversationBufferWindowMemory
# from langchain_groq import ChatGroq
# from langchain.prompts import PromptTemplate
# from langchain_community.chat_message_histories import ChatMessageHistory
# from langchain_core.chat_history import BaseChatMessageHistory
# from langchain_core.runnables.history import RunnableWithMessageHistory
# import os
# # Define store globally to persist across function calls
# store = {}

# groq_api_key = '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'
# model = "llama-3.2-3b-preview"
# conversational_memory_length = 5

# # Function to load the Faiss index
# def load_faiss_index(index_path): 
#     if os.path.exists(index_path):
#         print(f"Loading Faiss index from {index_path}")
#         return FAISS.load_local(index_path)
#     else:
#         print(f"Error: Faiss index not found at {index_path}")
#         return None

# def get_result(path, user_question, user_id, file_id):
#     model_name = "models/embedding-001"
#     api_key = "AIzaSyA3-0m7MQxNzWZJzVyyOCmNlU_Z_q-SWiw"
    
#     embeddings = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=api_key)
    
#     # Construct the FAISS file path based on the shared index directory
#     faiss_file_path = os.path.join(path)

#     if not os.path.exists(faiss_file_path):
#         print(f"Error: FAISS index file {faiss_file_path} not found.")
#         return "No relevant results found for your query."

#     try:
#         print(f"Loading FAISS index from {faiss_file_path}")
#         vector_store = FAISS.load_local(faiss_file_path, embeddings, allow_dangerous_deserialization=True)

#         # Search for the most similar documents in the index
#         results = vector_store.similarity_search(user_question, k=5, filter={"user_id": user_id, "file_id": file_id})

#         # Debugging: Output all results
#         print("Raw search results:")
#         for doc in results:
#             print(f"Content: {doc.page_content}, Metadata: {doc.metadata}")
#         return results
#     except Exception as e:
#         print(f"Error loading Faiss index from {faiss_file_path}: {str(e)}")
#         return "Error processing your request."

# def get_session_history(session_id: str) -> BaseChatMessageHistory:
#     if session_id not in store:
#         store[session_id] = ChatMessageHistory()
#     return store[session_id]        

# # Function to generate a response based on Faiss search results and user question
# def generate_answer(results, user_question, session_id):
#     # Apply BanTopics scanner to the user's prompt first
#     scanner = BanTopics(topics=["violence", "hate speech", "drugs"], threshold=0.5)
#     sanitized_prompt, is_valid_prompt, risk_score_prompt = scanner.scan(user_question, user_question)

#     # If the prompt is invalid, sanitize or reject it
#     if not is_valid_prompt:
#         sanitized_prompt = "It's against policy or This content may violate our usage policies."
#         return sanitized_prompt, risk_score_prompt

#     # Proceed with the conversation chain if the prompt is valid
#     print(f"Store before: {store}")  # Debug: check the store before updating

#     session_history = get_session_history(session_id)
#     memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

#     groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model, temperature=32323)

#     chat_history = session_history.messages  # Access the messages from session history

#     system_prompt = (f"""
#         Based on the retrieved results, your task is to provide a well-informed, context-aware response to the user's question from chat_history and Results.

#         Chat History:
#         {chat_history}

#         Results:
#         {results}
    
#         User's Question:
#         {sanitized_prompt}  # Use sanitized prompt here
#         """
#     )
#     # Construct the chat prompt with message history
#     prompt = ChatPromptTemplate.from_messages(
#         [
#             SystemMessage(content=system_prompt),
#             MessagesPlaceholder(variable_name="chat_history"),
#             HumanMessagePromptTemplate.from_template("{human_input}")
#         ]
#     )

#     # Initialize the conversation chain with the provided history
#     conversation = LLMChain(
#         llm=groq_chat,
#         prompt=prompt,
#         verbose=True,
#         memory=memory
#     )

#     # Add user's current question to history and generate a response
#     response = conversation.predict(human_input=sanitized_prompt)

#     # Apply BanTopics scanner to the model's response
#     sanitized_response, is_valid_response, risk_score_response = scanner.scan(sanitized_prompt, response)

#     # If the response is not valid, sanitize it
#     if not is_valid_response:
#         sanitized_response = "[REDACTED: Contains inappropriate content]"

#     # Only add the sanitized prompt and response to history if the prompt was valid
#     if is_valid_prompt:
#         session_history.add_user_message(sanitized_prompt)
#         session_history.add_ai_message(sanitized_response)

#     print(f"Store after: {store}")  # Debug: check the store after updating

#     # Return the sanitized response and the risk score
#     return sanitized_response, risk_score_response



# _________original is just above _________



# from llm_guard.output_scanners import BanTopics
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from groq import Groq
# from langchain.chains import ConversationChain, LLMChain
# from langchain_core.prompts import (
#     ChatPromptTemplate,
#     HumanMessagePromptTemplate,
#     MessagesPlaceholder,
#     AIMessagePromptTemplate
# )
# from langchain_core.messages import SystemMessage
# from langchain.chains.conversation.memory import ConversationBufferWindowMemory
# from langchain_groq import ChatGroq
# from langchain.prompts import PromptTemplate
# from langchain_community.chat_message_histories import ChatMessageHistory
# from langchain_core.chat_history import BaseChatMessageHistory
# from langchain_core.runnables.history import RunnableWithMessageHistory
# import os

# # Define store globally to persist across function calls
# store = {}

# groq_api_key = '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'
# model = "llama-3.2-3b-preview"
# conversational_memory_length = 5

# # Function to load the Faiss index
# def load_faiss_index(index_path): 
#     if os.path.exists(index_path):
#         print(f"Loading Faiss index from {index_path}")
#         return FAISS.load_local(index_path)
#     else:
#         print(f"Error: Faiss index not found at {index_path}")
#         return None

# def get_result(path, user_question, user_id, file_id):
#     model_name = "models/embedding-001"
#     api_key = "AIzaSyA3-0m7MQxNzWZJzVyyOCmNlU_Z_q-SWiw"
    
#     embeddings = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=api_key)
    
#     # Construct the FAISS file path based on the shared index directory
#     faiss_file_path = os.path.join(path)

#     if not os.path.exists(faiss_file_path):
#         print(f"Error: FAISS index file {faiss_file_path} not found.")
#         return "No relevant results found for your query."

#     try:
#         print(f"Loading FAISS index from {faiss_file_path}")
#         vector_store = FAISS.load_local(faiss_file_path, embeddings, allow_dangerous_deserialization=True)

#         # Search for the most similar documents in the index
#         results = vector_store.similarity_search(user_question, k=5, filter={"user_id": user_id, "file_id": file_id})

#         # Debugging: Output all results
#         print("Raw search results:")
#         for doc in results:
#             print(f"Content: {doc.page_content}, Metadata: {doc.metadata}")
#         return results
#     except Exception as e:
#         print(f"Error loading Faiss index from {faiss_file_path}: {str(e)}")
#         return "Error processing your request."

# def get_session_history(session_id: str) -> BaseChatMessageHistory:
#     if session_id not in store:
#         store[session_id] = ChatMessageHistory()
#     return store[session_id]        

# # Function to generate a response based on Faiss search results and user question
# def generate_answer(results, user_question, session_id):
#     # Apply BanTopics scanner to the user's prompt first
#     scanner = BanTopics(topics=["violence", "hate speech", "drugs"], threshold=0.5)
#     sanitized_prompt, is_valid_prompt, risk_score_prompt = scanner.scan(user_question, user_question)

#     # If the prompt is invalid, sanitize or reject it
#     if not is_valid_prompt:
#         sanitized_prompt = "It's against policy or This content may violate our usage policies."
#         return sanitized_prompt, risk_score_prompt

#     # Proceed with the conversation chain if the prompt is valid
#     print(f"Store before: {store}")  # Debug: check the store before updating

#     session_history = get_session_history(session_id)
#     memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

#     groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model, temperature=32323)

#     chat_history = session_history.messages  # Access the messages from session history

#     system_prompt = (f"""
#         Based on the retrieved results, your task is to provide a well-informed, context-aware response to the user's question from chat_history and Results.

#         Chat History:
#         {chat_history}

#         Results:
#         {results}
    
#         User's Question:
#         {sanitized_prompt}  # Use sanitized prompt here
#         """
#     )
#     # Construct the chat prompt with message history
#     prompt = ChatPromptTemplate.from_messages(
#         [
#             SystemMessage(content=system_prompt),
#             MessagesPlaceholder(variable_name="chat_history"),
#             HumanMessagePromptTemplate.from_template("{human_input}")
#         ]
#     )

#     # Initialize the conversation chain with the provided history
#     conversation = LLMChain(
#         llm=groq_chat,
#         prompt=prompt,
#         verbose=True,
#         memory=memory
#     )

#     # Add user's current question to history and generate a response
#     response = conversation.predict(human_input=sanitized_prompt)

#     # Apply BanTopics scanner to the model's response
#     sanitized_response, is_valid_response, risk_score_response = scanner.scan(sanitized_prompt, response)

#     # If the response is not valid, sanitize it
#     if not is_valid_response:
#         sanitized_response = "[REDACTED: Contains inappropriate content]"

#     # Only add the sanitized prompt and response to history if the prompt was valid
#     if is_valid_prompt:
#         session_history.add_user_message(sanitized_prompt)
#         session_history.add_ai_message(sanitized_response)

#     print(f"Store after: {store}")  # Debug: check the store after updating

#     # Return the sanitized response and the risk score
#     return sanitized_response, risk_score_response




from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from groq import Groq
from langchain.chains import ConversationChain, LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    AIMessagePromptTemplate
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
import os

# Define store globally to persist across function calls
store = {}

groq_api_key = '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'
model = "llama-3.2-3b-preview"
conversational_memory_length = 5

# Function to load the Faiss index
def load_faiss_index(index_path): 
    if os.path.exists(index_path):
        print(f"Loading Faiss index from {index_path}")
        return FAISS.load_local(index_path)
    else:
        print(f"Error: Faiss index not found at {index_path}")
        return None

def get_result(path, user_question, user_id, file_id):
    model_name = "models/embedding-001"
    api_key = "AIzaSyA3-0m7MQxNzWZJzVyyOCmNlU_Z_q-SWiw"
    
    embeddings = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=api_key)
    
    # Construct the FAISS file path based on the shared index directory
    faiss_file_path = os.path.join(path)

    if not os.path.exists(faiss_file_path):
        print(f"Error: FAISS index file {faiss_file_path} not found.")
        return "No relevant results found for your query."

    try:
        print(f"Loading FAISS index from {faiss_file_path}")
        vector_store = FAISS.load_local(faiss_file_path, embeddings, allow_dangerous_deserialization=True)

        # Search for the most similar documents in the index
        results = vector_store.similarity_search(user_question, k=5, filter={"user_id": user_id, "file_id": file_id})

        # Debugging: Output all results
        print("Raw search results:")
        for doc in results:
            print(f"Content: {doc.page_content}, Metadata: {doc.metadata}")
        return results
    except Exception as e:
        print(f"Error loading Faiss index from {faiss_file_path}: {str(e)}")
        return "Error processing your request."

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]        

# Function to generate a response based on Faiss search results and user question
def generate_answer(results, user_question, session_id):
    # Proceed with the conversation chain without BanTopics
    
    print(f"Store before: {store}")  # Debug: check the store before updating

    session_history = get_session_history(session_id)
    memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

    groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model, temperature=0.7)

    chat_history = session_history.messages  # Access the messages from session history

    system_prompt = (f"""
        Based on the retrieved results from the file only, your task is to provide a well-informed, context-aware response to the user's question from chat_history and Results.

        Chat History:
        {chat_history}

        Results:
        {results}
    
        User's Question:
        {user_question}
        """
    )
    # Construct the chat prompt with message history
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content=system_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{human_input}")
        ]
    )

    # Initialize the conversation chain with the provided history
    conversation = LLMChain(
        llm=groq_chat,
        prompt=prompt,
        verbose=True,
        memory=memory
    )

    # Add user's current question to history and generate a response
    response = conversation.predict(human_input=user_question)

    # Only add the prompt and response to history
    session_history.add_user_message(user_question)
    session_history.add_ai_message(response)

    print(f"Store after: {store}")  # Debug: check the store after updating

    # Return the response
    return response

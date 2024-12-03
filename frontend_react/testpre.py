preprocessing_file

# for pdf i will use the pyupdf4ll to make an pdf to markdown and chunk the data 
# import PyPDF2
from langchain_community.document_loaders import PyPDFLoader
import pymupdf4llm
from langchain.text_splitter import MarkdownTextSplitter
import os   
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.document_loaders.csv_loader import CSVLoader
partent_director_index = "test_files/uploads/index"



def csv_documet_load(file_path):
    loader = CSVLoader(file_path)
    data = loader.load_and_split()
    return data

# this functuon load the document and make an pdf as an markdown file and chunked the data by using 500 characters
def load_pdf_doc_split(file_path):
    loader = PyMuPDFLoader(file_path)
    data = loader.load()
    # mark_down = pymupdf4llm.to_markdown(file_path)
    # split_markdown = MarkdownTextSplitter(chunk_size=500, chunk_overlap=50)
    # split_markdown = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    
    # chunked = split_markdown.split_documents(data)
    return data


def embadding_and_store(chuked,file_name,bot_name):
    # for example i am takeing the google embadding for this 
    model_name = "models/embedding-001"
    api_key = ""
    embeddingsss = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=api_key) # creating embeddings
    db = FAISS.from_documents(chuked, embeddingsss)
    if not os.path.exists("./uploads/csv/index"):
        os.makedirs("./uploads/csv/index")
    # path = os.path.join(partent_director_index,file_name)
    # os.makedirs(path)
    
    path = f"./uploads/csv/index/{bot_name}"
    store_data = db.save_local(path)
    return path  
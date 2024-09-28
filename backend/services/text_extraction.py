import os
import requests
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from openai import AzureOpenAI

load_dotenv()


# API key and model for Layout Analysis
api_key = os.getenv("UPSTAGE_API_KEY")
model = "receipt-extraction"


# Layout Analysis Function
def LayoutAnalysis(fileName):
    url = "https://api.upstage.ai/v1/document-ai/layout-analysis"
    headers = {"Authorization": f"Bearer {api_key}"}
    filePath = f"./uploads/{fileName}"

    try:
        # Open the file and send the request
        with open(filePath, "rb") as file:
            files = {"document": file}
            data = {"ocr": True}
            response = requests.post(url, headers=headers, files=files, data=data)
            response.raise_for_status()  # Check for request errors
            response_data = response.json()

            elements = response_data.get("elements", [])

            # Extract and concatenate text from elements
            text = ""
            for element in elements:
                text += "\n" + element.get("text", "")

            return text

    except Exception as e:
        print(f"An error occurred: {e}")
        return None, None

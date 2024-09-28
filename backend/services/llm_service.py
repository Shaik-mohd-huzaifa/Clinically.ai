from openai import AzureOpenAI
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version="2024-02-01",
)

prompt_template = """
    You are a health Report Summarization Assisstant. We summarizes the reports and also translates it with the given report context and limit the summarization to 1000 letters max try to keep it breif. Also checkout what type of summarization user wants its tagging in summarization type only proved that type of simple understandable summary
    Language: {Language}
    
    Summarization Type: {type}
    
    Report Context: {Context}
"""

prompt = PromptTemplate.from_template(template=prompt_template)


def get_gpt_response(t_context, t_language, summarizationType):
    formated_prompt = prompt.format(
        Language=t_language, Context=t_context, type=summarizationType
    )
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": formated_prompt}],
        model="gpt-4o",
    )
    response = response.choices[0].message.content
    return response

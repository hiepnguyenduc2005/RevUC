import chromadb
import os
from typing import TypedDict
from langgraph.graph import StateGraph
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from models.schema import Volunteer, Trial
from dotenv import load_dotenv
from langgraph.graph import END

storage_path = os.path.join(os.getcwd(), 'db')
if storage_path is None:
    raise ValueError("STORAGE_PATH environment variable is not set")

client = chromadb.PersistentClient(path=storage_path)
collection = client.get_or_create_collection(name="revuc")

load_dotenv()
model = ChatGoogleGenerativeAI( 
    model="gemini-1.5-pro",
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

class AgentState(TypedDict):
    volunteerInfo: Volunteer
    report_text: str
    matches_id: list[str]
    matches_documents: list[Trial]
    explanation: str

def matching_node(state: AgentState):
    print("matching_node")
    volunteerInfo = state.get("volunteerInfo", "")
    PROMPT = "Please find the up to 5 trials that match the volunteer information. {volunteerInfo}"
    result = collection.query(
        query_texts = [PROMPT.format(volunteerInfo=volunteerInfo)],
        n_results = 5,
    )
    matches_id = result["ids"][0]
    matches_documents = result["documents"][0]
    return {"matches_id": matches_id, "matches_documents": matches_documents}

def explanation_node(state: AgentState):
    print("explanation_node")
    volunteerInfo = state.get("volunteerInfo", "")
    matches_documents = state.get("matches_documents", "")
    EXPLANATION_PROMPT = (
        "Please provide an explanation of why the following matched trials are matched to the volunteer."
        "Here is the volunteer information: {volunteerInfo}"
    )
    USER_PROMPT = "Explain the following trials: {trials}"
    messages = [
        SystemMessage(EXPLANATION_PROMPT.format(volunteerInfo=volunteerInfo)),
        HumanMessage(USER_PROMPT.format(trials=matches_documents)),
    ]
    response = model.invoke(messages)
    content = response.content
    return {"explanation": content}

matching_graph_agent = StateGraph(AgentState)
matching_graph_agent.add_node("match", matching_node)
matching_graph_agent.add_node("explain", explanation_node)
matching_graph_agent.set_entry_point("match")
matching_graph_agent.add_edge("match", "explain")
matching_graph_agent.add_edge("explain", END)

# # Testing
# report_graph = matching_graph_agent.compile()
# TEXT = open("test2.txt", "r").read()
# REPORT_TEXT = open("test3.txt", "r").read()
# initial_state = {
#     "volunteerInfo": Volunteer(
#         name="John Doe",
#         email="johndoe@mail.com",
#         phone="123-456-7890",
#         dateOfBirth="01/01/2000",  
#         gender="male",
#         height="170",
#         weight="70",
#         medicalConditions="None",
#         medications="None",
#         allergies="None",
#         pastSurgeries="None",
#         files=[TEXT]
#     ),
#     "report_text": REPORT_TEXT,
#     "matches_id": [],
#     "matches_documents": [],
# }
# state = report_graph.invoke(initial_state)
# print(state["matches_documents"])
# print(state["explanation"])






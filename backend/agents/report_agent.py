from typing import TypedDict
from langgraph.graph import StateGraph
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from models.schema import Volunteer
from dotenv import load_dotenv
from langgraph.graph import END

load_dotenv()
model = ChatGoogleGenerativeAI( 
    model="gemini-1.5-pro",
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

class AgentState(TypedDict):
    originalInfo: Volunteer
    cleanedInfo: Volunteer
    report_text: str
    critique_count: int
    redo_clean: bool

def clean_node(state: AgentState):
    print("clean_node")
    originalInfo = state.get("originalInfo", "")
    CLEAN_PROMPT = (
        "Please clean this list of extracted information from PDF and images. "
        "Ensure that all information is accurate and complete. "
        "If you need to add or remove information, please do so."
    )
    USER_PROMPT = (
        "Clean the following raw data into a structured list format: {info}"
    )
    messages = [
        SystemMessage(CLEAN_PROMPT),
        HumanMessage(USER_PROMPT.format(info=originalInfo)),
    ]
    response = model.invoke(messages)
    content = response.content
    return {"cleanedInfo": content}


def critique_node(state: AgentState):
    print("critique_node")
    cleanedInfo = state.get("cleanedInfo", "")
    critique_count = state.get("critique_count", 0)

    CRITIQUE_PROMPT = (
        "Please critique the following cleaned information. "
        "If improvements are needed, specify which areas should be redone in the cleaning step. "
        "If the data is correct, confirm that it is ready for reporting."
    )
    USER_PROMPT = "Critique the following cleaned data: {info}"
    
    messages = [
        SystemMessage(CRITIQUE_PROMPT),
        HumanMessage(USER_PROMPT.format(info=cleanedInfo)),
    ]
    response = model.invoke(messages)
    content = response.content

    if "needs improvement" in content.lower() or "incorrect" in content.lower():
        return {"cleanedInfo": cleanedInfo, "critique_count": critique_count + 1, "redo_clean": True}
    return {"cleanedInfo": content, "critique_count": critique_count + 1, "redo_clean": False}


def report_node(state: AgentState):
    print("report_node")
    cleanedInfo = state.get("cleanedInfo", "")
    REPORT_PROMPT = (
        "Please generate a report based on the following cleaned information. "
        "Ensure that all information is accurate and complete. "
        "If you need to add or remove information, please do so."
    )
    USER_PROMPT = (
        "Generate a report based on the following cleaned data: {info}"
    )
    messages = [
        SystemMessage(REPORT_PROMPT),
        HumanMessage(USER_PROMPT.format(info=cleanedInfo)),
    ]
    response = model.invoke(messages)
    content = response.content
    return {"report_text": content}

def should_continue(state: AgentState):
    print("should_continue")
    redo_clean = state.get("redo_clean", False) and state.get("critique_count", 0) < 1
    if redo_clean:
        return "clean"
    return "report"

report_graph_agent = StateGraph(AgentState)

report_graph_agent.add_node("clean", clean_node)
report_graph_agent.add_node("critique", critique_node)
report_graph_agent.add_node("report", report_node)

report_graph_agent.set_entry_point("clean")
report_graph_agent.add_edge("clean", "critique")
report_graph_agent.add_conditional_edges(
    "critique",
    should_continue,
)
report_graph_agent.add_edge("report", END)

# # Testing
# report_graph = report_graph_agent.compile()
# TEXT = open("test.txt", "r").read()
# initial_state = {
#     "originalInfo": Volunteer(
        # name="John Doe",
        # email="johndoe@mail.com",
        # phone="123-456-7890",
        # dateOfBirth="01/01/2000",  
        # gender="male",
        # height="170",
        # weight="70",
        # medicalConditions="None",
        # medications="None",
        # allergies="None",
        # pastSurgeries="None",
        # files=[TEXT]
#     ),
#     "cleanedInfo": "",
#     "report_text": "",
#     "critique_count": 0,
#     "redo_clean": False
# }
# state = report_graph.invoke(initial_state)
# print(state["report_text"])
# ClinSync
## Inspiration
We all experienced COVID, anxiously awaiting a cure or vaccine. Despite being a global priority, development still took years to go from research to clinical trials and mass production. But what if AI could speed up this process? How many more lives could be saved? Recognizing this inefficiency, we created ClinSync to enhance trial participation and accelerate medical advancements.

## What it does
ClinSync is an AI-powered technology that automates clinical trial recruiting by connecting participants to appropriate studies. Organizations such as pharmaceutical companies, hospitals, and research labs can post trial information, while participants can check their eligibility by entering health data in a variety of formats, including PDFs, pictures, and manual inputs.

This data is processed by AI agents through extraction, eligibility matching, and report production, which provides volunteers with an accurate eligibility summary. If they are matched, users are directed to register and can contact an AI chatbot with trial-related questions. Organizations handle candidates using a dashboard, allowing for rapid approvals and follow-ups.

ClinSync increases trial recruitment by automating screening and interaction, eliminating delays and delivering life-saving therapies to patients faster.

## How we built it
Frontend: React.js, Tailwind CSS, DaisyUI 

Backend: FastAPI, MongoDB

AI Intergration: Gemini API, LangChain/LangGraph, ChromaDB (RAG pipeline, Multi AI Agents)

## Challenges we ran into
Confidentiality is a major concern in healthcare, and we aim to limit third-party intervention when managing sensitive information. Instead of directly managing personal data, ClinSync aims to optimize the application process by sending users’ summarized reports to organizations. Our purpose is to broaden the pool of potential applicants, offering companies a more diverse selection to evaluate while keeping volunteers’ personal information safe. While this may appear to be some minor tweaks, removing excessive wait periods greatly accelerates recruitment, and avoiding third party access to personal data allows clinical trials to know about their participants without getting their sensitive information.

## Accomplishments that we're proud of
Our integration of an AI agent into ClinSync to speed up the clinical trial matching process was one of our greatest successes. In order to create a system that speeds up and improves volunteer screening, we integrated data extraction, eligibility matching, and report generating. Despite working with new technology, we were able to integrate everything, improving accuracy and usability.

## What's next for ClinSync
Our next step is to deploy ClinSync on a cloud platform, making it publicly accessible to organizations and volunteers. We will ensure a scalable backend that can handle multiple users efficiently while implementing strong security measures to protect data privacy and maintain compliance. To support a growing user base, we plan to optimize database performance for handling large volumes of clinical trial data, improve AI processing speed for real-time eligibility matching, and enhance the frontend for a smoother user experience.

A key focus will be fine-tuning our AI models to improve accuracy in health data extraction and eligibility matching. By refining the RAG pipeline, we aim to enhance chatbot responses and provide clearer eligibility explanations. Additionally, we will train our AI agents with more diverse datasets and implement feedback loops to continuously improve their performance.

Finally, we will conduct extensive bug fixes and user testing to refine ClinSync. By gathering feedback from organizations and volunteers, we can improve workflows, resolve any technical issues, and enhance the overall UI/UX for better navigation and interaction. Through these steps, we aim to create a fully functional, scalable, and user-friendly platform that accelerates clinical trial recruitment and drives real-world impact.

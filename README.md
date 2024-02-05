# DailyConundrum
A riddle in which a fanciful question is answered by a pun.


Setting up Flask and a virtual environment in Visual Studio Code (VS Code) involves several steps. Here’s a step-by-step guide:

Install Python:

Ensure Python is installed on your system. You can download it from the Python website.
Install VS Code:

If you haven't already, download and install Visual Studio Code from the official website.
Install the Python Extension for VS Code:

Open VS Code, go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
Search for 'Python' and install the extension published by Microsoft.
Create a New Project Folder:

Create a new folder on your computer where your project will reside.
Open this folder in VS Code by using File > Open Folder.
Set Up a Virtual Environment:

Open the VS Code terminal by using Terminal > New Terminal.

Create a new virtual environment by running the following command:

bash
Copy code
python -m venv venv
Replace venv with whatever you want to name your virtual environment.

Activate the Virtual Environment:

In the VS Code terminal, activate the virtual environment by running:

On Windows:
bash
Copy code
.\venv\Scripts\Activate
On macOS and Linux:
bash
Copy code
source venv/bin/activate
Your terminal should now indicate that the virtual environment is active by showing its name in parentheses.

Install Flask:

With the virtual environment activated, install Flask using pip:

To install all the packages listed in requirements.txt, run:
pip install -r requirements.txt
This will install the exact versions of the packages that your project requires

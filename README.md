# Daily Conundrum Installation Guide

## Overview

Our website features different elements such as: user account management, a simple game, a scoreboard, an about page, and a contact form.
It has not been published yet, so you need to store it locally. To access our website you need to first download our repository and save it in a easy to find seperate folder. After you have downloaded the repository, you can follow the following steps to install Flask (a Python library for handling some of the back-end tasks of our website). 

## Installation

## Step 1: Install Python

First, ensure that Python is installed on your system. You can download it from [Python's official website](https://www.python.org/downloads/).

## Step 2: Create a Virtual Environment

Navigate to your project directory in the terminal or command prompt. Then, create a virtual environment using the following command:

1. ```bash
   python -m venv myenv 

After creating the virtual environment, you need to activate it.

## On Windows:
1. ```cmd
   myenv\Scripts\activate

## On macOS and Linux:
1. ```bash
   source myenv/bin/activate

### Continue the next steps:
1. Clone the repository from the GitHub Repository Link.
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
3. Run the main.py file and a local link should appear.

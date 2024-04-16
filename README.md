# BinaryHire Project Setup Guide

## Frontend (React Version 18.2)

1. **Node Version: 20.11**
   
   Open terminal and navigate to the BH.ClientApp folder.

2. **Install Dependencies:**
```powershell
npm install
```

3. **Run Development Server:**
```powershell
npm run dev
```


## Database

1. **Navigate to the DBScript folder.**

2. **Modify `DatabaseDeployment.ps1` with any text editor.**

3. **Change the following variables according to your setup:**

```powershell
$ServerInstance = ""
$UserName = ""
$UserPassword = ""
```
4. **Run the modified file with PowerShell.**

## Backend API (Dotnet Core 6)

1. **Install .NET Core Runtime and SDK.**

2. **Navigate to the BH.API folder.**

3. **Modify appsettings.json with any text editor.**

4. **Change the 'ConnectionStrings', 'PythonApiBaseUrl'  and 'LocalPath' variable according to your setup:**
```powershell
"ConnectionStrings": {
    "BHDB": "Enter your connection string here"
},
"APISettings": {
    "LocalPath": "Enter your dotnet API server local path for CV analysing",
    "PythonApiBaseUrl": "http://127.0.0.1:5000/"
  }
```

5. **Build and Run the Dotnet Core API:**
```powershell
dotnet run
```

## Python ML Setup (Python Version 3.9.6 - 3.9.10)

1. **Install NLTK and Spacy:**
```powershell
pip install nltk
python -m spacy download en_core_web_sm
python -m nltk.downloader words
python -m nltk.downloader stopwords
pip install spacy==2.3.5
pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.3.1/en_core_web_sm-2.3.1.tar.gz
```

2. **Install Pyresparser and Flask:**

```powershell
pip install pyresparser
pip install Flask
pip install Flask-Cors
pip install bs4
pip install requests
```
## Run Python API
1. **Navigate to BH.ML folder.**

2. **Run the following command:**
```powershell
python main.py
```

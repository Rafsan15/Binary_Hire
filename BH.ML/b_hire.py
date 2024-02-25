from pyresparser import ResumeParser
import json
import sys
def process_input(input_data):
    data = ResumeParser(input_data).get_extracted_data()
    print(json.dumps(data))
    sys.stdout.flush()

if len(sys.argv) > 1:
    input_from_csharp = sys.argv[1]
    process_input(input_from_csharp)
else:
    print("No input provided from C#.")

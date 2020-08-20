import json
import os
def get_json_as_arr(filename: str):
	json_file = open(os.path.dirname(__file__) + filename)
	json_obj = json.load(json_file)
	if isinstance(json_obj, list):
		return json_obj
	else:
		raise TypeError("JSON top level should be an array")
	
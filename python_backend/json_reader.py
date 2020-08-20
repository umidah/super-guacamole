import json
def get_json_as_arr(json_file):
	json_obj = json.load(json_file)
	if isinstance(json_obj, list):
		return json_obj
	else:
		raise TypeError("JSON top level should be an array")


def write_to_json_file(json_file, json_obj):
	 json.dump(json_obj, json_file)
	
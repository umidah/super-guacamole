import json_reader as jr
data_filename = "/../data.json"
json_file = open(os.path.dirname(__file__) + data_filename)


def main():
	data_arr = jr.get_json_as_arr()
	print(data_arr)


if __name__ == "__main__":
	main()
import json_reader as jr
import os
data_filename = "../data.json"
json_file = open(os.path.dirname(__file__) + data_filename)


def main():
	data_arr = jr.get_json_as_arr(json_file)
	print(data_arr)


if __name__ == "__main__":
	main()
import json

with open('./data/google-10000-english-no-swears.txt') as f:
    lines = f.readlines()
    dictionary = {}

    for line in lines:
        line = line.strip()

        dictionary[line] = 1
        print(line)

    fh = open("./data/words_dictionary.json", "w")

    fh.write(json.dumps(dictionary))

    fh.close()

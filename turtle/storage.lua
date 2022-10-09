local storage = {}

Tools = require("tools")
Json = require("json")
Base64 = require("base64")

function storage.readData()
    local file = fs.open("turtle.json", "r")

    if file then
        local data = file.readAll()
        file.close()

        return Json.decode(data)
    end

    return nil
end

function storage.writeData(data)
	local file = fs.open("turtle.json", "w")
	file.write(data)
	file.close()
end


function storage.readName()
    local data = storage.readData()

    if data ~= nil then
        return data["name"]
    end

    local adjectives = {
		"good",
		"new",
		"first",
		"last",
		"long",
		"great",
		"little",
		"own",
		"other",
		"old",
		"right",
		"big",
		"high",
		"different",
		"small",
		"large",
		"next",
		"early",
		"young",
		"important",
		"few",
		"public",
		"bad",
		"same",
		"able",
	}

	local names = {
		"Zeus",
		"Hera",
		"Poseidon",
		"Demeter",
		"Ares",
		"Athena",
		"Apollo",
		"Artemis",
		"Hephaestus",
		"Aphrodite",
		"Hermes",
		"Dionysus",
		"Hades",
		"Hypnos",
		"Nike",
		"Janus",
		"Nemesis",
		"Iris",
		"Hecate",
		"Tyche",
	}

	return Tools.randTableItem(adjectives) .. Tools.randTableItem(names)
end

function storage.readUUID()
    local data = storage.readData()
    
    if data ~= nil then
		return data["uuid"]
	end

    local uuid = ""
    local chars = {"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"}

    for i = 1, 32 do
        uuid = uuid .. Tools.randTableItem(chars)
    end

    return uuid
end

function storage.readPosition()
    local data = storage.readData()
    
    if data ~= nil then
        return data["position"]
    end

    return {x = 0, y = 0, z = 0}
end

function storage.readOrientation()
    local data = storage.readData()
    
    if data ~= nil then
        return data["orientation"]
    end

    return "north"
end

return storage
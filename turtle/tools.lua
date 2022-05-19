Json = require("json")

local tools = {}

-- Like inspect, except returns block name or "minecraft:air" when no block is present
function tools.inspect(args)
	direction = args[1]

	if direction == "forward" then
		local has_block, data = turtle.inspect()
		if has_block then
			return data["name"]
		else
			return "minecraft:air"
		end
	end

	if direction == "up" then
		local has_block, data = turtle.inspectUp()
		if has_block then
			return data["name"]
		else
			return "minecraft:air"
		end
	end

	if direction == "down" then
		local has_block, data = turtle.inspectDown()
		if has_block then
			return data["name"]
		else
			return "minecraft:air"
		end
	end

	if direction == "left" then
		turtle.turnLeft()
		local has_block, data = turtle.inspect()
		turtle.turnRight()
		if has_block then
			return data["name"]
		else
			return "minecraft:air"
		end
	end

	if direction == "right" then
		turtle.turnRight()
		local has_block, data = turtle.inspect()
		turtle.turnLeft()
		if has_block then
			return data["name"]
		else
			return "minecraft:air"
		end
	end

	if direction == "backward" then
		turtle.turnRight()
		turtle.turnRight()
		local has_block, data = turtle.inspect()
		turtle.turnLeft()
		turtle.turnLeft()
		if has_block then
			return data["name"]
		else
			return "minecraft:air"
		end
	end
end

-- Returns a random element of a table
function tools.randTableItem(myTable)
	return myTable[math.random(1, #myTable)]
end

-- Returns a random name containing one adjective and name
function tools.createName()
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

	return tools.randTableItem(adjectives) .. tools.randTableItem(names)
end

-- Iterate through all slots and refuel turtle - returns turtle fuel level
function tools.refuel()
	for i = 1, 16 do
		turtle.select(i)
		turtle.refuel()
	end

	return turtle.getFuelLevel()
end

-- Returns table containing inventory data (name and count)
function tools.getInventory()
	local inventory = {}

	for slot = 1, 16, 1 do
		local item = turtle.getItemDetail(slot)

		if item ~= nil then
			inventory[slot] = { name = item["name"], count = item["count"] }
			if item["name"] == itemName then
				return slot
			end
		else
			inventory[slot] = { name = "minecraft:air", count = 1 }
		end
	end

	return inventory
end

-- Turns the direction and amount specified
function tools.turn(rotations, direction)
	if direction == "right" then
		for _ = 1, rotations, 1 do
			turtle.turnRight()
		end
	end
	if direction == "left" then
		for _ = 1, rotations, 1 do
			turtle.turnLeft()
		end
		rotations = rotations * -1
	end

	return Json.encode({
		command = "setValue",
		valueName = "direction",
		offset = rotations,
	})
end

-- Like move, but better
function tools.move(args)
	direction = args[1]
	blocks = tonumber(args[2])

	if direction == "up" then
		turtle.up()
	end
	if direction == "down" then
		turtle.down()
	end
	if direction == "left" then
		turtle.turnLeft()
		turtle.forward()
		turtle.turnRight()
	end
	if direction == "right" then
		turtle.turnRight()
		turtle.forward()
		turtle.turnLeft()
	end
	if direction == "forward" then
		turtle.forward()
	end
	if direction == "backward" then
		turtle.backward()
	end
end

-- Like dig, but better
function tools.dig(args)
	direction = args[1]

	if direction == "up" then
		turtle.digUp()
	end
	if direction == "down" then
		turtle.digDown()
	end
	if direction == "left" then
		turtle.turnLeft()
		turtle.dig()
		turtle.turnRight()
	end
	if direction == "right" then
		turtle.turnRight()
		turtle.dig()
		turtle.turnLeft()
	end
	if direction == "forward" then
		turtle.dig()
	end
	if direction == "backward" then
		tools.turn(2, "right")
		turtle.dig()
		tools.turn(2, "left")
	end
end

-- Like place, but better
function tools.place(args)
	direction = args[1]

	if direction == "up" then
		turtle.placeUp()
	end
	if direction == "down" then
		turtle.placeDown()
	end
	if direction == "left" then
		turtle.turnLeft()
		turtle.place()
		turtle.turnRight()
	end
	if direction == "right" then
		turtle.turnRight()
		turtle.place()
		turtle.turnLeft()
	end
	if direction == "forward" then
		turtle.place()
	end
	if direction == "backward" then
		tools.turn(2, "right")
		turtle.place()
		tools.turn(2, "left")
	end
end

-- Like drop, but better
function tools.drop(args)
	direction = args[1]
	count = tonumber(args[2])

	if direction == "up" then
		turtle.drop(count)
	end
	if direction == "down" then
		turtle.dropDown(count)
	end
	if direction == "left" then
		turtle.turnLeft()
		turtle.drop(count)
		turtle.turnRight()
	end
	if direction == "right" then
		turtle.turnRight()
		turtle.drop(count)
		turtle.turnLeft()
	end
	if direction == "forward" then
		turtle.drop(count)
	end
	if direction == "backward" then
		tools.turn(2, "right")
		turtle.drop(count)
		tools.turn(2, "left")
	end
end

-- Like turtle.select, but better
function tools.select(args)
	turtle.select(args[1])
end

-- Like turtle.craft, but better
function tools.craft(args)
	turtle.craft(args[1])
end

-- Like turtle.refuel, but better
function tools.refuel(args)
	turtle.refuel(args[1])
end

-- like .split() in python
function tools.split(inputstr, sep)
	if sep == nil then
		sep = "%s"
	end

	local t = {}
	for str in string.gmatch(inputstr, "([^" .. sep .. "]+)") do
		table.insert(t, str)
	end

	return t
end

-- Eval - loadstring looks ugly
function tools.eval(expression)
	local func = loadstring(expression)
	return func()
end

-- Basic turtle setup
function tools.init()
	-- Name should always be equal to the computer label
	if os.getComputerLabel() ~= nil then
		Name = os.getComputerLabel()
	else
		Name = tools.createName()
		os.setComputerLabel(Name)
	end
end

-- Better than eval, I think it's important for this to be located
-- at the bottom of the file, I could be wrong tho
function tools.callFunc(func, arguments, module)
	arguments = tools.split(arguments, ",")

	if module == "global" then
		return _G[func](arguments)
	end

	if module == "tools" then
		return tools[func](arguments)
	end

	if module == "turtle" then
		return turtle[func](arguments)
	end

	return { "command" }
end

return tools

local tools = {}

function tools.turn(client, direction, count)
    if direction == "left" then
        for i = 1, count do
            local turned, _ = turtle.turnLeft()
            
            if turned then tools.updateFacing(client, "left") end
        end
    elseif direction == "right" then
        for i = 1, count do
            local turned, _ = turtle.turnRight()
            
            if turned then tools.updateFacing(client, "right") end
        end
    end
end

function tools.select(client, slot)
    local selected, _ = turtle.select(slot)
    
    if selected then client.selectedSlot = slot end
end

function tools.place(client, direction)
    if direction == "up" then
        turtle.placeUp()
    end

    if direction == "down" then
        turtle.placeDown()
    end

    if direction == "forward" then
        turtle.place()
    end

    if direction == "back" then
        tools.turn(client, "left", 2)
        turtle.place()
        tools.turn(client, "left", 2)
    end

    if direction == "left" then
        tools.turn(client, "left", 1)
        turtle.place()
        tools.turn(client, "right", 1)
    end

    if direction == "right" then
        tools.turn(client, "right", 1)
        turtle.place()
        tools.turn(client, "left", 1)
    end
end

function tools.dig(client, direction)
    if direction == "up" then
        turtle.digUp()
    end

    if direction == "down" then
        turtle.digDown()
    end

    if direction == "forward" then
        turtle.dig()
    end

    if direction == "back" then
        tools.turn(client, "left", 2)
        turtle.dig()
        tools.turn(client, "left", 2)
    end

    if direction == "left" then
        tools.turn(client, "left", 1)
        turtle.dig()
        tools.turn(client, "right", 1)
    end

    if direction == "right" then
        tools.turn(client, "right", 1)
        turtle.dig()
        tools.turn(client, "left", 1)
    end
end

function tools.move(client, direction, count)
    if direction == "right" then
        tools.turn(client, "right", 1)
        tools.move(client, "forward", count)
        tools.turn(client, "left", 1)
        return
    end

    if direction == "left" then
        tools.turn(client, "left", 1)
        tools.move(client, "forward", count)
        tools.turn(client, "right", 1)
        return
    end

    for i = 1, count do
        if direction == "forward" then
            local moved, _ = turtle.forward()
            
            if moved then tools.updatePosition(client, "forward") end
        end

        if direction == "back" then
            local moved, _ = turtle.back()
            
            if moved then tools.updatePosition(client, "back") end
        end

        if direction == "up" then
            local moved, _ = turtle.up()
            
            if moved then tools.updatePosition(client, "up") end
        end

        if direction == "down" then
            local moved, _ = turtle.down()
            
            if moved then tools.updatePosition(client, "down") end
        end
    end
end

function tools.updateFacing(client, direction)
    if direction == "left" then
        if client.orientation == "north" then
            client.orientation = "west"
        elseif client.orientation == "west" then
            client.orientation = "south"
        elseif client.orientation == "south" then
            client.orientation = "east"
        elseif client.orientation == "east" then
            client.orientation = "north"
        end
    elseif direction == "right" then
        if client.orientation == "north" then
            client.orientation = "east"
        elseif client.orientation == "east" then
            client.orientation = "south"
        elseif client.orientation == "south" then
            client.orientation = "west"
        elseif client.orientation == "west" then
            client.orientation = "north"
        end
    end
end

function tools.updatePosition(client, direction)
    if direction == "forward" then
        if client.orientation == "north" then
            client.position.z = client.position.z - 1
        elseif client.orientation == "east" then
            client.position.x = client.position.x + 1
        elseif client.orientation == "south" then
            client.position.z = client.position.z + 1
        elseif client.orientation == "west" then
            client.position.x = client.position.x - 1
        end
    elseif direction == "back" then
        if client.orientation == "north" then
            client.position.z = client.position.z + 1
        elseif client.orientation == "east" then
            client.position.x = client.position.x - 1
        elseif client.orientation == "south" then
            client.position.z = client.position.z - 1
        elseif client.orientation == "west" then
            client.position.x = client.position.x + 1
        end
    elseif direction == "up" then
        client.position.y = client.position.y + 1
    elseif direction == "down" then
        client.position.y = client.position.y - 1
    end
end

function tools.initInventory()
    local inventory = {}
    
    for i = 1, 16 do
        inventory[i] = { name = "minecraft:air", count = 1 }
    end

    return inventory
end

function tools.updateInventory(client)
	for slot = 1, 16 do
		local item = turtle.getItemDetail(slot)

		if item ~= nil then
			client.inventory[slot] = { name = item["name"], count = item["count"] }
        else
			client.inventory[slot] = { name = "minecraft:air", count = 1 }
		end
	end
end

function tools.updateFuelLevel(client)
    local fuelLevel = turtle.getFuelLevel()

    if fuelLevel == "unlimited" then
        client.fuelLevel = 999999
        return
    end

    client.fuelLevel = fuelLevel
end

function tools.updateSelectedSlot(client)
    client.selectedSlot = turtle.getSelectedSlot()
end

function tools.randTableItem(table)
	return table[math.random(1, #table)]
end

function tools.serializeClient(client)
    return Json.encode({
        name = client.name,
        uuid = client.uuid,
        position = client.position,
        orientation = client.orientation,
        inventory = client.inventory,
        selectedSlot = client.selectedSlot,
        fuelLevel = client.fuelLevel,
    })
end

return tools
local api = {}

Tools = require("tools")

function api.serialzeCritical(client)
    return Json.encode({
        name = client.name,
        uuid = client.uuid,
        position = client.position,
        orientation = client.orientation,
    })

end

function api.serializeClient(client)
    return Json.encode({
        name = client.name,
        uuid = client.uuid,
        position = client.position,
        orientation = client.orientation,
        inventory = client.inventory,
        selectedSlot = client.selectedSlot
    })
end

function api.startupMessage(client)
    return Json.encode({
        name = client.name,
        uuid = client.uuid,
        position = client.position,
        orientation = client.orientation,
        inventory = client.inventory,
        selectedSlot = client.selectedSlot,
        type = "startup"
    })
end

function api.handleMessage(message, client)
    local command = message["command"]

    if command == "move" then
        Tools.move(client, message["direction"], message["count"])
    end

    if command == "turn" then
        Tools.turn(client, message["direction"], message["count"])
    end

    if command == "select" then
        Tools.select(client, message["slot"])
    end

    if command == "place" then
        Tools.place(client, message["direction"])
    end

    if command == "dig" then
        Tools.dig(client, message["direction"])
    end

    if command == "ping" then

    end

    client.wsConnection.send(Tools.serializeClient(client))
end

return api

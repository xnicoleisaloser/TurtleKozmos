Tools = require "tools"
Json = require "json"
Base64 = require "base64"

local api = {}

-- Should be called occasionally and as a response to every command
function api.heartbeat()
    return Json.encode({
        name = Name,
        command = "heartbeat",
        fuelLevel = turtle.getFuelLevel(),
        blockFront = Tools.inspect({"forward"}),
        blockBelow = Tools.inspect({"down"}),
        blockAbove = Tools.inspect({"up"}),
        inventory = Tools.getInventory()
    })
end

-- Where the magic happens
function api.parseMessage(message, wsConnection, name)
    local command = message["command"]

    if command == "eval" then return Json.encode({name = name, command = "eval", response = Base64.encode(Tools.eval(Base64.decode(message["expression"])))})
    elseif command == "callFunc" then
        response = Tools.callFunc(message["function"], message["arguments"], message["module"])

        if response ~= nil then
            response["name"] = name
            return Json.encode(name)
        else
            return api.heartbeat()
        end

    elseif command == "close" then wsConnection.close(); error("Close Signal Received")
    elseif command == "heartbeat" then return api.heartbeat()
    else error("Command not found!")
    end
end


return api
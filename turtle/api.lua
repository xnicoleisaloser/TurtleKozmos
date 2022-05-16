Tools = require "tools"
Json = require "json"
Base64 = require "base64"

local api = {}

-- Should be called occasionally and as a response to every command
function api.heartbeat()
    return Json.encode({
        name = Name,
        type = "heartbeat",
        fuelLevel = turtle.getFuelLevel(),
        blockFront = Tools.inspect({"forward"}),
        blockBelow = Tools.inspect({"down"}),
        blockAbove = Tools.inspect({"up"}),
        inventory = Tools.getInventory()
    })
end

-- Where the magic happens
function api.parseMessage(message, wsConnection, name)
    local type = message["type"]

    if type == "eval" then return Json.encode({name = name, type = "eval", response = Base64.encode(Tools.eval(Base64.decode(message["expression"])))})
    elseif type == "callFunc" then return Json.encode({name = name, command, response = Tools.callFunc(message["function"], message["arguments"])})
    elseif type == "close" then wsConnection.close(); error("Close Signal Received")
    elseif type == "heartbeat" then return api.heartbeat()
    else error("Instruction type not found!")
    end
end


return api
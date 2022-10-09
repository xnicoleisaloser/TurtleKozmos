Json = require("json")
Base64 = require("base64")
Api = require("api")
Tools = require("tools")
Storage = require("storage")

local HOST = {}

-- Connects to host and returns websocket object
local function initWS()
	local ws, err = http.websocket(HOST)

	if ws then
		return ws
	end
	print("Failed to connect to host: " .. err)
end

-- Main networking loop
local function networkLoop(client)
	local event, url, message, jsonData

	client.wsConnection.send(Api.startupMessage(client))

	while true do
		client.wsConnection.send(Api.serializeClient(client))
		Storage.writeData(Api.serialzeCritical(client))

		repeat
			event, url, message = os.pullEvent("websocket_message")
		until url ~= nil

		jsonData = Json.decode(message)

		print("Command Received: " .. jsonData["command"])

		Api.handleMessage(jsonData, client)
		-- wsConnection.send(Api.parseMessage(jsonData, wsConnection, Name))
	end
end

local client = {
	name = Storage.readName(),
	uuid = Storage.readUUID(),
	wsConnection = initWS(),
	position = Storage.readPosition(),
	orientation = Storage.readOrientation(),
	inventory = {},
	fuelLevel = 0,
	selectedSlot = 0,
}

Tools.updateInventory(client)
Tools.updateFuelLevel(client)
Tools.updateSelectedSlot(client)

networkLoop(client)

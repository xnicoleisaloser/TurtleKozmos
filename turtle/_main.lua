Json = require("json")
Base64 = require("base64")
Api = require("api")
Tools = require("tools")
Host = { replace_me }

-- Connects to host and returns websocket object
local function initWS()
	local ws, error = http.websocket(Host)

	if ws then
		return ws
	end
end

local function networkLoop(wsConnection)
	local event, url, message, jsonData

	while true do
		wsConnection.send(Api.heartbeat())

		repeat
			event, url, message = os.pullEvent("websocket_message")
		until url ~= nil

		jsonData = Json.decode(message)

		print("Command Received: " .. jsonData["command"])

		wsConnection.send(Api.parseMessage(jsonData, wsConnection, Name))
	end
end

Tools.init()

local wsConnection = initWS()
networkLoop(wsConnection)

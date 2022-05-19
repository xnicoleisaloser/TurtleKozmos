local expose = {}
Tools = require("tools")
-- Uses fancy hacks to expose our standard library functions to loadstring
-- This might break everything, be warned.

function expose.init()
	local lines = {}

	for k, library in pairs({ "json", "base64", "tools", "api" }) do
		local file = fs.open("/" .. library .. ".lua", "r")

		while true do
			local line = file.readLine()

			-- If line is nil then we've reached the end of the file and should stop
			if not line then
				break
			end

			if line == "return " .. library then
				line = ""
			end

			if string.find(line, "require") then
				line = ""
			end

			if string.find(line, Tools.firstToUpper(library) .. ".") then
				line = string.gsub(line, Tools.firstToUpper(library) .. ".", library .. ".")
			end

			lines[#lines + 1] = line
		end

		file.close()

		output = [[]]

		for k, lineInTable in pairs(lines) do
			output = output .. lineInTable .. "\n"
		end
	end

	local outFile = fs.open("libraries.lua", "w")
	outFile.write(output)
	outFile.close()
end

return expose

-- wget run http://67.249.253.213:5678/startup.lua

local HOST = {}

local INSTALL_PATH = "ControlPanel"

local FILES = {
  "json.lua",
  "base64.lua",
  "api.lua",
  "storage.lua",
  "tools.lua",
  "main.lua"
}

local ROOT_FILES = {
  "startup.lua"
}

local function download_files()
  for _, file in pairs(ROOT_FILES) do
    shell.run("wget " .. HOST .. file)
  end

  for _, file in pairs(FILES) do
    shell.run("wget " .. HOST .. file .. " " .. INSTALL_PATH .. "/" .. file)
  end
end

local function delete_files()
  for _, file in pairs(ROOT_FILES) do
    shell.run("rm " .. file)
  end

  for _, file in pairs(FILES) do
    shell.run("rm " .. INSTALL_PATH .. "/" .. file)
  end
end

local function update()
  delete_files()
  download_files()
  term.clear()
  shell.run(INSTALL_PATH .. "/" .. "main.lua")
end

update()

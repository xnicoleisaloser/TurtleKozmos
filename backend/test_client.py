import asyncio
import json
import websockets

HOST = "ws://localhost:8765"
NAME = "Admin"

def load_command_list():
    with open("src/command_list.json") as file:
        return json.loads(file.read())




def parse_command(command: str):
    command_parts = command.split(' ')
        
async def list_clients(websocket):
    await websocket.send()

async def connect_as_admin():
    # Establish Connection
    async with websockets.connect(HOST) as websocket:
        # Login
        await websocket.send(json.dumps({"name": "Admin", "command": "login"}))
        # Event loop
        while True:
            command_str = input("> ")

            


command_list = load_command_list()
# asyncio.run(connect_as_admin())

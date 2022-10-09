import { ActionIcon, Menu, Accordion, SimpleGrid, MantineProvider, Text, Card, Image, Badge, Collapse, Group, Header, Grid } from "@mantine/core";
import { IconDots, IconTrashX, IconSwitch3, IconTrash, IconCaretDown, IconCaretUp } from "@tabler/icons";
import { useState } from "react";
import Draggable from "react-draggable";
import InventoryCell from "./InventoryCell";

export default function Inventory() {
  const [opened, setOpened] = useState(true);
  let toggleDropdownIcon = opened ? <IconCaretUp size={16} /> : <IconCaretDown size={16} />;

  return (
    <Draggable handle=".handle">
      <Card withBorder shadow="sm" radius="md" style={{ padding: 8, paddingTop: 16, paddingBottom: 8 }}>
        <Card.Section withBorder inheritPadding py="xs" className="handle" style={{ userSelect: "none", caretColor: "transparent" }}>
          <Group position="apart">
            <Text weight={500}>Inventory</Text>
            <Group spacing={2}>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <ActionIcon style={{ margin: 0, padding: 0 }} onClick={() => setOpened((o) => !o)}>
                  {toggleDropdownIcon}
                </ActionIcon>

                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconSwitch3 size={14} />}>Switch selected items</Menu.Item>
                  <Menu.Item icon={<IconTrashX size={14} />}>Drop selected item</Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />}>Drop all items</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Card.Section>
        <>
          <Collapse in={opened}>
            <>
              <SimpleGrid cols={4} spacing="sm" style={{ paddingTop: 8 }}>
                <InventoryCell item={"coal"} quantity={5} />
                <InventoryCell item={"diamond"} quantity={64} />
                <InventoryCell item={"redstone"} quantity={3} />
                <InventoryCell item={"oak_sign"} quantity={1} />
                <InventoryCell item={"cobblestone"} quantity={18} />
                <InventoryCell item={"iron_ore"} quantity={12} selected={true} />
                <InventoryCell item={"iron_ingot"} quantity={53} />
                <InventoryCell item={"snowball"} quantity={16} />
                <InventoryCell item={"ender_pearl"} quantity={16} />
                <InventoryCell item={"golden_apple"} quantity={8} />
                <InventoryCell item={"arrow"} quantity={43} />
                <InventoryCell item={"bow"} quantity={1} />
                <InventoryCell item={"netherite_chestplate"} quantity={1} />
                <InventoryCell item={"carrot"} quantity={27} />
                <InventoryCell item={"command_block"} quantity={21} />
                <InventoryCell item={"bedrock"} quantity={5} />
              </SimpleGrid>
            </>
          </Collapse>
        </>
      </Card>
    </Draggable>
  );
}

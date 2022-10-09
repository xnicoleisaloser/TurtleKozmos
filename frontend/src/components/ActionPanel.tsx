import { ActionIcon, Menu, Tooltip, SimpleGrid, Text, Card, Image, Badge, Button, Group, Header, Grid } from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash, IconArrowUp, IconCornerUpLeft, IconCornerUpRight, IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowsUp, IconArrowsDown } from "@tabler/icons";
import Draggable from "react-draggable";

export default function MovementPanel() {
  return (
    <Draggable handle=".handle">
      <Card withBorder shadow="sm" radius="md" style={{ padding: 8, paddingTop: 16 }}>
        <Card.Section withBorder inheritPadding py="xs" className="handle" style={{ userSelect: "none", caretColor: "transparent" }}>
          <Group position="apart">
            <Text weight={500}>Action Panel</Text>

            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item>
                <Menu.Item icon={<IconEye size={14} />}>Preview all</Menu.Item>
                <Menu.Item icon={<IconTrash size={14} />} color="red">
                  Delete all
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>

        <SimpleGrid cols={4} spacing="sm" style={{ paddingTop: 8 }}>
          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconCornerUpLeft size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconArrowUp size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconCornerUpRight size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconArrowsUp size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconArrowLeft size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconArrowDown size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconArrowRight size={32} />
          </Button>

          <Button variant="outline" color="gray" style={{ width: 90, height: 90, borderRadius: 8 }}>
            <IconArrowsDown size={32} />
          </Button>
        </SimpleGrid>
      </Card>
    </Draggable>
  );
}

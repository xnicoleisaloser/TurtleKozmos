import { ActionIcon, Menu, Col, Tooltip, SimpleGrid, ThemeIcon, RingProgress, Center, MantineProvider, Text, Card, Image, Badge, Button, Group, Header, Grid } from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons";
import Draggable from "react-draggable";

export default function InfoPanel() {
  return (
    <Draggable handle=".handle">
      <Card withBorder shadow="sm" radius="md" style={{ padding: 8, paddingTop: 16, paddingBottom: 8 }}>
        <Card.Section withBorder inheritPadding py="xs" className="handle" style={{ userSelect: "none", caretColor: "transparent" }}>
          <Group position="apart">
            <Text weight={500}>Info Panel</Text>

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

        <SimpleGrid cols={2}>
          <Grid style={{ marginTop: 10 }}>
            <Col>
              <Text style={{ margin: 0, padding: 0 }}>Name: magnificentApollo</Text>
              <Text style={{ margin: 0, padding: 0 }}>ID: 0x92E12BEF</Text>
              <Text style={{ margin: 0, padding: 0 }}>Facing: North</Text>
              <Text style={{ margin: 0, padding: 0 }}>Coords: -312, 63, 209</Text>
            </Col>
          </Grid>
          <Tooltip label="Fuel Level">
            <RingProgress
              style={{ marginLeft: 65, marginTop: 10 }}
              sections={[{ value: 40, color: "blue" }]}
              label={
                <Text color="blue" weight={700} align="center" size="xl">
                  40%
                </Text>
              }
            />
          </Tooltip>
        </SimpleGrid>
      </Card>
    </Draggable>
  );
}

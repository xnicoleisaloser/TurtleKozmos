import Draggable from "react-draggable";
import { Card, Group, Text, Menu, SimpleGrid, Col, Grid, ActionIcon, ScrollArea, Button, SegmentedControl } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";

export default function TurtleList() {
  return (
    <Draggable handle=".handle">
      <Card withBorder shadow="sm" radius="md" style={{ width: 250, padding: 8, paddingTop: 16, paddingBottom: 8 }}>
        <Card.Section withBorder inheritPadding py="xs" className="handle" style={{ userSelect: "none", caretColor: "transparent" }}>
          <Group position="apart">
            <Text weight={500}>Turtle List</Text>

            <Menu withinPortal position="bottom-end" shadow="sm">
              <ActionIcon>
                <IconRefresh size={16} />
              </ActionIcon>
            </Menu>
          </Group>
        </Card.Section>
        <ScrollArea scrollbarSize={2} style={{ width: "auto", height: 250, paddingTop: 8, margin: 0 }}>
          <SegmentedControl
            style={{ height: "auto", width: "auto", marginTop: 2, marginBottom: 0, marginLeft: 8, marginRight: 8 }}
            orientation={"vertical"}
            data={[
              { label: "largeFortnite", value: "react" },
              { label: "magicGirl", value: "ng" },
              { label: "apollo", value: "svelte" },
              { label: "nikki", value: "svelte2" },
              { label: "svelte", value: "svelte4" },
              { label: "vue", value: "svelte5" },
              { label: "react", value: "svelte6" },
            ]}
          ></SegmentedControl>
        </ScrollArea>
      </Card>
    </Draggable>
  );
}

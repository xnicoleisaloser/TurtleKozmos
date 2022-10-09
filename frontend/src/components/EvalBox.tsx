import { useState } from "react";
import { IconRouter, IconPlayerPlay } from "@tabler/icons";
import Draggable from "react-draggable";
import CodeEditor from "@uiw/react-textarea-code-editor";

import { Card, Group, Text, ActionIcon, Menu, ScrollArea, Tooltip } from "@mantine/core";

export default function EvalBox() {
  const [code, setCode] = useState('print("Hello World!")');

  return (
    <Draggable handle=".handle">
      <Card withBorder shadow="sm" radius="md" style={{ padding: 8, paddingTop: 16, paddingBottom: 8 }}>
        <Card.Section withBorder inheritPadding py="xs" className="handle" style={{ userSelect: "none", caretColor: "transparent" }}>
          <Group position="apart">
            <Text weight={500}>Execute Code</Text>
            <Group position="right" spacing={2}>
              <Tooltip.Floating position="top" label="Run on All Turtles">
                <ActionIcon>
                  <IconRouter size={16} />
                </ActionIcon>
              </Tooltip.Floating>
              <Tooltip.Floating position="top" label="Run on Selected Turtle">
                <ActionIcon>
                  <IconPlayerPlay size={16} />
                </ActionIcon>
              </Tooltip.Floating>
            </Group>
          </Group>
        </Card.Section>
        <ScrollArea scrollbarSize={2} style={{ width: "auto", height: 250, margin: 0 }}>
          <CodeEditor
            value={code}
            language="lua"
            onChange={(evn) => setCode(evn.target.value)}
            padding={0}
            style={{
              width: "auto",
              height: "auto",
              marginTop: 8,
              fontSize: 12,
              backgroundColor: "transparent",
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </ScrollArea>
      </Card>
    </Draggable>
  );
}

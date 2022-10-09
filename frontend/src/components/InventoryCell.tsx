import { Button, Text } from "@mantine/core";
import { useState } from "react";

export default function InventoryCell(props: any) {
  const styles = {
    width: 90,
    height: 90,
    borderRadius: 8,
  };

  let imageUrl = `minecraftIcons/${props.item}.png`;

  const color = props.selected ? "blue" : "gray";

  return (
    <>
      <Button variant="outline" color={color} style={styles}>
        <img src={imageUrl} alt={props.item}></img>
        <Text style={{ color: "white", position: "absolute", bottom: 4, right: 8, textAlign: "center", userSelect: "none", caretColor: "transparent" }}>{props.quantity}</Text>
      </Button>
    </>
  );
}

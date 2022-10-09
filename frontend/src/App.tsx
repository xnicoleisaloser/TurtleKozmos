import { MantineProvider } from "@mantine/core";
import Inventory from "./components/Inventory";
import ActionPanel from "./components/ActionPanel";
import InfoPanel from "./components/InfoPanel";
import TurtleList from "./components/TurtleList";
import EvalBox from "./components/EvalBox";

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <Inventory></Inventory>
      <ActionPanel></ActionPanel>
      <InfoPanel></InfoPanel>
      <TurtleList></TurtleList>
      <EvalBox></EvalBox>
    </MantineProvider>
  );
}

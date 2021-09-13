import { AppBar, Toolbar } from "@material-ui/core";

export default function Header() {
  return (
    <header>
      <AppBar position="sticky"><Toolbar>Privately</Toolbar></AppBar>
    </header>
  );
}

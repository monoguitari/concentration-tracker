import { Button } from "@/components/ui/button"
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
// @ts-ignore
import { Header } from "./components/header";
import { DrawerDialogDemo } from "./components/login";


function App() {
    return (
        <div>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {/* p */}
                <Header />
                {/* <Button>Click me</Button> */}
                <ModeToggle />
                {/* <DrawerDialogDemo />     */}

            </ThemeProvider>
        </div>
    )
}   

export default App;

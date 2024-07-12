// import { Button } from "@/components/ui/button"
import { ThemeProvider } from "./components/theme-provider";
// import { ModeToggle } from "./components/mode-toggle";
// @ts-ignore
import { Header } from "./components/header";
// @ts-ignore
import { Home } from "./pages/home";
// @ts-ignore
import { Profile } from "./pages/profile";
// import { DrawerDialogDemo } from "./components/login";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// @ts-ignore
import { Separator } from "./components/ui/separator";

const Layout = () =>{
    return(
        <div>
            <Header />
            <Separator />
            <Outlet />
        </div>
    )
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            }, 
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ]
    },
   
]);
function App() {
    return (
        <div>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {/* p */}
                <RouterProvider router={router}/>
                {/* <Button>Click me</Button> */}
                {/* <ModeToggle /> */}
                {/* <DrawerDialogDemo />     */}

            </ThemeProvider>
        </div>
    )
}   

export default App;

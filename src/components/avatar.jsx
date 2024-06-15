import { Button } from "@/components/ui/button"
// @ts-ignore
import { auth } from '../config/firebase'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from 'lucide-react';
import { DrawerDialogDemo } from "../components/login";
import { ModeToggle } from "../components/mode-toggle";



export function Avatar() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
        }).catch(err => console.error(err))
    }
    console.log(auth?.currentUser)
    return (
            <div className="flex">
                {user ? 
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full">
                            <img src={user.photoURL} alt="profile picture"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {userSignOut()}}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                : <DrawerDialogDemo />}
            </div>
    )
}

export default Avatar;

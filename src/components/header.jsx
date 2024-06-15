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
import { Avatar } from "../components/avatar"


export function Header() {
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
        <div className="flex justify-between align-center p-20">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Concentration Tracker</h1>
            <div className="flex">
                <ModeToggle />
                <Avatar />
            </div>
            
        </div>
    )
}

export default Header;

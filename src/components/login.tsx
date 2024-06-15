import * as React from "react"

import { cn } from "@/lib/utils"
// @ts-ignore
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
// @ts-ignore
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"


export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
                Enter your email below to login to your account
            </DialogDescription>
          </DialogHeader>
          {/* <ProfileForm /> */}
            <LoginCard />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Login</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Login</DrawerTitle>
          <DrawerDescription>
            Enter your email below to login to your account
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <LoginCard />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function LoginCard() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //TODO: add meaningful error messages (i.e. email exists, incorrect email/password, no account, etc)
    const signIn = async() => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
        } catch(err) {
            console.error(err)
        }
    }
    
    const signInWithGoogle = async() => {
        try{
            await signInWithPopup(auth, googleProvider)
        } catch(err) {
            console.error(err)
        }
    }
    return (
          <div className="px-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </a>
                  {/* was Link comp */}
                </div>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" onClick={signIn}>
                Login
              </Button>
              <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline">
                Sign up
              </a> 
              {/* was Link component */}
            </div>
          </div>
      )
}


// TODO: connect front-end for login to the firebase auth


// function ProfileForm({ className }: React.ComponentProps<"form">) {
//     return (
//       <form className={cn("grid items-start gap-4", className)}>
//         <div className="grid gap-2">
//           <Label htmlFor="email">Email</Label>
//           <Input type="email" id="email" defaultValue="shadcn@example.com" />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="username">Username</Label>
//           <Input id="username" defaultValue="@shadcn" />
//         </div>
//         <Button type="submit">Save changes</Button>
//       </form>
//     )
//   }

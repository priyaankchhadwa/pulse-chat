"use client"

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function ModeToggle() {
//   const { setTheme } = useTheme()
//   let isDark: boolean = true;

//   return (
//     // <DropdownMenu>
//     //   <DropdownMenuTrigger asChild>
//     //     <Button variant="outline" size="icon" className="bg-transparent border-0">
//     //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//     //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//     //       <span className="sr-only">Toggle theme</span>
//     //     </Button>
//     //   </DropdownMenuTrigger>
//     //   <DropdownMenuContent align="end">
//     //     <DropdownMenuItem onClick={() => setTheme("light")}>
//     //       Light
//     //     </DropdownMenuItem>
//     //     <DropdownMenuItem onClick={() => setTheme("dark")}>
//     //       Dark
//     //     </DropdownMenuItem>
//     //   </DropdownMenuContent>
//     // </DropdownMenu>
    

//     <Button 
//       variant="outline"
//       size="icon"
//       className="bg-transparent border-0"
//       onClick={() => {
//         isDark = !isDark;
//         setTheme(isDark ? "dark" : "light");
//       }}
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   )
// }


import {
  Moon,
  Sun,
  Citrus,
  Leaf,
  Beef,
  LibrarySquare,
  Cloud,
  Eclipse
} from "lucide-react"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

const iconMap = {
  "light": <Sun className="h-5 w-5 text-primary-foreground" />,
  "dark": <Moon className="h-5 w-5 text-primary-foreground" />,
}

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const mode = theme?.includes("light") ? "light" : "dark";
  const Icon = iconMap[mode];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="icon">{Icon}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" side="right">
        <DropdownMenuLabel>Set theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LibrarySquare className="mr-2 h-4 w-4" />
              <span>Slate</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Eclipse className="mr-2 h-4 w-4" />
              <span>Zinc</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("zinc-light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("zinc-dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Beef className="mr-2 h-4 w-4" />
              <span>Red</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("red-light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("red-dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Citrus className="mr-2 h-4 w-4" />
              <span>Orange</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("orange-light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("orange-dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Leaf className="mr-2 h-4 w-4" />
              <span>Green</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("green-light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("green-dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Cloud className="mr-2 h-4 w-4" />
              <span>Blue</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("blue-light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("blue-dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

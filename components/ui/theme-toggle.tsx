"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect,useState } from "react"

export const ThemeToggle = () => {
    const {theme,setTheme} = useTheme();
    const [mounted,setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[])

    if(!mounted) return null;

  return (
    <div onClick={()=>setTheme(theme === 'light' ? 'dark' : 'light')} className="cursor-pointer">
        {theme === 'light' ? <Sun/> : <Moon/>}
    </div>
  )
}

export default ThemeToggle
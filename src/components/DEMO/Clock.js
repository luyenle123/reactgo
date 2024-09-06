import { useState, useEffect } from "react";
import { ClockItem } from "./ClockItem";

function useTime(){
    const [time, setTime] = useState(() => new Date());
    useEffect(
        () => {
            const id = setInterval(() => {
                setTime(new Date())
            }, 1000);
            return () => clearInterval(id);
        }, []
    );

    return time;
}

export function Clock(){
    const time = useTime();
    return (
        <ClockItem time = {time.toLocaleTimeString()} />
    );
}
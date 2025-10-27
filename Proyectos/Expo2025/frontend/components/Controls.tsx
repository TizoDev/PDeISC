import { Platform, View, Pressable, Text } from "react-native";
import { useEffect } from "react";

type Props = {
  onKey: (key: string, pressed: boolean) => void;
};

export default function Controls({ onKey }: Props) 
{
    useEffect(() => {
        if(Platform.OS === "web") 
        {
            const handleDown = (e: KeyboardEvent) => onKey(e.key, true);
            const handleUp = (e: KeyboardEvent) => onKey(e.key, false);

            document.addEventListener("keydown", handleDown);
            document.addEventListener("keyup", handleUp);

            return () => {
                document.removeEventListener("keydown", handleDown);
                document.removeEventListener("keyup", handleUp);
            };
        }
    }, []);

    if (Platform.OS !== "web") 
    {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                
            </View>
        );
    }

    return null;
}

import {Loader2} from "lucide-react"

type LoadingScreenProps = {
    text?: string;
}

export default function LoadingScreen({text = "Loading..."}: LoadingScreenProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600 mb-2"/>
            <p className="text-sm text-gray-500">{text}</p>
        </div>
    )
}

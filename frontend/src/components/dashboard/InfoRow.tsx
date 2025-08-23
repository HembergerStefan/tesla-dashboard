"use client"

type InfoRowProps = {
    label: string;
    value: string | number;
}

export function InfoRow({label, value}: InfoRowProps) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    )
}

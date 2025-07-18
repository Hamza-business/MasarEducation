export default function Field({ label, value }: { label: string; value: any }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-medium">{value ?? "—"}</p>
        </div>
    );
}
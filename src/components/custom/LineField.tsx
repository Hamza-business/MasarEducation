export default function LineField({ label, value, type, style }: { label: string; value: any, type?:string, style?:string }) {
    return (
        <p><strong>{label}: </strong> 
            {type == "link" && (
                <a href={value ?? "—"} className={style}>{value ?? "—"}</a>
            )}
            {type != "link" && (
                <>{value ?? "—"}</>
            )}
        </p>
    );
}
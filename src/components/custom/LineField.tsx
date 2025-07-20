export default function LineField({ label, value, type, style, link }: { label: string; value: any, type?:string, style?:string, link?:string }) {
    return (
        <p><strong>{label}: </strong> 
            {type == "link" && (
                <a href={link ?? "—"} className={style}>{value ?? "—"}</a>
            )}
            {type != "link" && (
                <>{value ?? "—"}</>
            )}
        </p>
    );
}
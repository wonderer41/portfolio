import { heroMeta } from "@/content/meta";

export function MetaRow() {
  return (
    <div className="meta">
      {heroMeta.map((cell) => (
        <div className="cell" key={cell.key}>
          <div className="k">{cell.key}</div>
          <div className={`v${cell.code ? " code" : ""}`}>
            {cell.emphasis ? (
              <>
                {cell.value} <em>{cell.emphasis}</em>
              </>
            ) : (
              cell.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

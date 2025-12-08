export default function Dialog({dialogObj}){
    return (
        <dialog className="dialog">
            <h1>{dialogObj.title}</h1>
            <button type="reset">{dialogObj.reset}</button>
            <button type="submit">{dialogObj.submit}</button>
        </dialog>
    )
}
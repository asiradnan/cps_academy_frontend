export default function Topic({ params }) {
    return (
        <>
            <h1>{params.topic}</h1>
            <h2>{params.class}</h2>
        </>

    );
}

export default function Topic({ params, searchParams }) {
  return (
    <>
    <h1>Topic:</h1>
      <h1>{params.topic}</h1>
      <h2>{searchParams.lang}</h2>
    </>
  );
}

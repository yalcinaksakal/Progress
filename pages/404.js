import Error from "next/error";
export default function Custom404() {
  return (
    <div style={{ height: "40vh", overflow: "hidden", marginTop: "1rem" }}>
      <div style={{ marginTop: "-15rem" }}>
        <Error statusCode="404" />
      </div>
    </div>
  );
}

import Button from "../components/common/Button";
import Lottie from "../components/common/Lottie";
import Header from "../components/Header";

import noSearchAnimation from "../assets/lotties/animation_no_search.json";

export default function UnknownPage() {
  return (
    <>
      <Header />
      <div
        className="flex flex-col items-center justify-center"
        style={{ width: "100%", height: "calc(98vh - 100px)" }}
      >
        <Lottie data={noSearchAnimation} width={150} height={150} />
        <div className="flex flex-row items-start justify-center mt-8">
          <h1
            className="font-bold my-0"
            style={{
              fontSize: "80px",
              margin: 0,
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            404
          </h1>
          <h2
            className="text-left border-l-4 ml-5 pl-2"
            style={{
              fontSize: "1.6rem",
              maxWidth: "400px",
              paddingLeft: "1.5rem",
            }}
          >
            Unfortunaltely, we couldn't find the page you are looking for.
          </h2>
        </div>

        <Button
          href="/dashboard"
          text="Return To Dashboard"
          style={{
            fontSize: "14px",
            fontWeight: 700,
            padding: "8px 16px",
            margin: "35px auto 0",
            boxShadow: "none",
            borderRadius: "8px",
            color: "white",
            width: "220px",
          }}
        />
      </div>
    </>
  );
}

import { memo } from "react";

export const ServicesPage = memo(() => {
  return (
    <div data-testid="services-page" className="page__wrapper">
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90dvh",
        }}
      >
        SERVICES PAGE
      </h1>
    </div>
  );
});

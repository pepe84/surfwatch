const flags = import.meta.glob("../assets/flags/*", {
  eager: true,
  import: "default",
});

function TerritoryTitle({ territory }) {
  const flagSrc = territory.flag
    ? flags[`../assets/flags/${territory.flag}`]
    : null;

  return (
    <>
      {flagSrc && (
        <img
          src={flagSrc}
          alt={territory.name}
          className="territory-flag me-2"
        />
      )}
      {territory.name}
    </>
  );
}

export default TerritoryTitle;

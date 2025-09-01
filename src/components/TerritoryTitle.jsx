function TerritoryTitle({ territory }) {
  return (
    <>
      {territory.flag && (
        <img
          src={`/flags/${territory.flag}`}
          alt={territory.name}
          className="territory-flag me-2"
        />
      )}
      {territory.name}
    </>
  );
}

export default TerritoryTitle;

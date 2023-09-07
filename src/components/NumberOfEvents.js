const NumberOfEvents = ({setCurrentNoe}) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setCurrentNoe(value);
  };
  return (
    <div id="number-of-events">
      <input
        type="text"
        className="number"
        placeholder="Enter number of events"
        defaultValue={32}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;

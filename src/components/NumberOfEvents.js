const NumberOfEvents = ({setCurrentNoe, setErrorAlert}) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      setErrorAlert('Please enter a number');
    } else if (value > 50) {
      setErrorAlert('Maximum number of events is 50');
    } else if (value <= 0) {
      setErrorAlert('Minimum number of events is 1');
    } else {
      setErrorAlert('');
      setCurrentNoe(value);
    }
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

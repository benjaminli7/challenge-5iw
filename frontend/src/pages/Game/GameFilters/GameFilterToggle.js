const GameFilterToggle = ({ label, options, onChange, value }) => {
  // Check if options is defined before using map
  if (!options || !Array.isArray(options)) {
    return null; // or handle the case appropriately
  }

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange}>
      {options.map((option, idx) => (
        <ToggleButton key={idx} value={option.toLowerCase()}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default GameFilterToggle;

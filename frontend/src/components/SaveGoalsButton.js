function SaveButton({ saveProp, setGoals, onSaved }) {
  const saveGoal = () => {
    if (!saveProp.trim()) return;

    fetch("http://localhost:8080/api/wellness/goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: saveProp, status: "in progress" }),
    })
      .then((res) => res.json())
      .then((saved) => {
        setGoals((prev) => [...prev, saved]);
        if (onSaved) onSaved();
      })
      .catch((error) => {
        console.error("There was a problem saving the goal: " + error);
      });
  };

  return <button onClick={saveGoal}>Add Goal</button>;
}

export default SaveButton;

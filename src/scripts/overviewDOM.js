import { updateGraph } from "./barchartDOM.js";
import { getHistory, formatDuration } from "./localStorage.js";
import { filterByTimeInterval, parseLocaleDate } from "./overviewLogic.js";

document.addEventListener("DOMContentLoaded", () => {
  const historyButton = document.getElementById("historyButton");
  const graphButton = document.getElementById("graphButton");
  const historySection = document.getElementById("historyOverviewArea");
  const graphSection = document.getElementById("graphView");

  // Initial state - show history, hide graph
  historySection.style.display = "block";
  graphSection.style.display = "none";
  graphSection.setAttribute("aria-hidden", "true");

  // Enabling correct view depending on which button was pressed.
  historyButton.addEventListener("click", () => {
    historySection.style.display = "block";
    graphSection.style.display = "none";
    updateHistory();
  });

  graphButton.addEventListener("click", () => {
    historySection.style.display = "none";
    graphSection.style.display = "block";
    updateGraph();
  });

  function updateHistory(customHistory = null) {
    const historyList = document.querySelector(".historyList");
    const history = customHistory || getHistory();

    // Clearing history list initially
    historyList.innerHTML = "";

    // Recent entry should be first
    history.sort((a, b) => parseLocaleDate(b.start) - parseLocaleDate(a.start));

    history.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "historyItem";
      li.dataset.id = entry.id;

      const leftDiv = document.createElement("div");
      leftDiv.className = "historyLeft";

      // Timer Category
      const categoryP = document.createElement("p");
      categoryP.className = "timerCategory";
      const firstLetter = entry.category.charAt(0).toUpperCase();
      const rest = entry.category.slice(1).toLowerCase();
      categoryP.innerHTML = `<span class="first-letter">${firstLetter}</span>${rest}`; // Use span for styling first letter larger
      leftDiv.appendChild(categoryP);

      // Timer date
      const dateP = document.createElement("p");
      dateP.className = "timerDate";
      const startDate = parseLocaleDate(entry.start);
      const year = startDate.getFullYear();
      const month = String(startDate.getMonth() + 1).padStart(2, "0");
      const day = String(startDate.getDate()).padStart(2, "0");
      const date = `${year}-${month}-${day}`;
      dateP.textContent = date;
      leftDiv.appendChild(dateP);
      li.appendChild(leftDiv);

      // Timer time range
      const timeP = document.createElement("p");
      timeP.className = "timerTime";
      const startTime = parseLocaleDate(entry.start).toLocaleTimeString(
        "en-GB",
        { hour: "numeric", minute: "numeric", hour12: false },
      );
      const endTime = parseLocaleDate(entry.end).toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      timeP.textContent = `${startTime} - ${endTime}`;
      li.appendChild(timeP);

      historyList.appendChild(li);

      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options hidden";

      // 3 buttons for "settings"
      const editOption = document.createElement("button");
      editOption.className = "editOption";
      editOption.textContent = "Edit";

      // delete
      const deleteOption = document.createElement("button");
      deleteOption.className = "deleteOption";
      deleteOption.textContent = "Delete";

      optionsDiv.appendChild(editOption);
      optionsDiv.appendChild(deleteOption);
      li.appendChild(optionsDiv);

      // button to edit in overview
      const editBtn = document.createElement("button");
      editBtn.className = "editBtnShape";
      editBtn.innerHTML = "&#8942;"; // 3 vertical buttons
      editBtn.setAttribute("aria-label", "More options");
      li.appendChild(editBtn); // adds/shows the button

      // options show when the user presses the button
      editBtn.addEventListener("click", () => {
        optionsDiv.classList.toggle("hidden");
      });

      // Edit
      editOption.addEventListener("click", () => {
        // hide the dropdown menu
        optionsDiv.classList.add("hidden");

        // clear the time text
        timeP.innerHTML = "";

        const formatForInput = (str) => str.replace(" ", "T").slice(0, 16);

        // create start input
        const startInput = document.createElement("input");
        startInput.type = "datetime-local";
        startInput.value = formatForInput(entry.start);

        // create end input
        const endInput = document.createElement("input");
        endInput.type = "datetime-local";
        endInput.value = formatForInput(entry.end);

        // create save button
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.className = "saveEditBtn";

        // add to time paragraph
        timeP.appendChild(startInput);
        timeP.appendChild(endInput);
        timeP.appendChild(saveBtn);

        saveBtn.addEventListener("click", () => {
          const newStart = new Date(startInput.value);
          const newEnd = new Date(endInput.value);

          const startDate = new Date(newStart);
          const endDate = new Date(newEnd);

          if (isNaN(newStart.getTime()) || isNaN(newEnd.getTime())) {
            alert("Invalid date.");
            return;
          }
          // convert back to "YYYY-MM-DD HH:mm:ss" for localStorage
          const saveStart = startInput.value.replace("T", " ") + ":00";
          const saveEnd = endInput.value.replace("T", " ") + ":00";

          const history = getHistory();
          const updatedHistory = history.map((e) => {
            if (Number(e.id) === Number(entry.id)) {
              return {
                ...e,
                start: saveStart,
                end: saveEnd,
                duration: formatDuration(newEnd.getTime() - newStart.getTime()),
              };
            }
            return e;
          });
          localStorage.setItem(
            "time_log_history",
            JSON.stringify(updatedHistory),
          );
          updateHistory(); // re-render
        });
      });

      // delete/remove from localStorage
      deleteOption.addEventListener("click", () => {
        const history = getHistory();
        const updatedHistory = history.filter(
          (e) => Number(e.id) !== Number(entry.id),
        );
        localStorage.setItem(
          "time_log_history",
          JSON.stringify(updatedHistory),
        );
        updateHistory(); // render list
      });
    });

    // Handle empty history
    if (history.length === 0) {
      const placeholder = document.createElement("li");
      placeholder.textContent = "No history available.";
      placeholder.className = "placeholder";
      historyList.appendChild(placeholder);
    }
  }

  // Select time range function
  function setupRangeSelector() {
    const rangeSelectorButton = document.getElementById("rangeSelectorButton");
    rangeSelectorButton.addEventListener("click", () => {
      const startDateStr = prompt("Enter start date (YYYY-MM-DD)");
      const endDateStr = prompt("Enter end date (YYYY-MM-DD)");

      // Cancel if no input
      if (!startDateStr || !endDateStr) {
        return;
      }

      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      // Include full end day
      endDate.setHours(23, 59, 59, 999);

      if (isNaN(startDate) || isNaN(endDate)) {
        alert("Invalid date format.");
        return;
      }

      const filteredHistory = filterByTimeInterval(startDate, endDate);
      updateHistory(filteredHistory);
    });
  }

  // Reset time range
  function setupResetSelector() {
    const allTimeSelectorButton = document.getElementById(
      "allTimeSelectorButton",
    );
    if (allTimeSelectorButton) {
      allTimeSelectorButton.addEventListener("click", () => {
        updateHistory();
      });
    }
  }

  updateHistory();
  setupRangeSelector();
  setupResetSelector();
});

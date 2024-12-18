document.addEventListener("DOMContentLoaded", () => {
  // Sample visitor data
  const visitorData = [
      { photo: "photo1.jpg", name: "Kapil Abdul Qadir", date: "2024-11-27", time: "10:30 AM" },
      { photo: "photo2.jpg", name: "Leo", date: "2024-11-26", time: "09:15 AM" },
      { photo: "photo3.jpg", name: "Meenu", date: "2024-11-25", time: "11:00 AM" },
      { photo: "photo4.jpg", name: "John Doe", date: "2024-11-24", time: "12:30 PM" },
      { photo: "photo1.jpg", name: "Resh", date: "2024-11-23", time: "01:00 PM" },
      { photo: "photo6.jpg", name: "Yogesh", date: "2024-11-22", time: "02:00 PM" },
      { photo: "photo7.jpg", name: "Jai", date: "2024-11-21", time: "04:00 PM" },
      { photo: "photo1.jpg", name: "Anshu", date: "2024-11-20", time: "06:00 PM" },
      { photo: "photo9.jpg", name: "Mevin", date: "2024-11-19", time: "07:00 PM" },
      { photo: "photo1.jpg", name: "Shreehari", date: "2024-11-18", time: "08:00 AM" },
      { photo: "photo11.jpg", name: "Saidu", date: "2024-11-17", time: "09:30 AM" },
      { photo: "photo12.jpg", name: "Fayaz", date: "2024-11-16", time: "10:00 AM" },
      { photo: 'photo18.jpg', name: 'Arshu', date: '2019-05-04', time: '08:17 AM'},
      { photo: "photo18.jpg", name: "Arshu", date: "2019-05-04", time: "08:17 AM" },
      { photo: "photo9.jpg", name: "Tufail", date: "2019-09-07", time: "09:59 AM" },
      { photo: "photo2.jpg", name: "Tufail", date: "2012-04-14", time: "05:24 AM" },
      { photo: "photo5.jpg", name: "Sufail", date: "2021-12-08", time: "12:04 AM" },
      { photo: "photo17.jpg", name: "Arshu", date: "2011-06-14", time: "09:08 PM" },
      { photo: "photo14.jpg", name: "Sufail", date: "2021-11-16", time: "07:54 PM" },
      { photo: "photo14.jpg", name: "Tufail", date: "2018-06-13", time: "06:27 PM" },
      { photo: "photo17.jpg", name: "Miz", date: "2023-06-20", time: "07:50 PM" },
      { photo: "photo10.jpg", name: "Razal", date: "2011-11-08", time: "08:16 AM" },
      { photo: "photo17.jpg", name: "Ijju", date: "2013-11-06", time: "01:24 AM" },
      { photo: "photo13.jpg", name: "Shanu", date: "2024-09-27", time: "05:39 AM" },
      { photo: "photo16.jpg", name: "Amna", date: "2023-06-03", time: "03:30 AM" },
      { photo: "photo4.jpg", name: "Shiyas", date: "2023-07-13", time: "05:36 PM" },
      { photo: "photo11.jpg", name: "Fayas", date: "2023-03-28", time: "06:03 PM" },
      { photo: "photo7.jpg", name: "Sahal", date: "2024-09-29", time: "12:04 PM" },
      { photo: "photo18.jpg", name: "Adil", date: "2024-01-31", time: "02:37 PM" },
];

  // DOM Elements
  const tableBody = document.getElementById("visitor-log");
  const searchName = document.getElementById("search");
  const sortOrder = document.getElementById("sort-by");
  const prevPage = document.getElementById("prev");
  const nextPage = document.getElementById("next");
  const pageInfo = document.getElementById("page-info");
  const dateDropdown = document.getElementById("date-range-dropdown");
  const customStartDate = document.getElementById("custom-start-date");
  const customEndDate = document.getElementById("custom-end-date");
  const rowsPerPageOptions = document.getElementById("rows-per-page");

  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const profileContainer = document.querySelector(".profile-container");
    const profileIcon = document.querySelector(".profile-icon");

    // Toggle the dropdown when clicking on the profile icon
    profileIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        profileContainer.classList.toggle("active");
    });

    // Close the dropdown when clicking outside
    document.addEventListener("click", () => {
        profileContainer.classList.remove("active");
    });

    // Stop propagation when clicking inside the dropdown
    document.querySelector(".profile-dropdown").addEventListener("click", (e) => {
        e.stopPropagation();
    });

  dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
          // Prevent default link behavior
          e.preventDefault();

          // Close any open dropdowns before toggling
          const allDropdowns = document.querySelectorAll('.dropdown-content');
          allDropdowns.forEach(dropdown => {
              if (dropdown !== this.nextElementSibling) {
                  dropdown.style.display = 'none';
              }
          });

          // Toggle the clicked dropdown
          const dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === 'block') {
              dropdownContent.style.display = 'none';
          } else {
              dropdownContent.style.display = 'block';
          }
      });
  });
  const links = document.querySelectorAll('.navbar li a');

  links.forEach(link => {
    link.addEventListener('click', function() {
      // Remove 'active' class from all links
      links.forEach(link => link.classList.remove('active'));
      // Add 'active' class to the clicked link
      this.classList.add('active');
    });
  });

  // Close dropdowns if clicking anywhere else on the document
  document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown')) {
          const allDropdowns = document.querySelectorAll('.dropdown-content');
          allDropdowns.forEach(dropdown => {
              dropdown.style.display = 'none';
          });
      }
  });
  // State Variables
  let filteredData = [...visitorData];
  let currentPage = 1;
  let rowsPerPage = 10;

  // Function to Display Rows
  function displayRows() {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const dataToDisplay = filteredData.slice(startIndex, endIndex);

      // Clear table and render rows
      tableBody.innerHTML = "";
      dataToDisplay.forEach(visitor => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><img src="${visitor.photo}" alt="visitor" style="width: 50px; border-radius: 50%;" /></td>
              <td>${visitor.name}</td>
              <td>${visitor.date}</td>
              <td>${visitor.time}</td>
          `;
          tableBody.appendChild(row);
      });

      // Update page info and pagination controls
      pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredData.length / rowsPerPage)}`;
      updatePaginationControls();
  }

  // Function to Update Pagination Controls
  function updatePaginationControls() {
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      prevPage.disabled = currentPage === 1;
      nextPage.disabled = currentPage === totalPages;
  }

  // Event Listener for Pagination
  function changePage(direction) {
      currentPage += direction;
      if (currentPage < 1) currentPage = 1;
      if (currentPage > Math.ceil(filteredData.length / rowsPerPage)) {
          currentPage = Math.ceil(filteredData.length / rowsPerPage);
      }
      displayRows();
  }

  prevPage.addEventListener("click", () => changePage(-1));
  nextPage.addEventListener("click", () => changePage(1));

  // Function to Filter Visitors
  function filterVisitors() {
      let result = [...visitorData];

      // Name Search Filter
      const searchQuery = searchName.value.toLowerCase();
      if (searchQuery) {
          result = result.filter(visitor => visitor.name.toLowerCase().includes(searchQuery));
      }

      // Date Range Filter
      if (dateDropdown.value === "custom") {
          if (customStartDate.value && customEndDate.value) {
              const startDate = new Date(customStartDate.value);
              const endDate = new Date(customEndDate.value);
              result = result.filter(visitor => {
                  const visitorDate = new Date(visitor.date);
                  return visitorDate >= startDate && visitorDate <= endDate;
              });
          }
      } else {
          const dateRanges = {
              "30": 30,
              "90": 90,
              "365": 365,
              "quarter": 90, // Approximation for last quarter
          };
          if (dateDropdown.value in dateRanges) {
              const today = new Date();
              const startDate = new Date();
              startDate.setDate(today.getDate() - dateRanges[dateDropdown.value]);
              result = result.filter(visitor => new Date(visitor.date) >= startDate);
          }
      }

      // Sort by Date
      if (sortOrder.value === "newest") {
          result.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
          result.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      filteredData = result;
      currentPage = 1; // Reset to first page after filtering
      displayRows();
  }
   // Modal and button references
   const filterButton = document.getElementById("all-filter");
   const modal = document.getElementById("filter-modal");
   const closeButton = document.querySelector(".close-btn");

   // Show the modal when the "All Filters" button is clicked
   filterButton.addEventListener("click", () => {
       modal.style.display = "block"; // Show the modal
   });

   // Hide the modal when the close button is clicked
   closeButton.addEventListener("click", () => {
       modal.style.display = "none"; // Hide the modal
   });

   // Close the modal if the user clicks outside of the modal content
   window.addEventListener("click", (event) => {
       if (event.target === modal) {
           modal.style.display = "none"; // Hide the modal
       }
   });

  // Event Listeners for Filters
  searchName.addEventListener("input", filterVisitors);
  sortOrder.addEventListener("change", filterVisitors);
  dateDropdown.addEventListener("change", () => {
      if (dateDropdown.value === "custom") {
          customStartDate.style.display = "inline-block";
          customEndDate.style.display = "inline-block";
      } else {
          customStartDate.style.display = "none";
          customEndDate.style.display = "none";
      }
      filterVisitors();
  });
  customStartDate.addEventListener("change", filterVisitors);
  customEndDate.addEventListener("change", filterVisitors);

  // Event Listener for Rows Per Page
  rowsPerPageOptions.addEventListener("change", (e) => {
      rowsPerPage = parseInt(e.target.value, 10);
      currentPage = 1; // Reset to first page
      displayRows();
  });

  // Initial Display
  displayRows();
});

(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the modal using Materialize
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);

  // Handle form submission with validation
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    // Validate form fields
    if (!name || !email || !phone) {
      alert('Please fill out the form!');
      return; // Keep the modal open
    }

    // Log the input values to the console
    console.log('Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);

    const modalInstance = M.Modal.getInstance(document.getElementById('modal1'));
    modalInstance.close();
    
  });

});

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("projects");

  try {
    // Fetch data from the backend
    const response = await fetch("http://localhost:5000/api/projects");
    const projects = await response.json();

    // Loop through the projects and create cards
    projects.forEach((project) => {
      const card = `
        <div class="col s12 m4">
          <div class="card small">
            <div class="card-image">
              <img src="${project.imageURL}" alt="${project.name}">
            </div>
            <div class="card-content">
              <p>${project.description}</p>
            </div>
            <div class="card-action">
              <a href="${project.githubLink}" target="_blank">View on GitHub</a>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    container.innerHTML = `<p>Failed to load projects.</p>`;
  }
});

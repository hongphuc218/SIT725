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
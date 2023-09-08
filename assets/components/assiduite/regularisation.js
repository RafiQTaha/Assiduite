const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });



  $('#excel_seance').on('click', function() {
    var fileInput = $('#formFileLg')[0]; // Get the file input element
    var formData = new FormData(); // Create a FormData object
    formData.append('file', fileInput.files[0]); // Append the selected file
    $(".loader2").show();

    // Send the file to the controller using AJAX
    $.ajax({
        type: 'POST',
        url: 'regularisation_seance', // Replace with your controller route
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
         $(".loader2").hide();

            // Display a success toast
               Toast.fire({
                  icon: 'success',
                  title: 'Regularisation est bien fait.',
               });
        },
        error: function(xhr, status, error) {
          $(".loader2").hide();

            // Display an error toast
            Toast.fire({
              icon: 'error',
              title: 'An error occurred while processing the file !',
           });
        }
    });
});

$('#excel_date').on('click', function() {
  var fileInput = $('#formFileLg')[0]; // Get the file input element
  var formData = new FormData(); // Create a FormData object
  formData.append('file', fileInput.files[0]); // Append the selected file
  $(".loader2").show();

  // Send the file to the controller using AJAX
  $.ajax({
      type: 'POST',
      url: 'regularisation_date', // Replace with your controller route
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        $(".loader2").hide();

          // Display a success toast
             Toast.fire({
                icon: 'success',
                title: 'Regularisation date est bien fait.',
             });
      },
      error: function(xhr, status, error) {
        $(".loader2").hide();

          // Display an error toast
          Toast.fire({
            icon: 'error',
            title: 'An error occurred while processing the file !',
         });
      }
  });
});

$("#canvas_date").on("click", function () {
  window.open("/assiduite/assiduites/canvas_date", "_blank");
});

$("#canvas_seance").on("click", function () {
  window.open("/assiduite/assiduites/canvas", "_blank");
});
              
//////////////////////////////////////////////pointeuse--Interface////////////////////////////////////
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
////////////////////////////////////////////////////////////////////:
$(document).ready(function () {
 
  var emptyFields = [];

  // Check each input field for empty value
 

  function emptycheck(){
    var val = $("body #salle_pointeuse").val();
    var val2 = $("body #datetime_pointeuse").val();
    var val3 = $("body #datetime_pointeuse_fin").val();
    var check = 'yes';
    if (val == '' || val2 == '' ||val3 == ''  ) {
      Toast.fire({
        icon: 'error',
        title: 'Veuillez remplir tous les champs !!',
    })
    check = 'no';

    } 
    return check;
  }
  
//////////////////////////////// select all / unselect ////////////////////////////////////
function selects(){  
var ele=document.getElementsByName('chk');  
for(var i=0; i<ele.length; i++){  
    if(ele[i].type=='checkbox')  
        ele[i].checked=true;  
}  
}  
function deSelect(){  
var ele=document.getElementsByName('chk');  
for(var i=0; i<ele.length; i++){  
    if(ele[i].type=='checkbox')  
        ele[i].checked=false;  
      
}  
}    

function pointeuse_af(var1) {
$.ajax({
  type: "POST",
  url: "/api/pointeuse_aff/" + var1,
  success: function (html) {
    if ($.fn.DataTable.isDataTable("#dtDynamicVerticalScrollExample_pointeuse")) {
      $("#dtDynamicVerticalScrollExample_pointeuse").DataTable().clear().destroy();
    }
    $("#dtDynamicVerticalScrollExample_pointeuse")
      .html(html)
      .DataTable({
        bLengthChange: false,
        lengthMenu: [
          [11, 25, 35, 50, 100, 20000000000000],
          [10, 15, 25, 50, 100, "All"],
        ],
        "font-size": "3rem",
      });

 
  }
});
return var1;
}

//////////////////////////////// pointeuse check /uncheck ////////////////////////////////////

$("body #p_check").on("click", function () {
selects();  // $("#parlot_modal").show();

});
$("body #p_uncheck").on("click", function () {
deSelect();  // $("#parlot_modal").show();

});
$("#salle_pointeuse").on("change", function () {
  var salle = $(this).val();
  $(".loader").show();

  pointeuse_af(salle);
});
  ////////////////////////////////////////////////////////////////////

  $("body #dtDynamicVerticalScrollExample_pointeuse").on("click", "tr", function () {
    var selected = $(this).hasClass("highlighty");
    $("body #dtDynamicVerticalScrollExample_pointeuse tr").removeClass("highlighty");
    $("body #dtDynamicVerticalScrollExample_pointeuse tr").removeClass("odd");
    $("body #dtDynamicVerticalScrollExample_pointeuse tr").removeClass("even");

    if (!selected) {
      $(this).addClass("highlighty");
      var currentRow = $(this).closest("tr");
      list_pointeuse = [];
      list_pointeuse.push({
        sn: currentRow.find("td:eq(2)").html(),
        ip: currentRow.find("td:eq(3)").html(),
      });
     
     
    
    }


  });

  $("body #connect_pointeuse").on("click",async function () {
    emptycheck();
    var val = [];
    $(':checkbox:checked').each(function(i){
      val[i] = $(this).val();
    });
    if (emptycheck() === 'yes') {
    if (val.length === 0) {
      list_pointeuse.forEach((obj) => {
    $(".loader2").show();

        $.ajax({
          type: "POST",
          url: "/api/pointeuse_connect/" + obj.ip +"/ip",
          success: function (html) {
            $(".loader2").hide();
            if(html == 'true'){
              Toast.fire({
                icon: 'success',
                title: 'Pointeuse connected',
            })
        
            }
            else{
              Toast.fire({
                icon: 'error',
                title: 'pointeuse not connected',
            })
        
        
        
            }
        
          },
          error:function(){
            $(".loader2").hide();
              Toast.fire({
                icon: 'error',
                title: 'Probleme  !',
              });
          }
            });
         });
    }
    else{
      
    for(let value of val){
      try {
        result = await $.ajax({
        type: "POST",
        url: "/api/pointeuse_connect/" + value +"/ip",
        
        success: function (html) {
          $(".loader2").hide();
          if(html == 'true'){
            $('.'+value).removeClass("desconnected").removeClass("connected").addClass("connected");

            Toast.fire({
              icon: 'success',
              title: 'Pointeuse connected',
          })
      
          }
          else{
              $('.'+value).removeClass("desconnected").removeClass("connected").addClass("desconnected");

            Toast.fire({
              icon: 'error',
              title: 'pointeuse not connected',
          })
      
      
      
          }
      
        },
        error:function(){
          $(".loader2").hide();
            Toast.fire({
              icon: 'error',
              title: 'Probleme  !',
            });
        }
        // timeout: 15000
          });
        } 
        catch (error) {
            console.error(error);
          }
    }
    }
  }
  else{

  }
   

});
///////////////att_pointeuse//////////

$("#att_pointeuse").on("click", function () {
  
  emptycheck();
 
  // Get the input values
var date_debut_str = $("#datetime_pointeuse").val();
var date_fin_str = $("#datetime_pointeuse_fin").val();

if(!date_fin_str){
  var date_fin_str = 0;
}

// Convert the input values to Date objects
var date_debut = new Date(date_debut_str);
var date_fin = new Date(date_fin_str);

  if (!date_debut) {
    Toast.fire({
      icon: 'error',
      title: 'Veuillez remplir la date  !',
      });
        // alert("Veuillez remplir la date");
        $(".loader2").hide();
    return;
  }

  // if the date_fin is less than the date_debut

  if (date_fin_str && date_fin < date_debut ) {
    // console.log("hi");
    Toast.fire({
      icon: 'error',
      title: 'Veuillez selectionner une date fin plus grande que la date debut!',
      });
        // alert("Veuillez remplir la date");
        $(".loader2").hide();
    return;
  }


  list_pointeuse.forEach((obj) => {
  $(".loader2").show();

    $.ajax({
      type: "POST",
      url: "/api/pointeuse_att/" + obj.ip + "/" + date_debut_str + "/" + date_fin_str,
      success: function (html) {
        $(".loader2").hide();
        if ($.fn.DataTable.isDataTable("#dtDynamicVerticalScrollExample_pointeuse2")) {
          $("#dtDynamicVerticalScrollExample_pointeuse2").DataTable().clear().destroy();
        }
        $("#dtDynamicVerticalScrollExample_pointeuse2")
          .html(html)
          .DataTable({
            bLengthChange: false,
            lengthMenu: [
              [11, 25, 35, 50, 100, 20000000000000],
              [10, 15, 25, 50, 100, "All"],
            ],
            "font-size": "3rem",
          });  
      },
      error:function(){
        $(".loader2").hide();
         Toast.fire({
           icon: 'error',
           title: 'Probleme au niveau reseau merci de verifier  !',
            });
    }
    });
  });

});

///////////////user_pointeuse//////////

$("#user_pointeuse").on("click", function () {
  emptycheck();

  list_pointeuse.forEach((obj) => {
  $(".loader2").show();

    $.ajax({
      type: "POST",
      url: "/api/pointeuse_user/" + obj.ip,
      success: function (html) {
        $(".loader2").hide();
        if ($.fn.DataTable.isDataTable("#dtDynamicVerticalScrollExample_pointeuse2")) {
          $("#dtDynamicVerticalScrollExample_pointeuse2").DataTable().clear().destroy();
        }
        $("#dtDynamicVerticalScrollExample_pointeuse2")
          .html(html)
          .DataTable({
            bLengthChange: false,
            lengthMenu: [
              [11, 25, 35, 50, 100, 20000000000000],
              [10, 15, 25, 50, 100, "All"],
            ],
            "font-size": "3rem",
          });
          
       

      },error:function(){
        $(".loader2").hide();
          Toast.fire({
            icon: 'error',
            title: 'Probleme  !',
          });
      }

    });
  });

});
///////////////download_pointeuse//////////

$("#download_pointeuse").on("click", async function () {
  emptycheck();

  var date_debut_str = $("#datetime_pointeuse").val();
  var date_fin_str = $("#datetime_pointeuse_fin").val();
  
  if(!date_fin_str){
    var date_fin_str = 0;
  }
  
  // Convert the input values to Date objects
  var date_debut = new Date(date_debut_str);
  var date_fin = new Date(date_fin_str);
  
    if (!date_debut) {
      Toast.fire({
        icon: 'error',
        title: 'Veuillez remplir la date  !',
        });
          // alert("Veuillez remplir la date");
          $(".loader2").hide();
      return;
    }
  
    // if the date_fin is less than the date_debut
  
    if (date_fin_str && date_fin < date_debut ) {
      // console.log("hi");
      Toast.fire({
        icon: 'error',
        title: 'Veuillez selectionner une date fin plus grande que la date debut!',
        });
          // alert("Veuillez remplir la date");
          $(".loader2").hide();
      return;
    }

    var val = [];
    $(':checkbox:checked').each(function(i){
      val[i] = $(this).val();
    });
    // alert(val);
    if (emptycheck() === 'yes') {
    if (val.length === 0) {
      list_pointeuse.forEach((obj) => {
    $(".loader2").show();

    $.ajax({
      type: "POST",
      url: "/api/pointeuse_download/" + obj.ip + "/" + date_debut_str + "/" + date_fin_str,
      success: function (html) {
        $(".loader2").hide();
        Toast.fire({
          icon: 'success',
          title: 'la pointeuse'+obj.ip+' bien importée.',
      })
      },
      error:function(){
        $(".loader2").hide();
         Toast.fire({
           icon: 'error',
           title: 'Probleme technique '+obj.ip+' !',
            });
      }
      
    });
         });
    }
    else{

    for(let value of val){
      try {
        result = await $.ajax({
        type: "POST",
        url: "/api/pointeuse_download/" + value + "/" + date_debut_str + "/" + date_fin_str,
        success: function (html) {
          $(".loader2").hide();
          Toast.fire({
            icon: 'success',
            title: 'la pointeuse'+value+' bien importée.',
        })
        },
        error:function(){
          $(".loader2").hide();
           Toast.fire({
             icon: 'error',
             title: 'Probleme technique '+value+' !',
              });
        }
        
      });
    } 
    catch (error) {
        console.error(error);
      }
    }

    }
  }

  
  else{

  }
    
  // list_pointeuse.forEach((obj) => {
  // $(".loader2").show();

  //   $.ajax({
  //     type: "POST",
  //     url: "/api/pointeuse_download/" + obj.ip + "/" + date_debut_str + "/" + date_fin_str,
  //     success: function (html) {
  //       $(".loader2").hide();
  //       Toast.fire({
  //         icon: 'success',
  //         title: 'la pointeuse bien importée.',
  //     })
  //     },
  //     error:function(){
  //       $(".loader2").hide();
  //        Toast.fire({
  //          icon: 'error',
  //          title: 'Probleme technique  !',
  //           });
  //     }
      
  //   });
  // });



});
// alert("aaa");
$("#residanat_Importe").on("click", function(){
  $(".loader2").show();
  // alert('ok')
  var date = $("#datetime_pointeuse").val();
  if (!date) {
    Toast.fire({
      icon: 'error',
      title: 'Veuillez remplir la date  !',
      });
        // alert("Veuillez remplir la date");
        $(".loader2").hide();
    return;
  }
  list_pointeuse.forEach((obj) => {
  $.ajax({
      type: "POST",
      url: "/api/pointeuse_download/" + obj.ip + "/" + date,
      success: function (html) {
      $(".loader2").hide();
      Toast.fire({
          icon: 'success',
          title: 'la pointeuse bien importée.',
      })
      },
      error:function(){
        $(".loader2").hide();
        Toast.fire({
            icon: 'error',
            title: 'Probleme technique  !',
            });
      }
      
  });
  });  
});
});
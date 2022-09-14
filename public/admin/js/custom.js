$(document).ready(function () {

    //saveCAtegory
    $('#saveCat').on('click', function (e) {
        e.preventDefault()
        var cat = $('#inputCategory').val()
        var data = {
            catName: cat
        }
        $.ajax({
            type: "POST",
            url: "/savecat",
            data: data,
            //dataType: "dataType",
            success: function (response) {
                if(rewponse.status == 200){
                    alert('Yo')
                }
                
            }
        });
        
    });
    
    
    //repeat price boxes: 
    var i = 1
    $('#addNewVariant').on('click', function (e) {
        i++
        e.preventDefault()
        $('#variantBox').append('<div class="input-group mb-3"><input class="form-control" type="text" name="pro['+i+'][size]" placeholder="Product Size" aria-label="Username" aria-describedby="basic-addon1"><span class="mx-3"></span><span class="input-group-text">$</span><span class="input-group-text">0.00</span><input class="form-control" type="text" name="pro['+i+'][price]" placeholder="Product price" aria-label="Dollar amount (with dot and two decimal places)"><span class="mx-2"></span></div>');
        
    });
});
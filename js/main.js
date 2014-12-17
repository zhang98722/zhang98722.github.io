function launchModal(url,param,title,divId){
    if(divId==null||divId==""){
        divId="UniModalTemplate";
    }
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        async: true,
        dataType: "html",
        data: param,
        success: function(data) {
            console.info(data);
            $("#"+divId).find("#title").html(title);
            $("#"+divId).find(".modal-body").html(data);
            $("#"+divId).modal('show')
        },
        beforeSend: function() {
            showWaiting();
        },
        complete:function(){
            hideWaiting();
        }
    });

}

function unloadModal(divId){
    if(divId==null||divId==""){
        divId="UniModalTemplate";
    }
    $("#"+divId).modal('hide')
}

function showWaiting(){
    $("body").append("<div id='winModal' class='modal-backdrop fade in' style='z-index:9999'></div><div id='loadInfo'>正在处理中,请稍候...</div>");
}

function hideWaiting(){
    $("#winModal,#loadInfo").remove();
}

function getHtmlContent(url, param, id) {
    $('#' + id).html('');
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        async: true,
        dataType: "html",
        data: param,
        success: function(data) {
            $('#' + id).html(data);
        },
        complete: function() {
            hideWaiting();
        },
        beforeSend: function() {
            showWaiting();
        }
    });
}

function isEmpty(value){
    if(value==null||value==""||value.trim()==""){
        return true;
    }
    return false;
}
$(function() {
    $("#projects").tabs();
    $("ul").sortable( {axis:"x", containment:"#projects"} );
    $("ol").sortable( {axis:"y", containment:"#projects"} );
    
    $("#btn-add-project").button()
    .click(function() {
        $("#project-dialog").dialog({ width:400, resizable:false, modal:true,
            buttons: {
                "Add new project": function() {
                    const projectName = $("#new-project").val();

                    $("<li><a href='#" + projectName + "'>" + projectName + "</a></li>").appendTo("#main");
                    $("<ol id='" + projectName + "'></ol>").appendTo("#projects");
                    $("#projects").tabs("refresh");

                    const tabCount = $("#projects .ui-tabs-nav li").length;
                    $("#projects").tabs("option", "active", tabCount - 1);     
                    
                    $("#new-project").val("");
                    $(this).dialog("close");
                },

                "Cancel": function() {
                    $("#new-project").val("");
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#btn-add-task").button()
    .click(function() {
        $("#task-dialog").dialog({ width:400, resizable:false, modal:true,
            buttons: {
                "Add new task": function() {
                    const taskName = $("#new-task").val();
                    const active = $("#projects").tabs("option", "active");
                    
                    $("<li><input type='checkbox'>" + taskName + "</li>").appendTo("ol:eq(" + active + ")");

                    $("#new-task").val("");
                    $(this).dialog("close");
                },
                "Cancel": function() {
                    $("#new-task").val("");
                    $(this).dialog("close");
                }
            }
        });
    });

    $("ol").click(function(event) {
        let target = event.target;
        while (target !== this) {
            if (target.tagName === "LI") {
                $(target).hide("drop", { direction: "down" }, "slow" );
            }
            target = target.parentNode;
        }
        return;
    });
    
    // $("#projects").tabs().on("click", "span.ui-icon-close", function() {
    //     const panelId = $(this).closest("li").remove().attr("aria-controls");
    //     $("#" + panelId).remove();
    //     $("#projects").tabs("refresh");
    // });

});
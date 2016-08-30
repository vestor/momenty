
var xmlhttp=false;

var selection, isHighlighterShown = false;

//Setup the div to insert
var div = document.createElement('div');
div.cssText = 'z-index : 999999; position : absolute;';
div.className = 'highlightMenu'
div.id = 'highlighterMenu';
var str =
'<div class="highlightMenu-inner">'
   + '<div class="buttonSet--highlightMenu">'
      + '<button id="highlighterButtonM" class="button--highlightMenu">'
         + '<span>'
            + '<svg class="svgIcon--highlighter" width="25" height="25" viewBox="0 0 25 25">'
              + '<path d="M13.7 15.964l5.204-9.387-4.726-2.62-5.204 9.387 4.726 2.62zm-.493.885l-1.313 2.37-1.252.54-.702 1.263-3.796-.865 1.228-2.213-.202-1.35 1.314-2.37 4.722 2.616z" fill-rule="evenodd"></path>'
            + '</svg>'
         + '</span>'
      + '</button>'
   + '</div>'
+ '</div>'
+ '<div class="highlightMenu-arrowClip"><span class="highlightMenu-arrow"></span></div>';
console.debug(str);
div.innerHTML += str;

document.body.appendChild(div);
document.getElementById("highlighterButtonM").addEventListener("click",
    function() {
      postSelection(selection);
}, false);

function getSelectedText() {
    var text = "";
    var x, y, width, height, sel;
    if (typeof window.getSelection != "undefined") {
        sel = window.getSelection();

        text = sel.toString();
        if (sel.rangeCount) {
            focusNode = sel.focusNode.parentElement;
            range = sel.getRangeAt(0).cloneRange();
            if (range.getBoundingClientRect) {
                var rect = range.getBoundingClientRect();
                width = rect.right - rect.left;
                height = rect.bottom - rect.top;
                x = rect.left;
                y = rect.top;
            }

            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( doc.createTextNode("\u200b") );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;

                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
          }


    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        sel = document.selection;
        focusNode = sel.focusNode.parentElement;
        range = sel.createRange();
        text = range.text;
        range.collapse(true);
        x = range.boundingLeft;
        y = range.boundingTop;
        width = range.boundingWidth;
        height = range.boundingHeight;


    }
    return {x:x, y:y, width: width, height: height, text:text, selection: sel};
}
function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

function showHighlighter(event) {
    selection = getSelectedText();
    console.debug(selection.selection, selection.text);
    var highlighter = document.getElementById("highlighterMenu");
    var highlighterStyle = highlighter.style;
    highlighterStyle.position = 'absolute';
    highlighterStyle.zIndex = 9999;
    if (selection.text && selection.text != '' && !isHighlighterShown) {
      highlighter.className = ' highlightMenu--active';
      var parentElement = selection.selection.focusNode.parentElement;
      highlighterStyle.left =  event.pageX + "px";
      highlighterStyle.top = event.pageY + "px";
      isHighlighterShown = true;
    } else if (!selection.text || selection.text === '') {
      highlighter.className = "highlightMenu";
      isHighlighterShown = false;
    }
}


document.onmouseup = showHighlighter;

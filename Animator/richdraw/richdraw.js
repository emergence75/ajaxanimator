/*----------------------------------------------------------------------------
 RICHDRAW 1.0
 Vector Graphics Drawing Script
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of simple vector graphic drawing control using SVG or VML.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies: (SVG or VML rendering implementations)
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function RichDrawEditor(elem, renderer) {
  this.container = elem;
	this.gridX = 10;
	this.gridY = 10;
  this.mouseDownX = 0;
  this.mouseDownY = 0;
  this.mode = '';
  this.fillColor = '';
  this.lineColor = '';
  this.lineWidth = '';
  this.selected = null;
  this.selectedBounds = { x:0, y:0, width:0, height: 0 };

	this.onselect = function() {}
	this.onunselect = function() {}

  this.renderer = renderer;
  this.renderer.init(this.container);

  this.onMouseDownListener = this.onMouseDown.bindAsEventListener(this);
  this.onMouseUpListener = this.onMouseUp.bindAsEventListener(this);
  this.onDragListener = this.onDrag.bindAsEventListener(this);
  this.onResizeListener = this.onResize.bindAsEventListener(this);
  this.onDrawListener = this.onDraw.bindAsEventListener(this);

  this.onHitListener = this.onHit.bindAsEventListener(this);

  this.onSelectStartListener = this.onSelectStart.bindAsEventListener(this);

  Event.observe(this.container, "mousedown", this.onMouseDownListener);
  Event.observe(this.container, "mouseup", this.onMouseUpListener);
  Event.observe(this.container, "selectstart", this.onSelectStartListener);  
}


RichDrawEditor.prototype.clearWorkspace = function() {
	this.container.innerHTML = '';
};


RichDrawEditor.prototype.deleteSelection = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.renderer.remove(this.selected);
    this.selected = null;
  }
};


RichDrawEditor.prototype.select = function(elem) {
  if (elem == this.selected)
    return;

  this.selected = elem;
  this.renderer.showTracker(this.selected);
  this.onselect(this);
};


RichDrawEditor.prototype.unselect = function() {
  if (this.selected) {
    this.renderer.remove(this.container.ownerDocument.getElementById('tracker'));
    this.selected = null;
    this.onunselect(this);
  }
};


RichDrawEditor.prototype.getSelectedElement = function() {
  return this.selected;
};


RichDrawEditor.prototype.setGrid = function(horizontal, vertical) {
  this.gridX = horizontal;
  this.gridY = vertical;
};


RichDrawEditor.prototype.editCommand = function(cmd, value)
{
  if (cmd == 'mode') {
    this.mode = value;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      this.fillColor = value;
    }
    else if (cmd == 'linecolor') {
      this.lineColor = value;
    }
    else if (cmd == 'linewidth') {
      this.lineWidth = parseInt(value) + 'px';
    }
  }
  else {
    this.renderer.editCommand(this.selected, cmd, value);
  }
}


RichDrawEditor.prototype.queryCommand = function(cmd)
{
  if (cmd == 'mode') {
    return this.mode;
  }
  else if (this.selected == null) {
    if (cmd == 'fillcolor') {
      return this.fillColor;
    }
    else if (cmd == 'linecolor') {
      return this.lineColor;
    }
    else if (cmd == 'linewidth') {
      return this.lineWidth;
    }
  }
  else {
    return this.renderer.queryCommand(this.selected, cmd);
  }
}


RichDrawEditor.prototype.onSelectStart = function(event) {
  return false;
}


RichDrawEditor.prototype.onMouseDown = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  if (this.mode != 'select') {
    this.unselect();

    this.mouseDownX = snappedX;
    this.mouseDownY = snappedY;

    this.selected = this.renderer.create(this.mode, this.fillColor, this.lineColor, this.lineWidth, this.mouseDownX, this.mouseDownY, 1, 1);
    this.selected.id = 'shape:' + createUUID();
    Event.observe(this.selected, "mousedown", this.onHitListener);  

    Event.observe(this.container, "mousemove", this.onDrawListener);  
  }
  else {
    if (this.mouseDownX != snappedX || this.mouseDownY != snappedY)
      this.unselect();
  }
  
  return false;
};


RichDrawEditor.prototype.onMouseUp = function(event) {
  Event.stopObserving(this.container, "mousemove", this.onDrawListener);  
  Event.stopObserving(this.container, "mousemove", this.onDragListener);  

  if (this.mode != 'select') {
    this.selected = null;
  }
};


RichDrawEditor.prototype.onDrag = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;

  this.renderer.move(this.selected, this.selectedBounds.x + deltaX, this.selectedBounds.y + deltaY);

  // Update selection tracker
  this.renderer.showTracker(this.selected);
//  hide_tracker();
};


RichDrawEditor.prototype.onResize = function(event) {
  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  var deltaX = snappedX - this.mouseDownX;
  var deltaY = snappedY - this.mouseDownY;

  this.renderer.track(handle, deltaX, deltaY);

  // Update selection tracker
  show_tracker();
//  hide_tracker();
};


RichDrawEditor.prototype.onDraw = function(event) {
  if (this.selected == null)
    return;

  var offset = Position.cumulativeOffset(this.container);
  var snappedX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
  var snappedY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

  this.renderer.resize(this.selected, this.mouseDownX, this.mouseDownY, snappedX, snappedY);
};


RichDrawEditor.prototype.onHit = function(event) {
  if (this.mode == 'select') {
    this.select(Event.element(event));
    this.selectedBounds = this.renderer.bounds(this.selected);
    
    var offset = Position.cumulativeOffset(this.container);
    this.mouseDownX = Math.round((Event.pointerX(event) - offset[0]) / this.gridX) * this.gridX;
    this.mouseDownY = Math.round((Event.pointerY(event) - offset[1]) / this.gridY) * this.gridY;

    Event.observe(this.container, "mousemove", this.onDragListener);  
  }
};


function createUUID()
{
  return [4, 2, 2, 2, 6].map(function(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
      var uuidchar = parseInt((Math.random() * 256)).toString(16);
      if (uuidchar.length == 1)
        uuidchar = "0" + uuidchar;
      uuidpart += uuidchar;
    }
    return uuidpart;
  }).join('-');
}

//----------------------------------------------------------------------------
// AbstractRenderer
//
// Abstract base class defining the drawing API. Can not be used directly.
//----------------------------------------------------------------------------

function AbstractRenderer() {

};

AbstractRenderer.prototype.init = function(elem) {};
AbstractRenderer.prototype.bounds = function(shape) { return { x:0, y:0, width:0, height: 0 }; };
AbstractRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {};
AbstractRenderer.prototype.remove = function(shape) {};
AbstractRenderer.prototype.move = function(shape, left, top) {};
AbstractRenderer.prototype.track = function(shape) {};
AbstractRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {};
AbstractRenderer.prototype.editCommand = function(shape, cmd, value) {};
AbstractRenderer.prototype.queryCommand = function(shape, cmd) {};
AbstractRenderer.prototype.showTracker = function(shape) {};
AbstractRenderer.prototype.getMarkup = function() { return null; };

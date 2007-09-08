<?php
ob_start ("ob_gzhandler");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Ajax Animator</title>
	<link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="../ajaxanimator/loading.css"/>
	<link rel="stylesheet" type="text/css" href="../ajaxanimator/colorpicker.css"/>
	<link rel="stylesheet" type="text/css" href="../lib/secure-pass.css"/>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/ajaxroutine.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/md5.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/prototype.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/utilities.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/slider-min.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/colorpicker-beta-min.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ext/ext-yui-adapter.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ext/ext-all-debug.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ext/debug.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../richdraw/richdraw.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../richdraw/svgrenderer.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../richdraw/drawFunctions.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/ajaxanimator.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/layout.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/window.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/color.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/menus.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/timeline.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/canvas.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/animation.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/flash.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/historyManagement.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/userManagement.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/keyHandler.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../ajaxanimator/animationxml.js"></script>
	<script type="text/javascript" src="../php/gzip.php?url=../lib/secure-pass.js"></script>
	</head>
	<body>
	<!-- Start Loading Window Markup -->
  <div id="loading">
	<div class="loading-indicator">
	<img alt="Loading..." src="../resources/images/default/grid/loading.gif" style="width:16px;height:16px;">&#160;Loading...
	</div>
	</div>
  	<div id="loading-mask" style="width:100%;height:100%;background:#c3daf9;position:absolute;z-index:20000;left:0;top:0;">&#160;</div>
	<!-- End Loading Window Markup -->
	
	<!-- Start Color Dialog Markup -->
	<div id="color-dialog">
	<div class="x-dlg-hd">Color</div>
	<div class="x-dlg-bd">
	<div id="colorPicker" class="x-layout-inactive-content">
	</div>
	<div id="colorPalette" class="x-layout-inactive-content">
	</div>
	</div>
	</div>
	<!-- End Color Dialog Markup -->
	<div id="register-dialog">
	<div class="x-dlg-hd">Register</div>
	<div class="x-dlg-bd">
	<div id="registerDialog">
	</div>
	</div>
	</div>
	
	<div id="fs-dialog">
	<div class="x-dlg-hd">Save/Open</div>
	<div class="x-dlg-bd">
	<div id="saveTab">
	<center>     

	 <input type="button" onclick="saveAnimation()" value="Save To Computer"> <input type="button" onclick="savetoserver()" value="Save To Webserver">
      	  		<hr>
			<a href="javascript:toggleSaveInput()">Save as text</a>
			<div id="STROUT" style="display:none"></div>
		<textarea id="AXTxt" style="width: 200px"></textarea><br>
		<input type="button" value="Save" onclick="saveAXTxt()">
	  </center>
	</div>
	<div id="openTab">
		   <center>
	   <form enctype="multipart/form-data" target="uploadFrame" action="../php/upload.php" method="post">
     
	   Open: <input name="uploaded" type="file"> <input type="submit" onclick="setTimeout('openAnimation()',1000);" value="Upload">
        </form><iframe name="uploadFrame" id="uploadFrame" style="display:none;visibility: hidden; height: 1px; width: 1px"></iframe>
		<hr>
		<a href="javascript:toggleLoadInput()">Open from text</a>
		<div id="STRINPT" style="display:none">
		<textarea id="AXIT" style="width: 200px"></textarea><br>
		<input type="button" value="Load" onclick="loadAXIT()">
		</div>
		</center>
	</div>
	</div>
	</div>
	
	
	<div id="north-div">
		<div id="north-tb"><!--Toolbar--></div>
		<div id="frameContainer" style="overflow: auto"></div>
	</div>
	<div id="scriptEval-div"></div>
	<div id="properties-div">
		  <div id="ResizeObjOpt" style="display: none">
		  Height:<input type="text" style="width: 50px" id="sHeight" onchange="setSP()" onblur="setSP()" value=""> 
		  Width:<input type="text" style="width: 50px" id="sWidth" onchange="setSP()" onblur="setSP()" value="">
		  </div>
		  <div id="noSelectRem">No Object Currently Selected</div>  
	</div>
	<div id="history-div">
	<div id="history-tb"></div>
	<table id="HistoryContainer" style="font-size:small" border="1px" cellpadding="0"  width="99%" cellspacing="0">
	<tr><td>0</td><td>New Animation</td></tr>
	</table>
	</div>
	<div id="login-div">
	<div id="login-tb">
	</div>
    <div id="userContent">
	<div id="userQuery">
		<div id="userManMode">Login</div>
		<input type="text" id="usrId" title="Username" value="Username">
		<input type="password" id="pwId"  title="Password" value="Password">
		<input type="password" id="pwId2" title="Repeat Password" style="display:none" value="Password">
		<input type="button" id="submitAction" value="Login" title="ooh! press this button!" onclick="submitUser()">
		</div>
		<div id="userProfile" style="display:none">
		<div id="usrNme"style="font-size:small;"></div>
		<hr>
		My&nbsp;Animations:
		<div id="userFiles"></div>
		</div>
		</div>
	</div>
	<div id="toolbar-div">
	<img id="select" alt="" title="Select shapes" onclick="setMode('select', 'Selection');" src="../images/select.gif" name="select"> 
	<img src="../images/blank.gif" alt=""> 
	<img id="rect" alt="" title="Draw a rectangle" onclick="setMode('rect', 'Rectangle');" src="../images/rectangle.gif" name="rect"> 
	<img src="../images/blank.gif" alt="">
	<img id="roundrect" alt="" title="Draw a rounded rectangle" onclick="setMode('roundrect', 'Rounded Rectangle');" src="../images/roundrect.gif" name="roundrect">
	<img src="../images/blank.gif" alt="">
	<img id="ellipse" alt="" title="Draw an ellipse" onclick="setMode('ellipse', 'Ellipse / Circle');" src="../images/circle.gif" name="ellipse"> 
	<img src="../images/blank.gif" alt="">
	<img id="line" title="Draw a line" onclick="setMode('line', 'Line');" alt="" src="../images/line.gif" name="line">
	<img src="../images/blank.gif" alt="">
	<img id="delete" alt="" title="Delete selected shape" onclick="deleteShape();" src="../images/delete.gif" name="delete">
	<br><span>Fill:</span>
	<div id="fillcolor" style="color: #ffffff;background-color: #ff0000;" onclick="FillColorChange()">FF0000</div>
	<span>Line:</span>
	<div id="linecolor" style="color: #ffffff;background-color: #ff0000;" onclick="LineColorChange()">FF0000</div>
	<select id="linewidth" onchange="setLineWidth(this);">
	<option value="1px">1px</option>
	<option value="2px">2px</option>
	<option value="3px">3px</option>
	<option value="4px">4px</option>
	<option value="5px">5px</option>
	<option value="6px">6px</option>
	<option value="7px">7px</option>
	<option value="8px">8px</option>
	<option value="9px">9px</option>
	</select>
	</div>
	<div id="canvas-div">
	<div id="center-tb"></div>
	<div id="CanvasContainer" style="margin-left: auto; margin-right: auto;width: 480px; height: 272px;overflow:auto"></div>
	<br>
		<div id="playControls">
		<center>
			<img alt="&lt;--" src="../images/player_rew.png" onclick="gotoframe(currentFrameSelection-1,1);"> <img alt="play" src="../images/player_play.png" onclick="playAnimation();"> <img alt="stop" src="../images/player_stop.png" onclick="stopAnimation();"> <img alt="--&gt;" src="../images/player_fwd.png" onclick="gotoframe(currentFrameSelection+1,1);">
		</center>
		</div>
	<center>
	<br>
	<div style="font-size:x-small" id="status"></div>
    </center>
	</div>
	<div id="preview-div">
    <div id="FlashPreview">
      <center>
        <div style="border: 1px black solid;" id="zFlashPreviewDiv"></div><br>
        <table border="0">
          <tr>
            <td>
              <input type="button" id="swfPreBtn" onclick="preFlash();" value="Preview"> <input type="button" id="swfGenBtn" value="Export Animation" onclick="genFlash()">
            </td>
            <td>
              <div id="export"></div>
            </td>
          </tr>
        </table>
        <div id="previewStatus" style="font-size:x-small">
          Mode: Preview
        </div>
        <div id="RevisionBrowserDiv"></div>
      </center>
    </div>
	</div>
</body>
</html>
<?php
ob_end_flush();
?>
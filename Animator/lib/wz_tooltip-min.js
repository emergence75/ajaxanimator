var cg=new Object();var tt_Debug=true;var tt_Enabled=true;var TTT=true;cg.Above=false;cg.BgColor="#E4E7FF";cg.BgImg="";cg.BorderColor="#002299";cg.BorderStyle="solid";cg.BorderWidth=1;cg.CenterMouse=false;cg.ClickClose=false;cg.CloseBtn=false;cg.CloseBtnColors=["#990000","#FFFFFF","#DD3333","#FFFFFF"];cg.CloseBtnText=" X ";cg.CopyContent=true;cg.Delay=400;cg.Duration=0;cg.FadeIn=0;cg.FadeOut=0;cg.FadeInterval=30;cg.Fix=null;cg.FollowMouse=true;cg.FontColor="#000044";cg.FontFace="Verdana,Geneva,sans-serif";cg.FontSize="8pt";cg.FontWeight="normal";cg.Left=false;cg.OffsetX=14;cg.OffsetY=8;cg.Opacity=100;cg.Padding=3;cg.Shadow=false;cg.ShadowColor="#C0C0C0";cg.ShadowWidth=5;cg.Sticky=false;cg.TextAlign="left";cg.Title="";cg.TitleAlign="left";cg.TitleBgColor="";cg.TitleFontColor="#ffffff";cg.TitleFontFace="";cg.TitleFontSize="";cg.Width=0;function Tip(){tt_Tip(arguments,null)}function TagToTip(){if(TTT){var B=tt_GetElt(arguments[0]);if(B){tt_Tip(arguments,B)}}}var tt_aElt=new Array(10),tt_aV=new Array(),tt_sContent,tt_scrlX=0,tt_scrlY=0,tt_musX,tt_musY,tt_over,tt_x,tt_y,tt_w,tt_h;function tt_Extension(){tt_ExtCmdEnum();tt_aExt[tt_aExt.length]=this;return this}function tt_SetTipPos(H,F){var G=tt_aElt[0].style;tt_x=H;tt_y=F;G.left=H+"px";G.top=F+"px";if(tt_ie56){var E=tt_aElt[tt_aElt.length-1];if(E){E.style.left=G.left;E.style.top=G.top}}}function tt_Hide(){if(tt_db&&tt_iState){if(tt_iState&2){tt_aElt[0].style.visibility="hidden";tt_ExtCallFncs(0,"Hide")}tt_tShow.EndTimer();tt_tHide.EndTimer();tt_tDurt.EndTimer();tt_tFade.EndTimer();if(!tt_op&&!tt_ie){tt_tWaitMov.EndTimer();tt_bWait=false}if(tt_aV[CLICKCLOSE]){tt_RemEvtFnc(document,"mouseup",tt_HideInit)}tt_AddRemOutFnc(false);tt_ExtCallFncs(0,"Kill");if(tt_t2t&&!tt_aV[COPYCONTENT]){tt_t2t.style.display="none";tt_MovDomNode(tt_t2t,tt_aElt[6],tt_t2tDad)}tt_iState=0;tt_over=null;tt_ResetMainDiv();if(tt_aElt[tt_aElt.length-1]){tt_aElt[tt_aElt.length-1].style.display="none"}}}function tt_GetElt(B){return(document.getElementById?document.getElementById(B):document.all?document.all[B]:null)}function tt_GetDivW(B){return(B?(B.offsetWidth||B.style.pixelWidth||0):0)}function tt_GetDivH(B){return(B?(B.offsetHeight||B.style.pixelHeight||0):0)}function tt_GetScrollX(){return(window.pageXOffset||(tt_db?(tt_db.scrollLeft||0):0))}function tt_GetScrollY(){return(window.pageYOffset||(tt_db?(tt_db.scrollTop||0):0))}function tt_GetClientW(){return(document.body&&(typeof (document.body.clientWidth)!=tt_u)?document.body.clientWidth:(typeof (window.innerWidth)!=tt_u)?window.innerWidth:tt_db?(tt_db.clientWidth||0):0)}function tt_GetClientH(){return(document.body&&(typeof (document.body.clientHeight)!=tt_u)?document.body.clientHeight:(typeof (window.innerHeight)!=tt_u)?window.innerHeight:tt_db?(tt_db.clientHeight||0):0)}function tt_GetEvtX(B){return(B?((typeof (B.pageX)!=tt_u)?B.pageX:(B.clientX+tt_scrlX)):0)}function tt_GetEvtY(B){return(B?((typeof (B.pageY)!=tt_u)?B.pageY:(B.clientY+tt_scrlY)):0)}function tt_AddEvtFnc(F,D,E){if(F){if(F.addEventListener){F.addEventListener(D,E,false)}else{F.attachEvent("on"+D,E)}}}function tt_RemEvtFnc(F,D,E){if(F){if(F.removeEventListener){F.removeEventListener(D,E,false)}else{F.detachEvent("on"+D,E)}}}var tt_aExt=new Array(),tt_db,tt_op,tt_ie,tt_ie56,tt_bBoxOld,tt_body,tt_flagOpa,tt_maxPosX,tt_maxPosY,tt_iState=0,tt_opa,tt_bJmpVert,tt_t2t,tt_t2tDad,tt_elDeHref,tt_tShow=new Number(0),tt_tHide=new Number(0),tt_tDurt=new Number(0),tt_tFade=new Number(0),tt_tWaitMov=new Number(0),tt_bWait=false,tt_u="undefined";function tt_Init(){tt_MkCmdEnum();if(!tt_Browser()||!tt_MkMainDiv()){return }tt_IsW3cBox();tt_OpaSupport();tt_AddEvtFnc(document,"mousemove",tt_Move);if(TTT||tt_Debug){tt_SetOnloadFnc()}tt_AddEvtFnc(window,"scroll",function(){tt_scrlX=tt_GetScrollX();tt_scrlY=tt_GetScrollY();if(tt_iState&&!(tt_aV[STICKY]&&(tt_iState&2))){tt_HideInit()}});tt_AddEvtFnc(window,"unload",tt_Hide);tt_Hide()}function tt_MkCmdEnum(){var n=0;for(var i in cg){eval("window."+i.toString().toUpperCase()+" = "+n++)}tt_aV.length=n}function tt_Browser(){var n,nv,n6,w3c;n=navigator.userAgent.toLowerCase(),nv=navigator.appVersion;tt_op=(document.defaultView&&typeof (eval("w"+"indow"+"."+"o"+"p"+"er"+"a"))!=tt_u);tt_ie=n.indexOf("msie")!=-1&&document.all&&!tt_op;if(tt_ie){var ieOld=(!document.compatMode||document.compatMode=="BackCompat");tt_db=!ieOld?document.documentElement:(document.body||null);if(tt_db){tt_ie56=parseFloat(nv.substring(nv.indexOf("MSIE")+5))>=5.5&&typeof document.body.style.maxHeight==tt_u}}else{tt_db=document.documentElement||document.body||(document.getElementsByTagName?document.getElementsByTagName("body")[0]:null);if(!tt_op){n6=document.defaultView&&typeof document.defaultView.getComputedStyle!=tt_u;w3c=!n6&&document.getElementById}}tt_body=(document.getElementsByTagName?document.getElementsByTagName("body")[0]:(document.body||null));if(tt_ie||n6||tt_op||w3c){if(tt_body&&tt_db){if(document.attachEvent||document.addEventListener){return true}}else{tt_Err("wz_tooltip.js must be included INSIDE the body section,"+" immediately after the opening <body> tag.")}}tt_db=null;return false}function tt_MkMainDiv(){if(tt_body.insertAdjacentHTML){tt_body.insertAdjacentHTML("afterBegin",tt_MkMainDivHtm())}else{if(typeof tt_body.innerHTML!=tt_u&&document.createElement&&tt_body.appendChild){tt_body.appendChild(tt_MkMainDivDom())}}if(window.tt_GetMainDivRefs&&tt_GetMainDivRefs()){return true}tt_db=null;return false}function tt_MkMainDivHtm(){return("<div id=\"WzTtDiV\"></div>"+(tt_ie56?("<iframe id=\"WzTtIfRm\" src=\"javascript:false\" scrolling=\"no\" frameborder=\"0\" style=\"filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;\"></iframe>"):""))}function tt_MkMainDivDom(){var B=document.createElement("div");if(B){B.id="WzTtDiV"}return B}function tt_GetMainDivRefs(){tt_aElt[0]=tt_GetElt("WzTtDiV");if(tt_ie56&&tt_aElt[0]){tt_aElt[tt_aElt.length-1]=tt_GetElt("WzTtIfRm");if(!tt_aElt[tt_aElt.length-1]){tt_aElt[0]=null}}if(tt_aElt[0]){var B=tt_aElt[0].style;B.visibility="hidden";B.position="absolute";B.overflow="hidden";return true}return false}function tt_ResetMainDiv(){var B=(window.screen&&screen.width)?screen.width:10000;tt_SetTipPos(-B,0);tt_aElt[0].innerHTML="";tt_aElt[0].style.width=(B-1)+"px"}function tt_IsW3cBox(){var B=tt_aElt[0].style;B.padding="10px";B.width="40px";tt_bBoxOld=(tt_GetDivW(tt_aElt[0])==40);B.padding="0px";tt_ResetMainDiv()}function tt_OpaSupport(){var B=tt_body.style;tt_flagOpa=(typeof (B.filter)!=tt_u)?1:(typeof (B.KhtmlOpacity)!=tt_u)?2:(typeof (B.KHTMLOpacity)!=tt_u)?3:(typeof (B.MozOpacity)!=tt_u)?4:(typeof (B.opacity)!=tt_u)?5:0}function tt_SetOnloadFnc(){tt_AddEvtFnc(document,"DOMContentLoaded",tt_HideSrcTags);tt_AddEvtFnc(window,"load",tt_HideSrcTags);if(tt_body.attachEvent){tt_body.attachEvent("onreadystatechange",function(){if(tt_body.readyState=="complete"){tt_HideSrcTags()}})}if(/WebKit|KHTML/i.test(navigator.userAgent)){var B=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(B);tt_HideSrcTags()}},10)}}function tt_HideSrcTags(){if(!window.tt_HideSrcTags||window.tt_HideSrcTags.done){return }window.tt_HideSrcTags.done=true;if(!tt_HideSrcTagsRecurs(tt_body)){tt_Err("To enable the capability to convert HTML elements to tooltips,"+" you must set TTT in the global tooltip cguration"+" to true.")}}function tt_HideSrcTagsRecurs(J){var F,G,H;F=J.childNodes||J.children||null;for(var I=F?F.length:0;I;){--I;if(!tt_HideSrcTagsRecurs(F[I])){return false}G=F[I].getAttribute?F[I].getAttribute("onmouseover"):(typeof F[I].onmouseover=="function")?F[I].onmouseover:null;if(G){H=G.toString().match(/TagToTip\s*\(\s*'[^'.]+'\s*[\),]/);if(H&&H.length){if(!tt_HideSrcTag(H[0])){return false}}}}return true}function tt_HideSrcTag(F){var E,D;E=F.replace(/.+'([^'.]+)'.+/,"$1");D=tt_GetElt(E);if(D){if(tt_Debug&&!TTT){return false}else{D.style.display="none"}}else{tt_Err("Invalid ID\n'"+E+"'\npassed to TagToTip()."+" There exists no HTML element with that ID.")}return true}function tt_Tip(C,D){if(!tt_db){return }if(tt_iState){tt_Hide()}if(!tt_Enabled){return }tt_t2t=D;if(!tt_ReadCmds(C)){return }tt_iState=1|4;tt_Adaptcg1();tt_MkTipContent(C);tt_MkTipSubDivs();tt_FormatTip();tt_bJmpVert=false;tt_maxPosX=tt_GetClientW()+tt_scrlX-tt_w-1;tt_maxPosY=tt_GetClientH()+tt_scrlY-tt_h-1;tt_Adaptcg2();tt_Move();tt_ShowInit()}function tt_ReadCmds(D){var E;E=0;for(var F in cg){tt_aV[E++]=cg[F]}if(D.length&1){for(E=D.length-1;E>0;E-=2){tt_aV[D[E-1]]=D[E]}return true}tt_Err("Incorrect call of Tip() or TagToTip().\n"+"Each command must be followed by a value.");return false}function tt_Adaptcg1(){tt_ExtCallFncs(0,"Loadcg");if(!tt_aV[TITLEBGCOLOR].length){tt_aV[TITLEBGCOLOR]=tt_aV[BORDERCOLOR]}if(!tt_aV[TITLEFONTCOLOR].length){tt_aV[TITLEFONTCOLOR]=tt_aV[BGCOLOR]}if(!tt_aV[TITLEFONTFACE].length){tt_aV[TITLEFONTFACE]=tt_aV[FONTFACE]}if(!tt_aV[TITLEFONTSIZE].length){tt_aV[TITLEFONTSIZE]=tt_aV[FONTSIZE]}if(tt_aV[CLOSEBTN]){if(!tt_aV[CLOSEBTNCOLORS]){tt_aV[CLOSEBTNCOLORS]=new Array("","","","")}for(var B=4;B;){--B;if(!tt_aV[CLOSEBTNCOLORS][B].length){tt_aV[CLOSEBTNCOLORS][B]=(B&1)?tt_aV[TITLEFONTCOLOR]:tt_aV[TITLEBGCOLOR]}}if(!tt_aV[TITLE].length){tt_aV[TITLE]=" "}}if(tt_aV[OPACITY]==100&&typeof tt_aElt[0].style.MozOpacity!=tt_u&&!Array.every){tt_aV[OPACITY]=99}if(tt_aV[FADEIN]&&tt_flagOpa&&tt_aV[DELAY]>100){tt_aV[DELAY]=Math.max(tt_aV[DELAY]-tt_aV[FADEIN],100)}}function tt_Adaptcg2(){if(tt_aV[CENTERMOUSE]){tt_aV[OFFSETX]-=((tt_w-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0))>>1)}}function tt_MkTipContent(B){if(tt_t2t){if(tt_aV[COPYCONTENT]){tt_sContent=tt_t2t.innerHTML}else{tt_sContent=""}}else{tt_sContent=B[0]}tt_ExtCallFncs(0,"CreateContentString")}function tt_MkTipSubDivs(){var D="position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:auto;",C=" cellspacing=0 cellpadding=0 border=0 style=\""+D+"\"><tbody style=\""+D+"\"><tr><td ";tt_aElt[0].innerHTML=(""+(tt_aV[TITLE].length?("<div id=\"WzTiTl\" style=\"position:relative;z-index:1;\">"+"<table id=\"WzTiTlTb\""+C+"id=\"WzTiTlI\" style=\""+D+"\">"+tt_aV[TITLE]+"</td>"+(tt_aV[CLOSEBTN]?("<td align=\"right\" style=\""+D+"text-align:right;\">"+"<span id=\"WzClOsE\" style=\"padding-left:2px;padding-right:2px;"+"cursor:"+(tt_ie?"hand":"pointer")+";\" onmouseover=\"tt_OnCloseBtnOver(1)\" onmouseout=\"tt_OnCloseBtnOver(0)\" onclick=\"tt_HideInit()\">"+tt_aV[CLOSEBTNTEXT]+"</span></td>"):"")+"</tr></tbody></table></div>"):"")+"<div id=\"WzBoDy\" style=\"position:relative;z-index:0;\">"+"<table"+C+"id=\"WzBoDyI\" style=\""+D+"\">"+tt_sContent+"</td></tr></tbody></table></div>"+(tt_aV[SHADOW]?("<div id=\"WzTtShDwR\" style=\"position:absolute;overflow:hidden;\"></div>"+"<div id=\"WzTtShDwB\" style=\"position:relative;overflow:hidden;\"></div>"):""));tt_GetSubDivRefs();if(tt_t2t&&!tt_aV[COPYCONTENT]){tt_t2tDad=tt_t2t.parentNode||tt_t2t.parentElement||tt_t2t.offsetParent||null;if(tt_t2tDad){tt_MovDomNode(tt_t2t,tt_t2tDad,tt_aElt[6]);tt_t2t.style.display="block"}}tt_ExtCallFncs(0,"SubDivsCreated")}function tt_GetSubDivRefs(){var D=new Array("WzTiTl","WzTiTlTb","WzTiTlI","WzClOsE","WzBoDy","WzBoDyI","WzTtShDwB","WzTtShDwR");for(var C=D.length;C;--C){tt_aElt[C]=tt_GetElt(D[C-1])}}function tt_FormatTip(){var F,H,E,G;if(tt_aV[TITLE].length){F=tt_aElt[1].style;F.background=tt_aV[TITLEBGCOLOR];F.paddingTop=(tt_aV[CLOSEBTN]?2:0)+"px";F.paddingBottom="1px";F.paddingLeft=F.paddingRight=tt_aV[PADDING]+"px";F=tt_aElt[3].style;F.color=tt_aV[TITLEFONTCOLOR];F.fontFamily=tt_aV[TITLEFONTFACE];F.fontSize=tt_aV[TITLEFONTSIZE];F.fontWeight="bold";F.textAlign=tt_aV[TITLEALIGN];if(tt_aElt[4]){F.paddingRight=(tt_aV[PADDING]<<1)+"px";F=tt_aElt[4].style;F.background=tt_aV[CLOSEBTNCOLORS][0];F.color=tt_aV[CLOSEBTNCOLORS][1];F.fontFamily=tt_aV[TITLEFONTFACE];F.fontSize=tt_aV[TITLEFONTSIZE];F.fontWeight="bold"}if(tt_aV[WIDTH]>0){tt_w=tt_aV[WIDTH]+((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)}else{tt_w=tt_GetDivW(tt_aElt[3])+tt_GetDivW(tt_aElt[4]);if(tt_aElt[4]){tt_w+=tt_aV[PADDING]}}E=-tt_aV[BORDERWIDTH]}else{tt_w=0;E=0}F=tt_aElt[5].style;F.top=E+"px";if(tt_aV[BORDERWIDTH]){F.borderColor=tt_aV[BORDERCOLOR];F.borderStyle=tt_aV[BORDERSTYLE];F.borderWidth=tt_aV[BORDERWIDTH]+"px"}if(tt_aV[BGCOLOR].length){F.background=tt_aV[BGCOLOR]}if(tt_aV[BGIMG].length){F.backgroundImage="url("+tt_aV[BGIMG]+")"}F.padding=tt_aV[PADDING]+"px";F.textAlign=tt_aV[TEXTALIGN];F=tt_aElt[6].style;F.color=tt_aV[FONTCOLOR];F.fontFamily=tt_aV[FONTFACE];F.fontSize=tt_aV[FONTSIZE];F.fontWeight=tt_aV[FONTWEIGHT];F.background="";F.textAlign=tt_aV[TEXTALIGN];if(tt_aV[WIDTH]>0){H=tt_aV[WIDTH]+((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)}else{H=tt_GetDivW(tt_aElt[6])+((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)}if(H>tt_w){tt_w=H}if(tt_aV[SHADOW]){tt_w+=tt_aV[SHADOWWIDTH];G=Math.floor((tt_aV[SHADOWWIDTH]*4)/3);F=tt_aElt[7].style;F.top=E+"px";F.left=G+"px";F.width=(tt_w-G-tt_aV[SHADOWWIDTH])+"px";F.height=tt_aV[SHADOWWIDTH]+"px";F.background=tt_aV[SHADOWCOLOR];F=tt_aElt[8].style;F.top=G+"px";F.left=(tt_w-tt_aV[SHADOWWIDTH])+"px";F.width=tt_aV[SHADOWWIDTH]+"px";F.background=tt_aV[SHADOWCOLOR]}else{G=0}tt_SetTipOpa(tt_aV[FADEIN]?0:tt_aV[OPACITY]);tt_FixSize(E,G)}function tt_FixSize(F,I){var G,H,J;tt_aElt[0].style.width=tt_w+"px";tt_aElt[0].style.pixelWidth=tt_w;H=tt_w-((tt_aV[SHADOW])?tt_aV[SHADOWWIDTH]:0);G=H;if(!tt_bBoxOld){G-=((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)}tt_aElt[5].style.width=G+"px";if(tt_aElt[1]){G=H-(tt_aV[PADDING]<<1);if(!tt_bBoxOld){H=G}tt_aElt[1].style.width=H+"px";tt_aElt[2].style.width=G+"px"}tt_h=tt_GetDivH(tt_aElt[0])+F;if(tt_aElt[8]){tt_aElt[8].style.height=(tt_h-I)+"px"}J=tt_aElt.length-1;if(tt_aElt[J]){tt_aElt[J].style.width=tt_w+"px";tt_aElt[J].style.height=tt_h+"px"}}function tt_DeAlt(E){var D;if(E.alt){E.alt=""}if(E.title){E.title=""}D=E.childNodes||E.children||null;if(D){for(var F=D.length;F;){tt_DeAlt(D[--F])}}}function tt_OpDeHref(B){if(!tt_op){return }if(tt_elDeHref){tt_OpReHref()}while(B){if(B.hasAttribute("href")){B.t_href=B.getAttribute("href");B.t_stats=window.status;B.removeAttribute("href");B.style.cursor="hand";tt_AddEvtFnc(B,"mousedown",tt_OpReHref);window.status=B.t_href;tt_elDeHref=B;break}B=B.parentElement}}function tt_ShowInit(){tt_tShow.Timer("tt_Show()",tt_aV[DELAY],true);if(tt_aV[CLICKCLOSE]){tt_AddEvtFnc(document,"mouseup",tt_HideInit)}}function tt_OverInit(B){tt_over=B.target||B.srcElement;tt_DeAlt(tt_over);tt_OpDeHref(tt_over);tt_AddRemOutFnc(true)}function tt_Show(){var B=tt_aElt[0].style;B.zIndex=Math.max((window.dd&&dd.z)?(dd.z+2):0,1010);if(tt_aV[STICKY]||!tt_aV[FOLLOWMOUSE]){tt_iState&=~4}if(tt_aV[DURATION]>0){tt_tDurt.Timer("tt_HideInit()",tt_aV[DURATION],true)}tt_ExtCallFncs(0,"Show");B.visibility="visible";tt_iState|=2;if(tt_aV[FADEIN]){tt_Fade(0,0,tt_aV[OPACITY],Math.round(tt_aV[FADEIN]/tt_aV[FADEINTERVAL]))}tt_ShowIfrm()}function tt_ShowIfrm(){if(tt_ie56){var C=tt_aElt[tt_aElt.length-1];if(C){var D=C.style;D.zIndex=tt_aElt[0].style.zIndex-1;D.display="block"}}}function tt_Move(B){B=window.event||B;if(B){tt_musX=tt_GetEvtX(B);tt_musY=tt_GetEvtY(B)}if(tt_iState){if(!tt_over&&B){tt_OverInit(B)}if(tt_iState&4){if(!tt_op&&!tt_ie){if(tt_bWait){return }tt_bWait=true;tt_tWaitMov.Timer("tt_bWait = false;",1,true)}if(tt_aV[FIX]){tt_iState&=~4;tt_SetTipPos(tt_aV[FIX][0],tt_aV[FIX][1])}else{if(!tt_ExtCallFncs(B,"MoveBefore")){tt_SetTipPos(tt_PosX(),tt_PosY())}}tt_ExtCallFncs([tt_musX,tt_musY],"MoveAfter")}}}function tt_PosX(){var B;B=tt_musX;if(tt_aV[LEFT]){B-=tt_w+tt_aV[OFFSETX]-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0)}else{B+=tt_aV[OFFSETX]}if(B>tt_maxPosX){B=tt_maxPosX}return((B<tt_scrlX)?tt_scrlX:B)}function tt_PosY(){var B;if(tt_aV[ABOVE]&&(!tt_bJmpVert||tt_CalcPosYAbove()>=tt_scrlY+16)){B=tt_DoPosYAbove()}else{if(!tt_aV[ABOVE]&&tt_bJmpVert&&tt_CalcPosYBelow()>tt_maxPosY-16){B=tt_DoPosYAbove()}else{B=tt_DoPosYBelow()}}if(B>tt_maxPosY){B=tt_DoPosYAbove()}if(B<tt_scrlY){B=tt_DoPosYBelow()}return B}function tt_DoPosYBelow(){tt_bJmpVert=tt_aV[ABOVE];return tt_CalcPosYBelow()}function tt_DoPosYAbove(){tt_bJmpVert=!tt_aV[ABOVE];return tt_CalcPosYAbove()}function tt_CalcPosYBelow(){return(tt_musY+tt_aV[OFFSETY])}function tt_CalcPosYAbove(){var B=tt_aV[OFFSETY]-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0);if(tt_aV[OFFSETY]>0&&B<=0){B=1}return(tt_musY-tt_h-B)}function tt_OnOut(){tt_AddRemOutFnc(false);if(!(tt_aV[STICKY]&&(tt_iState&2))){tt_HideInit()}}function tt_HideInit(){tt_ExtCallFncs(0,"HideInit");tt_iState&=~4;if(tt_flagOpa&&tt_aV[FADEOUT]){tt_tFade.EndTimer();if(tt_opa){var B=Math.round(tt_aV[FADEOUT]/(tt_aV[FADEINTERVAL]*(tt_aV[OPACITY]/tt_opa)));tt_Fade(tt_opa,tt_opa,0,B);return }}tt_tHide.Timer("tt_Hide();",1,false)}function tt_OpReHref(){if(tt_elDeHref){tt_elDeHref.setAttribute("href",tt_elDeHref.t_href);tt_RemEvtFnc(tt_elDeHref,"mousedown",tt_OpReHref);window.status=tt_elDeHref.t_stats;tt_elDeHref=null}}function tt_Fade(E,H,G,F){if(F){H+=Math.round((G-H)/F);if((G>E)?(H>=G):(H<=G)){H=G}else{tt_tFade.Timer("tt_Fade("+E+","+H+","+G+","+(F-1)+")",tt_aV[FADEINTERVAL],true)}}H?tt_SetTipOpa(H):tt_Hide()}function tt_SetTipOpa(B){tt_SetOpa(tt_aElt[5].style,B);if(tt_aElt[1]){tt_SetOpa(tt_aElt[1].style,B)}if(tt_aV[SHADOW]){B=Math.round(B*0.8);tt_SetOpa(tt_aElt[7].style,B);tt_SetOpa(tt_aElt[8].style,B)}}function tt_OnCloseBtnOver(D){var C=tt_aElt[4].style;D<<=1;C.background=tt_aV[CLOSEBTNCOLORS][D];C.color=tt_aV[CLOSEBTNCOLORS][D+1]}function tt_Int(C){var D;return(isNaN(D=parseInt(C))?0:D)}function tt_AddRemOutFnc(C){var D=C?tt_AddEvtFnc:tt_RemEvtFnc;if(C!=tt_AddRemOutFnc.bOn){D(tt_over,"mouseout",tt_OnOut);tt_AddRemOutFnc.bOn=C;if(!C){tt_OpReHref()}}}tt_AddRemOutFnc.bOn=false;Number.prototype.Timer=function(E,F,D){if(!this.value||D){this.value=window.setTimeout(E,F)}};Number.prototype.EndTimer=function(){if(this.value){window.clearTimeout(this.value);this.value=0}};function tt_SetOpa(F,D){tt_opa=D;if(tt_flagOpa==1){if(D<100){var E=F.visibility!="hidden";F.zoom="100%";if(!E){F.visibility="visible"}F.filter="alpha(opacity="+D+")";if(!E){F.visibility="hidden"}}else{F.filter=""}}else{D/=100;switch(tt_flagOpa){case 2:F.KhtmlOpacity=D;break;case 3:F.KHTMLOpacity=D;break;case 4:F.MozOpacity=D;break;case 5:F.opacity=D;break}}}function tt_MovDomNode(F,D,E){if(D){D.removeChild(F)}if(E){E.appendChild(F)}}function tt_Err(B){if(tt_Debug){alert("Tooltip Script Error Message:\n\n"+B)}}function tt_ExtCmdEnum(){var s;for(var i in cg){s="window."+i.toString().toUpperCase();if(eval("typeof("+s+") == tt_u")){eval(s+" = "+tt_aV.length);tt_aV[tt_aV.length]=null}}}function tt_ExtCallFncs(J,I){var F=false;for(var H=tt_aExt.length;H;){--H;var G=tt_aExt[H]["On"+I];if(G&&G(J)){F=true}}return F}tt_Init()

 
  
 if(typeof YAHOO=="undefined"){var YAHOO={}}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]]}}return E};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C)}else{return false}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]}}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B)}if(E){E.VERSION=H;E.BUILD=G}else{YAHOO.log("mainClass is undefined for module "+A,"warn")}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1])}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1])}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1])}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1])}}}}}return C}();(function(){YAHOO.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break}}if(D){A.push(B)}}}})();YAHOO.lang={isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice)&&!A.hasOwnProperty(B.length)}return false},isBoolean:function(A){return typeof A==="boolean"},isFunction:function(A){return typeof A==="function"},isNull:function(A){return A===null},isNumber:function(A){return typeof A==="number"&&isFinite(A)},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false},isString:function(A){return typeof A==="string"},isUndefined:function(A){return typeof A==="undefined"},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B)}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B]},_IEEnumFix:function(B,A){if(YAHOO.env.ua.ie){var D=["toString","valueOf"];for(i=0;i<D.length;i=i+1){var E=D[i],C=A[E];if(YAHOO.lang.isFunction(C)&&C!=Object.prototype[E]){B[E]=C}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.")}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E}if(C){for(var A in C){D.prototype[A]=C[A]}YAHOO.lang._IEEnumFix(D.prototype,C)}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.")}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]]}}else{for(F in D){if(B||!E[F]){E[F]=D[F]}}YAHOO.lang._IEEnumFix(E,D)}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.")}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B])}YAHOO.lang.augmentObject.apply(this,A)},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)||A instanceof Date||("nodeType" in A&&"tagName" in A)){return A}else{if(C.isFunction(A)){return B}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J)}else{I.push(A[D])}I.push(H)}if(I.length>1){I.pop()}I.push("]")}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J)}else{I.push(A[D])}I.push(H)}}if(I.length>1){I.pop()}I.push("}")}return I.join("")},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break}F=Q.indexOf(O,G);if(G+1>=F){break}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E)}N=B[M];if(J){N=J(M,N,P)}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10))}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4)}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10))}else{N=N.toString()}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C}}Q=Q.substring(0,G)+N+Q.substring(F+1)}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g")}return Q},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"")}catch(B){return A}},merge:function(){var C={},A=arguments,B;for(B=0;B<A.length;B=B+1){YAHOO.lang.augmentObject(C,A[B],true)}return C},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B))}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.0",build:"442"});(function(){var B=YAHOO.util,K,I,H=0,J={},F={};var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var M=function(O){if(!E.HYPHEN.test(O)){return O}if(J[O]){return J[O]}var P=O;while(E.HYPHEN.exec(P)){P=P.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase())}J[O]=P;return P};var N=function(P){var O=F[P];if(!O){O=new RegExp("(?:^|\\s+)"+P+"(?:\\s+|$)");F[P]=O}return O};if(document.defaultView&&document.defaultView.getComputedStyle){K=function(O,R){var Q=null;if(R=="float"){R="cssFloat"}var P=document.defaultView.getComputedStyle(O,"");if(P){Q=P[M(R)]}return O.style[R]||Q}}else{if(document.documentElement.currentStyle&&G){K=function(O,Q){switch(M(Q)){case"opacity":var S=100;try{S=O.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(R){try{S=O.filters("alpha").opacity}catch(R){}}return S/100;case"float":Q="styleFloat";default:var P=O.currentStyle?O.currentStyle[Q]:null;return(O.style[Q]||P)}}}else{K=function(O,P){return O.style[P]}}}if(G){I=function(O,P,Q){switch(P){case"opacity":if(YAHOO.lang.isString(O.style.filter)){O.style.filter="alpha(opacity="+Q*100+")";if(!O.currentStyle||!O.currentStyle.hasLayout){O.style.zoom=1}}break;case"float":P="styleFloat";default:O.style[P]=Q}}}else{I=function(O,P,Q){if(P=="float"){P="cssFloat"}O.style[P]=Q}}var D=function(O,P){return O&&O.nodeType==1&&(!P||P(O))};YAHOO.util.Dom={get:function(Q){if(!Q||Q.tagName||Q.item){return Q}if(YAHOO.lang.isString(Q)){return document.getElementById(Q)}if(Q.splice){var R=[];for(var P=0,O=Q.length;P<O;++P){R[R.length]=B.Dom.get(Q[P])}return R}return Q},getStyle:function(O,Q){Q=M(Q);var P=function(R){return K(R,Q)};return B.Dom.batch(O,P,B.Dom,true)},setStyle:function(O,Q,R){Q=M(Q);var P=function(S){I(S,Q,R)};B.Dom.batch(O,P,B.Dom,true)},getXY:function(O){var P=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=document.body){return false}var Q=null;var V=[];var S;var T=R.ownerDocument;if(R.getBoundingClientRect){S=R.getBoundingClientRect();return[S.left+B.Dom.getDocumentScrollLeft(R.ownerDocument),S.top+B.Dom.getDocumentScrollTop(R.ownerDocument)]}else{V=[R.offsetLeft,R.offsetTop];Q=R.offsetParent;var U=this.getStyle(R,"position")=="absolute";if(Q!=R){while(Q){V[0]+=Q.offsetLeft;V[1]+=Q.offsetTop;if(L&&!U&&this.getStyle(Q,"position")=="absolute"){U=true}Q=Q.offsetParent}}if(L&&U){V[0]-=R.ownerDocument.body.offsetLeft;V[1]-=R.ownerDocument.body.offsetTop}}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(B.Dom.getStyle(Q,"display").search(/^inline|table-row.*$/i)){V[0]-=Q.scrollLeft;V[1]-=Q.scrollTop}Q=Q.parentNode}return V};return B.Dom.batch(O,P,B.Dom,true)},getX:function(O){var P=function(Q){return B.Dom.getXY(Q)[0]};return B.Dom.batch(O,P,B.Dom,true)},getY:function(O){var P=function(Q){return B.Dom.getXY(Q)[1]};return B.Dom.batch(O,P,B.Dom,true)},setXY:function(O,R,Q){var P=function(U){var T=this.getStyle(U,"position");if(T=="static"){this.setStyle(U,"position","relative");T="relative"}var W=this.getXY(U);if(W===false){return false}var V=[parseInt(this.getStyle(U,"left"),10),parseInt(this.getStyle(U,"top"),10)];if(isNaN(V[0])){V[0]=(T=="relative")?0:U.offsetLeft}if(isNaN(V[1])){V[1]=(T=="relative")?0:U.offsetTop}if(R[0]!==null){U.style.left=R[0]-W[0]+V[0]+"px"}if(R[1]!==null){U.style.top=R[1]-W[1]+V[1]+"px"}if(!Q){var S=this.getXY(U);if((R[0]!==null&&S[0]!=R[0])||(R[1]!==null&&S[1]!=R[1])){this.setXY(U,R,true)}}};B.Dom.batch(O,P,B.Dom,true)},setX:function(P,O){B.Dom.setXY(P,[O,null])},setY:function(O,P){B.Dom.setXY(O,[null,P])},getRegion:function(O){var P=function(Q){if((Q.parentNode===null||Q.offsetParent===null||this.getStyle(Q,"display")=="none")&&Q!=document.body){return false}var R=B.Region.getRegion(Q);return R};return B.Dom.batch(O,P,B.Dom,true)},getClientWidth:function(){return B.Dom.getViewportWidth()},getClientHeight:function(){return B.Dom.getViewportHeight()},getElementsByClassName:function(S,W,T,U){W=W||"*";T=(T)?B.Dom.get(T):null||document;if(!T){return[]}var P=[],O=T.getElementsByTagName(W),V=N(S);for(var Q=0,R=O.length;Q<R;++Q){if(V.test(O[Q].className)){P[P.length]=O[Q];if(U){U.call(O[Q],O[Q])}}}return P},hasClass:function(Q,P){var O=N(P);var R=function(S){return O.test(S.className)};return B.Dom.batch(Q,R,B.Dom,true)},addClass:function(P,O){var Q=function(R){if(this.hasClass(R,O)){return false}R.className=YAHOO.lang.trim([R.className,O].join(" "));return true};return B.Dom.batch(P,Q,B.Dom,true)},removeClass:function(Q,P){var O=N(P);var R=function(S){if(!this.hasClass(S,P)){return false}var T=S.className;S.className=T.replace(O," ");if(this.hasClass(S,P)){this.removeClass(S,P)}S.className=YAHOO.lang.trim(S.className);return true};return B.Dom.batch(Q,R,B.Dom,true)},replaceClass:function(R,P,O){if(!O||P===O){return false}var Q=N(P);var S=function(T){if(!this.hasClass(T,P)){this.addClass(T,O);return true}T.className=T.className.replace(Q," "+O+" ");if(this.hasClass(T,P)){this.replaceClass(T,P,O)}T.className=YAHOO.lang.trim(T.className);return true};return B.Dom.batch(R,S,B.Dom,true)},generateId:function(O,Q){Q=Q||"yui-gen";var P=function(R){if(R&&R.id){return R.id}var S=Q+H++;if(R){R.id=S}return S};return B.Dom.batch(O,P,B.Dom,true)||P.apply(B.Dom,arguments)},isAncestor:function(P,Q){P=B.Dom.get(P);if(!P||!Q){return false}var O=function(R){if(P.contains&&R.nodeType&&!L){return P.contains(R)}else{if(P.compareDocumentPosition&&R.nodeType){return !!(P.compareDocumentPosition(R)&16)}else{if(R.nodeType){return !!this.getAncestorBy(R,function(S){return S==P})}}}return false};return B.Dom.batch(Q,O,B.Dom,true)},inDocument:function(O){var P=function(Q){if(L){while(Q=Q.parentNode){if(Q==document.documentElement){return true}}return false}return this.isAncestor(document.documentElement,Q)};return B.Dom.batch(O,P,B.Dom,true)},getElementsBy:function(V,P,Q,S){P=P||"*";Q=(Q)?B.Dom.get(Q):null||document;if(!Q){return[]}var R=[],U=Q.getElementsByTagName(P);for(var T=0,O=U.length;T<O;++T){if(V(U[T])){R[R.length]=U[T];if(S){S(U[T])}}}return R},batch:function(S,V,U,Q){S=(S&&S.tagName)?S:B.Dom.get(S);if(!S||!V){return false}var R=(Q)?U:window;if(S.tagName||(!S.item&&!S.slice)){return V.call(R,S,U)}var T=[];for(var P=0,O=S.length;P<O;++P){T[T.length]=V.call(R,S[P],U)}return T},getDocumentHeight:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;var O=Math.max(P,B.Dom.getViewportHeight());return O},getDocumentWidth:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;var O=Math.max(P,B.Dom.getViewportWidth());return O},getViewportHeight:function(){var O=self.innerHeight;var P=document.compatMode;if((P||G)&&!C){O=(P=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight}return O},getViewportWidth:function(){var O=self.innerWidth;var P=document.compatMode;if(P||G){O=(P=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth}return O},getAncestorBy:function(O,P){while(O=O.parentNode){if(D(O,P)){return O}}return null},getAncestorByClassName:function(P,O){P=B.Dom.get(P);if(!P){return null}var Q=function(R){return B.Dom.hasClass(R,O)};return B.Dom.getAncestorBy(P,Q)},getAncestorByTagName:function(P,O){P=B.Dom.get(P);if(!P){return null}var Q=function(R){return R.tagName&&R.tagName.toUpperCase()==O.toUpperCase()};return B.Dom.getAncestorBy(P,Q)},getPreviousSiblingBy:function(O,P){while(O){O=O.previousSibling;if(D(O,P)){return O}}return null},getPreviousSibling:function(O){O=B.Dom.get(O);if(!O){return null}return B.Dom.getPreviousSiblingBy(O)},getNextSiblingBy:function(O,P){while(O){O=O.nextSibling;if(D(O,P)){return O}}return null},getNextSibling:function(O){O=B.Dom.get(O);if(!O){return null}return B.Dom.getNextSiblingBy(O)},getFirstChildBy:function(O,Q){var P=(D(O.firstChild,Q))?O.firstChild:null;return P||B.Dom.getNextSiblingBy(O.firstChild,Q)},getFirstChild:function(O,P){O=B.Dom.get(O);if(!O){return null}return B.Dom.getFirstChildBy(O)},getLastChildBy:function(O,Q){if(!O){return null}var P=(D(O.lastChild,Q))?O.lastChild:null;return P||B.Dom.getPreviousSiblingBy(O.lastChild,Q)},getLastChild:function(O){O=B.Dom.get(O);return B.Dom.getLastChildBy(O)},getChildrenBy:function(P,R){var Q=B.Dom.getFirstChildBy(P,R);var O=Q?[Q]:[];B.Dom.getNextSiblingBy(Q,function(S){if(!R||R(S)){O[O.length]=S}return false});return O},getChildren:function(O){O=B.Dom.get(O);if(!O){}return B.Dom.getChildrenBy(O)},getDocumentScrollLeft:function(O){O=O||document;return Math.max(O.documentElement.scrollLeft,O.body.scrollLeft)},getDocumentScrollTop:function(O){O=O||document;return Math.max(O.documentElement.scrollTop,O.body.scrollTop)},insertBefore:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null}return O.parentNode.insertBefore(P,O)},insertAfter:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null}if(O.nextSibling){return O.parentNode.insertBefore(P,O.nextSibling)}else{return O.parentNode.appendChild(P)}}}})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom)};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left))};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B)}else{return null}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B)};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}")};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B)};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0]}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.0",build:"442"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true)}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'")}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A)}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A))},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll()}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true}}return E},fire:function(){var E=this.subscribers.length;if(!E&&this.silent){return true}var G=[],F=true,D,H=false;for(D=0;D<arguments.length;++D){G.push(arguments[D])}var A=G.length;if(!this.silent){}for(D=0;D<E;++D){var K=this.subscribers[D];if(!K){H=true}else{if(!this.silent){}var J=K.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(G.length>0){B=G[0]}F=K.fn.call(J,B,K.obj)}else{F=K.fn.call(J,this.type,G,K.obj)}if(false===F){if(!this.silent){}return false}}}if(H){var I=[],C=this.subscribers;for(D=0,E=C.length;D<E;++D){K=C[D];I.push(C[D])}this.subscribers=I}return true},unsubscribeAll:function(){for(var B=0,A=this.subscribers.length;B<A;++B){this._delete(A-1-B)}this.subscribers=[];return B},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj}this.subscribers[A]=null},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj}else{return this.override}}return A};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B)}else{return(this.fn==A)}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }"};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var J=false;var I=[];var K=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var L=this;var M=function(){L._tryPreloadAttach()};this._interval=setInterval(M,this.POLL_INTERVAL)}},onAvailable:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:false});C=this.POLL_RETRYS;this.startInterval()},onDOMReady:function(L,N,M){if(J){setTimeout(function(){var O=window;if(M){if(M===true){O=N}else{O=M}}L.call(O,"DOMReady",[],N)},0)}else{this.DOMReadyEvent.subscribe(L,N,M)}},onContentReady:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:true});C=this.POLL_RETRYS;this.startInterval()},addListener:function(N,L,W,R,M){if(!W||!W.call){return false}if(this._isValidCollection(N)){var X=true;for(var S=0,U=N.length;S<U;++S){X=this.on(N[S],L,W,R,M)&&X}return X}else{if(YAHOO.lang.isString(N)){var Q=this.getEl(N);if(Q){N=Q}else{this.onAvailable(N,function(){YAHOO.util.Event.on(N,L,W,R,M)});return true}}}if(!N){return false}if("unload"==L&&R!==this){K[K.length]=[N,L,W,R,M];return true}var Z=N;if(M){if(M===true){Z=R}else{Z=M}}var O=function(a){return W.call(Z,YAHOO.util.Event.getEvent(a),R)};var Y=[N,L,W,O,Z];var T=I.length;I[T]=Y;if(this.useLegacyEvent(N,L)){var P=this.getLegacyIndex(N,L);if(P==-1||N!=G[P][0]){P=G.length;B[N.id+L]=P;G[P]=[N,L,N["on"+L]];E[P]=[];N["on"+L]=function(a){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(a),P)}}E[P].push(Y)}else{try{this._simpleAdd(N,L,O,false)}catch(V){this.lastError=V;this.removeListener(N,L,W);return false}}return true},fireLegacyEvent:function(P,N){var R=true,L,T,S,U,Q;T=E[N];for(var M=0,O=T.length;M<O;++M){S=T[M];if(S&&S[this.WFN]){U=S[this.ADJ_SCOPE];Q=S[this.WFN].call(U,P);R=(R&&Q)}}L=G[N];if(L&&L[2]){L[2](P)}return R},getLegacyIndex:function(M,N){var L=this.generateId(M)+N;if(typeof B[L]=="undefined"){return -1}else{return B[L]}},useLegacyEvent:function(M,N){if(this.webkit&&("click"==N||"dblclick"==N)){var L=parseInt(this.webkit,10);if(!isNaN(L)&&L<418){return true}}return false},removeListener:function(M,L,U){var P,S;if(typeof M=="string"){M=this.getEl(M)}else{if(this._isValidCollection(M)){var V=true;for(P=0,S=M.length;P<S;++P){V=(this.removeListener(M[P],L,U)&&V)}return V}}if(!U||!U.call){return this.purgeElement(M,false,L)}if("unload"==L){for(P=0,S=K.length;P<S;P++){var W=K[P];if(W&&W[0]==M&&W[1]==L&&W[2]==U){K[P]=null;return true}}return false}var Q=null;var R=arguments[3];if("undefined"==typeof R){R=this._getCacheIndex(M,L,U)}if(R>=0){Q=I[R]}if(!M||!Q){return false}if(this.useLegacyEvent(M,L)){var O=this.getLegacyIndex(M,L);var N=E[O];if(N){for(P=0,S=N.length;P<S;++P){W=N[P];if(W&&W[this.EL]==M&&W[this.TYPE]==L&&W[this.FN]==U){N[P]=null;break}}}}else{try{this._simpleRemove(M,L,Q[this.WFN],false)}catch(T){this.lastError=T;return false}}delete I[R][this.WFN];delete I[R][this.FN];I[R]=null;return true},getTarget:function(N,M){var L=N.target||N.srcElement;return this.resolveTextNode(L)},resolveTextNode:function(L){if(L&&3==L.nodeType){return L.parentNode}else{return L}},getPageX:function(M){var L=M.pageX;if(!L&&0!==L){L=M.clientX||0;if(this.isIE){L+=this._getScrollLeft()}}return L},getPageY:function(L){var M=L.pageY;if(!M&&0!==M){M=L.clientY||0;if(this.isIE){M+=this._getScrollTop()}}return M},getXY:function(L){return[this.getPageX(L),this.getPageY(L)]},getRelatedTarget:function(M){var L=M.relatedTarget;if(!L){if(M.type=="mouseout"){L=M.toElement}else{if(M.type=="mouseover"){L=M.fromElement}}}return this.resolveTextNode(L)},getTime:function(N){if(!N.time){var M=new Date().getTime();try{N.time=M}catch(L){this.lastError=L;return M}}return N.time},stopEvent:function(L){this.stopPropagation(L);this.preventDefault(L)},stopPropagation:function(L){if(L.stopPropagation){L.stopPropagation()}else{L.cancelBubble=true}},preventDefault:function(L){if(L.preventDefault){L.preventDefault()}else{L.returnValue=false}},getEvent:function(M){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break}N=N.caller}}return L},getCharCode:function(M){var L=M.keyCode||M.charCode||0;if(YAHOO.env.ua.webkit&&(L in D)){L=D[L]}return L},_getCacheIndex:function(P,Q,O){for(var N=0,M=I.length;N<M;++N){var L=I[N];if(L&&L[this.FN]==O&&L[this.EL]==P&&L[this.TYPE]==Q){return N}}return -1},generateId:function(L){var M=L.id;if(!M){M="yuievtautoid-"+A;++A;L.id=M}return M},_isValidCollection:function(M){try{return(M&&M.length&&typeof M!="string"&&!M.tagName&&!M.alert&&typeof M[0]!="undefined")}catch(L){return false}},elCache:{},getEl:function(L){return document.getElementById(L)},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(M){if(!H){H=true;var L=YAHOO.util.Event;L._ready();L._tryPreloadAttach()}},_ready:function(M){if(!J){J=true;var L=YAHOO.util.Event;L.DOMReadyEvent.fire();L._simpleRemove(document,"DOMContentLoaded",L._ready)}},_tryPreloadAttach:function(){if(this.locked){return false}if(this.isIE){if(!J){this.startInterval();return false}}this.locked=true;var Q=!H;if(!Q){Q=(C>0)}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj}else{S=U.override}}U.fn.call(S,U.obj)};var M,L,O,N;for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&!O.checkReady){N=this.getEl(O.id);if(N){R(N,O);F[M]=null}else{P.push(O)}}}for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&O.checkReady){N=this.getEl(O.id);if(N){if(H||N.nextSibling){R(N,O);F[M]=null}}else{P.push(O)}}}C=(P.length===0)?0:C-1;if(Q){this.startInterval()}else{clearInterval(this._interval);this._interval=null}this.locked=false;return true},purgeElement:function(O,P,R){var Q=this.getListeners(O,R);if(Q){for(var N=0,L=Q.length;N<L;++N){var M=Q[N];this.removeListener(O,M.type,M.fn,M.index)}}if(P&&O&&O.childNodes){for(N=0,L=O.childNodes.length;N<L;++N){this.purgeElement(O.childNodes[N],P,R)}}},getListeners:function(N,L){var Q=[],M;if(!L){M=[I,K]}else{if(L=="unload"){M=[K]}else{M=[I]}}for(var P=0;P<M.length;++P){var T=M[P];if(T&&T.length>0){for(var R=0,S=T.length;R<S;++R){var O=T[R];if(O&&O[this.EL]===N&&(!L||L===O[this.TYPE])){Q.push({type:O[this.TYPE],fn:O[this.FN],obj:O[this.OBJ],adjust:O[this.ADJ_SCOPE],index:R})}}}}return(Q.length)?Q:null},_unload:function(S){var R=YAHOO.util.Event,P,O,M,L,N;for(P=0,L=K.length;P<L;++P){M=K[P];if(M){var Q=window;if(M[R.ADJ_SCOPE]){if(M[R.ADJ_SCOPE]===true){Q=M[R.OBJ]}else{Q=M[R.ADJ_SCOPE]}}M[R.FN].call(Q,R.getEvent(S),M[R.OBJ]);K[P]=null;M=null;Q=null}}K=null;if(I&&I.length>0){O=I.length;while(O){N=O-1;M=I[N];if(M){R.removeListener(M[R.EL],M[R.TYPE],M[R.FN],N)}O=O-1}M=null;R.clearCache()}for(P=0,L=G.length;P<L;++P){G[P][0]=null;G[P]=null}G=null;R._simpleRemove(window,"unload",R._unload)},_getScrollLeft:function(){return this._getScroll()[1]},_getScrollTop:function(){return this._getScroll()[0]},_getScroll:function(){var L=document.documentElement,M=document.body;if(L&&(L.scrollTop||L.scrollLeft)){return[L.scrollTop,L.scrollLeft]}else{if(M){return[M.scrollTop,M.scrollLeft]}else{return[0,0]}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(N,O,M,L){N.addEventListener(O,M,(L))}}else{if(window.attachEvent){return function(N,O,M,L){N.attachEvent("on"+O,M)}}else{return function(){}}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(N,O,M,L){N.removeEventListener(O,M,(L))}}else{if(window.detachEvent){return function(M,N,L){M.detachEvent("on"+N,L)}}else{return function(){}}}}()}}();(function(){var D=YAHOO.util.Event;D.on=D.addListener;if(D.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var B,E=document,A=E.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){B=document.createElement("script");var C=E.getElementsByTagName("head")[0]||A;C.insertBefore(B,C.firstChild)}else{E.write("<scr"+"ipt id=\"_yui_eu_dr\" defer=\"true\" src=\"//:\"><"+"/script>");B=document.getElementById("_yui_eu_dr")}if(B){B.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready()}}}else{}B=null}else{if(D.webkit){D._drwatch=setInterval(function(){var F=document.readyState;if("loaded"==F||"complete"==F){clearInterval(D._drwatch);D._drwatch=null;D._ready()}},D.POLL_INTERVAL)}else{D._simpleAdd(document,"DOMContentLoaded",D._ready)}}D._simpleAdd(window,"load",D._load);D._simpleAdd(window,"unload",D._unload);D._tryPreloadAttach()})()}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E)}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[]}B[A].push({fn:C,obj:F,override:E})}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G)}}else{for(var D in A){var B=true;if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G)}}return B}return false},unsubscribeAll:function(A){return this.unsubscribe(A)},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback)}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override)}}}return I[G]},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F])}return G.fire.apply(G,B)},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true}}return false}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A)}if(typeof B=="function"){D.subscribe(B)}else{D.subscribe(B.fn,B.scope,B.correctScope)}function E(K,J){if(!F.shift){F.shift=false}if(!F.alt){F.alt=false}if(!F.ctrl){F.ctrl=false}if(K.shiftKey==F.shift&&K.altKey==F.alt&&K.ctrlKey==F.ctrl){var H;var G;if(F.keys instanceof Array){for(var I=0;I<F.keys.length;I++){H=F.keys[I];if(H==K.charCode){D.fire(K.charCode,K);break}else{if(H==K.keyCode){D.fire(K.keyCode,K);break}}}}else{H=F.keys;if(H==K.charCode){D.fire(K.charCode,K)}else{if(H==K.keyCode){D.fire(K.keyCode,K)}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F)}this.enabled=true};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F)}this.enabled=false};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"")}};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.0",build:"442"});YAHOO.register("yahoo-dom-event",YAHOO,{version:"2.3.0",build:"442"})
YAHOO.util.Anim=function(B,A,C,D){if(!B){}this.init(B,A,C,D)};YAHOO.util.Anim.prototype={toString:function(){var A=this.getEl();var B=A.id||A.tagName||A;return("Anim "+B)},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(A,C,B){return this.method(this.currentFrame,C,B-C,this.totalFrames)},setAttribute:function(A,C,B){if(this.patterns.noNegatives.test(A)){C=(C>0)?C:0}YAHOO.util.Dom.setStyle(this.getEl(),A,C+B)},getAttribute:function(A){var C=this.getEl();var E=YAHOO.util.Dom.getStyle(C,A);if(E!=="auto"&&!this.patterns.offsetUnit.test(E)){return parseFloat(E)}var B=this.patterns.offsetAttribute.exec(A)||[];var F=!!(B[3]);var D=!!(B[2]);if(D||(YAHOO.util.Dom.getStyle(C,"position")=="absolute"&&F)){E=C["offset"+B[0].charAt(0).toUpperCase()+B[0].substr(1)]}else{E=0}return E},getDefaultUnit:function(A){if(this.patterns.defaultUnit.test(A)){return"px"}return""},setRuntimeAttribute:function(B){var G;var C;var D=this.attributes;this.runtimeAttributes[B]={};var F=function(H){return(typeof H!=="undefined")};if(!F(D[B]["to"])&&!F(D[B]["by"])){return false}G=(F(D[B]["from"]))?D[B]["from"]:this.getAttribute(B);if(F(D[B]["to"])){C=D[B]["to"]}else{if(F(D[B]["by"])){if(G.constructor==Array){C=[];for(var E=0,A=G.length;E<A;++E){C[E]=G[E]+D[B]["by"][E]*1}}else{C=G+D[B]["by"]*1}}}this.runtimeAttributes[B].start=G;this.runtimeAttributes[B].end=C;this.runtimeAttributes[B].unit=(F(D[B].unit))?D[B]["unit"]:this.getDefaultUnit(B);return true},init:function(C,H,G,A){var B=false;var D=null;var F=0;C=YAHOO.util.Dom.get(C);this.attributes=H||{};this.duration=!YAHOO.lang.isUndefined(G)?G:1;this.method=A||YAHOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.setEl=function(K){C=YAHOO.util.Dom.get(K)};this.getEl=function(){return C};this.isAnimated=function(){return B};this.getStartTime=function(){return D};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1}YAHOO.util.AnimMgr.registerElement(this);return true};this.stop=function(K){if(K){this.currentFrame=this.totalFrames;this._onTween.fire()}YAHOO.util.AnimMgr.stop(this)};var J=function(){this.onStart.fire();this.runtimeAttributes={};for(var K in this.attributes){this.setRuntimeAttribute(K)}B=true;F=0;D=new Date()};var I=function(){var M={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};M.toString=function(){return("duration: "+M.duration+", currentFrame: "+M.currentFrame)};this.onTween.fire(M);var L=this.runtimeAttributes;for(var K in L){this.setAttribute(K,this.doMethod(K,L[K].start,L[K].end),L[K].unit)}F+=1};var E=function(){var K=(new Date()-D)/1000;var L={duration:K,frames:F,fps:F/K};L.toString=function(){return("duration: "+L.duration+", frames: "+L.frames+", fps: "+L.fps)};B=false;F=0;this.onComplete.fire(L)};this._onStart=new YAHOO.util.CustomEvent("_start",this,true);this.onStart=new YAHOO.util.CustomEvent("start",this);this.onTween=new YAHOO.util.CustomEvent("tween",this);this._onTween=new YAHOO.util.CustomEvent("_tween",this,true);this.onComplete=new YAHOO.util.CustomEvent("complete",this);this._onComplete=new YAHOO.util.CustomEvent("_complete",this,true);this._onStart.subscribe(J);this._onTween.subscribe(I);this._onComplete.subscribe(E)}};YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start()};this.unRegister=function(G,F){G._onComplete.fire();F=F||E(G);if(F==-1){return false}B.splice(F,1);A-=1;if(A<=0){this.stop()}return true};this.start=function(){if(C===null){C=setInterval(this.run,this.delay)}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){if(B[0].isAnimated()){this.unRegister(B[0],0)}}B=[];C=null;A=0}else{this.unRegister(H)}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G)}G._onTween.fire()}else{YAHOO.util.AnimMgr.stop(G,H)}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G}}return -1};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame)}else{K=J-(I+1)}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1)}G.currentFrame+=K}}};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]]}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1]}}return[C[0][0],C[0][1]]}};(function(){YAHOO.util.ColorAnim=function(E,D,F,G){YAHOO.util.ColorAnim.superclass.constructor.call(this,E,D,F,G)};YAHOO.extend(YAHOO.util.ColorAnim,YAHOO.util.Anim);var B=YAHOO.util;var C=B.ColorAnim.superclass;var A=B.ColorAnim.prototype;A.toString=function(){var D=this.getEl();var E=D.id||D.tagName;return("ColorAnim "+E)};A.patterns.color=/color$/i;A.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;A.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;A.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;A.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;A.parseColor=function(D){if(D.length==3){return D}var E=this.patterns.hex.exec(D);if(E&&E.length==4){return[parseInt(E[1],16),parseInt(E[2],16),parseInt(E[3],16)]}E=this.patterns.rgb.exec(D);if(E&&E.length==4){return[parseInt(E[1],10),parseInt(E[2],10),parseInt(E[3],10)]}E=this.patterns.hex3.exec(D);if(E&&E.length==4){return[parseInt(E[1]+E[1],16),parseInt(E[2]+E[2],16),parseInt(E[3]+E[3],16)]}return null};A.getAttribute=function(D){var F=this.getEl();if(this.patterns.color.test(D)){var G=YAHOO.util.Dom.getStyle(F,D);if(this.patterns.transparent.test(G)){var E=F.parentNode;G=B.Dom.getStyle(E,D);while(E&&this.patterns.transparent.test(G)){E=E.parentNode;G=B.Dom.getStyle(E,D);if(E.tagName.toUpperCase()=="HTML"){G="#fff"}}}}else{G=C.getAttribute.call(this,D)}return G};A.doMethod=function(E,I,F){var H;if(this.patterns.color.test(E)){H=[];for(var G=0,D=I.length;G<D;++G){H[G]=C.doMethod.call(this,E,I[G],F[G])}H="rgb("+Math.floor(H[0])+","+Math.floor(H[1])+","+Math.floor(H[2])+")"}else{H=C.doMethod.call(this,E,I,F)}return H};A.setRuntimeAttribute=function(E){C.setRuntimeAttribute.call(this,E);if(this.patterns.color.test(E)){var G=this.attributes;var I=this.parseColor(this.runtimeAttributes[E].start);var F=this.parseColor(this.runtimeAttributes[E].end);if(typeof G[E]["to"]==="undefined"&&typeof G[E]["by"]!=="undefined"){F=this.parseColor(G[E].by);for(var H=0,D=I.length;H<D;++H){F[H]=I[H]+F[H]}}this.runtimeAttributes[E].start=I;this.runtimeAttributes[E].end=F}}})();YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A},easeIn:function(B,A,D,C){return D*(B/=C)*B+A},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A}return -D/2*((--B)*(B-2)-1)+A},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A}return -D/2*((B-=2)*B*B*B-2)+A},elasticIn:function(C,A,G,F,B,E){if(C==0){return A}if((C/=F)==1){return A+G}if(!E){E=F*0.3}if(!B||B<Math.abs(G)){B=G;var D=E/4}else{var D=E/(2*Math.PI)*Math.asin(G/B)}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A},elasticOut:function(C,A,G,F,B,E){if(C==0){return A}if((C/=F)==1){return A+G}if(!E){E=F*0.3}if(!B||B<Math.abs(G)){B=G;var D=E/4}else{var D=E/(2*Math.PI)*Math.asin(G/B)}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A}if((C/=F/2)==2){return A+G}if(!E){E=F*(0.3*1.5)}if(!B||B<Math.abs(G)){B=G;var D=E/4}else{var D=E/(2*Math.PI)*Math.asin(G/B)}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158}return E*(B/=D)*B*((C+1)*B-C)+A},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A}};(function(){YAHOO.util.Motion=function(G,F,H,I){if(G){YAHOO.util.Motion.superclass.constructor.call(this,G,F,H,I)}};YAHOO.extend(YAHOO.util.Motion,YAHOO.util.ColorAnim);var D=YAHOO.util;var E=D.Motion.superclass;var B=D.Motion.prototype;B.toString=function(){var F=this.getEl();var G=F.id||F.tagName;return("Motion "+G)};B.patterns.points=/^points$/i;B.setAttribute=function(F,H,G){if(this.patterns.points.test(F)){G=G||"px";E.setAttribute.call(this,"left",H[0],G);E.setAttribute.call(this,"top",H[1],G)}else{E.setAttribute.call(this,F,H,G)}};B.getAttribute=function(F){if(this.patterns.points.test(F)){var G=[E.getAttribute.call(this,"left"),E.getAttribute.call(this,"top")]}else{G=E.getAttribute.call(this,F)}return G};B.doMethod=function(F,J,G){var I=null;if(this.patterns.points.test(F)){var H=this.method(this.currentFrame,0,100,this.totalFrames)/100;I=D.Bezier.getPosition(this.runtimeAttributes[F],H)}else{I=E.doMethod.call(this,F,J,G)}return I};B.setRuntimeAttribute=function(O){if(this.patterns.points.test(O)){var G=this.getEl();var I=this.attributes;var F;var K=I["points"]["control"]||[];var H;var L,N;if(K.length>0&&!(K[0] instanceof Array)){K=[K]}else{var J=[];for(L=0,N=K.length;L<N;++L){J[L]=K[L]}K=J}if(D.Dom.getStyle(G,"position")=="static"){D.Dom.setStyle(G,"position","relative")}if(C(I["points"]["from"])){D.Dom.setXY(G,I["points"]["from"])}else{D.Dom.setXY(G,D.Dom.getXY(G))}F=this.getAttribute("points");if(C(I["points"]["to"])){H=A.call(this,I["points"]["to"],F);var M=D.Dom.getXY(this.getEl());for(L=0,N=K.length;L<N;++L){K[L]=A.call(this,K[L],F)}}else{if(C(I["points"]["by"])){H=[F[0]+I["points"]["by"][0],F[1]+I["points"]["by"][1]];for(L=0,N=K.length;L<N;++L){K[L]=[F[0]+K[L][0],F[1]+K[L][1]]}}}this.runtimeAttributes[O]=[F];if(K.length>0){this.runtimeAttributes[O]=this.runtimeAttributes[O].concat(K)}this.runtimeAttributes[O][this.runtimeAttributes[O].length]=H}else{E.setRuntimeAttribute.call(this,O)}};var A=function(F,H){var G=D.Dom.getXY(this.getEl());F=[F[0]-G[0]+H[0],F[1]-G[1]+H[1]];return F};var C=function(F){return(typeof F!=="undefined")}})();(function(){YAHOO.util.Scroll=function(E,D,F,G){if(E){YAHOO.util.Scroll.superclass.constructor.call(this,E,D,F,G)}};YAHOO.extend(YAHOO.util.Scroll,YAHOO.util.ColorAnim);var B=YAHOO.util;var C=B.Scroll.superclass;var A=B.Scroll.prototype;A.toString=function(){var D=this.getEl();var E=D.id||D.tagName;return("Scroll "+E)};A.doMethod=function(D,G,E){var F=null;if(D=="scroll"){F=[this.method(this.currentFrame,G[0],E[0]-G[0],this.totalFrames),this.method(this.currentFrame,G[1],E[1]-G[1],this.totalFrames)]}else{F=C.doMethod.call(this,D,G,E)}return F};A.getAttribute=function(D){var F=null;var E=this.getEl();if(D=="scroll"){F=[E.scrollLeft,E.scrollTop]}else{F=C.getAttribute.call(this,D)}return F};A.setAttribute=function(D,G,F){var E=this.getEl();if(D=="scroll"){E.scrollLeft=G[0];E.scrollTop=G[1]}else{C.setAttribute.call(this,D,G,F)}}})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.3.0",build:"442"})
YAHOO.util.Connect={_msxml_progid:["MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,"click",function(B){var A=YAHOO.util.Event.getTarget(B);if(A.type=="submit"){YAHOO.util.Connect._submitElementValue=encodeURIComponent(A.name)+"="+encodeURIComponent(A.value)}});return true}return false})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A)},setDefaultPostHeader:function(A){this._use_default_post_header=A},setDefaultXhrHeader:function(A){this._use_default_xhr_header=A},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A}},createXhrObject:function(E){var D,A;try{A=new XMLHttpRequest();D={conn:A,tId:E}}catch(C){for(var B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);D={conn:A,tId:E};break}catch(C){}}}finally{return D}},getConnectionObject:function(A){var C;var D=this._transaction_id;try{if(!A){C=this.createXhrObject(D)}else{C={};C.tId=D;C.isUpload=true}if(C){this._transaction_id++}}catch(B){}finally{return C}},asyncRequest:function(E,B,D,A){var C=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();if(!C){return null}else{if(D&&D.customevents){this.initCustomEvents(C,D)}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(C,D,B,A);return C}if(E.toUpperCase()=="GET"){if(this._sFormData.length!==0){B+=((B.indexOf("?")==-1)?"?":"&")+this._sFormData}else{B+="?"+this._sFormData}}else{if(E.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData}}}C.conn.open(E,B,true);if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true)}}if(this._isFormSubmit||(A&&this._use_default_post_header)){this.initHeader("Content-Type",this._default_post_header);if(this._isFormSubmit){this.resetFormState()}}if(this._has_default_headers||this._has_http_headers){this.setHeader(C)}this.handleReadyState(C,D);C.conn.send(A||null);this.startEvent.fire(C);if(C.startEvent){C.startEvent.fire(C)}return C}},initCustomEvents:function(A,C){for(var B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);A[this._customEvents[B][0]].subscribe(C.customevents[B])}}},handleReadyState:function(B,C){var A=this;if(C&&C.timeout){this._timeOut[B.tId]=window.setTimeout(function(){A.abort(B,C,true)},C.timeout)}this._poll[B.tId]=window.setInterval(function(){if(B.conn&&B.conn.readyState===4){window.clearInterval(A._poll[B.tId]);delete A._poll[B.tId];if(C&&C.timeout){window.clearTimeout(A._timeOut[B.tId]);delete A._timeOut[B.tId]}A.completeEvent.fire(B);if(B.completeEvent){B.completeEvent.fire(B)}A.handleTransactionResponse(B,C)}},this._polling_interval)},handleTransactionResponse:function(E,F,A){if(!F){this.releaseObject(E);return }var C,B;try{if(E.conn.status!==undefined&&E.conn.status!==0){C=E.conn.status}else{C=13030}}catch(D){C=13030}if(C>=200&&C<300||C===1223){B=this.createResponseObject(E,F.argument);if(F.success){if(!F.scope){F.success(B)}else{F.success.apply(F.scope,[B])}}this.successEvent.fire(B);if(E.successEvent){E.successEvent.fire(B)}}else{switch(C){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:B=this.createExceptionObject(E.tId,F.argument,(A?A:false));if(F.failure){if(!F.scope){F.failure(B)}else{F.failure.apply(F.scope,[B])}}break;default:B=this.createResponseObject(E,F.argument);if(F.failure){if(!F.scope){F.failure(B)}else{F.failure.apply(F.scope,[B])}}}this.failureEvent.fire(B);if(E.failureEvent){E.failureEvent.fire(B)}}this.releaseObject(E);B=null},createResponseObject:function(A,G){var D={};var I={};try{var C=A.conn.getAllResponseHeaders();var F=C.split("\n");for(var E=0;E<F.length;E++){var B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=F[E].substring(B+2)}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(typeof G!==undefined){D.argument=G}return D},createExceptionObject:function(H,D,A){var F=0;var G="communication failure";var C=-1;var B="transaction aborted";var E={};E.tId=H;if(A){E.status=C;E.statusText=B}else{E.status=F;E.statusText=G}if(D){E.argument=D}return E},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;if(B[A]===undefined){B[A]=D}else{B[A]=D+","+B[A]}if(C){this._has_default_headers=true}else{this._has_http_headers=true}},setHeader:function(A){if(this._has_default_headers){for(var B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B])}}}if(this._has_http_headers){for(var B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B])}}delete this._http_headers;this._http_headers={};this._has_http_headers=false}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false},setForm:function(K,E,B){this.resetFormState();var J;if(typeof K=="string"){J=(document.getElementById(K)||document.forms[K])}else{if(typeof K=="object"){J=K}else{return }}if(E){var F=this.createFrame(B?B:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=J;return }var A,I,G,L;var H=false;for(var D=0;D<J.elements.length;D++){A=J.elements[D];L=J.elements[D].disabled;I=J.elements[D].name;G=J.elements[D].value;if(!L&&I){switch(A.type){case"select-one":case"select-multiple":for(var C=0;C<A.options.length;C++){if(A.options[C].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].attributes["value"].specified?A.options[C].value:A.options[C].text)+"&"}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].hasAttribute("value")?A.options[C].value:A.options[C].text)+"&"}}}break;case"radio":case"checkbox":if(A.checked){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&"}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(H===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+"&"}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&"}H=true}break;default:this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&"}}}this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);return this._sFormData},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData=""},createFrame:function(A){var B="yuiIO"+this._transaction_id;var C;if(window.ActiveXObject){C=document.createElement("<iframe id=\""+B+"\" name=\""+B+"\" />");if(typeof A=="boolean"){C.src="javascript:false"}else{if(typeof secureURI=="string"){C.src=A}}}else{C=document.createElement("iframe");C.id=B;C.name=B}C.style.position="absolute";C.style.top="-1000px";C.style.left="-1000px";document.body.appendChild(C)},appendPostData:function(A){var D=[];var B=A.split("&");for(var C=0;C<B.length;C++){var E=B[C].indexOf("=");if(E!=-1){D[C]=document.createElement("input");D[C].type="hidden";D[C].name=B[C].substring(0,E);D[C].value=B[C].substring(E+1);this._formNode.appendChild(D[C])}}return D},uploadFile:function(D,L,E,C){var H="yuiIO"+D.tId;var I="multipart/form-data";var J=document.getElementById(H);var M=this;var B={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",E);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",H);if(this._formNode.encoding){this._formNode.setAttribute("encoding",I)}else{this._formNode.setAttribute("enctype",I)}if(C){var K=this.appendPostData(C)}this._formNode.submit();this.startEvent.fire(D);if(D.startEvent){D.startEvent.fire(D)}if(L&&L.timeout){this._timeOut[D.tId]=window.setTimeout(function(){M.abort(D,L,true)},L.timeout)}if(K&&K.length>0){for(var G=0;G<K.length;G++){this._formNode.removeChild(K[G])}}for(var A in B){if(YAHOO.lang.hasOwnProperty(B,A)){if(B[A]){this._formNode.setAttribute(A,B[A])}else{this._formNode.removeAttribute(A)}}}this.resetFormState();var F=function(){if(L&&L.timeout){window.clearTimeout(M._timeOut[D.tId]);delete M._timeOut[D.tId]}M.completeEvent.fire(D);if(D.completeEvent){D.completeEvent.fire(D)}var O={};O.tId=D.tId;O.argument=L.argument;try{O.responseText=J.contentWindow.document.body?J.contentWindow.document.body.innerHTML:J.contentWindow.document.documentElement.textContent;O.responseXML=J.contentWindow.document.XMLDocument?J.contentWindow.document.XMLDocument:J.contentWindow.document}catch(N){}if(L&&L.upload){if(!L.scope){L.upload(O)}else{L.upload.apply(L.scope,[O])}}M.uploadEvent.fire(O);if(D.uploadEvent){D.uploadEvent.fire(O)}if(YAHOO.util.Event){YAHOO.util.Event.removeListener(J,"load",F)}else{if(window.detachEvent){J.detachEvent("onload",F)}else{J.removeEventListener("load",F,false)}}setTimeout(function(){document.body.removeChild(J);M.releaseObject(D)},100)};if(YAHOO.util.Event){YAHOO.util.Event.addListener(J,"load",F)}else{if(window.attachEvent){J.attachEvent("onload",F)}else{J.addEventListener("load",F,false)}}},abort:function(D,F,A){var C;if(D.conn){if(this.isCallInProgress(D)){D.conn.abort();window.clearInterval(this._poll[D.tId]);delete this._poll[D.tId];if(A){window.clearTimeout(this._timeOut[D.tId]);delete this._timeOut[D.tId]}C=true}}else{if(D.isUpload===true){var B="yuiIO"+D.tId;var E=document.getElementById(B);if(E){document.body.removeChild(E);if(A){window.clearTimeout(this._timeOut[D.tId]);delete this._timeOut[D.tId]}C=true}}else{C=false}}if(C===true){this.abortEvent.fire(D);if(D.abortEvent){D.abortEvent.fire(D)}this.handleTransactionResponse(D,F,true)}else{}return C},isCallInProgress:function(B){if(B&&B.conn){return B.conn.readyState!==4&&B.conn.readyState!==0}else{if(B&&B.isUpload===true){var A="yuiIO"+B.tId;return document.getElementById(A)?true:false}else{return false}}},releaseObject:function(A){if(A.conn){A.conn=null}A=null}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.3.0",build:"442"}) 
 /*
 * Ext JS Library 1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext={};window["undefined"]=window["undefined"];Ext.apply=function(o,c,_3){if(_3){Ext.apply(o,_3);}if(o&&c&&typeof c=="object"){for(var p in c){o[p]=c[p];}}return o;};(function(){var _5=0;var ua=navigator.userAgent.toLowerCase();var _7=document.compatMode=="CSS1Compat",_8=ua.indexOf("opera")>-1,_9=(/webkit|khtml/).test(ua),_a=ua.indexOf("msie")>-1,_b=ua.indexOf("msie 7")>-1,_c=!_9&&ua.indexOf("gecko")>-1,_d=_a&&!_7,_e=(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1),_f=(ua.indexOf("macintosh")!=-1||ua.indexOf("mac os x")!=-1),_10=(ua.indexOf("linux")!=-1),_11=window.location.href.toLowerCase().indexOf("https")===0;if(_a&&!_b){try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}}Ext.apply(Ext,{isStrict:_7,isSecure:_11,isReady:false,enableGarbageCollector:true,enableListenerCollection:false,SSL_SECURE_URL:"javascript:false",BLANK_IMAGE_URL:"http:/"+"/extjs.com/s.gif",emptyFn:function(){},applyIf:function(o,c){if(o&&c){for(var p in c){if(typeof o[p]=="undefined"){o[p]=c[p];}}}return o;},addBehaviors:function(o){if(!Ext.isReady){Ext.onReady(function(){Ext.addBehaviors(o);});return;}var _16={};for(var b in o){var _18=b.split("@");if(_18[1]){var s=_18[0];if(!_16[s]){_16[s]=Ext.select(s);}_16[s].on(_18[1],o[b]);}}_16=null;},id:function(el,_1b){_1b=_1b||"ext-gen";el=Ext.getDom(el);var id=_1b+(++_5);return el?(el.id?el.id:(el.id=id)):id;},extend:function(){var io=function(o){for(var m in o){this[m]=o[m];}};return function(sb,sp,_22){if(typeof sp=="object"){_22=sp;sp=sb;sb=function(){sp.apply(this,arguments);};}var F=function(){},sbp,spp=sp.prototype;F.prototype=spp;sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==Object.prototype.constructor){spp.constructor=sp;}sb.override=function(o){Ext.override(sb,o);};sbp.override=io;Ext.override(sb,_22);return sb;};}(),override:function(_27,_28){if(_28){var p=_27.prototype;for(var _2a in _28){p[_2a]=_28[_2a];}}},namespace:function(){var a=arguments,o=null,i,j,d,rt;for(i=0;i<a.length;++i){d=a[i].split(".");rt=d[0];eval("if (typeof "+rt+" == \"undefined\"){"+rt+" = {};} o = "+rt+";");for(j=1;j<d.length;++j){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}},urlEncode:function(o){if(!o){return"";}var buf=[];for(var key in o){var ov=o[key];var _35=typeof ov;if(_35=="undefined"){buf.push(encodeURIComponent(key),"=&");}else{if(_35!="function"&&_35!="object"){buf.push(encodeURIComponent(key),"=",encodeURIComponent(ov),"&");}else{if(ov instanceof Array){for(var i=0,len=ov.length;i<len;i++){buf.push(encodeURIComponent(key),"=",encodeURIComponent(ov[i]===undefined?"":ov[i]),"&");}}}}}buf.pop();return buf.join("");},urlDecode:function(_38,_39){if(!_38||!_38.length){return{};}var obj={};var _3b=_38.split("&");var _3c,_3d,_3e;for(var i=0,len=_3b.length;i<len;i++){_3c=_3b[i].split("=");_3d=decodeURIComponent(_3c[0]);_3e=decodeURIComponent(_3c[1]);if(_39!==true){if(typeof obj[_3d]=="undefined"){obj[_3d]=_3e;}else{if(typeof obj[_3d]=="string"){obj[_3d]=[obj[_3d]];obj[_3d].push(_3e);}else{obj[_3d].push(_3e);}}}else{obj[_3d]=_3e;}}return obj;},each:function(_41,fn,_43){if(typeof _41.length=="undefined"||typeof _41=="string"){_41=[_41];}for(var i=0,len=_41.length;i<len;i++){if(fn.call(_43||_41[i],_41[i],i,_41)===false){return i;}}},combine:function(){var as=arguments,l=as.length,r=[];for(var i=0;i<l;i++){var a=as[i];if(a instanceof Array){r=r.concat(a);}else{if(a.length!==undefined&&!a.substr){r=r.concat(Array.prototype.slice.call(a,0));}else{r.push(a);}}}return r;},escapeRe:function(s){return s.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1");},callback:function(cb,_4d,_4e,_4f){if(typeof cb=="function"){if(_4f){cb.defer(_4f,_4d,_4e||[]);}else{cb.apply(_4d,_4e||[]);}}},getDom:function(el){if(!el){return null;}return el.dom?el.dom:(typeof el=="string"?document.getElementById(el):el);},getCmp:function(id){return Ext.ComponentMgr.get(id);},num:function(v,_53){if(typeof v!="number"){return _53;}return v;},destroy:function(){for(var i=0,a=arguments,len=a.length;i<len;i++){var as=a[i];if(as){if(as.dom){as.removeAllListeners();as.remove();continue;}if(typeof as.purgeListeners=="function"){as.purgeListeners();}if(typeof as.destroy=="function"){as.destroy();}}}},type:function(o){if(o===undefined||o===null){return false;}if(o.htmlElement){return"element";}var t=typeof o;if(t=="object"&&o.nodeName){switch(o.nodeType){case 1:return"element";case 3:return(/\S/).test(o.nodeValue)?"textnode":"whitespace";}}if(t=="object"||t=="function"){switch(o.constructor){case Array:return"array";case RegExp:return"regexp";}if(typeof o.length=="number"&&typeof o.item=="function"){return"nodelist";}}return t;},isEmpty:function(v,_5b){return v===null||v===undefined||(!_5b?v==="":false);},isOpera:_8,isSafari:_9,isIE:_a,isIE7:_b,isGecko:_c,isBorderBox:_d,isWindows:_e,isLinux:_10,isMac:_f,useShims:((_a&&!_b)||(_c&&_f))});})();Ext.namespace("Ext","Ext.util","Ext.grid","Ext.dd","Ext.tree","Ext.data","Ext.form","Ext.menu","Ext.state","Ext.lib","Ext.layout","Ext.app","Ext.ux");Ext.apply(Function.prototype,{createCallback:function(){var _5c=arguments;var _5d=this;return function(){return _5d.apply(window,_5c);};},createDelegate:function(obj,_5f,_60){var _61=this;return function(){var _62=_5f||arguments;if(_60===true){_62=Array.prototype.slice.call(arguments,0);_62=_62.concat(_5f);}else{if(typeof _60=="number"){_62=Array.prototype.slice.call(arguments,0);var _63=[_60,0].concat(_5f);Array.prototype.splice.apply(_62,_63);}}return _61.apply(obj||window,_62);};},defer:function(_64,obj,_66,_67){var fn=this.createDelegate(obj,_66,_67);if(_64){return setTimeout(fn,_64);}fn();return 0;},createSequence:function(fcn,_6a){if(typeof fcn!="function"){return this;}var _6b=this;return function(){var _6c=_6b.apply(this||window,arguments);fcn.apply(_6a||this||window,arguments);return _6c;};},createInterceptor:function(fcn,_6e){if(typeof fcn!="function"){return this;}var _6f=this;return function(){fcn.target=this;fcn.method=_6f;if(fcn.apply(_6e||this||window,arguments)===false){return;}return _6f.apply(this||window,arguments);};}});Ext.applyIf(String,{escape:function(_70){return _70.replace(/('|\\)/g,"\\$1");},leftPad:function(val,_72,ch){var _74=new String(val);if(ch===null||ch===undefined||ch===""){ch=" ";}while(_74.length<_72){_74=ch+_74;}return _74;},format:function(_75){var _76=Array.prototype.slice.call(arguments,1);return _75.replace(/\{(\d+)\}/g,function(m,i){return _76[i];});}});String.prototype.toggle=function(_79,_7a){return this==_79?_7a:_79;};Ext.applyIf(Number.prototype,{constrain:function(min,max){return Math.min(Math.max(this,min),max);}});Ext.applyIf(Array.prototype,{indexOf:function(o){for(var i=0,len=this.length;i<len;i++){if(this[i]==o){return i;}}return-1;},remove:function(o){var _81=this.indexOf(o);if(_81!=-1){this.splice(_81,1);}}});Date.prototype.getElapsed=function(_82){return Math.abs((_82||new Date()).getTime()-this.getTime());};

if(typeof YAHOO=="undefined"){throw"Unable to load Ext, core YUI utilities (yahoo, dom, event) not found.";}(function(){var E=YAHOO.util.Event;var D=YAHOO.util.Dom;var CN=YAHOO.util.Connect;var ES=YAHOO.util.Easing;var A=YAHOO.util.Anim;var _6;Ext.lib.Dom={getViewWidth:function(_7){return _7?D.getDocumentWidth():D.getViewportWidth();},getViewHeight:function(_8){return _8?D.getDocumentHeight():D.getViewportHeight();},isAncestor:function(_9,_a){return D.isAncestor(_9,_a);},getRegion:function(el){return D.getRegion(el);},getY:function(el){return this.getXY(el)[1];},getX:function(el){return this.getXY(el)[0];},getXY:function(el){var p,pe,b,_12,bd=document.body;el=Ext.getDom(el);if(el.getBoundingClientRect){b=el.getBoundingClientRect();_12=fly(document).getScroll();return[b.left+_12.left,b.top+_12.top];}var x=0,y=0;p=el;var _16=fly(el).getStyle("position")=="absolute";while(p){x+=p.offsetLeft;y+=p.offsetTop;if(!_16&&fly(p).getStyle("position")=="absolute"){_16=true;}if(Ext.isGecko){pe=fly(p);var bt=parseInt(pe.getStyle("borderTopWidth"),10)||0;var bl=parseInt(pe.getStyle("borderLeftWidth"),10)||0;x+=bl;y+=bt;if(p!=el&&pe.getStyle("overflow")!="visible"){x+=bl;y+=bt;}}p=p.offsetParent;}if(Ext.isSafari&&_16){x-=bd.offsetLeft;y-=bd.offsetTop;}if(Ext.isGecko&&!_16){var dbd=fly(bd);x+=parseInt(dbd.getStyle("borderLeftWidth"),10)||0;y+=parseInt(dbd.getStyle("borderTopWidth"),10)||0;}p=el.parentNode;while(p&&p!=bd){if(!(Ext.isOpera&&p.tagName!="TR"&&fly(p).getStyle("display")!="inline")){x-=p.scrollLeft;y-=p.scrollTop;}p=p.parentNode;}return[x,y];},setXY:function(el,xy){el=Ext.fly(el,"_setXY");el.position();var pts=el.translatePoints(xy);if(xy[0]!==false){el.dom.style.left=pts.left+"px";}if(xy[1]!==false){el.dom.style.top=pts.top+"px";}},setX:function(el,x){this.setXY(el,[x,false]);},setY:function(el,y){this.setXY(el,[false,y]);}};Ext.lib.Event={getPageX:function(e){return E.getPageX(e.browserEvent||e);},getPageY:function(e){return E.getPageY(e.browserEvent||e);},getXY:function(e){return E.getXY(e.browserEvent||e);},getTarget:function(e){return E.getTarget(e.browserEvent||e);},getRelatedTarget:function(e){return E.getRelatedTarget(e.browserEvent||e);},on:function(el,_27,fn,_29,_2a){E.on(el,_27,fn,_29,_2a);},un:function(el,_2c,fn){E.removeListener(el,_2c,fn);},purgeElement:function(el){E.purgeElement(el);},preventDefault:function(e){E.preventDefault(e.browserEvent||e);},stopPropagation:function(e){E.stopPropagation(e.browserEvent||e);},stopEvent:function(e){E.stopEvent(e.browserEvent||e);},onAvailable:function(el,fn,_34,_35){return E.onAvailable(el,fn,_34,_35);}};Ext.lib.Ajax={request:function(_36,uri,cb,_39,_3a){if(_3a){var hs=_3a.headers;if(hs){for(var h in hs){if(hs.hasOwnProperty(h)){CN.initHeader(h,hs[h],false);}}}if(_3a.xmlData){CN.initHeader("Content-Type","text/xml",false);_36="POST";_39=_3a.xmlData;}}return CN.asyncRequest(_36,uri,cb,_39);},formRequest:function(_3d,uri,cb,_40,_41,_42){CN.setForm(_3d,_41,_42);return CN.asyncRequest(Ext.getDom(_3d).method||"POST",uri,cb,_40);},isCallInProgress:function(_43){return CN.isCallInProgress(_43);},abort:function(_44){return CN.abort(_44);},serializeForm:function(_45){var d=CN.setForm(_45.dom||_45);CN.resetFormState();return d;}};Ext.lib.Region=YAHOO.util.Region;Ext.lib.Point=YAHOO.util.Point;Ext.lib.Anim={scroll:function(el,_48,_49,_4a,cb,_4c){this.run(el,_48,_49,_4a,cb,_4c,YAHOO.util.Scroll);},motion:function(el,_4e,_4f,_50,cb,_52){this.run(el,_4e,_4f,_50,cb,_52,YAHOO.util.Motion);},color:function(el,_54,_55,_56,cb,_58){this.run(el,_54,_55,_56,cb,_58,YAHOO.util.ColorAnim);},run:function(el,_5a,_5b,_5c,cb,_5e,_5f){_5f=_5f||YAHOO.util.Anim;if(typeof _5c=="string"){_5c=YAHOO.util.Easing[_5c];}var _60=new _5f(el,_5a,_5b,_5c);_60.animateX(function(){Ext.callback(cb,_5e);});return _60;}};function fly(el){if(!_6){_6=new Ext.Element.Flyweight();}_6.dom=el;return _6;}if(Ext.isIE){YAHOO.util.Event.on(window,"unload",function(){var p=Function.prototype;delete p.createSequence;delete p.defer;delete p.createDelegate;delete p.createCallback;delete p.createInterceptor;});}if(YAHOO.util.Anim){YAHOO.util.Anim.prototype.animateX=function(_63,_64){var f=function(){this.onComplete.unsubscribe(f);if(typeof _63=="function"){_63.call(_64||this,this);}};this.onComplete.subscribe(f,this,true);this.animate();};}if(YAHOO.util.DragDrop&&Ext.dd.DragDrop){YAHOO.util.DragDrop.defaultPadding=Ext.dd.DragDrop.defaultPadding;YAHOO.util.DragDrop.constrainTo=Ext.dd.DragDrop.constrainTo;}YAHOO.util.Dom.getXY=function(el){var f=function(el){return Ext.lib.Dom.getXY(el);};return YAHOO.util.Dom.batch(el,f,YAHOO.util.Dom,true);};if(YAHOO.util.AnimMgr){YAHOO.util.AnimMgr.fps=1000;}YAHOO.util.Region.prototype.adjust=function(t,l,b,r){this.top+=t;this.left+=l;this.right+=r;this.bottom+=b;return this;};})();
 
 /*
 * Ext JS Library 1.1 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */



Ext.DomHelper=function(){var _1=null;var _2=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;var _3=/^table|tbody|tr|td$/i;var _4=function(o){if(typeof o=="string"){return o;}var b="";if(!o.tag){o.tag="div";}b+="<"+o.tag;for(var _7 in o){if(_7=="tag"||_7=="children"||_7=="cn"||_7=="html"||typeof o[_7]=="function"){continue;}if(_7=="style"){var s=o["style"];if(typeof s=="function"){s=s.call();}if(typeof s=="string"){b+=" style=\""+s+"\"";}else{if(typeof s=="object"){b+=" style=\"";for(var _9 in s){if(typeof s[_9]!="function"){b+=_9+":"+s[_9]+";";}}b+="\"";}}}else{if(_7=="cls"){b+=" class=\""+o["cls"]+"\"";}else{if(_7=="htmlFor"){b+=" for=\""+o["htmlFor"]+"\"";}else{b+=" "+_7+"=\""+o[_7]+"\"";}}}}if(_2.test(o.tag)){b+="/>";}else{b+=">";var cn=o.children||o.cn;if(cn){if(cn instanceof Array){for(var i=0,_c=cn.length;i<_c;i++){b+=_4(cn[i],b);}}else{b+=_4(cn,b);}}if(o.html){b+=o.html;}b+="</"+o.tag+">";}return b;};var _d=function(o,_f){var el=document.createElement(o.tag||"div");var _11=el.setAttribute?true:false;for(var _12 in o){if(_12=="tag"||_12=="children"||_12=="cn"||_12=="html"||_12=="style"||typeof o[_12]=="function"){continue;}if(_12=="cls"){el.className=o["cls"];}else{if(_11){el.setAttribute(_12,o[_12]);}else{el[_12]=o[_12];}}}Ext.DomHelper.applyStyles(el,o.style);var cn=o.children||o.cn;if(cn){if(cn instanceof Array){for(var i=0,len=cn.length;i<len;i++){_d(cn[i],el);}}else{_d(cn,el);}}if(o.html){el.innerHTML=o.html;}if(_f){_f.appendChild(el);}return el;};var _16=function(_17,s,h,e){_1.innerHTML=[s,h,e].join("");var i=-1,el=_1;while(++i<_17){el=el.firstChild;}return el;};var ts="<table>",te="</table>",tbs=ts+"<tbody>",tbe="</tbody>"+te,trs=tbs+"<tr>",tre="</tr>"+tbe;var _23=function(tag,_25,el,_27){if(!_1){_1=document.createElement("div");}var _28;var _29=null;if(tag=="td"){if(_25=="afterbegin"||_25=="beforeend"){return;}if(_25=="beforebegin"){_29=el;el=el.parentNode;}else{_29=el.nextSibling;el=el.parentNode;}_28=_16(4,trs,_27,tre);}else{if(tag=="tr"){if(_25=="beforebegin"){_29=el;el=el.parentNode;_28=_16(3,tbs,_27,tbe);}else{if(_25=="afterend"){_29=el.nextSibling;el=el.parentNode;_28=_16(3,tbs,_27,tbe);}else{if(_25=="afterbegin"){_29=el.firstChild;}_28=_16(4,trs,_27,tre);}}}else{if(tag=="tbody"){if(_25=="beforebegin"){_29=el;el=el.parentNode;_28=_16(2,ts,_27,te);}else{if(_25=="afterend"){_29=el.nextSibling;el=el.parentNode;_28=_16(2,ts,_27,te);}else{if(_25=="afterbegin"){_29=el.firstChild;}_28=_16(3,tbs,_27,tbe);}}}else{if(_25=="beforebegin"||_25=="afterend"){return;}if(_25=="afterbegin"){_29=el.firstChild;}_28=_16(2,ts,_27,te);}}}el.insertBefore(_28,_29);return _28;};return{useDom:false,markup:function(o){return _4(o);},applyStyles:function(el,_2c){if(_2c){el=Ext.fly(el);if(typeof _2c=="string"){var re=/\s?([a-z\-]*)\:\s?([^;]*);?/gi;var _2e;while((_2e=re.exec(_2c))!=null){el.setStyle(_2e[1],_2e[2]);}}else{if(typeof _2c=="object"){for(var _2f in _2c){el.setStyle(_2f,_2c[_2f]);}}else{if(typeof _2c=="function"){Ext.DomHelper.applyStyles(el,_2c.call());}}}}},insertHtml:function(_30,el,_32){_30=_30.toLowerCase();if(el.insertAdjacentHTML){if(_3.test(el.tagName)){var rs;if(rs=_23(el.tagName.toLowerCase(),_30,el,_32)){return rs;}}switch(_30){case"beforebegin":el.insertAdjacentHTML("BeforeBegin",_32);return el.previousSibling;case"afterbegin":el.insertAdjacentHTML("AfterBegin",_32);return el.firstChild;case"beforeend":el.insertAdjacentHTML("BeforeEnd",_32);return el.lastChild;case"afterend":el.insertAdjacentHTML("AfterEnd",_32);return el.nextSibling;}throw"Illegal insertion point -> \""+_30+"\"";}var _34=el.ownerDocument.createRange();var _35;switch(_30){case"beforebegin":_34.setStartBefore(el);_35=_34.createContextualFragment(_32);el.parentNode.insertBefore(_35,el);return el.previousSibling;case"afterbegin":if(el.firstChild){_34.setStartBefore(el.firstChild);_35=_34.createContextualFragment(_32);el.insertBefore(_35,el.firstChild);return el.firstChild;}else{el.innerHTML=_32;return el.firstChild;}case"beforeend":if(el.lastChild){_34.setStartAfter(el.lastChild);_35=_34.createContextualFragment(_32);el.appendChild(_35);return el.lastChild;}else{el.innerHTML=_32;return el.lastChild;}case"afterend":_34.setStartAfter(el);_35=_34.createContextualFragment(_32);el.parentNode.insertBefore(_35,el.nextSibling);return el.nextSibling;}throw"Illegal insertion point -> \""+_30+"\"";},insertBefore:function(el,o,_38){return this.doInsert(el,o,_38,"beforeBegin");},insertAfter:function(el,o,_3b){return this.doInsert(el,o,_3b,"afterEnd","nextSibling");},insertFirst:function(el,o,_3e){return this.doInsert(el,o,_3e,"afterBegin");},doInsert:function(el,o,_41,pos,_43){el=Ext.getDom(el);var _44;if(this.useDom){_44=_d(o,null);el.parentNode.insertBefore(_44,_43?el[_43]:el);}else{var _45=_4(o);_44=this.insertHtml(pos,el,_45);}return _41?Ext.get(_44,true):_44;},append:function(el,o,_48){el=Ext.getDom(el);var _49;if(this.useDom){_49=_d(o,null);el.appendChild(_49);}else{var _4a=_4(o);_49=this.insertHtml("beforeEnd",el,_4a);}return _48?Ext.get(_49,true):_49;},overwrite:function(el,o,_4d){el=Ext.getDom(el);el.innerHTML=_4(o);return _4d?Ext.get(el.firstChild,true):el.firstChild;},createTemplate:function(o){var _4f=_4(o);return new Ext.Template(_4f);}};}();



Ext.Template=function(_1){if(_1 instanceof Array){_1=_1.join("");}else{if(arguments.length>1){_1=Array.prototype.join.call(arguments,"");}}this.html=_1;};Ext.Template.prototype={applyTemplate:function(_2){if(this.compiled){return this.compiled(_2);}var _3=this.disableFormats!==true;var fm=Ext.util.Format,_5=this;var fn=function(m,_8,_9,_a){if(_9&&_3){if(_9.substr(0,5)=="this."){return _5.call(_9.substr(5),_2[_8],_2);}else{if(_a){var re=/^\s*['"](.*)["']\s*$/;_a=_a.split(",");for(var i=0,_d=_a.length;i<_d;i++){_a[i]=_a[i].replace(re,"$1");}_a=[_2[_8]].concat(_a);}else{_a=[_2[_8]];}return fm[_9].apply(fm,_a);}}else{return _2[_8]!==undefined?_2[_8]:"";}};return this.html.replace(this.re,fn);},set:function(_e,_f){this.html=_e;this.compiled=null;if(_f){this.compile();}return this;},disableFormats:false,re:/\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,compile:function(){var fm=Ext.util.Format;var _11=this.disableFormats!==true;var sep=Ext.isGecko?"+":",";var fn=function(m,_15,_16,_17){if(_16&&_11){_17=_17?","+_17:"";if(_16.substr(0,5)!="this."){_16="fm."+_16+"(";}else{_16="this.call(\""+_16.substr(5)+"\", ";_17=", values";}}else{_17="";_16="(values['"+_15+"'] == undefined ? '' : ";}return"'"+sep+_16+"values['"+_15+"']"+_17+")"+sep+"'";};var _18;if(Ext.isGecko){_18="this.compiled = function(values){ return '"+this.html.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn)+"';};";}else{_18=["this.compiled = function(values){ return ['"];_18.push(this.html.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn));_18.push("'].join('');};");_18=_18.join("");}eval(_18);return this;},call:function(_19,_1a,_1b){return this[_19](_1a,_1b);},insertFirst:function(el,_1d,_1e){return this.doInsert("afterBegin",el,_1d,_1e);},insertBefore:function(el,_20,_21){return this.doInsert("beforeBegin",el,_20,_21);},insertAfter:function(el,_23,_24){return this.doInsert("afterEnd",el,_23,_24);},append:function(el,_26,_27){return this.doInsert("beforeEnd",el,_26,_27);},doInsert:function(_28,el,_2a,_2b){el=Ext.getDom(el);var _2c=Ext.DomHelper.insertHtml(_28,el,this.applyTemplate(_2a));return _2b?Ext.get(_2c,true):_2c;},overwrite:function(el,_2e,_2f){el=Ext.getDom(el);el.innerHTML=this.applyTemplate(_2e);return _2f?Ext.get(el.firstChild,true):el.firstChild;}};Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;Ext.DomHelper.Template=Ext.Template;Ext.Template.from=function(el){el=Ext.getDom(el);return new Ext.Template(el.value||el.innerHTML);};



Ext.DomQuery=function(){var _1={},_2={},_3={};var _4=/\S/;var _5=/^\s+|\s+$/g;var _6=/\{(\d+)\}/g;var _7=/^(\s?[\/>+~]\s?|\s|$)/;var _8=/^(#)?([\w-\*]+)/;var _9=/(\d*)n\+?(\d*)/,_a=/\D/;function child(p,_c){var i=0;var n=p.firstChild;while(n){if(n.nodeType==1){if(++i==_c){return n;}}n=n.nextSibling;}return null;}function next(n){while((n=n.nextSibling)&&n.nodeType!=1){}return n;}function prev(n){while((n=n.previousSibling)&&n.nodeType!=1){}return n;}function children(d){var n=d.firstChild,ni=-1;while(n){var nx=n.nextSibling;if(n.nodeType==3&&!_4.test(n.nodeValue)){d.removeChild(n);}else{n.nodeIndex=++ni;}n=nx;}return this;}function byClassName(c,a,v){if(!v){return c;}var r=[],ri=-1,cn;for(var i=0,ci;ci=c[i];i++){if((" "+ci.className+" ").indexOf(v)!=-1){r[++ri]=ci;}}return r;}function attrValue(n,_1e){if(!n.tagName&&typeof n.length!="undefined"){n=n[0];}if(!n){return null;}if(_1e=="for"){return n.htmlFor;}if(_1e=="class"||_1e=="className"){return n.className;}return n.getAttribute(_1e)||n[_1e];}function getNodes(ns,_20,_21){var _22=[],ri=-1,cs;if(!ns){return _22;}_21=_21||"*";if(typeof ns.getElementsByTagName!="undefined"){ns=[ns];}if(!_20){for(var i=0,ni;ni=ns[i];i++){cs=ni.getElementsByTagName(_21);for(var j=0,ci;ci=cs[j];j++){_22[++ri]=ci;}}}else{if(_20=="/"||_20==">"){var _29=_21.toUpperCase();for(var i=0,ni,cn;ni=ns[i];i++){cn=ni.children||ni.childNodes;for(var j=0,cj;cj=cn[j];j++){if(cj.nodeName==_29||cj.nodeName==_21||_21=="*"){_22[++ri]=cj;}}}}else{if(_20=="+"){var _29=_21.toUpperCase();for(var i=0,n;n=ns[i];i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(n&&(n.nodeName==_29||n.nodeName==_21||_21=="*")){_22[++ri]=n;}}}else{if(_20=="~"){for(var i=0,n;n=ns[i];i++){while((n=n.nextSibling)&&(n.nodeType!=1||(_21=="*"||n.tagName.toLowerCase()!=_21))){}if(n){_22[++ri]=n;}}}}}}return _22;}function concat(a,b){if(b.slice){return a.concat(b);}for(var i=0,l=b.length;i<l;i++){a[a.length]=b[i];}return a;}function byTag(cs,_32){if(cs.tagName||cs==document){cs=[cs];}if(!_32){return cs;}var r=[],ri=-1;_32=_32.toLowerCase();for(var i=0,ci;ci=cs[i];i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==_32){r[++ri]=ci;}}return r;}function byId(cs,_38,id){if(cs.tagName||cs==document){cs=[cs];}if(!id){return cs;}var r=[],ri=-1;for(var i=0,ci;ci=cs[i];i++){if(ci&&ci.id==id){r[++ri]=ci;return r;}}return r;}function byAttribute(cs,_3f,_40,op,_42){var r=[],ri=-1,st=_42=="{";var f=Ext.DomQuery.operators[op];for(var i=0,ci;ci=cs[i];i++){var a;if(st){a=Ext.DomQuery.getStyle(ci,_3f);}else{if(_3f=="class"||_3f=="className"){a=ci.className;}else{if(_3f=="for"){a=ci.htmlFor;}else{if(_3f=="href"){a=ci.getAttribute("href",2);}else{a=ci.getAttribute(_3f);}}}}if((f&&f(a,_40))||(!f&&a)){r[++ri]=ci;}}return r;}function byPseudo(cs,_4b,_4c){return Ext.DomQuery.pseudos[_4b](cs,_4c);}var _4d=window.ActiveXObject?true:false;eval("var batch = 30803;");var key=30803;function nodupIEXml(cs){var d=++key;cs[0].setAttribute("_nodup",d);var r=[cs[0]];for(var i=1,len=cs.length;i<len;i++){var c=cs[i];if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);r[r.length]=c;}}for(var i=0,len=cs.length;i<len;i++){cs[i].removeAttribute("_nodup");}return r;}function nodup(cs){if(!cs){return[];}var len=cs.length,c,i,r=cs,cj,ri=-1;if(!len||typeof cs.nodeType!="undefined"||len==1){return cs;}if(_4d&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs);}var d=++key;cs[0]._nodup=d;for(i=1;c=cs[i];i++){if(c._nodup!=d){c._nodup=d;}else{r=[];for(var j=0;j<i;j++){r[++ri]=cs[j];}for(j=i+1;cj=cs[j];j++){if(cj._nodup!=d){cj._nodup=d;r[++ri]=cj;}}return r;}}return r;}function quickDiffIEXml(c1,c2){var d=++key;for(var i=0,len=c1.length;i<len;i++){c1[i].setAttribute("_qdiff",d);}var r=[];for(var i=0,len=c2.length;i<len;i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i];}}for(var i=0,len=c1.length;i<len;i++){c1[i].removeAttribute("_qdiff");}return r;}function quickDiff(c1,c2){var _66=c1.length;if(!_66){return c2;}if(_4d&&c1[0].selectSingleNode){return quickDiffIEXml(c1,c2);}var d=++key;for(var i=0;i<_66;i++){c1[i]._qdiff=d;}var r=[];for(var i=0,len=c2.length;i<len;i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i];}}return r;}function quickId(ns,_6c,_6d,id){if(ns==_6d){var d=_6d.ownerDocument||_6d;return d.getElementById(id);}ns=getNodes(ns,_6c,"*");return byId(ns,null,id);}return{getStyle:function(el,_71){return Ext.fly(el).getStyle(_71);},compile:function(_72,_73){_73=_73||"select";var fn=["var f = function(root){\n var mode; ++batch; var n = root || document;\n"];var q=_72,_76,lq;var tk=Ext.DomQuery.matchers;var _79=tk.length;var mm;var _7b=q.match(_7);if(_7b&&_7b[1]){fn[fn.length]="mode=\""+_7b[1].replace(_5,"")+"\";";q=q.replace(_7b[1],"");}while(_72.substr(0,1)=="/"){_72=_72.substr(1);}while(q&&lq!=q){lq=q;var tm=q.match(_8);if(_73=="select"){if(tm){if(tm[1]=="#"){fn[fn.length]="n = quickId(n, mode, root, \""+tm[2]+"\");";}else{fn[fn.length]="n = getNodes(n, mode, \""+tm[2]+"\");";}q=q.replace(tm[0],"");}else{if(q.substr(0,1)!="@"){fn[fn.length]="n = getNodes(n, mode, \"*\");";}}}else{if(tm){if(tm[1]=="#"){fn[fn.length]="n = byId(n, null, \""+tm[2]+"\");";}else{fn[fn.length]="n = byTag(n, \""+tm[2]+"\");";}q=q.replace(tm[0],"");}}while(!(mm=q.match(_7))){var _7d=false;for(var j=0;j<_79;j++){var t=tk[j];var m=q.match(t.re);if(m){fn[fn.length]=t.select.replace(_6,function(x,i){return m[i];});q=q.replace(m[0],"");_7d=true;break;}}if(!_7d){throw"Error parsing selector, parsing failed at \""+q+"\"";}}if(mm[1]){fn[fn.length]="mode=\""+mm[1].replace(_5,"")+"\";";q=q.replace(mm[1],"");}}fn[fn.length]="return nodup(n);\n}";eval(fn.join(""));return f;},select:function(_83,_84,_85){if(!_84||_84==document){_84=document;}if(typeof _84=="string"){_84=document.getElementById(_84);}var _86=_83.split(",");var _87=[];for(var i=0,len=_86.length;i<len;i++){var p=_86[i].replace(_5,"");if(!_1[p]){_1[p]=Ext.DomQuery.compile(p);if(!_1[p]){throw p+" is not a valid selector";}}var _8b=_1[p](_84);if(_8b&&_8b!=document){_87=_87.concat(_8b);}}if(_86.length>1){return nodup(_87);}return _87;},selectNode:function(_8c,_8d){return Ext.DomQuery.select(_8c,_8d)[0];},selectValue:function(_8e,_8f,_90){_8e=_8e.replace(_5,"");if(!_3[_8e]){_3[_8e]=Ext.DomQuery.compile(_8e,"select");}var n=_3[_8e](_8f);n=n[0]?n[0]:n;var v=(n&&n.firstChild?n.firstChild.nodeValue:null);return((v===null||v===undefined||v==="")?_90:v);},selectNumber:function(_93,_94,_95){var v=Ext.DomQuery.selectValue(_93,_94,_95||0);return parseFloat(v);},is:function(el,ss){if(typeof el=="string"){el=document.getElementById(el);}var _99=(el instanceof Array);var _9a=Ext.DomQuery.filter(_99?el:[el],ss);return _99?(_9a.length==el.length):(_9a.length>0);},filter:function(els,ss,_9d){ss=ss.replace(_5,"");if(!_2[ss]){_2[ss]=Ext.DomQuery.compile(ss,"simple");}var _9e=_2[ss](els);return _9d?quickDiff(_9e,els):_9e;},matchers:[{re:/^\.([\w-]+)/,select:"n = byClassName(n, null, \" {1} \");"},{re:/^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:"n = byPseudo(n, \"{1}\", \"{2}\");"},{re:/^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,select:"n = byAttribute(n, \"{2}\", \"{4}\", \"{3}\", \"{1}\");"},{re:/^#([\w-]+)/,select:"n = byId(n, null, \"{1}\");"},{re:/^@([\w-]+)/,select:"return {firstChild:{nodeValue:attrValue(n, \"{1}\")}};"}],operators:{"=":function(a,v){return a==v;},"!=":function(a,v){return a!=v;},"^=":function(a,v){return a&&a.substr(0,v.length)==v;},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v;},"*=":function(a,v){return a&&a.indexOf(v)!==-1;},"%=":function(a,v){return(a%v)==0;},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+"-");},"~=":function(a,v){return a&&(" "+a+" ").indexOf(" "+v+" ")!=-1;}},pseudos:{"first-child":function(c){var r=[],ri=-1,n;for(var i=0,ci;ci=n=c[i];i++){while((n=n.previousSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci;}}return r;},"last-child":function(c){var r=[],ri=-1,n;for(var i=0,ci;ci=n=c[i];i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci;}}return r;},"nth-child":function(c,a){var r=[],ri=-1;var m=_9.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!_a.test(a)&&"n+"+a||a);var f=(m[1]||1)-0,l=m[2]-0;for(var i=0,n;n=c[i];i++){var pn=n.parentNode;if(batch!=pn._batch){var j=0;for(var cn=pn.firstChild;cn;cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j;}}pn._batch=batch;}if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n;}}else{if((n.nodeIndex+l)%f==0){r[++ri]=n;}}}return r;},"only-child":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci;}}return r;},"empty":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var cns=ci.childNodes,j=0,cn,_d4=true;while(cn=cns[j]){++j;if(cn.nodeType==1||cn.nodeType==3){_d4=false;break;}}if(_d4){r[++ri]=ci;}}return r;},"contains":function(c,v){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if((ci.textContent||ci.innerText||"").indexOf(v)!=-1){r[++ri]=ci;}}return r;},"nodeValue":function(c,v){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci;}}return r;},"checked":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(ci.checked==true){r[++ri]=ci;}}return r;},"not":function(c,ss){return Ext.DomQuery.filter(c,ss,true);},"odd":function(c){return this["nth-child"](c,"odd");},"even":function(c){return this["nth-child"](c,"even");},"nth":function(c,a){return c[a-1]||[];},"first":function(c){return c[0]||[];},"last":function(c){return c[c.length-1]||[];},"has":function(c,ss){var s=Ext.DomQuery.select;var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(s(ss,ci).length>0){r[++ri]=ci;}}return r;},"next":function(c,ss){var is=Ext.DomQuery.is;var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var n=next(ci);if(n&&is(n,ss)){r[++ri]=ci;}}return r;},"prev":function(c,ss){var is=Ext.DomQuery.is;var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var n=prev(ci);if(n&&is(n,ss)){r[++ri]=ci;}}return r;}}};}();Ext.query=Ext.DomQuery.select;



Ext.util.Observable=function(){if(this.listeners){this.on(this.listeners);delete this.listeners;}};Ext.util.Observable.prototype={fireEvent:function(){var ce=this.events[arguments[0].toLowerCase()];if(typeof ce=="object"){return ce.fire.apply(ce,Array.prototype.slice.call(arguments,1));}else{return true;}},filterOptRe:/^(?:scope|delay|buffer|single)$/,addListener:function(_2,fn,_4,o){if(typeof _2=="object"){o=_2;for(var e in o){if(this.filterOptRe.test(e)){continue;}if(typeof o[e]=="function"){this.addListener(e,o[e],o.scope,o);}else{this.addListener(e,o[e].fn,o[e].scope,o[e]);}}return;}o=(!o||typeof o=="boolean")?{}:o;_2=_2.toLowerCase();var ce=this.events[_2]||true;if(typeof ce=="boolean"){ce=new Ext.util.Event(this,_2);this.events[_2]=ce;}ce.addListener(fn,_4,o);},removeListener:function(_8,fn,_a){var ce=this.events[_8.toLowerCase()];if(typeof ce=="object"){ce.removeListener(fn,_a);}},purgeListeners:function(){for(var _c in this.events){if(typeof this.events[_c]=="object"){this.events[_c].clearListeners();}}},relayEvents:function(o,_e){var _f=function(_10){return function(){return this.fireEvent.apply(this,Ext.combine(_10,Array.prototype.slice.call(arguments,0)));};};for(var i=0,len=_e.length;i<len;i++){var _13=_e[i];if(!this.events[_13]){this.events[_13]=true;}o.on(_13,_f(_13),this);}},addEvents:function(o){if(!this.events){this.events={};}Ext.applyIf(this.events,o);},hasListener:function(_15){var e=this.events[_15];return typeof e=="object"&&e.listeners.length>0;}};Ext.util.Observable.prototype.on=Ext.util.Observable.prototype.addListener;Ext.util.Observable.prototype.un=Ext.util.Observable.prototype.removeListener;Ext.util.Observable.capture=function(o,fn,_19){o.fireEvent=o.fireEvent.createInterceptor(fn,_19);};Ext.util.Observable.releaseCapture=function(o){o.fireEvent=Ext.util.Observable.prototype.fireEvent;};(function(){var _1b=function(h,o,_1e){var _1f=new Ext.util.DelayedTask();return function(){_1f.delay(o.buffer,h,_1e,Array.prototype.slice.call(arguments,0));};};var _20=function(h,e,fn,_24){return function(){e.removeListener(fn,_24);return h.apply(_24,arguments);};};var _25=function(h,o,_28){return function(){var _29=Array.prototype.slice.call(arguments,0);setTimeout(function(){h.apply(_28,_29);},o.delay||10);};};Ext.util.Event=function(obj,_2b){this.name=_2b;this.obj=obj;this.listeners=[];};Ext.util.Event.prototype={addListener:function(fn,_2d,_2e){var o=_2e||{};_2d=_2d||this.obj;if(!this.isListening(fn,_2d)){var l={fn:fn,scope:_2d,options:o};var h=fn;if(o.delay){h=_25(h,o,_2d);}if(o.single){h=_20(h,this,fn,_2d);}if(o.buffer){h=_1b(h,o,_2d);}l.fireFn=h;if(!this.firing){this.listeners.push(l);}else{this.listeners=this.listeners.slice(0);this.listeners.push(l);}}},findListener:function(fn,_33){_33=_33||this.obj;var ls=this.listeners;for(var i=0,len=ls.length;i<len;i++){var l=ls[i];if(l.fn==fn&&l.scope==_33){return i;}}return-1;},isListening:function(fn,_39){return this.findListener(fn,_39)!=-1;},removeListener:function(fn,_3b){var _3c;if((_3c=this.findListener(fn,_3b))!=-1){if(!this.firing){this.listeners.splice(_3c,1);}else{this.listeners=this.listeners.slice(0);this.listeners.splice(_3c,1);}return true;}return false;},clearListeners:function(){this.listeners=[];},fire:function(){var ls=this.listeners,_3e,len=ls.length;if(len>0){this.firing=true;var _40=Array.prototype.slice.call(arguments,0);for(var i=0;i<len;i++){var l=ls[i];if(l.fireFn.apply(l.scope||this.obj||window,arguments)===false){this.firing=false;return false;}}this.firing=false;}return true;}};})();



Ext.EventManager=function(){var _1,_2,_3=false;var _4,_5,_6,_7;var E=Ext.lib.Event;var D=Ext.lib.Dom;var _a=function(){if(!_3){_3=true;Ext.isReady=true;if(_2){clearInterval(_2);}if(Ext.isGecko||Ext.isOpera){document.removeEventListener("DOMContentLoaded",_a,false);}if(_1){_1.fire();_1.clearListeners();}}};var _b=function(){_1=new Ext.util.Event();if(Ext.isGecko||Ext.isOpera){document.addEventListener("DOMContentLoaded",_a,false);}else{if(Ext.isIE){document.write("<s"+"cript id=\"ie-deferred-loader\" defer=\"defer\" src=\"/"+"/:\"></s"+"cript>");var _c=document.getElementById("ie-deferred-loader");_c.onreadystatechange=function(){if(this.readyState=="complete"){_a();_c.onreadystatechange=null;_c.parentNode.removeChild(_c);}};}else{if(Ext.isSafari){_2=setInterval(function(){var rs=document.readyState;if(rs=="complete"){_a();}},10);}}}E.on(window,"load",_a);};var _e=function(h,o){var _11=new Ext.util.DelayedTask(h);return function(e){e=new Ext.EventObjectImpl(e);_11.delay(o.buffer,h,null,[e]);};};var _13=function(h,el,_16,fn){return function(e){Ext.EventManager.removeListener(el,_16,fn);h(e);};};var _19=function(h,o){return function(e){e=new Ext.EventObjectImpl(e);setTimeout(function(){h(e);},o.delay||10);};};var _1d=function(_1e,_1f,opt,fn,_22){var o=(!opt||typeof opt=="boolean")?{}:opt;fn=fn||o.fn;_22=_22||o.scope;var el=Ext.getDom(_1e);if(!el){throw"Error listening for \""+_1f+"\". Element \""+_1e+"\" doesn't exist.";}var h=function(e){e=Ext.EventObject.setEvent(e);var t;if(o.delegate){t=e.getTarget(o.delegate,el);if(!t){return;}}else{t=e.target;}if(o.stopEvent===true){e.stopEvent();}if(o.preventDefault===true){e.preventDefault();}if(o.stopPropagation===true){e.stopPropagation();}if(o.normalized===false){e=e.browserEvent;}fn.call(_22||el,e,t,o);};if(o.delay){h=_19(h,o);}if(o.single){h=_13(h,el,_1f,fn);}if(o.buffer){h=_e(h,o);}fn._handlers=fn._handlers||[];fn._handlers.push([Ext.id(el),_1f,h]);E.on(el,_1f,h);if(_1f=="mousewheel"&&el.addEventListener){el.addEventListener("DOMMouseScroll",h,false);E.on(window,"unload",function(){el.removeEventListener("DOMMouseScroll",h,false);});}if(_1f=="mousedown"&&el==document){Ext.EventManager.stoppedMouseDownEvent.addListener(h);}return h;};var _28=function(el,_2a,fn){var id=Ext.id(el),hds=fn._handlers,hd=fn;if(hds){for(var i=0,len=hds.length;i<len;i++){var h=hds[i];if(h[0]==id&&h[1]==_2a){hd=h[2];hds.splice(i,1);break;}}}E.un(el,_2a,hd);el=Ext.getDom(el);if(_2a=="mousewheel"&&el.addEventListener){el.removeEventListener("DOMMouseScroll",hd,false);}if(_2a=="mousedown"&&el==document){Ext.EventManager.stoppedMouseDownEvent.removeListener(hd);}};var _32=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;var pub={wrap:function(fn,_35,_36){return function(e){Ext.EventObject.setEvent(e);fn.call(_36?_35||window:window,Ext.EventObject,_35);};},addListener:function(_38,_39,fn,_3b,_3c){if(typeof _39=="object"){var o=_39;for(var e in o){if(_32.test(e)){continue;}if(typeof o[e]=="function"){_1d(_38,e,o,o[e],o.scope);}else{_1d(_38,e,o[e]);}}return;}return _1d(_38,_39,_3c,fn,_3b);},removeListener:function(_3f,_40,fn){return _28(_3f,_40,fn);},onDocumentReady:function(fn,_43,_44){if(_3){fn.call(_43||window,_43);return;}if(!_1){_b();}_1.addListener(fn,_43,_44);},onWindowResize:function(fn,_46,_47){if(!_4){_4=new Ext.util.Event();_5=new Ext.util.DelayedTask(function(){_4.fire(D.getViewWidth(),D.getViewHeight());});E.on(window,"resize",function(){if(Ext.isIE){_5.delay(50);}else{_4.fire(D.getViewWidth(),D.getViewHeight());}});}_4.addListener(fn,_46,_47);},onTextResize:function(fn,_49,_4a){if(!_6){_6=new Ext.util.Event();var _4b=new Ext.Element(document.createElement("div"));_4b.dom.className="x-text-resize";_4b.dom.innerHTML="X";_4b.appendTo(document.body);_7=_4b.dom.offsetHeight;setInterval(function(){if(_4b.dom.offsetHeight!=_7){_6.fire(_7,_7=_4b.dom.offsetHeight);}},this.textResizeInterval);}_6.addListener(fn,_49,_4a);},removeResizeListener:function(fn,_4d){if(_4){_4.removeListener(fn,_4d);}},fireResize:function(){if(_4){_4.fire(D.getViewWidth(),D.getViewHeight());}},ieDeferSrc:false,textResizeInterval:50};pub.on=pub.addListener;pub.un=pub.removeListener;pub.stoppedMouseDownEvent=new Ext.util.Event();return pub;}();Ext.onReady=Ext.EventManager.onDocumentReady;Ext.onReady(function(){var bd=Ext.get(document.body);if(!bd){return;}var cls=[Ext.isIE?"ext-ie":Ext.isGecko?"ext-gecko":Ext.isOpera?"ext-opera":Ext.isSafari?"ext-safari":""];if(Ext.isMac){cls.push("ext-mac");}if(Ext.isLinux){cls.push("ext-linux");}if(Ext.isBorderBox){cls.push("ext-border-box");}if(Ext.isStrict){var p=bd.dom.parentNode;if(p){p.className=p.className?" ext-strict":"ext-strict";}}bd.addClass(cls.join(" "));});Ext.EventObject=function(){var E=Ext.lib.Event;var _52={63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35};var _53=Ext.isIE?{1:0,4:1,2:2}:(Ext.isSafari?{1:0,2:1,3:2}:{0:0,1:1,2:2});Ext.EventObjectImpl=function(e){if(e){this.setEvent(e.browserEvent||e);}};Ext.EventObjectImpl.prototype={browserEvent:null,button:-1,shiftKey:false,ctrlKey:false,altKey:false,BACKSPACE:8,TAB:9,RETURN:13,ENTER:13,SHIFT:16,CONTROL:17,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,F5:116,setEvent:function(e){if(e==this||(e&&e.browserEvent)){return e;}this.browserEvent=e;if(e){this.button=e.button?_53[e.button]:(e.which?e.which-1:-1);if(e.type=="click"&&this.button==-1){this.button=0;}this.type=e.type;this.shiftKey=e.shiftKey;this.ctrlKey=e.ctrlKey||e.metaKey;this.altKey=e.altKey;this.keyCode=e.keyCode;this.charCode=e.charCode;this.target=E.getTarget(e);this.xy=E.getXY(e);}else{this.button=-1;this.shiftKey=false;this.ctrlKey=false;this.altKey=false;this.keyCode=0;this.charCode=0;this.target=null;this.xy=[0,0];}return this;},stopEvent:function(){if(this.browserEvent){if(this.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(this);}E.stopEvent(this.browserEvent);}},preventDefault:function(){if(this.browserEvent){E.preventDefault(this.browserEvent);}},isNavKeyPress:function(){var k=this.keyCode;k=Ext.isSafari?(_52[k]||k):k;return(k>=33&&k<=40)||k==this.RETURN||k==this.TAB||k==this.ESC;},isSpecialKey:function(){var k=this.keyCode;return(this.type=="keypress"&&this.ctrlKey)||k==9||k==13||k==40||k==27||(k==16)||(k==17)||(k>=18&&k<=20)||(k>=33&&k<=35)||(k>=36&&k<=39)||(k>=44&&k<=45);},stopPropagation:function(){if(this.browserEvent){if(this.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(this);}E.stopPropagation(this.browserEvent);}},getCharCode:function(){return this.charCode||this.keyCode;},getKey:function(){var k=this.keyCode||this.charCode;return Ext.isSafari?(_52[k]||k):k;},getPageX:function(){return this.xy[0];},getPageY:function(){return this.xy[1];},getTime:function(){if(this.browserEvent){return E.getTime(this.browserEvent);}return null;},getXY:function(){return this.xy;},getTarget:function(_59,_5a,_5b){return _59?Ext.fly(this.target).findParent(_59,_5a,_5b):this.target;},getRelatedTarget:function(){if(this.browserEvent){return E.getRelatedTarget(this.browserEvent);}return null;},getWheelDelta:function(){var e=this.browserEvent;var _5d=0;if(e.wheelDelta){_5d=e.wheelDelta/120;if(window.opera){_5d=-_5d;}}else{if(e.detail){_5d=-e.detail/3;}}return _5d;},hasModifier:function(){return!!((this.ctrlKey||this.altKey)||this.shiftKey);},within:function(el,_5f){var t=this[_5f?"getRelatedTarget":"getTarget"]();return t&&Ext.fly(el).contains(t);},getPoint:function(){return new Ext.lib.Point(this.xy[0],this.xy[1]);}};return new Ext.EventObjectImpl();}();



(function(){var D=Ext.lib.Dom;var E=Ext.lib.Event;var A=Ext.lib.Anim;var _4={};var _5=/(-[a-z])/gi;var _6=function(m,a){return a.charAt(1).toUpperCase();};var _9=document.defaultView;Ext.Element=function(_a,_b){var _c=typeof _a=="string"?document.getElementById(_a):_a;if(!_c){return null;}var id=_c.id;if(_b!==true&&id&&Ext.Element.cache[id]){return Ext.Element.cache[id];}this.dom=_c;this.id=id||Ext.id(_c);};var El=Ext.Element;El.prototype={originalDisplay:"",visibilityMode:1,defaultUnit:"px",setVisibilityMode:function(_f){this.visibilityMode=_f;return this;},enableDisplayMode:function(_10){this.setVisibilityMode(El.DISPLAY);if(typeof _10!="undefined"){this.originalDisplay=_10;}return this;},findParent:function(_11,_12,_13){var p=this.dom,b=document.body,_16=0,dq=Ext.DomQuery,_18;_12=_12||50;if(typeof _12!="number"){_18=Ext.getDom(_12);_12=10;}while(p&&p.nodeType==1&&_16<_12&&p!=b&&p!=_18){if(dq.is(p,_11)){return _13?Ext.get(p):p;}_16++;p=p.parentNode;}return null;},findParentNode:function(_19,_1a,_1b){var p=Ext.fly(this.dom.parentNode,"_internal");return p?p.findParent(_19,_1a,_1b):null;},up:function(_1d,_1e){return this.findParentNode(_1d,_1e,true);},is:function(_1f){return Ext.DomQuery.is(this.dom,_1f);},animate:function(_20,_21,_22,_23,_24){this.anim(_20,{duration:_21,callback:_22,easing:_23},_24);return this;},anim:function(_25,opt,_27,_28,_29,cb){_27=_27||"run";opt=opt||{};var _2b=Ext.lib.Anim[_27](this.dom,_25,(opt.duration||_28)||0.35,(opt.easing||_29)||"easeOut",function(){Ext.callback(cb,this);Ext.callback(opt.callback,opt.scope||this,[this,opt]);},this);opt.anim=_2b;return _2b;},preanim:function(a,i){return!a[i]?false:(typeof a[i]=="object"?a[i]:{duration:a[i+1],callback:a[i+2],easing:a[i+3]});},clean:function(_2e){if(this.isCleaned&&_2e!==true){return this;}var ns=/\S/;var d=this.dom,n=d.firstChild,ni=-1;while(n){var nx=n.nextSibling;if(n.nodeType==3&&!ns.test(n.nodeValue)){d.removeChild(n);}else{n.nodeIndex=++ni;}n=nx;}this.isCleaned=true;return this;},calcOffsetsTo:function(el){el=Ext.get(el);var d=el.dom;var _36=false;if(el.getStyle("position")=="static"){el.position("relative");_36=true;}var x=0,y=0;var op=this.dom;while(op&&op!=d&&op.tagName!="HTML"){x+=op.offsetLeft;y+=op.offsetTop;op=op.offsetParent;}if(_36){el.position("static");}return[x,y];},scrollIntoView:function(_3a,_3b){var c=Ext.getDom(_3a)||document.body;var el=this.dom;var o=this.calcOffsetsTo(c),l=o[0],t=o[1],b=t+el.offsetHeight,r=l+el.offsetWidth;var ch=c.clientHeight;var ct=parseInt(c.scrollTop,10);var cl=parseInt(c.scrollLeft,10);var cb=ct+ch;var cr=cl+c.clientWidth;if(t<ct){c.scrollTop=t;}else{if(b>cb){c.scrollTop=b-ch;}}if(_3b!==false){if(l<cl){c.scrollLeft=l;}else{if(r>cr){c.scrollLeft=r-c.clientWidth;}}}return this;},scrollChildIntoView:function(_48,_49){Ext.fly(_48,"_scrollChildIntoView").scrollIntoView(this,_49);},autoHeight:function(_4a,_4b,_4c,_4d){var _4e=this.getHeight();this.clip();this.setHeight(1);setTimeout(function(){var _4f=parseInt(this.dom.scrollHeight,10);if(!_4a){this.setHeight(_4f);this.unclip();if(typeof _4c=="function"){_4c();}}else{this.setHeight(_4e);this.setHeight(_4f,_4a,_4b,function(){this.unclip();if(typeof _4c=="function"){_4c();}}.createDelegate(this),_4d);}}.createDelegate(this),0);return this;},contains:function(el){if(!el){return false;}return D.isAncestor(this.dom,el.dom?el.dom:el);},isVisible:function(_51){var vis=!(this.getStyle("visibility")=="hidden"||this.getStyle("display")=="none");if(_51!==true||!vis){return vis;}var p=this.dom.parentNode;while(p&&p.tagName.toLowerCase()!="body"){if(!Ext.fly(p,"_isVisible").isVisible()){return false;}p=p.parentNode;}return true;},select:function(_54,_55){return El.select(_54,_55,this.dom);},query:function(_56,_57){return Ext.DomQuery.select(_56,this.dom);},child:function(_58,_59){var n=Ext.DomQuery.selectNode(_58,this.dom);return _59?n:Ext.get(n);},down:function(_5b,_5c){var n=Ext.DomQuery.selectNode(" > "+_5b,this.dom);return _5c?n:Ext.get(n);},initDD:function(_5e,_5f,_60){var dd=new Ext.dd.DD(Ext.id(this.dom),_5e,_5f);return Ext.apply(dd,_60);},initDDProxy:function(_62,_63,_64){var dd=new Ext.dd.DDProxy(Ext.id(this.dom),_62,_63);return Ext.apply(dd,_64);},initDDTarget:function(_66,_67,_68){var dd=new Ext.dd.DDTarget(Ext.id(this.dom),_66,_67);return Ext.apply(dd,_68);},setVisible:function(_6a,_6b){if(!_6b||!A){if(this.visibilityMode==El.DISPLAY){this.setDisplayed(_6a);}else{this.fixDisplay();this.dom.style.visibility=_6a?"visible":"hidden";}}else{var dom=this.dom;var _6d=this.visibilityMode;if(_6a){this.setOpacity(0.01);this.setVisible(true);}this.anim({opacity:{to:(_6a?1:0)}},this.preanim(arguments,1),null,0.35,"easeIn",function(){if(!_6a){if(_6d==El.DISPLAY){dom.style.display="none";}else{dom.style.visibility="hidden";}Ext.get(dom).setOpacity(1);}});}return this;},isDisplayed:function(){return this.getStyle("display")!="none";},toggle:function(_6e){this.setVisible(!this.isVisible(),this.preanim(arguments,0));return this;},setDisplayed:function(_6f){if(typeof _6f=="boolean"){_6f=_6f?this.originalDisplay:"none";}this.setStyle("display",_6f);return this;},focus:function(){try{this.dom.focus();}catch(e){}return this;},blur:function(){try{this.dom.blur();}catch(e){}return this;},addClass:function(_70){if(_70 instanceof Array){for(var i=0,len=_70.length;i<len;i++){this.addClass(_70[i]);}}else{if(_70&&!this.hasClass(_70)){this.dom.className=this.dom.className+" "+_70;}}return this;},radioClass:function(_73){var _74=this.dom.parentNode.childNodes;for(var i=0;i<_74.length;i++){var s=_74[i];if(s.nodeType==1){Ext.get(s).removeClass(_73);}}this.addClass(_73);return this;},removeClass:function(_77){if(!_77||!this.dom.className){return this;}if(_77 instanceof Array){for(var i=0,len=_77.length;i<len;i++){this.removeClass(_77[i]);}}else{if(this.hasClass(_77)){var re=this.classReCache[_77];if(!re){re=new RegExp("(?:^|\\s+)"+_77+"(?:\\s+|$)","g");this.classReCache[_77]=re;}this.dom.className=this.dom.className.replace(re," ");}}return this;},classReCache:{},toggleClass:function(_7b){if(this.hasClass(_7b)){this.removeClass(_7b);}else{this.addClass(_7b);}return this;},hasClass:function(_7c){return _7c&&(" "+this.dom.className+" ").indexOf(" "+_7c+" ")!=-1;},replaceClass:function(_7d,_7e){this.removeClass(_7d);this.addClass(_7e);return this;},getStyles:function(){var a=arguments,len=a.length,r={};for(var i=0;i<len;i++){r[a[i]]=this.getStyle(a[i]);}return r;},getStyle:function(){return _9&&_9.getComputedStyle?function(_83){var el=this.dom,v,cs,_87;if(_83=="float"){_83="cssFloat";}if(v=el.style[_83]){return v;}if(cs=_9.getComputedStyle(el,"")){if(!(_87=_4[_83])){_87=_4[_83]=_83.replace(_5,_6);}return cs[_87];}return null;}:function(_88){var el=this.dom,v,cs,_8c;if(_88=="opacity"){if(typeof el.style.filter=="string"){var m=el.style.filter.match(/alpha\(opacity=(.*)\)/i);if(m){var fv=parseFloat(m[1]);if(!isNaN(fv)){return fv?fv/100:0;}}}return 1;}else{if(_88=="float"){_88="styleFloat";}}if(!(_8c=_4[_88])){_8c=_4[_88]=_88.replace(_5,_6);}if(v=el.style[_8c]){return v;}if(cs=el.currentStyle){return cs[_8c];}return null;};}(),setStyle:function(_8f,_90){if(typeof _8f=="string"){var _91;if(!(_91=_4[_8f])){_91=_4[_8f]=_8f.replace(_5,_6);}if(_91=="opacity"){this.setOpacity(_90);}else{this.dom.style[_91]=_90;}}else{for(var _92 in _8f){if(typeof _8f[_92]!="function"){this.setStyle(_92,_8f[_92]);}}}return this;},applyStyles:function(_93){Ext.DomHelper.applyStyles(this.dom,_93);return this;},getX:function(){return D.getX(this.dom);},getY:function(){return D.getY(this.dom);},getXY:function(){return D.getXY(this.dom);},setX:function(x,_95){if(!_95||!A){D.setX(this.dom,x);}else{this.setXY([x,this.getY()],this.preanim(arguments,1));}return this;},setY:function(y,_97){if(!_97||!A){D.setY(this.dom,y);}else{this.setXY([this.getX(),y],this.preanim(arguments,1));}return this;},setLeft:function(_98){this.setStyle("left",this.addUnits(_98));return this;},setTop:function(top){this.setStyle("top",this.addUnits(top));return this;},setRight:function(_9a){this.setStyle("right",this.addUnits(_9a));return this;},setBottom:function(_9b){this.setStyle("bottom",this.addUnits(_9b));return this;},setXY:function(pos,_9d){if(!_9d||!A){D.setXY(this.dom,pos);}else{this.anim({points:{to:pos}},this.preanim(arguments,1),"motion");}return this;},setLocation:function(x,y,_a0){this.setXY([x,y],this.preanim(arguments,2));return this;},moveTo:function(x,y,_a3){this.setXY([x,y],this.preanim(arguments,2));return this;},getRegion:function(){return D.getRegion(this.dom);},getHeight:function(_a4){var h=this.dom.offsetHeight||0;return _a4!==true?h:h-this.getBorderWidth("tb")-this.getPadding("tb");},getWidth:function(_a6){var w=this.dom.offsetWidth||0;return _a6!==true?w:w-this.getBorderWidth("lr")-this.getPadding("lr");},getComputedHeight:function(){var h=Math.max(this.dom.offsetHeight,this.dom.clientHeight);if(!h){h=parseInt(this.getStyle("height"),10)||0;if(!this.isBorderBox()){h+=this.getFrameWidth("tb");}}return h;},getComputedWidth:function(){var w=Math.max(this.dom.offsetWidth,this.dom.clientWidth);if(!w){w=parseInt(this.getStyle("width"),10)||0;if(!this.isBorderBox()){w+=this.getFrameWidth("lr");}}return w;},getSize:function(_aa){return{width:this.getWidth(_aa),height:this.getHeight(_aa)};},getViewSize:function(){var d=this.dom,doc=document,aw=0,ah=0;if(d==doc||d==doc.body){return{width:D.getViewWidth(),height:D.getViewHeight()};}else{return{width:d.clientWidth,height:d.clientHeight};}},getValue:function(_af){return _af?parseInt(this.dom.value,10):this.dom.value;},adjustWidth:function(_b0){if(typeof _b0=="number"){if(this.autoBoxAdjust&&!this.isBorderBox()){_b0-=(this.getBorderWidth("lr")+this.getPadding("lr"));}if(_b0<0){_b0=0;}}return _b0;},adjustHeight:function(_b1){if(typeof _b1=="number"){if(this.autoBoxAdjust&&!this.isBorderBox()){_b1-=(this.getBorderWidth("tb")+this.getPadding("tb"));}if(_b1<0){_b1=0;}}return _b1;},setWidth:function(_b2,_b3){_b2=this.adjustWidth(_b2);if(!_b3||!A){this.dom.style.width=this.addUnits(_b2);}else{this.anim({width:{to:_b2}},this.preanim(arguments,1));}return this;},setHeight:function(_b4,_b5){_b4=this.adjustHeight(_b4);if(!_b5||!A){this.dom.style.height=this.addUnits(_b4);}else{this.anim({height:{to:_b4}},this.preanim(arguments,1));}return this;},setSize:function(_b6,_b7,_b8){if(typeof _b6=="object"){_b7=_b6.height;_b6=_b6.width;}_b6=this.adjustWidth(_b6);_b7=this.adjustHeight(_b7);if(!_b8||!A){this.dom.style.width=this.addUnits(_b6);this.dom.style.height=this.addUnits(_b7);}else{this.anim({width:{to:_b6},height:{to:_b7}},this.preanim(arguments,2));}return this;},setBounds:function(x,y,_bb,_bc,_bd){if(!_bd||!A){this.setSize(_bb,_bc);this.setLocation(x,y);}else{_bb=this.adjustWidth(_bb);_bc=this.adjustHeight(_bc);this.anim({points:{to:[x,y]},width:{to:_bb},height:{to:_bc}},this.preanim(arguments,4),"motion");}return this;},setRegion:function(_be,_bf){this.setBounds(_be.left,_be.top,_be.right-_be.left,_be.bottom-_be.top,this.preanim(arguments,1));return this;},addListener:function(_c0,fn,_c2,_c3){Ext.EventManager.on(this.dom,_c0,fn,_c2||this,_c3);},removeListener:function(_c4,fn){Ext.EventManager.removeListener(this.dom,_c4,fn);return this;},removeAllListeners:function(){E.purgeElement(this.dom);return this;},relayEvent:function(_c6,_c7){this.on(_c6,function(e){_c7.fireEvent(_c6,e);});},setOpacity:function(_c9,_ca){if(!_ca||!A){var s=this.dom.style;if(Ext.isIE){s.zoom=1;s.filter=(s.filter||"").replace(/alpha\([^\)]*\)/gi,"")+(_c9==1?"":"alpha(opacity="+_c9*100+")");}else{s.opacity=_c9;}}else{this.anim({opacity:{to:_c9}},this.preanim(arguments,1),null,0.35,"easeIn");}return this;},getLeft:function(_cc){if(!_cc){return this.getX();}else{return parseInt(this.getStyle("left"),10)||0;}},getRight:function(_cd){if(!_cd){return this.getX()+this.getWidth();}else{return(this.getLeft(true)+this.getWidth())||0;}},getTop:function(_ce){if(!_ce){return this.getY();}else{return parseInt(this.getStyle("top"),10)||0;}},getBottom:function(_cf){if(!_cf){return this.getY()+this.getHeight();}else{return(this.getTop(true)+this.getHeight())||0;}},position:function(pos,_d1,x,y){if(!pos){if(this.getStyle("position")=="static"){this.setStyle("position","relative");}}else{this.setStyle("position",pos);}if(_d1){this.setStyle("z-index",_d1);}if(x!==undefined&&y!==undefined){this.setXY([x,y]);}else{if(x!==undefined){this.setX(x);}else{if(y!==undefined){this.setY(y);}}}},clearPositioning:function(_d4){_d4=_d4||"";this.setStyle({"left":_d4,"right":_d4,"top":_d4,"bottom":_d4,"z-index":"","position":"static"});return this;},getPositioning:function(){var l=this.getStyle("left");var t=this.getStyle("top");return{"position":this.getStyle("position"),"left":l,"right":l?"":this.getStyle("right"),"top":t,"bottom":t?"":this.getStyle("bottom"),"z-index":this.getStyle("z-index")};},getBorderWidth:function(_d7){return this.addStyles(_d7,El.borders);},getPadding:function(_d8){return this.addStyles(_d8,El.paddings);},setPositioning:function(pc){this.applyStyles(pc);if(pc.right=="auto"){this.dom.style.right="";}if(pc.bottom=="auto"){this.dom.style.bottom="";}return this;},fixDisplay:function(){if(this.getStyle("display")=="none"){this.setStyle("visibility","hidden");this.setStyle("display",this.originalDisplay);if(this.getStyle("display")=="none"){this.setStyle("display","block");}}},setLeftTop:function(_da,top){this.dom.style.left=this.addUnits(_da);this.dom.style.top=this.addUnits(top);return this;},move:function(_dc,_dd,_de){var xy=this.getXY();_dc=_dc.toLowerCase();switch(_dc){case"l":case"left":this.moveTo(xy[0]-_dd,xy[1],this.preanim(arguments,2));break;case"r":case"right":this.moveTo(xy[0]+_dd,xy[1],this.preanim(arguments,2));break;case"t":case"top":case"up":this.moveTo(xy[0],xy[1]-_dd,this.preanim(arguments,2));break;case"b":case"bottom":case"down":this.moveTo(xy[0],xy[1]+_dd,this.preanim(arguments,2));break;}return this;},clip:function(){if(!this.isClipped){this.isClipped=true;this.originalClip={"o":this.getStyle("overflow"),"x":this.getStyle("overflow-x"),"y":this.getStyle("overflow-y")};this.setStyle("overflow","hidden");this.setStyle("overflow-x","hidden");this.setStyle("overflow-y","hidden");}return this;},unclip:function(){if(this.isClipped){this.isClipped=false;var o=this.originalClip;if(o.o){this.setStyle("overflow",o.o);}if(o.x){this.setStyle("overflow-x",o.x);}if(o.y){this.setStyle("overflow-y",o.y);}}return this;},getAnchorXY:function(_e1,_e2,s){var w,h,vp=false;if(!s){var d=this.dom;if(d==document.body||d==document){vp=true;w=D.getViewWidth();h=D.getViewHeight();}else{w=this.getWidth();h=this.getHeight();}}else{w=s.width;h=s.height;}var x=0,y=0,r=Math.round;switch((_e1||"tl").toLowerCase()){case"c":x=r(w*0.5);y=r(h*0.5);break;case"t":x=r(w*0.5);y=0;break;case"l":x=0;y=r(h*0.5);break;case"r":x=w;y=r(h*0.5);break;case"b":x=r(w*0.5);y=h;break;case"tl":x=0;y=0;break;case"bl":x=0;y=h;break;case"br":x=w;y=h;break;case"tr":x=w;y=0;break;}if(_e2===true){return[x,y];}if(vp){var sc=this.getScroll();return[x+sc.left,y+sc.top];}var o=this.getXY();return[x+o[0],y+o[1]];},getAlignToXY:function(el,p,o){el=Ext.get(el);var d=this.dom;if(!el.dom){throw"Element.alignTo with an element that doesn't exist";}var c=false;var p1="",p2="";o=o||[0,0];if(!p){p="tl-bl";}else{if(p=="?"){p="tl-bl?";}else{if(p.indexOf("-")==-1){p="tl-"+p;}}}p=p.toLowerCase();var m=p.match(/^([a-z]+)-([a-z]+)(\?)?$/);if(!m){throw"Element.alignTo with an invalid alignment "+p;}p1=m[1];p2=m[2];c=!!m[3];var a1=this.getAnchorXY(p1,true);var a2=el.getAnchorXY(p2,false);var x=a2[0]-a1[0]+o[0];var y=a2[1]-a1[1]+o[1];if(c){var w=this.getWidth(),h=this.getHeight(),r=el.getRegion();var dw=D.getViewWidth()-5,dh=D.getViewHeight()-5;var p1y=p1.charAt(0),p1x=p1.charAt(p1.length-1);var p2y=p2.charAt(0),p2x=p2.charAt(p2.length-1);var _102=((p1y=="t"&&p2y=="b")||(p1y=="b"&&p2y=="t"));var _103=((p1x=="r"&&p2x=="l")||(p1x=="l"&&p2x=="r"));var doc=document;var _105=(doc.documentElement.scrollLeft||doc.body.scrollLeft||0)+5;var _106=(doc.documentElement.scrollTop||doc.body.scrollTop||0)+5;if((x+w)>dw+_105){x=_103?r.left-w:dw+_105-w;}if(x<_105){x=_103?r.right:_105;}if((y+h)>dh+_106){y=_102?r.top-h:dh+_106-h;}if(y<_106){y=_102?r.bottom:_106;}}return[x,y];},getConstrainToXY:function(){var os={top:0,left:0,bottom:0,right:0};return function(el,_109,_10a,_10b){el=Ext.get(el);_10a=_10a?Ext.applyIf(_10a,os):os;var vw,vh,vx=0,vy=0;if(el.dom==document.body||el.dom==document){vw=Ext.lib.Dom.getViewWidth();vh=Ext.lib.Dom.getViewHeight();}else{vw=el.dom.clientWidth;vh=el.dom.clientHeight;if(!_109){var vxy=el.getXY();vx=vxy[0];vy=vxy[1];}}var s=el.getScroll();vx+=_10a.left+s.left;vy+=_10a.top+s.top;vw-=_10a.right;vh-=_10a.bottom;var vr=vx+vw;var vb=vy+vh;var xy=_10b||(!_109?this.getXY():[this.getLeft(true),this.getTop(true)]);var x=xy[0],y=xy[1];var w=this.dom.offsetWidth,h=this.dom.offsetHeight;var _119=false;if((x+w)>vr){x=vr-w;_119=true;}if((y+h)>vb){y=vb-h;_119=true;}if(x<vx){x=vx;_119=true;}if(y<vy){y=vy;_119=true;}return _119?[x,y]:false;};}(),adjustForConstraints:function(xy,_11b,_11c){return this.getConstrainToXY(_11b||document,false,_11c,xy)||xy;},alignTo:function(_11d,_11e,_11f,_120){var xy=this.getAlignToXY(_11d,_11e,_11f);this.setXY(xy,this.preanim(arguments,3));return this;},anchorTo:function(el,_123,_124,_125,_126,_127){var _128=function(){this.alignTo(el,_123,_124,_125);Ext.callback(_127,this);};Ext.EventManager.onWindowResize(_128,this);var tm=typeof _126;if(tm!="undefined"){Ext.EventManager.on(window,"scroll",_128,this,{buffer:tm=="number"?_126:50});}_128.call(this);return this;},clearOpacity:function(){if(window.ActiveXObject){if(typeof this.dom.style.filter=="string"&&(/alpha/i).test(this.dom.style.filter)){this.dom.style.filter="";}}else{this.dom.style.opacity="";this.dom.style["-moz-opacity"]="";this.dom.style["-khtml-opacity"]="";}return this;},hide:function(_12a){this.setVisible(false,this.preanim(arguments,0));return this;},show:function(_12b){this.setVisible(true,this.preanim(arguments,0));return this;},addUnits:function(size){return Ext.Element.addUnits(size,this.defaultUnit);},beginMeasure:function(){var el=this.dom;if(el.offsetWidth||el.offsetHeight){return this;}var _12e=[];var p=this.dom,b=document.body;while((!el.offsetWidth&&!el.offsetHeight)&&p&&p.tagName&&p!=b){var pe=Ext.get(p);if(pe.getStyle("display")=="none"){_12e.push({el:p,visibility:pe.getStyle("visibility")});p.style.visibility="hidden";p.style.display="block";}p=p.parentNode;}this._measureChanged=_12e;return this;},endMeasure:function(){var _132=this._measureChanged;if(_132){for(var i=0,len=_132.length;i<len;i++){var r=_132[i];r.el.style.visibility=r.visibility;r.el.style.display="none";}this._measureChanged=null;}return this;},update:function(html,_137,_138){if(typeof html=="undefined"){html="";}if(_137!==true){this.dom.innerHTML=html;if(typeof _138=="function"){_138();}return this;}var id=Ext.id();var dom=this.dom;html+="<span id=\""+id+"\"></span>";E.onAvailable(id,function(){var hd=document.getElementsByTagName("head")[0];var re=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;var _13d=/\ssrc=([\'\"])(.*?)\1/i;var _13e=/\stype=([\'\"])(.*?)\1/i;var _13f;while(_13f=re.exec(html)){var _140=_13f[1];var _141=_140?_140.match(_13d):false;if(_141&&_141[2]){var s=document.createElement("script");s.src=_141[2];var _143=_140.match(_13e);if(_143&&_143[2]){s.type=_143[2];}hd.appendChild(s);}else{if(_13f[2]&&_13f[2].length>0){eval(_13f[2]);}}}var el=document.getElementById(id);if(el){el.parentNode.removeChild(el);}if(typeof _138=="function"){_138();}});dom.innerHTML=html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,"");return this;},load:function(){var um=this.getUpdateManager();um.update.apply(um,arguments);return this;},getUpdateManager:function(){if(!this.updateManager){this.updateManager=new Ext.UpdateManager(this);}return this.updateManager;},unselectable:function(){this.dom.unselectable="on";this.swallowEvent("selectstart",true);this.applyStyles("-moz-user-select:none;-khtml-user-select:none;");this.addClass("x-unselectable");return this;},getCenterXY:function(){return this.getAlignToXY(document,"c-c");},center:function(_146){this.alignTo(_146||document,"c-c");return this;},isBorderBox:function(){return _147[this.dom.tagName.toLowerCase()]||Ext.isBorderBox;},getBox:function(_148,_149){var xy;if(!_149){xy=this.getXY();}else{var left=parseInt(this.getStyle("left"),10)||0;var top=parseInt(this.getStyle("top"),10)||0;xy=[left,top];}var el=this.dom,w=el.offsetWidth,h=el.offsetHeight,bx;if(!_148){bx={x:xy[0],y:xy[1],0:xy[0],1:xy[1],width:w,height:h};}else{var l=this.getBorderWidth("l")+this.getPadding("l");var r=this.getBorderWidth("r")+this.getPadding("r");var t=this.getBorderWidth("t")+this.getPadding("t");var b=this.getBorderWidth("b")+this.getPadding("b");bx={x:xy[0]+l,y:xy[1]+t,0:xy[0]+l,1:xy[1]+t,width:w-(l+r),height:h-(t+b)};}bx.right=bx.x+bx.width;bx.bottom=bx.y+bx.height;return bx;},getFrameWidth:function(_155,_156){return _156&&Ext.isBorderBox?0:(this.getPadding(_155)+this.getBorderWidth(_155));},setBox:function(box,_158,_159){var w=box.width,h=box.height;if((_158&&!this.autoBoxAdjust)&&!this.isBorderBox()){w-=(this.getBorderWidth("lr")+this.getPadding("lr"));h-=(this.getBorderWidth("tb")+this.getPadding("tb"));}this.setBounds(box.x,box.y,w,h,this.preanim(arguments,2));return this;},repaint:function(){var dom=this.dom;this.addClass("x-repaint");setTimeout(function(){Ext.get(dom).removeClass("x-repaint");},1);return this;},getMargins:function(side){if(!side){return{top:parseInt(this.getStyle("margin-top"),10)||0,left:parseInt(this.getStyle("margin-left"),10)||0,bottom:parseInt(this.getStyle("margin-bottom"),10)||0,right:parseInt(this.getStyle("margin-right"),10)||0};}else{return this.addStyles(side,El.margins);}},addStyles:function(_15e,_15f){var val=0,v,w;for(var i=0,len=_15e.length;i<len;i++){v=this.getStyle(_15f[_15e.charAt(i)]);if(v){w=parseInt(v,10);if(w){val+=w;}}}return val;},createProxy:function(_165,_166,_167){if(_166){_166=Ext.getDom(_166);}else{_166=document.body;}_165=typeof _165=="object"?_165:{tag:"div",cls:_165};var _168=Ext.DomHelper.append(_166,_165,true);if(_167){_168.setBox(this.getBox());}return _168;},mask:function(msg,_16a){if(this.getStyle("position")=="static"){this.setStyle("position","relative");}if(!this._mask){this._mask=Ext.DomHelper.append(this.dom,{cls:"ext-el-mask"},true);}this.addClass("x-masked");this._mask.setDisplayed(true);if(typeof msg=="string"){if(!this._maskMsg){this._maskMsg=Ext.DomHelper.append(this.dom,{cls:"ext-el-mask-msg",cn:{tag:"div"}},true);}var mm=this._maskMsg;mm.dom.className=_16a?"ext-el-mask-msg "+_16a:"ext-el-mask-msg";mm.dom.firstChild.innerHTML=msg;mm.setDisplayed(true);mm.center(this);}if(Ext.isIE&&!(Ext.isIE7&&Ext.isStrict)&&this.getStyle("height")=="auto"){this._mask.setHeight(this.getHeight());}return this._mask;},unmask:function(_16c){if(this._mask){if(_16c===true){this._mask.remove();delete this._mask;if(this._maskMsg){this._maskMsg.remove();delete this._maskMsg;}}else{this._mask.setDisplayed(false);if(this._maskMsg){this._maskMsg.setDisplayed(false);}}}this.removeClass("x-masked");},isMasked:function(){return this._mask&&this._mask.isVisible();},createShim:function(){var el=document.createElement("iframe");el.frameBorder="no";el.className="ext-shim";if(Ext.isIE&&Ext.isSecure){el.src=Ext.SSL_SECURE_URL;}var shim=Ext.get(this.dom.parentNode.insertBefore(el,this.dom));shim.autoBoxAdjust=false;return shim;},remove:function(){if(this.dom.parentNode){this.dom.parentNode.removeChild(this.dom);}delete El.cache[this.dom.id];},addClassOnOver:function(_16f,_170){this.on("mouseover",function(){Ext.fly(this,"_internal").addClass(_16f);},this.dom);var _171=function(e){if(_170!==true||!e.within(this,true)){Ext.fly(this,"_internal").removeClass(_16f);}};this.on("mouseout",_171,this.dom);return this;},addClassOnFocus:function(_173){this.on("focus",function(){Ext.fly(this,"_internal").addClass(_173);},this.dom);this.on("blur",function(){Ext.fly(this,"_internal").removeClass(_173);},this.dom);return this;},addClassOnClick:function(_174){var dom=this.dom;this.on("mousedown",function(){Ext.fly(dom,"_internal").addClass(_174);var d=Ext.get(document);var fn=function(){Ext.fly(dom,"_internal").removeClass(_174);d.removeListener("mouseup",fn);};d.on("mouseup",fn);});return this;},swallowEvent:function(_178,_179){var fn=function(e){e.stopPropagation();if(_179){e.preventDefault();}};if(_178 instanceof Array){for(var i=0,len=_178.length;i<len;i++){this.on(_178[i],fn);}return this;}this.on(_178,fn);return this;},fitToParentDelegate:Ext.emptyFn,fitToParent:function(_17e,_17f){Ext.EventManager.removeResizeListener(this.fitToParentDelegate);this.fitToParentDelegate=Ext.emptyFn;if(_17e===true&&!this.dom.parentNode){return;}var p=Ext.get(_17f||this.dom.parentNode);this.setSize(p.getComputedWidth()-p.getFrameWidth("lr"),p.getComputedHeight()-p.getFrameWidth("tb"));if(_17e===true){this.fitToParentDelegate=this.fitToParent.createDelegate(this,[true,_17f]);Ext.EventManager.onWindowResize(this.fitToParentDelegate);}return this;},getNextSibling:function(){var n=this.dom.nextSibling;while(n&&n.nodeType!=1){n=n.nextSibling;}return n;},getPrevSibling:function(){var n=this.dom.previousSibling;while(n&&n.nodeType!=1){n=n.previousSibling;}return n;},appendChild:function(el){el=Ext.get(el);el.appendTo(this);return this;},createChild:function(_184,_185,_186){_184=_184||{tag:"div"};if(_185){return Ext.DomHelper.insertBefore(_185,_184,_186!==true);}return Ext.DomHelper[!this.dom.firstChild?"overwrite":"append"](this.dom,_184,_186!==true);},appendTo:function(el){el=Ext.getDom(el);el.appendChild(this.dom);return this;},insertBefore:function(el){el=Ext.getDom(el);el.parentNode.insertBefore(this.dom,el);return this;},insertAfter:function(el){el=Ext.getDom(el);el.parentNode.insertBefore(this.dom,el.nextSibling);return this;},insertFirst:function(el,_18b){el=el||{};if(typeof el=="object"&&!el.nodeType){return this.createChild(el,this.dom.firstChild,_18b);}else{el=Ext.getDom(el);this.dom.insertBefore(el,this.dom.firstChild);return!_18b?Ext.get(el):el;}},insertSibling:function(el,_18d,_18e){_18d=_18d?_18d.toLowerCase():"before";el=el||{};var rt,_190=_18d=="before"?this.dom:this.dom.nextSibling;if(typeof el=="object"&&!el.nodeType){if(_18d=="after"&&!this.dom.nextSibling){rt=Ext.DomHelper.append(this.dom.parentNode,el,!_18e);}else{rt=Ext.DomHelper[_18d=="after"?"insertAfter":"insertBefore"](this.dom,el,!_18e);}}else{rt=this.dom.parentNode.insertBefore(Ext.getDom(el),_18d=="before"?this.dom:this.dom.nextSibling);if(!_18e){rt=Ext.get(rt);}}return rt;},wrap:function(_191,_192){if(!_191){_191={tag:"div"};}var _193=Ext.DomHelper.insertBefore(this.dom,_191,!_192);_193.dom?_193.dom.appendChild(this.dom):_193.appendChild(this.dom);return _193;},replace:function(el){el=Ext.get(el);this.insertBefore(el);el.remove();return this;},insertHtml:function(_195,html,_197){var el=Ext.DomHelper.insertHtml(_195,this.dom,html);return _197?Ext.get(el):el;},set:function(o,_19a){var el=this.dom;_19a=typeof _19a=="undefined"?(el.setAttribute?true:false):_19a;for(var attr in o){if(attr=="style"||typeof o[attr]=="function"){continue;}if(attr=="cls"){el.className=o["cls"];}else{if(_19a){el.setAttribute(attr,o[attr]);}else{el[attr]=o[attr];}}}if(o.style){Ext.DomHelper.applyStyles(el,o.style);}return this;},addKeyListener:function(key,fn,_19f){var _1a0;if(typeof key!="object"||key instanceof Array){_1a0={key:key,fn:fn,scope:_19f};}else{_1a0={key:key.key,shift:key.shift,ctrl:key.ctrl,alt:key.alt,fn:fn,scope:_19f};}return new Ext.KeyMap(this,_1a0);},addKeyMap:function(_1a1){return new Ext.KeyMap(this,_1a1);},isScrollable:function(){var dom=this.dom;return dom.scrollHeight>dom.clientHeight||dom.scrollWidth>dom.clientWidth;},scrollTo:function(side,_1a4,_1a5){var prop=side.toLowerCase()=="left"?"scrollLeft":"scrollTop";if(!_1a5||!A){this.dom[prop]=_1a4;}else{var to=prop=="scrollLeft"?[_1a4,this.dom.scrollTop]:[this.dom.scrollLeft,_1a4];this.anim({scroll:{"to":to}},this.preanim(arguments,2),"scroll");}return this;},scroll:function(_1a8,_1a9,_1aa){if(!this.isScrollable()){return;}var el=this.dom;var l=el.scrollLeft,t=el.scrollTop;var w=el.scrollWidth,h=el.scrollHeight;var cw=el.clientWidth,ch=el.clientHeight;_1a8=_1a8.toLowerCase();var _1b2=false;var a=this.preanim(arguments,2);switch(_1a8){case"l":case"left":if(w-l>cw){var v=Math.min(l+_1a9,w-cw);this.scrollTo("left",v,a);_1b2=true;}break;case"r":case"right":if(l>0){var v=Math.max(l-_1a9,0);this.scrollTo("left",v,a);_1b2=true;}break;case"t":case"top":case"up":if(t>0){var v=Math.max(t-_1a9,0);this.scrollTo("top",v,a);_1b2=true;}break;case"b":case"bottom":case"down":if(h-t>ch){var v=Math.min(t+_1a9,h-ch);this.scrollTo("top",v,a);_1b2=true;}break;}return _1b2;},translatePoints:function(x,y){if(typeof x=="object"||x instanceof Array){y=x[1];x=x[0];}var p=this.getStyle("position");var o=this.getXY();var l=parseInt(this.getStyle("left"),10);var t=parseInt(this.getStyle("top"),10);if(isNaN(l)){l=(p=="relative")?0:this.dom.offsetLeft;}if(isNaN(t)){t=(p=="relative")?0:this.dom.offsetTop;}return{left:(x-o[0]+l),top:(y-o[1]+t)};},getScroll:function(){var d=this.dom,doc=document;if(d==doc||d==doc.body){var l=window.pageXOffset||doc.documentElement.scrollLeft||doc.body.scrollLeft||0;var t=window.pageYOffset||doc.documentElement.scrollTop||doc.body.scrollTop||0;return{left:l,top:t};}else{return{left:d.scrollLeft,top:d.scrollTop};}},getColor:function(attr,_1c0,_1c1){var v=this.getStyle(attr);if(!v||v=="transparent"||v=="inherit"){return _1c0;}var _1c3=typeof _1c1=="undefined"?"#":_1c1;if(v.substr(0,4)=="rgb("){var rvs=v.slice(4,v.length-1).split(",");for(var i=0;i<3;i++){var h=parseInt(rvs[i]).toString(16);if(h<16){h="0"+h;}_1c3+=h;}}else{if(v.substr(0,1)=="#"){if(v.length==4){for(var i=1;i<4;i++){var c=v.charAt(i);_1c3+=c+c;}}else{if(v.length==7){_1c3+=v.substr(1);}}}}return(_1c3.length>5?_1c3.toLowerCase():_1c0);},boxWrap:function(cls){cls=cls||"x-box";var el=Ext.get(this.insertHtml("beforeBegin",String.format("<div class=\"{0}\">"+El.boxMarkup+"</div>",cls)));el.child("."+cls+"-mc").dom.appendChild(this.dom);return el;},getAttributeNS:Ext.isIE?function(ns,name){var d=this.dom;var type=typeof d[ns+":"+name];if(type!="undefined"&&type!="unknown"){return d[ns+":"+name];}return d[name];}:function(ns,name){var d=this.dom;return d.getAttributeNS(ns,name)||d.getAttribute(ns+":"+name)||d.getAttribute(name)||d[name];}};var ep=El.prototype;ep.on=ep.addListener;ep.mon=ep.addListener;ep.un=ep.removeListener;ep.autoBoxAdjust=true;El.unitPattern=/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i;El.addUnits=function(v,_1d3){if(v===""||v=="auto"){return v;}if(v===undefined){return"";}if(typeof v=="number"||!El.unitPattern.test(v)){return v+(_1d3||"px");}return v;};El.boxMarkup="<div class=\"{0}-tl\"><div class=\"{0}-tr\"><div class=\"{0}-tc\"></div></div></div><div class=\"{0}-ml\"><div class=\"{0}-mr\"><div class=\"{0}-mc\"></div></div></div><div class=\"{0}-bl\"><div class=\"{0}-br\"><div class=\"{0}-bc\"></div></div></div>";El.VISIBILITY=1;El.DISPLAY=2;El.borders={l:"border-left-width",r:"border-right-width",t:"border-top-width",b:"border-bottom-width"};El.paddings={l:"padding-left",r:"padding-right",t:"padding-top",b:"padding-bottom"};El.margins={l:"margin-left",r:"margin-right",t:"margin-top",b:"margin-bottom"};El.cache={};var _1d4;El.get=function(el){var ex,elm,id;if(!el){return null;}if(typeof el=="string"){if(!(elm=document.getElementById(el))){return null;}if(ex=El.cache[el]){ex.dom=elm;}else{ex=El.cache[el]=new El(elm);}return ex;}else{if(el.tagName){if(!(id=el.id)){id=Ext.id(el);}if(ex=El.cache[id]){ex.dom=el;}else{ex=El.cache[id]=new El(el);}return ex;}else{if(el instanceof El){if(el!=_1d4){el.dom=document.getElementById(el.id)||el.dom;El.cache[el.id]=el;}return el;}else{if(el.isComposite){return el;}else{if(el instanceof Array){return El.select(el);}else{if(el==document){if(!_1d4){var f=function(){};f.prototype=El.prototype;_1d4=new f();_1d4.dom=document;}return _1d4;}}}}}}return null;};El.uncache=function(el){for(var i=0,a=arguments,len=a.length;i<len;i++){if(a[i]){delete El.cache[a[i].id||a[i]];}}};El.garbageCollect=function(){if(!Ext.enableGarbageCollector){clearInterval(El.collectorThread);return;}for(var eid in El.cache){var el=El.cache[eid],d=el.dom;if(!d||!d.parentNode||(!d.offsetParent&&!document.getElementById(eid))){delete El.cache[eid];if(d&&Ext.enableListenerCollection){E.purgeElement(d);}}}};El.collectorThreadId=setInterval(El.garbageCollect,30000);El.Flyweight=function(dom){this.dom=dom;};El.Flyweight.prototype=El.prototype;El._flyweights={};El.fly=function(el,_1e3){_1e3=_1e3||"_global";el=Ext.getDom(el);if(!el){return null;}if(!El._flyweights[_1e3]){El._flyweights[_1e3]=new El.Flyweight();}El._flyweights[_1e3].dom=el;return El._flyweights[_1e3];};Ext.get=El.get;Ext.fly=El.fly;var _147=Ext.isStrict?{select:1}:{input:1,select:1,textarea:1};if(Ext.isIE||Ext.isGecko){_147["button"]=1;}Ext.EventManager.on(window,"unload",function(){delete El.cache;delete El._flyweights;});})();



Ext.enableFx=true;Ext.Fx={slideIn:function(_1,o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){_1=_1||"t";this.fixDisplay();var r=this.getFxRestore();var b=this.getBox();this.setSize(b);var _6=this.fxWrap(r.pos,o,"hidden");var st=this.dom.style;st.visibility="visible";st.position="absolute";var _8=function(){el.fxUnwrap(_6,r.pos,o);st.width=r.width;st.height=r.height;el.afterFx(o);};var a,pt={to:[b.x,b.y]},bw={to:b.width},bh={to:b.height};switch(_1.toLowerCase()){case"t":_6.setSize(b.width,0);st.left=st.bottom="0";a={height:bh};break;case"l":_6.setSize(0,b.height);st.right=st.top="0";a={width:bw};break;case"r":_6.setSize(0,b.height);_6.setX(b.right);st.left=st.top="0";a={width:bw,points:pt};break;case"b":_6.setSize(b.width,0);_6.setY(b.bottom);st.left=st.top="0";a={height:bh,points:pt};break;case"tl":_6.setSize(0,0);st.right=st.bottom="0";a={width:bw,height:bh};break;case"bl":_6.setSize(0,0);_6.setY(b.y+b.height);st.right=st.top="0";a={width:bw,height:bh,points:pt};break;case"br":_6.setSize(0,0);_6.setXY([b.right,b.bottom]);st.left=st.top="0";a={width:bw,height:bh,points:pt};break;case"tr":_6.setSize(0,0);_6.setX(b.x+b.width);st.left=st.bottom="0";a={width:bw,height:bh,points:pt};break;}this.dom.style.visibility="visible";_6.show();arguments.callee.anim=_6.fxanim(a,o,"motion",0.5,"easeOut",_8);});return this;},slideOut:function(_d,o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){_d=_d||"t";var r=this.getFxRestore();var b=this.getBox();this.setSize(b);var _12=this.fxWrap(r.pos,o,"visible");var st=this.dom.style;st.visibility="visible";st.position="absolute";_12.setSize(b);var _14=function(){if(o.useDisplay){el.setDisplayed(false);}else{el.hide();}el.fxUnwrap(_12,r.pos,o);st.width=r.width;st.height=r.height;el.afterFx(o);};var a,_16={to:0};switch(_d.toLowerCase()){case"t":st.left=st.bottom="0";a={height:_16};break;case"l":st.right=st.top="0";a={width:_16};break;case"r":st.left=st.top="0";a={width:_16,points:{to:[b.right,b.y]}};break;case"b":st.left=st.top="0";a={height:_16,points:{to:[b.x,b.bottom]}};break;case"tl":st.right=st.bottom="0";a={width:_16,height:_16};break;case"bl":st.right=st.top="0";a={width:_16,height:_16,points:{to:[b.x,b.bottom]}};break;case"br":st.left=st.top="0";a={width:_16,height:_16,points:{to:[b.x+b.width,b.bottom]}};break;case"tr":st.left=st.bottom="0";a={width:_16,height:_16,points:{to:[b.right,b.y]}};break;}arguments.callee.anim=_12.fxanim(a,o,"motion",0.5,"easeOut",_14);});return this;},puff:function(o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){this.clearOpacity();this.show();var r=this.getFxRestore();var st=this.dom.style;var _1b=function(){if(o.useDisplay){el.setDisplayed(false);}else{el.hide();}el.clearOpacity();el.setPositioning(r.pos);st.width=r.width;st.height=r.height;st.fontSize="";el.afterFx(o);};var _1c=this.getWidth();var _1d=this.getHeight();arguments.callee.anim=this.fxanim({width:{to:this.adjustWidth(_1c*2)},height:{to:this.adjustHeight(_1d*2)},points:{by:[-(_1c*0.5),-(_1d*0.5)]},opacity:{to:0},fontSize:{to:200,unit:"%"}},o,"motion",0.5,"easeOut",_1b);});return this;},switchOff:function(o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){this.clearOpacity();this.clip();var r=this.getFxRestore();var st=this.dom.style;var _22=function(){if(o.useDisplay){el.setDisplayed(false);}else{el.hide();}el.clearOpacity();el.setPositioning(r.pos);st.width=r.width;st.height=r.height;el.afterFx(o);};this.fxanim({opacity:{to:0.3}},null,null,0.1,null,function(){this.clearOpacity();(function(){this.fxanim({height:{to:1},points:{by:[0,this.getHeight()*0.5]}},o,"motion",0.3,"easeIn",_22);}).defer(100,this);});});return this;},highlight:function(_23,o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){_23=_23||"ffff9c";attr=o.attr||"backgroundColor";this.clearOpacity();this.show();var _26=this.getColor(attr);var _27=this.dom.style[attr];endColor=(o.endColor||_26)||"ffffff";var _28=function(){el.dom.style[attr]=_27;el.afterFx(o);};var a={};a[attr]={from:_23,to:endColor};arguments.callee.anim=this.fxanim(a,o,"color",1,"easeIn",_28);});return this;},frame:function(_2a,_2b,o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){_2a=_2a||"#C3DAF9";if(_2a.length==6){_2a="#"+_2a;}_2b=_2b||1;duration=o.duration||1;this.show();var b=this.getBox();var _2f=function(){var _30=this.createProxy({style:{visbility:"hidden",position:"absolute","z-index":"35000",border:"0px solid "+_2a}});var _31=Ext.isBorderBox?2:1;_30.animate({top:{from:b.y,to:b.y-20},left:{from:b.x,to:b.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:b.height,to:(b.height+(20*_31))},width:{from:b.width,to:(b.width+(20*_31))}},duration,function(){_30.remove();});if(--_2b>0){_2f.defer((duration/2)*1000,this);}else{el.afterFx(o);}};_2f.call(this);});return this;},pause:function(_32){var el=this.getFxEl();var o={};el.queueFx(o,function(){setTimeout(function(){el.afterFx(o);},_32*1000);});return this;},fadeIn:function(o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){this.setOpacity(0);this.fixDisplay();this.dom.style.visibility="visible";var to=o.endOpacity||1;arguments.callee.anim=this.fxanim({opacity:{to:to}},o,null,0.5,"easeOut",function(){if(to==1){this.clearOpacity();}el.afterFx(o);});});return this;},fadeOut:function(o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){arguments.callee.anim=this.fxanim({opacity:{to:o.endOpacity||0}},o,null,0.5,"easeOut",function(){if(this.visibilityMode==Ext.Element.DISPLAY||o.useDisplay){this.dom.style.display="none";}else{this.dom.style.visibility="hidden";}this.clearOpacity();el.afterFx(o);});});return this;},scale:function(w,h,o){this.shift(Ext.apply({},o,{width:w,height:h}));return this;},shift:function(o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){var a={},w=o.width,h=o.height,x=o.x,y=o.y,op=o.opacity;if(w!==undefined){a.width={to:this.adjustWidth(w)};}if(h!==undefined){a.height={to:this.adjustHeight(h)};}if(x!==undefined||y!==undefined){a.points={to:[x!==undefined?x:this.getX(),y!==undefined?y:this.getY()]};}if(op!==undefined){a.opacity={to:op};}if(o.xy!==undefined){a.points={to:o.xy};}arguments.callee.anim=this.fxanim(a,o,"motion",0.35,"easeOut",function(){el.afterFx(o);});});return this;},ghost:function(_45,o){var el=this.getFxEl();o=o||{};el.queueFx(o,function(){_45=_45||"b";var r=this.getFxRestore();var w=this.getWidth(),h=this.getHeight();var st=this.dom.style;var _4c=function(){if(o.useDisplay){el.setDisplayed(false);}else{el.hide();}el.clearOpacity();el.setPositioning(r.pos);st.width=r.width;st.height=r.height;el.afterFx(o);};var a={opacity:{to:0},points:{}},pt=a.points;switch(_45.toLowerCase()){case"t":pt.by=[0,-h];break;case"l":pt.by=[-w,0];break;case"r":pt.by=[w,0];break;case"b":pt.by=[0,h];break;case"tl":pt.by=[-w,-h];break;case"bl":pt.by=[-w,h];break;case"br":pt.by=[w,h];break;case"tr":pt.by=[w,-h];break;}arguments.callee.anim=this.fxanim(a,o,"motion",0.5,"easeOut",_4c);});return this;},syncFx:function(){this.fxDefaults=Ext.apply(this.fxDefaults||{},{block:false,concurrent:true,stopFx:false});return this;},sequenceFx:function(){this.fxDefaults=Ext.apply(this.fxDefaults||{},{block:false,concurrent:false,stopFx:false});return this;},nextFx:function(){var ef=this.fxQueue[0];if(ef){ef.call(this);}},hasActiveFx:function(){return this.fxQueue&&this.fxQueue[0];},stopFx:function(){if(this.hasActiveFx()){var cur=this.fxQueue[0];if(cur&&cur.anim&&cur.anim.isAnimated()){this.fxQueue=[cur];cur.anim.stop(true);}}return this;},beforeFx:function(o){if(this.hasActiveFx()&&!o.concurrent){if(o.stopFx){this.stopFx();return true;}return false;}return true;},hasFxBlock:function(){var q=this.fxQueue;return q&&q[0]&&q[0].block;},queueFx:function(o,fn){if(!this.fxQueue){this.fxQueue=[];}if(!this.hasFxBlock()){Ext.applyIf(o,this.fxDefaults);if(!o.concurrent){var run=this.beforeFx(o);fn.block=o.block;this.fxQueue.push(fn);if(run){this.nextFx();}}else{fn.call(this);}}return this;},fxWrap:function(pos,o,vis){var _59;if(!o.wrap||!(_59=Ext.get(o.wrap))){var _5a;if(o.fixPosition){_5a=this.getXY();}var div=document.createElement("div");div.style.visibility=vis;_59=Ext.get(this.dom.parentNode.insertBefore(div,this.dom));_59.setPositioning(pos);if(_59.getStyle("position")=="static"){_59.position("relative");}this.clearPositioning("auto");_59.clip();_59.dom.appendChild(this.dom);if(_5a){_59.setXY(_5a);}}return _59;},fxUnwrap:function(_5c,pos,o){this.clearPositioning();this.setPositioning(pos);if(!o.wrap){_5c.dom.parentNode.insertBefore(this.dom,_5c.dom);_5c.remove();}},getFxRestore:function(){var st=this.dom.style;return{pos:this.getPositioning(),width:st.width,height:st.height};},afterFx:function(o){if(o.afterStyle){this.applyStyles(o.afterStyle);}if(o.afterCls){this.addClass(o.afterCls);}if(o.remove===true){this.remove();}Ext.callback(o.callback,o.scope,[this]);if(!o.concurrent){this.fxQueue.shift();this.nextFx();}},getFxEl:function(){return Ext.get(this.dom);},fxanim:function(_61,opt,_63,_64,_65,cb){_63=_63||"run";opt=opt||{};var _67=Ext.lib.Anim[_63](this.dom,_61,(opt.duration||_64)||0.35,(opt.easing||_65)||"easeOut",function(){Ext.callback(cb,this);},this);opt.anim=_67;return _67;}};Ext.Fx.resize=Ext.Fx.scale;Ext.apply(Ext.Element.prototype,Ext.Fx);



Ext.CompositeElement=function(_1){this.elements=[];this.addElements(_1);};Ext.CompositeElement.prototype={isComposite:true,addElements:function(_2){if(!_2){return this;}if(typeof _2=="string"){_2=Ext.Element.selectorFunction(_2);}var _3=this.elements;var _4=_3.length-1;for(var i=0,_6=_2.length;i<_6;i++){_3[++_4]=Ext.get(_2[i]);}return this;},fill:function(_7){this.elements=[];this.add(_7);return this;},filter:function(_8){var _9=[];this.each(function(el){if(el.is(_8)){_9[_9.length]=el.dom;}});this.fill(_9);return this;},invoke:function(fn,_c){var _d=this.elements;for(var i=0,_f=_d.length;i<_f;i++){Ext.Element.prototype[fn].apply(_d[i],_c);}return this;},add:function(els){if(typeof els=="string"){this.addElements(Ext.Element.selectorFunction(els));}else{if(els.length!==undefined){this.addElements(els);}else{this.addElements([els]);}}return this;},each:function(fn,_12){var els=this.elements;for(var i=0,len=els.length;i<len;i++){if(fn.call(_12||els[i],els[i],this,i)===false){break;}}return this;},item:function(_16){return this.elements[_16]||null;},first:function(){return this.item(0);},last:function(){return this.item(this.elements.length-1);},getCount:function(){return this.elements.length;},contains:function(el){return this.indexOf(el)!==-1;},indexOf:function(el){return this.elements.indexOf(Ext.get(el));},removeElement:function(el,_1a){if(el instanceof Array){for(var i=0,len=el.length;i<len;i++){this.removeElement(el[i]);}return this;}var _1d=typeof el=="number"?el:this.indexOf(el);if(_1d!==-1){if(_1a){var d=this.elements[_1d];if(d.dom){d.remove();}else{d.parentNode.removeChild(d);}}this.elements.splice(_1d,1);}return this;},replaceElement:function(el,_20,_21){var _22=typeof el=="number"?el:this.indexOf(el);if(_22!==-1){if(_21){this.elements[_22].replaceWith(_20);}else{this.elements.splice(_22,1,Ext.get(_20));}}return this;},clear:function(){this.elements=[];}};(function(){Ext.CompositeElement.createCall=function(_23,_24){if(!_23[_24]){_23[_24]=function(){return this.invoke(_24,arguments);};}};for(var _25 in Ext.Element.prototype){if(typeof Ext.Element.prototype[_25]=="function"){Ext.CompositeElement.createCall(Ext.CompositeElement.prototype,_25);}}})();Ext.CompositeElementLite=function(els){Ext.CompositeElementLite.superclass.constructor.call(this,els);this.el=new Ext.Element.Flyweight();};Ext.extend(Ext.CompositeElementLite,Ext.CompositeElement,{addElements:function(els){if(els){if(els instanceof Array){this.elements=this.elements.concat(els);}else{var _28=this.elements;var _29=_28.length-1;for(var i=0,len=els.length;i<len;i++){_28[++_29]=els[i];}}}return this;},invoke:function(fn,_2d){var els=this.elements;var el=this.el;for(var i=0,len=els.length;i<len;i++){el.dom=els[i];Ext.Element.prototype[fn].apply(el,_2d);}return this;},item:function(_32){if(!this.elements[_32]){return null;}this.el.dom=this.elements[_32];return this.el;},addListener:function(_33,_34,_35,opt){var els=this.elements;for(var i=0,len=els.length;i<len;i++){Ext.EventManager.on(els[i],_33,_34,_35||els[i],opt);}return this;},each:function(fn,_3b){var els=this.elements;var el=this.el;for(var i=0,len=els.length;i<len;i++){el.dom=els[i];if(fn.call(_3b||el,el,this,i)===false){break;}}return this;},indexOf:function(el){return this.elements.indexOf(Ext.getDom(el));},replaceElement:function(el,_42,_43){var _44=typeof el=="number"?el:this.indexOf(el);if(_44!==-1){_42=Ext.getDom(_42);if(_43){var d=this.elements[_44];d.parentNode.insertBefore(_42,d);d.parentNode.removeChild(d);}this.elements.splice(_44,1,_42);}return this;}});Ext.CompositeElementLite.prototype.on=Ext.CompositeElementLite.prototype.addListener;if(Ext.DomQuery){Ext.Element.selectorFunction=Ext.DomQuery.select;}Ext.Element.select=function(_46,_47,_48){var els;if(typeof _46=="string"){els=Ext.Element.selectorFunction(_46,_48);}else{if(_46.length!==undefined){els=_46;}else{throw"Invalid selector";}}if(_47===true){return new Ext.CompositeElement(els);}else{return new Ext.CompositeElementLite(els);}};Ext.select=Ext.Element.select;



Ext.data.Connection=function(_1){Ext.apply(this,_1);this.addEvents({"beforerequest":true,"requestcomplete":true,"requestexception":true});Ext.data.Connection.superclass.constructor.call(this);};Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,request:function(o){if(this.fireEvent("beforerequest",this,o)!==false){var p=o.params;if(typeof p=="function"){p=p.call(o.scope||window,o);}if(typeof p=="object"){p=Ext.urlEncode(o.params);}if(this.extraParams){var _4=Ext.urlEncode(this.extraParams);p=p?(p+"&"+_4):_4;}var _5=o.url||this.url;if(typeof _5=="function"){_5=_5.call(o.scope||window,o);}if(o.form){var _6=Ext.getDom(o.form);_5=_5||_6.action;var _7=_6.getAttribute("enctype");if(o.isUpload||(_7&&_7.toLowerCase()=="multipart/form-data")){return this.doFormUpload(o,p,_5);}var f=Ext.lib.Ajax.serializeForm(_6);p=p?(p+"&"+f):f;}var hs=o.headers;if(this.defaultHeaders){hs=Ext.apply(hs||{},this.defaultHeaders);if(!o.headers){o.headers=hs;}}var cb={success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{options:o},timeout:this.timeout};var _b=o.method||this.method||(p?"POST":"GET");if(_b=="GET"&&(this.disableCaching&&o.disableCaching!==false)||o.disableCaching===true){_5+=(_5.indexOf("?")!=-1?"&":"?")+"_dc="+(new Date().getTime());}if(typeof o.autoAbort=="boolean"){if(o.autoAbort){this.abort();}}else{if(this.autoAbort!==false){this.abort();}}if((_b=="GET"&&p)||o.xmlData){_5+=(_5.indexOf("?")!=-1?"&":"?")+p;p="";}this.transId=Ext.lib.Ajax.request(_b,_5,cb,p,o);return this.transId;}else{Ext.callback(o.callback,o.scope,[o,null,null]);return null;}},isLoading:function(_c){if(_c){return Ext.lib.Ajax.isCallInProgress(_c);}else{return this.transId?true:false;}},abort:function(_d){if(_d||this.isLoading()){Ext.lib.Ajax.abort(_d||this.transId);}},handleResponse:function(_e){this.transId=false;var _f=_e.argument.options;_e.argument=_f?_f.argument:null;this.fireEvent("requestcomplete",this,_e,_f);Ext.callback(_f.success,_f.scope,[_e,_f]);Ext.callback(_f.callback,_f.scope,[_f,true,_e]);},handleFailure:function(_10,e){this.transId=false;var _12=_10.argument.options;_10.argument=_12?_12.argument:null;this.fireEvent("requestexception",this,_10,_12,e);Ext.callback(_12.failure,_12.scope,[_10,_12]);Ext.callback(_12.callback,_12.scope,[_12,false,_10]);},doFormUpload:function(o,ps,url){var id=Ext.id();var _17=document.createElement("iframe");_17.id=id;_17.name=id;_17.className="x-hidden";if(Ext.isIE){_17.src=Ext.SSL_SECURE_URL;}document.body.appendChild(_17);if(Ext.isIE){document.frames[id].name=id;}var _18=Ext.getDom(o.form);_18.target=id;_18.method="POST";_18.enctype=_18.encoding="multipart/form-data";if(url){_18.action=url;}var _19,hd;if(ps){_19=[];ps=Ext.urlDecode(ps,false);for(var k in ps){if(ps.hasOwnProperty(k)){hd=document.createElement("input");hd.type="hidden";hd.name=k;hd.value=ps[k];_18.appendChild(hd);_19.push(hd);}}}function cb(){var r={responseText:"",responseXML:null};r.argument=o?o.argument:null;try{var doc;if(Ext.isIE){doc=_17.contentWindow.document;}else{doc=(_17.contentDocument||window.frames[id].document);}if(doc&&doc.body){r.responseText=doc.body.innerHTML;}if(doc&&doc.XMLDocument){r.responseXML=doc.XMLDocument;}else{r.responseXML=doc;}}catch(e){}Ext.EventManager.removeListener(_17,"load",cb,this);this.fireEvent("requestcomplete",this,r,o);Ext.callback(o.success,o.scope,[r,o]);Ext.callback(o.callback,o.scope,[o,true,r]);setTimeout(function(){document.body.removeChild(_17);},100);}Ext.EventManager.on(_17,"load",cb,this);_18.submit();if(_19){for(var i=0,len=_19.length;i<len;i++){_18.removeChild(_19[i]);}}}});Ext.Ajax=new Ext.data.Connection({autoAbort:false,serializeForm:function(_20){return Ext.lib.Ajax.serializeForm(_20);}});



Ext.UpdateManager=function(el,_2){el=Ext.get(el);if(!_2&&el.updateManager){return el.updateManager;}this.el=el;this.defaultUrl=null;this.addEvents({"beforeupdate":true,"update":true,"failure":true});var d=Ext.UpdateManager.defaults;this.sslBlankUrl=d.sslBlankUrl;this.disableCaching=d.disableCaching;this.indicatorText=d.indicatorText;this.showLoadIndicator=d.showLoadIndicator;this.timeout=d.timeout;this.loadScripts=d.loadScripts;this.transaction=null;this.autoRefreshProcId=null;this.refreshDelegate=this.refresh.createDelegate(this);this.updateDelegate=this.update.createDelegate(this);this.formUpdateDelegate=this.formUpdate.createDelegate(this);this.successDelegate=this.processSuccess.createDelegate(this);this.failureDelegate=this.processFailure.createDelegate(this);if(!this.renderer){this.renderer=new Ext.UpdateManager.BasicRenderer();}Ext.UpdateManager.superclass.constructor.call(this);};Ext.extend(Ext.UpdateManager,Ext.util.Observable,{getEl:function(){return this.el;},update:function(_4,_5,_6,_7){if(this.fireEvent("beforeupdate",this.el,_4,_5)!==false){var _8=this.method,_9;if(typeof _4=="object"){_9=_4;_4=_9.url;_5=_5||_9.params;_6=_6||_9.callback;_7=_7||_9.discardUrl;if(_6&&_9.scope){_6=_6.createDelegate(_9.scope);}if(typeof _9.method!="undefined"){_8=_9.method;}if(typeof _9.nocache!="undefined"){this.disableCaching=_9.nocache;}if(typeof _9.text!="undefined"){this.indicatorText="<div class=\"loading-indicator\">"+_9.text+"</div>";}if(typeof _9.scripts!="undefined"){this.loadScripts=_9.scripts;}if(typeof _9.timeout!="undefined"){this.timeout=_9.timeout;}}this.showLoading();if(!_7){this.defaultUrl=_4;}if(typeof _4=="function"){_4=_4.call(this);}_8=_8||(_5?"POST":"GET");if(_8=="GET"){_4=this.prepareUrl(_4);}var o=Ext.apply(_9||{},{url:_4,params:_5,success:this.successDelegate,failure:this.failureDelegate,callback:undefined,timeout:(this.timeout*1000),argument:{"url":_4,"form":null,"callback":_6,"params":_5}});this.transaction=Ext.Ajax.request(o);}},formUpdate:function(_b,_c,_d,_e){if(this.fireEvent("beforeupdate",this.el,_b,_c)!==false){if(typeof _c=="function"){_c=_c.call(this);}_b=Ext.getDom(_b);this.transaction=Ext.Ajax.request({form:_b,url:_c,success:this.successDelegate,failure:this.failureDelegate,timeout:(this.timeout*1000),argument:{"url":_c,"form":_b,"callback":_e,"reset":_d}});this.showLoading.defer(1,this);}},refresh:function(_f){if(this.defaultUrl==null){return;}this.update(this.defaultUrl,null,_f,true);},startAutoRefresh:function(_10,url,_12,_13,_14){if(_14){this.update(url||this.defaultUrl,_12,_13,true);}if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);}this.autoRefreshProcId=setInterval(this.update.createDelegate(this,[url||this.defaultUrl,_12,_13,true]),_10*1000);},stopAutoRefresh:function(){if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);delete this.autoRefreshProcId;}},isAutoRefreshing:function(){return this.autoRefreshProcId?true:false;},showLoading:function(){if(this.showLoadIndicator){this.el.update(this.indicatorText);}},prepareUrl:function(url){if(this.disableCaching){var _16="_dc="+(new Date().getTime());if(url.indexOf("?")!==-1){url+="&"+_16;}else{url+="?"+_16;}}return url;},processSuccess:function(_17){this.transaction=null;if(_17.argument.form&&_17.argument.reset){try{_17.argument.form.reset();}catch(e){}}if(this.loadScripts){this.renderer.render(this.el,_17,this,this.updateComplete.createDelegate(this,[_17]));}else{this.renderer.render(this.el,_17,this);this.updateComplete(_17);}},updateComplete:function(_18){this.fireEvent("update",this.el,_18);if(typeof _18.argument.callback=="function"){_18.argument.callback(this.el,true,_18);}},processFailure:function(_19){this.transaction=null;this.fireEvent("failure",this.el,_19);if(typeof _19.argument.callback=="function"){_19.argument.callback(this.el,false,_19);}},setRenderer:function(_1a){this.renderer=_1a;},getRenderer:function(){return this.renderer;},setDefaultUrl:function(_1b){this.defaultUrl=_1b;},abort:function(){if(this.transaction){Ext.Ajax.abort(this.transaction);}},isUpdating:function(){if(this.transaction){return Ext.Ajax.isLoading(this.transaction);}return false;}});Ext.UpdateManager.defaults={timeout:30,loadScripts:false,sslBlankUrl:(Ext.SSL_SECURE_URL||"javascript:false"),disableCaching:false,showLoadIndicator:true,indicatorText:"<div class=\"loading-indicator\">Loading...</div>"};Ext.UpdateManager.updateElement=function(el,url,_1e,_1f){var um=Ext.get(el,true).getUpdateManager();Ext.apply(um,_1f);um.update(url,_1e,_1f?_1f.callback:null);};Ext.UpdateManager.update=Ext.UpdateManager.updateElement;Ext.UpdateManager.BasicRenderer=function(){};Ext.UpdateManager.BasicRenderer.prototype={render:function(el,_22,_23,_24){el.update(_22.responseText,_23.loadScripts,_24);}};



Ext.util.DelayedTask=function(fn,_2,_3){var id=null,d,t;var _7=function(){var _8=new Date().getTime();if(_8-t>=d){clearInterval(id);id=null;fn.apply(_2,_3||[]);}};this.delay=function(_9,_a,_b,_c){if(id&&_9!=d){this.cancel();}d=_9;t=new Date().getTime();fn=_a||fn;_2=_b||_2;_3=_c||_3;if(!id){id=setInterval(_7,d);}};this.cancel=function(){if(id){clearInterval(id);id=null;}};};



Ext.util.TaskRunner=function(_1){_1=_1||10;var _2=[],_3=[];var id=0;var _5=false;var _6=function(){_5=false;clearInterval(id);id=0;};var _7=function(){if(!_5){_5=true;id=setInterval(_8,_1);}};var _9=function(_a){_3.push(_a);if(_a.onStop){_a.onStop();}};var _8=function(){if(_3.length>0){for(var i=0,_c=_3.length;i<_c;i++){_2.remove(_3[i]);}_3=[];if(_2.length<1){_6();return;}}var _d=new Date().getTime();for(var i=0,_c=_2.length;i<_c;++i){var t=_2[i];var _f=_d-t.taskRunTime;if(t.interval<=_f){var rt=t.run.apply(t.scope||t,t.args||[++t.taskRunCount]);t.taskRunTime=_d;if(rt===false||t.taskRunCount===t.repeat){_9(t);return;}}if(t.duration&&t.duration<=(_d-t.taskStartTime)){_9(t);}}};this.start=function(_11){_2.push(_11);_11.taskStartTime=new Date().getTime();_11.taskRunTime=0;_11.taskRunCount=0;_7();return _11;};this.stop=function(_12){_9(_12);return _12;};this.stopAll=function(){_6();for(var i=0,len=_2.length;i<len;i++){if(_2[i].onStop){_2[i].onStop();}}_2=[];_3=[];};};Ext.TaskMgr=new Ext.util.TaskRunner();



Ext.util.MixedCollection=function(_1,_2){this.items=[];this.map={};this.keys=[];this.length=0;this.addEvents({"clear":true,"add":true,"replace":true,"remove":true,"sort":true});this.allowFunctions=_1===true;if(_2){this.getKey=_2;}Ext.util.MixedCollection.superclass.constructor.call(this);};Ext.extend(Ext.util.MixedCollection,Ext.util.Observable,{allowFunctions:false,add:function(_3,o){if(arguments.length==1){o=arguments[0];_3=this.getKey(o);}if(typeof _3=="undefined"||_3===null){this.length++;this.items.push(o);this.keys.push(null);}else{var _5=this.map[_3];if(_5){return this.replace(_3,o);}this.length++;this.items.push(o);this.map[_3]=o;this.keys.push(_3);}this.fireEvent("add",this.length-1,o,_3);return o;},getKey:function(o){return o.id;},replace:function(_7,o){if(arguments.length==1){o=arguments[0];_7=this.getKey(o);}var _9=this.item(_7);if(typeof _7=="undefined"||_7===null||typeof _9=="undefined"){return this.add(_7,o);}var _a=this.indexOfKey(_7);this.items[_a]=o;this.map[_7]=o;this.fireEvent("replace",_7,_9,o);return o;},addAll:function(_b){if(arguments.length>1||_b instanceof Array){var _c=arguments.length>1?arguments:_b;for(var i=0,_e=_c.length;i<_e;i++){this.add(_c[i]);}}else{for(var _f in _b){if(this.allowFunctions||typeof _b[_f]!="function"){this.add(_f,_b[_f]);}}}},each:function(fn,_11){var _12=[].concat(this.items);for(var i=0,len=_12.length;i<len;i++){if(fn.call(_11||_12[i],_12[i],i,len)===false){break;}}},eachKey:function(fn,_16){for(var i=0,len=this.keys.length;i<len;i++){fn.call(_16||window,this.keys[i],this.items[i],i,len);}},find:function(fn,_1a){for(var i=0,len=this.items.length;i<len;i++){if(fn.call(_1a||window,this.items[i],this.keys[i])){return this.items[i];}}return null;},insert:function(_1d,key,o){if(arguments.length==2){o=arguments[1];key=this.getKey(o);}if(_1d>=this.length){return this.add(key,o);}this.length++;this.items.splice(_1d,0,o);if(typeof key!="undefined"&&key!=null){this.map[key]=o;}this.keys.splice(_1d,0,key);this.fireEvent("add",_1d,o,key);return o;},remove:function(o){return this.removeAt(this.indexOf(o));},removeAt:function(_21){if(_21<this.length&&_21>=0){this.length--;var o=this.items[_21];this.items.splice(_21,1);var key=this.keys[_21];if(typeof key!="undefined"){delete this.map[key];}this.keys.splice(_21,1);this.fireEvent("remove",o,key);}},removeKey:function(key){return this.removeAt(this.indexOfKey(key));},getCount:function(){return this.length;},indexOf:function(o){if(!this.items.indexOf){for(var i=0,len=this.items.length;i<len;i++){if(this.items[i]==o){return i;}}return-1;}else{return this.items.indexOf(o);}},indexOfKey:function(key){if(!this.keys.indexOf){for(var i=0,len=this.keys.length;i<len;i++){if(this.keys[i]==key){return i;}}return-1;}else{return this.keys.indexOf(key);}},item:function(key){var _2c=typeof this.map[key]!="undefined"?this.map[key]:this.items[key];return typeof _2c!="function"||this.allowFunctions?_2c:null;},itemAt:function(_2d){return this.items[_2d];},key:function(key){return this.map[key];},contains:function(o){return this.indexOf(o)!=-1;},containsKey:function(key){return typeof this.map[key]!="undefined";},clear:function(){this.length=0;this.items=[];this.keys=[];this.map={};this.fireEvent("clear");},first:function(){return this.items[0];},last:function(){return this.items[this.length-1];},_sort:function(_31,dir,fn){var dsc=String(dir).toUpperCase()=="DESC"?-1:1;fn=fn||function(a,b){return a-b;};var c=[],k=this.keys,_39=this.items;for(var i=0,len=_39.length;i<len;i++){c[c.length]={key:k[i],value:_39[i],index:i};}c.sort(function(a,b){var v=fn(a[_31],b[_31])*dsc;if(v==0){v=(a.index<b.index?-1:1);}return v;});for(var i=0,len=c.length;i<len;i++){_39[i]=c[i].value;k[i]=c[i].key;}this.fireEvent("sort",this);},sort:function(dir,fn){this._sort("value",dir,fn);},keySort:function(dir,fn){this._sort("key",dir,fn||function(a,b){return String(a).toUpperCase()-String(b).toUpperCase();});},getRange:function(_45,end){var _47=this.items;if(_47.length<1){return[];}_45=_45||0;end=Math.min(typeof end=="undefined"?this.length-1:end,this.length-1);var r=[];if(_45<=end){for(var i=_45;i<=end;i++){r[r.length]=_47[i];}}else{for(var i=_45;i>=end;i--){r[r.length]=_47[i];}}return r;},filter:function(_4a,_4b){if(!_4b.exec){_4b=String(_4b);if(_4b.length==0){return this.clone();}_4b=new RegExp("^"+Ext.escapeRe(_4b),"i");}return this.filterBy(function(o){return o&&_4b.test(o[_4a]);});},filterBy:function(fn,_4e){var r=new Ext.util.MixedCollection();r.getKey=this.getKey;var k=this.keys,it=this.items;for(var i=0,len=it.length;i<len;i++){if(fn.call(_4e||this,it[i],k[i])){r.add(k[i],it[i]);}}return r;},clone:function(){var r=new Ext.util.MixedCollection();var k=this.keys,it=this.items;for(var i=0,len=it.length;i<len;i++){r.add(k[i],it[i]);}r.getKey=this.getKey;return r;}});Ext.util.MixedCollection.prototype.get=Ext.util.MixedCollection.prototype.item;



Ext.util.JSON=new(function(){var _1={}.hasOwnProperty?true:false;var _2=function(n){return n<10?"0"+n:n;};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};var _5=function(s){if(/["\\\x00-\x1f]/.test(s)){return"\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}c=b.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);})+"\"";}return"\""+s+"\"";};var _a=function(o){var a=["["],b,i,l=o.length,v;for(i=0;i<l;i+=1){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(",");}a.push(v===null?"null":Ext.util.JSON.encode(v));b=true;}}a.push("]");return a.join("");};var _11=function(o){return"\""+o.getFullYear()+"-"+_2(o.getMonth()+1)+"-"+_2(o.getDate())+"T"+_2(o.getHours())+":"+_2(o.getMinutes())+":"+_2(o.getSeconds())+"\"";};this.encode=function(o){if(typeof o=="undefined"||o===null){return"null";}else{if(o instanceof Array){return _a(o);}else{if(o instanceof Date){return _11(o);}else{if(typeof o=="string"){return _5(o);}else{if(typeof o=="number"){return isFinite(o)?String(o):"null";}else{if(typeof o=="boolean"){return String(o);}else{var a=["{"],b,i,v;for(i in o){if(!_1||o.hasOwnProperty(i)){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(",");}a.push(this.encode(i),":",v===null?"null":this.encode(v));b=true;}}}a.push("}");return a.join("");}}}}}}};this.decode=function(_18){return eval("("+_18+")");};})();Ext.encode=Ext.util.JSON.encode;Ext.decode=Ext.util.JSON.decode;



Ext.util.Format=function(){var _1=/^\s+|\s+$/g;return{ellipsis:function(_2,_3){if(_2&&_2.length>_3){return _2.substr(0,_3-3)+"...";}return _2;},undef:function(_4){return typeof _4!="undefined"?_4:"";},htmlEncode:function(_5){return!_5?_5:String(_5).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;");},htmlDecode:function(_6){return!_6?_6:String(_6).replace(/&amp;/g,"&").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,"\"");},trim:function(_7){return String(_7).replace(_1,"");},substr:function(_8,_9,_a){return String(_8).substr(_9,_a);},lowercase:function(_b){return String(_b).toLowerCase();},uppercase:function(_c){return String(_c).toUpperCase();},capitalize:function(_d){return!_d?_d:_d.charAt(0).toUpperCase()+_d.substr(1).toLowerCase();},call:function(_e,fn){if(arguments.length>2){var _10=Array.prototype.slice.call(arguments,2);_10.unshift(_e);return eval(fn).apply(window,_10);}else{return eval(fn).call(window,_e);}},usMoney:function(v){v=(Math.round((v-0)*100))/100;v=(v==Math.floor(v))?v+".00":((v*10==Math.floor(v*10))?v+"0":v);v=String(v);var ps=v.split(".");var _13=ps[0];var sub=ps[1]?"."+ps[1]:".00";var r=/(\d+)(\d{3})/;while(r.test(_13)){_13=_13.replace(r,"$1"+","+"$2");}return"$"+_13+sub;},date:function(v,_17){if(!v){return"";}if(!(v instanceof Date)){v=new Date(Date.parse(v));}return v.dateFormat(_17||"m/d/Y");},dateRenderer:function(_18){return function(v){return Ext.util.Format.date(v,_18);};},stripTagsRE:/<\/?[^>]+>/gi,stripTags:function(v){return!v?v:String(v).replace(this.stripTagsRE,"");}};}();



Ext.MasterTemplate=function(){Ext.MasterTemplate.superclass.constructor.apply(this,arguments);this.originalHtml=this.html;var st={};var m,re=this.subTemplateRe;re.lastIndex=0;var _4=0;while(m=re.exec(this.html)){var _5=m[1],_6=m[2];st[_4]={name:_5,index:_4,buffer:[],tpl:new Ext.Template(_6)};if(_5){st[_5]=st[_4];}st[_4].tpl.compile();st[_4].tpl.call=this.call.createDelegate(this);_4++;}this.subCount=_4;this.subs=st;};Ext.extend(Ext.MasterTemplate,Ext.Template,{subTemplateRe:/<tpl(?:\sname="([\w-]+)")?>((?:.|\n)*?)<\/tpl>/gi,add:function(_7,_8){if(arguments.length==1){_8=arguments[0];_7=0;}var s=this.subs[_7];s.buffer[s.buffer.length]=s.tpl.apply(_8);return this;},fill:function(_a,_b,_c){var a=arguments;if(a.length==1||(a.length==2&&typeof a[1]=="boolean")){_b=a[0];_a=0;_c=a[1];}if(_c){this.reset();}for(var i=0,_f=_b.length;i<_f;i++){this.add(_a,_b[i]);}return this;},reset:function(){var s=this.subs;for(var i=0;i<this.subCount;i++){s[i].buffer=[];}return this;},applyTemplate:function(_12){var s=this.subs;var _14=-1;this.html=this.originalHtml.replace(this.subTemplateRe,function(m,_16){return s[++_14].buffer.join("");});return Ext.MasterTemplate.superclass.applyTemplate.call(this,_12);},apply:function(){return this.applyTemplate.apply(this,arguments);},compile:function(){return this;}});Ext.MasterTemplate.prototype.addAll=Ext.MasterTemplate.prototype.fill;Ext.MasterTemplate.from=function(el,_18){el=Ext.getDom(el);return new Ext.MasterTemplate(el.value||el.innerHTML,_18||"");};



Ext.util.CSS=function(){var _1=null;var _2=document;var _3=/(-[a-z])/gi;var _4=function(m,a){return a.charAt(1).toUpperCase();};return{createStyleSheet:function(_7,id){var ss;var _a=_2.getElementsByTagName("head")[0];var _b=_2.createElement("style");_b.setAttribute("type","text/css");if(id){_b.setAttribute("id",id);}if(Ext.isIE){_a.appendChild(_b);ss=_b.styleSheet;ss.cssText=_7;}else{try{_b.appendChild(_2.createTextNode(_7));}catch(e){_b.cssText=_7;}_a.appendChild(_b);ss=_b.styleSheet?_b.styleSheet:(_b.sheet||_2.styleSheets[_2.styleSheets.length-1]);}this.cacheStyleSheet(ss);return ss;},removeStyleSheet:function(id){var _d=_2.getElementById(id);if(_d){_d.parentNode.removeChild(_d);}},swapStyleSheet:function(id,_f){this.removeStyleSheet(id);var ss=_2.createElement("link");ss.setAttribute("rel","stylesheet");ss.setAttribute("type","text/css");ss.setAttribute("id",id);ss.setAttribute("href",_f);_2.getElementsByTagName("head")[0].appendChild(ss);},refreshCache:function(){return this.getRules(true);},cacheStyleSheet:function(ss){if(!_1){_1={};}try{var _12=ss.cssRules||ss.rules;for(var j=_12.length-1;j>=0;--j){_1[_12[j].selectorText]=_12[j];}}catch(e){}},getRules:function(_14){if(_1==null||_14){_1={};var ds=_2.styleSheets;for(var i=0,len=ds.length;i<len;i++){try{this.cacheStyleSheet(ds[i]);}catch(e){}}}return _1;},getRule:function(_18,_19){var rs=this.getRules(_19);if(!(_18 instanceof Array)){return rs[_18];}for(var i=0;i<_18.length;i++){if(rs[_18[i]]){return rs[_18[i]];}}return null;},updateRule:function(_1c,_1d,_1e){if(!(_1c instanceof Array)){var _1f=this.getRule(_1c);if(_1f){_1f.style[_1d.replace(_3,_4)]=_1e;return true;}}else{for(var i=0;i<_1c.length;i++){if(this.updateRule(_1c[i],_1d,_1e)){return true;}}}return false;}};}();



Ext.util.ClickRepeater=function(el,_2){this.el=Ext.get(el);this.el.unselectable();Ext.apply(this,_2);this.addEvents({"mousedown":true,"click":true,"mouseup":true});this.el.on("mousedown",this.handleMouseDown,this);if(this.preventDefault||this.stopDefault){this.el.on("click",function(e){if(this.preventDefault){e.preventDefault();}if(this.stopDefault){e.stopEvent();}},this);}if(this.handler){this.on("click",this.handler,this.scope||this);}Ext.util.ClickRepeater.superclass.constructor.call(this);};Ext.extend(Ext.util.ClickRepeater,Ext.util.Observable,{interval:20,delay:250,preventDefault:true,stopDefault:false,timer:0,handleMouseDown:function(){clearTimeout(this.timer);this.el.blur();if(this.pressClass){this.el.addClass(this.pressClass);}this.mousedownTime=new Date();Ext.get(document).on("mouseup",this.handleMouseUp,this);this.el.on("mouseout",this.handleMouseOut,this);this.fireEvent("mousedown",this);this.fireEvent("click",this);this.timer=this.click.defer(this.delay||this.interval,this);},click:function(){this.fireEvent("click",this);this.timer=this.click.defer(this.getInterval(),this);},getInterval:function(){if(!this.accelerate){return this.interval;}var _4=this.mousedownTime.getElapsed();if(_4<500){return 400;}else{if(_4<1700){return 320;}else{if(_4<2600){return 250;}else{if(_4<3500){return 180;}else{if(_4<4400){return 140;}else{if(_4<5300){return 80;}else{if(_4<6200){return 50;}else{return 10;}}}}}}}},handleMouseOut:function(){clearTimeout(this.timer);if(this.pressClass){this.el.removeClass(this.pressClass);}this.el.on("mouseover",this.handleMouseReturn,this);},handleMouseReturn:function(){this.el.un("mouseover",this.handleMouseReturn);if(this.pressClass){this.el.addClass(this.pressClass);}this.click();},handleMouseUp:function(){clearTimeout(this.timer);this.el.un("mouseover",this.handleMouseReturn);this.el.un("mouseout",this.handleMouseOut);Ext.get(document).un("mouseup",this.handleMouseUp);this.el.removeClass(this.pressClass);this.fireEvent("mouseup",this);}});



Ext.KeyNav=function(el,_2){this.el=Ext.get(el);Ext.apply(this,_2);if(!this.disabled){this.disabled=true;this.enable();}};Ext.KeyNav.prototype={disabled:false,defaultEventAction:"stopEvent",forceKeyDown:false,prepareEvent:function(e){var k=e.getKey();var h=this.keyToHandler[k];if(Ext.isSafari&&h&&k>=37&&k<=40){e.stopEvent();}},relay:function(e){var k=e.getKey();var h=this.keyToHandler[k];if(h&&this[h]){if(this.doRelay(e,this[h],h)!==true){e[this.defaultEventAction]();}}},doRelay:function(e,h,_b){return h.call(this.scope||this,e);},enter:false,left:false,right:false,up:false,down:false,tab:false,esc:false,pageUp:false,pageDown:false,del:false,home:false,end:false,keyToHandler:{37:"left",39:"right",38:"up",40:"down",33:"pageUp",34:"pageDown",46:"del",36:"home",35:"end",13:"enter",27:"esc",9:"tab"},enable:function(){if(this.disabled){if(this.forceKeyDown||Ext.isIE||Ext.isAir){this.el.on("keydown",this.relay,this);}else{this.el.on("keydown",this.prepareEvent,this);this.el.on("keypress",this.relay,this);}this.disabled=false;}},disable:function(){if(!this.disabled){if(this.forceKeyDown||Ext.isIE||Ext.isAir){this.el.un("keydown",this.relay);}else{this.el.un("keydown",this.prepareEvent);this.el.un("keypress",this.relay);}this.disabled=true;}}};



Ext.KeyMap=function(el,_2,_3){this.el=Ext.get(el);this.eventName=_3||"keydown";this.bindings=[];if(_2){this.addBinding(_2);}this.enable();};Ext.KeyMap.prototype={stopEvent:false,addBinding:function(_4){if(_4 instanceof Array){for(var i=0,_6=_4.length;i<_6;i++){this.addBinding(_4[i]);}return;}var _7=_4.key,_8=_4.shift,_9=_4.ctrl,_a=_4.alt,fn=_4.fn,_c=_4.scope;if(typeof _7=="string"){var ks=[];var _e=_7.toUpperCase();for(var j=0,_6=_e.length;j<_6;j++){ks.push(_e.charCodeAt(j));}_7=ks;}var _10=_7 instanceof Array;var _11=function(e){if((!_8||e.shiftKey)&&(!_9||e.ctrlKey)&&(!_a||e.altKey)){var k=e.getKey();if(_10){for(var i=0,_6=_7.length;i<_6;i++){if(_7[i]==k){if(this.stopEvent){e.stopEvent();}fn.call(_c||window,k,e);return;}}}else{if(k==_7){if(this.stopEvent){e.stopEvent();}fn.call(_c||window,k,e);}}}};this.bindings.push(_11);},on:function(key,fn,_17){var _18,_19,_1a,alt;if(typeof key=="object"&&!(key instanceof Array)){_18=key.key;_19=key.shift;_1a=key.ctrl;alt=key.alt;}else{_18=key;}this.addBinding({key:_18,shift:_19,ctrl:_1a,alt:alt,fn:fn,scope:_17});},handleKeyDown:function(e){if(this.enabled){var b=this.bindings;for(var i=0,len=b.length;i<len;i++){b[i].call(this,e);}}},isEnabled:function(){return this.enabled;},enable:function(){if(!this.enabled){this.el.on(this.eventName,this.handleKeyDown,this);this.enabled=true;}},disable:function(){if(this.enabled){this.el.removeListener(this.eventName,this.handleKeyDown,this);this.enabled=false;}}};



Ext.util.TextMetrics=function(){var _1;return{measure:function(el,_3,_4){if(!_1){_1=Ext.util.TextMetrics.Instance(el,_4);}_1.bind(el);_1.setFixedWidth(_4||"auto");return _1.getSize(_3);},createInstance:function(el,_6){return Ext.util.TextMetrics.Instance(el,_6);}};}();Ext.util.TextMetrics.Instance=function(_7,_8){var ml=new Ext.Element(document.createElement("div"));document.body.appendChild(ml.dom);ml.position("absolute");ml.setLeftTop(-1000,-1000);ml.hide();if(_8){ml.setWidth(_8);}var _a={getSize:function(_b){ml.update(_b);var s=ml.getSize();ml.update("");return s;},bind:function(el){ml.setStyle(Ext.fly(el).getStyles("font-size","font-style","font-weight","font-family","line-height"));},setFixedWidth:function(_e){ml.setWidth(_e);},getWidth:function(_f){ml.dom.style.width="auto";return this.getSize(_f).width;},getHeight:function(_10){return this.getSize(_10).height;}};_a.bind(_7);return _a;};Ext.Element.measureText=Ext.util.TextMetrics.measure;



(function(){var _1=Ext.EventManager;var _2=Ext.lib.Dom;Ext.dd.DragDrop=function(id,_4,_5){if(id){this.init(id,_4,_5);}};Ext.dd.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},defaultPadding:{left:0,right:0,top:0,bottom:0},constrainTo:function(_1d,pad,_1f){if(typeof pad=="number"){pad={left:pad,right:pad,top:pad,bottom:pad};}pad=pad||this.defaultPadding;var b=Ext.get(this.getEl()).getBox();var ce=Ext.get(_1d);var s=ce.getScroll();var c,cd=ce.dom;if(cd==document.body){c={x:s.left,y:s.top,width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()};}else{xy=ce.getXY();c={x:xy[0]+s.left,y:xy[1]+s.top,width:cd.clientWidth,height:cd.clientHeight};}var _25=b.y-c.y;var _26=b.x-c.x;this.resetConstraints();this.setXConstraint(_26-(pad.left||0),c.width-_26-b.width-(pad.right||0));this.setYConstraint(_25-(pad.top||0),c.height-_25-b.height-(pad.bottom||0));},getEl:function(){if(!this._domRef){this._domRef=Ext.getDom(this.id);}return this._domRef;},getDragEl:function(){return Ext.getDom(this.dragElId);},init:function(id,_28,_29){this.initTarget(id,_28,_29);_1.on(this.id,"mousedown",this.handleMouseDown,this);},initTarget:function(id,_2b,_2c){this.config=_2c||{};this.DDM=Ext.dd.DDM;this.groups={};if(typeof id!=="string"){id=Ext.id(id);}this.id=id;this.addToGroup((_2b)?_2b:"default");this.handleElId=id;this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();this.handleOnAvailable();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(_2d,_2e,_2f,_30){if(!_2e&&0!==_2e){this.padding=[_2d,_2d,_2d,_2d];}else{if(!_2f&&0!==_2f){this.padding=[_2d,_2e,_2d,_2e];}else{this.padding=[_2d,_2e,_2f,_30];}}},setInitPosition:function(_31,_32){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}var dx=_31||0;var dy=_32||0;var p=_2.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||_2.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(_39){this.groups[_39]=true;this.DDM.regDragDrop(this,_39);},removeFromGroup:function(_3a){if(this.groups[_3a]){delete this.groups[_3a];}this.DDM.removeDDFromGroup(this,_3a);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Ext.id(id);}this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Ext.id(id);}_1.on(id,"mousedown",this.handleMouseDown,this);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){_1.un(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},destroy:function(){this.unreg();},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){if(this.primaryButtonOnly&&e.button!=0){return;}if(this.isLocked()){return;}this.DDM.refreshCache(this.groups);var pt=new Ext.lib.Point(Ext.lib.Event.getPageX(e),Ext.lib.Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.b4MouseDown(e);this.onMouseDown(e);this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var _42=e.getTarget();return(this.isValidHandleChild(_42)&&(this.id==this.handleElId||this.DDM.handleWasClicked(_42,this.id)));},addInvalidHandleType:function(_43){var _44=_43.toUpperCase();this.invalidHandleTypes[_44]=_44;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Ext.id(id);}this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(_46){this.invalidHandleClasses.push(_46);},removeInvalidHandleType:function(_47){var _48=_47.toUpperCase();delete this.invalidHandleTypes[_48];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Ext.id(id);}delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(_4a){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==_4a){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(_4d){var _4e=true;var _4f;try{_4f=_4d.nodeName.toUpperCase();}catch(e){_4f=_4d.nodeName;}_4e=_4e&&!this.invalidHandleTypes[_4f];_4e=_4e&&!this.invalidHandleIds[_4d.id];for(var i=0,len=this.invalidHandleClasses.length;_4e&&i<len;++i){_4e=!_2.hasClass(_4d,this.invalidHandleClasses[i]);}return _4e;},setXTicks:function(_52,_53){this.xTicks=[];this.xTickSize=_53;var _54={};for(var i=this.initPageX;i>=this.minX;i=i-_53){if(!_54[i]){this.xTicks[this.xTicks.length]=i;_54[i]=true;}}for(i=this.initPageX;i<=this.maxX;i=i+_53){if(!_54[i]){this.xTicks[this.xTicks.length]=i;_54[i]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(_56,_57){this.yTicks=[];this.yTickSize=_57;var _58={};for(var i=this.initPageY;i>=this.minY;i=i-_57){if(!_58[i]){this.yTicks[this.yTicks.length]=i;_58[i]=true;}}for(i=this.initPageY;i<=this.maxY;i=i+_57){if(!_58[i]){this.yTicks[this.yTicks.length]=i;_58[i]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(_5a,_5b,_5c){this.leftConstraint=_5a;this.rightConstraint=_5b;this.minX=this.initPageX-_5a;this.maxX=this.initPageX+_5b;if(_5c){this.setXTicks(this.initPageX,_5c);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,_5e,_5f){this.topConstraint=iUp;this.bottomConstraint=_5e;this.minY=this.initPageY-iUp;this.maxY=this.initPageY+_5e;if(_5f){this.setYTicks(this.initPageY,_5f);}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,_63){if(!_63){return val;}else{if(_63[0]>=val){return _63[0];}else{for(var i=0,len=_63.length;i<len;++i){var _66=i+1;if(_63[_66]&&_63[_66]>=val){var _67=val-_63[i];var _68=_63[_66]-val;return(_68>_67)?_63[i]:_63[_66];}}return _63[_63.length-1];}}},toString:function(){return("DragDrop "+this.id);}};})();if(!Ext.dd.DragDropMgr){Ext.dd.DragDropMgr=function(){var _69=Ext.EventManager;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,mode:0,_execOnAll:function(_6a,_6b){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}oDD[_6a].apply(oDD,_6b);}}},_onLoad:function(){this.init();_69.on(document,"mouseup",this.handleMouseUp,this,true);_69.on(document,"mousemove",this.handleMouseMove,this,true);_69.on(window,"unload",this._onUnload,this,true);_69.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:350,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,_71){if(!this.initialized){this.init();}if(!this.ids[_71]){this.ids[_71]={};}this.ids[_71][oDD.id]=oDD;},removeDDFromGroup:function(oDD,_73){if(!this.ids[_73]){this.ids[_73]={};}var obj=this.ids[_73];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}delete this.handleIds[oDD.id];},regHandle:function(_77,_78){if(!this.handleIds[_77]){this.handleIds[_77]={};}this.handleIds[_77][_78]=_78;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(_7a,_7b){var _7c=[];for(var i in _7a.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}if(!_7b||dd.isTarget){_7c[_7c.length]=dd;}}}return _7c;},isLegalTarget:function(oDD,_80){var _81=this.getRelated(oDD,true);for(var i=0,len=_81.length;i<len;++i){if(_81[i].id==_80.id){return true;}}return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(_85,_86){return(this.handleIds[_85]&&this.handleIds[_85][_86]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}return null;},handleMouseDown:function(e,oDD){if(Ext.QuickTips){Ext.QuickTips.disable();}this.currentTarget=e.getTarget();this.dragCurrent=oDD;var el=oDD.getEl();this.startX=e.getPageX();this.startY=e.getPageY();this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=Ext.dd.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);if(this.dragCurrent){this.dragCurrent.b4StartDrag(x,y);this.dragCurrent.startDrag(x,y);}this.dragThreshMet=true;},handleMouseUp:function(e){if(Ext.QuickTips){Ext.QuickTips.enable();}if(!this.dragCurrent){return;}clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}this.stopDrag(e);this.stopEvent(e);},stopEvent:function(e){if(this.stopPropagation){e.stopPropagation();}if(this.preventDefault){e.preventDefault();}},stopDrag:function(e){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}this.dragCurrent.onMouseUp(e);}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){if(!this.dragCurrent){return true;}if(Ext.isIE&&(e.button!==0&&e.button!==1&&e.button!==2)){this.stopEvent(e);return this.handleMouseUp(e);}if(!this.dragThreshMet){var _93=Math.abs(this.startX-e.getPageX());var _94=Math.abs(this.startY-e.getPageY());if(_93>this.clickPixelThresh||_94>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){this.dragCurrent.b4Drag(e);this.dragCurrent.onDrag(e);if(!this.dragCurrent.moveOnly){this.fireEvents(e,false);}}this.stopEvent(e);return true;},fireEvents:function(e,_96){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}var pt=e.getPoint();var _99=[];var _9a=[];var _9b=[];var _9c=[];var _9d=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}if(!this.isOverTarget(pt,ddo,this.mode)){_9a.push(ddo);}_99[i]=true;delete this.dragOvers[i];}for(var _a0 in dc.groups){if("string"!=typeof _a0){continue;}for(i in this.ids[_a0]){var oDD=this.ids[_a0][i];if(!this.isTypeOfDD(oDD)){continue;}if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode)){if(_96){_9c.push(oDD);}else{if(!_99[oDD.id]){_9d.push(oDD);}else{_9b.push(oDD);}this.dragOvers[oDD.id]=oDD;}}}}}if(this.mode){if(_9a.length){dc.b4DragOut(e,_9a);dc.onDragOut(e,_9a);}if(_9d.length){dc.onDragEnter(e,_9d);}if(_9b.length){dc.b4DragOver(e,_9b);dc.onDragOver(e,_9b);}if(_9c.length){dc.b4DragDrop(e,_9c);dc.onDragDrop(e,_9c);}}else{var len=0;for(i=0,len=_9a.length;i<len;++i){dc.b4DragOut(e,_9a[i].id);dc.onDragOut(e,_9a[i].id);}for(i=0,len=_9d.length;i<len;++i){dc.onDragEnter(e,_9d[i].id);}for(i=0,len=_9b.length;i<len;++i){dc.b4DragOver(e,_9b[i].id);dc.onDragOver(e,_9b[i].id);}for(i=0,len=_9c.length;i<len;++i){dc.b4DragDrop(e,_9c[i].id);dc.onDragDrop(e,_9c[i].id);}}if(_96&&!_9c.length){dc.onInvalidDrop(e);}},getBestMatch:function(dds){var _a4=null;var len=dds.length;if(len==1){_a4=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(dd.cursorIsOver){_a4=dd;break;}else{if(!_a4||_a4.overlap.getArea()<dd.overlap.getArea()){_a4=dd;}}}}return _a4;},refreshCache:function(_a8){for(var _a9 in _a8){if("string"!=typeof _a9){continue;}for(var i in this.ids[_a9]){var oDD=this.ids[_a9][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){if(el){var _ae;if(Ext.isIE){try{_ae=el.offsetParent;}catch(e){}}else{_ae=el.offsetParent;}if(_ae){return true;}}return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=Ext.lib.Dom.getXY(el);}catch(e){}if(!pos){return null;}x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new Ext.lib.Region(t,r,b,l);},isOverTarget:function(pt,_bb,_bc){var loc=this.locationCache[_bb.id];if(!loc||!this.useCache){loc=this.getLocation(_bb);this.locationCache[_bb.id]=loc;}if(!loc){return false;}_bb.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||!dc.getTargetCoord||(!_bc&&!dc.constrainX&&!dc.constrainY)){return _bb.cursorIsOver;}_bb.overlap=null;var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();var _c1=new Ext.lib.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var _c2=_c1.intersect(loc);if(_c2){_bb.overlap=_c2;return(_bc)?true:_bb.cursorIsOver;}else{return false;}},_onUnload:function(e,me){Ext.dd.DragDropMgr.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var _c6=this.elementCache[id];if(!_c6||!_c6.el){_c6=this.elementCache[id]=new this.ElementWrapper(Ext.getDom(id));}return _c6;},getElement:function(id){return Ext.getDom(id);},getCss:function(id){var el=Ext.getDom(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return Ext.lib.Dom.getX(el);},getPosY:function(el){return Ext.lib.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else{if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else{if(db){t=db.scrollTop;l=db.scrollLeft;}else{}}return{top:t,left:l};},getStyle:function(el,_d6){return Ext.fly(el).getStyle(_d6);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(_d7,_d8){var _d9=Ext.lib.Dom.getXY(_d8);Ext.lib.Dom.setXY(_d7,_d9);},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=Ext.dd.DDM;if(Ext.lib.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(_dd,id){if(this.isHandle(id,_dd.id)){return true;}else{var p=_dd.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}return false;}};}();Ext.dd.DDM=Ext.dd.DragDropMgr;Ext.dd.DDM._addListeners();}Ext.dd.DD=function(id,_e1,_e2){if(id){this.init(id,_e1,_e2);}};Ext.extend(Ext.dd.DD,Ext.dd.DragDrop,{scroll:true,autoOffset:function(_e3,_e4){var x=_e3-this.startPageX;var y=_e4-this.startPageY;this.setDelta(x,y);},setDelta:function(_e7,_e8){this.deltaX=_e7;this.deltaY=_e8;},setDragElPos:function(_e9,_ea){var el=this.getDragEl();this.alignElWithMouse(el,_e9,_ea);},alignElWithMouse:function(el,_ed,_ee){var _ef=this.getTargetCoord(_ed,_ee);var fly=el.dom?el:Ext.fly(el);if(!this.deltaSetXY){var _f1=[_ef.x,_ef.y];fly.setXY(_f1);var _f2=fly.getLeft(true);var _f3=fly.getTop(true);this.deltaSetXY=[_f2-_ef.x,_f3-_ef.y];}else{fly.setLeftTop(_ef.x+this.deltaSetXY[0],_ef.y+this.deltaSetXY[1]);}this.cachePosition(_ef.x,_ef.y);this.autoScroll(_ef.x,_ef.y,el.offsetHeight,el.offsetWidth);return _ef;},cachePosition:function(_f4,_f5){if(_f4){this.lastPageX=_f4;this.lastPageY=_f5;}else{var _f6=Ext.lib.Dom.getXY(this.getEl());this.lastPageX=_f6[0];this.lastPageY=_f6[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var _fb=Ext.lib.Dom.getViewWidth();var _fc=Ext.lib.Dom.getViewHeight();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var _100=w+x;var _101=(_fb+st-y-this.deltaY);var _102=(_fc+sl-x-this.deltaX);var _103=40;var _104=(document.all)?80:30;if(bot>_fb&&_101<_103){window.scrollTo(sl,st+_104);}if(y<st&&st>0&&y-st<_103){window.scrollTo(sl,st-_104);}if(_100>_fc&&_102<_103){window.scrollTo(sl+_104,st);}if(x<sl&&sl>0&&x-sl<_103){window.scrollTo(sl-_104,st);}}},getTargetCoord:function(_105,_106){var x=_105-this.deltaX;var y=_106-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}if(x>this.maxX){x=this.maxX;}}if(this.constrainY){if(y<this.minY){y=this.minY;}if(y>this.maxY){y=this.maxY;}}x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},applyConfig:function(){Ext.dd.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.autoOffset(e.getPageX(),e.getPageY());},b4Drag:function(e){this.setDragElPos(e.getPageX(),e.getPageY());},toString:function(){return("DD "+this.id);}});Ext.dd.DDProxy=function(id,_10c,_10d){if(id){this.init(id,_10c,_10d);this.initFrame();}};Ext.dd.DDProxy.dragElId="ygddfdiv";Ext.extend(Ext.dd.DDProxy,Ext.dd.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this;var body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}var div=this.getDragEl();if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){Ext.dd.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||Ext.dd.DDProxy.dragElId);},showFrame:function(_112,_113){var el=this.getEl();var _115=this.getDragEl();var s=_115.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}this.setDragElPos(_112,_113);Ext.fly(_115).show();},_resizeProxy:function(){if(this.resizeFrame){var el=this.getEl();Ext.fly(this.getDragEl()).setSize(el.offsetWidth,el.offsetHeight);}},b4MouseDown:function(e){var x=e.getPageX();var y=e.getPageY();this.autoOffset(x,y);this.setDragElPos(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){Ext.fly(this.getDragEl()).hide();},endDrag:function(e){var lel=this.getEl();var del=this.getDragEl();del.style.visibility="";this.beforeMove();lel.style.visibility="hidden";Ext.dd.DDM.moveToEl(lel,del);del.style.visibility="hidden";lel.style.visibility="";this.afterDrag();},beforeMove:function(){},afterDrag:function(){},toString:function(){return("DDProxy "+this.id);}});Ext.dd.DDTarget=function(id,_122,_123){if(id){this.initTarget(id,_122,_123);}};Ext.extend(Ext.dd.DDTarget,Ext.dd.DragDrop,{toString:function(){return("DDTarget "+this.id);}});



Ext.ComponentMgr=function(){var _1=new Ext.util.MixedCollection();return{register:function(c){_1.add(c);},unregister:function(c){_1.remove(c);},get:function(id){return _1.get(id);},onAvailable:function(id,fn,_7){_1.on("add",function(_8,o){if(o.id==id){fn.call(_7||o,o);_1.un("add",fn,_7);}});}};}();Ext.Component=function(_a){_a=_a||{};if(_a.tagName||_a.dom||typeof _a=="string"){_a={el:_a,id:_a.id||_a};}this.initialConfig=_a;Ext.apply(this,_a);this.addEvents({disable:true,enable:true,beforeshow:true,show:true,beforehide:true,hide:true,beforerender:true,render:true,beforedestroy:true,destroy:true});if(!this.id){this.id="ext-comp-"+(++Ext.Component.AUTO_ID);}Ext.ComponentMgr.register(this);Ext.Component.superclass.constructor.call(this);this.initComponent();if(this.renderTo){this.render(this.renderTo);delete this.renderTo;}};Ext.Component.AUTO_ID=1000;Ext.extend(Ext.Component,Ext.util.Observable,{hidden:false,disabled:false,rendered:false,disabledClass:"x-item-disabled",allowDomMove:true,hideMode:"display",ctype:"Ext.Component",actionMode:"el",getActionEl:function(){return this[this.actionMode];},initComponent:Ext.emptyFn,render:function(_b,_c){if(!this.rendered&&this.fireEvent("beforerender",this)!==false){if(!_b&&this.el){this.el=Ext.get(this.el);_b=this.el.dom.parentNode;this.allowDomMove=false;}this.container=Ext.get(_b);this.rendered=true;if(_c!==undefined){if(typeof _c=="number"){_c=this.container.dom.childNodes[_c];}else{_c=Ext.getDom(_c);}}this.onRender(this.container,_c||null);if(this.cls){this.el.addClass(this.cls);delete this.cls;}if(this.style){this.el.applyStyles(this.style);delete this.style;}this.fireEvent("render",this);this.afterRender(this.container);if(this.hidden){this.hide();}if(this.disabled){this.disable();}}return this;},onRender:function(ct,_e){if(this.el){this.el=Ext.get(this.el);if(this.allowDomMove!==false){ct.dom.insertBefore(this.el.dom,_e);}}},getAutoCreate:function(){var _f=typeof this.autoCreate=="object"?this.autoCreate:Ext.apply({},this.defaultAutoCreate);if(this.id&&!_f.id){_f.id=this.id;}return _f;},afterRender:Ext.emptyFn,destroy:function(){if(this.fireEvent("beforedestroy",this)!==false){this.purgeListeners();this.beforeDestroy();if(this.rendered){this.el.removeAllListeners();this.el.remove();if(this.actionMode=="container"){this.container.remove();}}this.onDestroy();Ext.ComponentMgr.unregister(this);this.fireEvent("destroy",this);}},beforeDestroy:function(){},onDestroy:function(){},getEl:function(){return this.el;},getId:function(){return this.id;},focus:function(_10){if(this.rendered){this.el.focus();if(_10===true){this.el.dom.select();}}return this;},blur:function(){if(this.rendered){this.el.blur();}return this;},disable:function(){if(this.rendered){this.onDisable();}this.disabled=true;this.fireEvent("disable",this);return this;},onDisable:function(){this.getActionEl().addClass(this.disabledClass);this.el.dom.disabled=true;},enable:function(){if(this.rendered){this.onEnable();}this.disabled=false;this.fireEvent("enable",this);return this;},onEnable:function(){this.getActionEl().removeClass(this.disabledClass);this.el.dom.disabled=false;},setDisabled:function(_11){this[_11?"disable":"enable"]();},show:function(){if(this.fireEvent("beforeshow",this)!==false){this.hidden=false;if(this.rendered){this.onShow();}this.fireEvent("show",this);}return this;},onShow:function(){var ae=this.getActionEl();if(this.hideMode=="visibility"){ae.dom.style.visibility="visible";}else{if(this.hideMode=="offsets"){ae.removeClass("x-hidden");}else{ae.dom.style.display="";}}},hide:function(){if(this.fireEvent("beforehide",this)!==false){this.hidden=true;if(this.rendered){this.onHide();}this.fireEvent("hide",this);}return this;},onHide:function(){var ae=this.getActionEl();if(this.hideMode=="visibility"){ae.dom.style.visibility="hidden";}else{if(this.hideMode=="offsets"){ae.addClass("x-hidden");}else{ae.dom.style.display="none";}}},setVisible:function(_14){if(_14){this.show();}else{this.hide();}return this;},isVisible:function(){return this.getActionEl().isVisible();},cloneConfig:function(_15){_15=_15||{};var id=_15.id||Ext.id();var cfg=Ext.applyIf(_15,this.initialConfig);cfg.id=id;return new this.constructor(cfg);}});



(function(){Ext.Layer=function(_1,_2){_1=_1||{};var dh=Ext.DomHelper;var cp=_1.parentEl,_5=cp?Ext.getDom(cp):document.body;if(_2){this.dom=Ext.getDom(_2);}if(!this.dom){var o=_1.dh||{tag:"div",cls:"x-layer"};this.dom=dh.append(_5,o);}if(_1.cls){this.addClass(_1.cls);}this.constrain=_1.constrain!==false;this.visibilityMode=Ext.Element.VISIBILITY;if(_1.id){this.id=this.dom.id=_1.id;}else{this.id=Ext.id(this.dom);}this.zindex=_1.zindex||this.getZIndex();this.position("absolute",this.zindex);if(_1.shadow){this.shadowOffset=_1.shadowOffset||4;this.shadow=new Ext.Shadow({offset:this.shadowOffset,mode:_1.shadow});}else{this.shadowOffset=0;}this.useShim=_1.shim!==false&&Ext.useShims;this.useDisplay=_1.useDisplay;this.hide();};var _7=Ext.Element.prototype;var _8=[];Ext.extend(Ext.Layer,Ext.Element,{getZIndex:function(){return this.zindex||parseInt(this.getStyle("z-index"),10)||11000;},getShim:function(){if(!this.useShim){return null;}if(this.shim){return this.shim;}var _9=_8.shift();if(!_9){_9=this.createShim();_9.enableDisplayMode("block");_9.dom.style.display="none";_9.dom.style.visibility="visible";}var pn=this.dom.parentNode;if(_9.dom.parentNode!=pn){pn.insertBefore(_9.dom,this.dom);}_9.setStyle("z-index",this.getZIndex()-2);this.shim=_9;return _9;},hideShim:function(){if(this.shim){this.shim.setDisplayed(false);_8.push(this.shim);delete this.shim;}},disableShadow:function(){if(this.shadow){this.shadowDisabled=true;this.shadow.hide();this.lastShadowOffset=this.shadowOffset;this.shadowOffset=0;}},enableShadow:function(_b){if(this.shadow){this.shadowDisabled=false;this.shadowOffset=this.lastShadowOffset;delete this.lastShadowOffset;if(_b){this.sync(true);}}},sync:function(_c){var sw=this.shadow;if(!this.updating&&this.isVisible()&&(sw||this.useShim)){var sh=this.getShim();var w=this.getWidth(),h=this.getHeight();var l=this.getLeft(true),t=this.getTop(true);if(sw&&!this.shadowDisabled){if(_c&&!sw.isVisible()){sw.show(this);}else{sw.realign(l,t,w,h);}if(sh){if(_c){sh.show();}var a=sw.adjusts,s=sh.dom.style;s.left=(Math.min(l,l+a.l))+"px";s.top=(Math.min(t,t+a.t))+"px";s.width=(w+a.w)+"px";s.height=(h+a.h)+"px";}}else{if(sh){if(_c){sh.show();}sh.setSize(w,h);sh.setLeftTop(l,t);}}}},destroy:function(){this.hideShim();if(this.shadow){this.shadow.hide();}this.removeAllListeners();var pn=this.dom.parentNode;if(pn){pn.removeChild(this.dom);}Ext.Element.uncache(this.id);},remove:function(){this.destroy();},beginUpdate:function(){this.updating=true;},endUpdate:function(){this.updating=false;this.sync(true);},hideUnders:function(_16){if(this.shadow){this.shadow.hide();}this.hideShim();},constrainXY:function(){if(this.constrain){var vw=Ext.lib.Dom.getViewWidth(),vh=Ext.lib.Dom.getViewHeight();var s=Ext.get(document).getScroll();var xy=this.getXY();var x=xy[0],y=xy[1];var w=this.dom.offsetWidth+this.shadowOffset,h=this.dom.offsetHeight+this.shadowOffset;var _1f=false;if((x+w)>vw+s.left){x=vw-w-this.shadowOffset;_1f=true;}if((y+h)>vh+s.top){y=vh-h-this.shadowOffset;_1f=true;}if(x<s.left){x=s.left;_1f=true;}if(y<s.top){y=s.top;_1f=true;}if(_1f){if(this.avoidY){var ay=this.avoidY;if(y<=ay&&(y+h)>=ay){y=ay-h-5;}}xy=[x,y];this.storeXY(xy);_7.setXY.call(this,xy);this.sync();}}},isVisible:function(){return this.visible;},showAction:function(){this.visible=true;if(this.useDisplay===true){this.setDisplayed("");}else{if(this.lastXY){_7.setXY.call(this,this.lastXY);}else{if(this.lastLT){_7.setLeftTop.call(this,this.lastLT[0],this.lastLT[1]);}}}},hideAction:function(){this.visible=false;if(this.useDisplay===true){this.setDisplayed(false);}else{this.setLeftTop(-10000,-10000);}},setVisible:function(v,a,d,c,e){if(v){this.showAction();}if(a&&v){var cb=function(){this.sync(true);if(c){c();}}.createDelegate(this);_7.setVisible.call(this,true,true,d,cb,e);}else{if(!v){this.hideUnders(true);}var cb=c;if(a){cb=function(){this.hideAction();if(c){c();}}.createDelegate(this);}_7.setVisible.call(this,v,a,d,cb,e);if(v){this.sync(true);}else{if(!a){this.hideAction();}}}},storeXY:function(xy){delete this.lastLT;this.lastXY=xy;},storeLeftTop:function(_28,top){delete this.lastXY;this.lastLT=[_28,top];},beforeFx:function(){this.beforeAction();return Ext.Layer.superclass.beforeFx.apply(this,arguments);},afterFx:function(){Ext.Layer.superclass.afterFx.apply(this,arguments);this.sync(this.isVisible());},beforeAction:function(){if(!this.updating&&this.shadow){this.shadow.hide();}},setLeft:function(_2a){this.storeLeftTop(_2a,this.getTop(true));_7.setLeft.apply(this,arguments);this.sync();},setTop:function(top){this.storeLeftTop(this.getLeft(true),top);_7.setTop.apply(this,arguments);this.sync();},setLeftTop:function(_2c,top){this.storeLeftTop(_2c,top);_7.setLeftTop.apply(this,arguments);this.sync();},setXY:function(xy,a,d,c,e){this.fixDisplay();this.beforeAction();this.storeXY(xy);var cb=this.createCB(c);_7.setXY.call(this,xy,a,d,cb,e);if(!a){cb();}},createCB:function(c){var el=this;return function(){el.constrainXY();el.sync(true);if(c){c();}};},setX:function(x,a,d,c,e){this.setXY([x,this.getY()],a,d,c,e);},setY:function(y,a,d,c,e){this.setXY([this.getX(),y],a,d,c,e);},setSize:function(w,h,a,d,c,e){this.beforeAction();var cb=this.createCB(c);_7.setSize.call(this,w,h,a,d,cb,e);if(!a){cb();}},setWidth:function(w,a,d,c,e){this.beforeAction();var cb=this.createCB(c);_7.setWidth.call(this,w,a,d,cb,e);if(!a){cb();}},setHeight:function(h,a,d,c,e){this.beforeAction();var cb=this.createCB(c);_7.setHeight.call(this,h,a,d,cb,e);if(!a){cb();}},setBounds:function(x,y,w,h,a,d,c,e){this.beforeAction();var cb=this.createCB(c);if(!a){this.storeXY([x,y]);_7.setXY.call(this,[x,y]);_7.setSize.call(this,w,h,a,d,cb,e);cb();}else{_7.setBounds.call(this,x,y,w,h,a,d,cb,e);}return this;},setZIndex:function(_5c){this.zindex=_5c;this.setStyle("z-index",_5c+2);if(this.shadow){this.shadow.setZIndex(_5c+1);}if(this.shim){this.shim.setStyle("z-index",_5c);}}});})();



Ext.Shadow=function(_1){Ext.apply(this,_1);if(typeof this.mode!="string"){this.mode=this.defaultMode;}var o=this.offset,a={h:0};var _4=Math.floor(this.offset/2);switch(this.mode.toLowerCase()){case"drop":a.w=0;a.l=a.t=o;a.t-=1;if(Ext.isIE){a.l-=this.offset+_4;a.t-=this.offset+_4;a.w-=_4;a.h-=_4;a.t+=1;}break;case"sides":a.w=(o*2);a.l=-o;a.t=o-1;if(Ext.isIE){a.l-=(this.offset-_4);a.t-=this.offset+_4;a.l+=1;a.w-=(this.offset-_4)*2;a.w-=_4+1;a.h-=1;}break;case"frame":a.w=a.h=(o*2);a.l=a.t=-o;a.t+=1;a.h-=2;if(Ext.isIE){a.l-=(this.offset-_4);a.t-=(this.offset-_4);a.l+=1;a.w-=(this.offset+_4+1);a.h-=(this.offset+_4);a.h+=1;}break;}this.adjusts=a;};Ext.Shadow.prototype={offset:4,defaultMode:"drop",show:function(_5){_5=Ext.get(_5);if(!this.el){this.el=Ext.Shadow.Pool.pull();if(this.el.dom.nextSibling!=_5.dom){this.el.insertBefore(_5);}}this.el.setStyle("z-index",this.zIndex||parseInt(_5.getStyle("z-index"),10)-1);if(Ext.isIE){this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")";}this.realign(_5.getLeft(true),_5.getTop(true),_5.getWidth(),_5.getHeight());this.el.dom.style.display="block";},isVisible:function(){return this.el?true:false;},realign:function(l,t,w,h){if(!this.el){return;}var a=this.adjusts,d=this.el.dom,s=d.style;var _d=0;s.left=(l+a.l)+"px";s.top=(t+a.t)+"px";var sw=(w+a.w),sh=(h+a.h),sws=sw+"px",shs=sh+"px";if(s.width!=sws||s.height!=shs){s.width=sws;s.height=shs;if(!Ext.isIE){var cn=d.childNodes;var sww=Math.max(0,(sw-12))+"px";cn[0].childNodes[1].style.width=sww;cn[1].childNodes[1].style.width=sww;cn[2].childNodes[1].style.width=sww;cn[1].style.height=Math.max(0,(sh-12))+"px";}}},hide:function(){if(this.el){this.el.dom.style.display="none";Ext.Shadow.Pool.push(this.el);delete this.el;}},setZIndex:function(z){this.zIndex=z;if(this.el){this.el.setStyle("z-index",z);}}};Ext.Shadow.Pool=function(){var p=[];var _16=Ext.isIE?"<div class=\"x-ie-shadow\"></div>":"<div class=\"x-shadow\"><div class=\"xst\"><div class=\"xstl\"></div><div class=\"xstc\"></div><div class=\"xstr\"></div></div><div class=\"xsc\"><div class=\"xsml\"></div><div class=\"xsmc\"></div><div class=\"xsmr\"></div></div><div class=\"xsb\"><div class=\"xsbl\"></div><div class=\"xsbc\"></div><div class=\"xsbr\"></div></div></div>";return{pull:function(){var sh=p.shift();if(!sh){sh=Ext.get(Ext.DomHelper.insertHtml("beforeBegin",document.body.firstChild,_16));sh.autoBoxAdjust=false;}return sh;},push:function(sh){p.push(sh);}};}();



Ext.BoxComponent=function(_1){Ext.BoxComponent.superclass.constructor.call(this,_1);this.addEvents({resize:true,move:true});};Ext.extend(Ext.BoxComponent,Ext.Component,{boxReady:false,deferHeight:false,setSize:function(w,h){if(typeof w=="object"){h=w.height;w=w.width;}if(!this.boxReady){this.width=w;this.height=h;return this;}if(this.lastSize&&this.lastSize.width==w&&this.lastSize.height==h){return this;}this.lastSize={width:w,height:h};var _4=this.adjustSize(w,h);var aw=_4.width,ah=_4.height;if(aw!==undefined||ah!==undefined){var rz=this.getResizeEl();if(!this.deferHeight&&aw!==undefined&&ah!==undefined){rz.setSize(aw,ah);}else{if(!this.deferHeight&&ah!==undefined){rz.setHeight(ah);}else{if(aw!==undefined){rz.setWidth(aw);}}}this.onResize(aw,ah,w,h);this.fireEvent("resize",this,aw,ah,w,h);}return this;},getSize:function(){return this.el.getSize();},getPosition:function(_8){if(_8===true){return[this.el.getLeft(true),this.el.getTop(true)];}return this.xy||this.el.getXY();},getBox:function(_9){var s=this.el.getSize();if(_9){s.x=this.el.getLeft(true);s.y=this.el.getTop(true);}else{var xy=this.xy||this.el.getXY();s.x=xy[0];s.y=xy[1];}return s;},updateBox:function(_c){this.setSize(_c.width,_c.height);this.setPagePosition(_c.x,_c.y);return this;},getResizeEl:function(){return this.resizeEl||this.el;},getPositionEl:function(){return this.positionEl||this.el;},setPosition:function(x,y){this.x=x;this.y=y;if(!this.boxReady){return this;}var _f=this.adjustPosition(x,y);var ax=_f.x,ay=_f.y;var el=this.getPositionEl();if(ax!==undefined||ay!==undefined){if(ax!==undefined&&ay!==undefined){el.setLeftTop(ax,ay);}else{if(ax!==undefined){el.setLeft(ax);}else{if(ay!==undefined){el.setTop(ay);}}}this.onPosition(ax,ay);this.fireEvent("move",this,ax,ay);}return this;},setPagePosition:function(x,y){this.pageX=x;this.pageY=y;if(!this.boxReady){return;}if(x===undefined||y===undefined){return;}var p=this.el.translatePoints(x,y);this.setPosition(p.left,p.top);return this;},onRender:function(ct,_17){Ext.BoxComponent.superclass.onRender.call(this,ct,_17);if(this.resizeEl){this.resizeEl=Ext.get(this.resizeEl);}if(this.positionEl){this.positionEl=Ext.get(this.positionEl);}},afterRender:function(){Ext.BoxComponent.superclass.afterRender.call(this);this.boxReady=true;this.setSize(this.width,this.height);if(this.x||this.y){this.setPosition(this.x,this.y);}if(this.pageX||this.pageY){this.setPagePosition(this.pageX,this.pageY);}},syncSize:function(){this.setSize(this.el.getWidth(),this.el.getHeight());return this;},onResize:function(_18,_19,_1a,_1b){},onPosition:function(x,y){},adjustSize:function(w,h){if(this.autoWidth){w="auto";}if(this.autoHeight){h="auto";}return{width:w,height:h};},adjustPosition:function(x,y){return{x:x,y:y};}});



Ext.SplitBar=function(_1,_2,_3,_4,_5){this.el=Ext.get(_1,true);this.el.dom.unselectable="on";this.resizingEl=Ext.get(_2,true);this.orientation=_3||Ext.SplitBar.HORIZONTAL;this.minSize=0;this.maxSize=2000;this.animate=false;this.useShim=false;this.shim=null;if(!_5){this.proxy=Ext.SplitBar.createProxy(this.orientation);}else{this.proxy=Ext.get(_5).dom;}this.dd=new Ext.dd.DDProxy(this.el.dom.id,"XSplitBars",{dragElId:this.proxy.id});this.dd.b4StartDrag=this.onStartProxyDrag.createDelegate(this);this.dd.endDrag=this.onEndProxyDrag.createDelegate(this);this.dragSpecs={};this.adapter=new Ext.SplitBar.BasicLayoutAdapter();this.adapter.init(this);if(this.orientation==Ext.SplitBar.HORIZONTAL){this.placement=_4||(this.el.getX()>this.resizingEl.getX()?Ext.SplitBar.LEFT:Ext.SplitBar.RIGHT);this.el.addClass("x-splitbar-h");}else{this.placement=_4||(this.el.getY()>this.resizingEl.getY()?Ext.SplitBar.TOP:Ext.SplitBar.BOTTOM);this.el.addClass("x-splitbar-v");}this.addEvents({"resize":true,"moved":true,"beforeresize":true,"beforeapply":true});Ext.SplitBar.superclass.constructor.call(this);};Ext.extend(Ext.SplitBar,Ext.util.Observable,{onStartProxyDrag:function(x,y){this.fireEvent("beforeresize",this);if(!this.overlay){var o=Ext.DomHelper.insertFirst(document.body,{cls:"x-drag-overlay",html:"&#160;"},true);o.unselectable();o.enableDisplayMode("block");Ext.SplitBar.prototype.overlay=o;}this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));this.overlay.show();Ext.get(this.proxy).setDisplayed("block");var _9=this.adapter.getElementSize(this);this.activeMinSize=this.getMinimumSize();this.activeMaxSize=this.getMaximumSize();var c1=_9-this.activeMinSize;var c2=Math.max(this.activeMaxSize-_9,0);if(this.orientation==Ext.SplitBar.HORIZONTAL){this.dd.resetConstraints();this.dd.setXConstraint(this.placement==Ext.SplitBar.LEFT?c1:c2,this.placement==Ext.SplitBar.LEFT?c2:c1);this.dd.setYConstraint(0,0);}else{this.dd.resetConstraints();this.dd.setXConstraint(0,0);this.dd.setYConstraint(this.placement==Ext.SplitBar.TOP?c1:c2,this.placement==Ext.SplitBar.TOP?c2:c1);}this.dragSpecs.startSize=_9;this.dragSpecs.startPoint=[x,y];Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd,x,y);},onEndProxyDrag:function(e){Ext.get(this.proxy).setDisplayed(false);var _d=Ext.lib.Event.getXY(e);if(this.overlay){this.overlay.hide();}var _e;if(this.orientation==Ext.SplitBar.HORIZONTAL){_e=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.LEFT?_d[0]-this.dragSpecs.startPoint[0]:this.dragSpecs.startPoint[0]-_d[0]);}else{_e=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.TOP?_d[1]-this.dragSpecs.startPoint[1]:this.dragSpecs.startPoint[1]-_d[1]);}_e=Math.min(Math.max(_e,this.activeMinSize),this.activeMaxSize);if(_e!=this.dragSpecs.startSize){if(this.fireEvent("beforeapply",this,_e)!==false){this.adapter.setElementSize(this,_e);this.fireEvent("moved",this,_e);this.fireEvent("resize",this,_e);}}},getAdapter:function(){return this.adapter;},setAdapter:function(_f){this.adapter=_f;this.adapter.init(this);},getMinimumSize:function(){return this.minSize;},setMinimumSize:function(_10){this.minSize=_10;},getMaximumSize:function(){return this.maxSize;},setMaximumSize:function(_11){this.maxSize=_11;},setCurrentSize:function(_12){var _13=this.animate;this.animate=false;this.adapter.setElementSize(this,_12);this.animate=_13;},destroy:function(_14){if(this.shim){this.shim.remove();}this.dd.unreg();this.proxy.parentNode.removeChild(this.proxy);if(_14){this.el.remove();}}});Ext.SplitBar.createProxy=function(dir){var _16=new Ext.Element(document.createElement("div"));_16.unselectable();var cls="x-splitbar-proxy";_16.addClass(cls+" "+(dir==Ext.SplitBar.HORIZONTAL?cls+"-h":cls+"-v"));document.body.appendChild(_16.dom);return _16.dom;};Ext.SplitBar.BasicLayoutAdapter=function(){};Ext.SplitBar.BasicLayoutAdapter.prototype={init:function(s){},getElementSize:function(s){if(s.orientation==Ext.SplitBar.HORIZONTAL){return s.resizingEl.getWidth();}else{return s.resizingEl.getHeight();}},setElementSize:function(s,_1b,_1c){if(s.orientation==Ext.SplitBar.HORIZONTAL){if(!s.animate){s.resizingEl.setWidth(_1b);if(_1c){_1c(s,_1b);}}else{s.resizingEl.setWidth(_1b,true,0.1,_1c,"easeOut");}}else{if(!s.animate){s.resizingEl.setHeight(_1b);if(_1c){_1c(s,_1b);}}else{s.resizingEl.setHeight(_1b,true,0.1,_1c,"easeOut");}}}};Ext.SplitBar.AbsoluteLayoutAdapter=function(_1d){this.basic=new Ext.SplitBar.BasicLayoutAdapter();this.container=Ext.get(_1d);};Ext.SplitBar.AbsoluteLayoutAdapter.prototype={init:function(s){this.basic.init(s);},getElementSize:function(s){return this.basic.getElementSize(s);},setElementSize:function(s,_21,_22){this.basic.setElementSize(s,_21,this.moveSplitter.createDelegate(this,[s]));},moveSplitter:function(s){var yes=Ext.SplitBar;switch(s.placement){case yes.LEFT:s.el.setX(s.resizingEl.getRight());break;case yes.RIGHT:s.el.setStyle("right",(this.container.getWidth()-s.resizingEl.getLeft())+"px");break;case yes.TOP:s.el.setY(s.resizingEl.getBottom());break;case yes.BOTTOM:s.el.setY(s.resizingEl.getTop()-s.el.getHeight());break;}}};Ext.SplitBar.VERTICAL=1;Ext.SplitBar.HORIZONTAL=2;Ext.SplitBar.LEFT=1;Ext.SplitBar.RIGHT=2;Ext.SplitBar.TOP=3;Ext.SplitBar.BOTTOM=4;



Ext.ColorPalette=function(_1){Ext.ColorPalette.superclass.constructor.call(this,_1);this.addEvents({select:true});if(this.handler){this.on("select",this.handler,this.scope,true);}};Ext.extend(Ext.ColorPalette,Ext.Component,{itemCls:"x-color-palette",value:null,clickEvent:"click",ctype:"Ext.ColorPalette",allowReselect:false,colors:["000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","969696","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","FFFFFF"],onRender:function(_2,_3){var t=new Ext.MasterTemplate("<tpl><a href=\"#\" class=\"color-{0}\" hidefocus=\"on\"><em><span style=\"background:#{0}\" unselectable=\"on\">&#160;</span></em></a></tpl>");var c=this.colors;for(var i=0,_7=c.length;i<_7;i++){t.add([c[i]]);}var el=document.createElement("div");el.className=this.itemCls;t.overwrite(el);_2.dom.insertBefore(el,_3);this.el=Ext.get(el);this.el.on(this.clickEvent,this.handleClick,this,{delegate:"a"});if(this.clickEvent!="click"){this.el.on("click",Ext.emptyFn,this,{delegate:"a",preventDefault:true});}},afterRender:function(){Ext.ColorPalette.superclass.afterRender.call(this);if(this.value){var s=this.value;this.value=null;this.select(s);}},handleClick:function(e,t){e.preventDefault();if(!this.disabled){var c=t.className.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];this.select(c.toUpperCase());}},select:function(_d){_d=_d.replace("#","");if(_d!=this.value||this.allowReselect){var el=this.el;if(this.value){el.child("a.color-"+this.value).removeClass("x-color-palette-sel");}el.child("a.color-"+_d).addClass("x-color-palette-sel");this.value=_d;this.fireEvent("select",this,_d);}}});



Ext.TabPanel=function(_1,_2){this.el=Ext.get(_1,true);if(_2){if(typeof _2=="boolean"){this.tabPosition=_2?"bottom":"top";}else{Ext.apply(this,_2);}}if(this.tabPosition=="bottom"){this.bodyEl=Ext.get(this.createBody(this.el.dom));this.el.addClass("x-tabs-bottom");}this.stripWrap=Ext.get(this.createStrip(this.el.dom),true);this.stripEl=Ext.get(this.createStripList(this.stripWrap.dom),true);this.stripBody=Ext.get(this.stripWrap.dom.firstChild.firstChild,true);if(Ext.isIE){Ext.fly(this.stripWrap.dom.firstChild).setStyle("overflow-x","hidden");}if(this.tabPosition!="bottom"){this.bodyEl=Ext.get(this.createBody(this.el.dom));this.el.addClass("x-tabs-top");}this.items=[];this.bodyEl.setStyle("position","relative");this.active=null;this.activateDelegate=this.activate.createDelegate(this);this.addEvents({"tabchange":true,"beforetabchange":true});Ext.EventManager.onWindowResize(this.onResize,this);this.cpad=this.el.getPadding("lr");this.hiddenCount=0;Ext.TabPanel.superclass.constructor.call(this);};Ext.extend(Ext.TabPanel,Ext.util.Observable,{tabPosition:"top",currentTabWidth:0,minTabWidth:40,maxTabWidth:250,preferredTabWidth:175,resizeTabs:false,monitorResize:true,addTab:function(id,_4,_5,_6){var _7=new Ext.TabPanelItem(this,id,_4,_6);this.addTabItem(_7);if(_5){_7.setContent(_5);}return _7;},getTab:function(id){return this.items[id];},hideTab:function(id){var t=this.items[id];if(!t.isHidden()){t.setHidden(true);this.hiddenCount++;this.autoSizeTabs();}},unhideTab:function(id){var t=this.items[id];if(t.isHidden()){t.setHidden(false);this.hiddenCount--;this.autoSizeTabs();}},addTabItem:function(_d){this.items[_d.id]=_d;this.items.push(_d);if(this.resizeTabs){_d.setWidth(this.currentTabWidth||this.preferredTabWidth);this.autoSizeTabs();}else{_d.autoSize();}},removeTab:function(id){var _f=this.items;var tab=_f[id];if(!tab){return;}var _11=_f.indexOf(tab);if(this.active==tab&&_f.length>1){var _12=this.getNextAvailable(_11);if(_12){_12.activate();}}this.stripEl.dom.removeChild(tab.pnode.dom);if(tab.bodyEl.dom.parentNode==this.bodyEl.dom){this.bodyEl.dom.removeChild(tab.bodyEl.dom);}_f.splice(_11,1);delete this.items[tab.id];tab.fireEvent("close",tab);tab.purgeListeners();this.autoSizeTabs();},getNextAvailable:function(_13){var _14=this.items;var _15=_13;while(_15<_14.length){var _16=_14[++_15];if(_16&&!_16.isHidden()){return _16;}}_15=_13;while(_15>=0){var _16=_14[--_15];if(_16&&!_16.isHidden()){return _16;}}return null;},disableTab:function(id){var tab=this.items[id];if(tab&&this.active!=tab){tab.disable();}},enableTab:function(id){var tab=this.items[id];tab.enable();},activate:function(id){var tab=this.items[id];if(!tab){return null;}if(tab==this.active||tab.disabled){return tab;}var e={};this.fireEvent("beforetabchange",this,e,tab);if(e.cancel!==true&&!tab.disabled){if(this.active){this.active.hide();}this.active=this.items[id];this.active.show();this.fireEvent("tabchange",this,this.active);}return tab;},getActiveTab:function(){return this.active;},syncHeight:function(_1e){var _1f=(_1e||this.el.getHeight())-this.el.getBorderWidth("tb")-this.el.getPadding("tb");var bm=this.bodyEl.getMargins();var _21=_1f-(this.stripWrap.getHeight()||0)-(bm.top+bm.bottom);this.bodyEl.setHeight(_21);return _21;},onResize:function(){if(this.monitorResize){this.autoSizeTabs();}},beginUpdate:function(){this.updating=true;},endUpdate:function(){this.updating=false;this.autoSizeTabs();},autoSizeTabs:function(){var _22=this.items.length;var _23=_22-this.hiddenCount;if(!this.resizeTabs||_22<1||_23<1||this.updating){return;}var w=Math.max(this.el.getWidth()-this.cpad,10);var _25=Math.floor(w/_23);var b=this.stripBody;if(b.getWidth()>w){var _27=this.items;this.setTabWidth(Math.max(_25,this.minTabWidth)-2);if(_25<this.minTabWidth){}}else{if(this.currentTabWidth<this.preferredTabWidth){this.setTabWidth(Math.min(_25,this.preferredTabWidth)-2);}}},getCount:function(){return this.items.length;},setTabWidth:function(_28){this.currentTabWidth=_28;for(var i=0,len=this.items.length;i<len;i++){if(!this.items[i].isHidden()){this.items[i].setWidth(_28);}}},destroy:function(_2b){Ext.EventManager.removeResizeListener(this.onResize,this);for(var i=0,len=this.items.length;i<len;i++){this.items[i].purgeListeners();}if(_2b===true){this.el.update("");this.el.remove();}}});Ext.TabPanelItem=function(_2e,id,_30,_31){this.tabPanel=_2e;this.id=id;this.disabled=false;this.text=_30;this.loaded=false;this.closable=_31;this.bodyEl=Ext.get(_2e.createItemBody(_2e.bodyEl.dom,id));this.bodyEl.setVisibilityMode(Ext.Element.VISIBILITY);this.bodyEl.setStyle("display","block");this.bodyEl.setStyle("zoom","1");this.hideAction();var els=_2e.createStripElements(_2e.stripEl.dom,_30,_31);this.el=Ext.get(els.el,true);this.inner=Ext.get(els.inner,true);this.textEl=Ext.get(this.el.dom.firstChild.firstChild.firstChild,true);this.pnode=Ext.get(els.el.parentNode,true);this.el.on("mousedown",this.onTabMouseDown,this);this.el.on("click",this.onTabClick,this);if(_31){var c=Ext.get(els.close,true);c.dom.title=this.closeText;c.addClassOnOver("close-over");c.on("click",this.closeClick,this);}this.addEvents({"activate":true,"beforeclose":true,"close":true,"deactivate":true});this.hidden=false;Ext.TabPanelItem.superclass.constructor.call(this);};Ext.extend(Ext.TabPanelItem,Ext.util.Observable,{purgeListeners:function(){Ext.util.Observable.prototype.purgeListeners.call(this);this.el.removeAllListeners();},show:function(){this.pnode.addClass("on");this.showAction();if(Ext.isOpera){this.tabPanel.stripWrap.repaint();}this.fireEvent("activate",this.tabPanel,this);},isActive:function(){return this.tabPanel.getActiveTab()==this;},hide:function(){this.pnode.removeClass("on");this.hideAction();this.fireEvent("deactivate",this.tabPanel,this);},hideAction:function(){this.bodyEl.hide();this.bodyEl.setStyle("position","absolute");this.bodyEl.setLeft("-20000px");this.bodyEl.setTop("-20000px");},showAction:function(){this.bodyEl.setStyle("position","relative");this.bodyEl.setTop("");this.bodyEl.setLeft("");this.bodyEl.show();},setTooltip:function(_34){if(Ext.QuickTips&&Ext.QuickTips.isEnabled()){this.textEl.dom.qtip=_34;this.textEl.dom.removeAttribute("title");}else{this.textEl.dom.title=_34;}},onTabClick:function(e){e.preventDefault();this.tabPanel.activate(this.id);},onTabMouseDown:function(e){e.preventDefault();this.tabPanel.activate(this.id);},getWidth:function(){return this.inner.getWidth();},setWidth:function(_37){var _38=_37-this.pnode.getPadding("lr");this.inner.setWidth(_38);this.textEl.setWidth(_38-this.inner.getPadding("lr"));this.pnode.setWidth(_37);},setHidden:function(_39){this.hidden=_39;this.pnode.setStyle("display",_39?"none":"");},isHidden:function(){return this.hidden;},getText:function(){return this.text;},autoSize:function(){this.textEl.setWidth(1);this.setWidth(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr"));},setText:function(_3a){this.text=_3a;this.textEl.update(_3a);this.setTooltip(_3a);if(!this.tabPanel.resizeTabs){this.autoSize();}},activate:function(){this.tabPanel.activate(this.id);},disable:function(){if(this.tabPanel.active!=this){this.disabled=true;this.pnode.addClass("disabled");}},enable:function(){this.disabled=false;this.pnode.removeClass("disabled");},setContent:function(_3b,_3c){this.bodyEl.update(_3b,_3c);},getUpdateManager:function(){return this.bodyEl.getUpdateManager();},setUrl:function(url,_3e,_3f){if(this.refreshDelegate){this.un("activate",this.refreshDelegate);}this.refreshDelegate=this._handleRefresh.createDelegate(this,[url,_3e,_3f]);this.on("activate",this.refreshDelegate);return this.bodyEl.getUpdateManager();},_handleRefresh:function(url,_41,_42){if(!_42||!this.loaded){var _43=this.bodyEl.getUpdateManager();_43.update(url,_41,this._setLoaded.createDelegate(this));}},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();}},_setLoaded:function(){this.loaded=true;},closeClick:function(e){var o={};e.stopEvent();this.fireEvent("beforeclose",this,o);if(o.cancel!==true){this.tabPanel.removeTab(this.id);}},closeText:"Close this tab"});Ext.TabPanel.prototype.createStrip=function(_46){var _47=document.createElement("div");_47.className="x-tabs-wrap";_46.appendChild(_47);return _47;};Ext.TabPanel.prototype.createStripList=function(_48){_48.innerHTML="<div class=\"x-tabs-strip-wrap\"><table class=\"x-tabs-strip\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody><tr></tr></tbody></table></div>";return _48.firstChild.firstChild.firstChild.firstChild;};Ext.TabPanel.prototype.createBody=function(_49){var _4a=document.createElement("div");Ext.id(_4a,"tab-body");Ext.fly(_4a).addClass("x-tabs-body");_49.appendChild(_4a);return _4a;};Ext.TabPanel.prototype.createItemBody=function(_4b,id){var _4d=Ext.getDom(id);if(!_4d){_4d=document.createElement("div");_4d.id=id;}Ext.fly(_4d).addClass("x-tabs-item-body");_4b.insertBefore(_4d,_4b.firstChild);return _4d;};Ext.TabPanel.prototype.createStripElements=function(_4e,_4f,_50){var td=document.createElement("td");_4e.appendChild(td);if(_50){td.className="x-tabs-closable";if(!this.closeTpl){this.closeTpl=new Ext.Template("<a href=\"#\" class=\"x-tabs-right\"><span class=\"x-tabs-left\"><em class=\"x-tabs-inner\">"+"<span unselectable=\"on\""+(this.disableTooltips?"":" title=\"{text}\"")+" class=\"x-tabs-text\">{text}</span>"+"<div unselectable=\"on\" class=\"close-icon\">&#160;</div></em></span></a>");}var el=this.closeTpl.overwrite(td,{"text":_4f});var _53=el.getElementsByTagName("div")[0];var _54=el.getElementsByTagName("em")[0];return{"el":el,"close":_53,"inner":_54};}else{if(!this.tabTpl){this.tabTpl=new Ext.Template("<a href=\"#\" class=\"x-tabs-right\"><span class=\"x-tabs-left\"><em class=\"x-tabs-inner\">"+"<span unselectable=\"on\""+(this.disableTooltips?"":" title=\"{text}\"")+" class=\"x-tabs-text\">{text}</span></em></span></a>");}var el=this.tabTpl.overwrite(td,{"text":_4f});var _54=el.getElementsByTagName("em")[0];return{"el":el,"inner":_54};}};



Ext.Button=function(_1,_2){Ext.apply(this,_2);this.addEvents({"click":true,"toggle":true,"mouseover":true,"mouseout":true});if(this.menu){this.menu=Ext.menu.MenuMgr.get(this.menu);}if(_1){this.render(_1);}Ext.Button.superclass.constructor.call(this);};Ext.extend(Ext.Button,Ext.util.Observable,{hidden:false,disabled:false,pressed:false,tabIndex:undefined,enableToggle:false,menu:undefined,menuAlign:"tl-bl?",iconCls:undefined,type:"button",menuClassTarget:"tr",clickEvent:"click",handleMouseEvents:true,tooltipType:"qtip",render:function(_3){var _4;if(this.hideParent){this.parentEl=Ext.get(_3);}if(!this.dhconfig){if(!this.template){if(!Ext.Button.buttonTemplate){Ext.Button.buttonTemplate=new Ext.Template("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"x-btn-wrap\"><tbody><tr>","<td class=\"x-btn-left\"><i>&#160;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\"><button class=\"x-btn-text\" type=\"{1}\">{0}</button></em></td><td class=\"x-btn-right\"><i>&#160;</i></td>","</tr></tbody></table>");}this.template=Ext.Button.buttonTemplate;}_4=this.template.append(_3,[this.text||"&#160;",this.type],true);var _5=_4.child("button:first");_5.on("focus",this.onFocus,this);_5.on("blur",this.onBlur,this);if(this.cls){_4.addClass(this.cls);}if(this.icon){_5.setStyle("background-image","url("+this.icon+")");}if(this.iconCls){_5.addClass(this.iconCls);if(!this.cls){_4.addClass(this.text?"x-btn-text-icon":"x-btn-icon");}}if(this.tabIndex!==undefined){_5.dom.tabIndex=this.tabIndex;}if(this.tooltip){if(typeof this.tooltip=="object"){Ext.QuickTips.tips(Ext.apply({target:_5.id},this.tooltip));}else{_5.dom[this.tooltipType]=this.tooltip;}}}else{_4=Ext.DomHelper.append(Ext.get(_3).dom,this.dhconfig,true);}this.el=_4;if(this.id){this.el.dom.id=this.el.id=this.id;}if(this.menu){this.el.child(this.menuClassTarget).addClass("x-btn-with-menu");this.menu.on("show",this.onMenuShow,this);this.menu.on("hide",this.onMenuHide,this);}_4.addClass("x-btn");if(Ext.isIE&&!Ext.isIE7){this.autoWidth.defer(1,this);}else{this.autoWidth();}if(this.handleMouseEvents){_4.on("mouseover",this.onMouseOver,this);_4.on("mouseout",this.onMouseOut,this);_4.on("mousedown",this.onMouseDown,this);}_4.on(this.clickEvent,this.onClick,this);if(this.hidden){this.hide();}if(this.disabled){this.disable();}Ext.ButtonToggleMgr.register(this);if(this.pressed){this.el.addClass("x-btn-pressed");}if(this.repeat){var _6=new Ext.util.ClickRepeater(_4,typeof this.repeat=="object"?this.repeat:{});_6.on("click",this.onClick,this);}},getEl:function(){return this.el;},destroy:function(){Ext.ButtonToggleMgr.unregister(this);this.el.removeAllListeners();this.purgeListeners();this.el.remove();},autoWidth:function(){if(this.el){this.el.setWidth("auto");if(Ext.isIE7&&Ext.isStrict){var ib=this.el.child("button");if(ib&&ib.getWidth()>20){ib.clip();ib.setWidth(Ext.util.TextMetrics.measure(ib,this.text).width+ib.getFrameWidth("lr"));}}if(this.minWidth){if(this.hidden){this.el.beginMeasure();}if(this.el.getWidth()<this.minWidth){this.el.setWidth(this.minWidth);}if(this.hidden){this.el.endMeasure();}}}},setHandler:function(_8,_9){this.handler=_8;this.scope=_9;},setText:function(_a){this.text=_a;if(this.el){this.el.child("td.x-btn-center button.x-btn-text").update(_a);}this.autoWidth();},getText:function(){return this.text;},show:function(){this.hidden=false;if(this.el){this[this.hideParent?"parentEl":"el"].setStyle("display","");}},hide:function(){this.hidden=true;if(this.el){this[this.hideParent?"parentEl":"el"].setStyle("display","none");}},setVisible:function(_b){if(_b){this.show();}else{this.hide();}},toggle:function(_c){_c=_c===undefined?!this.pressed:_c;if(_c!=this.pressed){if(_c){this.el.addClass("x-btn-pressed");this.pressed=true;this.fireEvent("toggle",this,true);}else{this.el.removeClass("x-btn-pressed");this.pressed=false;this.fireEvent("toggle",this,false);}if(this.toggleHandler){this.toggleHandler.call(this.scope||this,this,_c);}}},focus:function(){this.el.child("button:first").focus();},disable:function(){if(this.el){this.el.addClass("x-btn-disabled");}this.disabled=true;},enable:function(){if(this.el){this.el.removeClass("x-btn-disabled");}this.disabled=false;},setDisabled:function(v){this[v!==true?"enable":"disable"]();},onClick:function(e){if(e){e.preventDefault();}if(e.button!=0){return;}if(!this.disabled){if(this.enableToggle){this.toggle();}if(this.menu&&!this.menu.isVisible()){this.menu.show(this.el,this.menuAlign);}this.fireEvent("click",this,e);if(this.handler){this.el.removeClass("x-btn-over");this.handler.call(this.scope||this,this,e);}}},onMouseOver:function(e){if(!this.disabled){this.el.addClass("x-btn-over");this.fireEvent("mouseover",this,e);}},onMouseOut:function(e){if(!e.within(this.el,true)){this.el.removeClass("x-btn-over");this.fireEvent("mouseout",this,e);}},onFocus:function(e){if(!this.disabled){this.el.addClass("x-btn-focus");}},onBlur:function(e){this.el.removeClass("x-btn-focus");},onMouseDown:function(e){if(!this.disabled&&e.button==0){this.el.addClass("x-btn-click");Ext.get(document).on("mouseup",this.onMouseUp,this);}},onMouseUp:function(e){if(e.button==0){this.el.removeClass("x-btn-click");Ext.get(document).un("mouseup",this.onMouseUp,this);}},onMenuShow:function(e){this.el.addClass("x-btn-menu-active");},onMenuHide:function(e){this.el.removeClass("x-btn-menu-active");}});Ext.ButtonToggleMgr=function(){var _17={};function toggleGroup(btn,_19){if(_19){var g=_17[btn.toggleGroup];for(var i=0,l=g.length;i<l;i++){if(g[i]!=btn){g[i].toggle(false);}}}}return{register:function(btn){if(!btn.toggleGroup){return;}var g=_17[btn.toggleGroup];if(!g){g=_17[btn.toggleGroup]=[];}g.push(btn);btn.on("toggle",toggleGroup);},unregister:function(btn){if(!btn.toggleGroup){return;}var g=_17[btn.toggleGroup];if(g){g.remove(btn);btn.un("toggle",toggleGroup);}}};}();



Ext.SplitButton=function(_1,_2){Ext.SplitButton.superclass.constructor.call(this,_1,_2);this.addEvents({"arrowclick":true});};Ext.extend(Ext.SplitButton,Ext.Button,{render:function(_3){var _4=new Ext.Template("<table cellspacing=\"0\" class=\"x-btn-menu-wrap x-btn\"><tr><td>","<table cellspacing=\"0\" class=\"x-btn-wrap x-btn-menu-text-wrap\"><tbody>","<tr><td class=\"x-btn-left\"><i>&#160;</i></td><td class=\"x-btn-center\"><button class=\"x-btn-text\" type=\"{1}\">{0}</button></td></tr>","</tbody></table></td><td>","<table cellspacing=\"0\" class=\"x-btn-wrap x-btn-menu-arrow-wrap\"><tbody>","<tr><td class=\"x-btn-center\"><button class=\"x-btn-menu-arrow-el\" type=\"button\">&#160;</button></td><td class=\"x-btn-right\"><i>&#160;</i></td></tr>","</tbody></table></td></tr></table>");var _5=_4.append(_3,[this.text,this.type],true);var _6=_5.child("button");if(this.cls){_5.addClass(this.cls);}if(this.icon){_6.setStyle("background-image","url("+this.icon+")");}if(this.iconCls){_6.addClass(this.iconCls);if(!this.cls){_5.addClass(this.text?"x-btn-text-icon":"x-btn-icon");}}this.el=_5;if(this.handleMouseEvents){_5.on("mouseover",this.onMouseOver,this);_5.on("mouseout",this.onMouseOut,this);_5.on("mousedown",this.onMouseDown,this);_5.on("mouseup",this.onMouseUp,this);}_5.on(this.clickEvent,this.onClick,this);if(this.tooltip){if(typeof this.tooltip=="object"){Ext.QuickTips.tips(Ext.apply({target:_6.id},this.tooltip));}else{_6.dom[this.tooltipType]=this.tooltip;}}if(this.arrowTooltip){_5.child("button:nth(2)").dom[this.tooltipType]=this.arrowTooltip;}if(this.hidden){this.hide();}if(this.disabled){this.disable();}if(this.pressed){this.el.addClass("x-btn-pressed");}if(Ext.isIE&&!Ext.isIE7){this.autoWidth.defer(1,this);}else{this.autoWidth();}if(this.menu){this.menu.on("show",this.onMenuShow,this);this.menu.on("hide",this.onMenuHide,this);}},autoWidth:function(){if(this.el){var _7=this.el.child("table:first");var _8=this.el.child("table:last");this.el.setWidth("auto");_7.setWidth("auto");if(Ext.isIE7&&Ext.isStrict){var ib=this.el.child("button:first");if(ib&&ib.getWidth()>20){ib.clip();ib.setWidth(Ext.util.TextMetrics.measure(ib,this.text).width+ib.getFrameWidth("lr"));}}if(this.minWidth){if(this.hidden){this.el.beginMeasure();}if((_7.getWidth()+_8.getWidth())<this.minWidth){_7.setWidth(this.minWidth-_8.getWidth());}if(this.hidden){this.el.endMeasure();}}this.el.setWidth(_7.getWidth()+_8.getWidth());}},setHandler:function(_a,_b){this.handler=_a;this.scope=_b;},setArrowHandler:function(_c,_d){this.arrowHandler=_c;this.scope=_d;},focus:function(){if(this.el){this.el.child("button:first").focus();}},onClick:function(e){e.preventDefault();if(!this.disabled){if(e.getTarget(".x-btn-menu-arrow-wrap")){if(this.menu&&!this.menu.isVisible()){this.menu.show(this.el,this.menuAlign);}this.fireEvent("arrowclick",this,e);if(this.arrowHandler){this.arrowHandler.call(this.scope||this,this,e);}}else{this.fireEvent("click",this,e);if(this.handler){this.handler.call(this.scope||this,this,e);}}}},onMouseDown:function(e){if(!this.disabled){Ext.fly(e.getTarget("table")).addClass("x-btn-click");}},onMouseUp:function(e){Ext.fly(e.getTarget("table")).removeClass("x-btn-click");}});Ext.MenuButton=Ext.SplitButton;



Ext.Toolbar=function(_1,_2,_3){if(_1 instanceof Array){_2=_1;_3=_2;_1=null;}Ext.apply(this,_3);this.buttons=_2;if(_1){this.render(_1);}};Ext.Toolbar.prototype={render:function(ct){this.el=Ext.get(ct);if(this.cls){this.el.addClass(this.cls);}this.el.update("<div class=\"x-toolbar x-small-editor\"><table cellspacing=\"0\"><tr></tr></table></div>");this.tr=this.el.child("tr",true);var _5=0;this.items=new Ext.util.MixedCollection(false,function(o){return o.id||("item"+(++_5));});if(this.buttons){this.add.apply(this,this.buttons);delete this.buttons;}},add:function(){var a=arguments,l=a.length;for(var i=0;i<l;i++){var el=a[i];if(el.applyTo){this.addField(el);}else{if(el.render){this.addItem(el);}else{if(typeof el=="string"){if(el=="separator"||el=="-"){this.addSeparator();}else{if(el==" "){this.addSpacer();}else{if(el=="->"){this.addFill();}else{this.addText(el);}}}}else{if(el.tagName){this.addElement(el);}else{if(typeof el=="object"){this.addButton(el);}}}}}}},getEl:function(){return this.el;},addSeparator:function(){return this.addItem(new Ext.Toolbar.Separator());},addSpacer:function(){return this.addItem(new Ext.Toolbar.Spacer());},addFill:function(){return this.addItem(new Ext.Toolbar.Fill());},addElement:function(el){return this.addItem(new Ext.Toolbar.Item(el));},addItem:function(_c){var td=this.nextBlock();_c.render(td);this.items.add(_c);return _c;},addButton:function(_e){if(_e instanceof Array){var _f=[];for(var i=0,len=_e.length;i<len;i++){_f.push(this.addButton(_e[i]));}return _f;}var b=_e;if(!(_e instanceof Ext.Toolbar.Button)){b=_e.split?new Ext.Toolbar.SplitButton(_e):new Ext.Toolbar.Button(_e);}var td=this.nextBlock();b.render(td);this.items.add(b);return b;},addText:function(_14){return this.addItem(new Ext.Toolbar.TextItem(_14));},insertButton:function(_15,_16){if(_16 instanceof Array){var _17=[];for(var i=0,len=_16.length;i<len;i++){_17.push(this.insertButton(_15+i,_16[i]));}return _17;}if(!(_16 instanceof Ext.Toolbar.Button)){_16=new Ext.Toolbar.Button(_16);}var td=document.createElement("td");this.tr.insertBefore(td,this.tr.childNodes[_15]);_16.render(td);this.items.insert(_15,_16);return _16;},addDom:function(_1b,_1c){var td=this.nextBlock();Ext.DomHelper.overwrite(td,_1b);var ti=new Ext.Toolbar.Item(td.firstChild);ti.render(td);this.items.add(ti);return ti;},addField:function(_1f){var td=this.nextBlock();_1f.render(td);var ti=new Ext.Toolbar.Item(td.firstChild);ti.render(td);this.items.add(ti);return ti;},nextBlock:function(){var td=document.createElement("td");this.tr.appendChild(td);return td;},destroy:function(){if(this.items){Ext.destroy.apply(Ext,this.items.items);}Ext.Element.uncache(this.el,this.tr);}};Ext.Toolbar.Item=function(el){this.el=Ext.getDom(el);this.id=Ext.id(this.el);this.hidden=false;};Ext.Toolbar.Item.prototype={getEl:function(){return this.el;},render:function(td){this.td=td;td.appendChild(this.el);},destroy:function(){this.td.parentNode.removeChild(this.td);},show:function(){this.hidden=false;this.td.style.display="";},hide:function(){this.hidden=true;this.td.style.display="none";},setVisible:function(_25){if(_25){this.show();}else{this.hide();}},focus:function(){Ext.fly(this.el).focus();},disable:function(){Ext.fly(this.td).addClass("x-item-disabled");this.disabled=true;this.el.disabled=true;},enable:function(){Ext.fly(this.td).removeClass("x-item-disabled");this.disabled=false;this.el.disabled=false;}};Ext.Toolbar.Separator=function(){var s=document.createElement("span");s.className="ytb-sep";Ext.Toolbar.Separator.superclass.constructor.call(this,s);};Ext.extend(Ext.Toolbar.Separator,Ext.Toolbar.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.Toolbar.Spacer=function(){var s=document.createElement("div");s.className="ytb-spacer";Ext.Toolbar.Spacer.superclass.constructor.call(this,s);};Ext.extend(Ext.Toolbar.Spacer,Ext.Toolbar.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.Toolbar.Fill=Ext.extend(Ext.Toolbar.Spacer,{render:function(td){td.style.width="100%";Ext.Toolbar.Fill.superclass.render.call(this,td);}});Ext.Toolbar.TextItem=function(_29){var s=document.createElement("span");s.className="ytb-text";s.innerHTML=_29;Ext.Toolbar.TextItem.superclass.constructor.call(this,s);};Ext.extend(Ext.Toolbar.TextItem,Ext.Toolbar.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.Toolbar.Button=function(_2b){Ext.Toolbar.Button.superclass.constructor.call(this,null,_2b);};Ext.extend(Ext.Toolbar.Button,Ext.Button,{render:function(td){this.td=td;Ext.Toolbar.Button.superclass.render.call(this,td);},destroy:function(){Ext.Toolbar.Button.superclass.destroy.call(this);this.td.parentNode.removeChild(this.td);},show:function(){this.hidden=false;this.td.style.display="";},hide:function(){this.hidden=true;this.td.style.display="none";},disable:function(){Ext.fly(this.td).addClass("x-item-disabled");this.disabled=true;},enable:function(){Ext.fly(this.td).removeClass("x-item-disabled");this.disabled=false;}});Ext.ToolbarButton=Ext.Toolbar.Button;Ext.Toolbar.SplitButton=function(_2d){Ext.Toolbar.SplitButton.superclass.constructor.call(this,null,_2d);};Ext.extend(Ext.Toolbar.SplitButton,Ext.SplitButton,{render:function(td){this.td=td;Ext.Toolbar.SplitButton.superclass.render.call(this,td);},destroy:function(){Ext.Toolbar.SplitButton.superclass.destroy.call(this);this.td.parentNode.removeChild(this.td);},show:function(){this.hidden=false;this.td.style.display="";},hide:function(){this.hidden=true;this.td.style.display="none";}});Ext.Toolbar.MenuButton=Ext.Toolbar.SplitButton;



Ext.PagingToolbar=function(el,ds,_3){Ext.PagingToolbar.superclass.constructor.call(this,el,null,_3);this.ds=ds;this.cursor=0;this.renderButtons(this.el);this.bind(ds);};Ext.extend(Ext.PagingToolbar,Ext.Toolbar,{pageSize:20,displayMsg:"Displaying {0} - {1} of {2}",emptyMsg:"No data to display",beforePageText:"Page",afterPageText:"of {0}",firstText:"First Page",prevText:"Previous Page",nextText:"Next Page",lastText:"Last Page",refreshText:"Refresh",renderButtons:function(el){Ext.PagingToolbar.superclass.render.call(this,el);this.first=this.addButton({tooltip:this.firstText,cls:"x-btn-icon x-grid-page-first",disabled:true,handler:this.onClick.createDelegate(this,["first"])});this.prev=this.addButton({tooltip:this.prevText,cls:"x-btn-icon x-grid-page-prev",disabled:true,handler:this.onClick.createDelegate(this,["prev"])});this.addSeparator();this.add(this.beforePageText);this.field=Ext.get(this.addDom({tag:"input",type:"text",size:"3",value:"1",cls:"x-grid-page-number"}).el);this.field.on("keydown",this.onPagingKeydown,this);this.field.on("focus",function(){this.dom.select();});this.afterTextEl=this.addText(String.format(this.afterPageText,1));this.field.setHeight(18);this.addSeparator();this.next=this.addButton({tooltip:this.nextText,cls:"x-btn-icon x-grid-page-next",disabled:true,handler:this.onClick.createDelegate(this,["next"])});this.last=this.addButton({tooltip:this.lastText,cls:"x-btn-icon x-grid-page-last",disabled:true,handler:this.onClick.createDelegate(this,["last"])});this.addSeparator();this.loading=this.addButton({tooltip:this.refreshText,cls:"x-btn-icon x-grid-loading",handler:this.onClick.createDelegate(this,["refresh"])});if(this.displayInfo){this.displayEl=Ext.fly(this.el.dom.firstChild).createChild({cls:"x-paging-info"});}},updateInfo:function(){if(this.displayEl){var _5=this.ds.getCount();var _6=_5==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+_5,this.ds.getTotalCount());this.displayEl.update(_6);}},onLoad:function(ds,r,o){this.cursor=o.params?o.params.start:0;var d=this.getPageData(),ap=d.activePage,ps=d.pages;this.afterTextEl.el.innerHTML=String.format(this.afterPageText,d.pages);this.field.dom.value=ap;this.first.setDisabled(ap==1);this.prev.setDisabled(ap==1);this.next.setDisabled(ap==ps);this.last.setDisabled(ap==ps);this.loading.enable();this.updateInfo();},getPageData:function(){var _d=this.ds.getTotalCount();return{total:_d,activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),pages:_d<this.pageSize?1:Math.ceil(_d/this.pageSize)};},onLoadError:function(){this.loading.enable();},onPagingKeydown:function(e){var k=e.getKey();var d=this.getPageData();if(k==e.RETURN){var v=this.field.dom.value,_12;if(!v||isNaN(_12=parseInt(v,10))){this.field.dom.value=d.activePage;return;}_12=Math.min(Math.max(1,_12),d.pages)-1;this.ds.load({params:{start:_12*this.pageSize,limit:this.pageSize}});e.stopEvent();}else{if(k==e.HOME||(k==e.UP&&e.ctrlKey)||(k==e.PAGEUP&&e.ctrlKey)||(k==e.RIGHT&&e.ctrlKey)||k==e.END||(k==e.DOWN&&e.ctrlKey)||(k==e.LEFT&&e.ctrlKey)||(k==e.PAGEDOWN&&e.ctrlKey)){var _12=(k==e.HOME||(k==e.DOWN&&e.ctrlKey)||(k==e.LEFT&&e.ctrlKey)||(k==e.PAGEDOWN&&e.ctrlKey))?1:d.pages;this.field.dom.value=_12;this.ds.load({params:{start:(_12-1)*this.pageSize,limit:this.pageSize}});e.stopEvent();}else{if(k==e.UP||k==e.RIGHT||k==e.PAGEUP||k==e.DOWN||k==e.LEFT||k==e.PAGEDOWN){var v=this.field.dom.value,_12;var _13=(e.shiftKey)?10:1;if(k==e.DOWN||k==e.LEFT||k==e.PAGEDOWN){_13*=-1;}if(!v||isNaN(_12=parseInt(v,10))){this.field.dom.value=d.activePage;return;}else{if(parseInt(v,10)+_13>=1&parseInt(v,10)+_13<=d.pages){this.field.dom.value=parseInt(v,10)+_13;_12=Math.min(Math.max(1,_12+_13),d.pages)-1;this.ds.load({params:{start:_12*this.pageSize,limit:this.pageSize}});}}e.stopEvent();}}}},beforeLoad:function(){if(this.loading){this.loading.disable();}},onClick:function(_14){var ds=this.ds;switch(_14){case"first":ds.load({params:{start:0,limit:this.pageSize}});break;case"prev":ds.load({params:{start:Math.max(0,this.cursor-this.pageSize),limit:this.pageSize}});break;case"next":ds.load({params:{start:this.cursor+this.pageSize,limit:this.pageSize}});break;case"last":var _16=ds.getTotalCount();var _17=_16%this.pageSize;var _18=_17?(_16-_17):_16-this.pageSize;ds.load({params:{start:_18,limit:this.pageSize}});break;case"refresh":ds.load({params:{start:this.cursor,limit:this.pageSize}});break;}},unbind:function(ds){ds.un("beforeload",this.beforeLoad,this);ds.un("load",this.onLoad,this);ds.un("loadexception",this.onLoadError,this);this.ds=undefined;},bind:function(ds){ds.on("beforeload",this.beforeLoad,this);ds.on("load",this.onLoad,this);ds.on("loadexception",this.onLoadError,this);this.ds=ds;}});



Ext.Resizable=function(el,_2){this.el=Ext.get(el);if(_2&&_2.wrap){_2.resizeChild=this.el;this.el=this.el.wrap(typeof _2.wrap=="object"?_2.wrap:{cls:"xresizable-wrap"});this.el.id=this.el.dom.id=_2.resizeChild.id+"-rzwrap";this.el.setStyle("overflow","hidden");this.el.setPositioning(_2.resizeChild.getPositioning());_2.resizeChild.clearPositioning();if(!_2.width||!_2.height){var _3=_2.resizeChild.getSize();this.el.setSize(_3.width,_3.height);}if(_2.pinned&&!_2.adjustments){_2.adjustments="auto";}}this.proxy=this.el.createProxy({tag:"div",cls:"x-resizable-proxy",id:this.el.id+"-rzproxy"});this.proxy.unselectable();this.proxy.enableDisplayMode("block");Ext.apply(this,_2);if(this.pinned){this.disableTrackOver=true;this.el.addClass("x-resizable-pinned");}var _4=this.el.getStyle("position");if(_4!="absolute"&&_4!="fixed"){this.el.setStyle("position","relative");}if(!this.handles){this.handles="s,e,se";if(this.multiDirectional){this.handles+=",n,w";}}if(this.handles=="all"){this.handles="n s e w ne nw se sw";}var hs=this.handles.split(/\s*?[,;]\s*?| /);var ps=Ext.Resizable.positions;for(var i=0,_8=hs.length;i<_8;i++){if(hs[i]&&ps[hs[i]]){var _9=ps[hs[i]];this[_9]=new Ext.Resizable.Handle(this,_9,this.disableTrackOver,this.transparent);}}this.corner=this.southeast;if(this.handles.indexOf("n")!=-1||this.handles.indexOf("w")!=-1){this.updateBox=true;}this.activeHandle=null;if(this.resizeChild){if(typeof this.resizeChild=="boolean"){this.resizeChild=Ext.get(this.el.dom.firstChild,true);}else{this.resizeChild=Ext.get(this.resizeChild,true);}}if(this.adjustments=="auto"){var rc=this.resizeChild;var hw=this.west,he=this.east,hn=this.north,hs=this.south;if(rc&&(hw||hn)){rc.position("relative");rc.setLeft(hw?hw.el.getWidth():0);rc.setTop(hn?hn.el.getHeight():0);}this.adjustments=[(he?-he.el.getWidth():0)+(hw?-hw.el.getWidth():0),(hn?-hn.el.getHeight():0)+(hs?-hs.el.getHeight():0)-1];}if(this.draggable){this.dd=this.dynamic?this.el.initDD(null):this.el.initDDProxy(null,{dragElId:this.proxy.id});this.dd.setHandleElId(this.resizeChild?this.resizeChild.id:this.el.id);}this.addEvents({"beforeresize":true,"resize":true});if(this.width!==null&&this.height!==null){this.resizeTo(this.width,this.height);}else{this.updateChildSize();}if(Ext.isIE){this.el.dom.style.zoom=1;}Ext.Resizable.superclass.constructor.call(this);};Ext.extend(Ext.Resizable,Ext.util.Observable,{resizeChild:false,adjustments:[0,0],minWidth:5,minHeight:5,maxWidth:10000,maxHeight:10000,enabled:true,animate:false,duration:0.35,dynamic:false,handles:false,multiDirectional:false,disableTrackOver:false,easing:"easeOutStrong",widthIncrement:0,heightIncrement:0,pinned:false,width:null,height:null,preserveRatio:false,transparent:false,minX:0,minY:0,draggable:false,constrainTo:undefined,resizeRegion:undefined,resizeTo:function(_e,_f){this.el.setSize(_e,_f);this.updateChildSize();this.fireEvent("resize",this,_e,_f,null);},startSizing:function(e,_11){this.fireEvent("beforeresize",this,e);if(this.enabled){if(!this.overlay){this.overlay=this.el.createProxy({tag:"div",cls:"x-resizable-overlay",html:"&#160;"});this.overlay.unselectable();this.overlay.enableDisplayMode("block");this.overlay.on("mousemove",this.onMouseMove,this);this.overlay.on("mouseup",this.onMouseUp,this);}this.overlay.setStyle("cursor",_11.el.getStyle("cursor"));this.resizing=true;this.startBox=this.el.getBox();this.startPoint=e.getXY();this.offsets=[(this.startBox.x+this.startBox.width)-this.startPoint[0],(this.startBox.y+this.startBox.height)-this.startPoint[1]];this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));this.overlay.show();if(this.constrainTo){var ct=Ext.get(this.constrainTo);this.resizeRegion=ct.getRegion().adjust(ct.getFrameWidth("t"),ct.getFrameWidth("l"),-ct.getFrameWidth("b"),-ct.getFrameWidth("r"));}this.proxy.setStyle("visibility","hidden");this.proxy.show();this.proxy.setBox(this.startBox);if(!this.dynamic){this.proxy.setStyle("visibility","visible");}}},onMouseDown:function(_13,e){if(this.enabled){e.stopEvent();this.activeHandle=_13;this.startSizing(e,_13);}},onMouseUp:function(e){var _16=this.resizeElement();this.resizing=false;this.handleOut();this.overlay.hide();this.proxy.hide();this.fireEvent("resize",this,_16.width,_16.height,e);},updateChildSize:function(){if(this.resizeChild){var el=this.el;var _18=this.resizeChild;var adj=this.adjustments;if(el.dom.offsetWidth){var b=el.getSize(true);_18.setSize(b.width+adj[0],b.height+adj[1]);}if(Ext.isIE){setTimeout(function(){if(el.dom.offsetWidth){var b=el.getSize(true);_18.setSize(b.width+adj[0],b.height+adj[1]);}},10);}}},snap:function(_1c,inc,min){if(!inc||!_1c){return _1c;}var _1f=_1c;var m=_1c%inc;if(m>0){if(m>(inc/2)){_1f=_1c+(inc-m);}else{_1f=_1c-m;}}return Math.max(min,_1f);},resizeElement:function(){var box=this.proxy.getBox();if(this.updateBox){this.el.setBox(box,false,this.animate,this.duration,null,this.easing);}else{this.el.setSize(box.width,box.height,this.animate,this.duration,null,this.easing);}this.updateChildSize();if(!this.dynamic){this.proxy.hide();}return box;},constrain:function(v,_23,m,mx){if(v-_23<m){_23=v-m;}else{if(v-_23>mx){_23=mx-v;}}return _23;},onMouseMove:function(e){if(this.enabled){try{if(this.resizeRegion&&!this.resizeRegion.contains(e.getPoint())){return;}var _27=this.curSize||this.startBox;var x=this.startBox.x,y=this.startBox.y;var ox=x,oy=y;var w=_27.width,h=_27.height;var ow=w,oh=h;var mw=this.minWidth,mh=this.minHeight;var mxw=this.maxWidth,mxh=this.maxHeight;var wi=this.widthIncrement;var hi=this.heightIncrement;var _36=e.getXY();var _37=-(this.startPoint[0]-Math.max(this.minX,_36[0]));var _38=-(this.startPoint[1]-Math.max(this.minY,_36[1]));var pos=this.activeHandle.position;switch(pos){case"east":w+=_37;w=Math.min(Math.max(mw,w),mxw);break;case"south":h+=_38;h=Math.min(Math.max(mh,h),mxh);break;case"southeast":w+=_37;h+=_38;w=Math.min(Math.max(mw,w),mxw);h=Math.min(Math.max(mh,h),mxh);break;case"north":_38=this.constrain(h,_38,mh,mxh);y+=_38;h-=_38;break;case"west":_37=this.constrain(w,_37,mw,mxw);x+=_37;w-=_37;break;case"northeast":w+=_37;w=Math.min(Math.max(mw,w),mxw);_38=this.constrain(h,_38,mh,mxh);y+=_38;h-=_38;break;case"northwest":_37=this.constrain(w,_37,mw,mxw);_38=this.constrain(h,_38,mh,mxh);y+=_38;h-=_38;x+=_37;w-=_37;break;case"southwest":_37=this.constrain(w,_37,mw,mxw);h+=_38;h=Math.min(Math.max(mh,h),mxh);x+=_37;w-=_37;break;}var sw=this.snap(w,wi,mw);var sh=this.snap(h,hi,mh);if(sw!=w||sh!=h){switch(pos){case"northeast":y-=sh-h;break;case"north":y-=sh-h;break;case"southwest":x-=sw-w;break;case"west":x-=sw-w;break;case"northwest":x-=sw-w;y-=sh-h;break;}w=sw;h=sh;}if(this.preserveRatio){switch(pos){case"southeast":case"east":h=oh*(w/ow);h=Math.min(Math.max(mh,h),mxh);w=ow*(h/oh);break;case"south":w=ow*(h/oh);w=Math.min(Math.max(mw,w),mxw);h=oh*(w/ow);break;case"northeast":w=ow*(h/oh);w=Math.min(Math.max(mw,w),mxw);h=oh*(w/ow);break;case"north":var tw=w;w=ow*(h/oh);w=Math.min(Math.max(mw,w),mxw);h=oh*(w/ow);x+=(tw-w)/2;break;case"southwest":h=oh*(w/ow);h=Math.min(Math.max(mh,h),mxh);var tw=w;w=ow*(h/oh);x+=tw-w;break;case"west":var th=h;h=oh*(w/ow);h=Math.min(Math.max(mh,h),mxh);y+=(th-h)/2;var tw=w;w=ow*(h/oh);x+=tw-w;break;case"northwest":var tw=w;var th=h;h=oh*(w/ow);h=Math.min(Math.max(mh,h),mxh);w=ow*(h/oh);y+=th-h;x+=tw-w;break;}}this.proxy.setBounds(x,y,w,h);if(this.dynamic){this.resizeElement();}}catch(e){}}},handleOver:function(){if(this.enabled){this.el.addClass("x-resizable-over");}},handleOut:function(){if(!this.resizing){this.el.removeClass("x-resizable-over");}},getEl:function(){return this.el;},getResizeChild:function(){return this.resizeChild;},destroy:function(_3e){this.proxy.remove();if(this.overlay){this.overlay.removeAllListeners();this.overlay.remove();}var ps=Ext.Resizable.positions;for(var k in ps){if(typeof ps[k]!="function"&&this[ps[k]]){var h=this[ps[k]];h.el.removeAllListeners();h.el.remove();}}if(_3e){this.el.update("");this.el.remove();}}});Ext.Resizable.positions={n:"north",s:"south",e:"east",w:"west",se:"southeast",sw:"southwest",nw:"northwest",ne:"northeast"};Ext.Resizable.Handle=function(rz,pos,_44,_45){if(!this.tpl){var tpl=Ext.DomHelper.createTemplate({tag:"div",cls:"x-resizable-handle x-resizable-handle-{0}"});tpl.compile();Ext.Resizable.Handle.prototype.tpl=tpl;}this.position=pos;this.rz=rz;this.el=this.tpl.append(rz.el.dom,[this.position],true);this.el.unselectable();if(_45){this.el.setOpacity(0);}this.el.on("mousedown",this.onMouseDown,this);if(!_44){this.el.on("mouseover",this.onMouseOver,this);this.el.on("mouseout",this.onMouseOut,this);}};Ext.Resizable.Handle.prototype={afterResize:function(rz){},onMouseDown:function(e){this.rz.onMouseDown(this,e);},onMouseOver:function(e){this.rz.handleOver(this,e);},onMouseOut:function(e){this.rz.handleOut(this,e);}};



Ext.BasicDialog=function(el,_2){this.el=Ext.get(el);var dh=Ext.DomHelper;if(!this.el&&_2&&_2.autoCreate){if(typeof _2.autoCreate=="object"){if(!_2.autoCreate.id){_2.autoCreate.id=el;}this.el=dh.append(document.body,_2.autoCreate,true);}else{this.el=dh.append(document.body,{tag:"div",id:el,style:"visibility:hidden;"},true);}}el=this.el;el.setDisplayed(true);el.hide=this.hideAction;this.id=el.id;el.addClass("x-dlg");Ext.apply(this,_2);this.proxy=el.createProxy("x-dlg-proxy");this.proxy.hide=this.hideAction;this.proxy.setOpacity(0.5);this.proxy.hide();if(_2.width){el.setWidth(_2.width);}if(_2.height){el.setHeight(_2.height);}this.size=el.getSize();if(typeof _2.x!="undefined"&&typeof _2.y!="undefined"){this.xy=[_2.x,_2.y];}else{this.xy=el.getCenterXY(true);}this.header=el.child("> .x-dlg-hd");this.body=el.child("> .x-dlg-bd");this.footer=el.child("> .x-dlg-ft");if(!this.header){this.header=el.createChild({tag:"div",cls:"x-dlg-hd",html:"&#160;"},this.body?this.body.dom:null);}if(!this.body){this.body=el.createChild({tag:"div",cls:"x-dlg-bd"});}this.header.unselectable();if(this.title){this.header.update(this.title);}this.focusEl=el.createChild({tag:"a",href:"#",cls:"x-dlg-focus",tabIndex:"-1"});this.focusEl.swallowEvent("click",true);this.header.wrap({cls:"x-dlg-hd-right"}).wrap({cls:"x-dlg-hd-left"},true);this.bwrap=this.body.wrap({tag:"div",cls:"x-dlg-dlg-body"});if(this.footer){this.bwrap.dom.appendChild(this.footer.dom);}this.bg=this.el.createChild({tag:"div",cls:"x-dlg-bg",html:"<div class=\"x-dlg-bg-left\"><div class=\"x-dlg-bg-right\"><div class=\"x-dlg-bg-center\">&#160;</div></div></div>"});this.centerBg=this.bg.child("div.x-dlg-bg-center");if(this.autoScroll!==false&&!this.autoTabs){this.body.setStyle("overflow","auto");}this.toolbox=this.el.createChild({cls:"x-dlg-toolbox"});if(this.closable!==false){this.el.addClass("x-dlg-closable");this.close=this.toolbox.createChild({cls:"x-dlg-close"});this.close.on("click",this.closeClick,this);this.close.addClassOnOver("x-dlg-close-over");}if(this.collapsible!==false){this.collapseBtn=this.toolbox.createChild({cls:"x-dlg-collapse"});this.collapseBtn.on("click",this.collapseClick,this);this.collapseBtn.addClassOnOver("x-dlg-collapse-over");this.header.on("dblclick",this.collapseClick,this);}if(this.resizable!==false){this.el.addClass("x-dlg-resizable");this.resizer=new Ext.Resizable(el,{minWidth:this.minWidth||80,minHeight:this.minHeight||80,handles:this.resizeHandles||"all",pinned:true});this.resizer.on("beforeresize",this.beforeResize,this);this.resizer.on("resize",this.onResize,this);}if(this.draggable!==false){el.addClass("x-dlg-draggable");if(!this.proxyDrag){var dd=new Ext.dd.DD(el.dom.id,"WindowDrag");}else{var dd=new Ext.dd.DDProxy(el.dom.id,"WindowDrag",{dragElId:this.proxy.id});}dd.setHandleElId(this.header.id);dd.endDrag=this.endMove.createDelegate(this);dd.startDrag=this.startMove.createDelegate(this);dd.onDrag=this.onDrag.createDelegate(this);dd.scroll=false;this.dd=dd;}if(this.modal){this.mask=dh.append(document.body,{tag:"div",cls:"x-dlg-mask"},true);this.mask.enableDisplayMode("block");this.mask.hide();this.el.addClass("x-dlg-modal");}if(this.shadow){this.shadow=new Ext.Shadow({mode:typeof this.shadow=="string"?this.shadow:"sides",offset:this.shadowOffset});}else{this.shadowOffset=0;}if(Ext.useShims&&this.shim!==false){this.shim=this.el.createShim();this.shim.hide=this.hideAction;this.shim.hide();}else{this.shim=false;}if(this.autoTabs){this.initTabs();}this.addEvents({"keydown":true,"move":true,"resize":true,"beforehide":true,"hide":true,"beforeshow":true,"show":true});el.on("keydown",this.onKeyDown,this);el.on("mousedown",this.toFront,this);Ext.EventManager.onWindowResize(this.adjustViewport,this,true);this.el.hide();Ext.DialogManager.register(this);Ext.BasicDialog.superclass.constructor.call(this);};Ext.extend(Ext.BasicDialog,Ext.util.Observable,{shadowOffset:Ext.isIE?6:5,minHeight:80,minWidth:200,minButtonWidth:75,defaultButton:null,buttonAlign:"right",tabTag:"div",firstShow:true,setTitle:function(_5){this.header.update(_5);return this;},closeClick:function(){this.hide();},collapseClick:function(){this[this.collapsed?"expand":"collapse"]();},collapse:function(){if(!this.collapsed){this.collapsed=true;this.el.addClass("x-dlg-collapsed");this.restoreHeight=this.el.getHeight();this.resizeTo(this.el.getWidth(),this.header.getHeight());}},expand:function(){if(this.collapsed){this.collapsed=false;this.el.removeClass("x-dlg-collapsed");this.resizeTo(this.el.getWidth(),this.restoreHeight);}},initTabs:function(){var _6=this.getTabs();while(_6.getTab(0)){_6.removeTab(0);}this.el.select(this.tabTag+".x-dlg-tab").each(function(el){var _8=el.dom;_6.addTab(Ext.id(_8),_8.title);_8.title="";});_6.activate(0);return _6;},beforeResize:function(){this.resizer.minHeight=Math.max(this.minHeight,this.getHeaderFooterHeight(true)+40);},onResize:function(){this.refreshSize();this.syncBodyHeight();this.adjustAssets();this.focus();this.fireEvent("resize",this,this.size.width,this.size.height);},onKeyDown:function(e){if(this.isVisible()){this.fireEvent("keydown",this,e);}},resizeTo:function(_a,_b){this.el.setSize(_a,_b);this.size={width:_a,height:_b};this.syncBodyHeight();if(this.fixedcenter){this.center();}if(this.isVisible()){this.constrainXY();this.adjustAssets();}this.fireEvent("resize",this,_a,_b);return this;},setContentSize:function(w,h){h+=this.getHeaderFooterHeight()+this.body.getMargins("tb");w+=this.body.getMargins("lr")+this.bwrap.getMargins("lr")+this.centerBg.getPadding("lr");h+=this.body.getPadding("tb")+this.bwrap.getBorderWidth("tb")+this.body.getBorderWidth("tb")+this.el.getBorderWidth("tb");w+=this.body.getPadding("lr")+this.bwrap.getBorderWidth("lr")+this.body.getBorderWidth("lr")+this.bwrap.getPadding("lr")+this.el.getBorderWidth("lr");if(this.tabs){h+=this.tabs.stripWrap.getHeight()+this.tabs.bodyEl.getMargins("tb")+this.tabs.bodyEl.getPadding("tb");w+=this.tabs.bodyEl.getMargins("lr")+this.tabs.bodyEl.getPadding("lr");}this.resizeTo(w,h);return this;},addKeyListener:function(_e,fn,_10){var _11,_12,_13,alt;if(typeof _e=="object"&&!(_e instanceof Array)){_11=_e["key"];_12=_e["shift"];_13=_e["ctrl"];alt=_e["alt"];}else{_11=_e;}var _15=function(dlg,e){if((!_12||e.shiftKey)&&(!_13||e.ctrlKey)&&(!alt||e.altKey)){var k=e.getKey();if(_11 instanceof Array){for(var i=0,len=_11.length;i<len;i++){if(_11[i]==k){fn.call(_10||window,dlg,k,e);return;}}}else{if(k==_11){fn.call(_10||window,dlg,k,e);}}}};this.on("keydown",_15);return this;},getTabs:function(){if(!this.tabs){this.el.addClass("x-dlg-auto-tabs");this.body.addClass(this.tabPosition=="bottom"?"x-tabs-bottom":"x-tabs-top");this.tabs=new Ext.TabPanel(this.body.dom,this.tabPosition=="bottom");}return this.tabs;},addButton:function(_1b,_1c,_1d){var dh=Ext.DomHelper;if(!this.footer){this.footer=dh.append(this.bwrap,{tag:"div",cls:"x-dlg-ft"},true);}if(!this.btnContainer){var tb=this.footer.createChild({cls:"x-dlg-btns x-dlg-btns-"+this.buttonAlign,html:"<table cellspacing=\"0\"><tbody><tr></tr></tbody></table><div class=\"x-clear\"></div>"},null,true);this.btnContainer=tb.firstChild.firstChild.firstChild;}var _20={handler:_1c,scope:_1d,minWidth:this.minButtonWidth,hideParent:true};if(typeof _1b=="string"){_20.text=_1b;}else{if(_1b.tag){_20.dhconfig=_1b;}else{Ext.apply(_20,_1b);}}var btn=new Ext.Button(this.btnContainer.appendChild(document.createElement("td")),_20);this.syncBodyHeight();if(!this.buttons){this.buttons=[];}this.buttons.push(btn);return btn;},setDefaultButton:function(btn){this.defaultButton=btn;return this;},getHeaderFooterHeight:function(_23){var _24=0;if(this.header){_24+=this.header.getHeight();}if(this.footer){var fm=this.footer.getMargins();_24+=(this.footer.getHeight()+fm.top+fm.bottom);}_24+=this.bwrap.getPadding("tb")+this.bwrap.getBorderWidth("tb");_24+=this.centerBg.getPadding("tb");return _24;},syncBodyHeight:function(){var bd=this.body,cb=this.centerBg,bw=this.bwrap;var _29=this.size.height-this.getHeaderFooterHeight(false);bd.setHeight(_29-bd.getMargins("tb"));var hh=this.header.getHeight();var h=this.size.height-hh;cb.setHeight(h);bw.setLeftTop(cb.getPadding("l"),hh+cb.getPadding("t"));bw.setHeight(h-cb.getPadding("tb"));bw.setWidth(this.el.getWidth(true)-cb.getPadding("lr"));bd.setWidth(bw.getWidth(true));if(this.tabs){this.tabs.syncHeight();if(Ext.isIE){this.tabs.el.repaint();}}},restoreState:function(){var box=Ext.state.Manager.get(this.stateId||(this.el.id+"-state"));if(box&&box.width){this.xy=[box.x,box.y];this.resizeTo(box.width,box.height);}return this;},beforeShow:function(){this.expand();if(this.fixedcenter){this.xy=this.el.getCenterXY(true);}if(this.modal){Ext.get(document.body).addClass("x-body-masked");this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));this.mask.show();}this.constrainXY();},animShow:function(){var b=Ext.get(this.animateTarget,true).getBox();this.proxy.setSize(b.width,b.height);this.proxy.setLocation(b.x,b.y);this.proxy.show();this.proxy.setBounds(this.xy[0],this.xy[1],this.size.width,this.size.height,true,0.35,this.showEl.createDelegate(this));},show:function(_2e){if(this.fireEvent("beforeshow",this)===false){return;}if(this.syncHeightBeforeShow){this.syncBodyHeight();}else{if(this.firstShow){this.firstShow=false;this.syncBodyHeight();}}this.animateTarget=_2e||this.animateTarget;if(!this.el.isVisible()){this.beforeShow();if(this.animateTarget){this.animShow();}else{this.showEl();}}return this;},showEl:function(){this.proxy.hide();this.el.setXY(this.xy);this.el.show();this.adjustAssets(true);this.toFront();this.focus();if(Ext.isIE){this.el.repaint();}this.fireEvent("show",this);},focus:function(){if(this.defaultButton){this.defaultButton.focus();}else{this.focusEl.focus();}},constrainXY:function(){if(this.constraintoviewport!==false){if(!this.viewSize){if(this.container){var s=this.container.getSize();this.viewSize=[s.width,s.height];}else{this.viewSize=[Ext.lib.Dom.getViewWidth(),Ext.lib.Dom.getViewHeight()];}}var s=Ext.get(this.container||document).getScroll();var x=this.xy[0],y=this.xy[1];var w=this.size.width,h=this.size.height;var vw=this.viewSize[0],vh=this.viewSize[1];var _36=false;if(x+w>vw+s.left){x=vw-w;_36=true;}if(y+h>vh+s.top){y=vh-h;_36=true;}if(x<s.left){x=s.left;_36=true;}if(y<s.top){y=s.top;_36=true;}if(_36){this.xy=[x,y];if(this.isVisible()){this.el.setLocation(x,y);this.adjustAssets();}}}},onDrag:function(){if(!this.proxyDrag){this.xy=this.el.getXY();this.adjustAssets();}},adjustAssets:function(_37){var x=this.xy[0],y=this.xy[1];var w=this.size.width,h=this.size.height;if(_37===true){if(this.shadow){this.shadow.show(this.el);}if(this.shim){this.shim.show();}}if(this.shadow&&this.shadow.isVisible()){this.shadow.show(this.el);}if(this.shim&&this.shim.isVisible()){this.shim.setBounds(x,y,w,h);}},adjustViewport:function(w,h){if(!w||!h){w=Ext.lib.Dom.getViewWidth();h=Ext.lib.Dom.getViewHeight();}this.viewSize=[w,h];if(this.modal&&this.mask.isVisible()){this.mask.setSize(w,h);this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));}if(this.isVisible()){this.constrainXY();}},destroy:function(_3e){if(this.isVisible()){this.animateTarget=null;this.hide();}Ext.EventManager.removeResizeListener(this.adjustViewport,this);if(this.tabs){this.tabs.destroy(_3e);}Ext.destroy(this.shim,this.proxy,this.resizer,this.close,this.mask);if(this.dd){this.dd.unreg();}if(this.buttons){for(var i=0,len=this.buttons.length;i<len;i++){this.buttons[i].destroy();}}this.el.removeAllListeners();if(_3e===true){this.el.update("");this.el.remove();}Ext.DialogManager.unregister(this);},startMove:function(){if(this.proxyDrag){this.proxy.show();}if(this.constraintoviewport!==false){this.dd.constrainTo(document.body,{right:this.shadowOffset,bottom:this.shadowOffset});}},endMove:function(){if(!this.proxyDrag){Ext.dd.DD.prototype.endDrag.apply(this.dd,arguments);}else{Ext.dd.DDProxy.prototype.endDrag.apply(this.dd,arguments);this.proxy.hide();}this.refreshSize();this.adjustAssets();this.focus();this.fireEvent("move",this,this.xy[0],this.xy[1]);},toFront:function(){Ext.DialogManager.bringToFront(this);return this;},toBack:function(){Ext.DialogManager.sendToBack(this);return this;},center:function(){var xy=this.el.getCenterXY(true);this.moveTo(xy[0],xy[1]);return this;},moveTo:function(x,y){this.xy=[x,y];if(this.isVisible()){this.el.setXY(this.xy);this.adjustAssets();}return this;},alignTo:function(_44,_45,_46){this.xy=this.el.getAlignToXY(_44,_45,_46);if(this.isVisible()){this.el.setXY(this.xy);this.adjustAssets();}return this;},anchorTo:function(el,_48,_49,_4a){var _4b=function(){this.alignTo(el,_48,_49);};Ext.EventManager.onWindowResize(_4b,this);var tm=typeof _4a;if(tm!="undefined"){Ext.EventManager.on(window,"scroll",_4b,this,{buffer:tm=="number"?_4a:50});}_4b.call(this);return this;},isVisible:function(){return this.el.isVisible();},animHide:function(_4d){var b=Ext.get(this.animateTarget).getBox();this.proxy.show();this.proxy.setBounds(this.xy[0],this.xy[1],this.size.width,this.size.height);this.el.hide();this.proxy.setBounds(b.x,b.y,b.width,b.height,true,0.35,this.hideEl.createDelegate(this,[_4d]));},hide:function(_4f){if(this.fireEvent("beforehide",this)===false){return;}if(this.shadow){this.shadow.hide();}if(this.shim){this.shim.hide();}if(this.animateTarget){this.animHide(_4f);}else{this.el.hide();this.hideEl(_4f);}return this;},hideEl:function(_50){this.proxy.hide();if(this.modal){this.mask.hide();Ext.get(document.body).removeClass("x-body-masked");}this.fireEvent("hide",this);if(typeof _50=="function"){_50();}},hideAction:function(){this.setLeft("-10000px");this.setTop("-10000px");this.setStyle("visibility","hidden");},refreshSize:function(){this.size=this.el.getSize();this.xy=this.el.getXY();Ext.state.Manager.set(this.stateId||this.el.id+"-state",this.el.getBox());},setZIndex:function(_51){if(this.modal){this.mask.setStyle("z-index",_51);}if(this.shim){this.shim.setStyle("z-index",++_51);}if(this.shadow){this.shadow.setZIndex(++_51);}this.el.setStyle("z-index",++_51);if(this.proxy){this.proxy.setStyle("z-index",++_51);}if(this.resizer){this.resizer.proxy.setStyle("z-index",++_51);}this.lastZIndex=_51;},getEl:function(){return this.el;}});Ext.DialogManager=function(){var _52={};var _53=[];var _54=null;var _55=function(d1,d2){return(!d1._lastAccess||d1._lastAccess<d2._lastAccess)?-1:1;};var _58=function(){_53.sort(_55);var _59=Ext.DialogManager.zseed;for(var i=0,len=_53.length;i<len;i++){var dlg=_53[i];if(dlg){dlg.setZIndex(_59+(i*10));}}};return{zseed:9000,register:function(dlg){_52[dlg.id]=dlg;_53.push(dlg);},unregister:function(dlg){delete _52[dlg.id];if(!_53.indexOf){for(var i=0,len=_53.length;i<len;i++){if(_53[i]==dlg){_53.splice(i,1);return;}}}else{var i=_53.indexOf(dlg);if(i!=-1){_53.splice(i,1);}}},get:function(id){return typeof id=="object"?id:_52[id];},bringToFront:function(dlg){dlg=this.get(dlg);if(dlg!=_54){_54=dlg;dlg._lastAccess=new Date().getTime();_58();}return dlg;},sendToBack:function(dlg){dlg=this.get(dlg);dlg._lastAccess=-(new Date().getTime());_58();return dlg;},hideAll:function(){for(var id in _52){if(_52[id]&&typeof _52[id]!="function"&&_52[id].isVisible()){_52[id].hide();}}}};}();Ext.LayoutDialog=function(el,_66){_66.autoTabs=false;Ext.LayoutDialog.superclass.constructor.call(this,el,_66);this.body.setStyle({overflow:"hidden",position:"relative"});this.layout=new Ext.BorderLayout(this.body.dom,_66);this.layout.monitorWindowResize=false;this.el.addClass("x-dlg-auto-layout");this.center=Ext.BasicDialog.prototype.center;this.on("show",this.layout.layout,this.layout,true);};Ext.extend(Ext.LayoutDialog,Ext.BasicDialog,{endUpdate:function(){this.layout.endUpdate();},beginUpdate:function(){this.layout.beginUpdate();},getLayout:function(){return this.layout;},showEl:function(){Ext.LayoutDialog.superclass.showEl.apply(this,arguments);if(Ext.isIE7){this.layout.layout();}},syncBodyHeight:function(){Ext.LayoutDialog.superclass.syncBodyHeight.call(this);if(this.layout){this.layout.layout();}}});



Ext.MessageBox=function(){var _1,_2,_3,_4;var _5,_6,_7,_8,_9,pp;var _b,_c,_d;var _e=function(_f){_1.hide();Ext.callback(_2.fn,_2.scope||window,[_f,_c.dom.value],1);};var _10=function(){if(_2&&_2.cls){_1.el.removeClass(_2.cls);}if(_4){Ext.TaskMgr.stop(_4);_4=null;}};var _11=function(b){var _13=0;if(!b){_b["ok"].hide();_b["cancel"].hide();_b["yes"].hide();_b["no"].hide();_1.footer.dom.style.display="none";return _13;}_1.footer.dom.style.display="";for(var k in _b){if(typeof _b[k]!="function"){if(b[k]){_b[k].show();_b[k].setText(typeof b[k]=="string"?b[k]:Ext.MessageBox.buttonText[k]);_13+=_b[k].el.getWidth()+15;}else{_b[k].hide();}}}return _13;};var _15=function(d,k,e){if(_2&&_2.closable!==false){_1.hide();}if(e){e.stopEvent();}};return{getDialog:function(){if(!_1){_1=new Ext.BasicDialog("x-msg-box",{autoCreate:true,shadow:true,draggable:true,resizable:false,constraintoviewport:false,fixedcenter:true,collapsible:false,shim:true,modal:true,width:400,height:100,buttonAlign:"center",closeClick:function(){if(_2&&_2.buttons&&_2.buttons.no&&!_2.buttons.cancel){_e("no");}else{_e("cancel");}}});_1.on("hide",_10);_3=_1.mask;_1.addKeyListener(27,_15);_b={};var bt=this.buttonText;_b["ok"]=_1.addButton(bt["ok"],_e.createCallback("ok"));_b["yes"]=_1.addButton(bt["yes"],_e.createCallback("yes"));_b["no"]=_1.addButton(bt["no"],_e.createCallback("no"));_b["cancel"]=_1.addButton(bt["cancel"],_e.createCallback("cancel"));_5=_1.body.createChild({html:"<span class=\"ext-mb-text\"></span><br /><input type=\"text\" class=\"ext-mb-input\" /><textarea class=\"ext-mb-textarea\"></textarea><div class=\"ext-mb-progress-wrap\"><div class=\"ext-mb-progress\"><div class=\"ext-mb-progress-bar\">&#160;</div></div></div>"});_6=_5.dom.firstChild;_7=Ext.get(_5.dom.childNodes[2]);_7.enableDisplayMode();_7.addKeyListener([10,13],function(){if(_1.isVisible()&&_2&&_2.buttons){if(_2.buttons.ok){_e("ok");}else{if(_2.buttons.yes){_e("yes");}}}});_8=Ext.get(_5.dom.childNodes[3]);_8.enableDisplayMode();_9=Ext.get(_5.dom.childNodes[4]);_9.enableDisplayMode();var pf=_9.dom.firstChild;pp=Ext.get(pf.firstChild);pp.setHeight(pf.offsetHeight);}return _1;},updateText:function(_1b){if(!_1.isVisible()&&!_2.width){_1.resizeTo(this.maxWidth,100);}_6.innerHTML=_1b||"&#160;";var w=Math.max(Math.min(_2.width||_6.offsetWidth,this.maxWidth),Math.max(_2.minWidth||this.minWidth,_d));if(_2.prompt){_c.setWidth(w);}if(_1.isVisible()){_1.fixedcenter=false;}_1.setContentSize(w,_5.getHeight());if(_1.isVisible()){_1.fixedcenter=true;}return this;},updateProgress:function(_1d,_1e){if(_1e){this.updateText(_1e);}pp.setWidth(Math.floor(_1d*_9.dom.firstChild.offsetWidth));return this;},isVisible:function(){return _1&&_1.isVisible();},hide:function(){if(this.isVisible()){_1.hide();}},show:function(_1f){if(this.isVisible()){this.hide();}var d=this.getDialog();_2=_1f;d.setTitle(_2.title||"&#160;");d.close.setDisplayed(_2.closable!==false);_c=_7;_2.prompt=_2.prompt||(_2.multiline?true:false);if(_2.prompt){if(_2.multiline){_7.hide();_8.show();_8.setHeight(typeof _2.multiline=="number"?_2.multiline:this.defaultTextHeight);_c=_8;}else{_7.show();_8.hide();}}else{_7.hide();_8.hide();}_9.setDisplayed(_2.progress===true);this.updateProgress(0);_c.dom.value=_2.value||"";if(_2.prompt){_1.setDefaultButton(_c);}else{var bs=_2.buttons;var db=null;if(bs&&bs.ok){db=_b["ok"];}else{if(bs&&bs.yes){db=_b["yes"];}}_1.setDefaultButton(db);}_d=_11(_2.buttons);this.updateText(_2.msg);if(_2.cls){d.el.addClass(_2.cls);}d.proxyDrag=_2.proxyDrag===true;d.modal=_2.modal!==false;d.mask=_2.modal!==false?_3:false;if(!d.isVisible()){document.body.appendChild(_1.el.dom);d.animateTarget=null;d.show(_1f.animEl);}return this;},progress:function(_23,msg){this.show({title:_23,msg:msg,buttons:false,progress:true,closable:false,minWidth:this.minProgressWidth});return this;},alert:function(_25,msg,fn,_28){this.show({title:_25,msg:msg,buttons:this.OK,fn:fn,scope:_28});return this;},wait:function(msg,_2a){this.show({title:_2a,msg:msg,buttons:false,closable:false,progress:true,modal:true,width:300,wait:true});_4=Ext.TaskMgr.start({run:function(i){Ext.MessageBox.updateProgress(((((i+20)%20)+1)*5)*0.01);},interval:1000});return this;},confirm:function(_2c,msg,fn,_2f){this.show({title:_2c,msg:msg,buttons:this.YESNO,fn:fn,scope:_2f});return this;},prompt:function(_30,msg,fn,_33,_34){this.show({title:_30,msg:msg,buttons:this.OKCANCEL,fn:fn,minWidth:250,scope:_33,prompt:true,multiline:_34});return this;},OK:{ok:true},YESNO:{yes:true,no:true},OKCANCEL:{ok:true,cancel:true},YESNOCANCEL:{yes:true,no:true,cancel:true},defaultTextHeight:75,maxWidth:600,minWidth:100,minProgressWidth:250,buttonText:{ok:"OK",cancel:"Cancel",yes:"Yes",no:"No"}};}();Ext.Msg=Ext.MessageBox;



Ext.QuickTips=function(){var el,_2,_3,_4,tm,_6,_7,_8={},_9,_a=null,_b,_c;var ce,bd,xy,dd;var _11=false,_12=true,_13=false;var _14=1,_15=1,_16=1,_17=[];var _18=function(e){if(_12){return;}var t=e.getTarget();if(!t||t.nodeType!==1||t==document||t==document.body){return;}if(ce&&t==ce.el){clearTimeout(_15);return;}if(t&&_8[t.id]){_8[t.id].el=t;_14=_1b.defer(tm.showDelay,tm,[_8[t.id]]);return;}var ttp,et=Ext.fly(t);var ns=_6.namespace;if(tm.interceptTitles&&t.title){ttp=t.title;t.qtip=ttp;t.removeAttribute("title");e.preventDefault();}else{ttp=t.qtip||et.getAttributeNS(ns,_6.attribute);}if(ttp){_14=_1b.defer(tm.showDelay,tm,[{el:t,text:ttp,width:et.getAttributeNS(ns,_6.width),autoHide:et.getAttributeNS(ns,_6.hide)!="user",title:et.getAttributeNS(ns,_6.title),cls:et.getAttributeNS(ns,_6.cls)}]);}};var _1f=function(e){clearTimeout(_14);var t=e.getTarget();if(t&&ce&&ce.el==t&&(tm.autoHide&&ce.autoHide!==false)){_15=setTimeout(_22,tm.hideDelay);}};var _23=function(e){if(_12){return;}xy=e.getXY();xy[1]+=18;if(tm.trackMouse&&ce){el.setXY(xy);}};var _25=function(e){clearTimeout(_14);clearTimeout(_15);if(!e.within(el)){if(tm.hideOnClick){_22();tm.disable();}}};var _27=function(e){tm.enable();};var _29=function(){return _b.getPadding("l")+_c.getPadding("r");};var _1b=function(o){if(_12){return;}clearTimeout(_16);ce=o;if(_a){el.removeClass(_a);_a=null;}if(ce.cls){el.addClass(ce.cls);_a=ce.cls;}if(ce.title){_4.update(ce.title);_4.show();}else{_4.update("");_4.hide();}el.dom.style.width=tm.maxWidth+"px";_3.update(o.text);var p=_29(),w=ce.width;if(!w){var td=_3.dom;var aw=Math.max(td.offsetWidth,td.clientWidth,td.scrollWidth);if(aw>tm.maxWidth){w=tm.maxWidth;}else{if(aw<tm.minWidth){w=tm.minWidth;}else{w=aw;}}}el.setWidth(parseInt(w,10)+p);if(ce.autoHide===false){_7.setDisplayed(true);if(dd){dd.unlock();}}else{_7.setDisplayed(false);if(dd){dd.lock();}}if(xy){el.avoidY=xy[1]-18;el.setXY(xy);}if(tm.animate){el.setOpacity(0.1);el.setStyle("visibility","visible");el.fadeIn({callback:_2f});}else{_2f();}};var _2f=function(){if(ce){el.show();_9.enable();if(tm.autoDismiss&&ce.autoHide!==false){_16=setTimeout(_22,tm.autoDismissDelay);}}};var _22=function(_30){clearTimeout(_16);clearTimeout(_15);ce=null;if(el.isVisible()){_9.disable();if(_30!==true&&tm.animate){el.fadeOut({callback:_31});}else{_31();}}};var _31=function(){el.hide();if(_a){el.removeClass(_a);_a=null;}};return{minWidth:40,maxWidth:300,interceptTitles:false,trackMouse:false,hideOnClick:true,showDelay:500,hideDelay:200,autoHide:true,autoDismiss:true,autoDismissDelay:5000,animate:false,init:function(){tm=Ext.QuickTips;_6=tm.tagConfig;if(!_13){if(!Ext.isReady){Ext.onReady(Ext.QuickTips.init,Ext.QuickTips);return;}el=new Ext.Layer({cls:"x-tip",shadow:"drop",shim:true,constrain:true,shadowOffset:4});el.fxDefaults={stopFx:true};el.update("<div class=\"x-tip-top-left\"><div class=\"x-tip-top-right\"><div class=\"x-tip-top\"></div></div></div><div class=\"x-tip-bd-left\"><div class=\"x-tip-bd-right\"><div class=\"x-tip-bd\"><div class=\"x-tip-close\"></div><h3></h3><div class=\"x-tip-bd-inner\"></div><div class=\"x-clear\"></div></div></div></div><div class=\"x-tip-ft-left\"><div class=\"x-tip-ft-right\"><div class=\"x-tip-ft\"></div></div></div>");_4=el.child("h3");_4.enableDisplayMode("block");_2=el.child("div.x-tip-bd");_3=el.child("div.x-tip-bd-inner");_b=el.child("div.x-tip-bd-left");_c=el.child("div.x-tip-bd-right");_7=el.child("div.x-tip-close");_7.enableDisplayMode("block");_7.on("click",_22);var d=Ext.get(document);d.on("mousedown",_25);d.on("mouseup",_27);d.on("mouseover",_18);d.on("mouseout",_1f);d.on("mousemove",_23);_9=d.addKeyListener(27,_22);_9.disable();if(Ext.dd.DD){dd=el.initDD("default",null,{onDrag:function(){el.sync();}});dd.setHandleElId(_4.id);dd.lock();}_13=true;}this.enable();},register:function(_33){var cs=_33 instanceof Array?_33:arguments;for(var i=0,len=cs.length;i<len;i++){var c=cs[i];var _38=c.target;if(_38){if(_38 instanceof Array){for(var j=0,_3a=_38.length;j<_3a;j++){_8[_38[j]]=c;}}else{_8[typeof _38=="string"?_38:Ext.id(_38)]=c;}}}},unregister:function(el){delete _8[Ext.id(el)];},enable:function(){if(_13&&_12){_17.pop();if(_17.length<1){_12=false;}}},disable:function(){_12=true;clearTimeout(_14);clearTimeout(_15);clearTimeout(_16);if(ce){_22(true);}_17.push(1);},isEnabled:function(){return!_12;},tagConfig:{namespace:"ext",attribute:"qtip",width:"width",target:"target",title:"qtitle",hide:"hide",cls:"qclass"}};}();Ext.QuickTips.tips=Ext.QuickTips.register;



Ext.menu.Menu=function(_1){Ext.apply(this,_1);this.id=this.id||Ext.id();this.addEvents({beforeshow:true,beforehide:true,show:true,hide:true,click:true,mouseover:true,mouseout:true,itemclick:true});Ext.menu.MenuMgr.register(this);var _2=this.items;this.items=new Ext.util.MixedCollection();if(_2){this.add.apply(this,_2);}};Ext.extend(Ext.menu.Menu,Ext.util.Observable,{minWidth:120,shadow:"sides",subMenuAlign:"tl-tr?",defaultAlign:"tl-bl?",allowOtherMenus:false,hidden:true,render:function(){if(this.el){return;}var el=this.el=new Ext.Layer({cls:"x-menu",shadow:this.shadow,constrain:false,parentEl:this.parentEl||document.body,zindex:15000});this.keyNav=new Ext.menu.MenuNav(this);if(this.plain){el.addClass("x-menu-plain");}if(this.cls){el.addClass(this.cls);}this.focusEl=el.createChild({tag:"a",cls:"x-menu-focus",href:"#",onclick:"return false;",tabIndex:"-1"});var ul=el.createChild({tag:"ul",cls:"x-menu-list"});ul.on("click",this.onClick,this);ul.on("mouseover",this.onMouseOver,this);ul.on("mouseout",this.onMouseOut,this);this.items.each(function(_5){var li=document.createElement("li");li.className="x-menu-list-item";ul.dom.appendChild(li);_5.render(li,this);},this);this.ul=ul;this.autoWidth();},autoWidth:function(){var el=this.el,ul=this.ul;if(!el){return;}var w=this.width;if(w){el.setWidth(w);}else{if(Ext.isIE){el.setWidth(this.minWidth);var t=el.dom.offsetWidth;el.setWidth(ul.getWidth()+el.getFrameWidth("lr"));}}},delayAutoWidth:function(){if(this.rendered){if(!this.awTask){this.awTask=new Ext.util.DelayedTask(this.autoWidth,this);}this.awTask.delay(20);}},findTargetItem:function(e){var t=e.getTarget(".x-menu-list-item",this.ul,true);if(t&&t.menuItemId){return this.items.get(t.menuItemId);}},onClick:function(e){var t;if(t=this.findTargetItem(e)){t.onClick(e);this.fireEvent("click",this,t,e);}},setActiveItem:function(_f,_10){if(_f!=this.activeItem){if(this.activeItem){this.activeItem.deactivate();}this.activeItem=_f;_f.activate(_10);}else{if(_10){_f.expandMenu();}}},tryActivate:function(_11,_12){var _13=this.items;for(var i=_11,len=_13.length;i>=0&&i<len;i+=_12){var _16=_13.get(i);if(!_16.disabled&&_16.canActivate){this.setActiveItem(_16,false);return _16;}}return false;},onMouseOver:function(e){var t;if(t=this.findTargetItem(e)){if(t.canActivate&&!t.disabled){this.setActiveItem(t,true);}}this.fireEvent("mouseover",this,e,t);},onMouseOut:function(e){var t;if(t=this.findTargetItem(e)){if(t==this.activeItem&&t.shouldDeactivate(e)){this.activeItem.deactivate();delete this.activeItem;}}this.fireEvent("mouseout",this,e,t);},isVisible:function(){return this.el&&!this.hidden;},show:function(el,pos,_1d){this.parentMenu=_1d;if(!this.el){this.render();}this.fireEvent("beforeshow",this);this.showAt(this.el.getAlignToXY(el,pos||this.defaultAlign),_1d,false);},showAt:function(xy,_1f,_e){this.parentMenu=_1f;if(!this.el){this.render();}if(_e!==false){this.fireEvent("beforeshow",this);xy=this.el.adjustForConstraints(xy);}this.el.setXY(xy);this.el.show();this.hidden=false;this.focus();this.fireEvent("show",this);},focus:function(){if(!this.hidden){this.doFocus.defer(50,this);}},doFocus:function(){if(!this.hidden){this.focusEl.focus();}},hide:function(_21){if(this.el&&this.isVisible()){this.fireEvent("beforehide",this);if(this.activeItem){this.activeItem.deactivate();this.activeItem=null;}this.el.hide();this.hidden=true;this.fireEvent("hide",this);}if(_21===true&&this.parentMenu){this.parentMenu.hide(true);}},add:function(){var a=arguments,l=a.length,_24;for(var i=0;i<l;i++){var el=a[i];if(el.render){_24=this.addItem(el);}else{if(typeof el=="string"){if(el=="separator"||el=="-"){_24=this.addSeparator();}else{_24=this.addText(el);}}else{if(el.tagName||el.el){_24=this.addElement(el);}else{if(typeof el=="object"){_24=this.addMenuItem(el);}}}}}return _24;},getEl:function(){if(!this.el){this.render();}return this.el;},addSeparator:function(){return this.addItem(new Ext.menu.Separator());},addElement:function(el){return this.addItem(new Ext.menu.BaseItem(el));},addItem:function(_28){this.items.add(_28);if(this.ul){var li=document.createElement("li");li.className="x-menu-list-item";this.ul.dom.appendChild(li);_28.render(li,this);this.delayAutoWidth();}return _28;},addMenuItem:function(_2a){if(!(_2a instanceof Ext.menu.Item)){if(typeof _2a.checked=="boolean"){_2a=new Ext.menu.CheckItem(_2a);}else{_2a=new Ext.menu.Item(_2a);}}return this.addItem(_2a);},addText:function(_2b){return this.addItem(new Ext.menu.TextItem(_2b));},insert:function(_2c,_2d){this.items.insert(_2c,_2d);if(this.ul){var li=document.createElement("li");li.className="x-menu-list-item";this.ul.dom.insertBefore(li,this.ul.dom.childNodes[_2c]);_2d.render(li,this);this.delayAutoWidth();}return _2d;},remove:function(_2f){this.items.removeKey(_2f.id);_2f.destroy();},removeAll:function(){var f;while(f=this.items.first()){this.remove(f);}}});Ext.menu.MenuNav=function(_31){Ext.menu.MenuNav.superclass.constructor.call(this,_31.el);this.scope=this.menu=_31;};Ext.extend(Ext.menu.MenuNav,Ext.KeyNav,{doRelay:function(e,h){var k=e.getKey();if(!this.menu.activeItem&&e.isNavKeyPress()&&k!=e.SPACE&&k!=e.RETURN){this.menu.tryActivate(0,1);return false;}return h.call(this.scope||this,e,this.menu);},up:function(e,m){if(!m.tryActivate(m.items.indexOf(m.activeItem)-1,-1)){m.tryActivate(m.items.length-1,-1);}},down:function(e,m){if(!m.tryActivate(m.items.indexOf(m.activeItem)+1,1)){m.tryActivate(0,1);}},right:function(e,m){if(m.activeItem){m.activeItem.expandMenu(true);}},left:function(e,m){m.hide();if(m.parentMenu&&m.parentMenu.activeItem){m.parentMenu.activeItem.activate();}},enter:function(e,m){if(m.activeItem){e.stopPropagation();m.activeItem.onClick(e);m.fireEvent("click",this,m.activeItem);return true;}}});



Ext.menu.MenuMgr=function(){var _1,_2,_3={},_4=false,_5=new Date();function init(){_1={},_2=new Ext.util.MixedCollection();Ext.get(document).addKeyListener(27,function(){if(_2.length>0){hideAll();}});}function hideAll(){if(_2.length>0){var c=_2.clone();c.each(function(m){m.hide();});}}function onHide(m){_2.remove(m);if(_2.length<1){Ext.get(document).un("mousedown",onMouseDown);_4=false;}}function onShow(m){var _a=_2.last();_5=new Date();_2.add(m);if(!_4){Ext.get(document).on("mousedown",onMouseDown);_4=true;}if(m.parentMenu){m.getEl().setZIndex(parseInt(m.parentMenu.getEl().getStyle("z-index"),10)+3);m.parentMenu.activeChild=m;}else{if(_a&&_a.isVisible()){m.getEl().setZIndex(parseInt(_a.getEl().getStyle("z-index"),10)+3);}}}function onBeforeHide(m){if(m.activeChild){m.activeChild.hide();}if(m.autoHideTimer){clearTimeout(m.autoHideTimer);delete m.autoHideTimer;}}function onBeforeShow(m){var pm=m.parentMenu;if(!pm&&!m.allowOtherMenus){hideAll();}else{if(pm&&pm.activeChild){pm.activeChild.hide();}}}function onMouseDown(e){if(_5.getElapsed()>50&&_2.length>0&&!e.getTarget(".x-menu")){hideAll();}}function onBeforeCheck(mi,_10){if(_10){var g=_3[mi.group];for(var i=0,l=g.length;i<l;i++){if(g[i]!=mi){g[i].setChecked(false);}}}}return{hideAll:function(){hideAll();},register:function(_14){if(!_1){init();}_1[_14.id]=_14;_14.on("beforehide",onBeforeHide);_14.on("hide",onHide);_14.on("beforeshow",onBeforeShow);_14.on("show",onShow);var g=_14.group;if(g&&_14.events["checkchange"]){if(!_3[g]){_3[g]=[];}_3[g].push(_14);_14.on("checkchange",onCheck);}},get:function(_16){if(typeof _16=="string"){return _1[_16];}else{if(_16.events){return _16;}else{if(typeof _16.length=="number"){return new Ext.menu.Menu({items:_16});}else{return new Ext.menu.Menu(_16);}}}},unregister:function(_17){delete _1[_17.id];_17.un("beforehide",onBeforeHide);_17.un("hide",onHide);_17.un("beforeshow",onBeforeShow);_17.un("show",onShow);var g=_17.group;if(g&&_17.events["checkchange"]){_3[g].remove(_17);_17.un("checkchange",onCheck);}},registerCheckable:function(_19){var g=_19.group;if(g){if(!_3[g]){_3[g]=[];}_3[g].push(_19);_19.on("beforecheckchange",onBeforeCheck);}},unregisterCheckable:function(_1b){var g=_1b.group;if(g){_3[g].remove(_1b);_1b.un("beforecheckchange",onBeforeCheck);}}};}();



Ext.menu.BaseItem=function(_1){Ext.menu.BaseItem.superclass.constructor.call(this,_1);this.addEvents({click:true,activate:true,deactivate:true});if(this.handler){this.on("click",this.handler,this.scope,true);}};Ext.extend(Ext.menu.BaseItem,Ext.Component,{canActivate:false,activeClass:"x-menu-item-active",hideOnClick:true,hideDelay:100,ctype:"Ext.menu.BaseItem",actionMode:"container",render:function(_2,_3){this.parentMenu=_3;Ext.menu.BaseItem.superclass.render.call(this,_2);this.container.menuItemId=this.id;},onRender:function(_4,_5){this.el=Ext.get(this.el);_4.dom.appendChild(this.el.dom);},onClick:function(e){if(!this.disabled&&this.fireEvent("click",this,e)!==false&&this.parentMenu.fireEvent("itemclick",this,e)!==false){this.handleClick(e);}else{e.stopEvent();}},activate:function(){if(this.disabled){return false;}var li=this.container;li.addClass(this.activeClass);this.region=li.getRegion().adjust(2,2,-2,-2);this.fireEvent("activate",this);return true;},deactivate:function(){this.container.removeClass(this.activeClass);this.fireEvent("deactivate",this);},shouldDeactivate:function(e){return!this.region||!this.region.contains(e.getPoint());},handleClick:function(e){if(this.hideOnClick){this.parentMenu.hide.defer(this.hideDelay,this.parentMenu,[true]);}},expandMenu:function(_a){},hideMenu:function(){}});



Ext.menu.TextItem=function(_1){this.text=_1;Ext.menu.TextItem.superclass.constructor.call(this);};Ext.extend(Ext.menu.TextItem,Ext.menu.BaseItem,{hideOnClick:false,itemCls:"x-menu-text",onRender:function(){var s=document.createElement("span");s.className=this.itemCls;s.innerHTML=this.text;this.el=s;Ext.menu.TextItem.superclass.onRender.apply(this,arguments);}});



Ext.menu.Separator=function(_1){Ext.menu.Separator.superclass.constructor.call(this,_1);};Ext.extend(Ext.menu.Separator,Ext.menu.BaseItem,{itemCls:"x-menu-sep",hideOnClick:false,onRender:function(li){var s=document.createElement("span");s.className=this.itemCls;s.innerHTML="&#160;";this.el=s;li.addClass("x-menu-sep-li");Ext.menu.Separator.superclass.onRender.apply(this,arguments);}});



Ext.menu.Item=function(_1){Ext.menu.Item.superclass.constructor.call(this,_1);if(this.menu){this.menu=Ext.menu.MenuMgr.get(this.menu);}};Ext.extend(Ext.menu.Item,Ext.menu.BaseItem,{itemCls:"x-menu-item",canActivate:true,ctype:"Ext.menu.Item",showDelay:200,hideDelay:200,onRender:function(_2,_3){var el=document.createElement("a");el.hideFocus=true;el.unselectable="on";el.href=this.href||"#";if(this.hrefTarget){el.target=this.hrefTarget;}el.className=this.itemCls+(this.menu?" x-menu-item-arrow":"")+(this.cls?" "+this.cls:"");el.innerHTML=String.format("<img src=\"{0}\" class=\"x-menu-item-icon {2}\" />{1}",this.icon||Ext.BLANK_IMAGE_URL,this.text,this.iconCls||"");this.el=el;Ext.menu.Item.superclass.onRender.call(this,_2,_3);},setText:function(_5){this.text=_5;if(this.rendered){this.el.update(String.format("<img src=\"{0}\" class=\"x-menu-item-icon {2}\">{1}",this.icon||Ext.BLANK_IMAGE_URL,this.text,this.iconCls||""));this.parentMenu.autoWidth();}},handleClick:function(e){if(!this.href){e.stopEvent();}Ext.menu.Item.superclass.handleClick.apply(this,arguments);},activate:function(_7){if(Ext.menu.Item.superclass.activate.apply(this,arguments)){this.focus();if(_7){this.expandMenu();}}return true;},shouldDeactivate:function(e){if(Ext.menu.Item.superclass.shouldDeactivate.call(this,e)){if(this.menu&&this.menu.isVisible()){return!this.menu.getEl().getRegion().contains(e.getPoint());}return true;}return false;},deactivate:function(){Ext.menu.Item.superclass.deactivate.apply(this,arguments);this.hideMenu();},expandMenu:function(_9){if(!this.disabled&&this.menu){clearTimeout(this.hideTimer);delete this.hideTimer;if(!this.menu.isVisible()&&!this.showTimer){this.showTimer=this.deferExpand.defer(this.showDelay,this,[_9]);}else{if(this.menu.isVisible()&&_9){this.menu.tryActivate(0,1);}}}},deferExpand:function(_a){delete this.showTimer;this.menu.show(this.container,this.parentMenu.subMenuAlign||"tl-tr?",this.parentMenu);if(_a){this.menu.tryActivate(0,1);}},hideMenu:function(){clearTimeout(this.showTimer);delete this.showTimer;if(!this.hideTimer&&this.menu&&this.menu.isVisible()){this.hideTimer=this.deferHide.defer(this.hideDelay,this);}},deferHide:function(){delete this.hideTimer;this.menu.hide();}});



Ext.menu.CheckItem=function(_1){Ext.menu.CheckItem.superclass.constructor.call(this,_1);this.addEvents({"beforecheckchange":true,"checkchange":true});if(this.checkHandler){this.on("checkchange",this.checkHandler,this.scope);}};Ext.extend(Ext.menu.CheckItem,Ext.menu.Item,{itemCls:"x-menu-item x-menu-check-item",groupClass:"x-menu-group-item",checked:false,ctype:"Ext.menu.CheckItem",onRender:function(c){Ext.menu.CheckItem.superclass.onRender.apply(this,arguments);if(this.group){this.el.addClass(this.groupClass);}Ext.menu.MenuMgr.registerCheckable(this);if(this.checked){this.checked=false;this.setChecked(true,true);}},destroy:function(){if(this.rendered){Ext.menu.MenuMgr.unregisterCheckable(this);}Ext.menu.CheckItem.superclass.destroy.apply(this,arguments);},setChecked:function(_3,_4){if(this.checked!=_3&&this.fireEvent("beforecheckchange",this,_3)!==false){if(this.container){this.container[_3?"addClass":"removeClass"]("x-menu-item-checked");}this.checked=_3;if(_4!==true){this.fireEvent("checkchange",this,_3);}}},handleClick:function(e){if(!this.disabled&&!(this.checked&&this.group)){this.setChecked(!this.checked);}Ext.menu.CheckItem.superclass.handleClick.apply(this,arguments);}});



Ext.menu.Adapter=function(_1,_2){Ext.menu.Adapter.superclass.constructor.call(this,_2);this.component=_1;};Ext.extend(Ext.menu.Adapter,Ext.menu.BaseItem,{canActivate:true,onRender:function(_3,_4){this.component.render(_3);this.el=this.component.getEl();},activate:function(){if(this.disabled){return false;}this.component.focus();this.fireEvent("activate",this);return true;},deactivate:function(){this.fireEvent("deactivate",this);},disable:function(){this.component.disable();Ext.menu.Adapter.superclass.disable.call(this);},enable:function(){this.component.enable();Ext.menu.Adapter.superclass.enable.call(this);}});



Ext.menu.ColorItem=function(_1){Ext.menu.ColorItem.superclass.constructor.call(this,new Ext.ColorPalette(_1),_1);this.palette=this.component;this.relayEvents(this.palette,["select"]);if(this.selectHandler){this.on("select",this.selectHandler,this.scope);}};Ext.extend(Ext.menu.ColorItem,Ext.menu.Adapter);



Ext.menu.ColorMenu=function(_1){Ext.menu.ColorMenu.superclass.constructor.call(this,_1);this.plain=true;var ci=new Ext.menu.ColorItem(_1);this.add(ci);this.palette=ci.palette;this.relayEvents(ci,["select"]);};Ext.extend(Ext.menu.ColorMenu,Ext.menu.Menu);



Ext.form.Field=function(_1){Ext.form.Field.superclass.constructor.call(this,_1);};Ext.extend(Ext.form.Field,Ext.BoxComponent,{invalidClass:"x-form-invalid",invalidText:"The value in this field is invalid",focusClass:"x-form-focus",validationEvent:"keyup",validateOnBlur:true,validationDelay:250,defaultAutoCreate:{tag:"input",type:"text",size:"20",autocomplete:"off"},fieldClass:"x-form-field",msgTarget:"qtip",msgFx:"normal",readOnly:false,disabled:false,inputType:undefined,tabIndex:undefined,isFormField:true,hasFocus:false,value:undefined,initComponent:function(){Ext.form.Field.superclass.initComponent.call(this);this.addEvents({focus:true,blur:true,specialkey:true,change:true,invalid:true,valid:true});},getName:function(){return this.rendered&&this.el.dom.name?this.el.dom.name:(this.hiddenName||"");},onRender:function(ct,_3){Ext.form.Field.superclass.onRender.call(this,ct,_3);if(!this.el){var _4=this.getAutoCreate();if(!_4.name){_4.name=this.name||this.id;}if(this.inputType){_4.type=this.inputType;}this.el=ct.createChild(_4,_3);}var _5=this.el.dom.type;if(_5){if(_5=="password"){_5="text";}this.el.addClass("x-form-"+_5);}if(this.readOnly){this.el.dom.readOnly=true;}if(this.tabIndex!==undefined){this.el.dom.setAttribute("tabIndex",this.tabIndex);}this.el.addClass([this.fieldClass,this.cls]);this.initValue();},applyTo:function(_6){this.allowDomMove=false;this.el=Ext.get(_6);this.render(this.el.dom.parentNode);return this;},initValue:function(){if(this.value!==undefined){this.setValue(this.value);}else{if(this.el.dom.value.length>0){this.setValue(this.el.dom.value);}}},isDirty:function(){if(this.disabled){return false;}return String(this.getValue())!==String(this.originalValue);},afterRender:function(){Ext.form.Field.superclass.afterRender.call(this);this.initEvents();},fireKey:function(e){if(e.isNavKeyPress()){this.fireEvent("specialkey",this,e);}},reset:function(){this.setValue(this.originalValue);this.clearInvalid();},initEvents:function(){this.el.on(Ext.isIE?"keydown":"keypress",this.fireKey,this);this.el.on("focus",this.onFocus,this);this.el.on("blur",this.onBlur,this);this.originalValue=this.getValue();},onFocus:function(){if(!Ext.isOpera){this.el.addClass(this.focusClass);}this.hasFocus=true;this.startValue=this.getValue();this.fireEvent("focus",this);},beforeBlur:Ext.emptyFn,onBlur:function(){this.beforeBlur();this.el.removeClass(this.focusClass);this.hasFocus=false;if(this.validationEvent!==false&&this.validateOnBlur&&this.validationEvent!="blur"){this.validate();}var v=this.getValue();if(v!=this.startValue){this.fireEvent("change",this,v,this.startValue);}this.fireEvent("blur",this);},isValid:function(_9){if(this.disabled){return true;}var _a=this.preventMark;this.preventMark=_9===true;var v=this.validateValue(this.processValue(this.getRawValue()));this.preventMark=_a;return v;},validate:function(){if(this.disabled||this.validateValue(this.processValue(this.getRawValue()))){this.clearInvalid();return true;}return false;},processValue:function(_c){return _c;},validateValue:function(_d){return true;},markInvalid:function(_e){if(!this.rendered||this.preventMark){return;}this.el.addClass(this.invalidClass);_e=_e||this.invalidText;switch(this.msgTarget){case"qtip":this.el.dom.qtip=_e;this.el.dom.qclass="x-form-invalid-tip";if(Ext.QuickTips){Ext.QuickTips.enable();}break;case"title":this.el.dom.title=_e;break;case"under":if(!this.errorEl){var _f=this.el.findParent(".x-form-element",5,true);this.errorEl=_f.createChild({cls:"x-form-invalid-msg"});this.errorEl.setWidth(_f.getWidth(true)-20);}this.errorEl.update(_e);Ext.form.Field.msgFx[this.msgFx].show(this.errorEl,this);break;case"side":if(!this.errorIcon){var _f=this.el.findParent(".x-form-element",5,true);this.errorIcon=_f.createChild({cls:"x-form-invalid-icon"});}this.alignErrorIcon();this.errorIcon.dom.qtip=_e;this.errorIcon.dom.qclass="x-form-invalid-tip";this.errorIcon.show();this.on("resize",this.alignErrorIcon,this);break;default:var t=Ext.getDom(this.msgTarget);t.innerHTML=_e;t.style.display=this.msgDisplay;break;}this.fireEvent("invalid",this,_e);},alignErrorIcon:function(){this.errorIcon.alignTo(this.el,"tl-tr",[2,0]);},clearInvalid:function(){if(!this.rendered||this.preventMark){return;}this.el.removeClass(this.invalidClass);switch(this.msgTarget){case"qtip":this.el.dom.qtip="";break;case"title":this.el.dom.title="";break;case"under":if(this.errorEl){Ext.form.Field.msgFx[this.msgFx].hide(this.errorEl,this);}break;case"side":if(this.errorIcon){this.errorIcon.dom.qtip="";this.errorIcon.hide();this.un("resize",this.alignErrorIcon,this);}break;default:var t=Ext.getDom(this.msgTarget);t.innerHTML="";t.style.display="none";break;}this.fireEvent("valid",this);},getRawValue:function(){var v=this.el.getValue();if(v===this.emptyText){v="";}return v;},getValue:function(){var v=this.el.getValue();if(v===this.emptyText||v===undefined){v="";}return v;},setRawValue:function(v){return this.el.dom.value=(v===null||v===undefined?"":v);},setValue:function(v){this.value=v;if(this.rendered){this.el.dom.value=(v===null||v===undefined?"":v);this.validate();}},adjustSize:function(w,h){var s=Ext.form.Field.superclass.adjustSize.call(this,w,h);s.width=this.adjustWidth(this.el.dom.tagName,s.width);return s;},adjustWidth:function(tag,w){tag=tag.toLowerCase();if(typeof w=="number"&&Ext.isStrict&&!Ext.isSafari){if(Ext.isIE&&(tag=="input"||tag=="textarea")){if(tag=="input"){return w+2;}if(tag="textarea"){return w-2;}}else{if(Ext.isOpera){if(tag=="input"){return w+2;}if(tag="textarea"){return w-2;}}}}return w;}});Ext.form.Field.msgFx={normal:{show:function(_1b,f){_1b.setDisplayed("block");},hide:function(_1d,f){_1d.setDisplayed(false).update("");}},slide:{show:function(_1f,f){_1f.slideIn("t",{stopFx:true});},hide:function(_21,f){_21.slideOut("t",{stopFx:true,useDisplay:true});}},slideRight:{show:function(_23,f){_23.fixDisplay();_23.alignTo(f.el,"tl-tr");_23.slideIn("l",{stopFx:true});},hide:function(_25,f){_25.slideOut("l",{stopFx:true,useDisplay:true});}}};



Ext.form.TextField=function(_1){Ext.form.TextField.superclass.constructor.call(this,_1);this.addEvents({autosize:true});};Ext.extend(Ext.form.TextField,Ext.form.Field,{grow:false,growMin:30,growMax:800,vtype:null,maskRe:null,disableKeyFilter:false,allowBlank:true,minLength:0,maxLength:Number.MAX_VALUE,minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",selectOnFocus:false,blankText:"This field is required",validator:null,regex:null,regexText:"",emptyText:null,emptyClass:"x-form-empty-field",initEvents:function(){Ext.form.TextField.superclass.initEvents.call(this);if(this.validationEvent=="keyup"){this.validationTask=new Ext.util.DelayedTask(this.validate,this);this.el.on("keyup",this.filterValidation,this);}else{if(this.validationEvent!==false){this.el.on(this.validationEvent,this.validate,this,{buffer:this.validationDelay});}}if(this.selectOnFocus||this.emptyText){this.on("focus",this.preFocus,this);if(this.emptyText){this.on("blur",this.postBlur,this);this.applyEmptyText();}}if(this.maskRe||(this.vtype&&this.disableKeyFilter!==true&&(this.maskRe=Ext.form.VTypes[this.vtype+"Mask"]))){this.el.on("keypress",this.filterKeys,this);}if(this.grow){this.el.on("keyup",this.onKeyUp,this,{buffer:50});this.el.on("click",this.autoSize,this);}},processValue:function(_2){if(this.stripCharsRe){var _3=_2.replace(this.stripCharsRe,"");if(_3!==_2){this.setRawValue(_3);return _3;}}return _2;},filterValidation:function(e){if(!e.isNavKeyPress()){this.validationTask.delay(this.validationDelay);}},onKeyUp:function(e){if(!e.isNavKeyPress()){this.autoSize();}},reset:function(){Ext.form.TextField.superclass.reset.call(this);this.applyEmptyText();},applyEmptyText:function(){if(this.rendered&&this.emptyText&&this.getRawValue().length<1){this.setRawValue(this.emptyText);this.el.addClass(this.emptyClass);}},preFocus:function(){if(this.emptyText){if(this.el.dom.value==this.emptyText){this.setRawValue("");}this.el.removeClass(this.emptyClass);}if(this.selectOnFocus){this.el.dom.select();}},postBlur:function(){this.applyEmptyText();},filterKeys:function(e){var k=e.getKey();if(!Ext.isIE&&(e.isNavKeyPress()||k==e.BACKSPACE||(k==e.DELETE&&e.button==-1))){return;}if(Ext.isIE&&(k==e.BACKSPACE||k==e.DELETE||e.isNavKeyPress()||k==e.HOME||k==e.END)){return;}var c=e.getCharCode();if(!this.maskRe.test(String.fromCharCode(c)||"")){e.stopEvent();}},setValue:function(v){if(this.emptyText&&this.el&&v!==undefined&&v!==null&&v!==""){this.el.removeClass(this.emptyClass);}Ext.form.TextField.superclass.setValue.apply(this,arguments);this.applyEmptyText();this.autoSize();},validateValue:function(_a){if(_a.length<1||_a===this.emptyText){if(this.allowBlank){this.clearInvalid();return true;}else{this.markInvalid(this.blankText);return false;}}if(_a.length<this.minLength){this.markInvalid(String.format(this.minLengthText,this.minLength));return false;}if(_a.length>this.maxLength){this.markInvalid(String.format(this.maxLengthText,this.maxLength));return false;}if(this.vtype){var vt=Ext.form.VTypes;if(!vt[this.vtype](_a,this)){this.markInvalid(this.vtypeText||vt[this.vtype+"Text"]);return false;}}if(typeof this.validator=="function"){var _c=this.validator(_a);if(_c!==true){this.markInvalid(_c);return false;}}if(this.regex&&!this.regex.test(_a)){this.markInvalid(this.regexText);return false;}return true;},selectText:function(_d,_e){var v=this.getRawValue();if(v.length>0){_d=_d===undefined?0:_d;_e=_e===undefined?v.length:_e;var d=this.el.dom;if(d.setSelectionRange){d.setSelectionRange(_d,_e);}else{if(d.createTextRange){var _11=d.createTextRange();_11.moveStart("character",_d);_11.moveEnd("character",v.length-_e);_11.select();}}}},autoSize:function(){if(!this.grow||!this.rendered){return;}if(!this.metrics){this.metrics=Ext.util.TextMetrics.createInstance(this.el);}var el=this.el;var v=el.dom.value;var d=document.createElement("div");d.appendChild(document.createTextNode(v));v=d.innerHTML;d=null;v+="&#160;";var w=Math.min(this.growMax,Math.max(this.metrics.getWidth(v)+10,this.growMin));this.el.setWidth(w);this.fireEvent("autosize",this,w);}});



Ext.form.TextArea=function(_1){Ext.form.TextArea.superclass.constructor.call(this,_1);if(this.minHeight!==undefined){this.growMin=this.minHeight;}if(this.maxHeight!==undefined){this.growMax=this.maxHeight;}};Ext.extend(Ext.form.TextArea,Ext.form.TextField,{growMin:60,growMax:1000,preventScrollbars:false,onRender:function(ct,_3){if(!this.el){this.defaultAutoCreate={tag:"textarea",style:"width:300px;height:60px;",autocomplete:"off"};}Ext.form.TextArea.superclass.onRender.call(this,ct,_3);if(this.grow){this.textSizeEl=Ext.DomHelper.append(document.body,{tag:"pre",cls:"x-form-grow-sizer"});if(this.preventScrollbars){this.el.setStyle("overflow","hidden");}this.el.setHeight(this.growMin);}},onDestroy:function(){if(this.textSizeEl){this.textSizeEl.parentNode.removeChild(this.textSizeEl);}Ext.form.TextArea.superclass.onDestroy.call(this);},onKeyUp:function(e){if(!e.isNavKeyPress()||e.getKey()==e.ENTER){this.autoSize();}},autoSize:function(){if(!this.grow||!this.textSizeEl){return;}var el=this.el;var v=el.dom.value;var ts=this.textSizeEl;ts.innerHTML="";ts.appendChild(document.createTextNode(v));v=ts.innerHTML;Ext.fly(ts).setWidth(this.el.getWidth());if(v.length<1){v="&#160;&#160;";}else{if(Ext.isIE){v=v.replace(/\n/g,"<p>&#160;</p>");}v+="&#160;\n&#160;";}ts.innerHTML=v;var h=Math.min(this.growMax,Math.max(ts.offsetHeight,this.growMin));if(h!=this.lastHeight){this.lastHeight=h;this.el.setHeight(h);this.fireEvent("autosize",this,h);}}});



Ext.form.NumberField=function(_1){Ext.form.NumberField.superclass.constructor.call(this,_1);};Ext.extend(Ext.form.NumberField,Ext.form.TextField,{fieldClass:"x-form-field x-form-num-field",allowDecimals:true,decimalSeparator:".",decimalPrecision:2,allowNegative:true,minValue:Number.NEGATIVE_INFINITY,maxValue:Number.MAX_VALUE,minText:"The minimum value for this field is {0}",maxText:"The maximum value for this field is {0}",nanText:"{0} is not a valid number",initEvents:function(){Ext.form.NumberField.superclass.initEvents.call(this);var _2="0123456789";if(this.allowDecimals){_2+=this.decimalSeparator;}if(this.allowNegative){_2+="-";}this.stripCharsRe=new RegExp("[^"+_2+"]","gi");var _3=function(e){var k=e.getKey();if(!Ext.isIE&&(e.isSpecialKey()||k==e.BACKSPACE||k==e.DELETE)){return;}var c=e.getCharCode();if(_2.indexOf(String.fromCharCode(c))===-1){e.stopEvent();}};this.el.on("keypress",_3,this);},validateValue:function(_7){if(!Ext.form.NumberField.superclass.validateValue.call(this,_7)){return false;}if(_7.length<1){return true;}var _8=this.parseValue(_7);if(isNaN(_8)){this.markInvalid(String.format(this.nanText,_7));return false;}if(_8<this.minValue){this.markInvalid(String.format(this.minText,this.minValue));return false;}if(_8>this.maxValue){this.markInvalid(String.format(this.maxText,this.maxValue));return false;}return true;},getValue:function(){return this.fixPrecision(this.parseValue(Ext.form.NumberField.superclass.getValue.call(this)));},parseValue:function(_9){return parseFloat(String(_9).replace(this.decimalSeparator,"."))||"";},fixPrecision:function(_a){var _b=isNaN(_a);if(!this.allowDecimals||this.decimalPrecision==-1||_b||!_a){return _b?"":_a;}var _c=Math.pow(10,this.decimalPrecision+1);var _d=this.decimalPrecisionFcn(_a*_c);_d=this.decimalPrecisionFcn(_d/10);return _d/(_c/10);},decimalPrecisionFcn:function(v){return Math.floor(v);},beforeBlur:function(){var v=this.parseValue(this.getRawValue());if(v){this.setValue(this.fixPrecision(v));}}});



Ext.form.Checkbox=function(_1){Ext.form.Checkbox.superclass.constructor.call(this,_1);this.addEvents({check:true});};Ext.extend(Ext.form.Checkbox,Ext.form.Field,{focusClass:"x-form-check-focus",fieldClass:"x-form-field",checked:false,defaultAutoCreate:{tag:"input",type:"checkbox",autocomplete:"off"},boxLabel:undefined,onResize:function(){Ext.form.Checkbox.superclass.onResize.apply(this,arguments);if(!this.boxLabel){this.el.alignTo(this.wrap,"c-c");}},initEvents:function(){Ext.form.Checkbox.superclass.initEvents.call(this);this.el.on("click",this.onClick,this);this.el.on("change",this.onClick,this);},getResizeEl:function(){return this.wrap;},getPositionEl:function(){return this.wrap;},onRender:function(ct,_3){Ext.form.Checkbox.superclass.onRender.call(this,ct,_3);if(this.inputValue!==undefined){this.el.dom.value=this.inputValue;}this.wrap=this.el.wrap({cls:"x-form-check-wrap"});if(this.boxLabel){this.wrap.createChild({tag:"label",htmlFor:this.el.id,cls:"x-form-cb-label",html:this.boxLabel});}if(this.checked){this.setValue(true);}else{this.checked=this.el.dom.checked;}},initValue:Ext.emptyFn,getValue:function(){if(this.rendered){return this.el.dom.checked;}return false;},onClick:function(){if(this.el.dom.checked!=this.checked){this.setValue(this.el.dom.checked);}},setValue:function(v){this.checked=(v===true||v==="true"||v=="1"||String(v).toLowerCase()=="on");if(this.el&&this.el.dom){this.el.dom.checked=this.checked;}this.fireEvent("check",this,this.checked);}});



Ext.form.Radio=function(){Ext.form.Radio.superclass.constructor.apply(this,arguments);};Ext.extend(Ext.form.Radio,Ext.form.Checkbox,{inputType:"radio",getGroupValue:function(){return this.el.up("form").child("input[name="+this.el.dom.name+"]:checked",true).value;}});



Ext.LayoutManager=function(_1,_2){Ext.LayoutManager.superclass.constructor.call(this);this.el=Ext.get(_1);if(this.el.dom==document.body&&Ext.isIE&&!_2.allowScroll){document.body.scroll="no";}else{if(this.el.dom!=document.body&&this.el.getStyle("position")=="static"){this.el.position("relative");}}this.id=this.el.id;this.el.addClass("x-layout-container");this.monitorWindowResize=true;this.regions={};this.addEvents({"layout":true,"regionresized":true,"regioncollapsed":true,"regionexpanded":true});this.updating=false;Ext.EventManager.onWindowResize(this.onWindowResize,this,true);};Ext.extend(Ext.LayoutManager,Ext.util.Observable,{isUpdating:function(){return this.updating;},beginUpdate:function(){this.updating=true;},endUpdate:function(_3){this.updating=false;if(!_3){this.layout();}},layout:function(){},onRegionResized:function(_4,_5){this.fireEvent("regionresized",_4,_5);this.layout();},onRegionCollapsed:function(_6){this.fireEvent("regioncollapsed",_6);},onRegionExpanded:function(_7){this.fireEvent("regionexpanded",_7);},getViewSize:function(){var _8;if(this.el.dom!=document.body){_8=this.el.getSize();}else{_8={width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()};}_8.width-=this.el.getBorderWidth("lr")-this.el.getPadding("lr");_8.height-=this.el.getBorderWidth("tb")-this.el.getPadding("tb");return _8;},getEl:function(){return this.el;},getRegion:function(_9){return this.regions[_9.toLowerCase()];},onWindowResize:function(){if(this.monitorWindowResize){this.layout();}}});



Ext.BorderLayout=function(_1,_2){_2=_2||{};Ext.BorderLayout.superclass.constructor.call(this,_1,_2);this.factory=_2.factory||Ext.BorderLayout.RegionFactory;for(var i=0,_4=this.factory.validRegions.length;i<_4;i++){var _5=this.factory.validRegions[i];if(_2[_5]){this.addRegion(_5,_2[_5]);}}};Ext.extend(Ext.BorderLayout,Ext.LayoutManager,{addRegion:function(_6,_7){if(!this.regions[_6]){var r=this.factory.create(_6,this,_7);this.bindRegion(_6,r);}return this.regions[_6];},bindRegion:function(_9,r){this.regions[_9]=r;r.on("visibilitychange",this.layout,this);r.on("paneladded",this.layout,this);r.on("panelremoved",this.layout,this);r.on("invalidated",this.layout,this);r.on("resized",this.onRegionResized,this);r.on("collapsed",this.onRegionCollapsed,this);r.on("expanded",this.onRegionExpanded,this);},layout:function(){if(this.updating){return;}var _b=this.getViewSize();var w=_b.width,h=_b.height;var _e=w,_f=h,_10=0,_11=0;var rs=this.regions;var n=rs["north"],s=rs["south"],_15=rs["west"],e=rs["east"],c=rs["center"];if(n&&n.isVisible()){var b=n.getBox();var m=n.getMargins();b.width=w-(m.left+m.right);b.x=m.left;b.y=m.top;_10=b.height+b.y+m.bottom;_f-=_10;n.updateBox(this.safeBox(b));}if(s&&s.isVisible()){var b=s.getBox();var m=s.getMargins();b.width=w-(m.left+m.right);b.x=m.left;var _1a=(b.height+m.top+m.bottom);b.y=h-_1a+m.top;_f-=_1a;s.updateBox(this.safeBox(b));}if(_15&&_15.isVisible()){var b=_15.getBox();var m=_15.getMargins();b.height=_f-(m.top+m.bottom);b.x=m.left;b.y=_10+m.top;var _1b=(b.width+m.left+m.right);_11+=_1b;_e-=_1b;_15.updateBox(this.safeBox(b));}if(e&&e.isVisible()){var b=e.getBox();var m=e.getMargins();b.height=_f-(m.top+m.bottom);var _1b=(b.width+m.left+m.right);b.x=w-_1b+m.left;b.y=_10+m.top;_e-=_1b;e.updateBox(this.safeBox(b));}if(c){var m=c.getMargins();var _1c={x:_11+m.left,y:_10+m.top,width:_e-(m.left+m.right),height:_f-(m.top+m.bottom)};c.updateBox(this.safeBox(_1c));}this.el.repaint();this.fireEvent("layout",this);},safeBox:function(box){box.width=Math.max(0,box.width);box.height=Math.max(0,box.height);return box;},add:function(_1e,_1f){_1e=_1e.toLowerCase();return this.regions[_1e].add(_1f);},remove:function(_20,_21){_20=_20.toLowerCase();return this.regions[_20].remove(_21);},findPanel:function(_22){var rs=this.regions;for(var _24 in rs){if(typeof rs[_24]!="function"){var p=rs[_24].getPanel(_22);if(p){return p;}}}return null;},showPanel:function(_26){var rs=this.regions;for(var _28 in rs){var r=rs[_28];if(typeof r!="function"){if(r.hasPanel(_26)){return r.showPanel(_26);}}}return null;},restoreState:function(_2a){if(!_2a){_2a=Ext.state.Manager;}var sm=new Ext.LayoutStateManager();sm.init(this,_2a);},batchAdd:function(_2c){this.beginUpdate();for(var _2d in _2c){var lr=this.regions[_2d];if(lr){this.addTypedPanels(lr,_2c[_2d]);}}this.endUpdate();},addTypedPanels:function(lr,ps){if(typeof ps=="string"){lr.add(new Ext.ContentPanel(ps));}else{if(ps instanceof Array){for(var i=0,len=ps.length;i<len;i++){this.addTypedPanels(lr,ps[i]);}}else{if(!ps.events){var el=ps.el;delete ps.el;lr.add(new Ext.ContentPanel(el||Ext.id(),ps));}else{lr.add(ps);}}}}});Ext.BorderLayout.create=function(_34,_35){var _36=new Ext.BorderLayout(_35||document.body,_34);_36.beginUpdate();var _37=Ext.BorderLayout.RegionFactory.validRegions;for(var j=0,_39=_37.length;j<_39;j++){var lr=_37[j];if(_36.regions[lr]&&_34[lr].panels){var r=_36.regions[lr];var ps=_34[lr].panels;_36.addTypedPanels(r,ps);}}_36.endUpdate();return _36;};Ext.BorderLayout.RegionFactory={validRegions:["north","south","east","west","center"],create:function(_3d,mgr,_3f){_3d=_3d.toLowerCase();if(_3f.lightweight||_3f.basic){return new Ext.BasicLayoutRegion(mgr,_3f,_3d);}switch(_3d){case"north":return new Ext.NorthLayoutRegion(mgr,_3f);case"south":return new Ext.SouthLayoutRegion(mgr,_3f);case"east":return new Ext.EastLayoutRegion(mgr,_3f);case"west":return new Ext.WestLayoutRegion(mgr,_3f);case"center":return new Ext.CenterLayoutRegion(mgr,_3f);}throw"Layout region \""+_3d+"\" not supported.";}};



Ext.BasicLayoutRegion=function(_1,_2,_3,_4){this.mgr=_1;this.position=_3;this.events={"beforeremove":true,"invalidated":true,"visibilitychange":true,"paneladded":true,"panelremoved":true,"collapsed":true,"expanded":true,"slideshow":true,"slidehide":true,"panelactivated":true,"resized":true};this.panels=new Ext.util.MixedCollection();this.panels.getKey=this.getPanelId.createDelegate(this);this.box=null;this.activePanel=null;if(_4!==true){this.applyConfig(_2);}};Ext.extend(Ext.BasicLayoutRegion,Ext.util.Observable,{getPanelId:function(p){return p.getId();},applyConfig:function(_6){this.margins=_6.margins||this.margins||{top:0,left:0,right:0,bottom:0};this.config=_6;},resizeTo:function(_7){var el=this.el?this.el:(this.activePanel?this.activePanel.getEl():null);if(el){switch(this.position){case"east":case"west":el.setWidth(_7);this.fireEvent("resized",this,_7);break;case"north":case"south":el.setHeight(_7);this.fireEvent("resized",this,_7);break;}}},getBox:function(){return this.activePanel?this.activePanel.getEl().getBox(false,true):null;},getMargins:function(){return this.margins;},updateBox:function(_9){this.box=_9;var el=this.activePanel.getEl();el.dom.style.left=_9.x+"px";el.dom.style.top=_9.y+"px";this.activePanel.setSize(_9.width,_9.height);},getEl:function(){return this.activePanel;},isVisible:function(){return this.activePanel?true:false;},setActivePanel:function(_b){_b=this.getPanel(_b);if(this.activePanel&&this.activePanel!=_b){this.activePanel.setActiveState(false);this.activePanel.getEl().setLeftTop(-10000,-10000);}this.activePanel=_b;_b.setActiveState(true);if(this.box){_b.setSize(this.box.width,this.box.height);}this.fireEvent("panelactivated",this,_b);this.fireEvent("invalidated");},showPanel:function(_c){if(_c=this.getPanel(_c)){this.setActivePanel(_c);}return _c;},getActivePanel:function(){return this.activePanel;},add:function(_d){if(arguments.length>1){for(var i=0,_f=arguments.length;i<_f;i++){this.add(arguments[i]);}return null;}if(this.hasPanel(_d)){this.showPanel(_d);return _d;}var el=_d.getEl();if(el.dom.parentNode!=this.mgr.el.dom){this.mgr.el.dom.appendChild(el.dom);}if(_d.setRegion){_d.setRegion(this);}this.panels.add(_d);el.setStyle("position","absolute");if(!_d.background){this.setActivePanel(_d);if(this.config.initialSize&&this.panels.getCount()==1){this.resizeTo(this.config.initialSize);}}this.fireEvent("paneladded",this,_d);return _d;},hasPanel:function(_11){if(typeof _11=="object"){_11=_11.getId();}return this.getPanel(_11)?true:false;},remove:function(_12,_13){_12=this.getPanel(_12);if(!_12){return null;}var e={};this.fireEvent("beforeremove",this,_12,e);if(e.cancel===true){return null;}var _15=_12.getId();this.panels.removeKey(_15);return _12;},getPanel:function(id){if(typeof id=="object"){return id;}return this.panels.get(id);},getPosition:function(){return this.position;}});



Ext.LayoutRegion=function(_1,_2,_3){Ext.LayoutRegion.superclass.constructor.call(this,_1,_2,_3,true);var dh=Ext.DomHelper;this.el=dh.append(_1.el.dom,{tag:"div",cls:"x-layout-panel x-layout-panel-"+this.position},true);this.titleEl=dh.append(this.el.dom,{tag:"div",unselectable:"on",cls:"x-unselectable x-layout-panel-hd x-layout-title-"+this.position,children:[{tag:"span",cls:"x-unselectable x-layout-panel-hd-text",unselectable:"on",html:"&#160;"},{tag:"div",cls:"x-unselectable x-layout-panel-hd-tools",unselectable:"on"}]},true);this.titleEl.enableDisplayMode();this.titleTextEl=this.titleEl.dom.firstChild;this.tools=Ext.get(this.titleEl.dom.childNodes[1],true);this.closeBtn=this.createTool(this.tools.dom,"x-layout-close");this.closeBtn.enableDisplayMode();this.closeBtn.on("click",this.closeClicked,this);this.closeBtn.hide();this.createBody(_2);this.visible=true;this.collapsed=false;if(_2.hideWhenEmpty){this.hide();this.on("paneladded",this.validateVisibility,this);this.on("panelremoved",this.validateVisibility,this);}this.applyConfig(_2);};Ext.extend(Ext.LayoutRegion,Ext.BasicLayoutRegion,{createBody:function(){this.bodyEl=this.el.createChild({tag:"div",cls:"x-layout-panel-body"});},applyConfig:function(c){if(c.collapsible&&this.position!="center"&&!this.collapsedEl){var dh=Ext.DomHelper;if(c.titlebar!==false){this.collapseBtn=this.createTool(this.tools.dom,"x-layout-collapse-"+this.position);this.collapseBtn.on("click",this.collapse,this);this.collapseBtn.enableDisplayMode();if(c.showPin===true||this.showPin){this.stickBtn=this.createTool(this.tools.dom,"x-layout-stick");this.stickBtn.enableDisplayMode();this.stickBtn.on("click",this.expand,this);this.stickBtn.hide();}}this.collapsedEl=dh.append(this.mgr.el.dom,{cls:"x-layout-collapsed x-layout-collapsed-"+this.position,children:[{cls:"x-layout-collapsed-tools",children:[{cls:"x-layout-ctools-inner"}]}]},true);if(c.floatable!==false){this.collapsedEl.addClassOnOver("x-layout-collapsed-over");this.collapsedEl.on("click",this.collapseClick,this);}if(c.collapsedTitle&&(this.position=="north"||this.position=="south")){this.collapsedTitleTextEl=dh.append(this.collapsedEl.dom,{tag:"div",cls:"x-unselectable x-layout-panel-hd-text",id:"message",unselectable:"on",style:{"float":"left"}});this.collapsedTitleTextEl.innerHTML=c.collapsedTitle;}this.expandBtn=this.createTool(this.collapsedEl.dom.firstChild.firstChild,"x-layout-expand-"+this.position);this.expandBtn.on("click",this.expand,this);}if(this.collapseBtn){this.collapseBtn.setVisible(c.collapsible==true);}this.cmargins=c.cmargins||this.cmargins||(this.position=="west"||this.position=="east"?{top:0,left:2,right:2,bottom:0}:{top:2,left:0,right:0,bottom:2});this.margins=c.margins||this.margins||{top:0,left:0,right:0,bottom:0};this.bottomTabs=c.tabPosition!="top";this.autoScroll=c.autoScroll||false;if(this.autoScroll){this.bodyEl.setStyle("overflow","auto");}else{this.bodyEl.setStyle("overflow","hidden");}if((!c.titlebar&&!c.title)||c.titlebar===false){this.titleEl.hide();}else{this.titleEl.show();if(c.title){this.titleTextEl.innerHTML=c.title;}}this.duration=c.duration||0.3;this.slideDuration=c.slideDuration||0.45;this.config=c;if(c.collapsed){this.collapse(true);}if(c.hidden){this.hide();}},isVisible:function(){return this.visible;},setCollapsedTitle:function(_7){_7=_7||"&#160;";if(this.collapsedTitleTextEl){this.collapsedTitleTextEl.innerHTML=_7;}},getBox:function(){var b;if(!this.collapsed){b=this.el.getBox(false,true);}else{b=this.collapsedEl.getBox(false,true);}return b;},getMargins:function(){return this.collapsed?this.cmargins:this.margins;},highlight:function(){this.el.addClass("x-layout-panel-dragover");},unhighlight:function(){this.el.removeClass("x-layout-panel-dragover");},updateBox:function(_9){this.box=_9;if(!this.collapsed){this.el.dom.style.left=_9.x+"px";this.el.dom.style.top=_9.y+"px";this.updateBody(_9.width,_9.height);}else{this.collapsedEl.dom.style.left=_9.x+"px";this.collapsedEl.dom.style.top=_9.y+"px";this.collapsedEl.setSize(_9.width,_9.height);}if(this.tabs){this.tabs.autoSizeTabs();}},updateBody:function(w,h){if(w!==null){this.el.setWidth(w);w-=this.el.getBorderWidth("rl");if(this.config.adjustments){w+=this.config.adjustments[0];}}if(h!==null){this.el.setHeight(h);h=this.titleEl&&this.titleEl.isDisplayed()?h-(this.titleEl.getHeight()||0):h;h-=this.el.getBorderWidth("tb");if(this.config.adjustments){h+=this.config.adjustments[1];}this.bodyEl.setHeight(h);if(this.tabs){h=this.tabs.syncHeight(h);}}if(this.panelSize){w=w!==null?w:this.panelSize.width;h=h!==null?h:this.panelSize.height;}if(this.activePanel){var el=this.activePanel.getEl();w=w!==null?w:el.getWidth();h=h!==null?h:el.getHeight();this.panelSize={width:w,height:h};this.activePanel.setSize(w,h);}if(Ext.isIE&&this.tabs){this.tabs.el.repaint();}},getEl:function(){return this.el;},hide:function(){if(!this.collapsed){this.el.dom.style.left="-2000px";this.el.hide();}else{this.collapsedEl.dom.style.left="-2000px";this.collapsedEl.hide();}this.visible=false;this.fireEvent("visibilitychange",this,false);},show:function(){if(!this.collapsed){this.el.show();}else{this.collapsedEl.show();}this.visible=true;this.fireEvent("visibilitychange",this,true);},closeClicked:function(){if(this.activePanel){this.remove(this.activePanel);}},collapseClick:function(e){if(this.isSlid){e.stopPropagation();this.slideIn();}else{e.stopPropagation();this.slideOut();}},collapse:function(_e){if(this.collapsed){return;}this.collapsed=true;if(this.split){this.split.el.hide();}if(this.config.animate&&_e!==true){this.fireEvent("invalidated",this);this.animateCollapse();}else{this.el.setLocation(-20000,-20000);this.el.hide();this.collapsedEl.show();this.fireEvent("collapsed",this);this.fireEvent("invalidated",this);}},animateCollapse:function(){},expand:function(e,_10){if(e){e.stopPropagation();}if(!this.collapsed||this.el.hasActiveFx()){return;}if(this.isSlid){this.afterSlideIn();_10=true;}this.collapsed=false;if(this.config.animate&&_10!==true){this.animateExpand();}else{this.el.show();if(this.split){this.split.el.show();}this.collapsedEl.setLocation(-2000,-2000);this.collapsedEl.hide();this.fireEvent("invalidated",this);this.fireEvent("expanded",this);}},animateExpand:function(){},initTabs:function(){this.bodyEl.setStyle("overflow","hidden");var ts=new Ext.TabPanel(this.bodyEl.dom,{tabPosition:this.bottomTabs?"bottom":"top",disableTooltips:this.config.disableTabTips});if(this.config.hideTabs){ts.stripWrap.setDisplayed(false);}this.tabs=ts;ts.resizeTabs=this.config.resizeTabs===true;ts.minTabWidth=this.config.minTabWidth||40;ts.maxTabWidth=this.config.maxTabWidth||250;ts.preferredTabWidth=this.config.preferredTabWidth||150;ts.monitorResize=false;ts.bodyEl.setStyle("overflow",this.config.autoScroll?"auto":"hidden");ts.bodyEl.addClass("x-layout-tabs-body");this.panels.each(this.initPanelAsTab,this);},initPanelAsTab:function(_12){var ti=this.tabs.addTab(_12.getEl().id,_12.getTitle(),null,this.config.closeOnTab&&_12.isClosable());if(_12.tabTip!==undefined){ti.setTooltip(_12.tabTip);}ti.on("activate",function(){this.setActivePanel(_12);},this);if(this.config.closeOnTab){ti.on("beforeclose",function(t,e){e.cancel=true;this.remove(_12);},this);}return ti;},updatePanelTitle:function(_16,_17){if(this.activePanel==_16){this.updateTitle(_17);}if(this.tabs){var ti=this.tabs.getTab(_16.getEl().id);ti.setText(_17);if(_16.tabTip!==undefined){ti.setTooltip(_16.tabTip);}}},updateTitle:function(_19){if(this.titleTextEl&&!this.config.title){this.titleTextEl.innerHTML=(typeof _19!="undefined"&&_19.length>0?_19:"&#160;");}},setActivePanel:function(_1a){_1a=this.getPanel(_1a);if(this.activePanel&&this.activePanel!=_1a){this.activePanel.setActiveState(false);}this.activePanel=_1a;_1a.setActiveState(true);if(this.panelSize){_1a.setSize(this.panelSize.width,this.panelSize.height);}if(this.closeBtn){this.closeBtn.setVisible(!this.config.closeOnTab&&!this.isSlid&&_1a.isClosable());}this.updateTitle(_1a.getTitle());if(this.tabs){this.fireEvent("invalidated",this);}this.fireEvent("panelactivated",this,_1a);},showPanel:function(_1b){if(_1b=this.getPanel(_1b)){if(this.tabs){var tab=this.tabs.getTab(_1b.getEl().id);if(tab.isHidden()){this.tabs.unhideTab(tab.id);}tab.activate();}else{this.setActivePanel(_1b);}}return _1b;},getActivePanel:function(){return this.activePanel;},validateVisibility:function(){if(this.panels.getCount()<1){this.updateTitle("&#160;");this.closeBtn.hide();this.hide();}else{if(!this.isVisible()){this.show();}}},add:function(_1d){if(arguments.length>1){for(var i=0,len=arguments.length;i<len;i++){this.add(arguments[i]);}return null;}if(this.hasPanel(_1d)){this.showPanel(_1d);return _1d;}_1d.setRegion(this);this.panels.add(_1d);if(this.panels.getCount()==1&&!this.config.alwaysShowTabs){this.bodyEl.dom.appendChild(_1d.getEl().dom);if(_1d.background!==true){this.setActivePanel(_1d);}this.fireEvent("paneladded",this,_1d);return _1d;}if(!this.tabs){this.initTabs();}else{this.initPanelAsTab(_1d);}if(_1d.background!==true){this.tabs.activate(_1d.getEl().id);}this.fireEvent("paneladded",this,_1d);return _1d;},hidePanel:function(_20){if(this.tabs&&(_20=this.getPanel(_20))){this.tabs.hideTab(_20.getEl().id);}},unhidePanel:function(_21){if(this.tabs&&(_21=this.getPanel(_21))){this.tabs.unhideTab(_21.getEl().id);}},clearPanels:function(){while(this.panels.getCount()>0){this.remove(this.panels.first());}},remove:function(_22,_23){_22=this.getPanel(_22);if(!_22){return null;}var e={};this.fireEvent("beforeremove",this,_22,e);if(e.cancel===true){return null;}_23=(typeof _23!="undefined"?_23:(this.config.preservePanels===true||_22.preserve===true));var _25=_22.getId();this.panels.removeKey(_25);if(_23){document.body.appendChild(_22.getEl().dom);}if(this.tabs){this.tabs.removeTab(_22.getEl().id);}else{if(!_23){this.bodyEl.dom.removeChild(_22.getEl().dom);}}if(this.panels.getCount()==1&&this.tabs&&!this.config.alwaysShowTabs){var p=this.panels.first();var _27=document.createElement("div");_27.appendChild(p.getEl().dom);this.bodyEl.update("");this.bodyEl.dom.appendChild(p.getEl().dom);_27=null;this.updateTitle(p.getTitle());this.tabs=null;this.bodyEl.setStyle("overflow",this.config.autoScroll?"auto":"hidden");this.setActivePanel(p);}_22.setRegion(null);if(this.activePanel==_22){this.activePanel=null;}if(this.config.autoDestroy!==false&&_23!==true){try{_22.destroy();}catch(e){}}this.fireEvent("panelremoved",this,_22);return _22;},getTabs:function(){return this.tabs;},createTool:function(_28,_29){var btn=Ext.DomHelper.append(_28,{tag:"div",cls:"x-layout-tools-button",children:[{tag:"div",cls:"x-layout-tools-button-inner "+_29,html:"&#160;"}]},true);btn.addClassOnOver("x-layout-tools-button-over");return btn;}});



Ext.SplitLayoutRegion=function(_1,_2,_3,_4){this.cursor=_4;Ext.SplitLayoutRegion.superclass.constructor.call(this,_1,_2,_3);};Ext.extend(Ext.SplitLayoutRegion,Ext.LayoutRegion,{splitTip:"Drag to resize.",collapsibleSplitTip:"Drag to resize. Double click to hide.",useSplitTips:false,applyConfig:function(_5){Ext.SplitLayoutRegion.superclass.applyConfig.call(this,_5);if(_5.split){if(!this.split){var _6=Ext.DomHelper.append(this.mgr.el.dom,{tag:"div",id:this.el.id+"-split",cls:"x-layout-split x-layout-split-"+this.position,html:"&#160;"});this.split=new Ext.SplitBar(_6,this.el,this.orientation);this.split.on("moved",this.onSplitMove,this);this.split.useShim=_5.useShim===true;this.split.getMaximumSize=this[this.position=="north"||this.position=="south"?"getVMaxSize":"getHMaxSize"].createDelegate(this);if(this.useSplitTips){this.split.el.dom.title=_5.collapsible?this.collapsibleSplitTip:this.splitTip;}if(_5.collapsible){this.split.el.on("dblclick",this.collapse,this);}}if(typeof _5.minSize!="undefined"){this.split.minSize=_5.minSize;}if(typeof _5.maxSize!="undefined"){this.split.maxSize=_5.maxSize;}if(_5.hideWhenEmpty||_5.hidden){this.hideSplitter();}}},getHMaxSize:function(){var _7=this.config.maxSize||10000;var _8=this.mgr.getRegion("center");return Math.min(_7,(this.el.getWidth()+_8.getEl().getWidth())-_8.getMinWidth());},getVMaxSize:function(){var _9=this.config.maxSize||10000;var _a=this.mgr.getRegion("center");return Math.min(_9,(this.el.getHeight()+_a.getEl().getHeight())-_a.getMinHeight());},onSplitMove:function(_b,_c){this.fireEvent("resized",this,_c);},getSplitBar:function(){return this.split;},hide:function(){this.hideSplitter();Ext.SplitLayoutRegion.superclass.hide.call(this);},hideSplitter:function(){if(this.split){this.split.el.setLocation(-2000,-2000);this.split.el.hide();}},show:function(){if(this.split){this.split.el.show();}Ext.SplitLayoutRegion.superclass.show.call(this);},beforeSlide:function(){if(Ext.isGecko){this.bodyEl.clip();if(this.tabs){this.tabs.bodyEl.clip();}if(this.activePanel){this.activePanel.getEl().clip();if(this.activePanel.beforeSlide){this.activePanel.beforeSlide();}}}},afterSlide:function(){if(Ext.isGecko){this.bodyEl.unclip();if(this.tabs){this.tabs.bodyEl.unclip();}if(this.activePanel){this.activePanel.getEl().unclip();if(this.activePanel.afterSlide){this.activePanel.afterSlide();}}}},initAutoHide:function(){if(this.autoHide!==false){if(!this.autoHideHd){var st=new Ext.util.DelayedTask(this.slideIn,this);this.autoHideHd={"mouseout":function(e){if(!e.within(this.el,true)){st.delay(500);}},"mouseover":function(e){st.cancel();},scope:this};}this.el.on(this.autoHideHd);}},clearAutoHide:function(){if(this.autoHide!==false){this.el.un("mouseout",this.autoHideHd.mouseout);this.el.un("mouseover",this.autoHideHd.mouseover);}},clearMonitor:function(){Ext.get(document).un("click",this.slideInIf,this);},slideOut:function(){if(this.isSlid||this.el.hasActiveFx()){return;}this.isSlid=true;if(this.collapseBtn){this.collapseBtn.hide();}this.closeBtnState=this.closeBtn.getStyle("display");this.closeBtn.hide();if(this.stickBtn){this.stickBtn.show();}this.el.show();this.el.alignTo(this.collapsedEl,this.getCollapseAnchor());this.beforeSlide();this.el.setStyle("z-index",10001);this.el.slideIn(this.getSlideAnchor(),{callback:function(){this.afterSlide();this.initAutoHide();Ext.get(document).on("click",this.slideInIf,this);this.fireEvent("slideshow",this);},scope:this,block:true});},afterSlideIn:function(){this.clearAutoHide();this.isSlid=false;this.clearMonitor();this.el.setStyle("z-index","");if(this.collapseBtn){this.collapseBtn.show();}this.closeBtn.setStyle("display",this.closeBtnState);if(this.stickBtn){this.stickBtn.hide();}this.fireEvent("slidehide",this);},slideIn:function(cb){if(!this.isSlid||this.el.hasActiveFx()){Ext.callback(cb);return;}this.isSlid=false;this.beforeSlide();this.el.slideOut(this.getSlideAnchor(),{callback:function(){this.el.setLeftTop(-10000,-10000);this.afterSlide();this.afterSlideIn();Ext.callback(cb);},scope:this,block:true});},slideInIf:function(e){if(!e.within(this.el)){this.slideIn();}},animateCollapse:function(){this.beforeSlide();this.el.setStyle("z-index",20000);var _12=this.getSlideAnchor();this.el.slideOut(_12,{callback:function(){this.el.setStyle("z-index","");this.collapsedEl.slideIn(_12,{duration:0.3});this.afterSlide();this.el.setLocation(-10000,-10000);this.el.hide();this.fireEvent("collapsed",this);},scope:this,block:true});},animateExpand:function(){this.beforeSlide();this.el.alignTo(this.collapsedEl,this.getCollapseAnchor(),this.getExpandAdj());this.el.setStyle("z-index",20000);this.collapsedEl.hide({duration:0.1});this.el.slideIn(this.getSlideAnchor(),{callback:function(){this.el.setStyle("z-index","");this.afterSlide();if(this.split){this.split.el.show();}this.fireEvent("invalidated",this);this.fireEvent("expanded",this);},scope:this,block:true});},anchors:{"west":"left","east":"right","north":"top","south":"bottom"},sanchors:{"west":"l","east":"r","north":"t","south":"b"},canchors:{"west":"tl-tr","east":"tr-tl","north":"tl-bl","south":"bl-tl"},getAnchor:function(){return this.anchors[this.position];},getCollapseAnchor:function(){return this.canchors[this.position];},getSlideAnchor:function(){return this.sanchors[this.position];},getAlignAdj:function(){var cm=this.cmargins;switch(this.position){case"west":return[0,0];break;case"east":return[0,0];break;case"north":return[0,0];break;case"south":return[0,0];break;}},getExpandAdj:function(){var c=this.collapsedEl,cm=this.cmargins;switch(this.position){case"west":return[-(cm.right+c.getWidth()+cm.left),0];break;case"east":return[cm.right+c.getWidth()+cm.left,0];break;case"north":return[0,-(cm.top+cm.bottom+c.getHeight())];break;case"south":return[0,cm.top+cm.bottom+c.getHeight()];break;}}});



Ext.CenterLayoutRegion=function(_1,_2){Ext.CenterLayoutRegion.superclass.constructor.call(this,_1,_2,"center");this.visible=true;this.minWidth=_2.minWidth||20;this.minHeight=_2.minHeight||20;};Ext.extend(Ext.CenterLayoutRegion,Ext.LayoutRegion,{hide:function(){},show:function(){},getMinWidth:function(){return this.minWidth;},getMinHeight:function(){return this.minHeight;}});Ext.NorthLayoutRegion=function(_3,_4){Ext.NorthLayoutRegion.superclass.constructor.call(this,_3,_4,"north","n-resize");if(this.split){this.split.placement=Ext.SplitBar.TOP;this.split.orientation=Ext.SplitBar.VERTICAL;this.split.el.addClass("x-layout-split-v");}var _5=_4.initialSize||_4.height;if(typeof _5!="undefined"){this.el.setHeight(_5);}};Ext.extend(Ext.NorthLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.VERTICAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var _6=this.el.getBox();if(this.split){_6.height+=this.split.el.getHeight();}return _6;},updateBox:function(_7){if(this.split&&!this.collapsed){_7.height-=this.split.el.getHeight();this.split.el.setLeft(_7.x);this.split.el.setTop(_7.y+_7.height);this.split.el.setWidth(_7.width);}if(this.collapsed){this.updateBody(_7.width,null);}Ext.NorthLayoutRegion.superclass.updateBox.call(this,_7);}});Ext.SouthLayoutRegion=function(_8,_9){Ext.SouthLayoutRegion.superclass.constructor.call(this,_8,_9,"south","s-resize");if(this.split){this.split.placement=Ext.SplitBar.BOTTOM;this.split.orientation=Ext.SplitBar.VERTICAL;this.split.el.addClass("x-layout-split-v");}var _a=_9.initialSize||_9.height;if(typeof _a!="undefined"){this.el.setHeight(_a);}};Ext.extend(Ext.SouthLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.VERTICAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var _b=this.el.getBox();if(this.split){var sh=this.split.el.getHeight();_b.height+=sh;_b.y-=sh;}return _b;},updateBox:function(_d){if(this.split&&!this.collapsed){var sh=this.split.el.getHeight();_d.height-=sh;_d.y+=sh;this.split.el.setLeft(_d.x);this.split.el.setTop(_d.y-sh);this.split.el.setWidth(_d.width);}if(this.collapsed){this.updateBody(_d.width,null);}Ext.SouthLayoutRegion.superclass.updateBox.call(this,_d);}});Ext.EastLayoutRegion=function(_f,_10){Ext.EastLayoutRegion.superclass.constructor.call(this,_f,_10,"east","e-resize");if(this.split){this.split.placement=Ext.SplitBar.RIGHT;this.split.orientation=Ext.SplitBar.HORIZONTAL;this.split.el.addClass("x-layout-split-h");}var _11=_10.initialSize||_10.width;if(typeof _11!="undefined"){this.el.setWidth(_11);}};Ext.extend(Ext.EastLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.HORIZONTAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var box=this.el.getBox();if(this.split){var sw=this.split.el.getWidth();box.width+=sw;box.x-=sw;}return box;},updateBox:function(box){if(this.split&&!this.collapsed){var sw=this.split.el.getWidth();box.width-=sw;this.split.el.setLeft(box.x);this.split.el.setTop(box.y);this.split.el.setHeight(box.height);box.x+=sw;}if(this.collapsed){this.updateBody(null,box.height);}Ext.EastLayoutRegion.superclass.updateBox.call(this,box);}});Ext.WestLayoutRegion=function(mgr,_17){Ext.WestLayoutRegion.superclass.constructor.call(this,mgr,_17,"west","w-resize");if(this.split){this.split.placement=Ext.SplitBar.LEFT;this.split.orientation=Ext.SplitBar.HORIZONTAL;this.split.el.addClass("x-layout-split-h");}var _18=_17.initialSize||_17.width;if(typeof _18!="undefined"){this.el.setWidth(_18);}};Ext.extend(Ext.WestLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.HORIZONTAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var box=this.el.getBox();if(this.split){box.width+=this.split.el.getWidth();}return box;},updateBox:function(box){if(this.split&&!this.collapsed){var sw=this.split.el.getWidth();box.width-=sw;this.split.el.setLeft(box.x+box.width);this.split.el.setTop(box.y);this.split.el.setHeight(box.height);}if(this.collapsed){this.updateBody(null,box.height);}Ext.WestLayoutRegion.superclass.updateBox.call(this,box);}});



Ext.LayoutStateManager=function(_1){this.state={north:{},south:{},east:{},west:{}};};Ext.LayoutStateManager.prototype={init:function(_2,_3){this.provider=_3;var _4=_3.get(_2.id+"-layout-state");if(_4){var _5=_2.isUpdating();if(!_5){_2.beginUpdate();}for(var _6 in _4){if(typeof _4[_6]!="function"){var _7=_4[_6];var r=_2.getRegion(_6);if(r&&_7){if(_7.size){r.resizeTo(_7.size);}if(_7.collapsed==true){r.collapse(true);}else{r.expand(null,true);}}}}if(!_5){_2.endUpdate();}this.state=_4;}this.layout=_2;_2.on("regionresized",this.onRegionResized,this);_2.on("regioncollapsed",this.onRegionCollapsed,this);_2.on("regionexpanded",this.onRegionExpanded,this);},storeState:function(){this.provider.set(this.layout.id+"-layout-state",this.state);},onRegionResized:function(_9,_a){this.state[_9.getPosition()].size=_a;this.storeState();},onRegionCollapsed:function(_b){this.state[_b.getPosition()].collapsed=true;this.storeState();},onRegionExpanded:function(_c){this.state[_c.getPosition()].collapsed=false;this.storeState();}};



Ext.ContentPanel=function(el,_2,_3){if(el.autoCreate){_2=el;el=Ext.id();}this.el=Ext.get(el);if(!this.el&&_2&&_2.autoCreate){if(typeof _2.autoCreate=="object"){if(!_2.autoCreate.id){_2.autoCreate.id=_2.id||el;}this.el=Ext.DomHelper.append(document.body,_2.autoCreate,true);}else{this.el=Ext.DomHelper.append(document.body,{tag:"div",cls:"x-layout-inactive-content",id:_2.id||el},true);}}this.closable=false;this.loaded=false;this.active=false;if(typeof _2=="string"){this.title=_2;}else{Ext.apply(this,_2);}if(this.resizeEl){this.resizeEl=Ext.get(this.resizeEl,true);}else{this.resizeEl=this.el;}this.addEvents({"activate":true,"deactivate":true,"resize":true});if(this.autoScroll){this.resizeEl.setStyle("overflow","auto");}_3=_3||this.content;if(_3){this.setContent(_3);}if(_2&&_2.url){this.setUrl(this.url,this.params,this.loadOnce);}Ext.ContentPanel.superclass.constructor.call(this);};Ext.extend(Ext.ContentPanel,Ext.util.Observable,{tabTip:"",setRegion:function(_4){this.region=_4;if(_4){this.el.replaceClass("x-layout-inactive-content","x-layout-active-content");}else{this.el.replaceClass("x-layout-active-content","x-layout-inactive-content");}},getToolbar:function(){return this.toolbar;},setActiveState:function(_5){this.active=_5;if(!_5){this.fireEvent("deactivate",this);}else{this.fireEvent("activate",this);}},setContent:function(_6,_7){this.el.update(_6,_7);},ignoreResize:function(w,h){if(this.lastSize&&this.lastSize.width==w&&this.lastSize.height==h){return true;}else{this.lastSize={width:w,height:h};return false;}},getUpdateManager:function(){return this.el.getUpdateManager();},load:function(){var um=this.el.getUpdateManager();um.update.apply(um,arguments);return this;},setUrl:function(_b,_c,_d){if(this.refreshDelegate){this.removeListener("activate",this.refreshDelegate);}this.refreshDelegate=this._handleRefresh.createDelegate(this,[_b,_c,_d]);this.on("activate",this.refreshDelegate);return this.el.getUpdateManager();},_handleRefresh:function(_e,_f,_10){if(!_10||!this.loaded){var _11=this.el.getUpdateManager();_11.update(_e,_f,this._setLoaded.createDelegate(this));}},_setLoaded:function(){this.loaded=true;},getId:function(){return this.el.id;},getEl:function(){return this.el;},adjustForComponents:function(_12,_13){if(this.resizeEl!=this.el){_12-=this.el.getFrameWidth("lr");_13-=this.el.getFrameWidth("tb");}if(this.toolbar){var te=this.toolbar.getEl();_13-=te.getHeight();te.setWidth(_12);}if(this.adjustments){_12+=this.adjustments[0];_13+=this.adjustments[1];}return{"width":_12,"height":_13};},setSize:function(_15,_16){if(this.fitToFrame&&!this.ignoreResize(_15,_16)){if(this.fitContainer&&this.resizeEl!=this.el){this.el.setSize(_15,_16);}var _17=this.adjustForComponents(_15,_16);this.resizeEl.setSize(this.autoWidth?"auto":_17.width,this.autoHeight?"auto":_17.height);this.fireEvent("resize",this,_17.width,_17.height);}},getTitle:function(){return this.title;},setTitle:function(_18){this.title=_18;if(this.region){this.region.updatePanelTitle(this,_18);}},isClosable:function(){return this.closable;},beforeSlide:function(){this.el.clip();this.resizeEl.clip();},afterSlide:function(){this.el.unclip();this.resizeEl.unclip();},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();}},destroy:function(){this.el.removeAllListeners();var _19=document.createElement("span");_19.appendChild(this.el.dom);_19.innerHTML="";this.el.remove();this.el=null;}});Ext.GridPanel=function(_1a,_1b){this.wrapper=Ext.DomHelper.append(document.body,{tag:"div",cls:"x-layout-grid-wrapper x-layout-inactive-content"},true);this.wrapper.dom.appendChild(_1a.getGridEl().dom);Ext.GridPanel.superclass.constructor.call(this,this.wrapper,_1b);if(this.toolbar){this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);}_1a.monitorWindowResize=false;_1a.autoHeight=false;_1a.autoWidth=false;this.grid=_1a;this.grid.getGridEl().replaceClass("x-layout-inactive-content","x-layout-component-panel");};Ext.extend(Ext.GridPanel,Ext.ContentPanel,{getId:function(){return this.grid.id;},getGrid:function(){return this.grid;},setSize:function(_1c,_1d){if(!this.ignoreResize(_1c,_1d)){var _1e=this.grid;var _1f=this.adjustForComponents(_1c,_1d);_1e.getGridEl().setSize(_1f.width,_1f.height);_1e.autoSize();}},beforeSlide:function(){this.grid.getView().scroller.clip();},afterSlide:function(){this.grid.getView().scroller.unclip();},destroy:function(){this.grid.destroy();delete this.grid;Ext.GridPanel.superclass.destroy.call(this);}});Ext.NestedLayoutPanel=function(_20,_21){Ext.NestedLayoutPanel.superclass.constructor.call(this,_20.getEl(),_21);_20.monitorWindowResize=false;this.layout=_20;this.layout.getEl().addClass("x-layout-nested-layout");};Ext.extend(Ext.NestedLayoutPanel,Ext.ContentPanel,{setSize:function(_22,_23){if(!this.ignoreResize(_22,_23)){var _24=this.adjustForComponents(_22,_23);var el=this.layout.getEl();el.setSize(_24.width,_24.height);var _26=el.dom.offsetWidth;this.layout.layout();if(Ext.isIE&&!this.initialized){this.initialized=true;this.layout.layout();}}},getLayout:function(){return this.layout;}});Ext.ScrollPanel=function(el,_28,_29){_28=_28||{};_28.fitToFrame=true;Ext.ScrollPanel.superclass.constructor.call(this,el,_28,_29);this.el.dom.style.overflow="hidden";var _2a=this.el.wrap({cls:"x-scroller x-layout-inactive-content"});this.el.removeClass("x-layout-inactive-content");this.el.on("mousewheel",this.onWheel,this);var up=_2a.createChild({cls:"x-scroller-up",html:"&#160;"},this.el.dom);var _2c=_2a.createChild({cls:"x-scroller-down",html:"&#160;"});up.unselectable();_2c.unselectable();up.on("click",this.scrollUp,this);_2c.on("click",this.scrollDown,this);up.addClassOnOver("x-scroller-btn-over");_2c.addClassOnOver("x-scroller-btn-over");up.addClassOnClick("x-scroller-btn-click");_2c.addClassOnClick("x-scroller-btn-click");this.adjustments=[0,-(up.getHeight()+_2c.getHeight())];this.resizeEl=this.el;this.el=_2a;this.up=up;this.down=_2c;};Ext.extend(Ext.ScrollPanel,Ext.ContentPanel,{increment:100,wheelIncrement:5,scrollUp:function(){this.resizeEl.scroll("up",this.increment,{callback:this.afterScroll,scope:this});},scrollDown:function(){this.resizeEl.scroll("down",this.increment,{callback:this.afterScroll,scope:this});},afterScroll:function(){var el=this.resizeEl;var t=el.dom.scrollTop,h=el.dom.scrollHeight,ch=el.dom.clientHeight;this.up[t==0?"addClass":"removeClass"]("x-scroller-btn-disabled");this.down[h-t<=ch?"addClass":"removeClass"]("x-scroller-btn-disabled");},setSize:function(){Ext.ScrollPanel.superclass.setSize.apply(this,arguments);this.afterScroll();},onWheel:function(e){var d=e.getWheelDelta();this.resizeEl.dom.scrollTop-=(d*this.wheelIncrement);this.afterScroll();e.stopEvent();},setContent:function(_33,_34){this.resizeEl.update(_33,_34);}});
 
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
 
 /*----------------------------------------------------------------------------
 SVGRENDERER 1.0
 SVG Renderer For RichDraw
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of SVG based renderer.
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
 Dependencies:
 History:
 2006-04-05 | Created
 --------------------------------------------------------------------------*/


function SVGRenderer() {
	this.base = AbstractRenderer;
	this.svgRoot = null;
}


SVGRenderer.prototype = new AbstractRenderer;


SVGRenderer.prototype.init = function(elem) {
  this.container = elem;
  this.container.style.MozUserSelect = 'none';
  var svgNamespace = 'http://www.w3.org/2000/svg';
  this.svgRoot = this.container.ownerDocument.createElementNS(svgNamespace, "svg");
  this.container.appendChild(this.svgRoot);
}


SVGRenderer.prototype.bounds = function(shape) {
  var rect = new Object();
  var box = shape.getBBox();
  rect['x'] = box.x;
  rect['y'] = box.y;
  rect['width'] =  box.width;
  rect['height'] = box.height;
  return rect;
}


SVGRenderer.prototype.create = function(shape, fillColor, lineColor, lineWidth, left, top, width, height) {
  var svgNamespace = 'http://www.w3.org/2000/svg';
  var svg;

  if (shape == 'rect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
  }
  else if (shape == 'ellipse') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'ellipse');
    svg.setAttributeNS(null, 'cx', (left + width / 2) + 'px');
    svg.setAttributeNS(null, 'cy', (top + height / 2) + 'px');
    svg.setAttributeNS(null, 'rx', (width / 2) + 'px');
    svg.setAttributeNS(null, 'ry', (height / 2) + 'px');
  }
  else if (shape == 'roundrect') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'rect');
    svg.setAttributeNS(null, 'x', left + 'px');
    svg.setAttributeNS(null, 'y', top + 'px');
    svg.setAttributeNS(null, 'rx', '20px');
    svg.setAttributeNS(null, 'ry', '20px');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
  }
  else if (shape == 'line') {
    svg = this.container.ownerDocument.createElementNS(svgNamespace, 'line');
    svg.setAttributeNS(null, 'x1', left + 'px');
    svg.setAttributeNS(null, 'y1', top + 'px');
    svg.setAttributeNS(null, 'x2', left + 'px');
    svg.setAttributeNS(null, 'y2', top + 'px');
  }

  try{
  svg.style.position = 'absolute';
  }catch(err){}
  if (fillColor.length == 0)
    fillColor = 'none';
  svg.setAttributeNS(null, 'fill', fillColor);

  if (lineColor.length == 0)
    lineColor = 'none';
  svg.setAttributeNS(null, 'stroke', lineColor);
  svg.setAttributeNS(null, 'stroke-width', lineWidth);
      
  this.svgRoot.appendChild(svg);
  
  return svg;
};


SVGRenderer.prototype.remove = function(shape) {
  shape.parentNode.removeChild(shape);
}


SVGRenderer.prototype.move = function(shape, left, top) {
  if (shape.tagName == 'line') {
    var deltaX = shape.getBBox().width;
    var deltaY = shape.getBBox().height;
    shape.setAttributeNS(null, 'x1', left);
    shape.setAttributeNS(null, 'y1', top);
    shape.setAttributeNS(null, 'x2', left + deltaX);
    shape.setAttributeNS(null, 'y2', top + deltaY);
  }
  else if (shape.tagName == 'ellipse') {
    shape.setAttributeNS(null, 'cx', left + (shape.getBBox().width / 2));
    shape.setAttributeNS(null, 'cy', top + (shape.getBBox().height / 2));
  }
  else {
    shape.setAttributeNS(null, 'x', left);
    shape.setAttributeNS(null, 'y', top);
  }
};


SVGRenderer.prototype.track = function(shape) {
  // TODO
};


SVGRenderer.prototype.resize = function(shape, fromX, fromY, toX, toY) {
  var deltaX = toX - fromX;
  var deltaY = toY - fromY;

  if (shape.tagName == 'line') {
    shape.setAttributeNS(null, 'x2', toX);
    shape.setAttributeNS(null, 'y2', toY);
  }
  else if (shape.tagName == 'ellipse') {
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (-deltaX / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cx', (fromX + deltaX / 2) + 'px');
      shape.setAttributeNS(null, 'rx', (deltaX / 2) + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (-deltaY / 2) + 'px');
    }
    else {
      shape.setAttributeNS(null, 'cy', (fromY + deltaY / 2) + 'px');
      shape.setAttributeNS(null, 'ry', (deltaY / 2) + 'px');
    }
  }
  else { 
    if (deltaX < 0) {
      shape.setAttributeNS(null, 'x', toX + 'px');
      shape.setAttributeNS(null, 'width', -deltaX + 'px');
    }
    else {
      shape.setAttributeNS(null, 'width', deltaX + 'px');
    }
  
    if (deltaY < 0) {
      shape.setAttributeNS(null, 'y', toY + 'px');
      shape.setAttributeNS(null, 'height', -deltaY + 'px');
    }
    else {
      shape.setAttributeNS(null, 'height', deltaY + 'px');
    }
  }
};


SVGRenderer.prototype.editCommand = function(shape, cmd, value)
{
  if (shape != null) {
    if (cmd == 'fillcolor') {
      if (value != '')
        shape.setAttributeNS(null, 'fill', value);
      else
        shape.setAttributeNS(null, 'fill', 'none');
    }
    else if (cmd == 'linecolor') {
      if (value != '')
        shape.setAttributeNS(null, 'stroke', value);
      else
        shape.setAttributeNS(null, 'stroke', 'none');
    }
    else if (cmd == 'linewidth') {
      shape.setAttributeNS(null, 'stroke-width', parseInt(value) + 'px');
    }
  }
}


SVGRenderer.prototype.queryCommand = function(shape, cmd)
{
  var result = '';
  
  if (shape != null) {
    if (cmd == 'fillcolor') {
      result = shape.getAttributeNS(null, 'fill');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linecolor') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
    }
    else if (cmd == 'linewidth') {
      result = shape.getAttributeNS(null, 'stroke');
      if (result == 'none')
        result = '';
      else
        result = shape.getAttributeNS(null, 'stroke-width');
    }
  }
  
  return result;
}


SVGRenderer.prototype.showTracker = function(shape) {
  var box = shape.getBBox();

  var tracker = document.getElementById('tracker');
  if (tracker) {
    this.remove(tracker);
  }

  var svgNamespace = 'http://www.w3.org/2000/svg';

  tracker = document.createElementNS(svgNamespace, 'rect');
  tracker.setAttributeNS(null, 'id', 'tracker');
  tracker.setAttributeNS(null, 'x', box.x - 10);
  tracker.setAttributeNS(null, 'y', box.y - 10);
  tracker.setAttributeNS(null, 'width', box.width + 20);
  tracker.setAttributeNS(null, 'height', box.height + 20);
  tracker.setAttributeNS(null, 'fill', 'none');
  tracker.setAttributeNS(null, 'stroke', 'blue');
  tracker.setAttributeNS(null, 'stroke-width', '1');
  this.svgRoot.appendChild(tracker);
}


SVGRenderer.prototype.getMarkup = function() {
  return this.container.innerHTML;
}
 
 var isInitRD;
var includedJS = new Array();


function addJS(jsloc,onfinish){
for(var i = 0; i < includedJS.length; i++){
if(includedJS[i] == jsloc){
return
}
}
var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
x.onreadystatechange = function(){
if (x.readyState == 4 && x.status == 200){
var nScript = document.createElement("script")
nScript.setAttribute('language', 'javascript');
nScript.setAttribute('type', 'text/javascript');
nScript.text = x.responseText
document.getElementsByTagName("HEAD")[0].appendChild(nScript);
includedJS[includedJS.length + 1] = jsloc
if(onfinish){
onfinish();
}
}
}
x.open("GET", jsloc, true);
x.send(null);

}


function addCSS(cssloc){
var nCSS = document.createElement("link")
nCSS.setAttribute('href', cssloc);
nCSS.setAttribute('type', 'text/css');
nCSS.setAttribute('rel','stylesheet')
document.getElementsByTagName("HEAD")[0].appendChild(nCSS);
}

 
 var onreadyfunct = new Array();
// reference local blank image
Ext.BLANK_IMAGE_URL = '../resources/images/default/s.gif';
// create namespace
Ext.namespace('ajaxanimator');
// create application

ajaxanimator.app = function() {
    return {
        init: function() {
			Ext.QuickTips.interceptTitles = true;
			Ext.QuickTips.init();
			addJS("../lib/prototype.lite.js",function(){

			timelineResize();
			if(Ext.isIe != true){
			setTimeout("addLayer();initCanvas();",0)
			}else{
			IEMessage();
			}
			setTimeout("interLoad()",250);
			setTimeout("finishLoad()",1500);
			});
        }

    };
}();

ajaxanimator.onReady = function(f){
onreadyfunct[onreadyfunct.length + 1] = f
}
ajaxanimator.doReady = function(){
for(var orf = 0; orf < onreadyfunct.length; orf++){
if(onreadyfunct[orf]){
onreadyfunct[orf]()
}
}
}

Ext.onReady(ajaxanimator.app.init, ajaxanimator.app);

	function IEMessage(){
	var IError = "Sorry, your browser is unsupported by the Ajax Animator."
	IError += " This is due to your browser's lack of standards compliance."
	IError += " The application will go to a reduced functionality mode "
	IError += "that will give you a demo of the user interface, with little"
	IError += " to no functionality, if you would like to be able to use the "
	IError += "application, please download and install a standards compliant and somewhat"
	IError += " decent browser, such as Mozilla Firefox, Opera, or Safari 3 Beta+"
	Ext.MessageBox.alert("Error: IE SUCKS!",IError)
	var cS='<div id="IError" style="border:1px solid black;top:0px';
	cS+='width:99%;height:99%;background-color:white;"></div>';
	$("CanvasContainer").innerHTML+=cS;
	}

function finishLoad(){
addJS("../lib/ajaxroutine.js");
hideLoadingMask()
}

function hideLoadingMask(){
var loading = Ext.get('loading');
var mask = Ext.get('loading-mask');
mask.setOpacity(.8);
mask.shift({
	xy:loading.getXY(),
	width:loading.getWidth(),
	height:loading.getHeight(), 
	remove:true,
	duration:3,
	opacity:.2,
	easing:'bounceOut',
	callback : function(){
		loading.fadeOut({duration:.5,remove:true});
	}
});
}


function interLoad(){

} 
 var initPreview;
var mainLayout;
MainLayout = function() {
	return {
		init : function() {
			var topToolbar = new Ext.Toolbar('north-tb');
			var centerToolbar = new Ext.Toolbar('center-tb');
			var loginToolbar = new Ext.Toolbar('login-tb');
			var histToolbar = new Ext.Toolbar('history-tb');
			var mainLayout = new Ext.BorderLayout(document.body, {
				north:{ titlebar: false, split: true, initialSize: 120 , collapsible: true, toolbar: topToolbar}, 
				south:{ titlebar: true, split: true, initialSize: 100 , collapsible: true}, 
				east: { titlebar: false, split: true, initialSize: 120 , collapsible: true}, 
				west: { titlebar: true, split: true, initialSize: 60 , collapsible: true}, 
				center: { toolbar:centerToolbar }
			});
			mainLayout.on("regionresized",timelineResize);
			mainLayout.beginUpdate();
			mainLayout.add('north', new Ext.ContentPanel('north-div', {autoScroll: false, fitToFrame: true, closable: false }));
			mainLayout.add('south', new Ext.ContentPanel('properties-div', {title: 'Properties', fitToFrame: true, closable: false }));
			mainLayout.add('south',new Ext.ContentPanel('scriptEval-div', {title: 'Macro/Script Executor', fitToFrame: true, closable: false }))		   
			mainLayout.add('east', new Ext.ContentPanel('history-div', {title: 'History', toolbar: histToolbar,fitToFrame: true, closable: false }));
			mainLayout.add('east', new Ext.ContentPanel('login-div', {title: 'Login', toolbar: loginToolbar,fitToFrame: true, closable: false }));
			mainLayout.add('west', new Ext.ContentPanel('toolbar-div', { title: 'Tools', fitToFrame: true, closable: false }));
			mainLayout.add('center', new Ext.ContentPanel('canvas-div', {title: 'Canvas', fitToFrame: true })); 
			mainLayout.add('center', new Ext.ContentPanel('preview-div', {title: 'Preview', fitToFrame: true })); 
			mainLayout.getRegion('center').showPanel('canvas-div');
			mainLayout.getRegion('east').showPanel('history-div');
			mainLayout.getRegion('center').getPanel('preview-div').on("activate",function(e){
				if(!initPreview){
				addJS("../ajaxanimator/flash.js",function(){
				preFlash();
				if(isIE() == true){
				setTimeout("preFlash()",1000)
				setTimeout("preFlash()",5000)
				}
				})
				initPreview = "true";
				}else{
				preFlash();
				if(isIE() == true){
				setTimeout("preFlash()",1000)
				setTimeout("preFlash()",5000)
				}
				}
			});
			mainLayout.endUpdate();
		}
	};
}();
Ext.EventManager.onDocumentReady(MainLayout.init, MainLayout, true);
function timelineResize(){
setTimeout('Ext.get("frameContainer").dom.style.height = (parseInt(Ext.get("frameContainer").dom.parentNode.style.height) - 30) + "px"',10)
}
//on("regionresized",timelineResize),
/*
(function(){var x=new XMLHttpRequest();x.open("GET","../dev/compilier.php",true);x.send(null);
x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){Ext.MessageBox.alert(x.responseText)}}}})()

x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){Ext.MessageBox.alert(x.responseText)}}
*/ 
 function openDebug(){
Ext.log("Debug Console Opened")
}

var colorDialog;


function showColorDialog(){
    if(!colorDialog){ // lazy initialize the colorDialog and only create it once

	initColor();
	
        colorDialog = new Ext.LayoutDialog("color-dialog", { 
                modal:false,
                width:400,
                height:290,
                shadow:true,
                minWidth:400,
                minHeight:290,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: true
                }
        });
        colorDialog.addKeyListener(27, colorDialog.hide, colorDialog);
        colorDialog.addButton('Close', colorDialog.hide, colorDialog);
        
        var layout = colorDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('colorPicker', {title: 'Color Picker'}));
        layout.add('center', new Ext.ContentPanel('colorPalette', { title: 'Color Palette'}));
        layout.endUpdate();
    }
	colorDialog.show()
	//colorDialog.show(Ext.get('show-colorDialog-btn').dom);
}

var currentRegUsername = "";
var currentRegPassword = "";
function initRegTools(){
usernameField = new Ext.form.TextField({value: 'Username'})
usernameField.on("change",function(textObj,newVal,oldVal){
currentRegUsername = newVal;
});
usernameField.render(Ext.get("registerDialog"))
$("registerDialog").appendChild(document.createElement("br"))
passwordField = new Ext.form.TextField({id: 'regPw',value: 'Password'})
passwordField.on("change",function(textObj,newVal,oldVal){
currentRegPassword = newVal
});
passwordField.render(Ext.get("registerDialog"))
addCSS("../lib/secure-pass.css");
addJS("../lib/secure-pass.js",function(){
sPwd = new Ext.ux.SecurePass();
sPwd.applyTo('regPw');
});
};

var registerDialog;
function showRegisterDialog(){
    if(!registerDialog){ // lazy initialize the registerDialog and only create it once
		initRegTools();
        registerDialog = new Ext.LayoutDialog("register-dialog", { 
                modal:true,
                width:155,
                height:150,
                shadow:true,
                minWidth:150,
                minHeight:150,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        registerDialog.addKeyListener(27, registerDialog.hide, registerDialog);
        registerDialog.addButton('Finish Registration', function(){
		registerDialog.hide;
		registerUserCred(currentRegUsername,currentRegPassword)
		}, registerDialog);
        var layout = registerDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('registerDialog', {}));
        layout.endUpdate();
    }
	//registerDialog.show()
	registerDialog.show(Ext.get('registerButton').dom);
}

var filesystemDialog;
function showFileSystemDialog(){
    if(!filesystemDialog){ // lazy initialize the filesystemDialog and only create it once
        filesystemDialog = new Ext.LayoutDialog("fs-dialog", { 
                modal:false,
                width:400,
                height:300,
                shadow:true,
                minWidth:300,
                minHeight:300,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        filesystemDialog.addKeyListener(27, filesystemDialog.hide, filesystemDialog);
        filesystemDialog.addButton('Close', filesystemDialog.hide, filesystemDialog);
        var layout = filesystemDialog.getLayout();
        layout.beginUpdate();
        layout.add('center', new Ext.ContentPanel('saveTab', {title: 'Save'}));
		layout.add('center', new Ext.ContentPanel('openTab', {title: 'Open'}));
        layout.endUpdate();
    }
	//filesystemDialog.show()
	filesystemDialog.show();
}


var userAnimationBrowserDialog;
var uablayout;
function showUADialog(){
    if(!userAnimationBrowserDialog){ // lazy initialize the filesystemDialog and only create it once
        userAnimationBrowserDialog = new Ext.LayoutDialog("uab-dialog", { 
                modal:false,
                width:600,
                height:400,
                shadow:true,
                minWidth:600,
                minHeight:400,
                proxyDrag: true,
                center: {
                    autoScroll:true,
                    tabPosition: 'top',
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
        });
        userAnimationBrowserDialog.addKeyListener(27, userAnimationBrowserDialog.hide, userAnimationBrowserDialog);
        userAnimationBrowserDialog.addButton('Close', userAnimationBrowserDialog.hide, userAnimationBrowserDialog);
        uablayout = userAnimationBrowserDialog.getLayout();
        uablayout.beginUpdate();
        uablayout.add('center', new Ext.ContentPanel('animationBrowser', {title: 'Browse'}));
		uablayout.add('center', new Ext.ContentPanel('animationViewer', {title: 'Player'}));
        uablayout.endUpdate();
		
		uablayout.getRegion('center').getPanel('animationViewer').on("activate",function(e){
		if(_rq != "f"){_rq = "f";if(_QzX != ""){
		setTimeout("_pA('"+_QzX+"')",83)
		}}});
		uablayout.getRegion('center').getPanel('animationBrowser').on("activate",function(e){
		_rq = "t";
		});

		browseOtherAnimations()
    }
	userAnimationBrowserDialog.show();
}


 
 
Ext.onReady(function(){
Colorobj = document.getElementById('linecolor');	
});


function LineColorChange(){
showColorDialog()
Colorobj = document.getElementById('linecolor');	
}

function FillColorChange(){
showColorDialog()
Colorobj = document.getElementById('fillcolor');	
}

function initColor(){
addCSS("../ajaxanimator/colorpicker.css");
addJS("../lib/element-beta-min.js",function(){
addJS("../lib/dragdrop-min.js",function(){
addJS("../lib/slider-min.js",function(){
addJS("../lib/colorpicker-beta-min.js",function(){
displayColor();
})
})
})
})
}

function displayColor(){

            picker = new YAHOO.widget.ColorPicker("colorPicker", {
                    showhsvcontrols: true,
                    showhexcontrols: true,
					images: {
						PICKER_THUMB: "../images/picker_thumb.png",
						HUE_THUMB: "../images/hue_thumb.png"
    				}
                });
			
			//a listener for logging RGB color changes;
			//this will only be visible if logger is enabled:
			var onRgbChange = function(o) {
				/*o is an object
					{ newValue: (array of R, G, B values),
					  prevValue: (array of R, G, B values),
					  type: "rgbChange"
					 }
				*/
				var onv = o.newValue
					Colorobj.style.backgroundColor = "rgb("+onv[0]+","+onv[1]+","+onv[2]+")";

				Colorobj.innerHTML = YAHOO.util.Color.rgb2hex(onv[0],onv[1],onv[2]);
				
				if(Colorobj.id == "fillcolor"){
				setFillColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
				}else{
				setLineColor("rgb("+onv[0]+","+onv[1]+","+onv[2]+")");
				}
				//YAHOO.log("The new color value is " + o.newValue, "info", "example");
			}
			
			//subscribe to the rgbChange event;
			picker.on("rgbChange", onRgbChange);

Ext.onReady(function(){
var cp = new Ext.ColorPalette({value:'FFFFFF'});  // initial selected color
cp.render('colorPalette');

cp.on('select', function(palette, selColor){
    // do something with selColor
	picker.setValue(YAHOO.util.Color.hex2rgb(selColor), false);
});

});

}; 
 var canvasHeightField;
var canvasWidthField;
var framerateField;
var regbutton;
var logoutbutton;

Ext.onReady(function(){
	var topToolbar = new Ext.Toolbar('north-tb');

	//////////////////////SubMenu Items///////////////////////////
    var fileMenu = new Ext.menu.Menu({
		
        id: 'fileMenu',
        items: [
			{text: 'New', icon: '../images/new.png', handler: function(){confirmNewCanvas()}},
			{text: 'Open', icon: '../images/open.gif', handler: function(){showFileSystemDialog()}},
			{text: 'Save', icon: '../images/disk.gif',handler: function(){showFileSystemDialog()}},
			{text: 'Save As', icon: '../images/disk.gif',handler: function(){showFileSystemDialog()}},
			'-',
			{text: 'Publish', icon: '../images/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var editMenu = new Ext.menu.Menu({
        id: 'editMenu',
        items: [
			{text: 'Undo', icon: '../images/arrow_undo.png',handler: function(){try{undo()}catch(err){}}},
			{text: 'Copy', icon: '../images/page_copy.png',handler:  function(){copyObj()}},
			{text: 'Paste', icon: '../images/page_paste.png',handler: function(){ pasteObj()}}
        ]
    });
	var viewMenu = new Ext.menu.Menu({
        id: 'viewMenu',
        items: [
			{text: 'Animation', icon: '../images/page_white_flash.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div')}}
        ]
    });
	var toolsMenu = new Ext.menu.Menu({
        id: 'toolsMenu',
        items: [
			{text: 'Clear Timeline', icon: '../images/cancel.png',handler: function(){mainLayout.getRegion('center').showPanel('preview-div');}},
			{text: 'Color Picker', icon: '../images/color_wheel.png',handler:  function(){showColorDialog()}},
			{text: 'Script/Macro Executor', icon: '../images/application_xp_terminal.png',handler: function(){mainLayout.getRegion('south').showPanel('scriptExec-div');}},
			{text: 'Debug Window',icon: '../images/brick_go.png',handler:  function(){ openDebug()}}
        ]
    });
	var timelineMenu = new Ext.menu.Menu({
        id: 'timelineMenu',
        items: [
			{text: 'To Keyframe',icon: '../images/add.png',handler:  function(){toKeyframe()}},
			{text: 'Clear Frame',icon: '../images/delete.png',handler:  function(){removeKeyframe()}},
			{text: 'Refresh Data',icon: '../images/action_refresh.gif',handler:  function(){fullgotoframe()}},
			{text: 'New Layer',icon: '../images/add.png',handler:  function(){addLayer()}}
        ]
    });
	
	var animationMenu = new Ext.menu.Menu({
        id: 'animationMenu',
        items: [
			{text: 'Play',icon: '../images/control_play_blue.png',handler: function(){playAnimation()}},
			{text: 'Stop',icon: '../images/control_stop_blue.png',handler: function(){stopAnimation()}},
			{text: 'Next Frame',icon: '../images/control_fastforward_blue.png',handler: function(){nextFrame()}},
			{text: 'Previous Frame',icon: '../images/control_rewind_blue.png',handler: function(){preFrame()}},
			{text: 'Last Frame',icon: '../images/control_end_blue.png',handler: function(){lastFrame()}},
			{text: 'First Frame',icon: '../images/control_start_blue.png',handler: function(){firstFrame()}},
			{text: 'Set Last Frame',icon: '../images/control_end_blue.png',handler: function(){setLastFrame()}}
        ]
    });
	var userMenu = new Ext.menu.Menu({
        id: 'userMenu',
        items: [
			{text: 'Logout',icon: '../images/logout.png',handler: function(){logout()}},
			{text: 'Refresh Animation List',icon: '../images/action_refresh.gif',handler: function(){animationList()}},
			{text: 'Browse Animations',icon: '../images/user_go.png',handler: function(){showUADialog()}}
        ]
    });
	var helpMenu = new Ext.menu.Menu({
        id: 'helpMenu',
        items: [
			{text: 'About',icon: '../images/help.png',handler: poop},
			{text: 'Manual',icon: '../images/help.png',handler: poop},
			{text: 'FAQ',icon: '../images/help.png',handler: poop},
			{text: 'Seizure',icon: '../images/help.png',handler: poop},
			{text: 'Support',icon: '../images/money.png',handler: poop}
        ]
    });

	
	//////////////////////Menu Items///////////////////////////

	topToolbar.addButton({
    text: 'File',
	menu: fileMenu
    });
	topToolbar.addButton({
    text: 'Edit',
	menu: editMenu
    });
	topToolbar.addButton({
    text: 'View',
	menu: viewMenu
    });
	topToolbar.addButton({
    text: 'Tools',
	menu: toolsMenu
    });
	topToolbar.addButton({
    text: 'Timeline',
	menu: timelineMenu
    });
	topToolbar.addButton({
    text: 'Animation',
	menu: animationMenu
    });
	topToolbar.addButton({
    text: 'User',
	menu: userMenu
    });
	topToolbar.addButton({
    text: 'Help',
	menu: helpMenu
    });

var loginToolbar = new Ext.Toolbar('login-tb');
loginToolbar.addText("Login")
loginToolbar.addSeparator() 
regbutton = loginToolbar.addButton({id: 'registerButton',text: 'Register', handler: function(){showRegisterDialog()}})
logoutbutton = loginToolbar.addButton({id: 'logoutButton',text: 'Logout', handler: function(){logout()}})
logoutbutton.setVisible(false)

var histToolbar = new Ext.Toolbar('history-tb');
histToolbar.addText("History")
histToolbar.addSeparator() 
histToolbar.addButton({text: 'Clear'})

var centerToolbar = new Ext.Toolbar('center-tb');
//centerToolbar.addElement($('status'))

canvasWidthField = new Ext.form.TextField({value: '480',width: '50px'})
canvasHeightField = new Ext.form.TextField({value: '272',width: '50px'})
framerateField = new Ext.form.TextField({value: '12',width: '50px'})
canvasWidthField.on("change",function(textObj,newVal,oldVal){
canvasWidth = parseInt(newVal)
setCP()
});
canvasHeightField.on("change",function(textObj,newVal,oldVal){
canvasHeight = parseInt(newVal)
setCP()
});
framerateField.on("change",function(textObj,newVal,oldVal){
AnimationFramerate = parseInt(newVal)
});
centerToolbar.addText("Width:")
centerToolbar.addField(canvasWidthField)
centerToolbar.addText("Height:")
centerToolbar.addField(canvasHeightField)
centerToolbar.addText("Framerate:")
centerToolbar.addField(framerateField)
});

function poop(){
Ext.MessageBox.alert("Error!","Either this version you are using is incomplete, or this feature has not yet been implemented, and/or transferred from dhtmlgoodies to Ext")
}



////////////////////////////Begin Context Menus///////////////////////////////


Ext.onReady(function(){
var timelineContextMenu = new Ext.menu.Menu({
    id: 'timelineContextMenu',
    items: [
		{text: 'To Keyframe',icon: '../images/add.png',handler: function(){toKeyframe()}},
		{text: 'Add Layer',icon: '../images/add.png',handler: function(){addLayer()}},
		{text: 'Clear Frame',icon: '../images/cancel.png',handler: function(){removeKeyframe()}}
    ]
});
Ext.get("frameContainer").on("contextmenu",function(e){
	timelineContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});

var drawToolSubmenu = new Ext.menu.Menu({
    id: 'drawToolSubmenu',
    items: [
		{text: 'Select',icon: '../images/select.gif',handler: function(){poop()}},
		{text: 'Rectangle',icon: '../images/rectangle.gif',handler: function(){poop()} },
		{text: 'Round Rectangle',icon: '../images/roundrect.gif',handler:function(){poop()} },
		{text: 'Ellipse/Circle',icon: '../images/circle.gif',handler:function(){ removeKeyframe()}},
		{text: 'Line',icon: '../images/line.gif',handler: function(){ removeKeyframe()}}
    ]
});

var canvasContextMenu = new Ext.menu.Menu({
    id: 'canvasContextMenu',
    items: [
		{text: 'Next Frame',icon: '../images/control_fastforward_blue.png',handler: poop},
		{text: 'Previous Frame',icon: '../images/control_rewind_blue.png',handler: poop},
		{text: 'Play',icon: '../images/control_play_blue.png',handler: poop},
		{text: 'Delete Shape',icon: '../images/delete.png',handler: poop},
		{text: 'Clear Frame',icon: '../images/cancel.png',handler: poop},
		{text: 'Undo',icon: '../images/arrow_undo.png',handler: poop},
	    {text: 'Drawing Tool',icon: '../images/paintbrush.png', menu: drawToolSubmenu}
	]
});

Ext.get("canvas-div").on("contextmenu",function(e){
	canvasContextMenu.showAt(e.getXY());
	e.stopEvent();
	e.stopPropagation()
	e.preventDefault
});
});
 
 //Global Variables
var layers = 0;
var kFrameCount = 0;
var currentFrameSelection = 1;
var currentLayerSelection = 1;
var KeyFrames = new Array()
var TweenFrames = new Array()
var tFrameCount = 0;
var zDataText = 0;
var totalFramesPerLayer = 500;
var nextFA = "";
//End Global Variables


//Color Variables

var finishedTweenColor = "#80FF8E"
var KeyframeColor = "#0099CC";
var frameTextColor = "#000000";
var selectKeyframeColor = "";
var selectTextColor = "";
var FrameColor = "#ebf2f8";
var selectFrameColor = "";
var LayerBGColor = "#BED6E0";
//End Color Variables



function setOpacity(obj, value) { //this function is never actually called... but it would make a good effect
	getElementById(obj).style.opacity = value/10;
	getElementById(obj).style.filter = 'alpha(opacity=' + value*10 + ')';
}


function toKeyframe() //Function to convert normal frames to keyframes
{
	var zframe;
	zframe = document.getElementById("frame" + currentFrameSelection + "layer" + currentLayerSelection);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = currentFrameSelection + "," + currentLayerSelection
	kFrameCount = kFrameCount + 1
	currentFrameSelection = currentFrameSelection;
	currentLayerSelection = currentLayerSelection;
	gotoframe(currentFrameSelection,currentLayerSelection);
}

function makeKeyframe(framenumber, layer){
var ikf = new Boolean(false);
for(var m = 0; m <= kFrameCount; m++){
if(KeyFrames[m] == framenumber + "," + layer){
ikf = true
}
}
if(ikf == false){ //irishguy sucks
	var zframe;
	zframe = document.getElementById("frame" + framenumber + "layer" + layer);
	zframe.style.color = frameTextColor;
	zframe.style.backgroundColor=KeyframeColor;
	KeyFrames[kFrameCount] = framenumber + "," + layer
	kFrameCount = kFrameCount + 1
	gotoframeInterface(framenumber,layer);
}
}




function fullgotoframe() //Function to refresh all data in the timeline
{
	if (confirm("Warning: This might take a very long time")) { 
	alert('you will be alerted when it is done');
	for(var iz = 1; iz <= layers; iz++)
	{
	for(var i = 1; i <= totalFramesPerLayer; i++)
	{
	gotoframeInterface(i,iz);
	}
	}
	}
	alert('done');
}

//33B843

//80FF8E -light

function tFrame(framenumber,layer){
var frame = document.getElementById("frame" + framenumber + "layer" + layer);
frame.style.color = "#000000";
frame.style.backgroundColor=finishedTweenColor;
}

function tFrameSel(framenumber,layer){
var frame = document.getElementById("frame" + framenumber + "layer" + layer);
frame.style.color = "#000000";
frame.style.backgroundColor="#33B843";
}

function timelineInterfaceTween(nFA){
var kFrameC = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
if(kFrameC != nextFA){
nFn = kFrameC
}else{
nFn = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
}

for(var fNum = (nFn + 1); fNum < (nFA); fNum++){
TweenFrames[tFrameCount] = fNum
tFrameCount++
tFrame(fNum,layer)
}
}

function gotoframeInterface(framenumber,layer){

if(nextFA != 0 && kFrameCount > 1){
var nFn;
var kFrameC = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
if(kFrameC != nextFA){
nFn = kFrameC
}else{
nFn = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
}

createTween(nFn,nextFA)
var nFA = nextFA

var isTweened = "true";
for(var fNum = (nFn + 1); fNum < (nFA); fNum++){
TweenFrames[tFrameCount] = fNum
tFrameCount++
tFrame(fNum,layer)
}
nextFA = 0
}
//start keyframe detection code
	var wasKeyFrame = new Boolean(false); //variable to store wether the selection is a keyframe
	
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	wasKeyFrame = true
	}
	}
	//end keyframe detection code
	
	var aframe;
	aframe = document.getElementById("frame" + currentFrameSelection + "layer" + currentLayerSelection);
	if(wasKeyFrame == false){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	aframe.style.color = "black";
	aframe.style.backgroundColor=FrameColor;
	}else{
	tFrame(currentFrameSelection,layer)
	}
	}
	if(wasKeyFrame == true){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	aframe.style.color = frameTextColor;
	aframe.style.backgroundColor=KeyframeColor;
	}else{
	var kfc1 = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
	var kfc2 = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
	var cfs = currentFrameSelection
	if(cfs != 0 && cfs != 1&& cfs != kfc1){
	tFrame(currentFrameSelection,layer)
	}
	}
	}
	currentFrameSelection = framenumber
	currentLayerSelection = layer
	var frame;
	frame = document.getElementById("frame" + framenumber + "layer" + layer);
	var isKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == framenumber + "," + layer){
	isKeyFrame = true
	}
	}

	if(isKeyFrame == false){
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#00BFFF";
	}
	if(isKeyFrame == true){
	if(TweenFrames.join(",").indexOf(currentFrameSelection+",") == -1){
	frame.style.color = "#F2F2F2";
	frame.style.backgroundColor="#3579DC";
	}else{
	var kfc1 = parseInt(KeyFrames[kFrameCount -2].toString().split(",")[0])
	var kfc2 = parseInt(KeyFrames[kFrameCount -1].toString().split(",")[0])
	if(framenumber != 0 && framenumber != 1 && framenumber != kfc1){
	tFrameSel(framenumber,layer)
	}
	}
	}

	
}

function repeatChecks(){
checkFrame(currentFrameSelection,currentLayerSelection);

setTimeout("repeatChecks()",500);
}

repeatChecks()


function checkRepeat(oFrame){
var tot = 0
var mt = 0
var c1a = document.getElementById("richdraw"+oFrame).innerHTML

var c2a = document.getElementById("richdraw"+(oFrame-1)).innerHTML


var c1 = (new DOMParser()).parseFromString(c1a, "text/xml").firstChild.cloneNode(true)
var c2 = (new DOMParser()).parseFromString(c2a, "text/xml").firstChild.cloneNode(true)

if(c1.childNodes.length == c2.childNodes.length){
for(var q1=0;q1 < c1.childNodes.length;q1++){
if(c1.childNodes[q1].getAttribute("x")== c2.childNodes[q1].getAttribute("x")){
if(c1.childNodes[q1].getAttribute("y")== c2.childNodes[q1].getAttribute("y")){
mt++
}
}
tot++
/* 
for(var q2=0;q2 < c1.childNodes[q1].attributes.length;q2++){
if(c2.childNodes[q1].getAttribute(c1.childNodes[q1].attributes.nodeName)==c1.childNodes[q1].attributes.nodeValue
){
mt++
}
tot++
}
*/
}
}
var gp = "1"
if(mt == tot){
//got past level 1
if(mt != 0){
//got past level 2
if(tot != 0){
gp = "0"

}
}
}
if(gp != "0"){
return "diff" 
}else{
return "same"
}
}

function ikf(frame,layer){
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == frame + "," + layer){
	wasKeyFrame = true
	}
	}
	return wasKeyFrame;
	}

	function itf(frame){
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= tFrameCount; m++)
	{
	if(TweenFrames[m] == frame ){
	wasKeyFrame = true
	}
	}
	return wasKeyFrame;
	}
	
	
function checkFrame(oFrame, oLayer){
try{
var zisempty = false;
if(DrawCanvas[oFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[oFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
if(oFrame != 1 && oFrame != 0){
if(checkRepeat(oFrame) == "diff"){
if(itf(oFrame,oLayer) == false || ikf(oFrame,oLayer) == false){
nextFA = oFrame;
//timelineInterfaceTween(oFrame)
}

zisempty = false;
//finishedTween(oFrame,oLayer);
//tFrame(oFrame,oLayer)

}else{

zisempty = true
}
}
}
if(zisempty == false && itf(oFrame,oLayer) == false ){

makeKeyframe(oFrame,oLayer);
}
}catch(err){}
}

function setTotalFrameValue(){
	var qframe;
	qframe = document.getElementById("frame" + totalFrames + "layer" + 1);
	qframe.style.color = "#ffffff";
	qframe.style.backgroundColor="#FF9900";
}

function changeTotalFrameValue(tfValue){
totalFrames = tfValue;
setTotalFrameValue();
gotoframe(currentFrameSelection,currentLayerSelection);
}

function gotoframe(framenumber, layer) //Function to change the current selected frame
{
if(KeyFrames.join(",").indexOf(framenumber+","+layer) == -1){
}

var preCnvs = currentCanvas;
DrawCanvas[currentCanvas].unselect();
	if(framenumber > 0 && framenumber < totalFramesPerLayer){
	checkFrame(currentFrameSelection, layer);
	previousCanvas = currentCanvas;
	if(framenumber > totalFrames){
	gotoframeInterface(totalFrames, layer);
	totalFrames = framenumber;
	}
	gotoframeInterface(framenumber,layer);
	if(framenumber < totalFrames){
	setTotalFrameValue()
	}
	hideCurrentCanvas();
	currentCanvas = framenumber;
	if(DrawCanvas[currentCanvas]==null){
	if(isIE() == true){
	makeCanvasFromIE(framenumber);
	}else{
	makeCanvasFromId(framenumber);
	if($("richdraw"+preCnvs).firstChild.childNodes.length > 0){
		cloneFrame(preCnvs)
	}
	}
	}
	showCurrentCanvas();
 checkFrame(framenumber, layer);

}
}



function removeFrame(frameId,layer){
var qzmy = currentCanvas;
DrawCanvas[frameId] = null;
$("richdraw" + frameId).innerHTML = "";
currentCanvas = frameId;
initDraw()
currentCanvas = qzmy
addHist("Remove Frame")
}


function removeKeyframe(){ //Function to delete selected keyframe
/*
	var wasKeyFrame = new Boolean(false);
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	wasKeyFrame = true
	}
	}
	if(wasKeyFrame == false){
	alert("Error: This isn't a Key Frame!")
	}
	if(wasKeyFrame == true){
	if (confirm("Are You Sure you want to delete this frame?")) { 
	*/
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == currentFrameSelection + "," + currentLayerSelection){
	KeyFrames[m] = "0,0";
	}
	}
	removeFrame(currentFrameSelection , currentLayerSelection)
	
	gotoframe(currentFrameSelection,currentLayerSelection);
	
	//}
	//}
}

function isKeyframe(frame, layer){
	var pKeyFrame = new Boolean();
	pKeyFrame = false
	for(var m = 0; m <= kFrameCount; m++)
	{
	if(KeyFrames[m] == frame + "," + layer){
	pKeyFrame = true
	}
	}
	return pKeyFrame;
}

function ClearAllKeyframes(){ //Empties timeline

	if (confirm("Are you sure you want to delete ALL the keyframes?")) { 
	for(var m = 0; m <= kFrameCount; m++)
	{
	KeyFrames[m] = "0,0";
	gotoframe(currentFrameSelection,currentLayerSelection);
	}
	alert("Done.");
	}
}

var TDCount = 0;


function addLayer(){

var asdf; //create the string that stores the layer data

layers = layers + 1;

asdf =  "<div id='framesDiv'><table width='100%' cellspacing='0px' id='framesTable" + layers + "'"; //Create the Layer

asdf = asdf + (" cellspacing='0' border='1' onmouseover=\"document.body.style.cursor='default';\"> ");

asdf = asdf + ("<tr>")

asdf = asdf + ("<td onmouseover=\"try{document.body.style.cursor='default';Tip('Layer "+layers+"');}catch(err){}\" height='5' bgcolor='"+LayerBGColor+"'");


asdf = asdf + (">Layer" + layers + "</td>")
for (var x = 1; x <= totalFramesPerLayer; x++) //Start adding frames
{

asdf = asdf + ("<td id='frame" + x + "layer" + layers + "'height='5' cellpadding='0px' cellspacing='0px'");//Main attributes/'Frame' declaration

asdf = asdf + ("style='-moz-user-select: none; background-color:"+FrameColor+";' ");//css styling

asdf = asdf + ("onmousedown='gotoframe(" + x +", " + layers +");'"); //Start Javascript event handling

asdf = asdf + ("onmouseover=\"try{Tip(setTooltipData('"+x+"','"+layers+"'),TITLE, 'Frame "+x+"');}catch(err){}\" "); 


asdf = asdf + (">" + x);//Text in each frame

asdf = asdf + ("</td>")//End Frame

}
//End adding layer
asdf = asdf + ("</tr></table></div>")//Create end tags for layer

changeInnerHTML("frameContainer",asdf)//Add the layer to the actual page


}


function setTooltipData(uFrame,uLayer){
var wasKeyFrame = new Boolean(false);
for(var m = 0; m <= kFrameCount; m++)
{
if(KeyFrames[m] == uFrame + "," + uLayer){
wasKeyFrame = true
}
}
var ziskeyframe = 'false';
ziskeyframe = 'false';
if(wasKeyFrame == true){
ziskeyframe = 'true';
}
var zisselected = 'false';
if (currentFrameSelection == uFrame){
if (currentLayerSelection == uLayer){
zisselected = 'true';
}
}
var zisempty = false;
if(DrawCanvas[uFrame] == null){
zisempty = true;
}else{
if(DrawCanvas[uFrame].renderer.getMarkup().replace(" ","") == "<svg></svg>"){
zisempty = true;
}
}
var canvasframepreview = "empty";
if(DrawCanvas[uFrame] != null){
canvasframepreview = DrawCanvas[uFrame].renderer.getMarkup()
}

if(zisempty == false){
var pstr = DrawCanvas[uFrame].renderer.getMarkup();
count = 0; 
var key = "rect";
pos = pstr.indexOf(key);
while ( pos != -1 ) {
count++;
pos = pstr.indexOf(key,pos+1);
}
key = "line";
pos = pstr.indexOf(key);
while ( pos != -1 ) {
count++;
pos = pstr.indexOf(key,pos+1);
}
}

//zDataText = '<b>frame:</b> '+uFrame+'<br><b>layer:</b> '+uLayer
zDataText = '<b>layer:</b> '+uLayer
zDataText+='<br><b>keyframe:</b>'+ziskeyframe+'<br><b>selected:</b> '+zisselected;
zDataText+='<br><b>empty:</b>' + zisempty;
if(zisempty == false){
zDataText+='<br><b>Total Objects:</b> ' + count/2;
}
if(uFrame == totalFrames){
zDataText+='<br><b>Last Frame</b>';
}
//zDataText+='<br><b>Preview:</b><br>' +  canvasframepreview.replace('_moz-userdefined=""','');
//document.getElementById("ToolTipData").innerHTML=zDataText
if(zisempty == false){
zDataText += "<div id='timPreDiv' style='width: 120px; height: 68px;border: 1px black solid;z-index: 100000'></div>";
setTimeout("generateFramePreview("+uFrame+")",500);
}else{
zDataText += "<div id='timPreDiv' style='width: 120px; height: 68px;border: 1px black solid;z-index: 100000'><center>No Preview Availiable</center></div>";
}
return zDataText;



}

function generateFramePreview(frameNumber){
if(document.getElementById("timPreDiv")){
document.getElementById("timPreDiv").innerHTML = "";
var svgNamespace = 'http://www.w3.org/2000/svg';
var newSVGE = document.createElementNS(svgNamespace,"svg")
newSVGE.setAttributeNS(null, "viewBox", "0 0 480 272");
document.getElementById("timPreDiv").appendChild(newSVGE);
var rdX = $("richdraw" + frameNumber).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
document.getElementById("timPreDiv").firstChild.appendChild(newShape);
}catch(err){}
}
}
}


function changeInnerHTML (elm, txt) {
	if(document.getElementById) {
	var el = document.getElementById(elm);
	el.innerHTML = el.innerHTML + txt;
	return true;
	}
	return false;
}


function overwriteInnerHTML (elm, txt) {
	if(document.getElementById) {
	var el = document.getElementById(elm);
	el.innerHTML =  txt;
	return true;
	}
	return false;
}


//<div id="frameContainer" onmouseover="document.body.style.cursor='default';" style="width:100%;overflow:scroll"></div>
 
 var canvasNumber = 1;
var previousCanvas = 0;
var canvasDisplayStyle = "";
var canvasIssueResolved = new Boolean();
var AnimationPlay = new Boolean();
var AnimationFramerate = 12; 
var totalFrames = 1;
var canvasHeight = 272;
var canvasWidth = 480;
var revisionNumber = 1;
var animationRevision = new Array();
var animationRevisionURL = new Array();
var lastAnimationURL = '';
var replaceEngine = 'string'; //either regexp or string, it is the engine that changes stuff
AnimationPlay = true;
canvasIssueResolved = false;



function makeCanvasFromIE(CanvasId){
var canvasString;
canvasString='<div id="richdraw'+CanvasId+'" style="';
canvasString+='border:1px solid black;position:relative;top:0px'
canvasString+='width:99%;height:99%;background-color:white;'
canvasString+='-moz-user-select:none;display:'+canvasDisplayStyle+'"></div>';
document.getElementById("CanvasContainer").innerHTML+=canvasString;
canvasDisplayStyle = "none";
initDraw();
}

function makeCanvasFromId(CanvasId){
var richdrawCanvas = document.createElement('div');
var richdrawCanvasStyle = "border:1px solid black;position:relative;"
richdrawCanvasStyle += "top:0px;width:99%;height:99%;background-color:white;"
richdrawCanvasStyle += "-moz-user-select:none;"
richdrawCanvas.setAttribute('id','richdraw'+CanvasId);
richdrawCanvas.setAttribute('style',richdrawCanvasStyle+"display:"+canvasDisplayStyle);
document.getElementById('CanvasContainer').appendChild(richdrawCanvas);
canvasDisplayStyle = 'none'
initDraw();
}

function setCP(){

$('CanvasContainer').style.height = canvasHeight+ 'px';
$('CanvasContainer').style.width =  canvasWidth + 'px';

$('zFlashPreviewDiv').style.height = canvasHeight + 'px';
$('zFlashPreviewDiv').style.width = canvasWidth + 'px';
}



function generateAnimationXML(){
DrawCanvas[currentCanvas].unselect();
var zAnimationXML = "<AnimationXML>";
for(var pzxy = 1; pzxy <= totalFrames;pzxy++){
if(DrawCanvas[pzxy] != null && DrawCanvas[pzxy].renderer.getMarkup() != "<svg></svg>"){
var zCurrentAnimationXMLFrame;
//zCurrentAnimationXMLFrame = DrawCanvas[pzxy].renderer.getMarkup() this fails in IE so do it the hard way...
zCurrentAnimationXMLFrame = $('richdraw' + pzxy).innerHTML;
zAnimationXML += zCurrentAnimationXMLFrame;
}else{
if(isKeyframe(pzxy,1) != false){
zAnimationXML += "<svg></svg>"
}else{
zAnimationXML += '<svg t="f"></svg>'
}
}
}
zAnimationXML += "</AnimationXML>";
return zAnimationXML;
}

function replaceT(findStr, repStr, origStr){
var re = new RegExp(findStr, "g"); // pre replace using regexp
return origStr.replace(re, repStr);
}


function isIE(){
    ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    if ((!ie) || (opera)) {
	//return false
	}else{
	return true
	}
}

function initCanvas(){
	//for(var zxCanvas = 0; zxCanvas > 10; zxCanvas++){
	makeCanvasFromIE(1);
	//}
	gotoframe(1,1);
}




 
 function playAnimation(){
AnimationPlay = true;
doAnimation();
}

function doAnimation(){
if(totalFrames == 1){
AnimationPlay = false;
}
if(currentCanvas + 1> totalFrames){
gotoframe(1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}else{
if(AnimationPlay == true){
gotoframe(currentFrameSelection+1,1);
setTimeout('doAnimation()',1000/AnimationFramerate);
}
}
}


function replaceAll(fS,repStr,oldStr) {
var re = new RegExp(fS, "g"); 
return oldStr.replace(re, repStr);
}

function stopAnimation(){
AnimationPlay = false;
}

function nextFrame(){
gotoframe(currentFrameSelection+1,1)
}
function preFrame(){
gotoframe(currentFrameSelection-1,1)
}
function firstFrame(){
gotoframe(1,1)
}
function lastFrame(){
gotoframe(totalFrames,1)
}
function setLastFrame(){
changeTotalFrameValue(currentFrameSelection)
}

function hideCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "none";
}catch(err){}
}

function showCurrentCanvas(){
try{
document.getElementById("richdraw"+currentCanvas).style.display = "";
}catch(err){}
}



 
 var userMode = "login";
var encPW = "";
var userName = "";
var cPrEiD = "";
var cPrEuN = "";
var initMD5var;



function submitUser(){
if(userMode == "login"){
loginUser()
}else{
registerUser();
}
}

function loginUser(){

if(!initMD5var){
addJS("../lib/md5.js",function(){
initMD5var = "true";
loginUser();
})
}else{

var cUsername = $("usrId").value;
var cPassword = hex_md5($("pwId").value);
ajaxpack.postAjaxRequest("../php/login.php", "user="+cUsername+"&pass="+cPassword+"&valid=true&rem=true", loginUserEvent, "txt")
}
}

function logout(){
$("userQuery").style.display = ""
$("userProfile").style.display = "none";
encPW = "";
userName = "";
regbutton.setVisible(true)
logoutbutton.setVisible(false)
}


function loginSucessful(){
$("userQuery").style.display = "none"
$("usrNme").innerHTML = "Welcome&nbsp;" + userName;
$("userProfile").style.display = "";
animationList()
regbutton.setVisible(false)
logoutbutton.setVisible(true)
}

function loginUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,3).indexOf("S") != -1){
Ext.MessageBox.alert("Login Status","Login Sucessful")
encPW = hex_md5($("pwId").value);
userName = $("usrId").value
loginSucessful()
}else{
Ext.MessageBox.alert("Login Status",myajax.responseText.substr(4).replace(":",""))
}
}
}
}



function registerUserCred(user,pass){
ajaxpack.postAjaxRequest("../php/register.php", "user="+user+"&pass="+pass+"&valid=true", registerUserEvent, "txt")
}

function registerUserEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
if(myajax.responseText.substr(1,2).indexOf("S") != -1){
Ext.MessageBox.alert("Registration Status","Registration Sucessful")
}else{
Ext.MessageBox.alert("Registration Status",myajax.responseText.substr(4).replace(":",""))
}
}
}
}



function savetoserver(){
if($("userProfile").style.display == ""){
var savedata = escape(escape(animationSaveData()));
var nameRequest = prompt('Set a Name For Animation', 'animation' + Math.floor(Math.random()*999));
ajaxpack.postAjaxRequest("../php/savetoserver.php", "user="+userName+"&pass="+encPW+"&data="+savedata+"&name="+nameRequest, savetoserverEvent, "txt")

}else{
Ext.MessageBox.alert("Error:","Please Login or Register First")
}
}

function savetoserverEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
Ext.MessageBox.alert("Save Status","Save Sucessful");
animationList()
}
}
}


function animationList(){
if(userName != ""){
ajaxpack.postAjaxRequest("../php/listAnimations.php", "user=" + userName, listAnimationEvent, "txt")
}else{
Ext.MessageBox.alert("Error:","Please Login Before Using This Feature")
}
}

function listAnimationEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
var animationList = myajax.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:loadAnimationFromURL('"+animationList[q]+"')"+qt+">"+au+"</a><br>";
}
$("userFiles").innerHTML = animations;
}
}
}


function loadAnimationFromURL(url){
ajaxpack.postAjaxRequest("../users/" + userName + "/animations/" + url, "", loadAnimationEvent, "txt")
}

function loadAnimationEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
loadAnimation(unescape(myajax.responseText))

}
}
}

function refreshOtherAnimations(){
if($("UAB").innerHTML.indexOf("javascript:previewAnimationFromURL") == -1){
browseOtherAnimations()
}else{
var urnQ = $("UAB").innerHTML.split("javascript:previewAnimationFromURL")[1].split(",")[1].split(")")[0].replace("'","").replace("'","")
animationList2(urnQ);
}
}

function browseOtherAnimations(){
ajaxpack.getAjaxRequest("../php/usersList.php", "", otherAnimationsEvent, "txt")
}

function otherAnimationsEvent(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
$("UAB").innerHTML = myajax.responseText
}
}
}

function animationList2(unA){
uAn = unA;
ajaxpack.postAjaxRequest("../php/listAnimations.php", "user=" + unA, listAnimationEvent2, "txt")
}

function LAFC(){
ajaxpack.postAjaxRequest("../users/" + cPrEuN + "/animations/" + cPrEiD, "", loadAnimationEvent, "txt")
}

function listAnimationEvent2(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
var animationList = myajax.responseText.split(",");
var animations = "";
var qt = '"';
for(var q = 0; q < animationList.length; q++){
var au = animationList[q].replace(".xml","")
animations += "<a href="+qt+"javascript:previewAnimationFromURL('"+animationList[q]+"','"+uAn+"')"+qt+">"+au+"</a><br>";
}
$("UAB").innerHTML = animations;
}
}
}

function previewAnimationFromURL(fLn,uAn){
cPrEiD = fLn
cPrEuN = uAn
ajaxpack.postAjaxRequest("../users/" + uAn + "/animations/" + fLn, "", loadAnimationEvent2, "txt")
}

function loadAnimationEvent2(){
var myajax=ajaxpack.ajaxobj
var myfiletype=ajaxpack.filetype
if (myajax.readyState == 4){ //if request of file completed
if (myajax.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally

uablayout.getRegion('center').showPanel('animationViewer');

_lA(unescape(myajax.responseText),"AXMLPlayer");

}
}
}
var _QzX = "";
var _y=1;
var _rq = "f";
function _lA(a,z){
_rq = "t"
_QzX = "";
_y=1;
document.getElementById(z).innerHTML = "";
var b="http://www.w3.org/2000/svg";var c=document.createElement("div");
c.setAttribute("style","width:480;height:272;overflow:hidden");
var d=new DOMParser();var e=d.parseFromString(a,"text/xml").firstChild.getElementsByTagName("svg");
for(var f=0;f<e.length;f++){var g=document.createElement("div");g.style.display="none";
g.appendChild(document.createElementNS(b,"svg"));var h=e[f].childNodes;for(var i=0;i<h.length;i++){
var j=h[i];var k=j.attributes;var l=document.createElementNS(b,j.tagName);for(var m=0;m<k.length;m++){
l.setAttributeNS(null,k[m].nodeName,k[m].value)}g.firstChild.appendChild(l)}c.appendChild(g)}
document.getElementById(z).appendChild(c);
_rq = "f"
_QzX = z
_pA(z)}

function _pA(z){
if(_rq == "f"){
var a=document.getElementById(z).firstChild.childNodes;
_y++;if(_y==a.length){_y=0}else{a[_y-1].style.display="none"}
a[_y].style.display="";
setTimeout("_pA('"+z+"')",83)}}



 
 
var knextframe = new YAHOO.util.KeyListener(document, { keys:[39,33] }, { fn:function(){
gotoframe(currentFrameSelection+1,1)
}, correctScope:true } );
knextframe.enable();

var kpreframe = new YAHOO.util.KeyListener(document, { keys:[37,34] }, { fn:function(){
gotoframe(currentFrameSelection-1,1)
}, correctScope:true } );
kpreframe.enable();

var ktokeyframe = new YAHOO.util.KeyListener(document, { keys:117 }, { fn:function(){
toKeyframe();
}, correctScope:true } );
ktokeyframe.enable();

var kplayanim = new YAHOO.util.KeyListener(document, { keys:[80,13] }, { fn:function(){
playAnimation()
}, correctScope:true } );
ktokeyframe.enable();

var kstopanim = new YAHOO.util.KeyListener(document, { keys:83 }, { fn:function(){
stopAnimation();
}, correctScope:true } );
kstopanim.enable();

var kdelete = new YAHOO.util.KeyListener(document, { keys:46 }, { fn:function(){
if(DrawCanvas[currentCanvas].selected != null){
deleteShape();
}else{
removeKeyframe();
}
}, correctScope:true } );
kdelete.enable();

var kfdelete = new YAHOO.util.KeyListener(document, { keys:82 }, { fn:function(){
removeKeyframe()
}, correctScope:true } );
kfdelete.enable();

 
  function setLayerData(){
 DrawLayer[currentLayer] = DrawCanvas;
 }

 function setLayer(LayerNumber){
 currentLayer = LayerNumber;
DrawCanvas  =DrawLayer[currentLayer] ;
 }
 
 function initDraw() {

    var renderer;
    ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
    opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
    if ((!ie) || (opera)) {
      renderer = new SVGRenderer();
    }
    else {
	// renderer = new Renderer();
    }
    DrawCanvas[currentCanvas] = new RichDrawEditor(document.getElementById('richdraw'+currentCanvas), renderer);
    DrawCanvas[currentCanvas].onselect = onSelect;
    DrawCanvas[currentCanvas].onunselect = onUnselect;
	//$("CanvasContainer").onmousedown = startDown;
	$("CanvasContainer").onmouseup = function(){
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	checkEdit();
	setSD();
	initHistory = "true";
	})
	}else{
	checkEdit();
	setSD();
	}
	}
	//$("CanvasContainer").onclick = checkEdit;
	if(totalFrames == 1){
	setCanvasDefaults();
	}else{

	editHistoryNumber++;
	if(!initHistory){
	addJS("../ajaxanimator/historyManagement.js",function(){
	addHistoryTO("Add&nbsp;Frame")
	initHistory = "true";
	})
	}

	editHistory[editHistoryNumber] =  $("CanvasContainer").innerHTML
	setCanvasProperties();
	}
	isinit = true;
	setLayerData()
  }
  
  function refreshModeData(){
  if(DrawCanvas[currentCanvas]){
    DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
 }
 // setSD();
  setTimeout('refreshModeData()',1000);
  
  }
  
  
  
  function setCanvasDefaults(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', 'rgb(255,0,0)');
    DrawCanvas[currentCanvas].editCommand('linecolor', 'rgb(0,0,0)');
    DrawCanvas[currentCanvas].editCommand('linewidth', '1px');
    setMode('rect', 'Rectangle');
    $('fillcolor').style.backgroundColor = 'rgb(255,0,0)';
    $('linecolor').style.backgroundColor = 'rgb(0,0,0)';
  }
  
    function setCanvasProperties(){
    DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
    DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
	
	var LWidth = $('linewidth').options[$('linewidth').selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', LWidth);
	DrawCanvas[currentCanvas].editCommand('mode', zCurrentCanvasMode);
  }
  
  function setMode(mode, status) {
    DrawCanvas[currentCanvas].editCommand('mode', mode);
	zCurrentCanvasMode = mode;
    if (mode == 'select'){
      $('status').innerHTML = 'Mode: Select/Move' ;

    }else{
      $('status').innerHTML = 'Mode: Draw ' + status;
	  }
  }
  
  function deleteShape() {
    DrawCanvas[currentCanvas].deleteSelection();
	addHistory("Delete Shape")
  }
  
  function setFillColor(sfc) {
DrawCanvas[currentCanvas].editCommand('fillcolor', sfc);
    //DrawCanvas[currentCanvas].editCommand('fillcolor', $('fillcolor').style.backgroundColor);
  }
  
  function setLineColor(slc) {
DrawCanvas[currentCanvas].editCommand('linecolor', slc);
    //DrawCanvas[currentCanvas].editCommand('linecolor', $('linecolor').style.backgroundColor);
	//currentPreviewColor
  }
  
  function setLineWidth(widths) {
    var width = widths.options[widths.selectedIndex].value;
    DrawCanvas[currentCanvas].editCommand('linewidth', width);
  }

  function getOptionByValue(select, value)
  {
    for (var i=0; i<select.length; i++) {
      if (select.options[i].value == value) {
        return i;
      }
    }
    return -1;
  }

  function showMarkup() {
    alert(value=DrawCanvas[currentCanvas].renderer.getMarkup());
  }
  
  function onSelect() {
  setLayerData()
    $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
	$('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }

  function onUnselect() {
  setLayerData()
   $('fillcolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('fillcolor');
    $('linecolor').style.backgroundColor = DrawCanvas[currentCanvas].queryCommand('linecolor');
   $('linewidth').selectedIndex = getOptionByValue($('linewidth'), DrawCanvas[currentCanvas].queryCommand('linewidth'));
  }
  
  function randomRect(){
  var svgNamespace = 'http://www.w3.org/2000/svg';
      var red1 = Math.round(Math.random() * 255);
      var green1 = Math.round(Math.random() * 255);
      var blue1 = Math.round(Math.random() * 255);
	  var red2 = Math.round(Math.random() * 255);
      var green2 = Math.round(Math.random() * 255);
      var blue2 = Math.round(Math.random() * 255);
 var newRect = document.createElementNS(svgNamespace,"rect");
	  newRect.setAttributeNS(null,"stroke-width",Math.random() * 10);	
	  	  newRect.setAttributeNS(null,"stroke","rgb("+ red1 +","+ green1+","+blue1+")");
      newRect.setAttributeNS(null,"fill","rgb("+ red2 +","+ green2+","+blue2+")");
	        newRect.setAttributeNS(null,"height",Math.random() * 100);	
      newRect.setAttributeNS(null,"width",Math.random() * 100);	
      newRect.setAttributeNS(null,"y",Math.random() * 272);
      newRect.setAttributeNS(null,"x",Math.random() * 480);

      DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newRect);
	  Event.observe(newRect, "mousedown",DrawCanvas[currentCanvas].onHitListener);  
  }
  function appleAd(){
  for(var items = 0; items < 30; items++){

  for(var rects = 0; rects < 10; rects++){
  randomRect()
  }
  gotoframe(items,1)
  removeKeyframe()
  }
  }



 
   function openAnimation(){
  loadAnimation(unescape(uploadFrame.document.body.innerHTML))
  resetHistory()
  }
  
function newCanvas(){
revisionNumber = 1;
animationRevision = new Array();
animationRevisionURL = new Array();
lastAnimationURL = '';
gotoframe(1,1)
DrawCanvas = new Array();
currentLayer = 1;
currentCanvas = 1;
$("CanvasContainer").innerHTML = "";
KeyFrames = new Array();
$("frameContainer").innerHTML = "";
layers = 0;
kFrameCount = 0
totalFrames = 1;
currentFrameSelection = 1;
currentLayerSelection = 1;
addLayer()
makeCanvasFromIE(1)
gotoframe(1,1)
}

function newAnimation(){
newCanvas();
resetHistory();
}



  function toggleLoadInput(){
  if($("STRINPT").style.display == "none"){
  $("STRINPT").style.display = ""
  }else{
  $("STRINPT").style.display = "none"
  }
  }
  
  function toggleSaveInput(){
  if($("STROUT").style.display == "none"){
  $("STROUT").style.display = ""
  }else{
  $("STROUT").style.display = "none"
  }
  }
  
 
  function saveAXTxt(){
  $("AXTxt").value = escape(animationSaveData());
  }
  
  function loadAXIT(){
  loadAnimation(unescape($("AXIT").value));
  resetHistory()
  }
function confirmNewCanvas(){
	if (confirm("Do you want to save before continuing?\n press Cancel to proceed anyways")) { 
		saveDialog();
	}else{
	newAnimation();
	}
}  
  
  
  
function loadAnimation(Axml){
newCanvas();
cloneFrameEnabled = false;
var svgNamespace = 'http://www.w3.org/2000/svg';
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(Axml,"text/xml");
}
var domAnimation = domContainer.firstChild;
for(var dId = 0; dId < domAnimation.getElementsByTagName("svg").length; dId++){
if(DrawCanvas[dId +1] == null){

gotoframe(dId + 1,1);
}
var domShape = domAnimation.getElementsByTagName("svg")[dId];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[dId +1].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[dId +1].onHitListener);  
}
catch(err)
{
}
}
}
cloneFrameEnabled == true;
}


function copyObj(){
if(DrawCanvas[currentCanvas].selected == null){
alert("Please Select an Object First");
}else{
clipboardTagStr = DrawCanvas[currentCanvas].selected.tagName;
clipboardAtt = DrawCanvas[currentCanvas].selected.attributes;
}
}

function pasteObj(){
try{
var svgNamespace = 'http://www.w3.org/2000/svg';
var newShape = document.createElementNS(svgNamespace , clipboardTagStr);
for(var aId = 0; aId < clipboardAtt.length; aId++){
newShape.setAttributeNS(null, clipboardAtt[aId].nodeName, clipboardAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}catch(err){alert(err)}
}

function clonePreviousFrame(){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + (currentCanvas-1)).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}
catch(err)
{
}
}
}
}


function cloneFrame(frame){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + frame).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}
catch(err)
{
}
}
}
}


function moveFrameObj(distance){
if(cloneFrameEnabled == true){
var svgNamespace = 'http://www.w3.org/2000/svg';
var rdX = $("richdraw" + (currentCanvas)).innerHTML
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(rdX);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(rdX,"text/xml");
}

var domShape = domContainer.getElementsByTagName("svg")[0];
for(var cId = 0; cId < domShape.childNodes.length; cId++){
try{
var cNode = domShape.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
if(cAtt[aId].nodeName != "x" && cAtt[aId].nodeName != "y"){

}

newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[currentCanvas].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[currentCanvas].onHitListener);  
}
catch(err)
{
}
}
}
}


function animationSaveData(){
return "<AnimationXML>" + $('CanvasContainer').innerHTML + "</AnimationXML>";
}

function saveAnimation(){
window.location = dataUrl(escape(animationSaveData()), "application/ajaxanimator")
}

function dataUrl(data, mimeType){ // turns a string into a url that appears as a file. (to ff/op/saf)
   encType= (!!btoa) ? ";base64" : "";
   var esc = (!!encType) ? function(d){return btoa(d);} : function(d){return escape(d);};
   if(!mimeType){mimeType= (data.nodeName) ? "text\/html" :"text\/plain";};	
   b="data:"+mimeType+";charset="+document.characterSet+encType+",";
   
  	if ("string number date boolean function".indexOf(typeof data) > -1){ b+=esc(data.toString()); return b; };  
  	if ( data.constructor==Array){b+= esc( data.join("") );	return b;  };
	if(typeof data=="xml"){b+=esc(data.toSource()); return b;} //FF2 xml frag/doc
		//for more complicated data, attempt to determine the format.
	if(typeof data=="object"){ 
		  if(!!data.value && !!data.value.length){b+=esc(data.value); return b;}; //input tags w/content
		  if(!!data.innerHTML){b+=esc(data.innerHTML); return b;} //HTML tag
		  if(!!data.length){ 		//weird stuff like nodelists
			var G=function(ob){r=[]; i=0; 
				for(i;i<ob.length;i++){
				if(dataUrl(ob[i])) r[i]=dataUrl(ob[i]);} return r.join("\n");};//end g
		    return	(b+G(data));}//end if object w/length	
		  if(!! eval(data.toSource()) ){b+=esc(data.toSource()); return b;}; //JSON
	  }//end if object 
 return;
}  //end function dataUrl

function setSD(){
	  if(DrawCanvas[currentCanvas].mode == "select" && DrawCanvas[currentCanvas].selected != null){
	  
	  $("ResizeObjOpt").style.display = ""
$("noSelectRem").style.display = "none"
	  $('sHeight').value = DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue;
	  $('sWidth').value = DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue;
}else{
$("ResizeObjOpt").style.display = "none"
$("noSelectRem").style.display = ""
}
	  }
function setSP(){

DrawCanvas[currentCanvas].selected.attributes['width'].nodeValue  = $("sWidth").value
DrawCanvas[currentCanvas].selected.attributes['height'].nodeValue  = $("sHeight").value
DrawCanvas[currentCanvas].renderer.showTracker(DrawCanvas[currentCanvas].selected)
}


function createTween(firstFrame,secondFrame){
var startframesrc = document.getElementById("richdraw" + firstFrame).innerHTML
var endframesrc = document.getElementById("richdraw" + secondFrame).innerHTML
var tweenstr = "<AnimationXML>" + startframesrc + endframesrc + "</AnimationXML>";
var e=(new DOMParser()).parseFromString(tweenstr,"text/xml").firstChild.getElementsByTagName("svg");
if(e[1].childNodes.length == e[0].childNodes.length){//if same number of objects per frame
var tweens = secondFrame - firstFrame
var newE = new Array();
newE[0] = e[0].cloneNode(true)
for(var ctf=0;ctf<tweens;ctf++){
newE[ctf] = e[0].cloneNode(true)
}
for(var objIndex=0;objIndex<e[0].childNodes.length;objIndex++){
if(e[0].childNodes[objIndex].getAttribute("id") + e[1].childNodes[objIndex].getAttribute("id")){//if same ids
var x1 = parseInt(e[0].childNodes[objIndex].getAttribute("x"))
var x2 = parseInt(e[1].childNodes[objIndex].getAttribute("x"))
var xtDistance = x2-x1;
var y1 = parseInt(e[0].childNodes[objIndex].getAttribute("y"))
var y2 = parseInt(e[1].childNodes[objIndex].getAttribute("y"))
var ytDistance = y2-y1;
var xtDfP = xtDistance/tweens;
var ytDfP = ytDistance/tweens;
for(var tf=0;tf<tweens;tf++){
newE[tf].childNodes[objIndex].setAttribute("x", (xtDfP * tf) + x1)
newE[tf].childNodes[objIndex].setAttribute("y", (ytDfP * tf) + y1)
}
}
}
for(var cf=0;cf<newE.length;cf++){
loadFrame((new XMLSerializer()).serializeToString(newE[cf]),cf + firstFrame);
}
}
}

function loadFrame(Axml,frame){
if ( DrawCanvas[frame].renderer.svgRoot.hasChildNodes() ){
while ( DrawCanvas[frame].renderer.svgRoot.childNodes.length >= 1 ){
DrawCanvas[frame].renderer.svgRoot.removeChild( DrawCanvas[frame].renderer.svgRoot.firstChild );       
} 
} 
var svgNamespace = 'http://www.w3.org/2000/svg';
if (window.ActiveXObject){
var domContainer = new ActiveXObject("Microsoft.XMLDOM");
domContainer.async="false";
domContainer.loadXML(Axml);
}else{
var parser=new DOMParser();
var domContainer=parser.parseFromString(Axml,"text/xml");
}
var domFrame = domContainer.firstChild; //svg
if(DrawCanvas[frame] == null){gotoframe(frame,1);}//create frame
for(var cId = 0; cId < domFrame.childNodes.length; cId++){
var cNode = domFrame.childNodes[cId];
var cAtt = cNode.attributes;
var newShape = document.createElementNS(svgNamespace , cNode.tagName);
for(var aId = 0; aId < cAtt.length; aId++){
newShape.setAttributeNS(null, cAtt[aId].nodeName, cAtt[aId].value);
}
DrawCanvas[frame].renderer.svgRoot.appendChild(newShape);
Event.observe(newShape, "mousedown", DrawCanvas[frame].onHitListener);  
}
}
 
  var DrawLayer = new Array();
 var DrawCanvas = new Array();
 var currentLayer = 1;
 var currentCanvas = 1;
 var zCurrentCanvasMode = 'rect';
 var editHistoryNumber = 0;
 var editHistory = new Array();
 var mouseIsDown = new Boolean();
 var clipboardTagStr = "";
 var clipboardAtt;
 var initHistory;
 var cloneFrameEnabled = new Boolean(true);
 var Colorobj;
 var picker; 
 /*
function checkAnimationXML(axml){ // basic animationxml test
var dA = unescape(axml)
if(dA.indexOf("<") != -1 && dA.indexOf(">") != -1){
if(dA.indexOf("svg") != -1){
return "valid"
}
}
}
*/ 
 
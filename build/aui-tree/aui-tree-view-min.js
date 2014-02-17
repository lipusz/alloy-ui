AUI.add("aui-tree-view",function(ac){var U=ac.Lang,at=U.isBoolean,ay=U.isString,au=ac.UA,q="boundingBox",d="children",a="container",Z="content",s="contentBox",S=".",aq="file",R="hidden",z="hitarea",P="icon",ag="label",N="lastSelected",aw="leaf",p="node",W="ownerTree",F="root",T="selectOnToggle",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",az=function(){return Array.prototype.slice.call(arguments).join(r);},al=function(A){return(A instanceof ac.TreeNode);},y=ac.ClassNameManager.getClassName,ao=y(f,z),w=y(f,P),i=y(f,ag),u=y(f,p,Z),ap=y(f,p,R,z),l=y(f,F,a),ah=y(f,x,Z);var O=ac.Component.create({NAME:K,ATTRS:{type:{value:aq,validator:ay},lastSelected:{value:null,validator:al},lazyLoad:{validator:at,value:true},selectOnToggle:{validator:at,value:false}},AUGMENTS:[ac.TreeData,ac.TreeViewPaginator,ac.TreeViewIO],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(q);L.setData(K,A);A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ac.bind(A._afterSetChildren,A));A._delegateDOM();},createNodes:function(L){var A=this;ac.Array.each(ac.Array(L),function(aC){var aB=A.createNode(aC);A.appendChild(aB);});A._syncPaginatorUI(L);},renderUI:function(){var A=this;A._renderElements();},_afterSetChildren:function(L){var A=this;A._syncPaginatorUI();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aF){var aE=aF.one("> *").remove();var aD=aE.outerHTML();var aC=aF.one("> ul");var aG=new ac.TreeNode({boundingBox:aF,container:aC,label:aD,leaf:!aC,ownerTree:A});if(aC){aG.render();A._createFromHTMLMarkup(aC);}else{aG.render();}var aB=aF.get(c).get(c);var aH=aB.getData(B);if(!ac.instanceOf(aH,ac.TreeNode)){aH=aB.getData(K);}aH.appendChild(aG);});},_createNodeContainer:function(){var A=this;var L=A.get(s);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(s);var aB=A.get(d);var aC=A.get(e);var aD=y(f,aC);L.addClass(ah);L.addClass(az(aD,l));if(!aB.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",ac.bind(A._onClickNodeEl,A),S+u);L.delegate("dblclick",ac.bind(A._onClickHitArea,A),S+w);L.delegate("dblclick",ac.bind(A._onClickHitArea,A),S+i);L.delegate("mouseenter",ac.bind(A._onMouseEnterNodeEl,A),S+u);L.delegate("mouseleave",ac.bind(A._onMouseLeaveNodeEl,A),S+u);},_onClickNodeEl:function(L){var A=this;var aC=A.getNodeByChild(L.currentTarget);var aD=L.target;if(aC&&!aD.hasClass(ap)){if(aD.hasClass(ao)){aC.toggle();if(!A.get(T)){return;}}if(!aC.isSelected()){var aB=A.get(N);if(aB){aB.unselect();}aC.select();}}},_onMouseEnterNodeEl:function(L){var A=this;var aB=A.getNodeByChild(L.currentTarget);if(aB){aB.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var aB=A.getNodeByChild(L.currentTarget);if(aB){aB.out();}},_onClickHitArea:function(L){var A=this;var aB=A.getNodeByChild(L.currentTarget);if(aB){aB.toggle();}}}});ac.TreeView=O;var J=U.isNumber,ad="above",b="append",af="below",an="block",ai="body",ax="clearfix",ab="default",t="display",ak="down",v="drag",m="draggable",Y="dragCursor",ar="dragNode",h="expanded",n="helper",av="insert",D="offsetHeight",c="parentNode",aA="scrollDelay",M="state",aj="tree-drag-drop",am="up",I=ac.DD.DDM,ae=y(n,ax),j=y(P),aa=y(f,v,n),o=y(f,v,n,Z),H=y(f,v,n,ag),E=y(f,v,av,ad),X=y(f,v,av,b),G=y(f,v,av,af),k=y(f,v,M,b),Q=y(f,v,M,av,ad),V=y(f,v,M,av,af),C='<div class="'+aa+'">'+'<div class="'+[o,ae].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=ac.Component.create({NAME:aj,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:ac.TreeView,prototype:{direction:af,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;ac.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;ac.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=ac.Node.create(C).hide();ac.one(ai).append(L);A.set(n,L);I.set(Y,ab);},_bindDragDrop:function(){var A=this;var aB=A.get(q);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new ac.DD.Delegate({bubbleTargets:A,container:aB,nodes:S+u,target:true});var aC=A.ddDelegate.dd;aC.plug(ac.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(ac.Plugin.DDNodeScroll,{scrollDelay:A.get(aA),node:aB});aC.removeInvalid("a");if(L){L.detach();}};if(!au.touch){L=aB.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(X);},_goingDownState:function(L){var A=this;A.dropAction=af;A.get(n).addClass(V);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ad;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var aB=A.get(n);aB.removeClass(k);aB.removeClass(Q);aB.removeClass(V);if(L){L.removeClass(E);L.removeClass(X);L.removeClass(G);}},_updateNodeState:function(A){var aK=this;var aG=A.drag;var aD=A.drop;var L=aD.get(p);var aJ=L.get(c);var aF=aG.get(p).get(c);var aC=aJ.getData(B);aK._resetState(aK.nodeContent);if(!aF.contains(aJ)){var aL=L.get(D)/3;var aB=L.getY();var aI=aB+aL;var aH=aB+aL*2;var aE=aG.mouseXY[1];if((aE>aB)&&(aE<aI)){aK._goingUpState(L);}else{if(aE>aH){aK._goingDownState(L);}else{if((aE>aI)&&(aE<aH)){if(aC&&!aC.isLeaf()){aK._appendState(L);}else{if(aK.direction===am){aK._goingUpState(L);}else{aK._goingDownState(L);}}}}}}aK.nodeContent=L;},_afterDropHit:function(aD){var A=this;var aF=A.dropAction;var aE=aD.drag.get(p).get(c);var aB=aD.drop.get(p).get(c);var aG=aB.getData(B);var aC=aE.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aG;L.tree.dragNode=aC;if(aF===ad){aG.insertBefore(aC);
A.bubbleEvent("dropInsert",L);}else{if(aF===af){aG.insertAfter(aC);A.bubbleEvent("dropInsert",L);}else{if(aF===b){if(aG&&!aG.isLeaf()){aG.appendChild(aC);if(!aG.get(h)){aG.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(aB){var A=this;var L=A.lastY;var aC=aB.target.lastXY[1];if(aC!==L){A.direction=(aC<L)?am:ak;}A.lastY=aC;},_onDragStart:function(aE){var A=this;var aC=aE.target;var aG=aC.get(p).get(c);var aB=aG.getData(B);var aF=A.get(N);if(aF){aF.unselect();}aB.select();var aD=A.get(n);var L=aD.one(S+H);aD.setStyle(t,an).show();L.html(aB.get(ag));aC.set(ar,aD);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var aB=A.getData(B);if(!al(aB)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});ac.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","aui-tree-paginator","aui-tree-io","dd-delegate","dd-proxy"]});
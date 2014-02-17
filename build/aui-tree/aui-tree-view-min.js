AUI.add("aui-tree-view",function(ab){var T=ab.Lang,aq=T.isBoolean,aw=T.isString,ar=ab.UA,q="boundingBox",d="children",a="container",Y="content",s="contentBox",R=".",ao="file",z="hitarea",P="icon",af="label",N="lastSelected",au="leaf",p="node",V="ownerTree",F="root",S="selectOnToggle",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",ax=function(){return Array.prototype.slice.call(arguments).join(r);},ak=function(A){return(A instanceof ab.TreeNode);},y=ab.ClassNameManager.getClassName,an=y(f,z),w=y(f,P),i=y(f,af),u=y(f,p,Y),l=y(f,F,a),ag=y(f,x,Y);var O=ab.Component.create({NAME:K,ATTRS:{type:{value:ao,validator:aw},lastSelected:{value:null,validator:ak},lazyLoad:{validator:aq,value:true},selectOnToggle:{validator:aq,value:false}},AUGMENTS:[ab.TreeData,ab.TreeViewPaginator,ab.TreeViewIO],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(q);L.setData(K,A);A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ab.bind(A._afterSetChildren,A));A._delegateDOM();},createNodes:function(L){var A=this;ab.Array.each(ab.Array(L),function(aA){var az=A.createNode(aA);A.appendChild(az);});A._syncPaginatorUI(L);},renderUI:function(){var A=this;A._renderElements();},_afterSetChildren:function(L){var A=this;A._syncPaginatorUI();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aD){var aC=aD.one("> *").remove();var aB=aC.outerHTML();var aA=aD.one("> ul");var aE=new ab.TreeNode({boundingBox:aD,container:aA,label:aB,leaf:!aA,ownerTree:A});if(aA){aE.render();A._createFromHTMLMarkup(aA);}else{aE.render();}var az=aD.get(c).get(c);var aF=az.getData(B);if(!ab.instanceOf(aF,ab.TreeNode)){aF=az.getData(K);}aF.appendChild(aE);});},_createNodeContainer:function(){var A=this;var L=A.get(s);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(s);var az=A.get(d);var aA=A.get(e);var aB=y(f,aA);L.addClass(ag);L.addClass(ax(aB,l));if(!az.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",ab.bind(A._onClickNodeEl,A),R+u);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+w);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+i);L.delegate("mouseenter",ab.bind(A._onMouseEnterNodeEl,A),R+u);L.delegate("mouseleave",ab.bind(A._onMouseLeaveNodeEl,A),R+u);},_onClickNodeEl:function(L){var A=this;var aA=A.getNodeByChild(L.currentTarget);if(aA){if(L.target.test(R+an)){aA.toggle();if(!A.get(S)){return;}}if(!aA.isSelected()){var az=A.get(N);if(az){az.unselect();}aA.select();}}},_onMouseEnterNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.out();}},_onClickHitArea:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.toggle();}}}});ab.TreeView=O;var J=T.isNumber,ac="above",b="append",ae="below",am="block",ah="body",av="clearfix",aa="default",t="display",aj="down",v="drag",m="draggable",X="dragCursor",ap="dragNode",h="expanded",n="helper",at="insert",D="offsetHeight",c="parentNode",ay="scrollDelay",M="state",ai="tree-drag-drop",al="up",I=ab.DD.DDM,ad=y(n,av),j=y(P),Z=y(f,v,n),o=y(f,v,n,Y),H=y(f,v,n,af),E=y(f,v,at,ac),W=y(f,v,at,b),G=y(f,v,at,ae),k=y(f,v,M,b),Q=y(f,v,M,at,ac),U=y(f,v,M,at,ae),C='<div class="'+Z+'">'+'<div class="'+[o,ad].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=ab.Component.create({NAME:ai,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:ab.TreeView,prototype:{direction:ae,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;ab.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;ab.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=ab.Node.create(C).hide();ab.one(ah).append(L);A.set(n,L);I.set(X,aa);},_bindDragDrop:function(){var A=this;var az=A.get(q);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new ab.DD.Delegate({bubbleTargets:A,container:az,nodes:R+u,target:true});var aA=A.ddDelegate.dd;aA.plug(ab.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(ab.Plugin.DDNodeScroll,{scrollDelay:A.get(ay),node:az});aA.removeInvalid("a");if(L){L.detach();}};if(!ar.touch){L=az.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(W);},_goingDownState:function(L){var A=this;A.dropAction=ae;A.get(n).addClass(U);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ac;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var az=A.get(n);az.removeClass(k);az.removeClass(Q);az.removeClass(U);if(L){L.removeClass(E);L.removeClass(W);L.removeClass(G);}},_updateNodeState:function(A){var aI=this;var aE=A.drag;var aB=A.drop;var L=aB.get(p);var aH=L.get(c);var aD=aE.get(p).get(c);var aA=aH.getData(B);aI._resetState(aI.nodeContent);if(!aD.contains(aH)){var aJ=L.get(D)/3;var az=L.getY();var aG=az+aJ;var aF=az+aJ*2;var aC=aE.mouseXY[1];if((aC>az)&&(aC<aG)){aI._goingUpState(L);}else{if(aC>aF){aI._goingDownState(L);}else{if((aC>aG)&&(aC<aF)){if(aA&&!aA.isLeaf()){aI._appendState(L);}else{if(aI.direction===al){aI._goingUpState(L);}else{aI._goingDownState(L);}}}}}}aI.nodeContent=L;},_afterDropHit:function(aB){var A=this;var aD=A.dropAction;var aC=aB.drag.get(p).get(c);var az=aB.drop.get(p).get(c);var aE=az.getData(B);var aA=aC.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aE;L.tree.dragNode=aA;if(aD===ac){aE.insertBefore(aA);A.bubbleEvent("dropInsert",L);}else{if(aD===ae){aE.insertAfter(aA);
A.bubbleEvent("dropInsert",L);}else{if(aD===b){if(aE&&!aE.isLeaf()){aE.appendChild(aA);if(!aE.get(h)){aE.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(az){var A=this;var L=A.lastY;var aA=az.target.lastXY[1];if(aA!==L){A.direction=(aA<L)?al:aj;}A.lastY=aA;},_onDragStart:function(aC){var A=this;var aA=aC.target;var aE=aA.get(p).get(c);var az=aE.getData(B);var aD=A.get(N);if(aD){aD.unselect();}az.select();var aB=A.get(n);var L=aB.one(R+H);aB.setStyle(t,am).show();L.html(az.get(af));aA.set(ap,aB);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var az=A.getData(B);if(!ak(az)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});ab.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","aui-tree-paginator","aui-tree-io","dd-delegate","dd-proxy"]});
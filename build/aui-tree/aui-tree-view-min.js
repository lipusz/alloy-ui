AUI.add("aui-tree-view",function(aa){var S=aa.Lang,ap=S.isBoolean,av=S.isString,aq=aa.UA,q="boundingBox",d="children",a="container",X="content",s="contentBox",R=".",an="file",z="hitarea",P="icon",ae="label",N="lastSelected",at="leaf",p="node",U="ownerTree",F="root",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",aw=function(){return Array.prototype.slice.call(arguments).join(r);},aj=function(A){return(A instanceof aa.TreeNode);},y=aa.ClassNameManager.getClassName,am=y(f,z),w=y(f,P),i=y(f,ae),u=y(f,p,X),l=y(f,F,a),af=y(f,x,X);var O=aa.Component.create({NAME:K,ATTRS:{type:{value:an,validator:av},lastSelected:{value:null,validator:aj},lazyLoad:{validator:ap,value:true},io:{value:null},paginator:{value:null}},AUGMENTS:[aa.TreeData],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(q);L.setData(K,A);},bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aC){var aB=aC.one("> *").remove();var aA=aB.outerHTML();var az=aC.one("> ul");var aD=new aa.TreeNode({boundingBox:aC,container:az,label:aA,leaf:!az,ownerTree:A});if(az){aD.render();A._createFromHTMLMarkup(az);}else{aD.render();}var ay=aC.get(c).get(c);var aE=ay.getData(B);if(!aa.instanceOf(aE,aa.TreeNode)){aE=ay.getData(K);}aE.appendChild(aD);});},_createNodeContainer:function(){var A=this;var L=A.get(s);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(s);var ay=A.get(d);var az=A.get(e);var aA=y(f,az);L.addClass(af);L.addClass(aw(aA,l));if(!ay.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",aa.bind(A._onClickHitArea,A),R+am);L.delegate("dblclick",aa.bind(A._onClickHitArea,A),R+w);L.delegate("dblclick",aa.bind(A._onClickHitArea,A),R+i);L.delegate("mouseenter",aa.bind(A._onMouseEnterNodeEl,A),R+u);L.delegate("mouseleave",aa.bind(A._onMouseLeaveNodeEl,A),R+u);L.delegate("click",aa.bind(A._onClickNodeEl,A),R+u);},_onClickNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az&&!az.isSelected()){var ay=A.get(N);if(ay){ay.unselect();}az.select();}},_onMouseEnterNodeEl:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.out();}},_onClickHitArea:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.toggle();}}}});aa.TreeView=O;var J=S.isNumber,ab="above",b="append",ad="below",al="block",ag="body",au="clearfix",Z="default",t="display",ai="down",v="drag",m="draggable",W="dragCursor",ao="dragNode",h="expanded",n="helper",ar="insert",D="offsetHeight",c="parentNode",ax="scrollDelay",M="state",ah="tree-drag-drop",ak="up",I=aa.DD.DDM,ac=y(n,au),j=y(P),Y=y(f,v,n),o=y(f,v,n,X),H=y(f,v,n,ae),E=y(f,v,ar,ab),V=y(f,v,ar,b),G=y(f,v,ar,ad),k=y(f,v,M,b),Q=y(f,v,M,ar,ab),T=y(f,v,M,ar,ad),C='<div class="'+Y+'">'+'<div class="'+[o,ac].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=aa.Component.create({NAME:ah,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:aa.TreeView,prototype:{direction:ad,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;aa.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;aa.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=aa.Node.create(C).hide();aa.one(ag).append(L);A.set(n,L);I.set(W,Z);},_bindDragDrop:function(){var A=this;var ay=A.get(q);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new aa.DD.Delegate({bubbleTargets:A,container:ay,nodes:R+u,target:true});var az=A.ddDelegate.dd;az.plug(aa.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(aa.Plugin.DDNodeScroll,{scrollDelay:A.get(ax),node:ay});az.removeInvalid("a");if(L){L.detach();}};if(!aq.touch){L=ay.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(V);},_goingDownState:function(L){var A=this;A.dropAction=ad;A.get(n).addClass(T);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ab;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var ay=A.get(n);ay.removeClass(k);ay.removeClass(Q);ay.removeClass(T);if(L){L.removeClass(E);L.removeClass(V);L.removeClass(G);}},_updateNodeState:function(A){var aH=this;var aD=A.drag;var aA=A.drop;var L=aA.get(p);var aG=L.get(c);var aC=aD.get(p).get(c);var az=aG.getData(B);aH._resetState(aH.nodeContent);if(!aC.contains(aG)){var aI=L.get(D)/3;var ay=L.getY();var aF=ay+aI;var aE=ay+aI*2;var aB=aD.mouseXY[1];if((aB>ay)&&(aB<aF)){aH._goingUpState(L);}else{if(aB>aE){aH._goingDownState(L);}else{if((aB>aF)&&(aB<aE)){if(az&&!az.isLeaf()){aH._appendState(L);}else{if(aH.direction===ak){aH._goingUpState(L);}else{aH._goingDownState(L);}}}}}}aH.nodeContent=L;},_afterDropHit:function(aA){var A=this;var aC=A.dropAction;var aB=aA.drag.get(p).get(c);var ay=aA.drop.get(p).get(c);var aD=ay.getData(B);var az=aB.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aD;L.tree.dragNode=az;if(aC===ab){aD.insertBefore(az);A.bubbleEvent("dropInsert",L);}else{if(aC===ad){aD.insertAfter(az);A.bubbleEvent("dropInsert",L);}else{if(aC===b){if(aD&&!aD.isLeaf()){aD.appendChild(az);if(!aD.get(h)){aD.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(ay){var A=this;var L=A.lastY;var az=ay.target.lastXY[1];if(az!==L){A.direction=(az<L)?ak:ai;
}A.lastY=az;},_onDragStart:function(aB){var A=this;var az=aB.target;var aD=az.get(p).get(c);var ay=aD.getData(B);var aC=A.get(N);if(aC){aC.unselect();}ay.select();var aA=A.get(n);var L=aA.one(R+H);aA.setStyle(t,al).show();L.html(ay.get(ae));az.set(ao,aA);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var ay=A.getData(B);if(!aj(ay)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});aa.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd-delegate","dd-proxy"]});
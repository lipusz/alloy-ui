AUI.add("aui-tree-node",function(ad){var S=ad.Lang,aG=S.isString,ax=S.isBoolean,aP="alwaysShowHitArea",O="",r="boundingBox",f="children",aC="clearfix",w="collapsed",a="container",ab="content",u="contentBox",i="expanded",o="helper",V="hidden",e="hitAreaEl",H="hitarea",T="icon",aO="iconEl",aq="id",ai="label",W="labelEl",R="lastSelected",aB="leaf",p="node",ak="over",Y="ownerTree",d="parentNode",av="radio",aM="rendered",aA="selected",s=" ",g="tree",I="tree-node",aK=function(){return Array.prototype.slice.call(arguments).join(s);},an=function(A){return(A instanceof ad.TreeNode);},aI=function(A){return(A instanceof ad.TreeView);},G=ad.getClassName,af=G(o,aC),y=G(g,w),b=G(g,a),aw=G(g,u),aQ=G(g,i),t=G(g,V),ar=G(g,H),F=G(g,T),j=G(g,ai),ay=G(g,p),E=G(g,p,ab),at=G(g,p,V,H),h=G(g,p,aB),aF=G(g,p,ak),J=G(g,p,aA),ac='<div class="'+ar+'"></div>',q='<div class="'+F+'"></div>',c='<div class="'+j+'"></div>',aN="<ul></ul>",v='<li class="'+ay+'"></li>',Z='<div class="'+aK(af,E)+'"></div>';var M=ad.Component.create({NAME:I,ATTRS:{alwaysShowHitArea:{validator:ax,value:true},boundingBox:{valueFn:function(){return ad.Node.create(v);}},contentBox:{valueFn:function(){return ad.Node.create(Z);}},draggable:{validator:ax,value:true},expanded:{validator:ax,value:false},hitAreaEl:{setter:ad.one,valueFn:function(){return ad.Node.create(ac);}},iconEl:{setter:ad.one,valueFn:function(){return ad.Node.create(q);}},id:{validator:aG,valueFn:function(){return ad.guid();}},label:{validator:aG,value:O},labelEl:{setter:ad.one,valueFn:function(){var A=this;var aT=A.get(ai);return ad.Node.create(c).html(aT).unselectable();}},leaf:{setter:function(aT){var A=this;if(aT&&A.get(f).length){return false;}return aT;},validator:ax,value:true},nextSibling:{getter:"_getSibling",validator:an,value:null},ownerTree:{value:null},parentNode:{validator:function(A){return an(A)||aI(A);},value:null},prevSibling:{getter:"_getSibling",validator:an,value:null},rendered:{validator:ax,value:false},tabIndex:{value:null}},AUGMENTS:[ad.TreeData],EXTENDS:ad.Base,prototype:{BOUNDING_TEMPLATE:v,CONTENT_TEMPLATE:Z,initializer:function(){var A=this;A.get(r).setData(I,A);A._syncTreeNodeBBId();A._uiSetExpanded(A.get(i));A._uiSetLeaf(A.get(aB));A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ad.bind(A._afterSetChildren,A));A.after("expandedChange",ad.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);},render:function(aU){var aT=this;if(!aT.get(aM)){aT.renderUI();aT.bindUI();aT.syncUI();aT.set(aM,true);}if(aU){var aV=aT.get(r);var A=aT.get(d);aV.appendTo(aU);if(A){var aW=A.get(ah);if(aW){aV.insertBefore(aW.element,null);}}}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncIconUI();},appendChild:function(){var A=this;if(!A.isLeaf()){ad.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(i,false);},collapseAll:function(){var A=this;ad.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(aT){var A=this;return aT.isAncestor(A);},expand:function(){var A=this;A.set(i,true);},expandAll:function(){var A=this;ad.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aT=this;var aU=0;var A=aT.get(d);while(A){++aU;A=A.get(d);}return aU;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ad.TreeNode.superclass.hasChildNodes.apply(A,arguments));},hideHitArea:function(){var A=this;A.get(e).addClass(at);},isAncestor:function(aU){var aT=this;var A=aT.get(d);while(A){if(A===aU){return true;}A=A.get(d);}return false;},isLeaf:function(){var A=this;return A.get(aB);},isSelected:function(){var A=this;return A.get(u).hasClass(J);},out:function(){var A=this;A.get(u).removeClass(aF);},over:function(){var A=this;A.get(u).addClass(aF);},select:function(){var A=this;var aT=A.get(Y);if(aT){aT.set(R,A);}A.get(u).addClass(J);A.fire("select");},showHitArea:function(){var A=this;A.get(e).removeClass(at);},insertAfter:function(aU,aT){var A=this;ad.TreeNode.superclass.insertAfter.apply(this,[aU,A]);},insertBefore:function(aT){var A=this;ad.TreeNode.superclass.insertBefore.apply(this,[aT,A]);},removeChild:function(aT){var A=this;if(!A.isLeaf()){ad.TreeNode.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(i)){A.collapse();}else{A.expand();}},unselect:function(){var A=this;A.get(u).removeClass(J);A.fire("unselect");},_afterDraggableChange:function(aT){var A=this;A._uiSetDraggable(aT.newVal);A._syncIconUI();},_afterExpandedChange:function(aT){var A=this;A._uiSetExpanded(aT.newVal);A._syncIconUI();},_afterLeafChange:function(aT){var A=this;A._uiSetLeaf(aT.newVal);A._syncIconUI();},_afterLoadingChange:function(aT){var A=this;A._syncIconUI();},_afterSetChildren:function(aT){var A=this;A._syncIconUI();},_createNodeContainer:function(){var A=this;var aT=A.get(a)||ad.Node.create(aN);aT.addClass(b);A.set(a,aT);return aT;},_getSibling:function(aW,aT){var A=this;var aV="_"+aT;var aU=A[aV];if(aU!==null&&!an(aU)){aU=null;A[aV]=aU;}return aU;},_renderBoundingBox:function(){var A=this;var aU=A.get(r);var aT=A.get(u);aT.append(A.get(aO));aT.append(A.get(W));aU.append(aT);var aV=A.get(a);if(aV){if(!A.get(i)){aV.addClass(t);}aU.append(aV);}return aU;},_renderContentBox:function(aV){var A=this;var aT=A.get(u);if(!A.isLeaf()){var aU=A.get(i);aT.addClass(aU?aQ:y);if(aU){A.expand();}}return aT;},_syncHitArea:function(){var A=this;if(A.get(aP)||A.getChildrenLength()){A.showHitArea();}else{A.hideHitArea();A.collapse();}},_syncIconUI:function(){var aZ=this,aY=aZ.get(Y);if(aY){var aW=aY.get("type"),aV=aZ.get("cssClasses."+aW);if(!aV){return;}var aU=aZ.get(i),a0=aZ.get(aO),A=aZ.get(e),aX=aZ.isLeaf()?aV.iconLeaf:(aU?aV.iconExpanded:aV.iconCollapsed),aT=aU?aV.iconHitAreaExpanded:aV.iconHitAreaCollapsed;if(aZ.get(aR)){aX=aV.iconLoading;}a0.setAttribute("className",aX||O);A.setAttribute("className",aT||O);}aZ._syncHitArea();},_syncTreeNodeBBId:function(aT){var A=this;A.get(r).attr(aq,A.get(aq));
},_uiSetExpanded:function(aV){var A=this;if(!A.isLeaf()){var aU=A.get(a);var aT=A.get(u);if(aV){aT.replaceClass(y,aQ);if(aU){aU.removeClass(t);}}else{aT.replaceClass(aQ,y);if(aU){aU.addClass(t);}}}},_uiSetLeaf:function(aU){var A=this;var aT=A.get(u);if(aU){A.get(a).remove();A.get(e).remove();}else{aT.prepend(A.get(e));A._createNodeContainer();A._uiSetExpanded(A.get(i));}aT.toggleClass(h,aU);}}});ad.TreeNode=M;var au=S.isFunction,aH="cache",aj="io",aL="loaded",aR="loading",ah="paginator",ap="tree-node-io",z=G(g,p,aj,aR);var L=ad.Component.create({NAME:ap,ATTRS:{cache:{validator:ax,value:true},leaf:{validator:ax,value:false},loaded:{validator:ax,value:false},loading:{validator:ax,value:false}},AUGMENTS:[ad.TreeViewPaginator,ad.TreeViewIO],EXTENDS:ad.TreeNode,prototype:{bindUI:function(){var A=this;ad.TreeNodeIO.superclass.bindUI.apply(A,arguments);A.on("ioRequestSuccess",A._onIOSuccess,A);},syncUI:function(){var A=this;ad.TreeNodeIO.superclass.syncUI.apply(A,arguments);},createNodes:function(aT){var A=this;ad.Array.each(ad.Array(aT),function(aU){A.appendChild(A.createNode(aU));});A._syncPaginatorUI(aT);},expand:function(){var A=this;var aT=A.get(aH);var aW=A.get(aj);var aU=A.get(aL);var aV=A.get(aR);if(!aT){A.set(aL,false);}if(aW&&!aU&&!aV&&!A.hasChildNodes()){if(!aT){A.empty();}A.initIO();}else{ad.TreeNodeIO.superclass.expand.apply(A,arguments);}},_inheritOwnerTreeAttrs:function(){var A=this;var aT=A.get(Y);if(aT){if(!A.get(aj)){var aW=ad.clone(aT.get(aj),true,function(aY,aX){if(au(aY)&&(aY.defaultFn||aY.wrappedFn)){return false;}return true;});A.set(aj,aW);}if(!A.get(ah)){var aU=aT.get(ah);var aV=ad.clone(aU);if(aV&&aV.element){aV.element=aU.element.clone();}A.set(ah,aV);}}},_onIOSuccess:function(aT){var A=this;A.expand();}}});ad.TreeNodeIO=L;var k="checkbox",n="checked",aa="checkContainerEl",aD="checkEl",N="checkName",X=".",l="name",B="tree-node-check",ag=G(g,p,k),am=G(g,p,k,a),ao=G(g,p,n),Q='<div class="'+am+'"></div>',al='<input class="'+ag+'" type="checkbox" />';var az=ad.Component.create({NAME:B,ATTRS:{checked:{validator:ax,value:false},checkContainerEl:{setter:ad.one,valueFn:function(){return ad.Node.create(Q);}},checkEl:{setter:ad.one,valueFn:function(){var A=this;var aU=A.get(aq)+"Checkbox";var aT={ID:aU,NAME:A.get(N)};return ad.Node.create(al).attr(aT);}},checkName:{value:B,validator:aG}},EXTENDS:ad.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(n));},renderUI:function(){var aT=this;ad.TreeNodeCheck.superclass.renderUI.apply(aT,arguments);var A=aT.get(aD);var aU=aT.get(aa);A.hide();aU.append(A);aT.get(W).placeBefore(aU);if(aT.isChecked()){aT.check();}},bindUI:function(){var A=this;var aT=A.get(u);ad.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ad.bind(A._afterCheckedChange,A));aT.delegate("click",ad.bind(A.toggleCheck,A),X+am);aT.delegate("click",ad.bind(A.toggleCheck,A),X+j);A.get(W).swallowEvent("dblclick");},check:function(aT){var A=this;A.set(n,true,{originalTarget:aT});},isChecked:function(){var A=this;return A.get(n);},toggleCheck:function(){var aT=this;var A=aT.get(aD);var aU=A.attr(n);if(!aU){aT.check();}else{aT.uncheck();}},uncheck:function(aT){var A=this;A.set(n,false,{originalTarget:aT});},_afterCheckedChange:function(aT){var A=this;A._uiSetChecked(aT.newVal);},_uiSetChecked:function(aV){var aT=this;var A=aT.get(aD);var aU=aT.get(u);if(aV){aU.addClass(ao);A.attr(n,n);}else{aU.removeClass(ao);A.attr(n,O);}}}});ad.TreeNodeCheck=az;var C="child",P="tree-node-task",K="unchecked",aE=function(A){return A instanceof ad.TreeNodeCheck;},ae=G(g,p,C,K);var aS=ad.Component.create({NAME:P,EXTENDS:ad.TreeNodeCheck,prototype:{check:function(aT){var A=this;aT=aT||A;if(!A.isLeaf()){A.eachChildren(function(aU){if(aE(aU)){aU.check(aT);}});}A.eachParent(function(aU){if(aE(aU)&&!aU.isChecked()){aU.get(u).addClass(ae);}});A.get(u).removeClass(ae);ad.TreeNodeTask.superclass.check.call(A,aT);},uncheck:function(aT){var A=this;aT=aT||A;if(!A.isLeaf()){A.eachChildren(function(aU){if(aU instanceof ad.TreeNodeCheck){aU.uncheck(aT);}});}A.eachParent(function(aU){if(aE(aU)&&!aU.isChecked()){aU.get(u).removeClass(ae);}});A.get(u).removeClass(ae);ad.TreeNodeTask.superclass.uncheck.call(A,aT);}}});ad.TreeNodeTask=aS;var D="tree-node-radio",m=function(A){return A instanceof ad.TreeNodeRadio;},x=G(g,p,av),U=G(g,p,av,n);var aJ=ad.Component.create({NAME:D,EXTENDS:ad.TreeNodeTask,prototype:{renderUI:function(){var A=this;ad.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(u).addClass(x);},_uncheckNodesRadio:function(aV){var A=this;var aU;if(aV){aU=aV.get(f);}else{var aT=A.get(Y);if(aT){aU=aT.get(f);}else{return;}}ad.Array.each(aU,function(aX,aW,aY){if(!aX.isLeaf()){A._uncheckNodesRadio(aX);}if(m(aX)){aX.uncheck();}});},_uiSetChecked:function(aT){var A=this;if(aT){A.get(u).addClass(U);A.get(aD).attr(n,n);}else{A.get(u).removeClass(U);A.get(aD).attr(n,O);}},check:function(){var A=this;A._uncheckNodesRadio();ad.TreeNodeRadio.superclass.check.apply(A,arguments);}}});ad.TreeNodeRadio=aJ;ad.TreeNode.nodeTypes={check:ad.TreeNodeCheck,io:ad.TreeNodeIO,node:ad.TreeNode,radio:ad.TreeNodeRadio,task:ad.TreeNodeTask};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","aui-tree-io","aui-tree-paginator","json","querystring-stringify"]});
AUI.add("aui-tree-node",function(ag){var aa=ag.Lang,aP=aa.isString,aF=aa.isBoolean,aY="alwaysShowHitArea",R="",s="boundingBox",g="children",aL="clearfix",x="collapsed",a="container",ae="content",v="contentBox",j="expanded",p="helper",X="hidden",f="hitAreaEl",J="hitarea",V="icon",aX="iconEl",aw="id",am="label",Y="labelEl",U="lastSelected",aK="leaf",q="node",ao="over",ab="ownerTree",e="parentNode",aC="radio",aV="rendered",aJ="selected",t=" ",h="tree",K="tree-node",aT=function(){return Array.prototype.slice.call(arguments).join(t);},at=function(A){return(A instanceof ag.TreeNode);},aR=function(A){return(A instanceof ag.TreeView);},H=ag.getClassName,aj=H(p,aL),B=H(h,x),b=H(h,a),aE=H(h,v),aZ=H(h,j),u=H(h,X),ay=H(h,J),G=H(h,V),k=H(h,am),aH=H(h,q),F=H(h,q,ae),az=H(h,q,X,J),i=H(h,q,aK),aO=H(h,q,ao),M=H(h,q,aJ),af='<div class="'+ay+'"></div>',r='<div class="'+G+'"></div>',d='<div class="'+k+'"></div>',aW="<ul></ul>",w='<li class="'+aH+'"></li>',ac='<div class="'+aT(aj,F)+'"></div>';var P=ag.Component.create({NAME:K,ATTRS:{boundingBox:{valueFn:function(){return ag.Node.create(w);}},contentBox:{valueFn:function(){return ag.Node.create(ac);}},draggable:{value:true,validator:aF},ownerTree:{value:null},label:{value:R,validator:aP},expanded:{value:false,validator:aF},id:{validator:aP},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aF},nextSibling:{value:null,validator:at},prevSibling:{value:null,validator:at},parentNode:{value:null,validator:function(A){return at(A)||aR(A);}},labelEl:{setter:ag.one,valueFn:function(){var A=this.get(am);return ag.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ag.one,valueFn:function(){return ag.Node.create(af);}},alwaysShowHitArea:{value:true,validator:aF},iconEl:{setter:ag.one,valueFn:function(){return ag.Node.create(r);}},tabIndex:{value:null},rendered:{validator:aF,value:false}},AUGMENTS:[ag.TreeData],EXTENDS:ag.Base,prototype:{BOUNDING_TEMPLATE:w,CONTENT_TEMPLATE:ac,initializer:function(){var A=this;var L=A.get(s);L.setData(K,A);A._syncTreeNodeBBId();A._uiSetExpanded(A.get(j));},bindUI:function(){var A=this;A.after("childrenChange",ag.bind(A._afterSetChildren,A));A.after("expandedChange",ag.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);},render:function(L){var A=this;if(!A.get(aV)){A.renderUI();A.bindUI();A.syncUI();A.set(aV,true);}if(L){A.get(s).appendTo(L);}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_afterExpandedChange:function(L){var A=this;A._uiSetExpanded(L.newVal);},_renderContentBox:function(a3){var A=this;var L=A.get(v);if(A.isLeaf()){L.addClass(i);}else{var a2=A.get(j);L.addClass(a2?aZ:B);if(a2){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var a2=A.get(s);var L=A.get(v);var a3=null;if(!A.isLeaf()){L.append(A.get(f));a3=A._createNodeContainer();}L.append(A.get(aX));L.append(A.get(Y));a2.append(L);if(a3){if(!A.get(j)){a3.addClass(u);}a2.append(a3);}return a2;},_createNodeContainer:function(){var A=this;var L=A.get(a)||ag.Node.create(aW);L.addClass(b);A.set(a,L);A.eachChildren(function(a2){A.appendChild(a2);});return L;},_syncHitArea:function(L){var A=this;if(A.get(aY)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ag.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ag.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var a2=0;var L=this;var A=L.get(e);while(A){++a2;A=A.get(e);}return a2;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ag.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(v).hasClass(M);},isLeaf:function(){var A=this;return A.get(aK);},isAncestor:function(a2){var L=this;var A=L.get(e);while(A){if(A===a2){return true;}A=A.get(e);}return false;},insertAfter:function(a2,L){var A=this;ag.TreeNode.superclass.insertAfter.apply(this,[a2,A]);},insertBefore:function(L){var A=this;ag.TreeNode.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(ab);if(L){L.set(U,A);}A.get(v).addClass(M);A.fire("select");},unselect:function(){var A=this;A.get(v).removeClass(M);A.fire("unselect");},over:function(){this.get(v).addClass(aO);},out:function(){this.get(v).removeClass(aO);},showHitArea:function(){var A=this;var L=A.get(f);L.removeClass(az);},hideHitArea:function(){var A=this;var L=A.get(f);L.addClass(az);},_syncTreeNodeBBId:function(L){var A=this;A.get(s).attr(aw,A.get(aw));},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);},_uiSetExpanded:function(a3){var A=this;if(!A.isLeaf()){var a2=A.get(a);var L=A.get(v);if(a3){L.replaceClass(B,aZ);if(a2){a2.removeClass(u);}}else{L.replaceClass(aZ,B);if(a2){a2.addClass(u);}}}}}});ag.TreeNode=P;var aB=aa.isFunction,I=aa.isObject,ah=aa.isValue,aQ="cache",ax="end",an="io",aG="limit",aU="loaded",a0="loading",al="paginator",aq="start",av="tree-node-io",c="paginatorClick",aD=H(h,q,al),z=H(h,q,an,a0),aA='<a class="'+aD+'" href="javascript:void(0);">Load more results</a>';var O=ag.Component.create({NAME:av,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:aF},loaded:{value:false,validator:aF},cache:{value:true,validator:aF},leaf:{value:false,validator:aF},paginator:{setter:function(A){return ag.merge({alwaysVisible:false,autoFocus:true,element:ag.Node.create(aA),endParam:ax,limitParam:aG,start:0,startParam:aq},A);},validator:I}},EXTENDS:ag.TreeNode,prototype:{bindUI:function(){var A=this;
ag.TreeNodeIO.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},syncUI:function(){var A=this;ag.TreeNodeIO.superclass.syncUI.apply(this,arguments);A._syncPaginatorUI();},_bindPaginatorUI:function(){var A=this;var a2=A.get(al);if(a2){var L=ag.bind(A._handlePaginatorClickEvent,A);a2.element.on("click",L);}},createNodes:function(L){var A=this;ag.Array.each(ag.Array(L),function(a3){var a2=A.createNode.apply(A,[a3]);A.appendChild(a2);});A._syncPaginatorUI(L);},expand:function(){var A=this;var L=A.get(aQ);var a4=A.get(an);var a2=A.get(aU);var a3=A.get(a0);if(!L){A.set(aU,false);}if(a4&&!a2&&!a3&&!this.hasChildNodes()){if(!L){A.empty();}A.initIO();}else{ag.TreeNodeIO.superclass.expand.apply(this,arguments);}},initIO:function(){var L=this;var a2=L.get(an);if(aB(a2.cfg.data)){a2.cfg.data=a2.cfg.data.apply(L,[L]);}L._syncPaginatorIOData(a2);if(aB(a2.loader)){var A=ag.bind(a2.loader,L);A(a2.url,a2.cfg,L);}else{ag.io.request(a2.url,a2.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(v);A.set(a0,true);L.addClass(z);},ioCompleteHandler:function(){var A=this;var L=A.get(v);A.set(a0,false);A.set(aU,true);L.removeClass(z);},ioSuccessHandler:function(){var a8=this;var a4=a8.get(an);var a7=a8.get(ab);var a5=Array.prototype.slice.call(arguments);var a2=a5.length;var A=a5[1];if(a2>=3){var L=a5[2];try{A=ag.JSON.parse(L.responseText);}catch(a3){}}var a6=a4.formatter;if(a6){A=a6(A);}a8.createNodes(A);a8.expand();if(a7&&a7.ddDelegate){a7.ddDelegate.syncTargets();}},ioFailureHandler:function(){var A=this;A.set(a0,false);A.set(aU,false);},_createEvents:function(){var A=this;A.publish(c,{defaultFn:A._defPaginatorClickFn,prefix:av});},_defPaginatorClickFn:function(L){var A=this;var a2=A.get(al);if(ah(a2.limit)){a2.start+=a2.limit;}if(A.get(an)){A.initIO();}},_handlePaginatorClickEvent:function(a3){var A=this;var a2=A.get(ab);var L=A.getEventOutputMap(A);A.fire(c,L);if(a2){a2.fire(c,L);}a3.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var a2=L.get(ab);if(a2){if(!L.get(an)){L.set(an,ag.clone(a2.get(an)));}if(!L.get(al)){var A=a2.get(al);if(A&&A.element){A.element=A.element.clone();}L.set(al,A);}}},_setIO:function(a2){var A=this;if(!a2){return null;}else{if(aP(a2)){a2={url:a2};}}a2=a2||{};a2.cfg=a2.cfg||{};a2.cfg.on=a2.cfg.on||{};var L={start:ag.bind(A.ioStartHandler,A),complete:ag.bind(A.ioCompleteHandler,A),success:ag.bind(A.ioSuccessHandler,A),failure:ag.bind(A.ioFailureHandler,A)};ag.each(L,function(a5,a3){var a6=a2.cfg.on[a3];if(aB(a6)){var a4=function(){a5.apply(A,arguments);a6.apply(A,arguments);};a2.cfg.on[a3]=ag.bind(a4,A);}else{a2.cfg.on[a3]=a5;}});return a2;},_syncPaginatorIOData:function(a3){var A=this;var a2=A.get(al);if(a2&&ah(a2.limit)){var L=a3.cfg.data||{};L[a2.limitParam]=a2.limit;L[a2.startParam]=a2.start;L[a2.endParam]=(a2.start+a2.limit);a3.cfg.data=L;}},_syncPaginatorUI:function(a2){var a6=this;var L=a6.get(g);var a7=a6.get(al);if(a7){var a5=true;if(a2){a5=(a2.length>0);}var A=a7.start;var a4=a7.total||L.length;var a8=a5&&(a4>L.length);if(a7.alwaysVisible||a8){a6.get(a).append(a7.element.show());if(a7.autoFocus){try{a7.element.focus();}catch(a3){}}}else{a7.element.hide();}}}}});ag.TreeNodeIO=O;var l="checkbox",o="checked",ad="checkContainerEl",aM="checkEl",Q="checkName",Z=".",m="name",C="tree-node-check",ak=H(h,q,l),ar=H(h,q,l,a),au=H(h,q,o),T='<div class="'+ar+'"></div>',ap='<input class="'+ak+'" type="checkbox" />';var aI=ag.Component.create({NAME:C,ATTRS:{checked:{value:false,validator:aF},checkName:{value:C,validator:aP},checkContainerEl:{setter:ag.one,valueFn:function(){return ag.Node.create(T);}},checkEl:{setter:ag.one,valueFn:function(){var A=this.get(Q);return ag.Node.create(ap).attr(m,A);}}},EXTENDS:ag.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(o));},renderUI:function(){var L=this;ag.TreeNodeCheck.superclass.renderUI.apply(L,arguments);var a2=L.get(Y);var A=L.get(aM);var a3=L.get(ad);A.hide();a3.append(A);a2.placeBefore(a3);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(v);var a2=A.get(Y);ag.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ag.bind(A._afterCheckedChange,A));L.delegate("click",ag.bind(A.toggleCheck,A),Z+ar);L.delegate("click",ag.bind(A.toggleCheck,A),Z+k);a2.swallowEvent("dblclick");},check:function(L){var A=this;A.set(o,true,{originalTarget:L});},uncheck:function(L){var A=this;A.set(o,false,{originalTarget:L});},toggleCheck:function(){var L=this;var A=L.get(aM);var a2=A.attr(o);if(!a2){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(o);},_afterCheckedChange:function(L){var A=this;A._uiSetChecked(L.newVal);},_uiSetChecked:function(L){var A=this;if(L){A.get(v).addClass(au);A.get(aM).attr(o,o);}else{A.get(v).removeClass(au);A.get(aM).attr(o,R);}}}});ag.TreeNodeCheck=aI;var D="child",S="tree-node-task",N="unchecked",aN=function(A){return A instanceof ag.TreeNodeCheck;},ai=H(h,q,D,N);var a1=ag.Component.create({NAME:S,EXTENDS:ag.TreeNodeCheck,prototype:{check:function(a2){var A=this;var L=A.get(v);a2=a2||A;if(!A.isLeaf()){A.eachChildren(function(a3){if(aN(a3)){a3.check(a2);}});}A.eachParent(function(a3){if(aN(a3)&&!a3.isChecked()){a3.get(v).addClass(ai);}});L.removeClass(ai);ag.TreeNodeTask.superclass.check.apply(this,[a2]);},uncheck:function(a2){var A=this;var L=A.get(v);a2=a2||A;if(!A.isLeaf()){A.eachChildren(function(a3){if(a3 instanceof ag.TreeNodeCheck){a3.uncheck(a2);}});}A.eachParent(function(a3){if(aN(a3)&&!a3.isChecked()){a3.get(v).removeClass(ai);}});L.removeClass(ai);ag.TreeNodeTask.superclass.uncheck.apply(this,[a2]);}}});ag.TreeNodeTask=a1;var E="tree-node-radio",n=function(A){return A instanceof ag.TreeNodeRadio;},y=H(h,q,aC),W=H(h,q,aC,o);var aS=ag.Component.create({NAME:E,EXTENDS:ag.TreeNodeTask,prototype:{renderUI:function(){var A=this;ag.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(v).addClass(y);},check:function(){var A=this;A._uncheckNodesRadio();ag.TreeNodeRadio.superclass.check.apply(this,arguments);
},_uiSetChecked:function(L){var A=this;if(L){A.get(v).addClass(W);A.get(aM).attr(o,o);}else{A.get(v).removeClass(W);A.get(aM).attr(o,R);}},_uncheckNodesRadio:function(a3){var A=this;var a2;if(a3){a2=a3.get(g);}else{var L=A.get(ab);if(L){a2=L.get(g);}else{return;}}ag.Array.each(a2,function(a5,a4,a6){if(!a5.isLeaf()){A._uncheckNodesRadio(a5);}if(n(a5)){a5.uncheck();}});}}});ag.TreeNodeRadio=aS;ag.TreeNode.nodeTypes={radio:ag.TreeNodeRadio,task:ag.TreeNodeTask,check:ag.TreeNodeCheck,node:ag.TreeNode,io:ag.TreeNodeIO};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","aui-io","json","querystring-stringify"]});
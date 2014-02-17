AUI.add("aui-tree-data",function(o){var i=o.Lang,n=i.isArray,l=i.isBoolean,m=i.isObject,c=i.isUndefined,z="boundingBox",g="children",p="container",r=".",j="id",x="index",u="lazyLoad",e="leaf",w="nextSibling",C="node",d="ownerTree",h="parentNode",t="prevSibling",q="previousSibling",v="tree",s="tree-node",b="tree-data",k=function(A){return(o.instanceOf(A,o.TreeNode));},f=function(A){return(o.instanceOf(A,o.TreeView));},y=o.ClassNameManager.getClassName,a=y(v,C);var B=function(){};B.ATTRS={container:{setter:o.one},children:{value:[],validator:n,setter:"_setChildren"},index:{value:{}}};o.mix(B.prototype,{childrenLength:0,initTreeData:function(){var A=this;A.publish("move");A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});},destructor:function(){var A=this;A.eachChildren(function(D){D.destroy();},true);},getNodeById:function(D){var A=this;return A.get(x)[D];},isRegistered:function(D){var A=this;return !!(A.get(x)[D.get(j)]);},updateReferences:function(F,G,J){var K=this;var I=F.get(h);var A=F.get(d);var H=I&&(I!==G);if(I){if(H){var D=I.get(g);o.Array.removeItem(D,F);I.set(g,D);}I.unregisterNode(F);}if(A){A.unregisterNode(F);}F.set(h,G);F.set(d,J);if(G){G.registerNode(F);}if(J){J.registerNode(F);}if(A!==J){F.eachChildren(function(L){K.updateReferences(L,L.get(h),J);});}if(H){var E=K.getEventOutputMap(F);if(!I.get("children").length){I.collapse();I.hideHitArea();}E.tree.oldParent=I;E.tree.oldOwnerTree=A;K.bubbleEvent("move",E);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(D){A.registerNode(D);},true);},registerNode:function(F){var A=this;var E=F.get(j);var D=A.get(x);if(E){D[E]=F;}if(f(A)){F.addTarget(A);F.set(d,A);}F._inheritOwnerTreeAttrs();A.updateIndex(D);},updateIndex:function(D){var A=this;if(D){A.set(x,D);}},unregisterNode:function(E){var A=this;var D=A.get(x);delete D[E.get(j)];if(f(A)){E.removeTarget(A);}A.updateIndex(D);},collapseAll:function(){var A=this;A.eachChildren(function(D){D.collapse();},true);A.fire("collapseAll",A.getEventOutputMap(A));},expandAll:function(){var A=this;A.eachChildren(function(D){D.expand();},true);A.fire("expandAll",A.getEventOutputMap(A));},selectAll:function(){var A=this;A.eachChildren(function(D){D.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(D){D.unselect();},true);},eachChildren:function(F,D){var A=this;var E=A.getChildren(D);o.Array.each(E,function(G){if(G){F.apply(A,arguments);}});},eachParent:function(E){var D=this;var A=D.get(h);while(A){if(A){E.call(D,A);}A=A.get(h);}},bubbleEvent:function(G,F,H,E){var D=this;D.fire(G,F);if(!H){var A=D.get(h);F=F||{};if(c(E)){E=true;}F.stopActionPropagation=E;while(A){A.fire(G,F);A=A.get(h);}}},createNode:function(D){var A=this;var E=o.TreeNode.nodeTypes[m(D)?D.type:D]||o.TreeNode;return new E(m(D)?D:{});},appendChild:function(F,E){var A=this;var D=A.getEventOutputMap(F);A.bubbleEvent("append",D,E);},_appendChild:function(J){if(J.stopActionPropagation){return false;}var A=this;var I=J.tree.node;var D=A.get(d);var G=A.get(g);A.updateReferences(I,A,D);var H=G.push(I);A.set(g,G);var F=H-2;var E=A.item(F);I._nextSibling=null;I._prevSibling=E;I.render(A.get(p));},item:function(D){var A=this;return A.get(g)[D];},indexOf:function(D){var A=this;return o.Array.indexOf(A.get(g),D);},hasChildNodes:function(){var A=this;return(A.getChildrenLength()>0);},getChildren:function(D){var A=this;var F=[];var E=A.get(g);F=F.concat(E);if(D){A.eachChildren(function(G){F=F.concat(G.getChildren(D));});}return F;},getChildrenLength:function(){var A=this;return(A.childrenLength||A.get(g).length);},getEventOutputMap:function(D){var A=this;return{tree:{instance:A,node:D||A}};},removeChild:function(E){var A=this;var D=A.getEventOutputMap(E);A.bubbleEvent("remove",D);},_removeChild:function(G){if(G.stopActionPropagation){return false;}var A=this;var F=G.tree.node;var D=A.get(d);if(A.isRegistered(F)){F.set(h,null);A.unregisterNode(F);F.set(d,null);if(D){D.unregisterNode(F);}F.get(z).remove();var E=A.get(g);o.Array.removeItem(E,F);A.set(g,E);}},empty:function(){var A=this;A.eachChildren(function(E){var D=E.get(h);if(D){D.removeChild(E);}});},insert:function(J,G,H){var N=this;G=G||this;if(G===J){return false;}var A=G.get(h);if(J&&A){var I=J.get(z);var O=G.get(z);var M=G.get(d);if(H==="before"){O.placeBefore(I);}else{if(H==="after"){O.placeAfter(I);}}var D=[];var L=A.get(z).all("> ul > li");L.each(function(P){D.push(P.getData(s));});var K=I.get(w);J.set(w,K&&K.getData(s));var F=I.get(q);J.set(t,F&&F.getData(s));G.updateReferences(J,A,M);A.set(g,D);}J.render();var E=G.getEventOutputMap(J);E.tree.refTreeNode=G;G.bubbleEvent("insert",E);},insertAfter:function(E,D){var A=this;A.insert(E,D,"after");},insertBefore:function(E,D){var A=this;A.insert(E,D,"before");},getNodeByChild:function(E){var A=this;var D=E.ancestor(r+a);if(D){return D.getData(s);}return null;},_inheritOwnerTreeAttrs:i.emptyFn,_setChildren:function(F){var D=this;var I=[];var E=D.get(p);if(!E){E=D._createNodeContainer();}D.childrenLength=F.length;var G=D;if(k(D)){G=D.get(d);}var A=f(G);var H=true;if(A){H=G.get(u);}D.updateIndex({});if(D.childrenLength>0){D.set(e,false);}o.Array.each(F,function(M,K){if(M){if(!k(M)&&m(M)){var L=M[g];var J=L&&L.length;M[d]=G;M[h]=D;if(J&&H){delete M[g];}M=D.createNode(M);if(J&&H){M.childrenLength=L.length;o.setTimeout(function(){M.set(g,L);},50);}}if(A){G.registerNode(M);}M.render(E);if(o.Array.indexOf(I,M)===-1){I.push(M);}}});return I;}});o.TreeData=B;},"@VERSION@",{requires:["aui-base","aui-task-manager"],skinnable:false});AUI.add("aui-tree-node",function(ag){var V=ag.Lang,aJ=V.isString,aA=V.isBoolean,aS="alwaysShowHitArea",R="",t="boundingBox",g="children",aF="clearfix",y="collapsed",a="container",ae="content",w="contentBox",n="draggable",j="expanded",q="helper",Y="hidden",f="hitAreaEl",K="hitarea",W="icon",aR="iconEl",c="invalid",au="id",al="label",Z="labelEl",U="lastSelected",aE="leaf",r="node",an="over",ab="ownerTree",e="parentNode",ay="radio",aP="rendered",aD="selected",u=" ",h="tree",L="tree-node",aN=function(){return Array.prototype.slice.call(arguments).join(u);
},aq=function(A){return(A instanceof ag.TreeNode);},aL=function(A){return(A instanceof ag.TreeView);},J=ag.ClassNameManager.getClassName,ai=J(q,aF),C=J(h,y),b=J(h,a),az=J(h,w),aT=J(h,j),v=J(h,Y),av=J(h,K),I=J(h,W),k=J(h,al),aB=J(h,r),H=J(h,r,ae),D=J(h,r,ae,c),aw=J(h,r,Y,K),i=J(h,r,aE),aI=J(h,r,an),M=J(h,r,aD),af='<div class="'+av+'"></div>',s='<div class="'+I+'"></div>',d='<div class="'+k+'"></div>',aQ="<ul></ul>",x='<li class="'+aB+'"></li>',ac='<div class="'+aN(ai,H)+'"></div>';var P=ag.Component.create({NAME:L,ATTRS:{boundingBox:{valueFn:function(){return ag.Node.create(x);}},contentBox:{valueFn:function(){return ag.Node.create(ac);}},draggable:{value:true,validator:aA},ownerTree:{value:null},label:{value:R,validator:aJ},expanded:{value:false,validator:aA},id:{validator:aJ,valueFn:function(){return ag.guid();}},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aA},nextSibling:{getter:"_getSibling",value:null,validator:aq},prevSibling:{getter:"_getSibling",value:null,validator:aq},parentNode:{value:null,validator:function(A){return aq(A)||aL(A);}},labelEl:{setter:ag.one,valueFn:function(){var A=this.get(al);return ag.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ag.one,valueFn:function(){return ag.Node.create(af);}},alwaysShowHitArea:{value:true,validator:aA},iconEl:{setter:ag.one,valueFn:function(){return ag.Node.create(s);}},tabIndex:{value:null},rendered:{validator:aA,value:false}},AUGMENTS:[ag.TreeData],EXTENDS:ag.Base,prototype:{BOUNDING_TEMPLATE:x,CONTENT_TEMPLATE:ac,initializer:function(){var A=this;var aW=A.get(t);aW.setData(L,A);A._syncTreeNodeBBId();A._uiSetDraggable(A.get(n));A._uiSetExpanded(A.get(j));A._uiSetLeaf(A.get(aE));A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ag.bind(A._afterSetChildren,A));A.after("draggableChange",ag.bind(A._afterDraggableChange,A));A.after("expandedChange",ag.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);A.after("leafChange",ag.bind(A._afterLeafChange,A));},render:function(aX){var aW=this;if(!aW.get(aP)){aW.renderUI();aW.bindUI();aW.syncUI();aW.set(aP,true);}if(aX){var aY=aW.get(t);var A=aW.get(e);aY.appendTo(aX);if(A){var aZ=A.get(ak);if(aZ){aY.insertBefore(aZ.element);}}}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_afterDraggableChange:function(aW){var A=this;A._uiSetDraggable(aW.newVal);},_afterExpandedChange:function(aW){var A=this;A._uiSetExpanded(aW.newVal);},_afterLeafChange:function(aW){var A=this;A._uiSetLeaf(aW.newVal);},_afterSetChildren:function(aW){var A=this;A._syncHitArea(aW.newVal);},_renderContentBox:function(aY){var A=this;var aW=A.get(w);if(!A.isLeaf()){var aX=A.get(j);aW.addClass(aX?aT:C);if(aX){A.expand();}}return aW;},_renderBoundingBox:function(){var A=this;var aX=A.get(t);var aW=A.get(w);aW.append(A.get(aR));aW.append(A.get(Z));aX.append(aW);var aY=A.get(a);if(aY){if(!A.get(j)){aY.addClass(v);}aX.append(aY);}return aX;},_createNodeContainer:function(){var A=this;var aW=A.get(a)||ag.Node.create(aQ);aW.addClass(b);A.set(a,aW);return aW;},_syncHitArea:function(aW){var A=this;if(A.get(aS)||aW.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ag.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ag.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aW=this;var aX=0;var A=aW.get(e);while(A){++aX;A=A.get(e);}return aX;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ag.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(w).hasClass(M);},isLeaf:function(){var A=this;return A.get(aE);},isAncestor:function(aX){var aW=this;var A=aW.get(e);while(A){if(A===aX){return true;}A=A.get(e);}return false;},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var aW=A.get(ab);if(aW){aW.set(U,A);}A.get(w).addClass(M);A.fire("select");},unselect:function(){var A=this;A.get(w).removeClass(M);A.fire("unselect");},over:function(){this.get(w).addClass(aI);},out:function(){this.get(w).removeClass(aI);},showHitArea:function(){var A=this;var aW=A.get(f);aW.removeClass(aw);},hideHitArea:function(){var A=this;var aW=A.get(f);aW.addClass(aw);},_syncTreeNodeBBId:function(aW){var A=this;A.get(t).attr(au,A.get(au));},_getSibling:function(aZ,aW){var A=this;var aY="_"+aW;var aX=A[aY];if(aX!==null&&!aq(aX)){aX=null;A[aY]=aX;}return aX;},_uiSetDraggable:function(aX){var A=this;var aW=A.get(w);aW.toggleClass(D,!aX);},_uiSetExpanded:function(aY){var A=this;if(!A.isLeaf()){var aX=A.get(a);var aW=A.get(w);if(aY){aW.replaceClass(C,aT);if(aX){aX.removeClass(v);}}else{aW.replaceClass(aT,C);if(aX){aX.addClass(v);}}}},_uiSetLeaf:function(aX){var A=this;var aW=A.get(w);if(aX){A.get(a).remove();A.get(f).remove();}else{aW.prepend(A.get(f));A._createNodeContainer();A._uiSetExpanded(A.get(j));}aW.toggleClass(i,aX);}}});ag.TreeNode=P;var ax=V.isFunction,aK="cache",am="io",aO="loaded",aU="loading",ak="paginator",at="tree-node-io",B=J(h,r,am,aU);var O=ag.Component.create({NAME:at,ATTRS:{loading:{value:false,validator:aA},loaded:{value:false,validator:aA},cache:{value:true,validator:aA},leaf:{value:false,validator:aA}},AUGMENTS:[ag.TreeViewPaginator,ag.TreeViewIO],EXTENDS:ag.TreeNode,prototype:{bindUI:function(){var A=this;ag.TreeNodeIO.superclass.bindUI.apply(this,arguments);A.on("ioRequestSuccess",A._onIOSuccess,A);},syncUI:function(){var A=this;ag.TreeNodeIO.superclass.syncUI.apply(this,arguments);},createNodes:function(aW){var A=this;ag.Array.each(ag.Array(aW),function(aY){var aX=A.createNode(aY);A.appendChild(aX);
});A._syncPaginatorUI(aW);},expand:function(){var A=this;var aW=A.get(aK);var aZ=A.get(am);var aX=A.get(aO);var aY=A.get(aU);if(!aW){A.set(aO,false);}if(aZ&&!aX&&!aY&&!this.hasChildNodes()){if(!aW){A.empty();}A.initIO();}else{ag.TreeNodeIO.superclass.expand.apply(this,arguments);}},_inheritOwnerTreeAttrs:function(){var A=this;var aW=A.get(ab);if(aW){if(!A.get(am)){var aZ=ag.clone(aW.get(am),true,function(a1,a0){if(ax(a1)&&(a1.defaultFn||a1.wrappedFn)){return false;}return true;});A.set(am,aZ);}if(!A.get(ak)){var aX=aW.get(ak);var aY=ag.clone(aX);if(aY&&aY.element){aY.element=aX.element.clone();}A.set(ak,aY);}}},_onIOSuccess:function(aW){var A=this;A.expand();}}});ag.TreeNodeIO=O;var l="checkbox",p="checked",ad="checkContainerEl",aG="checkEl",Q="checkName",aa=".",m="name",E="tree-node-check",aj=J(h,r,l),ap=J(h,r,l,a),ar=J(h,r,p),T='<div class="'+ap+'"></div>',ao='<input class="'+aj+'" type="checkbox" />';var aC=ag.Component.create({NAME:E,ATTRS:{checked:{value:false,validator:aA},checkName:{value:E,validator:aJ},checkContainerEl:{setter:ag.one,valueFn:function(){return ag.Node.create(T);}},checkEl:{setter:ag.one,valueFn:function(){var A=this.get(Q);return ag.Node.create(ao).attr(m,A);}}},EXTENDS:ag.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(p));},renderUI:function(){var aW=this;ag.TreeNodeCheck.superclass.renderUI.apply(aW,arguments);var aX=aW.get(Z);var A=aW.get(aG);var aY=aW.get(ad);A.hide();aY.append(A);aX.placeBefore(aY);if(aW.isChecked()){aW.check();}},bindUI:function(){var A=this;var aW=A.get(w);var aX=A.get(Z);ag.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ag.bind(A._afterCheckedChange,A));aW.delegate("click",ag.bind(A.toggleCheck,A),aa+ap);aW.delegate("click",ag.bind(A.toggleCheck,A),aa+k);aX.swallowEvent("dblclick");},check:function(aW){var A=this;A.set(p,true,{originalTarget:aW});},uncheck:function(aW){var A=this;A.set(p,false,{originalTarget:aW});},toggleCheck:function(){var aW=this;var A=aW.get(aG);var aX=A.attr(p);if(!aX){aW.check();}else{aW.uncheck();}},isChecked:function(){var A=this;return A.get(p);},_afterCheckedChange:function(aW){var A=this;A._uiSetChecked(aW.newVal);},_uiSetChecked:function(aW){var A=this;if(aW){A.get(w).addClass(ar);A.get(aG).attr(p,p);}else{A.get(w).removeClass(ar);A.get(aG).attr(p,R);}}}});ag.TreeNodeCheck=aC;var F="child",S="tree-node-task",N="unchecked",aH=function(A){return A instanceof ag.TreeNodeCheck;},ah=J(h,r,F,N);var aV=ag.Component.create({NAME:S,EXTENDS:ag.TreeNodeCheck,prototype:{check:function(aX){var A=this;var aW=A.get(w);aX=aX||A;if(!A.isLeaf()){A.eachChildren(function(aY){if(aH(aY)){aY.check(aX);}});}A.eachParent(function(aY){if(aH(aY)&&!aY.isChecked()){aY.get(w).addClass(ah);}});aW.removeClass(ah);ag.TreeNodeTask.superclass.check.call(this,aX);},uncheck:function(aX){var A=this;var aW=A.get(w);aX=aX||A;if(!A.isLeaf()){A.eachChildren(function(aY){if(aY instanceof ag.TreeNodeCheck){aY.uncheck(aX);}});}A.eachParent(function(aY){if(aH(aY)&&!aY.isChecked()){aY.get(w).removeClass(ah);}});aW.removeClass(ah);ag.TreeNodeTask.superclass.uncheck.call(this,aX);}}});ag.TreeNodeTask=aV;var G="tree-node-radio",o=function(A){return A instanceof ag.TreeNodeRadio;},z=J(h,r,ay),X=J(h,r,ay,p);var aM=ag.Component.create({NAME:G,EXTENDS:ag.TreeNodeTask,prototype:{renderUI:function(){var A=this;ag.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(w).addClass(z);},check:function(){var A=this;A._uncheckNodesRadio();ag.TreeNodeRadio.superclass.check.apply(this,arguments);},_uiSetChecked:function(aW){var A=this;if(aW){A.get(w).addClass(X);A.get(aG).attr(p,p);}else{A.get(w).removeClass(X);A.get(aG).attr(p,R);}},_uncheckNodesRadio:function(aY){var A=this;var aX;if(aY){aX=aY.get(g);}else{var aW=A.get(ab);if(aW){aX=aW.get(g);}else{return;}}ag.Array.each(aX,function(a0,aZ,a1){if(!a0.isLeaf()){A._uncheckNodesRadio(a0);}if(o(a0)){a0.uncheck();}});}}});ag.TreeNodeRadio=aM;ag.TreeNode.nodeTypes={radio:ag.TreeNodeRadio,task:ag.TreeNodeTask,check:ag.TreeNodeCheck,node:ag.TreeNode,io:ag.TreeNodeIO};},"@VERSION@",{requires:["aui-tree-data","aui-tree-io","aui-tree-paginator","json","querystring-stringify"],skinnable:false});AUI.add("aui-tree-paginator",function(m){var e=m.Lang,k=e.isObject,p=e.isValue,s=m.ClassNameManager.getClassName,g="children",n="container",f="end",c="io",j="limit",d="Load more results",u="node",b="ownerTree",a="paginator",o="start",r="tree",q="tree-node-io",i="paginatorClick",h=s(r,u,a),l='<a class="'+h+'" href="javascript:void(0);">{moreResultsLabel}</a>';function t(w){var v=this;m.after(v._bindPaginatorUI,this,"bindUI");m.after(v._syncPaginatorUI,this,"syncUI");}t.ATTRS={paginator:{setter:function(x){var w=this;var v=m.Node.create(e.sub(l,{moreResultsLabel:(x&&x.moreResultsLabel)||d}));return m.merge({alwaysVisible:false,autoFocus:true,element:v,endParam:f,limitParam:j,start:0,startParam:o},x);},validator:k}};t.prototype={_bindPaginatorUI:function(){var v=this;var w=v.get(a);if(w){w.element.on("click",m.bind(v._handlePaginatorClickEvent,v));}v._createEvents();},_createEvents:function(){var v=this;v.publish(i,{defaultFn:v._defPaginatorClickFn,prefix:q});},_defPaginatorClickFn:function(w){var v=this;var x=v.get(a);if(p(x.limit)){x.start+=x.limit;}if(v.get(c)){v.initIO();}},_handlePaginatorClickEvent:function(x){var v=this;var w=v.getEventOutputMap(v);v.fire(i,w);x.halt();},_syncPaginatorIOData:function(y){var v=this;var x=v.get(a);if(x&&p(x.limit)){var w=y.cfg.data||{};w[x.limitParam]=x.limit;w[x.startParam]=x.start;w[x.endParam]=(x.start+x.limit);y.cfg.data=w;}},_syncPaginatorUI:function(x){var B=this;var C=B.get(a);if(C){var A=true;if(x){A=(x.length>0);}var w=B.getChildrenLength();var v=C.start;var z=C.total||w;var D=w&&A&&(z>w);if(C.alwaysVisible||D){B.get(n).append(C.element.show());if(C.autoFocus){try{C.element.focus();}catch(y){}}}else{C.element.hide();}}}};m.TreeViewPaginator=t;},"@VERSION@",{requires:["aui-base"],skinnable:false});AUI.add("aui-tree-view",function(ab){var T=ab.Lang,aq=T.isBoolean,aw=T.isString,ar=ab.UA,q="boundingBox",d="children",a="container",Y="content",s="contentBox",R=".",ao="file",z="hitarea",P="icon",af="label",N="lastSelected",au="leaf",p="node",V="ownerTree",F="root",S="selectOnToggle",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",ax=function(){return Array.prototype.slice.call(arguments).join(r);
},ak=function(A){return(A instanceof ab.TreeNode);},y=ab.ClassNameManager.getClassName,an=y(f,z),w=y(f,P),i=y(f,af),u=y(f,p,Y),l=y(f,F,a),ag=y(f,x,Y);var O=ab.Component.create({NAME:K,ATTRS:{type:{value:ao,validator:aw},lastSelected:{value:null,validator:ak},lazyLoad:{validator:aq,value:true},selectOnToggle:{validator:aq,value:false}},AUGMENTS:[ab.TreeData,ab.TreeViewPaginator,ab.TreeViewIO],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(q);L.setData(K,A);A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ab.bind(A._afterSetChildren,A));A._delegateDOM();},createNodes:function(L){var A=this;ab.Array.each(ab.Array(L),function(aA){var az=A.createNode(aA);A.appendChild(az);});A._syncPaginatorUI(L);},renderUI:function(){var A=this;A._renderElements();},_afterSetChildren:function(L){var A=this;A._syncPaginatorUI();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aD){var aC=aD.one("> *").remove();var aB=aC.outerHTML();var aA=aD.one("> ul");var aE=new ab.TreeNode({boundingBox:aD,container:aA,label:aB,leaf:!aA,ownerTree:A});if(aA){aE.render();A._createFromHTMLMarkup(aA);}else{aE.render();}var az=aD.get(c).get(c);var aF=az.getData(B);if(!ab.instanceOf(aF,ab.TreeNode)){aF=az.getData(K);}aF.appendChild(aE);});},_createNodeContainer:function(){var A=this;var L=A.get(s);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(s);var az=A.get(d);var aA=A.get(e);var aB=y(f,aA);L.addClass(ag);L.addClass(ax(aB,l));if(!az.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",ab.bind(A._onClickNodeEl,A),R+u);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+w);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+i);L.delegate("mouseenter",ab.bind(A._onMouseEnterNodeEl,A),R+u);L.delegate("mouseleave",ab.bind(A._onMouseLeaveNodeEl,A),R+u);},_onClickNodeEl:function(L){var A=this;var aA=A.getNodeByChild(L.currentTarget);if(aA){if(L.target.test(R+an)){aA.toggle();if(!A.get(S)){return;}}if(!aA.isSelected()){var az=A.get(N);if(az){az.unselect();}aA.select();}}},_onMouseEnterNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.out();}},_onClickHitArea:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.toggle();}}}});ab.TreeView=O;var J=T.isNumber,ac="above",b="append",ae="below",am="block",ah="body",av="clearfix",aa="default",t="display",aj="down",v="drag",m="draggable",X="dragCursor",ap="dragNode",h="expanded",n="helper",at="insert",D="offsetHeight",c="parentNode",ay="scrollDelay",M="state",ai="tree-drag-drop",al="up",I=ab.DD.DDM,ad=y(n,av),j=y(P),Z=y(f,v,n),o=y(f,v,n,Y),H=y(f,v,n,af),E=y(f,v,at,ac),W=y(f,v,at,b),G=y(f,v,at,ae),k=y(f,v,M,b),Q=y(f,v,M,at,ac),U=y(f,v,M,at,ae),C='<div class="'+Z+'">'+'<div class="'+[o,ad].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=ab.Component.create({NAME:ai,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:ab.TreeView,prototype:{direction:ae,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;ab.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;ab.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=ab.Node.create(C).hide();ab.one(ah).append(L);A.set(n,L);I.set(X,aa);},_bindDragDrop:function(){var A=this;var az=A.get(q);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new ab.DD.Delegate({bubbleTargets:A,container:az,nodes:R+u,target:true});var aA=A.ddDelegate.dd;aA.plug(ab.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(ab.Plugin.DDNodeScroll,{scrollDelay:A.get(ay),node:az});aA.removeInvalid("a");if(L){L.detach();}};if(!ar.touch){L=az.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(W);},_goingDownState:function(L){var A=this;A.dropAction=ae;A.get(n).addClass(U);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ac;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var az=A.get(n);az.removeClass(k);az.removeClass(Q);az.removeClass(U);if(L){L.removeClass(E);L.removeClass(W);L.removeClass(G);}},_updateNodeState:function(A){var aI=this;var aE=A.drag;var aB=A.drop;var L=aB.get(p);var aH=L.get(c);var aD=aE.get(p).get(c);var aA=aH.getData(B);aI._resetState(aI.nodeContent);if(!aD.contains(aH)){var aJ=L.get(D)/3;var az=L.getY();var aG=az+aJ;var aF=az+aJ*2;var aC=aE.mouseXY[1];if((aC>az)&&(aC<aG)){aI._goingUpState(L);}else{if(aC>aF){aI._goingDownState(L);}else{if((aC>aG)&&(aC<aF)){if(aA&&!aA.isLeaf()){aI._appendState(L);}else{if(aI.direction===al){aI._goingUpState(L);}else{aI._goingDownState(L);}}}}}}aI.nodeContent=L;},_afterDropHit:function(aB){var A=this;var aD=A.dropAction;var aC=aB.drag.get(p).get(c);var az=aB.drop.get(p).get(c);var aE=az.getData(B);var aA=aC.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aE;L.tree.dragNode=aA;if(aD===ac){aE.insertBefore(aA);A.bubbleEvent("dropInsert",L);}else{if(aD===ae){aE.insertAfter(aA);A.bubbleEvent("dropInsert",L);}else{if(aD===b){if(aE&&!aE.isLeaf()){aE.appendChild(aA);if(!aE.get(h)){aE.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(az){var A=this;var L=A.lastY;var aA=az.target.lastXY[1];if(aA!==L){A.direction=(aA<L)?al:aj;}A.lastY=aA;},_onDragStart:function(aC){var A=this;
var aA=aC.target;var aE=aA.get(p).get(c);var az=aE.getData(B);var aD=A.get(N);if(aD){aD.unselect();}az.select();var aB=A.get(n);var L=aB.one(R+H);aB.setStyle(t,am).show();L.html(az.get(af));aA.set(ap,aB);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var az=A.getData(B);if(!ak(az)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});ab.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","aui-tree-paginator","aui-tree-io","dd-delegate","dd-proxy"]});AUI.add("aui-tree-io",function(e){var l=e.Lang,d=l.isFunction,b=l.isString,a="ioRequestSuccess",n="contentBox",f="io",i="ownerTree",j="loaded",m="loading",c="node",o="tree",h=e.ClassNameManager.getClassName,g=h(o,c,f,m);function k(q){var p=this;p.publish(a,{defaultFn:p._onIOSuccessDefault});}k.ATTRS={io:{lazyAdd:false,value:null,setter:function(p){return this._setIO(p);}}};k.prototype={initializer:function(){var p=this;p.publish();},initIO:function(){var q=this;var r=q.get(f);if(d(r.cfg.data)){r.cfg.data=r.cfg.data.call(q,q);}q._syncPaginatorIOData(r);if(d(r.loader)){var p=e.bind(r.loader,q);p(r.url,r.cfg,q);}else{e.io.request(r.url,r.cfg);}},ioStartHandler:function(){var p=this;var q=p.get(n);p.set(m,true);q.addClass(g);},ioCompleteHandler:function(){var p=this;var q=p.get(n);p.set(m,false);p.set(j,true);q.removeClass(g);},ioSuccessHandler:function(){var p=this;var w=p.get(f);var r=Array.prototype.slice.call(arguments);var t=r.length;var q=r[1];if(t>=3){var v=r[2];try{q=e.JSON.parse(v.responseText);}catch(u){}}var s=w.formatter;if(s){q=s(q);}p.createNodes(q);p.fire(a,q);},ioFailureHandler:function(){var p=this;p.fire("ioRequestFailure");p.set(m,false);p.set(j,false);},_onIOSuccessDefault:function(r){var p=this;var q=p.get(i);if(q&&q.ddDelegate){q.ddDelegate.syncTargets();}},_setIO:function(r){var p=this;if(!r){return null;}else{if(b(r)){r={url:r};}}r=r||{};r.cfg=r.cfg||{};r.cfg.on=r.cfg.on||{};var q={start:e.bind(p.ioStartHandler,p),complete:e.bind(p.ioCompleteHandler,p),success:e.bind(p.ioSuccessHandler,p),failure:e.bind(p.ioFailureHandler,p)};e.each(q,function(u,s){var v=r.cfg.on[s];u.defaultFn=true;if(d(v)){var t=e.bind(function(){u.apply(p,arguments);v.apply(p,arguments);},p);t.wrappedFn=true;r.cfg.on[s]=t;}else{r.cfg.on[s]=u;}});return r;}};e.TreeViewIO=k;},"@VERSION@",{requires:["aui-io","json"],skinnable:false});AUI.add("aui-tree",function(a){},"@VERSION@",{skinnable:true,use:["aui-tree-data","aui-tree-node","aui-tree-io","aui-tree-paginator","aui-tree-view"]});
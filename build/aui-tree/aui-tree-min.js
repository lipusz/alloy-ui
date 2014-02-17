AUI.add("aui-tree-data",function(m){var h=m.Lang,l=h.isArray,k=h.isObject,c=h.isUndefined,v="boundingBox",f="children",n="container",p=".",i="id",t="index",s="nextSibling",x="node",d="ownerTree",g="parentNode",q="prevSibling",o="previousSibling",r="tree",b="tree-data",j=function(y){return(y instanceof m.TreeNode);},e=function(y){return(y instanceof m.TreeView);},u=m.ClassNameManager.getClassName,a=u(r,x);var w=m.Component.create({NAME:b,ATTRS:{container:{setter:m.one},children:{value:[],validator:l,setter:"_setChildren"},index:{value:{}}},prototype:{UI_EVENTS:{},initializer:function(){var y=this;y.publish("move");y.publish("append",{defaultFn:y._appendChild});y.publish("remove",{defaultFn:y._removeChild});},destructor:function(){var y=this;y.eachChildren(function(z){z.destroy();},true);},getNodeById:function(z){var y=this;return y.get(t)[z];},isRegistered:function(z){var y=this;return !!(y.get(t)[z.get(i)]);},updateReferences:function(B,C,F){var G=this;var E=B.get(g);var y=B.get(d);var D=E&&(E!==C);if(E){if(D){var z=E.get(f);m.Array.removeItem(z,G);E.set(f,z);}E.unregisterNode(B);}if(y){y.unregisterNode(B);}B.set(g,C);B.set(d,F);if(C){C.registerNode(B);}if(F){F.registerNode(B);}if(y!==F){B.eachChildren(function(H){G.updateReferences(H,H.get(g),F);});}if(D){var A=G.getEventOutputMap(B);if(!E.get("children").length){E.collapse();E.hideHitArea();}A.tree.oldParent=E;A.tree.oldOwnerTree=y;G.bubbleEvent("move",A);}},refreshIndex:function(){var y=this;y.updateIndex({});y.eachChildren(function(z){y.registerNode(z);},true);},registerNode:function(B){var y=this;var A=B.get(i);var z=y.get(t);if(A){z[A]=B;}if(e(y)){B.addTarget(y);}B._inheritOwnerTreeAttrs();y.updateIndex(z);},updateIndex:function(z){var y=this;if(z){y.set(t,z);}},unregisterNode:function(A){var y=this;var z=y.get(t);delete z[A.get(i)];if(e(y)){A.removeTarget(y);}y.updateIndex(z);},collapseAll:function(){var y=this;y.eachChildren(function(z){z.collapse();},true);y.fire("collapseAll",y.getEventOutputMap(y));},expandAll:function(){var y=this;y.eachChildren(function(z){z.expand();},true);y.fire("expandAll",y.getEventOutputMap(y));},selectAll:function(){var y=this;y.eachChildren(function(z){z.select();},true);},unselectAll:function(){var y=this;y.eachChildren(function(z){z.unselect();},true);},eachChildren:function(B,z){var y=this;var A=y.getChildren(z);m.Array.each(A,function(C){if(C){B.apply(y,arguments);}});},eachParent:function(A){var z=this;var y=z.get(g);while(y){if(y){A.apply(z,[y]);}y=y.get(g);}},bubbleEvent:function(C,B,D,A){var z=this;z.fire(C,B);if(!D){var y=z.get(g);B=B||{};if(c(A)){A=true;}B.stopActionPropagation=A;while(y){y.fire(C,B);y=y.get(g);}}},createNode:function(z){var y=this;var A=m.TreeNode.nodeTypes[k(z)?z.type:z]||m.TreeNode;return new A(k(z)?z:{});},appendChild:function(B,A){var y=this;var z=y.getEventOutputMap(B);y.bubbleEvent("append",z,A);},_appendChild:function(F){if(F.stopActionPropagation){return false;}var y=this;var E=F.tree.node;var z=y.get(d);var C=y.get(f);y.updateReferences(E,y,z);var D=C.push(E);y.set(f,C);var B=D-2;var A=y.item(B);E.set(s,null);E.set(q,A);y.get(n).append(E.get(v));E.render();},item:function(z){var y=this;return y.get(f)[z];},indexOf:function(z){var y=this;return m.Array.indexOf(y.get(f),z);},hasChildNodes:function(){return(this.get(f).length>0);},getChildren:function(z){var y=this;var B=[];var A=y.get(f);B=B.concat(A);if(z){y.eachChildren(function(C){B=B.concat(C.getChildren(z));});}return B;},getEventOutputMap:function(z){var y=this;return{tree:{instance:y,node:z||y}};},removeChild:function(A){var y=this;var z=y.getEventOutputMap(A);y.bubbleEvent("remove",z);},_removeChild:function(C){if(C.stopActionPropagation){return false;}var y=this;var B=C.tree.node;var z=y.get(d);if(y.isRegistered(B)){B.set(g,null);y.unregisterNode(B);B.set(d,null);if(z){z.unregisterNode(B);}B.get(v).remove();var A=y.get(f);m.Array.removeItem(A,B);y.set(f,A);}},empty:function(){var y=this;y.eachChildren(function(A){var z=A.get(g);if(z){z.removeChild(A);}});},insert:function(F,C,D){var I=this;C=C||this;if(C===F){return false;}var y=C.get(g);if(F&&y){var E=F.get(v);var B=C.get(v);var H=C.get(d);if(D==="before"){B.placeBefore(E);}else{if(D==="after"){B.placeAfter(E);}}var z=[];var G=y.get(v).all("> ul > li");G.each(function(J){z.push(m.Widget.getByNode(J));});F.set(s,m.Widget.getByNode(E.get(s)));F.set(q,m.Widget.getByNode(E.get(o)));C.updateReferences(F,y,H);y.set(f,z);}F.render();var A=C.getEventOutputMap(F);A.tree.refTreeNode=C;C.bubbleEvent("insert",A);},insertAfter:function(z,y){y.insert(z,y,"after");},insertBefore:function(z,y){y.insert(z,y,"before");},getNodeByChild:function(A){var y=this;var z=A.ancestor(p+a);if(z){return y.getNodeById(z.attr(i));}return null;},_inheritOwnerTreeAttrs:h.emptyFn,_setChildren:function(z){var y=this;var A=[];m.Array.each(z,function(B){if(B){if(!j(B)&&k(B)){B=y.createNode(B);}if(!j(y)){B.set(d,y);}else{B.set(d,y.get(d));}B._inheritOwnerTreeAttrs();B.render();if(m.Array.indexOf(A,B)===-1){A.push(B);}}});return A;}}});m.TreeData=w;},"@VERSION@",{requires:["aui-base"],skinnable:false});AUI.add("aui-tree-node",function(ac){var W=ac.Lang,aI=W.isString,az=W.isBoolean,aP="alwaysShowHitArea",O="",r="boundingBox",g="children",aE="clearfix",w="collapsed",a="container",aa="content",u="contentBox",j="expanded",o="helper",T="hidden",G="hitarea",f="hitAreaEl",S="icon",aO="iconEl",ar="id",ai="label",U="labelEl",R="lastSelected",aD="leaf",p="node",ak="over",X="ownerTree",e="parentNode",aC="selected",s=" ",h="tree",H="tree-node",aL=function(){return Array.prototype.slice.call(arguments).join(s);},ao=function(A){return(A instanceof ac.TreeNode);},aK=function(A){return(A instanceof ac.TreeView);},E=ac.ClassNameManager.getClassName,af=E(o,aE),y=E(h,w),b=E(h,a),aQ=E(h,j),t=E(h,T),au=E(h,G),D=E(h,S),k=E(h,ai),C=E(h,p,aa),av=E(h,p,T,G),i=E(h,p,aD),aH=E(h,p,ak),I=E(h,p,aC),ab='<div class="'+au+'"></div>',q='<div class="'+D+'"></div>',d='<div class="'+k+'"></div>',aN="<ul></ul>",v="<li></li>",Y='<div class="'+aL(af,C)+'"></div>';
var M=ac.Component.create({NAME:H,ATTRS:{draggable:{value:true,validator:az},ownerTree:{value:null},label:{value:O,validator:aI},expanded:{value:false,validator:az},id:{validator:aI},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:az},nextSibling:{value:null,validator:ao},prevSibling:{value:null,validator:ao},parentNode:{value:null,validator:function(A){return ao(A)||aK(A);}},labelEl:{setter:ac.one,valueFn:function(){var A=this.get(ai);return ac.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ac.one,valueFn:function(){return ac.Node.create(ab);}},alwaysShowHitArea:{value:true,validator:az},iconEl:{setter:ac.one,valueFn:function(){return ac.Node.create(q);}},tabIndex:{value:null}},EXTENDS:ac.TreeData,UI_ATTRS:[j],prototype:{BOUNDING_TEMPLATE:v,CONTENT_TEMPLATE:Y,initializer:function(){var A=this;A.on({expandedChange:function(L){A.bubbleEvent(L.newVal?"expand":"collapse",A.getEventOutputMap(A));}});A._syncTreeNodeBBId();},bindUI:function(){var A=this;A.after("childrenChange",ac.bind(A._afterSetChildren,A));A.after("idChange",A._afterSetId,A);},_renderUI:function(A){this._renderBoxClassNames();},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_renderContentBox:function(aU){var A=this;var L=A.get(u);if(A.isLeaf()){L.addClass(i);}else{var aT=A.get(j);L.addClass(aT?aQ:y);if(aT){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var aT=A.get(r);var L=A.get(u);var aU=null;if(!A.isLeaf()){L.append(A.get(f));aU=A._createNodeContainer();}L.append(A.get(aO));L.append(A.get(U));aT.append(L);if(aU){if(!A.get(j)){aU.addClass(t);}aT.append(aU);}return aT;},_createNodeContainer:function(){var A=this;var L=A.get(a)||ac.Node.create(aN);L.addClass(b);A.set(a,L);A.eachChildren(function(aT){A.appendChild(aT);});return L;},_syncHitArea:function(L){var A=this;if(A.get(aP)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ac.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ac.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ac.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aT=0;var L=this;var A=L.get(e);while(A){++aT;A=A.get(e);}return aT;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ac.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(u).hasClass(I);},isLeaf:function(){var A=this;return A.get(aD);},isAncestor:function(aT){var L=this;var A=L.get(e);while(A){if(A===aT){return true;}A=A.get(e);}return false;},insertAfter:function(aT,L){var A=this;ac.TreeNode.superclass.insertAfter.apply(this,[aT,A]);},insertBefore:function(L){var A=this;ac.TreeNode.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){ac.TreeNode.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(X);if(L){L.set(R,A);}A.get(u).addClass(I);A.fire("select");},unselect:function(){var A=this;A.get(u).removeClass(I);A.fire("unselect");},over:function(){this.get(u).addClass(aH);},out:function(){this.get(u).removeClass(aH);},showHitArea:function(){var A=this;var L=A.get(f);L.removeClass(av);},hideHitArea:function(){var A=this;var L=A.get(f);L.addClass(av);},_syncTreeNodeBBId:function(L){var A=this;A.get(r).attr(ar,A.get(ar));},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);},_uiSetExpanded:function(aU){var A=this;if(!A.isLeaf()){var aT=A.get(a);var L=A.get(u);if(aU){L.replaceClass(y,aQ);if(aT){aT.removeClass(t);}}else{L.replaceClass(aQ,y);if(aT){aT.addClass(t);}}}}}});ac.TreeNode=M;var ax=W.isFunction,F=W.isObject,ad=W.isValue,aJ="cache",at="end",aj="io",aA="limit",aM="loaded",aR="loading",ah="paginator",am="start",aq="tree-node-io",c="paginatorClick",ay=E(h,p,ah),x=E(h,p,aj,aR),aw='<a class="'+ay+'" href="javascript:void(0);">Load more results</a>';var K=ac.Component.create({NAME:aq,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:az},loaded:{value:false,validator:az},cache:{value:true,validator:az},leaf:{value:false,validator:az},paginator:{setter:function(A){return ac.merge({alwaysVisible:false,autoFocus:true,element:ac.Node.create(aw),endParam:at,limitParam:aA,start:0,startParam:am},A);},validator:F}},EXTENDS:ac.TreeNode,UI_ATTRS:[j],prototype:{bindUI:function(){var A=this;ac.TreeNodeIO.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},syncUI:function(){var A=this;ac.TreeNodeIO.superclass.syncUI.apply(this,arguments);A._syncPaginatorUI();},_bindPaginatorUI:function(){var A=this;var aT=A.get(ah);if(aT){var L=ac.bind(A._handlePaginatorClickEvent,A);aT.element.on("click",L);}},createNodes:function(L){var A=this;ac.Array.each(ac.Array(L),function(aU){var aT=A.createNode.apply(A,[aU]);A.appendChild(aT);});A._syncPaginatorUI(L);},expand:function(){var A=this;var L=A.get(aJ);var aV=A.get(aj);var aT=A.get(aM);var aU=A.get(aR);if(!L){A.set(aM,false);}if(aV&&!aT&&!aU&&!this.hasChildNodes()){if(!L){A.empty();}A.initIO();}else{ac.TreeNodeIO.superclass.expand.apply(this,arguments);}},initIO:function(){var L=this;var aT=L.get(aj);if(ax(aT.cfg.data)){aT.cfg.data=aT.cfg.data.apply(L,[L]);}L._syncPaginatorIOData(aT);if(ax(aT.loader)){var A=ac.bind(aT.loader,L);A(aT.url,aT.cfg,L);}else{ac.io.request(aT.url,aT.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(u);A.set(aR,true);L.addClass(x);},ioCompleteHandler:function(){var A=this;var L=A.get(u);A.set(aR,false);A.set(aM,true);L.removeClass(x);},ioSuccessHandler:function(){var A=this;var aY=A.get(aj);var aT=Array.prototype.slice.call(arguments);
var aV=aT.length;var L=aT[1];if(aV>=3){var aX=aT[2];try{L=ac.JSON.parse(aX.responseText);}catch(aW){}}var aU=aY.formatter;if(aU){L=aU(L);}A.createNodes(L);A.expand();},ioFailureHandler:function(){var A=this;A.set(aR,false);A.set(aM,false);},_createEvents:function(){var A=this;A.publish(c,{defaultFn:A._defPaginatorClickFn,prefix:aq});},_defPaginatorClickFn:function(L){var A=this;var aT=A.get(ah);if(ad(aT.limit)){aT.start+=aT.limit;}if(A.get(aj)){A.initIO();}},_handlePaginatorClickEvent:function(aU){var A=this;var aT=A.get(X);var L=A.getEventOutputMap(A);A.fire(c,L);if(aT){aT.fire(c,L);}aU.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var aT=L.get(X);if(aT){if(!L.get(aj)){L.set(aj,ac.clone(aT.get(aj)));}if(!L.get(ah)){var A=aT.get(ah);if(A&&A.element){A.element=A.element.clone();}L.set(ah,A);}}},_setIO:function(aT){var A=this;if(!aT){return null;}else{if(aI(aT)){aT={url:aT};}}aT=aT||{};aT.cfg=aT.cfg||{};aT.cfg.on=aT.cfg.on||{};var L={start:ac.bind(A.ioStartHandler,A),complete:ac.bind(A.ioCompleteHandler,A),success:ac.bind(A.ioSuccessHandler,A),failure:ac.bind(A.ioFailureHandler,A)};ac.each(L,function(aW,aU){var aX=aT.cfg.on[aU];if(ax(aX)){var aV=function(){aW.apply(A,arguments);aX.apply(A,arguments);};aT.cfg.on[aU]=ac.bind(aV,A);}else{aT.cfg.on[aU]=aW;}});return aT;},_syncPaginatorIOData:function(aU){var A=this;var aT=A.get(ah);if(aT&&ad(aT.limit)){var L=aU.cfg.data||{};L[aT.limitParam]=aT.limit;L[aT.startParam]=aT.start;L[aT.endParam]=(aT.start+aT.limit);aU.cfg.data=L;}},_syncPaginatorUI:function(L){var A=this;var aT=A.get(g);var aX=A.get(ah);if(aX){var aW=true;if(L){aW=(L.length>0);}var aU=aW&&(aT.length>=aX.limit);if(aX.alwaysVisible||aU){A.get(a).append(aX.element.show());if(aX.autoFocus){try{aX.element.focus();}catch(aV){}}}else{aX.element.hide();}}}}});ac.TreeNodeIO=K;var l="checkbox",n="checked",Z="checkContainerEl",aF="checkEl",N="checkName",V=".",m="name",z="tree-node-check",ag=E(h,p,l),an=E(h,p,l,a),ap=E(h,p,n),Q='<div class="'+an+'"></div>',al='<input class="'+ag+'" type="checkbox" />';var aB=ac.Component.create({NAME:z,ATTRS:{checked:{value:false,validator:az},checkName:{value:z,validator:aI},checkContainerEl:{setter:ac.one,valueFn:function(){return ac.Node.create(Q);}},checkEl:{setter:ac.one,valueFn:function(){var A=this.get(N);return ac.Node.create(al).attr(m,A);}}},EXTENDS:ac.TreeNodeIO,UI_ATTRS:[n,j],prototype:{initializer:function(){var A=this;A.on({checkedChange:function(L){A.bubbleEvent(L.newVal?"check":"uncheck",A.getEventOutputMap(A));}});},renderUI:function(){var L=this;ac.TreeNodeCheck.superclass.renderUI.apply(L,arguments);var aT=L.get(U);var A=L.get(aF);var aU=L.get(Z);A.hide();aU.append(A);aT.placeBefore(aU);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(u);var aT=A.get(U);ac.TreeNodeCheck.superclass.bindUI.apply(A,arguments);L.delegate("click",ac.bind(A.toggleCheck,A),V+an);L.delegate("click",ac.bind(A.toggleCheck,A),V+k);aT.swallowEvent("dblclick");},check:function(L){var A=this;A.set(n,true,{originalTarget:L});},uncheck:function(L){var A=this;A.set(n,false,{originalTarget:L});},toggleCheck:function(){var L=this;var A=L.get(aF);var aT=A.attr(n);if(!aT){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(n);},_uiSetChecked:function(L){var A=this;if(L){A.get(u).addClass(ap);A.get(aF).attr(n,n);}else{A.get(u).removeClass(ap);A.get(aF).attr(n,O);}}}});ac.TreeNodeCheck=aB;var B="child",P="tree-node-task",J="unchecked",aG=function(A){return A instanceof ac.TreeNodeCheck;},ae=E(h,p,B,J);var aS=ac.Component.create({NAME:P,EXTENDS:ac.TreeNodeCheck,UI_ATTRS:[n,j],prototype:{check:function(aT){var A=this;var L=A.get(u);aT=aT||A;if(!A.isLeaf()){A.eachChildren(function(aU){if(aG(aU)){aU.check(aT);}});}A.eachParent(function(aU){if(aG(aU)&&!aU.isChecked()){aU.get(u).addClass(ae);}});L.removeClass(ae);ac.TreeNodeTask.superclass.check.call(this,aT);},uncheck:function(aT){var A=this;var L=A.get(u);aT=aT||A;if(!A.isLeaf()){A.eachChildren(function(aU){if(aU instanceof ac.TreeNodeCheck){aU.uncheck(aT);}});}A.eachParent(function(aU){if(aG(aU)&&!aU.isChecked()){aU.get(u).removeClass(ae);}});L.removeClass(ae);ac.TreeNodeTask.superclass.uncheck.call(this,aT);}}});ac.TreeNodeTask=aS;ac.TreeNode.nodeTypes={task:ac.TreeNodeTask,check:ac.TreeNodeCheck,node:ac.TreeNode,io:ac.TreeNodeIO};},"@VERSION@",{requires:["aui-tree-data","aui-io","json","querystring-stringify"],skinnable:false});AUI.add("aui-tree-view",function(y){var q=y.Lang,r=q.isString,ao="boundingBox",F="children",h="container",aa="content",S="contentBox",O=".",ad="file",al="hitarea",W="icon",aq="label",b="lastSelected",t="leaf",at="node",ai="ownerTree",am="root",a=" ",ab="tree",H="tree-view",D="type",J="view",R=function(){return Array.prototype.slice.call(arguments).join(a);},X=function(A){return(A instanceof y.TreeNode);},o=y.ClassNameManager.getClassName,C=o(ab,al),s=o(ab,W),n=o(ab,aq),Q=o(ab,at,aa),G=o(ab,am,h),j=o(ab,J,aa);var v=y.Component.create({NAME:H,ATTRS:{type:{value:ad,validator:r},lastSelected:{value:null,validator:X},io:{value:null},paginator:{value:null}},EXTENDS:y.TreeData,prototype:{CONTENT_TEMPLATE:"<ul></ul>",bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},syncUI:function(){var A=this;A.refreshIndex();},registerNode:function(L){var A=this;L.set(ai,A);y.TreeView.superclass.registerNode.apply(this,arguments);},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aA){var ay=aA.one("> *").remove();var ax=ay.outerHTML();var aB=new y.TreeNode({boundingBox:aA,label:ax});var aw=aA.one("> ul");if(aw){aB.set(t,false);aB.set(h,aw);aB.render();A._createFromHTMLMarkup(aw);}else{aB.render();}var av=aA.get(u).get(u);var az=y.Widget.getByNode(av);az.appendChild(aB);});},_renderElements:function(){var A=this;var L=A.get(S);var av=A.get(F);var aw=A.get(D);var ax=o(ab,aw);L.addClass(j);A.set(h,L);L.addClass(R(ax,G));if(av.length){A.eachChildren(function(ay){A.appendChild(ay,true);});}else{A._createFromHTMLMarkup(L);
}},_delegateDOM:function(){var A=this;var L=A.get(ao);L.delegate("click",y.bind(A._onClickHitArea,A),O+C);L.delegate("dblclick",y.bind(A._onClickHitArea,A),O+s);L.delegate("dblclick",y.bind(A._onClickHitArea,A),O+n);L.delegate("mouseenter",y.bind(A._onMouseEnterNodeEl,A),O+Q);L.delegate("mouseleave",y.bind(A._onMouseLeaveNodeEl,A),O+Q);L.delegate("click",y.bind(A._onClickNodeEl,A),O+Q);},_onClickNodeEl:function(L){var A=this;var aw=A.getNodeByChild(L.currentTarget);if(aw&&!aw.isSelected()){var av=A.get(b);if(av){av.unselect();}aw.select();}},_onMouseEnterNodeEl:function(L){var A=this;var av=A.getNodeByChild(L.currentTarget);if(av){av.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var av=A.getNodeByChild(L.currentTarget);if(av){av.out();}},_onClickHitArea:function(L){var A=this;var av=A.getNodeByChild(L.currentTarget);if(av){av.toggle();}}}});y.TreeView=v;var au=q.isNumber,E="above",x="append",ae="below",B="block",aj="body",g="clearfix",ag="default",d="display",T="down",N="drag",w="draggable",ap="dragCursor",m="dragNode",c="expanded",ah="helper",af="insert",Z="offsetHeight",u="parentNode",V="scrollDelay",k="state",ac="tree-drag-drop",I="up",l=y.DD.DDM,p=o(ah,g),an=o(W),P=o(ab,N,ah),i=o(ab,N,ah,aa),z=o(ab,N,ah,aq),f=o(ab,N,af,E),ar=o(ab,N,af,x),M=o(ab,N,af,ae),Y=o(ab,N,k,x),K=o(ab,N,k,af,E),ak=o(ab,N,k,af,ae),e='<div class="'+P+'">'+'<div class="'+[i,p].join(a)+'">'+'<span class="'+an+'"></span>'+'<span class="'+z+'"></span>'+"</div>"+"</div>";var U=y.Component.create({NAME:ac,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:au}},EXTENDS:y.TreeView,prototype:{direction:ae,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(ah);if(L){L.remove(true);}A.eachChildren(function(aw){if(aw.get(w)){var av=l.getDrag(aw.get(S));if(av){av.destroy();}}},true);},bindUI:function(){var A=this;y.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;y.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=y.Node.create(e).hide();y.one(aj).append(L);A.set(ah,L);l.set(ap,ag);},_createDrag:function(aw){var L=this;if(!L.dragTimers){L.dragTimers=[];}if(!l.getDrag(aw)){var A=L.dragTimers;var av=50*A.length;var ax=setTimeout(function(){if(!l.getDrag(aw)){var ay=new y.DD.Drag({bubbleTargets:L,node:aw,target:true}).plug(y.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(y.Plugin.DDNodeScroll,{scrollDelay:L.get(V),node:L.get(ao)});ay.removeInvalid("a");}y.Array.removeItem(A,ax);},av);A.push(ax);}},_bindDragDrop:function(){var A=this;var L=A.get(ao);A._createDragInitHandler=y.bind(function(){A.eachChildren(function(av){if(av.get(w)){A._createDrag(av.get(S));}},true);L.detach("mouseover",A._createDragInitHandler);},A);L.on("mouseover",A._createDragInitHandler);A.after("insert",y.bind(A._afterAppend,A));A.after("append",y.bind(A._afterAppend,A));A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=x;A.get(ah).addClass(Y);L.addClass(ar);},_goingDownState:function(L){var A=this;A.dropAction=ae;A.get(ah).addClass(ak);L.addClass(M);},_goingUpState:function(L){var A=this;A.dropAction=E;A.get(ah).addClass(K);L.addClass(f);},_resetState:function(L){var A=this;var av=A.get(ah);av.removeClass(Y);av.removeClass(K);av.removeClass(ak);if(L){L.removeClass(f);L.removeClass(ar);L.removeClass(M);}},_updateNodeState:function(A){var aE=this;var aA=A.drag;var ax=A.drop;var L=ax.get(at);var aD=L.get(u);var az=aA.get(at).get(u);var aw=y.Widget.getByNode(aD);aE._resetState(aE.nodeContent);if(!az.contains(aD)){var aF=L.get(Z)/3;var av=L.getY();var aC=av+aF;var aB=av+aF*2;var ay=aA.mouseXY[1];if((ay>av)&&(ay<aC)){aE._goingUpState(L);}else{if(ay>aB){aE._goingDownState(L);}else{if((ay>aC)&&(ay<aB)){if(aw&&!aw.isLeaf()){aE._appendState(L);}else{if(aE.direction===I){aE._goingUpState(L);}else{aE._goingDownState(L);}}}}}}aE.nodeContent=L;},_afterAppend:function(L){var A=this;var av=L.tree.node;if(av.get(w)){A._createDrag(av.get(S));}},_afterDropHit:function(ax){var A=this;var az=A.dropAction;var ay=ax.drag.get(at).get(u);var av=ax.drop.get(at).get(u);var aA=y.Widget.getByNode(av);var aw=y.Widget.getByNode(ay);var L=A.getEventOutputMap(A);L.tree.dropNode=aA;L.tree.dragNode=aw;if(az===E){aA.insertBefore(aw);A.bubbleEvent("dropInsert",L);}else{if(az===ae){aA.insertAfter(aw);A.bubbleEvent("dropInsert",L);}else{if(az===x){if(aA&&!aA.isLeaf()){aA.appendChild(aw);if(!aA.get(c)){aA.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(av){var A=this;var L=A.lastY;var aw=av.target.lastXY[1];if(aw!==L){A.direction=(aw<L)?I:T;}A.lastY=aw;},_onDragStart:function(ay){var A=this;var aw=ay.target;var aA=aw.get(at).get(u);var av=y.Widget.getByNode(aA);var az=A.get(b);if(az){az.unselect();}av.select();var ax=A.get(ah);var L=ax.one(O+z);ax.setStyle(d,B).show();L.html(av.get(aq));aw.set(m,ax);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(at).get(u);var av=y.Widget.getByNode(A);if(!X(av)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});y.TreeViewDD=U;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd-drag","dd-drop","dd-proxy"]});AUI.add("aui-tree",function(a){},"@VERSION@",{skinnable:true,use:["aui-tree-data","aui-tree-node","aui-tree-view"]});